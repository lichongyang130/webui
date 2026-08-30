const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { db, initDb, hashPassword, verifyPassword } = require("./db");

initDb();

const app = express();
app.use(express.json({ limit: "8mb" }));

// 请求日志(便于排查鉴权问题)
app.use("/api", (req, res, next) => {
  const t = Date.now();
  res.on("finish", () =>
    console.log(`[api] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - t}ms)`)
  );
  next();
});

const DESIGN = process.env.DESIGN_DIR || path.join(__dirname, "..", "design");
const DIST = path.join(__dirname, "..", "dist");
const PORT = process.env.PORT || 3001;

// ---------- auth ----------
function readToken(req) {
  const header = (req.headers.authorization || "").replace("Bearer ", "");
  if (header) return header;
  const cookie = (req.headers.cookie || "")
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith("mui_token="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
}
function auth(req, res, next) {
  if (req.method === "POST" && req.path === "/auth/login") return next();
  if (req.path.startsWith("/public/")) return next(); // 前台只读接口免鉴权
  const token = readToken(req);
  const s = db
    .prepare("SELECT * FROM sessions WHERE token = ? AND expires_at > datetime('now')")
    .get(token);
  if (!s) return res.status(401).json({ error: "未登录或登录已过期" });
  req.userId = s.user_id;
  // #56 操作日志:记录后台写操作
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const actor = db.prepare("SELECT username FROM users WHERE id=?").get(req.userId)?.username || "admin";
    res.on("finish", () => {
      try {
        db.prepare("INSERT INTO ops_log (actor,action) VALUES (?,?)").run(actor, `${req.method} ${req.path}`);
      } catch {}
    });
  }
  next();
}
app.use("/api", auth);

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username || "");
  if (!user || !verifyPassword(password || "", user.password_hash))
    return res.status(401).json({ error: "用户名或密码错误" });
  const token = crypto.randomBytes(24).toString("hex");
  db.prepare("INSERT INTO sessions (token,user_id,expires_at) VALUES (?,?,datetime('now','+7 day'))").run(
    token,
    user.id
  );
  // 双通道:HttpOnly Cookie(浏览器自动携带,防 JS 存储受限)+ JSON token(供 curl/第三方)
  res.setHeader(
    "Set-Cookie",
    `mui_token=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=604800`
  );
  try {
    db.prepare("INSERT INTO ops_log (actor,action) VALUES (?,?)").run(user.username, "POST /auth/login");
  } catch {}
  res.json({ token, username: user.username });
});
app.post("/api/auth/logout", (req, res) => {
  const token = readToken(req);
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
  res.setHeader("Set-Cookie", "mui_token=; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=0");
  res.json({ ok: true });
});
app.get("/api/me", (req, res) => {
  const u = db.prepare("SELECT username FROM users WHERE id = ?").get(req.userId);
  res.json(u || {});
});

// ---------- stats ----------
app.get("/api/stats", (req, res) => {
  const one = (sql) => db.prepare(sql).get().c;
  const perSection = db
    .prepare(
      `SELECT s.id, s.slug, s.name, s.color, COUNT(i.id) c
       FROM sections s LEFT JOIN items i ON i.section_id = s.id
       GROUP BY s.id ORDER BY s.sort`
    )
    .all();
  const recent = db
    .prepare(
      `SELECT i.*, s.name section_name, s.color section_color, c.name category_name
       FROM items i JOIN sections s ON s.id=i.section_id JOIN categories c ON c.id=i.category_id
       ORDER BY i.created_at DESC, i.id DESC LIMIT 8`
    )
    .all();
  const starred = db
    .prepare(`SELECT i.id, i.name, s.name section_name, s.color section_color
              FROM items i JOIN sections s ON s.id=i.section_id
              WHERE i.starred=1 ORDER BY i.id DESC LIMIT 8`)
    .all();
  res.json({
    sections: one("SELECT COUNT(*) c FROM sections WHERE enabled=1"),
    categories: one("SELECT COUNT(*) c FROM categories"),
    items: one("SELECT COUNT(*) c FROM items"),
    starred_count: one("SELECT COUNT(*) c FROM items WHERE starred=1"),
    assets: one("SELECT COUNT(*) c FROM assets"),
    perSection,
    recent,
    starred,
  });
});

// ---------- sections ----------
app.get("/api/sections", (req, res) => {
  res.json(
    db
      .prepare(
        `SELECT s.*,
          (SELECT COUNT(*) FROM categories c WHERE c.section_id=s.id) category_count,
          (SELECT COUNT(*) FROM items i WHERE i.section_id=s.id) item_count
         FROM sections s ORDER BY s.sort`
      )
      .all()
  );
});
app.post("/api/sections", (req, res) => {
  const { slug, name, url, icon, color, description, sort } = req.body;
  if (!slug || !name) return res.status(400).json({ error: "slug/name 必填" });
  const r = db
    .prepare("INSERT INTO sections (slug,name,url,icon,color,description,sort) VALUES (?,?,?,?,?,?,?)")
    .run(slug, name, url || "", icon || "box", color || "#22d3ee", description || "", sort || 0);
  res.json({ id: Number(r.lastInsertRowid) });
});
app.put("/api/sections/:id", (req, res) => {
  const { name, url, icon, color, description, sort, enabled } = req.body;
  db.prepare(
    "UPDATE sections SET name=?,url=?,icon=?,color=?,description=?,sort=?,enabled=? WHERE id=?"
  ).run(name, url, icon, color, description, sort, enabled ? 1 : 0, req.params.id);
  res.json({ ok: true });
});
app.delete("/api/sections/:id", (req, res) => {
  const n = db.prepare("SELECT COUNT(*) c FROM items WHERE section_id=?").get(req.params.id).c;
  if (n > 0) return res.status(400).json({ error: `该版块下还有 ${n} 条资源,请先删除` });
  db.prepare("DELETE FROM categories WHERE section_id=?").run(req.params.id);
  db.prepare("DELETE FROM sections WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});

// ---------- categories ----------
app.get("/api/categories", (req, res) => {
  const { section_id } = req.query;
  const rows = section_id
    ? db
        .prepare(
          `SELECT c.*, (SELECT COUNT(*) FROM items i WHERE i.category_id=c.id) item_count
           FROM categories c WHERE c.section_id=? ORDER BY c.sort`
        )
        .all(section_id)
    : db.prepare("SELECT * FROM categories ORDER BY section_id, sort").all();
  res.json(rows);
});
app.post("/api/categories", (req, res) => {
  const { section_id, slug, name, description, sort } = req.body;
  const r = db
    .prepare("INSERT INTO categories (section_id,slug,name,description,sort) VALUES (?,?,?,?,?)")
    .run(section_id, slug || name, name, description || "", sort || 0);
  res.json({ id: Number(r.lastInsertRowid) });
});
app.put("/api/categories/:id", (req, res) => {
  const { name, description, sort } = req.body;
  db.prepare("UPDATE categories SET name=?,description=?,sort=? WHERE id=?").run(
    name,
    description,
    sort,
    req.params.id
  );
  res.json({ ok: true });
});
app.delete("/api/categories/:id", (req, res) => {
  const n = db.prepare("SELECT COUNT(*) c FROM items WHERE category_id=?").get(req.params.id).c;
  if (n > 0) return res.status(400).json({ error: `该分类下还有 ${n} 条资源,请先删除` });
  db.prepare("DELETE FROM categories WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});

// ---------- items ----------
app.get("/api/items", (req, res) => {
  const { section_id, category_id, status, starred, q, tag } = req.query;
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const pageSize = Math.min(100, parseInt(req.query.page_size || "20"));
  const where = [];
  const params = [];
  if (section_id) (where.push("i.section_id=?"), params.push(section_id));
  if (category_id) (where.push("i.category_id=?"), params.push(category_id));
  if (status) (where.push("i.status=?"), params.push(status));
  if (starred) where.push("i.starred=1");
  if (q) (where.push("(i.name LIKE ? OR i.description LIKE ?)"), params.push(`%${q}%`, `%${q}%`));
  if (tag) (where.push("i.tags LIKE ?"), params.push(`%"${tag}"%`));
  const w = where.length ? "WHERE " + where.join(" AND ") : "";
  const total = db
    .prepare(`SELECT COUNT(*) c FROM items i ${w}`)
    .get(...params).c;
  const rows = db
    .prepare(
      `SELECT i.*, s.name section_name, s.color section_color, s.slug section_slug, c.name category_name
       FROM items i JOIN sections s ON s.id=i.section_id JOIN categories c ON c.id=i.category_id
       ${w} ORDER BY i.id DESC LIMIT ? OFFSET ?`
    )
    .all(...params, pageSize, (page - 1) * pageSize);
  res.json({ rows, total, page, page_size: pageSize });
});
app.post("/api/items", (req, res) => {
  const b = req.body;
  if (!b.name || !b.section_id || !b.category_id)
    return res.status(400).json({ error: "name/section_id/category_id 必填" });
  const r = db
    .prepare(
      `INSERT INTO items (section_id,category_id,name,url,description,tags,tech,cover_image,status,starred,notes)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`
    )
    .run(
      b.section_id,
      b.category_id,
      b.name,
      b.url || "",
      b.description || "",
      JSON.stringify(b.tags || []),
      b.tech || "",
      b.cover_image || "",
      b.status || "pending",
      b.starred ? 1 : 0,
      b.notes || ""
    );
  res.json({ id: Number(r.lastInsertRowid) });
});
app.put("/api/items/:id", (req, res) => {
  const b = req.body;
  db.prepare(
    `UPDATE items SET section_id=?,category_id=?,name=?,url=?,description=?,tags=?,tech=?,cover_image=?,status=?,starred=?,notes=?,updated_at=datetime('now')
     WHERE id=?`
  ).run(
    b.section_id,
    b.category_id,
    b.name,
    b.url || "",
    b.description || "",
    JSON.stringify(b.tags || []),
    b.tech || "",
    b.cover_image || "",
    b.status || "pending",
    b.starred ? 1 : 0,
    b.notes || "",
    req.params.id
  );
  res.json({ ok: true });
});
app.delete("/api/items/:id", (req, res) => {
  db.prepare("DELETE FROM items WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});
app.post("/api/items/bulk", (req, res) => {
  const { ids = [], action, tag } = req.body;
  if (!ids.length) return res.status(400).json({ error: "ids 为空" });
  const ph = ids.map(() => "?").join(",");
  if (action === "delete") db.prepare(`DELETE FROM items WHERE id IN (${ph})`).run(...ids);
  if (action === "star") db.prepare(`UPDATE items SET starred=1 WHERE id IN (${ph})`).run(...ids);
  if (action === "unstar") db.prepare(`UPDATE items SET starred=0 WHERE id IN (${ph})`).run(...ids);
  if (action === "tag" && tag) {
    const rows = db.prepare(`SELECT id,tags FROM items WHERE id IN (${ph})`).all(...ids);
    const up = db.prepare("UPDATE items SET tags=? WHERE id=?");
    for (const r of rows) {
      const tags = JSON.parse(r.tags || "[]");
      if (!tags.includes(tag)) tags.push(tag);
      up.run(JSON.stringify(tags), r.id);
    }
  }
  res.json({ ok: true, affected: ids.length });
});

// ---------- tags ----------
app.get("/api/tags", (req, res) => {
  const rows = db.prepare("SELECT tags FROM items").all();
  const count = {};
  for (const r of rows) for (const t of JSON.parse(r.tags || "[]")) count[t] = (count[t] || 0) + 1;
  res.json(
    Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
      .map(([tag, c]) => ({ tag, count: c }))
  );
});

// ---------- assets ----------
app.get("/api/assets", (req, res) => {
  res.json(
    db
      .prepare(
        `SELECT a.*, i.name linked_item_name FROM assets a LEFT JOIN items i ON i.id=a.linked_item_id ORDER BY a.path`
      )
      .all()
  );
});
app.post("/api/assets/scan", (req, res) => {
  if (!fs.existsSync(DESIGN)) return res.json({ added: 0 });
  const ins = db.prepare(
    "INSERT OR IGNORE INTO assets (path,title,screen) VALUES (?,?,?)"
  );
  let added = 0;
  for (const f of fs.readdirSync(DESIGN).filter((f) => f.endsWith(".png"))) {
    const r = ins.run(`/design/${f}`, f.replace(/\.png$/, ""), null);
    added += r.changes;
  }
  res.json({ added });
});
app.put("/api/assets/:id", (req, res) => {
  const { title, screen, linked_item_id } = req.body;
  db.prepare("UPDATE assets SET title=?,screen=?,linked_item_id=? WHERE id=?").run(
    title,
    screen,
    linked_item_id || null,
    req.params.id
  );
  res.json({ ok: true });
});
app.delete("/api/assets/:id", (req, res) => {
  db.prepare("DELETE FROM assets WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});

// ---------- backup / restore / password ----------
app.get("/api/backup", (req, res) => {
  res.json({
    sections: db.prepare("SELECT * FROM sections").all(),
    categories: db.prepare("SELECT * FROM categories").all(),
    items: db.prepare("SELECT * FROM items").all(),
    assets: db.prepare("SELECT * FROM assets").all(),
  });
});
app.post("/api/restore", (req, res) => {
  const { sections = [], categories = [], items = [], assets = [] } = req.body || {};
  const tx = () => {
    db.exec("DELETE FROM items; DELETE FROM categories; DELETE FROM sections; DELETE FROM assets;");
    const is = db.prepare(
      "INSERT INTO sections (id,slug,name,url,icon,color,description,sort,enabled) VALUES (?,?,?,?,?,?,?,?,?)"
    );
    for (const s of sections) is.run(s.id, s.slug, s.name, s.url, s.icon, s.color, s.description, s.sort, s.enabled);
    const ic = db.prepare(
      "INSERT INTO categories (id,section_id,slug,name,description,sort) VALUES (?,?,?,?,?,?)"
    );
    for (const c of categories) ic.run(c.id, c.section_id, c.slug, c.name, c.description, c.sort);
    const ii = db.prepare(
      `INSERT INTO items (id,section_id,category_id,name,url,description,tags,tech,cover_image,status,starred,notes,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    );
    for (const i of items)
      ii.run(i.id, i.section_id, i.category_id, i.name, i.url, i.description, i.tags, i.tech, i.cover_image, i.status, i.starred, i.notes, i.created_at, i.updated_at);
    const ia = db.prepare(
      "INSERT INTO assets (id,path,title,screen,linked_item_id) VALUES (?,?,?,?,?)"
    );
    for (const a of assets) ia.run(a.id, a.path, a.title, a.screen, a.linked_item_id);
  };
  try {
    db.exec("BEGIN");
    tx();
    db.exec("COMMIT");
    res.json({ ok: true });
  } catch (e) {
    db.exec("ROLLBACK");
    res.status(400).json({ error: String(e.message) });
  }
});
app.put("/api/password", (req, res) => {
  const { old_password, new_password } = req.body;
  const u = db.prepare("SELECT * FROM users WHERE id=?").get(req.userId);
  if (!u || !verifyPassword(old_password || "", u.password_hash))
    return res.status(400).json({ error: "原密码错误" });
  if ((new_password || "").length < 6) return res.status(400).json({ error: "新密码至少 6 位" });
  db.prepare("UPDATE users SET password_hash=? WHERE id=?").run(hashPassword(new_password), u.id);
  res.json({ ok: true });
});

// ---------- public(前台只读) ----------
app.get("/api/public/stats", (req, res) => {
  const one = (sql) => db.prepare(sql).get().c;
  res.json({
    sections: one("SELECT COUNT(*) c FROM sections WHERE enabled=1"),
    categories: one("SELECT COUNT(*) c FROM categories"),
    items: one("SELECT COUNT(*) c FROM items WHERE status='published'"),
    assets: one("SELECT COUNT(*) c FROM assets"),
  });
});
app.get("/api/public/sections", (req, res) => {
  res.json(
    db
      .prepare(
        `SELECT s.*,
          (SELECT COUNT(*) FROM categories c WHERE c.section_id=s.id) category_count,
          (SELECT COUNT(*) FROM items i WHERE i.section_id=s.id AND i.status='published') item_count
         FROM sections s WHERE s.enabled=1 ORDER BY s.sort`
      )
      .all()
  );
});
app.get("/api/public/sections/:slug", (req, res) => {
  const section = db
    .prepare("SELECT * FROM sections WHERE slug=? AND enabled=1")
    .get(req.params.slug);
  if (!section) return res.status(404).json({ error: "版块不存在" });
  const categories = db
    .prepare("SELECT * FROM categories WHERE section_id=? ORDER BY sort")
    .all(section.id);
  res.json({ section, categories });
});
app.get("/api/public/items", (req, res) => {
  const { section_slug, category_slug, q, tag, difficulty, perf, access, fts } = req.query;
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const pageSize = 24;
  const where = ["i.status='published'", "s.enabled=1"];
  const params = [];
  if (section_slug) (where.push("s.slug=?"), params.push(section_slug));
  if (category_slug) (where.push("c.slug=?"), params.push(category_slug));
  if (q) {
    if (fts) (where.push("i.id IN (SELECT rowid FROM items_fts WHERE items_fts MATCH ?)"), params.push(`"${q.replace(/"/g, "")}"`));
    else (where.push("(i.name LIKE ? OR i.description LIKE ? OR i.alias LIKE ?)"), params.push(`%${q}%`, `%${q}%`, `%${q}%`));
  }
  if (tag) (where.push("i.tags LIKE ?"), params.push(`%"${tag}"%`));
  if (difficulty) (where.push("i.difficulty=?"), params.push(+difficulty));
  if (perf) (where.push("i.perf_cost=?"), params.push(perf));
  if (access) (where.push("i.access_level=?"), params.push(access));
  const sort = req.query.sort === "new" ? "i.id DESC" : "i.starred DESC, i.popularity DESC";
  const w = "WHERE " + where.join(" AND ");
  const total = db.prepare(`SELECT COUNT(*) c FROM items i JOIN sections s ON s.id=i.section_id JOIN categories c ON c.id=i.category_id ${w}`).get(...params).c;
  const rows = db
    .prepare(
      `SELECT i.*, s.name section_name, s.color section_color, s.slug section_slug, s.icon section_icon, c.name category_name, c.slug category_slug
       FROM items i JOIN sections s ON s.id=i.section_id JOIN categories c ON c.id=i.category_id
       ${w} ORDER BY ${sort} LIMIT ? OFFSET ?`
    )
    .all(...params, pageSize, (page - 1) * pageSize);
  res.json({ rows, total, page, page_size: pageSize });
});
app.get("/api/public/tags", (req, res) => {
  const rows = db.prepare("SELECT tags FROM items WHERE status='published'").all();
  const count = {};
  for (const r of rows) for (const t of JSON.parse(r.tags || "[]")) count[t] = (count[t] || 0) + 1;
  res.json(
    Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([tag, c]) => ({ tag, count: c }))
  );
});
// 自动生成产品效果图(SVG):保证每个条目都有封面
app.get("/api/public/cover/:id.svg", (req, res) => {
  const it = db
    .prepare(
      `SELECT i.id, i.name, i.description, s.color, s.name sec, c.name cat
       FROM items i JOIN sections s ON s.id=i.section_id JOIN categories c ON c.id=i.category_id WHERE i.id=?`
    )
    .get(req.params.id);
  if (!it) return res.status(404).end();
  const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));
  const h = (it.id * 2654435761) % 1000;
  const gx = 20 + (h % 60), gy = 15 + ((h * 7) % 55), rot = (h % 40) - 20;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
<defs>
<radialGradient id="g" cx="${gx}%" cy="${gy}%" r="75%"><stop offset="0" stop-color="${it.color}" stop-opacity="0.5"/><stop offset="1" stop-color="#05060a" stop-opacity="0"/></radialGradient>
<linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${it.color}" stop-opacity="0.9"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0.9"/></linearGradient>
</defs>
<rect width="640" height="360" fill="#05060a"/>
<g stroke="#1e2534" stroke-width="1" opacity="0.7">${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="360"/>`).join("")}${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="640" y2="${i * 60}"/>`).join("")}</g>
<rect width="640" height="360" fill="url(#g)"/>
<g transform="rotate(${rot} 520 90)" opacity="0.8"><circle cx="520" cy="90" r="46" fill="none" stroke="url(#b)" stroke-width="2"/><circle cx="520" cy="90" r="30" fill="none" stroke="${it.color}" stroke-width="1" opacity="0.6"/><circle cx="520" cy="90" r="4" fill="${it.color}"/></g>
<text x="40" y="300" font-family="Arial Black, Arial" font-size="150" font-weight="900" fill="${it.color}" opacity="0.12">${esc(it.name.slice(0, 1).toUpperCase())}</text>
<text x="40" y="196" font-family="Arial, PingFang SC, sans-serif" font-size="34" font-weight="700" fill="#e2e8f0">${esc(it.name.slice(0, 26))}</text>
<text x="40" y="232" font-family="Arial, PingFang SC, sans-serif" font-size="15" fill="#94a3b8">${esc((it.description || it.cat || "").slice(0, 40))}</text>
<g><rect x="40" y="46" width="${16 + esc(it.cat).length * 13}" height="26" rx="13" fill="${it.color}" fill-opacity="0.15" stroke="${it.color}" stroke-opacity="0.5"/><text x="${52}" y="64" font-family="Arial, PingFang SC, sans-serif" font-size="13" fill="${it.color}">${esc(it.cat)}</text></g>
<text x="40" y="330" font-family="Arial, PingFang SC, sans-serif" font-size="12" fill="#475569">${esc(it.sec)} · Motion UI 资源库</text>
</svg>`;
  res.type("image/svg+xml").set("Cache-Control", "public, max-age=86400").send(svg);
});
app.get("/api/public/assets", (req, res) => {
  res.json(
    db
      .prepare(
        `SELECT a.*, i.name linked_item_name FROM assets a LEFT JOIN items i ON i.id=a.linked_item_id ORDER BY a.path`
      )
      .all()
  );
});

// ---------- v2 路由(社区/运营/学习/SEO/RSS/widget/CSV) ----------
require("./routes2").attach(app, { db });

// ---------- static ----------
app.use("/design", express.static(DESIGN));
app.use(express.static(DIST));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "not found" });
  res.sendFile(path.join(DIST, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[webui-admin] listening on 0.0.0.0:${PORT}`);
});

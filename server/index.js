const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { db, initDb, hashPassword, verifyPassword } = require("./db");

initDb();

const app = express();
app.use(express.json({ limit: "8mb" }));

const DESIGN = process.env.DESIGN_DIR || path.join(__dirname, "..", "design");
const DIST = path.join(__dirname, "..", "dist");
const PORT = process.env.PORT || 3001;

// ---------- auth ----------
function auth(req, res, next) {
  if (req.method === "POST" && req.path === "/auth/login") return next();
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const s = db
    .prepare("SELECT * FROM sessions WHERE token = ? AND expires_at > datetime('now')")
    .get(token);
  if (!s) return res.status(401).json({ error: "未登录或登录已过期" });
  req.userId = s.user_id;
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
  res.json({ token, username: user.username });
});
app.post("/api/auth/logout", (req, res) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
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

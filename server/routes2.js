// v2 路由:社区 UGC / 运营 / 学习 / SEO / RSS / widget / CSV / FTS / 白标
const crypto = require("crypto");

function attach(app, { db }) {
  const pub = (p, h) => app.get(`/api/public${p}`, h);

  // ---------- FTS 全文搜索(#59) ----------
  pub("/search", (req, res) => {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);
    try {
      const rows = db
        .prepare(
          `SELECT i.id,i.name,i.alias,i.description,s.name section_name,s.slug section_slug,s.color section_color
           FROM items_fts f JOIN items i ON i.id=f.rowid JOIN sections s ON s.id=i.section_id
           WHERE items_fts MATCH ? ORDER BY rank LIMIT 30`
        )
        .all(`"${q.replace(/"/g, "")}"`);
      res.json(rows);
    } catch {
      res.json([]);
    }
  });

  // ---------- 条目详情(含关联/评分/评论/元数据) ----------
  pub("/items/:id", (req, res) => {
    const it = db
      .prepare(
        `SELECT i.*, s.name section_name, s.color section_color, s.slug section_slug, c.name category_name
         FROM items i JOIN sections s ON s.id=i.section_id JOIN categories c ON c.id=i.category_id WHERE i.id=?`
      )
      .get(req.params.id);
    if (!it) return res.status(404).json({ error: "not found" });
    it.related = db.prepare("SELECT * FROM related_map WHERE item_id=?").all(it.id);
    const r = db
      .prepare("SELECT COUNT(*) c, COALESCE(AVG(score),0) avg FROM ratings WHERE item_id=?")
      .get(it.id);
    it.rating = { count: r.c, avg: Math.round(r.avg * 10) / 10 };
    it.comments = db.prepare("SELECT * FROM comments WHERE item_id=? ORDER BY id DESC LIMIT 50").all(it.id);
    it.submissions = db.prepare("SELECT * FROM submissions WHERE item_id=? AND status='approved'").all(it.id);
    res.json(it);
  });

  // ---------- 点击 / 经常一起看(#89) ----------
  app.post("/api/public/clicks", (req, res) => {
    const { item_id, session } = req.body;
    db.prepare("INSERT INTO clicks (item_id,session) VALUES (?,?)").run(item_id, session || "");
    res.json({ ok: true });
  });
  pub("/together/:id", (req, res) => {
    const sessions = db
      .prepare("SELECT DISTINCT session FROM clicks WHERE item_id=? AND session!=''")
      .all(req.params.id)
      .map((r) => r.session);
    if (!sessions.length) return res.json([]);
    const ph = sessions.map(() => "?").join(",");
    const rows = db
      .prepare(
        `SELECT i.id,i.name,s.color section_color, COUNT(*) c FROM clicks k
         JOIN items i ON i.id=k.item_id JOIN sections s ON s.id=i.section_id
         WHERE k.session IN (${ph}) AND k.item_id != ? GROUP BY i.id ORDER BY c DESC LIMIT 6`
      )
      .all(...sessions, req.params.id);
    res.json(rows);
  });

  // ---------- 合集(#44/#45) ----------
  pub("/collections", (req, res) => {
    res.json(
      db
        .prepare(
          `SELECT c.*, (SELECT COUNT(*) FROM collection_items ci WHERE ci.collection_id=c.id) n FROM collections c ORDER BY c.id`
        )
        .all()
    );
  });
  pub("/collections/:id", (req, res) => {
    const col = db.prepare("SELECT * FROM collections WHERE id=?").get(req.params.id);
    if (!col) return res.status(404).json({ error: "not found" });
    col.items = db
      .prepare(
        `SELECT i.*, s.name section_name, s.color section_color FROM collection_items ci
         JOIN items i ON i.id=ci.item_id JOIN sections s ON s.id=i.section_id WHERE ci.collection_id=?`
      )
      .all(req.params.id);
    res.json(col);
  });
  app.post("/api/public/collections", (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "name 必填" });
    const r = db.prepare("INSERT INTO collections (name,description) VALUES (?,?)").run(name, description || "");
    res.json({ id: Number(r.lastInsertRowid) });
  });
  app.post("/api/public/collections/:id/items", (req, res) => {
    db.prepare("INSERT OR IGNORE INTO collection_items (collection_id,item_id) VALUES (?,?)").run(
      req.params.id,
      req.body.item_id
    );
    res.json({ ok: true });
  });

  // ---------- 评分/评论/投稿(#72/#74/#71) ----------
  app.post("/api/public/ratings", (req, res) => {
    const { item_id, score } = req.body;
    if (!item_id || score < 1 || score > 5) return res.status(400).json({ error: "score 1-5" });
    db.prepare("INSERT INTO ratings (item_id,score) VALUES (?,?)").run(item_id, score);
    res.json({ ok: true });
  });
  app.get("/api/public/comments/:id", (req, res) => {
    res.json(db.prepare("SELECT * FROM comments WHERE item_id=? ORDER BY id DESC").all(req.params.id));
  });
  app.post("/api/public/comments", (req, res) => {
    const { item_id, author, body } = req.body;
    if (!item_id || !body) return res.status(400).json({ error: "内容必填" });
    db.prepare("INSERT INTO comments (item_id,author,body) VALUES (?,?,?)").run(item_id, author || "匿名", body);
    res.json({ ok: true });
  });
  app.post("/api/public/submissions", (req, res) => {
    const { item_id, title, code_url, screenshot, author } = req.body;
    if (!title) return res.status(400).json({ error: "title 必填" });
    db.prepare("INSERT INTO submissions (item_id,title,code_url,screenshot,author) VALUES (?,?,?,?,?)").run(
      item_id || null,
      title,
      code_url || "",
      screenshot || "",
      author || "匿名"
    );
    res.json({ ok: true });
  });

  // ---------- 订阅(#80) ----------
  app.post("/api/public/subscribe", (req, res) => {
    const email = (req.body.email || "").trim();
    if (!/.+@.+\..+/.test(email)) return res.status(400).json({ error: "邮箱格式错误" });
    try {
      db.prepare("INSERT INTO subscribers (email) VALUES (?)").run(email);
    } catch {
      return res.json({ ok: true, note: "已订阅" });
    }
    res.json({ ok: true });
  });

  // ---------- 跨库对照(#47/#90) ----------
  pub("/related", (req, res) => {
    const { relation } = req.query;
    const w = relation ? "WHERE r.relation=?" : "";
    res.json(
      db
        .prepare(
          `SELECT r.*, i.name item_name, i.cover_image, i.id item_id, s.slug sec_slug
           FROM related_map r JOIN items i ON i.id=r.item_id JOIN sections s ON s.id=i.section_id ${w}`
        )
        .all(...(relation ? [relation] : []))
    );
  });

  // ---------- 人气榜(#79) ----------
  pub("/rank", (req, res) => {
    res.json(
      db
        .prepare(
          `SELECT i.id,i.name,i.popularity,s.name section_name,s.color section_color,
            (SELECT COALESCE(AVG(score),0) FROM ratings r WHERE r.item_id=i.id) avg,
            (SELECT COUNT(*) FROM ratings r WHERE r.item_id=i.id) rc
           FROM items i JOIN sections s ON s.id=i.section_id
           WHERE i.status='published' ORDER BY i.popularity DESC LIMIT 8`
        )
        .all()
    );
  });

  // ---------- 学习内容(#61-#70) ----------
  pub("/articles", (req, res) => {
    const { category } = req.query;
    res.json(
      category
        ? db.prepare("SELECT * FROM articles WHERE category=? ORDER BY id").all(category)
        : db.prepare("SELECT * FROM articles ORDER BY category, id").all()
    );
  });

  // ---------- 每日推荐(#46) ----------
  pub("/daily", (req, res) => {
    const day = Math.floor(Date.now() / 86400000);
    const all = db.prepare("SELECT i.id,i.name,i.description,s.slug section_slug,s.color section_color FROM items i JOIN sections s ON s.id=i.section_id WHERE i.status='published'").all();
    if (!all.length) return res.json([]);
    res.json([0, 1, 2].map((k) => all[(day * 7 + k * 13) % all.length]));
  });

  // ---------- 覆盖率(#60) ----------
  pub("/coverage", (req, res) => {
    const official = { aceternity: 146, motionsites: 65, reactbits: 170, uiverse: 4456, animejs: 16 };
    const rows = db
      .prepare(`SELECT s.slug, s.name, COUNT(i.id) c FROM sections s LEFT JOIN items i ON i.section_id=s.id GROUP BY s.id`)
      .all();
    res.json(rows.map((r) => ({ ...r, official: official[r.slug] || 0, pct: official[r.slug] ? Math.min(100, Math.round((r.c / official[r.slug]) * 100)) : 0 })));
  });

  // ---------- Figma tokens(#93) ----------
  pub("/tokens", (req, res) => {
    const brand = Object.fromEntries(db.prepare("SELECT key,value FROM settings").all().map((r) => [r.key, r.value]));
    res.json({
      colors: { ink: "#05060a", panel: "#0b0e16", edge: "#1e2534", primary: brand.brand_color || "#22d3ee", violet: "#8b5cf6", pink: "#f472b6", green: "#34d399", amber: "#f59e0b" },
      radius: { card: 14, button: 10, badge: 999 },
      shadows: { glow: "0 8px 40px -12px rgba(34,211,238,.35)" },
      fonts: { sans: "Inter, PingFang SC, system-ui", mono: "ui-monospace, SFMono-Regular" },
    });
  });

  // ---------- RSS(#80) ----------
  app.get("/feed.xml", (req, res) => {
    const rows = db
      .prepare(`SELECT i.name, i.description, i.url, i.created_at, s.name sn FROM items i JOIN sections s ON s.id=i.section_id WHERE i.status='published' ORDER BY i.id DESC LIMIT 20`)
      .all();
    const esc = (s) => String(s || "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
    res.type("application/rss+xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Motion UI 资源库</title><link>/</link><description>5 大动效资源版块更新</description>
${rows.map((r) => `<item><title>${esc(r.name)}</title><description>${esc(r.sn + " · " + r.description)}</description><link>${esc(r.url)}</link><pubDate>${new Date(r.created_at + "Z").toUTCString()}</pubDate></item>`).join("\n")}
</channel></rss>`);
  });

  // ---------- SEO 静态页(#98) ----------
  app.get("/seo/:slug", (req, res) => {
    const sec = db.prepare("SELECT * FROM sections WHERE slug=?").get(req.params.slug);
    if (!sec) return res.status(404).send("not found");
    const items = db.prepare("SELECT name,description,url FROM items WHERE section_id=? AND status='published' ORDER BY popularity DESC").all(sec.id);
    res.send(`<!doctype html><html lang="zh"><head><meta charset="utf-8">
<title>${sec.name} 动效组件大全 - Motion UI 资源库</title>
<meta name="description" content="${sec.description}。收录 ${items.length} 个精选资源,含分类、标签与设计图。">
<meta property="og:title" content="${sec.name} 动效组件大全"><meta property="og:type" content="website"></head>
<body style="font-family:Inter,'PingFang SC',sans-serif;background:#05060a;color:#cbd5e1;max-width:800px;margin:40px auto;padding:0 16px">
<h1 style="color:#fff">${sec.name} · ${items.length} 个资源</h1><p>${sec.description}</p>
<ul>${items.map((i) => `<li style="margin:8px 0"><a style="color:#22d3ee" href="${i.url}">${i.name}</a> — ${i.description}</li>`).join("")}</ul>
</body></html>`);
  });

  // ---------- 嵌入 widget(#96) ----------
  app.get("/embed/:slug", (req, res) => {
    const sec = db.prepare("SELECT * FROM sections WHERE slug=?").get(req.params.slug);
    if (!sec) return res.status(404).send("not found");
    const items = db.prepare("SELECT name,url FROM items WHERE section_id=? AND status='published' ORDER BY popularity DESC LIMIT 6").all(sec.id);
    res.send(`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;font:12px Inter,'PingFang SC',sans-serif;background:#0b0e16;color:#cbd5e1}.h{padding:8px 12px;color:${sec.color};font-weight:700}a{display:block;padding:6px 12px;color:#cbd5e1;text-decoration:none;border-top:1px solid #1e2534}a:hover{background:#10151f;color:#fff}</style></head>
<body><div class="h">${sec.name} · 精选</div>${items.map((i) => `<a href="${i.url}" target="_blank">${i.name}</a>`).join("")}</body></html>`);
  });

  // 白标品牌(前台读取,#100)
  pub("/brand", (req, res) => {
    const s = Object.fromEntries(db.prepare("SELECT key,value FROM settings").all().map((r) => [r.key, r.value]));
    res.json({ brand_name: s.brand_name || "Motion UI 资源库", brand_color: s.brand_color || "#22d3ee", locale: s.locale || "zh" });
  });

  // ================= 后台 v2(需鉴权) =================
  // 爬虫触发(#51/#52)
  app.post("/api/crawl", (req, res) => {
    const args = ["scripts/crawl-aceternity.mjs"];
    if (req.body.webhook) args.push(`--webhook=${req.body.webhook}`);
    require("child_process").execFile("node", args, { cwd: require("path").join(__dirname, "..") }, () => {});
    res.json({ ok: true, note: "已触发爬虫,结果见 data/aceternity-crawl.json" });
  });
  // 用户管理(#57)
  app.get("/api/users", (req, res) => res.json(db.prepare("SELECT id,username,created_at FROM users").all()));
  app.post("/api/users", (req, res) => {
    const { username, password } = req.body;
    if (!username || (password || "").length < 6) return res.status(400).json({ error: "密码至少 6 位" });
    const { hashPassword } = require("./db");
    try {
      db.prepare("INSERT INTO users (username,password_hash) VALUES (?,?)").run(username, hashPassword(password));
    } catch {
      return res.status(400).json({ error: "用户名已存在" });
    }
    res.json({ ok: true });
  });

  // 操作日志(#56)
  app.get("/api/ops", (req, res) => res.json(db.prepare("SELECT * FROM ops_log ORDER BY id DESC LIMIT 200").all()));

  // 标签合并(#58)
  app.post("/api/tags/merge", (req, res) => {
    const { from, to } = req.body;
    const rows = db.prepare("SELECT id,tags FROM items").all();
    const up = db.prepare("UPDATE items SET tags=? WHERE id=?");
    let n = 0;
    for (const r of rows) {
      let tags = JSON.parse(r.tags || "[]");
      if (tags.includes(from)) {
        tags = [...new Set(tags.map((t) => (t === from ? to : t)))];
        up.run(JSON.stringify(tags), r.id);
        n++;
      }
    }
    res.json({ ok: true, affected: n });
  });

  // 白标设置(#100)
  app.get("/api/settings", (req, res) =>
    res.json(Object.fromEntries(db.prepare("SELECT key,value FROM settings").all().map((r) => [r.key, r.value])))
  );
  app.put("/api/settings", (req, res) => {
    const up = db.prepare("INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
    for (const [k, v] of Object.entries(req.body || {})) up.run(k, String(v));
    res.json({ ok: true });
  });

  // 投稿审核(#71/#55)
  app.get("/api/submissions", (req, res) => res.json(db.prepare("SELECT * FROM submissions ORDER BY id DESC").all()));
  app.put("/api/submissions/:id", (req, res) => {
    db.prepare("UPDATE submissions SET status=? WHERE id=?").run(req.body.status, req.params.id);
    res.json({ ok: true });
  });

  // CSV 导出/导入(#54)
  app.get("/api/csv", (req, res) => {
    const rows = db
      .prepare(`SELECT i.name,i.url,i.description,i.tags,s.slug ss,c.slug cs FROM items i JOIN sections s ON s.id=i.section_id JOIN categories c ON c.id=i.category_id`)
      .all();
    const esc = (v) => `"${String(v || "").replace(/"/g, '""')}"`;
    res.type("text/csv").send(
      "section,category,name,url,tags,description\n" +
        rows.map((r) => [r.ss, r.cs, esc(r.name), esc(r.url), esc(JSON.parse(r.tags || "[]").join("|")), esc(r.description)].join(",")).join("\n")
    );
  });
  app.post("/api/csv", (req, res) => {
    const lines = String(req.body.csv || "").split("\n").slice(1);
    let n = 0;
    for (const line of lines) {
      const m = line.match(/^([^,]*),([^,]*),(?:"((?:[^"]|"")*)"|[^,]*),(?:"((?:[^"]|"")*)"|[^,]*),(?:"((?:[^"]|"")*)"|[^,]*),(?:"((?:[^"]|"")*)"|[^,]*)/);
      if (!m) continue;
      const [, ss, cs, name, url, tags, desc] = m.map((x) => (x || "").replace(/""/g, '"'));
      const s = db.prepare("SELECT id FROM sections WHERE slug=?").get(ss);
      const c = db.prepare("SELECT id FROM categories WHERE section_id=? AND slug=?").get(s?.id, cs);
      if (!s || !c || !name) continue;
      db.prepare("INSERT INTO items (section_id,category_id,name,url,tags,description) VALUES (?,?,?,?,?,?)").run(
        s.id, c.id, name, url, JSON.stringify(tags ? tags.split("|") : []), desc
      );
      n++;
    }
    res.json({ ok: true, imported: n });
  });

  // 死链检测入口(#53):服务端异步跑,结果落文件
  app.post("/api/checklinks", (req, res) => {
    const { execFile } = require("child_process");
    execFile("node", ["scripts/check-links.mjs"], { cwd: require("path").join(__dirname, "..") }, () => {});
    res.json({ ok: true, note: "已触发,结果见 data/link-report.json" });
  });
}

module.exports = { attach };

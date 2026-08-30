// v2 迁移:items 元数据列 + 社区/运营/学习表 + FTS5 全文索引(幂等)
function migrate(db) {
  const cols = [
    ["alias", "TEXT DEFAULT ''"],
    ["principle", "TEXT DEFAULT ''"],
    ["perf_cost", "TEXT DEFAULT 'low'"],
    ["deps", "TEXT DEFAULT '[]'"],
    ["difficulty", "INTEGER DEFAULT 2"],
    ["popularity", "INTEGER DEFAULT 50"],
    ["inspiration", "TEXT DEFAULT ''"],
    ["mobile_friendly", "INTEGER DEFAULT 1"],
    ["access_level", "TEXT DEFAULT 'free'"],
    ["variant_count", "INTEGER DEFAULT 0"],
    ["migrated_to", "TEXT DEFAULT ''"],
    ["snippet", "TEXT DEFAULT ''"],
    ["props", "TEXT DEFAULT ''"],
    ["pitfalls", "TEXT DEFAULT ''"],
    ["perf_note", "TEXT DEFAULT ''"],
    ["a11y_note", "TEXT DEFAULT ''"],
    ["principle_note", "TEXT DEFAULT ''"],
    ["exercise", "TEXT DEFAULT ''"],
    ["video_url", "TEXT DEFAULT ''"],
    ["faq", "TEXT DEFAULT ''"],
  ];
  for (const [name, def] of cols) {
    try {
      db.exec(`ALTER TABLE items ADD COLUMN ${name} ${def}`);
    } catch {}
  }
  try {
    db.exec(`ALTER TABLE assets ADD COLUMN prompt TEXT DEFAULT ''`);
  } catch {}

  db.exec(`
  CREATE TABLE IF NOT EXISTS collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS collection_items (
    collection_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    PRIMARY KEY (collection_id, item_id)
  );
  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    author TEXT DEFAULT '匿名',
    body TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER,
    title TEXT NOT NULL,
    code_url TEXT DEFAULT '',
    screenshot TEXT DEFAULT '',
    author TEXT DEFAULT '匿名',
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    session TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  CREATE TABLE IF NOT EXISTS ops_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor TEXT DEFAULT 'system',
    action TEXT,
    detail TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    category TEXT,           -- principle | term | path | weekly | faq
    title TEXT,
    level TEXT DEFAULT '',
    body TEXT DEFAULT '',
    linked_items TEXT DEFAULT '[]',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS related_map (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    rel_section_slug TEXT,
    rel_name TEXT,
    rel_url TEXT,
    relation TEXT            -- duplicate | alternative | api | prompt | demo
  );
  `);

  try {
    db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS items_fts USING fts5(
      name, alias, description, tags, content='items', content_rowid='id'
    );
    CREATE TRIGGER IF NOT EXISTS items_fts_ai AFTER INSERT ON items BEGIN
      INSERT INTO items_fts(rowid, name, alias, description, tags)
      VALUES (new.id, new.name, new.alias, new.description, new.tags);
    END;
    CREATE TRIGGER IF NOT EXISTS items_fts_ad AFTER DELETE ON items BEGIN
      INSERT INTO items_fts(items_fts, rowid, name, alias, description, tags)
      VALUES ('delete', old.id, old.name, old.alias, old.description, old.tags);
    END;
    CREATE TRIGGER IF NOT EXISTS items_fts_au AFTER UPDATE ON items BEGIN
      INSERT INTO items_fts(items_fts, rowid, name, alias, description, tags)
      VALUES ('delete', old.id, old.name, old.alias, old.description, old.tags);
      INSERT INTO items_fts(rowid, name, alias, description, tags)
      VALUES (new.id, new.name, new.alias, new.description, new.tags);
    END;
    `);
    db.exec(`INSERT INTO items_fts(items_fts) VALUES('rebuild')`);
  } catch (e) {
    console.log("[schema2] FTS5 skipped:", e.message);
  }
}
module.exports = { migrate };

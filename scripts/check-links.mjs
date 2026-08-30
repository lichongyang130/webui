// #53 死链检测:遍历 items.url,HEAD 探测,结果写 data/link-report.json
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "data"), { recursive: true });
const db = new DatabaseSync(join(root, "server", "data.db"), { readOnly: true });
const rows = db.prepare("SELECT id,name,url FROM items WHERE url != ''").all();

const report = [];
for (const r of rows) {
  try {
    const res = await fetch(r.url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000), headers: { "user-agent": "Mozilla/5.0 (link-checker)" } });
    report.push({ id: r.id, name: r.name, url: r.url, status: res.status, ok: res.ok });
  } catch (e) {
    report.push({ id: r.id, name: r.name, url: r.url, status: 0, ok: false, error: e.message });
  }
}
const dead = report.filter((r) => !r.ok);
writeFileSync(join(root, "data", "link-report.json"), JSON.stringify({ checked_at: new Date().toISOString(), total: report.length, dead }, null, 2));
console.log(`[check-links] ${report.length} checked, ${dead.length} dead`);

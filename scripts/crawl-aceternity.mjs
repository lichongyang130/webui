// #51 官网爬虫:抓 ui.aceternity.com/components 列表 -> data/aceternity-crawl.json
// #52 diff 提醒:--webhook=https://xxx 时,把新增组件 POST 到 webhook
// 用法: node scripts/crawl-aceternity.mjs [--webhook=URL]
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "data", "aceternity-crawl.json");
mkdirSync(join(root, "data"), { recursive: true });

const webhook = process.argv.find((a) => a.startsWith("--webhook="))?.split("=")[1];

const res = await fetch("https://ui.aceternity.com/components", {
  headers: { "user-agent": "Mozilla/5.0 (webui-admin-crawler)" },
  signal: AbortSignal.timeout(20000),
});
const html = await res.text();

// 解析组件卡片:<a href="/components/slug"> + 标题/描述
const items = [];
const re = /href="\/(components|blocks)\/([\w-]+)"[^>]*>\s*\\*\\*\s*!?\[?[^]*?\\\n\\\n([^\\\n]+)\\\n\\\n([^\\\n\]]+)/g;
let m;
while ((m = re.exec(html))) {
  items.push({ type: m[1], slug: m[2], name: m[3].trim(), description: m[4].trim(), url: `https://ui.aceternity.com/${m[1]}/${m[2]}` });
}
// 兜底:简单 href 收集
if (items.length === 0) {
  const re2 = /href="\/components\/([\w-]+)"/g;
  const seen = new Set();
  while ((m = re2.exec(html))) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      items.push({ type: "components", slug: m[1], name: m[1], description: "", url: `https://ui.aceternity.com/components/${m[1]}` });
    }
  }
}

const prev = existsSync(out) ? JSON.parse(readFileSync(out, "utf8")) : { items: [] };
const prevKeys = new Set(prev.items.map((i) => i.url));
const added = items.filter((i) => !prevKeys.has(i.url));

writeFileSync(out, JSON.stringify({ crawled_at: new Date().toISOString(), items }, null, 2));
console.log(`[crawl] ${items.length} items, +${added.length} new`);

if (webhook && added.length) {
  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source: "aceternity", added }),
    signal: AbortSignal.timeout(10000),
  }).catch((e) => console.log("[crawl] webhook failed:", e.message));
  console.log(`[crawl] webhook notified (${added.length} new)`);
}

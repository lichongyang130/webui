// 二级分类对齐官方 /categories 栏目体系,全部中文命名(19 个)
import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("server/data.db");
const sec = db.prepare("SELECT id FROM sections WHERE slug='aceternity'").get();

// [slug, 中文名, 排序]
const CATS = [
  ["background", "背景效果", 1],
  ["text", "文字动效", 2],
  ["card", "卡片组件", 3],
  ["grid-layout", "网格布局", 4],
  ["hero", "首屏区块", 5],
  ["navigation", "导航菜单", 6],
  ["button", "按钮", 7],
  ["form", "表单输入", 8],
  ["carousel", "轮播滑动", 9],
  ["loader", "加载指示", 10],
  ["modal-tooltip", "弹层与切换", 11],
  ["scroll", "滚动动效", 12],
  ["hover", "悬停交互", 13],
  ["three-d", "3D与地图", 14],
  ["media", "图片媒体", 15],
  ["terminal-code", "终端与代码", 16],
  ["testimonials", "评价展示", 17],
  ["blocks", "页面区块合集", 18],
  ["templates", "官网模板", 19],
];

// 组件 slug → 分类(111 个免费组件逐条归入)
const MAP = {};
const put = (cat, slugs) => slugs.forEach((s) => (MAP[s] = cat));
put("background", ["cloud-shader","dotted-glow-background","noise-background","scales","background-beams-with-collision","background-lines","background-ripple-effect","aurora-background","background-beams","background-gradient-animation","canvas-reveal-effect","glowing-stars-effect","grid-and-dot-backgrounds","lamp-effect","meteors","shooting-stars-and-stars-background","sparkles","spotlight-new","spotlight","vortex","wavy-background","background-boxes","background-gradient","hero-highlight"]);
put("text", ["text-flipping-board","squiggly-text","encrypted-text","colourful-text","text-hover-effect","google-gemini-effect","container-text-flip","layout-text-flip","pointer-highlight","flip-words","text-generate-effect","typewriter-effect"]);
put("card", ["card-spotlight","comet-card","container-cover","draggable-card","expandable-card","card-stack","evervault-card","glare-card","text-reveal-card","wobble-card","3d-pin"]);
put("grid-layout", ["bento-grid","layout-grid"]);
put("hero", ["macbook-scroll","parallax-hero-images","container-scroll-animation","hero-parallax"]);
put("navigation", ["notch","floating-dock","resizable-navbar","sticky-banner","sidebar","floating-navbar","navbar-menu"]);
put("button", ["magnetic-button","stateful-button","moving-border","tailwindcss-buttons"]);
put("form", ["gooey-input","file-upload","signup-form","placeholders-and-vanish-input"]);
put("carousel", ["apple-cards-carousel","carousel","infinite-moving-cards","images-slider","3d-marquee"]);
put("loader", ["loader","multi-step-loader"]);
put("modal-tooltip", ["tooltip-card","animated-modal","animated-tooltip","link-preview","tabs"]);
put("scroll", ["tracing-beam","sticky-scroll-reveal","parallax-scroll","timeline"]);
put("hover", ["focus-cards","glowing-effect","svg-mask-effect","hover-border-gradient","card-hover-effect","direction-aware-hover","following-pointer"]);
put("three-d", ["3d-card-effect","3d-globe","world-map","github-globe"]);
put("media", ["chromatic-image","ascii-art","canvas-text","dither-shader","images-badge","webcam-pixel-grid","compare","lens","pixelated-canvas"]);
put("terminal-code", ["terminal","keyboard","code-block"]);
put("testimonials", ["animated-testimonials"]);
put("blocks", ["feature-sections-free","hero-sections-free","cards-free"]);

// 1) 升级分类表(同 slug 复用改中文名,新 slug 插入)
const up = db.prepare("UPDATE categories SET name=?, sort=?, description=? WHERE section_id=? AND slug=?");
const ins = db.prepare("INSERT INTO categories (section_id,slug,name,description,sort) VALUES (?,?,?,?,?)");
for (const [slug, name, sort] of CATS) {
  const ex = db.prepare("SELECT id FROM categories WHERE section_id=? AND slug=?").get(sec.id, slug);
  if (ex) up.run(name, sort, name, sec.id, slug);
  else ins.run(sec.id, slug, name, name, sort);
}

// 2) 条目重新归类(blocks/templates 按 URL 类型,组件按映射表)
const catId = Object.fromEntries(db.prepare("SELECT slug,id FROM categories WHERE section_id=?").all(sec.id).map((r) => [r.slug, r.id]));
const items = db.prepare("SELECT id,url FROM items WHERE section_id=?").all(sec.id);
let mapped = 0;
const unmapped = [];
for (const it of items) {
  const kind = it.url.includes("/blocks/") ? "blocks" : it.url.includes("/templates/") ? "templates" : null;
  const slug = it.url.match(/(?:components|blocks|templates)\/([\w-]+)/)?.[1];
  const cat = kind || MAP[slug];
  if (!cat) { unmapped.push(slug); continue; }
  db.prepare("UPDATE items SET category_id=? WHERE id=?").run(catId[cat], it.id);
  mapped++;
}

// 3) 删除不再使用的旧分类
const used = new Set(db.prepare("SELECT DISTINCT category_id FROM items WHERE section_id=?").all(sec.id).map((r) => r.category_id));
const gone = db.prepare("SELECT id,slug FROM categories WHERE section_id=?").all(sec.id).filter((c) => !used.has(c.id));
for (const c of gone) db.prepare("DELETE FROM categories WHERE id=?").run(c.id);

console.log(JSON.stringify({ mapped, unmapped, deleted: gone.map((c) => c.slug) }));

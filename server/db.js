// Node >= 22 内置 SQLite,零依赖、免编译
const { DatabaseSync } = require("node:sqlite");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const DB_PATH = process.env.DB_PATH || path.join(__dirname, "data.db");
const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const calc = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(calc, "hex"));
}

function initDb() {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    url TEXT,
    icon TEXT,
    color TEXT DEFAULT '#22d3ee',
    description TEXT,
    sort INTEGER DEFAULT 0,
    enabled INTEGER DEFAULT 1
  );
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER NOT NULL,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    sort INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    url TEXT,
    description TEXT,
    tags TEXT DEFAULT '[]',
    tech TEXT,
    cover_image TEXT,
    status TEXT DEFAULT 'pending',
    starred INTEGER DEFAULT 0,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT UNIQUE NOT NULL,
    title TEXT,
    screen TEXT,
    linked_item_id INTEGER,
    created_at TEXT DEFAULT (datetime('now'))
  );
  `);

  const userCount = db.prepare("SELECT COUNT(*) c FROM users").get().c;
  if (userCount === 0) {
    db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)").run(
      "admin",
      hashPassword(process.env.ADMIN_PASSWORD || "admin123")
    );
  }

  const sectionCount = db.prepare("SELECT COUNT(*) c FROM sections").get().c;
  if (sectionCount === 0) seed();
}

function seed() {
  const sections = [
    ["aceternity", "Aceternity UI", "https://ui.aceternity.com", "sparkles", "#22d3ee", "React/Next.js 动效组件库,Components + Blocks 两大体系", 1],
    ["motionsites", "MotionSites", "https://motionsites.ai", "clapperboard", "#f472b6", "AI 设计提示词库,按行业分类的 Hero / Landing 模板", 2],
    ["reactbits", "React Bits", "https://reactbits.dev", "blocks", "#a78bfa", "170+ 动画 React 组件:文本动画、动画、背景、组件", 3],
    ["uiverse", "Uiverse", "https://uiverse.io", "galaxy", "#34d399", "7400+ 社区开源 UI 元素,CSS/Tailwind 可复制", 4],
    ["animejs", "Anime.js", "https://animejs.com", "zap", "#f59e0b", "JavaScript 动画引擎,文档 16 章归为 5 组", 5],
  ];
  const insSection = db.prepare(
    "INSERT INTO sections (slug,name,url,icon,color,description,sort) VALUES (?,?,?,?,?,?,?)"
  );
  const sectionIds = {};
  for (const s of sections) sectionIds[s[0]] = insSection.run(...s).lastInsertRowid;

  const categories = {
    aceternity: [
      ["backgrounds", "组件 · 背景特效", "Beams / Aurora / Grid / Meteors / Noise 等"],
      ["cards", "组件 · 卡片", "3D Card / Evervault / Spotlight / Glare 等"],
      ["text", "组件 · 文字特效", "Flip Words / Typewriter / Tracing Beam 等"],
      ["interaction", "组件 · 交互与导航", "Floating Dock / Lens / Tooltip / Navbar 等"],
      ["blocks", "Blocks · 页面区块", "Hero / Features / Pricing / Testimonials / CTA / Footer"],
    ],
    motionsites: [
      ["saas", "SaaS", "SaaS / AI 产品类 Hero 与落地页提示词"],
      ["hero", "Hero Section", "通用 Hero 区块提示词"],
      ["landing", "Landing Page", "完整落地页提示词"],
      ["portfolio", "Portfolio", "个人作品集类"],
      ["agency", "Agency", "机构 / 视频工作室类"],
      ["web3", "Web3 / Fintech", "加密与金融类"],
      ["misc", "组件与演示", "Loader、投资 Deck、社交图等"],
    ],
    reactbits: [
      ["text-animations", "Text Animations", "文字动画组件"],
      ["animations", "Animations", "交互动画组件"],
      ["backgrounds", "Backgrounds", "动画背景组件"],
      ["components", "Components", "通用创意组件"],
      ["tools", "Visual Editor 工具", "官方三个可视化编辑器"],
    ],
    uiverse: [
      ["buttons", "Buttons", "按钮元素"],
      ["cards", "Cards", "卡片元素"],
      ["loaders", "Loaders", "加载器"],
      ["inputs", "Inputs", "输入框 / 表单"],
      ["toggles", "开关 / 复选框", "Switch / Checkbox"],
      ["others", "其他", "其余元素"],
    ],
    animejs: [
      ["basics", "基础", "Getting started / Timer"],
      ["core", "核心 API", "Animation / Timeline / Animatable"],
      ["interaction", "交互", "Draggable / Layout / Events / Scope"],
      ["effects", "效果", "SVG / Text / Easings"],
      ["advanced", "进阶", "Utilities / WAAPI / Engine / Adapters"],
    ],
  };
  const insCat = db.prepare(
    "INSERT INTO categories (section_id,slug,name,description,sort) VALUES (?,?,?,?,?)"
  );
  const catIds = {};
  for (const [sec, list] of Object.entries(categories)) {
    list.forEach((c, i) => {
      catIds[`${sec}/${c[0]}`] = insCat.run(sectionIds[sec], c[0], c[1], c[2], i + 1).lastInsertRowid;
    });
  }

  const A = "https://ui.aceternity.com/components/";
  const items = [
    // aceternity
    ["aceternity/backgrounds", "Background Beams", A + "background-beams", ["background", "beams", "hero"], "SVG 路径光束背景,适合 Hero", "/design/01-hero-background-beams.png"],
    ["aceternity/backgrounds", "Background Beams With Collision", A + "background-beams-with-collision", ["background", "beams"], "碰撞爆炸光束背景", ""],
    ["aceternity/backgrounds", "Aurora Background", A + "aurora-background", ["background", "aurora"], "极光背景", ""],
    ["aceternity/backgrounds", "Grid & Dot Backgrounds", A + "grid-and-dot-backgrounds", ["background", "grid"], "网格与点阵背景", ""],
    ["aceternity/backgrounds", "Noise Background", A + "noise-background", ["background", "noise"], "动态渐变噪点背景", ""],
    ["aceternity/backgrounds", "Dotted Glow Background", A + "dotted-glow-background", ["background", "glow"], "点阵发光背景", ""],
    ["aceternity/backgrounds", "Background Gradient Animation", A + "background-gradient-animation", ["background", "gradient"], "平滑渐变动画背景", ""],
    ["aceternity/cards", "Card Spotlight", A + "card-spotlight", ["card", "spotlight", "hover"], "聚光灯揭示卡片", "/design/02-card-spotlight.png"],
    ["aceternity/cards", "3D Card Effect", A + "3d-card-effect", ["card", "3d"], "透视抬升 3D 卡片", ""],
    ["aceternity/cards", "Evervault Card", A + "evervault-card", ["card", "gradient", "encrypted"], "加密文字混合渐变卡", "/design/04-evervault-card.png"],
    ["aceternity/cards", "Glare Card", A + "glare-card", ["card", "glare"], "Linear 式悬停眩光卡", ""],
    ["aceternity/cards", "Card Stack", A + "card-stack", ["card", "stack"], "定时堆叠轮播卡片", ""],
    ["aceternity/cards", "Focus Cards", A + "focus-cards", ["card", "blur"], "悬停聚焦、其余模糊", ""],
    ["aceternity/text", "Flip Words", A + "flip-words", ["text", "flip"], "词组翻转切换", ""],
    ["aceternity/text", "Encrypted Text", A + "encrypted-text", ["text", "scramble"], "乱码解密文字", ""],
    ["aceternity/text", "Tracing Beam", A + "tracing-beam", ["text", "beam", "scroll"], "滚动追踪光束", ""],
    ["aceternity/text", "Text Hover Effect", A + "text-hover-effect", ["text", "hover"], "x.ai 式描边悬停文字", ""],
    ["aceternity/text", "Container Text Flip", A + "container-text-flip", ["text", "flip"], "宽度动画翻词容器", ""],
    ["aceternity/interaction", "Infinite Moving Cards", A + "infinite-moving-cards", ["marquee", "testimonial"], "无限循环跑马灯卡片", "/design/05-infinite-moving-cards.png"],
    ["aceternity/interaction", "Floating Dock", A + "floating-dock", ["nav", "dock"], "macOS 式悬浮 Dock 导航", ""],
    ["aceternity/interaction", "Lens", A + "lens", ["lens", "zoom"], "镜片放大组件", ""],
    ["aceternity/interaction", "Resizable Navbar", A + "resizable-navbar", ["nav", "scroll"], "滚动收缩导航栏", ""],
    ["aceternity/interaction", "Animated Tooltip", A + "animated-tooltip", ["tooltip", "hover"], "跟随悬停动画提示", ""],
    ["aceternity/interaction", "3D Marquee", A + "3d-marquee", ["marquee", "3d"], "3D 跑马灯展示", ""],
    ["aceternity/blocks", "Bento Grid", A + "bento-grid", ["bento", "grid", "features"], "斜切便当格布局", "/design/03-bento-grid.png"],
    ["aceternity/blocks", "Hero Sections", "https://ui.aceternity.com/blocks/hero-sections", ["hero", "block"], "23+ Hero 区块合集", ""],
    ["aceternity/blocks", "Feature Sections", "https://ui.aceternity.com/blocks/feature-sections", ["features", "block"], "22+ 特性区块合集", ""],
    ["aceternity/blocks", "Pricing Sections", "https://ui.aceternity.com/blocks/pricing-sections", ["pricing", "block"], "定价区块合集", ""],
    ["aceternity/blocks", "Testimonials", "https://ui.aceternity.com/blocks/testimonials", ["testimonial", "block"], "证言区块合集", ""],
    // reactbits
    ["reactbits/backgrounds", "Aurora", "https://reactbits.dev/backgrounds/aurora", ["background", "aurora"], "极光动画背景", ""],
    ["reactbits/backgrounds", "Beams", "https://reactbits.dev/backgrounds/beams", ["background", "beams"], "光束背景", ""],
    ["reactbits/backgrounds", "Dot Field", "https://reactbits.dev/backgrounds/dot-field", ["background", "dots"], "点阵场背景", ""],
    ["reactbits/backgrounds", "Line Waves", "https://reactbits.dev/backgrounds/line-waves", ["background", "waves"], "线波背景", ""],
    ["reactbits/backgrounds", "Ballpit", "https://reactbits.dev/backgrounds/ballpit", ["background", "3d"], "球池物理背景", ""],
    ["reactbits/backgrounds", "CRT Warp", "https://reactbits.dev/backgrounds/crt-warp", ["background", "retro"], "CRT 扭曲背景(新)", ""],
    ["reactbits/animations", "Blob Cursor", "https://reactbits.dev/animations/blob-cursor", ["cursor", "blob"], "斑点跟随光标", ""],
    ["reactbits/animations", "Splash Cursor", "https://reactbits.dev/animations/splash-cursor", ["cursor", "fluid"], "流体溅射光标", ""],
    ["reactbits/animations", "Pixel Trail", "https://reactbits.dev/animations/pixel-trail", ["cursor", "pixel"], "像素拖尾光标", ""],
    ["reactbits/animations", "Magnet Lines", "https://reactbits.dev/animations/magnet-lines", ["magnetic", "lines"], "磁力线交互", ""],
    ["reactbits/animations", "Metallic Paint", "https://reactbits.dev/animations/metallic-paint", ["metallic", "interactive"], "金属漆交互效果", ""],
    // uiverse(以官方 tag 页作二级入口)
    ["uiverse/buttons", "Button 元素合集", "https://uiverse.io/tags/button", ["button"], "社区按钮元素 tag 页", ""],
    ["uiverse/cards", "Card 元素合集", "https://uiverse.io/tags/card", ["card"], "社区卡片元素 tag 页", ""],
    ["uiverse/loaders", "Loader 元素合集", "https://uiverse.io/tags/loader", ["loader"], "社区加载器 tag 页", ""],
    ["uiverse/inputs", "Input 元素合集", "https://uiverse.io/tags/input", ["input", "form"], "社区输入框 tag 页", ""],
    ["uiverse/toggles", "Switch 元素合集", "https://uiverse.io/tags/switch", ["switch", "toggle"], "社区开关 tag 页", ""],
    ["uiverse/others", "全量元素浏览", "https://uiverse.io/elements", ["all"], "4456+ CSS/Tailwind 元素", ""],
    // motionsites
    ["motionsites/saas", "Apex SaaS", "https://motionsites.ai/", ["saas", "dark"], "深色 SaaS Hero 提示词", ""],
    ["motionsites/saas", "Synapse Dark Hero", "https://motionsites.ai/", ["saas", "ai"], "AI SaaS 深色 Hero", ""],
    ["motionsites/hero", "Aethera Studio", "https://motionsites.ai/", ["hero", "studio"], "工作室 Hero 提示词", ""],
    ["motionsites/hero", "Railroad.ai", "https://motionsites.ai/", ["hero", "ai"], "AI 铁路主题 Hero", ""],
    ["motionsites/landing", "E-commerce Website", "https://motionsites.ai/", ["ecommerce"], "电商落地页提示词", ""],
    ["motionsites/portfolio", "Bold Portfolio Hero", "https://motionsites.ai/", ["portfolio", "bold"], "大胆作品集 Hero", ""],
    ["motionsites/agency", "Buzzentic Agency", "https://motionsites.ai/", ["agency"], "机构站提示词", ""],
    ["motionsites/web3", "Orbit Web3", "https://motionsites.ai/", ["web3", "nft"], "Web3 Hero 提示词", ""],
    ["motionsites/web3", "Wealth Video Hero", "https://motionsites.ai/", ["fintech", "video"], "金融视频 Hero", ""],
    ["motionsites/misc", "Investor Deck", "https://motionsites.ai/", ["deck", "presentation"], "投资人演示 Deck", ""],
    // animejs
    ["animejs/basics", "Getting started", "https://animejs.com/documentation/getting-started", ["docs"], "入门指南", ""],
    ["animejs/basics", "Timer", "https://animejs.com/documentation/timer", ["timer"], "定时器 API", ""],
    ["animejs/core", "Animation", "https://animejs.com/documentation/animation", ["animation"], "核心动画 API", ""],
    ["animejs/core", "Timeline", "https://animejs.com/documentation/timeline", ["timeline"], "时间线编排", ""],
    ["animejs/core", "Animatable", "https://animejs.com/documentation/animatable", ["animatable"], "可动画值绑定", ""],
    ["animejs/interaction", "Draggable", "https://animejs.com/documentation/draggable", ["drag"], "拖拽模块", ""],
    ["animejs/interaction", "Layout", "https://animejs.com/documentation/layout", ["layout", "flip"], "FLIP 布局动画", ""],
    ["animejs/interaction", "Events", "https://animejs.com/documentation/events", ["events"], "事件系统", ""],
    ["animejs/effects", "SVG", "https://animejs.com/documentation/svg", ["svg"], "SVG 动画", ""],
    ["animejs/effects", "Text", "https://animejs.com/documentation/text", ["text"], "文字拆分动画", ""],
    ["animejs/effects", "Easings", "https://animejs.com/documentation/easings", ["easing"], "缓动函数库", ""],
    ["animejs/advanced", "WAAPI", "https://animejs.com/documentation/web-animation-api", ["waapi"], "Web Animations API 桥接", ""],
    ["animejs/advanced", "Engine", "https://animejs.com/documentation/engine", ["engine"], "渲染引擎", ""],
  ];
  const insItem = db.prepare(
    `INSERT INTO items (section_id,category_id,name,url,tags,description,cover_image,status,starred)
     VALUES (?,?,?,?,?,?,?,?,?)`
  );
  for (const it of items) {
    const [key, name, url, tags, desc, cover] = it;
    const [sec, cat] = key.split("/");
    insItem.run(
      sectionIds[sec],
      catIds[key],
      name,
      url,
      JSON.stringify(tags),
      desc,
      cover,
      "published",
      cover ? 1 : 0
    );
  }

  // 资产:扫描 design 目录
  const designDir = path.join(__dirname, "..", "design");
  if (fs.existsSync(designDir)) {
    const insAsset = db.prepare(
      "INSERT OR IGNORE INTO assets (path,title,screen,linked_item_id) VALUES (?,?,?,?)"
    );
    const linkMap = {
      "01-hero-background-beams": "Background Beams",
      "02-card-spotlight": "Card Spotlight",
      "03-bento-grid": "Bento Grid",
      "04-evervault-card": "Evervault Card",
      "05-infinite-moving-cards": "Infinite Moving Cards",
    };
    const files = fs.readdirSync(designDir).filter((f) => f.endsWith(".png")).sort();
    for (const f of files) {
      const base = f.replace(/\.png$/, "").replace(/-v\d+$/, "");
      const linked = linkMap[base]
        ? db.prepare("SELECT id FROM items WHERE name = ?").get(linkMap[base])?.id || null
        : null;
      const screen = {
        "01-hero-background-beams": "01 Hero + Background Beams",
        "02-card-spotlight": "02 Card Spotlight",
        "03-bento-grid": "03 Bento Grid",
        "04-evervault-card": "04 Evervault Card",
        "05-infinite-moving-cards": "05 Infinite Moving Cards",
      }[base];
      insAsset.run(`/design/${f}`, f.replace(/\.png$/, ""), screen || null, linked);
    }
  }
}

module.exports = { db, initDb, hashPassword, verifyPassword };

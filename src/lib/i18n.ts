import "server-only";
import { cookies, headers } from "next/headers";

export type Lang = "en" | "zh";

export const LANG_COOKIE = "mv_lang";

export async function getLang(): Promise<Lang> {
  const c = await cookies();
  return c.get(LANG_COOKIE)?.value === "zh" ? "zh" : "en";
}

/** Server-side: detect language without cookies() (used by lang action context). */
export async function getLangFromHeaders(): Promise<Lang> {
  const h = await headers();
  return h.get("x-mv-lang") === "zh" ? "zh" : getLang();
}

export type Dict = Record<string, { en: string; zh: string }>;

export const DICT: Dict = {
  // nav
  navTemplates: { en: "Templates", zh: "网站模板" },
  navComponents: { en: "Components", zh: "动画组件" },
  navElements: { en: "UI Elements", zh: "UI 元素" },
  navAnimations: { en: "Animations", zh: "动画片段" },
  navSearch: { en: "Search", zh: "搜索" },
  navAdmin: { en: "Admin", zh: "管理中心" },
  navFavorites: { en: "Favorites", zh: "我的收藏" },
  navSubmit: { en: "Submit", zh: "投稿" },

  // home
  heroBadge: {
    en: "{n} curated assets · every one ships with an AI prompt",
    zh: "{n} 个精选资源 · 每个都附带可直接复制的 AI Prompt",
  },
  heroCtaExplore: { en: "Explore the vault", zh: "探索资源库" },
  heroCtaTemplates: { en: "Browse templates", zh: "浏览模板" },
  statAssets: { en: "Assets", zh: "资源" },
  statStars: { en: "GitHub stars", zh: "GitHub 星标" },
  statCopies: { en: "Prompts copied", zh: "Prompt 复制" },
  statPreviews: { en: "Live previews", zh: "实时预览" },
  sectionVaults: { en: "Five source sites", zh: "五大宝藏网站" },
  sectionVaultsTitle: {
    en: "Everything the 5 treasure sites have — unified",
    zh: "五大宝藏网站，一个资源库全部集齐",
  },
  enterVault: { en: "Enter vault", zh: "进入资源库" },
  featuredKicker: { en: "Featured this week", zh: "本周精选" },
  featuredTitle: { en: "Hand-picked live previews", zh: "精选实时预览" },
  viewAll: { en: "View all", zh: "查看全部" },
  howTitle: { en: "How the vault works", zh: "资源库使用指南" },
  step1Title: { en: "Preview it live", zh: "实时预览" },
  step1Desc: {
    en: "Every asset runs in a sandboxed iframe — real HTML/CSS/JS, no videos, no screenshots. Hover cards even render the live thing.",
    zh: "每个资源都在沙箱 iframe 中真实运行 —— 真实 HTML/CSS/JS，不是视频也不是截图，卡片缩略图本身就是实时效果。",
  },
  step2Title: { en: "Copy the AI prompt", zh: "复制 AI Prompt" },
  step2Desc: {
    en: "Each item has a battle-tested, detail-rich prompt. Paste it into Cursor, Claude Code, Codex, v0 or any AI coding tool.",
    zh: "每个资源都配有经过验证、细节充分的 Prompt，粘贴到 Cursor、Claude Code、Codex、v0 或任何 AI 编程工具即可。",
  },
  step3Title: { en: "Ship in one click", zh: "一键生成上线" },
  step3Desc: {
    en: "Or grab the raw source and drop it straight into your project. Templates, components, elements and motion — all yours.",
    zh: "也可以直接复制源码放进项目。模板、组件、元素、动效 —— 随取随用。",
  },
  newestKicker: { en: "Fresh in the vault", zh: "最新上架" },
  newestTitle: { en: "Latest additions", zh: "最新添加" },
  ctaTitle: {
    en: "Stop designing AI sites that feel flat",
    zh: "别再让 AI 写出来的网站缺乏设计感和质感",
  },
  ctaDesc: {
    en: "Grab a prompt, paste it into your AI coding tool, and ship a site with real texture and motion — in minutes, not days.",
    zh: "复制一条 Prompt，粘贴进 AI 编程工具，几分钟即可上线一个真正有质感、有动效的网站。",
  },
  ctaStart: { en: "Start exploring", zh: "开始探索" },
  ctaAdmin: { en: "Admin center", zh: "管理中心" },

  // marquee
  mq1: { en: "✦ MOTION SITES", zh: "✦ 网站模板" },
  mq2: { en: "◈ REACT BITS", zh: "◈ 动画组件" },
  mq3: { en: "✧ UIVERSE", zh: "✧ UI 元素" },
  mq4: { en: "➤ ANIME.JS", zh: "➤ 动画片段" },
  mq5: { en: "✺ ACETERNITY UI", zh: "✺ 五站合一" },
  mq6: { en: "✦ ALL IN ONE VAULT", zh: "✦ 全部在这" },
  mq7: { en: "◈ COPY THE PROMPT", zh: "◈ 复制 Prompt" },
  mq8: { en: "✧ SHIP IN MINUTES", zh: "✧ 分钟级上线" },

  // category / explore headers
  assets: { en: "assets", zh: "个资源" },
  exploreKicker: { en: "The whole vault", zh: "全部资源" },
  exploreTitle: { en: "Explore everything", zh: "探索全部资源" },
  exploreDesc: {
    en: "Templates, components, UI elements and animation snippets — searchable, filterable, and every single one runs live in your browser.",
    zh: "网站模板、动画组件、UI 元素和动画片段 —— 可搜索、可筛选，每一个都能在浏览器中实时运行。",
  },

  // browser
  searchPlaceholder: { en: "Search titles, tags, authors…", zh: "搜索标题、标签、作者……" },
  allTech: { en: "All tech", zh: "全部技术" },
  sortPopular: { en: "Most viewed", zh: "最多浏览" },
  sortCopies: { en: "Most copied", zh: "最多复制" },
  sortNewest: { en: "Newest", zh: "最新" },
  sortAz: { en: "A → Z", zh: "按字母" },
  allVaults: { en: "All vaults", zh: "全部资源库" },
  tagsLabel: { en: "Tags:", zh: "标签：" },
  tagAll: { en: "all", zh: "全部" },
  assetCount: { en: "asset", zh: "个资源" },
  assetCountPlural: { en: "assets", zh: "个资源" },
  tagged: { en: "tagged", zh: "标签" },
  emptyTitle: { en: "Nothing in this corner of the vault", zh: "这个角落还没有资源" },
  emptyDesc: { en: "Try a different search term or clear the filters.", zh: "换个关键词试试，或清除筛选条件。" },
  clearFilters: { en: "Clear filters", zh: "清除筛选" },

  // card
  featuredBadge: { en: "Featured", zh: "精选" },
  livePreviewInside: { en: "Live preview inside", zh: "点击查看实时预览" },
  open: { en: "Open", zh: "打开" },

  // detail
  crumbHome: { en: "Home", zh: "首页" },
  tabPreview: { en: "Live Preview", zh: "实时预览" },
  tabSource: { en: "Source Code", zh: "源代码" },
  tabReact: { en: "React (TSX)", zh: "React 组件" },
  tabPrompt: { en: "AI Prompt", zh: "AI Prompt" },
  copied: { en: "Copied!", zh: "已复制！" },
  copyHtml: { en: "Copy HTML", zh: "复制 HTML" },
  copyPrompt: { en: "Copy prompt", zh: "复制 Prompt" },
  copyAiPrompt: { en: "Copy AI prompt", zh: "复制 AI Prompt" },
  copySourceHtml: { en: "Copy source HTML", zh: "复制 HTML 源码" },
  copyTsx: { en: "Copy TSX", zh: "复制 TSX" },
  downloadTsx: { en: "Download .tsx", zh: "下载 .tsx" },
  originalSite: { en: "Original site", zh: "灵感来源" },
  inspiredBy: { en: "Inspired by", zh: "灵感来源" },
  opening: { en: "Opening…", zh: "打开中…" },
  metaStars: { en: "stars", zh: "星标" },
  metaViews: { en: "views", zh: "浏览" },
  metaCopies: { en: "copies", zh: "复制" },
  curatedBy: { en: "Curated by", zh: "作者" },
  added: { en: "Added", zh: "添加于" },
  tagsTitle: { en: "Tags", zh: "标签" },
  reactNote: {
    en: "React + Tailwind + TypeScript component — drop it into any Next.js / Vite project.",
    zh: "React + Tailwind + TypeScript 组件 —— 可直接放入 Next.js / Vite 项目。",
  },
  promptTip: {
    en: "Paste this prompt into Cursor, Claude Code, Codex, v0 or any AI coding tool to reproduce the asset 1:1. Works with domestic large models too.",
    zh: "把这条 Prompt 粘贴到 Cursor、Claude Code、Codex、v0 或任何 AI 编程工具，即可 1:1 还原该效果，国产大模型同样适用。",
  },
  relatedTitle: { en: "More from", zh: "更多相关资源" },

  // footer
  footerAbout: {
    en: "The treasure vault for animated web design. Full site templates, advanced components, UI micro-elements and animation snippets — each with live preview, source code and an AI prompt. Inspired by Motion Sites, React Bits, Uiverse, Anime.js and Aceternity UI.",
    zh: "动画网站设计的宝藏资源库：整套网站模板、高级动画组件、UI 微元素和动画片段 —— 每个都配有实时预览、源码和 AI Prompt。灵感来自 Motion Sites、React Bits、Uiverse、Anime.js 和 Aceternity UI。",
  },
  footerVaults: { en: "Vault sections", zh: "资源库" },
  footerMore: { en: "More", zh: "更多" },
  footerExplore: { en: "Explore everything", zh: "全部资源" },
  footerAdmin: { en: "Admin center", zh: "管理中心" },
  footerStack: { en: "Built with Next.js · Tailwind", zh: "Next.js · Tailwind 构建" },
  footerRights: { en: "© 2026 MotionVault — curated for builders who ship.", zh: "© 2026 MotionVault —— 为高效交付的开发者而整理" },

  // favorites
  favoritesTitle: { en: "Your favorites", zh: "我的收藏" },
  favoritesDesc: { en: "Assets you saved — stored in your browser.", zh: "你收藏的资源 —— 保存在浏览器本地。" },
  favoritesEmpty: { en: "No favorites yet", zh: "还没有收藏" },
  favoritesEmptyDesc: { en: "Tap the ♥ on any asset card to save it here.", zh: "点击任意资源卡片上的 ♥ 即可收藏到这里。" },
  favoritesBrowse: { en: "Browse the vault", zh: "去逛逛资源库" },
  saved: { en: "Saved", zh: "已收藏" },
  save: { en: "Save", zh: "收藏" },

  // theme
  themeDark: { en: "Dark", zh: "深色" },
  themeLight: { en: "Light", zh: "浅色" },

  // submit
  submitTitle: { en: "Submit an asset", zh: "投稿一个资源" },
  submitDesc: {
    en: "Built something animated? Share it — accepted submissions join the vault and get their own live preview page.",
    zh: "做了什么炫酷的动画效果？投稿给我们 —— 审核通过后将进入资源库，拥有自己的实时预览页。",
  },
};

export function t(
  lang: Lang,
  key: keyof typeof DICT | string,
  params?: Record<string, string | number>
): string {
  const entry: { en: string; zh: string } | undefined = DICT[key as string];
  if (!entry) return key;
  let str: string = entry[lang] ?? entry.en;
  if (params)
    for (const [k, v] of Object.entries(params)) str = str.replace(`{${k}}`, String(v));
  return str;
}

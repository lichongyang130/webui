import { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "templates",
    name: "Site Templates",
    nameZh: "网站模板",
    tagline: "Full animated websites",
    taglineZh: "整套动画网站",
    description:
      "Complete, ready-to-ship animated website templates. Each one ships with a battle-tested AI prompt — paste it into Cursor, Claude Code, Codex or any AI coding tool to reproduce the whole site in one click.",
    descriptionZh:
      "可直接上线的完整动画网站模板。每个模板都附带经过验证的 AI Prompt —— 复制粘贴到 Cursor、Claude Code、Codex 或任何 AI 编程工具，即可一键还原整个网站。",
    icon: "layout-template",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "components",
    name: "Components",
    nameZh: "动画组件",
    tagline: "Advanced animated components",
    taglineZh: "高级动画组件",
    description:
      "Hundreds of production-grade animated components — starry backgrounds, circular galleries, glowing cards, magnetic buttons and scroll-driven scenes. Spot one you like, copy the prompt, done.",
    descriptionZh:
      "生产级高级动画组件 —— 星空背景、环形画廊、光效卡片、磁性按钮、滚动联动场景。看中哪个，复制 Prompt 即可生成。",
    icon: "blocks",
    accent: "from-fuchsia-500 to-cyan-400",
  },
  {
    slug: "elements",
    name: "UI Elements",
    nameZh: "UI 元素",
    tagline: "Buttons, loaders, toggles",
    taglineZh: "按钮 · 加载 · 开关",
    description:
      "Thousands of free open-source UI micro-elements — buttons, loaders, checkboxes, toggles, inputs. Pure HTML/CSS, grab the source and drop it straight into your project.",
    descriptionZh:
      "海量免费开源 UI 微元素 —— 按钮、加载器、复选框、开关、输入框。纯 HTML/CSS，源码直接复制到你的项目中。",
    icon: "toggle-left",
    accent: "from-cyan-400 to-emerald-400",
  },
  {
    slug: "animations",
    name: "Animations",
    nameZh: "动画片段",
    tagline: "Spring, drag & scroll motion",
    taglineZh: "弹簧 · 拖拽 · 滚动动效",
    description:
      "Standalone animation snippets powered by vanilla JS and Anime.js-style physics — springs, drag-and-drop, scroll-linked parallax, staggered timelines. Copy the code, replicate 1:1.",
    descriptionZh:
      "基于原生 JS 与 Anime.js 风格物理的独立动画片段 —— 弹簧、拖拽、滚动视差、交错时间线。复制代码，1:1 还原。",
    icon: "sparkles",
    accent: "from-amber-400 to-rose-500",
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export const TECH_LABELS: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  react: "React",
  tailwind: "Tailwind",
  gsap: "GSAP",
  animejs: "Anime.js",
  framer: "Framer Motion",
};

import type { CategorySlug } from "./types";
import { TECH_LABELS } from "./categories";

/**
 * The five "treasure" source sites that MotionVault fuses together.
 * These are the LEVEL-1 navigation sections.
 */
export interface SourceSite {
  id: string;
  name: string;
  nameZh: string;
  url: string;
  /** Primary category landing page this source maps to. */
  category: CategorySlug;
  icon: string;
  accent: string; // tailwind gradient classes
  desc: string;
  descZh: string;
}

export const SITES: SourceSite[] = [
  {
    id: "motion-sites",
    name: "Motion Sites",
    nameZh: "网站模板",
    url: "https://motionsites.ai",
    category: "templates",
    icon: "layout-template",
    accent: "from-violet-500 to-fuchsia-500",
    desc: "Full animated website templates",
    descZh: "整套动画网站模板",
  },
  {
    id: "react-bits",
    name: "React Bits",
    nameZh: "动画组件",
    url: "https://reactbits.dev",
    category: "components",
    icon: "blocks",
    accent: "from-fuchsia-500 to-cyan-400",
    desc: "Advanced animated components",
    descZh: "高级动画组件",
  },
  {
    id: "uiverse",
    name: "Uiverse",
    nameZh: "UI 元素",
    url: "https://uiverse.io",
    category: "elements",
    icon: "toggle-left",
    accent: "from-cyan-400 to-emerald-400",
    desc: "Buttons, loaders, toggles",
    descZh: "按钮 · 加载 · 开关",
  },
  {
    id: "animejs",
    name: "Anime.js",
    nameZh: "动画片段",
    url: "https://animejs.com",
    category: "animations",
    icon: "sparkles",
    accent: "from-amber-400 to-rose-500",
    desc: "Spring, drag & scroll motion",
    descZh: "弹簧 · 拖拽 · 滚动动效",
  },
  {
    id: "aceternity",
    name: "Aceternity UI",
    nameZh: "高级组件",
    url: "https://ui.aceternity.com",
    category: "components",
    icon: "blocks",
    accent: "from-fuchsia-500 to-cyan-400",
    desc: "Glow cards, tilt, starfield…",
    descZh: "光效卡片 · 倾斜 · 星空…",
  },
];

export const SITE_MAP: Record<string, SourceSite> = Object.fromEntries(
  SITES.map((s) => [s.id, s])
);

/** Tech filters surfaced in the level-2 dropdown (subset of TECH_LABELS). */
export const SITE_TECH_FILTERS: string[] = [
  "react",
  "tailwind",
  "css",
  "javascript",
  "gsap",
  "animejs",
  "framer",
];

export function techLabel(key: string): string {
  return TECH_LABELS[key] ?? (key[0].toUpperCase() + key.slice(1));
}

/** Link that lands on a category page pre-filtered by a tech stack. */
export function categoryTechHref(category: CategorySlug, tech: string): string {
  return `/${category}?tech=${encodeURIComponent(tech)}`;
}

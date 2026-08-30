import { useSyncExternalStore } from "react";

const KEY = "mui_locale";
const dict: Record<string, Record<string, string>> = {
  zh: {
    home: "首页", gallery: "设计画廊", learn: "学习中心", compare: "跨库对照", wizard: "拼装向导",
    admin: "进入后台", hero1: "把全网最好的", hero2: " 动效 UI ", hero3: "收进一个库",
    sub: "Aceternity、MotionSites、React Bits、Uiverse、Anime.js —— 组件、提示词、元素与动画引擎,按真实二级分类整理,附深色霓虹界面设计图。",
    browse: "浏览版块", sections: "资源版块", daily: "每日推荐", collections: "精选合集", rank: "人气榜",
    subscribe: "订阅新组件周报", email: "邮箱", foot: "资源版权归原作者所有,本站仅作导航与学习参考",
  },
  en: {
    home: "Home", gallery: "Gallery", learn: "Learn", compare: "Compare", wizard: "Wizard",
    admin: "Admin", hero1: "The best", hero2: " motion UI ", hero3: "in one library",
    sub: "Aceternity, MotionSites, React Bits, Uiverse & Anime.js — components, prompts, elements and animation engines, organized by real categories, with dark-neon design sheets.",
    browse: "Browse", sections: "Sections", daily: "Daily picks", collections: "Collections", rank: "Top rated",
    subscribe: "Subscribe to weekly digest", email: "Email", foot: "All resources belong to their authors; this site is for navigation & study.",
  },
};

let locale = "zh";
try {
  locale = localStorage.getItem(KEY) || "zh";
} catch {}
const subs = new Set<() => void>();

export function useT() {
  useSyncExternalStore(
    (cb) => (subs.add(cb), () => subs.delete(cb)),
    () => locale
  );
  return {
    t: (k: string) => dict[locale]?.[k] || k,
    locale,
    setLocale: (l: string) => {
      locale = l;
      try {
        localStorage.setItem(KEY, l);
      } catch {}
      subs.forEach((f) => f());
    },
  };
}

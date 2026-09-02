// Prompt completeness scorer (#121).
// Heuristic, deterministic, zero-cost: checks whether a reproduction prompt
// covers the five dimensions a great AI prompt should have.

export type ScoreTier = "excellent" | "detailed" | "basic" | "terse";

export interface PromptScoreDim {
  key: string;
  label: string;
  labelZh: string;
  hit: boolean;
  hint: string;
  hintZh: string;
}

export interface PromptScore {
  total: number; // 0..100 (steps of 20)
  tier: ScoreTier;
  dims: PromptScoreDim[];
}

interface Rule {
  key: string;
  label: string;
  labelZh: string;
  re: RegExp;
  hint: string;
  hintZh: string;
}

const RULES: Rule[] = [
  {
    key: "structure",
    label: "Layout & structure",
    labelZh: "布局结构",
    re: /\b(layout|section|grid|flex(row|box)?|columns?|header|footer|nav(bar)?|hero|card|container|stack|sidebar)\b/i,
    hint: "describe the layout: sections, grids, spacing",
    hintZh: "补充布局描述：分区、网格、间距",
  },
  {
    key: "style",
    label: "Colors & styling",
    labelZh: "配色样式",
    re: /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|gradient|palette|border-radius|box-shadow|glassmorph|neon|dark (mode|ui|theme)|typography|font/i,
    hint: "name concrete colors (hex), radius, shadows",
    hintZh: "给出具体颜色值(十六进制)、圆角、阴影",
  },
  {
    key: "motion",
    label: "Motion & interaction",
    labelZh: "动效交互",
    re: /animat|transition|keyframe|spring|easing?|cubic-bezier|hover|scroll|parallax|transform|duration|stagger|delay|float|pulse|glow/i,
    hint: "specify animations: keyframes, durations, easings",
    hintZh: "说明动效：关键帧、时长、缓动曲线",
  },
  {
    key: "responsive",
    label: "Responsive behavior",
    labelZh: "响应式",
    re: /responsive|mobile|tablet|desktop|breakpoint|@media|viewport|clamp\(|min-width|max-width/i,
    hint: "add breakpoints / mobile behavior",
    hintZh: "补充断点或移动端表现",
  },
  {
    key: "tech",
    label: "Stack & constraints",
    labelZh: "技术约束",
    re: /\b(html|css|javascript|typescript|react|tailwind|gsap|anime\.?js|framer|three|canvas|svg|vanilla|pure css|no cdn|self-contained)\b/i,
    hint: "pin the stack (e.g. “pure CSS”, “vanilla JS”)",
    hintZh: "标明技术栈与限制(如：纯 CSS / 原生 JS)",
  },
];

export function scorePrompt(prompt: string): PromptScore {
  const text = prompt ?? "";
  const dims: PromptScoreDim[] = RULES.map((r) => ({
    key: r.key,
    label: r.label,
    labelZh: r.labelZh,
    hint: r.hint,
    hintZh: r.hintZh,
    hit: r.re.test(text),
  }));
  const hits = dims.filter((d) => d.hit).length;
  const total = hits * 20;
  const tier: ScoreTier =
    total >= 100 ? "excellent" : total >= 80 ? "detailed" : total >= 60 ? "basic" : "terse";
  return { total, tier, dims };
}

export const TIER_LABEL: Record<ScoreTier, { en: string; zh: string; color: string }> = {
  excellent: { en: "Excellent", zh: "完备", color: "#34d399" },
  detailed: { en: "Detailed", zh: "详细", color: "#22d3ee" },
  basic: { en: "Basic", zh: "基础", color: "#fbbf24" },
  terse: { en: "Terse", zh: "简短", color: "#fb7185" },
};

// Shared palette system for the generated content waves (25+).
// Every family renders once per palette, so variants are visually distinct
// and users can filter the whole vault by color story.

export interface Palette {
  slug: string;
  name: string;
  /** primary gradient start */
  v1: string;
  /** primary gradient end */
  v2: string;
  /** accent (tertiary / highlight) */
  c1: string;
}

export const PALETTES: Palette[] = [
  { slug: "ultra-violet", name: "Ultra Violet", v1: "#8b5cf6", v2: "#d946ef", c1: "#22d3ee" },
  { slug: "cyber-lime", name: "Cyber Lime", v1: "#a3e635", v2: "#34d399", c1: "#22d3ee" },
  { slug: "sunset-amber", name: "Sunset Amber", v1: "#f59e0b", v2: "#ef4444", c1: "#fb923c" },
  { slug: "rose-gold", name: "Rose Gold", v1: "#fb7185", v2: "#e879f9", c1: "#fbbf24" },
  { slug: "ocean-sky", name: "Ocean Sky", v1: "#38bdf8", v2: "#6366f1", c1: "#22d3ee" },
  { slug: "mint-breeze", name: "Mint Breeze", v1: "#2dd4bf", v2: "#34d399", c1: "#a3e635" },
  { slug: "candy-pink", name: "Candy Pink", v1: "#f472b6", v2: "#a855f7", c1: "#fb7185" },
  { slug: "royal-gold", name: "Royal Gold", v1: "#fbbf24", v2: "#f97316", c1: "#fde68a" },
  { slug: "crimson-heat", name: "Crimson Heat", v1: "#ef4444", v2: "#f97316", c1: "#f43f5e" },
  { slug: "deep-indigo", name: "Deep Indigo", v1: "#818cf8", v2: "#6366f1", c1: "#38bdf8" },
  { slug: "aurora-teal", name: "Aurora Teal", v1: "#06b6d4", v2: "#8b5cf6", c1: "#34d399" },
  { slug: "mono-pearl", name: "Mono Pearl", v1: "#e2e8f0", v2: "#94a3b8", c1: "#f8fafc" },
];

/**
 * Pick 8 palettes per family, rotating the start offset by family index so
 * different families headline different color stories.
 */
export function palettesFor(familyIndex: number, count = 8): Palette[] {
  const out: Palette[] = [];
  const off = (familyIndex * 3) % PALETTES.length;
  for (let i = 0; i < count; i++) out.push(PALETTES[(off + i) % PALETTES.length]);
  return out;
}

// Helpers shared by the generated content waves (25+): a common Item factory,
// a palette-injecting doc() wrapper, and the family → items materializer.

import { CategorySlug, Item, Tech } from "../../types";
import { doc, DocOpts } from "../wrap";
import { Palette, palettesFor } from "./palettes";

export const GEN_NOW = "2026-09-02T03:30:00.000Z";

/** doc() but with the item palette injected as :root overrides. */
export function docP(p: Palette, opts: DocOpts): string {
  const override = `:root{--v1:${p.v1};--v2:${p.v2};--c1:${p.c1}}\n`;
  return doc({ ...opts, css: override + (opts.css ?? "") });
}

export interface FamBuild {
  html: string;
  prompt: string;
  /** optional per-variant summary tweak */
  note?: string;
}

export interface Fam {
  /** unique id prefix, e.g. "ge-pulse-btn" */
  id: string;
  /** slug base, e.g. "neon-pulse-button" — final slug gets "-<palette>" appended */
  slugBase: string;
  /** display title base — final title gets "· <palette name>" appended */
  title: string;
  category: CategorySlug;
  summary: string;
  tags: string[];
  tech: Tech[];
  /** build the preview + AI prompt for one variant */
  build: (p: Palette, vi: number) => FamBuild;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Materialize a list of families into concrete items: `count` palette
 * variants per family (default 8), palettes rotated per family so colors
 * spread across the whole batch. Deterministic ids/slugs/stars.
 */
export function materialize(families: Fam[], count = 8): Item[] {
  const out: Item[] = [];
  families.forEach((fam, fi) => {
    palettesFor(fi, count).forEach((p, vi) => {
      const built = fam.build(p, vi);
      const slug = `${fam.slugBase}-${p.slug}`;
      out.push({
        id: `${fam.id}-${p.slug}`,
        slug,
        category: fam.category,
        title: `${fam.title} · ${p.name}`,
        summary: built.note
          ? `${fam.summary} ${built.note}`
          : `${fam.summary} Rendered in the ${p.name} palette.`,
        author: "MotionVault",
        tags: [...fam.tags, p.slug],
        tech: fam.tech,
        stars: 80 + (hash(slug) % 780),
        views: 0,
        copies: 0,
        featured: vi === 0 && fi % 3 === 0,
        published: true,
        html: built.html,
        prompt: built.prompt,
        status: "curated",
        createdAt: GEN_NOW,
        updatedAt: GEN_NOW,
      });
    });
  });
  return out;
}

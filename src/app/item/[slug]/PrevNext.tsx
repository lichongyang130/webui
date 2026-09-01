import Link from "next/link";
import type { Item } from "@/lib/types";

/** Prev/next item navigation by catalog order — idea #203. */
export default function PrevNext({ items, current, lang }: { items: Item[]; current: string; lang: "en" | "zh" }) {
  const idx = items.findIndex((i) => i.slug === current);
  if (idx === -1 || items.length < 2) return null;
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];

  const card = (it: Item, dir: "prev" | "next") => (
    <Link
      href={`/item/${it.slug}`}
      className={`group flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-fuchsia-400/40 hover:bg-white/[0.05] ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      {dir === "prev" && <span className="text-xl text-white/30 transition group-hover:-translate-x-1 group-hover:text-fuchsia-300">←</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] uppercase tracking-widest text-white/35">
          {dir === "prev" ? (lang === "zh" ? "上一个" : "Previous") : lang === "zh" ? "下一个" : "Next"}
        </span>
        <span className="block truncate text-sm font-bold group-hover:text-fuchsia-200">{it.title}</span>
      </span>
      {dir === "next" && <span className="text-xl text-white/30 transition group-hover:translate-x-1 group-hover:text-fuchsia-300">→</span>}
    </Link>
  );

  return (
    <nav className="mt-10 flex flex-col gap-3 sm:flex-row">
      {card(prev, "prev")}
      {card(next, "next")}
    </nav>
  );
}

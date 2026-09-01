"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Item } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

/**
 * Drag-and-drop kanban board for organizing favorites — idea #273.
 * Columns: Want to build → Building → Shipped. State in localStorage.
 */
type Col = "todo" | "doing" | "done";

const COLS: { id: Col; label: string; labelZh: string; accent: string }[] = [
  { id: "todo", label: "Want to build", labelZh: "想做", accent: "from-violet-500/25 to-violet-500/5 border-violet-400/30" },
  { id: "doing", label: "Building", labelZh: "进行中", accent: "from-amber-500/25 to-amber-500/5 border-amber-400/30" },
  { id: "done", label: "Shipped", labelZh: "已上线", accent: "from-emerald-500/25 to-emerald-500/5 border-emerald-400/30" },
];

interface Card {
  slug: string;
  title: string;
  category: string;
  col: Col;
}

export default function Kanban({ items, lang }: { items: Item[]; lang: Lang }) {
  const zh = lang === "zh";
  const [cards, setCards] = useState<Card[]>([]);
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<Col | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mv_kanban") || "[]") as Card[];
      const favs = JSON.parse(localStorage.getItem("mv_favs") || "[]") as string[];
      const known = new Map(items.map((i) => [i.slug, i]));
      const merged: Card[] = [];
      for (const c of saved) {
        if (known.has(c.slug)) merged.push(c);
      }
      const have = new Set(merged.map((c) => c.slug));
      for (const slug of favs) {
        const it = known.get(slug);
        if (it && !have.has(slug)) merged.push({ slug, title: it.title, category: it.category, col: "todo" });
      }
      setCards(merged);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cards.length) localStorage.setItem("mv_kanban", JSON.stringify(cards));
  }, [cards]);

  function move(slug: string, col: Col) {
    setCards((cs) => cs.map((c) => (c.slug === slug ? { ...c, col } : c)));
    setDrag(null);
    setOver(null);
  }

  if (cards.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-1 text-xl font-extrabold tracking-tight">{zh ? "我的构建看板" : "My build board"}</h2>
      <p className="mb-5 text-sm text-white/45">
        {zh ? "拖拽卡片，管理你要用 Prompt 造的东西。" : "Drag cards to track what you are building with these prompts."}
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {COLS.map((col) => {
          const list = cards.filter((c) => c.col === col.id);
          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(col.id);
              }}
              onDragLeave={() => setOver((o) => (o === col.id ? null : o))}
              onDrop={() => drag && move(drag, col.id)}
              className={`min-h-[160px] rounded-2xl border bg-gradient-to-b p-3 transition ${col.accent} ${
                over === col.id ? "ring-2 ring-fuchsia-400/60" : ""
              }`}
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                  {zh ? col.labelZh : col.label}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold">{list.length}</span>
              </div>
              <div className="space-y-2">
                {list.map((c) => (
                  <div
                    key={c.slug}
                    draggable
                    onDragStart={() => setDrag(c.slug)}
                    onDragEnd={() => {
                      setDrag(null);
                      setOver(null);
                    }}
                    className={`group cursor-grab rounded-xl border border-white/10 bg-[#0d0d1e]/80 p-3 transition active:cursor-grabbing ${
                      drag === c.slug ? "opacity-40" : "hover:border-fuchsia-400/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/item/${c.slug}`} className="text-sm font-semibold leading-snug hover:text-fuchsia-200">
                        {c.title}
                      </Link>
                      <span className="text-white/20 transition group-hover:text-white/50">⋮⋮</span>
                    </div>
                    <div className="mt-1.5 text-[10px] uppercase tracking-wider text-white/35">{c.category}</div>
                  </div>
                ))}
                {list.length === 0 && (
                  <div className="grid place-items-center rounded-xl border border-dashed border-white/10 py-6 text-xs text-white/25">
                    {zh ? "拖到这里" : "drop here"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

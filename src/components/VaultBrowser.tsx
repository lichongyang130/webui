"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Item, CategorySlug } from "@/lib/types";
import { CATEGORIES, CATEGORY_MAP, TECH_LABELS } from "@/lib/categories";
import ItemCard from "./ItemCard";
import { Icon } from "./icons";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";

export default function VaultBrowser({
  items,
  activeCategory,
  initialQuery = "",
  initialTag = "",
  initialTech = "",
  lang = "en",
}: {
  items: Item[];
  activeCategory?: CategorySlug;
  initialQuery?: string;
  initialTag?: string;
  initialTech?: string;
  lang?: Lang;
}) {
  const zh = lang === "zh";
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState<string>("popular");
  const [tech, setTech] = useState<string>(initialTech);
  const [activeTag, setActiveTag] = useState(initialTag);
  const [view, setView] = useState<"grid" | "list">("grid");
  const gridRef = useRef<HTMLDivElement>(null);

  const SORTS = [
    { key: "popular", label: zh ? "最多浏览" : "Most viewed" },
    { key: "copies", label: zh ? "最多复制" : "Most copied" },
    { key: "newest", label: zh ? "最新" : "Newest" },
    { key: "az", label: zh ? "按字母" : "A → Z" },
  ];

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeTag) url.searchParams.set("tag", activeTag);
    else url.searchParams.delete("tag");
    if (tech) url.searchParams.set("tech", tech);
    else url.searchParams.delete("tech");
    window.history.replaceState(null, "", url.toString());
  }, [activeTag, tech]);

  const allTags = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => i.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14);
  }, [items]);

  const filtered = useMemo(() => {
    let list = [...items];
    const query = q.trim().toLowerCase();
    if (query)
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.summary.toLowerCase().includes(query) ||
          i.tags.some((t) => t.includes(query)) ||
          i.author.toLowerCase().includes(query)
      );
    if (tech) list = list.filter((i) => i.tech.includes(tech as Item["tech"][number]));
    if (activeTag) list = list.filter((i) => i.tags.includes(activeTag));
    const sorters: Record<string, (a: Item, b: Item) => number> = {
      popular: (a, b) => b.views - a.views,
      copies: (a, b) => b.copies - a.copies,
      newest: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      az: (a, b) => a.title.localeCompare(b.title),
    };
    return list.sort(sorters[sort]);
  }, [items, q, sort, tech, activeTag]);

  // Arrow-key navigation across card grid — idea #218
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 4, ArrowUp: -4 };
      if (!(e.key in moves) || view !== "grid") return;
      const links = Array.from(el.querySelectorAll<HTMLElement>("a[href^='/item/']"));
      const idx = links.indexOf(document.activeElement as HTMLElement);
      if (idx === -1) return;
      e.preventDefault();
      const nextIdx = Math.max(0, Math.min(links.length - 1, idx + moves[e.key]));
      links[nextIdx].focus();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [view, filtered.length]);

  return (
    <div>
      {/* Search + sort bar */}
      <div className="glass sticky top-16 z-30 -mx-2 mb-8 flex flex-wrap items-center gap-3 rounded-2xl p-3">
        <div className="relative min-w-[220px] flex-1">
          <Icon name="search" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={zh ? "搜索标题、标签、作者……" : "Search titles, tags, authors…"}
            className="input-dark !pl-10"
          />
        </div>
        <select value={tech} onChange={(e) => setTech(e.target.value)} className="input-dark w-auto cursor-pointer">
          <option value="">{zh ? "全部技术" : "All tech"}</option>
          {Object.entries(TECH_LABELS).map(([k, v]) => (
            <option key={k} value={k} className="bg-[#161632]">
              {v}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                sort === s.key ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {/* grid / list view toggle — idea #139 */}
        <div className="ml-auto flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
          <button
            onClick={() => setView("grid")}
            title={zh ? "网格视图" : "Grid view"}
            className={`rounded-lg p-2 transition ${view === "grid" ? "bg-white/10 text-white" : "text-white/45 hover:text-white"}`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            title={zh ? "列表视图" : "List view"}
            className={`rounded-lg p-2 transition ${view === "list" ? "bg-white/10 text-white" : "text-white/45 hover:text-white"}`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Category pills (on explore page) */}
      {!activeCategory && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/explore"
            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1.5 text-xs font-bold text-white"
          >
            {zh ? "全部资源库" : "All vaults"}
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-white/60 transition hover:border-fuchsia-400/40 hover:text-white"
            >
              {zh ? c.nameZh : c.name}
            </Link>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/35">
          {zh ? "标签：" : "Tags:"}
        </span>
        <button
          onClick={() => setActiveTag("")}
          className={`chip transition ${!activeTag ? "!border-fuchsia-400/60 !text-white" : "hover:!border-white/30"}`}
        >
          {zh ? "全部" : "all"}
        </button>
        {allTags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
            className={`chip transition ${
              activeTag === tag ? "!border-fuchsia-400/60 !text-white" : "hover:!border-white/30"
            }`}
          >
            #{tag} <span className="ml-1 text-white/30">{count}</span>
          </button>
        ))}
      </div>

      <div className="mb-5 text-sm text-white/40">
        <span className="font-bold text-white/80">{filtered.length}</span>{" "}
        {zh ? "个资源" : `asset${filtered.length === 1 ? "" : "s"}`}
        {activeTag && (
          <>
            {" "}
            {zh ? "标签" : "tagged"} <span className="text-fuchsia-300">#{activeTag}</span>
          </>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-3xl py-20 text-center">
          <Icon name="search" className="mx-auto h-10 w-10 text-white/25" />
          <p className="mt-4 text-lg font-semibold">
            {zh ? "这个角落还没有资源" : "Nothing in this corner of the vault"}
          </p>
          <p className="mt-1 text-sm text-white/45">
            {zh ? "换个关键词试试，或清除筛选条件。" : "Try a different search term or clear the filters."}
          </p>
          <button
            onClick={() => {
              setQ("");
              setTech("");
              setActiveTag("");
            }}
            className="ghost-btn mt-6"
          >
            {zh ? "清除筛选" : "Clear filters"}
          </button>
        </div>
      ) : (
        <div
          ref={gridRef}
          key={`${q}|${sort}|${tech}|${activeTag}|${view}`}
          className={
            view === "grid"
              ? "fx-grid-in grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "fx-grid-in flex flex-col gap-3"
          }
        >
          {filtered.map((item, i) =>
            view === "grid" ? (
              <div key={item.id} className="fx-grid-item" style={{ animationDelay: `${Math.min(i, 16) * 45}ms` }}>
                <ItemCard item={item} lang={lang} />
              </div>
            ) : (
              <ListRow key={item.id} item={item} lang={lang} delay={Math.min(i, 16) * 45} />
            )
          )}
        </div>
      )}
    </div>
  );
}

function ListRow({ item, lang, delay }: { item: Item; lang: Lang; delay: number }) {
  const cat = CATEGORY_MAP[item.category];
  return (
    <Link
      href={`/item/${item.slug}`}
      className="fx-grid-item group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-fuchsia-400/40 hover:bg-white/[0.05]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative hidden h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#0a0a18] sm:block">
        <iframe
          srcDoc={item.html}
          title=""
          loading="lazy"
          sandbox="allow-scripts"
          className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${cat.accent} px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider`}>
            {lang === "zh" ? cat.nameZh : cat.name}
          </span>
          {item.featured && <span className="text-[10px] font-bold text-amber-300">★ {lang === "zh" ? "精选" : "Featured"}</span>}
        </div>
        <h3 className="mt-1 truncate text-sm font-bold transition group-hover:text-fuchsia-200">{item.title}</h3>
        <p className="truncate text-xs text-white/45">{item.summary}</p>
      </div>
      <div className="hidden shrink-0 items-center gap-4 text-xs text-white/40 md:flex">
        <span className="flex items-center gap-1"><Icon name="eye" className="h-3.5 w-3.5" />{item.views.toLocaleString()}</span>
        <span className="flex items-center gap-1"><Icon name="copy" className="h-3.5 w-3.5" />{item.copies.toLocaleString()}</span>
      </div>
      <Icon name="external" className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-fuchsia-300" />
    </Link>
  );
}

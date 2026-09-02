"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Item, CategorySlug } from "@/lib/types";
import { CATEGORIES, CATEGORY_MAP, TECH_LABELS } from "@/lib/categories";
import ItemCard from "./ItemCard";
import { Icon } from "./icons";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";

const PAGE = 48;

interface TagCount {
  tag: string;
  count: number;
}

/**
 * Server-fed browser (#48/#59/#361): pages render only the first slice and this
 * component streams the rest from /api/items — filters, sorts and pagination all
 * run server-side, so list pages no longer ship the entire catalog to the client.
 */
export default function VaultBrowser({
  initialItems,
  total,
  allTags,
  activeCategory,
  initialQuery = "",
  initialTag = "",
  initialTech = "",
  lang = "en",
}: {
  initialItems: Item[];
  total: number;
  allTags: TagCount[];
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
  const [list, setList] = useState<Item[]>(initialItems);
  const [matchTotal, setMatchTotal] = useState(total);
  const [loading, setLoading] = useState(false);
  const reqRef = useRef(0);
  const firstRun = useRef(true);
  const gridRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const SORTS = [
    { key: "popular", label: zh ? "最多浏览" : "Most viewed" },
    { key: "copies", label: zh ? "最多复制" : "Most copied" },
    { key: "newest", label: zh ? "最新" : "Newest" },
    { key: "az", label: zh ? "按字母" : "A → Z" },
  ];

  // keep shareable filter state in the URL
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeTag) url.searchParams.set("tag", activeTag);
    else url.searchParams.delete("tag");
    if (tech) url.searchParams.set("tech", tech);
    else url.searchParams.delete("tech");
    if (q.trim()) url.searchParams.set("q", q.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, [activeTag, tech, q]);

  async function fetchPage(offset: number, replace: boolean, state: {
    q: string; sort: string; tech: string; tag: string;
  }) {
    const myReq = ++reqRef.current;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.set("category", activeCategory);
      if (state.q.trim()) params.set("q", state.q.trim());
      if (state.tag) params.set("tag", state.tag);
      if (state.tech) params.set("tech", state.tech);
      params.set("sort", state.sort);
      params.set("offset", String(offset));
      params.set("limit", String(PAGE));
      const res = await fetch(`/api/items?${params.toString()}`);
      const data = await res.json();
      if (myReq !== reqRef.current) return; // stale response
      const items = (data.items ?? []) as Item[];
      setList((prev) => (replace ? items : [...prev, ...items]));
      setMatchTotal(typeof data.total === "number" ? data.total : offset + items.length);
    } catch {
      /* network hiccup — keep current list */
    } finally {
      if (myReq === reqRef.current) setLoading(false);
    }
  }

  // refetch from page 0 whenever filters change (debounced for the search box)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const state = { q, sort, tech, tag: activeTag };
    const handle = setTimeout(() => fetchPage(0, true, state), q ? 300 : 0);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, sort, tech, activeTag]);

  const hasMore = list.length < matchTotal;

  // infinite-scroll sentinel
  useEffect(() => {
    const el = moreRef.current;
    if (!el || !hasMore || loading) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          fetchPage(list.length, false, { q, sort, tech, tag: activeTag });
        }
      },
      { rootMargin: "700px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading, list.length, q, sort, tech, activeTag]);

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
  }, [view, list.length]);

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

      {/* Tag cloud quick filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              activeTag === tag
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                : "border border-white/10 bg-white/[0.04] text-white/55 hover:border-fuchsia-400/40 hover:text-white"
            }`}
          >
            #{tag} <span className="ml-1 text-white/30">{count}</span>
          </button>
        ))}
      </div>

      <div className="mb-5 text-sm text-white/40">
        <span className="font-bold text-white/80">{matchTotal}</span>{" "}
        {zh ? "个资源" : `asset${matchTotal === 1 ? "" : "s"}`}
        {activeTag && (
          <>
            {" "}
            {zh ? "标签" : "tagged"} <span className="text-fuchsia-300">#{activeTag}</span>
          </>
        )}
        {loading && <span className="ml-3 text-white/30">{zh ? "加载中…" : "Loading…"}</span>}
      </div>

      {list.length === 0 && !loading ? (
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
          {list.map((item, i) =>
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

      {/* sentinel + manual load more */}
      {hasMore && (
        <div ref={moreRef} className="mt-10 flex flex-col items-center gap-3">
          <span className="text-xs tabular-nums text-white/35">
            {zh ? `已显示 ${list.length} / ${matchTotal}` : `Showing ${list.length} / ${matchTotal}`}
          </span>
          <button
            className="ghost-btn disabled:opacity-50"
            disabled={loading}
            onClick={() => fetchPage(list.length, false, { q, sort, tech, tag: activeTag })}
          >
            {loading ? (zh ? "加载中…" : "Loading…") : zh ? "加载更多" : "Load more"} ↓
          </button>
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
          src={`/r/${item.slug}/preview.html`}
          title=""
          loading="lazy"
          sandbox="allow-scripts"
          className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold group-hover:text-fuchsia-200">{item.title}</div>
        <div className="mt-0.5 truncate text-xs text-white/40">{item.summary}</div>
      </div>
      <span className="chip hidden shrink-0 sm:inline-flex">{lang === "zh" ? cat.nameZh : cat.name}</span>
      <span className="shrink-0 text-xs tabular-nums text-white/35">👁 {item.views} · ⚡ {item.copies}</span>
    </Link>
  );
}

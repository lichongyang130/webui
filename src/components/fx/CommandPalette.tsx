"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFx, playSfx } from "./fx-core";

interface Row {
  id: string;
  label: string;
  sub?: string;
  href: string;
  group: string;
  icon: string;
  action?: () => void;
}

const NAV: { label: string; labelZh: string; href: string; icon: string; group: string; groupZh: string }[] = [
  { label: "Home", labelZh: "首页", href: "/", icon: "sparkles", group: "Navigate", groupZh: "导航" },
  { label: "Explore all assets", labelZh: "探索全部资源", href: "/explore", icon: "search", group: "Navigate", groupZh: "导航" },
  { label: "Horizontal hall", labelZh: "横向展厅", href: "/showcase", icon: "grid", group: "Navigate", groupZh: "导航" },
  { label: "Surprise me (random)", labelZh: "随机惊喜", href: "/random", icon: "bolt", group: "Navigate", groupZh: "导航" },
  { label: "Templates", labelZh: "网站模板", href: "/templates", icon: "layout-template", group: "Navigate", groupZh: "导航" },
  { label: "Components", labelZh: "动画组件", href: "/components", icon: "blocks", group: "Navigate", groupZh: "导航" },
  { label: "UI Elements", labelZh: "UI 元素", href: "/elements", icon: "grid", group: "Navigate", groupZh: "导航" },
  { label: "Animations", labelZh: "动画片段", href: "/animations", icon: "bolt", group: "Navigate", groupZh: "导航" },
  { label: "Favorites", labelZh: "我的收藏", href: "/favorites", icon: "star", group: "Navigate", groupZh: "导航" },
  { label: "Submit an asset", labelZh: "投稿资源", href: "/submit", icon: "plus", group: "Navigate", groupZh: "导航" },
  { label: "Admin center", labelZh: "管理中心", href: "/admin", icon: "shield", group: "Navigate", groupZh: "导航" },
];

export default function CommandPalette({ lang }: { lang: "en" | "zh" }) {
  const router = useRouter();
  const { set, settings } = useFx();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const zh = lang === "zh";

  const baseRows = useMemo<Row[]>(() => {
    const nav: Row[] = NAV.map((n) => ({
      id: `nav-${n.href}`,
      label: zh ? n.labelZh : n.label,
      href: n.href,
      icon: n.icon,
      group: zh ? n.groupZh : n.group,
    }));
    const actions: Row[] = [
      { id: "act-theme", label: zh ? "切换主题/特效设置" : "Open FX settings", href: "#fx", icon: "settings", group: zh ? "操作" : "Actions", action: () => window.dispatchEvent(new CustomEvent("mv-fx-menu")) },
      { id: "act-sound", label: zh ? (settings.sound ? "关闭音效" : "开启音效") : settings.sound ? "Turn sound off" : "Turn sound on", href: "#sound", icon: "bolt", group: zh ? "操作" : "Actions", action: () => set({ sound: !settings.sound }) },
      { id: "act-top", label: zh ? "回到顶部" : "Back to top", href: "#top", icon: "grid", group: zh ? "操作" : "Actions", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      {
        id: "act-lang",
        label: zh ? "Switch to English" : "切换为中文",
        href: "#lang",
        icon: "toggle-left",
        group: zh ? "操作" : "Actions",
        action: async () => {
          await fetch("/api/lang", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lang: zh ? "en" : "zh" }) });
          window.location.reload();
        },
      },
    ];
    return [...actions, ...nav];
  }, [zh, settings.sound, set]);

  // hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        playSfx("open");
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => {
      setOpen(true);
      playSfx("open");
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mv-fx-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mv-fx-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // search (debounced)
  useEffect(() => {
    if (!q.trim()) {
      setRows(baseRows);
      return;
    }
    const handle = setTimeout(async () => {
      // secret easter egg — idea #491
      if (q.toLowerCase().trim() === "secret") {
        setRows([
          {
            id: "secret",
            label: zh ? "✦ 你找到了隐藏宝库！" : "✦ You found the secret vault!",
            sub: zh ? "奖励一场烟花" : "Enjoy the fireworks",
            href: "#",
            icon: "star",
            group: "???",
            action: () => {
              window.dispatchEvent(new CustomEvent("mv-fx-fireworks"));
              setOpen(false);
            },
          },
        ]);
        return;
      }
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = (await res.json()) as {
          items: { slug: string; title: string; summary: string; category: string; tags: string[] }[];
          categories: { slug: string; name: string; nameZh: string }[];
        };
        const catRows: Row[] = data.categories.map((c) => ({
          id: `cat-${c.slug}`,
          label: zh ? c.nameZh : c.name,
          href: `/${c.slug}`,
          icon: "grid",
          group: zh ? "分类" : "Categories",
        }));
        const itemRows: Row[] = data.items.map((i) => ({
          id: `item-${i.slug}`,
          label: i.title,
          sub: `${i.category} · ${i.tags.join(", ")}`,
          href: `/item/${i.slug}`,
          icon: "layers",
          group: zh ? "资源" : "Assets",
        }));
        const navFiltered = baseRows.filter((r) => r.label.toLowerCase().includes(q.toLowerCase()));
        setRows([...navFiltered, ...catRows, ...itemRows].slice(0, 14));
        setSel(0);
      } catch {
        setRows(baseRows);
      }
    }, 160);
    return () => clearTimeout(handle);
  }, [q, baseRows, zh]);

  const go = (r: Row) => {
    if (r.action) r.action();
    else router.push(r.href);
    setOpen(false);
    playSfx("click");
  };

  useEffect(() => {
    listRef.current?.children[sel]?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9700] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d1e]/95 shadow-[0_40px_120px_-20px_rgba(139,92,246,0.5)] backdrop-blur-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-white/40" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(rows.length - 1, s + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                rows[sel] && go(rows[sel]);
              }
            }}
            placeholder={zh ? "搜索资源、分类或命令…" : "Search assets, categories or commands…"}
            className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30"
          />
          <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/40">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {rows.length === 0 && <div className="px-3 py-8 text-center text-sm text-white/40">{zh ? "没有匹配结果" : "No results"}</div>}
          {rows.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onMouseEnter={() => setSel(i)}
              onClick={() => go(r)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                i === sel ? "bg-violet-500/20 text-white" : "text-white/70"
              }`}
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${i === sel ? "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-300" : "border-white/10 bg-white/5 text-white/50"}`}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{r.label}</span>
                {r.sub && <span className="block truncate text-xs text-white/40">{r.sub}</span>}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/25">{r.group}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2 text-[11px] text-white/35">
          <span><kbd className="text-white/55">↑↓</kbd> {zh ? "选择" : "navigate"}</span>
          <span><kbd className="text-white/55">↵</kbd> {zh ? "打开" : "open"}</span>
          <span className="ml-auto">⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { playSfx } from "./fx-core";

/** Full-screen big-type navigation overlay — idea #127/#147. */
export default function FullscreenMenu({ lang }: { lang: "en" | "zh" }) {
  const [open, setOpen] = useState(false);
  const zh = lang === "zh";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key.toLowerCase() === "m" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        playSfx("open");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    ...CATEGORIES.map((c) => ({ href: `/${c.slug}`, en: c.name, zh: c.nameZh })),
    { href: "/showcase", en: "Horizontal hall", zh: "横向展厅" },
    { href: "/explore", en: "Explore", zh: "全部资源" },
    { href: "/builder", en: "AI workshop", zh: "AI 工坊" },
    { href: "/favorites", en: "Favorites", zh: "收藏" },
    { href: "/submit", en: "Submit", zh: "投稿" },
    { href: "/admin", en: "Admin", zh: "管理中心" },
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        onClick={() => {
          setOpen(true);
          playSfx("open");
        }}
        className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-fuchsia-400/40 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 6h18M3 12h18M3 18h12" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[9750] flex flex-col bg-[#070711]/97 backdrop-blur-2xl">
          <div className="container-v flex h-16 items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-rose-400/40 hover:text-rose-300"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="container-v flex flex-1 flex-col justify-center gap-1 overflow-y-auto pb-10">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-white/[0.07] py-2 transition"
                style={{
                  animation: `fx-letter-in .5s cubic-bezier(.22,1,.36,1) both`,
                  animationDelay: `${80 + i * 45}ms`,
                }}
              >
                <span className="font-mono text-xs text-fuchsia-300/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-3xl font-extrabold tracking-tight text-white/80 transition group-hover:translate-x-3 group-hover:text-white sm:text-5xl">
                  {zh ? l.zh : l.en}
                </span>
                <span className="ml-auto opacity-0 transition group-hover:opacity-100">→</span>
              </Link>
            ))}
          </nav>
          <div className="container-v pb-8 text-xs text-white/30">
            {zh ? "提示：⌘/Ctrl+M 可随时打开此菜单" : "Tip: ⌘/Ctrl+M opens this menu anywhere"}
          </div>
        </div>
      )}
    </>
  );
}

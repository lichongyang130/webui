"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { SITES, SITE_TECH_FILTERS, categoryTechHref, techLabel } from "@/lib/sites";
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

  const auxLinks = [
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
            {/* LEVEL-1: the five vaults, each with LEVEL-2 */}
            <div className="mb-4 grid gap-x-10 gap-y-2 lg:grid-cols-2">
              {SITES.map((site, i) => (
                <div
                  key={site.id}
                  className="border-b border-white/[0.07] py-2"
                  style={{
                    animation: `fx-letter-in .5s cubic-bezier(.22,1,.36,1) both`,
                    animationDelay: `${80 + i * 40}ms`,
                  }}
                >
                  <Link
                    href={`/${site.category}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 transition"
                  >
                    <span className="font-mono text-xs text-fuchsia-300/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-2xl font-extrabold tracking-tight text-white/80 transition group-hover:translate-x-3 group-hover:text-white sm:text-4xl">
                      {zh ? site.nameZh : site.name}
                    </span>
                    <span className="ml-auto opacity-0 transition group-hover:opacity-100">→</span>
                  </Link>
                  <div className="ml-10 mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                      {zh ? "分类" : "Cat"}
                    </span>
                    <Link
                      href={`/${site.category}`}
                      onClick={() => setOpen(false)}
                      className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs font-semibold text-white/70 transition hover:text-white"
                    >
                      {zh ? CATEGORIES.find((c) => c.slug === site.category)?.nameZh : CATEGORIES.find((c) => c.slug === site.category)?.name}
                    </Link>
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      {zh ? "技术" : "Tech"}
                    </span>
                    {SITE_TECH_FILTERS.map((tech) => (
                      <Link
                        key={tech}
                        href={categoryTechHref(site.category, tech)}
                        onClick={() => setOpen(false)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-xs font-semibold text-white/50 transition hover:border-fuchsia-400/50 hover:text-white"
                      >
                        {techLabel(tech)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 border-t border-white/10 pt-3 text-white/35">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest">
                {zh ? "更多" : "More"}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {auxLinks.map((l, i) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold text-white/60 transition hover:text-white sm:text-lg"
                    style={{
                      animation: `fx-letter-in .5s cubic-bezier(.22,1,.36,1) both`,
                      animationDelay: `${260 + i * 40}ms`,
                    }}
                  >
                    {zh ? l.zh : l.en}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="container-v pb-8 text-xs text-white/30">
            {zh ? "提示：⌘/Ctrl+M 可随时打开此菜单" : "Tip: ⌘/Ctrl+M opens this menu anywhere"}
          </div>
        </div>
      )}
    </>
  );
}

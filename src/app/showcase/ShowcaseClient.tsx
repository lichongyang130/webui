"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Item } from "@/lib/types";
import { CATEGORY_MAP } from "@/lib/categories";
import { useFx } from "@/components/fx/fx-core";
import SmartPreview from "@/components/fx/SmartPreview";

/**
 * Pinned horizontal scroll gallery — idea #80.
 * Vertical wheel scroll is translated into horizontal pan while the
 * section is pinned. Falls back to native horizontal scroll on touch /
 * reduced-motion devices.
 */
export default function ShowcaseClient({ items, lang }: { items: Item[]; lang: "en" | "zh" }) {
  const zh = lang === "zh";
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { fxEnabled } = useFx();

  useEffect(() => {
    if (!fxEnabled) return;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = pin.getBoundingClientRect();
      const total = pin.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      setProgress(p);
      const max = track.scrollWidth - window.innerWidth + 80;
      track.style.transform = `translate3d(${-p * max}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [fxEnabled]);

  return (
    <div ref={pinRef} className={fxEnabled ? "relative h-[460vh]" : "relative"}>
      <div className={fxEnabled ? "sticky top-0 flex h-screen flex-col overflow-hidden" : "relative py-10"}>
        <div className="container-v flex items-end justify-between gap-4 pb-2 pt-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {zh ? "横向展厅" : "Horizontal hall"}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {zh ? "滚动，一路滑过" : "Scroll to glide through"}{" "}
              <span className="grad-text">{items.length}</span> {zh ? "件作品" : "works"}
            </h1>
          </div>
          <div className="hidden items-center gap-2 text-xs text-white/40 sm:flex">
            {fxEnabled ? (zh ? "继续向下滚动 ↓" : "keep scrolling ↓") : zh ? "左右滑动 →" : "scroll sideways →"}
          </div>
        </div>

        <div className="container-v mb-5 mt-4">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-[width] duration-100"
              style={{ width: `${progress * 100}%`, boxShadow: "0 0 14px rgba(217,70,239,.8)" }}
            />
          </div>
        </div>

        <div className={fxEnabled ? "flex flex-1 items-center overflow-hidden" : "overflow-x-auto pb-4"}>
          <div
            ref={trackRef}
            className={`flex gap-6 px-[8vw] will-change-transform ${fxEnabled ? "" : "min-w-max px-[8vw]"}`}
            style={fxEnabled ? undefined : { transform: "none" }}
          >
            {items.map((item, i) => {
              const cat = CATEGORY_MAP[item.category];
              return (
                <Link key={item.id} href={`/item/${item.slug}`} className="group block w-[80vw] shrink-0 sm:w-[420px]">
                  <div className="fx-border-glow relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a18] transition-transform duration-500 hover:-translate-y-2">
                    <div className="relative h-[300px] overflow-hidden">
                      <SmartPreview src={`/r/${item.slug}/preview.html`} title={item.title} className="absolute inset-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a18] via-transparent to-transparent" />
                      <span
                        className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${cat.accent} px-3 py-1 text-[11px] font-bold uppercase tracking-wider`}
                      >
                        {zh ? cat.nameZh : cat.name}
                      </span>
                      <span className="absolute right-4 top-4 font-mono text-xs text-white/40">
                        {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold transition group-hover:text-fuchsia-200">{item.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-white/50">{item.summary}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                        {zh ? "进入预览" : "Open preview"} <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className="flex w-[60vw] shrink-0 items-center justify-center sm:w-[320px]">
              <Link href="/explore" className="ghost-btn whitespace-nowrap text-base">
                {zh ? "查看全部资源 →" : "See everything →"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

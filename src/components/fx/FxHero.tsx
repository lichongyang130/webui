"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFx, useCountUp } from "./fx-core";
import { Reveal } from "./ScrollFx";

/** Word-by-word blur-in entrance — ideas #3, #178. */
export function SplitTitle({ text, className = "", baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  const words = text.split(" ");
  let charIdx = 0;
  return (
    <span className={className}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {w.split("").map((ch) => {
            const d = baseDelay + charIdx++ * 28;
            return (
              <span key={charIdx} className="fx-letter" style={{ animationDelay: `${d}ms` }}>
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block w-[0.28em]"> </span>}
        </span>
      ))}
    </span>
  );
}

/** Typewriter rotating tagline — idea #8 / #185. */
export function Typewriter({ phrases, className = "", speed = 55, pause = 1800 }: { phrases: string[]; className?: string; speed?: number; pause?: number }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  const { reduced } = useFx();
  useEffect(() => {
    if (reduced) {
      setTxt(phrases[0]);
      return;
    }
    const cur = phrases[idx % phrases.length];
    let t: ReturnType<typeof setTimeout>;
    if (!del && txt === cur) t = setTimeout(() => setDel(true), pause);
    else if (del && txt === "") {
      setDel(false);
      setIdx((i) => i + 1);
    } else {
      t = setTimeout(() => setTxt(cur.slice(0, txt.length + (del ? -1 : 1))), del ? speed / 2 : speed);
    }
    return () => clearTimeout(t);
  }, [txt, del, idx, phrases, speed, pause, reduced]);
  return (
    <span className={className}>
      {txt}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: "1em" }} />
    </span>
  );
}

/** Count-up stat — ideas #11, #257. */
function Stat({ value, label, suffix = "", delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) {
  const n = useCountUp(value, 1600);
  return (
    <Reveal delay={delay} className="glass rounded-2xl px-4 py-5 text-center">
      <div className="text-2xl font-extrabold grad-text">
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{label}</div>
    </Reveal>
  );
}

/** Full hero client block with parallax layers — ideas #25, #23, #20, #7. */
export default function FxHero({
  lang,
  total,
  copies,
  views,
  stars,
}: {
  lang: "en" | "zh";
  total: number;
  copies: number;
  views: number;
  stars: number;
}) {
  const zh = lang === "zh";
  const sectionRef = useRef<HTMLElement>(null);
  const { fxEnabled, play } = useFx();

  // parallax on scroll + mouse tilt
  useEffect(() => {
    if (!fxEnabled) return;
    const el = sectionRef.current;
    if (!el) return;
    const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sy = window.scrollY;
        mx += (tx - mx) * 0.06;
        my += (ty - my) * 0.06;
        layers.forEach((l) => {
          const d = Number(l.dataset.depth);
          l.style.transform = `translate3d(${mx * d * 30}px, ${my * d * 24 - sy * d * 0.12}px, 0)`;
        });
      });
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [fxEnabled]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* parallax glow layers */}
      <div className="pointer-events-none absolute inset-0" data-depth="2">
        <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0" data-depth="3.5">
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      <div className="container-v relative pb-20 pt-20 text-center sm:pt-28">
        <Reveal>
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-4 py-1.5 text-[13px] font-medium text-cyan-300 fx-float">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            {zh ? `${total} 个精选资源 · 每个都附带 AI Prompt` : `${total} curated assets · every one ships with an AI prompt`}
          </div>
        </Reveal>

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl" aria-label={zh ? "所有你需要的动画网站" : "Animated sites & components, instantly yours"}>
          {zh ? (
            <>
              <span className="grad-text fx-text-sweep block">
                <SplitTitle text="所有你需要的" baseDelay={200} />
              </span>
              <span className="grad-text fx-text-sweep mt-2 block">
                <SplitTitle text="动画网站与组件" baseDelay={550} />
              </span>
              <span className="mt-2 block text-white/90">
                <SplitTitle text="—— 附带一键生成的 AI Prompt" baseDelay={950} />
              </span>
            </>
          ) : (
            <>
              <span className="grad-text fx-text-sweep block">
                <SplitTitle text="Animated sites" baseDelay={200} />
              </span>
              <span className="grad-text fx-text-sweep block">
                <SplitTitle text="& components," baseDelay={500} />
              </span>
              <span className="mt-2 block text-white/90">
                <SplitTitle text="instantly yours." baseDelay={900} />
              </span>
            </>
          )}
        </h1>

        <Reveal delay={700}>
          <div className="mx-auto mt-6 flex min-h-[28px] max-w-2xl items-center justify-center">
            <Typewriter
              className="text-sm font-medium text-fuchsia-300/90 sm:text-base"
              phrases={
                zh
                  ? ["复制 Prompt → 粘贴给 Cursor → 一键还原", "整站模板 · 动画组件 · UI 元素 · 动画片段", "Motion Sites + React Bits + Uiverse + Anime.js + Aceternity", "54+ 个实时预览，全是真代码"]
                  : ["Copy a prompt → paste into Cursor → ship it", "Templates · Components · Elements · Animations", "Motion Sites + React Bits + Uiverse + Anime.js + Aceternity", "54+ live previews — all real running code"]
              }
            />
          </div>
        </Reveal>

        <Reveal delay={850}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/explore"
              data-magnet
              onMouseEnter={() => play("hover")}
              className="grad-btn fx-pulse-glow text-base"
            >
              {zh ? "探索资源库" : "Explore the vault"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/templates" data-magnet className="ghost-btn text-base">
              {zh ? "浏览模板" : "Browse templates"}
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("mv-fx-palette"))}
              className="ghost-btn text-base"
            >
              ⌘K {zh ? "快速搜索" : "Quick search"}
            </button>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={total} label={zh ? "资源" : "Assets"} delay={950} />
          <Stat value={stars} label={zh ? "GitHub 星标" : "GitHub stars"} suffix={stars >= 1000 ? "" : ""} delay={1050} />
          <Stat value={copies} label={zh ? "Prompt 复制" : "Prompts copied"} delay={1150} />
          <Stat value={views} label={zh ? "实时预览" : "Live previews"} delay={1250} />
        </div>
      </div>

      {/* scroll hint — idea #23 */}
      <div className="pointer-events-none relative flex justify-center pb-6">
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}

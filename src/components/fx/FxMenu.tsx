"use client";

import { useEffect, useState } from "react";
import { useFx, ACCENTS, type Accent, type BgStyle } from "./fx-core";

const BGS: { id: BgStyle; en: string; zh: string }[] = [
  { id: "aurora", en: "Aurora", zh: "极光" },
  { id: "grid", en: "Grid", zh: "网格" },
  { id: "dots", en: "Dots", zh: "点阵" },
  { id: "stars", en: "Stars", zh: "星空" },
  { id: "matrix", en: "Matrix rain", zh: "代码雨" },
  { id: "minimal", en: "Minimal", zh: "极简" },
];

export default function FxMenu({ lang }: { lang: "en" | "zh" }) {
  const { settings, set } = useFx();
  const [open, setOpen] = useState(false);
  const zh = lang === "zh";

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("mv-fx-menu", onOpen);
    return () => window.removeEventListener("mv-fx-menu", onOpen);
  }, []);

  const Toggle = ({ k, label }: { k: keyof typeof settings; label: string }) => (
    <button
      type="button"
      onClick={() => set({ [k]: !settings[k] } as never)}
      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs text-white/75 transition hover:bg-white/5"
    >
      {label}
      <span className={`relative h-[18px] w-8 rounded-full transition ${settings[k] ? "bg-fuchsia-500/80" : "bg-white/15"}`}>
        <span
          className="absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition-all"
          style={{ left: settings[k] ? 16 : 2, height: 14, width: 14 }}
        />
      </span>
    </button>
  );

  return (
    <>
      <button
        type="button"
        aria-label="FX settings"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-[9500] grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#0d0d1e]/80 text-white/70 backdrop-blur-xl transition hover:border-cyan-400/50 hover:text-cyan-300"
      >
        <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform duration-500 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-20 left-6 z-[9500] w-64 rounded-2xl border border-white/10 bg-[#0d0d1e]/95 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="mb-2 px-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
            {zh ? "特效实验室" : "FX Lab"}
          </div>
          <Toggle k="cursor" label={zh ? "自定义光标" : "Custom cursor"} />
          <Toggle k="spotlight" label={zh ? "鼠标聚光灯" : "Mouse spotlight"} />
          <Toggle k="particles" label={zh ? "粒子特效" : "Particles"} />
          <Toggle k="smooth" label={zh ? "平滑滚动" : "Smooth scroll"} />
          <Toggle k="sound" label={zh ? "界面音效" : "UI sounds"} />
          <Toggle k="reduced" label={zh ? "减弱动画" : "Reduced motion"} />

          <div className="mb-1.5 mt-3 px-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
            {zh ? "强调色" : "Accent"}
          </div>
          <div className="flex gap-1.5 px-1">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                title={zh ? a.labelZh : a.label}
                onClick={() => set({ accent: a.id as Accent })}
                className={`h-6 w-6 rounded-full transition ${settings.accent === a.id ? "ring-2 ring-white/70 ring-offset-2 ring-offset-[#0d0d1e]" : "opacity-60 hover:opacity-100"}`}
                style={{ background: `linear-gradient(135deg, rgb(${a.c1}), rgb(${a.c2}))` }}
              />
            ))}
          </div>

          <div className="mt-3 px-1">
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-white/40">
              {zh ? "站点主题" : "Site theme"}
            </div>
            <div className="flex gap-1">
              {(
                [
                  ["dark", "🌙", zh ? "深色" : "Dark"],
                  ["light", "☀️", zh ? "浅色" : "Light"],
                  ["system", "🖥", zh ? "跟随系统" : "System"],
                ] as const
              ).map(([id, icon, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => set({ theme: id })}
                  className={`flex-1 rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition ${
                    settings.theme === id ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200" : "border-white/10 text-white/50 hover:border-white/30"
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-1.5 mt-3 px-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
            {zh ? "背景" : "Background"}
          </div>
          <div className="flex flex-wrap gap-1 px-1">
            {BGS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => set({ bg: b.id as BgStyle })}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                  settings.bg === b.id ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200" : "border-white/10 text-white/50 hover:border-white/30"
                }`}
              >
                {zh ? b.zh : b.en}
              </button>
            ))}
          </div>

          <div className="mb-1.5 mt-3 px-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
            {zh ? "霓虹强度" : "Neon intensity"}
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(settings.neon * 100)}
            onChange={(e) => set({ neon: Number(e.target.value) / 100 })}
            className="mx-1 w-[calc(100%-8px)] accent-fuchsia-500"
          />
        </div>
      )}
    </>
  );
}

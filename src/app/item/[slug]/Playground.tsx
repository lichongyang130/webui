"use client";

import { useState } from "react";

/**
 * Split code/playground editor for item pages — idea #113.
 * Splits the stored HTML doc into <style> and <body> parts so users can
 * tinker with CSS and markup live; "Reset" restores the original.
 */
export default function Playground({ html, lang }: { html: string; lang: "en" | "zh" }) {
  const zh = lang === "zh";
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"css" | "body">("css");

  const initialCss = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
  const initialBody = html.match(/<body[^>]*>([\s\S]*?)<script>/)?.[1] ?? "";
  const [css, setCss] = useState(initialCss);
  const [body, setBody] = useState(initialBody.trim());

  const rebuilt =
    "<!doctype html><html><head><meta charset='utf-8'><style>" + css + "</style></head><body>" + body + "</body></html>";

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b1c]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition hover:bg-white/[0.03]"
      >
        <span className="flex items-center gap-2 text-sm font-bold">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
          </svg>
          {zh ? "实时游乐场 — 改代码即时预览" : "Live playground — tinker and preview instantly"}
        </span>
        <span className={`text-xs text-white/40 transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="grid gap-0 border-t border-white/10 lg:grid-cols-2">
          <div className="flex flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
              {(["css", "body"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition ${
                    tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  {t === "css" ? "CSS" : "HTML"}
                </button>
              ))}
              <button
                onClick={() => {
                  setCss(initialCss);
                  setBody(initialBody.trim());
                }}
                className="ml-auto rounded-md px-2.5 py-1 text-[11px] font-semibold text-white/50 transition hover:text-rose-300"
              >
                ↺ {zh ? "重置" : "Reset"}
              </button>
            </div>
            {tab === "css" ? (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                className="h-[340px] w-full resize-none bg-transparent p-4 font-mono text-[12px] leading-relaxed text-emerald-200/90 outline-none"
              />
            ) : (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                spellCheck={false}
                className="h-[340px] w-full resize-none bg-transparent p-4 font-mono text-[12px] leading-relaxed text-sky-200/90 outline-none"
              />
            )}
          </div>
          <div className="bg-[#070711]">
            <iframe
              title="playground-preview"
              sandbox="allow-scripts"
              srcDoc={rebuilt}
              className="h-[400px] w-full border-0 lg:h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}

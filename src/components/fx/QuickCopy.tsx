"use client";

import { useState } from "react";
import { useFx } from "./fx-core";

/** Hover-action button on cards: copy the AI prompt without opening detail (#166). */
export default function QuickCopy({ prompt, slug, lang = "en" }: { prompt: string; slug: string; lang?: "en" | "zh" }) {
  const fx = useFx();
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(prompt);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = prompt;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        fetch(`/api/copy?slug=${encodeURIComponent(slug)}`, { method: "POST" }).catch(() => {});
        setOk(true);
        fx.play("copy");
        const r = e.currentTarget.getBoundingClientRect();
        fx.burst(r.left + r.width / 2, r.top + r.height / 2, { kind: "spark", count: 10, size: 2.2 });
        fx.toast(lang === "zh" ? "Prompt 已复制 ✦" : "Prompt copied ✦");
        setTimeout(() => setOk(false), 1600);
      }}
      title={lang === "zh" ? "一键复制 Prompt" : "Copy prompt now"}
      className={`grid h-8 w-8 place-items-center rounded-lg border backdrop-blur transition ${
        ok
          ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-300"
          : "border-white/15 bg-black/50 text-cyan-200 hover:border-cyan-400/50 hover:text-cyan-100"
      }`}
    >
      {ok ? (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

"use client";

import { useState } from "react";
import { useFx } from "./fx-core";

/** Hover-action button on cards: copy the AI prompt without opening detail (#166).
 *  Fetches the prompt on demand (POST /api/prompt counts the copy server-side),
 *  so list pages never ship prompt payloads. */
export default function QuickCopy({ slug, lang = "en" }: { prompt?: string; slug: string; lang?: "en" | "zh" }) {
  const fx = useFx();
  const [busy, setBusy] = useState(false);

  async function copy(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.prompt !== "string") throw new Error("fetch failed");
      const text: string = data.prompt;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      fx.play("copy");
      const r = e.currentTarget.getBoundingClientRect();
      fx.burst(r.left + r.width / 2, r.top + r.height / 2, { kind: "spark", count: 12 });
      fx.toast(lang === "zh" ? "Prompt 已复制 ⚡" : "Prompt copied ⚡");
    } catch {
      fx.toast(lang === "zh" ? "复制失败，去详情页复制" : "Copy failed — try the detail page");
    }
    setBusy(false);
  }

  return (
    <button
      onClick={copy}
      disabled={busy}
      title={lang === "zh" ? "一键复制 Prompt" : "Copy prompt now"}
      className="pointer-events-auto grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-black/55 text-white/70 backdrop-blur transition hover:border-fuchsia-400/50 hover:text-fuchsia-300 disabled:opacity-50"
      aria-label={lang === "zh" ? "复制 AI 提示词" : "Copy AI prompt"}
    >
      <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${busy ? "animate-pulse" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
      </svg>
    </button>
  );
}

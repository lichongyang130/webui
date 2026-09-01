"use client";

import { useEffect, useState } from "react";
import { useFx, playSfx } from "./fx-core";

/** Share row: native share sheet (mobile) / copy link — ideas #361 #448. */
export function ShareBar({ title, lang = "en" }: { title: string; lang?: "en" | "zh" }) {
  const fx = useFx();
  const zh = lang === "zh";
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(0);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    try {
      setLikes(Number(localStorage.getItem("mv_likes_total") ?? "0"));
      setVoted(localStorage.getItem(`mv_vote_${location.pathname}`) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  async function share(e: React.MouseEvent) {
    const url = location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    fx.play("copy");
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    fx.burst(r.left + r.width / 2, r.top + r.height / 2, { kind: "spark", count: 10, size: 2.4 });
    fx.toast(zh ? "链接已复制，去分享吧 ✦" : "Link copied — share it ✦");
    setTimeout(() => setCopied(false), 1800);
  }

  function vote(e: React.MouseEvent) {
    const key = `mv_vote_${location.pathname}`;
    const next = !voted;
    setVoted(next);
    const total = likes + (next ? 1 : -1);
    setLikes(total);
    try {
      localStorage.setItem("mv_likes_total", String(total));
      localStorage.setItem(key, next ? "1" : "0");
    } catch {
      /* ignore */
    }
    fx.play(next ? "fav" : "click");
    if (next) {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      fx.burst(r.left + r.width / 2, r.top + r.height / 2, {
        kind: "heart",
        count: 12,
        colors: ["#f472b6", "#e879f9", "#fb7185"],
        gravity: -0.05,
        speed: 3,
        size: 6,
      });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={vote}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
          voted
            ? "border-rose-400/50 bg-rose-500/15 text-rose-300"
            : "border-white/10 bg-white/[0.05] text-white/75 hover:border-rose-400/40 hover:text-rose-200"
        }`}
      >
        <svg viewBox="0 0 24 24" className={`h-4 w-4 ${voted ? "fill-rose-400" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
        {voted ? (zh ? "有用！" : "Useful!") : zh ? "有用吗" : "Useful?"}
        <span className="rounded-full bg-white/10 px-1.5 text-xs">{likes}</span>
      </button>
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/75 transition hover:border-cyan-400/40 hover:text-cyan-200"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        {copied ? (zh ? "已复制" : "Copied!") : zh ? "分享" : "Share"}
      </button>
    </div>
  );
}

/** Keyboard hint bar shown on detail pages — idea #498 shortcut list tie-in. */
export function KeyboardHint({ lang = "en" }: { lang?: "en" | "zh" }) {
  return (
    <button
      type="button"
      onClick={() => {
        playSfx("open");
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "?", shiftKey: true }));
      }}
      className="hidden items-center gap-1.5 text-[11px] text-white/30 transition hover:text-white/60 lg:inline-flex"
    >
      <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono">?</kbd>
      {lang === "zh" ? "快捷键" : "shortcuts"}
    </button>
  );
}

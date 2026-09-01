"use client";

import Link from "next/link";

export default function FooterExtras({ lang }: { lang: "en" | "zh" }) {
  const zh = lang === "zh";
  return (
    <span className="font-mono">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("mv-fx-menu"))}
        className="transition hover:text-cyan-300"
      >
        {zh ? "⚙ 特效实验室" : "⚙ FX Lab"}
      </button>
      <span className="mx-2 opacity-40">·</span>
      <Link href="/random" className="transition hover:text-fuchsia-300">
        🎲 {zh ? "随机惊喜" : "Surprise me"}
      </Link>
      <span className="mx-2 opacity-40">·</span>
      <span>v2.0.0</span>
    </span>
  );
}

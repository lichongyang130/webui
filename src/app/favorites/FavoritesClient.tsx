"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Item } from "@/lib/types";
import ItemCard from "@/components/ItemCard";
import { Icon } from "@/components/icons";
import type { Lang } from "@/lib/i18n";

const KEY = "mv_favs";

export default function FavoritesClient({ items, lang }: { items: Item[]; lang: Lang }) {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      try {
        setFavs(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
      } catch {
        setFavs([]);
      }
    };
    read();
    window.addEventListener("mv-favs-changed", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("mv-favs-changed", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const saved = items.filter((i) => favs.includes(i.slug));

  if (saved.length === 0) {
    return (
      <div className="glass rounded-3xl py-20 text-center">
        <svg viewBox="0 0 120 120" className="mx-auto h-24 w-24" aria-hidden>
          {/* treasure-hunting cat */}
          <g className="fx-float">
            <circle cx="60" cy="66" r="30" fill="#1c1c38" stroke="rgba(139,92,246,0.6)" strokeWidth="2" />
            <path d="M38 44 L32 26 L50 38 Z" fill="#1c1c38" stroke="rgba(139,92,246,0.6)" strokeWidth="2" />
            <path d="M82 44 L88 26 L70 38 Z" fill="#1c1c38" stroke="rgba(139,92,246,0.6)" strokeWidth="2" />
            <circle cx="50" cy="62" r="3.5" fill="#22d3ee" />
            <circle cx="70" cy="62" r="3.5" fill="#22d3ee" />
            <path d="M57 72 Q60 75 63 72" stroke="#e879f9" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M60 68 L60 72 M60 72 L55 69 M60 72 L65 69" stroke="#e879f9" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M44 70 L34 68 M44 74 L34 76 M76 70 L86 68 M76 74 L86 76" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* sparkle treasure */}
          <path d="M92 30 l2 5 5 2 -5 2 -2 5 -2-5 -5-2 5-2z" fill="#fbbf24" className="fx-pulse-glow" />
        </svg>
        <p className="mt-4 text-lg font-semibold">
          {lang === "zh" ? "小猫还没挖到宝藏" : "The cat found no treasures yet"}
        </p>
        <p className="mt-1 text-sm text-white/45">
          {lang === "zh"
            ? "点击任意资源卡片上的 ♥ 即可收藏到这里。"
            : "Tap the ♥ on any asset card to save it here."}
        </p>
        <Link href="/explore" className="ghost-btn mt-6">
          {lang === "zh" ? "去逛逛资源库" : "Browse the vault"}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {saved.map((item) => (
        <ItemCard key={item.id} item={item} lang={lang} />
      ))}
    </div>
  );
}

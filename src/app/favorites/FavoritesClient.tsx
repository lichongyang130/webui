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
        <Icon name="star" className="mx-auto h-10 w-10 text-white/25" />
        <p className="mt-4 text-lg font-semibold">
          {lang === "zh" ? "还没有收藏" : "No favorites yet"}
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

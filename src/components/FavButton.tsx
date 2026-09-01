"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { LANG_LABELS } from "./lang";
import { useFx } from "./fx/fx-core";

const KEY = "mv_favs";

export function getFavs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function FavButton({ slug, lang = "en", className = "" }: { slug: string; lang?: "en" | "zh"; className?: string }) {
  const [on, setOn] = useState(false);
  const [pop, setPop] = useState(false);
  const fx = useFx();

  useEffect(() => {
    setOn(getFavs().includes(slug));
  }, [slug]);

  function toggle(e: React.MouseEvent) {
    const favs = getFavs();
    const adding = !favs.includes(slug);
    const next = adding ? [...favs, slug] : favs.filter((s) => s !== slug);
    localStorage.setItem(KEY, JSON.stringify(next));
    setOn(adding);
    window.dispatchEvent(new Event("mv-favs-changed"));
    if (adding) {
      setPop(true);
      setTimeout(() => setPop(false), 500);
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      fx.burst(r.left + r.width / 2, r.top + r.height / 2, {
        kind: "heart",
        count: 14,
        colors: ["#f472b6", "#e879f9", "#fb7185", "#f9a8d4"],
        gravity: -0.04,
        speed: 3.2,
        size: 7,
      });
      fx.play("fav");
    } else {
      fx.play("click");
    }
  }

  return (
    <button
      onClick={toggle}
      title={LANG_LABELS[on ? "saved" : "save"][lang]}
      className={`grid h-9 w-9 place-items-center rounded-xl border transition ${
        on
          ? "border-fuchsia-400/50 bg-fuchsia-500/15 text-fuchsia-300"
          : "border-white/10 bg-white/[0.04] text-white/50 hover:border-fuchsia-400/40 hover:text-fuchsia-300"
      } ${className}`}
    >
      <Icon name="star" className={`h-4 w-4 ${on ? "fill-fuchsia-300" : ""} ${pop ? "fx-heart-pop" : ""}`} />
    </button>
  );
}

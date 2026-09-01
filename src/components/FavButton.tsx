"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { LANG_LABELS } from "./lang";

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

  useEffect(() => {
    setOn(getFavs().includes(slug));
  }, [slug]);

  function toggle() {
    const favs = getFavs();
    const next = favs.includes(slug) ? favs.filter((s) => s !== slug) : [...favs, slug];
    localStorage.setItem(KEY, JSON.stringify(next));
    setOn(!on);
    window.dispatchEvent(new Event("mv-favs-changed"));
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
      <Icon name={on ? "star" : "star"} className={`h-4 w-4 ${on ? "fill-fuchsia-300" : ""}`} />
    </button>
  );
}

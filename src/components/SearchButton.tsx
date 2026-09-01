"use client";

import { Icon } from "./icons";
import { playSfx } from "./fx/fx-core";

export default function SearchButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        playSfx("open");
        window.dispatchEvent(new Event("mv-fx-palette"));
      }}
      className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/50 transition hover:border-violet-400/40 hover:text-white xl:flex"
    >
      <Icon name="search" className="h-4 w-4" />
      <span className="text-xs">{label}</span>
      <kbd className="ml-1 rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/35">⌘K</kbd>
    </button>
  );
}

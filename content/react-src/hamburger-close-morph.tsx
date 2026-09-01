"use client";
import { useState } from "react";

export default function HamburgerMorph() {
  const [x, setX] = useState(false);
  return (
    <button
      aria-label="menu"
      onClick={() => setX(!x)}
      className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-[11px] rounded-[20px] border border-white/10 bg-white/[0.04] transition-colors hover:border-violet-500/60"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-[3px] w-[38px] rounded-[3px] bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-400 ease-[cubic-bezier(.34,1.56,.64,1)]"
          style={{
            transform: x
              ? i === 0 ? "translateY(14px) rotate(45deg)" : i === 2 ? "translateY(-14px) rotate(-45deg)" : "scaleX(.3)"
              : undefined,
            opacity: x && i === 1 ? 0 : 1,
          }}
        />
      ))}
    </button>
  );
}

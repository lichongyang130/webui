"use client";
import { useState } from "react";

export default function GlowCheckbox({ label = "Motion enabled", defaultOn = true }: { label?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm" onClick={() => setOn(!on)}>
      <input type="checkbox" checked={on} onChange={() => {}} className="hidden" />
      <span
        className={`relative h-6 w-6 flex-none rounded-lg border-[1.5px] transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] ${
          on ? "scale-105 border-transparent bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_0_18px_-2px_rgba(139,92,246,.8)]"
             : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <span
          className="absolute left-[7px] top-[3px] h-[12px] w-[7px] border-white [border-width:0_2.5px_2.5px_0] transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)]"
          style={{ transform: on ? "rotate(45deg) scale(1)" : "rotate(45deg) scale(0)" }}
        />
      </span>
      <span className={on ? "text-white/90" : "text-white/50"}>{label}</span>
    </label>
  );
}

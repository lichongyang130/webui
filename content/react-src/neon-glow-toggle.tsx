"use client";
import { useState } from "react";

export default function NeonToggle({ defaultOn = true }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="inline-block cursor-pointer">
      <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} className="hidden" />
      <span
        className={`relative block h-[34px] w-[68px] rounded-full border transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] ${
          on ? "border-fuchsia-400/60 bg-gradient-to-r from-violet-500/35 to-fuchsia-500/35 shadow-[0_0_22px_-4px_rgba(217,70,239,.7),inset_0_0_12px_rgba(217,70,239,.25)]"
             : "border-white/10 bg-white/[0.08]"
        }`}
      >
        <span
          className={`absolute top-[3px] h-[26px] w-[26px] rounded-full transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] ${
            on ? "left-[37px] bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_14px_rgba(217,70,239,.9)]"
               : "left-[3px] bg-[#8a86b8]"
          }`}
        />
      </span>
    </label>
  );
}

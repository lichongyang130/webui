"use client";
import { useState } from "react";

export default function GlowSlider({ initial = 64 }: { initial?: number }) {
  const [v, setV] = useState(initial);
  return (
    <div className="flex w-[min(320px,86vw)] flex-col items-center gap-3">
      <p className="text-sm text-white/50">Value: <b className="text-cyan-300">{v}</b>%</p>
      <input
        type="range" min={0} max={100} value={v}
        onChange={(e) => setV(+e.target.value)}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none
                   [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-fuchsia-500 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_18px_rgba(217,70,239,.8)]
                   [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-fuchsia-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(217,70,239,.25),0_0_18px_rgba(217,70,239,.8)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        style={{ background: `linear-gradient(90deg, #8b5cf6 ${v}%, rgba(255,255,255,.1) ${v}%)` }}
      />
      <div className="flex w-full justify-between text-[11px] text-white/40 tabular-nums">
        <span>0</span><span>50</span><span>100</span>
      </div>
    </div>
  );
}

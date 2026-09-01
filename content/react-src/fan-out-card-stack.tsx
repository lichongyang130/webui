"use client";
import { useState } from "react";

const CARDS = [
  { name: "Nebula", bars: [38, 50, 62, 74, 86] },
  { name: "Orbit", bars: [46, 58, 70, 82, 94] },
  { name: "Comet", bars: [54, 66, 78, 90, 100] },
];

export default function FanCardStack() {
  const [up, setUp] = useState<number | null>(null);
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">Fan-Out Card Stack</h3>
      <p className="text-sm text-white/50">Hover to fan · click a card to bring it forward</p>
      <div className="group relative mt-2 h-[240px] w-[230px]" style={{ perspective: "800px" }}>
        {CARDS.map((c, i) => {
          const fan =
            i === 0 ? "group-hover:rotate-[-14deg] group-hover:translate-x-[-58px] group-hover:translate-y-[-6px]"
            : i === 1 ? "group-hover:-translate-y-[22px] group-hover:scale-[1.04]"
            : "group-hover:rotate-[14deg] group-hover:translate-x-[58px] group-hover:translate-y-[-6px]";
          return (
          <div
            key={c.name}
            onClick={() => setUp(up === i ? null : i)}
            className={`absolute inset-0 flex cursor-pointer flex-col rounded-[22px] border p-6 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
                       bg-gradient-to-br from-violet-500/30 to-[#0c0c1e] [transform-origin:bottom_center]
                       border-white/15 shadow-[0_24px_60px_-24px_rgba(0,0,0,.9)]
                       ${up === i ? "z-5 -translate-y-[34px] scale-[1.07] !border-fuchsia-400/60 shadow-[0_34px_70px_-20px_rgba(217,70,239,.5)]" : fan}`}
          >
            <div className="mb-4 flex h-[90px] items-end gap-2">
              {c.bars.map((h, k) => (
                <i key={k} className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600 to-cyan-400" style={{ height: `${h}%` }} />
              ))}
            </div>
            <b className="text-[17px] text-white">{c.name} analytics</b>
            <span className="mt-1 text-xs text-white/50">live demo data</span>
          </div>
          );
        })}
      </div>
    </div>
  );
}

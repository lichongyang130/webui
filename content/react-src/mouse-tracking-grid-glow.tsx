"use client";
import { useRef } from "react";

export default function GridGlow({ size = 8 }: { size?: number }) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const total = size * size;

  const enter = (idx: number) => {
    refs.current.forEach((c) => c?.classList.remove("bg-violet-500/50", "border-fuchsia-400/70", "shadow-[0_0_22px_-4px_rgba(139,92,246,.9)]", "scale-105", "bg-violet-500/25", "border-violet-500/40"));
    const cell = refs.current[idx];
    cell?.classList.add("bg-violet-500/50", "border-fuchsia-400/70", "shadow-[0_0_22px_-4px_rgba(139,92,246,.9)]", "scale-105");
    [idx - 1, idx + 1, idx - size, idx + size, idx - size - 1, idx - size + 1, idx + size - 1, idx + size + 1].forEach((n) => {
      if (n >= 0 && n < total) refs.current[n]?.classList.add("bg-violet-500/25", "border-violet-500/40");
    });
  };
  const leave = () => refs.current.forEach((c) => c?.classList.remove("bg-violet-500/50", "border-fuchsia-400/70", "shadow-[0_0_22px_-4px_rgba(139,92,246,.9)]", "scale-105", "bg-violet-500/25", "border-violet-500/40"));

  return (
    <div
      onMouseLeave={leave}
      className="grid w-[min(440px,94vw)] gap-2 rounded-[18px] border border-white/10 bg-white/[0.02] p-[18px]"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <i
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          onMouseEnter={() => enter(i)}
          className="aspect-square cursor-pointer rounded-[10px] border border-white/[0.06] bg-white/[0.04] transition-all duration-300 not-italic"
        />
      ))}
    </div>
  );
}

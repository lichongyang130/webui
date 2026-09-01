"use client";
import { useRef } from "react";

const BLOCKS = [
  ["01", "Each block un-blurs and rises as it enters the panel's center — a cinematic scroll reveal driven by its scroll position."],
  ["02", "No IntersectionObserver needed: the effect is computed from the block's distance to the viewport center."],
  ["03", "Opacity, blur, translation and scale all interpolate from the same proximity factor."],
  ["04", "The technique works the same for content above and below the center line."],
  ["05", "Bind it to any scroll container — or the whole page window."],
];

export default function ScrollBlurReveal() {
  const panel = useRef<HTMLDivElement>(null);

  const update = () => {
    const p = panel.current!;
    const pc = p.clientHeight / 2;
    const pr = p.getBoundingClientRect();
    p.querySelectorAll<HTMLElement>("[data-block]").forEach((b) => {
      const r = b.getBoundingClientRect();
      const center = r.top + r.height / 2 - pr.top;
      const dist = Math.abs(center - pc);
      const k = Math.max(0, 1 - dist / (pc * 1.15));
      b.style.opacity = String(0.25 + k * 0.75);
      b.style.filter = `blur(${(1 - k) * 9}px)`;
      b.style.transform = `translateY(${(1 - k) * 26}px) scale(${0.85 + k * 0.15})`;
    });
  };

  return (
    <div
      ref={panel}
      onScroll={update}
      className="h-[320px] w-[min(440px,94vw)] overflow-y-scroll rounded-[18px] border border-white/10 bg-gradient-to-b from-[#0b0a24] to-[#150b2c] px-6 py-[30px]
                 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/50"
    >
      {BLOCKS.map(([n, text]) => (
        <div key={n} data-block className="flex items-center gap-4 border-b border-white/[0.06] py-[42px] last:border-b-0">
          <b className="flex-none text-[34px] font-extrabold text-violet-500/50">{n}</b>
          <p className="text-[13.5px] leading-relaxed text-white/50">{text}</p>
        </div>
      ))}
    </div>
  );
}

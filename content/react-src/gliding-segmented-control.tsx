"use client";
import { useLayoutEffect, useRef, useState } from "react";

const OPTS = ["Hourly", "Daily", "Weekly", "Monthly"];

export default function SegmentedControl({ initial = 1 }: { initial?: number }) {
  const [active, setActive] = useState(initial);
  const [glide, setGlide] = useState({ x: 0, w: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const move = () => {
      const p = wrap.current!.getBoundingClientRect();
      const r = refs.current[active]!.getBoundingClientRect();
      setGlide({ x: r.left - p.left - 4, w: r.width });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [active]);

  return (
    <div ref={wrap} className="relative inline-flex rounded-[14px] border border-white/10 bg-white/[0.04] p-1">
      <span
        className="absolute bottom-1 top-1 left-0 z-0 rounded-[10px] bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_8px_22px_-8px_rgba(34,211,238,.7)] transition-all duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: `translateX(${glide.x}px)`, width: glide.w }}
      />
      {OPTS.map((o, i) => (
        <button
          key={o}
          ref={(el) => { refs.current[i] = el; }}
          onClick={() => setActive(i)}
          className={`relative z-10 whitespace-nowrap rounded-[10px] px-5 py-2 text-sm font-semibold transition-colors ${active === i ? "font-bold text-[#04121a]" : "text-white/50"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

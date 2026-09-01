"use client";
import { useEffect, useRef, useState } from "react";

const RINGS = [
  { v: 82, c: "#8b5cf6", l: "Motion" },
  { v: 64, c: "#22d3ee", l: "Design" },
  { v: 95, c: "#d946ef", l: "Code" },
];

export default function ProgressRings() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-6">
      {RINGS.map((r) => (
        <div key={r.l} className="relative grid h-[120px] w-[120px] place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" strokeWidth="9" strokeLinecap="round" stroke="rgba(255,255,255,.08)" />
            <circle
              cx="60" cy="60" r="50" fill="none" strokeWidth="9" strokeLinecap="round" stroke={r.c}
              strokeDasharray="314"
              strokeDashoffset={on ? 314 - (314 * r.v) / 100 : 314}
              style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)", filter: `drop-shadow(0 0 6px ${r.c})` }}
            />
          </svg>
          <b className="text-xl font-extrabold text-white">{r.v}%</b>
          <span className="absolute -bottom-6 text-[10px] uppercase tracking-widest text-white/40">{r.l}</span>
        </div>
      ))}
    </div>
  );
}

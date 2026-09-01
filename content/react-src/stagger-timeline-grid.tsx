"use client";
import { useLayoutEffect, useRef, useState } from "react";

export default function StaggerGrid({ cells = 12 }: { cells?: number }) {
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    setGo(false);
    const id = setTimeout(() => setGo(true), 50);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="flex flex-col items-center gap-5">
      <div ref={ref} className="grid w-[min(360px,90%)] grid-cols-4 gap-3">
        {Array.from({ length: cells }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-[14px] border border-white/[0.12] bg-gradient-to-br from-violet-500/35 to-cyan-400/10 ${go ? "[animation:stIn_.6s_cubic-bezier(.34,1.56,.64,1)_forwards]" : "opacity-0 scale-[.3] -rotate-12"}`}
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
      <button
        onClick={() => { setGo(false); requestAnimationFrame(() => requestAnimationFrame(() => setGo(true))); }}
        className="rounded-xl border border-white/10 bg-white/[0.05] px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-500/60"
      >
        ↻ Replay
      </button>
      <style>{`@keyframes stIn { to { opacity:1; transform: scale(1) rotate(0); } }`}</style>
    </div>
  );
}

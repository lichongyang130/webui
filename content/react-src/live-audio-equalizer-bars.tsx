"use client";
import { useEffect, useRef } from "react";

export default function Equalizer({ bars = 22 }: { bars?: number }) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let raf = 0, t = 0, boost = 1;
    const wrap = refs.current;
    const stage = wrap[0]?.closest("[data-eq-stage]") as HTMLElement | null;
    const enter = () => (boost = 1.6);
    const leave = () => (boost = 1);
    stage?.addEventListener("mouseenter", enter);
    stage?.addEventListener("mouseleave", leave);
    const frame = () => {
      t += 0.12;
      refs.current.forEach((b, i) => {
        if (!b) return;
        const wave = Math.sin(t + i * 0.55) * 0.5 + 0.5;
        const wave2 = Math.sin(t * 1.7 + i * 0.9) * 0.5 + 0.5;
        const h = Math.min(8 + (wave * 0.7 + wave2 * 0.3) * 78 * boost, 100);
        b.style.height = h + "%";
      });
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); stage?.removeEventListener("mouseenter", enter); stage?.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <div data-eq-stage className="flex flex-col items-center gap-4">
      <div className="flex h-[180px] w-[min(440px,94vw)] items-end gap-[5px]">
        {Array.from({ length: bars }).map((_, i) => (
          <i
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            className="flex-1 rounded-t-[4px] will-change-[height] shadow-[0_0_12px_-3px_rgba(217,70,239,.5)]"
            style={{ height: "12%", background: "linear-gradient(180deg,#d946ef 0%,#8b5cf6 55%,rgba(139,92,246,.25) 100%)" }}
          />
        ))}
      </div>
      <p className="text-[13px] tracking-[0.08em] text-white/40">▶ now playing — midnight synth</p>
    </div>
  );
}

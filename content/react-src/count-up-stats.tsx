"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(target * e));
      if (p < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value.toLocaleString();
}

export default function CountUpStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stats = [
    { target: 480, label: "Components" },
    { target: 72000, label: "GitHub stars" },
    { target: 128000, label: "Copies made" },
  ];
  return (
    <div className="flex flex-col items-center gap-3 py-10" ref={ref}>
      <h3 className="text-xl font-bold text-white">Count-Up Stats</h3>
      <p className="text-sm text-white/50">Numbers spring into place on view</p>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} start={visible} />
        ))}
      </div>
    </div>
  );
}

function Stat({ target, label, start }: { target: number; label: string; start: boolean }) {
  const value = useCountUp(target, 1800, start);
  return (
    <div className="min-w-[150px] rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-6 text-center transition-all hover:-translate-y-1 hover:border-cyan-400/50">
      <b className="block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-4xl font-extrabold text-transparent">
        {value}
        <span className="text-fuchsia-400">+</span>
      </b>
      <span className="mt-1 block text-xs uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}

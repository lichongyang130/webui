"use client";
import { useRef, useState } from "react";

export default function TopProgressBar() {
  const [width, setWidth] = useState(0);
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) clearInterval(timer.current);
    setWidth(0);
    setShow(true);
    let p = 0;
    timer.current = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 90) { p = 90; if (timer.current) clearInterval(timer.current); }
      setWidth(p);
    }, 220);
  };
  const done = () => {
    if (timer.current) clearInterval(timer.current);
    setWidth(100);
    setTimeout(() => { setShow(false); setWidth(0); }, 400);
  };
  const simulate = () => { start(); setTimeout(done, 1900); };

  return (
    <div className="relative flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">Page-Load Top Progress Bar</h3>
      <p className="text-sm text-white/50">Trickle + complete — like YouTube/Nprogress</p>
      <button onClick={simulate} className="mt-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-500/60">
        ▶ Simulate navigation
      </button>
      <div className={`fixed left-0 right-0 top-0 z-[99] h-[3px] pointer-events-none transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
        <div
          className="relative h-full rounded-r-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_12px_rgba(217,70,239,.9)] transition-[width] duration-200"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

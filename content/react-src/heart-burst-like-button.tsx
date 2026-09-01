"use client";
import { useState } from "react";

export default function HeartBurst() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(2.4);
  const [sparks, setSparks] = useState<{ id: number; dx: number; dy: number; c: string; g: string }[]>([]);

  const click = (e: React.MouseEvent) => {
    const next = !liked;
    setLiked(next);
    setCount((c) => +(next ? c + 0.1 : c - 0.1).toFixed(1));
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const born = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      dx: Math.random() * 160 - 80,
      dy: Math.random() * -120 - 20,
      c: ["#f43f5e", "#d946ef", "#8b5cf6"][i % 3],
      g: ["♥", "✦", "✧", "♦"][i % 4],
    }));
    setSparks(born);
    setTimeout(() => setSparks([]), 800);
    void r;
  };

  return (
    <>
      <style>{`
        @keyframes fly { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }
        @keyframes heartPop { 40% { transform: scale(1.6); } 70% { transform: scale(.85); } 100% { transform: scale(1); } }
      `}</style>
      <button
        onClick={click}
        className={`inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm font-semibold transition-all ${
          liked ? "border-rose-400/50 bg-rose-500/10" : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <span className={`text-lg text-rose-500 ${liked ? "[animation:heartPop_.45s_cubic-bezier(.34,1.56,.64,1)] [text-shadow:0_0_20px_rgba(244,63,94,.9)]" : ""}`}>♥</span>
        <span>{count.toFixed(1)}k</span>
      </button>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none fixed z-50 text-sm"
          style={{ left: "50%", top: "50%", color: s.c, animation: "fly .8s ease-out forwards", ["--dx" as string]: s.dx + "px", ["--dy" as string]: s.dy + "px" }}
        >
          {s.g}
        </span>
      ))}
    </>
  );
}

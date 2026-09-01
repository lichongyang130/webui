"use client";
import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; g: number; size: number; rot: number; vr: number; color: string; life: number; rect: boolean };
const COLORS = ["#8b5cf6", "#d946ef", "#22d3ee", "#fbbf24", "#34d399", "#fb7185"];

export default function Confetti() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    const resize = () => { cv.width = wrap.current!.clientWidth; cv.height = wrap.current!.clientHeight; };
    resize();
    window.addEventListener("resize", resize);
    const parts: P[] = [];
    const burst = (x: number, y: number, n = 90) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = Math.random() * 9 + 3;
        parts.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4, g: 0.28,
          size: Math.random() * 7 + 4, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3,
          color: COLORS[Math.random() * COLORS.length | 0], life: 1, rect: Math.random() > 0.5,
        });
      }
    };
    const onClick = (e: MouseEvent) => {
      const r = wrap.current!.getBoundingClientRect();
      burst(e.clientX - r.left, e.clientY - r.top);
    };
    wrap.current!.addEventListener("click", onClick);
    burst(cv.width / 2, cv.height / 2, 110);
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr; p.life -= 0.009;
        if (p.life <= 0 || p.y > cv.height + 30) { parts.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.rect) ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 3, 0, 7); ctx.fill(); }
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.current?.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={wrap} className="relative h-[380px] w-[min(460px,94vw)] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#070711]">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 text-sm font-bold text-white shadow-[0_14px_44px_-12px_rgba(217,70,239,.8)] [animation:cfPulse_2s_ease-in-out_infinite]">
          ✦ Click anywhere to celebrate
        </span>
      </div>
      <style>{`@keyframes cfPulse { 50% { transform: scale(1.05); } }`}</style>
    </div>
  );
}

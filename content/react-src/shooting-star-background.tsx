"use client";
import { useEffect, useRef } from "react";

export default function ShootingStarBackground({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      cv.width = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.3,
      tw: Math.random() * 6.28, sp: Math.random() * 0.03 + 0.008,
    }));
    let meteors: { x: number; y: number; len: number; sp: number; life: number }[] = [];
    const spawn = () =>
      meteors.push({ x: Math.random() * cv.width * 0.8 + cv.width * 0.2, y: -20, len: Math.random() * 90 + 60, sp: Math.random() * 6 + 6, life: 1 });
    const id = setInterval(spawn, 2600);
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const s of stars) {
        s.tw += s.sp;
        ctx.beginPath();
        ctx.arc(s.x * cv.width, s.y * cv.height, s.r, 0, 7);
        ctx.fillStyle = `rgba(220,220,255,${0.3 + Math.abs(Math.sin(s.tw)) * 0.7})`;
        ctx.fill();
      }
      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        m.x -= m.sp; m.y += m.sp * 0.6; m.life -= 0.012;
        const g = ctx.createLinearGradient(m.x, m.y, m.x + m.len * 0.6, m.y - m.len * 0.35);
        g.addColorStop(0, `rgba(255,255,255,${m.life})`);
        g.addColorStop(1, "rgba(139,92,246,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.len * 0.6, m.y - m.len * 0.35);
        ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative min-h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070711]">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 flex h-full min-h-[420px] flex-col items-center justify-center gap-2 text-center">
        {children ?? (
          <>
            <h3 className="text-xl font-bold text-white">Shooting-Star Background</h3>
            <p className="text-sm text-white/50">Canvas nebula with periodic shooting stars</p>
            <div className="mt-4 rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-300">
              ✦ Drop this behind any hero
            </div>
          </>
        )}
      </div>
    </div>
  );
}

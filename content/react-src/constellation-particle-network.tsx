"use client";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export default function Constellation({ count = 54 }: { count?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    const resize = () => { cv.width = wrap.current!.clientWidth; cv.height = wrap.current!.clientHeight; };
    resize();
    window.addEventListener("resize", resize);
    const nodes: Node[] = Array.from({ length: count }, () => ({
      x: Math.random() * cv.width, y: Math.random() * cv.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
    }));
    const mouse = { x: -999, y: -999 };
    const onMove = (e: MouseEvent) => {
      const r = wrap.current!.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    wrap.current!.addEventListener("mousemove", onMove);
    wrap.current!.addEventListener("mouseleave", onLeave);

    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > cv.width) n.vx *= -1;
        if (n.y < 0 || n.y > cv.height) n.vy *= -1;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 130) { n.x += (dx / d) * 0.9; n.y += (dy / d) * 0.9; }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 110) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        ctx.beginPath();
        ctx.arc(n.x, n.y, dm < 130 ? 3.2 : 2, 0, 7);
        ctx.fillStyle = dm < 130 ? "rgba(34,211,238,.95)" : "rgba(196,181,253,.75)";
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.current?.removeEventListener("mousemove", onMove);
      wrap.current?.removeEventListener("mouseleave", onLeave);
    };
  }, [count]);

  return (
    <div ref={wrap} className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070711]">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

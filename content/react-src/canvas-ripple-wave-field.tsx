"use client";
import { useEffect, useRef } from "react";

type Wave = { x: number; y: number; r: number; a: number };

export default function RippleField() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    const resize = () => { cv.width = wrap.current!.clientWidth; cv.height = wrap.current!.clientHeight; };
    resize();
    window.addEventListener("resize", resize);
    const waves: Wave[] = [];
    const emit = (x: number, y: number) => waves.push({ x, y, r: 0, a: 1 });
    const rectOf = () => wrap.current!.getBoundingClientRect();
    const onClick = (e: MouseEvent) => { const r = rectOf(); emit(e.clientX - r.left, e.clientY - r.top); };
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 120) return;
      last = now;
      const r = rectOf(); emit(e.clientX - r.left, e.clientY - r.top);
    };
    wrap.current!.addEventListener("click", onClick);
    wrap.current!.addEventListener("mousemove", onMove);
    emit(cv.width / 2, cv.height / 2);
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.r += 4.2; w.a -= 0.012;
        if (w.a <= 0) { waves.splice(i, 1); continue; }
        [
          { off: 0, color: "34,211,238" },
          { off: 18, color: "139,92,246" },
          { off: 36, color: "217,70,239" },
        ].forEach((ring) => {
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.r + ring.off, 0, 7);
          ctx.strokeStyle = `rgba(${ring.color},${w.a * 0.8})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.current?.removeEventListener("click", onClick);
      wrap.current?.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={wrap} className="relative h-[380px] w-[min(460px,94vw)] cursor-crosshair overflow-hidden rounded-2xl border border-white/10 bg-[#070711]">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

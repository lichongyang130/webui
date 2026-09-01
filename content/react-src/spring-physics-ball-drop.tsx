"use client";
import { useEffect, useRef } from "react";

export default function SpringBall() {
  const stage = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let y = -60, vy = 2;
    let raf = 0;
    const launch = () => { y = -60; vy = Math.random() * 4 + 2; };
    const frame = () => {
      const floor = stage.current!.clientHeight - 60;
      vy += 0.9; y += vy;
      if (y >= floor) {
        y = floor; vy *= -0.62;
        if (Math.abs(vy) < 1.4) vy = 0;
      }
      const squash = y >= floor - 2 ? Math.max(0.75, 1 - Math.abs(vy) * 0.05) : 1;
      ball.current!.style.transform = `translateY(${y}px) scaleX(${2 - squash}) scaleY(${squash})`;
      const close = Math.min(1, y / floor);
      shadow.current!.style.opacity = String(0.15 + close * 0.45);
      shadow.current!.style.transform = `scaleX(${0.5 + close * 1.1})`;
      raf = requestAnimationFrame(frame);
    };
    stage.current!.addEventListener("click", launch);
    frame();
    return () => { cancelAnimationFrame(raf); stage.current?.removeEventListener("click", launch); };
  }, []);

  return (
    <div ref={stage} className="relative h-[260px] w-[min(420px,90%)] cursor-pointer overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-violet-500/10 to-transparent">
      <div ref={ball} className="absolute left-1/2 -top-[30px] h-[54px] w-[54px] -ml-[27px] rounded-full will-change-transform shadow-[0_0_30px_rgba(139,92,246,.6)]"
        style={{ background: "radial-gradient(circle at 32% 30%,#e9d5ff,#8b5cf6 45%,#5b21b6)" }} />
      <div ref={shadow} className="absolute bottom-[2px] left-1/2 -ml-[25px] h-[10px] w-[50px] rounded-full bg-black/50 blur-[6px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-fuchsia-500/70 to-transparent" />
    </div>
  );
}

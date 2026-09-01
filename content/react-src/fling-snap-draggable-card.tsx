"use client";
import { useEffect, useRef } from "react";

export default function DraggableCard() {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0, vx = 0, vy = 0, dragging = false, lx = 0, ly = 0, raf = 0;
    const el = card.current!;
    const set = () => {
      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${vx * 0.06}deg)`;
    };
    const loop = () => {
      if (!dragging) {
        vx *= 0.92; vy *= 0.92; x += vx; y += vy;
        x += -x * 0.08; y += -y * 0.08;
        if (Math.abs(x) < 0.2) x = 0; if (Math.abs(y) < 0.2) y = 0;
      }
      set(); raf = requestAnimationFrame(loop);
    };
    const down = (e: PointerEvent) => {
      dragging = true; el.setPointerCapture(e.pointerId); lx = e.clientX; ly = e.clientY; vx = vy = 0;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      x += dx; y += dy; vx = dx; vy = dy; lx = e.clientX; ly = e.clientY;
    };
    const up = () => { dragging = false; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    loop();
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); };
  }, []);

  return (
    <div className="h-[280px] w-[min(420px,90%)] overflow-hidden rounded-[20px] border border-dashed border-white/20"
      style={{ backgroundImage: "radial-gradient(rgba(139,92,246,.15) 1px, transparent 1px)", backgroundSize: "22px 22px", touchAction: "none" }}>
      <div ref={card} className="absolute left-1/2 top-1/2 w-[190px] cursor-grab rounded-[18px] border border-white/15 bg-gradient-to-br from-violet-500/30 to-[#14102c] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,.8)] will-change-transform active:cursor-grabbing select-none">
        <div className="mx-auto mb-3.5 h-[5px] w-[44px] rounded-full bg-white/25" />
        <b className="block text-base text-white">Drag me ✦</b>
        <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">Pointer events with momentum and a spring-back toward center.</p>
      </div>
    </div>
  );
}

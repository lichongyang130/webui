"use client";
import { useRef, type MouseEvent } from "react";

export default function SpotlightGlowCard() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  }

  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">Spotlight Glow Card</h3>
      <p className="text-sm text-white/50">Move your cursor across the card</p>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative w-[380px] max-w-[90vw] overflow-hidden rounded-[22px] border border-white/10
                   bg-white/[0.04] p-8 transition-transform duration-300 hover:-translate-y-1"
      >
        <div
          className="pointer-events-none absolute h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0
                     bg-[radial-gradient(circle,rgba(139,92,246,.28),rgba(217,70,239,.12)_40%,transparent_70%)] transition-opacity group-hover:opacity-100"
          style={{ left: "var(--mx,50%)", top: "var(--my,50%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: "radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(217,70,239,.9),transparent 65%)",
            WebkitMask: "linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
          }}
        />
        <div className="relative text-3xl">✦</div>
        <h4 className="relative mt-4 text-xl font-bold text-white">Premium motion kit</h4>
        <p className="relative mt-2 text-sm leading-relaxed text-white/50">
          400+ animated components, ready to paste. The glow follows your pointer with border lighting.
        </p>
        <div className="relative mt-5 inline-block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white">
          Explore →
        </div>
      </div>
    </div>
  );
}

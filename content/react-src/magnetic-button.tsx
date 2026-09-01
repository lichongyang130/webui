"use client";
import { useRef, type MouseEvent, type ReactNode } from "react";

function Magnetic({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "ghost" }) {
  const btn = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  function move(e: MouseEvent) {
    const b = btn.current, l = label.current;
    if (!b || !l) return;
    const r = b.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    b.style.transform = `translate(${dx * 0.35}px,${dy * 0.45}px)`;
    l.style.transform = `translate(${dx * 0.18}px,${dy * 0.22}px)`;
  }
  function leave() {
    if (btn.current) btn.current.style.transform = "";
    if (label.current) label.current.style.transform = "";
  }

  return (
    <button
      ref={btn}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`rounded-full px-9 py-4 text-base font-bold text-white transition-shadow duration-300 ${
        variant === "primary"
          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_14px_40px_-12px_rgba(217,70,239,.75)] hover:shadow-[0_20px_55px_-12px_rgba(217,70,239,.95)]"
          : "border border-white/10 bg-white/[0.06] text-white/90 hover:border-violet-500/60"
      }`}
    >
      <span ref={label} className="inline-block transition-transform duration-200">
        {children}
      </span>
    </button>
  );
}

export default function MagneticButtons() {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">Magnetic Button</h3>
      <p className="text-sm text-white/50">The buttons lean toward your cursor</p>
      <div className="mt-4 flex gap-5">
        <Magnetic>Hover me</Magnetic>
        <Magnetic variant="ghost">◉ Subscribe</Magnetic>
      </div>
    </div>
  );
}

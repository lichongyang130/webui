"use client";
import { useRef, useState, type MouseEvent } from "react";

export default function RippleButton({ children = "Click anywhere on me" }: { children?: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; d: number }[]>([]);
  const idRef = useRef(0);

  const click = (e: MouseEvent<HTMLButtonElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    const d = Math.max(b.width, b.height);
    const id = ++idRef.current;
    setRipples((r) => [...r, { id, x: e.clientX - b.left - d / 2, y: e.clientY - b.top - d / 2, d }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 650);
  };

  return (
    <button
      onClick={click}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-10 py-4 text-sm font-bold text-white shadow-[0_12px_36px_-12px_rgba(139,92,246,.8)] transition-transform active:scale-[.97]"
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/50 [animation:rip_.65s_ease-out_forwards]"
          style={{ left: r.x, top: r.y, width: r.d, height: r.d }}
        />
      ))}
      <style>{`@keyframes rip { to { transform: scale(3.2); opacity: 0; } }`}</style>
      {children}
    </button>
  );
}

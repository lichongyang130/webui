"use client";

import { useRef, useState } from "react";

/**
 * Slide-to-confirm button for destructive actions — idea #209.
 * The knob must be dragged fully across; then onConfirm fires.
 */
export default function SlideConfirm({
  onConfirm,
  label = "Slide to confirm",
  doneLabel = "Confirmed",
  danger = true,
  className = "",
}: {
  onConfirm: () => void;
  label?: string;
  doneLabel?: string;
  danger?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);
  const start = useRef(0);

  const max = () => (trackRef.current ? trackRef.current.clientWidth - 40 : 200);

  const onDown = (e: React.PointerEvent) => {
    if (done) return;
    setDragging(true);
    start.current = e.clientX - x;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setX(Math.max(0, Math.min(max(), e.clientX - start.current)));
  };
  const onUp = () => {
    setDragging(false);
    if (x >= max() - 6) {
      setX(max());
      setDone(true);
      onConfirm();
      setTimeout(() => {
        setDone(false);
        setX(0);
      }, 1800);
    } else setX(0);
  };

  return (
    <div
      ref={trackRef}
      className={`relative h-11 select-none overflow-hidden rounded-xl border ${
        done
          ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300"
          : danger
            ? "border-rose-400/30 bg-rose-500/[0.07] text-rose-200/80"
            : "border-white/15 bg-white/[0.05] text-white/70"
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 grid place-items-center text-xs font-bold uppercase tracking-widest">
        {done ? `✓ ${doneLabel}` : label}
      </span>
      <div
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        className={`absolute left-1 top-1 grid h-9 w-9 cursor-grab place-items-center rounded-lg text-sm font-black active:cursor-grabbing ${
          done ? "bg-emerald-500 text-black" : danger ? "bg-rose-500 text-white" : "bg-white text-black"
        }`}
        style={{ transform: `translateX(${x}px)`, transition: dragging ? "none" : "transform .25s cubic-bezier(.34,1.56,.64,1)" }}
      >
        {done ? "✓" : "→"}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useFx, playSfx } from "./fx-core";

/**
 * Custom cursor (dot + trailing ring), magnetic hovers, click feedback,
 * hover sounds. Ideas: #101 #102 #103 #104 #106 #111 #118 #201.
 */
export default function CursorFx() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { settings, fxEnabled } = useFx();

  useEffect(() => {
    if (!fxEnabled || !settings.cursor) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.style.cursor = "none";

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100,
      raf = 0;
    let hovering = false;
    let magnet: { el: Element; x: number; y: number } | null = null;

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${hovering ? 1.9 : 1})`;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // magnetic attraction
      const magEl = (e.target as Element)?.closest?.<HTMLElement>("[data-magnet],a.grad-btn,a.ghost-btn,button.grad-btn");
      if (magEl && e.pointerType !== "touch") {
        const r = magEl.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < 140) {
          magEl.style.translate = `${dx * 0.18}px ${dy * 0.18}px`;
          magnet = { el: magEl, x: dx, y: dy };
        }
      }
      if (magnet && !magEl) {
        (magnet.el as HTMLElement).style.translate = "";
        magnet = null;
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element;
      const interactive = t?.closest?.("a, button, [role=button], input, label, select, textarea, [data-cursor]");
      hovering = !!interactive;
      ring.style.borderColor = hovering ? "rgba(var(--c3),0.9)" : "rgba(var(--c1),0.6)";
      if (interactive && (t as HTMLElement).dataset.fxHover !== "1") {
        (t as HTMLElement).dataset.fxHover = "1";
        playSfx("hover");
      }
    };
    const onDown = () => (ring.style.opacity = "0.6");
    const onUp = () => (ring.style.opacity = "1");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.style.cursor = "";
      document.querySelectorAll<HTMLElement>("[data-magnet],a.grad-btn").forEach((el) => (el.style.translate = ""));
    };
  }, [fxEnabled, settings.cursor]);

  if (!fxEnabled || !settings.cursor) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden [@media(pointer:fine)]:block" aria-hidden>
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border transition-[border-color,opacity] duration-200 mix-blend-difference"
        style={{ borderColor: "rgba(var(--c1),0.6)" }}
      />
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white mix-blend-difference" />
    </div>
  );
}

/** In-element ripple: add className "ripple-host" to buttons/cards. */
export function RippleHost({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`ripple-host relative inline-flex overflow-hidden ${className}`}
      onPointerDown={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const span = document.createElement("span");
        const size = Math.max(r.width, r.height) * 2;
        span.style.cssText = `position:absolute;left:${e.clientX - r.left - size / 2}px;top:${
          e.clientY - r.top - size / 2
        }px;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.35),transparent 70%);transform:scale(0);animation:fx-ripple .6s ease-out forwards;pointer-events:none;`;
        el.appendChild(span);
        setTimeout(() => span.remove(), 650);
      }}
    >
      {children}
    </span>
  );
}

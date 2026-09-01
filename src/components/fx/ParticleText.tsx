"use client";

import { useEffect, useRef } from "react";
import { useFx } from "./fx-core";

/**
 * Text made of particles that scatter away from the cursor and spring back.
 * Idea #39. Rendered on a canvas inside its container.
 */
export default function ParticleText({
  text,
  className = "",
  height = 180,
}: {
  text: string;
  className?: string;
  height?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { fxEnabled, settings } = useFx();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement!;
    let W = 0,
      H = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      W = parent.clientWidth;
      H = height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // sample text pixels on offscreen canvas
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d")!;
      const fs = Math.min(96, Math.max(40, W / (text.length * 0.62)));
      octx.fillStyle = "#fff";
      octx.font = `900 ${fs}px Inter, system-ui, sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, W / 2, H / 2);
      const data = octx.getImageData(0, 0, W, H).data;
      const targets: { x: number; y: number }[] = [];
      const gap = Math.max(4, Math.round(fs / 16));
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }
      parts = targets.map((t) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: t.x,
        ty: t.y,
        vx: 0,
        vy: 0,
        hue: Math.random(),
      }));
    };

    interface P { x: number; y: number; tx: number; ty: number; vx: number; vy: number; hue: number }
    let parts: P[] = [];
    build();

    const mouse = { x: -999, y: -999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", build);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 80) {
          const f = (80 - d) / 80;
          p.vx += (dx / (d || 1)) * f * 2.6;
          p.vy += (dy / (d || 1)) * f * 2.6;
        }
        // spring to target
        p.vx += (p.tx - p.x) * 0.03;
        p.vy += (p.ty - p.y) * 0.03;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        const c = p.hue < 0.5 ? `rgba(167,139,250,` : p.hue < 0.8 ? `rgba(232,121,249,` : `rgba(103,232,249,`;
        ctx.fillStyle = c + "0.9)";
        ctx.fillRect(p.x, p.y, 1.8, 1.8);
      }
      raf = requestAnimationFrame(loop);
    };

    if (fxEnabled && !settings.reduced) raf = requestAnimationFrame(loop);
    else {
      // static render
      build();
      ctx.fillStyle = "#a78bfa";
      for (const p of parts) ctx.fillRect(p.tx, p.ty, 2, 2);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", build);
    };
  }, [text, height, fxEnabled, settings.reduced]);

  return <canvas ref={ref} className={className} aria-label={text} role="img" />;
}

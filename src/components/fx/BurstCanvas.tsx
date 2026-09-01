"use client";

import { useEffect, useRef } from "react";
import { onBurst, onConfetti, useFx, type BurstOpts } from "./fx-core";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
  grav: number;
  shape: "dot" | "heart" | "rect" | "star";
  drag: number;
}

const PALETTES: Record<string, string[]> = {
  brand: ["rgb(var(--c1))", "rgb(var(--c2))", "rgb(var(--c3))", "#f0abfc", "#a5f3fc"],
  warm: ["#fbbf24", "#fb923c", "#f472b6", "#fde68a"],
};

function hexish(c: string) {
  // CSS var colors don't resolve in canvas; map known ones
  if (c.startsWith("rgb(var")) {
    if (c.includes("--c1")) return "rgba(139,92,246,";
    if (c.includes("--c2")) return "rgba(217,70,239,";
    return "rgba(34,211,238,";
  }
  return c;
}

function makeParticles(x: number, y: number, opts?: Partial<BurstOpts>): P[] {
  const kind = opts?.kind ?? "spark";
  const n = opts?.count ?? (kind === "confetti" ? 90 : kind === "firework" ? 70 : 18);
  const colors = opts?.colors ?? PALETTES.brand;
  const speed = opts?.speed ?? (kind === "firework" ? 7 : kind === "confetti" ? 9 : 4.5);
  const grav = opts?.gravity ?? (kind === "confetti" ? 0.16 : kind === "firework" ? 0.09 : 0.05);
  const out: P[] = [];
  for (let i = 0; i < n; i++) {
    const ang = kind === "confetti" ? -Math.PI / 2 + (Math.random() - 0.5) * 1.6 : Math.random() * Math.PI * 2;
    const v = speed * (0.35 + Math.random() * 0.85);
    const max = 0.7 + Math.random() * 0.7;
    out.push({
      x,
      y,
      vx: Math.cos(ang) * v * (kind === "confetti" ? 0.6 : 1),
      vy: Math.sin(ang) * v - (kind === "confetti" ? 2 : 0),
      life: max,
      max,
      size: (opts?.size ?? 3) * (0.6 + Math.random() * 0.9),
      color: colors[i % colors.length],
      grav,
      shape: kind === "heart" ? "heart" : kind === "confetti" ? "rect" : "dot",
      drag: kind === "confetti" ? 0.992 : 0.97,
    });
  }
  return out;
}

function drawHeart(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(0, -s * 0.1, -s, -s * 0.1, -s, s * 0.35);
  ctx.bezierCurveTo(-s, s * 0.8, 0, s * 1.05, 0, s * 1.4);
  ctx.bezierCurveTo(0, s * 1.05, s, s * 0.8, s, s * 0.35);
  ctx.bezierCurveTo(s, -s * 0.1, 0, -s * 0.1, 0, s * 0.35);
  ctx.fill();
}

export default function BurstCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { settings, fxEnabled } = useFx();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const parts: P[] = [];
    const trail: { x: number; y: number; life: number }[] = [];
    const dust: { x: number; y: number; s: number; v: number; drift: number; ph: number }[] = [];
    for (let i = 0; i < 40; i++) {
      dust.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        s: 0.6 + Math.random() * 1.8,
        v: 0.08 + Math.random() * 0.25,
        drift: Math.random() * 0.3,
        ph: Math.random() * Math.PI * 2,
      });
    }

    let mx = -100,
      my = -100;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const off1 = onBurst((x, y, opts) => parts.push(...makeParticles(x, y, opts)));
    const off2 = onConfetti((count) => {
      for (let i = 0; i < Math.min(count / 45, 4); i++) {
        parts.push(
          ...makeParticles(window.innerWidth * (0.2 + Math.random() * 0.6), window.innerHeight * (0.15 + Math.random() * 0.25), {
            kind: "confetti",
            count: Math.floor(count / 4),
            colors: [...PALETTES.brand, ...PALETTES.warm],
          })
        );
      }
    });

    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ambient rising dust — idea #53
      if (fxEnabled && settings.particles) {
        for (const d of dust) {
          d.y -= d.v;
          d.x += Math.sin(t * 0.01 + d.ph) * d.drift * 0.3;
          if (d.y < -10) {
            d.y = canvas.height + 10;
            d.x = Math.random() * canvas.width;
          }
          const a = 0.12 + 0.18 * (Math.sin(t * 0.02 + d.ph) * 0.5 + 0.5);
          ctx.fillStyle = `rgba(190,200,255,${a})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
          ctx.fill();
        }

        // cursor sparkle trail — idea #111
        if (mx > 0 && t % 2 === 0) {
          trail.push({ x: mx + (Math.random() - 0.5) * 8, y: my + (Math.random() - 0.5) * 8, life: 1 });
        }
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.03;
        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(200,210,255,${p.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.grav;
        p.life -= 0.016 / p.max;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        const alpha = Math.min(1, p.life * 1.4);
        const base = hexish(p.color);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        if (p.shape === "rect") {
          ctx.rotate(p.life * 6);
          ctx.fillStyle = base;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
        } else if (p.shape === "heart") {
          ctx.scale(p.size / 8, p.size / 8);
          ctx.fillStyle = base;
          drawHeart(ctx, 6);
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = base;
          ctx.fillStyle = base;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      off1();
      off2();
    };
  }, [fxEnabled, settings.particles]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[9000]" aria-hidden />;
}

import { CSSProperties, useEffect, useRef, useState } from "react";
import { rnd, useInView } from "./util";

/* ---- Background Beams:旋转光束 ---- */
export function BackgroundBeams() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="absolute h-[160%] w-[160%] opacity-70 blur-2xl" style={{ background: "conic-gradient(from 0deg, transparent 0 8%, #22d3ee55 10%, transparent 12% 30%, #8b5cf655 33%, transparent 36% 55%, #f472b655 58%, transparent 62% 80%, #22d3ee55 83%, transparent 86%)", animation: "spin 18s linear infinite" }} />
      <span className="relative bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-xl font-bold text-transparent">Background Beams</span>
    </div>
  );
}

/* ---- Beams With Collision:光束 + 碰撞火花 ---- */
export function BeamsCollision() {
  const [sparks, setSparks] = useState<{ x: number; y: number; k: number }[]>([]);
  useEffect(() => {
    const t = setInterval(() => setSparks((p) => [...p.slice(-5), { x: rnd(15, 85), y: rnd(20, 80), k: Date.now() }]), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="demo-frame absolute inset-0">
      <BackgroundBeams />
      {sparks.map((s) => (
        <span key={s.k} className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300" style={{ left: `${s.x}%`, top: `${s.y}%`, boxShadow: "0 0 12px 4px #22d3ee88", animation: "ringPulse 1s ease-out forwards" }} />
      ))}
    </div>
  );
}

/* ---- Aurora Background ---- */
export function AuroraBackground() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      {[["#22d3ee", 18, 22], ["#8b5cf6", 62, 12], ["#f472b6", 38, 64], ["#34d399", 80, 58]].map(([c, x, y], i) => (
        <div key={i} className="absolute h-44 w-44 rounded-full blur-3xl" style={{ background: c as string, left: `${x}%`, top: `${y}%`, opacity: 0.35, animation: `drift ${9 + i * 3}s ease-in-out infinite` }} />
      ))}
      <span className="relative text-xl font-bold text-white">Aurora Background</span>
    </div>
  );
}

/* ---- Grid & Dot ---- */
export function GridDot() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" style={{ backgroundImage: "linear-gradient(#1e253488 1px, transparent 1px), linear-gradient(90deg,#1e253488 1px, transparent 1px), radial-gradient(#22d3ee55 1px, transparent 1px)", backgroundSize: "36px 36px, 36px 36px, 36px 36px", backgroundPosition: "-1px -1px,-1px -1px, 17px 17px" }}>
      <span className="rounded-lg bg-[#05060acc] px-4 py-2 text-sm font-semibold text-slate-200 backdrop-blur">Grid + Dot Pattern</span>
    </div>
  );
}

/* ---- Noise ---- */
export function NoiseBackground() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center bg-[#0a0d14]">
      <div className="noise absolute inset-0 opacity-60" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, #22d3ee22, transparent 60%)" }} />
      <span className="relative text-sm font-semibold tracking-[.3em] text-slate-400">NOISE</span>
    </div>
  );
}

/* ---- Dotted Glow ---- */
export function DottedGlow() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" style={{ backgroundImage: "radial-gradient(#22d3ee 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, #05060a22 30%, #05060a 75%)" }} />
      <span className="relative text-sm font-semibold text-cyan-200">Dotted Glow</span>
    </div>
  );
}

/* ---- Gradient Animation ---- */
export function GradientAnimation() {
  return (
    <div className="demo-frame absolute inset-0" style={{ background: "conic-gradient(from 0deg at 50% 50%, #22d3ee, #8b5cf6, #f472b6, #f59e0b, #22d3ee)", animation: "spin 12s linear infinite, hueShift 12s linear infinite" }}>
      <div className="absolute inset-[3px] grid place-items-center bg-[#05060a]">
        <span className="text-lg font-bold" style={{ background: "linear-gradient(90deg,#22d3ee,#8b5cf6,#f472b6)", WebkitBackgroundClip: "text", color: "transparent" }}>Gradient Animation</span>
      </div>
    </div>
  );
}

/* ---- Gradient(静态多层) ---- */
export function GradientBackground() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 20%, #8b5cf633, transparent), radial-gradient(ellipse 70% 50% at 80% 30%, #22d3ee33, transparent), radial-gradient(ellipse 60% 50% at 50% 90%, #f472b633, transparent), #05060a" }}>
      <span className="text-sm font-semibold text-slate-300">Multi-layer Gradient</span>
    </div>
  );
}

/* ---- Background Lines ---- */
export function BackgroundLines() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" style={{ left: `${8 + i * 10.5}%`, animation: `lineDrop ${rnd(2, 4).toFixed(1)}s linear ${rnd(0, 2).toFixed(1)}s infinite` }} />
      ))}
      <span className="relative text-sm font-semibold text-slate-200">Background Lines</span>
    </div>
  );
}

/* ---- Ripple ---- */
export function RippleEffect() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="absolute h-24 w-24 rounded-full border border-cyan-400/40" style={{ animation: `ringPulse 3s ease-out ${i * 0.75}s infinite` }} />
      ))}
      <span className="relative h-3 w-3 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 24px 6px #22d3ee66" }} />
    </div>
  );
}

/* ---- Glowing Stars(canvas 闪烁星空) ---- */
export function GlowingStars() {
  const { ref, inView } = useInView<HTMLCanvasElement>();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio);
    const stars = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), r: rnd(0.4, 1.6), p: rnd(0, 6.28), s: rnd(0.5, 2) }));
    let raf = 0;
    const draw = (t: number) => {
      const { width: w, height: h } = cv;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const a = 0.3 + 0.7 * Math.abs(Math.sin(t / 1000 * st.s + st.p));
        ctx.beginPath();
        ctx.arc(st.x * w, st.y * h, st.r * dpr, 0, 6.28);
        ctx.fillStyle = `rgba(165,243,252,${a})`;
        ctx.shadowColor = "#67e8f9";
        ctx.shadowBlur = 8 * dpr * a;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const rs = () => { cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; };
    rs();
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [inView, ref]);
  return (
    <div className="demo-frame absolute inset-0">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 grid place-items-center"><span className="text-sm font-semibold text-cyan-100">Glowing Stars</span></div>
    </div>
  );
}

/* ---- Shooting Stars(canvas 流星) ---- */
export function ShootingStars() {
  const { ref, inView } = useInView<HTMLCanvasElement>();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio);
    const stars = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), r: rnd(0.3, 1.1), p: rnd(0, 6.28) }));
    let meteors = [{ x: 0.9, y: 0.1, v: 0.004, life: 1 }];
    let raf = 0;
    const draw = () => {
      const { width: w, height: h } = cv;
      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = 0;
      for (const s of stars) { ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r * dpr, 0, 6.28); ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.5 * Math.abs(Math.sin(s.p + Date.now() / 900))})`; ctx.fill(); }
      for (const m of meteors) {
        const g = ctx.createLinearGradient(m.x * w, m.y * h, (m.x + 0.12) * w, (m.y - 0.1) * h);
        g.addColorStop(0, "#67e8f9"); g.addColorStop(1, "transparent");
        ctx.strokeStyle = g; ctx.lineWidth = 1.6 * dpr;
        ctx.beginPath(); ctx.moveTo(m.x * w, m.y * h); ctx.lineTo((m.x + 0.12) * w, (m.y - 0.1) * h); ctx.stroke();
        m.x -= m.v; m.y += m.v * 0.8;
      }
      if (meteors[0].x < -0.15) meteors = [{ x: rnd(0.6, 1.05), y: rnd(0.02, 0.3), v: rnd(0.003, 0.006), life: 1 }];
      raf = requestAnimationFrame(draw);
    };
    const rs = () => { cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; };
    rs();
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [inView, ref]);
  return (
    <div className="demo-frame absolute inset-0">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 grid place-items-center"><span className="text-sm font-semibold text-white">Shooting Stars</span></div>
    </div>
  );
}

/* ---- Meteors(纯 CSS) ---- */
export function Meteors() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className="absolute h-px w-24" style={{ top: `${rnd(5, 90)}%`, left: `${rnd(30, 105)}%`, background: "linear-gradient(90deg, #67e8f9, transparent)", animation: `meteor ${rnd(2.5, 5).toFixed(1)}s linear ${rnd(0, 4).toFixed(1)}s infinite` }} />
      ))}
      <span className="relative text-sm font-semibold text-slate-200">Meteors</span>
    </div>
  );
}

/* ---- Vortex ---- */
export function Vortex() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="absolute h-72 w-72 rounded-full" style={{ background: "conic-gradient(from 0deg, #22d3ee44, transparent 25%, #8b5cf644 50%, transparent 75%, #22d3ee44)", animation: "spin 10s linear infinite", maskImage: "radial-gradient(circle, transparent 30%, #000 32%, #000 60%, transparent 62%)", WebkitMaskImage: "radial-gradient(circle, transparent 30%, #000 32%, #000 60%, transparent 62%)" }} />
      <div className="absolute h-44 w-44 rounded-full" style={{ background: "conic-gradient(from 90deg, #f472b644, transparent 40%, #f472b644 70%, transparent)", animation: "spin 7s linear infinite reverse", maskImage: "radial-gradient(circle, transparent 40%, #000 45%, transparent 85%)", WebkitMaskImage: "radial-gradient(circle, transparent 40%, #000 45%, transparent 85%)" }} />
      <span className="relative text-sm font-semibold text-cyan-200">Vortex</span>
    </div>
  );
}

/* ---- Wavy Background ---- */
export function WavyBackground() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <svg className="absolute bottom-0 w-[200%]" viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ animation: "waveMove 9s linear infinite", height: "60%" }}>
        <path d="M0 100 Q 150 40 300 100 T 600 100 T 900 100 T 1200 100 V200 H0 Z" fill="#8b5cf622" />
        <path d="M0 130 Q 150 80 300 130 T 600 130 T 900 130 T 1200 130 V200 H0 Z" fill="#22d3ee22" />
      </svg>
      <span className="relative mb-10 text-sm font-semibold text-slate-200">Wavy Background</span>
    </div>
  );
}

/* ---- Boxes ---- */
export function BackgroundBoxes() {
  return (
    <div className="demo-frame absolute inset-0">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="absolute rounded border border-cyan-400/30 bg-cyan-400/5" style={{ width: rnd(24, 64), height: rnd(24, 64), left: `${rnd(2, 92)}%`, top: `${rnd(5, 85)}%`, animation: `floatBox ${rnd(4, 8).toFixed(1)}s ease-in-out ${rnd(0, 3).toFixed(1)}s infinite` }} />
      ))}
    </div>
  );
}

/* ---- Spotlight ---- */
export function Spotlight() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="absolute -top-24 h-64 w-[130%] rounded-[50%] bg-cyan-400/15 blur-3xl" style={{ animation: "sweepX 6s ease-in-out infinite alternate" }} />
      <span className="relative text-xl font-bold text-white">Spotlight</span>
    </div>
  );
}

/* ---- Sparkles(canvas 闪光粒子) ---- */
export function Sparkles() {
  const { ref, inView } = useInView<HTMLCanvasElement>();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio);
    let pts = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), s: rnd(2, 7), life: rnd(0, 1), v: rnd(0.004, 0.012) }));
    let raf = 0;
    const draw = () => {
      const { width: w, height: h } = cv;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.life += p.v;
        if (p.life > 1) Object.assign(p, { x: Math.random(), y: Math.random(), life: 0 });
        const a = Math.sin(p.life * Math.PI);
        ctx.save();
        ctx.translate(p.x * w, p.y * h);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(250,204,21,${a * 0.9})`;
        ctx.shadowColor = "#facc15"; ctx.shadowBlur = 10 * dpr * a;
        const s = p.s * dpr * a;
        ctx.fillRect(-s / 2, -1 * dpr, s, 2 * dpr); ctx.fillRect(-1 * dpr, -s / 2, 2 * dpr, s);
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    const rs = () => { cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; };
    rs();
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [inView, ref]);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <span className="relative text-sm font-semibold text-amber-200">Sparkles ✦</span>
    </div>
  );
}

/* ---- Lamp ---- */
export function LampEffect() {
  return (
    <div className="demo-frame absolute inset-0 flex items-end justify-center pb-10">
      <div className="absolute bottom-16 h-52 w-[120%] origin-bottom blur-2xl" style={{ background: "linear-gradient(to top, #22d3ee55, transparent 70%)", clipPath: "polygon(38% 100%, 62% 100%, 100% 0, 0 0)", animation: "lampGrow 3s ease-in-out infinite alternate" }} />
      <div className="absolute bottom-14 h-1 w-40 rounded-full bg-cyan-300" style={{ boxShadow: "0 0 40px 10px #22d3ee88" }} />
      <span className="relative text-sm font-semibold text-white">Lamp Effect</span>
    </div>
  );
}

/* ---- Pixelated Canvas ---- */
export function PixelatedCanvas() {
  const { ref, inView } = useInView<HTMLCanvasElement>();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d")!;
    let raf = 0;
    const draw = (t: number) => {
      const w = cv.clientWidth, h = cv.clientHeight, px = 12;
      for (let y = 0; y < h; y += px)
        for (let x = 0; x < w; x += px) {
          const v = Math.sin(x / 60 + t / 900) * Math.cos(y / 50 - t / 1100);
          const c = v > 0.3 ? "#22d3ee" : v > -0.2 ? "#0e7490" : "#0b1220";
          ctx.fillStyle = c;
          ctx.fillRect(x, y, px - 1, px - 1);
        }
      raf = requestAnimationFrame(draw);
    };
    const rs = () => { cv.width = cv.clientWidth; cv.height = cv.clientHeight; };
    rs();
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [inView, ref]);
  return (
    <div className="demo-frame absolute inset-0">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

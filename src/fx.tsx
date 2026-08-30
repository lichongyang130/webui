// 自研动效基元:零依赖,全部尊重 prefers-reduced-motion,canvas 限 DPR 且出视口暂停
import { ReactNode, useEffect, useRef, useState } from "react";

export const reduced = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 滚动入场 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

/* 数字滚动 */
export function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduced()) return setV(to);
    const el = ref.current!;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to]);
  return (
    <span ref={ref} className={className}>
      {v}
    </span>
  );
}

/* 乱码解码标题 */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const [out, setOut] = useState(reduced() ? text : "");
  useEffect(() => {
    if (reduced()) return setOut(text);
    const chars = "!<>-_\\/[]{}—=+*^?#░▒▓";
    let frame = 0;
    let raf = 0;
    const total = text.length * 4 + 30;
    const tick = () => {
      frame++;
      const reveal = Math.floor((frame / total) * text.length * 1.4);
      let s = "";
      for (let i = 0; i < text.length; i++)
        s += i < reveal ? text[i] : chars[(Math.random() * chars.length) | 0];
      setOut(s);
      if (reveal <= text.length) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return <span className={className}>{out || "\u00A0"}</span>;
}

/* 翻词 */
export function FlipWords({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: "4.5em", textAlign: "left" }}>
      <span key={i} className="flip-in inline-block">
        {words[i]}
      </span>
    </span>
  );
}

/* 3D tilt 卡 */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (reduced() || matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(8px)`;
  };
  const onLeave = () => {
    ref.current!.style.transform = "perspective(900px)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`transition-transform duration-200 ${className}`}>
      {children}
    </div>
  );
}

/* 无限跑马灯 */
export function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max gap-3"
        style={{ animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}` }}
      >
        <div className="flex gap-3">{children}</div>
        <div className="flex gap-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* 粒子星野 canvas */
export function ParticleField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0, running = true;
    const coarse = matchMedia("(pointer: coarse)").matches;
    type P = { x: number; y: number; r: number; vx: number; vy: number; tw: number; c: string };
    let ps: P[] = [];
    const colors = ["#22d3ee", "#8b5cf6", "#f472b6", "#e2e8f0"];
    const resize = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(coarse ? 45 : 110, Math.floor((w * h) / (coarse ? 22000 : 11000)));
      ps = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        tw: Math.random() * Math.PI * 2,
        c: colors[(Math.random() * colors.length) | 0],
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const a = 0.35 + 0.5 * Math.abs(Math.sin(t / 900 + p.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (running && !reduced()) raf = requestAnimationFrame(draw);
    };
    resize();
    if (reduced()) draw(0);
    else raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running && !reduced()) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(cv);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className={`h-full w-full ${className}`} />;
}

/* 终端打字 */
export function TypeTerminal({ lines, className = "" }: { lines: string[]; className?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) return setN(9999);
    const total = lines.join("").length;
    const t = setInterval(() => setN((v) => (v >= total + 20 ? 0 : v + 1)), 45);
    return () => clearInterval(t);
  }, [lines]);
  let left = n;
  return (
    <div className={`glass rounded-xl p-4 font-mono text-[11px] leading-5 ${className}`}>
      <div className="mb-2 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
      </div>
      {lines.map((l, i) => {
        const take = Math.max(0, Math.min(l.length, left));
        left -= take;
        const shown = l.slice(0, take);
        const active = take < l.length && take > 0;
        return (
          <div key={i} className={l.startsWith("$") ? "text-cyan-300" : "text-emerald-400/90"}>
            {shown}
            {active && <span className="caret text-slate-300">▍</span>}
          </div>
        );
      })}
    </div>
  );
}

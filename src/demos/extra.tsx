import { useEffect, useRef, useState } from "react";
import { useInView } from "./util";

/* ---- Lens(放大镜) ---- */
export function Lens() {
  const [p, setP] = useState<{ x: number; y: number } | null>(null);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-[#1e2534]" style={{ background: "radial-gradient(#1e253488 1px, transparent 1px) #0b0e16", backgroundSize: "16px 16px" }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: e.clientX - r.left, y: e.clientY - r.top }); }} onMouseLeave={() => setP(null)}>
        <div className="absolute inset-0 grid place-items-center text-xs text-slate-500">移动鼠标放大细节</div>
        {p && (
          <div className="pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-cyan-400/60" style={{ left: p.x, top: p.y, boxShadow: "0 0 24px #22d3ee44" }}>
            <div className="absolute" style={{ background: "radial-gradient(#22d3ee 2px, transparent 2px) #0b0e16", backgroundSize: "32px 32px", width: 256, height: 160, left: 80 - p.x * 2, top: 80 - p.y * 2 }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- 3D Pin ---- */
export function ThreeDPin() {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" style={{ perspective: 600 }} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div className="relative">
        <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-pink-500 text-white" style={{ boxShadow: "0 0 20px #f472b688" }}>📍</span>
        <span className="absolute left-1/2 top-full h-8 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-pink-400 to-transparent transition-transform duration-300" style={{ transform: `translateX(-50%) scaleY(${on ? 1 : 0})` }} />
        <span className="absolute left-1/2 top-10 w-40 -translate-x-1/2 rounded-lg border border-[#1e2534] bg-[#0b0e16] p-3 transition-all duration-300" style={{ opacity: on ? 1 : 0, transform: `translateX(-50%) translateY(${on ? 8 : -6}px) rotateX(${on ? 0 : -30}deg)` }}>
          <span className="block text-[10px] font-semibold text-slate-200">东京 · 35.68°N</span>
          <span className="block text-[9px] text-slate-500">悬停图钉弹出位置卡片</span>
        </span>
      </div>
    </div>
  );
}

/* ---- World Map(点阵世界地图) ---- */
export function WorldMap() {
  const { ref, inView } = useInView<HTMLCanvasElement>();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio);
    cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr;
    // 用简化的大陆轮廓函数画点阵
    const land = (x: number, y: number) => {
      const r = Math.hypot((x - 0.3) * 1.4, (y - 0.42) * 2.2) < 0.16 || Math.hypot((x - 0.28) * 2.6, (y - 0.72) * 2.0) < 0.14
        || Math.hypot((x - 0.52) * 2.4, (y - 0.45) * 2.0) < 0.13 || Math.hypot((x - 0.56) * 2.8, (y - 0.72) * 2.4) < 0.13
        || Math.hypot((x - 0.72) * 1.8, (y - 0.5) * 2.2) < 0.17 || Math.hypot((x - 0.85) * 3.4, (y - 0.8) * 3.0) < 0.1;
      return r;
    };
    let raf = 0;
    const draw = (t: number) => {
      const w = cv.width, h = cv.height;
      ctx.clearRect(0, 0, w, h);
      for (let gx = 0; gx < 60; gx++)
        for (let gy = 0; gy < 30; gy++) {
          const x = gx / 60, y = gy / 30;
          if (!land(x, y)) continue;
          const tw = 0.5 + 0.5 * Math.sin(t / 700 + gx * 0.7 + gy * 1.1);
          ctx.beginPath();
          ctx.arc(x * w, y * h, (0.7 + tw) * dpr, 0, 6.28);
          ctx.fillStyle = `rgba(103,232,249,${0.25 + tw * 0.55})`;
          ctx.fill();
        }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [inView, ref]);
  return (
    <div className="demo-frame absolute inset-0">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute bottom-2 left-3 text-[9px] text-slate-500">点阵世界 · 呼吸闪烁</div>
    </div>
  );
}

/* ---- GitHub Globe(点阵球体) ---- */
export function GithubGlobe() {
  const { ref, inView } = useInView<HTMLCanvasElement>();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio);
    cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr;
    const pts = Array.from({ length: 220 }, () => {
      const th = Math.acos(2 * Math.random() - 1), ph = Math.random() * 6.28;
      return { th, ph };
    });
    let raf = 0;
    const draw = (t: number) => {
      const w = cv.width, h = cv.height, R = Math.min(w, h) * 0.36, cx = w / 2, cy = h / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.28);
      ctx.fillStyle = "rgba(34,211,238,0.05)"; ctx.fill();
      for (const p of pts) {
        const ph = p.ph + t / 2600;
        const x = Math.sin(p.th) * Math.cos(ph), y = Math.cos(p.th), z = Math.sin(p.th) * Math.sin(ph);
        const sx = cx + x * R, sy = cy + y * R;
        const a = (z + 1) / 2;
        ctx.beginPath(); ctx.arc(sx, sy, (0.6 + a) * dpr, 0, 6.28);
        ctx.fillStyle = `rgba(103,232,249,${0.15 + a * 0.75})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [inView, ref]);
  return (
    <div className="demo-frame absolute inset-0">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/* ---- ASCII Art ---- */
export function AsciiArt() {
  const [k, setK] = useState(0);
  const chars = " .:-=+*#%@";
  useEffect(() => { const t = setInterval(() => setK((p) => p + 1), 140); return () => clearInterval(t); }, []);
  const rows = 9, cols = 26;
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center font-mono text-[8px] leading-[9px] text-emerald-400">
      <pre>
        {Array.from({ length: rows }, (_, y) =>
          Array.from({ length: cols }, (_, x) => {
            const v = Math.sin(x / 3 + k / 2) * Math.cos(y / 2 - k / 3);
            return chars[Math.max(0, Math.min(9, Math.floor((v + 1) * 5)))];
          }).join("")
        ).join("\n")}
      </pre>
    </div>
  );
}

/* ---- Chromatic Image(RGB 色散) ---- */
export function ChromaticImage() {
  const [p, setP] = useState({ x: 50, y: 50 });
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: ((e.clientX - r.left) / r.width - 0.5) * 10, y: ((e.clientY - r.top) / r.height - 0.5) * 10 }); }}>
      <div className="relative text-3xl font-black text-white">
        <span className="absolute inset-0 text-red-500/70" style={{ transform: `translate(${-p.x}px, ${-p.y}px)` }}>CHROMA</span>
        <span className="absolute inset-0 text-cyan-400/70" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>CHROMA</span>
        <span className="relative mix-blend-screen">CHROMA</span>
      </div>
      <span className="absolute bottom-2 text-[9px] text-slate-600">鼠标驱动 RGB 色散</span>
    </div>
  );
}

/* ---- SVG Mask Effect(文字蒙版) ---- */
export function SvgMaskEffect() {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div className="relative text-4xl font-black tracking-tight">
        <span className="text-[#1e2534]">MOTION</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent transition-opacity duration-700" style={{ opacity: on ? 1 : 0 }}>MOTION</span>
        <span className="absolute -inset-8 rounded-full bg-cyan-400/20 blur-2xl transition-opacity duration-700" style={{ opacity: on ? 1 : 0 }} />
      </div>
      <span className="absolute bottom-2 text-[9px] text-slate-600">悬停揭示渐变蒙版</span>
    </div>
  );
}

/* ---- Scales(鱼鳞纹) ---- */
export function Scales() {
  return (
    <div className="demo-frame absolute inset-0" style={{ background: "radial-gradient(circle at 50% 0%, #22d3ee18 0, transparent 70%), #05060a", backgroundImage: "radial-gradient(circle at 50% 100%, transparent 24%, #22d3ee22 25%, transparent 26%), radial-gradient(circle at 0% 100%, transparent 24%, #8b5cf622 25%, transparent 26%), radial-gradient(circle at 100% 100%, transparent 24%, #8b5cf622 25%, transparent 26%)", backgroundSize: "40px 20px" }}>
      <div className="absolute inset-0 grid place-items-center"><span className="rounded bg-[#05060acc] px-3 py-1 text-[10px] text-cyan-200">Scales 鳞片纹</span></div>
    </div>
  );
}

/* ---- Dither Shader(抖动渐变) ---- */
export function DitherShader() {
  const { ref, inView } = useInView<HTMLCanvasElement>();
  useEffect(() => {
    if (!inView || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d")!;
    let raf = 0;
    const draw = (t: number) => {
      const w = cv.clientWidth, h = cv.clientHeight, px = 5;
      for (let y = 0; y < h; y += px)
        for (let x = 0; x < w; x += px) {
          const v = (Math.sin(x / 70 + t / 1200) + Math.cos(y / 60 - t / 1400) + 2) / 4;
          const bayer = ((x / px) % 2 + (y / px) % 2) / 2;
          ctx.fillStyle = v > bayer ? "#0e7490" : "#05060a";
          ctx.fillRect(x, y, px, px);
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

/* ---- Notch(缺口卡片) ---- */
export function Notch() {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative h-32 w-60 rounded-xl border border-[#1e2534] bg-[#0b0e16] p-4" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#1e2534] bg-[#05060a] px-3 py-1 transition-all duration-300" style={{ width: on ? 130 : 60 }}>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          <span className="whitespace-nowrap text-[9px] text-slate-300 transition-opacity duration-300" style={{ opacity: on ? 1 : 0 }}>正在处理 · 3 个任务</span>
        </div>
        <div className="mt-2 text-[10px] font-semibold text-slate-200">Notch Card</div>
        <div className="text-[9px] text-slate-500">悬停展开顶部缺口徽章</div>
      </div>
    </div>
  );
}

/* ---- Images Badge(徽章展开图集) ---- */
export function ImagesBadge() {
  const [on, setOn] = useState(false);
  const cs = ["#22d3ee", "#8b5cf6", "#f472b6"];
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
        <div className="flex items-center gap-1.5 rounded-full border border-[#1e2534] bg-[#0b0e16] px-3 py-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-500/20 text-[9px] text-cyan-300">+3</span>
          <span className="text-[10px] text-slate-300">设计图</span>
        </div>
        <div className="absolute left-1/2 top-full mt-2 flex -translate-x-1/2 gap-1.5 transition-all duration-300" style={{ opacity: on ? 1 : 0, transform: `translateX(-50%) translateY(${on ? 0 : -8}px)` }}>
          {cs.map((c, i) => (
            <span key={i} className="h-14 w-20 rounded-lg border border-[#1e2534]" style={{ background: `linear-gradient(135deg, ${c}44, #0b0e16)`, transitionDelay: `${i * 60}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Resizable Navbar(拖拽宽度) ---- */
export function ResizableNavbar() {
  const [w, setW] = useState(220);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-start pt-8">
      <div className="relative flex items-center rounded-full border border-[#1e2534] bg-[#0b0e16] py-2" style={{ width: w }}>
        {["首页", "组件", "画廊", "关于"].map((t, i) => (
          <span key={t} className="flex-1 whitespace-nowrap text-center text-[10px] text-slate-400" style={{ opacity: w > 120 + i * 40 ? 1 : 0 }}>{t}</span>
        ))}
        <span className="absolute -right-1 top-1/2 h-6 w-2 -translate-y-1/2 cursor-ew-resize rounded bg-[#1e2534] touch-none" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const sx = e.clientX, sw = w; const mv = (ev: PointerEvent) => setW(Math.max(100, Math.min(300, sw + ev.clientX - sx))); const up = () => { removeEventListener("pointermove", mv); removeEventListener("pointerup", up); }; addEventListener("pointermove", mv); addEventListener("pointerup", up); }} />
      </div>
      <span className="mt-8 w-full text-center text-[9px] text-slate-600">拖右侧把手调整导航宽度</span>
    </div>
  );
}

/* ---- Sidebar(可折叠侧栏) ---- */
export function SidebarDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="demo-frame absolute inset-0 flex">
      <div className="flex h-full flex-col gap-1 border-r border-[#141a28] bg-[#0b0e16] p-2 transition-all duration-300" style={{ width: open ? 110 : 40 }}>
        {["🏠", "📦", "🎨", "⚙️"].map((e, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#111827]">
            <span className="text-sm">{e}</span>
            <span className="whitespace-nowrap text-[10px] text-slate-400" style={{ opacity: open ? 1 : 0 }}>{["首页", "资源", "资产", "设置"][i]}</span>
          </div>
        ))}
        <button className="mt-auto rounded-lg px-2 py-1.5 text-left text-[10px] text-slate-500 hover:bg-[#111827]" onClick={() => setOpen(!open)}>{open ? "◀ 收起" : "▶"}</button>
      </div>
      <div className="grid flex-1 place-items-center text-[10px] text-slate-600">内容区 · 点击左下折叠</div>
    </div>
  );
}

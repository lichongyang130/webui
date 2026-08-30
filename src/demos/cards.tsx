import { useRef, useState } from "react";
import { rnd } from "./util";

/* ---- 3D Card Effect ---- */
export function ThreeDCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [st, setSt] = useState<{ rx: number; ry: number; gx: number; gy: number } | null>(null);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" style={{ perspective: 700 }}>
      <div
        ref={ref}
        className="relative h-40 w-64 rounded-xl border border-[#1e2534] bg-gradient-to-br from-[#0b1220] to-[#111827] p-4 transition-transform duration-150"
        style={{ transform: st ? `rotateX(${st.rx}deg) rotateY(${st.ry}deg)` : "" }}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          setSt({ rx: (0.5 - py) * 24, ry: (px - 0.5) * 24, gx: px, gy: py });
        }}
        onMouseLeave={() => setSt(null)}
      >
        {st && <div className="pointer-events-none absolute inset-0 rounded-xl" style={{ background: `radial-gradient(circle at ${st.gx * 100}% ${st.gy * 100}%, #ffffff22, transparent 45%)` }} />}
        <div className="text-xs font-semibold text-cyan-300">3D Card</div>
        <div className="mt-1 text-[10px] text-slate-500">移动鼠标感受透视与眩光</div>
        <div className="absolute bottom-3 right-3 text-3xl font-black text-[#1e2534]">3D</div>
      </div>
    </div>
  );
}

/* ---- Card Spotlight ---- */
export function CardSpotlight() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div
        className="relative h-40 w-64 overflow-hidden rounded-xl border border-[#1e2534] bg-[#0b0e16] p-4"
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
        onMouseLeave={() => setPos(null)}
      >
        {pos && <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, #22d3ee33, transparent 70%)` }} />}
        <div className="relative text-xs font-semibold text-slate-200">Card Spotlight</div>
        <div className="relative mt-1 text-[10px] text-slate-500">聚光灯跟随鼠标</div>
      </div>
    </div>
  );
}

/* ---- Glare Card ---- */
export function GlareCard() {
  const [p, setP] = useState<{ x: number; y: number } | null>(null);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative h-40 w-64 overflow-hidden rounded-xl p-4" style={{ background: "linear-gradient(135deg,#1e293b,#0f172a)" }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: e.clientX - r.left, y: e.clientY - r.top }); }} onMouseLeave={() => setP(null)}>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" style={{ opacity: p ? 1 : 0, background: p ? `radial-gradient(circle 160px at ${p.x}px ${p.y}px, #67e8f955, #8b5cf622 40%, transparent 70%)` : "" }} />
        <div className="relative text-xs font-semibold text-white">Glare Card</div>
        <div className="relative mt-1 text-[10px] text-slate-400">彩色眩光跟随指针</div>
      </div>
    </div>
  );
}

/* ---- Wobble Card ---- */
export function WobbleCard() {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="h-40 w-64 rounded-xl bg-gradient-to-br from-violet-600/40 to-cyan-500/30 p-4" style={{ animation: on ? "wobble 1s ease infinite" : "" }} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
        <div className="text-xs font-semibold text-white">Wobble Card</div>
        <div className="mt-1 text-[10px] text-slate-300">悬停开始摇摆</div>
      </div>
    </div>
  );
}

/* ---- Card Stack ---- */
export function CardStack() {
  const [top, setTop] = useState(0);
  const cards = ["#22d3ee", "#8b5cf6", "#f472b6"];
  return (
    <div className="demo-frame absolute inset-0 grid cursor-pointer place-items-center" style={{ perspective: 800 }} onClick={() => setTop((top + 1) % 3)}>
      {cards.map((c, i) => {
        const off = (i - top + 3) % 3;
        return (
          <div key={i} className="absolute h-36 w-56 rounded-xl border border-[#1e2534] p-4 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${c}33, #0b0e16)`, transform: `translateY(${off * -14}px) scale(${1 - off * 0.05}) rotateX(${off * 6}deg)`, zIndex: 3 - off, opacity: off === 2 ? 0.4 : 1 }}>
            <div className="text-xs font-semibold" style={{ color: c }}>卡片 {i + 1}</div>
            <div className="mt-1 text-[10px] text-slate-400">点击切换堆叠顺序</div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Evervault Card(字符矩阵) ---- */
export function EvervaultCard() {
  const [grid, setGrid] = useState<string[]>(() => Array.from({ length: 96 }, () => String.fromCharCode(rnd(33, 126))));
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-[#1e2534] bg-[#0b0e16]">
        <div className="grid grid-cols-12 gap-0.5 p-1 font-mono text-[7px] leading-3 text-cyan-400/60">
          {grid.map((c, i) => <span key={i} style={{ color: on ? `rgba(103,232,249,${0.2 + Math.random() * 0.8})` : "" }}>{on ? String.fromCharCode(rnd(33, 126)) : c}</span>)}
        </div>
        <div className="absolute inset-0 grid place-items-center"><span className="rounded bg-[#05060acc] px-2 py-1 text-[10px] text-slate-300">悬停重算字符矩阵</span></div>
      </div>
    </div>
  );
}

/* ---- Comet Card ---- */
export function CometCard() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-[#1e2534] bg-[#0b0e16] p-4">
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute h-px w-16" style={{ top: `${20 + i * 30}%`, right: "-70px", background: "linear-gradient(90deg, #67e8f9, transparent)", animation: `sweepX 3s linear ${i * 1}s infinite`, filter: "drop-shadow(0 0 6px #22d3ee)" }} />
        ))}
        <div className="relative text-xs font-semibold text-slate-200">Comet Card</div>
        <div className="relative mt-1 text-[10px] text-slate-500">彗尾划过卡面</div>
      </div>
    </div>
  );
}

/* ---- Draggable Card ---- */
export function DraggableCard() {
  const [p, setP] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const start = useRef({ x: 0, y: 0, px: 0, py: 0 });
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center touch-none select-none">
      <div
        className="h-32 w-52 cursor-grab rounded-xl bg-gradient-to-br from-amber-500/30 to-pink-500/30 p-4 active:cursor-grabbing"
        style={{ transform: `translate(${p.x}px, ${p.y}px) rotate(${p.x / 22}deg)`, transition: drag ? "none" : "transform .5s cubic-bezier(.34,1.56,.64,1)" }}
        onPointerDown={(e) => { setDrag(true); start.current = { x: e.clientX, y: e.clientY, px: p.x, py: p.y }; (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (drag) setP({ x: start.current.px + e.clientX - start.current.x, y: start.current.py + e.clientY - start.current.y }); }}
        onPointerUp={() => { setDrag(false); setP({ x: 0, y: 0 }); }}
      >
        <div className="text-xs font-semibold text-white">Draggable Card</div>
        <div className="mt-1 text-[10px] text-slate-300">按住拖动,松手回弹</div>
      </div>
    </div>
  );
}

/* ---- Expandable Card ---- */
export function ExpandableCard() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="group flex h-40 w-56 gap-2 transition-all duration-500 hover:w-72">
        <div className="h-full w-1/2 rounded-xl bg-gradient-to-br from-cyan-500/40 to-transparent p-3 transition-all group-hover:w-1/3">
          <div className="text-[10px] font-semibold text-cyan-200">A</div>
        </div>
        <div className="hidden flex-1 rounded-xl border border-[#1e2534] bg-[#0b0e16] p-3 group-hover:block" style={{ animation: "scaleIn .4s ease" }}>
          <div className="text-[10px] font-semibold text-slate-200">展开的详情</div>
          <div className="mt-1 text-[9px] text-slate-500">悬停卡片,隐藏面板滑出</div>
        </div>
      </div>
    </div>
  );
}

/* ---- Focus Cards ---- */
export function FocusCards() {
  const [f, setF] = useState<number | null>(null);
  const cs = ["#22d3ee", "#8b5cf6", "#f472b6"];
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" onMouseLeave={() => setF(null)}>
      <div className="flex gap-3">
        {cs.map((c, i) => (
          <div key={i} className="h-36 w-24 rounded-lg border border-[#1e2534] p-2 transition-all duration-300" style={{ background: `linear-gradient(180deg, ${c}33, #0b0e16)`, filter: f !== null && f !== i ? "blur(3px) brightness(.6)" : "", transform: f === i ? "scale(1.08)" : "" }} onMouseEnter={() => setF(i)}>
            <div className="text-[9px] text-slate-400">Card {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Direction Aware Hover ---- */
export function DirectionAwareHover() {
  const [st, setSt] = useState<{ from: string; show: boolean }>({ from: "left", show: false });
  const enter = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    const from = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "bottom" : "top";
    setSt({ from, show: true });
  };
  const tr: Record<string, string> = { left: "translateX(-100%)", right: "translateX(100%)", top: "translateY(-100%)", bottom: "translateY(100%)" };
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-[#1e2534] bg-[#0b0e16]" onMouseEnter={enter} onMouseLeave={() => setSt({ ...st, show: false })}>
        <div className="absolute inset-0 grid place-items-center bg-cyan-400/20 backdrop-blur-sm transition-transform duration-300" style={{ transform: st.show ? "translate(0)" : tr[st.from] }}>
          <span className="text-xs font-semibold text-cyan-100">从「{st.from}」方向进入</span>
        </div>
        <div className="absolute bottom-2 left-2 text-[10px] text-slate-500">Direction Aware Hover</div>
      </div>
    </div>
  );
}

/* ---- Compare(拖拽对比滑块) ---- */
export function CompareDemo() {
  const [x, setX] = useState(50);
  return (
    <div className="demo-frame absolute inset-0 grid cursor-ew-resize place-items-center" onPointerMove={(e) => { if (e.buttons) { const r = e.currentTarget.getBoundingClientRect(); setX(((e.clientX - r.left) / r.width) * 100); } }} onPointerDown={(e) => { const r = e.currentTarget.getBoundingClientRect(); setX(((e.clientX - r.left) / r.width) * 100); }}>
      <div className="relative h-40 w-72 overflow-hidden rounded-xl border border-[#1e2534]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#0ea5e922_0_10px,transparent_10px_20px)]" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)`, background: "repeating-linear-gradient(-45deg,#f472b622 0 10px,transparent 10px 20px)" }} />
        <div className="absolute inset-y-0 w-0.5 bg-white/70" style={{ left: `${x}%` }}><span className="absolute top-1/2 -left-2.5 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-white text-[8px] font-black text-black">⇔</span></div>
        <span className="absolute left-2 top-2 text-[9px] text-pink-300">BEFORE</span>
        <span className="absolute right-2 top-2 text-[9px] text-cyan-300">AFTER</span>
      </div>
    </div>
  );
}

/* ---- Hover Border Gradient ---- */
export function HoverBorderGradient() {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <button className="relative rounded-lg p-px transition" style={{ background: on ? "conic-gradient(#22d3ee,#8b5cf6,#f472b6,#22d3ee)" : "#1e2534" }} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
        <span className="block rounded-[7px] bg-[#0b0e16] px-6 py-3 text-xs font-semibold text-slate-200">Hover Border</span>
      </button>
    </div>
  );
}

/* ---- Moving Border ---- */
export function MovingBorder() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative overflow-hidden rounded-lg p-px">
        <div className="absolute inset-[-150%]" style={{ background: "conic-gradient(transparent 70%, #22d3ee, transparent 85%)", animation: "spin 2.4s linear infinite" }} />
        <span className="relative block rounded-[7px] bg-[#0b0e16] px-6 py-3 text-xs font-semibold text-cyan-200">Moving Border</span>
      </div>
    </div>
  );
}

/* ---- Infinite Moving Cards ---- */
export function InfiniteMovingCards() {
  const row = ["Beams", "Aurora", "Lamp", "Spotlight", "Meteors", "Vortex"];
  return (
    <div className="demo-frame absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden py-4">
      {[0, 1].map((r) => (
        <div key={r} className="flex w-max gap-3" style={{ animation: `marquee ${r ? 26 : 20}s linear infinite ${r ? "reverse" : ""}` }}>
          {[...row, ...row].map((c, i) => (
            <div key={i} className="w-36 shrink-0 rounded-lg border border-[#1e2534] bg-[#0b0e16] p-3">
              <div className="text-[10px] font-semibold text-cyan-300">{c}</div>
              <div className="mt-1 text-[9px] text-slate-500">无缝循环第 {r + 1} 行</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---- 3D Marquee ---- */
export function ThreeDMarquee() {
  const row = ["3D", "MARQUEE", "PERSPECTIVE", "LOOP", "DEPTH", "MOTION"];
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" style={{ perspective: 400 }}>
      <div className="w-[220%]" style={{ transform: "rotateX(52deg) rotateZ(-38deg)" }}>
        {[0, 1].map((r) => (
          <div key={r} className="mb-2 flex w-max gap-2" style={{ animation: `marquee ${r ? 18 : 14}s linear infinite ${r ? "reverse" : ""}` }}>
            {[...row, ...row, ...row].map((c, i) => (
              <span key={i} className="shrink-0 rounded border border-cyan-400/30 bg-[#0b1220] px-3 py-1.5 text-[10px] text-cyan-200">{c}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Bento Grid ---- */
export function BentoGrid() {
  return (
    <div className="demo-frame absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-4">
      {[["col-span-2", "数据可视化", "#22d3ee"], ["", "实时同步", "#8b5cf6"], ["", "暗色主题", "#f472b6"], ["col-span-2", "一键部署", "#f59e0b"]].map(([span, t, c], i) => (
        <div key={i} className={`${span} group rounded-lg border border-[#1e2534] bg-[#0b0e16] p-3 transition hover:-translate-y-0.5`} style={{ boxShadow: "none" }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 24px -8px ${c}`)} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
          <span className="h-2 w-2 rounded-full" style={{ background: c as string }} />
          <div className="mt-1.5 text-[10px] font-semibold text-slate-200">{t}</div>
          <div className="mt-0.5 text-[9px] text-slate-600 group-hover:text-slate-500">Bento 布局单元</div>
        </div>
      ))}
    </div>
  );
}

/* ---- Layout Grid ---- */
export function LayoutGrid() {
  const [sel, setSel] = useState<number | null>(null);
  const cs = ["#22d3ee", "#8b5cf6", "#f472b6", "#f59e0b"];
  return (
    <div className="demo-frame absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-4">
      {cs.map((c, i) => (
        <div key={i} className="relative cursor-pointer overflow-hidden rounded-lg border border-[#1e2534] transition-all duration-500" style={{ background: `${c}22`, zIndex: sel === i ? 10 : 1, transform: sel === i ? "scale(1.06)" : sel !== null ? "scale(.94) brightness(.5)" : "" }} onClick={() => setSel(sel === i ? null : i)}>
          <div className="p-2 text-[9px] font-semibold" style={{ color: c }}>单元 {i + 1}</div>
          {sel === i && <div className="absolute inset-x-2 bottom-2 rounded bg-[#05060add] p-1.5 text-[8px] text-slate-300" style={{ animation: "scaleIn .3s ease" }}>展开详情 · 点击收回</div>}
        </div>
      ))}
    </div>
  );
}

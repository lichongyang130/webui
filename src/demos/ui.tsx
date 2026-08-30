import { useEffect, useRef, useState } from "react";
import { useInView } from "./util";

/* ---- Animated Tabs ---- */
export function AnimatedTabs() {
  const tabs = ["概览", "组件", "定价"];
  const [i, setI] = useState(0);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div>
        <div className="relative mb-4 flex rounded-full border border-[#1e2534] bg-[#0b0e16] p-1">
          <span className="absolute inset-y-1 rounded-full bg-cyan-400/15 ring-1 ring-cyan-400/40 transition-all duration-300" style={{ width: "33.33%", left: `calc(${i * 33.33}% + 4px - ${i * 4 / 3}px)` }} />
          {tabs.map((t, k) => (
            <button key={t} onClick={() => setI(k)} className={`relative w-20 py-1.5 text-xs transition ${i === k ? "text-cyan-300" : "text-slate-500"}`}>{t}</button>
          ))}
        </div>
        <div key={i} className="rounded-lg border border-[#1e2534] bg-[#0b0e16] p-4 text-center text-xs text-slate-400" style={{ animation: "scaleIn .3s ease" }}>{tabs[i]} 面板内容</div>
      </div>
    </div>
  );
}

/* ---- Carousel ---- */
export function Carousel() {
  const [i, setI] = useState(0);
  const slides = [["#22d3ee", "Slide One"], ["#8b5cf6", "Slide Two"], ["#f472b6", "Slide Three"]];
  useEffect(() => { const t = setInterval(() => setI((p) => (p + 1) % 3), 2400); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-[#1e2534]">
        <div className="flex h-full transition-transform duration-700" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map(([c, t]) => (
            <div key={t} className="grid h-full w-64 shrink-0 place-items-center" style={{ background: `linear-gradient(135deg, ${c}33, #0b0e16)` }}>
              <span className="text-sm font-semibold" style={{ color: c }}>{t}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${i === k ? "w-4 bg-cyan-400" : "w-1.5 bg-slate-600"}`} />)}
        </div>
      </div>
    </div>
  );
}

/* ---- Apple Cards Carousel ---- */
export function AppleCardsCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((p) => (p + 1) % 4), 2200); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 flex items-center justify-center" style={{ perspective: 700 }}>
      {[0, 1, 2, 3].map((k) => {
        const off = (k - i + 4) % 4;
        const c = ["#22d3ee", "#8b5cf6", "#f472b6", "#f59e0b"][k];
        return (
          <div key={k} className="absolute h-36 w-52 rounded-xl border border-[#1e2534] p-4 transition-all duration-700" style={{ background: `linear-gradient(135deg, ${c}2e, #0b0e16)`, transform: `translateX(${off * 42 - 63}px) translateZ(${-off * 60}px) rotateY(${-off * 8}deg)`, zIndex: 4 - off, opacity: off > 2 ? 0 : 1 }}>
            <div className="text-xs font-semibold" style={{ color: c }}>Card {k + 1}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Images Slider ---- */
export function ImagesSlider() {
  const [i, setI] = useState(0);
  const bgs = ["radial-gradient(circle at 30% 30%, #22d3ee44, transparent 60%)", "radial-gradient(circle at 70% 60%, #8b5cf644, transparent 60%)", "radial-gradient(circle at 40% 80%, #f472b644, transparent 60%)"];
  useEffect(() => { const t = setInterval(() => setI((p) => (p + 1) % 3), 2000); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      {bgs.map((b, k) => (
        <div key={k} className="absolute inset-0 transition-opacity duration-1000" style={{ background: b, opacity: i === k ? 1 : 0 }} />
      ))}
      <span className="relative text-sm font-semibold text-white">Images Slider · {i + 1}/3</span>
    </div>
  );
}

/* ---- Animated Tooltip ---- */
export function AnimatedTooltip() {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div className="relative">
        <span className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-sm font-bold text-white">M</span>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[#1e2534] bg-[#0b0e16] px-3 py-1.5 transition-all duration-300" style={{ opacity: on ? 1 : 0, transform: `translateX(-50%) ${on ? "translateY(0) rotate(-2deg)" : "translateY(8px)"}` }}>
          <div className="text-[10px] font-semibold text-slate-200">Motion UI</div>
          <div className="text-[9px] text-slate-500">@motion.ui · 悬停显示</div>
        </div>
      </div>
    </div>
  );
}

/* ---- Link Preview ---- */
export function LinkPreview() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <p className="text-xs text-slate-400">
        访问&nbsp;
        <span className="group relative cursor-pointer text-cyan-300 underline decoration-dotted">
          aceternity.com
          <span className="pointer-events-none absolute -top-24 left-1/2 w-44 -translate-x-1/2 scale-90 rounded-lg border border-[#1e2534] bg-[#0b0e16] p-2 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <span className="mb-1 block h-16 rounded bg-gradient-to-br from-cyan-500/30 to-violet-600/30" />
            <span className="block text-[9px] text-slate-300">站点预览卡片</span>
          </span>
        </span>
        &nbsp;查看官网
      </p>
    </div>
  );
}

/* ---- Following Pointer ---- */
export function FollowingPointer() {
  const [p, setP] = useState({ x: 50, y: 50 });
  return (
    <div className="demo-frame absolute inset-0 cursor-none" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}>
      <span className="absolute h-2 w-2 rounded-full bg-pink-400 transition-transform duration-75" style={{ left: `${p.x}%`, top: `${p.y}%`, boxShadow: "0 0 12px #f472b6" }} />
      <span className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-400/50 transition-all duration-300 ease-out" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-slate-600">指针跟随 · 圆环缓动</span>
    </div>
  );
}

/* ---- Magnetic Button ---- */
export function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <button
        ref={ref}
        className="rounded-full border border-cyan-400/40 px-8 py-3 text-xs font-semibold text-cyan-300 transition-transform duration-200 ease-out"
        onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setT({ x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35 }); }}
        onMouseLeave={() => setT({ x: 0, y: 0 })}
        style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
      >
        磁吸按钮
      </button>
    </div>
  );
}

/* ---- Stateful Button ---- */
export function StatefulButton() {
  const [s, setS] = useState<"idle" | "loading" | "done">("idle");
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <button
        className="flex w-40 items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 text-xs font-bold text-black transition-all duration-300"
        style={{ background: s === "done" ? "#34d399" : "#22d3ee" }}
        onClick={() => { if (s !== "idle") return; setS("loading"); setTimeout(() => setS("done"), 1600); setTimeout(() => setS("idle"), 3200); }}
      >
        {s === "loading" && <span className="h-3 w-3 animate-spin rounded-full border-2 border-black/30 border-t-black" />}
        {s === "idle" ? "点击提交" : s === "loading" ? "提交中…" : "✓ 成功"}
      </button>
    </div>
  );
}

/* ---- Gooey Input ---- */
export function GooeyInput() {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative" style={{ filter: "url(#goo)" }}>
        <svg width="0" height="0"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" /><feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" /></filter></defs></svg>
        <input className="relative z-10 w-56 rounded-full border border-[#1e2534] bg-[#0b0e16] px-4 py-2.5 text-xs text-slate-200 outline-none" placeholder="聚焦试试 gooey 光圈" onFocus={() => setOn(true)} onBlur={() => setOn(false)} />
        {[-1, 1].map((d) => (
          <span key={d} className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-cyan-400/60 transition-all duration-500" style={{ [d < 0 ? "left" : "right"]: on ? -8 : 12, opacity: on ? 1 : 0 }} />
        ))}
      </div>
    </div>
  );
}

/* ---- Terminal ---- */
export function TerminalDemo() {
  const lines = ["$ npx create-aceternity-ui@latest my-app", "✔ 模板拉取完成", "$ cd my-app && npm run dev", "▲  http://localhost:3000"];
  const [n, setN] = useState(0);
  useEffect(() => { const t = setInterval(() => setN((p) => (p + 1) % (lines.length + 2)), 1200); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 p-4">
      <div className="h-full rounded-lg border border-[#1e2534] bg-[#020409] p-3 font-mono text-[10px] leading-5">
        <div className="mb-2 flex gap-1.5"><i className="h-2 w-2 rounded-full bg-red-500/70" /><i className="h-2 w-2 rounded-full bg-amber-400/70" /><i className="h-2 w-2 rounded-full bg-emerald-400/70" /></div>
        {lines.slice(0, Math.min(n, lines.length)).map((l) => <div key={l} className={l.startsWith("$") ? "text-cyan-300" : "text-emerald-400/80"}>{l}</div>)}
        <span className="caret inline-block h-3 w-1.5 bg-cyan-300 align-middle" />
      </div>
    </div>
  );
}

/* ---- Keyboard ---- */
export function KeyboardDemo() {
  const keys = "QWERTYUIOPASDFGHJKL".split("");
  const [hit, setHit] = useState<string | null>(null);
  useEffect(() => { const t = setInterval(() => setHit(keys[Math.floor(Math.random() * keys.length)]), 500); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="grid grid-cols-10 gap-1">
        {keys.map((k) => (
          <span key={k} className={`grid h-6 w-6 place-items-center rounded border text-[8px] font-bold transition-all duration-150 ${hit === k ? "-translate-y-0.5 border-cyan-400 bg-cyan-400/20 text-cyan-200" : "border-[#1e2534] bg-[#0b0e16] text-slate-600"}`} style={hit === k ? { boxShadow: "0 0 12px #22d3ee66" } : {}}>{k}</span>
        ))}
      </div>
    </div>
  );
}

/* ---- Floating Dock ---- */
export function FloatingDock() {
  const items = ["🚀", "🎨", "🧩", "⚡", "🔮", "🌊"];
  const [near, setNear] = useState<number | null>(null);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="flex items-end gap-2 rounded-2xl border border-[#1e2534] bg-[#0b0e16] px-4 py-3">
        {items.map((e, i) => (
          <span key={i} className="grid cursor-pointer place-items-center rounded-xl bg-[#111827] transition-all duration-200" style={{ width: near === i ? 52 : near !== null && Math.abs(near - i) === 1 ? 44 : 36, height: near === i ? 52 : near !== null && Math.abs(near - i) === 1 ? 44 : 36, fontSize: near === i ? 22 : 16 }} onMouseEnter={() => setNear(i)} onMouseLeave={() => setNear(null)}>{e}</span>
        ))}
      </div>
    </div>
  );
}

/* ---- Floating Navbar ---- */
export function FloatingNavbar() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-start pt-6">
      <div className="mx-auto flex items-center gap-1 rounded-full border border-[#1e2534] bg-[#0b0e1699] px-2 py-1.5 backdrop-blur" style={{ animation: "scaleIn .5s ease", boxShadow: "0 8px 40px -12px rgba(34,211,238,.25)" }}>
        {["首页", "组件", "画廊", "向导"].map((t, i) => (
          <span key={t} className={`cursor-pointer rounded-full px-3 py-1 text-[10px] transition ${i === 0 ? "bg-cyan-400/15 text-cyan-300" : "text-slate-400 hover:text-slate-200"}`}>{t}</span>
        ))}
      </div>
      <span className="mt-6 w-full text-center text-[9px] text-slate-600">悬浮胶囊导航 · 毛玻璃</span>
    </div>
  );
}

/* ---- Animated Modal ---- */
export function AnimatedModal() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <button onClick={() => setOpen(true)} className="rounded-lg border border-violet-400/40 px-5 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-400/10">打开模态框</button>
      {open && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-64 rounded-xl border border-[#1e2534] bg-[#0b0e16] p-5" style={{ animation: "scaleIn .35s cubic-bezier(.34,1.56,.64,1)" }}>
            <div className="text-sm font-bold text-white">Animated Modal</div>
            <div className="mt-1 text-[10px] leading-4 text-slate-500">弹性缩放入场,点击遮罩关闭。</div>
            <button onClick={() => setOpen(false)} className="mt-3 w-full rounded-lg bg-violet-500/80 py-1.5 text-[10px] font-bold text-white">关闭</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Placeholders & Vanish Input ---- */
export function VanishInput() {
  const phs = ["搜索组件…", "试试 “beams”…", "输入关键词…"];
  const [pi, setPi] = useState(0), [v, setV] = useState(""), [gone, setGone] = useState(false);
  useEffect(() => { const t = setInterval(() => setPi((p) => (p + 1) % phs.length), 2200); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!v) return; setGone(true); setTimeout(() => { setV(""); setGone(false); }, 700); }}>
        <input value={v} onChange={(e) => setV(e.target.value)} placeholder={phs[pi]} className="w-48 rounded-lg border border-[#1e2534] bg-[#0b0e16] px-3 py-2 text-xs text-slate-200 outline-none transition focus:border-cyan-400/50" style={gone ? { opacity: 0, transform: "translateY(-14px) scale(.9)", transition: "all .5s ease" } : {}} />
        <button className="rounded-lg bg-cyan-500 px-3 text-[10px] font-bold text-black">发送</button>
      </form>
    </div>
  );
}

/* ---- Signup Form ---- */
export function SignupForm() {
  const [ok, setOk] = useState(false);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <form className="w-60 space-y-2.5 rounded-xl border border-[#1e2534] bg-[#0b0e16] p-4" onSubmit={(e) => { e.preventDefault(); setOk(true); setTimeout(() => setOk(false), 2500); }}>
        <div className="text-xs font-bold text-white">创建账号</div>
        {["邮箱", "密码"].map((p) => (
          <input key={p} type={p === "密码" ? "password" : "email"} placeholder={p} className="w-full rounded-lg border border-[#1e2534] bg-[#05060a] px-3 py-2 text-[10px] text-slate-200 outline-none transition focus:border-cyan-400/60 focus:shadow-[0_0_0_3px_#22d3ee22]" />
        ))}
        <button className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 py-2 text-[10px] font-bold text-black">{ok ? "✓ 注册成功" : "注册"}</button>
      </form>
    </div>
  );
}

/* ---- File Upload ---- */
export function FileUpload() {
  const [p, setP] = useState(-1);
  useEffect(() => { if (p < 0 || p >= 100) return; const t = setTimeout(() => setP(p + 4), 60); return () => clearTimeout(t); }, [p]);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="w-56 cursor-pointer rounded-xl border-2 border-dashed border-[#1e2534] p-5 text-center transition hover:border-cyan-400/50 hover:bg-cyan-400/5" onClick={() => setP(0)}>
        <div className="text-xl">📄</div>
        <div className="mt-1 text-[10px] text-slate-400">{p < 0 ? "点击模拟上传" : p >= 100 ? "✓ 上传完成" : `上传中 ${p}%`}</div>
        {p >= 0 && <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1e2534]"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all" style={{ width: `${Math.min(p, 100)}%` }} /></div>}
      </div>
    </div>
  );
}

/* ---- Loaders ---- */
export function Loaders() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="flex items-center gap-8">
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-[#1e2534] border-t-cyan-400" />
        <span className="flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="h-2 w-2 rounded-full bg-violet-400" style={{ animation: `twinkle 1s ease ${i * 0.2}s infinite` }} />)}</span>
        <span className="flex h-7 items-end gap-0.5">{[10, 18, 26, 18, 10].map((h, i) => <i key={i} className="w-1 rounded-full bg-pink-400" style={{ height: h, animation: `twinkle .9s ease ${i * 0.12}s infinite` }} />)}</span>
      </div>
    </div>
  );
}

/* ---- Code Block ---- */
export function CodeBlock() {
  const [copied, setCopied] = useState(false);
  const code = `import { BackgroundBeams } from "@/components/ui/background-beams";\n\nexport default function Hero() {\n  return <BackgroundBeams />;\n}`;
  return (
    <div className="demo-frame absolute inset-0 p-4">
      <div className="h-full overflow-hidden rounded-lg border border-[#1e2534] bg-[#020409]">
        <div className="flex items-center justify-between border-b border-[#141a28] px-3 py-1.5">
          <span className="text-[9px] text-slate-500">hero.tsx</span>
          <button className="text-[9px] text-cyan-400" onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? "✓ 已复制" : "复制"}</button>
        </div>
        <pre className="p-3 font-mono text-[9px] leading-4 text-slate-300">{code.split("\n").map((l, i) => (
          <div key={i}><span className="mr-2 text-slate-700">{i + 1}</span>{l.replace(/(import|from|export default function|return)/g, "") ? <span>{l}</span> : l}</div>
        ))}</pre>
      </div>
    </div>
  );
}

/* ---- Timeline ---- */
export function Timeline() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="demo-frame absolute inset-0 grid place-items-center px-8">
      <div className="relative w-full max-w-sm">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#1e2534]">
          <div className="w-full bg-gradient-to-b from-cyan-400 to-violet-500 transition-all duration-[1600ms]" style={{ height: inView ? "100%" : "0%" }} />
        </div>
        {["立项", "开发", "发布"].map((s, i) => (
          <div key={s} className={`relative mb-8 flex last:mb-0 ${i % 2 ? "justify-end" : ""}`}>
            <span className="absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-cyan-400 bg-[#05060a]" />
            <div className="w-2/5 rounded-lg border border-[#1e2534] bg-[#0b0e16] p-2 text-[10px] text-slate-300">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Sticky Scroll Reveal(容器内滚动) ---- */
export function StickyScrollReveal() {
  return (
    <div className="demo-frame absolute inset-0">
      <div className="h-full overflow-y-auto">
        {[["#22d3ee", "第一步"], ["#8b5cf6", "第二步"], ["#f472b6", "第三步"]].map(([c, t], i) => (
          <div key={i} className="sticky top-0 grid h-full place-items-center border-b border-[#141a28]" style={{ background: `linear-gradient(180deg, ${c}1e, #05060a 70%)` }}>
            <div className="text-center"><div className="text-lg font-black" style={{ color: c }}>{t}</div><div className="mt-1 text-[10px] text-slate-500">在框内滚动体验 sticky 堆叠</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Parallax Scroll(容器内滚动视差) ---- */
export function ParallaxScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [sy, setSy] = useState(0);
  return (
    <div ref={ref} className="demo-frame absolute inset-0 overflow-y-auto" onScroll={(e) => setSy(e.currentTarget.scrollTop)}>
      <div className="relative h-[220%]">
        <div className="sticky top-0 grid h-[45%] place-items-center text-xs font-bold text-cyan-300" style={{ transform: `translateY(${sy * -0.15}px)` }}>远景层 · 慢速</div>
        <div className="sticky top-[45%] grid h-[45%] place-items-center text-sm font-bold text-violet-300" style={{ transform: `translateY(${sy * -0.05}px)` }}>中景层</div>
        <div className="sticky top-[90%] grid h-[45%] place-items-center text-base font-black text-pink-300">近景层 · 跟随</div>
      </div>
    </div>
  );
}

/* ---- Tailwindcss Buttons ---- */
export function TailwindButtons() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative">
        <span className="absolute -inset-1 rounded-full blur-md" style={{ background: "linear-gradient(90deg,#22d3ee,#8b5cf6,#f472b6)", opacity: 0.6, animation: "twinkle 2s ease infinite" }} />
        <button className="relative rounded-full bg-[#05060a] px-7 py-2.5 text-xs font-bold text-white">✦ 彩虹按钮</button>
      </div>
    </div>
  );
}

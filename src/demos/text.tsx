import { useEffect, useRef, useState } from "react";
import { useInView } from "./util";

/* ---- Flip Words ---- */
export function FlipWords() {
  const words = ["beautiful", "modern", "blazing", "elegant"];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((p) => (p + 1) % words.length), 2000); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center text-xl font-bold text-white">
      <span>Build&nbsp;</span>
      <span key={i} className="flip-in inline-block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">{words[i]}</span>
      <span>&nbsp;websites</span>
    </div>
  );
}

/* ---- Container Text Flip(逐字翻转) ---- */
export function ContainerTextFlip() {
  const [k, setK] = useState(0);
  const text = "CONTAINER FLIP";
  useEffect(() => { const t = setInterval(() => setK((p) => p + 1), 2600); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center" style={{ perspective: 400 }}>
      <span className="text-2xl font-black tracking-widest text-cyan-300">
        {text.split("").map((c, i) => (
          <span key={`${k}-${i}`} className="inline-block" style={{ animation: `charFlipIn .5s ease ${(i % 8) * 60}ms backwards` }}>{c}</span>
        ))}
      </span>
    </div>
  );
}

/* ---- Text Generate Effect ---- */
export function TextGenerate() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [k, setK] = useState(0);
  useEffect(() => { if (inView) { setK((p) => p + 1); const t = setInterval(() => setK((p) => p + 1), 4000); return () => clearInterval(t); } }, [inView]);
  return (
    <div ref={ref} className="demo-frame absolute inset-0 grid place-items-center px-6 text-center text-base leading-7 text-slate-300">
      <p key={k}>
        {"Aceternity makes motion effortless. Ship landing pages with cinematic effects in minutes, not days.".split(" ").map((w, i) => (
          <span key={`${k}-${i}`} className="inline-block" style={{ animation: `blurWordIn .6s ease ${i * 70}ms backwards` }}>{w}&nbsp;</span>
        ))}
      </p>
    </div>
  );
}

/* ---- Typewriter ---- */
export function Typewriter() {
  const phrases = ["npm i @aceternity/typewriter", "type like a human…", "delete and retype ✂️"];
  const [pi, setPi] = useState(0), [len, setLen] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[pi];
    const t = setTimeout(() => {
      if (!del && len < full.length) setLen(len + 1);
      else if (!del && len === full.length) setTimeout(() => setDel(true), 1200), setLen(len);
      else if (del && len > 0) setLen(len - 1);
      else { setDel(false); setPi((pi + 1) % phrases.length); }
    }, del ? 40 : 75);
    return () => clearTimeout(t);
  }, [len, del, pi]);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center font-mono text-sm text-cyan-300">
      <span>{phrases[pi].slice(0, len)}</span><span className="caret ml-0.5 inline-block h-4 w-2 bg-cyan-300 align-middle" />
    </div>
  );
}

/* ---- Encrypted Text(hover 乱码解密) ---- */
export function EncryptedText() {
  const target = "TOP SECRET DATA";
  const [out, setOut] = useState("░▒▓█▓▒░▒▓█▓▒░▒");
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    let n = 0;
    const t = setInterval(() => {
      n++;
      setOut(target.split("").map((c, i) => (i < n ? c : "▚▞▛▜▙▟"[Math.floor(Math.random() * 6)])).join(""));
      if (n >= target.length) { clearInterval(t); setRun(false); }
    }, 70);
    return () => clearInterval(t);
  }, [run]);
  return (
    <div className="demo-frame absolute inset-0 grid cursor-pointer place-items-center font-mono text-lg tracking-widest text-emerald-400" onMouseEnter={() => { setOut("▚▞▛▜▙▟▚▞▛▜▙▟▒▓"); setRun(true); }}>
      {out}
    </div>
  );
}

/* ---- Colourful Text ---- */
export function ColourfulText() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <span className="text-2xl font-black" style={{ background: "linear-gradient(90deg,#22d3ee,#8b5cf6,#f472b6,#f59e0b,#22d3ee)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", color: "transparent", animation: "geminiSweep 4s linear infinite" }}>
        Colourful Text
      </span>
    </div>
  );
}

/* ---- Squiggly Text ---- */
export function SquigglyText() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative pb-3 text-2xl font-bold text-white">
        Squiggly Text
        <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 120 12" preserveAspectRatio="none">
          <path d="M0 6 Q 15 0, 30 6 T 60 6 T 90 6 T 120 6" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" style={{ animation: "dashMove 1.2s linear infinite" }} />
        </svg>
      </div>
    </div>
  );
}

/* ---- Text Hover Effect(悬停逐字点亮) ---- */
export function TextHoverEffect() {
  const text = "HOVER ME PLEASE";
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center text-2xl font-black tracking-widest">
      {text.split("").map((c, i) => (
        <span key={i} className="inline-block transition-all duration-200" style={{ color: hover !== null && Math.abs(hover - i) < 3 ? "#67e8f9" : "#334155", transform: hover !== null && Math.abs(hover - i) < 2 ? "translateY(-3px) scale(1.15)" : "", textShadow: hover !== null && Math.abs(hover - i) < 2 ? "0 0 18px #22d3eeaa" : "" }} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </div>
  );
}

/* ---- Tracing Beam ---- */
export function TracingBeam() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="relative pl-8 pr-4">
        <div className="absolute left-2 top-0 h-full w-px bg-[#1e2534]" />
        <div className="absolute left-[5px] top-0 h-24 w-[7px] rounded-full" style={{ background: "linear-gradient(to bottom, transparent, #22d3ee, #8b5cf6, transparent)", filter: "blur(1px)", animation: "beamTrace 2.4s linear infinite" }} />
        {["安装依赖", "配置主题", "拼装区块", "导出上线"].map((s, i) => (
          <div key={s} className="mb-6 flex items-start gap-3 last:mb-0">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 10px #22d3ee" }} />
            <div><div className="text-xs font-semibold text-slate-200">Step {i + 1}</div><div className="text-[11px] text-slate-500">{s}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Google Gemini Effect(文字流光) ---- */
export function GeminiEffect() {
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <p className="px-8 text-center text-base font-semibold" style={{ background: "linear-gradient(90deg,#94a3b8 40%,#fff 50%,#94a3b8 60%)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", color: "transparent", animation: "geminiSweep 3s linear infinite" }}>
        像 Gemini 一样的文字扫光效果
      </p>
    </div>
  );
}

/* ---- Text Flipping Board(机场翻牌) ---- */
export function FlippingBoard() {
  const letters = "DEPARTURE✈BEIJING0831";
  const [k, setK] = useState(0);
  useEffect(() => { const t = setInterval(() => setK((p) => p + 1), 1800); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center gap-0" style={{ perspective: 500 }}>
      <div className="flex gap-1">
        {letters.split("").map((c, i) => (
          <span key={`${k}-${i}`} className="grid h-8 w-6 place-items-center rounded bg-[#111827] text-sm font-bold text-amber-300" style={{ animation: `boardFlap .5s ease ${(i * 90) % 900}ms` }}>{k % 2 === 0 ? c : "ABCDEFGHJKLMNPRSTUVWXZ0123456789"[Math.floor(Math.random() * 34)]}</span>
        ))}
      </div>
    </div>
  );
}

/* ---- Hero Highlight ---- */
export function HeroHighlight() {
  const [k, setK] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>();
  useEffect(() => { if (inView) { setK((p) => p + 1); const t = setInterval(() => setK((p) => p + 1), 3600); return () => clearInterval(t); } }, [inView]);
  return (
    <div ref={ref} className="demo-frame absolute inset-0 grid place-items-center text-xl font-bold text-white">
      <span>用动效</span>
      <span key={k} className="relative mx-1 px-1" style={{ animation: "scaleIn .3s ease" }}>
        <span className="relative z-10">说服用户</span>
        <span className="absolute inset-0 -z-0 rounded bg-cyan-400/30" style={{ animation: "maskReveal .8s ease .2s backwards", boxShadow: "0 0 30px #22d3ee55" }} />
      </span>
      <span>下单</span>
    </div>
  );
}

/* ---- Canvas Reveal Effect ---- */
export function CanvasReveal() {
  const [k, setK] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>();
  useEffect(() => { if (inView) { setK((p) => p + 1); const t = setInterval(() => setK((p) => p + 1), 4000); return () => clearInterval(t); } }, [inView]);
  return (
    <div ref={ref} className="demo-frame absolute inset-0 grid place-items-center overflow-hidden">
      <p key={k} className="relative z-10 text-lg font-bold text-white" style={{ animation: "blurWordIn .8s ease .5s backwards" }}>Canvas Reveal</p>
      {[[0, 0, 0], [100, 0, 1], [0, 100, 2], [100, 100, 3]].map(([x, y, i]) => (
        <div key={i} className="absolute z-0 h-1/2 w-1/2 bg-gradient-to-br from-cyan-500/40 to-violet-600/40" style={{ left: x === 0 ? "-52%" : "102%", top: y === 0 ? "-52%" : "102%", animation: `scaleIn .1s, maskReveal 0s`, transition: "left .7s cubic-bezier(.4,0,.2,1), top .7s cubic-bezier(.4,0,.2,1)", ...(k % 2 === 0 ? { left: x === 0 ? "0%" : "50%", top: y === 0 ? "0%" : "50%" } : {}) }} />
      ))}
    </div>
  );
}

/* ---- Multi Step Loader ---- */
export function MultiStepLoader() {
  const steps = ["安装组件", "解析配置", "编译资源", "部署完成"];
  const [s, setS] = useState(0);
  useEffect(() => { const t = setInterval(() => setS((p) => (p + 1) % (steps.length + 1)), 1100); return () => clearInterval(t); }, []);
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <div className="space-y-3">
        {steps.map((st, i) => (
          <div key={st} className="flex items-center gap-3 text-xs transition-all duration-300" style={{ opacity: i <= s ? 1 : 0.35, transform: i === s ? "translateX(6px)" : "" }}>
            <span className={`grid h-4 w-4 place-items-center rounded-full border ${i < s ? "border-emerald-400 bg-emerald-400/20 text-emerald-300" : "border-[#1e2534] text-slate-500"}`}>{i < s ? "✓" : i + 1}</span>
            <span className={i === s ? "text-cyan-300" : "text-slate-400"}>{st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

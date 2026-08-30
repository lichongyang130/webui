import { useEffect, useState } from "react";

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
};
const PAL = ["#22d3ee", "#8b5cf6", "#f472b6", "#34d399", "#f59e0b"];

/**
 * 程序化演示生成器:以条目名/版块色为种子,确定性生成专属动效组合。
 * 背景层 6 选 1 × 前景层 4 选 1,不依赖任何外部代码。
 */
export default function ProceduralDemo({ seed, name, color }: { seed: string; name: string; color?: string }) {
  const h = hash(seed);
  const c = color && /^#/.test(color) ? color : PAL[h % 5];
  const bg = h % 6;
  const fg = (h >> 3) % 4;
  return (
    <div className="demo-frame absolute inset-0 grid place-items-center">
      <BgLayer kind={bg} c={c} h={h} />
      <FgLayer kind={fg} name={name} c={c} />
    </div>
  );
}

function BgLayer({ kind, c, h }: { kind: number; c: string; h: number }) {
  switch (kind) {
    case 0: // 旋转光束
      return <div className="absolute h-[170%] w-[170%] opacity-60 blur-2xl" style={{ background: `conic-gradient(from 0deg, transparent 0 10%, ${c}55 12%, transparent 15% 45%, ${c}44 48%, transparent 52% 80%, ${c}55 83%, transparent 87%)`, animation: "spin 16s linear infinite" }} />;
    case 1: // 漂移光晕
      return (
        <>
          {[0, 1, 2].map((i) => (
            <div key={i} className="absolute h-40 w-40 rounded-full blur-3xl" style={{ background: i === 1 ? "#8b5cf6" : c, left: `${15 + i * 25}%`, top: `${18 + ((h >> i) % 40)}%`, opacity: 0.3, animation: `drift ${8 + i * 3}s ease-in-out infinite` }} />
          ))}
        </>
      );
    case 2: // 网格扫描线
      return (
        <>
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${c}22 1px, transparent 1px), linear-gradient(90deg, ${c}22 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
          <div className="absolute h-24 w-full" style={{ background: `linear-gradient(to bottom, transparent, ${c}33, transparent)`, animation: "sweepX 5s linear infinite", transform: "rotate(90deg) translateX(-100%)", transformOrigin: "center", width: "200%", left: "-50%" }} />
        </>
      );
    case 3: // 闪烁点阵
      return (
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${c} 1px, transparent 1px)`, backgroundSize: "20px 20px", opacity: 0.5, animation: "twinkle 2.4s ease infinite" }} />
      );
    case 4: // 波浪
      return (
        <svg className="absolute bottom-0 w-[200%]" viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ animation: "waveMove 8s linear infinite", height: "55%" }}>
          <path d="M0 100 Q 150 40 300 100 T 600 100 T 900 100 T 1200 100 V200 H0 Z" fill={c + "22"} />
          <path d="M0 130 Q 150 80 300 130 T 600 130 T 900 130 T 1200 130 V200 H0 Z" fill={c + "18"} />
        </svg>
      );
    default: // 流星
      return (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="absolute h-px w-20" style={{ top: `${8 + ((h >> i) % 80)}%`, left: `${25 + ((h >> (i + 2)) % 70)}%`, background: `linear-gradient(90deg, ${c}, transparent)`, animation: `meteor ${2.6 + (i % 3)}s linear ${i * 0.6}s infinite` }} />
          ))}
        </>
      );
  }
}

function FgLayer({ kind, name, c }: { kind: number; name: string; c: string }) {
  const [t, setT] = useState(0);
  useEffect(() => { const iv = setInterval(() => setT((p) => p + 1), 900); return () => clearInterval(iv); }, []);
  const words = name.split(/[\s-]+/).filter(Boolean);
  switch (kind) {
    case 0: { // 打字机
      const full = name;
      const len = t % (full.length + 6);
      return (
        <span className="relative z-10 font-mono text-base text-slate-100">
          {full.slice(0, Math.min(len, full.length))}
          <span className="caret ml-0.5 inline-block h-4 w-2 align-middle" style={{ background: c }} />
        </span>
      );
    }
    case 1: { // 翻词
      return (
        <span className="relative z-10 text-xl font-black text-white">
          <span key={t} className="flip-in inline-block" style={{ color: c }}>{words[t % words.length]}</span>
        </span>
      );
    }
    case 2: { // 数字滚动
      const target = 20 + (hash(name) % 80);
      const v = Math.min(target, t * 4);
      return (
        <div className="relative z-10 text-center">
          <div className="text-3xl font-black" style={{ color: c, textShadow: `0 0 28px ${c}66` }}>{v}</div>
          <div className="mt-1 text-[10px] tracking-widest text-slate-500">{name.toUpperCase()}</div>
        </div>
      );
    }
    default: // 脉冲卡片
      return (
        <div className="relative z-10 rounded-xl border border-[#1e2534] bg-[#0b0e16cc] px-6 py-4 backdrop-blur">
          <span className="absolute inset-0 rounded-xl border" style={{ borderColor: c + "66", animation: "ringPulse 2.4s ease-out infinite" }} />
          <div className="text-sm font-bold text-slate-100">{name}</div>
          <div className="mt-1 text-[10px] text-slate-500">程序化生成演示 · seed: {name.slice(0, 12)}</div>
        </div>
      );
  }
}

"use client";

import { useMemo, useState } from "react";

interface Point {
  date: string;
  views: number;
  copies: number;
}

export default function TrendChart({ data }: { data: Point[] }) {
  const [metric, setMetric] = useState<"views" | "copies">("views");

  const { path, area, max, dots } = useMemo(() => {
    const W = 640;
    const H = 200;
    const PAD = 12;
    const maxVal = Math.max(...data.map((d) => d[metric]), 1);
    const x = (i: number) => PAD + (i / (data.length - 1)) * (W - PAD * 2);
    const y = (v: number) => H - PAD - (v / maxVal) * (H - PAD * 2);
    const pts = data.map((d, i) => [x(i), y(d[metric])] as const);
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    const areaPath = `${line} L${x(data.length - 1)},${H - PAD} L${x(0)},${H - PAD} Z`;
    return { path: line, area: areaPath, max: maxVal, dots: pts };
  }, [data, metric]);

  const total = data.reduce((s, d) => s + d[metric], 0);
  const first = data.slice(0, 7).reduce((s, d) => s + d[metric], 0);
  const last = data.slice(-7).reduce((s, d) => s + d[metric], 0);
  const delta = first ? Math.round(((last - first) / first) * 100) : 0;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">
          {metric === "views" ? "Views" : "Prompt copies"} — last {data.length} days
        </h2>
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
          {(["views", "copies"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize transition ${
                metric === m ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white" : "text-white/50"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <b className="text-3xl font-extrabold tracking-tight">{total.toLocaleString()}</b>
        <span className={`text-sm font-bold ${delta >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
        </span>
        <span className="text-xs text-white/35">vs previous week</span>
      </div>

      <svg viewBox="0 0 640 200" className="mt-4 w-full">
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={metric === "views" ? "#8b5cf6" : "#22d3ee"} stopOpacity="0.35" />
            <stop offset="100%" stopColor={metric === "views" ? "#8b5cf6" : "#22d3ee"} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="12" x2="628" y1={12 + g * 176} y2={12 + g * 176} stroke="rgba(255,255,255,.06)" strokeDasharray="4 6" />
        ))}
        <path d={area} fill="url(#trendFill)" />
        <path
          d={path}
          fill="none"
          stroke={metric === "views" ? "#a78bfa" : "#22d3ee"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {dots.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={data[i][metric] === max ? 4 : 0} fill="#fff" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-white/30">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}

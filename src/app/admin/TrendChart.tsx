"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface Point {
  date: string;
  views: number;
  copies: number;
}

type Mode = "area" | "bars";

export default function TrendChart({ data }: { data: Point[] }) {
  const [metric, setMetric] = useState<"views" | "copies">("views");
  const [mode, setMode] = useState<Mode>("area");
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  const W = 640;
  const H = 220;
  const PAD = 14;

  const { points, line, areaPath, maxVal, xAt, yAt } = useMemo(() => {
    const maxVal = Math.max(...data.map((d) => d[metric]), 1);
    const xAt = (i: number) => PAD + (i / Math.max(1, data.length - 1)) * (W - PAD * 2);
    const yAt = (v: number) => H - PAD - (v / maxVal) * (H - PAD * 2 - 16);
    const points = data.map((d, i) => ({ x: xAt(i), y: yAt(d[metric]), v: d[metric], date: d.date }));
    const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const areaPath = `${line} L${xAt(data.length - 1)},${H - PAD} L${xAt(0)},${H - PAD} Z`;
    return { points, line, areaPath, maxVal, xAt, yAt };
  }, [data, metric]);

  // trigger draw-in animation on metric/mode change
  useEffect(() => {
    setDrawn(false);
    const t = setTimeout(() => setDrawn(true), 60);
    return () => clearTimeout(t);
  }, [metric, mode]);
  const lineLen = 1600;

  const total = data.reduce((s, d) => s + d[metric], 0);
  const first = data.slice(0, 7).reduce((s, d) => s + d[metric], 0);
  const last = data.slice(-7).reduce((s, d) => s + d[metric], 0);
  const delta = first ? Math.round(((last - first) / first) * 100) : 0;
  const peak = points.reduce((a, b) => (b.v > a.v ? b : a), points[0]);
  const color = metric === "views" ? "#a78bfa" : "#22d3ee";
  const fill = metric === "views" ? "#8b5cf6" : "#06b6d4";

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const rx = ((e.clientX - r.left) / r.width) * W;
    let best = 0,
      bd = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - rx);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    setHover(best);
  };

  const barW = (W - PAD * 2) / Math.max(1, data.length) - 4;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">
          {metric === "views" ? "Views" : "Prompt copies"} — last {data.length} days
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
            {(["area", "bars"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                  mode === m ? "bg-white/10 text-white" : "text-white/45"
                }`}
              >
                {m === "area" ? "〰 Area" : "▊ Bars"}
              </button>
            ))}
          </div>
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
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <b className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          {total.toLocaleString()}
        </b>
        <span className={`text-sm font-bold ${delta >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
        </span>
        <span className="text-xs text-white/35">WoW</span>
        <span className="ml-auto text-xs text-white/35">
          peak <b className="text-white/70">{peak?.v.toLocaleString()}</b>
          {peak ? ` · ${peak.date.slice(5)}` : ""}
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        onMouseEnter={() => setDrawn(true)}
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="0.38" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
          <filter id="trendGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <g key={g}>
            <line x1={PAD} x2={W - PAD} y1={PAD + g * (H - PAD * 2)} y2={PAD + g * (H - PAD * 2)} stroke="rgba(255,255,255,.06)" strokeDasharray="4 6" />
          </g>
        ))}

        {mode === "bars" ? (
          points.map((p, i) => (
            <rect
              key={i}
              x={p.x - barW / 2}
              y={p.y}
              width={barW}
              height={H - PAD - p.y}
              rx={3}
              fill={fill}
              opacity={hover === null || hover === i ? 0.75 : 0.3}
              style={{ transition: "opacity .15s" }}
            >
              <animate attributeName="height" from="0" to={H - PAD - p.y} dur="0.7s" fill="freeze" begin={`${i * 0.02}s`} />
              <animate attributeName="y" from={H - PAD} to={p.y} dur="0.7s" fill="freeze" begin={`${i * 0.02}s`} />
            </rect>
          ))
        ) : (
          <>
            <path d={areaPath} fill="url(#trendFill)" opacity={drawn ? 1 : 0} style={{ transition: "opacity .8s .3s" }} />
            <path
              d={line}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#trendGlow)"
              strokeDasharray={lineLen}
              strokeDashoffset={drawn ? 0 : lineLen}
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={hover === i ? 5 : p.v === maxVal ? 4 : 0}
                fill="#fff"
                stroke={color}
                strokeWidth="2"
                style={{ transition: "r .15s" }}
              />
            ))}
          </>
        )}

        {/* crosshair + tooltip — idea #251 */}
        {hover !== null && points[hover] && (
          <g>
            <line x1={points[hover].x} x2={points[hover].x} y1={PAD} y2={H - PAD} stroke="rgba(255,255,255,.18)" strokeDasharray="3 4" />
            <g transform={`translate(${Math.min(Math.max(points[hover].x - 52, PAD), W - PAD - 104)}, ${Math.max(points[hover].y - 46, PAD)})`}>
              <rect width="104" height="38" rx="8" fill="rgba(13,13,30,.95)" stroke="rgba(255,255,255,.14)" />
              <text x="10" y="16" fontSize="10" fill="rgba(255,255,255,.5)" fontFamily="monospace">
                {points[hover].date.slice(5)}
              </text>
              <text x="10" y="31" fontSize="12" fontWeight="700" fill={color}>
                {points[hover].v.toLocaleString()} {metric === "views" ? "views" : "copies"}
              </text>
            </g>
          </g>
        )}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-white/30">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[Math.floor(data.length / 2)]?.date.slice(5)}</span>
        <span>{data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

/** Animated doughnut for category split — idea #253/#273. */
export function DoughnutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, []);
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const R = 60;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
        <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="18" />
        {segments.map((s) => {
          const frac = s.value / total;
          const dash = frac * C;
          const el = (
            <circle
              key={s.label}
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="18"
              strokeDasharray={`${drawn ? dash : 0} ${C}`}
              strokeDashoffset={-acc * C}
              style={{ transition: "stroke-dasharray 1s cubic-bezier(.22,1,.36,1)", filter: "drop-shadow(0 0 6px rgba(0,0,0,.5))" }}
            />
          );
          acc += frac;
          return el;
        })}
        <text x="80" y="76" textAnchor="middle" className="rotate-90" fill="#fff" fontSize="26" fontWeight="800" transform="rotate(90 80 80)">
          {total}
        </text>
        <text x="80" y="96" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="10" transform="rotate(90 80 80)">
          ASSETS
        </text>
      </svg>
      <ul className="space-y-2 text-sm">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-sm" style={{ background: s.color }} />
            <span className="text-white/70">{s.label}</span>
            <span className="ml-auto font-bold">{s.value}</span>
            <span className="w-10 text-right text-xs text-white/35">{Math.round((s.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Animated bar-race of top tags — ideas #255/#258. */
export function TagCloud({ tags }: { tags: { tag: string; count: number }[] }) {
  const max = Math.max(...tags.map((t) => t.count), 1);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t, i) => (
        <span
          key={t.tag}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-fuchsia-400/50 hover:text-white"
          style={{ fontSize: 11 + Math.min(6, (t.count / max) * 6) }}
          title={`${t.count} assets`}
        >
          #{t.tag}
          <span className="rounded-full bg-fuchsia-500/20 px-1.5 text-[10px] font-bold text-fuchsia-300">{t.count}</span>
        </span>
      ))}
    </div>
  );
}

/** Horizontal bars that grow on mount — idea #255. */
export function BarRace({ rows, title }: { rows: { label: string; value: number; color?: string }[]; title: string }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 150);
    return () => clearTimeout(t);
  }, []);
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/35">{title}</h3>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-3 text-xs">
            <span className="w-24 shrink-0 truncate text-white/55">{r.label}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full"
                style={{
                  width: drawn ? `${(r.value / max) * 100}%` : "0%",
                  background: r.color ?? "linear-gradient(90deg,rgb(139,92,246),rgb(217,70,239))",
                  transition: "width 1s cubic-bezier(.22,1,.36,1)",
                  boxShadow: "0 0 12px -2px rgba(217,70,239,.5)",
                }}
              />
            </div>
            <b className="w-10 text-right">{r.value.toLocaleString()}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

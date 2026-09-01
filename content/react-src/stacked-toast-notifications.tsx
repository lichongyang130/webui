"use client";
import { useCallback, useRef, useState } from "react";

type Kind = "success" | "error" | "info";
const CFG: Record<Kind, { ic: string; t: string; d: string }> = {
  success: { ic: "✓", t: "Deployed", d: "Your site is live at the edge." },
  error: { ic: "✕", t: "Build failed", d: "Check the logs — error in module graph." },
  info: { ic: "i", t: "New version", d: "Forge 2.4 is available to download." },
};

export default function Toasts() {
  const [toasts, setToasts] = useState<{ id: number; kind: Kind; leaving?: boolean }[]>([]);
  const idRef = useRef(0);

  const push = useCallback((kind: Kind) => {
    const id = ++idRef.current;
    setToasts((ts) => [...ts, { id, kind }]);
    setTimeout(() => setToasts((ts) => ts.map((x) => (x.id === id ? { ...x, leaving: true } : x))), 3200);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 3600);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <h3 className="text-xl font-bold text-white">Stacked Toast Notifications</h3>
      <p className="text-sm text-white/50">Each button fires a different toast</p>
      <div className="flex gap-2.5">
        {(["success", "error", "info"] as Kind[]).map((k) => (
          <button key={k} onClick={() => push(k)} className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-500/60">
            {k[0].toUpperCase() + k.slice(1)} toast
          </button>
        ))}
      </div>
      <style>{`
        @keyframes toIn { from { opacity: 0; transform: translateX(60px) scale(.9); } to { opacity: 1; transform: none; } }
        @keyframes toOut { to { opacity: 0; transform: translateX(60px) scale(.9); } }
      `}</style>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex min-w-[240px] max-w-[320px] items-center gap-3 rounded-2xl border bg-[rgba(14,14,32,.92)] px-4 py-3 backdrop-blur-xl shadow-[0_18px_50px_-18px_rgba(0,0,0,.8)]
              ${toast.kind === "success" ? "border-emerald-400/35" : toast.kind === "error" ? "border-rose-400/35" : "border-cyan-400/35"}`}
            style={{ animation: `${toast.leaving ? "toOut" : "toIn"} .4s ${toast.leaving ? "ease forwards" : "cubic-bezier(.34,1.56,.64,1) forwards"}` }}
          >
            <div
              className={`grid h-8 w-8 flex-none place-items-center rounded-lg font-extrabold ${
                toast.kind === "success" ? "bg-emerald-500/15 text-emerald-400" : toast.kind === "error" ? "bg-rose-500/15 text-rose-400" : "bg-cyan-500/15 text-cyan-400"
              }`}
            >
              {CFG[toast.kind].ic}
            </div>
            <div>
              <b className="block text-[13.5px] text-white">{CFG[toast.kind].t}</b>
              <span className="text-xs text-white/50">{CFG[toast.kind].d}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

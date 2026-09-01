"use client";

import { useEffect, useState } from "react";
import { onToast, playSfx } from "./fx-core";

export interface Toast {
  id: number;
  msg: string;
  tone: "ok" | "warn" | "err";
  icon?: string;
}

export default function Toasts({ lang }: { lang: "en" | "zh" }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let idc = 0;
    const off = onToast((msg, opts) => {
      const id = ++idc;
      setToasts((t) => [...t.slice(-3), { id, msg, tone: opts?.tone ?? "ok", icon: opts?.icon }]);
      playSfx(opts?.tone === "err" ? "error" : "success");
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    });
    return off;
  }, []);

  const tone = { ok: "border-emerald-400/40 text-emerald-200", warn: "border-amber-400/40 text-amber-200", err: "border-rose-400/40 text-rose-200" };

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[9800] flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`fx-toast pointer-events-auto flex items-center gap-2 rounded-xl border bg-[#0d0d1e]/90 px-4 py-2.5 text-sm shadow-2xl backdrop-blur-xl ${tone[t.tone]}`}
        >
          {t.icon === "check" && (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

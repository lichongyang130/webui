"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

function Tip({ label, children }: { label: string; children: ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0, show: false });
  const ref = useRef({ x: 0, y: 0, tx: 0, ty: 0, show: false });
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const s = ref.current;
      s.x += (s.tx - s.x) * 0.22;
      s.y += (s.ty - s.y) * 0.22;
      setPos({ x: s.x, y: s.y, show: s.show });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <button
        className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-500/60"
        onMouseEnter={(e) => { ref.current.show = true; }}
        onMouseMove={(e) => {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
          ref.current.tx = e.clientX;
          ref.current.ty = r.top - 14;
        }}
        onMouseLeave={() => { ref.current.show = false; }}
      >
        {children}
      </button>
      <div
        ref={tipRef}
        className={`pointer-events-none fixed z-[60] -translate-x-1/2 whitespace-nowrap rounded-[11px] bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_14px_40px_-10px_rgba(217,70,239,.7)] transition-opacity ${pos.show ? "opacity-100" : "opacity-0"}`}
        style={{ left: pos.x, top: pos.y }}
      >
        {label}
        <span className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[2px] bg-fuchsia-600" />
      </div>
    </>
  );
}

export default function ElasticTooltip() {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">Elastic Tooltip on Follow</h3>
      <p className="text-sm text-white/50">Hover the buttons — the tip springs in and tracks</p>
      <div className="mt-3 flex gap-3.5">
        <Tip label="Copies to your clipboard ✓">Copy</Tip>
        <Tip label="Deploys to 280 edge nodes">Deploy</Tip>
        <Tip label="Rolls back in under a second">Rollback</Tip>
      </div>
    </div>
  );
}

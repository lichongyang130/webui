"use client";

import { useRef } from "react";
import { useFx } from "./fx-core";

/**
 * 3D tilt on hover with glare highlight — ideas #38, #151, #121.
 * Wrap any card: <TiltCard className="...">...</TiltCard>
 */
export default function TiltCard({
  children,
  className = "",
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { fxEnabled, settings } = useFx();
  const on = fxEnabled && !settings.reduced;

  return (
    <div
      ref={ref}
      className={className}
      style={on ? { transformStyle: "preserve-3d", willChange: "transform" } : undefined}
      onPointerMove={(e) => {
        if (!on) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * max;
        const ry = (px - 0.5) * max;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "";
      }}
    >
      {children}
      {on && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.09), transparent 65%)",
          }}
        />
      )}
    </div>
  );
}

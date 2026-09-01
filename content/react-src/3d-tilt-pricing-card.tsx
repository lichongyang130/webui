"use client";
import { useRef, type MouseEvent } from "react";

export default function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateY(${(px - 0.5) * 16}deg) rotateX(${(0.5 - py) * 16}deg) scale(1.03)`;
    el.style.setProperty("--tx", px * 100 + "%");
    el.style.setProperty("--ty", py * 100 + "%");
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "rotateY(0) rotateX(0) scale(1)";
  }

  return (
    <div className="flex flex-col items-center gap-3 py-10" style={{ perspective: "1000px" }}>
      <h3 className="text-xl font-bold text-white">3D Tilt Perspective Card</h3>
      <p className="text-sm text-white/50">Move your mouse over the card</p>
      <div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        className="relative mt-4 w-[300px] overflow-hidden rounded-3xl border border-white/15
                   bg-gradient-to-br from-violet-500/25 to-[#14102c] p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,.8)]
                   transition-transform duration-100 [transform-style:preserve-3d]"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(420px circle at var(--tx,50%) var(--ty,50%),rgba(255,255,255,.14),transparent 55%)" }}
        />
        <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 px-3 py-1 text-[11px] font-extrabold tracking-widest [transform:translateZ(40px)]">
          PRO
        </div>
        <h4 className="text-xl font-bold text-white [transform:translateZ(34px)]">Stellar Plan</h4>
        <p className="mt-3 mb-5 text-white/50 [transform:translateZ(28px)]">
          <b className="text-4xl text-white">$29</b>/mo
        </p>
        <ul className="mb-6 space-y-3 text-sm text-white/50 [transform:translateZ(22px)]">
          <li>✓ Unlimited previews</li>
          <li>✓ AI prompt export</li>
          <li>✓ Team workspaces</li>
        </ul>
        <div className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-center text-sm font-bold [transform:translateZ(38px)]">
          Get started
        </div>
      </div>
    </div>
  );
}

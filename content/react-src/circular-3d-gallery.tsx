"use client";
import { useRef } from "react";

const ITEMS = ["Nebula", "Orbit", "Pulsar", "Comet", "Quasar", "Vega", "Lyra", "Cosmo"];

export default function CircularGallery() {
  const stageRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">Circular Gallery</h3>
      <p className="text-sm text-white/50">Auto-rotating 3D ring · hover to pause</p>
      <style>{`
        @keyframes spinRing { from { transform: rotateY(0deg) rotateX(-8deg); } to { transform: rotateY(-360deg) rotateX(-8deg); } }
        .ring { animation: spinRing 22s linear infinite; transform-style: preserve-3d; }
        .stage:hover .ring { animation-play-state: paused; }
        .chip { backface-visibility: hidden; transform: rotateY(calc(var(--i) * 45deg)) translateZ(150px); }
        @keyframes hubPulse { 50% { transform: scale(1.15); opacity: .75; } }
        .hub { animation: hubPulse 2.4s ease-in-out infinite; }
      `}</style>
      <div ref={stageRef} className="stage relative h-[340px] w-[340px]" style={{ perspective: "900px" }}>
        <div className="ring absolute inset-0">
          {ITEMS.map((name, i) => (
            <div
              key={name}
              className="chip absolute left-1/2 top-1/2 grid h-16 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center
                         rounded-2xl border border-white/15 bg-gradient-to-br from-violet-500/25 to-cyan-400/10
                         font-bold text-white transition-colors hover:border-fuchsia-400"
              style={{ ["--i" as string]: i }}
            >
              {name}
            </div>
          ))}
        </div>
        <div className="hub absolute inset-0 grid place-items-center text-3xl text-fuchsia-400 [filter:drop-shadow(0_0_18px_rgba(217,70,239,.8))]">
          ✦
        </div>
      </div>
    </div>
  );
}

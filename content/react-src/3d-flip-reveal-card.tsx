"use client";

export default function FlipCard() {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">3D Flip Reveal Card</h3>
      <p className="text-sm text-white/50">Hover (or tap) to flip</p>
      <div className="group h-[290px] w-[230px]" style={{ perspective: "1100px" }}>
        <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-3xl border border-white/15 bg-gradient-to-br from-violet-500/25 to-[#0c0c1e] p-6 text-center [backface-visibility:hidden]">
            <div className="text-5xl [filter:drop-shadow(0_0_16px_rgba(217,70,239,.8))] [animation:flipPulse_2.4s_ease-in-out_infinite]">✦</div>
            <b className="text-xl text-white">Hover to reveal</b>
            <span className="text-sm text-white/50">The answer is on the back</span>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-3xl border border-white/15 bg-gradient-to-br from-fuchsia-500/35 to-[#1e0a28] p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <b className="bg-gradient-to-b from-white to-fuchsia-300 bg-clip-text text-6xl font-extrabold text-transparent">42</b>
            <span className="text-sm text-white/50">that&apos;s the answer.</span>
          </div>
        </div>
      </div>
      <style>{`@keyframes flipPulse { 50% { transform: scale(1.15); } }`}</style>
    </div>
  );
}

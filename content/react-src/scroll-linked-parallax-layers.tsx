"use client";
import { useRef } from "react";

export default function ParallaxPanel() {
  const panel = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const s = panel.current!.scrollTop;
    const el = (cls: string) => panel.current!.querySelector<HTMLElement>(cls)!;
    el("[data-moon]").style.transform = `translateY(${s * 0.3}px)`;
    el("[data-mountains]").style.transform = `translateY(${s * 0.6}px)`;
    el("[data-hills]").style.transform = `translateY(${s * 0.85}px)`;
  };
  return (
    <div ref={panel} onScroll={onScroll}
      className="relative h-[340px] w-[min(460px,92%)] overflow-y-scroll overflow-x-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-[#0b0a24] to-[#1a0b2e]
                 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-violet-500/50">
      <div data-moon="1" className="pointer-events-none absolute right-10 top-9 text-3xl text-amber-200 [filter:drop-shadow(0_0_14px_rgba(253,230,138,.8))] will-change-transform">✦</div>
      <div data-mountains="1" className="pointer-events-none absolute -left-[10%] -right-[10%] bottom-[60px] h-[150px] opacity-70 will-change-transform"
        style={{ background: "conic-gradient(from 180deg at 50% 100%,transparent 0 10deg,#312e81 10deg 25deg,transparent 25deg 40deg,#3730a3 40deg 58deg,transparent 58deg 75deg,#312e81 75deg 90deg,transparent 90deg)", backgroundSize: "200px 150px" }} />
      <div data-hills="1" className="pointer-events-none absolute -left-[10%] -right-[10%] bottom-0 h-[90px] will-change-transform"
        style={{ backgroundColor: "#2e1065", backgroundImage: "radial-gradient(120px 60px at 20% 100%,#4c1d95 60%,transparent 61%),radial-gradient(160px 80px at 65% 100%,#6d28d9 60%,transparent 61%),radial-gradient(120px 70px at 95% 100%,#4c1d95 60%,transparent 61%)" }} />
      <div className="relative z-10 flex flex-col gap-[150px] px-7">
        <div className="mt-[120px] rounded-2xl border border-white/10 bg-[rgba(10,8,30,.72)] p-5 backdrop-blur"><h4 className="text-violet-300 font-semibold">Layer 0.3×</h4><p className="text-[13px] text-white/50">The moon drifts slowest</p></div>
        <div className="rounded-2xl border border-white/10 bg-[rgba(10,8,30,.72)] p-5 backdrop-blur"><h4 className="text-violet-300 font-semibold">Layer 0.6×</h4><p className="text-[13px] text-white/50">Mid mountains glide behind</p></div>
        <div className="mb-[120px] rounded-2xl border border-white/10 bg-[rgba(10,8,30,.72)] p-5 backdrop-blur"><h4 className="text-violet-300 font-semibold">Layer 1×</h4><p className="text-[13px] text-white/50">You are here — scroll-linked, not tweened.</p></div>
      </div>
    </div>
  );
}

"use client";
import { useRef, type MouseEvent } from "react";

export default function SpotlightInput({ placeholder = "you@stellar.dev", type = "text" }: { placeholder?: string; type?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    wrap.current!.style.setProperty("--ix", e.clientX - r.left + "px");
    wrap.current!.style.setProperty("--iy", e.clientY - r.top + "px");
  };
  return (
    <div
      ref={wrap}
      onMouseMove={move}
      className="relative w-[min(340px,90%)] rounded-[14px] after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-[15px] after:opacity-0 after:transition-opacity after:duration-300 after:content-['']
                 focus-within:after:opacity-100"
      style={{ ["--ix" as string]: "50%", ["--iy" as string]: "50%" }}
    >
      <style>{`
        [data-spot]::after { background: radial-gradient(180px circle at var(--ix) var(--iy), rgba(139,92,246,.9), transparent 60%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; padding: 1.5px; }
      `}</style>
      <div data-spot className="absolute -inset-[1.5px] rounded-[15px] opacity-0 transition-opacity focus-within:opacity-100 pointer-events-none"
        style={{ background: "radial-gradient(180px circle at var(--ix) var(--iy), rgba(139,92,246,.9), transparent 60%)", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
      <input
        type={type}
        placeholder={placeholder}
        className="relative w-full rounded-[14px] border border-white/10 bg-white/[0.04] px-[18px] py-[15px] text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-500/60 focus:bg-violet-500/[0.06]"
      />
    </div>
  );
}

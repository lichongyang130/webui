"use client";
import { useEffect, useMemo, useRef } from "react";

export default function LetterWave({ text = "MOTIONVAULT" }: { text?: string }) {
  const letters = useMemo(() => text.split(""), [text]);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  const play = (startOffset = 0) => {
    letters.forEach((_, i) => {
      const el = refs.current[i];
      if (!el) return;
      el.classList.remove("letter-down");
      void el.offsetWidth;
      setTimeout(() => el.classList.add("letter-down"), ((i + startOffset) % letters.length) * 70);
    });
  };

  // auto wave
  useEffect(() => {
    let w = 0;
    const id = setInterval(() => { play(w); w = (w + 3) % letters.length; }, 2600);
    const kick = setTimeout(() => play(0), 400);
    return () => { clearInterval(id); clearTimeout(kick); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letters]);

  return (
    <div
      onMouseEnter={() => play(0)}
      className="flex cursor-pointer gap-0.5 text-5xl font-extrabold tracking-[0.04em] max-sm:text-3xl"
    >
      {letters.map((ch, i) => (
        <span
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="inline-block bg-gradient-to-b from-white to-violet-300 bg-clip-text text-transparent transition-transform duration-500 ease-[cubic-bezier(.34,1.8,.64,1)] hover:-translate-y-[18px] hover:rotate-6 hover:scale-115 hover:text-fuchsia-400 hover:[-webkit-text-fill-color:#d946ef]"
        >
          {ch}
        </span>
      ))}
      <style>{`
        .letter-down { animation: twDown .6s cubic-bezier(.34,1.8,.64,1); }
        @keyframes twDown { 0% { transform: translateY(0); } 45% { transform: translateY(16px) scaleY(.9); } 100% { transform: translateY(0); } }
      `}</style>
    </div>
  );
}

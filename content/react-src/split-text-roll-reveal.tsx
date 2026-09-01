"use client";
import { useMemo } from "react";

export default function SplitTextReveal({ text = "MOTION BY DESIGN" }: { text?: string }) {
  const words = useMemo(() => text.split(" "), [text]);
  let charIndex = 0;
  return (
    <div className="group flex flex-col items-center gap-3 py-12">
      <h3 className="text-xl font-bold text-white">Split-Text Reveal</h3>
      <p className="text-sm text-white/50">Hover the headline</p>
      <div className="flex flex-wrap justify-center text-5xl font-extrabold tracking-widest max-md:text-3xl">
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex overflow-hidden">
            {[...word].map((ch) => {
              const i = charIndex++;
              return (
                <span key={i} className="relative inline-block">
                  <span
                    className="inline-block transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[110%] group-hover:rotate-[8deg]"
                    style={{ transitionDelay: `${i * 22}ms` }}
                  >
                    {ch}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-0 top-[110%] inline-block bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent"
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

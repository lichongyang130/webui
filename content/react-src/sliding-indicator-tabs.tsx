"use client";
import { useLayoutEffect, useRef, useState } from "react";

const TABS = ["Overview", "Features", "Pricing", "FAQ"];
const CONTENT: Record<string, string> = {
  Overview: "Overview content — the panel cross-fades on switch.",
  Features: "Features: springs, timelines, drag and scroll — built in.",
  Pricing: "Pricing: free for hobby, $19/mo for teams.",
  FAQ: "FAQ: yes, it works with every framework.",
};

export default function SlidingTabs() {
  const [active, setActive] = useState(0);
  const [glide, setGlide] = useState({ x: 0, w: 0 });
  const barRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const move = () => {
      const bar = barRef.current;
      const btn = btnRefs.current[active];
      if (!bar || !btn) return;
      const p = bar.getBoundingClientRect();
      const r = btn.getBoundingClientRect();
      setGlide({ x: r.left - p.left - 5, w: r.width });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-5 py-10">
      <h3 className="text-xl font-bold text-white">Sliding Indicator Tabs</h3>
      <div ref={barRef} className="relative inline-flex rounded-full border border-white/10 bg-white/[0.04] p-[5px]">
        <span
          className="absolute bottom-[5px] top-[5px] left-0 z-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateX(${glide.x}px)`, width: glide.w }}
        />
        {TABS.map((label, i) => (
          <button
            key={label}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => setActive(i)}
            className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors ${active === i ? "text-white" : "text-white/50"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        key={active}
        className="w-[min(420px,92vw)] rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-white/50
                   [animation:fadeTab_.3s_ease]"
      >
        {CONTENT[TABS[active]]}
      </div>
      <style>{`@keyframes fadeTab { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

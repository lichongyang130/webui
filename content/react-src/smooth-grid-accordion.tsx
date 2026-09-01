"use client";
import { useState } from "react";

const FAQ = [
  ["What is MotionVault?", "A unified vault of animated templates, components, elements and motion snippets — every asset has a live preview and an AI prompt."],
  ["Do I need a framework?", "No. Every preview is self-contained HTML/CSS/JS. Paste it anywhere, or hand the prompt to your AI coding tool."],
  ["Can I use it commercially?", "All curated assets are free to adapt and ship in commercial projects. Attribution is appreciated, never required."],
];

export default function SmoothAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3 className="text-xl font-bold text-white">Smooth Grid Accordion</h3>
      <div className="w-[min(460px,94vw)] overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04]">
        {FAQ.map(([q, a], i) => (
          <div key={q} className={i > 0 ? "border-t border-white/10" : ""}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[15px] font-semibold transition-colors ${open === i ? "text-cyan-300" : "text-white/80"}`}
            >
              {q}
              <i
                className={`grid h-6 w-6 flex-none place-items-center rounded-full border border-white/10 not-italic transition-all duration-300 ${
                  open === i ? "rotate-45 border-fuchsia-400 bg-fuchsia-500/10 text-fuchsia-400" : ""
                }`}
              >
                +
              </i>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <p className="overflow-hidden px-5 text-sm leading-relaxed text-white/50" style={{ paddingBottom: open === i ? 18 : 0, transition: "padding .45s" }}>
                {a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

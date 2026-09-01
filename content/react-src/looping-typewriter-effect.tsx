"use client";
import { useEffect, useState } from "react";

const PHRASES = [
  "> ship animated landing pages",
  "> copy a prompt, paste, done",
  "> 60fps springs, no keyframes",
  "> your AI builds the whole site",
];

export default function Typewriter() {
  const [text, setText] = useState("");
  useEffect(() => {
    let pi = 0, ci = 0, deleting = false, timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = PHRASES[pi];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) { deleting = true; timer = setTimeout(tick, 1600); return; }
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) { deleting = false; pi = (pi + 1) % PHRASES.length; timer = setTimeout(tick, 350); return; }
      }
      timer = setTimeout(tick, deleting ? 32 : 62);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="font-mono text-xl font-semibold max-sm:text-base">
      <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">{text}</span>
      <span className="ml-1 text-fuchsia-400 [animation:blink_1s_step-end_infinite]">▌</span>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

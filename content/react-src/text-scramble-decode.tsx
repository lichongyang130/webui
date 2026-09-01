"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@%&\$ABCDEFGHJKLMNPQRSTUVWXYZ";

class Scrambler {
  frame = 0;
  timer?: ReturnType<typeof setInterval>;
  constructor(private el: HTMLElement, private text: string) {}
  run() {
    this.frame = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), 34);
  }
  tick() {
    this.frame++;
    this.el.textContent = this.text
      .split("")
      .map((ch, i) => (ch === " " ? " " : i < this.frame / 2 ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join("");
    if (this.frame >= this.text.length * 2) clearInterval(this.timer);
  }
}

export default function TextScramble() {
  const main = useRef<HTMLDivElement>(null);
  const sub = useRef<HTMLDivElement>(null);
  const [scramblers, setScramblers] = useState<Scrambler[]>([]);

  useEffect(() => {
    if (!main.current || !sub.current) return;
    const list = [new Scrambler(main.current, "MOTION VAULT"), new Scrambler(sub.current, "treasure for builders")];
    list.forEach((s) => s.run());
    setScramblers(list);
    const id = setInterval(() => list.forEach((s) => s.run()), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 py-12" onMouseEnter={() => scramblers.forEach((s) => s.run())}>
      <h3 className="text-xl font-bold text-white">Text Scramble Decode</h3>
      <p className="text-sm text-white/50">Hover to re-decode · cycles automatically</p>
      <div
        ref={main}
        className="cursor-pointer bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-5xl font-extrabold tracking-widest text-transparent"
      />
      <div ref={sub} className="text-sm uppercase tracking-[0.3em] text-white/50" />
    </div>
  );
}

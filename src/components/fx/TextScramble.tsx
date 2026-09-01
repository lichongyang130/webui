"use client";

import { useEffect, useRef, useState } from "react";
import { useFx } from "./fx-core";

const CHARS = "!<>-_\\/[]{}—=+*^?#▓▒░$%&";

/**
 * Terminal-style text scramble — ideas #179.
 * Animates through random glyphs then settles on the real text.
 * Re-runs when `text` changes; also rescambles on hover.
 */
export default function TextScramble({
  text,
  className = "",
  as: Tag = "span",
  hover = true,
  speed = 1,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "b";
  hover?: boolean;
  speed?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const { fxEnabled } = useFx();

  useEffect(() => {
    if (!fxEnabled) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const total = Math.max(8, text.length) / speed;
    let raf = 0;
    const queue = text.split("").map((ch, i) => ({
      ch,
      start: Math.floor(Math.random() * total * 0.6),
      end: Math.floor(total * 0.4 + (i / text.length) * total * 0.7),
    }));
    const tick = () => {
      let out = "";
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end) {
          out += q.ch;
          done++;
        } else if (frame >= q.start) {
          out += CHARS[(Math.random() * CHARS.length) | 0];
        } else out += " ";
      }
      setDisplay(out);
      if (done < queue.length) {
        frame++;
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, fxEnabled, speed]);

  const rescramble = () => {
    if (!hover || !fxEnabled) return;
    let frame = 0;
    let raf = 0;
    const total = 22;
    const rafTick = () => {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const settle = total * (i / text.length);
        out += frame > settle ? text[i] : CHARS[(Math.random() * CHARS.length) | 0];
      }
      setDisplay(out);
      if (frame < total) {
        frame++;
        raf = requestAnimationFrame(rafTick);
      }
    };
    raf = requestAnimationFrame(rafTick);
    setTimeout(() => cancelAnimationFrame(raf), 1500);
  };

  return (
    <Tag ref={ref as never} className={className} onMouseEnter={rescramble}>
      {display}
    </Tag>
  );
}

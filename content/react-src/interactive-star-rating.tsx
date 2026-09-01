"use client";
import { useState } from "react";

const WORDS = ["", "Terrible", "Meh", "Good", "Great", "Legendary!"];

export default function StarRating() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setValue(n)}
            className={`text-4xl leading-none transition-all duration-200 ease-[cubic-bezier(.34,1.8,.64,1)] hover:scale-125 hover:-rotate-[8deg] ${
              n <= shown ? "text-amber-400 [text-shadow:0_0_16px_rgba(251,191,36,.55)]" : "text-white/15"
            } ${n === shown ? "scale-110" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
      <p className="text-sm text-white/50">
        {value ? <>You rated it <b className="text-amber-400">{WORDS[value]}</b></> : "Tap to rate"}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { playSfx } from "./fx-core";

/** Floating back-to-top orb that appears after scrolling — idea #105. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        playSfx("open");
      }}
      className="fx-pop fixed bottom-6 right-6 z-[9400] grid h-12 w-12 place-items-center rounded-full border border-fuchsia-400/40 bg-[#0d0d1e]/85 text-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,.35)] backdrop-blur transition hover:scale-110 hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useFx } from "./fx-core";

/**
 * SVG paths that draw themselves when scrolled into view — idea #97.
 * Wrap an <svg> with paths having className "fx-draw" and pathLength=1.
 */
export default function ScrollDraw({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const { reduced } = useFx();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.querySelectorAll(".fx-draw").forEach((p) => p.classList.add("on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            (en.target as SVGElement).querySelectorAll?.(".fx-draw").forEach((p, i) => {
              (p as SVGElement).style.animationDelay = `${i * 0.25}s`;
              p.classList.add("on");
            });
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <svg ref={ref} className={className} viewBox="0 0 600 120" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useFx } from "./fx-core";

/** Top scroll progress bar (#78/#100/#228) + back-to-top ring button. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 500);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={bar}
        className="fixed left-0 top-0 z-[9500] h-[3px] w-full origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)), rgb(var(--c3)))",
          boxShadow: "0 0 12px rgba(var(--c2),0.8)",
        }}
      />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-[9500] grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#0d0d1e]/80 text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/50 hover:text-white ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}

/** Global observer: any element with `.fx-reveal` animates in on scroll. */
export function RevealObserver() {
  const { reduced } = useFx();
  useEffect(() => {
    if (reduced) {
      document.querySelectorAll(".fx-reveal").forEach((el) => el.classList.add("fx-revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            (en.target as HTMLElement).classList.add("fx-revealed");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    // scan periodically too (client nav re-renders)
    const scan = () =>
      document.querySelectorAll(".fx-reveal:not(.fx-revealed)").forEach((el) => {
        io.observe(el);
      });
    scan();
    const iv = setInterval(scan, 1200);
    return () => {
      io.disconnect();
      clearInterval(iv);
    };
  }, [reduced]);
  return null;
}

/** Wrapper for easy staggered reveals in JSX. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  className?: string;
}) {
  const { reduced } = useFx();
  return (
    <Tag
      className={`fx-reveal ${reduced ? "fx-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

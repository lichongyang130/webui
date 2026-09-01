"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Only mounts the (heavy) sandboxed iframe when it enters the viewport —
 * idea #451. Shows a brand shimmer placeholder until then (#161).
 */
export default function SmartPreview({
  html,
  title,
  className = "",
  style,
  scaled = true,
}: {
  html: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  scaled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
      {show ? (
        <iframe
          srcDoc={html}
          title={title}
          loading="lazy"
          sandbox="allow-scripts"
          className={scaled ? "pointer-events-none h-[200%] w-[200%] origin-top-left scale-50" : "h-full w-full border-0"}
        />
      ) : (
        <div className="fx-skeleton absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">preview</span>
        </div>
      )}
    </div>
  );
}

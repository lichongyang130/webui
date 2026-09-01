"use client";

import { useEffect, useState } from "react";

/** Right-edge dot navigation that highlights the section in view — idea #93. */
export default function ScrollSpy({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = it.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div className="fixed right-5 top-1/2 z-[9400] hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className="group relative flex items-center justify-end"
          title={it.label}
        >
          <span className="pointer-events-none absolute right-5 whitespace-nowrap rounded-md border border-white/10 bg-[#0d0d1e]/90 px-2 py-1 text-[10px] font-semibold text-white/80 opacity-0 transition group-hover:opacity-100">
            {it.label}
          </span>
          <span
            className={`h-2.5 w-2.5 rounded-full border transition-all ${
              active === it.id
                ? "scale-125 border-fuchsia-400 bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,.9)]"
                : "border-white/30 bg-transparent hover:border-white/70"
            }`}
          />
        </a>
      ))}
    </div>
  );
}

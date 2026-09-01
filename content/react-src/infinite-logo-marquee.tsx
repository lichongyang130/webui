"use client";

const ROW1 = ["NEBULA", "◈ ORBITAL", "✦ PULSAR", "QUANTUM", "➤ VELOCITY", "✺ HELIX", "▲ VERTEX", "✧ STELLAR"];
const ROW2 = ["DESIGN ✦", "MOTION ✦", "CODE ✦", "PROMPT ✦", "SHIP ✦", "ITERATE ✦"];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div
      className="group flex overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div
        className="flex w-max gap-3.5 group-hover:[animation-play-state:paused]"
        style={{ animation: `${reverse ? "mqRev" : "mq"} ${reverse ? 22 : 26}s linear infinite` }}
      >
        {[0, 1].map((dup) =>
          items.map((n) => (
            <span
              key={n + dup}
              className="whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3
                         text-sm font-bold tracking-widest text-white/45 transition-all hover:-translate-y-0.5 hover:border-violet-500/50 hover:text-white"
            >
              {n}
            </span>
          ))
        )}
      </div>
      <style>{`
        @keyframes mq { to { transform: translateX(-50%); } }
        @keyframes mqRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

export default function InfiniteMarquee() {
  return (
    <div className="w-full py-10">
      <h3 className="text-center text-xl font-bold text-white">Infinite Logo Marquee</h3>
      <p className="mb-4 text-center text-sm text-white/50">Seamless CSS loop · pauses on hover</p>
      <Row items={ROW1} />
      <Row items={ROW2} reverse />
    </div>
  );
}

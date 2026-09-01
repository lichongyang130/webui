// Pill badge with a diagonal shine that sweeps on a loop.
export function ShineBadge({ children, tone = "violet" }: { children: React.ReactNode; tone?: "violet" | "cyan" | "fuchsia" }) {
  const tones = {
    violet: "bg-violet-500/[0.18] text-violet-300 border-violet-500/40",
    cyan: "bg-cyan-400/[0.14] text-cyan-300 border-cyan-400/40",
    fuchsia: "bg-fuchsia-500/[0.16] text-fuchsia-300 border-fuchsia-500/40",
  };
  return (
    <>
      <style>{`
        .shine-badge { overflow: hidden; }
        .shine-badge::after { content:''; position:absolute; top:0; bottom:0; width:45%; left:-60%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,.55), transparent);
          transform: skewX(-20deg); animation: shine 2.6s ease-in-out infinite; }
        @keyframes shine { 0% { left:-60%; } 55%,100% { left:130%; } }
      `}</style>
      <span className={`shine-badge relative inline-block rounded-full border px-5 py-2.5 text-[13px] font-extrabold tracking-wider ${tones[tone]}`}>
        {children}
      </span>
    </>
  );
}

export default function ShineBadgeRow() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <ShineBadge tone="violet">✦ PRO PLAN</ShineBadge>
      <ShineBadge tone="cyan">NEW DROPS DAILY</ShineBadge>
      <ShineBadge tone="fuchsia">LIMITED ✧ 500 SPOTS</ShineBadge>
    </div>
  );
}

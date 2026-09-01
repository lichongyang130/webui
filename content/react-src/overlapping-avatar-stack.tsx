"use client";

const PEOPLE = [
  { n: "AK", g: "from-violet-500 to-violet-700" },
  { n: "JM", g: "from-fuchsia-500 to-fuchsia-700" },
  { n: "SR", g: "from-cyan-400 to-cyan-700" },
  { n: "ML", g: "from-amber-500 to-amber-700" },
];

export default function AvatarStack() {
  return (
    <div className="group flex items-center pl-1">
      {PEOPLE.map((p, i) => (
        <span
          key={p.n}
          className={`grid h-[46px] w-[46px] place-items-center rounded-full border-[2.5px] border-[#0b0b1a] bg-gradient-to-br text-[13px] font-extrabold text-white transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] -ml-3 first:ml-0
                     hover:z-5 hover:-translate-y-2.5 hover:scale-110 hover:border-white/50 hover:shadow-[0_12px_28px_-8px_rgba(139,92,246,.7)]
                     group-hover:translate-x-[calc(var(--i)*6px)]`}
          style={{ ["--i" as string]: i, zIndex: i }}
        >
          {p.n}
        </span>
      ))}
      <span className="grid h-[46px] w-[46px] place-items-center rounded-full border-[2.5px] border-[#0b0b1a] bg-[#23234e] text-[13px] font-extrabold text-white/50 -ml-3 transition-all duration-300 group-hover:translate-x-[24px] hover:-translate-y-2.5">
        +9
      </span>
    </div>
  );
}

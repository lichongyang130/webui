import type { PromptScore } from "@/lib/promptscore";
import { TIER_LABEL } from "@/lib/promptscore";

/** Prompt completeness report card (#121) — rendered in the AI Prompt tab. */
export default function PromptScoreCard({ score, zh }: { score: PromptScore; zh: boolean }) {
  const tier = TIER_LABEL[score.tier];
  const R = 26;
  const C = 2 * Math.PI * R;
  const pct = Math.max(0, Math.min(100, score.total));

  return (
    <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={R}
            fill="none"
            stroke={tier.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(C * pct) / 100} ${C}`}
            style={{ transition: "stroke-dasharray 0.6s cubic-bezier(.22,1,.36,1)" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-base font-extrabold tabular-nums text-white">
          {score.total}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-white/45">
            {zh ? "Prompt 完整度" : "Prompt completeness"}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-extrabold"
            style={{ color: tier.color, background: `${tier.color}1f` }}
          >
            {zh ? tier.zh : tier.en}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {score.dims.map((d) => (
            <span
              key={d.key}
              title={d.hit ? "" : zh ? d.hintZh : d.hint}
              className={`rounded-lg border px-2 py-1 text-[10.5px] font-semibold transition ${
                d.hit
                  ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                  : "border-white/10 bg-white/[0.04] text-white/40 hover:text-white/60"
              }`}
            >
              {d.hit ? "✓" : "＋"} {zh ? d.labelZh : d.label}
            </span>
          ))}
        </div>
        {pct < 100 && (
          <p className="mt-2 text-[11px] leading-relaxed text-white/35">
            {zh ? "可补充：" : "Consider adding: "}
            {score.dims
              .filter((d) => !d.hit)
              .map((d) => (zh ? d.hintZh : d.hint))
              .join(zh ? "；" : "; ")}
          </p>
        )}
      </div>
    </div>
  );
}

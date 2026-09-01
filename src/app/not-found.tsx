import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n";

export default async function NotFound() {
  const lang = await getLang();
  const zh = lang === "zh";
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v grid min-h-[70vh] place-items-center py-20 text-center">
        <div>
          <svg viewBox="0 0 200 160" className="mx-auto h-40 w-48" aria-hidden>
            {/* lost little robot */}
            <g className="fx-float">
              <rect x="55" y="50" width="90" height="70" rx="18" fill="#161632" stroke="rgba(139,92,246,.7)" strokeWidth="2.5" />
              <circle cx="85" cy="82" r="9" fill="#22d3ee" />
              <circle cx="115" cy="82" r="9" fill="#22d3ee" />
              <circle cx="87" cy="80" r="3" fill="#04121a" />
              <circle cx="117" cy="80" r="3" fill="#04121a" />
              <rect x="82" y="102" width="36" height="7" rx="3.5" fill="rgba(217,70,239,.7)" />
              <line x1="100" y1="50" x2="100" y2="30" stroke="rgba(139,92,246,.7)" strokeWidth="2.5" />
              <circle cx="100" cy="26" r="6" fill="#d946ef" />
              <line x1="55" y1="70" x2="32" y2="58" stroke="rgba(255,255,255,.25)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="145" y1="70" x2="168" y2="58" stroke="rgba(255,255,255,.25)" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <text x="100" y="152" textAnchor="middle" fill="rgba(255,255,255,.2)" fontSize="9" fontFamily="monospace" letterSpacing="3">
              SIGNAL LOST
            </text>
          </svg>
          <h1 className="mt-6 text-6xl font-black tracking-tight">
            <span className="grad-text">404</span>
          </h1>
          <p className="mt-3 text-lg font-bold">{zh ? "机器人迷路了" : "The robot is lost"}</p>
          <p className="mt-2 text-sm text-white/50">
            {zh ? "这个坐标不在资源库里 —— 试试回首页，或者用 ⌘K 搜索。" : "This coordinate isn't in the vault — head home, or hit ⌘K to search."}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/" className="grad-btn">
              {zh ? "回首页" : "Back home"}
            </Link>
            <Link href="/explore" className="ghost-btn">
              {zh ? "浏览资源" : "Explore vault"}
            </Link>
          </div>
          <p className="mt-6 font-mono text-[11px] text-white/25">
            {zh ? "提示：试试输入 konami 码 ↑↑↓↓←→←→BA" : "psst — ↑↑↓↓←→←→BA still works here"}
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

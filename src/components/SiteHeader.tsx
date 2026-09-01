import Link from "next/link";
import { CATEGORY_MAP } from "@/lib/categories";
import { SITES, SITE_TECH_FILTERS, categoryTechHref, techLabel } from "@/lib/sites";
import { getSettings, getStats } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";
import { Icon } from "./icons";
import LangSwitcher from "./LangSwitcher";
import SearchButton from "./SearchButton";
import FullscreenMenu from "./fx/FullscreenMenu";

export default async function SiteHeader() {
  const s = getSettings();
  const stats = getStats();
  const lang = await getLang();
  const zh = lang === "zh";

  return (
    <header className="sticky top-0 z-[100] border-b border-white/[0.07] bg-[#070711]/75 backdrop-blur-xl">
      <div className="container-v flex h-16 items-center justify-between gap-4">
        <Link href="/" data-egg="logo" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_8px_24px_-6px_rgba(217,70,239,0.7)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            <Icon name="sparkles" className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">{s.siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {SITES.map((site) => (
            <div key={site.id} className="group relative">
              <Link
                href={`/${site.category}`}
                className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                {zh ? site.nameZh : site.name}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-50 transition group-hover:rotate-180 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {/* LEVEL-2 dropdown */}
              <div className="invisible absolute left-0 top-full z-[110] w-72 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="fx-border-glow overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b1a]/95 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${site.accent} shadow-lg`}>
                      <Icon name={site.icon} className="h-5 w-5 text-white" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold">{zh ? site.nameZh : site.name}</div>
                      <div className="text-xs text-white/45">{zh ? site.descZh : site.desc}</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                      {zh ? "内容分类" : "Categories"}
                    </div>
                    <Link
                      href={`/${site.category}`}
                      className="mt-1.5 flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                      {zh
                        ? CATEGORY_MAP[site.category].nameZh
                        : CATEGORY_MAP[site.category].name}
                      <span className="ml-auto text-white/30">→</span>
                    </Link>
                  </div>

                  <div className="mt-3 border-t border-white/[0.07] pt-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                      {zh ? "按技术栈筛选" : "Filter by tech"}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {SITE_TECH_FILTERS.map((tech) => (
                        <Link
                          key={tech}
                          href={categoryTechHref(site.category, tech)}
                          className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-white/60 transition hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10 hover:text-white"
                        >
                          {techLabel(tech)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link
            href="/showcase"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold text-cyan-300/90 transition hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            {zh ? "横向展厅" : "Hall"}
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <LangSwitcher lang={lang} />
          <Link
            href="/favorites"
            title={t(lang, "navFavorites")}
            className="hidden h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-fuchsia-400/40 hover:text-fuchsia-300 sm:grid"
          >
            <Icon name="star" className="h-4 w-4" />
          </Link>
          <Link href="/submit" className="ghost-btn hidden !px-4 !py-2 text-xs md:inline-flex">
            {t(lang, "navSubmit")}
          </Link>
          <FullscreenMenu lang={lang} />
          <SearchButton label={t(lang, "navSearch")} />
          <Link href="/admin" className="grad-btn !px-4 !py-2 text-xs">
            <Icon name="shield" className="h-4 w-4" />
            {t(lang, "navAdmin")}
          </Link>
        </div>
      </div>
      {/* mobile category strip — LEVEL-1 source sites */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/[0.05] px-4 py-2 lg:hidden">
        {SITES.map((site) => (
          <Link
            key={site.id}
            href={`/${site.category}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/60"
          >
            {zh ? site.nameZh : site.name}
          </Link>
        ))}
        <Link
          href="/showcase"
          className="whitespace-nowrap rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300/90"
        >
          {zh ? "展厅" : "Hall"}
        </Link>
      </nav>
      {/* stats tiny ticker */}
      <div className="pointer-events-none absolute -bottom-px left-1/2 hidden -translate-x-1/2 text-[10px] font-mono text-white/25 lg:block">
        {stats.total} assets · {stats.copies.toLocaleString()} prompts copied
      </div>
    </header>
  );
}

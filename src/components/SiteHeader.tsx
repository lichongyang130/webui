import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getSettings, getStats } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";
import { Icon } from "./icons";
import LangSwitcher from "./LangSwitcher";

export default async function SiteHeader() {
  const s = getSettings();
  const stats = getStats();
  const lang = await getLang();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#070711]/80 backdrop-blur-xl">
      <div className="container-v flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_8px_24px_-6px_rgba(217,70,239,0.7)]">
            <Icon name="sparkles" className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">{s.siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              {lang === "zh" ? c.nameZh : c.name}
            </Link>
          ))}
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
          <Link
            href="/explore"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/50 transition hover:border-violet-400/40 hover:text-white xl:flex"
          >
            <Icon name="search" className="h-4 w-4" />
            {t(lang, "navSearch")}
          </Link>
          <Link href="/admin" className="grad-btn !px-4 !py-2 text-xs">
            <Icon name="shield" className="h-4 w-4" />
            {t(lang, "navAdmin")}
          </Link>
        </div>
      </div>
      {/* mobile category strip */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/[0.05] px-4 py-2 lg:hidden">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/60"
          >
            {lang === "zh" ? c.nameZh : c.name}
          </Link>
          ))}
      </nav>
    </header>
  );
}

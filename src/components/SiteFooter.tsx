import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getStats } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";
import { Icon } from "./icons";
import FooterExtras from "./FooterExtras";

export default async function SiteFooter() {
  const stats = getStats();
  const lang = await getLang();
  const zh = lang === "zh";

  return (
    <footer className="relative mt-24 border-t border-white/[0.07]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />
      <div className="container-v grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Icon name="sparkles" className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-extrabold">MotionVault</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">{t(lang, "footerAbout")}</p>
          <div className="mt-5 flex gap-2">
            <span className="chip">{stats.total} {zh ? "个资源" : "items"}</span>
            <span className="chip">{(stats.stars / 1000).toFixed(0)}k stars</span>
            <span className="chip">{(stats.copies / 1000).toFixed(0)}k copies</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/40">
            {t(lang, "footerVaults")}
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-white/60 transition hover:text-fuchsia-300">
                  {zh ? c.nameZh : c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/40">{t(lang, "footerMore")}</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/explore" className="text-white/60 transition hover:text-fuchsia-300">
                {t(lang, "footerExplore")}
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="text-white/60 transition hover:text-fuchsia-300">
                {t(lang, "navFavorites")}
              </Link>
            </li>
            <li>
              <Link href="/submit" className="text-white/60 transition hover:text-fuchsia-300">
                {t(lang, "navSubmit")}
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-white/60 transition hover:text-fuchsia-300">
                {t(lang, "footerAdmin")}
              </Link>
            </li>
            <li className="text-white/60">{t(lang, "footerStack")}</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-white/[0.06] py-5 text-center text-xs text-white/35 sm:flex-row sm:justify-between sm:text-left">
        <span>{t(lang, "footerRights")}</span>
        <FooterExtras lang={lang} />
      </div>
    </footer>
  );
}

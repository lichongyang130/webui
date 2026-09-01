import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VaultBrowser from "@/components/VaultBrowser";
import { getItems } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string; tech?: string }>;
}) {
  const lang = await getLang();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-12">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
            {lang === "zh" ? "全部资源" : "The whole vault"}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            <span className="grad-text">{t(lang, "exploreTitle")}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-white/55">{t(lang, "exploreDesc")}</p>
        </header>
        <ExploreBrowser searchParams={searchParams} lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}

async function ExploreBrowser({
  searchParams,
  lang,
}: {
  searchParams: Promise<{ q?: string; tag?: string; tech?: string }>;
  lang: "en" | "zh";
}) {
  const { q = "", tag = "", tech = "" } = await searchParams;
  const items = getItems({ q });
  const counts = new Map<string, number>();
  for (const it of getItems()) for (const tg of it.tags) counts.set(tg, (counts.get(tg) ?? 0) + 1);
  const trending = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([tg]) => tg);
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-white/35">
          {lang === "zh" ? "🔥 热门标签" : "🔥 Trending"}
        </span>
        {trending.map((tg) => (
          <a
            key={tg}
            href={`/explore?tag=${encodeURIComponent(tg)}`}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/60 transition hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10 hover:text-fuchsia-200"
          >
            #{tg}
          </a>
        ))}
      </div>
      <VaultBrowser items={items} initialQuery={q} initialTag={tag} initialTech={tech} lang={lang} />
    </div>
  );
}

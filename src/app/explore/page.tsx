import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VaultBrowser from "@/components/VaultBrowser";
import { getItems } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
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
  searchParams: Promise<{ q?: string; tag?: string }>;
  lang: "en" | "zh";
}) {
  const { q = "", tag = "" } = await searchParams;
  const items = getItems({ q });
  return <VaultBrowser items={items} initialQuery={q} initialTag={tag} lang={lang} />;
}

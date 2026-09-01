import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VaultBrowser from "@/components/VaultBrowser";
import { Icon } from "@/components/icons";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/categories";
import { getItems } from "@/lib/db";
import { getLang } from "@/lib/i18n";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ tag?: string; tech?: string }>;
}) {
  const { category } = await params;
  const { tag = "", tech = "" } = await searchParams;
  const lang = await getLang();
  const zh = lang === "zh";
  const cat = CATEGORY_MAP[category];
  if (!cat) notFound();

  const items = getItems({ category: cat.slug });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-12">
        {/* Category hero */}
        <header className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
          <div
            className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br ${cat.accent} opacity-20 blur-3xl`}
          />
          <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${cat.accent} shadow-xl`}>
              <Icon name={cat.icon} className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                {zh ? cat.taglineZh : cat.tagline}
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {zh ? cat.nameZh : cat.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
                {zh ? cat.descriptionZh : cat.description}
              </p>
            </div>
            <div className="ml-auto hidden shrink-0 text-right sm:block">
              <div className="text-4xl font-extrabold grad-text">{items.length}</div>
              <div className="text-xs uppercase tracking-wider text-white/40">
                {zh ? "个资源" : "assets"}
              </div>
            </div>
          </div>
        </header>

        <VaultBrowser items={items} activeCategory={cat.slug} initialTag={tag} initialTech={tech} lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ItemCard from "@/components/ItemCard";
import { Icon } from "@/components/icons";
import { CATEGORIES } from "@/lib/categories";
import { getItems, getStats, getSettings, getPopularTags } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";

const MARQUEE = [
  ["✦ MOTION SITES", "✦ 网站模板"],
  ["◈ REACT BITS", "◈ 动画组件"],
  ["✧ UIVERSE", "✧ UI 元素"],
  ["➤ ANIME.JS", "➤ 动画片段"],
  ["✺ ACETERNITY UI", "✺ 五站合一"],
  ["✦ ALL IN ONE VAULT", "✦ 全部在这"],
  ["◈ COPY THE PROMPT", "◈ 复制 Prompt"],
  ["✧ SHIP IN MINUTES", "✧ 分钟级上线"],
] as const;

export default async function HomePage() {
  const settings = getSettings();
  const stats = getStats();
  const lang = await getLang();
  const zh = lang === "zh";
  const featured = getItems({ featured: true }).slice(0, 8);
  const newest = getItems({ sort: "newest" }).slice(0, 4);
  const tags = getPopularTags(10);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteHeader />

      {/* -------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-grid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-violet-600/25 blur-[120px]" />
          <div className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-[120px]" />
        </div>

        <div className="container-v relative pb-20 pt-20 text-center sm:pt-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-4 py-1.5 text-[13px] font-medium text-cyan-300">
            <Icon name="bolt" className="h-3.5 w-3.5" />
            {t(lang, "heroBadge", { n: stats.total })}
          </div>

          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            {zh ? (
              <>
                <span className="grad-text">所有你需要的动画网站</span>
                <span className="mt-2 block text-white/90">—— 附带一键生成的 AI Prompt</span>
              </>
            ) : (
              <>
                <span className="grad-text">{settings.heroTitle.split("—")[0]}</span>
                <span className="mt-2 block text-white/90">{settings.heroTitle.split("—")[1] ?? ""}</span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
            {zh
              ? "MotionVault 将 Motion Sites、React Bits、Uiverse、Anime.js 和 Aceternity UI 的精华汇集一处：整站模板、高级组件、UI 微元素与动画片段 —— 每一个都配有实时预览、完整源码和可直接复制的 AI Prompt。"
              : settings.heroSubtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/explore" className="grad-btn text-base">
              <Icon name="search" className="h-4.5 w-4.5" />
              {t(lang, "heroCtaExplore")}
            </Link>
            <Link href="/templates" className="ghost-btn text-base">
              <Icon name="layout-template" className="h-4.5 w-4.5" />
              {t(lang, "heroCtaTemplates")}
            </Link>
          </div>

          {/* stat strip */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { n: stats.total, l: t(lang, "statAssets") },
              { n: (stats.stars / 1000).toFixed(0) + "k", l: t(lang, "statStars") },
              { n: (stats.copies / 1000).toFixed(0) + "k", l: t(lang, "statCopies") },
              { n: (stats.views / 1000).toFixed(0) + "k", l: t(lang, "statPreviews") },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-4 py-5">
                <div className="text-2xl font-extrabold grad-text">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* marquee */}
        <div className="relative border-y border-white/[0.07] py-4">
          <div className="flex w-max animate-marquee gap-3">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-3">
                {MARQUEE.map((m) => (
                  <span
                    key={m[0] + dup}
                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm font-bold tracking-wider text-white/45"
                  >
                    {zh ? m[1] : m[0]}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- CATEGORIES */}
      <section className="container-v py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              {zh ? "四大资源库" : "Four vaults"}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t(lang, "sectionVaultsTitle")}
            </h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
            >
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c.accent} opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35`}
              />
              <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c.accent} shadow-lg`}>
                <Icon name={c.icon} className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{zh ? c.nameZh : c.name}</h3>
              <p className="mt-1 text-[13px] font-medium text-white/45">{zh ? c.taglineZh : c.tagline}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                {zh ? c.descriptionZh : c.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition group-hover:text-white">
                {t(lang, "enterVault")}
                <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- FEATURED */}
      <section className="container-v py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              {t(lang, "featuredKicker")}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{t(lang, "featuredTitle")}</h2>
          </div>
          <Link
            href="/explore"
            className="hidden items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white sm:inline-flex"
          >
            {t(lang, "viewAll")} <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <ItemCard key={item.id} item={item} lang={lang} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- HOW IT WORKS */}
      <section className="container-v py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-[#0d0d22] to-fuchsia-950/30 p-8 sm:p-12">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            {zh ? "资源库使用<span className='grad-text'>指南</span>" : <>How the vault <span className="grad-text">works</span></>}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: "eye", title: t(lang, "step1Title"), desc: t(lang, "step1Desc") },
              { icon: "copy", title: t(lang, "step2Title"), desc: t(lang, "step2Desc") },
              { icon: "bolt", title: t(lang, "step3Title"), desc: t(lang, "step3Desc") },
            ].map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <Icon name={s.icon} className="h-6 w-6 text-fuchsia-300" />
                </div>
                <div className="mt-3 text-xs font-bold text-white/30">STEP {i + 1}</div>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/55">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <Link key={tag.tag} href={`/explore?tag=${tag.tag}`} className="chip transition hover:border-fuchsia-400/50 hover:text-white">
                #{tag.tag} <span className="ml-1 text-white/30">{tag.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- NEWEST */}
      <section className="container-v py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{t(lang, "newestKicker")}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{t(lang, "newestTitle")}</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newest.map((item) => (
            <ItemCard key={item.id} item={item} lang={lang} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- CTA */}
      <section className="container-v py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-500/20 p-12 text-center">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-[100px]" />
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">{t(lang, "ctaTitle")}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/60">{t(lang, "ctaDesc")}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/explore" className="grad-btn text-base">
              {t(lang, "ctaStart")} <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link href="/submit" className="ghost-btn text-base">
              <Icon name="plus" className="h-4 w-4" /> {t(lang, "navSubmit")}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

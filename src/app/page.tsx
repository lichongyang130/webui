import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ItemCard from "@/components/ItemCard";
import { Icon } from "@/components/icons";
import { CATEGORIES } from "@/lib/categories";
import { getItems, getStats, getSettings, getPopularTags } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";
import FxHero from "@/components/fx/FxHero";
import { Reveal } from "@/components/fx/ScrollFx";
import ParticleText from "@/components/fx/ParticleText";
import ScrollDraw from "@/components/fx/ScrollDraw";
import ScrollSpy from "@/components/fx/ScrollSpy";

const MARQUEE = [
  "✦ MOTION SITES",
  "◈ REACT BITS",
  "✧ UIVERSE",
  "➤ ANIME.JS",
  "✺ ACETERNITY UI",
  "✦ ALL IN ONE VAULT",
  "◈ COPY THE PROMPT",
  "✧ SHIP IN MINUTES",
  "✦ 网站模板",
  "◈ 动画组件",
  "✧ UI 元素",
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
      <ScrollSpy items={[{id:"vaults",label:zh?"资源库":"Vaults"},{id:"featured",label:zh?"精选":"Featured"},{id:"how",label:zh?"指南":"How it works"},{id:"newest",label:zh?"最新":"Newest"},{id:"cta",label:zh?"开始":"Get started"}]} />
      <FxHero lang={lang} total={stats.total} copies={stats.copies} views={stats.views} stars={stats.stars} />

      {/* marquee */}
      <div className="relative overflow-hidden border-y border-white/[0.07] py-4" data-nosmooth>
        <div className="flex w-max fx-marquee-track gap-3">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-3" aria-hidden={dup === 1}>
              {MARQUEE.map((m, i) => (
                <span
                  key={m + dup + i}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm font-bold tracking-wider text-white/45"
                >
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------- CATEGORIES */}
      <section id="vaults" className="container-v scroll-mt-24 py-20">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              {zh ? "四大资源库" : "Four vaults"}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t(lang, "sectionVaultsTitle")}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Link
                href={`/${c.slug}`}
                className="group fx-border-glow relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
              >
                <div
                  className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c.accent} opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35`}
                />
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c.accent} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                  <Icon name={c.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{zh ? c.nameZh : c.name}</h3>
                <p className="mt-1 text-[13px] font-medium text-white/45">{zh ? c.taglineZh : c.tagline}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                  {zh ? c.descriptionZh : c.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition group-hover:text-white">
                  {t(lang, "enterVault")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- FEATURED */}
      <section id="featured" className="container-v scroll-mt-24 py-10">
        <Reveal className="mb-8 flex items-end justify-between">
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
            {t(lang, "viewAll")} <span aria-hidden>→</span>
          </Link>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 80}>
              <ItemCard item={item} lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- HOW IT WORKS */}
      <section id="how" className="container-v scroll-mt-24 py-20">
        <Reveal className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-[#0d0d22] to-fuchsia-950/30 p-8 sm:p-12">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            {zh ? (
              <>
                资源库使用<span className="grad-text">指南</span>
              </>
            ) : (
              <>
                How the vault <span className="grad-text">works</span>
              </>
            )}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: "eye", title: t(lang, "step1Title"), desc: t(lang, "step1Desc") },
              { icon: "copy", title: t(lang, "step2Title"), desc: t(lang, "step2Desc") },
              { icon: "bolt", title: t(lang, "step3Title"), desc: t(lang, "step3Desc") },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="relative text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] transition-transform duration-300 hover:scale-110">
                  <Icon name={s.icon} className="h-6 w-6 text-fuchsia-300" />
                </div>
                <div className="mt-3 font-mono text-xs font-bold text-white/30">STEP 0{i + 1}</div>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/55">{s.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-10 flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <Link key={tag.tag} href={`/explore?tag=${tag.tag}`} className="chip transition hover:border-fuchsia-400/50 hover:text-white">
                #{tag.tag} <span className="ml-1 text-white/30">{tag.count}</span>
              </Link>
            ))}
          </Reveal>
        </Reveal>
      </section>

      {/* -------------------------------------------------- NEWEST */}
      <section id="newest" className="container-v scroll-mt-24 py-10">
        <Reveal className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{t(lang, "newestKicker")}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{t(lang, "newestTitle")}</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newest.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <ItemCard item={item} lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* scroll-drawn flourish — idea #97 */}
      <div className="container-v py-6">
        <ScrollDraw className="mx-auto w-full max-w-4xl opacity-70">
          <path
            className="fx-draw"
            pathLength={1}
            d="M20 60 C150 10, 250 110, 360 55 S540 30, 580 60"
            stroke="url(#fd1)"
            strokeWidth="2"
          />
          <path className="fx-draw" pathLength={1} d="M60 80 C200 40, 400 100, 540 70" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
          <circle className="fx-draw" pathLength={1} cx="580" cy="60" r="5" stroke="rgb(103,232,249)" strokeWidth="2" />
          <defs>
            <linearGradient id="fd1" x1="0" x2="1">
              <stop offset="0" stopColor="rgb(139,92,246)" />
              <stop offset="0.5" stopColor="rgb(217,70,239)" />
              <stop offset="1" stopColor="rgb(34,211,238)" />
            </linearGradient>
          </defs>
        </ScrollDraw>
      </div>

      {/* -------------------------------------------------- CTA */}
      <section id="cta" className="container-v scroll-mt-24 py-12">
        <Reveal className="fx-border-glow relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-500/20 p-12 text-center">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-[100px]" />
          <ParticleText text={zh ? "开始创造" : "START SHIPPING"} className="relative mx-auto max-w-3xl" height={150} />
          <p className="relative mx-auto mt-4 max-w-xl text-white/60">{t(lang, "ctaDesc")}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/explore" data-magnet className="grad-btn fx-pulse-glow text-base">
              {t(lang, "ctaStart")} <span aria-hidden>→</span>
            </Link>
            <Link href="/submit" data-magnet className="ghost-btn text-base">
              <Icon name="plus" className="h-4 w-4" /> {t(lang, "navSubmit")}
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}

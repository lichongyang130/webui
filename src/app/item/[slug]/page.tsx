import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ItemCard from "@/components/ItemCard";
import FavButton from "@/components/FavButton";
import { Icon } from "@/components/icons";
import { CATEGORY_MAP, TECH_LABELS } from "@/lib/categories";
import { getItemBySlug, getRelated, incrementViews } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";
import DetailClient, { DetailActions } from "./DetailClient";
import Comments from "@/components/Comments";
import Playground from "./Playground";
import { ShareBar } from "@/components/fx/ShareVote";

export default async function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();
  incrementViews(slug);

  const lang = await getLang();
  const zh = lang === "zh";
  const cat = CATEGORY_MAP[item.category];
  const related = getRelated(slug, item.category, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white">
            {t(lang, "crumbHome")}
          </Link>
          <span>/</span>
          <Link href={`/${item.category}`} className="hover:text-white">
            {zh ? cat.nameZh : cat.name}
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-white/70">{item.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* LEFT: preview + client tabs */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a18]">
              <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className="font-mono text-[11px] text-white/35">
                  motionvault.dev/preview/{item.slug}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> LIVE
                </span>
              </div>
              <DetailClient item={item} lang={lang} />
              <Playground html={item.html} lang={lang} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <DetailActions item={item} lang={lang} />
              <FavButton slug={item.slug} lang={lang} className="!h-[46px] !w-[46px]" />
              <ShareBar title={item.title} lang={lang} />
            </div>
          </div>

          {/* RIGHT: meta */}
          <aside className="space-y-5">
            <div className="glass rounded-3xl p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${cat.accent} px-3 py-1 text-[11px] font-bold uppercase tracking-wider`}
                >
                  <Icon name={cat.icon} className="h-3.5 w-3.5" /> {zh ? cat.nameZh : cat.name}
                </span>
                {item.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    <Icon name="star" className="h-3.5 w-3.5" /> {zh ? "精选" : "Featured"}
                  </span>
                )}
                {item.react && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                    ⚛ React TSX
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight">{item.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{item.summary}</p>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: "star", n: item.stars, l: zh ? "星标" : "stars", c: "text-amber-300" },
                  { icon: "eye", n: item.views, l: zh ? "浏览" : "views", c: "text-cyan-300" },
                  { icon: "copy", n: item.copies, l: zh ? "复制" : "copies", c: "text-fuchsia-300" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-white/[0.07] bg-white/[0.03] py-3">
                    <Icon name={s.icon} className={`mx-auto h-4 w-4 ${s.c}`} />
                    <div className="mt-1 text-sm font-bold">
                      {s.n >= 1000 ? (s.n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : s.n}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-white/35">{s.l}</div>
                  </div>
                ))}
              </div>

              <dl className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-white/40">{t(lang, "curatedBy")}</dt>
                  <dd className="font-medium">{item.author}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/40">{t(lang, "added")}</dt>
                  <dd className="font-medium">
                    {new Date(item.createdAt).toLocaleDateString(zh ? "zh-CN" : "en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {item.tech.map((tech) => (
                    <span key={tech} className="chip !px-2 !py-0.5 text-[10.5px]">
                      {TECH_LABELS[tech] ?? tech}
                    </span>
                  ))}
                </div>
              </dl>

              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:border-cyan-400/40 hover:text-white"
                >
                  <Icon name="external" className="h-4 w-4" /> {t(lang, "inspiredBy")} {new URL(item.sourceUrl).hostname}
                </a>
              )}
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/40">
                <Icon name="bolt" className="h-4 w-4 text-fuchsia-300" /> {zh ? "标签" : "Tags"}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Link key={tag} href={`/explore?tag=${tag}`} className="chip transition hover:border-fuchsia-400/50 hover:text-white">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight">
              {zh ? "更多相关资源" : `More from ${cat.name}`}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ItemCard key={r.id} item={r} lang={lang} />
              ))}
            </div>
          </section>
        )}

        <Comments slug={item.slug} lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}

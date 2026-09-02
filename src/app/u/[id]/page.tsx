import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ShareBar } from "@/components/fx/ShareVote";
import { getItemsByOwner, getUserById } from "@/lib/db";
import { getLang } from "@/lib/i18n";
import { toPublicUser } from "@/lib/userauth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = getUserById(id);
  if (!user) return { title: "Member not found · MotionVault" };
  return {
    title: `${user.name} · MotionVault`,
    description: `Animated assets published by ${user.name} on MotionVault.`,
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUserById(id);
  if (!user) notFound();

  const lang = await getLang();
  const zh = lang === "zh";
  const uploads = getItemsByOwner(user.id).filter(
    (i) => i.published && i.status !== "pending"
  );
  const views = uploads.reduce((s, i) => s + i.views, 0);
  const copies = uploads.reduce((s, i) => s + i.copies, 0);
  const pub = toPublicUser(user);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-12">
        {/* profile hero */}
        <section className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[90px]"
          />
          <div className="relative flex flex-wrap items-center gap-6">
            {pub.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pub.avatar}
                alt={pub.name}
                className="h-20 w-20 rounded-3xl border border-white/10 object-cover"
              />
            ) : (
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-3xl font-extrabold text-white shadow-[0_16px_44px_-12px_rgba(217,70,239,0.8)]">
                {pub.name.slice(0, 1).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-3xl font-extrabold tracking-tight">{pub.name}</h1>
              <p className="mt-1 text-sm text-white/40">
                {zh ? "加入于" : "Member since"}{" "}
                {new Date(pub.createdAt).toLocaleDateString(zh ? "zh-CN" : "en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-center">
                {[
                  [uploads.length, zh ? "已发布作品" : "Live assets"],
                  [views, zh ? "作品总浏览" : "Total views"],
                  [copies, zh ? "Prompt 被复制" : "Prompt copies"],
                ].map(([n, l], i) => (
                  <span
                    key={i}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm"
                  >
                    <b className="mr-1.5 tabular-nums">{n as number}</b>
                    <span className="text-xs text-white/40">{l as string}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mt-6">
            <ShareBar title={`${pub.name} · MotionVault`} lang={lang === "zh" ? "zh" : "en"} />
          </div>
        </section>

        {/* uploads */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-extrabold tracking-tight">
              {zh ? "公开作品" : "Published work"}{" "}
              <span className="ml-1 text-sm font-bold text-white/35">({uploads.length})</span>
            </h2>
            <Link href="/explore" className="text-xs font-bold text-fuchsia-300 hover:text-fuchsia-200">
              {zh ? "浏览全站 →" : "Explore all →"}
            </Link>
          </div>

          {uploads.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {uploads.map((it) => (
                <ItemCard key={it.id} item={it} lang={lang === "zh" ? "zh" : "en"} />
              ))}
            </div>
          ) : (
            <div className="glass grid place-items-center gap-3 rounded-2xl px-6 py-16 text-center">
              <span className="text-4xl">🌱</span>
              <p className="text-sm text-white/45">
                {zh
                  ? "这位创作者的作品正在路上 —— 通过审核后就会出现在这里。"
                  : "This creator's work is on its way — approved uploads will appear here."}
              </p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

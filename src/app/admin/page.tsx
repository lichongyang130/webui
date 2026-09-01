import Link from "next/link";
import { Icon } from "@/components/icons";
import { CATEGORIES } from "@/lib/categories";
import { getStats, getEvents, getItems, getAllItemsAdmin, getDailyStats, getPopularTags } from "@/lib/db";
import TrendChart from "./TrendChart";
import { DoughnutChart, TagCloud, BarRace } from "./AdminWidgets";

export default function AdminDashboard() {
  const stats = getStats();
  const events = getEvents();
  const daily = getDailyStats(21);
  const topCopied = getItems({ sort: "copies" }).slice(0, 5);
  const recent = getAllItemsAdmin().slice(0, 6);

  const cards = [
    { label: "Published assets", value: stats.total, icon: "layers", c: "from-violet-500 to-fuchsia-500" },
    { label: "Total views", value: (stats.views / 1000).toFixed(1) + "k", icon: "eye", c: "from-cyan-400 to-blue-500" },
    { label: "Prompts copied", value: (stats.copies / 1000).toFixed(1) + "k", icon: "copy", c: "from-fuchsia-500 to-rose-500" },
    { label: "GitHub stars", value: (stats.stars / 1000).toFixed(0) + "k", icon: "star", c: "from-amber-400 to-orange-500" },
    { label: "Pending review", value: stats.pending, icon: "shield", c: "from-emerald-400 to-teal-500" },
  ];

  const catRows = CATEGORIES.map((c) => ({
    ...c,
    count: getItems({ category: c.slug }).length,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-white/45">Welcome back — here's what's happening in the vault.</p>
        </div>
        <Link href="/admin/items/new" className="grad-btn">
          <Icon name="plus" className="h-4 w-4" /> Add new item
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((c) => {
          const card = (
            <div className="glass h-full rounded-2xl p-5 transition hover:border-white/20">
              <div className="flex items-center justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${c.c}`}>
                  <Icon name={c.icon} className="h-5 w-5 text-white" />
                </span>
                {c.label === "Pending review" && stats.pending > 0 && (
                  <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold text-black">
                    NEW
                  </span>
                )}
              </div>
              <div className="mt-4 text-3xl font-extrabold tracking-tight">{c.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{c.label}</div>
            </div>
          );
          return c.label === "Pending review" ? (
            <Link key={c.label} href="/admin/submissions">
              {card}
            </Link>
          ) : (
            <div key={c.label}>{card}</div>
          );
        })}
      </div>

      {/* Trend chart */}
      <TrendChart data={daily} />

      {/* Tag cloud */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">
          Hot tags <span className="ml-2 normal-case tracking-normal text-white/25">size = usage frequency</span>
        </h2>
        <div className="mt-4">
          <TagCloud tags={getPopularTags(24)} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Categories doughnut + bars */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">Assets by vault</h2>
          <div className="mt-5">
            <DoughnutChart
              segments={[
                { label: "Templates", value: catRows.find((c) => c.slug === "templates")?.count ?? 0, color: "#8b5cf6" },
                { label: "Components", value: catRows.find((c) => c.slug === "components")?.count ?? 0, color: "#d946ef" },
                { label: "Elements", value: catRows.find((c) => c.slug === "elements")?.count ?? 0, color: "#22d3ee" },
                { label: "Animations", value: catRows.find((c) => c.slug === "animations")?.count ?? 0, color: "#f59e0b" },
              ]}
            />
          </div>
          <div className="mt-6 border-t border-white/[0.07] pt-5">
            <BarRace
              title="Views per vault"
              rows={CATEGORIES.map((c) => ({
                label: c.name,
                value: getItems({ category: c.slug }).reduce((s, i) => s + i.views, 0),
              }))}
            />
          </div>
          <div className="mt-5 flex gap-3 border-t border-white/[0.07] pt-4 text-xs text-white/40">
            <span className="chip">{stats.drafts} unpublished draft{stats.drafts === 1 ? "" : "s"}</span>
            <Link href="/admin/items" className="chip transition hover:border-violet-400/50 hover:text-white">
              Manage all items →
            </Link>
          </div>
        </div>

        {/* Activity */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">Recent activity</h2>
          <ul className="mt-5 space-y-3.5">
            {events.map((e) => (
              <li key={e.id} className="flex items-start gap-3 text-sm">
                <span
                  className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                    e.type === "delete"
                      ? "bg-rose-500/15 text-rose-300"
                      : e.type === "create"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : e.type === "login"
                          ? "bg-cyan-500/15 text-cyan-300"
                          : "bg-violet-500/15 text-violet-300"
                  }`}
                >
                  <Icon
                    name={e.type === "delete" ? "trash" : e.type === "create" ? "plus" : e.type === "login" ? "shield" : "edit"}
                    className="h-3.5 w-3.5"
                  />
                </span>
                <div>
                  <p className="leading-snug text-white/75">{e.message}</p>
                  <p className="mt-0.5 text-[11px] text-white/30">
                    {new Date(e.at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top copied */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">Most copied prompts</h2>
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {topCopied.map((i, idx) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <span className="w-5 text-sm font-bold text-white/30">{idx + 1}</span>
                <Link href={`/item/${i.slug}`} target="_blank" className="flex-1 truncate text-sm font-medium text-white/80 hover:text-fuchsia-300">
                  {i.title}
                </Link>
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <Icon name="copy" className="h-3.5 w-3.5" />
                  {i.copies.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent items */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">Recently updated</h2>
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {recent.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${i.published ? "bg-emerald-400" : "bg-amber-400"}`}
                  title={i.published ? "published" : "draft"}
                />
                <Link href={`/admin/items/${i.id}`} className="flex-1 truncate text-sm font-medium text-white/80 hover:text-violet-300">
                  {i.title}
                </Link>
                <span className="text-[11px] uppercase tracking-wider text-white/30">{i.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

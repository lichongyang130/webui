import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Image as ImageIcon, Layers, Star } from "lucide-react";
import { api } from "../../api";
import { Asset, Section } from "../../types";
import { iconMap } from "../Sections";
import { useT } from "../../i18n";
import { Trophy } from "lucide-react";

function Beams() {
  const beams = [
    { l: "4%", r: 38, c: "#22d3ee" },
    { l: "14%", r: 38, c: "#8b5cf6" },
    { l: "82%", r: 38, c: "#f472b6" },
    { l: "92%", r: 38, c: "#22d3ee" },
    { l: "30%", r: -30, c: "#8b5cf6" },
    { l: "66%", r: -30, c: "#22d3ee" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {beams.map((b, i) => (
        <div
          key={i}
          className="absolute -top-24 h-[620px] w-[2px] opacity-60 blur-[1px]"
          style={{
            left: b.l,
            transform: `rotate(${b.r}deg)`,
            background: `linear-gradient(to bottom, transparent, ${b.c}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [cols, setCols] = useState<any[]>([]);
  const [rank, setRank] = useState<any[]>([]);
  const { t } = useT();
  useEffect(() => {
    api.get("/public/stats").then(setStats);
    api.get<Section[]>("/public/sections").then(setSections);
    api.get<Asset[]>("/public/assets").then(setAssets);
    api.get("/public/daily").then(setDaily);
    api.get("/public/collections").then(setCols);
    api.get("/public/rank").then(setRank);
  }, []);

  const statCards = stats
    ? [
        { icon: Boxes, label: "资源版块", v: stats.sections, c: "#22d3ee" },
        { icon: Layers, label: "二级分类", v: stats.categories, c: "#8b5cf6" },
        { icon: Star, label: "精选资源", v: stats.items, c: "#34d399" },
        { icon: ImageIcon, label: "设计图", v: stats.assets, c: "#f472b6" },
      ]
    : [];

  return (
    <div>
      {/* Hero */}
      <section className="grid-bg relative overflow-hidden">
        <Beams />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
          <span className="badge mb-6" style={{ borderColor: "#22d3ee55", color: "#67e8f9" }}>
            5 大动效资源版块 · 一站收录
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {t("hero1")}
            <span className="neon-text">{t("hero2")}</span>
            <br />
            {t("hero3")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400">{t("sub")}</p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="#sections" className="btn btn-primary">
              浏览版块 <ArrowRight size={14} />
            </a>
            <Link to="/gallery" className="btn">
              <ImageIcon size={14} /> 设计画廊
            </Link>
          </div>
          {stats && (
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-4 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="card card-hover p-4">
                  <div className="text-2xl font-bold" style={{ color: s.c }}>
                    {s.v}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sections */}
      <section id="sections" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">资源版块</h2>
        <p className="mb-10 text-center text-xs text-slate-500">点击版块进入二级分类与精选资源</p>
        <div className="grid grid-cols-3 gap-4">
          {sections.map((s) => {
            const Icon = iconMap[s.icon] || Boxes;
            return (
              <Link key={s.id} to={`/s/${s.slug}`} className="card card-hover group p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-110"
                    style={{ background: s.color + "22", color: s.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-xs text-slate-500">
                    {s.category_count} 分类 · {s.item_count} 资源
                  </span>
                </div>
                <div className="mb-1 font-semibold text-slate-100">{s.name}</div>
                <p className="mb-4 h-10 text-xs leading-5 text-slate-500">{s.description}</p>
                <span className="text-xs font-medium" style={{ color: s.color }}>
                  查看版块 →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* daily / collections / rank */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">{t("daily")}</h3>
            <div className="space-y-2">
              {daily.map((d) => (
                <Link key={d.id} to={`/i/${d.id}`} className="block rounded-lg bg-[#0d1220] p-2.5 text-xs hover:bg-[#121828]">
                  <span className="font-medium text-slate-200">{d.name}</span>
                  <span className="ml-2" style={{ color: d.section_color }}>{d.section_slug}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">{t("collections")}</h3>
            <div className="space-y-2">
              {cols.map((c) => (
                <div key={c.id} className="rounded-lg bg-[#0d1220] p-2.5 text-xs">
                  <div className="font-medium text-slate-200">{c.name} <span className="text-slate-500">({c.n})</span></div>
                  <div className="mt-0.5 text-slate-500">{c.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-200">
              <Trophy size={13} className="text-amber-400" /> {t("rank")}
            </h3>
            <ol className="space-y-1.5 text-xs">
              {rank.map((r, i) => (
                <li key={r.id}>
                  <Link to={`/i/${r.id}`} className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-[#0d1220]">
                    <span className="w-4 text-slate-600">{i + 1}</span>
                    <span className="flex-1 truncate text-slate-300">{r.name}</span>
                    {r.rc > 0 && (
                      <span className="flex items-center gap-0.5 text-amber-400">
                        <Star size={10} className="fill-amber-400" /> {Math.round(r.avg * 10) / 10}
                      </span>
                    )}
                    <span style={{ color: r.section_color }}>{r.popularity}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Featured design strip */}
      <section className="border-t border-[#141a28] bg-[#07090f] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">设计画廊精选</h2>
              <p className="mt-1 text-xs text-slate-500">深色霓虹风格界面设计图 · 每界面 5 变体</p>
            </div>
            <Link to="/gallery" className="text-xs text-cyan-400 hover:underline">
              查看全部 {assets.length} 张 →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {assets
              .filter((a) => !a.path.includes("-v"))
              .slice(0, 8)
              .map((a) => (
                <Link key={a.id} to="/gallery" className="card card-hover group overflow-hidden">
                  <img
                    src={a.path}
                    alt={a.title}
                    className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="flex items-center justify-between px-3 py-2 text-[11px] text-slate-400">
                    <span className="truncate">{a.screen}</span>
                    <span className="text-cyan-400 opacity-0 transition group-hover:opacity-100">查看</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

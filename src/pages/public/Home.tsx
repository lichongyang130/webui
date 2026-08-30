import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Image as ImageIcon, Layers, Star } from "lucide-react";
import { api } from "../../api";
import { Asset, Section } from "../../types";
import { iconMap } from "../Sections";

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
  useEffect(() => {
    api.get("/public/stats").then(setStats);
    api.get<Section[]>("/public/sections").then(setSections);
    api.get<Asset[]>("/public/assets").then(setAssets);
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
            把全网最好的
            <span className="neon-text"> 动效 UI </span>
            <br />
            收进一个库
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400">
            Aceternity、MotionSites、React Bits、Uiverse、Anime.js —— 组件、提示词、元素与动画引擎,
            按真实二级分类整理,附 25 张深色霓虹界面设计图。
          </p>
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

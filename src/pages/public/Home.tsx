import { CSSProperties, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Boxes, ChevronDown, Image as ImageIcon, Layers, Star, Trophy } from "lucide-react";
import { api } from "../../api";
import { Asset, Section } from "../../types";
import { iconMap } from "../Sections";
import { useT } from "../../i18n";
import {
  CountUp, FlipWords, Marquee, ParticleField, Reveal, Scramble, Tilt, TypeTerminal,
} from "../../fx";

const TECH = ["React 18", "Tailwind v4", "Framer Motion", "WebGL", "Canvas 2D", "SVG Paths", "FLIP Layout", "Shaders", "TypeScript", "Vite", "Express", "SQLite"];

const preview: Record<string, CSSProperties> = {
  aceternity: {
    backgroundImage:
      "linear-gradient(115deg, transparent 42%, #22d3ee33 46%, transparent 50%), linear-gradient(115deg, transparent 62%, #8b5cf633 66%, transparent 70%)",
  },
  reactbits: { backgroundImage: "radial-gradient(#a78bfa44 1px, transparent 1px)", backgroundSize: "10px 10px" },
  uiverse: {
    backgroundImage: "linear-gradient(#34d39922 1px, transparent 1px), linear-gradient(90deg,#34d39922 1px, transparent 1px)",
    backgroundSize: "14px 14px",
  },
  animejs: { backgroundImage: "repeating-radial-gradient(circle at 0 50%, #f59e0b22 0 2px, transparent 2px 14px)" },
  motionsites: { backgroundImage: "conic-gradient(from 180deg at 50% 50%, #f472b622, #8b5cf622, #22d3ee22, #f472b622)" },
};

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [rank, setRank] = useState<any[]>([]);
  const [cov, setCov] = useState<any[]>([]);
  const [m, setM] = useState({ x: 0, y: 0 });
  const { t } = useT();

  useEffect(() => {
    api.get("/public/stats").then(setStats);
    api.get<Section[]>("/public/sections").then(setSections);
    api.get<Asset[]>("/public/assets").then(setAssets);
    api.get("/public/daily").then(setDaily);
    api.get("/public/rank").then(setRank);
    api.get("/public/coverage").then(setCov);
  }, []);

  return (
    <div>
      {/* ============ ① 满屏 Hero ============ */}
      <section
        className="noise relative flex min-h-[100svh] flex-col overflow-hidden"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setM({ x: (e.clientX / r.width - 0.5) * 2, y: (e.clientY / r.height - 0.5) * 2 });
        }}
      >
        <ParticleField className="absolute inset-0" />
        {/* aurora blobs */}
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" style={{ transform: `translate(${m.x * 18}px, ${m.y * 12}px)` }} />
        <div className="pointer-events-none absolute -right-24 top-32 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" style={{ transform: `translate(${m.x * -22}px, ${m.y * -14}px)` }} />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        {/* parallax beams */}
        {[
          { l: "6%", r: 38, c: "#22d3ee", d: 26 },
          { l: "16%", r: 38, c: "#8b5cf6", d: 18 },
          { l: "84%", r: 38, c: "#f472b6", d: 30 },
          { l: "93%", r: 38, c: "#22d3ee", d: 22 },
        ].map((b, i) => (
          <div
            key={i}
            className="pointer-events-none absolute -top-24 h-[640px] w-[2px] opacity-70 blur-[1px]"
            style={{
              left: b.l,
              transform: `rotate(${b.r}deg) translate(${m.x * b.d}px, ${m.y * b.d * 0.5}px)`,
              background: `linear-gradient(to bottom, transparent, ${b.c}, transparent)`,
            }}
          />
        ))}
        <div className="grid-floor" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pt-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] text-cyan-200">
                <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
                v2.0 · 5 大版块 · {stats ? <CountUp to={stats.items} /> : "…"} 精选资源
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.15] text-white md:text-6xl">
                <Scramble text="把全网最好的" />
                <br />
                <span className="shimmer">
                  <FlipWords words={["动效组件", "AI 提示词", "UI 元素", "动画引擎"]} />
                </span>
                <br />
                收进一个库
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400">{t("sub")}</p>
              <div className="mt-8 flex gap-3">
                <a
                  href="#sections"
                  className="btn btn-primary !px-6 !py-3 !text-sm"
                  style={{ boxShadow: "0 0 32px -6px #22d3ee88" }}
                >
                  开始探索 <ArrowRight size={15} />
                </a>
                <Link to="/gallery" className="btn glass !px-6 !py-3 !text-sm">
                  <ImageIcon size={15} /> 设计画廊
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="float-y mb-4">
                <TypeTerminal
                  lines={[
                    "$ npx shadcn@latest add @aceternity/background-beams",
                    "✓ background-beams installed",
                    "$ npx shadcn@latest add @aceternity/flip-words",
                    "✓ flip-words installed",
                    "$ open https://motion.ui →",
                  ]}
                />
              </div>
              <Tilt>
                <div className="glass rounded-xl p-4">
                  <div className="mb-2 flex justify-between text-[11px] text-slate-400">
                    <span>资源入库趋势</span>
                    <span className="text-emerald-400">+137 this quarter</span>
                  </div>
                  <svg viewBox="0 0 200 56" className="w-full">
                    <polyline
                      points="0,48 25,44 50,46 75,36 100,38 125,26 150,22 175,12 200,6"
                      fill="none"
                      stroke="url(#g1)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0" stopColor="#22d3ee" />
                        <stop offset="1" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-lg bg-[#0d1220] p-2">
                      <div className="text-lg font-bold text-cyan-300">{stats ? <CountUp to={stats.categories} /> : 0}</div>
                      <div className="text-[10px] text-slate-500">二级分类</div>
                    </div>
                    <div className="rounded-lg bg-[#0d1220] p-2">
                      <div className="text-lg font-bold text-violet-300">{stats ? <CountUp to={stats.assets} /> : 0}</div>
                      <div className="text-[10px] text-slate-500">设计资产</div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>

        {/* ② 技术 marquee + 滚动提示 */}
        <div className="relative z-10 pb-6">
          <Marquee speed={26} className="border-y border-[#141a28] bg-[#07090f99] py-3 backdrop-blur">
            {TECH.map((c) => (
              <span key={c} className="glass rounded-full px-4 py-1.5 text-[11px] text-slate-400">
                {c}
              </span>
            ))}
          </Marquee>
          <div className="mt-4 flex justify-center">
            <div className="flex flex-col items-center gap-1 text-slate-600">
              <ChevronDown size={14} />
              <div className="h-6 w-px overflow-hidden bg-[#1e2534]">
                <div className="scroll-hint h-full w-px bg-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ③ 数据带 ============ */}
      <section className="border-b border-[#141a28] bg-[#07090f]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-14 md:grid-cols-4">
          {[
            { icon: Boxes, c: "#22d3ee", to: stats?.items || 0, label: "精选资源" },
            { icon: Layers, c: "#8b5cf6", to: stats?.categories || 0, label: "二级分类" },
            { icon: ImageIcon, c: "#f472b6", to: stats?.assets || 0, label: "设计资产" },
            { icon: Star, c: "#f59e0b", to: stats?.sections || 0, label: "资源版块" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className="text-center">
              <s.icon size={18} className="mx-auto mb-2" style={{ color: s.c }} />
              <div className="text-4xl font-extrabold" style={{ color: s.c, textShadow: `0 0 32px ${s.c}55` }}>
                <CountUp to={s.to} />
              </div>
              <div className="mt-1 text-xs tracking-widest text-slate-500">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ ④ 版块区 ============ */}
      <section id="sections" className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-white">{t("sections")}</h2>
          <p className="mb-12 mt-2 text-center text-xs text-slate-500">HOVER 点亮每个版块的视觉基因</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {sections.map((s, i) => {
            const Icon = iconMap[s.icon] || Boxes;
            return (
              <Reveal key={s.id} delay={i * 90}>
                <Tilt>
                  <Link to={`/s/${s.slug}`} className="card card-hover group relative block overflow-hidden p-6">
                    <div
                      className="absolute inset-0 opacity-0 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
                      style={preview[s.slug]}
                    />
                    <div className="relative">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-110"
                        style={{ background: s.color + "22", color: s.color, boxShadow: `0 0 24px -6px ${s.color}66` }}
                      >
                        <Icon size={24} />
                      </div>
                      <div className="mb-1 font-semibold text-slate-100">{s.name}</div>
                      <p className="mb-4 h-10 text-xs leading-5 text-slate-500">{s.description}</p>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: s.color }}>
                          <CountUp to={s.item_count || 0} /> 资源
                        </span>
                        <span className="text-slate-600">{s.category_count} 分类 →</span>
                      </div>
                    </div>
                  </Link>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ ⑤ 覆盖率带 ============ */}
      <section className="border-y border-[#141a28] bg-[#07090f] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="mb-2 text-2xl font-bold text-white">目录覆盖率</h2>
            <p className="mb-8 text-xs text-slate-500">相对官方目录的收录进度,持续爬取同步</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-5">
            {cov.map((c, i) => (
              <Reveal key={c.slug} delay={i * 100}>
                <CovBar name={c.name} c={c.c} official={c.official} pct={c.pct} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ⑥ 作品墙(横向视差带) ============ */}
      <section className="py-20">
        <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between px-4">
          <Reveal>
            <h2 className="text-2xl font-bold text-white">设计作品墙</h2>
            <p className="mt-1 text-xs text-slate-500">横向滑动浏览 {assets.length} 张深色霓虹设计图</p>
          </Reveal>
          <Link to="/gallery" className="text-xs text-cyan-400 hover:underline">
            进入画廊 →
          </Link>
        </div>
        <div
          className="flex snap-x gap-5 overflow-x-auto px-4 pb-4"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          {assets.map((a) => (
            <Link key={a.id} to="/gallery" className="card card-hover group w-80 shrink-0 snap-center overflow-hidden">
              <img src={a.path} alt={a.title} className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="flex justify-between px-3 py-2 text-[11px] text-slate-400">
                <span className="truncate">{a.screen || a.title}</span>
                <span className="text-cyan-400 opacity-0 group-hover:opacity-100">查看</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ ⑦ 每日推荐 + 人气榜 ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="mb-4 text-sm font-semibold text-slate-200">{t("daily")}</h3>
              <div className="space-y-2.5">
                {daily.map((d) => (
                  <Link key={d.id} to={`/i/${d.id}`} className="flex items-center justify-between rounded-xl bg-[#0d1220] p-3 text-xs transition hover:bg-[#121828] hover:shadow-[0_0_24px_-8px_#22d3ee66]">
                    <span className="font-medium text-slate-200">{d.name}</span>
                    <span style={{ color: d.section_color }}>{d.section_slug}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-slate-200">
                <Trophy size={14} className="text-amber-400" /> {t("rank")}
              </h3>
              <ol className="space-y-1.5 text-xs">
                {rank.map((r, i) => (
                  <li key={r.id}>
                    <Link to={`/i/${r.id}`} className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-[#0d1220]">
                      <span className="neon-text w-5 text-sm font-black">{i + 1}</span>
                      <span className="flex-1 truncate text-slate-300">{r.name}</span>
                      {r.rc > 0 && (
                        <span className="flex items-center gap-0.5 text-amber-400">
                          <Star size={10} className="fill-amber-400" /> {Math.round(r.avg * 10) / 10}
                        </span>
                      )}
                      <span className="w-8 text-right" style={{ color: r.section_color }}>{r.popularity}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ ⑧ CTA ============ */}
      <section className="relative overflow-hidden border-t border-[#141a28] py-24">
        <div className="conic-spin pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl" style={{ background: "conic-gradient(#22d3ee, #8b5cf6, #f472b6, #22d3ee)" }} />
        <Reveal className="relative z-10 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            准备好打造 <span className="shimmer">下一代官网</span> 了吗?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">用拼装向导组合 Hero、背景、文字与卡片,一键导出清单与配套设计图。</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/wizard" className="btn btn-primary !px-8 !py-3 !text-sm" style={{ boxShadow: "0 0 40px -8px #8b5cf6aa" }}>
              打开拼装向导 <ArrowRight size={15} />
            </Link>
            <Link to="/admin" className="btn glass !px-8 !py-3 !text-sm">
              进入后台
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function CovBar({ name, c, official, pct }: { name: string; c: number; official: number; pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.4 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="text-slate-300">{name}</span>
        <span className="text-slate-500">
          {c}/{official || "—"}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[#141a28]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-[1400ms] ease-out"
          style={{ width: on ? `${pct}%` : "0%", boxShadow: "0 0 16px #22d3ee66" }}
        />
      </div>
      <div className="mt-1 text-right text-[10px] text-cyan-300">{pct}%</div>
    </div>
  );
}

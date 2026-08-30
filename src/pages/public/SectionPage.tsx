import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Boxes, ExternalLink, Search, Star } from "lucide-react";
import { api } from "../../api";
import { Category, Item, Section, parseTags } from "../../types";
import { iconMap } from "../Sections";
import { Empty, Pager } from "../../components/ui";

export default function SectionPage() {
  const { slug } = useParams();
  const [meta, setMeta] = useState<{ section: Section; categories: Category[] } | null>(null);
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [fCat, setFCat] = useState("");
  const [fTag, setFTag] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ rows: Item[]; total: number }>({ rows: [], total: 0 });

  useEffect(() => {
    setFCat("");
    setFTag("");
    setQ("");
    setPage(1);
    api.get(`/public/sections/${slug}`).then(setMeta).catch(() => setMeta(null));
    api.get("/public/tags").then(setTags);
  }, [slug]);

  useEffect(() => {
    const p = new URLSearchParams();
    p.set("section_slug", slug || "");
    if (fCat) p.set("category_slug", fCat);
    if (fTag) p.set("tag", fTag);
    if (q) p.set("q", q);
    p.set("page", String(page));
    api.get(`/public/items?${p}`).then(setData);
  }, [slug, fCat, fTag, q, page]);

  if (meta === null) return <div className="p-10 text-slate-500">加载中…</div>;
  if (!meta) return <Empty text="版块不存在" />;
  const { section, categories } = meta;
  const Icon = iconMap[section.icon] || Boxes;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* header */}
      <div className="mb-8 flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: section.color + "22", color: section.color }}
        >
          <Icon size={26} />
        </div>
        <div className="flex-1">
          <h1 className="flex items-center gap-3 text-xl font-bold text-white">
            {section.name}
            <a className="btn !py-1 text-[11px]" href={section.url} target="_blank" rel="noreferrer">
              官网 <ExternalLink size={11} />
            </a>
          </h1>
          <p className="mt-1 text-xs text-slate-500">{section.description}</p>
        </div>
        <Link to="/" className="text-xs text-slate-500 hover:text-cyan-400">
          ← 返回首页
        </Link>
      </div>

      {/* filters */}
      <div className="card mb-6 flex flex-wrap items-center gap-3 p-3">
        <div className="flex flex-wrap gap-1.5">
          <button
            className={`btn !py-1.5 text-xs ${!fCat ? "!border-cyan-500/50 !text-cyan-300" : ""}`}
            onClick={() => {
              setFCat("");
              setPage(1);
            }}
          >
            全部
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`btn !py-1.5 text-xs ${fCat === c.slug ? "!border-cyan-500/50 !text-cyan-300" : ""}`}
              title={c.description}
              onClick={() => {
                setFCat(c.slug);
                setPage(1);
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <select className="select !w-36" value={fTag} onChange={(e) => { setFTag(e.target.value); setPage(1); }}>
            <option value="">全部标签</option>
            {tags.map((t) => (
              <option key={t.tag} value={t.tag}>
                {t.tag} ({t.count})
              </option>
            ))}
          </select>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-2.5 text-slate-500" />
            <input
              className="input !w-44 !pl-8"
              placeholder="搜索资源…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* items grid */}
      {data.rows.length === 0 ? (
        <Empty text="该分类下暂无资源" />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {data.rows.map((it) => (
            <div key={it.id} className="card card-hover group flex flex-col overflow-hidden">
              {it.cover_image ? (
                <img src={it.cover_image} alt={it.name} className="aspect-video w-full object-cover" />
              ) : (
                <div
                  className="grid-bg flex aspect-video w-full items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${section.color}18, transparent 70%)` }}
                >
                  <Icon size={30} style={{ color: section.color + "88" }} />
                </div>
              )}
              <div className="flex-1 p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-100">{it.name}</span>
                  {it.starred ? <Star size={13} className="mt-0.5 shrink-0 fill-amber-400 text-amber-400" /> : null}
                </div>
                <p className="mb-3 line-clamp-2 text-xs leading-5 text-slate-500">{it.description}</p>
                <div className="flex flex-wrap gap-1">
                  {parseTags(it.tags).slice(0, 3).map((t) => (
                    <span key={t} className="badge" style={{ borderColor: "#1e2534", color: "#64748b" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[#141a28] px-4 py-2 text-[11px]">
                <span style={{ color: section.color }}>{it.category_name}</span>
                <a className="text-slate-500 hover:text-cyan-400" href={it.url} target="_blank" rel="noreferrer">
                  原站 <ExternalLink size={11} className="inline" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pager page={page} pageSize={24} total={data.total} onChange={setPage} />
    </div>
  );
}

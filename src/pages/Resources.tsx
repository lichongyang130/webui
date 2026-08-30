import { useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, Search, Star, Tag, Trash2 } from "lucide-react";
import { api } from "../api";
import { Asset, Category, Item, Section, parseTags } from "../types";
import { Empty, Field, Modal, Pager, StarBtn, StatusBadge } from "../components/ui";

const blank = {
  name: "",
  section_id: 0,
  category_id: 0,
  url: "",
  description: "",
  tags: "",
  tech: "",
  cover_image: "",
  status: "pending",
  starred: 0,
  notes: "",
};

export default function Resources() {
  const [sections, setSections] = useState<Section[]>([]);
  const [allCats, setAllCats] = useState<Category[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);

  const [fSection, setFSection] = useState("");
  const [fCategory, setFCategory] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fTag, setFTag] = useState("");
  const [q, setQ] = useState("");
  const [starredOnly, setStarredOnly] = useState(false);
  const [page, setPage] = useState(1);

  const [data, setData] = useState<{ rows: Item[]; total: number }>({ rows: [], total: 0 });
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [bulkTag, setBulkTag] = useState("");
  const [edit, setEdit] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = () => {
    const p = new URLSearchParams();
    if (fSection) p.set("section_id", fSection);
    if (fCategory) p.set("category_id", fCategory);
    if (fStatus) p.set("status", fStatus);
    if (fTag) p.set("tag", fTag);
    if (q) p.set("q", q);
    if (starredOnly) p.set("starred", "1");
    p.set("page", String(page));
    api.get(`/items?${p}`).then(setData);
  };
  useEffect(() => {
    api.get<Section[]>("/sections").then(setSections);
    api.get<Category[]>("/categories").then(setAllCats);
    api.get<Asset[]>("/assets").then(setAssets);
    api.get("/tags").then(setTags);
  }, []);
  useEffect(load, [fSection, fCategory, fStatus, fTag, q, starredOnly, page]);

  const cats = allCats.filter((c) => !fSection || c.section_id === +fSection);

  const save = async () => {
    const body = { ...edit, tags: edit.tags ? String(edit.tags).split(/[,，\s]+/).filter(Boolean) : [] };
    if (isNew) await api.post("/items", body);
    else await api.put(`/items/${edit.id}`, body);
    setEdit(null);
    load();
  };
  const del = async (id: number) => {
    if (!confirm("删除该资源?")) return;
    await api.del(`/items/${id}`);
    load();
  };
  const star = async (it: Item) => {
    await api.put(`/items/${it.id}`, { ...it, tags: parseTags(it.tags), starred: it.starred ? 0 : 1 });
    load();
  };
  const bulk = async (action: string) => {
    const ids = [...sel];
    await api.post("/items/bulk", { ids, action, tag: bulkTag || undefined });
    setSel(new Set());
    setBulkTag("");
    load();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-100">资源条目</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsNew(true);
            setEdit({ ...blank, section_id: sections[0]?.id || 0, category_id: allCats[0]?.id || 0 });
          }}
        >
          <Plus size={14} /> 新增资源
        </button>
      </div>

      <div className="card mb-4 grid grid-cols-6 gap-3 p-4">
        <select className="select" value={fSection} onChange={(e) => { setFSection(e.target.value); setFCategory(""); setPage(1); }}>
          <option value="">全部版块</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select className="select" value={fCategory} onChange={(e) => { setFCategory(e.target.value); setPage(1); }}>
          <option value="">全部分类</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select className="select" value={fStatus} onChange={(e) => { setFStatus(e.target.value); setPage(1); }}>
          <option value="">全部状态</option>
          <option value="published">已发布</option>
          <option value="pending">待整理</option>
        </select>
        <select className="select" value={fTag} onChange={(e) => { setFTag(e.target.value); setPage(1); }}>
          <option value="">全部标签</option>
          {tags.map((t) => (
            <option key={t.tag} value={t.tag}>{t.tag} ({t.count})</option>
          ))}
        </select>
        <div className="relative col-span-1">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
          <input className="input !pl-8" placeholder="搜索…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-400">
          <input type="checkbox" checked={starredOnly} onChange={(e) => { setStarredOnly(e.target.checked); setPage(1); }} />
          只看收藏
        </label>
      </div>

      {sel.size > 0 && (
        <div className="card mb-4 flex items-center gap-3 border-cyan-500/30 p-3 text-xs">
          <span className="text-cyan-300">已选 {sel.size} 项</span>
          <button className="btn !py-1" onClick={() => bulk("star")}>
            <Star size={12} /> 收藏
          </button>
          <button className="btn !py-1" onClick={() => bulk("unstar")}>取消收藏</button>
          <div className="flex items-center gap-1">
            <input className="input !w-28 !py-1" placeholder="标签名" value={bulkTag} onChange={(e) => setBulkTag(e.target.value)} />
            <button className="btn !py-1" onClick={() => bulkTag && bulk("tag")}>
              <Tag size={12} /> 打标签
            </button>
          </div>
          <button className="btn btn-danger !py-1" onClick={() => bulk("delete")}>
            <Trash2 size={12} /> 删除
          </button>
        </div>
      )}

      {data.rows.length === 0 ? (
        <Empty text="没有符合条件的资源" />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="th w-8">
                  <input
                    type="checkbox"
                    checked={sel.size === data.rows.length && data.rows.length > 0}
                    onChange={(e) => setSel(e.target.checked ? new Set(data.rows.map((r) => r.id)) : new Set())}
                  />
                </th>
                <th className="th">名称</th>
                <th className="th">版块 / 分类</th>
                <th className="th">标签</th>
                <th className="th">封面</th>
                <th className="th">状态</th>
                <th className="th w-28">操作</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => (
                <tr key={r.id} className="hover:bg-[#0d1220]">
                  <td className="td">
                    <input
                      type="checkbox"
                      checked={sel.has(r.id)}
                      onChange={(e) => {
                        const n = new Set(sel);
                        e.target.checked ? n.add(r.id) : n.delete(r.id);
                        setSel(n);
                      }}
                    />
                  </td>
                  <td className="td">
                    <div className="font-medium text-slate-200">{r.name}</div>
                    <div className="text-[11px] text-slate-600">{r.description}</div>
                  </td>
                  <td className="td">
                    <span className="badge mr-1" style={{ borderColor: r.section_color + "55", color: r.section_color }}>
                      {r.section_name}
                    </span>
                    <span className="text-xs text-slate-500">{r.category_name}</span>
                  </td>
                  <td className="td text-xs text-slate-500">{parseTags(r.tags).join(", ")}</td>
                  <td className="td">
                    {r.cover_image ? (
                      <img src={r.cover_image} className="h-8 w-14 rounded border border-[#1e2534] object-cover" />
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="td">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="td">
                    <div className="flex gap-1.5">
                      <StarBtn on={!!r.starred} onClick={() => star(r)} />
                      {r.url && (
                        <a className="btn !p-1.5" href={r.url} target="_blank" rel="noreferrer" title="打开原站">
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        className="btn !p-1.5"
                        onClick={() => {
                          setIsNew(false);
                          setEdit({ ...r, tags: parseTags(r.tags).join(", ") });
                        }}
                      >
                        <Pencil size={13} />
                      </button>
                      <button className="btn btn-danger !p-1.5" onClick={() => del(r.id)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pager page={page} pageSize={20} total={data.total} onChange={setPage} />

      <Modal open={!!edit} title={isNew ? "新增资源" : "编辑资源"} onClose={() => setEdit(null)} wide>
        {edit && (
          <div className="grid grid-cols-2 gap-x-4">
            <Field label="名称 *">
              <input className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            </Field>
            <Field label="原站 URL">
              <input className="input" value={edit.url} onChange={(e) => setEdit({ ...edit, url: e.target.value })} />
            </Field>
            <Field label="版块">
              <select
                className="select"
                value={edit.section_id}
                onChange={(e) => {
                  const sid = +e.target.value;
                  const first = allCats.find((c) => c.section_id === sid);
                  setEdit({ ...edit, section_id: sid, category_id: first?.id || 0 });
                }}
              >
                {sections.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>
            <Field label="二级分类">
              <select className="select" value={edit.category_id} onChange={(e) => setEdit({ ...edit, category_id: +e.target.value })}>
                {allCats.filter((c) => c.section_id === edit.section_id).map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="标签(逗号分隔)">
              <input className="input" value={edit.tags} onChange={(e) => setEdit({ ...edit, tags: e.target.value })} />
            </Field>
            <Field label="技术栈">
              <input className="input" placeholder="React / CSS / Tailwind…" value={edit.tech} onChange={(e) => setEdit({ ...edit, tech: e.target.value })} />
            </Field>
            <Field label="状态">
              <select className="select" value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value })}>
                <option value="pending">待整理</option>
                <option value="published">已发布</option>
              </select>
            </Field>
            <Field label="封面图(资产库或 URL)">
              <div className="flex gap-2">
                <select className="select" value={edit.cover_image} onChange={(e) => setEdit({ ...edit, cover_image: e.target.value })}>
                  <option value="">无封面</option>
                  {assets.map((a) => (
                    <option key={a.id} value={a.path}>{a.title}</option>
                  ))}
                </select>
              </div>
            </Field>
            <div className="col-span-2">
              <Field label="描述">
                <textarea className="textarea" rows={2} value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="备注">
                <textarea className="textarea" rows={2} value={edit.notes} onChange={(e) => setEdit({ ...edit, notes: e.target.value })} />
              </Field>
            </div>
            <label className="mb-3 flex items-center gap-2 text-xs text-slate-400">
              <input type="checkbox" checked={!!edit.starred} onChange={(e) => setEdit({ ...edit, starred: e.target.checked ? 1 : 0 })} />
              收藏
            </label>
            <button className="btn btn-primary justify-center" onClick={save}>
              保存
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

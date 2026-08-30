import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Clapperboard,
  Blocks,
  Orbit,
  Zap,
  Boxes,
  ExternalLink,
  Pencil,
  Trash2,
  Layers,
} from "lucide-react";
import { api } from "../api";
import { Section } from "../types";
import { Field, Modal } from "../components/ui";

export const iconMap: Record<string, any> = {
  sparkles: Sparkles,
  clapperboard: Clapperboard,
  blocks: Blocks,
  galaxy: Orbit,
  zap: Zap,
  box: Boxes,
};

const empty = { slug: "", name: "", url: "", icon: "box", color: "#22d3ee", description: "", sort: 0 };

export default function Sections() {
  const [rows, setRows] = useState<Section[]>([]);
  const [edit, setEdit] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();

  const load = () => api.get<Section[]>("/sections").then(setRows);
  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (isNew) await api.post("/sections", edit);
    else await api.put(`/sections/${edit.id}`, edit);
    setEdit(null);
    load();
  };
  const del = async (s: Section) => {
    if (!confirm(`删除版块「${s.name}」?`)) return;
    try {
      await api.del(`/sections/${s.id}`);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };
  const toggle = async (s: Section) => {
    await api.put(`/sections/${s.id}`, { ...s, enabled: s.enabled ? 0 : 1 });
    load();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-100">版块管理</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsNew(true);
            setEdit({ ...empty });
          }}
        >
          + 新增版块
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rows.map((s) => {
          const Icon = iconMap[s.icon] || Boxes;
          return (
            <div key={s.id} className={`card card-hover p-5 ${s.enabled ? "" : "opacity-50"}`}>
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: s.color + "22", color: s.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{s.name}</div>
                    <a
                      className="text-xs text-slate-500 hover:text-cyan-400"
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.url?.replace("https://", "")} <ExternalLink size={10} className="inline" />
                    </a>
                  </div>
                </div>
                <button
                  className={`badge cursor-pointer ${s.enabled ? "" : "grayscale"}`}
                  style={{ borderColor: "#22d3ee55", color: "#67e8f9" }}
                  onClick={() => toggle(s)}
                  title="点击启用/停用"
                >
                  {s.enabled ? "启用中" : "已停用"}
                </button>
              </div>
              <p className="mb-4 h-9 text-xs leading-5 text-slate-500">{s.description}</p>
              <div className="mb-4 flex gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Layers size={12} /> {s.category_count} 分类
                </span>
                <span className="flex items-center gap-1">
                  <Boxes size={12} /> {s.item_count} 资源
                </span>
              </div>
              <div className="flex gap-2">
                <button className="btn flex-1 justify-center" onClick={() => navigate(`/admin/sections/${s.id}`)}>
                  管理分类
                </button>
                <button
                  className="btn !px-2.5"
                  onClick={() => {
                    setIsNew(false);
                    setEdit({ ...s });
                  }}
                >
                  <Pencil size={14} />
                </button>
                <button className="btn btn-danger !px-2.5" onClick={() => del(s)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={!!edit} title={isNew ? "新增版块" : "编辑版块"} onClose={() => setEdit(null)}>
        {edit && (
          <>
            <Field label="Slug(唯一标识)">
              <input
                className="input"
                value={edit.slug}
                disabled={!isNew}
                onChange={(e) => setEdit({ ...edit, slug: e.target.value })}
              />
            </Field>
            <Field label="名称">
              <input className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            </Field>
            <Field label="官网 URL">
              <input className="input" value={edit.url} onChange={(e) => setEdit({ ...edit, url: e.target.value })} />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="图标 key">
                <select className="select" value={edit.icon} onChange={(e) => setEdit({ ...edit, icon: e.target.value })}>
                  {Object.keys(iconMap).map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </Field>
              <Field label="主题色">
                <input
                  className="input"
                  value={edit.color}
                  onChange={(e) => setEdit({ ...edit, color: e.target.value })}
                />
              </Field>
              <Field label="排序">
                <input
                  className="input"
                  type="number"
                  value={edit.sort}
                  onChange={(e) => setEdit({ ...edit, sort: +e.target.value })}
                />
              </Field>
            </div>
            <Field label="描述">
              <textarea
                className="textarea"
                rows={2}
                value={edit.description}
                onChange={(e) => setEdit({ ...edit, description: e.target.value })}
              />
            </Field>
            <button className="btn btn-primary w-full justify-center" onClick={save}>
              保存
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

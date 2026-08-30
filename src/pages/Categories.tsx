import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Plus, Trash2, Database } from "lucide-react";
import { api } from "../api";
import { Category, Section } from "../types";
import { Empty, Field, Modal } from "../components/ui";

export default function Categories() {
  const { id } = useParams();
  const [section, setSection] = useState<Section | null>(null);
  const [rows, setRows] = useState<Category[]>([]);
  const [edit, setEdit] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = () => {
    api.get<Section[]>("/sections").then((ss) => setSection(ss.find((s) => s.id === +id!) || null));
    api.get<Category[]>(`/categories?section_id=${id}`).then(setRows);
  };
  useEffect(load, [id]);

  const save = async () => {
    if (isNew) await api.post("/categories", { ...edit, section_id: +id! });
    else await api.put(`/categories/${edit.id}`, edit);
    setEdit(null);
    load();
  };
  const del = async (c: Category) => {
    if (!confirm(`删除分类「${c.name}」?`)) return;
    try {
      await api.del(`/categories/${c.id}`);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/sections" className="btn !p-2">
            <ArrowLeft size={15} />
          </Link>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              {section?.name || "…"} <span className="text-sm font-normal text-slate-500">二级分类</span>
            </h2>
            <p className="text-xs text-slate-500">{section?.description}</p>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsNew(true);
            setEdit({ slug: "", name: "", description: "", sort: rows.length + 1 });
          }}
        >
          <Plus size={14} /> 新增分类
        </button>
      </div>

      {rows.length === 0 ? (
        <Empty text="暂无分类,点击右上角新增" />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="th w-16">排序</th>
                <th className="th">分类名称</th>
                <th className="th">说明</th>
                <th className="th w-24">资源数</th>
                <th className="th w-24">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="hover:bg-[#0d1220]">
                  <td className="td text-slate-500">{c.sort}</td>
                  <td className="td font-medium text-slate-200">{c.name}</td>
                  <td className="td text-slate-500">{c.description}</td>
                  <td className="td">
                    <span className="badge" style={{ borderColor: section?.color + "55", color: section?.color }}>
                      <Database size={10} /> {c.item_count}
                    </span>
                  </td>
                  <td className="td">
                    <div className="flex gap-1.5">
                      <button
                        className="btn !p-1.5"
                        onClick={() => {
                          setIsNew(false);
                          setEdit({ ...c });
                        }}
                      >
                        <Pencil size={13} />
                      </button>
                      <button className="btn btn-danger !p-1.5" onClick={() => del(c)}>
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

      <Modal open={!!edit} title={isNew ? "新增分类" : "编辑分类"} onClose={() => setEdit(null)}>
        {edit && (
          <>
            <Field label="Slug">
              <input className="input" value={edit.slug} disabled={!isNew} onChange={(e) => setEdit({ ...edit, slug: e.target.value })} />
            </Field>
            <Field label="名称">
              <input className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            </Field>
            <Field label="说明">
              <textarea className="textarea" rows={2} value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
            </Field>
            <Field label="排序">
              <input className="input" type="number" value={edit.sort} onChange={(e) => setEdit({ ...edit, sort: +e.target.value })} />
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

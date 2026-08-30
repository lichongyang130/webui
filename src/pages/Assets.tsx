import { useEffect, useState } from "react";
import { Link2, Pencil, ScanLine, Trash2 } from "lucide-react";
import { api } from "../api";
import { Asset, Item } from "../types";
import { Empty, Field, Modal } from "../components/ui";

export default function Assets() {
  const [rows, setRows] = useState<Asset[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [edit, setEdit] = useState<Asset | null>(null);

  const load = () => api.get<Asset[]>("/assets").then(setRows);
  useEffect(() => {
    load();
    api.get("/items?page_size=100").then((r) => setItems(r.rows));
  }, []);

  const scan = async () => {
    const r = await api.post("/assets/scan");
    alert(`扫描完成,新增 ${r.added} 个资产`);
    load();
  };
  const save = async () => {
    await api.put(`/assets/${edit!.id}`, edit);
    setEdit(null);
    load();
  };
  const del = async (a: Asset) => {
    if (!confirm(`移除资产「${a.title}」(不删除磁盘文件)?`)) return;
    await api.del(`/assets/${a.id}`);
    load();
  };

  const screens = [...new Set(rows.map((r) => r.screen || "未分组"))];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100">设计资产库</h2>
          <p className="text-xs text-slate-500">design/ 目录下的界面设计图,可关联到资源条目作为封面</p>
        </div>
        <button className="btn" onClick={scan}>
          <ScanLine size={14} /> 扫描 design/ 目录
        </button>
      </div>

      {rows.length === 0 && <Empty text="暂无资产,点击右上扫描" />}

      {screens.map((sc) => (
        <div key={sc} className="mb-6">
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "#67e8f9" }}>
            {sc} <span className="text-xs text-slate-600">({rows.filter((r) => (r.screen || "未分组") === sc).length})</span>
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {rows
              .filter((r) => (r.screen || "未分组") === sc)
              .map((a) => (
                <div key={a.id} className="card card-hover overflow-hidden">
                  <img src={a.path} alt={a.title} className="aspect-video w-full object-cover" />
                  <div className="p-3">
                    <div className="mb-1 truncate text-xs font-medium text-slate-200">{a.title}</div>
                    <div className="mb-2 flex items-center gap-1 text-[11px] text-slate-500">
                      <Link2 size={10} />
                      {a.linked_item_name || "未关联资源"}
                    </div>
                    <div className="flex gap-1.5">
                      <button className="btn flex-1 justify-center !py-1" onClick={() => setEdit({ ...a })}>
                        <Pencil size={12} /> 编辑
                      </button>
                      <button className="btn btn-danger !p-1.5" onClick={() => del(a)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <Modal open={!!edit} title="编辑资产" onClose={() => setEdit(null)}>
        {edit && (
          <>
            <Field label="标题">
              <input className="input" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
            </Field>
            <Field label="所属界面分组">
              <input className="input" value={edit.screen || ""} onChange={(e) => setEdit({ ...edit, screen: e.target.value })} />
            </Field>
            <Field label="生成 Prompt(#28)">
              <textarea className="textarea" rows={3} value={(edit as any).prompt || ""} onChange={(e) => setEdit({ ...edit, prompt: e.target.value } as any)} />
            </Field>
            <Field label="关联资源条目">
              <select
                className="select"
                value={edit.linked_item_id || ""}
                onChange={(e) => setEdit({ ...edit, linked_item_id: e.target.value ? +e.target.value : null })}
              >
                <option value="">不关联</option>
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.section_name} · {i.name}
                  </option>
                ))}
              </select>
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

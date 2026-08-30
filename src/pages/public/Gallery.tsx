import { useEffect, useState } from "react";
import { Link2, X } from "lucide-react";
import { api } from "../../api";
import { Asset } from "../../types";

export default function Gallery() {
  const [rows, setRows] = useState<Asset[]>([]);
  const [view, setView] = useState<Asset | null>(null);
  useEffect(() => {
    api.get<Asset[]>("/public/assets").then(setRows);
  }, []);

  const screens = [...new Set(rows.map((r) => r.screen || "未分组"))];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white">设计画廊</h1>
      <p className="mb-8 mt-1 text-xs text-slate-500">
        Aceternity 风格深色霓虹界面设计图 · {rows.length} 张 · 点击放大查看
      </p>

      {screens.map((sc) => (
        <div key={sc} className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: "#67e8f9" }}>
            <span className="h-3 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" />
            {sc}
            <span className="text-xs text-slate-600">
              {rows.filter((r) => (r.screen || "未分组") === sc).length} 张
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {rows
              .filter((r) => (r.screen || "未分组") === sc)
              .map((a) => (
                <button
                  key={a.id}
                  className="card card-hover group overflow-hidden text-left"
                  onClick={() => setView(a)}
                >
                  <img
                    src={a.path}
                    alt={a.title}
                    className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="px-3 py-2 text-[11px] text-slate-400">{a.title}</div>
                </button>
              ))}
          </div>
        </div>
      ))}

      {view && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setView(null)}
        >
          <div className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span>
                {view.screen} · {view.title}
                {view.linked_item_name && (
                  <span className="ml-2 text-cyan-400">
                    <Link2 size={10} className="inline" /> {view.linked_item_name}
                  </span>
                )}
              </span>
              <button className="btn !p-1.5" onClick={() => setView(null)}>
                <X size={14} />
              </button>
            </div>
            <img src={view.path} alt={view.title} className="max-h-[80vh] w-full rounded-xl border border-[#1e2534] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

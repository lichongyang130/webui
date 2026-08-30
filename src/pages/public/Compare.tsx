import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GitCompare, ExternalLink } from "lucide-react";
import { api } from "../../api";

const relLabel: Record<string, string> = {
  duplicate: "同效果重复收录",
  alternative: "轻量替代",
  api: "手写 API 对照",
  prompt: "同风格 Prompt",
};

export default function Compare() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    api.get("/public/related").then(setRows);
  }, []);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
        <GitCompare size={22} className="text-emerald-400" /> 跨库对照
      </h1>
      <p className="mb-8 mt-1 text-xs text-slate-500">同一效果在不同库的收录对照,避免重复劳动(#47/#81-84/#90)</p>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="card flex items-center gap-4 p-4">
            <Link to={`/i/${r.item_id}`} className="flex w-1/3 items-center gap-3">
              {r.cover_image ? (
                <img src={r.cover_image} className="h-10 w-16 rounded border border-[#1e2534] object-cover" />
              ) : (
                <div className="grid-bg h-10 w-16 rounded border border-[#1e2534]" />
              )}
              <span className="text-sm text-slate-200">{r.item_name}</span>
            </Link>
            <span className="badge shrink-0" style={{ borderColor: "#22d3ee44", color: "#67e8f9" }}>
              {relLabel[r.relation] || r.relation}
            </span>
            <a className="flex flex-1 items-center gap-1 text-sm text-violet-300 hover:underline" href={r.rel_url} target="_blank" rel="noreferrer">
              {r.rel_section_slug} · {r.rel_name} <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

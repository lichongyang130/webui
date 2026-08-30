import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GitCompare, ExternalLink } from "lucide-react";
import { api } from "../../api";
import { demoByName } from "../../demos";

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
        {rows.map((r) => {
          const dL = demoByName(r.item_name);
          const dR = demoByName(r.rel_name);
          return (
            <div key={r.id} className="card grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 p-3">
              <Link to={`/i/${r.item_id}`} className="flex items-center gap-3">
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded border border-[#1e2534]">
                  {dL ? <dL.comp /> : r.cover_image ? <img src={r.cover_image} className="h-full w-full object-cover" /> : <div className="grid-bg h-full w-full" />}
                </div>
                <span className="text-sm text-slate-200">
                  {r.item_name}
                  {dL && <i className="pulse-dot ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />}
                </span>
              </Link>
              <span className="badge my-auto shrink-0" style={{ borderColor: "#22d3ee44", color: "#67e8f9" }}>
                {relLabel[r.relation] || r.relation}
              </span>
              <div className="flex items-center justify-end gap-3">
                <a className="flex items-center gap-1 text-sm text-violet-300 hover:underline" href={r.rel_url} target="_blank" rel="noreferrer">
                  {r.rel_section_slug} · {r.rel_name} <ExternalLink size={12} />
                </a>
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded border border-[#1e2534]">
                  {dR ? <dR.comp /> : <div className="grid-bg h-full w-full" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

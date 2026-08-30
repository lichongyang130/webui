import { useEffect, useState } from "react";
import { Wand2, Copy } from "lucide-react";
import { api } from "../../api";
import { Item } from "../../types";

const steps = [
  ["backgrounds", "① 背景"],
  ["text", "② 文字特效"],
  ["cards", "③ 卡片"],
  ["interaction", "④ 交互/导航"],
  ["blocks", "⑤ 区块"],
] as const;

export default function Wizard() {
  const [byCat, setByCat] = useState<Record<string, Item[]>>({});
  const [pick, setPick] = useState<Record<string, number>>({});
  const [assets, setAssets] = useState<any[]>([]);
  useEffect(() => {
    for (const [slug] of steps)
      api.get(`/public/items?section_slug=aceternity&category_slug=${slug}&page_size=100`).then((r) =>
        setByCat((p) => ({ ...p, [slug]: r.rows }))
      );
    api.get("/public/assets").then(setAssets);
  }, []);

  const chosen = steps.map(([slug]) => byCat[slug]?.find((i) => i.id === pick[slug])).filter(Boolean) as Item[];
  const covers = assets.filter((a) => chosen.some((c) => a.linked_item_name === c.name));
  const totalDiff = chosen.reduce((s, c) => s + (c as any).difficulty, 0);

  const copyPack = () => {
    const pack = chosen.map((c) => ({ name: c.name, url: c.url, tags: JSON.parse(c.tags || "[]") }));
    navigator.clipboard.writeText(JSON.stringify(pack, null, 2));
    alert("组合包 JSON 已复制");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
        <Wand2 size={22} className="text-violet-400" /> 拼一个官网
      </h1>
      <p className="mb-8 mt-1 text-xs text-slate-500">每层选一个组件,生成组合清单 + 配套设计图,一键导出 JSON(#86/#91)</p>

      <div className="grid grid-cols-5 gap-4">
        {steps.map(([slug, label]) => (
          <div key={slug} className="card p-3">
            <div className="mb-2 text-xs font-semibold text-slate-300">{label}</div>
            <select className="select" value={pick[slug] || ""} onChange={(e) => setPick({ ...pick, [slug]: +e.target.value })}>
              <option value="">不选</option>
              {(byCat[slug] || []).map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {chosen.length > 0 && (
        <div className="card mt-6 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">
              你的组合({chosen.length} 层 · 总难度 {totalDiff}/25)
            </h2>
            <button className="btn btn-primary" onClick={copyPack}>
              <Copy size={14} /> 导出组合包 JSON
            </button>
          </div>
          <ol className="space-y-2 text-sm">
            {chosen.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-lg bg-[#0d1220] px-3 py-2">
                <span className="text-slate-200">{c.name} <span className="text-xs text-slate-500">{(c as any).alias}</span></span>
                <a className="text-xs text-cyan-400" href={c.url} target="_blank" rel="noreferrer">原站 ↗</a>
              </li>
            ))}
          </ol>
          {covers.length > 0 && (
            <>
              <div className="mb-2 mt-4 text-xs text-slate-500">配套设计图</div>
              <div className="grid grid-cols-4 gap-3">
                {covers.map((a) => (
                  <img key={a.id} src={a.path} className="aspect-video w-full rounded-lg border border-[#1e2534] object-cover" />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

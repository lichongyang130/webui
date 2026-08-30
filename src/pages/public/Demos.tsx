import { useState } from "react";
import { Play } from "lucide-react";
import { allDemos, groupLabel } from "../../demos";

export default function Demos() {
  const [group, setGroup] = useState<string>("all");
  const [full, setFull] = useState<string | null>(null);
  const list = allDemos.filter((d) => group === "all" || d.group === group);
  const fullDemo = allDemos.find((d) => d.slug === full);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
        <Play size={20} className="text-cyan-400" /> 在线演示墙
      </h1>
      <p className="mb-6 mt-1 text-xs text-slate-500">
        {allDemos.length} 个组件的<b className="text-cyan-300">真实运行演示</b> —— 全部本站原生实现,可交互,非截图
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {[["all", `全部 ${allDemos.length}`], ...Object.entries(groupLabel).map(([k, v]) => [k, `${v} ${allDemos.filter((d) => d.group === k).length}`] as [string, string])].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setGroup(k)}
            className={`rounded-full border px-3 py-1 text-[11px] transition ${group === k ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300" : "border-[#1e2534] text-slate-500 hover:text-slate-300"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <div key={d.slug} className="card group overflow-hidden">
            <div className="relative h-44 cursor-pointer" onClick={() => setFull(d.slug)}>
              <d.comp />
              <div className="absolute inset-0 grid place-items-center bg-black/50 opacity-0 backdrop-blur-[2px] transition group-hover:opacity-100">
                <span className="rounded-full border border-cyan-400/50 bg-[#05060acc] px-4 py-1.5 text-[11px] text-cyan-300">全屏查看</span>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-xs font-medium text-slate-200">{d.name}</span>
              <span className="badge" style={{ borderColor: "#22d3ee33", color: "#67e8f9" }}>{groupLabel[d.group]}</span>
            </div>
          </div>
        ))}
      </div>
      {fullDemo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6 backdrop-blur" onClick={() => setFull(null)}>
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{fullDemo.name}</span>
              <button className="text-xs text-slate-400 hover:text-white" onClick={() => setFull(null)}>✕ 关闭</button>
            </div>
            <div className="relative h-[60vh] overflow-hidden rounded-xl border border-[#1e2534]">
              <fullDemo.comp />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

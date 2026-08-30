import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Boxes, Database, Image as ImageIcon, Layers, Star } from "lucide-react";
import { api } from "../api";
import { Stats, parseTags } from "../types";
import { StatusBadge } from "../components/ui";

export default function Dashboard() {
  const [s, setS] = useState<Stats | null>(null);
  useEffect(() => {
    api.get<Stats>("/stats").then(setS).catch(() => {});
  }, []);
  if (!s) return <div className="text-slate-500">加载中…</div>;

  const max = Math.max(1, ...s.perSection.map((p) => p.c));
  const cards = [
    { icon: Boxes, label: "启用版块", value: s.sections, color: "#22d3ee" },
    { icon: Layers, label: "二级分类", value: s.categories, color: "#8b5cf6" },
    { icon: Database, label: "资源条目", value: s.items, color: "#34d399" },
    { icon: Star, label: "已收藏", value: s.starred_count, color: "#f59e0b" },
    { icon: ImageIcon, label: "设计资产", value: s.assets, color: "#f472b6" },
  ];

  return (
    <div>
      <h2 className="mb-5 text-lg font-bold text-slate-100">仪表盘</h2>
      <div className="mb-6 grid grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card card-hover p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{c.label}</span>
              <c.icon size={16} style={{ color: c.color }} />
            </div>
            <div className="mt-2 text-2xl font-bold" style={{ color: c.color }}>
              {c.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-200">版块资源分布</h3>
          <div className="space-y-3">
            {s.perSection.map((p) => (
              <div key={p.id}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-400">{p.name}</span>
                  <span style={{ color: p.color }}>{p.c}</span>
                </div>
                <div className="h-2 rounded-full bg-[#141a28]">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(p.c / max) * 100}%`,
                      background: `linear-gradient(90deg, ${p.color}88, ${p.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-200">收藏速览</h3>
          <div className="flex flex-wrap gap-2">
            {s.starred.map((r) => (
              <span
                key={r.id}
                className="badge"
                style={{ borderColor: r.section_color + "66", color: r.section_color }}
              >
                <Star size={10} className="fill-current" /> {r.name}
              </span>
            ))}
            {s.starred.length === 0 && (
              <span className="text-xs text-slate-500">暂无收藏</span>
            )}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">最新资源</h3>
          <Link className="text-xs text-cyan-400 hover:underline" to="/resources">
            查看全部 →
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="th">名称</th>
              <th className="th">版块</th>
              <th className="th">分类</th>
              <th className="th">标签</th>
              <th className="th">状态</th>
            </tr>
          </thead>
          <tbody>
            {s.recent.map((r) => (
              <tr key={r.id} className="hover:bg-[#0d1220]">
                <td className="td font-medium text-slate-200">{r.name}</td>
                <td className="td">
                  <span className="badge" style={{ borderColor: r.section_color + "66", color: r.section_color }}>
                    {r.section_name}
                  </span>
                </td>
                <td className="td text-slate-400">{r.category_name}</td>
                <td className="td text-xs text-slate-500">{parseTags(r.tags).slice(0, 3).join(" / ")}</td>
                <td className="td">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

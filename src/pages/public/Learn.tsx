import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { api } from "../../api";
import { Modal } from "../../components/ui";

const tabs = [
  ["path", "学习路径"],
  ["principle", "原理短文"],
  ["term", "术语表"],
  ["weekly", "组件解剖"],
  ["faq", "FAQ"],
] as const;

export default function Learn() {
  const [cat, setCat] = useState<string>("path");
  const [rows, setRows] = useState<any[]>([]);
  const [view, setView] = useState<any>(null);

  useEffect(() => {
    api.get(`/public/articles?category=${cat}`).then(setRows);
  }, [cat]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
        <BookOpen size={22} className="text-cyan-400" /> 学习中心
      </h1>
      <p className="mb-6 mt-1 text-xs text-slate-500">路径 → 原理 → 术语 → 每周解剖 → FAQ,从 CSS 到 WebGL</p>

      <div className="mb-6 flex gap-2">
        {tabs.map(([k, label]) => (
          <button
            key={k}
            className={`btn ${cat === k ? "!border-cyan-500/50 !text-cyan-300" : ""}`}
            onClick={() => setCat(k)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {rows.map((a) => (
          <button key={a.id} className="card card-hover p-5 text-left" onClick={() => setView(a)}>
            <div className="mb-2 flex items-center gap-2">
              {a.level && (
                <span
                  className="badge"
                  style={{
                    borderColor: a.level === "low" ? "#34d39955" : a.level === "mid" ? "#f59e0b55" : "#f8717155",
                    color: a.level === "low" ? "#6ee7b7" : a.level === "mid" ? "#fcd34d" : "#fca5a5",
                  }}
                >
                  {a.level === "low" ? "入门" : a.level === "mid" ? "进阶" : "高级"}
                </span>
              )}
            </div>
            <div className="font-semibold text-slate-100">{a.title}</div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{a.body}</p>
          </button>
        ))}
      </div>

      <Modal open={!!view} title={view?.title || ""} onClose={() => setView(null)} wide>
        {view && (
          <>
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">{view.body}</p>
            {JSON.parse(view.linked_items || "[]").length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {JSON.parse(view.linked_items).map((n: string) => (
                  <span key={n} className="badge" style={{ borderColor: "#22d3ee44", color: "#67e8f9" }}>{n}</span>
                ))}
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

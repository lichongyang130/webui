import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle, Accessibility, Cpu, Download, ExternalLink, GraduationCap,
  Link2, MessageSquare, Share2, Smartphone, Star, Video, Wrench,
} from "lucide-react";
import { api } from "../../api";
import { parseTags } from "../../types";
import { getDemo } from "../../demos";

const perfColor: Record<string, string> = { low: "#34d399", med: "#f59e0b", high: "#f87171" };

export default function ItemDetail() {
  const { id } = useParams();
  const [it, setIt] = useState<any>(null);
  const [together, setTogether] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [myScore, setMyScore] = useState(0);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    api.get(`/public/items/${id}`).then(setIt).catch(() => setIt(null));
    api.get(`/public/together/${id}`).then(setTogether);
    api.get("/public/collections").then(setCollections);
    // 点击埋点(#89)
    let sid = sessionStorage.getItem("mui_sid");
    if (!sid) sessionStorage.setItem("mui_sid", (sid = Math.random().toString(36).slice(2)));
    api.post("/public/clicks", { item_id: +id!, session: sid }).catch(() => {});
  }, [id]);

  if (it === null) return <div className="p-10 text-slate-500">加载中…</div>;
  if (!it) return <div className="p-10 text-slate-500">条目不存在</div>;

  const rate = (score: number) => {
    setMyScore(score);
    api.post("/public/ratings", { item_id: it.id, score });
  };
  const addComment = async () => {
    if (!comment.trim()) return;
    await api.post("/public/comments", { item_id: it.id, body: comment });
    setComment("");
    setIt(await api.get(`/public/items/${it.id}`));
  };
  const addToCollection = async (cid: number) => {
    await api.post(`/public/collections/${cid}/items`, { item_id: it.id });
    alert("已加入合集");
  };
  // #75 分享卡片生成
  const shareCard = () => {
    const c = document.createElement("canvas");
    c.width = 1200; c.height = 630;
    const x = c.getContext("2d")!;
    x.fillStyle = "#05060a"; x.fillRect(0, 0, 1200, 630);
    const g = x.createLinearGradient(0, 0, 1200, 0);
    g.addColorStop(0, it.section_color || "#22d3ee"); g.addColorStop(1, "#8b5cf6");
    x.fillStyle = g; x.fillRect(0, 0, 1200, 8);
    x.fillStyle = it.section_color || "#22d3ee";
    x.font = "bold 28px Inter, sans-serif";
    x.fillText(it.section_name, 60, 110);
    x.fillStyle = "#ffffff"; x.font = "bold 64px Inter, sans-serif";
    x.fillText(it.name, 60, 210);
    x.fillStyle = "#94a3b8"; x.font = "28px Inter, sans-serif";
    x.fillText(it.alias || "", 60, 265);
    x.fillText(it.description?.slice(0, 40) || "", 60, 330);
    x.fillStyle = "#64748b"; x.font = "24px Inter, sans-serif";
    x.fillText(parseTags(it.tags).map((t: string) => "#" + t).join("  "), 60, 560);
    x.fillText("Motion UI 资源库", 950, 560);
    const a = document.createElement("a");
    a.download = `${it.name}-share.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  };

  const demoSlug = (it.url || "").match(/components\/([\w-]+)/)?.[1];
  const liveDemo = getDemo(demoSlug);

  const relGroups: Record<string, string> = {
    duplicate: "跨库重复收录",
    alternative: "轻量替代",
    api: "手写用这个 API",
    prompt: "同风格 AI Prompt",
    demo: "Demo",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link to={`/s/${it.section_slug}`} className="badge" style={{ borderColor: it.section_color + "66", color: it.section_color }}>
          {it.section_name}
        </Link>
        <h1 className="text-2xl font-bold text-white">{it.name}</h1>
        <span className="text-sm text-slate-500">{it.alias}</span>
        <div className="ml-auto flex gap-2">
          <select className="select !w-36" defaultValue="" onChange={(e) => e.target.value && addToCollection(+e.target.value)}>
            <option value="">加入合集…</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button className="btn" onClick={shareCard}>
            <Share2 size={14} /> 分享卡片
          </button>
          {/components\/([\w-]+)/.test(it.url || "") && (
            <button className="btn" onClick={() => setDemo(true)}>
              <Video size={14} /> Demo
            </button>
          )}
          <button
            className="btn"
            title="复制安装命令"
            onClick={() => {
              navigator.clipboard.writeText(`npx shadcn@latest add ${it.url}`);
              alert("安装命令已复制");
            }}
          >
            <Wrench size={14} /> 复制安装命令
          </button>
          <a className="btn btn-primary" href={it.url} target="_blank" rel="noreferrer">
            原站 <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* left: meta */}
        <div className="col-span-2 space-y-4">
          {liveDemo ? (
            <div className="card overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-[#141a28] px-4 py-2">
                <span className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  LIVE 演示 · 本站原生实现,可直接交互
                </span>
                <button className="text-[11px] text-slate-400 hover:text-cyan-300" onClick={() => setDemo(true)}>
                  全屏查看 ⤢
                </button>
              </div>
              <div className="relative h-72">
                <liveDemo.comp />
              </div>
            </div>
          ) : (
            it.cover_image && <img src={it.cover_image} className="card aspect-video w-full object-cover" alt={it.name} />
          )}
          <div className="card p-5">
            <p className="text-sm leading-6 text-slate-300">{it.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {parseTags(it.tags).map((t: string) => (
                <span key={t} className="badge" style={{ borderColor: "#1e2534", color: "#94a3b8" }}>#{t}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="card p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400"><Wrench size={13} /> 依赖</div>
              <div className="flex flex-wrap gap-1">
                {(JSON.parse(it.deps || "[]") as string[]).map((d) => (
                  <span key={d} className="badge" style={{ borderColor: "#8b5cf655", color: "#c4b5fd" }}>{d}</span>
                ))}
              </div>
            </div>
            <div className="card p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400"><Cpu size={13} /> 性能成本 / 难度 / 适配</div>
              <div className="flex items-center gap-3">
                <span className="badge" style={{ borderColor: perfColor[it.perf_cost] + "66", color: perfColor[it.perf_cost] }}>
                  {it.perf_cost === "low" ? "低" : it.perf_cost === "med" ? "中" : "高"}
                </span>
                <span className="text-amber-400">{"★".repeat(it.difficulty)}{"☆".repeat(5 - it.difficulty)}</span>
                <Smartphone size={13} className={it.mobile_friendly ? "text-emerald-400" : "text-red-400"} />
                {it.access_level !== "free" && (
                  <span className="badge" style={{ borderColor: "#f59e0b66", color: "#fcd34d" }}>{it.access_level}</span>
                )}
              </div>
            </div>
            {it.principle_note && (
              <div className="card col-span-2 p-4">
                <div className="mb-1 flex items-center gap-2 text-slate-400"><GraduationCap size={13} /> 原理 · {it.principle}</div>
                <p className="leading-5 text-slate-400">{it.principle_note}</p>
              </div>
            )}
            {it.inspiration && (
              <div className="card p-4"><div className="text-slate-400">灵感来源</div><div className="mt-1 font-medium text-cyan-300">{it.inspiration}</div></div>
            )}
            {it.migrated_to && (
              <div className="card p-4"><div className="text-slate-400">迁移建议</div><div className="mt-1 text-amber-300">已被 {it.migrated_to} 替代</div></div>
            )}
          </div>

          {(it.snippet || it.props || it.pitfalls || it.perf_note || it.a11y_note || it.faq || it.exercise || it.video_url) && (
            <div className="card space-y-3 p-5 text-xs leading-5">
              {it.snippet && <pre className="overflow-x-auto rounded-lg bg-[#0d1220] p-3 text-[11px] text-cyan-200">{it.snippet}</pre>}
              {it.props && <div><span className="text-slate-400">Props 速查:</span> <span className="text-slate-300">{it.props}</span></div>}
              {it.pitfalls && <div className="flex gap-2 text-amber-300"><AlertTriangle size={13} className="mt-0.5 shrink-0" /> {it.pitfalls}</div>}
              {it.perf_note && <div className="text-slate-400">性能:{it.perf_note}</div>}
              {it.a11y_note && <div className="flex gap-2 text-slate-400"><Accessibility size={13} className="mt-0.5 shrink-0" /> {it.a11y_note}</div>}
              {it.faq && <div className="text-slate-300">FAQ:{it.faq}</div>}
              {it.exercise && <div className="text-violet-300">练习:{it.exercise}</div>}
              {it.video_url && <a className="flex items-center gap-1 text-cyan-400" href={it.video_url} target="_blank" rel="noreferrer"><Video size={13} /> 视频教程</a>}
            </div>
          )}

          {/* comments #74 */}
          <div className="card p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <MessageSquare size={14} /> 笔记 / 评论 ({it.comments?.length || 0})
            </div>
            <div className="mb-3 flex gap-2">
              <input className="input" placeholder="写点笔记…" value={comment} onChange={(e) => setComment(e.target.value)} />
              <button className="btn btn-primary" onClick={addComment}>发送</button>
            </div>
            <div className="space-y-2 text-xs">
              {it.comments?.map((c: any) => (
                <div key={c.id} className="rounded-lg bg-[#0d1220] p-2.5">
                  <span className="text-cyan-300">{c.author}</span>
                  <span className="ml-2 text-slate-500">{c.created_at}</span>
                  <p className="mt-1 text-slate-300">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right: rating / related / together / submissions */}
        <div className="space-y-4">
          <div className="card p-4">
            <div className="mb-2 text-sm font-semibold text-slate-200">评分</div>
            <div className="mb-2 flex items-center gap-2">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="text-lg font-bold text-white">{it.rating?.avg || "-"}</span>
              <span className="text-xs text-slate-500">({it.rating?.count || 0} 人)</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => rate(s)} className={s <= myScore ? "text-amber-400" : "text-slate-600 hover:text-amber-300"}>
                  <Star size={18} className={s <= myScore ? "fill-amber-400" : ""} />
                </button>
              ))}
            </div>
          </div>

          {it.related?.length > 0 && (
            <div className="card p-4">
              <div className="mb-2 text-sm font-semibold text-slate-200">跨版块关联</div>
              <div className="space-y-2 text-xs">
                {it.related.map((r: any) => (
                  <a key={r.id} href={r.rel_url} target="_blank" rel="noreferrer" className="block rounded-lg bg-[#0d1220] p-2.5 hover:bg-[#121828]">
                    <div className="text-slate-500">{relGroups[r.relation] || r.relation}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-cyan-300">{r.rel_name} <ExternalLink size={10} /></div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {together.length > 0 && (
            <div className="card p-4">
              <div className="mb-2 text-sm font-semibold text-slate-200">经常一起看</div>
              <div className="space-y-1.5 text-xs">
                {together.map((t) => (
                  <Link key={t.id} to={`/i/${t.id}`} className="flex items-center gap-2 text-slate-300 hover:text-cyan-300">
                    <Link2 size={11} style={{ color: t.section_color }} /> {t.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="card p-4">
            <div className="mb-2 text-sm font-semibold text-slate-200">用户投稿变体</div>
            {it.submissions?.length ? (
              <div className="space-y-2 text-xs">
                {it.submissions.map((s: any) => (
                  <div key={s.id} className="rounded-lg bg-[#0d1220] p-2.5">
                    <div className="text-slate-200">{s.title}</div>
                    <a className="text-cyan-400" href={s.code_url} target="_blank" rel="noreferrer">代码链接</a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-600">暂无投稿</p>
            )}
            <SubmitForm itemId={it.id} />
          </div>
        </div>
      </div>

      {/* #41 live demo:优先本站原生演示,无实现时回退官方 iframe */}
      {demo && demoSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onClick={() => setDemo(false)}>
          <div className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#1e2534]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#141a28] bg-[#07090f] px-4 py-2">
              <span className="text-xs font-semibold text-cyan-300">{liveDemo ? `${it.name} · 原生实时演示` : `${it.name} · 官方演示`}</span>
              <button className="text-xs text-slate-400 hover:text-white" onClick={() => setDemo(false)}>✕ 关闭</button>
            </div>
            <div className="relative flex-1">
              {liveDemo ? <liveDemo.comp /> : <iframe title="demo" src={`https://ui.aceternity.com/live-preview/${demoSlug}`} className="h-full w-full bg-white" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SubmitForm({ itemId }: { itemId: number }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const submit = async () => {
    if (!title) return;
    await api.post("/public/submissions", { item_id: itemId, title, code_url: url });
    alert("已提交,待审核");
    setTitle(""); setUrl("");
  };
  return (
    <div className="mt-3 space-y-2">
      <input className="input" placeholder="变体标题" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="input" placeholder="代码链接 (GitHub/CodePen)" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button className="btn w-full justify-center" onClick={submit}>提交变体</button>
    </div>
  );
}

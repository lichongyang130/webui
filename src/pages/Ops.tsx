import { useEffect, useState } from "react";
import { Download, Link2, Merge, ScanLine, Upload, UserPlus } from "lucide-react";
import { api, getToken } from "../api";

const tabs = [
  ["submissions", "投稿审核"],
  ["users", "管理员"],
  ["ops", "操作日志"],
  ["tags", "标签治理"],
  ["brand", "白标/设置"],
  ["data", "数据/链接"],
] as const;

export default function Ops() {
  const [tab, setTab] = useState<string>("submissions");
  return (
    <div>
      <h2 className="mb-5 text-lg font-bold text-slate-100">运营中心</h2>
      <div className="mb-5 flex gap-2">
        {tabs.map(([k, label]) => (
          <button key={k} className={`btn ${tab === k ? "!border-cyan-500/50 !text-cyan-300" : ""}`} onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>
      {tab === "submissions" && <Submissions />}
      {tab === "users" && <Users />}
      {tab === "ops" && <OpsLog />}
      {tab === "tags" && <Tags />}
      {tab === "brand" && <Brand />}
      {tab === "data" && <Data />}
    </div>
  );
}

function Submissions() {
  const [rows, setRows] = useState<any[]>([]);
  const load = () => api.get("/submissions").then(setRows);
  useEffect(() => { load(); }, []);
  return (
    <div className="card overflow-hidden">
      <table className="w-full">
        <thead><tr><th className="th">标题</th><th className="th">作者</th><th className="th">代码</th><th className="th">状态</th><th className="th">操作</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="td text-slate-200">{r.title}</td>
              <td className="td text-slate-500">{r.author}</td>
              <td className="td"><a className="text-cyan-400" href={r.code_url} target="_blank" rel="noreferrer">链接</a></td>
              <td className="td">{r.status}</td>
              <td className="td">
                <div className="flex gap-1.5">
                  <button className="btn !py-1" onClick={async () => { await api.put(`/submissions/${r.id}`, { status: "approved" }); load(); }}>通过</button>
                  <button className="btn btn-danger !py-1" onClick={async () => { await api.put(`/submissions/${r.id}`, { status: "rejected" }); load(); }}>拒绝</button>
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td className="td text-slate-600" colSpan={5}>暂无投稿</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Users() {
  const [rows, setRows] = useState<any[]>([]);
  const [u, setU] = useState(""); const [p, setP] = useState("");
  const load = () => api.get("/users").then(setRows);
  useEffect(() => { load(); }, []);
  return (
    <div className="card p-5">
      <div className="mb-4 flex gap-2">
        <input className="input !w-40" placeholder="用户名" value={u} onChange={(e) => setU(e.target.value)} />
        <input className="input !w-40" placeholder="密码≥6位" type="password" value={p} onChange={(e) => setP(e.target.value)} />
        <button className="btn btn-primary" onClick={async () => { await api.post("/users", { username: u, password: p }); setU(""); setP(""); load(); }}>
          <UserPlus size={14} /> 添加
        </button>
      </div>
      <table className="w-full">
        <thead><tr><th className="th">ID</th><th className="th">用户名</th><th className="th">创建时间</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.id}><td className="td">{r.id}</td><td className="td text-slate-200">{r.username}</td><td className="td text-slate-500">{r.created_at}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function OpsLog() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { api.get("/ops").then(setRows); }, []);
  return (
    <div className="card max-h-[60vh] overflow-y-auto p-4">
      <table className="w-full">
        <thead><tr><th className="th">时间</th><th className="th">操作者</th><th className="th">动作</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.id}><td className="td text-slate-500">{r.created_at}</td><td className="td text-cyan-300">{r.actor}</td><td className="td text-slate-300">{r.action}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function Tags() {
  const [tags, setTags] = useState<any[]>([]);
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  useEffect(() => { api.get("/tags").then(setTags); }, []);
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center gap-2">
        <input className="input !w-36" placeholder="旧标签" value={from} onChange={(e) => setFrom(e.target.value)} />
        <Merge size={14} className="text-slate-500" />
        <input className="input !w-36" placeholder="合并到" value={to} onChange={(e) => setTo(e.target.value)} />
        <button className="btn btn-primary" onClick={async () => { const r = await api.post("/tags/merge", { from, to }); alert(`影响 ${r.affected} 条`); }}>合并</button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => <span key={t.tag} className="badge cursor-pointer" style={{ borderColor: "#1e2534", color: "#94a3b8" }} onClick={() => setFrom(t.tag)}>{t.tag} ×{t.count}</span>)}
      </div>
    </div>
  );
}

function Brand() {
  const [s, setS] = useState<any>(null);
  useEffect(() => { api.get("/settings").then(setS); }, []);
  if (!s) return null;
  return (
    <div className="card max-w-md p-5">
      <div className="mb-3"><span className="label">站点名称(白标)</span><input className="input" value={s.brand_name || ""} onChange={(e) => setS({ ...s, brand_name: e.target.value })} /></div>
      <div className="mb-3"><span className="label">品牌色</span><input className="input" value={s.brand_color || ""} onChange={(e) => setS({ ...s, brand_color: e.target.value })} /></div>
      <div className="mb-4"><span className="label">默认语言</span>
        <select className="select" value={s.locale || "zh"} onChange={(e) => setS({ ...s, locale: e.target.value })}><option value="zh">zh</option><option value="en">en</option></select>
      </div>
      <button className="btn btn-primary" onClick={async () => { await api.put("/settings", s); alert("已保存"); }}>保存</button>
    </div>
  );
}

function Data() {
  const [webhook, setWebhook] = useState("");
  const [csv, setCsv] = useState("");
  const exportCsv = async () => {
    const res = await fetch("/api/csv", { headers: { Authorization: `Bearer ${getToken()}` } });
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "items.csv";
    a.click();
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="card p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">CSV 导入/导出</h3>
        <div className="mb-3 flex gap-2">
          <button className="btn" onClick={exportCsv}><Download size={14} /> 导出</button>
          <button className="btn" onClick={async () => { const r = await api.post("/csv", { csv }); alert(`导入 ${r.imported} 条`); setCsv(""); }}><Upload size={14} /> 导入</button>
        </div>
        <textarea className="textarea" rows={5} placeholder="section,category,name,url,tags,description" value={csv} onChange={(e) => setCsv(e.target.value)} />
      </div>
      <div className="card p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">爬虫 / 死链</h3>
        <div className="mb-2 flex gap-2">
          <button className="btn" onClick={async () => { await api.post("/crawl", { webhook }); alert("爬虫已触发"); }}><ScanLine size={14} /> 跑官网爬虫</button>
          <button className="btn" onClick={async () => { await api.post("/checklinks"); alert("死链检测已触发,结果见 data/link-report.json"); }}><Link2 size={14} /> 死链检测</button>
        </div>
        <input className="input" placeholder="webhook 新组件提醒 URL(可选)" value={webhook} onChange={(e) => setWebhook(e.target.value)} />
        <p className="mt-3 text-xs leading-5 text-slate-500">脚本位于 scripts/crawl-aceternity.mjs 与 scripts/check-links.mjs,也可在服务器手动执行。</p>
      </div>
    </div>
  );
}

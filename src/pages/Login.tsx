import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { api, getToken, setToken } from "../api";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  if (getToken()) return <Navigate to="/admin" replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      const r = await api.post("/auth/login", { username, password });
      setToken(r.token);
      navigate("/admin");
    } catch (e: any) {
      setErr(e.message);
    }
  };

  return (
    <div className="grid-bg flex h-full items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Sparkles size={34} className="mx-auto mb-2 text-cyan-400" />
          <h1 className="neon-text text-xl font-bold">Motion UI 资源库</h1>
          <p className="mt-1 text-xs text-slate-500">后台管理系统 · 登录后管理 5 大版块资源</p>
        </div>
        <form onSubmit={submit} className="card p-6">
          <div className="mb-3">
            <span className="label">用户名</span>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <span className="label">密码</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="初始密码 admin123"
            />
          </div>
          {err && <div className="mb-3 text-xs text-red-400">{err}</div>}
          <button className="btn btn-primary w-full justify-center" type="submit">
            登 录
          </button>
        </form>
      </div>
    </div>
  );
}

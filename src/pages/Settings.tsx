import { useRef, useState } from "react";
import { Download, KeyRound, Upload } from "lucide-react";
import { api } from "../api";
import { Field } from "../components/ui";

export default function Settings() {
  const [oldP, setOldP] = useState("");
  const [newP, setNewP] = useState("");
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const changePwd = async () => {
    setMsg("");
    try {
      await api.put("/password", { old_password: oldP, new_password: newP });
      setMsg("密码已修改");
      setOldP("");
      setNewP("");
    } catch (e: any) {
      setMsg(e.message);
    }
  };

  const backup = async () => {
    const data = await api.get("/backup");
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `webui-admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const restore = async (f: File) => {
    const data = JSON.parse(await f.text());
    if (!confirm("恢复将覆盖当前全部数据,继续?")) return;
    try {
      await api.post("/restore", data);
      alert("恢复成功");
      location.href = "/";
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-5 text-lg font-bold text-slate-100">系统设置</h2>

      <div className="card mb-4 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <KeyRound size={15} className="text-cyan-400" /> 修改密码
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="原密码">
            <input className="input" type="password" value={oldP} onChange={(e) => setOldP(e.target.value)} />
          </Field>
          <Field label="新密码(至少 6 位)">
            <input className="input" type="password" value={newP} onChange={(e) => setNewP(e.target.value)} />
          </Field>
        </div>
        {msg && <div className="mb-2 text-xs text-cyan-300">{msg}</div>}
        <button className="btn btn-primary" onClick={changePwd}>
          保存新密码
        </button>
      </div>

      <div className="card mb-4 p-5">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">数据备份 / 迁移</h3>
        <p className="mb-4 text-xs text-slate-500">
          导出全部版块 / 分类 / 资源 / 资产数据为 JSON;在新服务器恢复即可整体迁移。SQLite 数据库文件位于
          server/data.db,也可直接拷贝该文件迁移。
        </p>
        <div className="flex gap-3">
          <button className="btn" onClick={backup}>
            <Download size={14} /> 导出 JSON
          </button>
          <button className="btn" onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> 导入恢复
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && restore(e.target.files[0])}
          />
        </div>
      </div>

      <div className="card p-5 text-xs leading-6 text-slate-500">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">部署说明</h3>
        <p>
          本项目为单进程应用:Express 同时提供 /api 接口、/design 设计图静态目录与前端构建产物。
          服务器要求 Node ≥ 22(内置 node:sqlite)。部署步骤见仓库根目录 DEPLOY.md:
          npm install → npm run build → pm2 start ecosystem.config.cjs → nginx 反代。
        </p>
      </div>
    </div>
  );
}

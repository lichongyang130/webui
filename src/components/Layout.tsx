import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Database,
  Image as ImageIcon,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { api, clearToken, getToken } from "../api";

const nav = [
  { to: "/admin", icon: LayoutDashboard, label: "仪表盘" },
  { to: "/admin/sections", icon: Boxes, label: "版块 / 分类" },
  { to: "/admin/resources", icon: Database, label: "资源条目" },
  { to: "/admin/assets", icon: ImageIcon, label: "设计资产库" },
  { to: "/admin/ops", icon: Boxes, label: "运营中心" },
  { to: "/admin/settings", icon: Settings, label: "系统设置" },
];

export default function Layout() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    clearToken();
    navigate("/admin/login");
  };
  return (
    <div className="flex h-full">
      <aside className="flex w-56 shrink-0 flex-col border-r border-[#1e2534] bg-[#07090f]">
        <div className="flex items-center gap-2 px-5 py-5">
          <Sparkles size={20} className="text-cyan-400" />
          <div>
            <div className="neon-text text-sm font-bold">Motion UI 资源库</div>
            <div className="text-[10px] text-slate-500">后台管理系统 v1.0</div>
          </div>
        </div>
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/15 to-violet-500/15 text-cyan-300 border border-cyan-500/25"
                    : "text-slate-400 hover:bg-[#10151f] hover:text-slate-200 border border-transparent"
                }`
              }
            >
              <n.icon size={16} />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-[#1e2534] p-4 text-xs text-slate-500">
          <div className="mb-2">登录:admin</div>
          <button className="btn w-full justify-center" onClick={logout}>
            <LogOut size={14} /> 退出登录
          </button>
        </div>
      </aside>
      <main className="grid-bg flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

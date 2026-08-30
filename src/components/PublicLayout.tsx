import { Link, NavLink, Outlet } from "react-router-dom";
import { Shield, Sparkles } from "lucide-react";

export default function PublicLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-[#1e2534] bg-[#05060acc] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            <span className="neon-text text-sm font-bold">Motion UI 资源库</span>
          </Link>
          <nav className="flex items-center gap-1 text-[13px]">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 ${isActive ? "text-cyan-300" : "text-slate-400 hover:text-slate-200"}`
              }
            >
              首页
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 ${isActive ? "text-cyan-300" : "text-slate-400 hover:text-slate-200"}`
              }
            >
              设计画廊
            </NavLink>
            <Link to="/admin" className="btn !py-1.5 ml-3">
              <Shield size={13} /> 进入后台
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="border-t border-[#1e2534] py-6 text-center text-xs text-slate-600">
        Motion UI 资源库 · 汇聚 Aceternity / MotionSites / React Bits / Uiverse / Anime.js · 资源版权归原作者所有,本站仅作导航与学习参考
      </footer>
    </div>
  );
}

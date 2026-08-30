import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Shield, Sparkles } from "lucide-react";
import { useT } from "../i18n";
import { api } from "../api";

export default function PublicLayout() {
  const { t, locale, setLocale } = useT();
  const [email, setEmail] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [brand, setBrand] = useState("Motion UI 资源库");
  useEffect(() => {
    api.get("/public/brand").then((b) => setBrand(b.brand_name)).catch(() => {});
  }, []);

  const subscribe = async () => {
    try {
      await api.post("/public/subscribe", { email });
      setSubMsg("✓");
      setEmail("");
    } catch (e: any) {
      setSubMsg(e.message);
    }
  };

  const nav = [
    { to: "/", label: t("home") },
    { to: "/gallery", label: t("gallery") },
    { to: "/demos", label: "演示墙" },
    { to: "/learn", label: t("learn") },
    { to: "/compare", label: t("compare") },
    { to: "/wizard", label: t("wizard") },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-[#1e2534] bg-[#05060acc] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            <span className="neon-text text-sm font-bold">{brand}</span>
          </Link>
          <nav className="flex items-center gap-1 text-[13px]">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-2.5 py-1.5 ${isActive ? "text-cyan-300" : "text-slate-400 hover:text-slate-200"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <button
              className="btn !py-1 ml-1 text-[11px]"
              onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
              title="i18n"
            >
              {locale === "zh" ? "EN" : "中"}
            </button>
            <Link to="/admin" className="btn !py-1.5 ml-2">
              <Shield size={13} /> {t("admin")}
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="border-t border-[#141a28] bg-[#07090f] py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 text-xs text-slate-500 md:grid-cols-4">
          <div>
            <Link to="/" className="neon-text mb-2 inline-block text-base font-bold">⚡ {brand}</Link>
            <p className="mb-3 max-w-xs leading-5">{t("sub")}</p>
            <div className="flex items-center gap-2">
              <input
                className="input !w-44 !py-1.5"
                placeholder={`${t("subscribe")} · ${t("email")}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn !py-1.5" onClick={subscribe}>
                {subMsg || "订阅"}
              </button>
            </div>
          </div>
          <div>
            <div className="mb-3 font-semibold text-slate-300">探索</div>
            <div className="space-y-2">
              <Link className="block hover:text-cyan-300" to="/gallery">设计画廊</Link>
              <Link className="block hover:text-cyan-300" to="/demos">在线演示墙</Link>
              <Link className="block hover:text-cyan-300" to="/wizard">拼装向导</Link>
              <Link className="block hover:text-cyan-300" to="/compare">同屏对比</Link>
              <Link className="block hover:text-cyan-300" to="/learn">动效百科</Link>
            </div>
          </div>
          <div>
            <div className="mb-3 font-semibold text-slate-300">关于</div>
            <div className="space-y-2">
              <a className="block hover:text-cyan-300" href="/feed.xml" target="_blank" rel="noreferrer">更新日志 RSS</a>
              <Link className="block hover:text-cyan-300" to="/admin">提交资源(后台)</Link>
              <Link className="block hover:text-cyan-300" to="/admin">管理后台</Link>
              <span className="block">© {new Date().getFullYear()} {brand}</span>
            </div>
          </div>
          <div>
            <div className="mb-3 font-semibold text-slate-300">社区</div>
            <div className="flex flex-col gap-2">
              <a className="hover:text-cyan-400" href="https://discord.gg/ftZbQvCdN7" target="_blank" rel="noreferrer">Discord</a>
              <a className="hover:text-cyan-400" href="https://x.com/aceternitylabs" target="_blank" rel="noreferrer">Twitter</a>
              <a className="hover:text-cyan-400" href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">GitHub</a>
              <a className="hover:text-cyan-400" href="/feed.xml" target="_blank" rel="noreferrer">RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
      <footer className="border-t border-[#1e2534] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-xs text-slate-600">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <input
                className="input !w-56 !py-1.5"
                placeholder={`${t("subscribe")} · ${t("email")}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn !py-1.5" onClick={subscribe}>
                {subMsg || "订阅"}
              </button>
            </div>
            Motion UI 资源库 · {t("foot")}
          </div>
          <div className="flex gap-4">
            <a className="hover:text-cyan-400" href="https://discord.gg/ftZbQvCdN7" target="_blank" rel="noreferrer">Discord</a>
            <a className="hover:text-cyan-400" href="https://x.com/aceternitylabs" target="_blank" rel="noreferrer">Twitter</a>
            <a className="hover:text-cyan-400" href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-cyan-400" href="/feed.xml" target="_blank">RSS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

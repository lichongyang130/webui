"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/icons";

const NAV = [
  { href: "/admin", icon: "bar-chart", label: "Dashboard", exact: true },
  { href: "/admin/items", icon: "layers", label: "All Items" },
  { href: "/admin/submissions", icon: "shield", label: "Submissions", badge: 0 },
  { href: "/admin/items/new", icon: "plus", label: "Add New Item" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export default function AdminShell({
  children,
  username,
  pendingCount = 0,
}: {
  children: React.ReactNode;
  username: string;
  pendingCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#070711]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[0.07] bg-[#0b0b1a]">
        <div className="flex h-16 items-center gap-2.5 border-b border-white/[0.07] px-5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Icon name="sparkles" className="h-5 w-5 text-white" />
          </span>
          <div>
            <div className="text-sm font-extrabold leading-none">MotionVault</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-fuchsia-300/80">
              Admin Center
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 text-white shadow-lg"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon name={n.icon} className="h-4.5 w-4.5" />
                {n.label}
                {n.href === "/admin/submissions" && pendingCount > 0 && (
                  <span className="ml-auto rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold text-black">
                    {pendingCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/[0.07] p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/55 transition hover:bg-white/5 hover:text-white"
          >
            <Icon name="external" className="h-4.5 w-4.5" /> View public site
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-300/80 transition hover:bg-rose-500/10 hover:text-rose-300"
          >
            <Icon name="logout" className="h-4.5 w-4.5" /> Sign out
          </button>
          <div className="flex items-center gap-2.5 px-2 pt-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold">
              {username.slice(0, 2).toUpperCase()}
            </span>
            <div className="text-xs">
              <div className="font-semibold">{username}</div>
              <div className="text-white/35">administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-64 flex-1">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

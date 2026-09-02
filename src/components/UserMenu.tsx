"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Me {
  id: string;
  name: string;
  email: string;
  provider: "local" | "google" | "github";
  avatar?: string;
}

const PROVIDER_LABEL: Record<Me["provider"], string> = {
  local: "Email",
  google: "Google",
  github: "GitHub",
};

const AVATAR_GRADS = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-lime-500",
  "from-amber-500 to-rose-500",
];

export default function UserMenu({ zh }: { zh: boolean }) {
  const [me, setMe] = useState<Me | null | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setMe(d.user ?? null))
      .catch(() => setMe(null));
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (me === undefined) {
    return <span className="h-9 w-9 rounded-xl bg-white/[0.05]" aria-hidden />;
  }

  if (me === null) {
    return (
      <Link
        href="/login"
        className="ghost-btn hidden !px-4 !py-2 text-xs md:inline-flex"
      >
        {zh ? "登录" : "Sign in"}
      </Link>
    );
  }

  const grad = AVATAR_GRADS[me.id.charCodeAt(me.id.length - 1) % AVATAR_GRADS.length];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={zh ? "账号菜单" : "Account menu"}
        className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-white/15 transition hover:border-fuchsia-400/50"
      >
        {me.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={me.avatar} alt={me.name} className="h-full w-full object-cover" />
        ) : (
          <span
            className={`grid h-full w-full place-items-center bg-gradient-to-br text-sm font-extrabold text-white ${grad}`}
          >
            {me.name.slice(0, 1).toUpperCase()}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-[120] mt-2 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b1a]/95 p-2 shadow-2xl backdrop-blur-xl">
          <div className="px-3 py-2.5">
            <div className="truncate text-sm font-bold">{me.name}</div>
            <div className="truncate text-xs text-white/45">{me.email}</div>
            <span className="mt-2 inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-white/50">
              {zh ? "已通过" : "via"} {PROVIDER_LABEL[me.provider]}
              {zh ? "登录" : " sign-in"}
            </span>
          </div>
          <div className="border-t border-white/[0.07] pt-1.5">
            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              ♥ {zh ? "我的收藏" : "My favorites"}
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/";
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-300/90 transition hover:bg-rose-500/10 hover:text-rose-200"
            >
              ⎋ {zh ? "退出登录" : "Sign out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

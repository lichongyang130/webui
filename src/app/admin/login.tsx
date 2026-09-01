"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";

export default function AdminLogin() {
  const router = useRouter();
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      setErr("Invalid credentials. Try admin / motion123");
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#070711] px-4 bg-grid">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>

      <form
        onSubmit={submit}
        className="glass relative w-full max-w-sm rounded-3xl p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_12px_36px_-8px_rgba(217,70,239,0.8)]">
            <Icon name="shield" className="h-7 w-7 text-white" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold">Admin Center</h1>
          <p className="mt-1 text-sm text-white/45">Sign in to manage the vault</p>
        </div>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
          Username
        </label>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="input-dark mb-4"
          placeholder="admin"
          autoFocus
        />
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
          Password
        </label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="input-dark"
          placeholder="••••••••"
        />

        {err && <p className="mt-3 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="grad-btn mt-6 w-full !py-3 text-base disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-center text-xs text-white/45">
          Demo credentials — <b className="text-white/70">admin</b> / <b className="text-white/70">motion123</b>
        </p>
      </form>
    </div>
  );
}

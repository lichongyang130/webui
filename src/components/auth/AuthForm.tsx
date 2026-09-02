"use client";

import { FormEvent, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({
  mode,
  zh,
  next,
  initialError,
}: {
  mode: "login" | "register";
  zh: boolean;
  next: string;
  initialError?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(initialError ?? "");

  const isLogin = mode === "login";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!EMAIL_RE.test(email)) {
      return setError(zh ? "请输入有效的邮箱地址" : "Enter a valid email address");
    }
    if (!isLogin && (name.trim().length < 2 || name.trim().length > 40)) {
      return setError(zh ? "昵称长度需为 2-40 个字符" : "Name must be 2-40 characters");
    }
    if (password.length < 8) {
      return setError(zh ? "密码至少 8 位" : "Password must be at least 8 characters");
    }
    if (!isLogin && password !== confirm) {
      return setError(zh ? "两次输入的密码不一致" : "Passwords do not match");
    }

    setBusy(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin ? { email, password } : { name, email, password }
        ),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data.error ||
            (zh ? "请求失败，请稍后再试" : "Something went wrong, try again")
        );
        setBusy(false);
        return;
      }
      window.location.href = next || "/";
    } catch {
      setError(zh ? "网络错误，请稍后再试" : "Network error, try again");
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/15";

  return (
    <form onSubmit={onSubmit} className="grid gap-3.5">
      {!isLogin && (
        <input
          className={inputCls}
          placeholder={zh ? "昵称（如：Aria）" : "Display name (e.g. Aria)"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          maxLength={40}
        />
      )}
      <input
        className={inputCls}
        type="email"
        placeholder={zh ? "邮箱地址" : "Email address"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        className={inputCls}
        type="password"
        placeholder={zh ? "密码（至少 8 位）" : "Password (min. 8 chars)"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={isLogin ? "current-password" : "new-password"}
      />
      {!isLogin && (
        <input
          className={inputCls}
          type="password"
          placeholder={zh ? "确认密码" : "Confirm password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
      )}

      {error && (
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-[13px] text-rose-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-1 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_36px_-10px_rgba(217,70,239,0.7)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy
          ? zh
            ? "请稍候…"
            : "Please wait…"
          : isLogin
            ? zh
              ? "登录"
              : "Sign in"
            : zh
              ? "创建账号"
              : "Create account"}
      </button>
    </form>
  );
}

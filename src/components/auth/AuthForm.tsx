"use client";

import { FormEvent, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-white/55">{label}</span>
      <input
        {...props}
        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-violet-400/60 focus:bg-violet-500/[0.06] focus:ring-4 focus:ring-violet-500/10"
      />
    </label>
  );
}

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

  return (
    <form onSubmit={onSubmit} className="grid w-full gap-3.5">
      {!isLogin && (
        <Field
          label={zh ? "昵称" : "Display name"}
          placeholder={zh ? "想让我们怎么称呼你？" : "How should we call you?"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          maxLength={40}
        />
      )}
      <Field
        label={zh ? "邮箱" : "Email"}
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <Field
        label={zh ? "密码" : "Password"}
        type="password"
        placeholder={zh ? "至少 8 位字符" : "8+ characters"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={isLogin ? "current-password" : "new-password"}
      />
      {!isLogin && (
        <Field
          label={zh ? "确认密码" : "Confirm password"}
          type="password"
          placeholder={zh ? "再输入一次" : "Type it again"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-3.5 py-2.5 text-[13px] leading-snug text-rose-300">
          <span aria-hidden>⚠</span>
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="grad-btn mt-1.5 h-11 w-full !py-0 font-bold disabled:cursor-not-allowed disabled:opacity-60"
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

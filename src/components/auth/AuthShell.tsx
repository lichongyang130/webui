import Link from "next/link";
import { ReactNode } from "react";
import AuthForm from "./AuthForm";
import SocialButtons from "./SocialButtons";

/** Shared glass-card shell for /login and /register. */
export default function AuthShell({
  mode,
  zh,
  next,
  error,
  demo,
}: {
  mode: "login" | "register";
  zh: boolean;
  next: string;
  error?: string;
  demo: { google: boolean; github: boolean };
}) {
  const isLogin = mode === "login";
  return (
    <main className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-4 py-14">
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-[-10%] h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[110px]"
      />

      <div className="relative w-full max-w-md">
        <div className="fx-border-glow rounded-3xl border border-white/10 bg-[#0b0b1a]/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl shadow-[0_8px_24px_-6px_rgba(217,70,239,0.7)]">
              ✦
            </span>
            <span className="text-xl font-extrabold tracking-tight">MotionVault</span>
          </Link>

          <h1 className="text-center text-2xl font-extrabold tracking-tight">
            {isLogin
              ? zh
                ? "欢迎回来"
                : "Welcome back"
              : zh
                ? "创建你的账号"
                : "Create your account"}
          </h1>
          <p className="mt-2 text-center text-sm text-white/45">
            {isLogin
              ? zh
                ? "登录以同步收藏、投稿和更多功能"
                : "Sign in to sync favorites, submissions and more"
              : zh
                ? "注册以同步收藏、投稿和更多功能"
                : "Sign up to sync favorites, submissions and more"}
          </p>

          <div className="mt-7">
            <SocialButtons demo={demo} zh={zh} />
          </div>

          {(demo.google || demo.github) && (
            <p className="mt-3 rounded-lg bg-white/[0.04] px-3 py-2 text-center text-[11.5px] leading-relaxed text-white/40">
              {zh
                ? "预览环境未配置 OAuth 密钥：标记 demo 的按钮会以演示账号登录。配置 GOOGLE_CLIENT_ID / GITHUB_CLIENT_ID 等环境变量后即为真实授权流程。"
                : "OAuth keys are not configured in this preview: demo-tagged buttons sign you in with a demo account. Set GOOGLE_CLIENT_ID / GITHUB_CLIENT_ID etc. for the real flow."}
            </p>
          )}

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
              {zh ? "或使用邮箱" : "or with email"}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <AuthForm mode={mode} zh={zh} next={next} initialError={error} />

          <p className="mt-7 text-center text-sm text-white/45">
            {isLogin ? (
              <>
                {zh ? "还没有账号？" : "No account yet?"}{" "}
                <Link
                  href={`/register${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`}
                  className="font-bold text-fuchsia-300 transition hover:text-fuchsia-200"
                >
                  {zh ? "免费注册" : "Sign up free"}
                </Link>
              </>
            ) : (
              <>
                {zh ? "已有账号？" : "Already have an account?"}{" "}
                <Link
                  href={`/login${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`}
                  className="font-bold text-fuchsia-300 transition hover:text-fuchsia-200"
                >
                  {zh ? "直接登录" : "Sign in"}
                </Link>
              </>
            )}
          </p>
        </div>

        <p className="mt-5 text-center text-[11px] text-white/25">
          {zh
            ? "继续即代表你同意本站的使用条款与隐私政策。"
            : "By continuing you agree to the Terms of Service and Privacy Policy."}
        </p>
      </div>
    </main>
  );
}

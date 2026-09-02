import Link from "next/link";
import AuthForm from "./AuthForm";
import SocialButtons from "./SocialButtons";

function Divider({ zh }: { zh: boolean }) {
  return (
    <div className="my-6 flex w-full items-center gap-3">
      <span className="h-px flex-1 bg-white/[0.09]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
        {zh ? "或使用邮箱" : "or with email"}
      </span>
      <span className="h-px flex-1 bg-white/[0.09]" />
    </div>
  );
}

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
  const swap = isLogin ? "/register" : "/login";
  const swapHref = next !== "/" ? `${swap}?next=${encodeURIComponent(next)}` : swap;

  return (
    <main className="bg-grid relative grid min-h-[calc(100svh-64px)] place-items-center overflow-hidden px-4 py-12">
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/[0.16] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 right-[-8%] h-80 w-80 rounded-full bg-cyan-500/[0.1] blur-[100px]"
      />

      <div className="relative w-full max-w-[400px]">
        <div className="rounded-2xl border border-white/10 bg-[#0c0c1d]/90 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* brand */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[15px] text-white shadow-[0_6px_18px_-4px_rgba(217,70,239,0.7)]">
              ✦
            </span>
            <span className="text-[17px] font-extrabold tracking-tight">MotionVault</span>
          </div>

          <h1 className="text-center text-[21px] font-extrabold leading-tight tracking-tight">
            {isLogin
              ? zh
                ? "欢迎回来"
                : "Welcome back"
              : zh
                ? "创建你的账号"
                : "Create your account"}
          </h1>
          <p className="mt-1.5 text-center text-[13px] leading-relaxed text-white/40">
            {isLogin
              ? zh
                ? "登录后同步收藏、投稿与更多功能"
                : "Sign in to sync favorites, submissions & more"
              : zh
                ? "注册后同步收藏、投稿与更多功能"
                : "Sign up to sync favorites, submissions & more"}
          </p>

          {/* social */}
          <div className="mt-6">
            <SocialButtons demo={demo} zh={zh} />
          </div>
          {(demo.google || demo.github) && (
            <p className="mt-2.5 text-center font-mono text-[10px] leading-relaxed text-white/30">
              {zh
                ? "演示模式：未配置 OAuth 密钥，社交按钮将以演示账号登录"
                : "Demo mode: no OAuth keys set — social buttons sign in a demo account"}
            </p>
          )}

          <Divider zh={zh} />

          <AuthForm mode={mode} zh={zh} next={next} initialError={error} />

          <p className="mt-6 text-center text-[13px] text-white/40">
            {isLogin ? (zh ? "还没有账号？" : "No account yet?") : zh ? "已有账号？" : "Have an account?"}{" "}
            <Link
              href={swapHref}
              className="font-bold text-fuchsia-300 transition hover:text-fuchsia-200"
            >
              {isLogin ? (zh ? "免费注册" : "Sign up free") : zh ? "直接登录" : "Sign in"}
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-[10.5px] leading-relaxed text-white/20">
          {zh
            ? "继续即代表你同意本站的使用条款与隐私政策"
            : "By continuing you agree to the Terms & Privacy Policy"}
        </p>
      </div>
    </main>
  );
}

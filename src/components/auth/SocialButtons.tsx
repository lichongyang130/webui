"use client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default function SocialButtons({
  demo,
  zh,
}: {
  demo: { google: boolean; github: boolean };
  zh: boolean;
}) {
  const base =
    "flex h-11 w-full items-center justify-center gap-2.5 rounded-xl px-4 text-sm font-semibold transition active:scale-[0.99]";

  return (
    <div className="grid w-full gap-2.5">
      <a
        href="/api/auth/oauth/google"
        className={`${base} bg-white text-slate-700 hover:bg-slate-100 hover:shadow-[0_10px_28px_-10px_rgba(255,255,255,0.45)]`}
      >
        <GoogleIcon />
        <span>{zh ? "使用 Google 登录" : "Continue with Google"}</span>
        {demo.google && (
          <span className="rounded-md bg-slate-500/10 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
            demo
          </span>
        )}
      </a>
      <a
        href="/api/auth/oauth/github"
        className={`${base} border border-white/[0.12] bg-white/[0.06] text-white hover:border-white/25 hover:bg-white/[0.09]`}
      >
        <GitHubIcon />
        <span>{zh ? "使用 GitHub 登录" : "Continue with GitHub"}</span>
        {demo.github && (
          <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white/40">
            demo
          </span>
        )}
      </a>
    </div>
  );
}

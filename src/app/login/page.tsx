import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { getLang } from "@/lib/i18n";
import { getSessionUser, providerMode } from "@/lib/userauth";

export const metadata: Metadata = {
  title: "Sign in · MotionVault",
  description: "Sign in to MotionVault with email, Google or GitHub.",
};

const ERROR_MAP: Record<string, [string, string]> = {
  oauth_google_nocode: ["Google 授权被取消，请重试", "Google sign-in was cancelled, try again"],
  oauth_google_state: ["Google 登录状态校验失败，请重试", "Google sign-in state check failed, try again"],
  oauth_google_exchange: ["Google 登录凭证交换失败，请重试", "Google token exchange failed, try again"],
  oauth_github_nocode: ["GitHub 授权被取消，请重试", "GitHub sign-in was cancelled, try again"],
  oauth_github_state: ["GitHub 登录状态校验失败，请重试", "GitHub sign-in state check failed, try again"],
  oauth_github_exchange: ["GitHub 登录凭证交换失败，请重试", "GitHub token exchange failed, try again"],
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const lang = await getLang();
  const zh = lang === "zh";
  const user = await getSessionUser();
  const next = sp.next && sp.next.startsWith("/") ? sp.next : "/";

  if (user) redirect(next);

  const err = sp.error ? ERROR_MAP[sp.error] : undefined;

  return (
    <AuthShell
      mode="login"
      zh={zh}
      next={next}
      error={err ? (zh ? err[0] : err[1]) : undefined}
      demo={{
        google: providerMode("google") === "demo",
        github: providerMode("github") === "demo",
      }}
    />
  );
}

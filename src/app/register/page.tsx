import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { getLang } from "@/lib/i18n";
import { getSessionUser, providerMode } from "@/lib/userauth";

export const metadata: Metadata = {
  title: "Create account · MotionVault",
  description: "Join MotionVault with email, Google or GitHub.",
};

export default async function RegisterPage({
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

  return (
    <AuthShell
      mode="register"
      zh={zh}
      next={next}
      demo={{
        google: providerMode("google") === "demo",
        github: providerMode("github") === "demo",
      }}
    />
  );
}

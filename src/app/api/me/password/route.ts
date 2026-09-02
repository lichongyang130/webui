import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, setUserPasswordGuard } from "@/lib/userauth";

/** POST /api/me/password — change password (local accounts only). */
export async function POST(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  if (session.provider !== "local") {
    return NextResponse.json(
      { error: "OAuth accounts manage their password at the provider" },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const current = String(body.currentPassword ?? "");
  const next = String(body.newPassword ?? "");
  if (next.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const ok = await setUserPasswordGuard(session.id, current, next);
  if (!ok) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401 }
    );
  }
  return NextResponse.json({ ok: true });
}

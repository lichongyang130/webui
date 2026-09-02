import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, touchUserLogin } from "@/lib/db";
import { setUserSession, toPublicUser, verifyPassword } from "@/lib/userauth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");

  const user = findUserByEmail(email);
  const generic = NextResponse.json(
    { error: "Invalid email or password" },
    { status: 401 }
  );
  if (!user || !user.passwordHash || user.provider !== "local") return generic;
  if (!verifyPassword(password, user.passwordHash)) return generic;

  touchUserLogin(user.id);
  await setUserSession(user.id);
  return NextResponse.json({ user: toPublicUser(user) });
}

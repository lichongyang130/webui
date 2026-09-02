import { NextRequest, NextResponse } from "next/server";
import { createLocalUser, findUserByEmail } from "@/lib/db";
import { hashPassword, setUserSession, toPublicUser } from "@/lib/userauth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (name.length < 2 || name.length > 40) {
    return NextResponse.json(
      { error: "Name must be 2-40 characters" },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }
  if (findUserByEmail(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  const user = createLocalUser(name, email, hashPassword(password));
  await setUserSession(user.id);
  return NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
}

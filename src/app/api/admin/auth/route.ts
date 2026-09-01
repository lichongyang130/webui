import { NextRequest, NextResponse } from "next/server";
import { login, logout, isAuthed } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const ok = await login(body.user ?? "", body.pass ?? "");
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await logout();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ authed: await isAuthed() });
}

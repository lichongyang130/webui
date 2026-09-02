import { NextResponse } from "next/server";
import { clearUserSession } from "@/lib/userauth";

export async function POST() {
  await clearUserSession();
  return NextResponse.json({ ok: true });
}

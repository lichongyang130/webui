import { NextResponse } from "next/server";
import { getNotificationFeed, markNotificationsSeen } from "@/lib/db";
import { getSessionUser } from "@/lib/userauth";

/** GET /api/me/notifications — my notification feed + unread count. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  return NextResponse.json(getNotificationFeed(user.id));
}

/** POST /api/me/notifications — mark everything as seen. */
export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  markNotificationsSeen(user.id);
  return NextResponse.json({ ok: true });
}

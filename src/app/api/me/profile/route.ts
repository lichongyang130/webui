import { NextRequest, NextResponse } from "next/server";
import { updateUserName } from "@/lib/db";
import { getSessionUser, toPublicUser } from "@/lib/userauth";

/** PATCH /api/me/profile — update display name. */
export async function PATCH(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  if (name.length < 2 || name.length > 40) {
    return NextResponse.json(
      { error: "Name must be 2-40 characters" },
      { status: 400 }
    );
  }
  const updated = updateUserName(user.id, name);
  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ user: toPublicUser(updated) });
}

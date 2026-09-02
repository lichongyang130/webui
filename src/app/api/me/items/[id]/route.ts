import { NextRequest, NextResponse } from "next/server";
import { deleteOwnedItem } from "@/lib/db";
import { getSessionUser } from "@/lib/userauth";

/** DELETE /api/me/items/<id> — remove my own submission while it is pending. */
export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const { id } = await ctx.params;
  const ok = deleteOwnedItem(user.id, id);
  if (!ok) {
    return NextResponse.json(
      { error: "Not found, not yours, or already under review/published" },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true });
}

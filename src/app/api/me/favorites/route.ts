import { NextRequest, NextResponse } from "next/server";
import { getFavorites, syncFavorites, toggleFavorite } from "@/lib/db";
import { getSessionUser } from "@/lib/userauth";

/** GET /api/me/favorites — my cloud favorites. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  return NextResponse.json({ favs: getFavorites(user.id) });
}

/** POST /api/me/favorites { slugs } — merge localStorage favorites into the cloud. */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const slugs: string[] = Array.isArray(body?.slugs)
    ? body.slugs.map((s: unknown) => String(s)).filter(Boolean).slice(0, 2000)
    : [];
  return NextResponse.json({ favs: syncFavorites(user.id, slugs) });
}

/** PATCH /api/me/favorites { slug } — toggle one favorite in the cloud. */
export async function PATCH(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const slug = String(body?.slug ?? "");
  if (!slug) return NextResponse.json({ error: "missing slug" }, { status: 400 });
  return NextResponse.json(toggleFavorite(user.id, slug));
}

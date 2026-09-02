import { NextRequest, NextResponse } from "next/server";
import { getItems, toCardItem } from "@/lib/db";

export const dynamic = "force-dynamic";

const VALID_SORTS = new Set(["popular", "newest", "copies", "az"]);

/**
 * GET /api/items?category=&q=&tag=&tech=&sort=&offset=&limit=
 * Server-side listing with pagination (#59) — feeds VaultBrowser so pages only
 * ship the first screen of cards instead of the whole catalog (#361).
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const category = sp.get("category") ?? undefined;
  if (category && !["templates", "components", "elements", "animations"].includes(category)) {
    return NextResponse.json({ error: "invalid category" }, { status: 400 });
  }
  const sortRaw = sp.get("sort") ?? "popular";
  const sort = (VALID_SORTS.has(sortRaw) ? sortRaw : "popular") as
    | "popular"
    | "newest"
    | "copies"
    | "az";
  const offset = Math.max(0, parseInt(sp.get("offset") ?? "0", 10) || 0);
  const limit = Math.min(96, Math.max(1, parseInt(sp.get("limit") ?? "48", 10) || 48));

  const all = getItems({
    category,
    q: sp.get("q")?.trim() || undefined,
    tag: sp.get("tag") || undefined,
    tech: sp.get("tech") || undefined,
    sort,
  });

  return NextResponse.json({
    items: all.slice(offset, offset + limit).map(toCardItem),
    total: all.length,
    offset,
    hasMore: offset + limit < all.length,
  });
}

import { NextResponse } from "next/server";
import { getItemsByOwner } from "@/lib/db";
import { getSessionUser } from "@/lib/userauth";

/** GET /api/me/overview — profile + my uploads for the member center. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const items = getItemsByOwner(user.id);
  return NextResponse.json({
    user,
    stats: {
      uploads: items.length,
      pending: items.filter((i) => i.status === "pending").length,
      published: items.filter((i) => i.published).length,
      views: items.reduce((s, i) => s + i.views, 0),
      copies: items.reduce((s, i) => s + i.copies, 0),
    },
    items: items.map((i) => ({
      id: i.id,
      slug: i.slug,
      title: i.title,
      category: i.category,
      status: i.status ?? "curated",
      published: i.published,
      views: i.views,
      copies: i.copies,
      stars: i.stars,
      createdAt: i.createdAt,
    })),
  });
}

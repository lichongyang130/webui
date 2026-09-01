import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (!q) return NextResponse.json({ items: [], categories: CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, nameZh: c.nameZh })) });
  const items = getItems({ q }).slice(0, 8).map((i) => ({
    slug: i.slug,
    title: i.title,
    summary: i.summary.slice(0, 90),
    category: i.category,
    tags: i.tags.slice(0, 3),
  }));
  return NextResponse.json({
    items,
    categories: CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.nameZh.includes(q) || c.tagline.toLowerCase().includes(q)
    ).map((c) => ({ slug: c.slug, name: c.name, nameZh: c.nameZh })),
  });
}

import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { createItem, getAllItemsAdmin, ItemInput } from "@/lib/db";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ items: getAllItemsAdmin() });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<ItemInput>;
  if (!body.title || !body.category || !body.html) {
    return NextResponse.json({ error: "title, category and html are required" }, { status: 400 });
  }
  const slug =
    body.slug?.trim() ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const item = createItem({
    slug,
    category: body.category as ItemInput["category"],
    title: body.title,
    summary: body.summary ?? "",
    author: body.author ?? "MotionVault",
    tags: body.tags ?? [],
    tech: body.tech ?? ["html", "css"],
    stars: body.stars ?? 0,
    featured: !!body.featured,
    published: body.published !== false,
    html: body.html,
    prompt: body.prompt ?? "",
    sourceUrl: body.sourceUrl || undefined,
  });
  return NextResponse.json({ item });
}

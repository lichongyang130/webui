import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !body.title || !body.category || !body.html) {
    return NextResponse.json({ error: "title, category and preview HTML are required" }, { status: 400 });
  }
  if (!["templates", "components", "elements", "animations"].includes(body.category)) {
    return NextResponse.json({ error: "invalid category" }, { status: 400 });
  }
  if (body.html.length < 40) {
    return NextResponse.json({ error: "the preview HTML looks too short" }, { status: 400 });
  }
  const item = createSubmission({
    title: String(body.title).slice(0, 200),
    category: body.category,
    summary: String(body.summary ?? "").slice(0, 500),
    author: String(body.author ?? "Community").slice(0, 80),
    submitterEmail: String(body.email ?? "").slice(0, 120),
    tags: Array.isArray(body.tags) ? body.tags.map(String).slice(0, 12) : [],
    tech: Array.isArray(body.tech) && body.tech.length ? body.tech : ["html", "css"],
    html: String(body.html),
    prompt: String(body.prompt ?? ""),
  });
  return NextResponse.json({ ok: true, slug: item.slug });
}

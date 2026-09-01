import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/db";
import { sanitizePreviewHtml, spamScore } from "@/lib/sanitize";

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

  // rate limit: max 5 submissions per IP per hour
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const g = globalThis as unknown as { __mvRate?: Record<string, number[]> };
  g.__mvRate ||= {};
  const now = Date.now();
  const hits = (g.__mvRate[ip] ?? []).filter((t) => now - t < 3_600_000);
  if (hits.length >= 5) {
    return NextResponse.json({ error: "Too many submissions — try again later" }, { status: 429 });
  }
  g.__mvRate[ip] = hits;
  g.__mvRate[ip].push(now);

  const html = sanitizePreviewHtml(String(body.html));
  const spam = spamScore({ title: String(body.title), html, summary: String(body.summary ?? "") });
  if (spam >= 8) {
    return NextResponse.json({ error: "Submission flagged as spam" }, { status: 422 });
  }

  const item = createSubmission({
    title: String(body.title).slice(0, 200),
    category: body.category,
    summary: String(body.summary ?? "").slice(0, 500),
    author: String(body.author ?? "Community").slice(0, 80),
    submitterEmail: String(body.email ?? "").slice(0, 120),
    tags: Array.isArray(body.tags)
      ? body.tags.map((x: unknown) => String(x).toLowerCase().replace(/[^\w-]+/g, "")).filter(Boolean).slice(0, 12)
      : [],
    tech: Array.isArray(body.tech) && body.tech.length ? body.tech : ["html", "css"],
    html,
    prompt: String(body.prompt ?? "").slice(0, 8000),
  });
  return NextResponse.json({ ok: true, slug: item.slug });
}

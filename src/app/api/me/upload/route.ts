import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/db";
import { sanitizePreviewHtml, spamScore } from "@/lib/sanitize";
import { getSessionUser } from "@/lib/userauth";

const VALID_CATEGORIES = ["templates", "components", "elements", "animations"];
const VALID_TECH = ["html", "css", "javascript", "react", "tailwind", "gsap", "animejs", "framer"];

/** POST /api/me/upload — member content upload (enters the review queue). */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  // per-member rate limit: 12 uploads / hour
  const g = globalThis as unknown as { __mvMemberRate?: Record<string, number[]> };
  g.__mvMemberRate ||= {};
  const now = Date.now();
  const hits = (g.__mvMemberRate[user.id] ?? []).filter((t) => now - t < 3_600_000);
  if (hits.length >= 12) {
    return NextResponse.json(
      { error: "Upload limit reached (12/hour) — try again later" },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.category || !body?.html) {
    return NextResponse.json(
      { error: "title, category and preview HTML are required" },
      { status: 400 }
    );
  }
  if (!VALID_CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: "invalid category" }, { status: 400 });
  }
  if (String(body.html).length < 40) {
    return NextResponse.json({ error: "the preview HTML looks too short" }, { status: 400 });
  }
  if (String(body.html).length > 300_000) {
    return NextResponse.json({ error: "preview HTML too large (300KB max)" }, { status: 413 });
  }

  const html = sanitizePreviewHtml(String(body.html));
  const spam = spamScore({
    title: String(body.title),
    html,
    summary: String(body.summary ?? ""),
  });
  if (spam >= 8) {
    return NextResponse.json({ error: "Submission flagged as spam" }, { status: 422 });
  }

  const item = createSubmission({
    title: String(body.title).slice(0, 200),
    category: body.category,
    summary: String(body.summary ?? "").slice(0, 500),
    author: user.name,
    submitterEmail: user.email,
    ownerId: user.id,
    tags: Array.isArray(body.tags)
      ? body.tags
          .map((x: unknown) => String(x).toLowerCase().replace(/[^\w-]+/g, ""))
          .filter(Boolean)
          .slice(0, 12)
      : [],
    tech:
      Array.isArray(body.tech) && body.tech.length
        ? body.tech.filter((t: unknown) => VALID_TECH.includes(String(t))).slice(0, 8)
        : ["html", "css"],
    html,
    prompt: String(body.prompt ?? "").slice(0, 8000),
  });

  hits.push(now);
  g.__mvMemberRate[user.id] = hits;
  return NextResponse.json({ ok: true, id: item.id, slug: item.slug }, { status: 201 });
}

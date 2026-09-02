import { NextRequest, NextResponse } from "next/server";
import { getItemBySlug, incrementCopies } from "@/lib/db";

/**
 * POST /api/prompt { slug } — count a copy AND return the prompt text.
 * Lets card-level quick-copy work without shipping prompts in list payloads.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const slug = String(body?.slug ?? "");
  const item = getItemBySlug(slug);
  if (!item || item.status === "pending") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  incrementCopies(slug);
  return NextResponse.json({ prompt: item.prompt ?? "" });
}

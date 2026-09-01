import { NextRequest, NextResponse } from "next/server";
import { incrementCopies } from "@/lib/db";

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "missing slug" }, { status: 400 });
  incrementCopies(slug);
  return NextResponse.json({ ok: true });
}

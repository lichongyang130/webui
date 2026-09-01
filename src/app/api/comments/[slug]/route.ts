import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

interface Comment {
  id: string;
  slug: string;
  name: string;
  body: string;
  rating: number;
  at: string;
}

const FILE = path.join(process.cwd(), "data", "comments.json");

function readAll(): Comment[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeAll(list: Comment[]) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = readAll()
    .filter((c) => c.slug === slug)
    .sort((a, b) => +new Date(b.at) - +new Date(a.at));
  const avg = list.length ? list.reduce((s, c) => s + c.rating, 0) / list.length : 0;
  return NextResponse.json({ comments: list.slice(0, 50), avg, count: list.length });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").slice(0, 40).trim();
  const text = String(body?.body ?? "").slice(0, 600).trim();
  const rating = Math.max(1, Math.min(5, Number(body?.rating) || 0));
  if (!name || text.length < 2 || !rating) {
    return NextResponse.json({ error: "name, body (2+ chars) and rating 1-5 required" }, { status: 400 });
  }
  // crude spam guard: no raw links
  if (/https?:\/\//i.test(text)) {
    return NextResponse.json({ error: "links are not allowed in comments" }, { status: 422 });
  }
  const all = readAll();
  const c: Comment = {
    id: "cmt_" + Math.random().toString(36).slice(2, 10),
    slug,
    name,
    body: text,
    rating,
    at: new Date().toISOString(),
  };
  all.push(c);
  writeAll(all);
  return NextResponse.json({ ok: true, comment: c });
}

import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { approveItem, rejectItem, updateItem } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const approved = approveItem(id);
  if (!approved) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (body.featured) updateItem(id, { featured: true });
  return NextResponse.json({ ok: true, item: approved });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = rejectItem(id);
  if (!ok) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

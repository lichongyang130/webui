import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/lib/db";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const items = getItems();
  const pick = items[Math.floor(Math.random() * items.length)];
  return NextResponse.redirect(new URL(`/item/${pick?.slug ?? "/explore"}`, req.url));
}

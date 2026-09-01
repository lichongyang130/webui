import { NextRequest } from "next/server";
import { getItemBySlug } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string; filename: string }> }
) {
  const { slug, filename } = await params;
  const item = getItemBySlug(slug);
  if (!item?.react) {
    return new Response("No React source for this item", { status: 404 });
  }
  const componentName =
    item.title
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .split(/[\s-]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("")
      .replace(/^([0-9])/, "C$1") || "Component";
  const file = filename.endsWith(".tsx") ? filename : `${componentName}.tsx`;
  return new Response(item.react, {
    headers: {
      "Content-Type": "text/x-typescript; charset=utf-8",
      "Content-Disposition": `attachment; filename="${file}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import { ImageResponse } from "next/og";
import { getItemBySlug } from "@/lib/db";
import { CATEGORY_MAP } from "@/lib/categories";

export const runtime = "nodejs";
export const alt = "Motion Vault asset preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Stable accent colors from the slug so every card has its own vibe.
function accents(slug: string): [string, string, string] {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const hue = (n: number) => `hsl(${(h + n) % 360} 90% 66%)`;
  return [hue(0), hue(48), hue(96)];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  const cat = item ? CATEGORY_MAP[item.category] : undefined;
  const [v1, v2, c1] = accents(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#070711",
          backgroundImage:
  " ",
          color: "#eceaf9",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              background: `linear-gradient(135deg, ${v1}, ${v2})`,
              boxShadow: `0 0 40px ${v1}55`,
            }}
          >
            MV
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Motion Vault</span>
            <span style={{ fontSize: 16, color: "#9d99c4" }}>motionvault · copy-paste animated UI</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {cat && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 18,
                fontWeight: 700,
                color: "#0a0a16",
                background: `linear-gradient(90deg, ${c1}, ${v2})`,
                padding: "8px 20px",
                borderRadius: 999,
                alignSelf: "flex-start",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {cat.name}
            </div>
          )}
          <div style={{ fontSize: 68, fontWeight: 900, letterSpacing: -2, lineHeight: 1.05 }}>
            {item ? item.title : slug}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9d99c4", maxWidth: 900 }}>
            {(item?.summary ?? "A hand-tuned animated interface asset.").replace(/[^\x20-\x7e]/g, "").slice(0, 96)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 22, fontSize: 20, color: "#b9bede" }}>
            <span style={{ color: c1 }}>Stars {Math.round(item?.stars ?? 0).toLocaleString("en-US")}</span>
            <span>Views {(item?.views ?? 0).toLocaleString("en-US")}</span>
            <span>Copies {(item?.copies ?? 0).toLocaleString("en-US")}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[v1, v2, c1].map((c) => (
              <div
                key={c}
                style={{ width: 26, height: 26, borderRadius: 999, background: c, boxShadow: `0 0 18px ${c}66` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

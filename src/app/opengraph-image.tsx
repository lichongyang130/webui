import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Motion Vault — copy-paste animated UI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          backgroundColor: "#070711",
          backgroundImage:
  " ",
          color: "#eceaf9",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 26,
            fontSize: 52,
            background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
            boxShadow: "0 0 70px rgba(139,92,246,.55)",
          }}
        >
          MV
        </div>
        <div style={{ fontSize: 84, fontWeight: 900, letterSpacing: -3 }}>Motion Vault</div>
        <div style={{ fontSize: 30, color: "#9d99c4", maxWidth: 820, textAlign: "center" }}>
          646 copy-paste animated components & prompts — gradients, gauges, decks, players, and more.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 700,
            color: "#0a0a16",
            background: "linear-gradient(90deg, #22d3ee, #e879f9)",
            padding: "12px 30px",
            borderRadius: 999,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Free · Open · No lock-in
        </div>
      </div>
    ),
    { ...size },
  );
}

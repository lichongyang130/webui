import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MotionVault — The treasure vault for animated web design",
  description:
    "MotionVault fuses the best of Motion Sites, React Bits, Uiverse, Anime.js and Aceternity UI: site templates, animated components, UI elements and motion snippets — each with a live preview, source code and a copy-paste AI prompt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

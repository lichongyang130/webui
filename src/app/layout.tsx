import type { Metadata, Viewport } from "next";
import "./globals.css";
import FXLayer from "@/components/fx/FXLayer";
import ScrollProgress from "@/components/fx/ScrollProgress";
import { getLang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MotionVault — The treasure vault for animated web design",
  description:
    "MotionVault fuses the best of Motion Sites, React Bits, Uiverse, Anime.js and Aceternity UI: site templates, animated components, UI elements and motion snippets — each with a live preview, source code and a copy-paste AI prompt.",
};

export const viewport: Viewport = {
  themeColor: "#070711",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <FXLayer lang={lang} />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

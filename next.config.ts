import type { NextConfig } from "next";

const config: NextConfig = {
  // allow the sandboxed live-preview proxy hosts to reach dev assets
  allowedDevOrigins: ["*.e2b.app"],
  // keep a production "check" build from clobbering the dev server's cache:
  // run `NEXT_DIST_DIR=.next-check npm run build` while dev is running
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  experimental: {
    // enable cross-document view transitions for route changes
    viewTransition: true,
  },
};

export default config;

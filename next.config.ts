import type { NextConfig } from "next";

const config: NextConfig = {
  experimental: {
    // enable cross-document view transitions for route changes
    viewTransition: true,
  },
};

export default config;

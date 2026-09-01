import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MotionVault — Animated web design treasure vault",
    short_name: "MotionVault",
    description: "Site templates, animated components, UI elements and motion snippets with live previews and AI prompts.",
    start_url: "/",
    display: "standalone",
    background_color: "#070711",
    theme_color: "#070711",
    icons: [
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%238b5cf6'/%3E%3Cstop offset='1' stop-color='%23d946ef'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='22' fill='url(%23g)'/%3E%3Cpath d='M50 20l8 22 22 8-22 8-8 22-8-22-22-8 22-8z' fill='white'/%3E%3C/svg%3E",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

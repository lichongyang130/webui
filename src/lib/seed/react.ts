import "server-only";
import fs from "node:fs";
import path from "node:path";
import { Item } from "../types";

// React component sources live as real, raw .tsx files under content/react-src
// (kept out of the Next build so they're never compiled — they're downloaded as
// source text). Loading them here avoids any template-string escaping issues.
const SRC_DIR = path.join(process.cwd(), "content", "react-src");

function loadReactSources(): Record<string, string> {
  const map: Record<string, string> = {};
  try {
    for (const file of fs.readdirSync(SRC_DIR)) {
      if (file.endsWith(".tsx")) {
        map[file.replace(/\.tsx$/, "")] = fs.readFileSync(path.join(SRC_DIR, file), "utf8");
      }
    }
  } catch {
    // directory may not exist yet
  }
  return map;
}

export const REACT_SOURCES: Record<string, string> = loadReactSources();

/** Add react + tailwind tech flags to every item that has a React source. */
export function withReactSources(items: Item[]): Item[] {
  return items.map((item) => {
    const source = REACT_SOURCES[item.slug];
    if (!source) return item;
    const tech: Item["tech"] = item.tech.includes("react")
      ? item.tech
      : ([...item.tech, "react", "tailwind"] as Item["tech"]);
    return { ...item, react: source, tech };
  });
}

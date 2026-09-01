import fs from "node:fs";
import path from "node:path";

const files = [
  "src/lib/seed/react-components.ts",
  "src/lib/seed/react-components-2.ts",
  "src/lib/seed/react-elements.ts",
  "src/lib/seed/react-animations.ts",
];
const outDir = path.join(process.cwd(), "content", "react-src");
fs.mkdirSync(outDir, { recursive: true });

let count = 0;
for (const file of files) {
  const code = fs.readFileSync(file, "utf8");
  // Match:  "slug": `  ...  `,   OR   `\n};
  const keyRe = /^\s{0,2}"([a-z0-9-]+)":\s*`/gm;
  let km;
  while ((km = keyRe.exec(code))) {
    const slug = km[1];
    const start = km.index + km[0].length;
    // find closing backtick followed by optional comma at line end
    const tail = code.slice(start);
    const endMatch = tail.match(/`(?:,?\s*\n\s{2}"|,?\n\s*};)/);
    if (!endMatch) { console.error("no end for", slug); continue; }
    let body = tail.slice(0, endMatch.index);
    // Unescape characters used inside outer template literal
    body = body.replace(/\\`/g, "`").replace(/\\\$\{/g, "${").replace(/\\\\/g, "\\");
    fs.writeFileSync(path.join(outDir, slug + ".tsx"), body);
    count++;
  }
}
console.log("extracted", count, "tsx files");

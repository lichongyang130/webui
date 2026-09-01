/**
 * Defense-in-depth for user-submitted preview HTML.
 * Previews already run in sandboxed iframes (allow-scripts, no same-origin),
 * but we strip the dangerous bits anyway: external network calls, scripts
 * outside the preview, event handlers, and any attempt to frame/navigate
 * the parent.
 */

const BAD_TAGS = ["script", "iframe", "object", "embed", "link", "meta", "form"];
const BAD_PATTERNS: [RegExp, string][] = [
  [/<meta[^>]*http-equiv[^>]*refresh[^>]*>/gi, ""],
  [/on(click|load|error|mouseover|focus|blur|submit|toggle|pointer\w+)\s*=\s*"[^"]*"/gi, ""],
  [/on(click|load|error|mouseover|focus|blur|submit|toggle|pointer\w+)\s*=\s*'[^']*'/gi, ""],
  [/on(click|load|error|mouseover|focus|blur|submit|toggle|pointer\w+)\s*=\s*[^\s>]+/gi, ""],
  [/javascript\s*:/gi, "x-blocked:"],
  [/vbscript\s*:/gi, "x-blocked:"],
  [/data\s*:\s*text\/html/gi, "x-blocked:"],
  [/<base[^>]*>/gi, ""],
];

export function sanitizePreviewHtml(raw: string): string {
  let html = String(raw ?? "").slice(0, 200_000);

  // Remove network-exfiltration attributes that let a sandboxed doc phone home
  html = html.replace(/\b(?:fetch|XMLHttpRequest|navigator\.sendBeacon|WebSocket|EventSource)\s*\(/g, "void(0)||(");

  for (const [re, rep] of BAD_PATTERNS) {
    html = html.replace(re, rep);
  }
  for (const tag of BAD_TAGS) {
    // strip <iframe> etc but KEEP <script> (previews need inline JS)
    if (tag === "script") continue;
    const re = new RegExp(`<${tag}[\\s\\S]*?(?:<\\/${tag}>|\\/?)>`, "gi");
    html = html.replace(re, "");
  }
  // block top-level navigation from inside the sandbox
  const guard =
    "<script>try{window.open=function(){return null};window.top&&window!==window.top&&(Object.defineProperty(window,'top',{value:window}),Object.defineProperty(window,'parent',{value:window}));}catch(e){}</script>";
  return html.replace("</body>", guard + "</body>");
}

/** Basic spam guard: link density & banned domains. */
const BANNED_DOMAINS = ["bit.ly", "tinyurl", "t.me/", "wa.me/"];

export function spamScore(input: { title: string; html: string; summary: string }): number {
  let score = 0;
  const all = `${input.title} ${input.html} ${input.summary}`.toLowerCase();
  const links = (input.html.match(/https?:\/\//gi) || []).length;
  if (links > 8) score += links - 8;
  if (BANNED_DOMAINS.some((d) => all.includes(d))) score += 5;
  if (/<a[^>]*download/gi.test(input.html)) score += 3;
  // repeated token spam
  const words = input.title.split(/\s+/);
  if (words.length && words.length !== new Set(words).size) score += 2;
  return score;
}

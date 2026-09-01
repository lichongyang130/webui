// Wraps a snippet into a polished, self-contained HTML document for live preview.
// No external CDNs: everything runs offline inside the sandboxed iframe.

const BASE_CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#070711; --panel:rgba(255,255,255,.04); --line:rgba(255,255,255,.09);
  --txt:#eceaf9; --dim:#9d99c4;
  --v1:#8b5cf6; --v2:#d946ef; --c1:#22d3ee;
}
html,body{height:100%}
body{background:var(--bg);color:var(--txt);font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
.demo-stage{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 24px;position:relative;
  background-image:linear-gradient(rgba(139,92,246,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.07) 1px,transparent 1px);
  background-size:44px 44px;background-position:center;}
.demo-stage::before{content:'';position:absolute;inset:0;background:radial-gradient(600px 400px at 50% 0%,rgba(139,92,246,.18),transparent 70%);pointer-events:none}
.demo-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:22px;width:100%;max-width:760px}
.demo-label{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--dim);font-weight:600}
::selection{background:rgba(217,70,239,.35)}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
input{font-family:inherit}
`;

export interface DocOpts {
  /** full-page = landing style; demo = centered component on a grid stage */
  kind?: "page" | "demo";
  body: string;
  css?: string;
  js?: string;
}

export function doc({ kind = "demo", body, css = "", js = "" }: DocOpts): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>${BASE_CSS}
${css}</style>
</head>
<body>
${kind === "page" ? body : `<div class="demo-stage"><div class="demo-inner"><div class="demo-label">Live Preview</div>${body}</div></div>`}
<script>
try{
${js}
}catch(e){var pre=document.createElement('pre');pre.style.cssText='position:fixed;bottom:12px;left:12px;right:12px;color:#fca5a5;background:rgba(40,10,20,.9);border:1px solid rgba(248,113,113,.4);padding:12px;border-radius:10px;font-size:12px;white-space:pre-wrap;z-index:999';pre.textContent='Preview error: '+e.message;document.body.appendChild(pre);}
</script>
</body>
</html>`;
}

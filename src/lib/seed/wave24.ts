import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-02T02:30:00.000Z";

/* 1 — SHIMMER GOLD TEXT */
const shimmerText = doc({
  body: `<h1 class="sh-t">SHIMMER</h1>`,
  css: `
h1.sh-t{font-size:clamp(48px,11vw,120px);font-weight:900;letter-spacing:.04em;
  background:linear-gradient(110deg,#6b5210 20%,#fbbf24 40%,#fef3c7 50%,#fbbf24 60%,#6b5210 80%);
  background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shine 3s linear infinite}
@keyframes shine{to{background-position:-200% 0}}`,
});

/* 2 — ROTATING RING BADGE */
const ringBadge = doc({
  body: `
<div class="rb"><svg viewBox="0 0 200 200"><defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#circ">✦ MOTION VAULT ✦ 176 ASSETS ✦ PROMPT · PREVIEW · SHIP ✦ </textPath></text></svg><div class="rb-core">★</div></div>`,
  css: `
.rb{position:relative;width:200px;height:200px}
.rb svg{position:absolute;inset:0;animation:spin 14s linear infinite}
.rb text{font-family:'JetBrains Mono',monospace;font-size:14.5px;letter-spacing:3.5px;fill:#e9d5ff;font-weight:700}
.rb-core{position:absolute;inset:42px;border-radius:50%;display:grid;place-items:center;font-size:44px;color:#fff;
  background:radial-gradient(circle at 35% 30%,#d946ef,#7c3aed 70%);box-shadow:0 0 50px rgba(217,70,239,.55)}
@keyframes spin{to{transform:rotate(360deg)}}`,
});

/* 3 — DEPTH FOCUS CARDS ROW */
const depthFocus = doc({
  body: `
<div class="df"><article class="on"><h3>One</h3></article><article><h3>Two</h3></article><article class="on"><h3>Three</h3></article><article><h3>Four</h3></article><article class="on"><h3>Five</h3></article></div>
<p class="df-p">hover the row → focus follows your cursor</p>`,
  css: `
.df{display:flex;gap:14px}
.df article{width:120px;height:200px;border-radius:20px;display:grid;place-items:center;flex:1;
  border:1px solid rgba(255,255,255,.12);cursor:pointer;
  background:linear-gradient(160deg,rgba(124,58,237,.45),rgba(11,11,28,.6));
  transition:flex .5s cubic-bezier(.22,1,.36,1),filter .5s,opacity .5s,transform .5s}
.df article h3{font-size:17px;opacity:0;transition:opacity .4s;letter-spacing:.3em;text-transform:uppercase}
.df article.on{flex:2.2;background:linear-gradient(160deg,rgba(217,70,239,.55),rgba(11,11,28,.7));box-shadow:0 20px 50px rgba(217,70,239,.25)}
.df article.on h3{opacity:1}
.df article:not(.on){opacity:.55;filter:saturate(.5) blur(.4px)}
.df:hover article:not(:hover){opacity:.4}
.df:hover article:hover{flex:2.2;opacity:1;filter:none}
.df-p{margin-top:26px;color:var(--dim);font-size:12px;letter-spacing:.25em;text-transform:uppercase}`,
});

/* 4 — ORBIT MENU (circular) */
const orbit = doc({
  body: `
<div class="om" id="om">
  <button class="om-core">✦</button>
  <a class="om-i" style="--i:0">✦</a><a class="om-i" style="--i:1">◆</a><a class="om-i" style="--i:2">●</a>
  <a class="om-i" style="--i:3">▲</a><a class="om-i" style="--i:4">★</a><a class="om-i" style="--i:5">♥</a>
</div>`,
  css: `
.om{position:relative;width:280px;height:280px}
.om-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:70px;height:70px;border-radius:50%;z-index:3;
  border:0;font-size:26px;color:#fff;cursor:pointer;background:linear-gradient(135deg,#7c3aed,#d946ef);
  box-shadow:0 10px 40px rgba(217,70,239,.55);transition:transform .4s}
.om.open .om-core{transform:translate(-50%,-50%) rotate(90deg)}
.om-i{position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px;border-radius:50%;
  display:grid;place-items:center;font-size:19px;text-decoration:none;color:#fff;cursor:pointer;
  background:rgba(20,20,42,.95);border:1px solid rgba(217,70,239,.4);
  transform:rotate(calc(var(--i)*60deg)) translateX(0) scale(.3);opacity:0;pointer-events:none;
  transition:transform .5s cubic-bezier(.34,1.56,.64,1),opacity .3s}
.om.open .om-i{opacity:1;pointer-events:auto;
  transform:rotate(calc(var(--i)*60deg)) translateX(110px) rotate(calc(var(--i)*-60deg)) scale(1)}
.om-i:hover{background:linear-gradient(135deg,#22d3ee,#7c3aed);box-shadow:0 0 24px rgba(34,211,238,.4)}`,
  js: `
document.querySelector('.om-core').onclick=()=>document.getElementById('om').classList.toggle('open');`,
});

/* 5 — UNDERLINE ANIMATED LINK / NAV */
const underlineLink = doc({
  body: `
<nav class="ul"><a>Components</a><a>Animations</a><a>Templates</a><a>Elements</a><a>AI Builder</a></nav>`,
  css: `
.ul{display:flex;gap:28px;flex-wrap:wrap;justify-content:center}
.ul a{position:relative;font-weight:700;font-size:15px;color:var(--dim);cursor:pointer;padding:6px 2px;transition:color .3s}
.ul a::after{content:'';position:absolute;left:0;right:100%;bottom:0;height:2px;border-radius:2px;
  background:linear-gradient(90deg,#22d3ee,#d946ef);transition:right .35s cubic-bezier(.22,1,.36,1)}
.ul a:hover{color:#fff}
.ul a:hover::after{right:0}`,
});

/* 6 — HOLOGRAPHIC / IRIDESCENT CARD */
const holo = doc({
  body: `
<div class="holo" id="holo"><div class="holo-in"><span class="holo-tag">LIMITED</span><h3>Holo Pass</h3><p>Iridescent sheen tracks your pointer like a trading card.</p><b>∞ assets</b></div></div>`,
  css: `
.holo{width:min(300px,100%);border-radius:24px;padding:2px;background:rgba(255,255,255,.1);
  transform-style:preserve-3d;transition:transform .15s ease-out}
.holo-in{position:relative;border-radius:22px;background:#0b0b1c;padding:28px;overflow:hidden;min-height:220px}
.holo-in::before{content:'';position:absolute;inset:-2px;pointer-events:none;
  background:linear-gradient(calc(var(--rx,0deg) + 90deg),
    rgba(34,211,238,.5),rgba(217,70,239,.4) 25%,rgba(255,255,255,.5) 45%,
    rgba(16,185,129,.4) 65%,rgba(34,211,238,.5) 85%);
  background-size:200% 200%;background-position:var(--px,50%) var(--py,50%);
  mix-blend-mode:color-dodge;opacity:.55;transition:opacity .3s}
.holo:hover .holo-in::before{opacity:1}
.holo-tag{font-size:10px;letter-spacing:.3em;font-weight:800;color:#22d3ee;border:1px solid rgba(34,211,238,.4);padding:4px 10px;border-radius:99px}
.holo-in h3{margin:16px 0 8px;font-size:26px;background:linear-gradient(90deg,#fff,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
.holo-in p{font-size:13px;color:var(--dim);line-height:1.7}
.holo-in b{display:block;margin-top:18px;font-size:22px}`,
  js: `
const el=document.getElementById('holo');
el.addEventListener('pointermove',e=>{
  const r=el.getBoundingClientRect();
  const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
  el.style.transform='perspective(700px) rotateY('+((px-.5)*16)+'deg) rotateX('+((.5-py)*16)+'deg)';
  el.style.setProperty('--px',px*100+'%');el.style.setProperty('--py',py*100+'%');
});
el.addEventListener('pointerleave',()=>{el.style.transform='perspective(700px) rotateY(0) rotateX(0)';});`,
});

export const WAVE24_ITEMS: Item[] = [
  {
    id: "w24-shimmer",
    slug: "gold-shimmer-sweep-text",
    category: "elements",
    title: "Gold shimmer sweep text",
    summary: "A champagne-gold highlight sweeps across dark gold lettering on a loop — award-badge typography.",
    author: "MotionVault",
    tags: ["text", "shimmer", "gold", "gradient", "sheen"],
    tech: ["html", "css"],
    stars: 401, views: 0, copies: 0, featured: false, published: true,
    html: shimmerText,
    prompt:
      "Create gold shimmer text: huge extra-bold display text with a background-clip linear-gradient running from dark bronze through bright amber and near-white highlight back to bronze; size the gradient 200% wide and animate background-position 0 to -200% over 3s linear so a light band sweeps across the letters continuously. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w24-badge",
    slug: "rotating-ring-text-badge",
    category: "components",
    title: "Rotating circular text badge",
    summary: "Text runs around an SVG circle and slowly rotates around a glowing gradient core — seal/badge stamp.",
    author: "MotionVault",
    tags: ["badge", "ring", "text-on-path", "svg", "rotating", "seal"],
    tech: ["html", "css"],
    stars: 344, views: 0, copies: 0, featured: false, published: true,
    html: ringBadge,
    prompt:
      "Build a rotating ring badge: an SVG containing a circular textPath of small mono uppercase text (with sparkle separators) following a circle path; the whole SVG slowly spins 360deg over 14s linear. In the center sits a gradient radial orb with a star glyph and glow shadow. Pure CSS/SVG, no JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w24-depth",
    slug: "depth-focus-bento-row",
    category: "components",
    title: "Depth-focus bento row",
    summary: "Hovering the row brings one panel forward (flex grow, color, label) while siblings recede and desaturate.",
    author: "MotionVault",
    tags: ["hover", "focus", "bento", "cards", "depth", "gallery"],
    tech: ["html", "css"],
    stars: 366, views: 0, copies: 0, featured: true, published: true,
    html: depthFocus,
    prompt:
      "Create a depth-focus card row: five tall rounded panels in a flex row; by default alternating panels are pre-focused. On row hover, siblings dim (opacity .4, desaturated), and hovering a panel makes it grow via flex transition to 2.2, restores full color, lifts and reveals its letter-spaced label — using only :hover/:not(:hover) CSS with cubic-bezier flex transitions. A dim helper caption below. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w24-orbit",
    slug: "circular-orbit-radial-menu",
    category: "components",
    title: "Circular orbit radial menu",
    summary: "Click the core and six icon satellites rotate into position around it on an invisible ring; core spins as it opens.",
    author: "MotionVault",
    tags: ["menu", "orbit", "circular", "radial", "fab", "spring"],
    tech: ["html", "css", "javascript"],
    stars: 378, views: 0, copies: 0, featured: false, published: true,
    html: orbit,
    prompt:
      "Build a circular orbit menu: a central 70px gradient button in a 280px stage; six 52px icon satellites absolutely centered, each with an --i index. When 'open' is toggled, satellites animate from collapsed scale .3 at center to their ring positions using transform: rotate(calc(var(--i)*60deg)) translateX(110px) rotate(calc(var(--i)*-60deg)) (counter-rotating so icons stay upright), with spring cubic-bezier; the core rotates 90deg. Satellites highlight on hover. Vanilla JS class toggle.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w24-underline",
    slug: "underline-sweep-nav-links",
    category: "components",
    title: "Underline sweep nav links",
    summary: "Gradient underline grows from the left on hover while the label brightens — one-pseudo-element nav polish.",
    author: "MotionVault",
    tags: ["nav", "links", "underline", "hover", "ui-kit"],
    tech: ["html", "css"],
    stars: 289, views: 0, copies: 0, featured: false, published: true,
    html: underlineLink,
    prompt:
      "Create nav links with an underline sweep: a row of bold dim links; each ::after is a 2px gradient (cyan→fuchsia) bar with right:100% so it is hidden, and on hover right animates to 0 with a cubic-bezier grow-from-left transition; label color turns white. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w24-holo",
    slug: "holographic-iridescent-tilt-card",
    category: "components",
    title: "Holographic iridescent tilt card",
    summary: "Trading-card style rainbow sheen (color-dodge) tracks the pointer over a 3D-tilting glass pass card.",
    author: "MotionVault",
    tags: ["holographic", "iridescent", "tilt", "card", "sheen", "premium"],
    tech: ["html", "css", "javascript"],
    stars: 477, views: 0, copies: 0, featured: true, published: true,
    html: holo,
    prompt:
      "Build a holographic trading-card effect: a rounded glass 'Holo Pass' card with a 2px light border that tilts in 3D toward the pointer (perspective 700, rotateY/rotateX ±16deg). An inner ::before overlay paints a wide multi-stop rainbow gradient (cyan/fuchsia/white/emerald) with angle derived from a --rx variable and background-position at --px/--py percentages, using mix-blend-mode: color-dodge at .55 opacity, ramping to full on hover, giving an iridescent sheen that moves with the cursor. Vanilla JS setting custom properties.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

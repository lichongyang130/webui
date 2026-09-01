import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T16:00:00.000Z";

/* 1 — GLOWING GRADIENT BORDER CARD (conic rotating border) */
const glowBorder = doc({
  body: `
<div class="gb"><div class="gb-in"><div class="gb-badge">PRO</div><h3>Glow Border</h3><p>A conic gradient border slowly rotates around this card. Pure CSS, zero images.</p><button class="gb-btn">Upgrade</button></div></div>`,
  css: `
.gb{position:relative;width:min(330px,100%);border-radius:24px;padding:2px;overflow:hidden;
  background:conic-gradient(from var(--a,0deg),#7c3aed,#d946ef,#22d3ee,#10b981,#7c3aed);
  animation:spin 5s linear infinite}
@property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
.gb-in{border-radius:22px;background:#0c0c1d;padding:28px;position:relative;z-index:1;height:100%}
.gb-badge{display:inline-block;font-size:10px;letter-spacing:.25em;font-weight:800;color:#0c0c1d;background:linear-gradient(90deg,#22d3ee,#a78bfa);border-radius:999px;padding:4px 12px}
.gb-in h3{margin:14px 0 8px;font-size:24px}.gb-in p{font-size:13px;color:var(--dim);line-height:1.7}
.gb-btn{margin-top:18px;width:100%;padding:12px;border-radius:12px;font-weight:700;color:#fff;background:linear-gradient(90deg,var(--v1),var(--v2));transition:filter .2s}
.gb-btn:hover{filter:brightness(1.2)}
@keyframes spin{to{--a:360deg}}
@supports not (background: conic-gradient(from var(--a), red, blue)){
  .gb{background:linear-gradient(135deg,#7c3aed,#d946ef,#22d3ee)}
}`,
});

/* 2 — NEON TEXT FLICKER (signboard) */
const neonFlicker = doc({
  body: `
<div class="neon-wrap"><h1 class="neon">OPEN</h1><h2 class="neon2">24&nbsp;HRS</h2></div>`,
  css: `
.neon-wrap{text-align:center}
.neon{font-size:clamp(64px,14vw,120px);font-weight:800;letter-spacing:.12em;color:#fff;
  text-shadow:0 0 6px #fff,0 0 18px #f0f,0 0 42px #f0f,0 0 82px #d946ef;
  animation:flick 4.5s infinite}
.neon2{margin-top:8px;font-size:clamp(20px,4vw,36px);font-weight:700;letter-spacing:.5em;color:#22d3ee;
  text-shadow:0 0 6px #fff,0 0 16px #22d3ee,0 0 36px #0891b2;animation:flick 6s 1.2s infinite}
@keyframes flick{
  0%,18%,22%,25%,53%,57%,100%{opacity:1}
  20%,24%,55%{opacity:.35;text-shadow:0 0 2px #fff}
  21%{opacity:.8}
}`,
});

/* 3 — MORPHING BLOB BACKGROUND SHAPES */
const blobs = doc({
  kind: "page",
  body: `
<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
<h1 class="blob-h">FLUID<span>BLOBS</span></h1>`,
  css: `
body{display:block;overflow:hidden}
.blob{position:fixed;border-radius:50%;filter:blur(70px);opacity:.55;mix-blend-mode:screen}
.b1{width:44vmax;height:44vmax;background:#7c3aed;top:-12vmax;left:-10vmax;animation:bl 16s ease-in-out infinite}
.b2{width:38vmax;height:38vmax;background:#d946ef;bottom:-14vmax;right:-8vmax;animation:bl 20s ease-in-out infinite reverse}
.b3{width:30vmax;height:30vmax;background:#22d3ee;top:40%;left:55%;animation:bl 24s ease-in-out infinite 2s}
.blob-h{position:relative;z-index:2;height:100vh;display:grid;place-content:center;text-align:center;font-size:clamp(48px,9vw,96px);font-weight:900;letter-spacing:-.02em}
.blob-h span{display:block;background:linear-gradient(90deg,#22d3ee,#d946ef);-webkit-background-clip:text;background-clip:text;color:transparent}
@keyframes bl{
  0%,100%{transform:translate(0,0) scale(1) rotate(0deg);border-radius:50%}
  33%{transform:translate(8vmax,6vmax) scale(1.15) rotate(40deg);border-radius:58% 42% 55% 45%/45% 55% 42% 58%}
  66%{transform:translate(-6vmax,10vmax) scale(.9) rotate(-30deg);border-radius:42% 58% 45% 55%/55% 42% 58% 45%}
}`,
});

/* 4 — PERSPECTIVE GRID FLOOR (synthwave) */
const gridFloor = doc({
  kind: "page",
  body: `
<div class="floor"><h1>GRID<span>RUNNER</span></h1></div>
<div class="sun"></div>`,
  css: `
body{display:block;overflow:hidden;background:#070312}
.floor{position:fixed;inset:0;perspective:340px;perspective-origin:50% 0}
.floor::before{content:'';position:absolute;left:-50%;right:-50%;top:52%;bottom:-50%;
  background:
    linear-gradient(#f0f 1px,transparent 1px) 0 0/100% 48px,
    linear-gradient(90deg,#f0f 1px,transparent 1px) 0 0/48px 100%;
  transform:rotateX(72deg);
  animation:gridmove 1.6s linear infinite;
  mask:linear-gradient(to bottom,transparent,#000 12%)}
.floor h1{position:absolute;top:24%;width:100%;text-align:center;font-size:clamp(40px,8vw,88px);font-weight:900;letter-spacing:.06em;
  color:#ffd6f5;text-shadow:0 0 20px #f0f,0 0 60px #d946ef}
.floor h1 span{display:block;color:#22d3ee;text-shadow:0 0 20px #22d3ee,0 0 60px #0891b2}
.sun{position:fixed;left:50%;top:18%;width:220px;height:220px;transform:translateX(-50%);border-radius:50%;
  background:linear-gradient(#ffd319,#ff2975 60%,#d946ef);
  box-shadow:0 0 80px rgba(255,41,117,.6);
  -webkit-mask:repeating-linear-gradient(to bottom,#000 0 62%,transparent 62% 68%,#000 68% 82%,transparent 82% 88%,#000 88%)}
@keyframes gridmove{to{background-position:0 0,0 -48px}}`,
});

/* 5 — SPEED DIAL FAB */
const speedDial = doc({
  kind: "page",
  body: `
<div class="dial"><button class="fab" id="fab">＋</button>
  <a class="act a1" title="Like">♥</a><a class="act a2" title="Share">↗</a><a class="act a3" title="Bookmark">★</a><a class="act a4" title="Copy">⧉</a>
</div>`,
  css: `
body{display:block}
.dial{position:fixed;right:36px;bottom:36px}
.fab{width:60px;height:60px;border-radius:50%;font-size:28px;color:#fff;border:0;
  background:linear-gradient(135deg,var(--v1),var(--v2));box-shadow:0 10px 34px rgba(217,70,239,.5);
  position:relative;z-index:2;transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
.dial.open .fab{transform:rotate(135deg)}
.act{position:absolute;left:50%;bottom:12px;width:46px;height:46px;margin-left:-23px;border-radius:50%;
  display:grid;place-items:center;font-size:19px;text-decoration:none;color:#fff;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(8px);
  opacity:0;transform:translate(0,0) scale(.3);transition:all .35s cubic-bezier(.34,1.56,.64,1);pointer-events:none}
.dial.open .act{opacity:1;transform:translate(var(--x),var(--y)) scale(1);pointer-events:auto}
.a1{--x:0px;--y:-66px;background:linear-gradient(135deg,#f43f5e,#fb7185)}
.a2{--x:-48px;--y:-48px;background:linear-gradient(135deg,#22d3ee,#0ea5e9)}
.a3{--x:-66px;--y:0px;background:linear-gradient(135deg,#f59e0b,#fbbf24)}
.a4{--x:-48px;--y:48px;background:linear-gradient(135deg,#10b981,#34d399)}`,
  js: `
document.getElementById('fab').addEventListener('click',()=>{
  document.querySelector('.dial').classList.toggle('open');
});`,
});

/* 6 — SPLIT FLAP / ROLLING DEPARTURE BOARD TEXT */
const splitFlap = doc({
  body: `
<div class="flap-card"><div class="flap-label">NEXT DESTINATION</div><div id="flap" class="flap">MOTION VAULT</div><div class="flap-sub">letters roll like an airport split-flap board</div></div>`,
  css: `
.flap-card{border-radius:18px;border:1px solid rgba(255,170,0,.25);background:#120d04;padding:30px 34px;text-align:center;
  box-shadow:inset 0 0 60px rgba(255,170,0,.06)}
.flap-label{font-size:11px;letter-spacing:.4em;color:#b8860b;font-weight:700}
.flap{margin:14px 0 8px;font-family:'JetBrains Mono',monospace;font-size:clamp(26px,6vw,44px);font-weight:700;letter-spacing:.12em;
  color:#ffd97a;text-shadow:0 0 18px rgba(255,190,60,.55);display:flex;justify-content:center;gap:4px;min-height:1.2em}
.flap span{display:inline-block;animation:flap-in .5s cubic-bezier(.22,1,.36,1) both;transform-origin:top}
.flap-sub{font-size:12px;color:#8a7440}
@keyframes flap-in{0%{transform:rotateX(-90deg);opacity:0}60%{transform:rotateX(8deg)}100%{transform:rotateX(0);opacity:1}}`,
  js: `
const words=['MOTION VAULT','BUILD LOUDER','SHIP FAST','PROMPT IT','110 ASSETS'];
const el=document.getElementById('flap');
let wi=0;
function render(){
  const w=words[wi];el.innerHTML='';
  [...w].forEach((ch,i)=>{
    const s=document.createElement('span');
    s.textContent=ch===' '?'\\u00A0':ch;
    s.style.animationDelay=(i*45)+'ms';
    el.appendChild(s);
  });
  wi=(wi+1)%words.length;
}
render();setInterval(render,2600);`,
});

export const WAVE13_ITEMS: Item[] = [
  {
    id: "w13-glow",
    slug: "rotating-conic-glow-border-card",
    category: "elements",
    title: "Rotating conic glow border card",
    summary: "A 2px conic-gradient border slowly spins around a glass card via @property angle animation — pro upgrade cards.",
    author: "MotionVault",
    tags: ["card", "border", "gradient", "glow", "conic", "pricing"],
    tech: ["html", "css"],
    stars: 445, views: 0, copies: 0, featured: true, published: true,
    html: glowBorder,
    prompt:
      "Build a card with an animated rotating gradient border: an outer wrapper with 2px padding and a conic-gradient background (violet→fuchsia→cyan→emerald, looped) whose start angle is a CSS @property custom angle --a animated from 0 to 360deg over 5s linear. Inside, a solid dark inner card covers the center leaving the 2px glowing ring; include a PRO badge, heading, description and full-width gradient button. Add a @supports fallback to a static linear-gradient border for browsers without @property. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w13-neon",
    slug: "neon-signboard-flicker-text",
    category: "elements",
    title: "Neon signboard flicker text",
    summary: "Classic broken-sign flicker on neon-tube lettering with layered fuchsia/cyan text-shadow glow.",
    author: "MotionVault",
    tags: ["neon", "text", "flicker", "glow", "text-shadow", "retro"],
    tech: ["html", "css"],
    stars: 398, views: 0, copies: 0, featured: false, published: true,
    html: neonFlicker,
    prompt:
      "Create a neon signboard: huge white 'OPEN' text with layered fuchsia text-shadows (6px white, 18px/42px/82px magenta glow) and a smaller cyan '24 HRS' line with wide letter-spacing. A flicker keyframe animation drops opacity and shrinks the glow briefly at specific percentages (like a dying tube: dips around 20%, 24%, 55%) over a 4.5s loop, second line offset by 1.2s. Dark background, pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w13-blobs",
    slug: "morphing-blob-background",
    category: "animations",
    title: "Morphing fluid blob background",
    summary: "Three blurred, screen-blended gradient blobs drift, scale and morph border-radius for a liquid ambient background.",
    author: "MotionVault",
    tags: ["background", "blobs", "fluid", "ambient", "gradient", "mesh"],
    tech: ["html", "css"],
    stars: 432, views: 0, copies: 0, featured: true, published: true,
    html: blobs,
    prompt:
      "Design a full-screen fluid blob background: three large (30-44vmax) fixed circles in violet, fuchsia and cyan, heavily blurred (70px), opacity .55, mix-blend screen, placed at different corners. Each animates over 16-24s with keyframes that translate by several vmax, scale between .9 and 1.15, rotate ±40deg and morph border-radius between a circle and asymmetric elliptical values; one plays in reverse, one delayed. Bold gradient-clipped headline text centered above with z-index. Pure CSS, dark base, reduced-motion safe.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w13-floor",
    slug: "synthwave-perspective-grid-floor",
    category: "templates",
    title: "Synthwave perspective grid floor",
    summary: "Retrowave horizon: infinite scrolling perspective grid floor, striped setting sun, neon headline.",
    author: "MotionVault",
    tags: ["synthwave", "retrowave", "grid", "perspective", "sun", "hero", "80s"],
    tech: ["html", "css"],
    stars: 521, views: 0, copies: 0, featured: true, published: true,
    html: gridFloor,
    prompt:
      "Build a synthwave/retrowave hero scene with pure CSS: a dark #070312 page; a perspective floor made from a rotated (rotateX 72deg) element with dual linear-gradient grid lines in fuchsia that scrolls toward the viewer by animating background-position vertically on loop; a gradient sun (yellow→pink→purple) sitting at the horizon with horizontal stripe cutouts via repeating-linear-gradient mask and a glowing shadow; bold neon headline 'GRID RUNNER' in pink with cyan second line, glowing text-shadows. The grid fades in near the horizon with a mask. No JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w13-dial",
    slug: "radial-speed-dial-fab",
    category: "components",
    title: "Radial speed-dial floating action button",
    summary: "FAB springs open four glass action buttons in a radial arc; plus icon rotates into an x while open.",
    author: "MotionVault",
    tags: ["fab", "speed-dial", "menu", "radial", "floating", "spring"],
    tech: ["html", "css", "javascript"],
    stars: 367, views: 0, copies: 0, featured: false, published: true,
    html: speedDial,
    prompt:
      "Create a radial speed dial: a 60px gradient circular FAB pinned bottom-right; clicking toggles an 'open' class that rotates the plus icon 135deg and springs four 46px glass action buttons (heart, share, star, copy, each its own gradient) out along a quarter-circle arc using CSS custom properties --x/--y per button, with a bouncy cubic-bezier(.34,1.56,.64,1) transition and staggered feel. Buttons are opacity 0 / scaled .3 / pointer-events none when closed. Vanilla JS toggles a class.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w13-flap",
    slug: "split-flap-departure-board",
    category: "elements",
    title: "Split-flap departure board text",
    summary: "Letters flip in from -90deg like an airport split-flap board, cycling words on a timer — monospace amber glow.",
    author: "MotionVault",
    tags: ["text", "split-flap", "board", "monospace", "amber", "rotating", "typewriter"],
    tech: ["html", "css", "javascript"],
    stars: 402, views: 0, copies: 0, featured: false, published: true,
    html: splitFlap,
    prompt:
      "Build a split-flap departure-board readout: a dark warm-black card with an 'NEXT DESTINATION' label and a JetBrains Mono amber glowing word (text-shadow amber). Every 2.6s a new phrase renders letter by letter: JS clears the line and appends each character as a span with a staggered 45ms delay, and a CSS keyframe flips each span in from rotateX(-90deg) with a small overshoot at 60% (like a flap dropping), transform-origin top. Cycles through an array of uppercase phrases. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

import { Item } from "../types";
import { doc } from "./wrap";

// ================================================================ TEMPLATE: CRT retro pixel landing
const crt = doc({
  kind: "page",
  body: `
<div class="crt-flicker"></div>
<div class="crt-scan"></div>
<main class="crt-main">
  <pre class="crt-logo">
 ██████╗ ██████╗ ████████╗
 ██╔══██╗██╔══██╗╚══██╔══╝
 ██████╔╝██████╔╝   ██║
 ██╔═══╝ ██╔══██╗   ██║
 ██║     ██║  ██║   ██║
 ╚═╝     ╚═╝  ╚═╝   ╚═╝</pre>
  <p class="crt-type" id="type"></p>
  <div class="crt-actions">
    <a class="crt-btn">▶ INSERT COIN</a>
    <a class="crt-btn crt-alt">HI-SCORES</a>
  </div>
  <div class="crt-stats">
    <span>SCORE <b id="score">000000</b></span>
    <span>LV <b>01</b></span>
    <span class="crt-blink">PRESS START</span>
  </div>
  <p class="crt-foot">© 1986-2026 CRT SYSTEMS · 60HZ · NO SIGNAL WAS HARMED</p>
</main>`,
  css: `
body{background:#021a0a;--phos:#33ff66;--phos2:#1b8f3c;--amber:#ffb000}
.crt-main{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 5vw;text-align:center;font-family:'Courier New',ui-monospace,monospace;color:var(--phos);text-shadow:0 0 8px rgba(51,255,102,.7),0 0 22px rgba(51,255,102,.35)}
.crt-logo{font-size:clamp(6px,1.6vw,14px);line-height:1.15;color:var(--phos);white-space:pre;margin-bottom:34px;animation:crtOn 1.1s ease both}
@keyframes crtOn{0%{opacity:0;transform:scale(1.6);filter:brightness(8)}60%{opacity:1;transform:scale(.96);filter:brightness(2)}100%{transform:scale(1);filter:brightness(1)}}
.crt-type{font-size:clamp(14px,2.4vw,22px);min-height:2em;color:var(--phos);max-width:640px;line-height:1.6}
.crt-type::after{content:'_';animation:crtblink .8s steps(1) infinite}
@keyframes crtblink{50%{opacity:0}}
.crt-actions{display:flex;gap:18px;margin:36px 0 30px;flex-wrap:wrap;justify-content:center}
.crt-btn{border:2px solid var(--phos);padding:12px 24px;font-weight:700;letter-spacing:.15em;font-size:14px;box-shadow:0 0 18px -4px rgba(51,255,102,.7);transition:all .15s;text-shadow:inherit}
.crt-btn:hover{background:var(--phos);color:#021a0a;text-shadow:none}
.crt-alt{border-color:var(--amber);color:var(--amber);box-shadow:0 0 18px -4px rgba(255,176,0,.7);text-shadow:0 0 8px rgba(255,176,0,.7)}
.crt-alt:hover{background:var(--amber);color:#021a0a;text-shadow:none}
.crt-stats{display:flex;gap:34px;font-size:14px;letter-spacing:.2em;color:var(--phos2)}
.crt-stats b{color:var(--phos)}
.crt-blink{animation:crtblink 1s steps(1) infinite;color:var(--amber)}
.crt-foot{position:fixed;bottom:18px;font-size:11px;color:var(--phos2);letter-spacing:.15em}
.crt-scan{position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.28) 0 2px,transparent 2px 4px);z-index:5;mix-blend-mode:multiply}
.crt-flicker{position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.55) 100%);z-index:6;animation:crtflick 4s infinite}
@keyframes crtflick{0%,96%,100%{opacity:1}97%{opacity:.75}98%{opacity:.95}}
`,
  js: `
const lines=['> BOOTING CRT.EXE ...','> LOADING 64 SPRITES INTO MEMORY...','> WELCOME, PLAYER ONE.','> YOUR QUE AWAITS: BUILD WEBSITES THAT FEEL LIKE ARCADE CABINETS.'];
const el=document.getElementById('type');let li=0,ci=0;
(function type(){
  if(li<lines.length){
    if(ci<=lines[li].length){el.textContent=lines[li].slice(0,ci);ci++;setTimeout(type,42)}
    else{ci=0;li++;setTimeout(type,700)}
  }else{setTimeout(()=>{el.textContent='';li=0;ci=0;type()},3000)}
})();
let score=0;const sc=document.getElementById('score');
setInterval(()=>{score=(score+137)%1000000;sc.textContent=String(score).padStart(6,'0')},260);
`,
});

// ================================================================ COMPONENT: CSS 3D cube navigation
const cubeNav = doc({
  body: `
<div class="cn-scene">
  <div class="cn-cube" id="cube">
    <div class="cn-face cn-front"><b>HOME</b></div>
    <div class="cn-face cn-back"><b>DOCS</b></div>
    <div class="cn-face cn-right"><b>COMPONENTS</b></div>
    <div class="cn-face cn-left"><b>PRICING</b></div>
    <div class="cn-face cn-top"><b>✦ VAULT</b></div>
    <div class="cn-face cn-bottom"><b>ABOUT</b></div>
  </div>
  <p class="cn-hint">Hover or press <b>← → ↑ ↓</b> to rotate</p>
</div>`,
  css: `
.cn-scene{perspective:900px;display:grid;place-items:center;min-height:66vh;gap:30px}
.cn-cube{position:relative;width:200px;height:200px;transform-style:preserve-3d;transition:transform .9s cubic-bezier(.22,1,.36,1);transform:rotateX(-24deg) rotateY(32deg)}
.cn-face{position:absolute;inset:0;display:grid;place-items:center;border:1.5px solid rgba(34,211,238,.5);background:linear-gradient(160deg,rgba(34,211,238,.1),rgba(139,92,246,.13));backdrop-filter:blur(4px);font-family:var(--font-mono,monospace);letter-spacing:.18em;font-size:15px;color:#a5f3fc;text-shadow:0 0 14px rgba(34,211,238,.8);box-shadow:inset 0 0 40px rgba(139,92,246,.25)}
.cn-front{transform:translateZ(100px)}
.cn-back{transform:rotateY(180deg) translateZ(100px)}
.cn-right{transform:rotateY(90deg) translateZ(100px)}
.cn-left{transform:rotateY(-90deg) translateZ(100px)}
.cn-top{transform:rotateX(90deg) translateZ(100px)}
.cn-bottom{transform:rotateX(-90deg) translateZ(100px)}
.cn-hint{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:center}
`,
  js: `
const cube=document.getElementById('cube');
let rx=-24,ry=32;
function render(){cube.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)'}
addEventListener('keydown',e=>{
  if(e.key==='ArrowRight')ry+=90;if(e.key==='ArrowLeft')ry-=90;
  if(e.key==='ArrowUp')rx-=90;if(e.key==='ArrowDown')rx+=90;render();
});
let hovering=false;
cube.addEventListener('pointerenter',()=>{hovering=true});
cube.addEventListener('pointerleave',()=>{hovering=false});
setInterval(()=>{if(hovering)ry+=1.2,render()},24);
`,
});

// ================================================================ ELEMENT: Skeleton card shimmer
const skeleton = doc({
  body: `
<div class="sk-grid">
  ${[1, 2, 3].map((n) => `<div class="sk-card">
    <div class="sk-img sk-shine"></div>
    <div class="sk-lines">
      <div class="sk-bar sk-w70 sk-shine"></div>
      <div class="sk-bar sk-w100 sk-shine"></div>
      <div class="sk-bar sk-w85 sk-shine"></div>
      <div class="sk-row">
        <div class="sk-chip sk-shine"></div><div class="sk-chip sk-shine"></div><div class="sk-chip sk-shine"></div>
      </div>
    </div>
  </div>`).join("")}
</div>
<p style="position:fixed;bottom:26px;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim)">Loading placeholders</p>`,
  css: `
.sk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;width:min(860px,92vw)}
.sk-card{border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--panel)}
.sk-img{aspect-ratio:16/10}
.sk-lines{padding:16px;display:flex;flex-direction:column;gap:11px}
.sk-bar{height:12px;border-radius:6px;background:rgba(255,255,255,.06)}
.sk-w100{width:100%}.sk-w85{width:85%}.sk-w70{width:70%;height:16px}
.sk-row{display:flex;gap:8px;margin-top:6px}
.sk-chip{width:52px;height:22px;border-radius:999px;background:rgba(255,255,255,.06)}
.sk-shine{position:relative;overflow:hidden}
.sk-shine::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.09) 50%,transparent 70%);background-size:200% 100%;animation:skmove 1.3s linear infinite}
@keyframes skmove{to{background-position:-200% 0}}
`,
});

// ================================================================ ELEMENT: Star rating with spring pop
const starRating = doc({
  body: `
<div class="sr-wrap">
  <div class="sr-stars" id="stars">
    ${[1, 2, 3, 4, 5].map((n) => `<button class="sr-star" data-v="${n}">★</button>`).join("")}
  </div>
  <p class="sr-text" id="srText">Hover to rate</p>
</div>`,
  css: `
.sr-wrap{display:flex;flex-direction:column;align-items:center;gap:18px}
.sr-stars{display:flex;gap:10px;flex-direction:row-reverse}
.sr-star{background:none;border:none;font-size:44px;line-height:1;color:rgba(255,255,255,.18);transition:transform .25s cubic-bezier(.34,1.8,.64,1),color .2s;cursor:pointer;text-shadow:none}
.sr-star:hover,.sr-star:hover~.sr-star{color:#fbbf24;text-shadow:0 0 20px rgba(251,191,36,.6);transform:scale(1.18) rotate(-8deg)}
.sr-star.sr-on{color:#fbbf24;text-shadow:0 0 20px rgba(251,191,36,.6)}
.sr-star.sr-pop{animation:srpop .5s cubic-bezier(.34,1.8,.64,1)}
@keyframes srpop{40%{transform:scale(1.5) rotate(12deg)}70%{transform:scale(.9)}100%{transform:scale(1)}}
.sr-text{font-size:14px;letter-spacing:.1em;color:var(--dim);min-height:1.4em}
`,
  js: `
const labels=['Terrible','Meh','Okay','Good','Legendary ✦'];
const stars=[...document.querySelectorAll('.sr-star')];
const txt=document.getElementById('srText');
stars.forEach(s=>{
  s.addEventListener('pointerenter',()=>{txt.textContent=labels[+s.dataset.v-1]});
  s.addEventListener('click',()=>{
    const v=+s.dataset.v;
    stars.forEach(x=>{
      const on=+x.dataset.v<=v;
      x.classList.toggle('sr-on',on);
      if(on){x.classList.remove('sr-pop');void x.offsetWidth;x.classList.add('sr-pop')}
    });
    txt.textContent='You rated '+v+' — '+labels[v-1];
  });
});
`,
});

// ================================================================ ANIMATION: Parallax depth layers
const parallax = doc({
  kind: "page",
  body: `
<div class="px-wrap">
  <div class="px-layer px-sky"></div>
  <div class="px-layer px-moon">☾</div>
  <div class="px-layer px-mount px-m1"></div>
  <div class="px-layer px-mount px-m2"></div>
  <div class="px-layer px-mount px-m3"></div>
  <div class="px-hud">
    <h1>PARALLAX DEPTH</h1>
    <p>Move your mouse — 5 layers drift at different speeds.</p>
  </div>
</div>`,
  css: `
.px-wrap{position:fixed;inset:0;overflow:hidden;background:linear-gradient(180deg,#0b0b24 0%,#1b1145 55%,#2a1660 100%)}
.px-layer{position:absolute;inset:0;will-change:transform}
.px-moon{font-size:120px;color:#fef9c3;text-shadow:0 0 60px rgba(254,249,195,.5);top:6%;left:62%;height:auto;inset:auto}
.px-mount{bottom:0;clip-path:polygon(0 100%,0 62%,8% 50%,16% 66%,26% 40%,36% 62%,46% 44%,58% 68%,70% 38%,82% 60%,92% 48%,100% 64%,100% 100%)}
.px-m1{background:linear-gradient(180deg,#3b2a7a,#241850);height:56%;filter:blur(1px);opacity:.7}
.px-m2{background:linear-gradient(180deg,#2a1d60,#170f3e);height:44%;clip-path:polygon(0 100%,0 70%,12% 52%,24% 74%,38% 44%,52% 70%,66% 48%,78% 72%,90% 54%,100% 66%,100% 100%)}
.px-m3{background:linear-gradient(180deg,#120c33,#0a0722);height:32%;clip-path:polygon(0 100%,0 78%,10% 60%,22% 80%,34% 58%,48% 78%,62% 62%,74% 82%,86% 66%,100% 78%,100% 100%)}
.px-hud{position:relative;z-index:10;display:grid;place-items:center;height:100%;text-align:center;pointer-events:none}
.px-hud h1{font-size:clamp(32px,6vw,68px);font-weight:900;letter-spacing:.04em;text-shadow:0 6px 40px rgba(0,0,0,.6)}
.px-hud p{margin-top:14px;color:rgba(236,234,249,.7);letter-spacing:.08em}
`,
  js: `
const layers={moon:document.querySelector('.px-moon'),m1:document.querySelector('.px-m1'),m2:document.querySelector('.px-m2'),m3:document.querySelector('.px-m3'),hud:document.querySelector('.px-hud')};
let tx=0,ty=0,x=0,y=0;
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5});
(function loop(){
  x+=(tx-x)*.06;y+=(ty-y)*.06;
  layers.moon.style.transform='translate('+x*-34+'px,'+y*-26+'px)';
  layers.m1.style.transform='translate('+x*14+'px,'+y*8+'px)';
  layers.m2.style.transform='translate('+x*30+'px,'+y*16+'px)';
  layers.m3.style.transform='translate('+x*54+'px,'+y*26+'px)';
  layers.hud.style.transform='translate('+x*-8+'px,'+y*-6+'px)';
  requestAnimationFrame(loop);
})();
`,
});

// ================================================================ ANIMATION: Orbiting ring menu
const orbitMenu = doc({
  body: `
<div class="om-scene">
  <div class="om-rings">
    <div class="om-ring om-r1"></div>
    <div class="om-ring om-r2"></div>
    <div class="om-core"><b>ORBIT</b><span>MENU</span></div>
    ${["HOME", "WORK", "BLOG", "SHOP", "LABS", "ABOUT", "JOIN", "DOCS"]
      .map((l, i) => `<button class="om-node" style="--i:${i};--n:8"><span>${l}</span></button>`)
      .join("")}
  </div>
  <p class="om-hint">Hover the ring to slow / reverse</p>
</div>`,
  css: `
.om-scene{display:grid;place-items:center;min-height:66vh}
.om-rings{position:relative;width:420px;height:420px;max-width:86vw;max-height:86vw}
.om-ring{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(139,92,246,.35)}
.om-r2{inset:70px;border-color:rgba(34,211,238,.3);animation:omspin 22s linear infinite reverse}
.om-r1{animation:omspin 40s linear infinite}
@keyframes omspin{to{transform:rotate(360deg)}}
.om-core{position:absolute;inset:130px;border-radius:50%;display:grid;place-content:center;text-align:center;background:radial-gradient(circle at 35% 30%,rgba(217,70,239,.35),rgba(139,92,246,.15) 60%,rgba(10,10,25,.9));border:1px solid rgba(255,255,255,.15);box-shadow:0 0 60px -10px rgba(217,70,239,.7);z-index:3}
.om-core b{font-size:22px;letter-spacing:.2em}
.om-core span{font-size:11px;letter-spacing:.35em;color:var(--c1)}
.om-node{position:absolute;top:50%;left:50%;width:0;height:0;background:none;border:none;padding:0;z-index:2;
  transform:rotate(calc(var(--i)*360deg/var(--n))) translateX(210px);
  animation:omcounter 40s linear infinite;
}
.om-node span{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;font-family:var(--font-mono,monospace);font-size:12px;letter-spacing:.18em;color:var(--dim);border:1px solid var(--line);background:rgba(10,10,25,.85);padding:7px 14px;border-radius:999px;transition:all .25s;cursor:pointer}
.om-node span:hover{color:#fff;border-color:var(--c1);box-shadow:0 0 20px -4px rgba(34,211,238,.8);transform:translate(-50%,-50%) scale(1.15)}
@keyframes omcounter{to{transform:rotate(calc(var(--i)*360deg/var(--n) + 360deg)) translateX(210px)}}
.om-rings:hover .om-node,.om-rings:hover .om-r1{animation-play-state:paused}
.om-hint{position:fixed;bottom:26px;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim)}
`,
});

export const WAVE6_ITEMS: Item[] = [
  {
    id: "w6-crt-landing",
    slug: "crt-retro-arcade-landing",
    category: "templates",
    title: "CRT Retro Arcade Landing",
    summary: "Phosphor-green CRT terminal page: ASCII logo, typewriter boot sequence, scanlines, flicker and INSERT COIN buttons.",
    author: "MotionVault",
    tags: ["retro", "crt", "pixel", "arcade", "terminal", "scanlines"],
    tech: ["html", "css", "javascript"],
    stars: 448,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: crt,
    prompt:
      "Create a single-file retro CRT arcade landing page. Aesthetic: dark green-black screen (#021a0a), phosphor green (#33ff66) monospace text with text-shadow glow, amber accent. Include: an ASCII-art block logo with a CRT power-on animation (scale+brightness flash); a typewriter sequence cycling boot messages with blinking cursor; INSERT COIN style bordered buttons that invert colors on hover; a live-updating 6-digit score counter; PRESS START blinking text; fixed footer copyright. Overlay fixed scanlines (repeating-linear-gradient dark lines, multiply blend) and a vignette flicker layer animating opacity subtly. Pure inline CSS/JS.",
    status: "curated",
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-01T09:00:00.000Z",
  },
  {
    id: "w6-cube-nav",
    slug: "css-3d-cube-navigation",
    category: "components",
    title: "CSS 3D Cube Navigation",
    summary: "A real six-face 3D cube you rotate with arrow keys or hover — each face is a nav destination, neon-edged and glassy.",
    author: "MotionVault",
    tags: ["3d", "cube", "navigation", "css-3d", "interactive"],
    tech: ["html", "css", "javascript"],
    stars: 387,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: cubeNav,
    prompt:
      "Build a CSS 3D cube navigation menu in a perspective scene. Six 200px cube faces positioned with translateZ/rotateY/rotateX transforms inside a preserve-3d rotating cube: HOME (front), DOCS (back), COMPONENTS (right), PRICING (left), a glowing ✦ VAULT top, ABOUT bottom. Faces have thin cyan borders, translucent gradient fills, inner glow shadows and tracked-out monospace labels with neon text-shadow. Arrow keys rotate the cube in 90-degree steps with a springy cubic-bezier transition; hovering auto-rotates slowly. Add a hint caption. No libraries.",
    status: "curated",
    createdAt: "2026-09-01T09:05:00.000Z",
    updatedAt: "2026-09-01T09:05:00.000Z",
  },
  {
    id: "w6-skeleton",
    slug: "shimmer-skeleton-loading-cards",
    category: "elements",
    title: "Shimmer Skeleton Loading Cards",
    summary: "Three placeholder cards with the brand-hue moving shine — drop in anywhere data is loading.",
    author: "MotionVault",
    tags: ["skeleton", "loading", "shimmer", "placeholder", "uikit"],
    tech: ["html", "css"],
    stars: 214,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: skeleton,
    prompt:
      "Create skeleton loading card placeholders: a responsive 3-column grid of rounded cards each with a 16:10 image block and several text bars of varying widths (70/85/100%) plus three pill chips. Every placeholder uses a subtle translucent base fill and an ::after diagonal light band animating background-position from 200% to -200% in a 1.3s linear loop for the shimmer effect. Dark theme, matching line/panel tokens. Pure CSS animation, no JS.",
    status: "curated",
    createdAt: "2026-09-01T09:10:00.000Z",
    updatedAt: "2026-09-01T09:10:00.000Z",
  },
  {
    id: "w6-star-rating",
    slug: "spring-pop-star-rating",
    category: "elements",
    title: "Spring-Pop Star Rating",
    summary: "Five oversized stars with overshoot spring animation, glow and live label (Terrible → Legendary).",
    author: "MotionVault",
    tags: ["rating", "stars", "form", "spring", "micro-interaction"],
    tech: ["html", "css", "javascript"],
    stars: 263,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: starRating,
    prompt:
      "Build a 5-star rating widget. Stars laid out with flex-direction: row-reverse so hovering one lights it plus all lower stars (sibling selector). Inactive stars are dim white; active/hovered are amber (#fbbf24) with a warm glow shadow, scale up 1.18 and tilt. On click, each newly-lit star replays an overshoot pop animation (scale to 1.5 with rotation then back, cubic-bezier(.34,1.8,.64,1)). A caption updates live from Terrible/Meh/Okay/Good/Legendary and confirms the chosen rating. Vanilla JS, large 44px stars.",
    status: "curated",
    createdAt: "2026-09-01T09:15:00.000Z",
    updatedAt: "2026-09-01T09:15:00.000Z",
  },
  {
    id: "w6-parallax",
    slug: "mouse-parallax-depth-layers",
    category: "animations",
    title: "Mouse Parallax Depth Scene",
    summary: "Moon and three mountain ranges drift at different speeds against the cursor — instant cinematic depth.",
    author: "MotionVault",
    tags: ["parallax", "depth", "landscape", "mouse", "layers"],
    tech: ["html", "css", "javascript"],
    stars: 339,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: parallax,
    prompt:
      "Create a full-screen parallax night landscape. Layers: gradient night sky, a glowing crescent moon glyph, and three mountain silhouettes built with clip-path polygons (far range blurred/violet, mid indigo, near near-black), plus a centered headline overlay. A pointermove handler computes normalized cursor offset; a requestAnimationFrame lerp loop (factor .06) translates each layer by a different multiplier (moon -34px far, mountains +14/+30/+54px near) creating depth. Smooth easing, no libraries.",
    status: "curated",
    createdAt: "2026-09-01T09:20:00.000Z",
    updatedAt: "2026-09-01T09:20:00.00Z",
  },
  {
    id: "w6-orbit-menu",
    slug: "orbiting-ring-menu",
    category: "animations",
    title: "Orbiting Ring Menu",
    summary: "Eight nav pills orbit a glowing core on a circular path — counter-rotation keeps labels upright; hover pauses.",
    author: "MotionVault",
    tags: ["orbit", "menu", "circular", "rotation", "nav"],
    tech: ["html", "css", "javascript"],
    stars: 301,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: orbitMenu,
    prompt:
      "Build a circular orbiting menu. A central glowing core disc (radial gradient, neon border, 'ORBIT MENU' label) sits inside two dashed rotating rings spinning opposite directions. Eight nav pill nodes are evenly spaced around a 210px orbit using per-node --i custom property: each node wrapper rotates (i*360/n degrees) then translates outward, and runs a counter-rotating keyframe animation so the full orbit slowly turns while pills stay readable. Pills are monospace outlined chips that glow cyan on hover; hovering the scene pauses animation. Pure CSS transforms + tiny JS for n=8.",
    status: "curated",
    createdAt: "2026-09-01T09:25:00.000Z",
    updatedAt: "2026-09-01T09:25:00.00Z",
  },
];

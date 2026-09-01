import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T23:30:00.000Z";

/* 1 — SCRAMBLE TEXT DECODE */
const scramble = doc({
  body: `<h1 class="sc" id="sc">DECRYPTED</h1>`,
  css: `
h1.sc{font-family:'JetBrains Mono',monospace;font-size:clamp(34px,8vw,84px);font-weight:700;letter-spacing:.08em;
  background:linear-gradient(90deg,#22d3ee,#d946ef);-webkit-background-clip:text;background-clip:text;color:transparent;
  cursor:pointer}
h1.sc::after{content:'_';-webkit-text-fill-color:#d946ef;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}`,
  js: `
const el=document.getElementById('sc');
const target=el.textContent;const CHARS='!<>-_\\/[]{}—=+*^?#';
function run(){
  let frame=0;const len=target.length;
  const iv=setInterval(()=>{
    let out='';
    for(let i=0;i<len;i++){
      if(i<frame/2)out+=target[i];
      else out+=CHARS[Math.random()*CHARS.length|0];
    }
    el.textContent=out;frame++;
    if(frame/2>=len){clearInterval(iv);el.textContent=target;}
  },40);
}
el.onclick=run;run();setInterval(run,4200);`,
});

/* 2 — MORPHING GHOST BUTTON (follow ring cursor?) no — border-beam card */
const borderBeam = doc({
  body: `
<div class="bb"><div class="bb-in"><h3>Border beam</h3><p>A light particle orbits this card on the border forever.</p><button class="bb-btn">Try it</button></div></div>`,
  css: `
.bb{position:relative;width:min(330px,100%);border-radius:22px;padding:1px;background:rgba(255,255,255,.08)}
.bb-in{border-radius:21px;background:#0c0c1d;padding:28px;position:relative;overflow:hidden}
.bb::before{content:'';position:absolute;inset:0;border-radius:22px;padding:1px;
  background:conic-gradient(from var(--a,0deg),transparent 0 70%,#22d3ee 82%,#fff 88%,#d946ef 94%,transparent 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  animation:orbit 3.5s linear infinite}
@property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes orbit{to{--a:360deg}}
.bb-in h3{font-size:22px;margin-bottom:8px}.bb-in p{font-size:13px;color:var(--dim);line-height:1.7;margin-bottom:18px}
.bb-btn{background:linear-gradient(90deg,var(--c1,var(--v1)),var(--v2));color:#fff;border:0;border-radius:11px;padding:11px 22px;font-weight:700;font-size:13px}`,
});

/* 3 — GOOEY MENU (svg filter) */
const gooey = doc({
  body: `
<button class="goo-fab" id="fab2">＋</button>
<div class="goo-menu" id="gm">
  <a>♥</a><a>★</a><a>↗</a><a>⚙</a>
</div>
<svg width="0" height="0"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 22 -10" result="g"/><feBlend in="SourceGraphic" in2="g"/></filter></defs></svg>`,
  css: `
body{display:block}
.goo-menu{position:fixed;left:50%;bottom:40px;transform:translateX(-50%);display:flex;gap:14px;align-items:center;
  filter:url(#goo)}
.goo-menu a{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;font-size:20px;color:#fff;text-decoration:none;
  background:linear-gradient(135deg,var(--v1),var(--v2));transition:transform .4s cubic-bezier(.34,1.56,.64,1),margin .4s,opacity .3s;
  margin:0 -45px;opacity:0}
.goo-menu.open a{margin:0;opacity:1}
.goo-menu a:nth-child(1){transition-delay:.05s}.goo-menu a:nth-child(2){transition-delay:.1s}
.goo-menu a:nth-child(3){transition-delay:.15s}.goo-menu a:nth-child(4){transition-delay:.2s}
.goo-fab{position:fixed;left:50%;bottom:38px;transform:translateX(-50%);width:64px;height:64px;border-radius:50%;z-index:5;
  border:0;background:linear-gradient(135deg,#22d3ee,#d946ef);color:#fff;font-size:30px;cursor:pointer;
  box-shadow:0 10px 34px rgba(217,70,239,.5);transition:transform .4s}
.goo-fab.open{transform:translateX(-50%) rotate(135deg)}`,
  js: `
const f=document.getElementById('fab2'),m=document.getElementById('gm');
f.onclick=()=>{f.classList.toggle('open');m.classList.toggle('open');};`,
});

/* 4 — STARFIELD WARP (canvas) */
const warp = doc({
  kind: "page",
  body: `<canvas id="wp"></canvas><h1 class="wp-h">WARP<span>click to boost</span></h1>`,
  css: `
#wp{position:fixed;inset:0;width:100%;height:100%}
.wp-h{position:relative;height:100vh;display:grid;place-content:center;text-align:center;pointer-events:none;
  font-size:clamp(44px,9vw,96px);font-weight:900;letter-spacing:.04em}
.wp-h span{display:block;font-size:13px;letter-spacing:.4em;text-transform:uppercase;color:var(--dim);margin-top:12px}`,
  js: `
const cv=document.getElementById('wp'),ctx=cv.getContext('2d');
let W,H;function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;}rs();addEventListener('resize',rs);
const N=220,stars=[];
function newStar(s){s.x=(Math.random()-.5)*W;s.y=(Math.random()-.5)*H;s.z=s.z||Math.random()*W;s.pz=s.z;return s;}
for(let i=0;i<N;i++)stars.push(newStar({}));
let boost=1;
addEventListener('pointerdown',()=>{boost=4;});addEventListener('pointerup',()=>{boost=1;});
function loop(){
  ctx.fillStyle='rgba(7,7,17,.35)';ctx.fillRect(0,0,W,H);
  ctx.translate(W/2,H/2);
  for(const st of stars){
    st.pz=st.z;st.z-=14*boost;
    if(st.z<1)newStar(st);
    const sx=st.x/st.z*W*.5,sy=st.y/st.z*H*.5;
    const px=st.x/st.pz*W*.5,py=st.y/st.pz*H*.5;
    const r=Math.max(.4,(1-st.z/W)*3);
    ctx.strokeStyle='rgba(217,70,239,'+(1-st.z/W)+')';
    ctx.lineWidth=r;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(sx,sy);ctx.stroke();
  }
  ctx.setTransform(1,0,0,1,0,0);
  requestAnimationFrame(loop);
}
loop();`,
});

/* 5 — COPY SUCCESS CHECKMARK DRAW */
const checkDraw = doc({
  body: `
<button id="cb2" class="cdb">
<svg viewBox="0 0 52 52" class="ck"><circle cx="26" cy="26" rx="24" fill="none"/><path fill="none" d="M14 27l8 8 16-16"/></svg>
<span class="cdb-t">Copy prompt</span></button>`,
  css: `
.cdb{position:relative;background:rgba(255,255,255,.06);border:1px solid var(--line);color:#fff;border-radius:14px;
  padding:14px 26px 14px 58px;font-weight:800;font-size:14px;cursor:pointer;transition:border-color .3s,background .3s}
.cdb:hover{border-color:rgba(52,211,153,.5)}
.ck{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:24px;height:24px}
.ck circle{stroke:#34d399;stroke-width:3;stroke-dasharray:160;stroke-dashoffset:160}
.ck path{stroke:#34d399;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:48;stroke-dashoffset:48}
.cdb.done{border-color:rgba(52,211,153,.6);background:rgba(16,185,129,.12)}
.cdb.done .ck circle{animation:draw .5s ease forwards}
.cdb.done .ck path{animation:draw .3s .4s ease forwards}
@keyframes draw{to{stroke-dashoffset:0}}`,
  js: `
const b=document.getElementById('cb2');
b.onclick=()=>{
  b.classList.add('done');b.querySelector('.cdb-t').textContent='Copied!';
  setTimeout(()=>{b.classList.remove('done');b.querySelector('.cdb-t').textContent='Copy prompt';},1800);
};`,
});

/* 6 — LIQUID WATER RIPPLE BUTTON (click waves) */
const liquidBtn = doc({
  body: `<button class="lq" id="lq"><span>Liquid click</span></button>`,
  css: `
.lq{position:relative;overflow:hidden;border:0;border-radius:999px;padding:18px 44px;font-size:16px;font-weight:800;
  color:#fff;background:linear-gradient(90deg,#0ea5e9,#7c3aed 55%,#d946ef);cursor:pointer;
  box-shadow:0 14px 44px rgba(124,58,237,.45);transition:transform .15s}
.lq:active{transform:scale(.96)}
.lq span{position:relative;z-index:2}
.wave{position:absolute;border-radius:50%;background:rgba(255,255,255,.35);transform:translate(-50%,-50%);
  pointer-events:none;animation:wave .7s ease-out forwards;z-index:1}
@keyframes wave{from{width:0;height:0;opacity:.7}to{width:420px;height:420px;opacity:0}}`,
  js: `
const b=document.getElementById('lq');
b.addEventListener('click',e=>{
  const r=b.getBoundingClientRect();
  const w=document.createElement('i');w.className='wave';
  w.style.left=(e.clientX-r.left)+'px';w.style.top=(e.clientY-r.top)+'px';
  b.appendChild(w);setTimeout(()=>w.remove(),700);
});`,
});

export const WAVE21_ITEMS: Item[] = [
  {
    id: "w21-scramble",
    slug: "scramble-decode-text-effect",
    category: "elements",
    title: "Scramble decode text effect",
    summary: "Text resolves from random glyphs into the target word like decryption, with a blinking block cursor; loops and re-runs on click.",
    author: "MotionVault",
    tags: ["text", "scramble", "decode", "hacker", "monospace", "typing"],
    tech: ["html", "css", "javascript"],
    stars: 487, views: 0, copies: 0, featured: true, published: true,
    html: scramble,
    prompt:
      "Build a scramble/decode text effect: a monospace gradient headline starts as random symbols from a glyph set and progressively locks in characters left-to-right on a 40ms interval until the full target word appears, then repeats every few seconds and on click; include a blinking block cursor after the text. Vanilla JS interval building the mixed output string, no libraries.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w21-beam",
    slug: "orbiting-border-beam-card",
    category: "elements",
    title: "Orbiting border beam card",
    summary: "A bright light travels around the card's border via an animated conic-gradient mask and @property angle.",
    author: "MotionVault",
    tags: ["card", "border", "beam", "animation", "glow", "conic"],
    tech: ["html", "css"],
    stars: 465, views: 0, copies: 0, featured: true, published: true,
    html: borderBeam,
    prompt:
      "Create a card with an orbiting light beam on its border: a 1px padded wrapper whose ::before draws a conic-gradient ring that is mostly transparent with a short bright segment (cyan→white→fuchsia around 80-95% of the circle), masked to only the padding ring using the mask-composite xor trick; rotate the gradient start via a CSS @property --angle custom property animated 0→360 over 3.5s linear forever. Inner solid dark card with title, copy and a small button. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w21-goo",
    slug: "gooey-svg-filter-fab-menu",
    category: "components",
    title: "Gooey SVG-filter FAB menu",
    summary: "Action blobs merge and separate like liquid as they fan out — the classic SVG goo (gaussian blur + colormatrix) menu.",
    author: "MotionVault",
    tags: ["menu", "goo", "svg-filter", "fab", "morph", "liquid"],
    tech: ["html", "css", "javascript"],
    stars: 421, views: 0, copies: 0, featured: true, published: true,
    html: gooey,
    prompt:
      "Build a gooey FAB menu: a fixed bottom-center plus button toggles a horizontal row of four circular action buttons that spread outward. Apply an SVG goo filter (feGaussianBlur stdDeviation 8 + feColorMatrix alpha multiplier 22/-10 then blend with source) to the menu container so overlapping circles merge like liquid; buttons start collapsed with huge negative margins and opacity 0, then expand with spring cubic-bezier and per-button delays when 'open'. The plus rotates 45deg into an x. Vanilla JS class toggle.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w21-warp",
    slug: "canvas-starfield-warp-speed",
    category: "animations",
    title: "Canvas starfield warp speed",
    summary: "Stars stream from the center as lines that stretch with velocity — click/hold to engage warp boost.",
    author: "MotionVault",
    tags: ["particles", "starfield", "warp", "canvas", "space", "speed"],
    tech: ["html", "css", "javascript"],
    stars: 529, views: 0, copies: 0, featured: true, published: true,
    html: warp,
    prompt:
      "Build a canvas starfield warp effect: 220 stars with random x/y and z depth; each frame move the origin to screen center, decrease z by speed (14×, boosted 4× while the mouse is pressed), project each star to 2D by dividing x/z with perspective scaling, and draw a line from its previous projected position to the new one so closer stars appear as longer streaks; alpha and line width scale with proximity. Trails fade via a translucent fillRect overlay. Stars past the camera respawn. requestAnimationFrame, resize-aware, vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w21-check",
    slug: "stroke-draw-success-checkmark",
    category: "elements",
    title: "Stroke-draw success checkmark",
    summary: "On action the button draws a circle then a check via stroke-dashoffset animation and tints green — completion feedback.",
    author: "MotionVault",
    tags: ["checkmark", "success", "svg", "stroke-dash", "button", "feedback"],
    tech: ["html", "css", "javascript"],
    stars: 358, views: 0, copies: 0, featured: false, published: true,
    html: checkDraw,
    prompt:
      "Build a copy button with a stroke-drawn success state: a pill button with an inline SVG icon (circle + check path) on the left; the circle and path have stroke-dasharray equal to their lengths and full dashoffset initially. When clicked, add a 'done' class that plays the circle drawing in .5s then the check in .3s via dashoffset-to-0 keyframes, tints the button green, and flips label to 'Copied!'; resets after 1.8s. Vanilla JS toggling the class.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w21-liquid",
    slug: "liquid-ripple-click-button",
    category: "components",
    title: "Liquid ripple click button",
    summary: "Soft white ripples expand from the exact click point on a gradient pill, animating size and fade then self-removing.",
    author: "MotionVault",
    tags: ["button", "ripple", "click", "wave", "material", "micro-interaction"],
    tech: ["html", "css", "javascript"],
    stars: 372, views: 0, copies: 0, featured: false, published: true,
    html: liquidBtn,
    prompt:
      "Create a material-style liquid ripple button: a rounded gradient pill (cyan→violet→fuchsia) with overflow hidden; clicking spawns an absolutely-positioned white translucent circle at the pointer position inside the button, which animates from 0 to 420px diameter while fading out over .7s ease-out, then removes itself from the DOM. Label sits above ripples via z-index. Button press scales to .96. Vanilla JS creating elements per click.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

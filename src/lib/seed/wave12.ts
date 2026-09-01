import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T15:00:00.000Z";

/* 1 — AUDIO WAVEFORM VISUALIZER (simulated audio bars, click to toggle) */
const waveform = doc({
  body: `
<div class="wf-card">
  <div class="wf-bars" id="bars"></div>
  <button id="wfBtn" class="wf-btn">▶ Play</button>
</div>`,
  css: `
.wf-card{width:min(460px,100%);border:1px solid var(--line);border-radius:22px;padding:28px;background:var(--panel);text-align:center}
.wf-bars{display:flex;align-items:flex-end;justify-content:center;gap:5px;height:120px;margin-bottom:22px}
.bar{width:8px;border-radius:4px 4px 2px 2px;background:linear-gradient(to top,var(--v1),var(--v2));height:20%;
  animation:eq .9s ease-in-out infinite alternate;animation-play-state:paused}
@keyframes eq{from{height:12%}to{height:96%}}
.wf-btn{background:linear-gradient(90deg,var(--v1),var(--v2));color:#fff;font-weight:700;border-radius:999px;padding:12px 30px;font-size:14px;
  box-shadow:0 8px 30px rgba(217,70,239,.35);transition:transform .15s}
.wf-btn:active{transform:scale(.95)}`,
  js: `
const wrap=document.getElementById('bars');
for(let i=0;i<48;i++){const b=document.createElement('div');b.className='bar';
  b.style.animationDelay=(Math.random()*.9)+'s';b.style.animationDuration=(.6+Math.random()*.7)+'s';
  b.style.height=(10+Math.random()*80)+'%';wrap.appendChild(b);}
let playing=false;const btn=document.getElementById('wfBtn');
btn.addEventListener('click',()=>{playing=!playing;
  document.querySelectorAll('.bar').forEach(b=>b.style.animationPlayState=playing?'running':'paused');
  btn.textContent=playing?'❚❚ Pause':'▶ Play';});`,
});

/* 2 — MAGNETIC BUTTON (element snaps toward cursor) */
const magnetic = doc({
  body: `
<div style="height:220px;display:grid;place-items:center">
  <button id="mag" class="mag">Magnetic hover<div class="mag-sub">I follow your cursor</div></button>
</div>`,
  css: `
.mag{position:relative;padding:22px 44px;border-radius:18px;font-size:18px;font-weight:800;color:#fff;
  background:linear-gradient(135deg,#0ea5e9,#7c3aed 60%,#d946ef);border:0;
  box-shadow:0 14px 50px rgba(124,58,237,.5);transition:transform .18s cubic-bezier(.22,1,.36,1),box-shadow .3s;
  will-change:transform}
.mag:hover{box-shadow:0 20px 70px rgba(217,70,239,.65)}
.mag-sub{font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;opacity:.75;margin-top:6px}`,
  js: `
const mag=document.getElementById('mag');
mag.addEventListener('mousemove',e=>{
  const r=mag.getBoundingClientRect();
  const x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
  mag.style.transform='translate('+x*.35+'px,'+y*.35+'px)';
});
mag.addEventListener('mouseleave',()=>{mag.style.transform='translate(0,0)';});`,
});

/* 3 — 3D PAGE-FLIP BOOK CARDS */
const bookFlip = doc({
  body: `
<div class="book"><div class="page p1">01<div>HOVER</div></div><div class="page p2">02<div>TO FLIP</div></div><div class="page p3">03<div>PAGES</div></div><div class="cover">MOTION<br>VAULT</div></div>`,
  css: `
.book{position:relative;width:200px;height:270px;perspective:1400px}
.page,.cover{position:absolute;inset:0;border-radius:6px 14px 14px 6px;display:grid;place-content:center;text-align:center;
  font-size:42px;font-weight:900;transform-origin:left center;transition:transform 1s cubic-bezier(.64,0,.36,1);
  backface-visibility:hidden}
.page div,.cover{font-size:12px;letter-spacing:.3em;font-weight:600;opacity:.8}
.cover{background:linear-gradient(150deg,#7c3aed,#d946ef);z-index:4;transform:rotateY(0);
  display:grid;place-content:center;gap:8px;font-size:30px}
.cover{font-size:12px}
.cover::first-line{font-size:30px;letter-spacing:0}
.p3{background:linear-gradient(150deg,#0e7490,#22d3ee);color:#04222b;z-index:1}
.p2{background:linear-gradient(150deg,#9d174d,#f472b6);z-index:2}
.p1{background:linear-gradient(150deg,#4c1d95,#a78bfa);z-index:3}
.book:hover .cover{transform:rotateY(-160deg);z-index:0}
.book:hover .p1{transform:rotateY(-25deg)}
.book:hover .p2{transform:rotateY(-45deg)}
.book:hover .p3{transform:rotateY(-10deg)}`,
});

/* 4 — KEYBOARD SHORTCUT LEGEND (kbd grid) */
const kbdLegend = doc({
  body: `
<div class="kbd-card">
  <h3>Keyboard shortcuts</h3>
  <div class="row"><span>Open command palette</span><span class="keys"><kbd>⌘</kbd><kbd>K</kbd></span></div>
  <div class="row"><span>Fullscreen menu</span><span class="keys"><kbd>⌘</kbd><kbd>M</kbd></span></div>
  <div class="row"><span>Surprise me</span><span class="keys"><kbd>R</kbd></span></div>
  <div class="row"><span>Copy this prompt</span><span class="keys"><kbd>⌘</kbd><kbd>C</kbd></span></div>
  <div class="row"><span>Close overlays</span><span class="keys"><kbd>ESC</kbd></span></div>
</div>`,
  css: `
.kbd-card{width:min(380px,100%);border:1px solid var(--line);border-radius:18px;padding:22px;background:var(--panel)}
.kbd-card h3{font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);margin-bottom:16px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-top:1px solid rgba(255,255,255,.06);font-size:13px;color:var(--txt)}
kbd{display:inline-grid;place-items:center;min-width:26px;height:24px;padding:0 7px;margin-left:5px;border-radius:6px;
  background:linear-gradient(180deg,#26263f,#16162b);border:1px solid rgba(255,255,255,.18);border-bottom-width:3px;
  font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#e879f9;
  box-shadow:0 2px 0 rgba(0,0,0,.4)}`,
});

/* 5 — SPOTLIGHT TILT CARD (radial gradient follows cursor + tilt) */
const spotlightCard = doc({
  body: `
<div class="spot" id="spot"><div class="glow" id="glow"></div><div class="spot-tag">PREMIUM</div><h3>Holo Pricing Card</h3><p>Move your cursor — light chases you and the card tilts in 3D.</p><div class="price">$29<span>/mo</span></div><button class="spot-btn">Get started</button></div>`,
  css: `
.spot{position:relative;width:min(320px,100%);border-radius:22px;padding:28px;border:1px solid rgba(255,255,255,.12);
  background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));overflow:hidden;
  transform-style:preserve-3d;transition:transform .15s ease-out;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.glow{position:absolute;inset:0;background:radial-gradient(320px circle at var(--mx,50%) var(--my,0%),rgba(217,70,239,.25),transparent 65%);opacity:0;transition:opacity .3s;pointer-events:none}
.spot:hover .glow{opacity:1}
.spot-tag{display:inline-block;font-size:10px;letter-spacing:.25em;font-weight:800;color:#22d3ee;border:1px solid rgba(34,211,238,.4);border-radius:999px;padding:4px 10px}
.spot h3{margin:16px 0 8px;font-size:22px}.spot p{font-size:13px;color:var(--dim);line-height:1.6}
.price{margin:18px 0;font-size:44px;font-weight:900}.price span{font-size:14px;color:var(--dim);font-weight:500}
.spot-btn{width:100%;padding:12px;border-radius:12px;font-weight:700;color:#fff;background:linear-gradient(90deg,var(--v1),var(--v2));transition:filter .2s}
.spot-btn:hover{filter:brightness(1.15)}`,
  js: `
const spot=document.getElementById('spot'),glow=document.getElementById('glow');
spot.addEventListener('mousemove',e=>{
  const r=spot.getBoundingClientRect();
  const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
  spot.style.setProperty('--mx',(px*100)+'%');
  spot.style.setProperty('--my',(py*100)+'%');
  spot.style.transform='perspective(800px) rotateY('+((px-.5)*14)+'deg) rotateX('+((.5-py)*14)+'deg)';
});
spot.addEventListener('mouseleave',()=>{spot.style.transform='perspective(800px) rotateY(0) rotateX(0)';});`,
});

/* 6 — CURSOR TRAIL DOTS (canvas sparkles follow pointer) */
const cursorTrail = doc({
  kind: "page",
  body: `<canvas id="ct"></canvas><div class="ct-hint">Move your cursor ✦</div>`,
  css: `
#ct{position:fixed;inset:0;width:100%;height:100%;pointer-events:none}
.ct-hint{position:fixed;inset:0;display:grid;place-items:center;font-size:14px;letter-spacing:.3em;
  text-transform:uppercase;color:var(--dim);pointer-events:none}`,
  js: `
const cv=document.getElementById('ct'),ctx=cv.getContext('2d');
let W,H;function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;}rs();addEventListener('resize',rs);
const parts=[];const cols=['#22d3ee','#d946ef','#a78bfa','#fbbf24'];
addEventListener('pointermove',e=>{
  for(let i=0;i<3;i++)parts.push({x:e.clientX+(Math.random()-.5)*8,y:e.clientY+(Math.random()-.5)*8,
    vx:(Math.random()-.5)*1.4,vy:(Math.random()-.5)*1.4-.6,life:1,c:cols[Math.random()*cols.length|0],s:1.5+Math.random()*2.5});
});
function loop(){
  ctx.clearRect(0,0,W,H);
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];
    p.x+=p.vx;p.y+=p.vy;p.vy+=.03;p.life-=.025;
    if(p.life<=0){parts.splice(i,1);continue;}
    ctx.globalAlpha=p.life;ctx.fillStyle=p.c;
    ctx.beginPath();ctx.arc(p.x,p.y,p.s*p.life,0,7);ctx.fill();
  }
  ctx.globalAlpha=1;requestAnimationFrame(loop);
}
loop();`,
});

export const WAVE12_ITEMS: Item[] = [
  {
    id: "w12-waveform",
    slug: "audio-waveform-equalizer",
    category: "animations",
    title: "Audio waveform equalizer",
    summary: "48-bar equalizer that dances while playing — simulated audio bars with randomized timing, play/pause toggle.",
    author: "MotionVault",
    tags: ["audio", "waveform", "equalizer", "music", "bars", "visualizer"],
    tech: ["html", "css", "javascript"],
    stars: 355, views: 0, copies: 0, featured: false, published: true,
    html: waveform,
    prompt:
      "Build an audio player card with a 48-bar equalizer visualization: thin rounded gradient bars (violet to fuchsia) sit at varied heights and animate height 12%→96% with ease-in-out alternate keyframes, each bar with random animation delay and duration so it looks organic. Bars are paused until the Play button is clicked; clicking toggles play/pause label and animation-play-state on all bars (simulated audio — no real audio file needed). Glass card, dark UI, vanilla JS generating the bars in a loop.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w12-magnetic",
    slug: "magnetic-cursor-button",
    category: "components",
    title: "Magnetic cursor button",
    summary: "A big CTA that springs toward the cursor while hovered and snaps back on leave — 35% follow ratio.",
    author: "MotionVault",
    tags: ["button", "magnetic", "cursor", "micro-interaction", "cta"],
    tech: ["html", "css", "javascript"],
    stars: 421, views: 0, copies: 0, featured: true, published: true,
    html: magnetic,
    prompt:
      "Create a magnetic button: a large rounded gradient CTA with a small uppercase subtitle. On mousemove over the button, compute cursor offset from the button center and translate the button by 35% of that offset (transform with a smooth .18s cubic-bezier transition so it eases). On mouseleave reset transform to zero. Add a deeper colored glow shadow that intensifies on hover. Dark background, vanilla JS, works within a generously tall hover area.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w12-book",
    slug: "3d-page-flip-book",
    category: "components",
    title: "3D page-flip book stack",
    summary: "A stack of pages fans open like a book on hover — layered rotateY flips with left-edge transform origin.",
    author: "MotionVault",
    tags: ["3d", "book", "flip", "cards", "perspective", "hover"],
    tech: ["html", "css"],
    stars: 389, views: 0, copies: 0, featured: false, published: true,
    html: bookFlip,
    prompt:
      "Design a 3D page-flip book: a 200x270px container with perspective 1400px holding three colored pages and a gradient cover stacked on top (z-indexed), each absolutely positioned with transform-origin at the left edge and backface-visibility hidden. On container hover, the cover rotates rotateY to -160deg (flipping fully behind) and the three pages fan to -25deg, -45deg, -10deg with a 1s cubic-bezier(.64,0,.36,1) transition, producing a book-opening stagger. Pages show big numbers and small uppercase labels. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w12-kbd",
    slug: "keyboard-shortcut-legend",
    category: "components",
    title: "Keyboard shortcut legend with kbd chips",
    summary: "A settings/help panel listing shortcuts with glossy 3D keyboard key chips — JetBrains Mono, fuchsia glyphs.",
    author: "MotionVault",
    tags: ["keyboard", "shortcut", "kbd", "help", "legend", "ui-kit"],
    tech: ["html", "css"],
    stars: 276, views: 0, copies: 0, featured: false, published: true,
    html: kbdLegend,
    prompt:
      "Build a keyboard shortcut legend panel: a glass card titled 'Keyboard shortcuts' with rows of action labels on the left and key chips on the right. Style kbd chips as glossy keyboard keys: 26x24px rounded squares with a dark vertical gradient, 1px light border, thick 3px bottom border and drop shadow, monospace fuchsia glyphs (⌘ K, ⌘ M, R, ESC style combos with margin between keys). Rows separated by faint top borders. Pure HTML/CSS, dark theme.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w12-spotlight",
    slug: "spotlight-tilt-pricing-card",
    category: "components",
    title: "Spotlight tilt pricing card",
    summary: "Glass pricing card that tilts in 3D toward the cursor while a radial spotlight glow chases the pointer.",
    author: "MotionVault",
    tags: ["spotlight", "tilt", "3d", "card", "pricing", "glow", "cursor"],
    tech: ["html", "css", "javascript"],
    stars: 498, views: 0, copies: 0, featured: true, published: true,
    html: spotlightCard,
    prompt:
      "Create a premium glass pricing card with cursor spotlight and 3D tilt: a rounded gradient-glass card containing a cyan 'PREMIUM' pill tag, title, description, a big $29/mo price and a full-width gradient button. A radial-gradient overlay (fuchsia, 320px circle) follows the cursor via CSS custom properties --mx/--my set on mousemove, fading in on hover. Simultaneously the card tilts with perspective(800px) rotateY/rotateX up to ±14deg based on cursor position, easing back to flat on mouseleave. Vanilla JS, transform-style preserve-3d.",
    status: "curated", createdAt: now, updatedAt: now,
  },  {
    id: "w12-trail",
    slug: "canvas-cursor-sparkle-trail",
    category: "animations",
    title: "Canvas cursor sparkle trail",
    summary: "Colorful sparkles spawn at the pointer and drift with gravity, shrinking and fading — full-screen canvas overlay.",
    author: "MotionVault",
    tags: ["cursor", "trail", "particles", "canvas", "sparkle", "follow"],
    tech: ["html", "css", "javascript"],
    stars: 466, views: 0, copies: 0, featured: true, published: true,
    html: cursorTrail,
    prompt:
      "Build a full-screen cursor sparkle trail: a fixed canvas overlay (pointer-events none) covers the viewport; on pointermove spawn 3 small circles per event near the cursor with random velocity and slight upward bias, four colors (cyan, fuchsia, violet, amber). Each frame particles drift, accelerate downward with gravity .03, shrink and fade (life decreasing .025), and dead particles are spliced. Simple canvas, requestAnimationFrame loop, resize handler. A faint uppercase hint 'Move your cursor' sits centered behind. Vanilla JS, no libraries.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

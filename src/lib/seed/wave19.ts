import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T22:00:00.000Z";

/* 1 — CARD SWIPE DISMISS (scroll-jacking reveal) */
const reveal = doc({
  kind: "page",
  body: `
<div class="rv">
  <h2 class="rv-h">Scroll to reveal</h2>
  <div class="rv-row"><div class="rv-card" style="--b:#7c3aed">Hover me</div><div class="rv-card" style="--b:#d946ef">Reveal</div><div class="rv-card" style="--b:#22d3ee">On scroll</div><div class="rv-card" style="--b:#10b981">Staggered</div></div>
  <div style="height:60vh"></div>
  <div class="rv-row bottom"><div class="rv-card" style="--b:#f59e0b">In from left</div><div class="rv-card" style="--b:#f43f5e">Pop up</div><div class="rv-card" style="--b:#a78bfa">Fade in</div><div class="rv-card" style="--b:#38bdf8">Staggered</div></div>
</div>`,
  css: `
body{display:block}
.rv{padding:80px 24px;max-width:900px;margin:0 auto}
.rv-h{text-align:center;font-size:34px;margin-bottom:60px;color:var(--dim)}
.rv-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:80px}
.rv-card{height:150px;border-radius:18px;display:grid;place-items:center;font-weight:800;color:#fff;
  border:1px solid rgba(255,255,255,.12);background:linear-gradient(160deg,color-mix(in srgb,var(--b) 55%,#0b0b1c),#0b0b1c);
  opacity:0;transform:translateY(50px) scale(.92);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.rv-card.seen{opacity:1;transform:none}
.bottom .rv-card{transform:translateX(-60px)}
.bottom .rv-card.seen{transform:none}`,
  js: `
const io=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target);}});
},{threshold:.3});
document.querySelectorAll('.rv-card').forEach((c,i)=>{c.style.transitionDelay=(i%4)*90+'ms';io.observe(c);});`,
});

/* 2 — TABS WITH SLIDING UNDERLINE */
const tabs = doc({
  body: `
<div class="tb" id="tb"><span class="tb-line"></span><button class="on">Components</button><button>Animations</button><button>Templates</button><button>Elements</button></div>
<div class="tb-out" id="out">146 components & counting</div>`,
  css: `
.tb{position:relative;display:inline-flex;gap:4px;border-bottom:1px solid var(--line);width:100%;justify-content:center}
.tb button{background:none;border:0;color:var(--dim);font-weight:700;font-size:14px;padding:12px 18px;cursor:pointer;
  transition:color .25s;position:relative;z-index:1}
.tb button.on{color:#fff}
.tb-line{position:absolute;bottom:-1px;height:2px;border-radius:2px;background:linear-gradient(90deg,#22d3ee,#d946ef);
  transition:all .35s cubic-bezier(.34,1.56,.64,1);z-index:2}
.tb-out{margin-top:26px;text-align:center;color:var(--dim);font-size:14px;min-height:1.5em}`,
  js: `
const tb=document.getElementById('tb'),line=tb.querySelector('.tb-line'),btns=[...tb.querySelectorAll('button')];
const out=document.getElementById('out');
function move(b){
  line.style.width=b.offsetWidth+'px';
  line.style.left=b.offsetLeft+'px';
  btns.forEach(x=>x.classList.toggle('on',x===b));
  out.textContent='Browse '+b.textContent+' →';
}
btns.forEach(b=>b.onclick=()=>move(b));
requestAnimationFrame(()=>move(btns[0]));
addEventListener('resize',()=>move(tb.querySelector('button.on')));`,
});

/* 3 — PASSWORD STRENGTH METER */
const pwdMeter = doc({
  body: `
<div class="pm"><input id="pw" class="pm-in" type="text" placeholder="Type a password…" />
<div class="pm-bar"><i id="fill"></i></div>
<div class="pm-meta"><span id="label">too weak</span><span id="hints"></span></div></div>`,
  css: `
.pm{width:min(340px,100%)}
.pm-in{width:100%;padding:14px 16px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.04);
  color:#fff;font-size:15px;outline:none;font-family:'JetBrains Mono',monospace;transition:border-color .3s,box-shadow .3s}
.pm-in:focus{border-color:rgba(217,70,239,.6);box-shadow:0 0 0 3px rgba(217,70,239,.12)}
.pm-bar{margin-top:12px;height:7px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.pm-bar i{display:block;height:100%;width:0;border-radius:99px;transition:width .4s cubic-bezier(.22,1,.36,1),background .4s}
.pm-meta{margin-top:10px;display:flex;justify-content:space-between;font-size:12px}
#label{font-weight:700;text-transform:uppercase;letter-spacing:.08em}
#hints{color:var(--dim);font-family:'JetBrains Mono',monospace}`,
  js: `
const pw=document.getElementById('pw'),fill=document.getElementById('fill'),label=document.getElementById('label'),hints=document.getElementById('hints');
const cols=['#f43f5e','#fb923c','#fbbf24','#a3e635','#34d399'];
const words=['too weak','weak','okay','good','strong'];
pw.addEventListener('input',()=>{
  const v=pw.value;let s=0;const miss=[];
  if(v.length>=8)s++;else miss.push('8+');
  if(/[A-Z]/.test(v)&&/[a-z]/.test(v))s++;else miss.push('Aa');
  if(/\\d/.test(v))s++;else miss.push('0-9');
  if(/[^A-Za-z0-9]/.test(v))s++;else miss.push('#!');
  if(v.length>=12)s++;
  s=Math.min(4,s);
  fill.style.width=(v?((s+1)/5)*100:0)+'%';
  fill.style.background=v?cols[s]:'transparent';
  label.style.color=v?cols[s]:'var(--dim)';
  label.textContent=v?words[s]:'too weak';
  hints.textContent=v&&miss.length?'missing '+miss.join(' '):'';
});`,
});

/* 4 — MULTI-RANGE DUAL SLIDER PRICE */
const range = doc({
  body: `
<div class="rg">
  <div class="rg-vals"><b id="lo">$0</b><span>price range</span><b id="hi">$200</b></div>
  <div class="rg-track"><div class="rg-sel" id="sel"></div><input type="range" min="0" max="200" value="40" id="r1" /><input type="range" min="0" max="200" value="160" id="r2" /></div>
</div>`,
  css: `
.rg{width:min(420px,100%)}
.rg-vals{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:22px}
.rg-vals b{font-family:'JetBrains Mono',monospace;font-size:22px;color:#22d3ee}
.rg-vals span{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.rg-track{position:relative;height:6px;border-radius:99px;background:rgba(255,255,255,.08)}
.rg-sel{position:absolute;height:100%;border-radius:99px;background:linear-gradient(90deg,#22d3ee,#d946ef)}
.rg-track input{position:absolute;inset:0;width:100%;height:6px;background:none;pointer-events:none;-webkit-appearance:none;appearance:none;margin:0}
.rg-track input::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#fff;
  border:3px solid #d946ef;cursor:pointer;pointer-events:auto;box-shadow:0 4px 14px rgba(217,70,239,.5);margin-top:0}
.rg-track input::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:#fff;border:3px solid #d946ef;cursor:pointer;pointer-events:auto}`,
  js: `
const r1=document.getElementById('r1'),r2=document.getElementById('r2'),sel=document.getElementById('sel');
const lo=document.getElementById('lo'),hi=document.getElementById('hi');
function up(){
  let a=+r1.value,b=+r2.value;
  if(a>b-8){if(event&&event.target===r1)a=b-8;else b=a+8;r1.value=a;r2.value=b;}
  sel.style.left=(a/200*100)+'%';sel.style.width=((b-a)/200*100)+'%';
  lo.textContent='$'+a;hi.textContent='$'+b;
}
r1.oninput=up;r2.oninput=up;up();`,
});

/* 5 — HOVER TILT IMAGE WALL (3D) */
const tiltWall = doc({
  kind: "page",
  body: `
<div class="tw" id="tw">
  <div class="tw-card" style="--c1:#7c3aed;--c2:#d946ef"><b>01</b><span>Aurora</span></div>
  <div class="tw-card" style="--c1:#22d3ee;--c2:#0ea5e9"><b>02</b><span>Plasma</span></div>
  <div class="tw-card" style="--c1:#f472b6;--c2:#f59e0b"><b>03</b><span>Nebula</span></div>
  <div class="tw-card" style="--c1:#10b981;--c2:#22d3ee"><b>04</b><span>Matrix</span></div>
  <div class="tw-card" style="--c1:#f43f5e;--c2:#a78bfa"><b>05</b><span>Supernova</span></div>
  <div class="tw-card" style="--c1:#38bdf8;--c2:#818cf8"><b>06</b><span>Quasar</span></div>
</div>`,
  css: `
body{display:block}
.tw{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:760px;margin:80px auto;padding:0 24px;perspective:1000px}
.tw-card{height:200px;border-radius:20px;display:flex;flex-direction:column;justify-content:space-between;padding:20px;
  background:linear-gradient(160deg,color-mix(in srgb,var(--c1) 60%,#0b0b1c),color-mix(in srgb,var(--c2) 40%,#0b0b1c));
  border:1px solid rgba(255,255,255,.14);cursor:pointer;transform-style:preserve-3d;
  transition:transform .15s ease-out,box-shadow .3s;box-shadow:0 14px 40px rgba(0,0,0,.4);overflow:hidden;position:relative}
.tw-card::after{content:'';position:absolute;inset:0;background:radial-gradient(400px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.18),transparent 45%);opacity:0;transition:opacity .3s}
.tw-card:hover::after{opacity:1}
.tw-card b{font-size:30px;font-weight:900;opacity:.85;transform:translateZ(30px)}
.tw-card span{font-size:22px;font-weight:800;transform:translateZ(20px)}`,
  js: `
document.querySelectorAll('.tw-card').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    c.style.transform='rotateY('+((px-.5)*16)+'deg) rotateX('+((.5-py)*16)+'deg) translateZ(6px)';
    c.style.setProperty('--mx',px*100+'%');c.style.setProperty('--my',py*100+'%');
  });
  c.addEventListener('mouseleave',()=>{c.style.transform='rotateY(0) rotateX(0)';});
});`,
});

/* 6 — EMPTY STATE ILLUSTRATION */
const empty = doc({
  body: `
<div class="em">
  <div class="em-art"><div class="em-ring"></div><div class="em-ring r2"></div><div class="em-star">✦</div></div>
  <h3>Nothing here yet</h3>
  <p>Your favorite effects will gather in this space. Start exploring the vault.</p>
  <button class="em-btn">Browse 146 assets</button>
</div>`,
  css: `
.em{text-align:center;max-width:340px}
.em-art{position:relative;width:140px;height:140px;margin:0 auto 24px}
.em-ring{position:absolute;inset:0;border-radius:50%;border:2px dashed rgba(217,70,239,.45);animation:spin 14s linear infinite}
.em-ring.r2{inset:20px;border-color:rgba(34,211,238,.4);animation-direction:reverse;animation-duration:9s}
.em-star{position:absolute;inset:0;display:grid;place-items:center;font-size:44px;color:#d946ef;
  filter:drop-shadow(0 0 18px rgba(217,70,239,.8));animation:pulse 2.4s ease-in-out infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{50%{transform:scale(1.15);opacity:.75}}
.em h3{font-size:20px;margin-bottom:8px}
.em p{font-size:13.5px;color:var(--dim);line-height:1.7;margin-bottom:20px}
.em-btn{background:linear-gradient(90deg,var(--v1),var(--v2));color:#fff;border:0;font-weight:800;border-radius:12px;padding:13px 26px;font-size:14px;
  box-shadow:0 10px 30px rgba(217,70,239,.35);transition:transform .15s}
.em-btn:active{transform:scale(.95)}`,
});

export const WAVE19_ITEMS: Item[] = [
  {
    id: "w19-reveal",
    slug: "intersection-observer-stagger-reveal",
    category: "animations",
    title: "Scroll stagger reveal cards",
    summary: "Cards fade and rise in with per-index delay when they enter the viewport — IntersectionObserver pattern.",
    author: "MotionVault",
    tags: ["scroll", "reveal", "intersection-observer", "stagger", "entrance"],
    tech: ["html", "css", "javascript"],
    stars: 367, views: 0, copies: 0, featured: false, published: true,
    html: reveal,
    prompt:
      "Build a scroll-reveal demo: two rows of gradient cards (one rising+fading, one sliding in from the left). An IntersectionObserver with threshold .3 adds a 'seen' class to each card when it enters, transitioning opacity 0→1 and transform from translateY(50px) scale(.92) to none with a cubic-bezier .7s; each card gets a transition-delay based on its index mod 4 for a stagger. Cards unobserve after revealing. Vanilla JS, pure CSS transitions.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w19-tabs",
    slug: "sliding-underline-tabs",
    category: "components",
    title: "Sliding underline tabs",
    summary: "Gradient underline springs between tabs with width+left animation; output line reflects the active tab.",
    author: "MotionVault",
    tags: ["tabs", "underline", "nav", "sliding", "ui-kit"],
    tech: ["html", "css", "javascript"],
    stars: 318, views: 0, copies: 0, featured: false, published: true,
    html: tabs,
    prompt:
      "Create tabs with a sliding gradient underline: a row of four text tabs over a bottom border; an absolutely positioned 2px gradient (cyan→fuchsia) indicator animates its width and left to match the clicked tab using offsetWidth/offsetLeft with a spring cubic-bezier. Active label turns white. Initialize on rAF and re-measure on resize. An output line below reflects the active tab. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w19-pwd",
    slug: "password-strength-meter",
    category: "components",
    title: "Password strength meter",
    summary: "Live strength scoring (length, case, digits, symbols) driving a colored gradient bar with missing-rule hints.",
    author: "MotionVault",
    tags: ["password", "form", "validation", "meter", "strength", "security"],
    tech: ["html", "css", "javascript"],
    stars: 352, views: 0, copies: 0, featured: false, published: true,
    html: pwdMeter,
    prompt:
      "Build a live password strength meter: a monospace password input over a 7px rounded meter bar with a fill that updates on input. Score 0-5 by checking: length >= 8, mixed upper/lower case, contains a digit, contains a symbol, length >= 12. Fill width maps to score and its color goes red→orange→amber→lime→green; the uppercase label shows 'too weak/weak/okay/good/strong' in that color, and a hints area lists missing rules (8+, Aa, 0-9, #!). Transitions on width and color. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w19-range",
    slug: "dual-thumb-range-price-slider",
    category: "components",
    title: "Dual-thumb range price slider",
    summary: "Two overlaid range inputs form a min/max selector with a gradient selected band and live mono price labels.",
    author: "MotionVault",
    tags: ["range", "slider", "dual", "price", "filter", "form"],
    tech: ["html", "css", "javascript"],
    stars: 334, views: 0, copies: 0, featured: false, published: true,
    html: range,
    prompt:
      "Build a dual-thumb price range slider: a track with a gradient selected band between two values and two overlaid <input type=range> (0-200) made clickable via pointer-events:auto on just the thumbs (white circles with fuchsia ring and shadow); inputs themselves are pointer-events:none. JS keeps min/max from crossing (8 gap), positions the band by percentage, and updates '$lo … $hi' mono labels. Vanilla JS, no UI library.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w19-tilt",
    slug: "3d-tilt-image-wall",
    category: "templates",
    title: "3D tilt gallery wall",
    summary: "Six gradient tiles tilt in perspective toward the cursor with a radial sheen tracking the pointer.",
    author: "MotionVault",
    tags: ["3d", "tilt", "gallery", "wall", "hover", "spotlight"],
    tech: ["html", "css", "javascript"],
    stars: 458, views: 0, copies: 0, featured: true, published: true,
    html: tiltWall,
    prompt:
      "Create a 3D tilt gallery wall: a 3x2 grid of 200px rounded gradient tiles (each with its own --c1/--c2 colors via color-mix), perspective on the grid and preserve-3d on cards; numbered and labeled content pops toward the viewer with translateZ layers. On mousemove each card rotates rotateY/rotateX ±16deg toward the cursor plus a radial white sheen overlay following --mx/--my custom properties; on leave it eases flat. Vanilla JS, dark background.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w19-empty",
    slug: "animated-empty-state",
    category: "components",
    title: "Animated empty state",
    summary: "Friendly empty-state block with counter-rotating dashed orbit rings and a pulsing star, plus a CTA button.",
    author: "MotionVault",
    tags: ["empty-state", "placeholder", "illustration", "onboarding", "ui-kit"],
    tech: ["html", "css"],
    stars: 283, views: 0, copies: 0, featured: false, published: true,
    html: empty,
    prompt:
      "Design an animated empty state: a centered block with a 140px circular illustration made of two dashed orbit rings (fuchsia and cyan) counter-rotating at different speeds and a glowing pulsing star in the middle, then a heading 'Nothing here yet', a dim explanation line, and a gradient CTA button with press scale. No images or emoji beyond a single star glyph. Pure CSS keyframes, dark UI.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

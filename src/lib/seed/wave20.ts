import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T23:00:00.000Z";

/* 1 — CSS 3D CUBE LOADER */
const cube = doc({
  body: `<div class="cube-scene"><div class="cube"><i style="--r:rotateY(0)"></i><i style="--r:rotateY(90deg)"></i><i style="--r:rotateY(180deg)"></i><i style="--r:rotateY(-90deg)"></i><i style="--r:rotateX(90deg)"></i><i style="--r:rotateX(-90deg)"></i></div></div>`,
  css: `
.cube-scene{perspective:600px;width:120px;height:120px}
.cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:spin3d 3.2s linear infinite}
.cube i{position:absolute;inset:0;border:2px solid rgba(217,70,239,.7);background:rgba(124,58,237,.12);
  transform:var(--r) translateZ(60px);box-shadow:inset 0 0 30px rgba(217,70,239,.25)}
.cube i:nth-child(odd){border-color:rgba(34,211,238,.7);background:rgba(34,211,238,.08)}
@keyframes spin3d{from{transform:rotateX(-22deg) rotateY(0)}to{transform:rotateX(-22deg) rotateY(360deg)}}`,
});

/* 2 — ACCORDION FAQ */
const accordion = doc({
  body: `
<div class="aq">
  <details open><summary>How do I use the prompts?<i></i></summary><p>Copy any prompt, paste it into your AI coding tool, and the effect appears — then tweak the live playground.</p></details>
  <details><summary>Are the previews interactive?<i></i></summary><p>Yes. Every preview is a live sandboxed iframe — click, drag and hover right inside the card.</p></details>
  <details><summary>Can I download React components?<i></i></summary><p>Selected assets ship with ready-to-use TSX downloads via the component file route.</p></details>
  <details><summary>Is everything free?<i></i></summary><p>All curated assets and prompts are free to browse, copy and learn from.</p></details>
</div>`,
  css: `
.aq{width:min(520px,100%);display:flex;flex-direction:column;gap:10px}
details{border:1px solid var(--line);border-radius:14px;background:var(--panel);overflow:hidden;transition:border-color .3s}
details[open]{border-color:rgba(217,70,239,.4)}
summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:16px 18px;font-weight:700;font-size:14.5px}
summary::-webkit-details-marker{display:none}
summary i{width:22px;height:22px;flex:none;position:relative;border-radius:7px;background:rgba(217,70,239,.15)}
summary i::before,summary i::after{content:'';position:absolute;left:50%;top:50%;background:#d946ef;border-radius:2px;transition:transform .3s}
summary i::before{width:10px;height:2px;transform:translate(-50%,-50%)}
summary i::after{width:2px;height:10px;transform:translate(-50%,-50%)}
details[open] summary i::after{transform:translate(-50%,-50%) rotate(90deg)}
details p{padding:0 18px 16px;font-size:13.5px;color:var(--dim);line-height:1.7}
details::details-content{block-size:0;transition:block-size .35s}`,
});

/* 3 — SNAP SCROLL GALLERY (horizontal native) */
const snapGallery = doc({
  kind: "page",
  body: `
<div class="sn"><div class="sn-h">Horizontal snap gallery</div><div class="sn-track">
  <section style="--a:#7c3aed;--b:#d946ef"><h3>01</h3><p>Aurora</p></section>
  <section style="--a:#22d3ee;--b:#0ea5e9"><h3>02</h3><p>Plasma</p></section>
  <section style="--a:#f472b6;--b:#f59e0b"><h3>03</h3><p>Nebula</p></section>
  <section style="--a:#10b981;--b:#22d3ee"><h3>04</h3><p>Matrix</p></section>
  <section style="--a:#f43f5e;--b:#a78bfa"><h3>05</h3><p>Nova</p></section>
  <section style="--a:#38bdf8;--b:#818cf8"><h3>06</h3><p>Quasar</p></section>
</div></div>`,
  css: `
body{display:block}
.sn{padding-top:12vh}
.sn-h{text-align:center;font-size:14px;letter-spacing:.35em;text-transform:uppercase;color:var(--dim);margin-bottom:30px}
.sn-track{display:flex;gap:20px;overflow-x:auto;padding:20px 22vw;scroll-snap-type:x mandatory;scrollbar-width:none}
.sn-track::-webkit-scrollbar{display:none}
.sn-track section{flex:none;width:min(70vw,520px);height:60vh;scroll-snap-align:center;border-radius:26px;
  display:flex;flex-direction:column;justify-content:flex-end;padding:34px;border:1px solid rgba(255,255,255,.14);
  background:linear-gradient(160deg,color-mix(in srgb,var(--a) 65%,#0b0b1c),color-mix(in srgb,var(--b) 45%,#0b0b1c));
  box-shadow:0 30px 70px rgba(0,0,0,.5)}
.sn-track h3{font-size:72px;font-weight:900;line-height:1;opacity:.7}
.sn-track p{font-size:24px;font-weight:800;margin-top:6px}`,
});

/* 4 — GLASS CARD HOVER LIFT WITH REFLECTION */
const glassLift = doc({
  body: `
<div class="gl-row">
  <div class="gl"><h4>Velocity</h4><p>Prompts tuned for one-shot generation.</p><b>4.9×</b></div>
  <div class="gl hot"><h4>Precision</h4><p>Every preview is the real, working code.</p><b>152</b></div>
  <div class="gl"><h4>Inspiration</h4><p>Five curated sites collapsed into one.</p><b>5→1</b></div>
</div>`,
  css: `
.gl-row{display:flex;gap:18px;flex-wrap:wrap;justify-content:center}
.gl{position:relative;width:200px;padding:24px 22px;border-radius:20px;cursor:pointer;
  background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(14px);
  transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s,border-color .3s;
  overflow:hidden}
.gl::before{content:'';position:absolute;inset:0;
  background:radial-gradient(280px 140px at var(--mx,50%) -20%,rgba(255,255,255,.16),transparent 70%);opacity:0;transition:opacity .3s}
.gl:hover{transform:translateY(-10px);border-color:rgba(217,70,239,.45);
  box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 40px rgba(217,70,239,.15)}
.gl:hover::before{opacity:1}
.gl h4{font-size:17px;margin-bottom:8px}.gl p{font-size:12.5px;color:var(--dim);line-height:1.6;margin-bottom:16px}
.gl b{font-size:30px;font-weight:900;background:linear-gradient(90deg,#22d3ee,#d946ef);-webkit-background-clip:text;background-clip:text;color:transparent}
.gl.hot{border-color:rgba(34,211,238,.4)}`,
  js: `
document.querySelectorAll('.gl').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');});
});`,
});

/* 5 — KEYFRAMES WEATHER SUN/RAIN MINI ICON */
const weather = doc({
  body: `
<div class="wx"><div class="wx-card w1"><span class="ico sun">☀</span><b>Clear</b></div>
<div class="wx-card w2"><span class="ico cloud">☁</span><b>Cloudy</b></div>
<div class="wx-card w3"><span class="ico rain">🌧<i></i><i></i><i></i></span><b>Rain</b></div></div>`,
  css: `
.wx{display:flex;gap:16px}
.wx-card{width:110px;height:130px;border-radius:18px;border:1px solid var(--line);background:var(--panel);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.ico{font-size:38px;line-height:1;position:relative;display:grid;place-items:center;height:44px}
.wx-card b{font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:var(--dim)}
.sun{color:#fbbf24;animation:sunspin 8s linear infinite;filter:drop-shadow(0 0 14px rgba(251,191,36,.7))}
@keyframes sunspin{to{transform:rotate(360deg)}}
.cloud{color:#94a3b8;animation:floaty 3.5s ease-in-out infinite}
@keyframes floaty{50%{transform:translateY(-6px)}}
.rain{font-size:30px}
.rain i{position:absolute;width:2.5px;height:9px;border-radius:2px;background:linear-gradient(#22d3ee,transparent);top:100%;left:50%;
  animation:raindrop 1s linear infinite}
.rain i:nth-child(2){left:30%;animation-delay:.3s}
.rain i:nth-child(3){left:70%;animation-delay:.6s}
@keyframes raindrop{0%{transform:translateY(-6px);opacity:0}30%{opacity:1}100%{transform:translateY(18px);opacity:0}}`,
});

/* 6 — STAR RATING INPUT */
const starRate = doc({
  body: `
<div class="sr"><div class="sr-stars" id="stars"></div><b id="sr-label">tap to rate</b></div>`,
  css: `
.sr{text-align:center}
.sr-stars{display:flex;justify-content:center;gap:8px;margin-bottom:14px}
.sr-stars i{font-style:normal;font-size:40px;line-height:1;color:rgba(255,255,255,.15);cursor:pointer;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),color .15s;text-shadow:none}
.sr-stars i.lit{color:#fbbf24;text-shadow:0 0 16px rgba(251,191,36,.6)}
.sr-stars i.hover{transform:scale(1.25)}
#sr-label{display:block;font-size:14px;color:var(--dim);text-transform:uppercase;letter-spacing:.2em;min-height:1.4em}`,
  js: `
const wrap=document.getElementById('stars'),label=document.getElementById('sr-label');
const texts=['','hated it','meh','okay','liked it','loved it!'];
let val=0;
for(let n=1;n<=5;n++){
  const s=document.createElement('i');s.textContent='★';s.dataset.n=n;
  s.onmouseenter=()=>paint(n,true);
  s.onclick=()=>{val=n;paint(val,false);label.textContent=texts[n];};
  wrap.appendChild(s);
}
wrap.onmouseleave=()=>paint(val,false);
function paint(n,hover){
  wrap.querySelectorAll('i').forEach(s=>{
    const on=+s.dataset.n<=n;
    s.classList.toggle('lit',on);
    s.classList.toggle('hover',hover&&+s.dataset.n===n);
  });
}`,
});

export const WAVE20_ITEMS: Item[] = [
  {
    id: "w20-cube",
    slug: "3d-cube-spin-loader",
    category: "animations",
    title: "3D cube spin loader",
    summary: "Six-faced wireframe cube rotating in perspective — pure CSS 3D transforms with glow faces.",
    author: "MotionVault",
    tags: ["loading", "3d", "cube", "transform", "spinner"],
    tech: ["html", "css"],
    stars: 339, views: 0, copies: 0, featured: false, published: true,
    html: cube,
    prompt:
      "Build a 3D rotating cube loader: a perspective scene containing a preserve-3d cube of six <i> faces, each rotated into place (rotateY 0/90/180/-90, rotateX ±90) and translated outward by half the cube size (60px). Faces are translucent with alternating fuchsia/cyan 2px borders and inner glow. The whole cube spins continuously (rotateX -22deg tilt + rotateY full turn, 3.2s linear). Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w20-faq",
    slug: "native-details-accordion-faq",
    category: "components",
    title: "Accordion FAQ with plus/minus marker",
    summary: "Smooth <details>/<summary> accordion whose plus icon morphs into an x when open — no JS required.",
    author: "MotionVault",
    tags: ["accordion", "faq", "details", "expand", "ui-kit"],
    tech: ["html", "css"],
    stars: 371, views: 0, copies: 0, featured: false, published: true,
    html: accordion,
    prompt:
      "Create an FAQ accordion using native <details>/<summary> elements (no JS): glass rounded rows with a bold summary row and a dim answer paragraph. Each summary has a rounded plus marker built from two bars (::before horizontal, ::after vertical); when the details[open], the vertical bar rotates to form an x and the row border turns fuchsia. Hide the default disclosure marker. Keep rows in a stacked column with gaps. Pure HTML/CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w20-snap",
    slug: "native-scroll-snap-gallery",
    category: "templates",
    title: "Native scroll-snap horizontal gallery",
    summary: "Full-width horizontal card carousel using CSS scroll-snap and mandatory centering — zero JS, native momentum.",
    author: "MotionVault",
    tags: ["gallery", "snap", "horizontal", "scroll", "carousel"],
    tech: ["html", "css"],
    stars: 402, views: 0, copies: 0, featured: true, published: true,
    html: snapGallery,
    prompt:
      "Build a horizontal snap-scrolling gallery with NO JavaScript: a flex row of large gradient cards inside an overflow-x auto container with scroll-snap-type: x mandatory; each card uses scroll-snap-align: center so they lock to the middle with native momentum scrolling on touch and trackpads. Cards are ~70vw wide with big ghost numbers and titles, using per-card CSS color variables. Hide the scrollbar. Generous side padding (22vw) so the edges peek. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w20-glass",
    slug: "glass-lift-stats-cards",
    category: "components",
    title: "Glass lift cards with light tracking",
    summary: "Frosted stat cards that lift on hover while a soft light pool tracks the cursor along their top edge.",
    author: "MotionVault",
    tags: ["glass", "card", "hover", "lift", "spotlight", "stats"],
    tech: ["html", "css", "javascript"],
    stars: 348, views: 0, copies: 0, featured: false, published: true,
    html: glassLift,
    prompt:
      "Build a row of three frosted-glass stat cards: backdrop-blur translucent surfaces with light borders, a title, dim description and a huge gradient-clipped metric number. On hover cards rise 10px with a deep shadow and fuchsia border glow, and a radial light pool (pseudo-element at top edge) follows the cursor horizontally via a --mx custom property updated on pointermove. Middle card has cyan accent. Vanilla JS, dark background.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w20-wx",
    slug: "animated-weather-mini-icons",
    category: "elements",
    title: "Animated weather mini icons",
    summary: "Spinning glowing sun, floating cloud and a raining cloud with looping raindrop streaks — all CSS keyframes.",
    author: "MotionVault",
    tags: ["weather", "icon", "sun", "rain", "keyframes", "ambient"],
    tech: ["html", "css"],
    stars: 296, views: 0, copies: 0, featured: false, published: true,
    html: weather,
    prompt:
      "Create three animated weather icon cards (Clear/Cloudy/Rain): the sun glyph slowly rotates 360° with an amber glow shadow; the cloud bobs up and down gently; the rain cloud has three gradient raindrop streaks beneath it that fall on staggered linear loops (fade in, translate down, fade out). Icons sit on small glass cards with uppercase labels. Pure CSS keyframes, simple emoji glyphs only.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w20-star",
    slug: "hover-preview-star-rating",
    category: "components",
    title: "Star rating input with hover preview",
    summary: "Five stars light up on hover with spring scale on the previewed one; clicking locks the rating and label.",
    author: "MotionVault",
    tags: ["rating", "stars", "input", "form", "feedback"],
    tech: ["html", "css", "javascript"],
    stars: 365, views: 0, copies: 0, featured: false, published: true,
    html: starRate,
    prompt:
      "Build a star rating input: five large star characters in a row, dim by default; hovering lights all stars up to the pointer in amber with a glow and scales the current star 1.25 with a spring ease, leaving the mouse restores the last clicked value; clicking locks the rating and updates an uppercase label ('hated it' through 'loved it!'). Vanilla JS generated stars with mouseenter/click handlers and a mouseleave reset.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

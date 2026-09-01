import { Item } from "../types";
import { doc } from "./wrap";

// ================================================================ COMPONENT: Infinite auto-scroll logo marquee
const logoMarquee = doc({
  body: `
<p class="lm-hint">Trusted by teams shipping at the speed of thought</p>
<div class="lm-row" style="--d:26s">
  <div class="lm-track">
    ${Array.from({ length: 2 })
      .map(
        () =>
          ["◆ NODEWAVE", "✦ HYPERCARD", "◈ FLUXGRID", "⬡ NEBULA LABS", "▲ ORBITAL", "✺ QUANTA", "◉ BYTEFORGE", "✧ ZENITH"]
            .map((l) => `<span class="lm-logo">${l}</span>`)
            .join("")
      )
      .join("")}
  </div>
</div>
<div class="lm-row lm-rev" style="--d:34s">
  <div class="lm-track">
    ${Array.from({ length: 2 })
      .map(
        () =>
          ["⬟ STELLAR", "✦ PULSAR.IO", "◈ KINETIC", "◆ DEEPFIELD", "▲ AXIOM", "✧ HELIX", "◉ CIPHER", "⬡ VOIDLINE"]
            .map((l) => `<span class="lm-logo">${l}</span>`)
            .join("")
      )
      .join("")}
  </div>
</div>`,
  css: `
.lm-hint{text-align:center;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--dim);margin-bottom:34px}
.lm-row{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);margin:14px 0}
.lm-track{display:flex;width:max-content;animation:lm var(--d) linear infinite}
.lm-rev .lm-track{animation-direction:reverse}
.lm-row:hover .lm-track{animation-play-state:paused}
.lm-logo{padding:16px 34px;margin:0 10px;border:1px solid var(--line);border-radius:14px;background:var(--panel);font-family:var(--font-mono,monospace);font-weight:700;font-size:17px;letter-spacing:.12em;color:rgba(236,234,249,.55);white-space:nowrap;transition:all .25s}
.lm-logo:hover{color:#fff;border-color:rgba(34,211,238,.5);box-shadow:0 0 24px -8px rgba(34,211,238,.6);transform:translateY(-3px)}
@keyframes lm{to{transform:translateX(-50%)}}
`,
});

// ================================================================ COMPONENT: Animated mesh gradient
const mesh = doc({
  body: `
<div class="mg-wrap">
  <div class="mg-b mg-b1"></div><div class="mg-b mg-b2"></div><div class="mg-b mg-b3"></div><div class="mg-b mg-b4"></div>
  <div class="mg-content"><h2>MESH</h2><p>Four blurred radial color fields, slowly breathing.</p></div>
</div>`,
  css: `
.mg-wrap{position:fixed;inset:0;overflow:hidden;background:#0a0818}
.mg-b{position:absolute;border-radius:50%;filter:blur(90px);mix-blend-mode:screen;opacity:.65}
.mg-b1{width:46vw;height:46vw;left:-10%;top:-15%;background:radial-gradient(circle,#7c3aed,transparent 70%);animation:mg1 18s ease-in-out infinite}
.mg-b2{width:42vw;height:42vw;right:-12%;top:10%;background:radial-gradient(circle,#06b6d4,transparent 70%);animation:mg2 22s ease-in-out infinite}
.mg-b3{width:40vw;height:40vw;left:20%;bottom:-20%;background:radial-gradient(circle,#d946ef,transparent 70%);animation:mg3 26s ease-in-out infinite}
.mg-b4{width:30vw;height:30vw;right:15%;bottom:5%;background:radial-gradient(circle,#f59e0b,transparent 70%);opacity:.4;animation:mg1 30s ease-in-out infinite reverse}
@keyframes mg1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(14vw,10vh) scale(1.25)}}
@keyframes mg2{0%,100%{transform:translate(0,0) scale(1.1)}50%{transform:translate(-12vw,16vh) scale(.9)}}
@keyframes mg3{0%,100%{transform:translate(0,0) scale(.95)}50%{transform:translate(10vw,-14vh) scale(1.2)}}
.mg-content{position:relative;z-index:2;height:100%;display:grid;place-content:center;text-align:center;pointer-events:none}
.mg-content h2{font-size:clamp(60px,14vw,160px);font-weight:900;letter-spacing:.1em;color:#fff;mix-blend-mode:overlay;text-shadow:0 10px 60px rgba(0,0,0,.4)}
.mg-content p{margin-top:10px;letter-spacing:.25em;text-transform:uppercase;font-size:13px;color:rgba(255,255,255,.85)}
`,
});

// ================================================================ ELEMENT: Floating action button with fan menu
const fab = doc({
  body: `
<div class="fb-stage">
  <p class="fb-hint">Click the glowing button</p>
  <div class="fb-wrap" id="fab">
    <button class="fb-item fb-i1" title="Like">♥</button>
    <button class="fb-item fb-i2" title="Share">↗</button>
    <button class="fb-item fb-i3" title="Bookmark">★</button>
    <button class="fb-item fb-i4" title="Copy">⧉</button>
    <button class="fb-main" id="fbmain">✦</button>
  </div>
</div>`,
  css: `
.fb-stage{min-height:60vh;display:grid;place-items:center;position:relative}
.fb-hint{position:absolute;top:22%;left:0;right:0;text-align:center;font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim)}
.fb-wrap{position:relative;width:74px;height:74px}
.fb-main,.fb-item{position:absolute;inset:0;width:74px;height:74px;border-radius:50%;border:none;display:grid;place-items:center;font-size:26px;cursor:pointer;transition:transform .35s cubic-bezier(.34,1.6,.64,1),opacity .3s}
.fb-main{background:linear-gradient(135deg,var(--v1),var(--v2));color:#fff;box-shadow:0 14px 34px -10px rgba(217,70,239,.9);z-index:5}
.fb-item{background:var(--panel);border:1px solid var(--line);color:var(--c1);font-size:20px;opacity:0;transform:scale(.4);pointer-events:none;z-index:4}
.fb-wrap.open .fb-main{transform:rotate(135deg)}
.fb-wrap.open .fb-item{opacity:1;transform:scale(1);pointer-events:auto}
.fb-wrap.open .fb-i1{transform:translateY(-84px) scale(1)}
.fb-wrap.open .fb-i2{transform:translate(-62px,-62px) scale(1)}
.fb-wrap.open .fb-i3{transform:translate(-84px,0) scale(1)}
.fb-wrap.open .fb-i4{transform:translate(-62px,62px) scale(1)}
.fb-item:hover{background:rgba(34,211,238,.12);box-shadow:0 0 20px -6px rgba(34,211,238,.7)}
`,
  js: `
const fab=document.getElementById('fab');
document.getElementById('fbmain').addEventListener('click',()=>fab.classList.toggle('open'));
`,
});

// ================================================================ ELEMENT: Expanding accordion cards (photo stack)
const accordion = doc({
  body: `
<div class="ac-deck" id="deck">
  ${[
    ["NEON", "linear-gradient(135deg,#7c3aed,#d946ef)", "Tokyo at 3am"],
    ["CYAN", "linear-gradient(135deg,#0891b2,#22d3ee)", "Signal in the noise"],
    ["EMBER", "linear-gradient(135deg,#f97316,#ec4899)", "Heat of the loop"],
    ["VOID", "linear-gradient(135deg,#1e1b4b,#0ea5e9)", "Deep space drift"],
    ["GOLD", "linear-gradient(135deg,#b45309,#facc15)", "Luxury pixels"],
  ]
    .map(
      ([t, g, s], i) =>
        `<div class="ac-card ${i === 0 ? "on" : ""}" style="background:${g}">
      <span class="ac-num">0${i + 1}</span>
      <div class="ac-text"><b>${t}</b><span>${s}</span></div>
    </div>`
    )
    .join("")}
</div>`,
  css: `
.ac-deck{display:flex;gap:12px;width:min(900px,94vw);height:340px}
.ac-card{position:relative;flex:.6;border-radius:22px;overflow:hidden;cursor:pointer;transition:flex .5s cubic-bezier(.22,1,.36,1);display:flex;align-items:flex-end;padding:22px;color:#fff;box-shadow:0 20px 50px -20px rgba(0,0,0,.7)}
.ac-card.on{flex:2.4}
.ac-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55))}
.ac-num{position:absolute;top:18px;left:20px;font-family:var(--font-mono,monospace);font-size:13px;letter-spacing:.2em;opacity:.7;z-index:1}
.ac-text{position:relative;z-index:1;display:flex;flex-direction:column;gap:4px;white-space:nowrap;opacity:0;transform:translateY(10px);transition:all .4s .1s}
.ac-card.on .ac-text{opacity:1;transform:none}
.ac-text b{font-size:30px;font-weight:900;letter-spacing:.04em}
.ac-text span{font-size:13px;letter-spacing:.12em;text-transform:uppercase;opacity:.85}
`,
  js: `
const cards=[...document.querySelectorAll('.ac-card')];
cards.forEach(c=>c.addEventListener('click',()=>cards.forEach(x=>x.classList.toggle('on',x===c))));
`,
});

// ================================================================ ANIMATION: Typewriter terminal boot
const termBoot = doc({
  body: `
<div class="tb-window">
  <div class="tb-bar"><span class="tb-dot r"></span><span class="tb-dot y"></span><span class="tb-dot g"></span><span class="tb-title">zsh — motionvault</span></div>
  <div class="tb-body" id="tb"></div>
</div>`,
  css: `
.tb-window{width:min(640px,92vw);border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.14);background:rgba(6,8,18,.92);box-shadow:0 40px 90px -30px rgba(0,0,0,.9);font-family:var(--font-mono,monospace)}
.tb-bar{display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.08)}
.tb-dot{width:11px;height:11px;border-radius:50%}
.tb-dot.r{background:#ff5f57}.tb-dot.y{background:#febc2e}.tb-dot.g{background:#28c840}
.tb-title{margin-left:10px;font-size:12px;color:var(--dim)}
.tb-body{padding:20px 22px;font-size:13.5px;line-height:1.9;min-height:280px;color:#c8f7d8}
.tb-line{white-space:pre-wrap}
.tb-in{color:#22d3ee}.tb-ok{color:#6ee7b7}.tb-dim{color:var(--dim)}.tb-prompt{color:#d946ef}
.tb-cursor{display:inline-block;width:8px;height:15px;background:#6ee7b7;vertical-align:-2px;animation:tbblink .8s steps(1) infinite}
@keyframes tbblink{50%{opacity:0}}
`,
  js: `
const out=document.getElementById('tb');
const script=[
 ['in','npx motionvault --new portfolio'],
 ['dim','⠿ resolving vault...'],
 ['ok','✓ 74 assets fetched in 42ms'],
 ['dim','⠿ rendering preview shaders...'],
 ['ok','✓ aurora background compiled'],
 ['ok','✓ particle system online'],
 ['dim','⠿ wiring AI prompts...'],
 ['ok','✓ 74 prompts synced to clipboard daemon'],
 ['in','motionvault deploy --edge'],
 ['ok','✓ deployed to 280 edge nodes'],
 ['ok','✓ your vault is live → https://you.motionvault.dev'],
];
let li=0;
function line(){
  if(li>=script.length){out.innerHTML+='<span class="tb-cursor"></span>';return}
  const [type,txt]=script[li++];
  const div=document.createElement('div');
  div.className='tb-line';
  if(type==='in')div.innerHTML='<span class="tb-prompt">➜ </span><span class="tb-in"></span>';
  else div.innerHTML='<span class="'+(type==='ok'?'tb-ok':'tb-dim')+'"></span>';
  const target=div.lastChild;out.appendChild(div);
  let ci=0;
  (function type(){
    target.textContent=txt.slice(0,++ci);
    if(ci<txt.length)setTimeout(type,type==='in'?46:18);
    else setTimeout(line,type==='in'?380:240);
  })();
}
line();
`,
});

// ================================================================ ANIMATION: Aurora border traveling card
const auroraBorder = doc({
  body: `
<div class="ab-card">
  <div class="ab-head"><span class="ab-live">● LIVE</span><b>MotionVault API</b></div>
  <h2>Streaming UI, <span>instantly.</span></h2>
  <p>An edge-rendered border that keeps orbiting the card. Copy the prompt, ship the vibe.</p>
  <div class="ab-row"><button class="ab-cta">Get API key</button><button class="ab-ghost">Docs</button></div>
</div>`,
  css: `
.ab-card{position:relative;width:min(440px,92vw);border-radius:26px;background:rgba(10,10,24,.92);padding:40px 34px;text-align:center;z-index:0;overflow:visible}
.ab-card::before{content:'';position:absolute;inset:-2px;border-radius:28px;background:conic-gradient(from var(--ab,0deg),transparent 0 60%,#22d3ee 70%,#d946ef 80%,#8b5cf6 90%,transparent 100%);animation:abspin 4s linear infinite;z-index:-1;filter:blur(6px);opacity:.9}
@property --ab{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes abspin{to{--ab:360deg}}
.ab-live{font-size:11px;letter-spacing:.2em;color:#6ee7b7}
.ab-head{display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;color:var(--dim);margin-bottom:22px}
.ab-head b{color:var(--txt)}
.ab-card h2{font-size:32px;font-weight:900;letter-spacing:-.02em;line-height:1.15}
.ab-card h2 span{background:linear-gradient(100deg,var(--c1),var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent}
.ab-card p{margin:16px 0 26px;color:var(--dim);font-size:14.5px;line-height:1.7}
.ab-row{display:flex;gap:12px;justify-content:center}
.ab-cta{padding:13px 24px;border-radius:12px;border:none;background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;font-weight:800;font-size:14px;box-shadow:0 14px 34px -12px rgba(217,70,239,.9);cursor:pointer;transition:transform .2s}
.ab-cta:hover{transform:translateY(-2px)}
.ab-ghost{padding:13px 24px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--txt);font-weight:700;font-size:14px;cursor:pointer}
`,
});

export const WAVE8_ITEMS: Item[] = [
  {
    id: "w8-logo-marquee",
    slug: "infinite-logo-marquee-rows",
    category: "components",
    title: "Infinite Dual Logo Marquee",
    summary: "Two social-proof logo rows drifting in opposite directions, edge-faded with masks, pausing on hover.",
    author: "MotionVault",
    tags: ["marquee", "logos", "social-proof", "infinite-scroll", "landing"],
    tech: ["html", "css"],
    stars: 312,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: logoMarquee,
    prompt:
      "Build two infinite auto-scrolling logo/wordmark marquee rows for a landing page. Each row clips content with a horizontal mask-image fading at both edges, contains a doubled flex track animating translateX from 0 to -50% linearly (26s and 34s, opposite directions). Logos are monospace wordmark chips with border, translucent fill and dim text; on hover they glow cyan and lift; hovering a row pauses it. Include a small uppercase hint caption above. Pure CSS animation, no JS.",
    status: "curated",
    createdAt: "2026-09-01T11:00:00.000Z",
    updatedAt: "2026-09-01T11:00:00.000Z",
  },
  {
    id: "w8-mesh",
    slug: "animated-mesh-gradient-field",
    category: "components",
    title: "Animated Mesh Gradient Field",
    summary: "Breathing screen-blend color blobs behind huge overlay type — the Liquid/Stripe-style ambient backdrop.",
    author: "MotionVault",
    tags: ["mesh", "gradient", "background", "ambient", "blobs"],
    tech: ["html", "css"],
    stars: 378,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: mesh,
    prompt:
      "Create an animated mesh-gradient background: four large blurred radial color blobs (violet, cyan, fuchsia, amber) on a dark canvas, mix-blend-mode screen, each with its own 18-30s ease-in-out keyframe loop translating/scaling so the field slowly breathes and morphs. Center a huge MESH headline in white with overlay blend and a caption. Pure CSS, no JS, blobs sized in viewport units so it scales.",
    status: "curated",
    createdAt: "2026-09-01T11:05:00.000Z",
    updatedAt: "2026-09-01T11:05:00.000Z",
  },
  {
    id: "w8-fab",
    slug: "fan-action-floating-button",
    category: "elements",
    title: "Floating Action Button with Fan Menu",
    summary: "A glowing FAB that springs open four action items fanning out in an arc, with the main icon rotating.",
    author: "MotionVault",
    tags: ["fab", "menu", "actions", "spring", "mobile"],
    tech: ["html", "css", "javascript"],
    stars: 288,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: fab,
    prompt:
      "Build a floating action button with an expanding fan menu. A circular gradient main button (✦ icon, strong fuchsia shadow) sits bottom-center of a stage; clicking toggles an .open class that springs four smaller glass action items out in a 180° upward arc (up, up-left, left, down-left offsets) using overshoot cubic-bezier(.34,1.6,.64,1), each scaling from 0.4 to 1 with staggered feel; the main icon rotates 135° when open. Items have hover glow. Tiny JS toggle only.",
    status: "curated",
    createdAt: "2026-09-01T11:10:00.000Z",
    updatedAt: "2026-09-01T11:10:00.000Z",
  },
  {
    id: "w8-accordion",
    slug: "expanding-accordion-cards-deck",
    category: "elements",
    title: "Expanding Accordion Card Deck",
    summary: "Five gradient panels in a row — click one and it smoothly stretches while the others shrink to a rail.",
    author: "MotionVault",
    tags: ["accordion", "cards", "flex", "gallery", "expanding"],
    tech: ["html", "css", "javascript"],
    stars: 331,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: accordion,
    prompt:
      "Create an expanding accordion gallery: five rounded gradient panels in a flex row at 340px height, each flex-grow 0.6 with a numbered corner and a label (title + uppercase subtitle) hidden until expanded. Clicking a panel gives it .on with flex-grow 2.4 and reveals its label with a slight delay via a cubic-bezier(.22,1,.36,1) flex transition; a bottom gradient keeps text readable. Vanilla JS toggles the class between panels. Five named colorways (neon violet, cyan, ember, void, gold).",
    status: "curated",
    createdAt: "2026-09-01T11:15:00.000Z",
    updatedAt: "2026-09-01T11:15:00.000Z",
  },
  {
    id: "w8-termboot",
    slug: "terminal-boot-sequence",
    category: "animations",
    title: "Terminal Boot Sequence",
    summary: "A macOS-style terminal window that types out a deploy script line by line — commands in cyan, checks in green.",
    author: "MotionVault",
    tags: ["terminal", "typewriter", "boot", "deploy", "mono"],
    tech: ["html", "css", "javascript"],
    stars: 265,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: termBoot,
    prompt:
      "Build an animated terminal boot sequence inside a macOS-style window (rounded, three traffic-light dots, title label). A scripted list of lines types out character by character: user commands after a magenta prompt in cyan typed slowly, spinner-style dim lines, green ✓ success lines typed quickly, each line sequenced with delays via nested timeouts. Ends with a blinking block cursor. Content tells the story of `npx motionvault` fetching assets and deploying to edge nodes. Monospace font, dark translucent panel, soft big shadow.",
    status: "curated",
    createdAt: "2026-09-01T11:20:00.000Z",
    updatedAt: "2026-09-01T11:20:00.000Z",
  },
  {
    id: "w8-aurora-border",
    slug: "aurora-traveling-border-card",
    category: "animations",
    title: "Aurora Traveling Border Card",
    summary: "A conic-gradient border light that endlessly orbits the card using @property angle animation and blur glow.",
    author: "MotionVault",
    tags: ["border", "aurora", "conic-gradient", "card", "glow"],
    tech: ["html", "css"],
    stars: 302,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: auroraBorder,
    prompt:
      "Create a promo card with an endlessly traveling aurora border. Use a pseudo-element slightly larger than the card with a conic-gradient that is transparent for most of the wheel and bright cyan→fuchsia→violet around a 40-degree arc, then animate the conic angle with @property --ab (syntax <angle>) rotating 0→360deg over 4s, plus a soft blur and glow; the card itself has a solid dark fill with rounded corners sitting above it. Content: LIVE pill, headline with gradient-clipped words, muted copy, gradient CTA + ghost button. Pure CSS (with @property), no JS.",
    status: "curated",
    createdAt: "2026-09-01T11:25:00.000Z",
    updatedAt: "2026-09-01T11:25:00.000Z",
  },
];

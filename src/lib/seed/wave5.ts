import { Item } from "../types";
import { doc } from "./wrap";

// ================================================================ COMPONENT: Spotlight border card
const spotlightCard = doc({
  body: `
<div class="sp-card">
  <div class="sp-glow"></div>
  <div class="sp-body">
    <div class="sp-icon">◈</div>
    <h3>Spotlight Card</h3>
    <p>Move your cursor across the card — the border chases the light. Pure CSS + a tiny pointer listener.</p>
    <button class="sp-btn">Get started</button>
  </div>
</div>`,
  css: `
.sp-card{position:relative;width:min(420px,92vw);border-radius:22px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);overflow:hidden;transform:translateZ(0)}
.sp-card::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.5px;background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(34,211,238,.9),rgba(217,70,239,.5) 40%,transparent 70%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .3s;pointer-events:none}
.sp-card:hover::before{opacity:1}
.sp-glow{position:absolute;inset:0;background:radial-gradient(300px circle at var(--mx,50%) var(--my,50%),rgba(139,92,246,.15),transparent 60%);pointer-events:none}
.sp-body{position:relative;padding:38px 30px;text-align:center}
.sp-icon{width:58px;height:58px;margin:0 auto 18px;display:grid;place-items:center;font-size:26px;border-radius:16px;background:linear-gradient(135deg,rgba(34,211,238,.15),rgba(217,70,239,.15));border:1px solid rgba(255,255,255,.1);color:#67e8f9}
.sp-body h3{font-size:21px;font-weight:800;margin-bottom:10px}
.sp-body p{color:var(--dim);font-size:14px;line-height:1.7;margin-bottom:22px}
.sp-btn{padding:12px 26px;border-radius:12px;background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;font-weight:700;font-size:14px;box-shadow:0 12px 34px -12px rgba(217,70,239,.8);transition:transform .2s}
.sp-btn:hover{transform:translateY(-2px)}
`,
  js: `
const card=document.querySelector('.sp-card');
card.addEventListener('pointermove',e=>{
  const r=card.getBoundingClientRect();
  card.style.setProperty('--mx',(e.clientX-r.left)+'px');
  card.style.setProperty('--my',(e.clientY-r.top)+'px');
});
`,
});

// ================================================================ COMPONENT: 3D tilt stack of cards
const tiltStack = doc({
  body: `
<div class="ts-scene">
  <div class="ts-stack" id="stack">
    <div class="ts-card ts-c3"><b>v2.0</b><span>Released</span></div>
    <div class="ts-card ts-c2"><b>v1.5</b><span>Animations</span></div>
    <div class="ts-card ts-c1"><b>v1.0</b><span>Launch</span></div>
    <div class="ts-card ts-front"><b>MotionVault</b><span>Hover to fan the stack</span></div>
  </div>
</div>`,
  css: `
.ts-scene{perspective:1100px;display:grid;place-items:center;min-height:70vh}
.ts-stack{position:relative;width:300px;height:200px;transform-style:preserve-3d;transition:transform .4s cubic-bezier(.22,1,.36,1)}
.ts-card{position:absolute;inset:0;border-radius:20px;padding:26px;display:flex;flex-direction:column;justify-content:flex-end;gap:4px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(160deg,rgba(139,92,246,.25),rgba(10,10,25,.95));box-shadow:0 30px 60px -20px rgba(0,0,0,.8);transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .4s;transform-origin:center;backface-visibility:hidden}
.ts-card b{font-size:20px;font-weight:800}
.ts-card span{font-size:12.5px;color:var(--dim)}
.ts-c3{transform:translateZ(-45px) translateY(-18px) scale(.92);opacity:.5}
.ts-c2{transform:translateZ(-28px) translateY(-10px) scale(.95);opacity:.7}
.ts-c1{transform:translateZ(-12px) translateY(-4px) scale(.98);opacity:.9}
.ts-front{background:linear-gradient(160deg,rgba(217,70,239,.35),rgba(10,10,25,.95))}
.ts-stack:hover .ts-c3{transform:translateZ(-60px) translateY(-46px) translateX(30px) rotateY(14deg) scale(.92)}
.ts-stack:hover .ts-c2{transform:translateZ(-30px) translateY(-26px) translateX(15px) rotateY(8deg) scale(.95)}
.ts-stack:hover .ts-c1{transform:translateZ(-10px) translateY(-10px) rotateY(-6deg)}
.ts-stack:hover .ts-front{transform:translateZ(20px) rotateX(4deg)}
`,
  js: `
const stack=document.getElementById('stack');
addEventListener('pointermove',e=>{
  const rx=(.5-e.clientY/innerHeight)*8, ry=(e.clientX/innerWidth-.5)*12;
  stack.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
});
addEventListener('pointerleave',()=>stack.style.transform='');
`,
});

// ================================================================ ELEMENT: Shimmer button loading state
const shimmerBtn = doc({
  body: `
<div class="sb-col">
  <button class="sb" id="sb1"><span class="sb-label">Deploy project</span><span class="sb-load">Deploying<span class="sb-dots"></span></span><span class="sb-done">✓ Live</span></button>
  <button class="sb sb-cyan" id="sb2"><span class="sb-label">Generate with AI</span><span class="sb-load">Thinking<span class="sb-dots"></span></span><span class="sb-done">✓ Done</span></button>
  <p style="font-size:12px;color:var(--dim);letter-spacing:.2em;text-transform:uppercase">Click to cycle states</p>
</div>`,
  css: `
.sb-col{display:flex;flex-direction:column;gap:22px;align-items:center}
.sb{position:relative;width:240px;padding:16px;border-radius:14px;border:none;font-size:15px;font-weight:800;color:#fff;cursor:pointer;overflow:hidden;background:linear-gradient(120deg,var(--v1),var(--v2));box-shadow:0 16px 40px -14px rgba(217,70,239,.8);transition:transform .2s}
.sb:hover{transform:translateY(-2px)}
.sb-cyan{background:linear-gradient(120deg,var(--c1),var(--v1));box-shadow:0 16px 40px -14px rgba(34,211,238,.7)}
.sb::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);background-size:220% 100%;background-position:200% 0;opacity:0}
.sb.loading::after{opacity:1;animation:sbsh 1.2s linear infinite}
@keyframes sbsh{to{background-position:-120% 0}}
.sb-label,.sb-load,.sb-done{display:inline-flex;align-items:center;gap:2px}
.sb-load,.sb-done{display:none}
.sb.loading .sb-label,.sb.done .sb-label{display:none}
.sb.loading .sb-load{display:inline-flex}
.sb.done .sb-done{display:inline-flex}
.sb.done{background:linear-gradient(120deg,#10b981,#059669)}
.sb-dots::after{content:'';animation:sbd 1.4s steps(4) infinite}
@keyframes sbd{0%{content:''}25%{content:'.'}50%{content:'..'}75%{content:'...'}}
`,
  js: `
document.querySelectorAll('.sb').forEach(b=>{
  b.addEventListener('click',()=>{
    if(b.classList.contains('loading'))return;
    b.classList.add('loading');
    setTimeout(()=>{b.classList.remove('loading');b.classList.add('done');
      setTimeout(()=>b.classList.remove('done'),1800);
    },1600);
  });
});
`,
});

// ================================================================ ELEMENT: Frosted glass pricing card
const glassPricing = doc({
  body: `
<div class="gp-wrap">
  <div class="gp-blob gp-a"></div><div class="gp-blob gp-b"></div>
  <div class="gp-card gp-pro">
    <div class="gp-flag">MOST POPULAR</div>
    <h3>Pro</h3>
    <div class="gp-price"><b>$19</b><span>/mo</span></div>
    <ul>
      <li>✓ All 54+ assets & prompts</li>
      <li>✓ React TSX downloads</li>
      <li>✓ New weekly drops</li>
      <li>✓ Commercial license</li>
    </ul>
    <button class="gp-cta">Start Pro</button>
  </div>
  <div class="gp-card">
    <h3>Free</h3>
    <div class="gp-price"><b>$0</b><span>/mo</span></div>
    <ul>
      <li>✓ 20 free assets</li>
      <li>✓ Live previews</li>
      <li>✓ Community support</li>
    </ul>
    <button class="gp-ghost">Get started</button>
  </div>
</div>`,
  css: `
.gp-wrap{position:relative;display:flex;gap:26px;flex-wrap:wrap;justify-content:center;align-items:center;padding:30px}
.gp-blob{position:absolute;width:340px;height:340px;border-radius:50%;filter:blur(90px);opacity:.4;pointer-events:none}
.gp-a{background:var(--v1);top:-60px;left:4%;animation:gpf 9s ease-in-out infinite}
.gp-b{background:var(--c1);bottom:-60px;right:4%;animation:gpf 11s ease-in-out infinite reverse}
@keyframes gpf{50%{transform:translate(40px,30px) scale(1.15)}}
.gp-card{position:relative;width:250px;border-radius:24px;padding:30px 26px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);box-shadow:0 30px 70px -30px rgba(0,0,0,.8);transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s}
.gp-card:hover{transform:translateY(-8px);border-color:rgba(217,70,239,.5)}
.gp-pro{transform:scale(1.06);border-color:rgba(217,70,239,.45);background:rgba(217,70,239,.08)}
.gp-pro:hover{transform:scale(1.06) translateY(-8px)}
.gp-flag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:10px;font-weight:800;letter-spacing:.15em;padding:5px 14px;border-radius:999px;background:linear-gradient(120deg,var(--v1),var(--v2));box-shadow:0 8px 22px -6px rgba(217,70,239,.8);white-space:nowrap}
.gp-card h3{font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.gp-price{margin:14px 0 18px;display:flex;align-items:baseline;gap:6px}
.gp-price b{font-size:42px;font-weight:900;letter-spacing:-.03em}
.gp-price span{color:var(--dim);font-size:13px}
.gp-card ul{list-style:none;display:flex;flex-direction:column;gap:11px;font-size:13.5px;color:rgba(236,234,249,.85);margin-bottom:24px}
.gp-cta{width:100%;padding:13px;border-radius:12px;background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;font-weight:800;font-size:14px;box-shadow:0 14px 34px -12px rgba(217,70,239,.8);transition:transform .2s}
.gp-cta:hover{transform:translateY(-2px)}
.gp-ghost{width:100%;padding:13px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04);color:#fff;font-weight:700;font-size:14px;transition:border-color .2s}
.gp-ghost:hover{border-color:var(--c1)}
`,
});

// ================================================================ ANIMATION: Ripple wave button
const rippleWave = doc({
  body: `
<div class="rw-stage">
  <button class="rw" id="rw"><span>Send pulse</span></button>
  <p style="position:fixed;bottom:30px;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim)">Click repeatedly</p>
</div>`,
  css: `
.rw-stage{display:grid;place-items:center;min-height:60vh}
.rw{position:relative;padding:18px 40px;border-radius:999px;font-size:16px;font-weight:800;color:#fff;background:linear-gradient(120deg,var(--v1),var(--v2));box-shadow:0 16px 44px -14px rgba(217,70,239,.9);overflow:visible;z-index:1}
.rw-wave{position:absolute;inset:0;border-radius:999px;border:2px solid rgba(217,70,239,.8);pointer-events:none;animation:rw .9s ease-out forwards}
@keyframes rw{0%{transform:scale(1);opacity:.9}100%{transform:scale(2.1);opacity:0}}
`,
  js: `
const btn=document.getElementById('rw');
btn.addEventListener('click',e=>{
  const w=document.createElement('span');
  w.className='rw-wave';
  btn.appendChild(w);
  setTimeout(()=>w.remove(),900);
});
`,
});

// ================================================================ ANIMATION: Floating gradient orbs background
const floatingOrbs = doc({
  body: `
<div class="fo-wrap">
  <div class="fo o1"></div><div class="fo o2"></div><div class="fo o3"></div><div class="fo o4"></div>
  <div class="fo-content"><h2>Ambient orbs</h2><p>Gaussian-blurred gradient blobs drifting on a loop — zero JS.</p></div>
</div>`,
  css: `
.fo-wrap{position:fixed;inset:0;overflow:hidden;background:#070711}
.fo{position:absolute;border-radius:50%;filter:blur(70px);opacity:.5;mix-blend-mode:screen}
.o1{width:420px;height:420px;background:var(--v1);top:-10%;left:-8%;animation:fo1 16s ease-in-out infinite}
.o2{width:360px;height:360px;background:var(--v2);top:30%;right:-10%;animation:fo2 20s ease-in-out infinite}
.o3{width:300px;height:300px;background:var(--c1);bottom:-12%;left:25%;animation:fo3 18s ease-in-out infinite}
.o4{width:260px;height:260px;background:#f59e0b;top:8%;left:55%;opacity:.3;animation:fo1 24s ease-in-out infinite reverse}
@keyframes fo1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(90px,60px) scale(1.15)}66%{transform:translate(-40px,100px) scale(.9)}
@keyframes fo2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-110px,80px) scale(1.2)}}
@keyframes fo3{0%,100%{transform:translate(0,0)}50%{transform:translate(70px,-90px) scale(1.18)}}
.fo-content{position:relative;z-index:2;display:grid;place-items:center;height:100%;text-align:center;padding:30px}
.fo-content h2{font-size:clamp(28px,4vw,44px);font-weight:900;letter-spacing:-.02em}
.fo-content p{margin-top:12px;color:var(--dim);font-size:15px}
`,
});

export const WAVE5_ITEMS: Item[] = [
  {
    id: "w5-spotlight-card",
    slug: "spotlight-border-card",
    category: "components",
    title: "Spotlight Border Card",
    summary: "A glass card whose gradient border and inner glow follow the cursor position — mask-composite trick, no canvas.",
    author: "MotionVault",
    tags: ["spotlight", "card", "border-glow", "glassmorphism", "cursor"],
    tech: ["html", "css", "javascript"],
    stars: 344,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: spotlightCard,
    prompt:
      "Build a glassmorphism card with a cursor-following spotlight border. The card has translucent fill and a 1.5px border drawn with a conic/radial gradient masked via mask-composite: exclude (padding-box vs content-box) so only the border shows; the gradient is a 220px radial circle positioned at CSS vars --mx/--my updated on pointermove. On hover the border opacity fades in; an inner radial glow layer follows the same vars. Include an icon tile, heading, muted description and a gradient CTA. Dark background, cyan-to-fuchsia gradient, smooth transitions, no libraries.",
    status: "curated",
    createdAt: "2026-08-31T09:00:00.000Z",
    updatedAt: "2026-08-31T09:00:00.000Z",
  },
  {
    id: "w5-tilt-stack",
    slug: "3d-tilt-card-stack",
    category: "components",
    title: "3D Tilt Card Stack",
    summary: "A fanned deck of release-note cards in perspective 3D — hover to fan them apart; the whole stack leans toward your mouse.",
    author: "MotionVault",
    tags: ["3d", "tilt", "cards", "perspective", "stack"],
    tech: ["html", "css", "javascript"],
    stars: 411,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: tiltStack,
    prompt:
      "Create a 3D fanned card stack inside a perspective scene. Four absolutely-positioned cards with preserve-3d: three behind are offset on translateZ and translateY with descending scale/opacity, one front card highlighted. On stack hover, the back cards fan out (translateX + rotateY stagger) while the front lifts on translateZ. A pointermove listener tilts the whole stack with rotateX/rotateY derived from cursor position (lerped via CSS transitions). Rounded 20px cards, glassy violet gradient fills, big soft shadows, dark backdrop.",
    status: "curated",
    createdAt: "2026-08-31T09:05:00.000Z",
    updatedAt: "2026-08-31T09:05:00.000Z",
  },
  {
    id: "w5-shimmer-btn",
    slug: "shimmer-loading-button-states",
    category: "elements",
    title: "Shimmer Button with Loading → Success States",
    summary: "Tri-state CTA: idle, animated shimmer sweep with ellipsis dots while loading, then a morphing green ✓ success state.",
    author: "MotionVault",
    tags: ["button", "loading", "shimmer", "states", "micro-interaction"],
    tech: ["html", "css", "javascript"],
    stars: 276,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: shimmerBtn,
    prompt:
      "Build a button with three visual states cycled on click: idle (gradient fill + drop shadow), loading (a diagonal white shine sweeps across via an ::after gradient translating background-position in a 1.2s loop, label swaps to 'Deploying...' with animated CSS ellipsis dots using steps(4) content animation), and success (fades to emerald gradient with a checkmark, auto-resets after ~1.8s). Rounded 14px, bold, lifts on hover. Provide two colorways (violet-fuchsia and cyan-violet). All transitions smooth, no libraries.",
    status: "curated",
    createdAt: "2026-08-31T09:10:00.000Z",
    updatedAt: "2026-08-31T09:10:00.000Z",
  },
  {
    id: "w5-glass-pricing",
    slug: "frosted-glass-pricing-cards",
    category: "elements",
    title: "Frosted Glass Pricing Cards",
    summary: "Backdrop-blur pricing tiers floating over animated aurora blobs; the popular plan scales up with a gradient flag.",
    author: "MotionVault",
    tags: ["pricing", "glassmorphism", "blur", "cards", "billing"],
    tech: ["html", "css"],
    stars: 298,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: glassPricing,
    prompt:
      "Design two frosted-glass pricing cards (Free and Pro) over animated aurora background blobs: two large blurred gradient circles (violet/cyan) drifting on multi-keyframe loops, mix-blend screen. Cards use translucent white fill, 1px light border, backdrop-filter blur(22px), rounded-24px, heavy soft shadows. Pro card scales to 1.06 with a fuchsia tint and a 'MOST POPULAR' gradient flag pill overlapping the top edge. Each card: tier name, huge price, feature checklist with check marks, full-width CTA (gradient for Pro, ghost for Free). Cards lift on hover. Wrap on mobile.",
    status: "curated",
    createdAt: "2026-08-31T09:15:00.000Z",
    updatedAt: "2026-08-31T09:15:00.000Z",
  },
  {
    id: "w5-ripple-wave",
    slug: "pulse-wave-ripple-button",
    category: "animations",
    title: "Pulse Wave Ripple Button",
    summary: "Each click emits an expanding ring that scales and fades from the pill CTA — stack clicks for a sonar effect.",
    author: "MotionVault",
    tags: ["ripple", "pulse", "button", "sonar", "click"],
    tech: ["html", "css", "javascript"],
    stars: 223,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: rippleWave,
    prompt:
      "Create a pill-shaped gradient CTA button that emits sonar-like pulse rings on every click. On click, append a span positioned over the button with matching border-radius, a 2px fuchsia border, that animates from scale(1)/opacity .9 to scale(2.1)/opacity 0 over .9s ease-out, then is removed. Rapid clicks stack multiple rings. Button has a strong colored drop shadow and hover lift. Dark stage, small hint caption. Vanilla JS only.",
    status: "curated",
    createdAt: "2026-08-31T09:20:00.000Z",
    updatedAt: "2026-08-31T09:20:00.000Z",
  },
  {
    id: "w5-floating-orbs",
    slug: "floating-gradient-orbs-background",
    category: "animations",
    title: "Floating Gradient Orbs Background",
    summary: "Four blurred gradient blobs drifting on independent long loops with screen blend — a zero-JS ambient backdrop.",
    author: "MotionVault",
    tags: ["orbs", "background", "ambient", "blobs", "css-only"],
    tech: ["html", "css"],
    stars: 259,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: floatingOrbs,
    prompt:
      "Create a pure-CSS animated background of four large blurred gradient orbs on a near-black canvas. Each orb is an absolutely positioned circle (260-420px) with blur(70px), opacity ~.4-0.5, mix-blend-mode screen, colored violet, fuchsia, cyan and amber. Give each its own long keyframe loop (16-24s, ease-in-out, infinite, one reversed) translating and scaling between 3 waypoints so the composition slowly morphs. Center a headline + sub copy above the orbs. No JavaScript.",
    status: "curated",
    createdAt: "2026-08-31T09:25:00.000Z",
    updatedAt: "2026-08-31T09:25:00.000Z",
  },
];

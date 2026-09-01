import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T14:00:00.000Z";

/* 1 — TICKER TAPE (edge-masked infinite marquee) */
const ticker = doc({
  kind: "page",
  body: `
<div class="ticker"><div class="track">
<span>✦ BUILD ✦ SHIP ✦ REPEAT ✦ MOTION VAULT ✦ 动效金库 ✦ MADE FOR PROMPTERS ✦ 100+ ASSETS ✦&nbsp;</span>
<span>✦ BUILD ✦ SHIP ✦ REPEAT ✦ MOTION VAULT ✦ 动效金库 ✦ MADE FOR PROMPTERS ✦ 100+ ASSETS ✦&nbsp;</span>
</div></div>`,
  css: `
body{display:block}
.ticker{overflow:hidden;border-block:1px solid rgba(217,70,239,.35);background:linear-gradient(90deg,rgba(124,58,237,.22),rgba(217,70,239,.22));padding:16px 0;
  -webkit-mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  position:absolute;top:50%;left:0;right:0;transform:translateY(-50%)}
.track{display:flex;width:max-content;animation:tick 22s linear infinite}
.track span{white-space:nowrap;font-weight:700;letter-spacing:.25em;font-size:15px;color:rgba(255,255,255,.9)}
@keyframes tick{to{transform:translateX(-50%)}}`,
});

/* 2 — SKELETON SHIMMER LOADERS */
const skeleton = doc({
  body: `
<div class="card"><div class="sk block"></div><div class="sk line w90"></div><div class="sk line w70"></div><div class="sk line w40"></div></div>`,
  css: `
.card{width:min(340px,100%);border:1px solid var(--line);border-radius:18px;padding:18px;background:var(--panel)}
.sk{border-radius:10px;background:rgba(255,255,255,.07);position:relative;overflow:hidden}
.sk::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(255,255,255,.16) 50%,transparent 80%);animation:sh 1.6s infinite}
.block{height:150px;margin-bottom:14px}.line{height:12px;margin:10px 0}
.w90{width:90%}.w70{width:70%}.w40{width:40%}
@keyframes sh{from{transform:translateX(-100%)}to{transform:translateX(100%)}}`,
});

/* 3 — HOVER-PAUSE LOGO MARQUEE */
const marquee = doc({
  kind: "page",
  body: `
<div class="mq"><div class="strip">
<div class="tile">✦</div><div class="tile a">◆</div><div class="tile b">●</div><div class="tile c">▲</div><div class="tile d">★</div>
<div class="tile a">✦</div><div class="tile b">◆</div><div class="tile c">●</div><div class="tile d">▲</div><div class="tile">★</div>
</div></div>`,
  css: `
body{display:block}
.mq{overflow:hidden;position:absolute;top:50%;left:0;right:0;transform:translateY(-50%);
  -webkit-mask:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);mask:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.strip{display:flex;gap:16px;width:max-content;animation:m 18s linear infinite;padding:20px 8px}
.mq:hover .strip{animation-play-state:paused}
.tile{width:110px;height:110px;display:grid;place-items:center;font-size:44px;border-radius:16px;border:1px solid var(--line);
  background:linear-gradient(145deg,rgba(124,58,237,.28),rgba(217,70,239,.16));transition:transform .3s,box-shadow .3s;flex:none}
.tile:hover{transform:scale(1.08) rotate(-4deg);box-shadow:0 0 30px rgba(217,70,239,.4)}
.a{background:linear-gradient(145deg,rgba(34,211,238,.28),rgba(124,58,237,.16))}
.b{background:linear-gradient(145deg,rgba(16,185,129,.28),rgba(34,211,238,.16))}
.c{background:linear-gradient(145deg,rgba(245,158,11,.24),rgba(244,63,94,.16))}
.d{background:linear-gradient(145deg,rgba(244,63,94,.28),rgba(168,85,247,.16))}
@keyframes m{to{transform:translateX(-50%)}}`,
});

/* 4 — CLIP-PATH SHUTTER TEXT REVEAL */
const clipReveal = doc({
  body: `
<h1 class="r"><span class="w">BUILD</span><span class="w">LOUDER</span></h1>
<p class="sub">text clips open like a camera shutter</p>`,
  css: `
.demo-inner{gap:14px}
h1.r{font-size:clamp(52px,10vw,110px);line-height:.92;font-weight:800;letter-spacing:-.03em;text-align:center}
.w{display:block;background:linear-gradient(90deg,#a78bfa,#e879f9,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:clip .9s cubic-bezier(.77,0,.18,1) both}
.w:nth-child(2){animation-delay:.15s}
.sub{margin-top:10px;color:var(--dim);animation:clip 1s .5s cubic-bezier(.77,0,.18,1) both}
@keyframes clip{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@media (prefers-reduced-motion:reduce){.w,.sub{animation:none}}`,
});

/* 5 — PROGRESSIVE BLUR-LOAD PLACEHOLDER */
const blurLoad = doc({
  body: `
<div class="ph"><div class="art"></div><div class="label">progressive blur · placeholders</div></div>`,
  css: `
.ph{width:min(420px,100%);border-radius:20px;border:1px solid var(--line);overflow:hidden;position:relative}
.art{height:230px;background:conic-gradient(from 120deg at 60% 40%,#7c3aed,#d946ef,#22d3ee,#10b981,#7c3aed);
  filter:blur(26px);transform:scale(1.15);animation:sharpen 2.4s ease infinite alternate}
.label{padding:14px;text-align:center;font-size:13px;color:rgba(255,255,255,.7);background:rgba(10,10,24,.6);backdrop-filter:blur(6px)}
@keyframes sharpen{0%{filter:blur(26px) saturate(.7)}100%{filter:blur(2px) saturate(1.2)}}
@media (prefers-reduced-motion:reduce){.art{animation:none;filter:blur(3px)}}`,
});

/* 6 — CONFETTI BURST BUTTON (click) */
const confettiBtn = doc({
  body: `<button id="cb" class="cb">Celebrate <span>🎉</span></button>`,
  css: `
.cb{position:relative;font-size:18px;font-weight:700;color:#fff;background:linear-gradient(90deg,#7c3aed,#d946ef);border:0;border-radius:14px;
  padding:16px 34px;cursor:pointer;box-shadow:0 10px 40px rgba(217,70,239,.4);transition:transform .15s}
.cb:active{transform:scale(.94)}
.cb span{display:inline-block;transition:transform .3s}
.cb:hover span{transform:rotate(25deg) scale(1.3)}
.piece{position:fixed;width:9px;height:9px;border-radius:2px;pointer-events:none;z-index:99}`,
  js: `
const btn=document.getElementById('cb');
const colors=['#f43f5e','#22d3ee','#a78bfa','#fbbf24','#34d399','#e879f9'];
btn.addEventListener('click',()=>{
  const r=btn.getBoundingClientRect();
  for(let i=0;i<44;i++){
    const c=document.createElement('i');c.className='piece';
    c.style.left=(r.left+r.width/2)+'px';c.style.top=(r.top+r.height/2)+'px';
    c.style.background=colors[i%colors.length];
    document.body.appendChild(c);
    const ang=Math.random()*Math.PI*2, dist=60+Math.random()*160;
    let vx=Math.cos(ang)*dist/60, vy=Math.sin(ang)*dist/60-6, x=0, y=0;
    (function fly(){
      vy+=.5;x+=vx;y+=vy;
      c.style.transform='translate('+x+'px,'+y+'px) rotate('+(x*6)+'deg)';
      c.style.opacity=String(Math.max(0,1+y/300));
      if(y<260) requestAnimationFrame(fly); else c.remove();
    })();
  }
});`,
});

export const WAVE11_ITEMS: Item[] = [
  {
    id: "w11-ticker",
    slug: "marquee-ticker-tape",
    category: "animations",
    title: "Marquee ticker tape",
    summary: "Infinite edge-masked ticker with a seamless looping track — promo bars, news tape, announcement strips.",
    author: "MotionVault",
    tags: ["marquee", "ticker", "scrolling", "badge", "strip"],
    tech: ["html", "css"],
    stars: 326, views: 0, copies: 0, featured: false, published: true,
    html: ticker,
    prompt:
      "Create an infinite horizontal ticker tape strip: a bold uppercase message scrolls in a seamless loop (duplicated track, translateX to -50% linear keyframes). Edge fade mask so it melts into the background, a subtle violet-fuchsia gradient band with a 1px neon border. Dark #070711 background, Space Grotesk. Pure CSS keyframes, no JS. Note that hover-pause can be added with animation-play-state.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w11-skeleton",
    slug: "skeleton-shimmer-loader",
    category: "animations",
    title: "Skeleton shimmer loading cards",
    summary: "Diagonal shimmer-sweep skeleton placeholders for cards and lists while content loads.",
    author: "MotionVault",
    tags: ["loading", "skeleton", "shimmer", "placeholder", "perceived"],
    tech: ["html", "css"],
    stars: 388, views: 0, copies: 0, featured: false, published: true,
    html: skeleton,
    prompt:
      "Build skeleton-loading placeholder blocks: a glass card with a big media block and three text lines of varying widths, filled with translucent white. A diagonal shimmer highlight sweeps across every block every 1.6s (a pseudo-element gradient translating from -100% to 100%). Rounded corners, dark theme, pure CSS. Respect prefers-reduced-motion by showing static blocks.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w11-marquee",
    slug: "hover-pause-logo-marquee",
    category: "animations",
    title: "Hover-pause logo marquee strip",
    summary: "Logo/glyph marquee that pauses on hover; tiles tilt and glow when individually hovered.",
    author: "MotionVault",
    tags: ["marquee", "logo", "hover-pause", "gallery", "strip"],
    tech: ["html", "css"],
    stars: 412, views: 0, copies: 0, featured: false, published: true,
    html: marquee,
    prompt:
      "Design a horizontal logo marquee: a row of colorful gradient tiles with large symbols scrolls infinitely (duplicated track, linear keyframes). The whole strip PAUSES on hover (animation-play-state: paused). Individual tiles scale up, tilt -4deg and glow fuchsia on hover. Edge fade mask on both sides. Pure CSS, dark background, no JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w11-clip",
    slug: "clip-path-shutter-text-reveal",
    category: "elements",
    title: "Clip-path shutter text reveal",
    summary: "Headline lines reveal left-to-right like a camera shutter opening, via animated inset clip-path.",
    author: "MotionVault",
    tags: ["text", "reveal", "clip-path", "hero", "typography"],
    tech: ["html", "css"],
    stars: 503, views: 0, copies: 0, featured: true, published: true,
    html: clipReveal,
    prompt:
      "Hero headline where each line of a huge gradient-clipped title reveals left-to-right like a shutter opening: animate clip-path from inset(0 100% 0 0) to inset(0 0 0 0) with a sharp cubic-bezier(.77,0,.18,1) over .9s; second line delayed .15s, subtitle delayed .5s. Gradient text violet to fuchsia to cyan, Space Grotesk extra-bold, tight letter-spacing, dark background. Respect reduced motion. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w11-blur",
    slug: "blur-progressive-placeholder",
    category: "animations",
    title: "Progressive blur-load placeholder",
    summary: "Blur-hash style placeholder that de-blurs and saturates into a sharp image — perceived performance win.",
    author: "MotionVault",
    tags: ["loading", "blur", "placeholder", "image", "perceived"],
    tech: ["html", "css"],
    stars: 298, views: 0, copies: 0, featured: false, published: true,
    html: blurLoad,
    prompt:
      "Create a progressive image-load placeholder: a media box shows a colorful conic-gradient 'blur hash' that starts heavily blurred (blur 26px, desaturated) and smoothly sharpens and saturates over 2.4s, looping alternately so the effect is visible; a frosted label bar underneath reads 'progressive blur · placeholders'. In real use swap the gradient for the actual image and run the animation once. Rounded 20px, dark UI, pure CSS; reduced-motion fallback shows a near-sharp state.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w11-confetti",
    slug: "confetti-burst-celebrate-button",
    category: "components",
    title: "Confetti burst celebrate button",
    summary: "Click the button and 44 colored pieces explode outward with gravity, rotation and fade — vanilla JS physics.",
    author: "MotionVault",
    tags: ["button", "confetti", "celebration", "micro-interaction", "click", "particles"],
    tech: ["html", "css", "javascript"],
    stars: 467, views: 0, copies: 0, featured: true, published: true,
    html: confettiBtn,
    prompt:
      "Build a celebration button: a gradient pill button labeled 'Celebrate 🎉'. On click, 44 small colored square pieces spawn at the button center and fly outward at random angles using requestAnimationFrame physics — initial radial velocity plus gravity accumulation each frame, rotation tied to horizontal travel, and opacity fading as they fall. Six vibrant colors; pieces are position:fixed and remove themselves after landing past a threshold. The button scales to .94 while pressed and the emoji wobbles on hover. Dark background, vanilla JS, no libraries.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

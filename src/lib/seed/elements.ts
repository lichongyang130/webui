import { Item } from "../types";
import { doc } from "./wrap";

// 1. Gradient border button
const gradientBorderBtn = doc({
  body: `<h3 class="t">Gradient Border Button</h3>
<button class="el-btn">Get started <i>→</i></button>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:8px}
.el-btn{position:relative;padding:16px 34px;border-radius:14px;font-size:15px;font-weight:700;color:#fff;
 background:rgba(13,13,30,.9);z-index:0;transition:transform .25s}
.el-btn::before{content:'';position:absolute;inset:-2px;border-radius:16px;z-index:-1;
 background:conic-gradient(from var(--a,0deg),var(--v1),var(--v2),var(--c1),var(--v1));
 animation:spinA 3s linear infinite}
.el-btn::after{content:'';position:absolute;inset:0;border-radius:14px;z-index:-1;background:rgba(13,13,30,.92)}
@property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes spinA{to{--a:360deg}}
.el-btn:hover{transform:translateY(-3px)}
.el-btn i{font-style:normal;display:inline-block;transition:transform .25s}
.el-btn:hover i{transform:translateX(5px)}`,
  js: ``,
});

// 2. Liquid loader
const liquidLoader = doc({
  body: `<h3 class="t">Liquid Orb Loader</h3><div class="orb"></div><p class="s">Pure CSS · morphing blobs</p>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px}
.orb{width:90px;height:90px;position:relative;filter:contrast(18)}
.orb::before,.orb::after{content:'';position:absolute;inset:0;border-radius:50%;
 background:linear-gradient(135deg,var(--v1),var(--v2));animation:morph 3.2s ease-in-out infinite}
.orb::after{background:linear-gradient(135deg,var(--c1),var(--v1));animation-delay:-1.6s;mix-blend-mode:screen}
@keyframes morph{
 0%,100%{border-radius:50% 50% 50% 50%;transform:translate(0,0) scale(1)}
 25%{border-radius:60% 40% 55% 45%;transform:translate(14px,-8px) scale(1.08)}
 50%{border-radius:40% 60% 45% 55%;transform:translate(-10px,10px) scale(.92)}
 75%{border-radius:55% 45% 60% 40%;transform:translate(-14px,-6px) scale(1.05)}}`,
  js: ``,
});

// 3. Neon toggle
const neonToggle = doc({
  body: `<h3 class="t">Neon Glow Toggle</h3>
<label class="tg"><input type="checkbox" checked><span class="tr"></span></label>
<label class="tg"><input type="checkbox"><span class="tr"></span></label>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:6px}
.tg{display:inline-block;cursor:pointer;margin:6px 14px}
.tg input{display:none}
.tr{display:block;width:68px;height:34px;border-radius:999px;background:rgba(255,255,255,.08);
 border:1px solid var(--line);position:relative;transition:all .35s cubic-bezier(.22,1,.36,1)}
.tr::before{content:'';position:absolute;top:3px;left:3px;width:26px;height:26px;border-radius:50%;
 background:#8a86b8;transition:all .35s cubic-bezier(.34,1.56,.64,1)}
.tg input:checked + .tr{background:linear-gradient(90deg,rgba(139,92,246,.35),rgba(217,70,239,.35));
 border-color:rgba(217,70,239,.6);box-shadow:0 0 22px -4px rgba(217,70,239,.7),inset 0 0 12px rgba(217,70,239,.25)}
.tg input:checked + .tr::before{left:37px;background:linear-gradient(135deg,var(--v1),var(--v2));
 box-shadow:0 0 14px rgba(217,70,239,.9)}`,
  js: ``,
});

// 4. Bouncing dots
const bounceDots = doc({
  body: `<h3 class="t">Staggered Bounce Dots</h3>
<div class="dots"><i></i><i></i><i></i><i></i><i></i></div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:10px}
.dots{display:flex;gap:10px;align-items:center;height:50px}
.dots i{width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,var(--c1),var(--v1));
 animation:bd 1.3s ease-in-out infinite}
.dots i:nth-child(2){animation-delay:.15s}.dots i:nth-child(3){animation-delay:.3s}
.dots i:nth-child(4){animation-delay:.45s}.dots i:nth-child(5){animation-delay:.6s}
@keyframes bd{0%,60%,100%{transform:translateY(0) scale(.7);opacity:.5}
 30%{transform:translateY(-20px) scale(1);opacity:1;box-shadow:0 8px 20px -4px rgba(139,92,246,.8)}}`,
  js: ``,
});

// 5. Glow checkbox
const glowCheckbox = doc({
  body: `<h3 class="t">Glow Checkboxes</h3>
<label class="cb"><input type="checkbox" checked><span class="bx"></span>Motion enabled</label><br/>
<label class="cb"><input type="checkbox" checked><span class="bx"></span>Particle effects</label><br/>
<label class="cb"><input type="checkbox"><span class="bx"></span>Reduce data</label>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:10px;display:block}
.cb{display:inline-flex;align-items:center;gap:12px;cursor:pointer;font-size:14.5px;color:var(--dim);
 margin:8px 0;transition:color .25s}
.cb:has(input:checked){color:var(--txt)}
.cb input{display:none}
.bx{width:24px;height:24px;border-radius:8px;border:1.5px solid var(--line);background:rgba(255,255,255,.04);
 position:relative;transition:all .3s cubic-bezier(.34,1.56,.64,1);flex:none}
.bx::after{content:'';position:absolute;left:7px;top:3px;width:7px;height:12px;
 border:solid #fff;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) scale(0);transition:transform .25s cubic-bezier(.34,1.56,.64,1)}
.cb input:checked + .bx{background:linear-gradient(135deg,var(--v1),var(--v2));border-color:transparent;
 box-shadow:0 0 18px -2px rgba(139,92,246,.8);transform:scale(1.06)}
.cb input:checked + .bx::after{transform:rotate(45deg) scale(1)}`,
  js: ``,
});

// 6. Shine input
const shineInput = doc({
  body: `<h3 class="t">Spotlight Input</h3>
<div class="in-wrap"><input class="in" placeholder="you@stellar.dev" type="email"/></div>
<div class="in-wrap"><input class="in" placeholder="Search 480+ components..." /></div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:12px;display:block}
.in-wrap{margin:12px auto;width:min(340px,90%);position:relative;border-radius:14px}
.in-wrap::after{content:'';position:absolute;inset:-1px;border-radius:15px;pointer-events:none;
 background:radial-gradient(180px circle at var(--ix,50%) var(--iy,50%),rgba(139,92,246,.9),transparent 60%);
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
 -webkit-mask-composite:xor;mask-composite:exclude;padding:1.5px;opacity:0;transition:opacity .3s}
.in-wrap:focus-within::after{opacity:1}
.in{width:100%;padding:15px 18px;border-radius:14px;border:1px solid var(--line);
 background:rgba(255,255,255,.04);color:var(--txt);font-size:14.5px;outline:none;transition:border-color .3s}
.in::placeholder{color:#6f6b96}
.in:focus{border-color:rgba(139,92,246,.6);background:rgba(139,92,246,.06)}`,
  js: `document.querySelectorAll('.in-wrap').forEach(w=>{
 w.addEventListener('mousemove',e=>{const r=w.getBoundingClientRect();
  w.style.setProperty('--ix',(e.clientX-r.left)+'px');w.style.setProperty('--iy',(e.clientY-r.top)+'px');});});`,
});

// 7. Heart burst
const heartBurst = doc({
  body: `<h3 class="t">Heart Burst Button</h3>
<button class="hb" id="hb"><span class="hb-i">♥</span><span class="hb-n">2.4k</span></button>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:10px}
.hb{display:inline-flex;align-items:center;gap:10px;padding:13px 26px;border-radius:999px;
 border:1px solid var(--line);background:rgba(255,255,255,.04);font-size:15px;font-weight:600;transition:all .3s}
.hb:hover{border-color:rgba(244,63,94,.5);background:rgba(244,63,94,.08)}
.hb-i{color:#f43f5e;font-size:19px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.hb.liked .hb-i{animation:pop .45s cubic-bezier(.34,1.56,.64,1);text-shadow:0 0 20px rgba(244,63,94,.9)}
@keyframes pop{40%{transform:scale(1.6)}70%{transform:scale(.85)}100%{transform:scale(1)}}
.spark{position:fixed;pointer-events:none;font-size:14px;animation:fly .8s ease-out forwards;z-index:9}
@keyframes fly{to{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0}}`,
  js: `const btn=document.getElementById('hb');
btn.addEventListener('click',()=>{
 btn.classList.toggle('liked');
 const n=btn.querySelector('.hb-n');
 let v=parseFloat(n.textContent);n.textContent=(btn.classList.contains('liked')?v+.1:v-.1).toFixed(1)+'k';
 for(let i=0;i<10;i++){const s=document.createElement('span');s.className='spark';s.textContent=['♥','✦','✧','♦'][i%4];
  const r=btn.getBoundingClientRect();s.style.left=(r.left+r.width/2)+'px';s.style.top=(r.top+r.height/2)+'px';
  s.style.setProperty('--dx',(Math.random()*160-80)+'px');s.style.setProperty('--dy',(Math.random()*-120-20)+'px');
  s.style.color=['#f43f5e','#d946ef','#8b5cf6'][i%3];document.body.appendChild(s);setTimeout(()=>s.remove(),800);}
});`,
});

// 8. Ripple button
const rippleBtn = doc({
  body: `<h3 class="t">Material Ripple Button</h3>
<button class="rp" id="rp">Click anywhere on me</button>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:10px}
.rp{position:relative;overflow:hidden;padding:17px 38px;border-radius:14px;font-size:15px;font-weight:700;
 color:#fff;background:linear-gradient(120deg,var(--v1),var(--v2));box-shadow:0 12px 36px -12px rgba(139,92,246,.8);transition:transform .2s}
.rp:active{transform:scale(.97)}
.ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.5);transform:scale(0);
 animation:rip .65s ease-out forwards;pointer-events:none}
@keyframes rip{to{transform:scale(3.2);opacity:0}}`,
  js: `document.getElementById('rp').addEventListener('click',e=>{
 const b=e.currentTarget,r=b.getBoundingClientRect();
 const c=document.createElement('span');c.className='ripple';
 const d=Math.max(r.width,r.height);c.style.width=c.style.height=d+'px';
 c.style.left=(e.clientX-r.left-d/2)+'px';c.style.top=(e.clientY-r.top-d/2)+'px';
 b.appendChild(c);setTimeout(()=>c.remove(),650);});`,
});

// 9. Skeleton shimmer
const skeleton = doc({
  body: `<h3 class="t">Skeleton Shimmer Cards</h3>
<div class="sk-grid">
 <div class="sk-card"><div class="sk sk-av"></div><div class="sk sk-l" style="width:60%"></div><div class="sk sk-l" style="width:90%"></div><div class="sk sk-l" style="width:75%"></div></div>
 <div class="sk-card"><div class="sk sk-av"></div><div class="sk sk-l" style="width:50%"></div><div class="sk sk-l" style="width:85%"></div><div class="sk sk-l" style="width:70%"></div></div>
</div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:14px}
.sk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;width:100%;max-width:560px}
.sk-card{border:1px solid var(--line);border-radius:16px;padding:18px;background:rgba(255,255,255,.03)}
.sk{border-radius:8px;background:rgba(255,255,255,.06);position:relative;overflow:hidden}
.sk::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(255,255,255,.12) 50%,transparent 80%);
 animation:shim 1.4s infinite;transform:translateX(-100%)}
@keyframes shim{to{transform:translateX(100%)}}
.sk-av{width:44px;height:44px;border-radius:50%;margin-bottom:14px}
.sk-l{height:12px;margin:10px 0}`,
  js: ``,
});

// 10. Progress ring
const progressRing = doc({
  body: `<h3 class="t">Animated Progress Rings</h3>
<div class="rings2">
 ${[
   { v: 82, c: "#8b5cf6", l: "Motion" },
   { v: 64, c: "#22d3ee", l: "Design" },
   { v: 95, c: "#d946ef", l: "Code" },
 ]
   .map(
     (r) => `<div class="rg"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"/><circle cx="60" cy="60" r="50" style="--p:${r.v};--c:${r.c}"/></svg><b>0%</b><span>${r.l}</span></div>`
   )
   .join("")}
</div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:14px}
.rings2{display:flex;gap:26px;flex-wrap:wrap;justify-content:center}
.rg{position:relative;width:120px;height:120px;display:grid;place-items:center}
.rg svg{position:absolute;inset:0;transform:rotate(-90deg)}
.rg circle{fill:none;stroke-width:9;stroke-linecap:round}
.rg circle:first-child{stroke:rgba(255,255,255,.08)}
.rg circle:last-child{stroke:var(--c);stroke-dasharray:314;stroke-dashoffset:314;
 filter:drop-shadow(0 0 6px var(--c));animation:fill 1.6s cubic-bezier(.22,1,.36,1) forwards}
@keyframes fill{to{stroke-dashoffset:calc(314 - 314 * var(--p) / 100)}}
.rg b{font-size:22px;font-weight:800}
.rg span{position:absolute;bottom:-26px;font-size:12px;color:var(--dim);letter-spacing:.1em;text-transform:uppercase}`,
  js: `document.querySelectorAll('.rg').forEach((rg,i)=>{
 const b=rg.querySelector('b'),target=[82,64,95][i];const start=performance.now();
 (function f(now){const p=Math.min((now-start)/1600,1);const e=1-Math.pow(1-p,3);
  b.textContent=Math.floor(target*e)+'%';if(p<1)requestAnimationFrame(f);})(start);
});`,
});

export const ELEMENT_ITEMS: Item[] = [
  {
    id: "el-gradbtn",
    slug: "rotating-gradient-border-button",
    category: "elements",
    title: "Rotating Gradient Border Button",
    summary: "A conic-gradient border that spins around a dark pill button via @property angle animation.",
    author: "Uiverse style",
    tags: ["button", "gradient", "border", "conic"],
    tech: ["html", "css"],
    stars: 4120,
    views: 33800,
    copies: 7600,
    featured: false,
    published: true,
    html: gradientBorderBtn,
    prompt: `Build a "Rotating Gradient Border Button" in pure HTML/CSS: a pill/rounded button with dark background rgba(13,13,30,.9), white bold label "Get started →". The animated border uses ::before positioned at inset:-2px with border-radius 16px, z-index -1, background a conic-gradient(from var(--a,0deg), violet #8b5cf6, fuchsia #d946ef, cyan #22d3ee, back to violet), animated by @property --a (syntax <angle>, initial 0deg) keyframes spinA rotating 0→360deg over 3s linear infinite. ::after with the dark bg at inset 0 masks the center so only the 2px ring shows. On hover the button lifts -3px and the arrow translates +5px. Dark #070711 stage. No JS needed.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-07-06T10:00:00Z",
    updatedAt: "2026-08-15T10:00:00Z",
  },
  {
    id: "el-orb",
    slug: "liquid-morphing-orb-loader",
    category: "elements",
    title: "Liquid Morphing Orb Loader",
    summary: "Two gradient blobs morphing through organic border-radius shapes, blended in screen mode with contrast filter.",
    author: "Uiverse style",
    tags: ["loader", "morph", "blob", "liquid"],
    tech: ["html", "css"],
    stars: 5340,
    views: 41200,
    copies: 8900,
    featured: true,
    published: true,
    html: liquidLoader,
    prompt: `Build a "Liquid Morphing Orb" loader in pure HTML/CSS: a 90px square container with filter: contrast(18) (the gooey trick). Two ::before/::after circles fill it with linear gradients (violet→fuchsia and cyan→violet), border-radius morphing through asymmetric organic shapes (50%→60% 40% 55% 45%→40% 60% 45% 55%→55% 45% 60% 40%→50%) while translating and scaling over a 3.2s ease-in-out loop; the ::after copy has animation-delay -1.6s (anti-phase) and mix-blend-mode:screen so the overlap glows. Title "Liquid Orb Loader" with hint "Pure CSS · morphing blobs". Dark #070711. No JS.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
  },
  {
    id: "el-toggle",
    slug: "neon-glow-toggle",
    category: "elements",
    title: "Neon Glow Toggle Switch",
    summary: "Springy knob that overshoots into a neon violet-fuchsia glow state when checked.",
    author: "Uiverse style",
    tags: ["toggle", "switch", "neon", "glow"],
    tech: ["html", "css"],
    stars: 3870,
    views: 29600,
    copies: 6400,
    featured: false,
    published: true,
    html: neonToggle,
    prompt: `Build a "Neon Glow Toggle" in pure HTML/CSS: a hidden checkbox + label span track, 68×34px pill, default state dark translucent (rgba(255,255,255,.08), 1px border) with a 26px grayish knob positioned left. When :checked, track gets a violet→fuchsia translucent gradient bg, fuchsia border, outer neon box-shadow glow (0 0 22px fuchsia) plus inset glow; the knob slides to left:37px with a spring cubic-bezier(.34,1.56,.64,1) overshoot, becomes a violet→fuchsia gradient circle with its own fuchsia shadow. Render one checked and one unchecked. Title "Neon Glow Toggle". Dark #070711. No JS.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-07-13T10:00:00Z",
    updatedAt: "2026-08-11T10:00:00Z",
  },
  {
    id: "el-dots",
    slug: "staggered-bounce-dots",
    category: "elements",
    title: "Staggered Bounce Dots",
    summary: "Five gradient dots bouncing in a wave with glow at peak, each delayed 150ms.",
    author: "Uiverse style",
    tags: ["loader", "dots", "bounce", "stagger"],
    tech: ["html", "css"],
    stars: 2980,
    views: 24100,
    copies: 5200,
    featured: false,
    published: true,
    html: bounceDots,
    prompt: `Build a "Staggered Bounce Dots" loader in pure HTML/CSS: five 14px circles in a flex row with 10px gap, each a cyan→violet gradient. A 1.3s ease-in-out keyframe animation moves dots translateY(0) scale(.7) opacity .5 → translateY(-20px) scale(1) opacity 1 with a violet glow shadow at the 30% peak and back; each dot nth-child gets animation-delay 0/.15s/.3s/.45s/.6s creating a traveling wave. Title "Staggered Bounce Dots". Dark #070711. No JS.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-07-17T10:00:00Z",
    updatedAt: "2026-08-09T10:00:00Z",
  },
  {
    id: "el-check",
    slug: "glow-spring-checkbox",
    category: "elements",
    title: "Glow Spring Checkboxes",
    summary: "Checkboxes that pop with an overshoot spring, gradient fill and violet glow; label brightens via :has().",
    author: "Uiverse style",
    tags: ["checkbox", "spring", "glow", "form"],
    tech: ["html", "css"],
    stars: 3450,
    views: 27800,
    copies: 5900,
    featured: false,
    published: true,
    html: glowCheckbox,
    prompt: `Build "Glow Checkboxes" in pure HTML/CSS: three hidden-checkbox + label rows ("Motion enabled" checked, "Particle effects" checked, "Reduce data" unchecked). The 24px rounded-8 box has a 1.5px border and translucent bg; its checkmark is a ::after CSS-drawn tick (border right+bottom 2.5px white, rotated 45deg) at scale(0). On :checked the box gets violet→fuchsia gradient bg, transparent border, violet glow shadow, scales to 1.06 with spring cubic-bezier(.34,1.56,.64,1); the tick springs in with the same overshoot easing. Use .cb:has(input:checked) to turn the label text from dim to bright. Title "Glow Checkboxes". Dark #070711. No JS.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-07-20T10:00:00Z",
    updatedAt: "2026-08-13T10:00:00Z",
  },
  {
    id: "el-input",
    slug: "spotlight-border-input",
    category: "elements",
    title: "Spotlight Border Input",
    summary: "Inputs whose 1.5px border lights up with a radial spotlight that follows the cursor, plus focus fill.",
    author: "Uiverse style",
    tags: ["input", "form", "spotlight", "border"],
    tech: ["html", "css", "javascript"],
    stars: 2760,
    views: 21400,
    copies: 4300,
    featured: false,
    published: true,
    html: shineInput,
    prompt: `Build a "Spotlight Border Input" in HTML/CSS + a few lines JS: two rounded-14px text inputs (email "you@stellar.dev", search "Search 480+ components..."), dark translucent bg, 1px border, dim placeholder. The wrapper draws a 1.5px spotlight ring on focus using the mask-composite:exclude trick: an ::after with padding:1.5px and radial-gradient(180px circle at var(--ix) var(--iy), violet 90%, transparent 60%), masked to show only the border, opacity 0→1 on :focus-within. JS updates --ix/--iy from mousemove relative to the wrapper so the spotlight tracks the cursor. :focus state also tints the border violet and bg slightly violet. Title "Spotlight Input". Dark #070711.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-07-25T10:00:00Z",
    updatedAt: "2026-08-18T10:00:00Z",
  },
  {
    id: "el-heart",
    slug: "heart-burst-like-button",
    category: "elements",
    title: "Heart Burst Like Button",
    summary: "Toggle like with a springy heart pop and ten particle glyphs flying out in random directions.",
    author: "Uiverse style",
    tags: ["button", "like", "heart", "particles", "burst"],
    tech: ["html", "css", "javascript"],
    stars: 4890,
    views: 36200,
    copies: 8100,
    featured: true,
    published: true,
    html: heartBurst,
    prompt: `Build a "Heart Burst" like button in HTML/CSS/JS: a pill button showing a red ♥ icon and count "2.4k", glass style that tints red on hover. On click: toggle a .liked class; the heart runs a pop keyframe (scale 1→1.6→.85→1 with cubic-bezier(.34,1.56,.64,1)) with red text-shadow glow; JS increments/decrements the count by .1 (toFixed(1)+'k') and spawns 10 particle spans (♥ ✦ ✧ ♦, colored red/fuchsia/violet) fixed-positioned at the button center, each flying to a random angle (dx ±80px, dy -20..-140px) and fading/scaling out over .8s via CSS custom props --dx/--dy, then removed from DOM. Title "Heart Burst Button". Dark #070711.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-07-29T10:00:00Z",
    updatedAt: "2026-08-23T10:00:00Z",
  },
  {
    id: "el-ripple",
    slug: "material-ripple-button",
    category: "elements",
    title: "Material Ripple Button",
    summary: "Click anywhere and a white ripple expands from the exact click point, scaled to overflow the button.",
    author: "Uiverse style",
    tags: ["button", "ripple", "material", "click"],
    tech: ["html", "css", "javascript"],
    stars: 3120,
    views: 25900,
    copies: 6100,
    featured: false,
    published: true,
    html: rippleBtn,
    prompt: `Build a "Material Ripple Button" in HTML/CSS/JS: a gradient violet→fuchsia rounded button "Click anywhere on me" with overflow:hidden and a press scale(.97) on :active. On click, JS creates a span.ripple positioned at the exact click coordinates relative to the button (left = clientX - rect.left - diameter/2), sized to max(button width, height), border-radius 50%, white 50% bg, starting at scale(0) and animating to scale(3.2) fading out over .65s ease-out, then removed. Title "Material Ripple Button". Dark #070711.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-16T10:00:00Z",
  },
  {
    id: "el-skeleton",
    slug: "shimmer-skeleton-cards",
    category: "elements",
    title: "Shimmer Skeleton Cards",
    summary: "Loading placeholder cards with a diagonal light sweep looping across avatar and line blocks.",
    author: "Uiverse style",
    tags: ["skeleton", "loading", "shimmer", "placeholder"],
    tech: ["html", "css"],
    stars: 2540,
    views: 19800,
    copies: 4800,
    featured: false,
    published: true,
    html: skeleton,
    prompt: `Build "Skeleton Shimmer Cards" in pure HTML/CSS: two glass cards in a responsive grid, each containing a 44px circular avatar placeholder and three rounded line placeholders of varying widths (60%/90%/75% and 50%/85%/70%), all blocks rgba(255,255,255,.06) with overflow hidden. Each block has an ::after diagonal light sweep: a linear-gradient(100deg, transparent 20%, rgba(255,255,255,.12) 50%, transparent 80%) strip animated translateX(-100%)→translateX(100%) over 1.4s infinite. Title "Skeleton Shimmer Cards". Dark #070711. No JS.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-05T10:00:00Z",
    updatedAt: "2026-08-19T10:00:00Z",
  },
  {
    id: "el-ring",
    slug: "animated-progress-rings",
    category: "elements",
    title: "Animated Gradient Progress Rings",
    summary: "Three SVG rings that stroke-draw to 82/64/95% with glow and count-up labels.",
    author: "Uiverse style",
    tags: ["progress", "ring", "svg", "counter", "stats"],
    tech: ["html", "css", "javascript"],
    stars: 3690,
    views: 28500,
    copies: 6700,
    featured: false,
    published: true,
    html: progressRing,
    prompt: `Build "Animated Progress Rings" in HTML/CSS/JS: three 120px SVGs (viewBox 0 0 120 120), each with two circles r=50 cx/cy=60, stroke-width 9, round linecaps, the group rotated -90deg so drawing starts at top. Track circle is white 8%; the progress circle uses stroke:var(--c) (violet #8b5cf6 for 82% "Motion", cyan #22d3ee for 64% "Design", fuchsia #d946ef for 95% "Code"), stroke-dasharray:314 with dashoffset animating from 314 to 314*(1-p/100) over 1.6s cubic-bezier(.22,1,.36,1) via a --p custom property, plus a drop-shadow glow in the stroke color. Center shows a count-up percentage (JS cubic ease-out over 1.6s) and a tracked uppercase label below each ring. Title "Animated Progress Rings". Dark #070711.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-09T10:00:00Z",
    updatedAt: "2026-08-24T10:00:00Z",
  },
];

import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T19:00:00.000Z";

/* 1 — PAGINATION DOTS WAVE */
const dotsWave = doc({
  body: `
<div class="dw" id="dw"><span class="d on">01</span><span class="d">02</span><span class="d">03</span><span class="d">04</span><span class="d">05</span></div>`,
  css: `
.dw{display:flex;align-items:center;gap:14px}
.d{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:var(--dim);cursor:pointer;
  padding:8px 4px;position:relative;transition:color .3s,letter-spacing .3s}
.d::after{content:'';position:absolute;left:0;right:0;bottom:0;height:2px;border-radius:2px;background:linear-gradient(90deg,#22d3ee,#d946ef);
  transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.22,1,.36,1)}
.d:hover{color:#fff;letter-spacing:.05em}
.d:hover::after,.d.on::after{transform:scaleX(1)}
.d.on{color:#fff}.d.on::before{content:'●';font-size:7px;margin-right:6px;vertical-align:middle;color:#d946ef;text-shadow:0 0 8px #d946ef}`,
  js: `
const dots=[...document.querySelectorAll('.d')];
dots.forEach(d=>d.addEventListener('click',()=>dots.forEach(x=>x.classList.toggle('on',x===d))));`,
});

/* 2 — FOCUS GLOW INPUT */
const glowInput = doc({
  body: `
<form class="gi-form" onsubmit="return false">
  <label>Your email</label>
  <div class="gi-wrap"><input class="gi" type="email" placeholder="you@studio.com" /><span class="gi-glow"></span></div>
  <button class="gi-btn">Get notified</button>
</form>`,
  css: `
.gi-form{width:min(380px,100%)}
.gi-form label{display:block;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);margin-bottom:10px;font-weight:700}
.gi-wrap{position:relative;border-radius:14px}
.gi{width:100%;padding:15px 18px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.04);
  color:#fff;font-size:15px;outline:none;transition:border-color .3s,box-shadow .3s,background .3s;position:relative;z-index:1}
.gi::placeholder{color:rgba(255,255,255,.25)}
.gi:focus{border-color:rgba(217,70,239,.7);background:rgba(217,70,239,.05);
  box-shadow:0 0 0 4px rgba(217,70,239,.12),0 0 30px rgba(217,70,239,.25)}
.gi-glow{position:absolute;inset:-1px;border-radius:15px;opacity:0;transition:opacity .3s;pointer-events:none;
  background:radial-gradient(300px 60px at 50% 0%,rgba(217,70,239,.35),transparent 70%)}
.gi-wrap:focus-within .gi-glow{opacity:1}
.gi-btn{margin-top:16px;width:100%;padding:14px;border:0;border-radius:14px;color:#fff;font-weight:800;font-size:14px;
  background:linear-gradient(90deg,var(--v1),var(--v2));box-shadow:0 10px 30px rgba(217,70,239,.35);transition:transform .15s,filter .2s}
.gi-btn:hover{filter:brightness(1.15)}.gi-btn:active{transform:scale(.97)}`,
});

/* 3 — HUE SHIFT THEME SWATCH PICKER */
const huePicker = doc({
  body: `
<div class="hp-card">
  <div class="hp-bars" id="bars"></div>
  <p>Current accent: <b id="hp-name">Fuchsia</b></p>
</div>`,
  css: `
.hp-card{width:min(360px,100%);border:1px solid var(--line);border-radius:20px;padding:26px;background:var(--panel)}
.hp-bars{display:flex;gap:10px;margin-bottom:18px}
.hp-bars button{flex:1;height:56px;border-radius:12px;border:2px solid transparent;cursor:pointer;transition:transform .2s,border-color .2s}
.hp-bars button:hover{transform:translateY(-4px)}
.hp-bars button.on{border-color:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.15)}
.hp-card p{font-size:14px;color:var(--dim)}.hp-card b{color:var(--txt)}`,
  js: `
const hues=[['Fuchsia',292],['Cyan',190],['Emerald',152],['Amber',38],['Rose',346]];
const wrap=document.getElementById('bars'),name=document.getElementById('hp-name');
hues.forEach(([label,h],i)=>{
  const b=document.createElement('button');
  b.style.background='linear-gradient(135deg,hsl('+h+',90%,60%),hsl('+(h+40)+',90%,55%))';
  b.style.background='linear-gradient(135deg,hsl('+h+',85%,62%),hsl('+((h+40)%360)+',85%,52%))';
  if(i===0)b.classList.add('on');
  b.onclick=()=>{
    wrap.querySelectorAll('button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');name.textContent=label;
    document.documentElement.style.filter='hue-rotate('+((h-292+360)%360)+'deg)';
  };
  wrap.appendChild(b);
});`,
});

/* 4 — TESTIMONIAL MARQUEE QUOTES */
const quotes = doc({
  kind: "page",
  body: `
<div class="qt"><div class="qt-track" id="t1"></div></div>
<div class="qt rev"><div class="qt-track" id="t2"></div></div>`,
  css: `
body{display:block;padding:0;overflow:hidden}
.qt{overflow:hidden;margin:26px 0;mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.qt-track{display:flex;gap:18px;width:max-content;animation:qscroll 40s linear infinite}
.qt.rev .qt-track{animation-direction:reverse}
.quote{flex:none;width:340px;border:1px solid var(--line);border-radius:18px;padding:22px;background:var(--panel)}
.quote .who{display:flex;align-items:center;gap:12px;margin-top:14px}
.avatar{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#fff;font-size:14px}
.quote p{font-size:13.5px;line-height:1.7;color:rgba(255,255,255,.75)}
.quote .who b{font-size:13px}.quote .who span{font-size:11px;color:var(--dim)}
@keyframes qscroll{to{transform:translateX(-50%)}}`,
  js: `
const data=[
  ['I pasted a prompt into my AI IDE and got the exact shimmer loader in one shot.','Maya Chen','Frontend Lead','#7c3aed'],
  ['The live preview + copy workflow is how I brainstorm every landing page now.','Dev Park','Indie Maker','#22d3ee'],
  ['Finally a motion library built for AI-assisted dev. Game changer.','Sara Kim','Design Engineer','#d946ef'],
  ['Every asset has a real prompt, not just code. Worth the bookmark.','Leo Adams','CTO','#10b981'],
  ['The synthwave grid template made our promo page unforgettable.','Yuki Tan','Creative Dev','#f59e0b'],
  ['Copy prompt, paste, ship. The loop is addictively fast.','Nina Roy','Solo Founder','#f43f5e'],
];
function card(q,i){
  return '<div class="quote"><p>"'+q[0]+'"</p><div class="who"><div class="avatar" style="background:'+q[3]+'">'+q[1][0]+'</div><div><b>'+q[1]+'</b><br><span>'+q[2]+'</span></div></div></div>';
}
document.getElementById('t1').innerHTML=[...data,...data].map(card).join('');
document.getElementById('t2').innerHTML=[...data.slice().reverse(),...data.slice().reverse()].map(card).join('');`,
});

/* 5 — SHAKE / ERROR FEEDBACK */
const shake = doc({
  body: `
<form class="sh-form" id="form" onsubmit="return false">
  <div class="sh-field"><input id="pw" class="sh-in" type="password" placeholder="Enter password (try: motion123)" /></div>
  <button class="sh-btn" id="go">Unlock</button>
  <div class="sh-msg" id="msg"></div>
</form>`,
  css: `
.sh-form{width:min(360px,100%)}
.sh-field{border-radius:14px}
.sh-in{width:100%;padding:15px 18px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.04);
  color:#fff;font-size:15px;outline:none;transition:border-color .3s,box-shadow .3s}
.sh-in:focus{border-color:rgba(34,211,238,.6);box-shadow:0 0 0 4px rgba(34,211,238,.1)}
.shake{animation:shake .5s cubic-bezier(.36,.07,.19,.97) both;border-color:rgba(244,63,94,.8)!important;
  box-shadow:0 0 0 4px rgba(244,63,94,.12)!important}
@keyframes shake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-8px)}40%,60%{transform:translateX(8px)}}
.sh-btn{margin-top:14px;width:100%;padding:14px;border:0;border-radius:14px;color:#fff;font-weight:800;
  background:linear-gradient(90deg,var(--v1),var(--v2));transition:transform .15s}
.sh-btn:active{transform:scale(.97)}
.sh-msg{margin-top:12px;text-align:center;font-size:13px;font-weight:700;min-height:1.2em}
.sh-msg.ok{color:#34d399}.sh-msg.err{color:#fb7185}`,
  js: `
const inp=document.getElementById('pw'),msg=document.getElementById('msg'),field=document.querySelector('.sh-field');
document.getElementById('go').onclick=()=>{
  field.classList.remove('shake');void field.offsetWidth;
  if(inp.value==='motion123'){msg.className='sh-msg ok';msg.textContent='✓ Unlocked. Welcome.';}
  else{field.classList.add('shake');msg.className='sh-msg err';msg.textContent='✕ Wrong password — try motion123';}
};`,
});

/* 6 — PARALLAX LAYERS (mouse) */
const parallax = doc({
  kind: "page",
  body: `
<div class="px-scene" id="scene">
  <div class="px-layer l1">◆</div>
  <div class="px-layer l2">●</div>
  <div class="px-layer l3">✦</div>
  <div class="px-layer l4">▲</div>
  <h1 class="px-h">PARALLAX<span>move your cursor</span></h1>
</div>`,
  css: `
body{display:block;overflow:hidden}
.px-scene{position:fixed;inset:0;perspective:600px}
.px-layer{position:fixed;font-size:80px;opacity:.5;transition:transform .25s cubic-bezier(.22,1,.36,1);will-change:transform;text-shadow:0 0 40px currentColor}
.l1{top:18%;left:12%;color:#7c3aed}
.l2{top:26%;right:16%;color:#d946ef;font-size:120px}
.l3{bottom:22%;left:20%;color:#22d3ee;font-size:100px}
.l4{bottom:30%;right:24%;color:#f59e0b;font-size:64px}
.px-h{position:absolute;inset:0;display:grid;place-content:center;text-align:center;font-size:clamp(44px,8vw,88px);font-weight:900;z-index:5;pointer-events:none;transition:transform .25s cubic-bezier(.22,1,.36,1)}
.px-h span{display:block;font-size:14px;letter-spacing:.4em;text-transform:uppercase;color:var(--dim);margin-top:10px}`,
  js: `
const scene=document.getElementById('scene');
const layers=document.querySelectorAll('.px-layer');
const head=document.querySelector('.px-h');
scene.addEventListener('pointermove',e=>{
  const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
  layers.forEach((l,i)=>{
    const d=(i+1)*22;
    l.style.transform='translate('+x*d+'px,'+y*d+'px) rotate('+x*(i+1)*8+'deg)';
  });
  head.style.transform='translate('+x*10+'px,'+y*10+'px)';
});`,
});

export const WAVE16_ITEMS: Item[] = [
  {
    id: "w16-dots",
    slug: "numbered-pagination-underline",
    category: "components",
    title: "Numbered pagination with underline sweep",
    summary: "Monospace page numbers with a gradient underline that sweeps in on hover and active state dot.",
    author: "MotionVault",
    tags: ["pagination", "nav", "numbers", "underline", "list"],
    tech: ["html", "css", "javascript"],
    stars: 246, views: 0, copies: 0, featured: false, published: true,
    html: dotsWave,
    prompt:
      "Build numbered pagination: five JetBrains Mono page numbers (01-05) in a row; each has a gradient underline pseudo-element that scales in from the left on hover/active with a cubic-bezier sweep, letters space out slightly on hover, and the active item shows a small glowing fuchsia dot before the number in white. Clicking sets the active item. Dark UI, minimal.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w16-input",
    slug: "focus-glow-email-input",
    category: "components",
    title: "Focus-glow email capture input",
    summary: "Input that ignites with a fuchsia ring, top light spill and tinted background on focus, plus a gradient CTA.",
    author: "MotionVault",
    tags: ["input", "form", "focus", "glow", "email", "ui-kit"],
    tech: ["html", "css"],
    stars: 312, views: 0, copies: 0, featured: false, published: true,
    html: glowInput,
    prompt:
      "Create an email capture field with dramatic focus state: an uppercase label, a rounded input over a wrapper containing a radial top-glow layer; on :focus-within the input border turns fuchsia, background tints, a 4px soft ring and a 30px outer glow appear, and the top radial light fades in. Below, a full-width gradient 'Get notified' button with press-scale. Pure CSS focus states (no JS needed), dark glass style.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w16-hue",
    slug: "accent-hue-swatch-picker",
    category: "components",
    title: "Accent hue swatch picker",
    summary: "Five gradient swatches retint the whole demo via root hue-rotate — a one-component theming trick.",
    author: "MotionVault",
    tags: ["theme", "color", "hue", "picker", "swatch", "customization"],
    tech: ["html", "css", "javascript"],
    stars: 358, views: 0, copies: 0, featured: true, published: true,
    html: huePicker,
    prompt:
      "Build an accent color picker: a glass card with five gradient color swatch buttons (fuchsia, cyan, emerald, amber, rose) as HSL gradients; hovering lifts a swatch, the selected one gets a white border and ring. Clicking sets the accent label and retints the ENTIRE page by applying a CSS filter: hue-rotate on the document root relative to the base hue (compute the degree difference per swatch). Vanilla JS, demonstrates global theming with a single filter.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w16-quotes",
    slug: "dual-direction-testimonial-marquee",
    category: "templates",
    title: "Dual-direction testimonial marquee",
    summary: "Two rows of testimonial cards scrolling in opposite directions with edge fades — social proof hero band.",
    author: "MotionVault",
    tags: ["marquee", "testimonial", "quotes", "social-proof", "scroll", "section"],
    tech: ["html", "css", "javascript"],
    stars: 389, views: 0, copies: 0, featured: true, published: true,
    html: quotes,
    prompt:
      "Create a social-proof section with TWO testimonial marquee rows: glass quote cards (340px, quote text + colored initial avatar + name/role) generated from a JS data array, duplicated for seamless looping; the top row scrolls left continuously, the second row scrolls in reverse (animation-direction reverse), both edge-masked with linear-gradient fades. Full-bleed bands with vertical gap. Vanilla JS renders the cards from data.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w16-shake",
    slug: "shake-error-password-form",
    category: "components",
    title: "Shake error-feedback form",
    summary: "Wrong password triggers a horizontal shake with red ring; correct password shows green success — instant feedback.",
    author: "MotionVault",
    tags: ["form", "error", "shake", "feedback", "validation", "micro-interaction"],
    tech: ["html", "css", "javascript"],
    stars: 298, views: 0, copies: 0, featured: false, published: true,
    html: shake,
    prompt:
      "Build a password form with classic shake error feedback: a rounded password input and gradient unlock button; on submit, if the value is not the correct passcode ('motion123'), remove/re-add a 'shake' class (force reflow to restart) running a horizontal shake keyframe (translating up to ±8px in decaying steps over .5s) with a red border and red focus ring, plus a red error message; on success show a green 'Unlocked' message. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w16-parallax",
    slug: "mouse-parallax-floating-symbols",
    category: "animations",
    title: "Mouse parallax floating symbols",
    summary: "Four glowing geometric symbols drift at different depths against the cursor; headline moves subtly on top.",
    author: "MotionVault",
    tags: ["parallax", "mouse", "layers", "depth", "hero", "floating"],
    tech: ["html", "css", "javascript"],
    stars: 402, views: 0, copies: 0, featured: true, published: true,
    html: parallax,
    prompt:
      "Build a mouse-parallax hero: a full-screen scene with four large glowing geometric symbols (diamond, circle, sparkle, triangle in violet, fuchsia, cyan, amber) placed at different positions; on pointermove each layer translates by (cursor offset from center) × depth factor (22/44/66/88px) and slightly rotates, with a cubic-bezier transition so it eases like lagging depth. The big headline also shifts subtly (10px). requestAnimationFrame-free CSS transitions on transform are fine. Vanilla JS, dark background.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

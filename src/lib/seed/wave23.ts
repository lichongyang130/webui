import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-02T01:30:00.000Z";

/* 1 — COOKIE / TOAST BANNER */
const banner = doc({
  body: `
<div class="bn" id="bn"><p>🍪 We use cookies to track which <b>effects you love</b> — nothing more.</p>
<div class="bn-actions"><button class="bn-ghost">Settings</button><button class="bn-ok" id="bnOk">Accept all</button></div></div>`,
  css: `
body{display:block;min-height:100vh}
.bn{position:fixed;left:24px;right:24px;bottom:24px;max-width:560px;margin:0 auto;z-index:50;
  display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:16px 18px;border-radius:18px;
  background:rgba(13,13,30,.92);border:1px solid rgba(217,70,239,.35);backdrop-filter:blur(16px);
  box-shadow:0 24px 70px rgba(0,0,0,.6);
  animation:bnin .7s cubic-bezier(.22,1,.36,1) both}
@keyframes bnin{from{transform:translateY(140%)}to{transform:none}}
.bn.hide{animation:bnout .4s ease forwards}
@keyframes bnout{to{transform:translateY(160%);opacity:0}}
.bn p{font-size:13px;line-height:1.6;color:rgba(255,255,255,.75);flex:1;min-width:220px}.bn p b{color:#e9d5ff}
.bn-actions{display:flex;gap:9px}
.bn button{border-radius:11px;padding:10px 16px;font-weight:700;font-size:12.5px;cursor:pointer;transition:transform .15s,filter .2s}
.bn-ghost{background:transparent;border:1px solid var(--line);color:var(--dim)}
.bn-ok{background:linear-gradient(90deg,var(--v1),var(--v2));border:0;color:#fff;box-shadow:0 8px 24px rgba(217,70,239,.35)}
.bn button:hover{filter:brightness(1.15)}.bn button:active{transform:scale(.95)}`,
  js: `
document.getElementById('bnOk').onclick=()=>{
  document.getElementById('bn').classList.add('hide');
};`,
});

/* 2 — SWITCH TOGGLE (day/night slider) */
const toggleSwitch = doc({
  body: `
<label class="sw"><input type="checkbox" id="sw" checked /><span class="track"><span class="knob"></span><i class="moon">☾</i><i class="sun">☀</i></span></label>
<b class="sw-label" id="swl">Dark mode</b>`,
  css: `
.sw{display:inline-grid;place-items:center;position:relative;width:84px;height:44px;cursor:pointer}
.sw input{opacity:0;width:0;height:0}
.track{position:absolute;inset:0;border-radius:99px;background:linear-gradient(120deg,#1b1b3a,#0b0b1c);
  border:1px solid rgba(255,255,255,.15);transition:background .4s;overflow:hidden}
.sw input:checked + .track{background:linear-gradient(120deg,#0b0b1c,#1b1b3a)}
.sw:not(:has(input:checked)) .track{background:linear-gradient(120deg,#38bdf8,#818cf8)}
.knob{position:absolute;top:4px;left:4px;width:34px;height:34px;border-radius:50%;background:#fff;
  transition:transform .4s cubic-bezier(.34,1.56,.64,1);display:grid;place-items:center;z-index:2;
  box-shadow:0 4px 12px rgba(0,0,0,.4)}
.sw input:checked ~ .track .knob{transform:translateX(40px)}
.track i{position:absolute;font-style:normal;top:50%;transform:translateY(-50%);font-size:15px;transition:opacity .3s}
.moon{right:11px}
.sun{left:12px;opacity:0}
.sw:not(:has(input:checked)) .moon{opacity:0}.sw:not(:has(input:checked)) .sun{opacity:1}
.sw-label{margin-top:16px;display:block;text-transform:uppercase;letter-spacing:.2em;font-size:12px;color:var(--dim)}`,
  js: `
document.getElementById('sw').onchange=e=>{
  document.getElementById('swl').textContent=e.target.checked?'Dark mode':'Light mode';
};`,
});

/* 3 — STEP PROGRESS RING (circular) */
const progressRing = doc({
  body: `
<div class="pr"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" id="ring" cx="60" cy="60" r="52"/><text id="pct" x="60" y="66" text-anchor="middle">0%</text></svg>
<div class="pr-row"><button id="add">+10%</button><button id="reset">Reset</button></div></div>`,
  css: `
.pr{display:flex;flex-direction:column;align-items:center;gap:22px}
svg{width:170px;height:170px;transform:rotate(-90deg)}
svg circle{fill:none;stroke-width:10}
.bg{stroke:rgba(255,255,255,.08)}
.fg{stroke:url(#g);stroke:linear-gradient(#22d3ee,#d946ef);stroke-linecap:round;
  stroke:#d946ef;stroke-dasharray:326.7;stroke-dashoffset:326.7;transition:stroke-dashoffset .5s cubic-bezier(.22,1,.36,1);
  filter:drop-shadow(0 0 8px rgba(217,70,239,.6))}
text{transform:rotate(90deg);transform-origin:60px 60px;fill:#fff;font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700}
.pr-row{display:flex;gap:10px}
.pr-row button{background:rgba(255,255,255,.07);border:1px solid var(--line);color:#fff;font-weight:700;font-size:13px;
  border-radius:10px;padding:10px 18px;cursor:pointer;transition:border-color .2s,transform .15s}
.pr-row button:hover{border-color:rgba(217,70,239,.5)}.pr-row button:active{transform:scale(.94)}`,
  js: `
const ring=document.getElementById('ring'),pct=document.getElementById('pct'),C=2*Math.PI*52;
let v=0;
function paint(){ring.style.strokeDashoffset=C*(1-v/100);pct.textContent=v+'%';}
document.getElementById('add').onclick=()=>{v=Math.min(100,v+10);paint();};
document.getElementById('reset').onclick=()=>{v=0;paint();};
paint();`,
});

/* 4 — BREADCRUMB WITH ARROWS */
const breadcrumb = doc({
  body: `
<nav class="bc"><a>Home</a><span>›</span><a>Components</a><span>›</span><a>Animations</a><span>›</span><b>Blob cursor</b></nav>`,
  css: `
.bc{display:flex;align-items:center;gap:10px;font-size:13px;flex-wrap:wrap}
.bc a{color:var(--dim);text-decoration:none;transition:color .2s;cursor:pointer}
.bc a:hover{color:#22d3ee}
.bc span{color:rgba(217,70,239,.5)}
.bc b{color:#fff}
.bc a:last-of-type:hover{color:#e9d5ff}`,
});

/* 5 — EMOJI/ICON RATING REACTION BAR */
const reactions = doc({
  body: `
<div class="rc2" id="rc2">
  <button data-v="0">🤩<b>Wow</b><i>128</i></button>
  <button data-v="1">😍<b>Love</b><i>96</i></button>
  <button data-v="2">🤔<b>Huh</b><i>14</i></button>
  <button data-v="3">🔥<b>Fire</b><i>212</i></button>
</div>`,
  css: `
.rc2{display:flex;gap:12px}
.rc2 button{position:relative;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:14px 20px;
  color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:88px;
  font-size:28px;transition:transform .25s cubic-bezier(.34,1.56,.64,1),border-color .25s,background .25s;overflow:hidden}
.rc2 button b{font-size:11.5px;text-transform:uppercase;letter-spacing:.12em;color:var(--dim)}
.rc2 button i{font-style:normal;font-size:12px;color:var(--dim);transition:color .25s}
.rc2 button:hover{transform:translateY(-6px);border-color:rgba(217,70,239,.5)}
.rc2 button.picked{background:rgba(217,70,239,.14);border-color:rgba(217,70,239,.7);transform:translateY(-8px) scale(1.06)}
.rc2 button.picked i{color:#e9d5ff;font-weight:700}
.rc2 button.picked{animation:pop .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes pop{0%{transform:scale(.9)}60%{transform:scale(1.12)}}`,
  js: `
document.querySelectorAll('.rc2 button').forEach(b=>{
  b.onclick=()=>{
    const was=b.classList.contains('picked');
    document.querySelectorAll('.rc2 button').forEach(x=>{
      x.classList.remove('picked');
      const c=x.querySelector('i');c.textContent=+c.dataset.n||c.textContent;
    });
    if(!was){b.classList.add('picked');
      const c=b.querySelector('i');c.textContent=+c.textContent+1;}
  };
});`,
});

/* 6 — PRESS & HOLD CONFIRM BUTTON */
const hold = doc({
  body: `
<button class="hd" id="hd"><span class="hd-fill"></span><span class="hd-t">Hold to delete</span></button>
<div class="hd-msg" id="hdm"></div>`,
  css: `
.hd{position:relative;overflow:hidden;border:1px solid rgba(244,63,94,.4);background:rgba(244,63,94,.08);
  color:#fda4af;border-radius:14px;padding:15px 34px;font-weight:800;font-size:14px;cursor:pointer;
  user-select:none;-webkit-user-select:none;min-width:200px;transition:color .2s}
.hd-fill{position:absolute;inset:0;background:linear-gradient(90deg,#e11d48,#f43f5e);transform-origin:left;
  transform:scaleX(0);transition:transform .05s linear;z-index:0}
.hd-t{position:relative;z-index:1}
.hd.done .hd-t{color:#fff}
.hd.done{border-color:transparent}
.hd-msg{margin-top:18px;font-weight:700;font-size:14px;color:#fb7185;height:1.4em}`,
  js: `
const b=document.getElementById('hd'),fill=b.querySelector('.hd-fill'),msg=document.getElementById('hdm');
let raf,t0,holding=false;
function start(){holding=true;t0=performance.now();
  (function step(t){if(!holding)return;
    const p=Math.min(1,(t-t0)/1200);fill.style.transform='scaleX('+p+')';
    if(p>=1){finish();return;}
    raf=requestAnimationFrame(step);})(t0);
}
function cancel(){holding=false;cancelAnimationFrame(raf);
  if(!b.classList.contains('done'))fill.style.transform='scaleX(0)';}
function finish(){holding=false;b.classList.add('done');b.querySelector('.hd-t').textContent='Deleted ✓';
  msg.textContent='Item permanently removed.';
  setTimeout(()=>{b.classList.remove('done');b.querySelector('.hd-t').textContent='Hold to delete';
    fill.style.transform='scaleX(0)';msg.textContent='';},2200);}
b.addEventListener('pointerdown',start);
b.addEventListener('pointerup',cancel);
b.addEventListener('pointerleave',cancel);`,
});

export const WAVE23_ITEMS: Item[] = [
  {
    id: "w23-banner",
    slug: "sliding-cookie-consent-banner",
    category: "components",
    title: "Sliding cookie consent banner",
    summary: "Glass consent bar slides up from the bottom with spring easing and dismisses with a slide-out.",
    author: "MotionVault",
    tags: ["banner", "cookie", "consent", "toast", "glass", "footer"],
    tech: ["html", "css", "javascript"],
    stars: 287, views: 0, copies: 0, featured: false, published: true,
    html: banner,
    prompt:
      "Build a cookie consent banner: a frosted-glass dark bar pinned bottom-center (max-width 560px) with a pink-bordered glass surface, a short message and two actions (ghost Settings and gradient Accept all). It springs up from below on load with a cubic-bezier overshoot and slides back down when accepted. Buttons have hover-brighten and press-scale. Vanilla JS toggles a hide class.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w23-switch",
    slug: "day-night-toggle-switch",
    category: "components",
    title: "Day/night sliding toggle switch",
    summary: "iOS-style switch with a springy knob carrying the icon, track recolors sky-blue by day and deep space at night.",
    author: "MotionVault",
    tags: ["toggle", "switch", "dark-mode", "control", "ui-kit"],
    tech: ["html", "css", "javascript"],
    stars: 356, views: 0, copies: 0, featured: false, published: true,
    html: toggleSwitch,
    prompt:
      "Create a day/night toggle switch: a hidden checkbox controlling an 84x44 rounded track; checked = dark space gradient with a moon glyph, unchecked = sky-blue gradient with a sun glyph; a white 34px knob springs between sides with overshoot cubic-bezier and visually carries the active icon. Use :has() selectors so no JS is strictly needed, plus a small JS label update ('Dark mode'/'Light mode'). Pure CSS-driven states.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w23-ring",
    slug: "circular-progress-ring-controls",
    category: "animations",
    title: "Circular progress ring",
    summary: "SVG ring fills with a glowing fuchsia arc and mono percentage — +10% and reset buttons animate it.",
    author: "MotionVault",
    tags: ["progress", "ring", "circle", "svg", "percentage"],
    tech: ["html", "css", "javascript"],
    stars: 331, views: 0, copies: 0, featured: false, published: true,
    html: progressRing,
    prompt:
      "Build a circular progress ring: an SVG with a dim background circle and a fuchsia glowing foreground circle (r=52, stroke-linecap round, rotated -90deg so it starts at top). Progress is driven by stroke-dashoffset computed from circumference 2πr; CSS transitions the offset with a strong cubic-bezier. Center shows a monospace percentage that is rotated to counter the SVG rotation. Two buttons increment 10% and reset, clamping at 100%. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w23-breadcrumb",
    slug: "breadcrumb-chevron-nav",
    category: "components",
    title: "Breadcrumb with chevron separators",
    summary: "Simple accessible breadcrumb trail: dim ancestors with cyan hover, fuchsia chevrons, bold current page.",
    author: "MotionVault",
    tags: ["breadcrumb", "nav", "ui-kit", "links"],
    tech: ["html", "css"],
    stars: 214, views: 0, copies: 0, featured: false, published: true,
    html: breadcrumb,
    prompt:
      "Create a breadcrumb navigation: inline links for Home / Components / Animations with fuchsia chevron separators, ancestor links dimmed with cyan hover, and the current page in bold white with a wrapping flex layout. Dark UI, 13px text. Pure HTML/CSS, wrapped in a <nav>.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w23-react",
    slug: "emoji-reaction-picker-bar",
    category: "components",
    title: "Emoji reaction picker bar",
    summary: "Four emoji reactions (Wow/Love/Huh/Fire) lift and pop on hover/click; selecting one increments its count.",
    author: "MotionVault",
    tags: ["reactions", "emoji", "like", "feedback", "bar"],
    tech: ["html", "css", "javascript"],
    stars: 398, views: 0, copies: 0, featured: true, published: true,
    html: reactions,
    prompt:
      "Build an emoji reaction bar like YouTube/Discord: four glass buttons each with a big emoji glyph, uppercase label and a count. Hover lifts the button 6px; clicking one toggles a 'picked' state (fuchsia tinted border/background, lifted and scaled with a spring pop keyframe) and increments that count; clicking again unvotes. Counts show next to the label in dim text turning bright when picked. Vanilla JS toggling classes and updating counts.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w23-hold",
    slug: "press-and-hold-confirm-button",
    category: "components",
    title: "Press-and-hold confirm button",
    summary: "Hold the destructive button for 1.2s as a red fill sweeps across — releasing early cancels the action.",
    author: "MotionVault",
    tags: ["hold", "confirm", "button", "destructive", "gesture", "micro-interaction"],
    tech: ["html", "css", "javascript"],
    stars: 372, views: 0, copies: 0, featured: true, published: true,
    html: hold,
    prompt:
      "Create a press-and-hold confirmation for destructive actions: a red-tinted bordered button labeled 'Hold to delete' with an absolutely positioned red fill layer scaled by scaleX; pointerdown starts a 1.2s rAF timer that grows the fill linearly (scaleX = progress), the label turns white as the fill covers it; completing shows 'Deleted ✓' with a confirmation message before resetting after 2.2s; releasing or leaving early cancels (cancelAnimationFrame + fill resets). user-select disabled. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

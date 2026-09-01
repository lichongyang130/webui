import { Item } from "../types";
import { doc } from "./wrap";

// E11. Star rating
const starRating = doc({
  body: `<h3 class="t">Interactive Star Rating</h3><p class="s">Hover to preview · click to lock</p>
<div class="rate" id="rate">${[1, 2, 3, 4, 5].map((n) => `<button class="st" data-v="${n}">★</button>`).join("")}</div>
<div class="rate-t" id="rateT">Tap to rate</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.rate{display:flex;gap:6px;margin-top:6px}
.st{font-size:38px;line-height:1;color:rgba(255,255,255,.14);transition:transform .2s cubic-bezier(.34,1.8,.64,1),color .2s;text-shadow:none}
.st:hover{transform:scale(1.25) rotate(-8deg)}
.st.lit{color:#fbbf24;text-shadow:0 0 16px rgba(251,191,36,.55)}
.st.pop{animation:starPop .4s cubic-bezier(.34,1.8,.64,1)}
@keyframes starPop{40%{transform:scale(1.5) rotate(8deg)}}
.rate-t{margin-top:14px;font-size:13.5px;color:var(--dim);min-height:1.4em}
.rate-t b{color:#fbbf24}`,
  js: `const stars=[...document.querySelectorAll('.st')],label=document.getElementById('rateT');
const words=['','Terrible','Meh','Good','Great','Legendary!'];
let value=0;
function render(n){stars.forEach((s,i)=>{
 s.classList.toggle('lit',i<n);
 if(i===n-1){s.classList.remove('pop');void s.offsetWidth;s.classList.add('pop');}
});}
stars.forEach(s=>{
 s.addEventListener('mouseenter',()=>render(+s.dataset.v));
 s.addEventListener('click',()=>{value=+s.dataset.v;label.innerHTML='You rated it <b>'+words[value]+'</b>';render(value);});
});
document.getElementById('rate').addEventListener('mouseleave',()=>render(value));`,
});

// E12. Hamburger morph
const hamburger = doc({
  body: `<h3 class="t">Hamburger → Close Morph</h3><p class="s">Click to toggle</p>
<button class="ham" id="ham" aria-label="menu"><span></span><span></span><span></span></button>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.ham{width:72px;height:72px;border-radius:20px;border:1px solid var(--line);background:var(--panel);
 display:flex;flex-direction:column;justify-content:center;align-items:center;gap:11px;transition:background .3s,border-color .3s}
.ham:hover{border-color:var(--v1)}
.ham span{display:block;width:38px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--v1),var(--v2));
 transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .25s}
.ham.x span:nth-child(1){transform:translateY(14px) rotate(45deg)}
.ham.x span:nth-child(2){opacity:0;transform:scaleX(.3)}
.ham.x span:nth-child(3){transform:translateY(-14px) rotate(-45deg)}`,
  js: `document.getElementById('ham').addEventListener('click',function(){this.classList.toggle('x');});`,
});

// E13. Segmented control
const segmented = doc({
  body: `<h3 class="t">Segmented Control</h3>
<div class="seg" id="seg"><span class="seg-glide" id="segGlide"></span>
 ${["Hourly","Daily","Weekly","Monthly"].map((l, i) => `<button class="seg-btn${i === 1 ? " on" : ""}" data-i="${i}">${l}</button>`).join("")}
</div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:16px}
.seg{position:relative;display:inline-flex;border:1px solid var(--line);background:rgba(255,255,255,.04);
 border-radius:14px;padding:4px}
.seg-glide{position:absolute;top:4px;bottom:4px;left:0;border-radius:10px;
 background:linear-gradient(120deg,var(--c1),var(--v1));transition:transform .35s cubic-bezier(.22,1,.36,1),width .35s cubic-bezier(.22,1,.36,1);z-index:0;
 box-shadow:0 8px 22px -8px rgba(34,211,238,.7)}
.seg-btn{position:relative;z-index:1;padding:9px 18px;border-radius:10px;font-size:13.5px;font-weight:600;color:var(--dim);transition:color .3s;white-space:nowrap}
.seg-btn.on{color:#04121a;font-weight:700}`,
  js: `const seg=document.getElementById('seg'),glide=document.getElementById('segGlide');
function move(btn){const r=btn.getBoundingClientRect(),p=seg.getBoundingClientRect();
 glide.style.width=r.width+'px';glide.style.transform='translateX('+(r.left-p.left-4)+'px)';
 seg.querySelectorAll('.seg-btn').forEach(b=>b.classList.toggle('on',b===btn));}
seg.addEventListener('click',e=>{const b=e.target.closest('.seg-btn');if(b)move(b);});
requestAnimationFrame(()=>move(seg.querySelector('.on')));`,
});

// E14. Conic spinner
const conicSpinner = doc({
  body: `<h3 class="t">Conic Gradient Spinner</h3>
<div class="cn"><i></i></div><p class="s">One element · mask-revealed conic arc</p>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px}
.cn{width:76px;height:76px;border-radius:50%;
 background:conic-gradient(from 0deg,transparent 0%,var(--v1) 55%,var(--v2) 80%,var(--c1) 100%);
 -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 8px),#000 calc(100% - 7px));
 mask:radial-gradient(farthest-side,transparent calc(100% - 8px),#000 calc(100% - 7px));
 animation:cnSpin .9s linear infinite;filter:drop-shadow(0 0 10px rgba(139,92,246,.6))}
@keyframes cnSpin{to{transform:rotate(360deg)}}`,
  js: ``,
});

// E15. Shine badge
const shineBadge = doc({
  body: `<h3 class="t">Shine-Sweep Badges</h3>
<div class="bd-row">
 <span class="bd bd-v">✦ PRO PLAN</span>
 <span class="bd bd-c">NEW DROPS DAILY</span>
 <span class="bd bd-f">LIMITED ✧ 500 SPOTS</span>
</div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:18px}
.bd-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.bd{position:relative;overflow:hidden;padding:10px 22px;border-radius:999px;font-size:13px;font-weight:800;
 letter-spacing:.08em;border:1px solid transparent;cursor:default}
.bd-v{background:rgba(139,92,246,.18);color:#c4b5fd;border-color:rgba(139,92,246,.4)}
.bd-c{background:rgba(34,211,238,.14);color:#67e8f9;border-color:rgba(34,211,238,.4)}
.bd-f{background:rgba(217,70,239,.16);color:#f0abfc;border-color:rgba(217,70,239,.4)}
.bd::after{content:'';position:absolute;top:0;bottom:0;width:45%;left:-60%;
 background:linear-gradient(105deg,transparent,rgba(255,255,255,.55),transparent);
 transform:skewX(-20deg);animation:shine 2.6s ease-in-out infinite}
.bd:nth-child(2)::after{animation-delay:.9s}.bd:nth-child(3)::after{animation-delay:1.7s}
@keyframes shine{0%{left:-60%}55%,100%{left:130%}}`,
  js: ``,
});

// E16. Glow range slider
const glowRange = doc({
  body: `<h3 class="t">Glowing Range Slider</h3><p class="s">Value: <b id="rv">64</b>%</p>
<input type="range" min="0" max="100" value="64" class="rg" id="rg"/>
<div class="rg-ticks"><span>0</span><span>50</span><span>100</span></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.s b{color:var(--c1)}
.rg{width:min(320px,86vw);height:8px;border-radius:99px;appearance:none;-webkit-appearance:none;
 background:linear-gradient(90deg,var(--v1) var(--fill,64%),rgba(255,255,255,.1) var(--fill,64%));
 outline:none;cursor:pointer}
.rg::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;
 background:#fff;border:4px solid var(--v2);box-shadow:0 0 0 4px rgba(217,70,239,.25),0 0 18px rgba(217,70,239,.8);
 transition:transform .2s}
.rg::-webkit-slider-thumb:hover{transform:scale(1.18)}
.rg::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:4px solid var(--v2);
 box-shadow:0 0 18px rgba(217,70,239,.8)}
.rg-ticks{display:flex;justify-content:space-between;width:min(320px,86vw);margin-top:12px;
 font-size:11px;color:var(--dim);font-variant-numeric:tabular-nums}`,
  js: `const rg=document.getElementById('rg'),rv=document.getElementById('rv');
function up(){rv.textContent=rg.value;rg.style.setProperty('--fill',rg.value+'%');}
rg.addEventListener('input',up);up();`,
});

// E17. Avatar stack
const avatarStack = doc({
  body: `<h3 class="t">Overlapping Avatar Stack</h3><p class="s">Hover to spread · click isolates</p>
<div class="av" id="av">
 ${["AK","JM","SR","ML","+9"].map(
   (n, i) => `<span class="av-i ${n === "+9" ? "av-more" : ""}" style="--i:${i}">${n}</span>`
 ).join("")}
</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.av{display:flex;align-items:center;padding-left:4px}
.av-i{width:46px;height:46px;margin-left:-12px;border-radius:50%;display:grid;place-items:center;
 font-size:13px;font-weight:800;border:2.5px solid #0b0b1a;color:#fff;position:relative;z-index:1;
 transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .3s;cursor:pointer}
.av-i:nth-child(1){margin-left:0;background:linear-gradient(135deg,#8b5cf6,#6d28d9)}
.av-i:nth-child(2){background:linear-gradient(135deg,#d946ef,#a21caf)}
.av-i:nth-child(3){background:linear-gradient(135deg,#22d3ee,#0e7490)}
.av-i:nth-child(4){background:linear-gradient(135deg,#f59e0b,#b45309)}
.av-more{background:#23234e!important;color:var(--dim)}
.av:hover .av-i{transform:translateX(calc(var(--i)*6px));}
.av-i:hover{transform:translateY(-10px) scale(1.12)!important;z-index:5;
 box-shadow:0 12px 28px -8px rgba(139,92,246,.7);border-color:rgba(255,255,255,.5)}`,
  js: `document.querySelectorAll('.av-i').forEach(el=>{
 el.addEventListener('click',()=>el.classList.toggle('ring'));});`,
});

export const EXTRA_ELEMENT_ITEMS: Item[] = [
  {
    id: "el-stars",
    slug: "interactive-star-rating",
    category: "elements",
    title: "Interactive Star Rating",
    summary: "Five stars with hover preview, spring pop on fill and locked-in labels from Terrible to Legendary.",
    author: "Uiverse style",
    tags: ["rating", "stars", "form", "feedback", "hover"],
    tech: ["html", "css", "javascript"],
    stars: 4360,
    views: 31800,
    copies: 7200,
    featured: false,
    published: true,
    html: starRating,
    prompt: `Build an "Interactive Star Rating" widget in pure HTML/CSS/JS: five large (38px) ★ buttons in a row, dim translucent by default. On hover of any star (mouseenter) light up that star and all preceding ones in amber #fbbf24 with an amber glow text-shadow; the newly-lit star also runs a pop keyframe (scale 1→1.5 rotate 8°→1, spring cubic-bezier(.34,1.8,.64,1)); hovering the row shows a live preview, mouseleave reverts to the locked value. On click, LOCK the rating and update a label below: "You rated it [word]" with words 1..5 = Terrible/Meh/Good/Great/Legendary! (word in amber bold). Title "Interactive Star Rating", hint "Hover to preview · click to lock". Dark #070711. No libraries.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-11T10:00:00Z",
    updatedAt: "2026-08-27T10:00:00Z",
  },
  {
    id: "el-ham",
    slug: "hamburger-close-morph",
    category: "elements",
    title: "Hamburger → Close Morph",
    summary: "Three gradient bars that spring into an X with rotation — the classic menu toggle, pure CSS.",
    author: "Uiverse style",
    tags: ["menu", "hamburger", "toggle", "icon", "nav"],
    tech: ["html", "css", "javascript"],
    stars: 5180,
    views: 37400,
    copies: 8900,
    featured: true,
    published: true,
    html: hamburger,
    prompt: `Build a "Hamburger → Close Morph" menu button in pure HTML/CSS (+ one JS click toggle): a 72px rounded-20px glass button containing three 38×3px rounded gradient bars (violet→fuchsia) stacked with 11px gap. When an .x class is toggled on click: the first bar translates down 14px and rotates 45deg, the middle fades out and squashes scaleX(.3), the third translates up 14px and rotates -45deg — all transitioning with spring cubic-bezier(.34,1.56,.64,1) over .4s (opacity .25s for the middle). Button has a violet border glow on hover. Title "Hamburger → Close Morph", hint "Click to toggle". Dark #070711.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-14T10:00:00Z",
    updatedAt: "2026-08-28T10:00:00Z",
  },
  {
    id: "el-seg",
    slug: "gliding-segmented-control",
    category: "elements",
    title: "Gliding Segmented Control",
    summary: "iOS-style segmented control with a cyan-violet gliding thumb that springs between options.",
    author: "Uiverse style",
    tags: ["segmented", "tabs", "control", "ios", "form"],
    tech: ["html", "css", "javascript"],
    stars: 3920,
    views: 28600,
    copies: 6300,
    featured: false,
    published: true,
    html: segmented,
    prompt: `Build an iOS-style "Segmented Control" in pure HTML/CSS/JS: a rounded-14px glass container (4px padding) with four buttons — Hourly/Daily/Weekly/Monthly (Daily starts active) — and an absolute .seg-glide thumb that is a cyan→violet gradient rounded-10px with a soft cyan glow shadow. Clicking a button measures its rect and springs the glide to its x offset and width via transform/width transitions .35s cubic-bezier(.22,1,.36,1); the active label turns dark (#04121a) and bold while inactive labels are dim. Initialize the thumb on rAF (default to the active option). Title "Segmented Control". Dark #070711. No libraries.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-17T10:00:00Z",
    updatedAt: "2026-08-29T10:00:00Z",
  },
  {
    id: "el-conic",
    slug: "conic-gradient-spinner",
    category: "elements",
    title: "Conic Gradient Ring Spinner",
    summary: "A spinning conic-gradient arc revealed by a radial mask — one element, zero keyframe paths.",
    author: "Uiverse style",
    tags: ["loader", "spinner", "conic", "mask", "ring"],
    tech: ["html", "css"],
    stars: 6040,
    views: 42800,
    copies: 9400,
    featured: false,
    published: true,
    html: conicSpinner,
    prompt: `Build a "Conic Gradient Ring Spinner" in pure HTML/CSS (single element): a 76px circle whose background is conic-gradient(from 0deg, transparent 0%, violet 55%, fuchsia 80%, cyan 100%); reveal ONLY an 8px ring using a radial-gradient mask (-webkit-mask and mask): radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px)); rotate the whole element 0→360deg over .9s linear infinite; add a violet drop-shadow glow. Title "Conic Gradient Spinner" with hint "One element · mask-revealed conic arc". Dark #070711. No JS.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-20T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
  },
  {
    id: "el-badge",
    slug: "shine-sweep-badge",
    category: "elements",
    title: "Shine-Sweep Badges",
    summary: "Pill badges in three tints with a diagonal light sweep that crosses on a loop, staggered.",
    author: "Uiverse style",
    tags: ["badge", "shine", "pill", "label"],
    tech: ["html", "css"],
    stars: 3310,
    views: 24100,
    copies: 5500,
    featured: false,
    published: true,
    html: shineBadge,
    prompt: `Build "Shine-Sweep Badges" in pure HTML/CSS: three pill badges (rounded-full, 10px 22px padding, bold tracked 13px uppercase-ish text) in violet/cyan/fuchsia tints (translucent 14-18% bg, matching 40% border and pastel text): "✦ PRO PLAN", "NEW DROPS DAILY", "LIMITED ✧ 500 SPOTS". Each has overflow:hidden and an ::after skewed light bar: a 45%-wide linear-gradient(105deg, transparent, rgba(255,255,255,.55), transparent) strip starting left:-60%, animating to left:130% over 2.6s ease-in-out infinite; stagger the second/third badges with delays .9s/1.7s. Title "Shine-Sweep Badges". Dark #070711. No JS.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-23T10:00:00Z",
    updatedAt: "2026-08-31T10:00:00Z",
  },
  {
    id: "el-range",
    slug: "glowing-range-slider",
    category: "elements",
    title: "Glowing Range Slider",
    summary: "A filled-track slider whose violet→fuchsia fill follows the value, with a glowing white thumb.",
    author: "Uiverse style",
    tags: ["slider", "range", "form", "input", "glow"],
    tech: ["html", "css", "javascript"],
    stars: 4270,
    views: 30900,
    copies: 7100,
    featured: false,
    published: true,
    html: glowRange,
    prompt: `Build a "Glowing Range Slider" in HTML/CSS/JS: a range input (min 0 max 100, start 64) styled as an 8px rounded-full track whose background is a linear-gradient filled violet to --fill% then translucent white after (JS updates --fill on input); the -webkit-slider-thumb is a 24px white circle with a 4px fuchsia border, a fuchsia ring shadow (0 0 0 4px rgba(217,70,239,.25)) plus a strong fuchsia glow, scaling 1.18 on hover (style -moz-range-thumb too). A live label shows "Value: 64%" with the number in cyan, and a 0/50/100 tick row underneath. Title "Glowing Range Slider". Dark #070711.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-26T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "el-avatars",
    slug: "overlapping-avatar-stack",
    category: "elements",
    title: "Overlapping Avatar Stack",
    summary: "Gradient initial circles overlapping in a stack that spreads apart on hover and lifts per avatar.",
    author: "Uiverse style",
    tags: ["avatars", "stack", "team", "hover"],
    tech: ["html", "css", "javascript"],
    stars: 4980,
    views: 35200,
    copies: 8300,
    featured: false,
    published: true,
    html: avatarStack,
    prompt: `Build an "Overlapping Avatar Stack" in pure HTML/CSS: five 46px circles (AK violet, JM fuchsia, SR cyan, ML amber, and a "+9" neutral indigo extra) with -12px left margins (first flush), 2.5px dark borders and white bold initials, z-index stacking. On .av hover the circles spread out: each translates translateX(var(--i)*6px) over .35s cubic-bezier(.22,1,.36,1); hovering an individual circle lifts it translateY(-10px) scale(1.12), raises z-index, adds a violet glow shadow and a light border. Title "Overlapping Avatar Stack", hint "Hover to spread · click isolates". Dark #070711. No libraries needed.`,
    sourceUrl: "https://uiverse.io",
    createdAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
];

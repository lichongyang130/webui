import { Item } from "../types";
import { doc } from "./wrap";

// ================================================================ COMPONENT: Magnetic dock (macOS style)
const dock = doc({
  body: `
<div class="dk-stage">
  <p class="dk-hint">Hover the dock — icons swell like macOS</p>
  <nav class="dk-dock" id="dock">
    ${["🏠", "🔍", "✦", "⚛️", "🎨", "⚡", "📦", "⚙️"]
      .map(
        (i, n) =>
          `<button class="dk-icon" data-i="${n}"><span class="dk-emoji">${i}</span><span class="dk-tip">App ${n + 1}</span></button>`
      )
      .join("")}
  </nav>
</div>`,
  css: `
.dk-stage{min-height:66vh;display:flex;align-items:flex-end;justify-content:center;padding-bottom:44px}
.dk-hint{position:fixed;top:32%;left:0;right:0;text-align:center;font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim)}
.dk-dock{display:flex;align-items:flex-end;gap:10px;padding:10px 14px;border-radius:22px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);backdrop-filter:blur(24px);box-shadow:0 24px 60px -20px rgba(0,0,0,.8)}
.dk-icon{position:relative;background:none;border:none;padding:0;width:48px;height:48px;display:grid;place-items:center;border-radius:14px;transition:transform .2s cubic-bezier(.34,1.7,.64,1),background .2s;transform-origin:bottom;will-change:transform}
.dk-icon:hover{background:rgba(255,255,255,.1)}
.dk-emoji{font-size:30px;line-height:1;filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))}
.dk-tip{position:absolute;top:-34px;left:50%;transform:translateX(-50%) translateY(6px);font-size:11px;letter-spacing:.08em;padding:4px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.14);background:rgba(10,10,25,.92);opacity:0;pointer-events:none;transition:all .2s;white-space:nowrap}
.dk-icon:hover .dk-tip{opacity:1;transform:translateX(-50%) translateY(0)}
`,
  js: `
const dock=document.getElementById('dock'),icons=[...dock.children];
dock.addEventListener('pointermove',e=>{
  icons.forEach(ic=>{
    const r=ic.getBoundingClientRect();
    const d=Math.abs(e.clientX-(r.left+r.width/2));
    const s=Math.max(1,1.9-d/130);
    ic.style.transform='scale('+s+') translateY('+(-(s-1)*10)+'px)';
  });
});
dock.addEventListener('pointerleave',()=>icons.forEach(ic=>ic.style.transform=''));
`,
});

// ================================================================ COMPONENT: Scroll-linked section background color
const scrollColor = doc({
  kind: "page",
  body: `
<div class="sc-sec" data-c="139,92,246"><h2>SCROLL</h2><p>The background hue shifts as you pass each section.</p></div>
<div class="sc-sec" data-c="34,211,238"><h2>DRIFT</h2><p>Interpolated between section anchor colors.</p></div>
<div class="sc-sec" data-c="232,121,249"><h2>SHIFT</h2><p>Three stops — but you could add thirty.</p></div>
<div class="sc-sec" data-c="251,191,36"><h2>GLOW</h2><p>Done with one requestAnimationFrame loop.</p></div>`,
  css: `
html{scroll-behavior:smooth}
.sc-sec{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 5vw;transition:background 1s}
.sc-sec h2{font-size:clamp(48px,10vw,120px);font-weight:900;letter-spacing:.02em;background:linear-gradient(180deg,#fff,rgba(255,255,255,.5));-webkit-background-clip:text;background-clip:text;color:transparent}
.sc-sec p{margin-top:14px;letter-spacing:.2em;text-transform:uppercase;font-size:13px;color:rgba(255,255,255,.75)}
`,
  js: `
const secs=[...document.querySelectorAll('.sc-sec')];
function rgb(s){return s.split(',').map(Number)}
function paint(){
  const y=scrollY+innerHeight/2;
  let a=secs[0],b=secs[secs.length-1],t=0;
  for(let i=0;i<secs.length-1;i++){
    const r0=secs[i].getBoundingClientRect().top+scrollY, r1=secs[i+1].getBoundingClientRect().top+scrollY;
    if(y>=r0&&y<r1){a=secs[i];b=secs[i+1];t=Math.min(1,Math.max(0,(y-r0)/(r1-r0)));break}
  }
  const ca=rgb(a.dataset.c),cb=rgb(b.dataset.c);
  const mix=ca.map((v,i)=>Math.round(v+(cb[i]-v)*t));
  document.body.style.background='rgb('+mix.join(',')+')';
  requestAnimationFrame(paint);
}
paint();
`,
});

// ================================================================ ELEMENT: Segmented control with sliding pill
const segmented = doc({
  body: `
<div class="seg-col">
  <div class="seg" id="seg1">
    <span class="seg-pill"></span>
    ${["Day", "Week", "Month", "Year"].map((l, i) => `<button class="seg-btn ${i === 0 ? "on" : ""}">${l}</button>`).join("")}
  </div>
  <div class="seg seg-icon" id="seg2">
    <span class="seg-pill"></span>
    ${["▦", "≣", "▤"]
      .map(
        (l, i) =>
          `<button class="seg-btn ${i === 0 ? "on" : ""}" style="font-size:16px;width:44px">${l}</button>`
      )
      .join("")}
  </div>
  <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)">The pill springs between options</p>
</div>`,
  css: `
.seg-col{display:flex;flex-direction:column;align-items:center;gap:28px}
.seg{position:relative;display:inline-flex;padding:4px;border-radius:14px;border:1px solid var(--line);background:var(--panel)}
.seg-pill{position:absolute;top:4px;bottom:4px;border-radius:10px;background:linear-gradient(120deg,var(--v1),var(--v2));box-shadow:0 8px 22px -8px rgba(217,70,239,.8);transition:left .32s cubic-bezier(.34,1.56,.64,1),width .32s cubic-bezier(.34,1.56,.64,1);left:4px;width:0}
.seg-btn{position:relative;z-index:1;background:none;border:none;color:var(--dim);font-weight:700;font-size:13px;padding:9px 18px;border-radius:10px;cursor:pointer;transition:color .25s;white-space:nowrap}
.seg-btn.on{color:#fff}
`,
  js: `
document.querySelectorAll('.seg').forEach(seg=>{
  const pill=seg.querySelector('.seg-pill'),btns=[...seg.querySelectorAll('.seg-btn')];
  function move(b){pill.style.left=b.offsetLeft+'px';pill.style.width=b.offsetWidth+'px';
    btns.forEach(x=>x.classList.toggle('on',x===b))}
  btns.forEach(b=>b.addEventListener('click',()=>move(b)));
  requestAnimationFrame(()=>move(btns[0]));
});
`,
});

// ================================================================ ELEMENT: Copyable hash text
const hashText = doc({
  body: `
<div class="ht-wrap">
  <code class="ht-code" id="ht">npx motionvault@latest init my-vault</code>
  <button class="ht-btn" id="htbtn">⧉ Copy</button>
</div>`,
  css: `
.ht-wrap{display:flex;align-items:center;gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:rgba(0,0,0,.35);max-width:92vw;box-shadow:0 20px 50px -20px rgba(0,0,0,.8)}
.ht-code{padding:16px 20px;font-family:var(--font-mono,monospace);font-size:14px;color:var(--c1);white-space:nowrap;overflow-x:auto}
.ht-code::before{content:'$ ';color:var(--dim)}
.ht-btn{border:none;border-left:1px solid var(--line);background:var(--panel);color:var(--txt);padding:16px 22px;font-weight:700;font-size:13px;cursor:pointer;transition:background .2s;white-space:nowrap}
.ht-btn:hover{background:rgba(34,211,238,.12);color:var(--c1)}
.ht-btn.ok{background:rgba(16,185,129,.18);color:#6ee7b7}
`,
  js: `
const btn=document.getElementById('htbtn'),code=document.getElementById('ht');
btn.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(code.textContent)}catch(e){
    const ta=document.createElement('textarea');ta.value=code.textContent;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
  }
  const old=btn.textContent;btn.textContent='✓ Copied';btn.classList.add('ok');
  setTimeout(()=>{btn.textContent=old;btn.classList.remove('ok')},1600);
});
`,
});

// ================================================================ ANIMATION: Text split word-scroll-highlight
const wordHighlight = doc({
  kind: "page",
  body: `
<div class="wh-stage">
  <p class="wh-text" id="wh">Motion is not decoration. It is the grammar of interface — the way a product explains itself, the moment a pixel stops being a picture and starts being a sentence your fingers can read. Scroll and watch the meaning arrive word by word.</p>
</div>`,
  css: `
.wh-stage{min-height:160vh;display:flex;align-items:center;justify-content:center;padding:60px 6vw}
.wh-text{max-width:760px;font-size:clamp(24px,4vw,42px);font-weight:700;line-height:1.45;letter-spacing:-.01em;color:rgba(255,255,255,.22)}
.wh-w{transition:color .3s,background .3s}
.wh-w.on{color:#fff;background:linear-gradient(180deg,transparent 62%,rgba(217,70,239,.35) 62%)}
`,
  js: `
const el=document.getElementById('wh');
el.innerHTML=el.textContent.trim().split(/\\s+/).map(w=>'<span class="wh-w">'+w+'</span>').join(' ');
const words=[...el.querySelectorAll('.wh-w')];
function onScroll(){
  const r=el.getBoundingClientRect();
  const start=innerHeight*.85, end=innerHeight*.25;
  const p=Math.min(1,Math.max(0,(start-r.top)/(start-end)));
  const count=Math.floor(p*words.length);
  words.forEach((w,i)=>w.classList.toggle('on',i<count));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
`,
});

// ================================================================ ANIMATION: Count-up stat row
const countUp = doc({
  body: `
<div class="cu-row">
  ${[
    ["98", "%", "Lighthouse"],
    ["42", "k", "Prompts copied"],
    ["74", "", "Live assets"],
    ["0", "ms", "Boring moments"],
  ]
    .map(
      ([n, s, l]) =>
        `<div class="cu-card"><b><span class="cu-n" data-n="${n}">0</span>${s}</b><span>${l}</span></div>`
    )
    .join("")}
</div>`,
  css: `
.cu-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:18px;width:min(760px,92vw)}
.cu-card{border:1px solid var(--line);background:var(--panel);border-radius:18px;padding:26px 20px;text-align:center}
.cu-card b{display:block;font-size:42px;font-weight:900;letter-spacing:-.02em;background:linear-gradient(120deg,var(--v1),var(--c1));-webkit-background-clip:text;background-clip:text;color:transparent}
.cu-card span:last-child{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim)}
`,
  js: `
const els=[...document.querySelectorAll('.cu-n')];
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;io.unobserve(e.target);
  const el=e.target,target=+el.dataset.n;const t0=performance.now();
  (function tick(now){
    const p=Math.min(1,(now-t0)/1400),v=Math.round(target*(1-Math.pow(1-p,3)));
    el.textContent=v;if(p<1)requestAnimationFrame(tick);
  })(t0);
}),{threshold:.4});
els.forEach(el=>io.observe(el));
`,
});

export const WAVE7_ITEMS: Item[] = [
  {
    id: "w7-dock",
    slug: "macos-magnetic-dock-menu",
    category: "components",
    title: "macOS Magnetic Dock",
    summary: "Frosted dock bar where nearby icons swell and lift with spring physics — hover distance drives the scale.",
    author: "MotionVault",
    tags: ["dock", "macos", "navigation", "magnetic", "glassmorphism"],
    tech: ["html", "css", "javascript"],
    stars: 402,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: dock,
    prompt:
      "Build a macOS-style dock menu component. A frosted glass bar (backdrop-blur, translucent white, rounded 22px, big soft shadow) sits at the bottom center holding 8 emoji app icons in 48px buttons. On pointermove over the dock, each icon's scale is computed from cursor distance to its center (scale up to 1.9 within 130px, quadratic falloff) and it also lifts upward; reset on leave. Use overshoot cubic-bezier(.34,1.7,.64,1) transitions, transform-origin bottom. Hovering an icon shows a tooltip above it fading/sliding in. Dark stage with a hint caption.",
    status: "curated",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "w7-scroll-color",
    slug: "scroll-linked-background-color",
    category: "components",
    title: "Scroll-Linked Background Color Shift",
    summary: "Full-viewport sections where the page background interpolates through per-section RGB stops as you scroll.",
    author: "MotionVault",
    tags: ["scroll", "background", "color", "sections", "storytelling"],
    tech: ["html", "css", "javascript"],
    stars: 287,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: scrollColor,
    prompt:
      "Create a storytelling page of four full-height sections (SCROLL/DRIFT/SHIFT/GLOW) with giant gradient-clipped headlines. Each section carries a data-c RGB color. A requestAnimationFrame loop finds which two sections the viewport center is between, computes the interpolation factor from their scroll positions, mixes their RGB colors and sets the body background, so the whole page hue smoothly transforms during scroll (violet→cyan→magenta→amber). Include a fallback transition. Pure vanilla JS, no libraries.",
    status: "curated",
    createdAt: "2026-09-01T10:05:00.000Z",
    updatedAt: "2026-09-01T10:05:00.000Z",
  },
  {
    id: "w7-segmented",
    slug: "sliding-pill-segmented-control",
    category: "elements",
    title: "Sliding Pill Segmented Control",
    summary: "Text and icon segmented controls where a gradient pill springs between options with overshoot easing.",
    author: "MotionVault",
    tags: ["segmented", "tabs", "pill", "form", "selector"],
    tech: ["html", "css", "javascript"],
    stars: 241,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: segmented,
    prompt:
      "Build reusable segmented controls: a rounded container with an absolutely-positioned gradient pill that animates between buttons. On click, set the pill's left/width from the target button's offsetLeft/offsetWidth with a springy cubic-bezier(.34,1.56,.64,1) transition; the active button label turns white, others dim. Provide one text variant (Day/Week/Month/Year) and one icon variant (3 layout glyphs). Initial pill position set on load via rAF. Dark glass styling, no frameworks.",
    status: "curated",
    createdAt: "2026-09-01T10:10:00.000Z",
    updatedAt: "2026-09-01T10:10:00.000Z",
  },
  {
    id: "w7-hash-copy",
    slug: "terminal-copyable-command-hash",
    category: "elements",
    title: "Terminal Copyable Command Block",
    summary: "A shell-command hash chip with a $ prompt and an inline copy button that flips to a green ✓ confirmation.",
    author: "MotionVault",
    tags: ["terminal", "command", "copy", "code", "cli"],
    tech: ["html", "css", "javascript"],
    stars: 198,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: hashText,
    prompt:
      "Design a copyable terminal command block: a dark rounded container showing a monospace cyan command with a dim '$ ' prompt prefix, and an attached right-side copy button separated by a border. Clicking copies the command text (clipboard API with textarea fallback), the button turns green and shows '✓ Copied' for 1.6s before restoring. Horizontal scroll for long commands, subtle shadow, monospace font. Self-contained HTML/CSS/JS.",
    status: "curated",
    createdAt: "2026-09-01T10:15:00.000Z",
    updatedAt: "2026-09-01T10:15:00.000Z",
  },
  {
    id: "w7-word-highlight",
    slug: "scroll-word-by-word-text-highlight",
    category: "animations",
    title: "Word-by-Word Scroll Text Highlight",
    summary: "Long-form manifesto text that lights up one word at a time as you scroll, each with a marker underline.",
    author: "MotionVault",
    tags: ["text", "scroll", "highlight", "storytelling", "typography"],
    tech: ["html", "css", "javascript"],
    stars: 356,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: wordHighlight,
    prompt:
      "Create the Apple-style scroll-linked text effect: a tall section containing one large bold paragraph (about 45 words) in a 160vh stage. On load, split the text into word spans, starting dim white at 22% opacity. On scroll, compute progress between the paragraph entering at 85% viewport height and reaching 25%, then toggle each word to highlighted (full white with a fuchsia marker underline via gradient background-size trick) up to the progress count. Smooth passive scroll listener, large clamp(24px-42px) type, no libraries.",
    status: "curated",
    createdAt: "2026-09-01T10:20:00.000Z",
    updatedAt: "2026-09-01T10:20:00.000Z",
  },
  {
    id: "w7-countup",
    slug: "intersection-count-up-stat-cards",
    category: "animations",
    title: "Count-Up Stat Cards (in-view)",
    summary: "Glass stat cards whose gradient numbers ease from zero when scrolled into view, powered by IntersectionObserver.",
    author: "MotionVault",
    tags: ["count-up", "stats", "scroll", "numbers", "in-view"],
    tech: ["html", "css", "javascript"],
    stars: 224,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: countUp,
    prompt:
      "Build a responsive row of four glass stat cards with huge gradient numbers. Numbers animate from 0 to their data-n target with cubic ease-out over 1.4s, but only when the card scrolls into view (IntersectionObserver threshold .4, unobserve after triggering). Include suffix support (%, k). Cards use translucent panels, 1px borders, rounded 18px, small uppercase labels. Pure vanilla JS with requestAnimationFrame.",
    status: "curated",
    createdAt: "2026-09-01T10:25:00.000Z",
    updatedAt: "2026-09-01T10:25:00.000Z",
  },
];

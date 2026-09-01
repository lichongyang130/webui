import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T17:00:00.000Z";

/* 1 — TYPEWRITER ROTATING WORDS */
const typewriter = doc({
  body: `
<h1 class="tw">Build <span id="tw">interfaces</span><span class="caret">|</span></h1>`,
  css: `
h1.tw{font-size:clamp(30px,6vw,64px);font-weight:800;letter-spacing:-.02em;white-space:nowrap}
.tw{color:transparent;background:linear-gradient(90deg,#22d3ee,#d946ef);-webkit-background-clip:text;background-clip:text}
.caret{color:#d946ef;animation:blink 1s steps(1) infinite;font-weight:400}
@keyframes blink{50%{opacity:0}}`,
  js: `
const words=['interfaces','experiences','delight','micro-motion','loyalty','the future'];
const el=document.getElementById('tw');
let wi=0,ci=0,deleting=false;
function tick(){
  const w=words[wi];
  ci+=deleting?-1:1;
  el.textContent=w.slice(0,ci);
  let delay=deleting?45:110;
  if(!deleting&&ci===w.length){delay=1700;deleting=true;}
  else if(deleting&&ci===0){deleting=false;wi=(wi+1)%words.length;delay=400;}
  setTimeout(tick,delay);
}
tick();`,
});

/* 2 — STACKING CARDS STICKY SCROLL */
const stackCards = doc({
  kind: "page",
  body: `
<div class="stack">
  <section class="sc" style="--i:0"><h2>01 · DISCOVER</h2><p>Browse 116 motion assets with live previews</p></section>
  <section class="sc" style="--i:1"><h2>02 · PROMPT</h2><p>Copy battle-tested AI prompts tuned per style</p></section>
  <section class="sc" style="--i:2"><h2>03 · GENERATE</h2><p>Paste into any AI coding tool and watch it build</p></section>
  <section class="sc" style="--i:3"><h2>04 · SHIP</h2><p>Tweak the playground, favorite, and launch</p></section>
</div>`,
  css: `
body{display:block}
.stack{max-width:760px;margin:0 auto;padding:120px 20px}
.sc{position:sticky;top:120px;height:70vh;margin-bottom:80px;border-radius:28px;padding:48px;
  display:flex;flex-direction:column;justify-content:center;overflow:hidden;border:1px solid rgba(255,255,255,.12);
  box-shadow:0 30px 80px rgba(0,0,0,.5);
  transform:scale(calc(1 - var(--i) * .03));
  background:
    radial-gradient(500px 300px at 80% 0%,rgba(217,70,239,.25),transparent 70%),
    radial-gradient(500px 300px at 10% 100%,rgba(34,211,238,.22),transparent 70%),
    linear-gradient(160deg,#16102e,#0b0b1c)}
.sc:nth-child(2){background:
    radial-gradient(500px 300px at 80% 0%,rgba(34,211,238,.25),transparent 70%),
    radial-gradient(500px 300px at 10% 100%,rgba(124,58,237,.25),transparent 70%),
    linear-gradient(160deg,#0c1f2e,#0b0b1c)}
.sc:nth-child(3){background:
    radial-gradient(500px 300px at 80% 0%,rgba(16,185,129,.22),transparent 70%),
    radial-gradient(500px 300px at 10% 100%,rgba(34,211,238,.22),transparent 70%),
    linear-gradient(160deg,#0d2420,#0b0b1c)}
.sc:nth-child(4){background:
    radial-gradient(500px 300px at 80% 0%,rgba(245,158,11,.22),transparent 70%),
    radial-gradient(500px 300px at 10% 100%,rgba(244,63,94,.22),transparent 70%),
    linear-gradient(160deg,#241a0d,#0b0b1c)}
.sc h2{font-size:clamp(30px,5vw,52px);font-weight:900;letter-spacing:-.02em;margin-bottom:14px}
.sc p{color:rgba(255,255,255,.6);font-size:18px}`,
});

/* 3 — COPY-TO-CLIPBOARD TRAY */
const copyTray = doc({
  body: `
<div class="tray">
  <code id="snippet">npx create-motionvault my-app</code>
  <button id="cp" class="cp-btn">Copy</button>
  <span id="ok" class="ok">Copied!</span>
</div>`,
  css: `
.tray{display:flex;align-items:center;gap:10px;border:1px solid var(--line);background:#0a0a18;border-radius:14px;padding:8px 8px 8px 18px;
  font-family:'JetBrains Mono',monospace;box-shadow:0 0 0 1px rgba(217,70,239,.1),0 10px 40px rgba(0,0,0,.4)}
code{color:#a7f3d0;font-size:14px}
.cp-btn{background:linear-gradient(90deg,var(--v1),var(--v2));color:#fff;font-weight:700;font-size:13px;
  border:0;border-radius:9px;padding:9px 18px;transition:transform .15s,filter .2s;font-family:inherit}
.cp-btn:hover{filter:brightness(1.15)}.cp-btn:active{transform:scale(.94)}
.ok{position:absolute;opacity:0;color:#34d399;font-size:12px;font-weight:700;transition:opacity .3s;font-family:inherit}
.tray{position:relative}
.ok.show{opacity:1;animation:okpop .3s cubic-bezier(.34,1.56,.64,1)}
@keyframes okpop{from{transform:translateY(6px) scale(.8)}to{transform:translateY(0) scale(1)}}`,
  js: `
const btn=document.getElementById('cp'),snip=document.getElementById('snippet'),ok=document.getElementById('ok');
btn.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(snip.textContent);}
  catch(e){const ta=document.createElement('textarea');ta.value=snip.textContent;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();}
  btn.textContent='Copied ✓';ok.classList.add('show');
  setTimeout(()=>{btn.textContent='Copy';ok.classList.remove('show');},1800);
});`,
});

/* 4 — PRICING TOGGLE MONTHLY/YEARLY */
const priceToggle = doc({
  body: `
<div class="pt-wrap">
  <div class="pt-switch"><button id="m" class="on">Monthly</button><button id="y">Yearly</button><i>-20%</i></div>
  <div class="pt-cards">
    <div class="pt"><h4>Starter</h4><div class="price"><sup>$</sup><span id="p1">0</span><small>/mo</small></div><p>Free forever</p></div>
    <div class="pt hot"><h4>Pro</h4><div class="price"><sup>$</sup><span id="p2">29</span><small>/mo</small></div><p>All assets</p></div>
    <div class="pt"><h4>Team</h4><div class="price"><sup>$</sup><span id="p3">79</span><small>/mo</small></div><p>For studios</p></div>
  </div>
</div>`,
  css: `
.pt-wrap{width:min(720px,100%)}
.pt-switch{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:28px;position:relative}
.pt-switch button{padding:9px 22px;border-radius:999px;font-weight:700;font-size:13px;color:var(--dim);transition:all .3s}
.pt-switch button.on{color:#fff;background:linear-gradient(90deg,var(--v1),var(--v2));box-shadow:0 6px 20px rgba(217,70,239,.4)}
.pt-switch i{font-style:normal;font-size:11px;font-weight:800;color:#052e16;background:#34d399;border-radius:999px;padding:3px 9px;margin-left:6px}
.pt-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.pt{border:1px solid var(--line);border-radius:20px;padding:24px;background:var(--panel);text-align:center;transition:transform .3s,border-color .3s}
.pt:hover{transform:translateY(-6px);border-color:rgba(217,70,239,.4)}
.pt.hot{border-color:rgba(217,70,239,.5);background:linear-gradient(170deg,rgba(217,70,239,.14),rgba(124,58,237,.06));transform:scale(1.05)}
.pt.hot:hover{transform:scale(1.05) translateY(-6px)}
.pt h4{font-size:15px;letter-spacing:.15em;text-transform:uppercase;color:var(--dim)}
.price{margin:14px 0 6px;font-size:44px;font-weight:900}.price sup{font-size:20px;vertical-align:super}.price small{font-size:13px;color:var(--dim);font-weight:500}
.price span{display:inline-block;transition:transform .3s,opacity .3s}
.pt p{font-size:12px;color:var(--dim)}`,
  js: `
const prices={m:[0,29,79],y:[0,23,63]};
const m=document.getElementById('m'),y=document.getElementById('y');
function set(yr){
  m.classList.toggle('on',!yr);y.classList.toggle('on',yr);
  ['p1','p2','p3'].forEach((id,i)=>{
    const el=document.getElementById(id);
    el.style.opacity='0';el.style.transform='translateY(-8px)';
    setTimeout(()=>{el.textContent=yr?prices.y[i]:prices.m[i];el.style.opacity='1';el.style.transform='translateY(0)';},180);
  });
}
m.onclick=()=>set(false);y.onclick=()=>set(true);`,
});

/* 5 — CARD STACK SWIPE (tinder style) */
const swipeStack = doc({
  body: `
<div class="swipe-area" id="area">
  <div class="sw-hint"><span class="no">✕ NOPE</span><span class="yes">LIKE ♥</span></div>
  <div class="sw-cards" id="cards"></div>
</div>`,
  css: `
.swipe-area{position:relative;width:min(320px,100%);height:420px;touch-action:none;user-select:none}
.sw-hint{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;z-index:5;pointer-events:none;padding:0 6px}
.sw-hint span{font-weight:900;font-size:18px;letter-spacing:.1em;padding:6px 12px;border:3px solid;border-radius:10px;opacity:0;transition:opacity .15s}
.sw-hint .no{color:#f43f5e;border-color:#f43f5e;transform:rotate(-12deg)}
.sw-hint .yes{color:#34d399;border-color:#34d399;transform:rotate(12deg)}
.sw-card{position:absolute;inset:0;border-radius:26px;padding:30px;display:flex;flex-direction:column;justify-content:flex-end;
  border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 60px rgba(0,0,0,.55);cursor:grab;
  transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .35s;will-change:transform}
.sw-card h3{font-size:26px;font-weight:900}.sw-card p{color:rgba(255,255,255,.75);font-size:14px;margin-top:8px}
.sw-card.g1{background:linear-gradient(160deg,#4c1d95,#7c3aed 55%,#d946ef)}
.sw-card.g2{background:linear-gradient(160deg,#0e7490,#22d3ee 60%,#a78bfa)}
.sw-card.g3{background:linear-gradient(160deg,#9d174d,#f472b6 55%,#fbbf24)}
.sw-card.g4{background:linear-gradient(160deg,#065f46,#10b981 55%,#22d3ee)}
.sw-card.fly{transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .5s;opacity:0}`,
  js: `
const data=[
  {t:'Particle Sphere',p:'900-point 3D fibonacci sphere you can drag.',g:'g1'},
  {t:'Synthwave Grid',p:'Retrowave floor with striped setting sun.',g:'g2'},
  {t:'Split-Flap Board',p:'Airport-style amber rolling text.',g:'g3'},
  {t:'Magnetic Button',p:'CTA that springs toward your cursor.',g:'g4'},
];
const box=document.getElementById('cards'),area=document.getElementById('area');
const hintNo=document.querySelector('.no'),hintYes=document.querySelector('.yes');
let idx=0;
function render(){
  box.innerHTML='';
  for(let k=Math.min(2,data.length-1);k>=0;k--){
    const d=data[(idx+k)%data.length];
    const c=document.createElement('div');
    c.className='sw-card '+d.g;c.style.zIndex=10-k;
    c.style.transform='scale('+(1-k*.05)+') translateY('+(k*-10)+'px)';
    c.innerHTML='<h3>'+d.t+'</h3><p>'+d.p+'</p>';
    if(k===0) bind(c);
    box.appendChild(c);
  }
}
function bind(c){
  let sx=0,sy=0,dx=0,drag=false;
  c.style.cursor='grab';
  c.addEventListener('pointerdown',e=>{drag=true;c.setPointerCapture(e.pointerId);sx=e.clientX;sy=e.clientY;c.style.transition='none';});
  c.addEventListener('pointermove',e=>{if(!drag)return;dx=e.clientX-sx;const dy=e.clientY-sy;
    c.style.transform='translate('+dx+'px,'+dy+'px) rotate('+dx/14+'deg)';
    hintNo.style.opacity=Math.max(0,Math.min(1,-dx/90));
    hintYes.style.opacity=Math.max(0,Math.min(1,dx/90));});
  c.addEventListener('pointerup',()=>{drag=false;
    if(Math.abs(dx)>110){
      const dir=dx>0?1:-1;
      c.classList.add('fly');
      c.style.transform='translate('+dir*500+'px,40px) rotate('+dir*22+'deg)';
      setTimeout(()=>{idx=(idx+1)%data.length;render();},420);
    } else {
      c.style.transition='transform .35s cubic-bezier(.22,1,.36,1)';
      c.style.transform='translate(0,0) rotate(0)';
    }
    dx=0;hintNo.style.opacity=0;hintYes.style.opacity=0;});
}
render();`,
});

/* 6 — LOADING BAR WITH PERCENT + TIPS */
const loadingBar = doc({
  body: `
<div class="lb-card">
  <div class="lb-pct" id="pct">0%</div>
  <div class="lb-track"><div class="lb-fill" id="fill"></div></div>
  <div class="lb-tip" id="tip">Warming up the vault…</div>
</div>`,
  css: `
.lb-card{width:min(360px,100%);border:1px solid var(--line);border-radius:20px;padding:28px;background:var(--panel);text-align:center}
.lb-pct{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:700;
  background:linear-gradient(90deg,#22d3ee,#d946ef);-webkit-background-clip:text;background-clip:text;color:transparent}
.lb-track{margin:16px 0;height:8px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.lb-fill{height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#22d3ee,#7c3aed,#d946ef);
  background-size:200% 100%;animation:shimmer 1.4s linear infinite;transition:width .25s ease}
@keyframes shimmer{to{background-position:-200% 0}}
.lb-tip{font-size:12px;color:var(--dim);min-height:1.2em;transition:opacity .3s}`,
  js: `
const tips=['Warming up the vault…','Polishing keyframes…','Counting particles…','Aligning the grid…','Almost there…'];
let p=0;
const fill=document.getElementById('fill'),pct=document.getElementById('pct'),tip=document.getElementById('tip');
const iv=setInterval(()=>{
  p=Math.min(100,p+Math.random()*12+3);
  fill.style.width=p+'%';pct.textContent=Math.floor(p)+'%';
  tip.textContent=tips[Math.min(tips.length-1,Math.floor(p/22))];
  if(p>=100){clearInterval(iv);tip.textContent='Ready. Build something loud.';
    pct.textContent='100%';}
},320);`,
});

export const WAVE14_ITEMS: Item[] = [
  {
    id: "w14-type",
    slug: "typewriter-rotating-words",
    category: "elements",
    title: "Typewriter rotating words",
    summary: "Type-delete cycling of gradient words after a fixed lead phrase, with a blinking caret.",
    author: "MotionVault",
    tags: ["typewriter", "text", "rotating", "caret", "hero", "typing"],
    tech: ["html", "css", "javascript"],
    stars: 458, views: 0, copies: 0, featured: false, published: true,
    html: typewriter,
    prompt:
      "Build a typewriter headline: a static lead phrase 'Build' followed by a gradient-clipped word that types out character by character (110ms per char), holds 1.7s, then deletes (45ms) and cycles through an array of words, with a blinking fuchsia block caret (steps(1) blink animation). Vanilla JS with setTimeout recursion, no libraries. Dark background, Space Grotesk extra bold.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w14-stack",
    slug: "sticky-stacking-story-cards",
    category: "templates",
    title: "Sticky stacking story cards",
    summary: "Full-height sticky cards pile up as you scroll a 4-step story, each with its own gradient atmosphere.",
    author: "MotionVault",
    tags: ["scroll", "sticky", "stacking", "cards", "story", "sections"],
    tech: ["html", "css"],
    stars: 487, views: 0, copies: 0, featured: true, published: true,
    html: stackCards,
    prompt:
      "Create a scroll-driven stacking card story: four full-height (70vh) rounded sections inside a tall container, each position sticky with top 120px so they pile over one another while scrolling; scale each card slightly (1 - index*.03) via a --i custom property. Give each card a unique gradient atmosphere (violet/fuchsia, cyan/violet, emerald/cyan, amber/rose radial glows on dark), a huge step number headline and a description. Pure CSS sticky positioning, no JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w14-copy",
    slug: "copy-command-tray",
    category: "components",
    title: "Copy-command terminal tray",
    summary: "Monospace install-command tray with a gradient copy button, clipboard API + execCommand fallback, 'Copied ✓' state.",
    author: "MotionVault",
    tags: ["copy", "clipboard", "terminal", "command", "tray", "code"],
    tech: ["html", "css", "javascript"],
    stars: 356, views: 0, copies: 0, featured: false, published: true,
    html: copyTray,
    prompt:
      "Build a copy-command tray like docs sites: a dark rounded terminal-style bar showing a monospace npm install command in green and a gradient 'Copy' button on the right. Clicking writes to navigator.clipboard with a textarea+execCommand fallback, then the button flips to 'Copied ✓' for 1.8s with a small pop animation. JetBrains Mono, subtle fuchsia ring glow. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w14-price",
    slug: "pricing-monthly-yearly-toggle",
    category: "components",
    title: "Pricing monthly/yearly toggle",
    summary: "Pill toggle switches prices between monthly and yearly (-20%) with a number roll transition; middle plan highlighted.",
    author: "MotionVault",
    tags: ["pricing", "toggle", "billing", "cards", "switch"],
    tech: ["html", "css", "javascript"],
    stars: 374, views: 0, copies: 0, featured: false, published: true,
    html: priceToggle,
    prompt:
      "Build a pricing section with a monthly/yearly billing toggle: a pill switch where the active option gets a gradient background, with a green '-20%' badge next to Yearly. Three pricing cards (Starter free, Pro highlighted with fuchsia border/scale 1.05, Team) each with a big price; clicking the toggle animates each price number out (fade + translateY -8px), swaps it after 180ms, and rolls the new one in. Prices: 0/29/79 monthly, 0/23/63 yearly. Cards lift on hover. Vanilla JS toggling a state.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w14-swipe",
    slug: "tinder-card-stack-swipe",
    category: "components",
    title: "Tinder-style swipe card stack",
    summary: "Drag the top card to like/nope — it flies off with rotation, stamps fade in at the edges, stack reshuffles. Pointer events.",
    author: "MotionVault",
    tags: ["swipe", "cards", "gesture", "drag", "tinder", "stack", "mobile"],
    tech: ["html", "css", "javascript"],
    stars: 513, views: 0, copies: 0, featured: true, published: true,
    html: swipeStack,
    prompt:
      "Build a tinder-style swipeable card stack: a 320x420px area with three gradient content cards stacked (top full-size, lower ones scaled .95/.9 and offset up). Pointer events drive dragging the top card: it follows the pointer and rotates by dx/14 degrees; red 'NOPE' and green 'LIKE' stamps at the top corners fade in with drag distance. Releasing past a 110px threshold flings the card off-screen in that direction with increased rotation, then the stack re-renders with the next card; otherwise it springs back. touch-action none, pointer capture, cubic-bezier snap-back. Vanilla JS, data array of 4 cards cycling.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w14-load",
    slug: "loading-bar-percent-tips",
    category: "animations",
    title: "Loading bar with percent + rotating tips",
    summary: "Gradient shimmer progress bar with a huge mono percentage and contextual tips that change per phase.",
    author: "MotionVault",
    tags: ["loading", "progress", "bar", "percent", "tips", "shimmer"],
    tech: ["html", "css", "javascript"],
    stars: 301, views: 0, copies: 0, featured: false, published: true,
    html: loadingBar,
    prompt:
      "Create a loading screen card: a huge JetBrains Mono gradient percentage number, an 8px track with a gradient fill that grows with a shimmering animated background-size effect, and a rotating tip line underneath. JS increments progress in random 3-12% steps every 320ms to 100%, updating width and text, and swaps the tip text based on progress phase ('Warming up…', 'Polishing keyframes…', 'Counting particles…', 'Aligning the grid…', 'Almost there…', then 'Ready. Build something loud.'). Smooth width transitions, dark glass card.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

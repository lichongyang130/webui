import { Item } from "../types";
import { doc } from "./wrap";

// ================================================================ TEMPLATE: Web3 dashboard dark
const web3Dash = doc({
  kind: "page",
  body: `
<nav class="w3-nav"><b>⬡ BLOCKVAULT</b><div><a>Protocol</a><a>Vaults</a><a class="w3-cta">Connect Wallet</a></div></nav>
<main class="w3-main">
  <div class="w3-hero">
    <p class="w3-kick">◆ LIVE ON MAINNET · BLOCK #18,932,041</p>
    <h1>Yield that <span>moves</span><br/>like the market.</h1>
    <p class="w3-sub">Automated vault strategies compound your assets every 8 seconds. No paperwork, no waiting, no sleep.</p>
    <div class="w3-actions"><button class="w3-p">Launch app</button><button class="w3-s">Read docs</button></div>
  </div>
  <div class="w3-grid">
    ${[
      ["Total value locked", "$842.1M", "+18.4%"],
      ["Vaults deployed", "24,309", "+612"],
      ["Avg APY", "21.8%", "+2.1%"],
      ["Strategies", "37", "+3"],
    ]
      .map(
        ([l, v, d]) => `<div class="w3-card"><span>${l}</span><b class="w3-count" data-n="${v.replace(/[^0-9.]/g, "")}">0</b><i class="w3-up">▲ ${d}</i></div>`
      )
      .join("")}
  </div>
  <div class="w3-chart">
    <div class="w3-chart-head"><b>TVL — 30d</b><span>◆ 24h volume $182M</span></div>
    <canvas id="w3cv"></canvas>
  </div>
</main>`,
  css: `
body{background:#05060f}
.w3-nav{display:flex;justify-content:space-between;align-items:center;padding:22px 5vw;border-bottom:1px solid rgba(255,255,255,.07)}
.w3-nav b{font-family:var(--font-mono,monospace);letter-spacing:.12em}
.w3-nav div{display:flex;gap:24px;font-size:14px;color:var(--dim);align-items:center}
.w3-nav a:hover{color:#fff}
.w3-cta{background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.45);color:#67e8f9!important;padding:9px 20px;border-radius:10px;font-weight:700}
.w3-main{max-width:1100px;margin:0 auto;padding:70px 5vw}
.w3-kick{font-family:var(--font-mono,monospace);font-size:12px;letter-spacing:.22em;color:#67e8f9;margin-bottom:20px}
.w3-hero h1{font-size:clamp(38px,6vw,68px);font-weight:900;line-height:1.05;letter-spacing:-.03em}
.w3-hero h1 span{background:linear-gradient(100deg,#22d3ee,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
.w3-sub{margin:22px 0 32px;max-width:52ch;color:var(--dim);line-height:1.7;font-size:16px}
.w3-actions{display:flex;gap:12px;flex-wrap:wrap}
.w3-p{padding:14px 28px;border-radius:12px;border:none;background:linear-gradient(120deg,#06b6d4,#7c3aed);color:#fff;font-weight:800;font-size:15px;box-shadow:0 14px 40px -12px rgba(34,211,238,.7);cursor:pointer}
.w3-s{padding:14px 28px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--txt);font-weight:700;font-size:15px;cursor:pointer}
.w3-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:56px 0 24px}
.w3-card{border:1px solid var(--line);background:linear-gradient(160deg,rgba(34,211,238,.06),rgba(255,255,255,.02));border-radius:18px;padding:22px;position:relative;overflow:hidden}
.w3-card::before{content:'';position:absolute;inset0;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(34,211,238,.08) 50%,transparent 70%);background-size:220%;animation:w3sh 3.5s linear infinite}
@keyframes w3sh{to{background-position:-220% 0}}
.w3-card span{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim)}
.w3-card b{display:block;font-size:30px;font-weight:900;margin:10px 0 4px;font-family:var(--font-mono,monospace)}
.w3-up{font-style:normal;font-size:12px;color:#34d399;font-weight:700}
.w3-chart{border:1px solid var(--line);border-radius:18px;padding:22px;background:rgba(255,255,255,.02)}
.w3-chart-head{display:flex;justify-content:space-between;font-size:13px;color:var(--dim);margin-bottom:14px}
.w3-chart-head b{color:var(--txt)}
#w3cv{width:100%;height:160px;display:block}
`,
  js: `
const cv=document.getElementById('w3cv'),ctx=cv.getContext('2d');
function rs(){cv.width=cv.clientWidth;cv.height=160}rs();addEventListener('resize',rs);
const pts=Array.from({length:60},(_,i)=>({x:i,y:.55+Math.sin(i*.4)*.18+Math.random()*.12}));
function draw(){
  ctx.clearRect(0,0,cv.width,cv.height);
  const W=cv.width,H=cv.height;
  const P=pts.map((p,i)=>({x:i/(pts.length-1)*W,y:H-p.y*H}));
  const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'rgba(34,211,238,.35)');grad.addColorStop(1,'transparent');
  ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
  ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
  ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
  ctx.strokeStyle='#22d3ee';ctx.lineWidth=2;ctx.shadowColor='#22d3ee';ctx.shadowBlur=12;ctx.stroke();ctx.shadowBlur=0;
  const last=P[P.length-1];ctx.fillStyle='#67e8f9';ctx.beginPath();ctx.arc(last.x,last.y,4,0,7);ctx.fill();
  requestAnimationFrame(draw);
}
draw();
// animate counters
document.querySelectorAll('.w3-count').forEach(el=>{
  const raw=el.dataset.n,dec=raw.includes('.')?1:0,suf=el.closest('.w3-card').querySelector('b').nextSibling;
  const target=parseFloat(raw);let cur=0;
  setInterval(()=>{cur=Math.min(target,cur+target/60);
    el.textContent=dec?cur.toFixed(1):Math.round(cur).toLocaleString();
  },24);
});
`,
});

// ================================================================ COMPONENT: Code window with typing tabs
const codeWindow = doc({
  body: `
<div class="cw">
  <div class="cw-bar">
    <span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span>
    <div class="cw-tabs">
      <button class="cw-tab on" data-f="0">Hero.tsx</button>
      <button class="cw-tab" data-f="1">aurora.frag</button>
      <button class="cw-tab" data-f="2">prompt.md</button>
    </div>
  </div>
  <pre class="cw-code" id="code"></pre>
</div>`,
  css: `
.cw{width:min(680px,94vw);border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:#0a0d1f;box-shadow:0 40px 90px -30px rgba(0,0,0,.9);font-family:var(--font-mono,monospace)}
.cw-bar{display:flex;align-items:center;gap:8px;padding:12px 14px;background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.08)}
.cw-dot{width:11px;height:11px;border-radius:50%}.cw-dot.r{background:#ff5f57}.cw-dot.y{background:#febc2e}.cw-dot.g{background:#28c840}
.cw-tabs{display:flex;gap:4px;margin-left:14px;overflow-x:auto}
.cw-tab{background:none;border:none;color:var(--dim);font-size:12px;font-family:inherit;padding:6px 12px;border-radius:8px;cursor:pointer;white-space:nowrap}
.cw-tab.on{background:rgba(34,211,238,.12);color:#67e8f9}
.cw-code{margin:0;padding:20px 22px;font-size:13px;line-height:1.75;color:#c8d4f7;min-height:290px;white-space:pre-wrap}
.tok-k{color:#c084fc}.tok-s{color:#6ee7b7}.tok-c{color:#5a567d}.tok-f{color:#22d3ee}.tok-n{color:#fbbf24}
`,
  js: `
var files=[
 '<span class="tok-k">export default function</span> <span class="tok-f">Hero</span>() {\n  <span class="tok-k">return</span> (\n    &lt;section <span class="tok-n">className</span>=<span class="tok-s">&quot;aurora-stage&quot;</span>&gt;\n      &lt;canvas <span class="tok-n">id</span>=<span class="tok-s">&quot;gl&quot;</span> /&gt;\n      &lt;h1&gt;Ship in minutes.&lt;/h1&gt;\n    &lt;/section&gt;\n  );\n}',
 '<span class="tok-c">// fbm noise aurora fragment</span>\n<span class="tok-k">float</span> <span class="tok-f">fbm</span>(vec2 p){\n  <span class="tok-k">float</span> v=<span class="tok-n">0.</span>, a=.<span class="tok-n">5</span>;\n  <span class="tok-k">for</span>(<span class="tok-k">int</span> i=<span class="tok-n">0</span>;i&lt;<span class="tok-n">5</span>;i++){\n    v+=a*noise(p); p*=<span class="tok-n">2.03</span>; a*=.<span class="tok-n">5</span>;\n  } <span class="tok-k">return</span> v;\n}',
 '<span class="tok-c"># Prompt</span>\nCreate a landing hero with a\nWebGL aurora curtain reacting to\nthe cursor, violet-cyan palette,\nmagnetic CTAs.\n<span class="tok-s">&rarr; paste into Cursor</span>'
];
var el=document.getElementById('code'), typing=null;
function show(i){
  clearInterval(typing);
  el.innerHTML='';var ci=0;
  typing=setInterval(function(){el.innerHTML=files[i].slice(0,ci+=3);
    if(ci>=files[i].length)clearInterval(typing)},12);
}
document.querySelectorAll('.cw-tab').forEach(function(t){t.onclick=function(){
  document.querySelectorAll('.cw-tab').forEach(function(x){x.classList.toggle('on',x===t)});
  show(+t.dataset.f);
}});
show(0);
`,
});

// ================================================================ ELEMENT: Notification toast stack
const toastStack = doc({
  body: `
<div class="ts-stage">
  <button class="ts-fire" id="fire">⚡ Trigger notifications</button>
  <div class="ts-stack" id="stack"></div>
</div>`,
  css: `
.ts-stage{min-height:60vh;display:grid;place-items:center;position:relative}
.ts-fire{padding:16px 32px;border-radius:14px;border:none;background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;font-weight:800;font-size:15px;box-shadow:0 16px 40px -12px rgba(217,70,239,.9);cursor:pointer;transition:transform .2s}
.ts-fire:hover{transform:translateY(-2px)}
.ts-stack{position:fixed;top:24px;right:24px;display:flex;flex-direction:column;gap:12px;z-index:50;width:min(330px,86vw)}
.ts-toast{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:14px;border:1px solid var(--line);background:rgba(13,13,30,.94);backdrop-filter:blur(16px);box-shadow:0 24px 60px -20px rgba(0,0,0,.8);animation:tsin .45s cubic-bezier(.22,1,.36,1) both}
.ts-toast.out{animation:tsout .35s ease both}
@keyframes tsin{from{opacity:0;transform:translateX(60px) scale(.95)}to{opacity:1;transform:none}}
@keyframes tsout{to{opacity:0;transform:translateX(40px) scale(.95)}}
.ts-ic{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-size:16px;flex-shrink:0}
.ts-ok .ts-ic{background:rgba(16,185,129,.15);color:#34d399}
.ts-info .ts-ic{background:rgba(34,211,238,.15);color:#22d3ee}
.ts-warn .ts-ic{background:rgba(251,191,36,.15);color:#fbbf24}
.ts-err .ts-ic{background:rgba(244,63,94,.15);color:#fb7185}
.ts-b b{display:block;font-size:13.5px;margin-bottom:2px}
.ts-b span{font-size:12px;color:var(--dim);line-height:1.5}
.ts-bar{position:absolute;left:0;bottom:0;height:2px;border-radius:2px;background:currentColor;opacity:.5;animation:tsbar 4s linear forwards}
@keyframes tsbar{to{width:0}}
.ts-ok .ts-bar{color:#34d399}.ts-info .ts-bar{color:#22d3ee}.ts-warn .ts-bar{color:#fbbf24}.ts-err .ts-bar{color:#fb7185}
`,
  js: `
const stack=document.getElementById('stack');
const notes=[
 ['ok','✓','Prompt copied','Pasted straight into your AI tool'],
 ['info','✦','New asset dropped','CRT Arcade Landing is live'],
 ['warn','⚠','Rate limit','5 submissions per hour'],
 ['err','✕','Preview failed','The sandbox blocked a script'],
];
function fire(){
  notes.forEach((n,i)=>setTimeout(()=>push(...n),i*650));
}
function push(type,ic,title,body){
  const t=document.createElement('div');
  t.className='ts-toast ts-'+type;
  t.innerHTML='<div class="ts-ic">'+ic+'</div><div class="ts-b"><b>'+title+'</b><span>'+body+'</span></div><div class="ts-bar" style="width:100%"></div>';
  stack.appendChild(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),350)},4000);
}
document.getElementById('fire').onclick=fire;
fire();
`,
});

// ================================================================ ELEMENT: Tooltip bubble
const tooltip = doc({
  body: `
<div class="tt-wrap">
  <button class="tt-host" data-tt="Copy the AI prompt to your clipboard" data-pos="top">Hover top</button>
  <button class="tt-host" data-tt="Opens the live sandbox preview" data-pos="bottom">Hover bottom</button>
  <button class="tt-host tt-acc" data-tt="Keyboard shortcut: press ⌘K anywhere" data-pos="top">⌘K</button>
</div>`,
  css: `
.tt-wrap{display:flex;gap:30px;flex-wrap:wrap;justify-content:center}
.tt-host{position:relative;padding:15px 28px;border-radius:13px;border:1px solid var(--line);background:var(--panel);color:var(--txt);font-weight:700;font-size:14px;cursor:pointer;transition:border-color .2s,transform .2s}
.tt-host:hover{border-color:var(--c1);transform:translateY(-2px)}
.tt-acc{width:58px;padding:15px 0;color:var(--c1);font-family:var(--font-mono,monospace)}
.tt-host::after{content:attr(data-tt);position:absolute;left:50%;transform:translateX(-50%) translateY(6px) scale(.92);background:#101024;color:#fff;font-size:12px;font-weight:500;padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);white-space:nowrap;opacity:0;pointer-events:none;transition:all .22s cubic-bezier(.34,1.56,.64,1);box-shadow:0 14px 34px -12px rgba(0,0,0,.8);z-index:10}
.tt-host::before{content:'';position:absolute;left:50%;transform:translateX(-50%);border:6px solid transparent;opacity:0;transition:opacity .2s;z-index:10}
.tt-host[data-pos="top"]::after{bottom:calc(100% + 12px)}
.tt-host[data-pos="top"]::before{bottom:calc(100% + 1px);border-top-color:#101024}
.tt-host[data-pos="bottom"]::after{top:calc(100% + 12px)}
.tt-host[data-pos="bottom"]::before{top:calc(100% + 1px);border-bottom-color:#101024}
.tt-host:hover::after{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
.tt-host:hover::before{opacity:1}
`,
});

// ================================================================ ANIMATION: Sticky stacking cards
const stackCards = doc({
  kind: "page",
  body: `
<div class="sk-intro"><h1>Keep scrolling — the cards stack.</h1></div>
<div class="sk-list">
  ${[
    ["01", "DISCOVER", "68 live assets across four vaults, each running real code.", "#8b5cf6"],
    ["02", "PREVIEW", "Hover every card to see the actual animation, not a screenshot.", "#22d3ee"],
    ["03", "COPY", "Grab a battle-tested prompt tuned for Cursor and Claude Code.", "#d946ef"],
    ["04", "SHIP", "Paste, tweak, deploy. The loop takes minutes, not weeks.", "#f59e0b"],
  ]
    .map(
      ([n, t, d, c]) => `<section class="sk-card" style="--c:${c}">
    <b>${n}</b><h2>${t}</h2><p>${d}</p>
  </section>`
    )
    .join("")}
</div>
<div class="sk-outro"><h2>Then it's your turn. ✦</h2></div>`,
  css: `
.sk-intro{min-height:90vh;display:grid;place-items:center;text-align:center;padding:40px}
.sk-intro h1{font-size:clamp(30px,5vw,56px);font-weight:900;letter-spacing:-.02em}
.sk-list{padding:0 5vw;display:flex;flex-direction:column;gap:60px}
.sk-card{position:sticky;top:120px;min-height:52vh;border-radius:28px;padding:56px 6vw;display:flex;flex-direction:column;justify-content:center;overflow:hidden;
  border:1px solid color-mix(in srgb,var(--c) 45%,transparent);
  background:linear-gradient(160deg,color-mix(in srgb,var(--c) 14%,#0a0a18),#0a0a18 70%);
  box-shadow:0 30px 80px -30px rgba(0,0,0,.9)}
.sk-card b{font-family:var(--font-mono,monospace);font-size:15px;color:var(--c);letter-spacing:.3em}
.sk-card h2{font-size:clamp(36px,6vw,64px);font-weight:900;margin:14px 0;letter-spacing:-.02em}
.sk-card p{max-width:46ch;color:var(--dim);font-size:17px;line-height:1.7}
.sk-card::after{content:'';position:absolute;width:300px;height:300px;border-radius:50%;background:var(--c);filter:blur(120px);opacity:.18;right:-80px;top:-80px;pointer-events:none}
.sk-outro{min-height:70vh;display:grid;place-items:center}
.sk-outro h2{font-size:clamp(28px,5vw,52px);font-weight:900}
`,
});

// ================================================================ ANIMATION: Gradient border button hover
const gradBorderBtn = doc({
  body: `
<div class="gb-wrap">
  <button class="gb"><span>Start for free</span></button>
  <button class="gb gb-cyan"><span>View source</span></button>
</div>`,
  css: `
.gb-wrap{display:flex;gap:30px;flex-wrap:wrap;justify-content:center}
.gb{position:relative;padding:2px;border-radius:16px;border:none;background:conic-gradient(from var(--gb,0deg),var(--v1),var(--v2),var(--c1),var(--v1));cursor:pointer;animation:gbspin 3s linear infinite;box-shadow:0 16px 44px -16px rgba(217,70,239,.7)}
.gb-cyan{box-shadow:0 16px 44px -16px rgba(34,211,238,.6)}
.gb span{display:block;padding:15px 34px;border-radius:14px;background:#0c0c1d;color:#fff;font-weight:800;font-size:15px;transition:background .3s}
.gb:hover span{background:#12122c}
@property --gb{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes gbspin{to{--gb:360deg}}
`,
});

export const WAVE9_ITEMS: Item[] = [
  {
    id: "w9-web3",
    slug: "web3-defi-dashboard-landing",
    category: "templates",
    title: "Web3 DeFi Dashboard Landing",
    summary: "Dark fintech page with mainnet ticker, TVL stat cards, animated live chart and gradient CTAs.",
    author: "MotionVault",
    tags: ["web3", "dashboard", "fintech", "landing", "data"],
    tech: ["html", "css", "javascript"],
    stars: 421,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: web3Dash,
    prompt:
      "Create a single-file dark Web3 DeFi landing page for 'BLOCKVAULT'. Aesthetic: near-black #05060f, cyan/violet gradients, monospace data labels, thin borders. Include: nav with Connect Wallet ghost button; hero with mainnet block-number kicker ticker (set static text), huge headline with gradient-clipped word, sub copy; a row of four glass stat cards (TVL $842.1M, vaults, APY, strategies) each with shimmer sweep and count-up numbers with green delta chips; a chart panel rendering a smooth animated area+line canvas (cyan glow stroke, fading gradient fill, pulsing last point) on a requestAnimationFrame loop. No external libs.",
    status: "curated",
    createdAt: "2026-09-01T12:00:00.000Z",
    updatedAt: "2026-09-01T12:00:00.000Z",
  },
  {
    id: "w9-code-window",
    slug: "typed-code-window-tabs",
    category: "components",
    title: "Typed Code Window with File Tabs",
    summary: "An editor mockup that re-types syntax-highlighted code per tab — Hero.tsx, a GLSL shader, the AI prompt.",
    author: "MotionVault",
    tags: ["code", "window", "tabs", "typing", "developer"],
    tech: ["html", "css", "javascript"],
    stars: 355,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: codeWindow,
    prompt:
      "Build a developer code-window component: macOS-style rounded dark window with traffic-light dots and a tab bar (Hero.tsx, aurora.frag, prompt.md). Clicking a tab highlights it and re-types that file's content character-by-character into a <pre> block with a monospace font. Syntax colors via span classes: keywords violet, strings green, comments dim, functions cyan, numbers amber. Content: a React hero snippet, an fbm GLSL fragment snippet, and a short markdown prompt. All inline, no syntax library.",
    status: "curated",
    createdAt: "2026-09-01T12:05:00.000Z",
    updatedAt: "2026-09-01T12:05:00.000Z",
  },
  {
    id: "w9-toasts",
    slug: "notification-toast-stack",
    category: "elements",
    title: "Notification Toast Stack",
    summary: "Four-toned toasts (success/info/warn/error) that spring in from the right with progress bars and auto-dismiss.",
    author: "MotionVault",
    tags: ["toast", "notification", "feedback", "stack", "ui-kit"],
    tech: ["html", "css", "javascript"],
    stars: 296,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: toastStack,
    prompt:
      "Create a notification toast stack system. A trigger button fires four toasts staggered by 650ms; each toast appears fixed top-right, springing in from the right (cubic-bezier overshoot) with an icon tile, bold title and dim description, tinted per type: success emerald, info cyan, warning amber, error rose. Each toast has a bottom progress bar animating width to 0 over 4s, after which it slides out and removes itself. Frosted dark glass, colored glow shadows, a demo auto-fires on load. Vanilla JS.",
    status: "curated",
    createdAt: "2026-09-01T12:10:00.000Z",
    updatedAt: "2026-09-01T12:10:00.000Z",
  },
  {
    id: "w9-tooltip",
    slug: "spring-tooltip-bubbles",
    category: "elements",
    title: "Spring Tooltip Bubbles",
    summary: "Pure-CSS tooltips with data-attribute text, arrow and an overshoot pop, positioning top or bottom.",
    author: "MotionVault",
    tags: ["tooltip", "popover", "hint", "micro", "css-only"],
    tech: ["html", "css"],
    stars: 187,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: tooltip,
    prompt:
      "Build pure-CSS tooltips using data-tt attributes. Hovering a host button reveals a dark rounded tooltip positioned top or bottom via data-pos, with a small arrow triangle; it animates opacity and a springy scale/translate on enter using cubic-bezier(.34,1.56,.64,1). Tooltip shows attr(data-tt) in ::after, arrow in ::before. Three demo buttons: top, bottom, and an accent ⌘K keycap. Long text stays on one line with nowrap, border and soft shadow, no JS.",
    status: "curated",
    createdAt: "2026-09-01T12:15:00.000Z",
    updatedAt: "2026-09-01T12:15:00.000Z",
  },
  {
    id: "w9-stack",
    slug: "sticky-stacking-cards-story",
    category: "animations",
    title: "Sticky Stacking Cards Story",
    summary: "Full-height intro then four step cards that pin and stack over each other as you scroll, tinted per card.",
    author: "MotionVault",
    tags: ["sticky", "stack", "scroll", "storytelling", "cards"],
    tech: ["html", "css"],
    stars: 338,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: stackCards,
    prompt:
      "Create a scroll-driven stacking-card story: a 90vh intro headline, then four large rounded step cards (DISCOVER/PREVIEW/COPY/SHIP) each position:sticky with top offset so they pin and pile up over previous ones while scrolling; use per-card --c color custom property for the tinted border, gradient wash background and a blurred glow blob in the corner. Cards have big 6vw numbers/titles and muted descriptions. End with a 70vh outro. Pure CSS sticky stacking, no JS.",
    status: "curated",
    createdAt: "2026-09-01T12:20:00.000Z",
    updatedAt: "2026-09-01T12:20:00.000Z",
  },
  {
    id: "w9-grad-btn",
    slug: "rotating-conic-gradient-button",
    category: "animations",
    title: "Rotating Conic Gradient Border Button",
    summary: "A CTA wrapped in an animated conic-gradient ring rotating via @property — with a cyan colorway variant.",
    author: "MotionVault",
    tags: ["button", "conic-gradient", "border", "glow", "cta"],
    tech: ["html", "css"],
    stars: 254,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: gradBorderBtn,
    prompt:
      "Build a CTA button with an animated rotating gradient border: the outer button element has a conic-gradient background (violet→fuchsia→cyan→violet) whose angle is a registered @property --gb animated 0→360deg over 3s, giving a traveling light ring; the inner span has a solid dark fill with rounded corners so only the 2px ring shows, plus a matching colored drop shadow. Hover lightens the inner fill. Provide two variants (fuchsia glow, cyan glow). Pure CSS.",
    status: "curated",
    createdAt: "2026-09-01T12:25:00.000Z",
    updatedAt: "2026-09-01T12:25:00.000Z",
  },
];

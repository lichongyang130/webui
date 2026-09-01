import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T18:00:00.000Z";

/* 1 — STEPPER / PROGRESS NAV */
const stepper = doc({
  body: `
<div class="steps" id="steps">
  <div class="st active" data-n="1"><b>1</b><span>Prompt</span></div>
  <div class="st" data-n="2"><b>2</b><span>Generate</span></div>
  <div class="st" data-n="3"><b>3</b><span>Tweak</span></div>
  <div class="st" data-n="4"><b>4</b><span>Ship</span></div>
</div>
<button id="next" class="st-btn">Next step →</button>`,
  css: `
.steps{display:flex;width:min(560px,100%);position:relative;margin-bottom:36px}
.steps::before{content:'';position:absolute;top:19px;left:8%;right:8%;height:3px;border-radius:3px;background:rgba(255,255,255,.1);z-index:0}
.steps .bar{position:absolute;top:19px;left:8%;height:3px;border-radius:3px;background:linear-gradient(90deg,#22d3ee,#d946ef);z-index:1;transition:width .5s cubic-bezier(.22,1,.36,1)}
.st{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;z-index:2}
.st b{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:15px;
  background:#14142b;border:2px solid rgba(255,255,255,.15);color:var(--dim);transition:all .4s}
.st span{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--dim);transition:color .3s}
.st.active b{border-color:transparent;background:linear-gradient(#0e0e22,#0e0e22) padding-box,linear-gradient(135deg,#22d3ee,#d946ef) border-box;color:#fff;
  box-shadow:0 0 20px rgba(217,70,239,.5)}
.st.done b{background:linear-gradient(135deg,#22d3ee,#7c3aed);border-color:transparent;color:#06121a}
.st.active span,.st.done span{color:#fff}
.st-btn{background:linear-gradient(90deg,var(--v1),var(--v2));color:#fff;font-weight:700;border:0;border-radius:12px;padding:13px 28px;font-size:14px;
  box-shadow:0 10px 30px rgba(217,70,239,.35);transition:transform .15s}
.st-btn:active{transform:scale(.95)}`,
  js: `
const wrap=document.getElementById('steps');
const bar=document.createElement('div');bar.className='bar';wrap.appendChild(bar);
let cur=0;const sts=[...wrap.querySelectorAll('.st')];
function paint(){
  sts.forEach((s,i)=>{s.classList.toggle('active',i===cur);s.classList.toggle('done',i<cur);});
  bar.style.width=cur===0?'0%':'calc('+(cur/(sts.length-1))*84+'% )';
  bar.style.left=cur===0?'8%':'8%';
}
paint();
document.getElementById('next').onclick=()=>{cur=(cur+1)%sts.length;paint();};`,
});

/* 2 — GLITCH HOVER TEXT */
const glitch = doc({
  body: `<h1 class="gl" data-text="GLITCH">GLITCH</h1>`,
  css: `
h1.gl{font-size:clamp(48px,12vw,110px);font-weight:900;letter-spacing:.05em;position:relative;cursor:pointer}
h1.gl::before,h1.gl::after{content:attr(data-text);position:absolute;inset:0;opacity:0;transition:opacity .1s}
h1.gl:hover::before{opacity:1;color:#22d3ee;animation:gl1 .4s steps(2) infinite;z-index:-1}
h1.gl:hover::after{opacity:1;color:#f43f5e;animation:gl2 .4s steps(2) infinite;z-index:-2}
@keyframes gl1{0%{transform:translate(0,0)}25%{transform:translate(-3px,2px)}50%{transform:translate(3px,-2px)}75%{transform:translate(-2px,-1px)}100%{transform:translate(2px,1px)}}
@keyframes gl2{0%{transform:translate(0,0)}25%{transform:translate(3px,-2px)}50%{transform:translate(-3px,2px)}75%{transform:translate(2px,1px)}100%{transform:translate(-2px,-1px)}}
h1.gl:hover{text-shadow:0 0 30px rgba(217,70,239,.5)}`,
});

/* 3 — FROSTED GLASS TOOLTIP BUBBLES */
const tooltips = doc({
  body: `
<div class="tt-row">
  <button class="tt" data-tip="Copy the AI prompt" data-pos="t">Copy</button>
  <button class="tt" data-tip="Save to favorites" data-pos="b">♥ Favorite</button>
  <button class="tt" data-tip="Download TSX" data-pos="t">Download</button>
</div>`,
  css: `
.tt-row{display:flex;gap:26px}
.tt{position:relative;background:rgba(255,255,255,.07);border:1px solid var(--line);color:#fff;font-weight:700;
  border-radius:12px;padding:13px 24px;font-size:14px;transition:border-color .25s,background .25s}
.tt:hover{border-color:rgba(217,70,239,.5);background:rgba(217,70,239,.12)}
.tt::after{content:attr(data-tip);position:absolute;left:50%;transform:translateX(-50%) scale(.8);
  padding:7px 12px;border-radius:9px;font-size:11px;font-weight:600;white-space:nowrap;pointer-events:none;
  background:rgba(13,13,30,.85);border:1px solid rgba(217,70,239,.35);color:#e9d5ff;
  backdrop-filter:blur(10px);opacity:0;transition:all .25s cubic-bezier(.34,1.56,.64,1);z-index:5}
.tt::before{content:'';position:absolute;left:50%;transform:translateX(-50%) rotate(45deg);
  width:8px;height:8px;background:rgba(13,13,30,.85);border:1px solid rgba(217,70,239,.35);opacity:0;transition:opacity .25s;z-index:6}
.tt[data-pos="t"]::after{bottom:calc(100% + 12px)}.tt[data-pos="t"]::before{bottom:calc(100% + 8px)}
.tt[data-pos="b"]::after{top:calc(100% + 12px)}.tt[data-pos="b"]::before{top:calc(100% + 8px)}
.tt[data-pos="b"]::before{border:0;border-left:1px solid rgba(217,70,239,.35);border-bottom:1px solid rgba(217,70,239,.35)}
.tt:hover::after{opacity:1;transform:translateX(-50%) scale(1)}
.tt:hover::before{opacity:1}`,
});

/* 4 — DIRECTION-AWARE HOVER GLOW CARD */
const dirCard = doc({
  body: `
<div class="dc" id="dc"><div class="dc-glow" id="gl"></div><div class="dc-body"><h3>Direction Aware</h3><p>The light enters from whichever side your cursor arrives.</p></div></div>`,
  css: `
.dc{position:relative;width:min(340px,100%);border-radius:22px;overflow:hidden;border:1px solid var(--line);
  background:linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.02));min-height:200px}
.dc-glow{position:absolute;width:300px;height:300px;border-radius:50%;pointer-events:none;opacity:0;transition:opacity .35s;
  background:radial-gradient(circle,rgba(217,70,239,.35),rgba(124,58,237,.12) 45%,transparent 70%);transform:translate(-50%,-50%)}
.dc:hover .dc-glow{opacity:1}
.dc-body{position:relative;padding:30px;z-index:1}.dc-body h3{font-size:22px;margin-bottom:10px}.dc-body p{color:var(--dim);font-size:14px;line-height:1.7}`,
  js: `
const card=document.getElementById('dc'),gl=document.getElementById('gl');
card.addEventListener('pointermove',e=>{
  const r=card.getBoundingClientRect();
  gl.style.left=(e.clientX-r.left)+'px';
  gl.style.top=(e.clientY-r.top)+'px';
});
card.addEventListener('pointerenter',e=>{
  const r=card.getBoundingClientRect();
  // enter from nearest edge
  const ex=Math.min(e.clientX-r.left,r.right-e.clientX),ey=Math.min(e.clientY-r.top,r.bottom-e.clientY);
  gl.style.transition='none';
  if(ex<ey) gl.style.left=(e.clientX-r.left<r.width/2?'-100px':r.width+100+'px')+'';
  else gl.style.top=(e.clientY-r.top<r.height/2?'-100px':r.height+100+'px')+'';
  requestAnimationFrame(()=>{gl.style.transition='opacity .35s';});
});`,
});

/* 5 — ANALOG CLOCK / LIVE TIME */
const clock = doc({
  body: `
<div class="clock" id="clock"><div class="face"><div class="hd hour" id="h"></div><div class="hd min" id="m"></div><div class="hd sec" id="s"></div><div class="pin"></div></div>
<div class="dig" id="dig">--:--:--</div></div>`,
  css: `
.clock{display:flex;flex-direction:column;align-items:center;gap:20px}
.face{position:relative;width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#1b1b3a,#0b0b1c 70%);
  border:2px solid rgba(217,70,239,.4);box-shadow:0 0 50px rgba(217,70,239,.25),inset 0 0 30px rgba(0,0,0,.6)}
.face::before{content:'12';position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:11px;color:var(--dim);font-family:'JetBrains Mono',monospace}
.face::after{content:'6';position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:11px;color:var(--dim);font-family:'JetBrains Mono',monospace}
.hd{position:absolute;left:50%;bottom:50%;transform-origin:50% 100%;border-radius:4px}
.hour{width:5px;height:52px;margin-left:-2.5px;background:linear-gradient(to top,#a78bfa,#d946ef)}
.min{width:3px;height:74px;margin-left:-1.5px;background:linear-gradient(to top,#22d3ee,#67e8f9)}
.sec{width:1.5px;height:82px;margin-left:-.75px;background:#f43f5e;box-shadow:0 0 8px rgba(244,63,94,.8)}
.pin{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:#f43f5e;box-shadow:0 0 10px rgba(244,63,94,.9)}
.dig{font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:.2em;color:#22d3ee;text-shadow:0 0 12px rgba(34,211,238,.5)}`,
  js: `
const h=document.getElementById('h'),m=document.getElementById('m'),s=document.getElementById('s'),dig=document.getElementById('dig');
function tick(){
  const d=new Date();
  const sec=d.getSeconds()+d.getMilliseconds()/1000;
  const min=d.getMinutes()+sec/60;
  const hr=d.getHours()%12+min/60;
  s.style.transform='rotate('+sec*6+'deg)';
  m.style.transform='rotate('+min*6+'deg)';
  h.style.transform='rotate('+hr*30+'deg)';
  dig.textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(v=>String(v).padStart(2,'0')).join(':');
  requestAnimationFrame(tick);
}
tick();`,
});

/* 6 — SEGMENTED CONTROL */
const segmented = doc({
  body: `
<div class="seg" id="seg"><span class="ind"></span><button class="on">Overview</button><button>Prompt</button><button>Code</button><button>Ratings</button></div>
<div class="seg-out" id="out">Overview panel</div>`,
  css: `
.seg{position:relative;display:inline-flex;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:13px;padding:4px;gap:0}
.seg button{position:relative;z-index:1;background:none;border:0;color:var(--dim);font-weight:700;font-size:13px;
  padding:9px 20px;border-radius:9px;transition:color .3s;white-space:nowrap}
.seg button.on{color:#fff}
.seg .ind{position:absolute;top:4px;bottom:4px;left:4px;border-radius:9px;z-index:0;
  background:linear-gradient(90deg,var(--v1),var(--v2));box-shadow:0 4px 16px rgba(217,70,239,.4);
  transition:transform .35s cubic-bezier(.34,1.56,.64,1),width .35s cubic-bezier(.34,1.56,.64,1)}
.seg-out{margin-top:28px;font-size:14px;color:var(--dim);border:1px dashed var(--line);border-radius:14px;padding:24px;min-width:280px;text-align:center}`,
  js: `
const seg=document.getElementById('seg'),ind=seg.querySelector('.ind'),btns=[...seg.querySelectorAll('button')];
const out=document.getElementById('out');
function move(b){
  ind.style.width=b.offsetWidth+'px';
  ind.style.transform='translateX('+(b.offsetLeft-4)+'px)';
  btns.forEach(x=>x.classList.toggle('on',x===b));
  out.textContent=b.textContent+' panel';
}
btns.forEach(b=>b.addEventListener('click',()=>move(b)));
requestAnimationFrame(()=>move(btns[0]));
addEventListener('resize',()=>move(seg.querySelector('button.on')));`,
});

export const WAVE15_ITEMS: Item[] = [
  {
    id: "w15-step",
    slug: "gradient-stepper-progress-nav",
    category: "components",
    title: "Gradient stepper progress nav",
    summary: "4-step wizard indicator: numbered nodes light up with gradient borders as the fill bar advances.",
    author: "MotionVault",
    tags: ["stepper", "progress", "wizard", "steps", "nav", "form"],
    tech: ["html", "css", "javascript"],
    stars: 328, views: 0, copies: 0, featured: false, published: true,
    html: stepper,
    prompt:
      "Build a 4-step progress stepper: four evenly-spaced numbered circles connected by a track line; an absolutely-positioned gradient (cyan→fuchsia) fill bar advances with a cubic-bezier width transition as steps complete. Completed circles get a solid gradient fill, the active circle gets a gradient border via border-box padding-box trick with a fuchsia glow, upcoming ones stay dim; labels sit under each circle. A 'Next step' button cycles the state. Vanilla JS toggling active/done classes and moving the bar.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w15-glitch",
    slug: "rgb-glitch-hover-text",
    category: "elements",
    title: "RGB glitch hover text",
    summary: "Hover the word and cyan/red RGB-split layers jitter in stepped keyframes — cyberpunk title effect.",
    author: "MotionVault",
    tags: ["glitch", "rgb", "text", "hover", "cyberpunk", "distortion"],
    tech: ["html", "css"],
    stars: 419, views: 0, copies: 0, featured: true, published: true,
    html: glitch,
    prompt:
      "Create an RGB glitch text effect: a bold headline with data-text attribute; ::before and ::after pseudo-elements duplicate the text in cyan and red, hidden until hover. On hover they opacity-in and run steps(2) jitter keyframes translating ±3px in different patterns so the channels visibly split, while the base text gains a fuchsia text-shadow glow. Dark background, huge heavy type. Pure CSS, no JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w15-tip",
    slug: "frosted-glass-tooltips",
    category: "components",
    title: "Frosted glass directional tooltips",
    summary: "Blurred glass tooltips with an arrow notch pop in above or below buttons on hover, spring easing.",
    author: "MotionVault",
    tags: ["tooltip", "glass", "frosted", "popover", "hover", "ui-kit"],
    tech: ["html", "css"],
    stars: 287, views: 0, copies: 0, featured: false, published: true,
    html: tooltips,
    prompt:
      "Build frosted-glass tooltips on a row of buttons: each button has a data-tip label and data-pos (t/b). The ::after pseudo renders the tip as a dark translucent (rgba .85) pill with backdrop-blur, 1px fuchsia border, positioned above or below; a rotated square ::before forms the arrow notch. Both fade/scale in with a spring cubic-bezier on hover, hidden with opacity/pointer-events. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w15-dir",
    slug: "direction-aware-hover-glow",
    category: "components",
    title: "Direction-aware hover glow card",
    summary: "A 300px radial light follows the cursor and snaps in from the edge the pointer entered from.",
    author: "MotionVault",
    tags: ["hover", "glow", "direction-aware", "card", "spotlight", "cursor"],
    tech: ["html", "css", "javascript"],
    stars: 376, views: 0, copies: 0, featured: false, published: true,
    html: dirCard,
    prompt:
      "Create a direction-aware glow card: a rounded glass card containing a 300px radial gradient glow layer positioned at the cursor via pointermove (translate -50%). On pointerenter, detect which edge the cursor entered from (compare distances to edges) and start the glow just outside that edge so it visibly slides in from the entry side, then tracks the pointer. Glow fades out on leave. Vanilla JS, transform-based, no libraries.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w15-clock",
    slug: "neon-analog-live-clock",
    category: "animations",
    title: "Neon analog live clock",
    summary: "A glowing analog clock with smooth rAF-driven hands plus a digital readout — set in neon fuchsia and cyan.",
    author: "MotionVault",
    tags: ["clock", "time", "analog", "neon", "hands", "live"],
    tech: ["html", "css", "javascript"],
    stars: 334, views: 0, copies: 0, featured: false, published: true,
    html: clock,
    prompt:
      "Build a live analog clock: a 200px circular dark face with fuchsia neon border and glow, 12/6 markers, and three hands (hour violet-fuchsia gradient, minute cyan, second glowing red) rotating from the bottom center with a red center pin. Time is computed from Date each requestAnimationFrame so the second hand sweeps smoothly (include milliseconds); show a monospace cyan digital HH:MM:SS readout below. No images, pure CSS + vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w15-seg",
    slug: "spring-segmented-control",
    category: "components",
    title: "Spring sliding segmented control",
    summary: "iOS-style segmented tabs where the gradient indicator springs between options and resizes itself.",
    author: "MotionVault",
    tags: ["segmented", "tabs", "control", "switch", "spring", "ui-kit"],
    tech: ["html", "css", "javascript"],
    stars: 305, views: 0, copies: 0, featured: false, published: true,
    html: segmented,
    prompt:
      "Build a segmented control: a pill container with 4 text buttons (Overview, Prompt, Code, Ratings) and an absolutely-positioned gradient indicator behind the active tab. Clicking a tab springs the indicator to that button's offsetLeft/offsetWidth with a bouncy cubic-bezier(.34,1.56,.64,1) transition on both transform and width; active text turns white, others dim. Initialize on requestAnimationFrame and re-measure on resize. A dashed output panel below shows the active tab name. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

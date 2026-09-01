import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T20:00:00.000Z";

/* 1 — FLOATING LABEL INPUT */
const floatingLabel = doc({
  body: `
<form class="fl-form" onsubmit="return false">
  <div class="fl-field"><input class="fl-in" id="fl" type="text" placeholder=" " /><label for="fl">Your project name</label></div>
  <div class="fl-field"><input class="fl-in" id="fl2" type="email" placeholder=" " /><label for="fl2">Email address</label></div>
</form>`,
  css: `
.fl-form{width:min(340px,100%);display:flex;flex-direction:column;gap:26px}
.fl-field{position:relative}
.fl-in{width:100%;padding:18px 16px 8px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.04);
  color:#fff;font-size:15px;outline:none;transition:border-color .3s,box-shadow .3s}
.fl-in:focus{border-color:rgba(34,211,238,.6);box-shadow:0 0 0 3px rgba(34,211,238,.12)}
.fl-field label{position:absolute;left:16px;top:14px;color:var(--dim);font-size:14px;pointer-events:none;
  transition:all .25s cubic-bezier(.22,1,.36,1)}
.fl-in:focus + label,.fl-in:not(:placeholder-shown) + label{
  top:5px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#22d3ee;font-weight:700}`,
});

/* 2 — COUNTDOWN TIMER */
const countdown = doc({
  body: `
<div class="cd" id="cd"><div class="cd-cell"><b id="d">00</b><span>days</span></div><i>:</i><div class="cd-cell"><b id="h">00</b><span>hours</span></div><i>:</i><div class="cd-cell"><b id="m">00</b><span>mins</span></div><i>:</i><div class="cd-cell"><b id="s">00</b><span>secs</span></div></div>`,
  css: `
.cd{display:flex;align-items:center;gap:10px}
.cd-cell{min-width:84px;border-radius:16px;border:1px solid var(--line);background:linear-gradient(170deg,rgba(124,58,237,.18),rgba(217,70,239,.08));
  padding:16px 10px;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
.cd-cell b{display:block;font-family:'JetBrains Mono',monospace;font-size:34px;font-weight:700;
  background:linear-gradient(180deg,#fff,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
.cd-cell span{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.cd>i{font-style:normal;font-size:24px;color:rgba(217,70,239,.6);font-weight:700}
@keyframes tick{0%{transform:translateY(-6px);opacity:.3}100%{transform:none;opacity:1}}
.cd-cell.tick b{animation:tick .3s ease}`,
  js: `
const target=Date.now()+1000*60*60*24*3+1000*60*47;
const el={d:document.getElementById('d'),h:document.getElementById('h'),m:document.getElementById('m'),s:document.getElementById('s')};
function pad(n){return String(n).padStart(2,'0')}
function run(){
  let diff=Math.max(0,target-Date.now());
  const d=Math.floor(diff/864e5);diff-=d*864e5;
  const h=Math.floor(diff/36e5);diff-=h*36e5;
  const m=Math.floor(diff/6e4);const s=Math.floor((diff-m*6e4)/1e3);
  const vals=[['d',d],['h',h],['m',m],['s',s]];
  vals.forEach(([k,v])=>{if(el[k].textContent!==pad(v)){el[k].textContent=pad(v);
    const cell=el[k].parentElement;cell.classList.remove('tick');void cell.offsetWidth;cell.classList.add('tick');}});
}
run();setInterval(run,1000);`,
});

/* 3 — BADGE NOTIFICATION BELL */
const bell = doc({
  body: `
<button class="bell" id="bell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg><i class="dot" id="dot">3</i></button>`,
  css: `
.bell{position:relative;width:56px;height:56px;border-radius:16px;border:1px solid var(--line);background:rgba(255,255,255,.05);
  color:#e9d5ff;display:grid;place-items:center;transition:transform .2s,border-color .2s}
.bell svg{width:24px;height:24px}
.bell:hover{border-color:rgba(217,70,239,.5);transform:translateY(-2px)}
.ring{animation:ring .6s ease}
@keyframes ring{0%,100%{transform:rotate(0)}20%{transform:rotate(18deg)}40%{transform:rotate(-14deg)}60%{transform:rotate(9deg)}80%{transform:rotate(-5deg)}}
.dot{position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;border-radius:11px;
  display:grid;place-items:center;background:linear-gradient(135deg,#f43f5e,#fb7185);color:#fff;
  font-size:11px;font-weight:800;border:2px solid #0b0b1c;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.pop{animation:pop .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes pop{0%{transform:scale(0)}100%{transform:scale(1)}}`,
  js: `
const bell=document.getElementById('bell'),dot=document.getElementById('dot');
let n=3;
setInterval(()=>{bell.classList.remove('ring');void bell.offsetWidth;bell.classList.add('ring');},5000);
bell.addEventListener('click',()=>{
  n++;dot.textContent=n;
  dot.classList.remove('pop');void dot.offsetWidth;dot.classList.add('pop');
});
bell.classList.add('ring');`,
});

/* 4 — COLOR PALETTE GENERATOR */
const paletteGen = doc({
  body: `
<div class="pg"><div class="pg-cols" id="cols"></div><button id="gen" class="pg-btn">🎲 Generate palette (space)</button></div>`,
  css: `
.pg{width:min(560px,100%)}
.pg-cols{display:flex;gap:8px;margin-bottom:18px}
.col{flex:1;height:180px;border-radius:14px;display:flex;align-items:flex-end;padding:10px;cursor:pointer;
  position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.34,1.56,.64,1);border:1px solid rgba(255,255,255,.12)}
.col:hover{transform:translateY(-8px)}
.col code{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;background:rgba(0,0,0,.45);
  padding:4px 7px;border-radius:7px;backdrop-filter:blur(4px);width:100%;text-align:center}
.pg-btn{width:100%;padding:14px;border:0;border-radius:14px;font-weight:800;color:#fff;font-size:14px;
  background:linear-gradient(90deg,var(--v1),var(--v2));box-shadow:0 10px 30px rgba(217,70,239,.3);transition:transform .15s}
.pg-btn:active{transform:scale(.97)}`,
  js: `
const wrap=document.getElementById('cols');
function hsl(h,s,l){return 'hsl('+h+','+s+'%,'+l+'%)';}
function gen(){
  wrap.innerHTML='';
  const base=Math.floor(Math.random()*360);
  for(let i=0;i<5;i++){
    const h=(base+i*18+Math.random()*10)%360, s=62+Math.random()*20, l=28+i*11;
    const c=document.createElement('div');c.className='col';
    c.style.background=hsl(h,s,l);
    const code=document.createElement('code');code.textContent=hsl(h,s,l);
    c.appendChild(code);
    c.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(code.textContent);
      code.textContent='Copied!';setTimeout(()=>code.textContent=hsl(h,s,l),1200);};
    wrap.appendChild(c);
  }
}
document.getElementById('gen').onclick=gen;
addEventListener('keydown',e=>{if(e.code==='Space'&&!e.target.matches('input,textarea')){e.preventDefault();gen();}});
gen();`,
});

/* 5 — AVATAR STACK WITH OVERLAP */
const avatars = doc({
  body: `
<div class="av">
  <span class="a" style="--c:#7c3aed">M</span>
  <span class="a" style="--c:#22d3ee">K</span>
  <span class="a" style="--c:#f472b6">S</span>
  <span class="a" style="--c:#f59e0b">L</span>
  <span class="a" style="--c:#10b981">J</span>
  <span class="more">+128</span>
</div><p class="av-p">builders shipping with MotionVault</p>`,
  css: `
.av{display:flex;align-items:center}
.a{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#fff;
  background:var(--c);border:3px solid #0b0b1c;margin-left:-12px;z-index:1;
  transition:transform .25s cubic-bezier(.34,1.56,.64,1),z-index .25s;cursor:default}
.a:first-child{margin-left:0}
.a:hover{transform:translateY(-8px) scale(1.12);z-index:10;box-shadow:0 8px 20px rgba(0,0,0,.5)}
.more{margin-left:-12px;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:800;
  background:rgba(255,255,255,.08);border:3px solid #0b0b1c;color:var(--dim);transition:transform .25s}
.av:hover .more{transform:translateY(-4px)}
.av-p{margin-top:18px;text-align:center;font-size:13px;color:var(--dim)}`,
});

/* 6 — HAMBURGER → X MORPH */
const burger = doc({
  body: `<button class="bu" id="bu" aria-label="menu"><span></span><span></span><span></span></button>`,
  css: `
.bu{width:64px;height:64px;border-radius:18px;border:1px solid var(--line);background:rgba(255,255,255,.05);
  display:grid;place-items:center;gap:0;cursor:pointer;transition:border-color .3s,transform .15s}
.bu:hover{border-color:rgba(217,70,239,.5)}
.bu:active{transform:scale(.94)}
.bu span{display:block;width:28px;height:3px;border-radius:3px;background:linear-gradient(90deg,#22d3ee,#d946ef);
  transition:transform .4s cubic-bezier(.68,-0.4,.27,1.5),opacity .2s;margin:2.5px 0}
.bu.open span:nth-child(1){transform:translateY(8px) rotate(45deg)}
.bu.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.bu.open span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}`,
  js: `
document.getElementById('bu').addEventListener('click',e=>e.currentTarget.classList.toggle('open'));`,
});

export const WAVE17_ITEMS: Item[] = [
  {
    id: "w17-float",
    slug: "floating-label-inputs",
    category: "components",
    title: "Floating label inputs",
    summary: "Labels rise, shrink and turn cyan when the field focuses or has content — classic material-style form polish.",
    author: "MotionVault",
    tags: ["form", "input", "floating-label", "material", "ui-kit"],
    tech: ["html", "css"],
    stars: 342, views: 0, copies: 0, featured: false, published: true,
    html: floatingLabel,
    prompt:
      "Build floating-label input fields: inputs with an empty placeholder so :placeholder-shown works; the label is absolutely positioned inside the field, and on :focus (or when the input has content via :not(:placeholder-shown)) it animates up to the top, shrinks to 10px uppercase cyan. Focused inputs get a cyan border and soft ring. Two fields (name, email) in a column. Pure CSS, no JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w17-cd",
    slug: "gradient-launch-countdown",
    category: "animations",
    title: "Gradient launch countdown timer",
    summary: "Live days/hours/mins/secs countdown with glass cells, mono gradient numerals and a tick animation each change.",
    author: "MotionVault",
    tags: ["countdown", "timer", "launch", "numbers", "mono"],
    tech: ["html", "css", "javascript"],
    stars: 377, views: 0, copies: 0, featured: true, published: true,
    html: countdown,
    prompt:
      "Create a launch countdown: four glass cells (days, hours, minutes, seconds) separated by fuchsia colons; each cell shows a large JetBrains Mono gradient numeral over an uppercase label. A JS timer computes the diff to a target 3 days 47 minutes out, pads values, and when a cell's value changes restarts a small 'tick' keyframe (translates in from above, fades). Violet/fuchsia glass cells with inset highlight. Vanilla JS, runs every second.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w17-bell",
    slug: "notification-bell-badge",
    category: "components",
    title: "Notification bell with count badge",
    summary: "Ringing bell with a spring pop-in count badge; rings periodically, increments on click.",
    author: "MotionVault",
    tags: ["bell", "notification", "badge", "icon", "micro-interaction", "header"],
    tech: ["html", "css", "javascript"],
    stars: 289, views: 0, copies: 0, featured: false, published: true,
    html: bell,
    prompt:
      "Build a notification bell button: a rounded glass button with an SVG bell icon and a red gradient count badge (starting at 3) overlapping the top-right corner with a dark outline ring. The bell wiggles via a rotation keyframe every 5 seconds automatically and once on load; clicking increments the badge and replays a spring scale-in pop animation on it. Hover lifts the button and turns the border fuchsia. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w17-palette",
    slug: "harmonic-palette-generator",
    category: "components",
    title: "Harmonic palette generator",
    summary: "Generates 5-color HSL-harmonic palettes on click or spacebar; click a swatch to copy its hsl() value.",
    author: "MotionVault",
    tags: ["color", "palette", "generator", "hsl", "tool", "copy"],
    tech: ["html", "css", "javascript"],
    stars: 423, views: 0, copies: 0, featured: true, published: true,
    html: paletteGen,
    prompt:
      "Build a palette generator tool: five vertical color swatch columns plus a 'Generate palette' gradient button. On click (or pressing Space), pick a random base hue and derive 5 HSL colors stepping ~18 degrees apart with lightness ranging 28%→72%; each swatch shows its hsl() value in a dark code chip. Swatches lift on hover with spring easing; clicking a swatch copies its hsl string to the clipboard and briefly shows 'Copied!'. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w17-av",
    slug: "overlapping-avatar-stack",
    category: "components",
    title: "Overlapping avatar stack",
    summary: "Initials avatars overlap with negative margin; hovering lifts and enlarges one above the rest, +N chip at the end.",
    author: "MotionVault",
    tags: ["avatar", "stack", "social", "users", "overlap", "ui-kit"],
    tech: ["html", "css"],
    stars: 311, views: 0, copies: 0, featured: false, published: true,
    html: avatars,
    prompt:
      "Create an overlapping avatar stack: five circular initial avatars in different solid gradient-ish colors with dark outline borders, each overlapping the previous via negative margin and stacking z-index. Hovering an avatar springs it up 8px and scales it 1.12 while raising its z-index with a drop shadow. A '+128' glass chip follows the stack using the same overlap. Centered helper text below. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w17-burger",
    slug: "hamburger-x-morph-button",
    category: "components",
    title: "Hamburger to X morph button",
    summary: "Three gradient bars morph into an X with a springy cubic-bezier when toggled — the classic nav button.",
    author: "MotionVault",
    tags: ["hamburger", "menu", "morph", "icon", "button", "nav"],
    tech: ["html", "css", "javascript"],
    stars: 354, views: 0, copies: 0, featured: false, published: true,
    html: burger,
    prompt:
      "Build a hamburger button that morphs into an X: a 64px rounded glass button containing three 28px gradient bars (cyan→fuchsia) with vertical spacing. When toggled to 'open' (class on the button), the top bar translates down 8px and rotates 45deg, the middle bar fades/scales out, the bottom bar translates up 8px and rotates -45deg, all with a springy cubic-bezier overshoot easing. Vanilla JS click toggles the class.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-01T21:00:00.000Z";

/* 1 — FLOWING GRADIENT BUTTONS */
const flowButton = doc({
  body: `
<div class="fb-row">
  <button class="fb"><span>Get Started</span></button>
  <button class="fb alt"><span>Explore 140 assets</span></button>
  <button class="fb ghost"><span>Read the docs</span></button>
</div>`,
  css: `
.fb-row{display:flex;flex-wrap:wrap;gap:18px;justify-content:center}
.fb{position:relative;border:0;border-radius:14px;padding:3px;background:linear-gradient(110deg,#7c3aed,#d946ef,#22d3ee,#7c3aed);
  background-size:300% 100%;animation:flow 3.5s linear infinite;color:#fff;cursor:pointer;
  box-shadow:0 10px 30px rgba(124,58,237,.35)}
.fb span{display:block;border-radius:11px;padding:13px 28px;font-weight:800;font-size:15px;background:#12102a;transition:background .3s}
.fb:hover span{background:transparent}
.fb.alt{background:linear-gradient(110deg,#f59e0b,#f43f5e,#d946ef,#f59e0b);background-size:300% 100%;animation:flow 3s linear infinite}
.fb.ghost{background:rgba(255,255,255,.08);box-shadow:none;border:1px solid var(--line);animation:none;padding:13px 28px}
.fb.ghost span{padding:0;background:transparent}
.fb.ghost:hover{border-color:rgba(217,70,239,.5);color:#e9d5ff}
@keyframes flow{to{background-position:300% 0}}`,
});

/* 2 — WAVES LOADER (three bouncing dots) */
const dotsLoader = doc({
  body: `
<div class="dl"><div class="dots"><i></i><i></i><i></i></div><p class="dl-txt">loading<span id="dots">…</span></p></div>`,
  css: `
.dl{display:flex;flex-direction:column;align-items:center;gap:22px}
.dots{display:flex}
.dots i{width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#22d3ee,#d946ef);margin:0 6px;
  animation:bounce 1.1s cubic-bezier(.45,0,.55,1) infinite;box-shadow:0 0 18px rgba(217,70,239,.4)}
.dots i:nth-child(2){animation-delay:.15s}.dots i:nth-child(3){animation-delay:.3s}
.dl-txt{color:var(--dim);font-size:13px;letter-spacing:.25em;text-transform:uppercase}
@keyframes bounce{0%,80%,100%{transform:scale(.4);opacity:.5}40%{transform:scale(1.15) translateY(-16px);opacity:1}}
#dots{animation:blink 1.5s steps(4) infinite}
@keyframes blink{0%{opacity:.2}50%{opacity:1}100%{opacity:.2}}`,
  js: "",
});

/* 3 — RADIO CARD GROUP */
const radioCards = doc({
  body: `
<form class="rc" onsubmit="return false">
  <label class="rc-card"><input type="radio" name="plan" checked /><div class="rc-in"><h4>Hobby</h4><p>Free forever · personal projects</p><b>$0</b><span class="tick">✓</span></div></label>
  <label class="rc-card hot"><input type="radio" name="plan" /><div class="rc-in"><h4>Pro</h4><p>Everything unlocked · commercial use</p><b>$29</b><span class="tick">✓</span></div></label>
  <label class="rc-card"><input type="radio" name="plan" /><div class="rc-in"><h4>Studio</h4><p>Team seats · priority support</p><b>$99</b><span class="tick">✓</span></div></label>
</form>`,
  css: `
.rc{display:flex;flex-direction:column;gap:12px;width:min(380px,100%)}
.rc-card input{position:absolute;opacity:0;pointer-events:none}
.rc-in{position:relative;display:block;border:1px solid var(--line);border-radius:16px;padding:18px 20px;
  background:var(--panel);cursor:pointer;transition:border-color .25s,background .25s,transform .2s}
.rc-in h4{font-size:16px;margin-bottom:4px}
.rc-in p{font-size:12.5px;color:var(--dim)}
.rc-in b{position:absolute;right:44px;top:18px;font-size:22px}
.tick{position:absolute;right:16px;bottom:16px;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;
  border:2px solid var(--line);color:transparent;font-size:12px;transition:all .25s}
.rc-card:hover .rc-in{transform:translateX(6px);border-color:rgba(217,70,239,.35)}
.rc-card input:checked + .rc-in{border-color:transparent;background:linear-gradient(var(--panel),var(--panel)) padding-box,linear-gradient(135deg,#22d3ee,#d946ef) border-box;
  box-shadow:0 10px 30px rgba(217,70,239,.18)}
.rc-card input:checked + .rc-in .tick{background:linear-gradient(135deg,#22d3ee,#d946ef);border-color:transparent;color:#06121a}
.rc-card.hot::before{content:'POPULAR';position:absolute;margin:-10px 0 0 14px;font-size:9px;font-weight:800;letter-spacing:.15em;
  background:linear-gradient(90deg,#22d3ee,#d946ef);color:#06121a;padding:3px 8px;border-radius:6px;z-index:2}`,
});

/* 4 — TAG CHIPS WITH REMOVE */
const chips = doc({
  body: `
<div class="chips" id="chips"></div>
<div class="ch-add"><input id="chipIn" placeholder="Add a tag + Enter" /><span>press Enter</span></div>`,
  css: `
.chips{display:flex;flex-wrap:wrap;gap:9px;width:min(420px,100%);min-height:44px;margin-bottom:14px}
.chip2{display:inline-flex;align-items:center;gap:7px;padding:7px 9px 7px 13px;border-radius:999px;font-size:13px;font-weight:600;
  background:rgba(124,58,237,.16);border:1px solid rgba(124,58,237,.4);color:#d8b4fe;
  animation:chin .3s cubic-bezier(.34,1.56,.64,1) both}
.chip2 button{width:18px;height:18px;border-radius:50%;border:0;display:grid;place-items:center;background:rgba(255,255,255,.12);
  color:#d8b4fe;cursor:pointer;font-size:11px;line-height:1;transition:background .2s,transform .2s}
.chip2 button:hover{background:#f43f5e;color:#fff;transform:scale(1.15)}
.chip2.out{animation:chout .25s ease forwards}
@keyframes chin{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes chout{to{transform:scale(.5);opacity:0}}
.ch-add{width:min(420px,100%);position:relative}
.ch-add input{width:100%;padding:13px 16px;border-radius:12px;border:1px dashed var(--line);background:transparent;color:#fff;outline:none;font-size:14px;transition:border-color .3s}
.ch-add input:focus{border-style:solid;border-color:rgba(34,211,238,.5)}
.ch-add span{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--dim)}`,
  js: `
const box=document.getElementById('chips'),inp=document.getElementById('chipIn');
let tags=['particles','marquee','hero','neon'];
function render(){
  box.innerHTML='';
  tags.forEach((t,i)=>{
    const el=document.createElement('span');el.className='chip2';
    el.textContent='# '+t;
    const x=document.createElement('button');x.textContent='✕';
    x.onclick=()=>{el.classList.add('out');setTimeout(()=>{tags.splice(i,1);render();},220);};
    el.appendChild(x);box.appendChild(el);
  });
}
inp.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&inp.value.trim()){tags.push(inp.value.trim().toLowerCase().replace(/\\s+/g,'-'));inp.value='';render();}
});
render();`,
});

/* 5 — STATS WIDGET GLOW */
const stats = doc({
  body: `
<div class="st-grid">
  <div class="st c1"><b data-n="140">0</b><span>Assets</span></div>
  <div class="st c2"><b data-n="1280000">0</b><span>Prompts copied</span></div>
  <div class="st c3"><b data-n="98">0</b><span>5-star ratings %</span></div>
  <div class="st c4"><b data-n="42">0</b><span>Effects in the FX lab</span></div>
</div>`,
  css: `
.st-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;width:min(460px,100%)}
.st{border-radius:18px;padding:24px 20px;border:1px solid var(--line);background:var(--panel);position:relative;overflow:hidden}
.st::before{content:'';position:absolute;inset:0;opacity:.5;pointer-events:none}
.c1::before{background:radial-gradient(120px 80px at 80% 0,rgba(124,58,237,.4),transparent)}
.c2::before{background:radial-gradient(120px 80px at 80% 0,rgba(217,70,239,.4),transparent)}
.c3::before{background:radial-gradient(120px 80px at 80% 0,rgba(34,211,238,.4),transparent)}
.c4::before{background:radial-gradient(120px 80px at 80% 0,rgba(16,185,129,.4),transparent)}
.st b{display:block;font-size:34px;font-weight:900;position:relative;
  background:linear-gradient(180deg,#fff,rgba(255,255,255,.55));-webkit-background-clip:text;background-clip:text;color:transparent}
.st span{font-size:11.5px;color:var(--dim);text-transform:uppercase;letter-spacing:.12em;position:relative}`,
  js: `
document.querySelectorAll('.st b').forEach(el=>{
  const target=+el.dataset.n,start=performance.now(),dur=1400;
  function frame(t){const p=Math.min(1,(t-start)/dur),e=1-Math.pow(1-p,3);
    el.textContent=Math.round(target*e).toLocaleString();
    if(p<1)requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
});`,
});

/* 6 — TOAST NOTIFICATION STACK */
const toast = doc({
  body: `
<button id="tbtn" class="tbtn">Trigger toast</button>
<div class="tstack" id="stack"></div>`,
  css: `
.tbtn{background:linear-gradient(90deg,var(--v1),var(--v2));color:#fff;border:0;font-weight:800;border-radius:12px;padding:14px 28px;font-size:14px;
  box-shadow:0 10px 30px rgba(217,70,239,.35);cursor:pointer;transition:transform .15s}
.tbtn:active{transform:scale(.96)}
.tstack{position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:10px;z-index:99}
.toast{display:flex;align-items:center;gap:12px;min-width:260px;padding:14px 16px;border-radius:14px;
  background:rgba(15,15,32,.92);border:1px solid var(--line);backdrop-filter:blur(12px);
  box-shadow:0 16px 40px rgba(0,0,0,.5);animation:tin .4s cubic-bezier(.34,1.56,.64,1) both;font-size:13.5px}
.toast.out{animation:tout .3s ease forwards}
@keyframes tin{from{transform:translateX(120%);opacity:0}to{transform:none;opacity:1}}
@keyframes tout{to{transform:translateX(120%);opacity:0}}
.toast .ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-size:15px;flex:none}
.toast.ok .ic{background:rgba(16,185,129,.2);color:#34d399}
.toast.info .ic{background:rgba(34,211,238,.2);color:#22d3ee}
.toast.warn .ic{background:rgba(245,158,11,.2);color:#fbbf24}
.toast b{display:block;font-size:13.5px}.toast small{color:var(--dim);font-size:11.5px}
.toast .x{margin-left:auto;background:none;border:0;color:var(--dim);cursor:pointer;font-size:14px}`,
  js: `
const stack=document.getElementById('stack');
const kinds=[['ok','✓','Copied to clipboard','Prompt is ready to paste'],
  ['info','ⓘ','New asset added','Synthwave grid floor is live'],
  ['warn','!','Heads up','Rate limit reached — slow down']];
let k=0;
function fire(){
  const [type,ic,title,sub]=kinds[k++%kinds.length];
  const t=document.createElement('div');t.className='toast '+type;
  t.innerHTML='<span class="ic">'+ic+'</span><div><b>'+title+'</b><small>'+sub+'</small></div><button class="x">✕</button>';
  stack.appendChild(t);
  const close=()=>{t.classList.add('out');setTimeout(()=>t.remove(),280);};
  t.querySelector('.x').onclick=close;
  setTimeout(close,3600);
}
document.getElementById('tbtn').onclick=fire;
fire();`,
});

export const WAVE18_ITEMS: Item[] = [
  {
    id: "w18-flow",
    slug: "flowing-gradient-border-button",
    category: "elements",
    title: "Flowing gradient border buttons",
    summary: "Animated gradient border that streams around the label; inner chip clears to reveal the full flow on hover.",
    author: "MotionVault",
    tags: ["button", "gradient", "border", "flow", "cta", "animated"],
    tech: ["html", "css"],
    stars: 398, views: 0, copies: 0, featured: true, published: true,
    html: flowButton,
    prompt:
      "Build flowing gradient buttons: a button with 3px padding and a large (300% width) linear-gradient background (violet→fuchsia→cyan, looped) animated with background-position keyframes so the border color streams; an inner span carries a solid dark chip background that becomes transparent on hover to reveal the flowing gradient. Provide variants: default violet flow, warm sunset flow, and a static glass ghost. Rounded 14px, soft colored shadows, press scale. Pure CSS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w18-dots",
    slug: "bouncing-dots-loader",
    category: "animations",
    title: "Bouncing dots loader",
    summary: "Three gradient dots bounce and squash with a ripple delay, above a blinking 'loading…' label.",
    author: "MotionVault",
    tags: ["loading", "dots", "bounce", "spinner", "loader"],
    tech: ["html", "css", "javascript"],
    stars: 287, views: 0, copies: 0, featured: false, published: true,
    html: dotsLoader,
    prompt:
      "Create a bouncing-dots loader: three 18px gradient (cyan→fuchsia) circles with glow shadows, each running the same cubic-bezier bounce keyframe (scale down/semi-transparent at rest, scale up and lift at peak) with 0s/.15s/.3s delays. Below, an uppercase letter-spaced 'loading…' label whose ellipsis blinks in steps. Dark background, centered. Pure CSS animation; dots can be injected by a small JS snippet or written directly in HTML.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w18-radio",
    slug: "selectable-pricing-radio-cards",
    category: "components",
    title: "Selectable pricing radio cards",
    summary: "Plan picker where whole cards are radio targets — checked card gets a gradient border, filled tick and glow.",
    author: "MotionVault",
    tags: ["radio", "cards", "pricing", "form", "select", "ui-kit"],
    tech: ["html", "css"],
    stars: 356, views: 0, copies: 0, featured: false, published: true,
    html: radioCards,
    prompt:
      "Build a selectable plan picker: three label-wrapped radio inputs (visually hidden) each controlling a glass pricing card (title, description, big price at right, circular tick bottom-right). Hover slides the card right 6px; the checked card shows a gradient border via the padding-box/border-box trick, a soft fuchsia shadow, and its tick fills with the gradient and turns dark. The recommended card carries a 'POPULAR' gradient tag at its top edge. Pure CSS using :checked + selectors.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w18-chips",
    slug: "add-remove-tag-chips",
    category: "components",
    title: "Add/remove tag chips input",
    summary: "Tag field: chips pop in with a spring, ✕ removes with a scale-out; type and Enter to add new slug-style tags.",
    author: "MotionVault",
    tags: ["chips", "tags", "input", "form", "multi-select", "ui-kit"],
    tech: ["html", "css", "javascript"],
    stars: 324, views: 0, copies: 0, featured: false, published: true,
    html: chips,
    prompt:
      "Build a tag-chip input: chips render as violet pills with a # prefix and a small ✕ button; adding a chip springs it in (scale .5→1 overshoot), removing plays a scale-out then re-renders the array. Below, a dashed input with an 'Enter' hint: pressing Enter appends the lowercased, space-to-dash value and clears the field. Starts with four seed tags. Vanilla JS re-rendering from a tags array.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w18-stats",
    slug: "count-up-stats-widgets",
    category: "animations",
    title: "Count-up stats widgets",
    summary: "Four glass stat cards whose numbers ease-out count from zero to target with per-card corner glows.",
    author: "MotionVault",
    tags: ["stats", "count-up", "numbers", "dashboard", "scroll", "data"],
    tech: ["html", "css", "javascript"],
    stars: 341, views: 0, copies: 0, featured: false, published: true,
    html: stats,
    prompt:
      "Create a 2x2 stats widget grid: four glass cards, each with a large gradient-clipped number (data-n target) and an uppercase label, plus a colored radial glow spilling from the top corner (violet, fuchsia, cyan, emerald). Numbers animate counting from 0 to the target over 1.4s with an ease-out cubic curve via requestAnimationFrame, formatted with toLocaleString commas. Vanilla JS, starts on load.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w18-toast",
    slug: "toast-notification-stack",
    category: "components",
    title: "Toast notification stack",
    summary: "Spring-in glass toasts (success/info/warn) slide in from the bottom-right, auto-dismiss with slide-out, closable.",
    author: "MotionVault",
    tags: ["toast", "notification", "feedback", "stack", "ui-kit", "popup"],
    tech: ["html", "css", "javascript"],
    stars: 409, views:0, copies:0, featured: true, published: true,
    html: toast,
    prompt:
      "Build a toast notification system: a fixed bottom-right stack; a trigger button fires toasts cycling through success (green check), info (cyan i), and warning (amber !) kinds. Each toast is a frosted glass row with a colored icon tile, bold title, dim subtitle and an ✕ close; it springs in from the right (translateX overshoot) and auto-dismisses after 3.6s by sliding back out then removing from DOM. Vanilla JS builds elements from a kind config array.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

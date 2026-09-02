// Generated wave — COMPONENTS: 12 families × 8 palette variants = 96 items.

import { docP, Fam, materialize } from "./kit";

const RS = [18, 24, 14, 28, 18, 22, 16, 26];
const r = (vi: number) => `${RS[vi]}px`;

/* 1 — glass pricing card */
const pricingCard: Fam = {
  id: "gc-pricing-card", slugBase: "glass-pricing-card", title: "Glass Pricing Card",
  category: "components",
  summary: "A frosted-glass pricing card with a popular ribbon, feature checklist and gradient CTA.",
  tags: ["pricing", "card", "glassmorphism", "saas"],
  tech: ["html", "css"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="pc">
<span class="rb">Most popular</span>
<h3>Pro</h3>
<div class="pr">$29<small>/mo</small></div>
<ul><li>Unlimited projects</li><li>Advanced analytics</li><li>Priority support</li><li>Custom domains</li></ul>
<button>Start free trial</button>
</div>`,
      css: `
.pc{position:relative;width:300px;padding:34px 30px;border-radius:${r(1)};overflow:hidden;
 background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));
 border:1px solid color-mix(in srgb,var(--v1) 35%,transparent);backdrop-filter:blur(14px);
 box-shadow:0 24px 60px rgba(0,0,0,.45)}
.pc::before{content:'';position:absolute;top:-60px;right:-60px;width:180px;height:180px;border-radius:50%;
 background:radial-gradient(circle,color-mix(in srgb,var(--v1) 35%,transparent),transparent 70%)}
.rb{position:absolute;top:18px;right:-34px;transform:rotate(45deg);padding:5px 40px;font-size:10.5px;font-weight:800;
 letter-spacing:.14em;text-transform:uppercase;color:#0a0a18;background:linear-gradient(90deg,var(--c1),var(--v2))}
.pc h3{font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);margin-bottom:14px}
.pr{font-size:52px;font-weight:900;letter-spacing:-.03em;margin-bottom:20px}
.pr small{font-size:15px;color:var(--dim);font-weight:600}
.pc ul{list-style:none;margin-bottom:26px;display:grid;gap:11px}
.pc li{font-size:14px;color:var(--txt);padding-left:26px;position:relative}
.pc li::before{content:'✓';position:absolute;left:0;color:var(--c1);font-weight:800}
.pc button{width:100%;padding:15px;border-radius:12px;font-size:15px;font-weight:800;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));transition:transform .22s,box-shadow .22s}
.pc button:hover{transform:translateY(-2px);box-shadow:0 12px 30px color-mix(in srgb,var(--v1) 50%,transparent)}`,
    }),
    prompt: `Build a glass pricing card (300px, frosted backdrop-blur, 1px border tinted ${p.v1}): a diagonal "Most popular" ribbon in the top-right corner (gradient ${p.c1}→${p.v2}, rotated 45deg), plan label "PRO", big $29/mo price, four checklist items with ${p.c1} ✓ markers, and a full-width gradient CTA button (${p.v1}→${p.v2}) that lifts with a colored shadow on hover. Add a soft radial ${p.v1} glow bleeding from the top-right corner behind the content.`,
  }),
};

/* 2 — profile card */
const profileCard: Fam = {
  id: "gc-profile-card", slugBase: "gradient-profile-card", title: "Gradient Profile Card",
  category: "components",
  summary: "A creator profile card: gradient avatar ring, stats row and a follow button that toggles.",
  tags: ["profile", "card", "social", "user"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="pf">
<div class="av"><span>AK</span></div>
<h3>Aria Kim</h3><p class="ro">Motion designer</p>
<div class="st"><div><b>128</b><span>Shots</span></div><div><b>12k</b><span>Followers</span></div><div><b>302</b><span>Likes</span></div></div>
<button id="fw">Follow</button>
</div>`,
      css: `
.pf{width:290px;padding:32px 28px;text-align:center;border-radius:${r(vi)};
 background:linear-gradient(165deg,color-mix(in srgb,var(--v1) 16%,transparent),rgba(255,255,255,.03) 55%);
 border:1px solid var(--line)}
.av{width:92px;height:92px;margin:0 auto 18px;border-radius:50%;padding:3px;
 background:conic-gradient(var(--v1),var(--v2),var(--c1),var(--v1));animation:avs 6s linear infinite}
.av span{display:grid;place-items:center;width:100%;height:100%;border-radius:50%;font-size:30px;font-weight:900;color:#fff;
 background:radial-gradient(circle at 30% 25%,color-mix(in srgb,var(--v1) 65%,#111127),#101024)}
@keyframes avs{to{filter:hue-rotate(20deg)}}
.pf h3{font-size:21px;font-weight:800}
.ro{color:var(--dim);font-size:13.5px;margin:5px 0 20px}
.st{display:flex;justify-content:center;gap:26px;margin-bottom:22px}
.st div{display:grid}
.st b{font-size:18px;font-weight:800}
.st span{font-size:11px;color:var(--dim);letter-spacing:.12em;text-transform:uppercase}
#fw{width:100%;padding:13px;border-radius:12px;font-weight:800;font-size:14.5px;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));transition:all .25s}
#fw.on{background:rgba(255,255,255,.07);color:var(--txt);border:1px solid var(--line)}`,
      js: `var b=document.getElementById('fw');b.addEventListener('click',function(){var on=b.classList.toggle('on');b.textContent=on?'Following ✓':'Follow'})`,
    }),
    prompt: `Build a creator profile card: conic-gradient avatar ring (${p.v1}→${p.v2}→${p.c1}) around a round initials avatar "AK", name "Aria Kim" + role "Motion designer", a three-column stats row (Shots/Followers/Likes) and a full-width Follow button. Clicking the button (vanilla JS) toggles to a ghost "Following ✓" state. Card uses a subtle ${p.v1}-tinted gradient border area and ${r(vi)} radius.`,
  }),
};

/* 3 — 3D tilt glare card */
const tiltCard: Fam = {
  id: "gc-tilt-card", slugBase: "tilt-glare-card", title: "3D Tilt Glare Card",
  category: "components",
  summary: "A pointer-tracked 3D card: it tilts toward the cursor while a glossy glare sweeps across.",
  tags: ["card", "3d", "tilt", "parallax", "glare"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="tc" id="tc"><div class="tc-in">
<span class="em">◆</span><h3>Prism Pass</h3><p>Move your cursor across the card</p>
</div></div>`,
      css: `
.tc{width:300px;height:200px;perspective:900px}
.tc-in{position:relative;width:100%;height:100%;border-radius:22px;overflow:hidden;display:grid;place-content:center;gap:10px;text-align:center;
 background:linear-gradient(140deg,color-mix(in srgb,var(--v1) 30%,#0d0d20),color-mix(in srgb,var(--v2) 22%,#0a0a1c));
 border:1px solid rgba(255,255,255,.14);transform-style:preserve-3d;transition:transform .15s ease-out;will-change:transform}
.tc-in::after{content:'';position:absolute;inset:0;pointer-events:none;
 background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.16),transparent 45%)}
.em{font-size:34px;color:var(--c1);transform:translateZ(40px)}
.tc-in h3{font-size:22px;font-weight:800;transform:translateZ(30px)}
.tc-in p{color:var(--dim);font-size:13px;transform:translateZ(20px)}`,
      js: `var c=document.getElementById('tc'),inEl=c.firstElementChild;
c.addEventListener('mousemove',function(e){var b=c.getBoundingClientRect();
var x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;
inEl.style.transform='rotateY('+(x*16)+'deg) rotateX('+(-y*16)+'deg)';
inEl.style.setProperty('--mx',((x+.5)*100)+'%');inEl.style.setProperty('--my',((y+.5)*100)+'%')});
c.addEventListener('mouseleave',function(){inEl.style.transform='rotateY(0) rotateX(0)'})`,
    }),
    prompt: `Build a pointer-tracked 3D tilt card (300×200, perspective 900px): on mousemove compute cursor offsets and rotateY up to ±16deg / rotateX ∓16deg with transform-style preserve-3d; the icon (◆), title and caption float at translateZ 40/30/20px for real depth. A radial-gradient glare follows the cursor via --mx/--my custom properties. Reset smoothly on mouseleave. Card background is a diagonal blend of ${p.v1} and ${p.v2} over near-black. Vanilla JS.`,
  }),
};

/* 4 — marquee logo strip */
const marquee: Fam = {
  id: "gc-marquee", slugBase: "infinite-marquee-strip", title: "Infinite Marquee Strip",
  category: "components",
  summary: "A seamless infinite marquee of brand chips that slows on hover — duplicated for the loop.",
  tags: ["marquee", "logos", "infinite", "scroll"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const items = ["◆ Acme", "● Globex", "▲ Initech", "★ Hooli", "✦ Stark", "⬢ Wayne", "◈ Umbrella", "✚ Cyberdyne"];
    const chip = (t: string) => `<span class="mq-i">${t}</span>`;
    const row = items.map(chip).join("");
    return {
      html: docP(p, {
        body: `<div class="mq"><div class="mq-tr">${row}${row}</div></div><p class="cap">Trusted by teams at</p>`,
        css: `
.cap{order:-1;color:var(--dim);font-size:12px;letter-spacing:.28em;text-transform:uppercase}
.mq{width:min(560px,90vw);overflow:hidden;position:relative;
 -webkit-mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
 mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.mq-tr{display:flex;gap:14px;width:max-content;animation:mq ${18 + (vi % 4) * 4}s linear infinite}
.mq:hover .mq-tr{animation-play-state:paused}
.mq-i{padding:12px 22px;border-radius:12px;white-space:nowrap;font-weight:700;font-size:14.5px;color:var(--txt);
 background:rgba(255,255,255,.05);border:1px solid var(--line);transition:all .25s}
.mq-i:hover{border-color:var(--v1);color:var(--c1);transform:translateY(-2px)}
@keyframes mq{to{transform:translateX(-50%)}}`,
      }),
      prompt: `Build an infinite logo marquee: eight brand chips (Acme, Globex, Initech, Hooli, Stark, Wayne, Umbrella, Cyberdyne) in a flex track duplicated once for a seamless -50% translateX loop over ${18 + (vi % 4) * 4}s. The strip is edge-faded with a horizontal mask gradient; animation pauses on hover. Chips are glassy with subtle borders and lift + tint ${p.c1} on hover. Pure CSS.`,
    };
  },
};

/* 5 — accordion FAQ */
const accordion: Fam = {
  id: "gc-accordion", slugBase: "smooth-faq-accordion", title: "Smooth FAQ Accordion",
  category: "components",
  summary: "A FAQ accordion with buttery height animation using the grid-rows trick and rotated chevrons.",
  tags: ["accordion", "faq", "collapse", "menu"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const qa = [
      ["How long does setup take?", "About four minutes. Connect your repo and the first preview deploys automatically."],
      ["Can I cancel anytime?", "Yes — plans are month-to-month and you keep exports forever."],
      ["Do you offer team seats?", "Every plan includes unlimited viewers; editors are billed per seat."],
    ];
    const item = (q: string, a: string, open: boolean) =>
      `<div class="ac${open ? " open" : ""}"><input type="checkbox" id="a${vi}${q.length}" ${open ? "checked" : ""}><label for="a${vi}${q.length}">${q}<i>⌄</i></label><div class="bd"><p>${a}</p></div></div>`;
    return {
      html: docP(p, {
        body: `<div class="accs">${qa.map((x, i) => item(x[0], x[1], i === 0)).join("")}</div>`,
        css: `
.accs{width:min(480px,90vw);display:grid;gap:12px}
.ac{border-radius:${r(vi)};background:rgba(255,255,255,.04);border:1px solid var(--line);overflow:hidden;transition:border-color .3s}
.ac.open{border-color:color-mix(in srgb,var(--v1) 55%,transparent)}
.ac input{display:none}
.ac label{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:18px 22px;cursor:pointer;font-weight:700;font-size:15px}
.ac label i{font-style:normal;color:var(--c1);transition:transform .35s cubic-bezier(.34,1.56,.64,1);font-size:18px}
.ac .bd{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s cubic-bezier(.22,1,.36,1)}
.ac .bd p{overflow:hidden;padding:0 22px;color:var(--dim);font-size:14px;line-height:1.65}
.ac input:checked ~ label i{transform:rotate(180deg)}
.ac input:checked ~ .bd{grid-template-rows:1fr}
.ac input:checked ~ .bd p{padding-bottom:20px}`,
      }),
      prompt: `Build a FAQ accordion with three items (first open): clicking a row expands its answer with the grid-template-rows 0fr→1fr trick (no fixed heights), .4s cubic-bezier(.22,1,.36,1). The ${p.c1} chevron rotates 180deg with a spring curve. Open rows get a border tinted ${p.v1}. Hidden checkboxes drive the state — pure CSS, no JS. Questions: setup time, cancel anytime, team seats.`,
    };
  },
};

/* 6 — sliding indicator tabs */
const slideTabs: Fam = {
  id: "gc-tabs", slugBase: "sliding-indicator-tabs-pro", title: "Sliding Indicator Tabs",
  category: "components",
  summary: "Tabs with a gradient pill indicator that slides and resizes to the active tab, content cross-fading.",
  tags: ["tabs", "navigation", "indicator", "ui-kit"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="tb">
<div class="tb-nav" id="nav"><span class="ind" id="ind"></span>
<button class="on">Overview</button><button>Specs</button><button>Reviews</button></div>
<div class="tb-bd" id="bd"><p class="on">The overview panel: key metrics, recent activity and quick actions in one glance.</p>
<p>Full technical specifications, dimensions and compatibility notes live here.</p>
<p>Verified reviews from teams who shipped with it — the good and the great.</p></div>
</div>`,
      css: `
.tb{width:min(460px,92vw)}
.tb-nav{position:relative;display:inline-flex;gap:4px;padding:5px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid var(--line)}
.tb-nav button{position:relative;z-index:1;padding:10px 20px;border-radius:10px;font-weight:700;font-size:14px;color:var(--dim);transition:color .25s}
.tb-nav button.on{color:#fff}
.ind{position:absolute;top:5px;bottom:5px;border-radius:10px;background:linear-gradient(135deg,var(--v1),var(--v2));
 box-shadow:0 6px 18px color-mix(in srgb,var(--v1) 40%,transparent);transition:left .35s cubic-bezier(.22,1,.36,1),width .35s cubic-bezier(.22,1,.36,1)}
.tb-bd{position:relative;padding:24px 6px 0}
.tb-bd p{display:none;color:var(--dim);font-size:14.5px;line-height:1.7}
.tb-bd p.on{display:block;animation:tbf .35s cubic-bezier(.22,1,.36,1)}
@keyframes tbf{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`,
      js: `var nav=document.getElementById('nav'),ind=document.getElementById('ind'),btns=nav.querySelectorAll('button'),ps=document.querySelectorAll('#bd p');
function place(b){ind.style.left=b.offsetLeft+'px';ind.style.width=b.offsetWidth+'px'}
btns.forEach(function(b,i){b.addEventListener('click',function(){
btns.forEach(function(x){x.classList.remove('on')});b.classList.add('on');place(b);
ps.forEach(function(x,j){x.classList.toggle('on',j===i)})})});
place(btns[0]);`,
    }),
    prompt: `Build tabs (Overview / Specs / Reviews) inside a glass pill nav: a gradient indicator pill (${p.v1}→${p.v2}, glow shadow) sits under the labels and slides + resizes to the clicked tab by reading offsetLeft/offsetWidth in JS, animated .35s cubic-bezier(.22,1,.36,1). Active label turns white. The panel content cross-fades with a small translateY rise. Initialize the indicator on the first tab. Vanilla JS.`,
  }),
};

/* 7 — spring modal */
const modal: Fam = {
  id: "gc-modal", slugBase: "spring-modal-dialog", title: "Spring Modal Dialog",
  category: "components",
  summary: "A confirmation modal that springs in over a blurred overlay and closes on backdrop or Esc.",
  tags: ["modal", "dialog", "overlay", "confirm"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<button class="op" id="op">Delete project…</button>
<div class="ov" id="ov"><div class="md">
<span class="mi">⚠</span><h3>Delete "Aurora UI"?</h3>
<p>This removes all 24 screens and 3 prototypes. This action can't be undone.</p>
<div class="btns"><button class="cn" id="cn">Cancel</button><button class="dl" id="ok">Delete</button></div>
</div></div>`,
      css: `
.op{padding:14px 30px;border-radius:12px;font-weight:700;font-size:15px;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));box-shadow:0 10px 30px color-mix(in srgb,var(--v1) 40%,transparent);transition:transform .2s}
.op:hover{transform:translateY(-2px)}
.ov{position:fixed;inset:0;display:grid;place-items:center;padding:24px;visibility:hidden;opacity:0;
 background:rgba(6,6,18,.62);backdrop-filter:blur(6px);transition:opacity .3s,visibility .3s;z-index:50}
.ov.on{visibility:visible;opacity:1}
.md{width:min(380px,92vw);padding:32px 30px;border-radius:22px;text-align:center;
 background:#12122a;border:1px solid color-mix(in srgb,var(--v1) 35%,transparent);
 transform:scale(.7) translateY(26px);transition:transform .38s cubic-bezier(.34,1.56,.64,1)}
.ov.on .md{transform:scale(1) translateY(0)}
.mi{display:grid;place-items:center;width:56px;height:56px;margin:0 auto 16px;border-radius:18px;font-size:24px;
 background:color-mix(in srgb,var(--v1) 15%,transparent);border:1px solid color-mix(in srgb,var(--v1) 40%,transparent)}
.md h3{font-size:19px;font-weight:800;margin-bottom:10px}
.md p{color:var(--dim);font-size:14px;line-height:1.6;margin-bottom:24px}
.btns{display:flex;gap:12px;justify-content:center}
.btns button{padding:12px 26px;border-radius:11px;font-weight:700;font-size:14px}
.cn{background:rgba(255,255,255,.07);color:var(--txt);border:1px solid var(--line)}
.dl{color:#fff;background:linear-gradient(135deg,var(--v1),var(--v2))}`,
      js: `var ov=document.getElementById('ov');
document.getElementById('op').addEventListener('click',function(){ov.classList.add('on')});
function close(){ov.classList.remove('on')}
document.getElementById('cn').addEventListener('click',close);
document.getElementById('ok').addEventListener('click',close);
ov.addEventListener('click',function(e){if(e.target===ov)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});`,
    }),
    prompt: `Build a modal flow: a gradient open button (${p.v1}→${p.v2}) reveals a fixed overlay (62% dark + 6px backdrop blur, fades in) containing a confirm dialog that springs from scale .7 + translateY 26px to rest with cubic-bezier(.34,1.56,.64,1). Content: warning icon chip tinted ${p.v1}, title "Delete 'Aurora UI'?", body copy, and Cancel (ghost) + Delete (gradient) buttons. Close on either button, backdrop click or Escape. Vanilla JS + CSS transitions.`,
  }),
};

/* 8 — toast stack */
const toasts: Fam = {
  id: "gc-toasts", slugBase: "toast-notification-lab", title: "Toast Notification Lab",
  category: "components",
  summary: "Fire success, info and warning toasts that slide in, stack up and auto-dismiss with a timer bar.",
  tags: ["toast", "notification", "alert", "stack"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="row"><button data-k="ok">Success</button><button data-k="info">Info</button><button data-k="warn">Warning</button></div>
<div class="ts" id="ts"></div>`,
      css: `
.row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.row button{padding:12px 22px;border-radius:11px;font-weight:700;font-size:14px;color:var(--txt);
 background:rgba(255,255,255,.07);border:1px solid var(--line);transition:all .2s}
.row button:hover{border-color:var(--v1);color:var(--c1);transform:translateY(-2px)}
.ts{position:fixed;right:18px;bottom:18px;display:grid;gap:10px;z-index:60}
.tn{display:flex;align-items:center;gap:12px;min-width:270px;padding:14px 18px;border-radius:14px;overflow:hidden;position:relative;
 background:#14142c;border:1px solid var(--line);box-shadow:0 18px 40px rgba(0,0,0,.5);
 animation:tin .4s cubic-bezier(.34,1.56,.64,1)}
.tn.out{animation:tout .3s ease forwards}
.tn b{font-size:13.5px}
.tn span{font-size:20px}
.tn::after{content:'';position:absolute;left:0;bottom:0;height:3px;width:100%;transform-origin:left;animation:tbar 3s linear forwards}
.tn.ok{border-color:color-mix(in srgb,var(--v1) 55%,transparent)}.tn.ok::after{background:var(--v1)}
.tn.info{border-color:color-mix(in srgb,var(--c1) 55%,transparent)}.tn.info::after{background:var(--c1)}
.tn.warn{border-color:color-mix(in srgb,var(--v2) 55%,transparent)}.tn.warn::after{background:var(--v2)}
@keyframes tin{from{opacity:0;transform:translateX(60px) scale(.9)}to{opacity:1;transform:none}}
@keyframes tout{to{opacity:0;transform:translateX(60px) scale(.92)}}
@keyframes tbar{from{transform:scaleX(1)}to{transform:scaleX(0)}}`,
      js: `var wrap=document.getElementById('ts');
var M={ok:['✅','Deployed to production'],info:['ℹ️','New comment on your shot'],warn:['⚠️','Build took longer than usual']};
document.querySelectorAll('.row button').forEach(function(b){b.addEventListener('click',function(){
var m=M[b.dataset.k];var t=document.createElement('div');t.className='tn '+b.dataset.k;
t.innerHTML='<span>'+m[0]+'</span><b>'+m[1]+'</b>';wrap.appendChild(t);
setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove()},320)},3000)})});`,
    }),
    prompt: `Build a toast lab: three trigger buttons (Success / Info / Warning) spawn toasts in a bottom-right fixed stack. Each toast slides in from the right with a spring overshoot, shows an emoji + message, color-coded border by kind (${p.v1} ok / ${p.c1} info / ${p.v2} warn), and a 3s timer bar draining along its bottom edge via scaleX animation — after which it slides out and is removed from the DOM. Vanilla JS.`,
  }),
};

/* 9 — glass navbar */
const navbar: Fam = {
  id: "gc-navbar", slugBase: "glass-navbar-pill", title: "Glass Navbar Pill",
  category: "components",
  summary: "A floating glass navigation pill with a hover indicator that glides between links.",
  tags: ["navbar", "navigation", "glassmorphism", "header"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<nav class="nv" id="nv"><span class="gl" id="gl"></span>
<a class="lg">✦</a><a class="on">Home</a><a>Work</a><a>Studio</a><a>Contact</a>
<button>Hire us</button></nav>`,
      css: `
.nv{position:relative;display:flex;align-items:center;gap:4px;padding:8px;border-radius:999px;
 background:rgba(255,255,255,.05);border:1px solid var(--line);backdrop-filter:blur(16px);
 box-shadow:0 18px 50px rgba(0,0,0,.4)}
.nv a{position:relative;z-index:1;padding:10px 18px;border-radius:999px;font-size:14px;font-weight:600;color:var(--dim);cursor:pointer;transition:color .25s}
.nv a.lg{color:var(--c1);font-size:17px}
.nv a.on{color:var(--txt)}
.nv a:hover{color:var(--txt)}
.gl{position:absolute;top:8px;bottom:8px;border-radius:999px;opacity:0;
 background:color-mix(in srgb,var(--v1) 22%,transparent);border:1px solid color-mix(in srgb,var(--v1) 40%,transparent);
 transition:left .3s cubic-bezier(.22,1,.36,1),width .3s cubic-bezier(.22,1,.36,1),opacity .2s}
.nv button{margin-left:8px;padding:10px 22px;border-radius:999px;font-weight:800;font-size:13.5px;color:#0a0a18;
 background:linear-gradient(135deg,var(--c1),var(--v2));transition:transform .2s}
.nv button:hover{transform:scale(1.05)}`,
      js: `var nv=document.getElementById('nv'),gl=document.getElementById('gl'),links=nv.querySelectorAll('a:not(.lg)');
function move(el){gl.style.left=el.offsetLeft+'px';gl.style.width=el.offsetWidth+'px';gl.style.opacity=1}
links.forEach(function(a){a.addEventListener('mouseenter',function(){move(a)});
a.addEventListener('click',function(e){e.preventDefault();links.forEach(function(x){x.classList.remove('on')});a.classList.add('on')})});
nv.addEventListener('mouseleave',function(){gl.style.opacity=0});`,
    }),
    prompt: `Build a floating glass navbar pill: blurred translucent background, rounded-full, containing a ✦ logo, four links and a contrasting gradient "Hire us" button (${p.c1}→${p.v2}, dark text). On link hover a soft pill indicator (${p.v1} at 22% + border) glides to cover the link by animating left/width from offsetLeft measurements; it fades out when the pointer leaves the nav. Clicking sets the active link bright. Vanilla JS, backdrop-filter for glass.`,
  }),
};

/* 10 — snap carousel */
const carousel: Fam = {
  id: "gc-carousel", slugBase: "snap-card-carousel", title: "Snap Card Carousel",
  category: "components",
  summary: "A scroll-snap card carousel with arrow controls and live pagination dots.",
  tags: ["carousel", "slider", "scroll-snap", "cards"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const cards = ["Aurora", "Nebula", "Quasar", "Pulsar", "Zenith"].map(
      (t, i) => `<div class="cd"><span class="n">0${i + 1}</span><h3>${t}</h3><p>Case study</p></div>`
    ).join("");
    const dots = ["on", "", "", "", ""].map((c) => `<i class="${c}"></i>`).join("");
    return {
      html: docP(p, {
        body: `<div class="cs"><div class="cs-tr" id="tr">${cards}</div>
<div class="cs-ctl"><button id="pv">←</button><div class="dt" id="dt">${dots}</div><button id="nx">→</button></div></div>`,
        css: `
.cs{width:min(520px,92vw)}
.cs-tr{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 6px 16px;scrollbar-width:none}
.cs-tr::-webkit-scrollbar{display:none}
.cd{flex:0 0 220px;height:150px;scroll-snap-align:center;border-radius:${r(vi)};padding:20px;display:flex;flex-direction:column;justify-content:flex-end;gap:2px;
 background:linear-gradient(150deg,color-mix(in srgb,var(--v1) 34%,#0e0e22),color-mix(in srgb,var(--v2) 22%,#0a0a1c));
 border:1px solid var(--line);transition:transform .3s}
.cd:hover{transform:translateY(-4px)}
.cd .n{font-size:12px;color:var(--c1);font-weight:800;letter-spacing:.2em}
.cd h3{font-size:18px;font-weight:800}
.cd p{font-size:12px;color:var(--dim)}
.cs-ctl{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:6px}
.cs-ctl button{width:38px;height:38px;border-radius:50%;color:var(--txt);font-size:16px;
 background:rgba(255,255,255,.06);border:1px solid var(--line);transition:all .2s}
.cs-ctl button:hover{background:linear-gradient(135deg,var(--v1),var(--v2));border-color:transparent}
.dt{display:flex;gap:7px}
.dt i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.2);transition:all .3s}
.dt i.on{background:var(--c1);transform:scale(1.3)}`,
        js: `var tr=document.getElementById('tr'),dt=document.querySelectorAll('#dt i'),STEP=236;
document.getElementById('pv').addEventListener('click',function(){tr.scrollBy({left:-STEP,behavior:'smooth'})});
document.getElementById('nx').addEventListener('click',function(){tr.scrollBy({left:STEP,behavior:'smooth'})});
tr.addEventListener('scroll',function(){var i=Math.round(tr.scrollLeft/STEP);
dt.forEach(function(d,j){d.classList.toggle('on',j===i)})});`,
      }),
      prompt: `Build a card carousel: five gradient cards (Aurora, Nebula, Quasar, Pulsar, Zenith — numbered 01-05) in a horizontal scroll-snap-x track with hidden scrollbar, each card 220px snapping to center. Prev/next round buttons scroll by 236px smoothly; pagination dots highlight the card currently snapped (computed from scrollLeft/236). Hovering a card lifts it; buttons fill with a ${p.v1}→${p.v2} gradient on hover; active dot is ${p.c1} scaled 1.3. Vanilla JS.`,
    };
  },
};

/* 11 — stagger dropdown */
const dropdown: Fam = {
  id: "gc-dropdown", slugBase: "stagger-dropdown-menu", title: "Stagger Dropdown Menu",
  category: "components",
  summary: "An account dropdown whose items cascade in with a staggered rise, closing on outside click.",
  tags: ["dropdown", "menu", "account", "navigation"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="dd" id="dd">
<button class="dd-btn" id="btn"><span class="av">MK</span>Account<i>▾</i></button>
<div class="dd-menu" id="menu">
<a>👤 Profile</a><a>⚙️ Settings</a><a>💳 Billing</a><hr><a class="out">⎋ Sign out</a>
</div></div>`,
      css: `
.dd{position:relative}
.dd-btn{display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:${r(2)};font-size:14.5px;font-weight:700;color:var(--txt);
 background:rgba(255,255,255,.06);border:1px solid var(--line);transition:border-color .25s}
.dd-btn:hover,.dd.open .dd-btn{border-color:color-mix(in srgb,var(--v1) 55%,transparent)}
.dd-btn .av{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;font-size:10.5px;font-weight:900;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2))}
.dd-btn i{font-style:normal;color:var(--dim);transition:transform .3s}
.dd.open .dd-btn i{transform:rotate(180deg)}
.dd-menu{position:absolute;top:calc(100% + 10px);right:0;min-width:210px;padding:8px;border-radius:16px;
 background:#12122a;border:1px solid var(--line);box-shadow:0 24px 60px rgba(0,0,0,.55);
 visibility:hidden;opacity:0;transform:translateY(-8px) scale(.96);transform-origin:top right;transition:all .28s cubic-bezier(.22,1,.36,1)}
.dd.open .dd-menu{visibility:visible;opacity:1;transform:none}
.dd-menu a{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:10px;font-size:13.5px;color:var(--txt);cursor:pointer;
 opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s,background .2s}
.dd.open .dd-menu a{opacity:1;transform:none}
.dd.open .dd-menu a:nth-child(1){transition-delay:.05s}.dd.open .dd-menu a:nth-child(2){transition-delay:.1s}
.dd.open .dd-menu a:nth-child(3){transition-delay:.15s}.dd.open .dd-menu a:nth-child(5){transition-delay:.2s}
.dd-menu a:hover{background:color-mix(in srgb,var(--v1) 16%,transparent)}
.dd-menu hr{border:none;border-top:1px solid var(--line);margin:6px 10px}
.dd-menu a.out{color:var(--v2)}`,
      js: `var dd=document.getElementById('dd');
document.getElementById('btn').addEventListener('click',function(e){e.stopPropagation();dd.classList.toggle('open')});
document.addEventListener('click',function(){dd.classList.remove('open')});
document.addEventListener('keydown',function(e){if(e.key==='Escape')dd.classList.remove('open')});`,
    }),
    prompt: `Build an account dropdown: a trigger button with a gradient initials avatar (${p.v1}→${p.v2}, "MK"), the label "Account" and a chevron that flips 180deg when open. The menu (glass panel, 16px radius, right-aligned) scales/fades in from top-right; its items (Profile / Settings / Billing / hr / Sign out in ${p.v2}) cascade with 50ms-staggered rise animations. Close on outside click or Escape. Vanilla JS toggling one .open class.`,
  }),
};

/* 12 — stat counter card */
const statCard: Fam = {
  id: "gc-stat", slugBase: "stat-counter-card", title: "Stat Counter Card",
  category: "components",
  summary: "An analytics stat card whose headline number rolls up on load beside a tiny SVG sparkline.",
  tags: ["stats", "counter", "dashboard", "sparkline"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const target = [48210, 12_540, 98_200, 7_926, 31_480, 56_012, 23_750, 88_340][vi];
    const label = ["Monthly visitors", "Active installs", "Prompts copied", "New signups", "API calls", "Deploys shipped", "Stars earned", "Assets served"][vi];
    return {
      html: docP(p, {
        body: `<div class="sc">
<div class="sc-top"><span>${label}</span><b class="up">▲ ${8 + vi}%</b></div>
<div class="sc-num" id="n">0</div>
<svg viewBox="0 0 200 56" class="sp"><path id="sp" fill="none" stroke-width="3" stroke-linecap="round" d="M4 44 C 30 ${40 - vi}, 44 30, 66 ${34 - vi} S 110 12, 132 ${20 - vi} S 178 8, 196 6"/></svg>
</div>`,
        css: `
.sc{width:280px;padding:26px 28px;border-radius:${r(vi)};
 background:linear-gradient(165deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid var(--line)}
.sc-top{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--dim);margin-bottom:10px}
.sc-top .up{color:var(--c1);font-weight:800}
.sc-num{font-size:46px;font-weight:900;letter-spacing:-.03em;font-variant-numeric:tabular-nums;
 background:linear-gradient(135deg,var(--txt),color-mix(in srgb,var(--v1) 70%,var(--txt)));
 -webkit-background-clip:text;background-clip:text;color:transparent}
.sp{width:100%;height:56px;margin-top:14px;stroke:var(--v1);filter:drop-shadow(0 4px 10px color-mix(in srgb,var(--v1) 45%,transparent));
 stroke-dasharray:400;stroke-dashoffset:400;animation:spd 1.6s ease forwards .3s}
@keyframes spd{to{stroke-dashoffset:0}}`,
        js: `var el=document.getElementById('n'),T=${target},D=1400,t0=performance.now();
(function tick(now){var k=Math.min(1,(now-t0)/D),e=1-Math.pow(1-k,3);
el.textContent=Math.round(T*e).toLocaleString('en-US');if(k<1)requestAnimationFrame(tick)})(t0);`,
      }),
      prompt: `Build an analytics stat card: label "${label}" with a small ▲ delta chip in ${p.c1}, a huge tabular-numeral counter that rolls from 0 to ${target.toLocaleString("en-US")} over 1.4s (requestAnimationFrame, cubic ease-out, toLocaleString formatting), and a smooth SVG sparkline below that stroke-draws itself (dasharray trick) with a ${p.v1} glow. The number uses a subtle gradient text clip. Radius ${r(vi)}.`,
    };
  },
};

export const GEN_COMPONENT_ITEMS = materialize([
  pricingCard, profileCard, tiltCard, marquee, accordion, slideTabs,
  modal, toasts, navbar, carousel, dropdown, statCard,
]);

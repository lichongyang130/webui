import { Item } from "../types";
import { doc } from "./wrap";

// C9. Sliding tabs
const slidingTabs = doc({
  body: `<h3 class="t">Sliding Indicator Tabs</h3><p class="s">The pill glides between tabs</p>
<div class="tb" id="tb"><span class="tb-glide" id="glide"></span>
 ${["Overview","Features","Pricing","FAQ"].map((l, i) => `<button class="tb-btn${i === 0 ? " on" : ""}" data-i="${i}">${l}</button>`).join("")}
</div>
<div class="tb-panel" id="panel">Overview content — the panel cross-fades on switch.</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.tb{position:relative;display:inline-flex;border:1px solid var(--line);background:rgba(255,255,255,.04);border-radius:999px;padding:5px}
.tb-glide{position:absolute;top:5px;bottom:5px;left:0;border-radius:999px;background:linear-gradient(120deg,var(--v1),var(--v2));
 transition:transform .38s cubic-bezier(.22,1,.36,1),width .38s cubic-bezier(.22,1,.36,1);z-index:0}
.tb-btn{position:relative;z-index:1;padding:9px 22px;border-radius:999px;font-size:14px;font-weight:600;color:var(--dim);transition:color .3s}
.tb-btn.on{color:#fff}
.tb-panel{margin-top:22px;width:min(420px,92vw);border:1px solid var(--line);background:var(--panel);border-radius:16px;
 padding:22px;font-size:14px;color:var(--dim);transition:opacity .3s}
.tb-panel.switching{opacity:0}`,
  js: `const tb=document.getElementById('tb'),glide=document.getElementById('glide'),panel=document.getElementById('panel');
const texts=['Overview content — the panel cross-fades on switch.','Features: springs, timelines, drag and scroll — built in.','Pricing: free for hobby, $19/mo for teams.','FAQ: yes, it works with every framework.'];
function move(btn){
 const r=btn.getBoundingClientRect(),p=tb.getBoundingClientRect();
 glide.style.width=r.width+'px';glide.style.transform='translateX('+(r.left-p.left-5)+'px)';
 panel.classList.add('switching');
 setTimeout(()=>{panel.textContent=texts[+btn.dataset.i];panel.classList.remove('switching');},180);
 tb.querySelectorAll('.tb-btn').forEach(b=>b.classList.toggle('on',b===btn));
}
tb.addEventListener('click',e=>{const b=e.target.closest('.tb-btn');if(b)move(b);});
requestAnimationFrame(()=>move(tb.querySelector('.tb-btn')));`,
});

// C10. Smooth accordion
const accordion = doc({
  body: `<h3 class="t">Smooth Grid Accordion</h3>
<div class="ac">
 ${[
   ["What is MotionVault?","A unified vault of animated templates, components, elements and motion snippets — every asset has a live preview and an AI prompt."],
   ["Do I need a framework?","No. Every preview is self-contained HTML/CSS/JS. Paste it anywhere, or hand the prompt to your AI coding tool."],
   ["Can I use it commercially?","All curated assets are free to adapt and ship in commercial projects. Attribution is appreciated, never required."],
 ].map(
   (q, i) => `<div class="ac-item${i === 0 ? " open" : ""}"><button class="ac-q">${q[0]}<i class="ac-i">+</i></button><div class="ac-a"><p>${q[1]}</p></div></div>`
 ).join("")}
</div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:14px;text-align:center}
.ac{width:min(460px,94vw);border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--panel)}
.ac-item+.ac-item{border-top:1px solid var(--line)}
.ac-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:17px 20px;
 font-size:15px;font-weight:600;text-align:left;transition:color .3s}
.ac-item.open .ac-q{color:var(--c1)}
.ac-i{font-style:normal;width:26px;height:26px;flex:none;display:grid;place-items:center;border-radius:50%;
 border:1px solid var(--line);transition:transform .4s cubic-bezier(.34,1.56,.64,1);font-size:15px}
.ac-item.open .ac-i{transform:rotate(45deg);border-color:var(--v2);color:var(--v2);background:rgba(217,70,239,.1)}
.ac-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1)}
.ac-a p{overflow:hidden;padding:0 20px;color:var(--dim);font-size:14px;line-height:1.7;transition:padding .45s}
.ac-item.open .ac-a{grid-template-rows:1fr}
.ac-item.open .ac-a p{padding:0 20px 18px}`,
  js: `document.querySelectorAll('.ac-q').forEach(q=>q.addEventListener('click',()=>{
 const item=q.parentElement;
 item.classList.toggle('open');}));`,
});

// C11. Toast stack
const toasts = doc({
  body: `<h3 class="t">Stacked Toast Notifications</h3><p class="s">Each button fires a different toast</p>
<div class="to-btns">
 <button class="to-btn" data-k="success">Success toast</button>
 <button class="to-btn" data-k="error">Error toast</button>
 <button class="to-btn" data-k="info">Info toast</button>
</div>
<div class="to-stack" id="stack"></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.to-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.to-btn{padding:11px 20px;border-radius:12px;border:1px solid var(--line);background:var(--panel);font-size:13.5px;font-weight:600;transition:all .25s}
.to-btn:hover{transform:translateY(-2px);border-color:var(--v1)}
.to-stack{position:fixed;bottom:22px;right:22px;display:flex;flex-direction:column;gap:10px;z-index:50}
.toast{display:flex;align-items:center;gap:11px;min-width:240px;max-width:320px;padding:13px 16px;border-radius:14px;
 background:rgba(14,14,32,.92);border:1px solid var(--line);backdrop-filter:blur(12px);font-size:13.5px;
 box-shadow:0 18px 50px -18px rgba(0,0,0,.8);animation:toIn .45s cubic-bezier(.34,1.56,.64,1) forwards}
.toast.out{animation:toOut .35s ease forwards}
@keyframes toIn{from{opacity:0;transform:translateX(60px) scale(.9)}to{opacity:1;transform:none}}
@keyframes toOut{to{opacity:0;transform:translateX(60px) scale(.9)}}
.toast .to-ic{width:30px;height:30px;flex:none;border-radius:9px;display:grid;place-items:center;font-weight:800}
.toast.success .to-ic{background:rgba(52,211,153,.15);color:#34d399}.toast.success{border-color:rgba(52,211,153,.35)}
.toast.error .to-ic{background:rgba(244,63,94,.15);color:#fb7185}.toast.error{border-color:rgba(244,63,94,.35)}
.toast.info .to-ic{background:rgba(34,211,238,.15);color:#22d3ee}.toast.info{border-color:rgba(34,211,238,.35)}
.toast b{display:block;font-size:13.5px}
.toast span{color:var(--dim);font-size:12.5px}`,
  js: `const stack=document.getElementById('stack');
const cfg={success:{ic:'✓',t:'Deployed',d:'Your site is live at the edge.'},
 error:{ic:'✕',t:'Build failed',d:'Check the logs — error in module graph.'},
 info:{ic:'i',t:'New version',d:'Forge 2.4 is available to download.'}};
function toast(kind){const c=cfg[kind];const el=document.createElement('div');
 el.className='toast '+kind;
 el.innerHTML='<div class="to-ic">'+c.ic+'</div><div><b>'+c.t+'</b><span>'+c.d+'</span></div>';
 stack.appendChild(el);
 setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),350);},3600);}
document.querySelectorAll('.to-btn').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.k)));
setTimeout(()=>toast('success'),500);`,
});

// C12. Top loading bar
const topbar = doc({
  body: `<h3 class="t">Page-Load Top Progress Bar</h3><p class="s">Trickle + complete — like YouTube/Nprogress</p>
<button class="tp-btn" id="tpBtn">▶ Simulate navigation</button>
<div class="tp-bar" id="bar"><i></i></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.tp-btn{padding:13px 26px;border-radius:12px;border:1px solid var(--line);background:var(--panel);font-size:14px;font-weight:600;transition:all .25s}
.tp-btn:hover{border-color:var(--v1);transform:translateY(-2px)}
.tp-bar{position:fixed;top:0;left:0;right:0;height:3px;z-index:99;pointer-events:none;opacity:0;transition:opacity .3s}
.tp-bar.show{opacity:1}
.tp-bar i{display:block;height:100%;width:0%;border-radius:0 3px 3px 0;
 background:linear-gradient(90deg,var(--v1),var(--v2),var(--c1));
 box-shadow:0 0 12px rgba(217,70,239,.9);transition:width .2s ease}
.tp-bar i::after{content:'';position:absolute;right:0;top:-2px;width:60px;height:6px;
 background:radial-gradient(ellipse at right,rgba(34,211,238,.9),transparent 70%)}`,
  js: `const wrap=document.getElementById('bar'),fill=wrap.querySelector('i');
let progress=0,timer=null;
function start(){clearInterval(timer);progress=0;wrap.classList.add('show');fill.style.width='0%';
 timer=setInterval(()=>{progress+=Math.random()*12+3;if(progress>=90){progress=90;clearInterval(timer);}
  fill.style.width=progress+'%';},220);}
function done(){clearInterval(timer);progress=100;fill.style.width='100%';
 setTimeout(()=>{wrap.classList.remove('show');fill.style.width='0%';progress=0;},400);}
document.getElementById('tpBtn').addEventListener('click',()=>{start();setTimeout(done,1900);});
start();setTimeout(done,1400);`,
});

// C13. Split text
const splitText = doc({
  body: `<h3 class="t">Split-Text Reveal</h3><p class="s">Hover the headline</p>
<div class="sp" id="sp">MOTION BY DESIGN</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.sp{display:flex;font-size:clamp(26px,5.4vw,48px);font-weight:800;letter-spacing:.06em;overflow:hidden}
.sp .wl{display:inline-flex;overflow:hidden}
.sp .ch{display:inline-block;transition:transform .45s cubic-bezier(.22,1,.36,1),color .3s}
.sp:hover .ch{transform:translateY(-110%) rotate(8deg)}
.sp .ch::after{content:attr(data-c);position:absolute;left:0;top:110%;
 background:linear-gradient(100deg,var(--v2),var(--c1));-webkit-background-clip:text;background-clip:text;color:transparent}
.sp .ch{position:relative}`,
  js: `const el=document.getElementById('sp');
const words=el.textContent.trim().split(' ');
el.innerHTML=words.map(w=>'<span class="wl">'+[...w].map(ch=>'<span class="ch" data-c="'+ch+'">'+ch+'</span>').join('')+'</span>').join('<span class="wl">&nbsp;</span>');
const chars=[...el.querySelectorAll('.ch')];
chars.forEach((c,i)=>{c.style.transitionDelay=(i*22)+'ms';});`,
});

// C14. Fan cards stack
const fanCards = doc({
  body: `<h3 class="t">Fan-Out Card Stack</h3><p class="s">Hover to fan · click a card to bring it forward</p>
<div class="fan" id="fan">
 ${["Nebula","Orbit","Comet"].map((n, i) => `<div class="fan-card" data-i="${i}"><div class="fan-bars">${Array.from({ length: 5 }, (_, k) => `<i style="--h:${30 + k * 12 + i * 8}%"></i>`).join("")}</div><b>${n} analytics</b><span>live demo data</span></div>`).join("")}
</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.fan{position:relative;width:230px;height:240px;margin-top:8px}
.fan-card{position:absolute;inset:0;border-radius:22px;padding:24px;cursor:pointer;
 background:linear-gradient(160deg,rgba(139,92,246,.28),rgba(12,12,30,.95));
 border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 60px -24px rgba(0,0,0,.9);
 display:flex;flex-direction:column;transition:transform .5s cubic-bezier(.22,1,.36,1),box-shadow .4s;
 transform-origin:bottom center}
.fan:hover .fan-card:nth-child(1){transform:rotate(-14deg) translate(-58px,-6px)}
.fan:hover .fan-card:nth-child(2){transform:translateY(-22px) scale(1.04)}
.fan:hover .fan-card:nth-child(3){transform:rotate(14deg) translate(58px,-6px)}
.fan-card.up{transform:translateY(-34px) scale(1.07)!important;border-color:rgba(217,70,239,.6);z-index:5;box-shadow:0 34px 70px -20px rgba(217,70,239,.5)}
.fan-bars{display:flex;gap:8px;align-items:flex-end;height:90px;margin-bottom:16px}
.fan-bars i{flex:1;height:var(--h);border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,var(--c1),var(--v1))}
.fan-card b{font-size:17px}
.fan-card span{font-size:12px;color:var(--dim);margin-top:4px}`,
  js: `const fan=document.getElementById('fan');
fan.addEventListener('click',e=>{const c=e.target.closest('.fan-card');if(!c)return;
 fan.querySelectorAll('.fan-card').forEach(x=>x.classList.toggle('up',x===c));});
`,
});

// C15. Spring tooltip
const tooltip = doc({
  body: `<h3 class="t">Elastic Tooltip on Follow</h3><p class="s">Hover the buttons — the tip springs in and tracks</p>
<div class="tt-wrap">
 <button class="tt-btn" data-tip="Copies to your clipboard ✓">Copy</button>
 <button class="tt-btn" data-tip="Deploys to 280 edge nodes">Deploy</button>
 <button class="tt-btn" data-tip="Rolls back in under a second">Rollback</button>
</div>
<div class="tt" id="tt"><i class="tt-arrow"></i><span id="ttText"></span></div>`,
  css: `.t{font-size:20px;font-weight:700;text-align:center}.s{color:var(--dim);font-size:13px;margin-top:-10px;text-align:center}
.tt-wrap{display:flex;gap:14px;margin-top:8px}
.tt-btn{padding:13px 24px;border-radius:12px;border:1px solid var(--line);background:var(--panel);font-size:14px;font-weight:600;transition:all .25s}
.tt-btn:hover{border-color:var(--v1);transform:translateY(-2px)}
.tt{position:fixed;z-index:60;pointer-events:none;transform:translate(-50%,0);opacity:0;
 padding:9px 15px;border-radius:11px;font-size:12.5px;font-weight:600;white-space:nowrap;
 background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;box-shadow:0 14px 40px -10px rgba(217,70,239,.7);
 transition:opacity .2s;will-change:left,top}
.tt.show{opacity:1}
.tt-arrow{position:absolute;left:50%;bottom:-5px;width:10px;height:10px;margin-left:-5px;
 background:var(--v2);transform:rotate(45deg);border-radius:2px}`,
  js: `const tt=document.getElementById('tt'),ttText=document.getElementById('ttText');
let curX=0,curY=0,tgX=0,tgY=0;
document.querySelectorAll('.tt-btn').forEach(b=>{
 b.addEventListener('mouseenter',e=>{ttText.textContent=b.dataset.tip;tt.classList.add('show');});
 b.addEventListener('mousemove',e=>{tgX=e.clientX;tgY=b.getBoundingClientRect().top-14;});
 b.addEventListener('mouseleave',()=>tt.classList.remove('show'));
});
(function loop(){
 curX+=(tgX-curX)*.22;curY+=(tgY-curY)*.22;
 tt.style.left=curX+'px';tt.style.top=curY+'px';
 requestAnimationFrame(loop);})();
`,
});

// C16. Flip card
const flipCard = doc({
  body: `<h3 class="t">3D Flip Reveal Card</h3><p class="s">Hover (or tap) to flip</p>
<div class="flip"><div class="flip-in">
 <div class="flip-face flip-front"><div class="flip-ic">✦</div><b>Hover to reveal</b><span>The answer is on the back</span></div>
 <div class="flip-face flip-back"><b>42</b><span>that's the answer.</span></div>
</div></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.flip{width:230px;height:290px;perspective:1100px}
.flip-in{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.22,1,.36,1)}
.flip:hover .flip-in,.flip:focus-within .flip-in{transform:rotateY(180deg)}
.flip-face{position:absolute;inset:0;border-radius:24px;backface-visibility:hidden;display:flex;flex-direction:column;
 align-items:center;justify-content:center;gap:10px;padding:24px;text-align:center;border:1px solid rgba(255,255,255,.14)}
.flip-front{background:linear-gradient(160deg,rgba(139,92,246,.25),rgba(12,12,30,.95))}
.flip-back{background:linear-gradient(160deg,rgba(217,70,239,.35),rgba(30,10,40,.95));transform:rotateY(180deg)}
.flip-ic{font-size:44px;filter:drop-shadow(0 0 16px rgba(217,70,239,.8));animation:pulseF 2.4s ease-in-out infinite}
@keyframes pulseF{50%{transform:scale(1.15)}}
.flip-face b{font-size:20px}
.flip-back b{font-size:64px;font-weight:800;background:linear-gradient(180deg,#fff,#f0abfc);-webkit-background-clip:text;background-clip:text;color:transparent}
.flip-face span{color:var(--dim);font-size:13.5px}`,
  js: `document.querySelector('.flip').addEventListener('click',()=>{
 const inr=document.querySelector('.flip-in');
 if(matchMedia('(hover:none)').matches)inr.style.transform=inr.style.transform?'':'rotateY(180deg)';});`,
});

export const EXTRA_COMPONENT_ITEMS: Item[] = [
  {
    id: "cmp-tabs",
    slug: "sliding-indicator-tabs",
    category: "components",
    title: "Sliding Indicator Tabs",
    summary: "A gradient pill that physically glides between tabs with a spring easing, while the panel cross-fades.",
    author: "React Bits style",
    tags: ["tabs", "navigation", "sliding", "indicator"],
    tech: ["html", "css", "javascript"],
    stars: 6420,
    views: 34600,
    copies: 6900,
    featured: false,
    published: true,
    html: slidingTabs,
    prompt: `Build a "Sliding Indicator Tabs" component in pure HTML/CSS/JS: a pill-shaped tab bar (rounded-full container, 5px padding, glass bg) containing 4 buttons (Overview/Features/Pricing/FAQ) and an absolutely-positioned .tb-glide gradient pill (violet→fuchsia) behind the active label. On click, JS measures the clicked button's getBoundingClientRect() relative to the container and animates the glide to its width and x offset using transform/width transitions with cubic-bezier(.22,1,.36,1) over .38s; labels turn white when active. Below, a glass panel cross-fades (opacity transition ~.18s) to new content per tab. Initialize the glide on first rAF. Title "Sliding Indicator Tabs", hint "The pill glides between tabs". Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-08-10T10:00:00Z",
    updatedAt: "2026-08-29T10:00:00Z",
  },
  {
    id: "cmp-accordion",
    slug: "smooth-grid-accordion",
    category: "components",
    title: "Smooth Grid-Row Accordion",
    summary: "Height-animated FAQ rows using grid-template-rows 0fr→1fr — no fixed heights, perfect easing.",
    author: "Aceternity style",
    tags: ["accordion", "faq", "expand", "grid"],
    tech: ["html", "css", "javascript"],
    stars: 7100,
    views: 38900,
    copies: 8200,
    featured: true,
    published: true,
    html: accordion,
    prompt: `Build a "Smooth Grid Accordion" FAQ component in pure HTML/CSS/JS: three stacked rows in one glass rounded-18px container (hairline dividers between). Each row has a full-width button with the question, a circular "+" icon on the right (26px circle, 1px border). The answer uses the modern grid technique: .ac-a { display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1) } with inner <p> overflow:hidden and padding transitioning 0→bottom padding; .open switches to grid-template-rows:1fr. On open the "+" rotates 45° (becoming ×) with spring cubic-bezier(.34,1.56,.64,1), border and text turn fuchsia/cyan tinted; question text turns cyan. First row starts open. Questions/answers about a motion resource vault ("What is MotionVault?", "Do I need a framework?" — answer "self-contained HTML/CSS/JS", "Can I use it commercially?"). Dark #070711. No libraries.`,
    sourceUrl: "https://ui.aceternity.com",
    createdAt: "2026-08-13T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
  },
  {
    id: "cmp-toast",
    slug: "stacked-toast-notifications",
    category: "components",
    title: "Stacked Toast Notifications",
    summary: "Success/error/info toasts that spring in from the bottom-right, stack up and auto-dismiss.",
    author: "React Bits style",
    tags: ["toast", "notification", "feedback", "stack"],
    tech: ["html", "css", "javascript"],
    stars: 8240,
    views: 45100,
    copies: 9800,
    featured: true,
    published: true,
    html: toasts,
    prompt: `Build a "Stacked Toast Notifications" system in pure HTML/CSS/JS: three trigger buttons (Success/Error/Info toast). Toasts stack fixed bottom-right in a flex column (10px gap). Clicking a button creates a toast: glass dark card (rgba(14,14,32,.92), blur, 14px radius, deep shadow) with a colored icon chip (✓ green, ✕ red, i cyan — tinted backgrounds/borders per kind), bold title and dim description line per kind: success "Deployed / Your site is live at the edge.", error "Build failed / Check the logs — error in module graph.", info "New version / Forge 2.4 is available to download." Toast enters from translateX(60px) scale(.9) with spring cubic-bezier(.34,1.56,.64,1) over .45s, auto-dismisses after 3.6s by sliding back out over .35s then removing from DOM. Fire a success toast 500ms after load. Title "Stacked Toast Notifications". Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-08-16T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "cmp-topbar",
    slug: "top-progress-bar",
    category: "components",
    title: "Top Page-Load Progress Bar",
    summary: "A YouTube/NProgress-style bar: starts fast, trickles toward 90%, then snaps complete with a glow head.",
    author: "MotionVault",
    tags: ["progress", "loading", "top-bar", "navigation"],
    tech: ["html", "css", "javascript"],
    stars: 5680,
    views: 29400,
    copies: 6100,
    featured: false,
    published: true,
    html: topbar,
    prompt: `Build a "Top Page-Load Progress Bar" (NProgress style) in pure HTML/CSS/JS: fixed top 3px gradient bar (violet→fuchsia→cyan) with a glowing shadow and a radial glow "head" via ::after at its right edge; container fades in/out with opacity transition. Behavior: start() shows the bar, resets width to 0, then a setInterval every 220ms adds random 3-15% progress until it reaches 90% where it holds (the classic trickle pause); done() clears the timer, jumps width to 100%, then after 400ms hides and resets. A button "▶ Simulate navigation" runs start() then done() after 1.9s; also auto-run one cycle on load. Only width/opacity transition. Title "Page-Load Top Progress Bar". Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-08-19T10:00:00Z",
    updatedAt: "2026-08-28T10:00:00Z",
  },
  {
    id: "cmp-split",
    slug: "split-text-roll-reveal",
    category: "components",
    title: "Split-Text Roll Reveal",
    summary: "On hover, each letter rolls up out of an overflow mask while a gradient copy rolls in from below, staggered.",
    author: "React Bits style",
    tags: ["text", "split", "reveal", "hover", "letters"],
    tech: ["html", "css", "javascript"],
    stars: 7760,
    views: 41800,
    copies: 8600,
    featured: false,
    published: true,
    html: splitText,
    prompt: `Build a "Split-Text Roll Reveal" headline effect in pure HTML/CSS/JS: JS splits "MOTION BY DESIGN" into words, each word wrapped in an overflow-hidden .wl span and each character in a .ch span carrying its letter in a data-c attribute. CSS: .ch is position:relative with a ::after pseudo containing attr(data-c) positioned top:110% in fuchsia→cyan gradient clip-text; on container hover every .ch translates -110% with slight 8deg rotation over .45s cubic-bezier(.22,1,.36,1), revealing the gradient duplicate rolling in from below; JS adds a 22ms-per-character transition delay for the wave. Words separated by a non-breaking-space wrapper that also masks. Bold clamp 26-48px headline. Title "Split-Text Reveal", hint "Hover the headline". Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-08-22T10:00:00Z",
    updatedAt: "2026-08-31T10:00:00Z",
  },
  {
    id: "cmp-fan",
    slug: "fan-out-card-stack",
    category: "components",
    title: "Fan-Out Card Stack",
    summary: "Three data cards stacked that fan open with rotation on hover; click one to spring it to the front.",
    author: "Aceternity style",
    tags: ["cards", "stack", "fan", "3d", "hover"],
    tech: ["html", "css", "javascript"],
    stars: 6890,
    views: 36300,
    copies: 7400,
    featured: false,
    published: true,
    html: fanCards,
    prompt: `Build a "Fan-Out Card Stack" component in pure HTML/CSS/JS: a 230×240px stage with three absolutely-positioned glass data-cards (violet gradient tint, 22px radius, deep shadow, transform-origin bottom center) titled "Nebula analytics", "Orbit analytics", "Comet analytics" each with five little gradient bar-chart columns of increasing heights (via --h). On .fan hover the cards spread: first rotates -14° and shifts left/up, second lifts -22px and scales 1.04, third rotates +14° and shifts right/up, all with .5s cubic-bezier(.22,1,.36,1). Clicking a card toggles an .up class that springs it to the front (translateY(-34px) scale(1.07), fuchsia border + fuchsia glow shadow, z-index 5) and removes .up from siblings (works on top of the hover transforms via !important). Title "Fan-Out Card Stack", hint "Hover to fan · click a card to bring it forward". Dark #070711. No libraries.`,
    sourceUrl: "https://ui.aceternity.com",
    createdAt: "2026-08-24T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "cmp-tooltip",
    slug: "elastic-following-tooltip",
    category: "components",
    title: "Elastic Following Tooltip",
    summary: "A gradient tooltip that springs toward the cursor position with lerp smoothing and an arrow caret.",
    author: "React Bits style",
    tags: ["tooltip", "hover", "spring", "follow"],
    tech: ["html", "css", "javascript"],
    stars: 5940,
    views: 31800,
    copies: 6700,
    featured: false,
    published: true,
    html: tooltip,
    prompt: `Build an "Elastic Following Tooltip" in pure HTML/CSS/JS: three glass buttons labeled Copy / Deploy / Rollback each with a data-tip message ("Copies to your clipboard ✓", "Deploys to 280 edge nodes", "Rolls back in under a second"). A single fixed-position tooltip (gradient violet→fuchsia, rounded-11px, white bold 12.5px text, big fuchsia shadow, an ::after rotated square arrow at the bottom center) is positioned via transform translate(-50%) with opacity transition. mouseenter shows it and sets its text; mousemove sets target coordinates to the cursor x and the hovered button's top edge - 14px; mouseleave hides. A rAF LERP loop eases the tooltip toward its target at factor 0.22 each frame, giving an elastic trailing motion. Title "Elastic Tooltip on Follow", hint "Hover the buttons — the tip springs in and tracks". Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-08-26T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
  },
  {
    id: "cmp-flip",
    slug: "3d-flip-reveal-card",
    category: "components",
    title: "3D Flip Reveal Card",
    summary: "A card that flips on its Y axis in 3D to show a gradient back face — works on hover and on tap for touch.",
    author: "Aceternity style",
    tags: ["3d", "flip", "card", "reveal", "perspective"],
    tech: ["html", "css", "javascript"],
    stars: 7300,
    views: 39200,
    copies: 8100,
    featured: true,
    published: true,
    html: flipCard,
    prompt: `Build a "3D Flip Reveal Card" in pure HTML/CSS/JS: a 230×290px stage with perspective:1100px; inner .flip-in uses transform-style:preserve-3d and rotates rotateY(180deg) over .7s cubic-bezier(.22,1,.36,1) when the stage is hovered OR focused-within (also tap-toggle via JS when matchMedia('(hover:none)') for touch). Two faces absolutely overlay each other with backface-visibility:hidden: FRONT — violet-tinted glass with a pulsing "✦" icon (drop-shadow glow), "Hover to reveal" and dim hint; BACK — fuchsia-tinted glass pre-rotated 180°, showing a giant "42" in white→pink gradient clip-text and "that's the answer." Text centered, 24px radius, 1px white-14% borders. Title "3D Flip Reveal Card", hint "Hover (or tap) to flip". Dark #070711. No libraries.`,
    sourceUrl: "https://ui.aceternity.com",
    createdAt: "2026-08-29T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
];

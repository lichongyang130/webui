import { Item } from "../types";
import { doc } from "./wrap";

// A7. Typewriter
const typewriter = doc({
  body: `<h3 class="t">Looping Typewriter</h3>
<div class="tw"><span id="type"></span><span class="tw-cur">▌</span></div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:18px}
.tw{font-family:ui-monospace,'JetBrains Mono',monospace;font-size:clamp(17px,3vw,24px);font-weight:600;min-height:1.5em;color:var(--txt)}
#type{background:linear-gradient(100deg,var(--c1),var(--v1));-webkit-background-clip:text;background-clip:text;color:transparent}
.tw-cur{color:var(--v2);animation:blink 1s step-end infinite}
@keyframes blink{50%{opacity:0}}`,
  js: `const el=document.getElementById('type');
const phrases=['> ship animated landing pages',
 '> copy a prompt, paste, done',
 '> 60fps springs, no keyframes',
 '> your AI builds the whole site'];
let pi=0,ci=0,deleting=false;
function tick(){
 const word=phrases[pi];
 if(!deleting){el.textContent=word.slice(0,++ci);if(ci===word.length){deleting=true;return setTimeout(tick,1600);}}
 else{el.textContent=word.slice(0,--ci);if(ci===0){deleting=false;pi=(pi+1)%phrases.length;return setTimeout(tick,350);}}
 setTimeout(tick,deleting?32:62);
}
tick();`,
});

// A8. Confetti canvas
const confetti = doc({
  body: `<h3 class="t">Canvas Confetti Burst</h3><p class="s">Click anywhere to celebrate</p>
<canvas id="cf" class="cf"></canvas>
<button class="cf-btn" id="cfBtn">✦ Burst</button>`,
  css: `.t{font-size:20px;font-weight:700;position:relative;z-index:2}.s{color:var(--dim);font-size:13px;margin-top:-10px;position:relative;z-index:2}
.cf{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.cf-btn{position:relative;z-index:3;padding:13px 30px;border-radius:14px;font-size:15px;font-weight:700;color:#fff;
 background:linear-gradient(120deg,var(--v1),var(--v2));box-shadow:0 14px 44px -12px rgba(217,70,239,.8);
 animation:cfPulse 2s ease-in-out infinite}
@keyframes cfPulse{50%{transform:scale(1.05)}}`,
  js: `const stage=document.querySelector('.demo-stage');
const cv=document.getElementById('cf'),ctx=cv.getContext('2d');
function rs(){cv.width=stage.clientWidth;cv.height=stage.clientHeight;}rs();addEventListener('resize',rs);
const colors=['#8b5cf6','#d946ef','#22d3ee','#fbbf24','#34d399','#fb7185'];
let parts=[];
function burst(x,y,n=90){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=Math.random()*9+3;
 parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-4,g:.28,size:Math.random()*7+4,
  rot:Math.random()*6.28,vr:(Math.random()-.5)*.3,color:colors[Math.random()*colors.length|0],life:1,shape:Math.random()>.5?'r':'c'});}}
function loop(){
 ctx.clearRect(0,0,cv.width,cv.height);
 parts=parts.filter(p=>p.life>0&&p.y<cv.height+30);
 for(const p of parts){
  p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.rot+=p.vr;p.life-=.009;
 ctx.save();ctx.globalAlpha=Math.max(p.life,0);ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.color;
  if(p.shape==='r')ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);
  else{ctx.beginPath();ctx.arc(0,0,p.size/3,0,7);ctx.fill();}
  ctx.restore();}
 requestAnimationFrame(loop);
}
loop();
stage.addEventListener('click',e=>{const r=stage.getBoundingClientRect();burst(e.clientX-r.left,e.clientY-r.top);});
document.getElementById('cfBtn').addEventListener('click',e=>{e.stopPropagation();
 const r=cv.getBoundingClientRect();burst(cv.width/2,cv.height/2,130);});
burst(cv.width/2,cv.height/2,110);`,
});

// A9. Constellation network
const constellation = doc({
  body: `<canvas id="con" style="position:absolute;inset:0;width:100%;height:100%"></canvas>
 <div style="position:relative;z-index:1;text-align:center"><h3 class="t">Constellation Network</h3>
 <p class="s">Nodes drift, connect by proximity, follow your cursor</p></div>`,
  css: `.demo-inner{min-height:420px}.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:8px}`,
  js: `const stage=document.querySelector('.demo-stage');
const cv=document.getElementById('con'),ctx=cv.getContext('2d');
function rs(){cv.width=stage.clientWidth;cv.height=stage.clientHeight;}rs();addEventListener('resize',rs);
const N=54,nodes=[];
for(let i=0;i<N;i++)nodes.push({x:Math.random()*cv.width,y:Math.random()*cv.height,
 vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5});
const mouse={x:-999,y:-999};
stage.addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
stage.addEventListener('mouseleave',()=>{mouse.x=mouse.y=-999;});
function loop(){
 ctx.clearRect(0,0,cv.width,cv.height);
 for(const n of nodes){
  n.x+=n.vx;n.y+=n.vy;
  if(n.x<0||n.x>cv.width)n.vx*=-1;if(n.y<0||n.y>cv.height)n.vy*=-1;
  const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);
  if(d<130){n.x+=dx/d*.9;n.y+=dy/d*.9;}
 }
 for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
  const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
  if(d<110){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
   ctx.strokeStyle='rgba(139,92,246,'+(1-d/110)*.35+')';ctx.lineWidth=1;ctx.stroke();}
 }
 for(const n of nodes){
  const dm=Math.hypot(n.x-mouse.x,n.y-mouse.y);
  ctx.beginPath();ctx.arc(n.x,n.y,dm<130?3.2:2,0,7);
  ctx.fillStyle=dm<130?'rgba(34,211,238,.95)':'rgba(196,181,253,.75)';ctx.fill();}
 requestAnimationFrame(loop);
}
loop();`,
});

// A10. Audio EQ bars
const equalizer = doc({
  body: `<h3 class="t">Live Audio Equalizer</h3><p class="s">Randomized energy bars · hover intensifies</p>
<div class="eq2" id="eq2">${Array.from({ length: 22 }, () => "<i></i>").join("")}</div>
<div class="eq2-note">▶ now playing — midnight synth</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.eq2{display:flex;align-items:flex-end;gap:5px;height:180px;width:min(440px,94vw)}
.eq2 i{flex:1;border-radius:4px 4px 2px 2px;height:12%;will-change:height;
 background:linear-gradient(180deg,var(--v2) 0%,var(--v1) 55%,rgba(139,92,246,.25) 100%);
 box-shadow:0 0 12px -3px rgba(217,70,239,.5)}
.eq2-note{margin-top:16px;font-size:13px;color:var(--dim);letter-spacing:.08em}`,
  js: `const bars=[...document.querySelectorAll('#eq2 i')];
let boost=1;
document.querySelector('.demo-stage').addEventListener('mouseenter',()=>boost=1.6);
document.querySelector('.demo-stage').addEventListener('mouseleave',()=>boost=1);
let t=0;
function frame(){
 t+=.12;
 bars.forEach((b,i)=>{
  const wave=Math.sin(t+i*.55)*.5+.5,wave2=Math.sin(t*1.7+i*.9)*.5+.5;
  const h=8+((wave*.7+wave2*.3)*78)*boost;
  b.style.height=Math.min(h,100)+'%';});
 requestAnimationFrame(frame);
}
frame();`,
});

// A11. Scroll blur reveal
const blurReveal = doc({
  body: `<h3 class="t">Scroll Blur Reveal</h3>
<div class="br-panel" id="brPanel">
 ${[1, 2, 3, 4, 5].map(
   (n) => `<div class="br-block"><b>0${n}</b><p>Each block un-blurs and rises as it enters the panel's center — a cinematic scroll reveal driven by its scroll position.</p></div>`
 ).join("")}
</div>`,
  css: `.t{font-size:20px;font-weight:700;margin-bottom:10px}
.br-panel{position:relative;width:min(440px,94vw);height:320px;overflow-y:scroll;border:1px solid var(--line);
 border-radius:18px;background:linear-gradient(180deg,#0b0a24,#150b2c);padding:30px 24px}
.br-panel::-webkit-scrollbar{width:6px}.br-panel::-webkit-scrollbar-thumb{background:rgba(34,211,238,.5);border-radius:99px}
.br-block{display:flex;gap:16px;align-items:center;padding:42px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.br-block:last-child{border-bottom:none}
.br-block b{font-size:34px;font-weight:800;color:rgba(139,92,246,.5);flex:none;transition:all .4s}
.br-block p{font-size:13.5px;color:var(--dim);line-height:1.7;transition:all .4s}`,
  js: `const panel=document.getElementById('brPanel');
const blocks=[...panel.querySelectorAll('.br-block')];
function update(){
 const pc=panel.clientHeight/2;
 blocks.forEach(b=>{
  const r=b.getBoundingClientRect(),pr=panel.getBoundingClientRect();
  const center=r.top+r.height/2-pr.top;
  const dist=Math.abs(center-pc);
  const k=Math.max(0,1-dist/(pc*1.15));
  b.style.opacity=.25+k*.75;
  b.style.filter='blur('+(1-k)*9+'px)';
  b.style.transform='translateY('+(1-k)*26+'px)';
  b.style.scale=.85+k*.15;
 });
}
panel.addEventListener('scroll',update,{passive:true});
update();`,
});

// A12. Grid spotlight
const gridSpot = doc({
  body: `<h3 class="t">Mouse-Tracking Grid Glow</h3>
<div class="gs" id="gs">
 ${Array.from({ length: 64 }, () => "<i></i>").join("")}
</div>
<p class="s">Move your cursor across the panel</p>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px}
.gs{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;width:min(440px,94vw);padding:18px;
 border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.02)}
.gs i{aspect-ratio:1;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
 transition:background .35s,border-color .35s,box-shadow .35s,transform .2s}
.gs i.hot{background:rgba(139,92,246,.5);border-color:rgba(217,70,239,.7);
 box-shadow:0 0 22px -4px rgba(139,92,246,.9);transform:scale(1.06)}
.gs i.warm{background:rgba(139,92,246,.22);border-color:rgba(139,92,246,.35)}`,
  js: `const gs=document.getElementById('gs');
const cells=[...gs.children];
cells.forEach(c=>{
 c.addEventListener('mouseenter',()=>{
  const idx=cells.indexOf(c);
  cells.forEach(x=>x.classList.remove('hot','warm'));
  c.classList.add('hot');
  const neighbors=[idx-1,idx+1,idx-8,idx+8,idx-9,idx+9,idx-7,idx+7];
  neighbors.forEach(n=>{if(cells[n])cells[n].classList.add('warm');});
 });
});
gs.addEventListener('mouseleave',()=>cells.forEach(c=>c.classList.remove('hot','warm')));`,
});

export const EXTRA_ANIMATION_ITEMS: Item[] = [
  {
    id: "ani-typewriter",
    slug: "looping-typewriter-effect",
    category: "animations",
    title: "Looping Typewriter Effect",
    summary: "Monospace gradient text that types and deletes four phrases on a loop, with a blinking block cursor.",
    author: "Anime.js style",
    tags: ["typewriter", "text", "terminal", "loop"],
    tech: ["html", "css", "javascript"],
    stars: 6720,
    views: 36100,
    copies: 7100,
    featured: false,
    published: true,
    html: typewriter,
    prompt: `Build a "Looping Typewriter" effect in pure HTML/CSS/JS: a monospace (ui-monospace) element with a gradient clip-text span (cyan→violet) followed by a fuchsia block cursor "▌" that blinks via step-end 1s keyframes. JS cycles four phrases ["> ship animated landing pages", "> copy a prompt, paste, done", "> 60fps springs, no keyframes", "> your AI builds the whole site"], typing at ~62ms/char, holding 1600ms when complete, deleting at ~32ms/char, 350ms gap before the next phrase; loop forever. Title "Looping Typewriter". Dark #070711. No libraries.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-12T10:00:00Z",
    updatedAt: "2026-08-28T10:00:00Z",
  },
  {
    id: "ani-confetti",
    slug: "canvas-confetti-burst",
    category: "animations",
    title: "Canvas Confetti Burst",
    summary: "Gravity-driven confetti in six colors — rects and circles with rotation — fired on click or from the pulsing button.",
    author: "MotionVault",
    tags: ["canvas", "confetti", "particles", "celebration", "gravity"],
    tech: ["html", "css", "javascript"],
    stars: 7840,
    views: 42300,
    copies: 8400,
    featured: true,
    published: true,
    html: confetti,
    prompt: `Build a "Canvas Confetti Burst" in pure HTML/CSS/JS: a full-stage pointer-events-none canvas plus a pulsing gradient button "✦ Burst" (scale 1.05 pulse keyframe). Clicking the stage OR the button spawns ~90-130 particles at the click point (button fires from center): each particle has a random polar launch angle, speed 3-12, upward bias (vy starts -4), gravity .28/frame, slight air damping .99 on vx, random size 4-11, random rotation + spin, one of six colors (violet/fuchsia/cyan/amber/green/rose), and a rect-or-circle shape; render with save/translate/rotate and fading life (-.009/frame); remove when dead or off-bottom. Button click should stopPropagation so the stage handler doesn't double-fire. Auto-fire one burst at center on load. Title "Canvas Confetti Burst", hint "Click anywhere to celebrate". Dark #070711. No libraries.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "ani-constellation",
    slug: "constellation-particle-network",
    category: "animations",
    title: "Constellation Particle Network",
    summary: "Fifty drifting nodes that link up within proximity and drift away from — yet stay near — your cursor.",
    author: "MotionVault",
    tags: ["canvas", "particles", "network", "constellation", "interactive"],
    tech: ["html", "css", "javascript"],
    stars: 9310,
    views: 50600,
    copies: 10200,
    featured: true,
    published: true,
    html: constellation,
    prompt: `Build a "Constellation Network" canvas animation in pure HTML/CSS/JS: full-stage canvas with ~54 nodes drifting at random velocities (±0.5), bouncing off edges. Every frame draw lines between node pairs closer than 110px with stroke color rgba(139,92,246, alpha) where alpha fades with distance (1-d/110)*.35. Nodes are small dots (2px, lavender 75%); within 130px of the MOUSE they turn cyan, grow to 3.2px, and are gently PUSHED away from the cursor (repulsion of .9/frame normalized) — while still bouncing at edges. Mouse coordinates tracked relative to the stage via getBoundingClientRect; reset to -999 on mouseleave. Standard resize handling, 60fps rAF loop, additive-style look on a dark grid stage. Title "Constellation Network", hint "Nodes drift, connect by proximity, follow your cursor". Dark #070711. No libraries.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-18T10:00:00Z",
    updatedAt: "2026-08-31T10:00:00Z",
  },
  {
    id: "ani-eq",
    slug: "live-audio-equalizer-bars",
    category: "animations",
    title: "Live Audio Equalizer Bars",
    summary: "Twenty-two bars driven by layered sine waves for organic motion — hover boosts the energy.",
    author: "Anime.js style",
    tags: ["audio", "equalizer", "music", "bars", "reactive"],
    tech: ["html", "css", "javascript"],
    stars: 6230,
    views: 33800,
    copies: 6600,
    featured: false,
    published: true,
    html: equalizer,
    prompt: `Build a "Live Audio Equalizer" in pure HTML/CSS/JS: a row of 22 flex bars (5px gap, 180px tall container) each a rounded gradient bar (fuchsia→violet with faded base, glow shadow), height driven in JS from TWO summed sine waves per bar (phase offsets per index, frequencies ~.55 and ~.9) producing organic music-like motion in the 8-90% range; use requestAnimationFrame and height-only updates with will-change. On mouseenter of the stage a boost factor goes 1.6 (heights multiplied, clamped to 100%), back to 1 on mouseleave. Add the caption "▶ now playing — midnight synth" in dim tracked text. Title "Live Audio Equalizer", hint "Randomized energy bars · hover intensifies". Dark #070711. No libraries.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-21T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
  },
  {
    id: "ani-blur",
    slug: "scroll-blur-reveal",
    category: "animations",
    title: "Scroll Blur Reveal",
    summary: "Inside a scrollable panel, blocks un-blur, brighten and scale as they reach the center — proximity-based, no observers.",
    author: "Anime.js style",
    tags: ["scroll", "blur", "reveal", "proximity", "cinematic"],
    tech: ["html", "css", "javascript"],
    stars: 5890,
    views: 30400,
    copies: 5300,
    featured: false,
    published: true,
    html: blurReveal,
    prompt: `Build a "Scroll Blur Reveal" demo in pure HTML/CSS/JS: a 440×320px rounded panel with its own overflow-y scroll (styled cyan scrollbar, night-gradient bg) containing 5 blocks (big violet numbers 01-05 + a short paragraph each, generous vertical padding). On every passive scroll event (and once initially), JS computes each block's vertical CENTER relative to the panel's center, normalizes distance to a 0..1 proximity factor k (clamped with the panel half-height), and applies: opacity .25→.975, filter blur(9px→0), translateY(26px→0), scale .85→1.0 — a cinematic proximity reveal driven purely by scroll position (no IntersectionObserver, works for blocks before AND after center). Title "Scroll Blur Reveal". Dark #070711. No libraries.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-24T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "ani-gridspot",
    slug: "mouse-tracking-grid-glow",
    category: "animations",
    title: "Mouse-Tracking Grid Glow",
    summary: "An 8×8 tile grid: hovered cell ignites with glow, its eight neighbors light warm, rest fades to glass.",
    author: "MotionVault",
    tags: ["grid", "hover", "spotlight", "tiles", "interactive"],
    tech: ["html", "css", "javascript"],
    stars: 5340,
    views: 28700,
    copies: 5900,
    featured: false,
    published: true,
    html: gridSpot,
    prompt: `Build a "Mouse-Tracking Grid Glow" in pure HTML/CSS/JS: an 8×8 grid of 64 square cells (8px gap, rounded-10px, translucent glass tiles with hairline borders) inside a rounded panel. On cell mouseenter: clear and re-add classes — the hovered cell gets .hot (violet 50% bg, fuchsia border, violet glow box-shadow, scale 1.06), and its 8 grid neighbors (indices ±1, ±8, ±7, ±9, bounds-checked) get .warm (violet 22% bg, violet border); transitions are .35s for colors/glow, .2s transform for snappiness. On panel mouseleave all classes reset. Title "Mouse-Tracking Grid Glow", hint "Move your cursor across the panel". Dark #070711. No libraries.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-28T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
];

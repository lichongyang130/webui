import { Item } from "../types";
import { doc } from "./wrap";

// 1. Spring physics ball
const springBall = doc({
  body: `<h3 class="t">Spring Physics Drop</h3><p class="s">Click to re-launch · hand-rolled spring integrator</p>
<div class="sp-stage" id="spStage"><div class="sp-ball" id="spBall"></div><div class="sp-floor"></div></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.sp-stage{position:relative;width:min(420px,90%);height:260px;border:1px solid var(--line);border-radius:18px;
 background:linear-gradient(180deg,rgba(139,92,246,.08),transparent 60%);overflow:hidden;cursor:pointer}
.sp-ball{position:absolute;left:50%;top:-30px;width:54px;height:54px;margin-left:-27px;border-radius:50%;
 background:radial-gradient(circle at 32% 30%,#e9d5ff,var(--v1) 45%,#5b21b6);
 box-shadow:0 0 30px rgba(139,92,246,.6);will-change:transform}
.sp-floor{position:absolute;left:0;right:0;bottom:0;height:4px;background:linear-gradient(90deg,transparent,rgba(217,70,239,.7),transparent)}
.sp-shadow{position:absolute;bottom:2px;left:50%;width:50px;height:10px;margin-left:-25px;border-radius:50%;
 background:rgba(0,0,0,.5);filter:blur(6px);will-change:transform,opacity}`,
  js: `const stage=document.getElementById('spStage'),ball=document.getElementById('spBall');
const sh=document.createElement('div');sh.className='sp-shadow';stage.appendChild(sh);
let y=-60,vy=0,gravity=0.9,t=0;
function launch(){y=-60;vy=Math.random()*4+2;}
function frame(){
 vy+=gravity;y+=vy;
 const floor=stage.clientHeight-60;
 if(y>=floor){y=floor;vy*=-0.62;if(Math.abs(vy)<1.4)vy=0;}
 const squash=y>=floor-2?Math.max(.75,1-Math.abs(vy)*.05):1;
 ball.style.transform='translateY('+y+'px) scaleX('+(2-squash)+') scaleY('+squash+')';
 const close=Math.min(1,y/floor);
 sh.style.opacity=.15+close*.45;
 sh.style.transform='scaleX('+(0.5+close*1.1)+')';
 requestAnimationFrame(frame);
}
stage.addEventListener('click',launch);
launch();frame();`,
});

// 2. Draggable card
const dragCard = doc({
  body: `<h3 class="t">Fling & Snap Draggable</h3><p class="s">Drag the card · flick to fling · it springs home</p>
<div class="dr-zone" id="zone"><div class="dr-card" id="card"><div class="dr-bar"></div><b>Drag me ✦</b>
 <p>Pointer events with momentum and a spring-back toward center.</p></div></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.dr-zone{position:relative;width:min(420px,90%);height:280px;border:1px dashed rgba(255,255,255,.18);border-radius:20px;overflow:hidden;
 background-image:radial-gradient(rgba(139,92,246,.15) 1px,transparent 1px);background-size:22px 22px;touch-action:none}
.dr-card{position:absolute;left:50%;top:50%;width:190px;padding:20px;border-radius:18px;cursor:grab;
 background:linear-gradient(160deg,rgba(139,92,246,.3),rgba(20,16,44,.95));
 border:1px solid rgba(255,255,255,.16);box-shadow:0 24px 60px -20px rgba(0,0,0,.8);will-change:transform;user-select:none}
.dr-card:active{cursor:grabbing}
.dr-bar{width:44px;height:5px;border-radius:99px;background:rgba(255,255,255,.25);margin:0 auto 14px}
.dr-card b{font-size:16px;display:block;margin-bottom:8px}
.dr-card p{font-size:12.5px;color:var(--dim);line-height:1.6}`,
  js: `const zone=document.getElementById('zone'),card=document.getElementById('card');
let x=0,y=0,vx=0,vy=0,dragging=false,lx=0,ly=0,last=0;
function set(){card.style.transform='translate(calc(-50% + '+x+'px),calc(-50% + '+y+'px)) rotate('+(vx*0.06)+'deg)';}
function loop(){
 if(!dragging){vx*=0.92;vy*=0.92;x+=vx;y+=vy;
  x+=(-x)*0.08;y+=(-y)*0.08;
  if(Math.abs(x)<0.2)x=0;if(Math.abs(y)<0.2)y=0;}
 set();requestAnimationFrame(loop);}
card.addEventListener('pointerdown',e=>{dragging=true;card.setPointerCapture(e.pointerId);
 lx=e.clientX;ly=e.clientY;vx=vy=0;});
card.addEventListener('pointermove',e=>{if(!dragging)return;
 const dx=e.clientX-lx,dy=e.clientY-ly;x+=dx;y+=dy;vx=dx;vy=dy;lx=e.clientX;ly=e.clientY;});
card.addEventListener('pointerup',()=>dragging=false);
loop();`,
});

// 3. Scroll-linked parallax
const scrollParallax = doc({
  body: `<h3 class="t">Scroll-Linked Layers</h3><p class="s">Scroll inside the panel · layers move at different speeds</p>
<div class="px-panel" id="panel">
 <div class="px-layer px-mountains"></div>
 <div class="px-layer px-hills"></div>
 <div class="px-moon">✦</div>
 <div class="px-content" id="pxContent">
  <div class="px-block" style="margin-top:120px"><h4>Layer 0.3×</h4><p>The moon drifts slowest</p></div>
  <div class="px-block"><h4>Layer 0.6×</h4><p>Mid mountains glide behind</p></div>
  <div class="px-block" style="margin-bottom:120px"><h4>Layer 1×</h4><p>You are here — scroll-linked, not tweened.</p></div>
 </div>
</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.px-panel{position:relative;width:min(460px,92%);height:340px;overflow-y:scroll;overflow-x:hidden;border-radius:18px;
 border:1px solid var(--line);background:linear-gradient(180deg,#0b0a24,#1a0b2e)}
.px-panel::-webkit-scrollbar{width:6px}.px-panel::-webkit-scrollbar-thumb{background:rgba(139,92,246,.5);border-radius:99px}
.px-layer{position:absolute;left:-10%;right:-10%;will-change:transform;pointer-events:none}
.px-moon{position:absolute;top:36px;right:40px;font-size:34px;color:#fde68a;
 filter:drop-shadow(0 0 14px rgba(253,230,138,.8));will-change:transform}
.px-mountains{bottom:60px;height:150px;
 background:conic-gradient(from 180deg at 50% 100%,transparent 0 10deg,#312e81 10deg 25deg,transparent 25deg 40deg,#3730a3 40deg 58deg,transparent 58deg 75deg,#312e81 75deg 90deg,transparent 90deg);
 background-size:200px 150px;opacity:.7}
.px-hills{bottom:0;height:90px;background:radial-gradient(120px 60px at 20% 100%,#4c1d95 60%,transparent 61%),radial-gradient(160px 80px at 65% 100%,#6d28d9 60%,transparent 61%),radial-gradient(120px 70px at 95% 100%,#4c1d95 60%,transparent 61%);background-color:#2e1065}
.px-content{position:relative;z-index:2;padding:0 28px;display:flex;flex-direction:column;gap:150px}
.px-block{background:rgba(10,8,30,.72);border:1px solid var(--line);border-radius:16px;padding:20px;backdrop-filter:blur(8px)}
.px-block h4{font-size:16px;margin-bottom:6px;color:#c4b5fd}
.px-block p{font-size:13px;color:var(--dim)}`,
  js: `const panel=document.getElementById('panel');
const moon=document.querySelector('.px-moon'),mt=document.querySelector('.px-mountains'),hl=document.querySelector('.px-hills');
panel.addEventListener('scroll',()=>{const s=panel.scrollTop;
 moon.style.transform='translateY('+s*0.3+'px)';
 mt.style.transform='translateY('+s*0.6+'px)';
 hl.style.transform='translateY('+s*0.85+'px)';
},{passive:true});`,
});

// 4. Stagger timeline
const stagger = doc({
  body: `<h3 class="t">Stagger Timeline</h3><p class="s">Replays on click · 80ms waterfall with spring</p>
<div class="st-grid" id="stGrid">${Array.from({ length: 12 }, () => `<div class="st-cell"></div>`).join("")}</div>
<button class="st-btn" id="stReplay">↻ Replay</button>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.st-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;width:min(360px,90%)}
.st-cell{aspect-ratio:1;border-radius:14px;background:linear-gradient(150deg,rgba(139,92,246,.35),rgba(34,211,238,.12));
 border:1px solid rgba(255,255,255,.12);opacity:0;transform:scale(.3) rotate(-12deg);transform-origin:center}
.st-cell.go{animation:stIn .6s cubic-bezier(.34,1.56,.64,1) forwards}
@keyframes stIn{to{opacity:1;transform:scale(1) rotate(0)}}
.st-btn{margin-top:18px;padding:11px 24px;border-radius:12px;border:1px solid var(--line);
 background:rgba(255,255,255,.05);font-size:14px;font-weight:600;transition:all .25s}
.st-btn:hover{border-color:var(--v1);transform:translateY(-2px)}`,
  js: `const cells=[...document.querySelectorAll('.st-cell')];
function play(){cells.forEach((c,i)=>{c.classList.remove('go');void c.offsetWidth;
 setTimeout(()=>c.classList.add('go'),i*80);});}
document.getElementById('stReplay').addEventListener('click',play);
play();`,
});

// 5. Wave ripple on canvas
const waveRipple = doc({
  body: `<h3 class="t">Ripple Wave Field</h3><p class="s">Click / move to emit waves · additive glow</p>
<canvas id="wv" class="wv"></canvas>`,
  css: `.t{font-size:20px;font-weight:700;position:relative;z-index:1}.s{color:var(--dim);font-size:13px;margin-top:-10px;position:relative;z-index:1}
.wv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair}`,
  js: `const stage=document.querySelector('.demo-stage');
const cv=document.getElementById('wv'),ctx=cv.getContext('2d');
function rs(){cv.width=stage.clientWidth;cv.height=stage.clientHeight;}rs();addEventListener('resize',rs);
const waves=[];
function emit(x,y){waves.push({x,y,r:0,alpha:1});}
stage.addEventListener('click',e=>{const r=stage.getBoundingClientRect();emit(e.clientX-r.left,e.clientY-r.top);});
let lastMove=0;
stage.addEventListener('mousemove',e=>{const now=Date.now();if(now-lastMove<120)return;lastMove=now;
 const r=stage.getBoundingClientRect();emit(e.clientX-r.left,e.clientY-r.top);});
emit(cv.width/2,cv.height/2);
function loop(){
 ctx.clearRect(0,0,cv.width,cv.height);
 ctx.globalCompositeOperation='lighter';
 for(let i=waves.length-1;i>=0;i--){const w=waves[i];
  w.r+=4.2;w.alpha-=0.012;
  if(w.alpha<=0){waves.splice(i,1);continue;}
  for(const ring of[0,18,36]){
   ctx.beginPath();ctx.arc(w.x,w.y,w.r+ring,0,7);
   ctx.strokeStyle='rgba('+(ring===0?'34,211,238':ring===18?'139,92,246':'217,70,239')+','+(w.alpha*.8)+')';
   ctx.lineWidth=2;ctx.stroke();}
 }
 ctx.globalCompositeOperation='source-over';
 requestAnimationFrame(loop);}
loop();`,
});

// 6. Text wave letters
const textWave = doc({
  body: `<h3 class="t">Bouncy Letter Wave</h3><p class="s">Hover the word · per-letter spring stagger</p>
<div class="tw" id="tw">MOTIONVAULT</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.tw{display:flex;gap:2px;font-size:clamp(30px,6vw,56px);font-weight:800;letter-spacing:.04em;cursor:pointer}
.tw span{display:inline-block;background:linear-gradient(180deg,#fff,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent;
 transition:transform .5s cubic-bezier(.34,1.8,.64,1),color .3s}
.tw span:hover{transform:translateY(-18px) rotate(6deg) scale(1.15);color:var(--v2);-webkit-text-fill-color:var(--v2)}
.tw span.down{animation:twDown .6s cubic-bezier(.34,1.8,.64,1)}
@keyframes twDown{0%{transform:translateY(0)}45%{transform:translateY(16px) scaleY(.9)}100%{transform:translateY(0)}}`,
  js: `const tw=document.getElementById('tw');
tw.innerHTML=tw.textContent.split('').map(ch=>'<span>'+ch+'</span>').join('');
const letters=[...tw.querySelectorAll('span')];
let wave=0;
setInterval(()=>{letters.forEach((l,i)=>{l.classList.remove('down');void l.offsetWidth;
 setTimeout(()=>l.classList.add('down'),((i+wave)%letters.length)*70);});
 wave=(wave+3)%letters.length;},2600);`,
});

export const ANIMATION_ITEMS: Item[] = [
  {
    id: "ani-spring",
    slug: "spring-physics-ball-drop",
    category: "animations",
    title: "Spring Physics Ball Drop",
    summary: "Hand-rolled gravity + restitution spring: the ball bounces, squashes on impact and casts a scaling shadow.",
    author: "Anime.js style",
    tags: ["spring", "physics", "bounce", "squash"],
    tech: ["html", "css", "javascript"],
    stars: 7420,
    views: 39800,
    copies: 6100,
    featured: true,
    published: true,
    html: springBall,
    prompt: `Build a "Spring Physics Ball Drop" animation in pure HTML/CSS/JS (no libraries, hand-rolled physics): a 420×260px rounded stage with a violet gradient tint and a 4px gradient floor line at the bottom. A 54px radial-gradient glossy violet ball starts above the stage; each frame apply gravity 0.9 to velocity, integrate position; when the ball hits the floor (stage height - 60) reflect velocity with restitution -0.62, zeroing when |v|<1.4. On impact apply SQUASH & STRETCH: scaleX/scaleY from 2-squash/squash where squash depends on impact speed. A blurred elliptical shadow under the ball fades/scales with proximity to the floor. Clicking the stage re-launches the ball from the top with a small random initial velocity. Use requestAnimationFrame and transform-only updates (will-change). Title "Spring Physics Drop", hint "Click to re-launch". Dark #070711.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-07-07T10:00:00Z",
    updatedAt: "2026-08-21T10:00:00Z",
  },
  {
    id: "ani-drag",
    slug: "fling-snap-draggable-card",
    category: "animations",
    title: "Fling & Snap Draggable Card",
    summary: "Pointer-event dragging with velocity tracking, momentum fling, damping and a spring back to center.",
    author: "Anime.js style",
    tags: ["drag", "momentum", "spring", "pointer-events"],
    tech: ["html", "css", "javascript"],
    stars: 6180,
    views: 33400,
    copies: 5200,
    featured: false,
    published: true,
    html: dragCard,
    prompt: `Build a "Fling & Snap Draggable Card" in pure HTML/CSS/JS using Pointer Events: a 420×280px dashed drop zone with a subtle radial dot grid and touch-action:none. Inside, a 190px glass gradient card (grab cursor, grab-bar on top, title "Drag me ✦", helper text) absolutely centered via transform translate(-50%,-50%). On pointerdown: capture pointer, record start. On pointermove: accumulate delta into x/y and record per-event velocity vx/vy. On pointerup: release — the rAF loop then applies momentum (position += velocity), damping (velocity *= 0.92), and a SPRING back to center (x += (0-x)*0.08, same for y), snapping to 0 under 0.2. The card also rotates slightly by vx*0.06 for fling feel. All motion is transform-only with will-change. Title "Fling & Snap Draggable", hint "Drag the card · flick to fling · it springs home". Dark #070711.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-07-16T10:00:00Z",
    updatedAt: "2026-08-14T10:00:00Z",
  },
  {
    id: "ani-parallax",
    slug: "scroll-linked-parallax-layers",
    category: "animations",
    title: "Scroll-Linked Parallax Scene",
    summary: "A scrollable night scene where the moon, mountains and hills translate at 0.3×/0.6×/0.85× scroll speed.",
    author: "Anime.js style",
    tags: ["scroll", "parallax", "layers", "linked"],
    tech: ["html", "css", "javascript"],
    stars: 5930,
    views: 31200,
    copies: 4700,
    featured: false,
    published: true,
    html: scrollParallax,
    prompt: `Build a "Scroll-Linked Parallax" demo in pure HTML/CSS/JS (scroll-linked, NOT tweened): a 460×340px rounded panel with its own overflow-y scroll (styled thin violet scrollbar), tall content (~900px) containing three glass text blocks spaced 150px apart ("Layer 0.3× / The moon drifts slowest", "Layer 0.6× / Mid mountains glide behind", "Layer 1× / You are here"). The panel background is a night gradient #0b0a24→#1a0b2e. Three fixed scene layers inside: a glowing ✦ moon near top-right, far mountains built from a repeating conic-gradient jagged ridge near the bottom (indigo), and closer hills from overlapping radial-gradients in violet. On the panel's passive scroll event, JS translates each layer translateY(scrollTop * factor): moon 0.3×, mountains 0.6×, hills 0.85×, all transform-only with will-change. Title "Scroll-Linked Layers". Dark #070711.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-07-24T10:00:00Z",
    updatedAt: "2026-08-22T10:00:00Z",
  },
  {
    id: "ani-stagger",
    slug: "stagger-timeline-grid",
    category: "animations",
    title: "Stagger Timeline Grid",
    summary: "A 12-cell grid that springs in with an 80ms waterfall delay — the anime.js stagger() pattern in vanilla JS.",
    author: "Anime.js style",
    tags: ["stagger", "timeline", "grid", "entrance"],
    tech: ["html", "css", "javascript"],
    stars: 8040,
    views: 44600,
    copies: 7800,
    featured: true,
    published: true,
    html: stagger,
    prompt: `Build a "Stagger Timeline" demo (anime.js stagger() pattern in vanilla JS): a 4-column grid of 12 square glass cells (gradient violet→cyan tint, 14px radius) initially opacity:0, scale(.3), rotate(-12deg). On play(), JS iterates the cells and adds a .go class with setTimeout i*80ms (80ms waterfall); .go runs a 0.6s cubic-bezier(.34,1.56,.64,1) spring keyframe to opacity 1, scale(1), rotate(0). Force reflow (void offsetWidth) before re-adding the class so a "↻ Replay" button restarts cleanly. Title "Stagger Timeline", hint "Replays on click · 80ms waterfall with spring". Dark #070711. No libraries.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-25T10:00:00Z",
  },
  {
    id: "ani-wave",
    slug: "canvas-ripple-wave-field",
    category: "animations",
    title: "Ripple Wave Field (Canvas)",
    summary: "Click or hover to emit expanding triple-ring ripples in cyan/violet/fuchsia with additive blending.",
    author: "MotionVault",
    tags: ["canvas", "ripple", "wave", "particles", "interactive"],
    tech: ["html", "css", "javascript"],
    stars: 4670,
    views: 27900,
    copies: 4100,
    featured: false,
    published: true,
    html: waveRipple,
    prompt: `Build a "Ripple Wave Field" canvas animation in pure HTML/CSS/JS: a full-stage absolute canvas with crosshair cursor over a dark grid stage. Waves array; clicking the stage (coordinates relative to stage) or moving the mouse (throttled to one emit per 120ms) pushes {x,y,r:0,alpha:1}. The rAF loop clears, switches to globalCompositeOperation 'lighter' (additive glow), and for each wave draws THREE concentric stroked circles at radii r, r+18, r+36 in cyan rgba(34,211,238), violet rgba(139,92,246), fuchsia rgba(217,70,239), lineWidth 2, alpha = wave.alpha*0.8; each wave expands r+=4.2 and fades alpha-=0.012, spliced when invisible. An initial wave emits from center. Standard resize handling. Title "Ripple Wave Field", hint "Click / move to emit waves · additive glow". Dark #070711.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-06T10:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
  },
  {
    id: "ani-letters",
    slug: "bouncy-letter-wave",
    category: "animations",
    title: "Bouncy Letter Wave",
    summary: "The word MOTIONVAULT splits into per-letter spans that ride a looping spring wave and pop on hover.",
    author: "Anime.js style",
    tags: ["text", "letters", "wave", "stagger", "hover"],
    tech: ["html", "css", "javascript"],
    stars: 5510,
    views: 30700,
    copies: 5600,
    featured: false,
    published: true,
    html: textWave,
    prompt: `Build a "Bouncy Letter Wave" text effect in pure HTML/CSS/JS: on load, JS splits the headline "MOTIONVAULT" into individual <span> letters (flex row, small gap). Each letter has gradient-white→violet clipped text and a springy cubic-bezier(.34,1.8,.64,1) transition. HOVER on a letter: it jumps translateY(-18px), rotates 6deg, scales 1.15 and turns fuchsia (-webkit-text-fill-color override needed for gradient text). AUTOMATIC WAVE: every 2.6s a .down keyframe animation (translateY 0→16px with scaleY squash → back, 0.6s spring) sweeps across the letters with a 70ms per-letter stagger whose starting offset advances by 3 each cycle so the wave appears to travel. Title "Bouncy Letter Wave", hint "Hover the word · per-letter spring stagger". Dark #070711.`,
    sourceUrl: "https://animejs.com",
    createdAt: "2026-08-12T10:00:00Z",
    updatedAt: "2026-08-28T10:00:00Z",
  },
];

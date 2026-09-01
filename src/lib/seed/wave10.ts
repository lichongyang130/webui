import { Item } from "../types";
import { doc } from "./wrap";

// ================================================================ ANIMATION: 3D particle sphere planet
const particlePlanet = doc({
  kind: "page",
  body: `
<canvas id="pl"></canvas>
<div class="pl-hud">
  <h1>ORBITAL <span>VAULT</span></h1>
  <p>Drag to rotate the particle sphere</p>
</div>`,
  css: `
#pl{position:fixed;inset:0;width:100%;height:100%;cursor:grab}
#pl:active{cursor:grabbing}
.pl-hud{position:relative;z-index:2;display:grid;place-content:center;height:100vh;text-align:center;pointer-events:none}
.pl-hud h1{font-size:clamp(34px,6vw,72px);font-weight:900;letter-spacing:.04em}
.pl-hud h1 span{background:linear-gradient(100deg,var(--c1),var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent}
.pl-hud p{margin-top:12px;letter-spacing:.25em;text-transform:uppercase;font-size:12px;color:var(--dim)}
`,
  js: `
const cv=document.getElementById('pl'),ctx=cv.getContext('2d');
let W,H,dpr=Math.min(devicePixelRatio||1,2);
function rs(){W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px'}rs();addEventListener('resize',rs);
// fibonacci sphere points
const N=900,P=[];
for(let i=0;i<N;i++){const y=1-(i/(N-1))*2, r=Math.sqrt(1-y*y), th=i*2.39996;
 P.push({x:Math.cos(th)*r,y:y,z:Math.sin(th)*r,ph:Math.random()*Math.PI*2});}
let rx=-0.4,ry=0.6,vx=0,vy=0,dragging=false,px=0,py=0;
addEventListener('pointerdown',e=>{dragging=true;px=e.clientX;py=e.clientY});
addEventListener('pointerup',()=>dragging=false);
addEventListener('pointermove',e=>{if(!dragging)return;vx+=(e.clientX-px)*0.0022;vy+=(e.clientY-py)*0.0022;px=e.clientX;py=e.clientY});
function loop(){
  ctx.clearRect(0,0,W,H);
  if(!dragging){vx*=.95;vy*=.95;vx+=.0028;ry+=vx;rx+=vy;}else{ry+=vx;rx=Math.max(-1.4,Math.min(1.4,rx+vy));}
  const R=Math.min(W,H)*.22,cx=W/2,cy=H/2,t=performance.now()*.001;
  const proj=[];
  for(const p of P){
    let x=p.x,y=p.y,z=p.z;
    let y1=y*Math.cos(rx)-z*Math.sin(rx),z1=y*Math.sin(rx)+z*Math.cos(rx);
    let x1=x*Math.cos(ry)-z1*Math.sin(ry),z2=x*Math.sin(ry)+z1*Math.cos(ry);
    const s=1.1+z2*.25;
    proj.push({x:cx+x1*R*s,y:cy+y1*R*s,z:z2,s,ph:p.ph});
  }
  proj.sort((a,b)=>a.z-b.z);
  for(const q of proj){
    const a=0.25+(q.z+1.2)/2.4*.75;
    const hue=q.z>0?'103,232,249':q.z>-.4?'196,181,253':'139,92,246';
    ctx.fillStyle='rgba('+hue+','+a+')';
    const sz=2.2*q.s*dpr;
    ctx.beginPath();ctx.arc(q.x,q.y,sz,0,7);ctx.fill();
  }
  // orbit ring
  ctx.strokeStyle='rgba(217,70,239,.25)';ctx.lineWidth=1.4*dpr;
  ctx.beginPath();ctx.ellipse(cx,cy,R*1.5,R*.4,ry*.4,0,7);ctx.stroke();
  requestAnimationFrame(loop);
}
loop();
`,
});

// ================================================================ COMPONENT: Perspective 3D card wall
const cardWall = doc({
  body: `
<div class="cw-stage">
  <div class="cw-wall" id="wall">
    ${Array.from({ length: 15 }, (_, i) =>
      i % 4 === 3
        ? `<div class="cw-tile cw-glow">✦</div>`
        : `<div class="cw-tile"><b>${String(i + 1).padStart(2, "0")}</b><span>${["motion","react","ui","glow"][i % 4]}</span></div>`
    ).join("")}
  </div>
</div>`,
  css: `
.cw-stage{perspective:1300px;display:grid;place-items:center;min-height:70vh;padding:20px}
.cw-wall{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;width:min(760px,92vw);transform-style:preserve-3d;transition:transform .3s ease-out;transform:rotateX(8deg)}
.cw-tile{aspect-ratio:4/5;border:1px solid var(--line);border-radius:16px;background:linear-gradient(160deg,rgba(139,92,246,.14),rgba(10,10,25,.9));display:flex;flex-direction:column;justify-content:flex-end;padding:14px;transform:translateZ(0);transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .35s}
.cw-tile b{font-size:20px;font-weight:900;font-family:var(--font-mono,monospace)}
.cw-tile span{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.cw-tile:hover{transform:translateZ(46px);border-color:rgba(34,211,238,.6);box-shadow:0 30px 60px -20px rgba(34,211,238,.5)}
.cw-glow{display:grid;place-items:center;font-size:30px;background:linear-gradient(160deg,rgba(217,70,239,.3),rgba(10,10,25,.9));border-color:rgba(217,70,239,.5)}
.cw-glow:hover{box-shadow:0 30px 60px -20px rgba(217,70,239,.7)}
`,
  js: `
const wall=document.getElementById('wall');
addEventListener('pointermove',e=>{
  const rx=8+(0.5-e.clientY/innerHeight)*-10, ry=(e.clientX/innerWidth-0.5)*14;
  wall.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
});
`,
});

// ================================================================ COMPONENT: Flip card reveal
const flipCard = doc({
  body: `
<div class="fc-row">
  ${[
    ["HOVER", "The flip uses transform-style: preserve-3d and backface-visibility.", "◆"],
    ["3D", "Two faces rotated on Y; the back waits at rotateY(180deg).", "◈"],
    ["TILT", "Springy cubic-bezier on the whole .6s turn.", "✦"],
  ]
    .map(
      ([t, d, g]) => `<div class="fc"><div class="fc-inner">
      <div class="fc-face fc-front"><span>${g}</span><b>${t}</b></div>
      <div class="fc-face fc-back"><p>${d}</p></div>
    </div></div>`
    )
    .join("")}
</div>`,
  css: `
.fc-row{display:flex;gap:22px;flex-wrap:wrap;justify-content:center}
.fc{width:210px;height:270px;perspective:1100px}
.fc-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .65s cubic-bezier(.34,1.3,.5,1)}
.fc:hover .fc-inner{transform:rotateY(180deg)}
.fc-face{position:absolute;inset:0;border-radius:20px;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;border:1px solid var(--line)}
.fc-front{background:linear-gradient(160deg,rgba(139,92,246,.22),rgba(10,10,25,.95))}
.fc-front span{font-size:44px;color:var(--c1);text-shadow:0 0 24px rgba(34,211,238,.6)}
.fc-front b{font-size:26px;letter-spacing:.1em;font-weight:900}
.fc-back{transform:rotateY(180deg);background:linear-gradient(160deg,rgba(217,70,239,.25),rgba(10,10,25,.95));border-color:rgba(217,70,239,.4)}
.fc-back p{font-size:14px;line-height:1.7;color:rgba(236,234,249,.85)}
`,
});

// ================================================================ COMPONENT: Drag-to-snap carousel
const dragCarousel = doc({
  body: `
<div class="dc-track" id="track">
  ${["Aurora", "Matrix", "Orbit", "Glitch", "Pulse", "Neon"]
    .map(
      (l, i) => `<div class="dc-card" style="--g:${[
        "linear-gradient(135deg,#7c3aed,#d946ef)",
        "linear-gradient(135deg,#0891b2,#22d3ee)",
        "linear-gradient(135deg,#f97316,#ec4899)",
        "linear-gradient(135deg,#1e1b4b,#7c3aed)",
        "linear-gradient(135deg,#d946ef,#22d3ee)",
        "linear-gradient(135deg,#059669,#22d3ee)",
      ][i]}"><b>${l}</b><span>0${i + 1}</span></div>`
    )
    .join("")}
</div>
<p class="dc-hint">Drag or use ← → keys</p>`,
  css: `
.dc-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding:30px 12vw;scrollbar-width:none;cursor:grab}
.dc-track::-webkit-scrollbar{display:none}
.dc-track.dragging{cursor:grabbing;scroll-snap-type:none}
.dc-card{scroll-snap-align:center;flex:0 0 min(320px,70vw);aspect-ratio:4/3;border-radius:24px;background:var(--g);display:flex;flex-direction:column;justify-content:space-between;padding:26px;box-shadow:0 30px 70px -30px rgba(0,0,0,.8);user-select:none;transition:transform .3s}
.dc-card:hover{transform:scale(1.03)}
.dc-card b{font-size:32px;font-weight:900;letter-spacing:.02em}
.dc-card span{font-family:var(--font-mono,monospace);opacity:.7}
.dc-hint{text-align:center;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim);margin-top:10px}
`,
  js: `
const track=document.getElementById('track');
let down=false,sx=0,sl=0;
track.addEventListener('pointerdown',e=>{down=true;track.classList.add('dragging');sx=e.clientX;sl=track.scrollLeft;track.setPointerCapture(e.pointerId)});
track.addEventListener('pointermove',e=>{if(down)track.scrollLeft=sl-(e.clientX-sx)});
track.addEventListener('pointerup',()=>{down=false;track.classList.remove('dragging')});
addEventListener('keydown',e=>{
  const w=track.querySelector('.dc-card').offsetWidth+20;
  if(e.key==='ArrowRight')track.scrollBy({left:w,behavior:'smooth'});
  if(e.key==='ArrowLeft')track.scrollBy({left:-w,behavior:'smooth'});
});
`,
});

// ================================================================ ANIMATION: Particle progress ring loader
const ringLoader = doc({
  body: `
<canvas id="rl" width="320" height="320"></canvas>
<p class="rl-hint">Particles flow along the ring</p>`,
  css: `
body{display:grid;place-content:center;min-height:100vh}
#rl{width:min(70vw,320px)}
.rl-hint{text-align:center;margin-top:24px;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim)}
`,
  js: `
const cv=document.getElementById('rl'),ctx=cv.getContext('2d');
const cx=160,cy=160,R=110,N=60,parts=[];
for(let i=0;i<N;i++)parts.push({a:i/N*Math.PI*2,sp:.006+Math.random()*.01,sz:1+Math.random()*2.5,tr:i/N});
let t=0;
function loop(){
  t+=.01;
  ctx.clearRect(0,0,320,320);
  ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=6;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();
  const prog=(Math.sin(t*.35)+1)/2;
  ctx.strokeStyle='rgba(139,92,246,.5)';ctx.lineWidth=6;ctx.lineCap='round';
  ctx.beginPath();ctx.arc(cx,cy,R,-Math.PI/2,-Math.PI/2+prog*Math.PI*2);ctx.stroke();
  for(const p of parts){
    p.a+=p.sp;
    const fill=p.tr<prog?1:.25;
    const x=cx+Math.cos(p.a)*R,y=cy+Math.sin(p.a)*R;
    ctx.fillStyle=p.tr<prog?'rgba(34,211,238,'+fill+')':'rgba(255,255,255,'+fill+')';
    ctx.shadowBlur=p.tr<prog?10:0;ctx.shadowColor='#22d3ee';
    ctx.beginPath();ctx.arc(x,y,p.sz,0,7);ctx.fill();ctx.shadowBlur=0;
  }
  ctx.fillStyle='#fff';ctx.font='800 34px Inter,sans-serif';ctx.textAlign='center';
  ctx.fillText(Math.round(prog*100)+'%',cx,cy+12);
  requestAnimationFrame(loop);
}
loop();
`,
});

// ================================================================ ANIMATION: Multi-ripple interference field
const rippleField = doc({
  body: `
<canvas id="rf"></canvas>
<p class="rf-hint">Click anywhere — ripples interfere</p>`,
  css: `
#rf{position:fixed;inset:0;width:100%;height:100%}
.rf-hint{position:fixed;bottom:26px;left:0;right:0;text-align:center;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim);pointer-events:none}
`,
  js: `
const cv=document.getElementById('rf'),ctx=cv.getContext('2d');
let W,H;function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
const waves=[];
function spawn(x,y,hue){waves.push({x,y,r:0,max:Math.max(W,H),hue})}
spawn(W/2,H/2,280);setInterval(()=>{if(waves.length<6)spawn(Math.random()*W,Math.random()*H,180+Math.random()*140)},2600);
addEventListener('pointerdown',e=>spawn(e.clientX,e.clientY,300+Math.random()*60));
function loop(){
  ctx.fillStyle='rgba(7,7,17,.14)';ctx.fillRect(0,0,W,H);
  for(let i=waves.length-1;i>=0;i--){
    const w=waves[i];w.r+=5;
    const alpha=Math.max(0,0.5-w.r/w.max*.5);
    for(const rr of [w.r,w.r-14,w.r-28]){
      if(rr<0)continue;
      ctx.strokeStyle='hsla('+w.hue+',85%,65%,'+alpha*(rr===w.r?1:.4)+')';
      ctx.lineWidth=rr===w.r?2:1;ctx.beginPath();ctx.arc(w.x,w.y,rr,0,7);ctx.stroke();
    }
    if(w.r>w.max)waves.splice(i,1);
  }
  requestAnimationFrame(loop);
}
loop();
`,
});

export const WAVE10_ITEMS: Item[] = [
  {
    id: "w10-planet",
    slug: "particle-sphere-planet",
    category: "animations",
    title: "Particle Sphere Planet",
    summary: "900 points arranged on a fibonacci sphere, projected in 3D with depth shading — drag to spin, auto-orbits when idle.",
    author: "MotionVault",
    tags: ["particles", "3d", "sphere", "canvas", "space", "orbit"],
    tech: ["html", "css", "javascript"],
    stars: 489,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: particlePlanet,
    prompt:
      "Build a full-screen 3D particle sphere on canvas: 900 particles distributed via a fibonacci spiral (golden angle 2.39996) on a unit sphere, each frame rotated around X/Y and projected to 2D with perspective scaling (closer particles bigger/brighter, colored cyan front → violet back, depth-sorted). Idle auto-rotation around Y; pointer drag adds angular velocity with damping when released. Include a faint elliptical orbit ring drawn in fuchsia and centered gradient headline text above (pointer-events none so drag works everywhere). requestAnimationFrame, DPR-aware resize, no libraries.",
    status: "curated",
    createdAt: "2026-09-01T13:00:00.000Z",
    updatedAt: "2026-09-01T13:00:00.000Z",
  },
  {
    id: "w10-wall",
    slug: "perspective-3d-card-wall",
    category: "components",
    title: "Perspective 3D Card Wall",
    summary: "A tilted grid wall of tiles that lean toward your mouse and pop out toward the viewer on hover with glow.",
    author: "MotionVault",
    tags: ["3d", "cards", "wall", "perspective", "hover"],
    tech: ["html", "css", "javascript"],
    stars: 376,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: cardWall,
    prompt:
      "Create a perspective 3D wall of 15 tiles (5x3 grid). The wall sits in a perspective(1300px) stage, slightly tilted on rotateX; a pointermove handler rotates the whole wall to lean toward the cursor (rotateX/rotateY derived from normalized mouse, smooth CSS transition). Individual tiles are gradient glass panels with monospace numbers and tiny labels; on hover a tile translates 46px on Z with a cyan glow shadow and bright border. Every fourth tile is a sparkle accent tile in fuchsia. Preserve-3d throughout, springy easing.",
    status: "curated",
    createdAt: "2026-09-01T13:05:00.000Z",
    updatedAt: "2026-09-01T13:05:00.000Z",
  },
  {
    id: "w10-flip",
    slug: "3d-flip-card-reveal",
    category: "components",
    title: "3D Flip Card Reveal",
    summary: "Three cards that rotate on the Y axis on hover — front face has a glyph, back face carries the details.",
    author: "MotionVault",
    tags: ["3d", "flip", "card", "hover", "reveal"],
    tech: ["html", "css"],
    stars: 318,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: flipCard,
    prompt:
      "Build three 3D flip cards in a row. Each card has preserve-3d inner that rotates to rotateY(180deg) on hover with a springy cubic-bezier(.34,1.3,.5,1) over .65s; front and back faces use backface-visibility:hidden, the back pre-rotated 180deg. Front: gradient violet panel with a glowing glyph and big uppercase label. Back: fuchsia-tinted gradient with explanatory copy. Rounded 20px, thin borders, wrap on small screens. Pure CSS.",
    status: "curated",
    createdAt: "2026-09-01T13:10:00.000Z",
    updatedAt: "2026-09-01T13:10:00.000Z",
  },
  {
    id: "w10-carousel",
    slug: "drag-snap-carousel",
    category: "components",
    title: "Drag-to-Snap Carousel",
    summary: "Pointer-dragable card rail with scroll-snap, hidden scrollbar, scale-on-hover and arrow-key navigation.",
    author: "MotionVault",
    tags: ["carousel", "drag", "scroll-snap", "gallery", "touch"],
    tech: ["html", "css", "javascript"],
    stars: 297,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: dragCarousel,
    prompt:
      "Build a draggable horizontal carousel: a flex track with scroll-snap-type x mandatory, each gradient card scroll-snap-align center, hidden scrollbars, grab cursor. Pointer events drive manual scrollLeft during drag (with pointer capture; snap disabled while dragging via a class), arrow keys scrollBy one card smoothly. Cards show a name and index, scale 1.03 on hover, big rounded corners with heavy shadows. Works with touch natively. Vanilla JS only.",
    status: "curated",
    createdAt: "2026-09-01T13:15:00.000Z",
    updatedAt: "2026-09-01T13:15:00.000Z",
  },
  {
    id: "w10-ring",
    slug: "particle-progress-ring-loader",
    category: "animations",
    title: "Particle Progress Ring Loader",
    summary: "A ring of 60 particles flowing around a track that fills with a breathing percentage readout.",
    author: "MotionVault",
    tags: ["loader", "progress", "particles", "ring", "canvas"],
    tech: ["html", "css", "javascript"],
    stars: 263,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: ringLoader,
    prompt:
      "Create an animated particle ring loader on canvas: a dim base circle track, an oscillating arc (sine-driven 0..1 progress) drawn in translucent violet, and 60 particles evenly distributed around the ring, each orbiting at slightly different speeds; particles behind the current progress glow cyan with shadow blur, particles ahead are faint dots. Center shows the integer percent in heavy Inter font. Continuous loop, no libraries.",
    status: "curated",
    createdAt: "2026-09-01T13:20:00.000Z",
    updatedAt: "2026-09-01T13:20:00.000Z",
  },
  {
    id: "w10-ripple",
    slug: "ripple-interference-field",
    category: "animations",
    title: "Ripple Interference Field",
    summary: "Full-screen canvas where clicks spawn triple-ring wavefronts that decay; ambient waves spawn automatically.",
    author: "MotionVault",
    tags: ["ripple", "canvas", "waves", "click", "interference"],
    tech: ["html", "css", "javascript"],
    stars: 244,
    views: 0,
    copies: 0,
    featured: false,
    published: true,
    html: rippleField,
    prompt:
      "Build a full-screen interactive ripple field. Dark canvas with a faint fade-to-trail effect each frame (semi-transparent fill). Waves are expanding circles spawned at click points with randomized hues, each drawn as three concentric rings (bright + two fainter lagging rings), radius growing per frame, alpha fading proportionally to max radius, removed when off-screen. Ambient waves auto-spawn at random positions every ~2.6s up to a cap. requestAnimationFrame loop with resize handling, no libraries.",
    status: "curated",
    createdAt: "2026-09-01T13:25:00.000Z",
    updatedAt: "2026-09-01T13:25:00.000Z",
  },
];

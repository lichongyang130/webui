import { Item } from "../types";
import { doc } from "./wrap";

// 1. Circular gallery
const circularGallery = doc({
  body: `<h3 class="t">Circular Gallery</h3><p class="s">Drag-free auto-rotating ring · hover to pause</p>
<div class="ring-stage"><div class="ring" id="ring">
  ${["Nebula","Orbit","Pulsar","Comet","Quasar","Vega","Lyra","Cosmo"].map((n,i)=>`<div class="chip" style="--i:${i}"><span>${n}</span></div>`).join("")}
</div><div class="hub">✦</div></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.ring-stage{position:relative;width:340px;height:340px;margin:10px auto;perspective:900px}
.ring{position:absolute;inset:0;transform-style:preserve-3d;animation:spinRing 22s linear infinite}
.ring-stage:hover .ring{animation-play-state:paused}
@keyframes spinRing{from{transform:rotateY(0) rotateX(-8deg)}to{transform:rotateY(-360deg) rotateX(-8deg)}}
.chip{position:absolute;top:50%;left:50%;width:96px;height:64px;margin:-32px 0 0 -48px;
 transform:rotateY(calc(var(--i)*45deg)) translateZ(150px);
 background:linear-gradient(150deg,rgba(139,92,246,.25),rgba(34,211,238,.1));
 border:1px solid rgba(255,255,255,.15);border-radius:16px;display:grid;place-items:center;
 font-weight:700;font-size:14px;backface-visibility:hidden;transition:border-color .3s}
.chip:hover{border-color:var(--v2)}
.hub{position:absolute;inset:0;display:grid;place-items:center;font-size:34px;color:var(--v2);
 filter:drop-shadow(0 0 18px rgba(217,70,239,.8));animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{50%{transform:scale(1.15);opacity:.75}}`,
  js: ``,
});

// 2. Glow card
const glowCard = doc({
  body: `<h3 class="t">Spotlight Glow Card</h3><p class="s">Move your cursor across the card</p>
<div class="gc" id="gc"><div class="gc-glow" id="glow"></div>
 <div class="gc-ic">✦</div><h4>Premium motion kit</h4>
 <p>400+ animated components, ready to paste. The glow follows your pointer with border lighting.</p>
 <div class="gc-btn">Explore →</div></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.gc{position:relative;width:min(380px,90vw);border-radius:22px;padding:34px;background:rgba(255,255,255,.04);
 border:1px solid rgba(255,255,255,.1);overflow:hidden;cursor:default;transition:transform .3s cubic-bezier(.22,1,.36,1)}
.gc:hover{transform:translateY(-4px)}
.gc-glow{position:absolute;width:340px;height:340px;border-radius:50%;pointer-events:none;opacity:0;transition:opacity .3s;
 background:radial-gradient(circle,rgba(139,92,246,.28),rgba(217,70,239,.12) 40%,transparent 70%);transform:translate(-50%,-50%)}
.gc:hover .gc-glow{opacity:1}
.gc::after{content:'';position:absolute;inset:0;border-radius:22px;padding:1px;pointer-events:none;
 background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(217,70,239,.9),transparent 65%);
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.gc-ic{font-size:30px;margin-bottom:16px}
.gc h4{font-size:21px;margin-bottom:10px}
.gc p{color:var(--dim);font-size:14px;line-height:1.7;margin-bottom:22px}
.gc-btn{display:inline-block;background:linear-gradient(120deg,var(--v1),var(--v2));padding:11px 22px;border-radius:12px;font-weight:600;font-size:14px}`,
  js: `const gc=document.getElementById('gc'),glow=document.getElementById('glow');
gc.addEventListener('mousemove',e=>{const r=gc.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;
 gc.style.setProperty('--mx',x+'px');gc.style.setProperty('--my',y+'px');
 glow.style.left=x+'px';glow.style.top=y+'px';});`,
});

// 3. Magnetic button
const magnetic = doc({
  body: `<h3 class="t">Magnetic Button</h3><p class="s">The button leans toward your cursor</p>
<button class="mag" id="mag"><span class="mag-l">Hover me</span></button>
<button class="mag mag-2" id="mag2"><span>◉ Subscribe</span></button>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.mag{position:relative;padding:18px 38px;border-radius:999px;font-size:16px;font-weight:700;color:#fff;
 background:linear-gradient(120deg,var(--v1),var(--v2));box-shadow:0 14px 40px -12px rgba(217,70,239,.75);
 transition:transform .18s ease-out,box-shadow .3s;will-change:transform}
.mag:hover{box-shadow:0 20px 55px -12px rgba(217,70,239,.95)}
.mag span{display:inline-block;transition:transform .18s ease-out}
.mag-2{background:rgba(255,255,255,.06);border:1px solid var(--line);box-shadow:none;color:var(--txt)}
.mag-2:hover{border-color:var(--v1);box-shadow:0 14px 40px -16px rgba(139,92,246,.7)}`,
  js: `document.querySelectorAll('.mag').forEach(btn=>{
 const label=btn.querySelector('span');
 btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();
  const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
  btn.style.transform='translate('+dx*.35+'px,'+dy*.45+'px)';
  label.style.transform='translate('+dx*.18+'px,'+dy*.22+'px)';});
 btn.addEventListener('mouseleave',()=>{btn.style.transform='';label.style.transform='';});});`,
});

// 4. Text scramble
const scramble = doc({
  body: `<h3 class="t">Text Scramble Decode</h3><p class="s">Hover to re-decode · cycles automatically</p>
<div class="scr" id="scr">MOTION VAULT</div>
<div class="scr-sub" id="scrSub">treasure for builders</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.scr{font-size:clamp(30px,6vw,52px);font-weight:800;letter-spacing:.12em;
 background:linear-gradient(100deg,var(--v1),var(--v2) 55%,var(--c1));
 -webkit-background-clip:text;background-clip:text;color:transparent;cursor:pointer;min-height:1.3em}
.scr-sub{color:var(--dim);font-size:14px;letter-spacing:.3em;text-transform:uppercase;min-height:1.4em;margin-top:6px}`,
  js: `const CHARS='!<>-_\\/[]{}—=+*^?#@%&$ABCDEFGHJKLMNPQRSTUVWXYZ';
class Scramble{constructor(el,text){this.el=el;this.text=text;this.frame=0;this.run();}
 run(){this.frame=0;clearInterval(this.t);this.t=setInterval(()=>this.tick(),34);}
 tick(){this.frame++;const out=this.text.split('').map((ch,i)=>{
   if(ch===' ')return ' ';
   if(i<this.frame/2)return ch;
   return CHARS[Math.floor(Math.random()*CHARS.length)];}).join('');
  this.el.textContent=out;
  if(this.frame>=this.text.length*2)clearInterval(this.t);}}
const s1=new Scramble(document.getElementById('scr'),'MOTION VAULT');
const s2=new Scramble(document.getElementById('scrSub'),'treasure for builders');
document.getElementById('scr').addEventListener('mouseenter',()=>{s1.run();s2.run();});
setInterval(()=>{s1.run();s2.run();},4200);`,
});

// 5. Tilt 3D card
const tiltCard = doc({
  body: `<h3 class="t">3D Tilt Perspective Card</h3><p class="s">Move your mouse over the card</p>
<div class="tilt-stage"><div class="tilt" id="tilt">
 <div class="tilt-shine"></div><div class="tilt-badge">PRO</div>
 <h4>Stellar Plan</h4><p class="tilt-price"><b>$29</b>/mo</p>
 <ul><li>✓ Unlimited previews</li><li>✓ AI prompt export</li><li>✓ Team workspaces</li></ul>
 <div class="tilt-btn">Get started</div></div></div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.tilt-stage{perspective:1000px;width:min(300px,90vw)}
.tilt{position:relative;border-radius:24px;padding:32px 28px;transform-style:preserve-3d;
 background:linear-gradient(160deg,rgba(139,92,246,.22),rgba(20,16,44,.9));
 border:1px solid rgba(255,255,255,.14);box-shadow:0 30px 70px -30px rgba(0,0,0,.8);
 transition:transform .12s ease-out;overflow:hidden}
.tilt-shine{position:absolute;inset:0;pointer-events:none;
 background:radial-gradient(420px circle at var(--tx,50%) var(--ty,50%),rgba(255,255,255,.14),transparent 55%)}
.tilt-badge{position:absolute;top:18px;right:18px;font-size:11px;font-weight:800;letter-spacing:.15em;
 background:linear-gradient(120deg,var(--v2),var(--v1));padding:5px 12px;border-radius:999px;transform:translateZ(40px)}
.tilt h4{font-size:22px;transform:translateZ(34px)}
.tilt-price{margin:14px 0 20px;color:var(--dim);transform:translateZ(28px)}
.tilt-price b{font-size:40px;color:var(--txt)}
.tilt ul{list-style:none;display:flex;flex-direction:column;gap:12px;color:var(--dim);font-size:14px;margin-bottom:26px;transform:translateZ(22px)}
.tilt-btn{text-align:center;background:linear-gradient(120deg,var(--v1),var(--v2));padding:13px;border-radius:12px;font-weight:700;font-size:14.5px;transform:translateZ(38px)}`,
  js: `const t=document.getElementById('tilt');
t.addEventListener('mousemove',e=>{const r=t.getBoundingClientRect();
 const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
 t.style.transform='rotateY('+((px-.5)*16)+'deg) rotateX('+((.5-py)*16)+'deg) scale(1.03)';
 t.style.setProperty('--tx',px*100+'%');t.style.setProperty('--ty',py*100+'%');});
t.addEventListener('mouseleave',()=>t.style.transform='rotateY(0) rotateX(0) scale(1)');`,
});

// 6. Marquee
const marquee = doc({
  body: `<h3 class="t">Infinite Logo Marquee</h3><p class="s">Seamless CSS loop · pauses on hover</p>
<div class="mq"><div class="mq-track">
 ${[...Array(2)].map(()=>["NEBULA","◈ ORBITAL","✦ PULSAR","QUANTUM","➤ VELOCITY","✺ HELIX","▲ VERTEX","✧ STELLAR"].map(n=>`<span>${n}</span>`).join("")).join("")}
</div></div>
<div class="mq mq-rev"><div class="mq-track rev">
 ${[...Array(2)].map(()=>["DESIGN","MOTION","CODE","PROMPT","SHIP","ITERATE"].map(n=>`<span>${n} ✦</span>`).join("")).join("")}
</div></div>`,
  css: `.t{font-size:20px;font-weight:700;text-align:center}.s{color:var(--dim);font-size:13px;margin-top:-10px;text-align:center}
.mq{overflow:hidden;margin:14px 0;position:relative;-webkit-mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
 mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.mq-track{display:flex;gap:14px;width:max-content;animation:mq 26s linear infinite}
.mq-track.rev{animation:mqrev 22s linear infinite}
.mq:hover .mq-track{animation-play-state:paused}
@keyframes mq{to{transform:translateX(-50%)}}
@keyframes mqrev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
.mq-track span{white-space:nowrap;border:1px solid var(--line);background:rgba(255,255,255,.04);
 padding:12px 26px;border-radius:14px;font-weight:700;font-size:15px;letter-spacing:.08em;color:var(--dim);transition:all .3s}
.mq-track span:hover{color:var(--txt);border-color:rgba(139,92,246,.5);transform:translateY(-2px)}`,
  js: ``,
});

// 7. Starfield background component (mini)
const starBg = doc({
  body: `<canvas id="sb" style="position:absolute;inset:0;width:100%;height:100%"></canvas>
 <div style="position:relative;z-index:1;text-align:center"><h3 class="t">Shooting-Star Background</h3>
 <p class="s">Canvas nebula with periodic shooting stars</p>
 <div class="sb-pill">✦ Drop this behind any hero</div></div>`,
  css: `.demo-inner{min-height:420px}.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin:8px 0 22px}
.sb-pill{display:inline-block;border:1px solid rgba(139,92,246,.4);background:rgba(139,92,246,.12);
 padding:10px 20px;border-radius:999px;font-size:13px;font-weight:600;color:#c4b5fd}`,
  js: `const stage=document.querySelector('.demo-stage');const cv=document.getElementById('sb');const ctx=cv.getContext('2d');
function rs(){cv.width=stage.clientWidth;cv.height=stage.clientHeight;}rs();addEventListener('resize',rs);
const stars=Array.from({length:160},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.3,tw:Math.random()*6.28,sp:Math.random()*.03+.008}));
let meteors=[];
function spawn(){meteors.push({x:Math.random()*cv.width*.8+cv.width*.2,y:-20,len:Math.random()*90+60,sp:Math.random()*6+6,life:1});}
setInterval(spawn,2600);
function loop(){ctx.clearRect(0,0,cv.width,cv.height);
 for(const s of stars){s.tw+=s.sp;const a=.3+Math.abs(Math.sin(s.tw))*.7;
  ctx.beginPath();ctx.arc(s.x*cv.width,s.y*cv.height,s.r,0,7);ctx.fillStyle='rgba(220,220,255,'+a+')';ctx.fill();}
 meteors=meteors.filter(m=>m.life>0);
 for(const m of meteors){m.x-=m.sp;m.y+=m.sp*.6;m.life-=.012;
  const g=ctx.createLinearGradient(m.x,m.y,m.x+m.len*.6,m.y-m.len*.35);
  g.addColorStop(0,'rgba(255,255,255,'+m.life+')');g.addColorStop(1,'rgba(139,92,246,0)');
  ctx.strokeStyle=g;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(m.x+m.len*.6,m.y-m.len*.35);ctx.stroke();}
 requestAnimationFrame(loop);}
loop();`,
});

// 8. Counter animation
const counter = doc({
  body: `<h3 class="t">Count-Up Stats</h3><p class="s">Numbers spring into place on view</p>
<div class="ct-row">
 <div class="ct"><b id="c1">0</b><span>Components</span></div>
 <div class="ct"><b id="c2">0</b><span>GitHub stars</span></div>
 <div class="ct"><b id="c3">0</b><span>Copies made</span></div>
</div>`,
  css: `.t{font-size:20px;font-weight:700}.s{color:var(--dim);font-size:13px;margin-top:-10px}
.ct-row{display:flex;gap:18px;flex-wrap:wrap;justify-content:center}
.ct{border:1px solid var(--line);background:var(--panel);border-radius:18px;padding:26px 30px;min-width:150px;text-align:center;transition:all .3s}
.ct:hover{transform:translateY(-5px);border-color:rgba(34,211,238,.5)}
.ct b{display:block;font-size:38px;font-weight:800;background:linear-gradient(120deg,var(--c1),var(--v1));-webkit-background-clip:text;background-clip:text;color:transparent}
.ct b::after{content:'+';color:var(--v2);-webkit-text-fill-color:var(--v2)}
.ct span{font-size:12.5px;color:var(--dim);letter-spacing:.08em;text-transform:uppercase}`,
  js: `function countUp(el,target,dur){const start=performance.now();
 function frame(now){const p=Math.min((now-start)/dur,1);const e=1-Math.pow(1-p,3);
  el.textContent=Math.floor(target*e).toLocaleString();
  if(p<1)requestAnimationFrame(frame);}
 requestAnimationFrame(frame);}
setTimeout(()=>{countUp(document.getElementById('c1'),480,1400);
 countUp(document.getElementById('c2'),72000,1800);countUp(document.getElementById('c3'),128000,2200);},250);`,
});

export const COMPONENT_ITEMS: Item[] = [
  {
    id: "cmp-gallery",
    slug: "circular-3d-gallery",
    category: "components",
    title: "Circular 3D Gallery Ring",
    summary: "Eight items orbit on a 3D ring that auto-rotates with perspective, pauses on hover, with a pulsing hub.",
    author: "React Bits style",
    tags: ["3d", "gallery", "carousel", "perspective", "ring"],
    tech: ["html", "css", "javascript"],
    stars: 9210,
    views: 61200,
    copies: 8800,
    featured: true,
    published: true,
    html: circularGallery,
    prompt: `Build a "Circular 3D Gallery" component in pure HTML/CSS/JS: a 340px stage with perspective:900px containing a .ring that uses transform-style:preserve-3d and animates rotateY(0→-360deg) with a fixed rotateX(-8deg) tilt over 22s linear infinite, pausing on hover. Eight .chip items (Nebula, Orbit, Pulsar, Comet, Quasar, Vega, Lyra, Cosmo) are absolutely centered and each placed with transform: rotateY(calc(var(--i)*45deg)) translateZ(150px), backface-visibility:hidden; chips are 96×64 glass panels (violet→cyan gradient tint, 1px white-15% border, 16px radius) with a fuchsia border on hover. A centered pulsing "✦" hub sits in the middle with a fuchsia glow (drop-shadow, scale pulse 2.4s). Title "Circular Gallery" and hint "Drag-free auto-rotating ring · hover to pause". Dark #070711 background. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-07-05T10:00:00Z",
    updatedAt: "2026-08-25T10:00:00Z",
  },
  {
    id: "cmp-glowcard",
    slug: "spotlight-glow-card",
    category: "components",
    title: "Spotlight Glow Card",
    summary: "Card with a radial glow that tracks the cursor plus a 1px gradient border-light that follows the pointer.",
    author: "Aceternity style",
    tags: ["card", "spotlight", "glow", "hover", "border"],
    tech: ["html", "css", "javascript"],
    stars: 11800,
    views: 78400,
    copies: 12400,
    featured: true,
    published: true,
    html: glowCard,
    prompt: `Build a "Spotlight Glow Card" (Aceternity-UI style) in pure HTML/CSS/JS: a 380px rounded-22px glass card (white 4% bg, 1px white-10% border, padding 34px) that lifts -4px on hover. TWO cursor-following effects: (1) a 340px radial-gradient glow layer (violet 28% → fuchsia 12% → transparent) positioned at cursor via JS setting left/top, fading opacity 0→1 on hover; (2) a 1px GRADIENT BORDER LIGHT following the pointer: an ::after overlay with padding:1px and a radial-gradient(220px circle at var(--mx) var(--my), fuchsia 90%, transparent 65%), masked with the two-layer linear-gradient mask + mask-composite:exclude trick so only the border ring shows. JS updates --mx/--my custom properties from mousemove relative to the card. Content: "✦" icon, h4 "Premium motion kit", paragraph "400+ animated components, ready to paste...", gradient pill button "Explore →". Dark #070711. No libraries.`,
    sourceUrl: "https://ui.aceternity.com",
    createdAt: "2026-07-09T10:00:00Z",
    updatedAt: "2026-08-26T10:00:00Z",
  },
  {
    id: "cmp-magnetic",
    slug: "magnetic-button",
    category: "components",
    title: "Magnetic Button Duo",
    summary: "Buttons and their labels lean toward the cursor with different strength factors, then spring back on leave.",
    author: "React Bits style",
    tags: ["button", "magnetic", "hover", "micro-interaction"],
    tech: ["html", "css", "javascript"],
    stars: 7600,
    views: 42900,
    copies: 9100,
    featured: false,
    published: true,
    html: magnetic,
    prompt: `Build a "Magnetic Button" component in pure HTML/CSS/JS: two pill buttons — a primary gradient (violet→fuchsia, white text, big fuchsia drop-shadow) labeled "Hover me", and a ghost glass variant labeled "◉ Subscribe". On mousemove over each button, JS computes the offset from cursor to button center and translates the button by dx*0.35, dy*0.45 and the inner <span> label by dx*0.18, dy*0.22 (label moves slightly less for parallax depth), using 0.18s ease-out transitions; on mouseleave both transforms reset to empty. Buttons have enhanced glow shadows on hover. Show title "Magnetic Button" and hint "The button leans toward your cursor". Dark #070711 background. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-07-12T10:00:00Z",
    updatedAt: "2026-08-19T10:00:00Z",
  },
  {
    id: "cmp-scramble",
    slug: "text-scramble-decode",
    category: "components",
    title: "Text Scramble Decode Effect",
    summary: "Matrix-style glyph scramble that resolves into the target string, re-triggered on hover and on a timer.",
    author: "React Bits style",
    tags: ["text", "scramble", "decode", "matrix", "typewriter"],
    tech: ["html", "css", "javascript"],
    stars: 6840,
    views: 39100,
    copies: 7200,
    featured: false,
    published: true,
    html: scramble,
    prompt: `Build a "Text Scramble Decode" effect (React Bits style) in pure HTML/CSS/JS: a class Scramble that takes an element and target text; on run(), a 34ms interval ticks a frame counter, rendering each character as the target letter once i < frame/2, otherwise a random glyph from the charset "!<>-_\\/[]{}—=+*^?#@%&$ABCDEFGHJKLMNPQRSTUVWXYZ" (spaces preserved); stops after frame >= text.length*2. Apply to a big gradient-text headline "MOTION VAULT" (violet→fuchsia→cyan clipped gradient, letter-spacing .12em, clamp 30-52px) and a tracked uppercase subtitle "treasure for builders". Re-run the scramble on mouseenter of the headline AND automatically every 4.2s via setInterval. Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-07-17T10:00:00Z",
    updatedAt: "2026-08-21T10:00:00Z",
  },
  {
    id: "cmp-tilt",
    slug: "3d-tilt-pricing-card",
    category: "components",
    title: "3D Perspective Tilt Card",
    summary: "Pricing card that rotates in 3D toward the cursor with layered translateZ depth and a moving shine.",
    author: "Aceternity style",
    tags: ["3d", "tilt", "card", "pricing", "perspective"],
    tech: ["html", "css", "javascript"],
    stars: 10240,
    views: 55600,
    copies: 10900,
    featured: true,
    published: true,
    html: tiltCard,
    prompt: `Build a "3D Tilt Perspective Card" pricing component (Aceternity style) in pure HTML/CSS/JS: a stage with perspective:1000px containing a .tilt card with transform-style:preserve-3d, gradient violet glass background, 24px radius, deep shadow. On mousemove JS computes normalized cursor position and sets transform: rotateY((px-.5)*16deg) rotateX((.5-py)*16deg) scale(1.03) with 0.12s ease-out (reset on mouseleave); also moves a radial shine overlay via --tx/--ty percentage custom properties. Inner elements get DEPTH via translateZ: the "PRO" badge 40px, h4 "Stellar Plan" 34px, price "$29/mo" (big 40px number) 28px, the feature list (✓ Unlimited previews / ✓ AI prompt export / ✓ Team workspaces) 22px, and the gradient "Get started" button 38px — so they parallax as the card tilts. Shine layer: radial 420px white 14% highlight at cursor. Dark #070711. No libraries.`,
    sourceUrl: "https://ui.aceternity.com",
    createdAt: "2026-07-23T10:00:00Z",
    updatedAt: "2026-08-27T10:00:00Z",
  },
  {
    id: "cmp-marquee",
    slug: "infinite-logo-marquee",
    category: "components",
    title: "Infinite Logo Marquee (Dual Row)",
    summary: "Two seamless marquee rows scrolling in opposite directions, edge-fade masks, pausing on hover.",
    author: "Aceternity style",
    tags: ["marquee", "logos", "infinite", "scroll", "ticker"],
    tech: ["html", "css", "javascript"],
    stars: 8330,
    views: 47800,
    copies: 9600,
    featured: false,
    published: true,
    html: marquee,
    prompt: `Build an "Infinite Logo Marquee" component with TWO rows in pure HTML/CSS (no JS needed): each row is an overflow-hidden track with a flex row (width:max-content) containing the item list DUPLICATED exactly twice; animation translateX(0→-50%) at 26s linear infinite makes the loop seamless. Second row animates in REVERSE (from -50% to 0) at 22s. Both rows pause on hover (:hover .mq-track { animation-play-state:paused }). Edge fade: apply a linear-gradient mask on the container (transparent → black 12% → black 88% → transparent) on both -webkit-mask and mask. Items are pill-shaped glass tags (1px border, white 4% bg, 14px radius, bold tracked uppercase-ish labels): row 1 = NEBULA, ◈ ORBITAL, ✦ PULSAR, QUANTUM, ➤ VELOCITY, ✺ HELIX, ▲ VERTEX, ✧ STELLAR; row 2 = DESIGN ✦, MOTION ✦, CODE ✦, PROMPT ✦, SHIP ✦, ITERATE ✦. Items brighten/lift on hover. Dark #070711. No libraries.`,
    sourceUrl: "https://ui.aceternity.com",
    createdAt: "2026-07-30T10:00:00Z",
    updatedAt: "2026-08-16T10:00:00Z",
  },
  {
    id: "cmp-stars",
    slug: "shooting-star-background",
    category: "components",
    title: "Shooting-Star Canvas Background",
    summary: "Twinkling starfield with periodic gradient shooting stars streaking across — drop it behind any hero.",
    author: "React Bits style",
    tags: ["background", "canvas", "stars", "meteor", "hero"],
    tech: ["html", "css", "javascript"],
    stars: 9970,
    views: 63400,
    copies: 11200,
    featured: true,
    published: true,
    html: starBg,
    prompt: `Build a "Shooting-Star Background" canvas component in pure HTML/CSS/JS: a full-size absolute <canvas> inside a relative container. Render ~160 twinkling stars at normalized random positions (so they survive resize), radius 0.3-1.7px, each with a twinkle phase that advances at random speed 0.008-0.038, alpha oscillating 0.3-1.0, white-blue color rgba(220,220,255). Every 2.6s spawn a meteor at a random x in the upper-right area, y=-20, with a trail length 60-150px, falling diagonally (x decreasing, y increasing) at speed 6-12; draw the meteor as a 2px line with a linear gradient from solid white head (alpha = life) to transparent violet tail, life fading 0.012/frame, removed when life<=0. Standard resize handler + requestAnimationFrame loop. Overlay centered title "Shooting-Star Background" and a violet pill "✦ Drop this behind any hero". Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-08-02T10:00:00Z",
    updatedAt: "2026-08-29T10:00:00Z",
  },
  {
    id: "cmp-counter",
    slug: "count-up-stats",
    category: "components",
    title: "Count-Up Stat Cards",
    summary: "Three stat cards whose numbers spring up from zero with cubic ease-out, styled with gradient numerals.",
    author: "MotionVault",
    tags: ["counter", "stats", "numbers", "scroll", "easing"],
    tech: ["html", "css", "javascript"],
    stars: 5210,
    views: 28700,
    copies: 5400,
    featured: false,
    published: true,
    html: counter,
    prompt: `Build a "Count-Up Stats" component in pure HTML/CSS/JS: three glass stat cards in a centered flex row (1px border, white 4% bg, 18px radius, padding 26px 30px, min-width 150px) that lift -5px with a cyan border glow on hover. Each card has a big 38px gradient numeral (cyan→violet background-clip text) with a fuchsia "+" suffix via ::after, and an uppercase tracked label: "480+ Components", "72,000+ GitHub stars", "128,000+ Copies made". JS countUp(el,target,durationMs): animate from performance.now() using cubic ease-out (1 - (1-p)^3), render Math.floor(target*e).toLocaleString() each frame, stop at p>=1; stagger the three cards (durations 1400/1800/2200ms, starting after 250ms). Title "Count-Up Stats" and hint "Numbers spring into place on view". Dark #070711. No libraries.`,
    sourceUrl: "https://reactbits.dev",
    createdAt: "2026-08-08T10:00:00Z",
    updatedAt: "2026-08-17T10:00:00Z",
  },
];

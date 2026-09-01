import { Item } from "../types";
import { doc } from "./wrap";

// ================================================================ TEMPLATE: Cyberpunk HUD landing
const cyberHud = doc({
  kind: "page",
  body: `
<div class="hud-scan"></div>
<nav class="hud-nav"><b class="hud-logo">⬡ NEXUS//OS</b>
  <div><a>SYSTEM</a><a>MODULES</a><a class="hud-cta">JACK IN</a></div></nav>
<main class="hud-main">
  <div class="hud-kicker">◈ SECTOR 7 · BUILD 2.0.77 · ONLINE</div>
  <h1><span class="hud-glitch" data-text="JACK INTO">JACK INTO</span><br/><span class="hud-neon">THE GRID</span></h1>
  <p>A design system forged in neon. 200+ HUD components, terminal aesthetics and glitch transitions — wireframe your next launch in hours, not sprints.</p>
  <div class="hud-actions"><button class="hud-p">▶ INITIALIZE</button><button class="hud-s">VIEW MANIFEST</button></div>
  <div class="hud-stats">
    <div><b data-n="200">0</b><span>MODULES</span></div>
    <div><b data-n="99.9" data-dec="1">0</b><span>UPTIME %</span></div>
    <div><b data-n="42">0</b><span>SECTORS</span></div>
  </div>
</main>
<div class="hud-corner tl"></div><div class="hud-corner tr"></div><div class="hud-corner bl"></div><div class="hud-corner br"></div>`,
  css: `
body{background:#05060f;--v1:#22d3ee;--v2:#e879f9;--c1:#22d3ee;}
.hud-scan{position:fixed;inset:0;pointer-events:none;z-index:5;background:repeating-linear-gradient(0deg,rgba(34,211,238,.025) 0 1px,transparent 1px 3px);mix-blend-mode:screen}
.hud-scan::after{content:'';position:absolute;left:0;right:0;height:120px;background:linear-gradient(180deg,transparent,rgba(34,211,238,.08),transparent);animation:scan 5s linear infinite}
@keyframes scan{0%{top:-120px}100%{top:100%}}
.hud-nav{display:flex;justify-content:space-between;align-items:center;padding:24px 6vw;position:relative;z-index:3;font-family:var(--font-mono,monospace)}
.hud-logo{color:var(--v1);letter-spacing:.15em;text-shadow:0 0 18px rgba(34,211,238,.7)}
.hud-nav div{display:flex;gap:24px;font-size:13px;letter-spacing:.2em;color:rgba(180,240,255,.6)}
.hud-nav a:hover{color:#fff}
.hud-cta{border:1px solid var(--v1);color:var(--v1)!important;padding:8px 18px;border-radius:2px;box-shadow:0 0 18px -4px rgba(34,211,238,.7);clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.hud-main{max-width:900px;margin:0 auto;padding:8vh 6vw 60px;position:relative;z-index:2}
.hud-kicker{font-family:var(--font-mono,monospace);font-size:12px;letter-spacing:.3em;color:var(--v1);margin-bottom:22px;animation:hudIn .6s ease both}
h1{font-size:clamp(46px,8vw,96px);font-weight:900;line-height:.98;letter-spacing:-.02em;text-transform:uppercase;animation:hudIn .6s .1s ease both}
.hud-glitch{position:relative;color:#eafcff;text-shadow:0 0 24px rgba(232,121,249,.5)}
.hud-glitch::before,.hud-glitch::after{content:attr(data-text);position:absolute;inset:0;overflow:hidden}
.hud-glitch::before{color:var(--v2);transform:translate(-2px,0);clip-path:inset(15% 0 55% 0);animation:gl1 2.6s steps(2) infinite}
.hud-glitch::after{color:var(--v1);transform:translate(2px,0);clip-path:inset(60% 0 10% 0);animation:gl2 3.1s steps(2) infinite}
@keyframes gl1{0%,92%{transform:translate(0)}93%{transform:translate(-4px,1px)}97%{transform:translate(3px,-1px)}}
@keyframes gl2{0%,90%{transform:translate(0)}91%{transform:translate(4px,-1px)}96%{transform:translate(-3px,1px)}}
.hud-neon{color:transparent;-webkit-text-stroke:2px var(--v1);text-shadow:0 0 30px rgba(34,211,238,.55);animation:flick 4s infinite}
@keyframes flick{0%,94%,100%{opacity:1}95%{opacity:.5}96%{opacity:1}}
.hud-main p{margin:26px 0 32px;color:rgba(200,230,245,.65);max-width:52ch;line-height:1.7;font-size:16px;animation:hudIn .6s .2s ease both}
.hud-actions{display:flex;gap:14px;flex-wrap:wrap;animation:hudIn .6s .3s ease both}
.hud-p,.hud-s{font-family:var(--font-mono,monospace);padding:15px 30px;font-weight:700;letter-spacing:.12em;font-size:14px;clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)}
.hud-p{background:linear-gradient(120deg,var(--v1),#0891b2);color:#04121a;box-shadow:0 0 34px -6px rgba(34,211,238,.9)}
.hud-s{border:1px solid rgba(34,211,238,.5);color:var(--v1);background:rgba(34,211,238,.05)}
.hud-stats{display:flex;gap:14px;margin-top:56px;animation:hudIn .6s .4s ease both}
.hud-stats div{flex:1;border:1px solid rgba(34,211,238,.25);background:rgba(34,211,238,.04);padding:18px;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)}
.hud-stats b{display:block;font-size:32px;font-weight:800;color:var(--v1);font-family:var(--font-mono,monospace);text-shadow:0 0 16px rgba(34,211,238,.6)}
.hud-stats span{font-size:10px;letter-spacing:.25em;color:rgba(180,240,255,.5)}
.hud-corner{position:fixed;width:44px;height:44px;z-index:4;border:2px solid var(--v1);opacity:.5}
.hud-corner.tl{top:14px;left:14px;border-right:0;border-bottom:0}
.hud-corner.tr{top:14px;right:14px;border-left:0;border-bottom:0}
.hud-corner.bl{bottom:14px;left:14px;border-right:0;border-top:0}
.hud-corner.br{bottom:14px;right:14px;border-left:0;border-top:0}
@keyframes hudIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@media(max-width:640px){.hud-stats{flex-direction:column}.hud-nav div a:not(.hud-cta){display:none}}
`,
  js: `
document.querySelectorAll('[data-n]').forEach(el=>{
  const target=parseFloat(el.dataset.n), dec=+(el.dataset.dec||0);
  let cur=0; const step=target/60;
  const iv=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(iv)}el.textContent=cur.toFixed(dec)},16);
});
`,
});

// ================================================================ TEMPLATE: Brutalism landing
const brutal = doc({
  kind: "page",
  body: `
<nav class="br-nav"><b>BRUT/STUDIO</b><div><a>WORK</a><a>INFO</a><a class="br-tag">START PROJECT</a></div></nav>
<main class="br-main">
  <div class="br-marquee"><div class="br-track"><span>DESIGN ● BUILD ● SHIP ● LOUD TYPOGRAPHY ● HARD GRIDS ● NO BLUR ● DESIGN ● BUILD ● SHIP ● </span><span>DESIGN ● BUILD ● SHIP ● LOUD TYPOGRAPHY ● HARD GRIDS ● NO BLUR ● DESIGN ● BUILD ● SHIP ● </span></div></div>
  <h1>WE MAKE<br/><span class="br-yellow">WEBSITES</span><br/>THAT YELL.</h1>
  <div class="br-row">
    <p>No gradients. No glass. No mercy. Brut/Studio builds high-contrast, big-type, zero-bullshit marketing sites that load instantly and scream your name.</p>
    <button class="br-cta">GET A QUOTE <span>↗</span></button>
  </div>
  <div class="br-cards">
    <div class="br-card"><b>01</b><h3>STRATEGY</h3><p>Positioning sharp enough to cut glass.</p></div>
    <div class="br-card br-pink"><b>02</b><h3>DESIGN</h3><p>120px headlines. 4-color palettes.</p></div>
    <div class="br-card br-cyan"><b>03</b><h3>BUILD</h3><p>Static-first, 99+ lighthouse scores.</p></div>
  </div>
</main>`,
  css: `
body{background:#f4f1ea;color:#111;--y:#ffd400;--p:#ff5ca8;--c:#00b3ff}
.br-nav{display:flex;justify-content:space-between;align-items:center;padding:22px 5vw;border-bottom:3px solid #111;font-weight:900;letter-spacing:-.02em}
.br-nav b{font-size:22px}
.br-nav div{display:flex;gap:22px;align-items:center;font-size:14px;font-weight:700}
.br-tag{background:#111;color:var(--y)!important;padding:10px 18px;border:3px solid #111;box-shadow:5px 5px 0 var(--p);transition:transform .12s,box-shadow .12s}
.br-tag:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--p)}
.br-marquee{background:#111;color:var(--y);border-bottom:3px solid #111;overflow:hidden;padding:10px 0;transform:rotate(-1deg);margin:34px -2vw}
.br-track{display:flex;width:max-content;animation:brm 18s linear infinite;font-weight:800;letter-spacing:.1em}
.br-track span{white-space:nowrap;padding-right:20px}
@keyframes brm{to{transform:translateX(-50%)}}
.br-main{padding:0 5vw 60px;max-width:1200px;margin:0 auto}
h1{font-size:clamp(52px,11vw,150px);font-weight:900;line-height:.92;letter-spacing:-.04em;text-transform:uppercase;margin:40px 0}
.br-yellow{background:var(--y);padding:0 .15em;box-shadow:8px 8px 0 #111;display:inline-block;transform:rotate(-1deg)}
.br-row{display:grid;grid-template-columns:1.4fr 1fr;gap:30px;align-items:end;margin:40px 0 60px}
.br-row p{font-size:19px;line-height:1.5;font-weight:600;max-width:46ch}
.br-cta{justify-self:end;background:var(--p);border:3px solid #111;box-shadow:8px 8px 0 #111;padding:20px 34px;font-size:20px;font-weight:900;text-transform:uppercase;transition:transform .12s,box-shadow .12s}
.br-cta:hover{transform:translate(3px,3px);box-shadow:4px 4px 0 #111}
.br-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.br-card{border:3px solid #111;background:#fff;padding:26px;box-shadow:8px 8px 0 #111;transition:transform .15s}
.br-card:hover{transform:translate(-3px,-3px);box-shadow:12px 12px 0 #111}
.br-card b{font-size:15px;font-weight:900;opacity:.5}
.br-card h3{font-size:26px;font-weight:900;text-transform:uppercase;margin:14px 0 8px;letter-spacing:-.02em}
.br-card p{font-weight:600;font-size:14.5px;line-height:1.5}
.br-pink{background:var(--p)}
.br-cyan{background:var(--c);color:#04121a}
@media(max-width:760px){.br-row,.br-cards{grid-template-columns:1fr}.br-nav div a:not(.br-tag){display:none}}
`,
});

// ================================================================ COMPONENT: Particle constellation network
const constellation = doc({
  body: `
<canvas id="net"></canvas>
<div class="net-hint">Move your cursor — nodes reach for it</div>`,
  css: `
#net{position:fixed;inset:0;width:100%;height:100%}
.net-hint{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim);z-index:2;pointer-events:none}
`,
  js: `
const cv=document.getElementById('net'),ctx=cv.getContext('2d');
let W,H;function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
const N=Math.min(90,innerWidth/14),nodes=[];
for(let i=0;i<N;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:1.5+Math.random()*2});
const mouse={x:-999,y:-999};
addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
function loop(){
  ctx.clearRect(0,0,W,H);
  for(const n of nodes){
    const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);
    if(d<160){n.vx+=dx/d*.04;n.vy+=dy/d*.04}
    n.vx*=.985;n.vy*=.985;n.x+=n.vx;n.y+=n.vy;
    if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;
    n.x=Math.max(0,Math.min(W,n.x));n.y=Math.max(0,Math.min(H,n.y));
  }
  for(let i=0;i<N;i++){
    for(let j=i+1;j<N;j++){
      const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<130){
        ctx.strokeStyle='rgba(139,92,246,'+(1-d/130)*.5+')';
        ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      }
    }
    const dm=Math.hypot(nodes[i].x-mouse.x,nodes[i].y-mouse.y);
    if(dm<160){ctx.strokeStyle='rgba(34,211,238,'+(1-dm/160)*.7+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}
    const n=nodes[i];
    ctx.fillStyle=dm<160?'#22d3ee':'rgba(190,190,255,.85)';
    ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,7);ctx.fill();
  }
  requestAnimationFrame(loop);
}
loop();
`,
});

// ================================================================ COMPONENT: Glitch text reveal
const glitchText = doc({
  body: `
<div class="gl-stage">
  <h1 class="gl" data-text="SYSTEM FAILURE">SYSTEM FAILURE</h1>
  <h1 class="gl gl-cyan" data-text="OVERRIDE ACTIVE">OVERRIDE ACTIVE</h1>
  <button id="glbtn" class="gl-btn">⟳ RE-TRIGGER SCAN</button>
</div>`,
  css: `
.gl-stage{display:flex;flex-direction:column;gap:34px;align-items:center}
.gl{position:relative;font-size:clamp(26px,4.6vw,52px);font-weight:900;letter-spacing:.04em;font-family:var(--font-mono,monospace);color:#f0f4ff}
.gl::before,.gl::after{content:attr(data-text);position:absolute;inset:0}
.gl::before{color:#e879f9;animation:gA 2.8s infinite steps(3);opacity:.85}
.gl::after{color:#22d3ee;animation:gB 3.4s infinite steps(3);opacity:.85}
@keyframes gA{0%,86%{transform:none;clip-path:inset(0 0 0 0)}88%{transform:translate(-5px,-2px);clip-path:inset(10% 0 60% 0)}92%{transform:translate(4px,1px);clip-path:inset(70% 0 8% 0)}96%{transform:translate(-2px,2px);clip-path:inset(40% 0 35% 0)}}
@keyframes gB{0%,80%{transform:none}82%{transform:translate(5px,2px);clip-path:inset(55% 0 20% 0)}88%{transform:translate(-4px,-1px);clip-path:inset(5% 0 80% 0)}94%{transform:translate(3px,-2px);clip-path:inset(80% 0 2% 0)}}
.gl-cyan{color:transparent;-webkit-text-stroke:1.5px rgba(240,244,255,.7)}
.gl-btn{margin-top:10px;padding:13px 26px;border:1px solid var(--line);background:var(--panel);border-radius:10px;font-family:var(--font-mono,monospace);font-weight:700;letter-spacing:.12em;font-size:13px;color:var(--c1);transition:all .25s}
.gl-btn:hover{border-color:var(--c1);box-shadow:0 0 26px -6px rgba(34,211,238,.8)}
`,
  js: `
document.getElementById('glbtn').onclick=()=>{
  document.querySelectorAll('.gl').forEach(el=>{
    el.style.animation='none';el.offsetHeight;el.style.animation='';
  });
};
`,
});

// ================================================================ ELEMENT: Morphing blob button / liquid CTA
const liquidBtn = doc({
  body: `
<div class="lq-wrap">
  <button class="lq"><span>Hover me</span><i></i></button>
  <button class="lq lq2"><span>Click effect</span><i></i></button>
</div>`,
  css: `
.lq-wrap{display:flex;gap:42px;flex-wrap:wrap;justify-content:center}
.lq{position:relative;width:210px;height:210px;border-radius:47% 53% 60% 40% / 45% 45% 55% 55%;background:linear-gradient(135deg,var(--v1),var(--v2));color:#fff;font-size:17px;font-weight:800;letter-spacing:.02em;box-shadow:0 24px 60px -18px rgba(217,70,239,.8);transition:border-radius .5s cubic-bezier(.34,1.56,.64,1),transform .4s;overflow:hidden;z-index:0}
.lq span{position:relative;z-index:2}
.lq i{position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.35),transparent 55%);z-index:1}
.lq:hover{border-radius:58% 42% 41% 59% / 57% 48% 52% 43%;transform:scale(1.06) rotate(-2deg)}
.lq:hover i{animation:lqspin 6s linear infinite}
@keyframes lqspin{to{transform:rotate(360deg)}}
.lq2{background:linear-gradient(135deg,var(--c1),var(--v1));box-shadow:0 24px 60px -18px rgba(34,211,238,.7)}
.lq:active{transform:scale(.94)}
`,
  js: `
document.querySelectorAll('.lq').forEach(b=>b.addEventListener('pointermove',e=>{
  const r=b.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  b.style.borderRadius=(40+x*30)+'% '+(60-x*25)+'% '+(55-y*20)+'% '+(45+y*25)+'% / '+(50+y*20)+'% '+(45-y*15)+'% '+(50+x*15)+'% '+(50-x*20)+'%';
}));
document.querySelectorAll('.lq').forEach(b=>b.addEventListener('pointerleave',()=>b.style.borderRadius=''));
`,
});

// ================================================================ ELEMENT: Neon ring toggle switch
const neonToggle = doc({
  body: `
<div class="nt-col">
  <label class="nt"><input type="checkbox" checked/><span class="nt-track"><span class="nt-thumb"></span></span><i class="nt-label">NEON MODE</i></label>
  <label class="nt"><input type="checkbox"/><span class="nt-track nt-pink"><span class="nt-thumb"></span></span><i class="nt-label">PINK CIRCUIT</i></label>
  <label class="nt"><input type="checkbox" checked/><span class="nt-track nt-cyan"><span class="nt-thumb"></span></span><i class="nt-label">DATA STREAM</i></label>
</div>`,
  css: `
.nt-col{display:flex;flex-direction:column;gap:26px}
.nt{display:flex;align-items:center;gap:18px;cursor:pointer}
.nt input{display:none}
.nt-track{position:relative;width:78px;height:38px;border-radius:999px;border:2px solid rgba(139,92,246,.6);background:rgba(139,92,246,.12);transition:all .35s cubic-bezier(.34,1.56,.64,1);display:block}
.nt-thumb{position:absolute;top:3px;left:3px;width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);box-shadow:0 0 16px rgba(139,92,246,.9);transition:all .35s cubic-bezier(.34,1.56,.64,1)}
.nt input:checked + .nt-track{background:rgba(139,92,246,.35);box-shadow:0 0 26px -4px rgba(139,92,246,.8),inset 0 0 12px rgba(139,92,246,.4)}
.nt input:checked + .nt-track .nt-thumb{left:43px;transform:scale(1.08)}
.nt-pink{border-color:rgba(232,121,249,.6);background:rgba(232,121,249,.1)}
.nt-pink .nt-thumb{background:linear-gradient(135deg,#f0abfc,#c026d3);box-shadow:0 0 16px rgba(232,121,249,.9)}
.nt input:checked + .nt-pink{background:rgba(232,121,249,.3);box-shadow:0 0 26px -4px rgba(232,121,249,.8)}
.nt-cyan{border-color:rgba(34,211,238,.6);background:rgba(34,211,238,.1)}
.nt-cyan .nt-thumb{background:linear-gradient(135deg,#67e8f9,#0891b2);box-shadow:0 0 16px rgba(34,211,238,.9)}
.nt input:checked + .nt-cyan{background:rgba(34,211,238,.3);box-shadow:0 0 26px -4px rgba(34,211,238,.8)}
.nt-label{font-family:var(--font-mono,monospace);font-size:12px;letter-spacing:.22em;color:var(--dim);font-weight:700}
.nt input:checked ~ .nt-label{color:var(--txt)}
`,
});

// ================================================================ ANIMATION: Magnetic spring buttons
const magnetBtns = doc({
  body: `
<div class="mg-wrap">
  <button class="mg mg-p"><span class="mg-t">Magnetic</span></button>
  <button class="mg mg-s"><span class="mg-t">Spring</span></button>
  <button class="mg mg-c"><span class="mg-t">Attraction</span></button>
</div>`,
  css: `
.mg-wrap{display:flex;gap:40px;flex-wrap:wrap;justify-content:center}
.mg{position:relative;padding:22px 44px;border-radius:14px;font-size:17px;font-weight:800;transition:box-shadow .3s;will-change:transform}
.mg-t{display:inline-block;will-change:transform;transition:transform .25s cubic-bezier(.2,1.6,.4,1)}
.mg-p{background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;box-shadow:0 18px 44px -14px rgba(217,70,239,.9)}
.mg-s{border:1px solid var(--line);background:var(--panel)}
.mg-c{background:linear-gradient(120deg,var(--c1),var(--v1));color:#04121a;box-shadow:0 18px 44px -14px rgba(34,211,238,.8)}
.mg:hover{box-shadow:0 26px 60px -14px rgba(139,92,246,.9)}
`,
  js: `
document.querySelectorAll('.mg').forEach(btn=>{
  const label=btn.querySelector('.mg-t');
  let bx=0,by=0,lx=0,ly=0,vx=0,vy=0,active=false;
  btn.addEventListener('pointermove',e=>{
    const r=btn.getBoundingClientRect();
    const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
    bx=dx*.35;by=dy*.35;lx=dx*.18;ly=dy*.18;active=true;
  });
  btn.addEventListener('pointerleave',()=>{bx=by=lx=ly=0;});
  (function spring(){
    vx+=(bx-vx)*.12;vy+=(by-vy)*.12;
    btn.style.transform='translate('+vx+'px,'+vy+'px)';
    label.style.transform='translate('+lx+'px,'+ly+'px)';
    requestAnimationFrame(spring);
  })();
});
`,
});

// ================================================================ ANIMATION: Scroll speed lines / speed lines burst on click
const speedLines = doc({
  body: `
<canvas id="spd"></canvas>
<div class="spd-hint">Click anywhere to warp</div>`,
  css: `
#spd{position:fixed;inset:0;width:100%;height:100%}
.spd-hint{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:var(--dim);pointer-events:none}
`,
  js: `
const cv=document.getElementById('spd'),ctx=cv.getContext('2d');
let W,H,cx,cy;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;cx=W/2;cy=H/2}rs();addEventListener('resize',rs);
let lines=[],burst=0;
addEventListener('pointerdown',e=>{cx=e.clientX;cy=e.clientY;burst=1;
  for(let i=0;i<70;i++){const a=Math.random()*Math.PI*2;lines.push({a,len:10+Math.random()*30,speed:14+Math.random()*22,life:1,w:1+Math.random()*2.5,col:Math.random()<.5?'139,92,246':'34,211,238'})}
});
// ambient drift lines
for(let i=0;i<24;i++)lines.push({a:Math.random()*Math.PI*2,len:30+Math.random()*120,speed:.4+Math.random(),life:1,w:.6,ambient:true,col:'139,92,246'});
function loop(){
  ctx.clearRect(0,0,W,H);
  lines.forEach(l=>{
    const r0=l.speed*4,r1=r0+l.len;
    ctx.strokeStyle='rgba('+l.col+','+(l.life*.8)+')';
    ctx.lineWidth=l.w;ctx.beginPath();
    ctx.moveTo(cx+Math.cos(l.a)*r0,cy+Math.sin(l.a)*r0);
    ctx.lineTo(cx+Math.cos(l.a)*r1,cy+Math.sin(l.a)*r1);
    ctx.stroke();
    l.speed+=l.ambient?.15:1.6;
    if(!l.ambient){l.life-=.02}
  });
  lines=lines.filter(l=>l.life>0&&l.speed<Math.max(W,H));
  if(burst&&lines.filter(l=>!l.ambient).length===0)burst=0;
  requestAnimationFrame(loop);
}
loop();
`,
});

export const WAVE4_ITEMS: Item[] = [
  {
    id: "w4-cyber-hud-landing",
    slug: "cyberpunk-hud-landing",
    category: "templates",
    title: "Cyberpunk HUD Landing — NEXUS//OS",
    summary: "Neon wireframe landing with scanlines, glitch headline, clipped-corner panels and animated HUD counters.",
    author: "MotionVault",
    tags: ["cyberpunk", "hud", "neon", "glitch", "landing", "sci-fi"],
    tech: ["html", "css", "javascript"],
    stars: 486,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: cyberHud,
    prompt:
      "Create a single-file cyberpunk HUD-style landing page named NEXUS//OS. Dark navy-black background (#05060f) with cyan (#22d3ee) and magenta (#e879f9) neon accents, monospace display type. Include: a fixed scanline overlay with a moving horizontal scan beam; corner HUD brackets fixed to the viewport edges; a nav with glowing JACK IN button using clipped polygon corners; a huge uppercase headline where 'JACK INTO' has an RGB-split glitch effect (pseudo-elements with clip-path slices animating in steps) and 'THE GRID' is outlined stroke text with a neon flicker; stat panels with clipped corners and count-up numbers (modules, uptime, sectors); all entrances staggered. No external assets, everything inline CSS/JS.",
    status: "curated",
    createdAt: "2026-08-30T10:00:00.000Z",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "w4-brutal-landing",
    slug: "brutalism-yellow-studio",
    category: "templates",
    title: "Brutalism Studio Landing — hard grids, loud type",
    summary: "Anti-glassmorphism brutalist page: paper background, 120px headlines, hard offset shadows, rotated marquee, zero blur.",
    author: "MotionVault",
    tags: ["brutalism", "bold", "marquee", "landing", "retro"],
    tech: ["html", "css"],
    stars: 372,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: brutal,
    prompt:
      "Create a single-file neo-brutalist landing page for 'BRUT/STUDIO'. Aesthetic: warm paper background (#f4f1ea), near-black ink (#111), accent colors yellow (#ffd400), hot pink (#ff5ca8), cyan (#00b3ff). Rules: NO gradients, NO blur, NO border radius — everything uses 3px solid black borders and hard offset box-shadows (8px 8px 0 #111) that compress on hover with translate. Include: a rotated black marquee strip with yellow uppercase text scrolling infinitely; a massive 11vw uppercase headline with a rotated yellow highlight block behind 'WEBSITES'; three service cards (STRATEGY/DESIGN/BUILD) with hard shadows and hover lift; chunky CTA buttons with shadow-press effect. Typography is extra-bold, tight negative letter-spacing.",
    status: "curated",
    createdAt: "2026-08-30T10:05:00.000Z",
    updatedAt: "2026-08-30T10:05:00.000Z",
  },
  {
    id: "w4-constellation",
    slug: "particle-constellation-network",
    category: "components",
    title: "Particle Constellation Network",
    summary: "Interactive canvas node graph: drifting particles link up, and every node reaches toward your cursor with cyan tendrils.",
    author: "MotionVault",
    tags: ["particles", "canvas", "network", "interactive", "constellation"],
    tech: ["html", "css", "javascript"],
    featured: false,
    stars: 524,
    views: 0,
    copies: 0,
    published: true,
    html: constellation,
    prompt:
      "Build a self-contained interactive particle constellation background on a full-viewport canvas. ~90 nodes drift with velocity damping, wrap/bounce at edges. Each node is a soft glowing dot. Draw lines between any two nodes within 130px with opacity proportional to proximity (violet). On pointer move, nodes within 160px of the cursor are gently attracted (spring force, capped so they don't collapse) and draw brighter cyan lines to the cursor point; nodes near the cursor turn cyan. DevicePixelRatio-aware, resize handling, 60fps requestAnimationFrame loop, no libraries.",
    status: "curated",
    createdAt: "2026-08-30T10:10:00.000Z",
    updatedAt: "2026-08-30T10:10:00.000Z",
  },
  {
    id: "w4-glitch-text",
    slug: "glitch-text-reveal",
    category: "components",
    title: "Glitch Text Reveal (RGB split)",
    summary: "Terminal-style headline with animated chromatic aberration slices — magenta and cyan clones clip and jitter on a loop.",
    author: "MotionVault",
    tags: ["glitch", "text", "cyberpunk", "rgb-split", "mono"],
    tech: ["html", "css", "javascript"],
    featured: false,
    stars: 358,
    views: 0,
    copies: 0,
    published: true,
    html: glitchText,
    prompt:
      "Create a pure-CSS glitch text effect for two large monospace headlines. Each heading uses ::before/::after pseudo-elements containing a data-text copy: one magenta, one cyan, offset a few pixels. Use clip-path inset slices (e.g. inset(10% 0 60% 0)) that change on keyframe steps (steps(3) timing) so slices jitter horizontally at random-ish intervals like signal interference. Second heading uses outlined stroke text. Add a bordered button that restarts the glitch animation by toggling the animation property. Dark background, neon palette.",
    status: "curated",
    createdAt: "2026-08-30T10:15:00.000Z",
    updatedAt: "2026-08-30T10:15:00.000Z",
  },
  {
    id: "w4-liquid-btn",
    slug: "morphing-blob-liquid-button",
    category: "elements",
    title: "Morphing Liquid Blob Button",
    summary: "Organic blob CTA whose border-radius melts and follows the cursor, with a rotating sheen on hover.",
    author: "MotionVault",
    tags: ["button", "blob", "morph", "organic", "liquid"],
    tech: ["html", "css", "javascript"],
    featured: false,
    stars: 289,
    views: 0,
    copies: 0,
    published: true,
    html: liquidBtn,
    prompt:
      "Create two large circular gradient buttons that look like liquid blobs. Base border-radius uses organic asymmetric percentages (47% 53% 60% 40% / 45% 45% 55% 55%). On hover the blob gently scales/rotates and a radial sheen layer spins slowly. On pointermove, recompute all eight border-radius values from cursor position so the blob appears to melt toward the pointer; reset on leave with a springy cubic-bezier transition (cubic-bezier(.34,1.56,.64,1)). Press state scales to 0.94. One violet-fuchsia gradient, one cyan-violet, deep shadows.",
    status: "curated",
    createdAt: "2026-08-30T10:20:00.000Z",
    updatedAt: "2026-08-30T10:20:00.000Z",
  },
  {
    id: "w4-neon-toggle",
    slug: "neon-ring-toggle-switches",
    category: "elements",
    title: "Neon Ring Toggle Switches",
    summary: "Springy glowing toggle switches in violet, magenta and cyan — the thumb pops with neon bloom when switched on.",
    author: "MotionVault",
    tags: ["toggle", "switch", "neon", "form", "glow"],
    tech: ["html", "css"],
    featured: false,
    stars: 231,
    views: 0,
    copies: 0,
    published: true,
    html: neonToggle,
    prompt:
      "Design three neon-styled toggle switches as pure CSS (hidden checkbox + styled track and thumb). Track is a pill with a 2px neon border and tinted translucent fill; thumb is a gradient circle with a colored glow shadow. Checked state: fill intensifies, an outer glow box-shadow appears (e.g. 0 0 26px -4px of the accent), thumb slides with an overshoot cubic-bezier (.34,1.56,.64,1) and scales slightly. Three colorways: violet, hot pink, cyan. Labels in uppercase tracked-out monospace. Dark background.",
    status: "curated",
    createdAt: "2026-08-30T10:25:00.000Z",
    updatedAt: "2026-08-30T10:25:00.000Z",
  },
  {
    id: "w4-magnet-btns",
    slug: "magnetic-spring-buttons",
    category: "animations",
    title: "Magnetic Spring Buttons",
    summary: "Three CTA buttons that lean toward your cursor with physics-based spring motion; the label counter-moves for parallax.",
    author: "MotionVault",
    tags: ["magnetic", "spring", "button", "physics", "hover"],
    tech: ["html", "css", "javascript"],
    stars: 402,
    views: 0,
    copies: 0,
    featured: true,
    published: true,
    html: magnetBtns,
    prompt:
      "Implement three magnetic buttons using spring physics in a requestAnimationFrame loop (no GSAP). On pointermove over a button, compute offset from the button center; the button chases 35% of that offset and its inner label chases 18%, each smoothed per-frame with velocity integration (lerp factor ~0.12) giving natural overshoot. On pointerleave both spring back to zero. Buttons: gradient violet-fuchsia, outline glass, cyan-violet gradient; rounded-2xl, bold labels, colored drop shadows that deepen on hover. Deep space background.",
    status: "curated",
    createdAt: "2026-08-30T10:30:00.000Z",
    updatedAt: "2026-08-30T10:30:00.000Z",
  },
  {
    id: "w4-speed-lines",
    slug: "warp-speed-lines-burst",
    category: "animations",
    title: "Warp Speed Lines Burst",
    summary: "Click anywhere to fire a radial hyperspace streak burst from that point; ambient violet lines drift continuously.",
    author: "MotionVault",
    tags: ["speed-lines", "canvas", "burst", "sci-fi", "warp"],
    tech: ["html", "css", "javascript"],
    featured: false,
    stars: 268,
    views: 0,
    copies: 0,
    published: true,
    html: speedLines,
    prompt:
      "Create a canvas warp-speed effect. Full-viewport canvas on dark background. Continuously render ~24 faint ambient radial streaks drifting outward from center at low speed. On pointerdown, spawn 70 bright streak lines radiating from the click point at random angles: each streak is a short thick line segment drawn between an inner and outer radius, accelerating outward each frame (speed += 1.6), fading out (life -= 0.02), in alternating violet (#8b5cf6) and cyan (#22d3ee). Streaks recycle/remove when faded or off-screen. requestAnimationFrame loop with resize support, no libraries.",
    status: "curated",
    createdAt: "2026-08-30T10:35:00.000Z",
    updatedAt: "2026-08-30T10:35:00.000Z",
  },
];

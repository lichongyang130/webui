// Generated wave — ANIMATIONS: 13 families × 8 palette variants = 104 items.

import { docP, Fam, materialize } from "./kit";

/* 1 — particle constellation canvas */
const constellation: Fam = {
  id: "ga-constellation", slugBase: "constellation-field", title: "Constellation Field",
  category: "animations",
  summary: "Drifting particles that link into a living constellation web, attracted to your cursor.",
  tags: ["particles", "canvas", "constellation", "interactive"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const n = 55 + vi * 4;
    return {
      html: docP(p, {
        body: `<canvas id="cv" style="width:min(560px,92vw);height:320px;border-radius:20px;border:1px solid var(--line)"></canvas>
<p class="cap">Move your cursor through the field</p>`,
        css: `.cap{color:var(--dim);font-size:13px;letter-spacing:.2em;text-transform:uppercase}`,
        js: `var cv=document.getElementById('cv'),cx=cv.getContext('2d');
var W,H;function rs(){var b=cv.getBoundingClientRect();cv.width=W=b.width*devicePixelRatio;cv.height=H=b.height*devicePixelRatio;
cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);W=b.width;H=b.height}
rs();addEventListener('resize',rs);
var N=${n},ps=[],mx=-9999,my=-9999,i;
for(i=0;i<N;i++)ps.push({x:Math.random()*560,y:Math.random()*320,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5});
cv.addEventListener('mousemove',function(e){var b=cv.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top});
cv.addEventListener('mouseleave',function(){mx=my=-9999});
(function loop(){var w=cv.clientWidth,h=cv.clientHeight;cx.clearRect(0,0,w,h);
for(i=0;i<N;i++){var q=ps[i];q.x+=q.vx;q.y+=q.vy;
if(q.x<0||q.x>w)q.vx*=-1;if(q.y<0||q.y>h)q.vy*=-1;
var dx=mx-q.x,dy=my-q.y,d=Math.sqrt(dx*dx+dy*dy);
if(d<120){q.x+=dx/d*1.1;q.y+=dy/d*1.1}
cx.fillStyle='${p.c1}';cx.beginPath();cx.arc(q.x,q.y,1.6,0,7);cx.fill()}
for(i=0;i<N;i++)for(var j=i+1;j<N;j++){var a=ps[i],b=ps[j],dd=Math.hypot(a.x-b.x,a.y-b.y);
if(dd<90){cx.strokeStyle='${p.v1}'+Math.round((1-dd/90)*110+40).toString(16);cx.lineWidth=.7;
cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}
requestAnimationFrame(loop)})();`,
      }),
      prompt: `Build a canvas constellation field with ${n} particles drifting at gentle random velocities, bouncing off edges. Draw 1.6px ${p.c1} dots, and connect pairs closer than 90px with lines whose alpha fades with distance (base color ${p.v1}). Particles within 120px of the cursor are pulled toward it. Handle devicePixelRatio scaling and resize. Vanilla canvas, requestAnimationFrame.`,
    };
  },
};

/* 2 — confetti burst */
const confetti: Fam = {
  id: "ga-confetti", slugBase: "confetti-pop", title: "Confetti Pop",
  category: "animations",
  summary: "Click anywhere and a fountain of palette-colored confetti erupts from the pointer.",
  tags: ["confetti", "celebration", "canvas", "click"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const burst = 50 + vi * 8;
    return {
      html: docP(p, {
        body: `<canvas id="cv" style="position:fixed;inset:0"></canvas>
<div class="hint"><h2>Click anywhere 🎉</h2><p>Every click launches ${burst} pieces</p></div>`,
        css: `.hint{position:relative;z-index:1;text-align:center;pointer-events:none}
.hint h2{font-size:34px;font-weight:900;background:linear-gradient(135deg,var(--v1),var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent}
.hint p{color:var(--dim);font-size:14px;margin-top:8px}`,
        js: `var cv=document.getElementById('cv'),cx=cv.getContext('2d'),ps=[],C=['${p.v1}','${p.v2}','${p.c1}','#ffffff'];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
addEventListener('pointerdown',function(e){for(var i=0;i<${burst};i++){var a=Math.random()*6.28,s=4+Math.random()*8;
ps.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s,vy:Math.sin(a)*s-5,g:.22,r:3+Math.random()*4,
c:C[i%4],rot:Math.random()*6.28,vr:(Math.random()-.5)*.3,life:1})}});
(function loop(){cx.clearRect(0,0,cv.width,cv.height);
ps=ps.filter(function(q){return q.life>0&&q.y<cv.height+20});
ps.forEach(function(q){q.vy+=q.g;q.x+=q.vx;q.y+=q.vy;q.vx*=.985;q.rot+=q.vr;q.life-=.008;
cx.save();cx.translate(q.x,q.y);cx.rotate(q.rot);cx.globalAlpha=Math.max(0,q.life);
cx.fillStyle=q.c;cx.fillRect(-q.r,-q.r*.6,q.r*2,q.r*1.2);cx.restore()});
requestAnimationFrame(loop)})();`,
      }),
      prompt: `Build a fullscreen click-confetti effect: a fixed canvas; every pointerdown spawns ${burst} rectangular confetti pieces at the pointer with random radial velocity (4-12 px/f, upward bias), gravity .22/mass air drag .985, spin, and fade-out life. Colors cycle ${p.v1}, ${p.v2}, ${p.c1}, white. Pieces render as rotated rects via save/translate/rotate. Centered gradient hint text "Click anywhere 🎉". Vanilla canvas.`,
    };
  },
};

/* 3 — sine waves */
const sineWaves: Fam = {
  id: "ga-sine", slugBase: "flowing-sine-waves", title: "Flowing Sine Waves",
  category: "animations",
  summary: "Layered translucent sine waves gliding across the canvas at different speeds.",
  tags: ["waves", "canvas", "ambient", "background"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const layers = 3 + (vi % 3);
    return {
      html: docP(p, {
        body: `<canvas id="cv" style="width:min(560px,92vw);height:300px;border-radius:20px;border:1px solid var(--line)"></canvas>
<p class="cap">${layers} layers · rolling at different speeds</p>`,
        css: `.cap{color:var(--dim);font-size:13px;letter-spacing:.2em;text-transform:uppercase}`,
        js: `var cv=document.getElementById('cv'),cx=cv.getContext('2d');
function rs(){var b=cv.getBoundingClientRect();cv.width=b.width;cv.height=b.height}rs();addEventListener('resize',rs);
var layers=[{a:26,f:.014,s:.010,c:'${p.v1}',o:.5},{a:20,f:.02,s:.016,c:'${p.v2}',o:.4},{a:14,f:.026,s:.022,c:'${p.c1}',o:.35}];
if(${layers}>3)layers.push({a:10,f:.032,s:.03,c:'#ffffff',o:.18});
if(${layers}>4)layers.push({a:32,f:.010,s:.007,c:'${p.v2}',o:.25});
var t=0;
(function loop(){t++;var w=cv.width,h=cv.height;cx.clearRect(0,0,w,h);
layers.forEach(function(L){cx.beginPath();
for(var x=0;x<=w;x+=4){var y=h*.55+Math.sin(x*L.f+t*L.s)*L.a+Math.sin(x*L.f*.6+t*L.s*1.7)*L.a*.4;
x===0?cx.moveTo(x,y):cx.lineTo(x,y)}
cx.lineTo(w,h);cx.lineTo(0,h);cx.closePath();
cx.globalAlpha=L.o;cx.fillStyle=L.c;cx.fill();cx.globalAlpha=1});
requestAnimationFrame(loop)})();`,
      }),
      prompt: `Build an ambient canvas of ${layers} layered sine waves ("rolling ocean"): each layer fills from mid-canvas to the bottom using a path of y = baseline + sin(x·f + t·speed)·amplitude + a secondary harmonic. Amplitudes 10-32px, frequencies .01-.033, speeds .007-.03, alpha .18-.5, colors ${p.v1} / ${p.v2} / ${p.c1} plus a faint white crest. Animate t each frame. Vanilla canvas, handles resize.`,
    };
  },
};

/* 4 — drifting blob background */
const blobs: Fam = {
  id: "ga-blobs", slugBase: "drifting-blob-backdrop", title: "Drifting Blob Backdrop",
  category: "animations",
  summary: "Oversized blurred gradient blobs that drift and breathe behind any content.",
  tags: ["blob", "gradient", "background", "ambient", "blur"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const dur = 14 + vi * 2;
    return {
      html: docP(p, {
        body: `<div class="bx">
<i class="b b1"></i><i class="b b2"></i><i class="b b3"></i>
<div class="bx-c"><h2>Calm, colorful, alive.</h2><p>Drop this behind any hero section.</p></div>
</div>`,
        css: `
.bx{position:relative;width:min(560px,92vw);height:320px;border-radius:24px;overflow:hidden;
 background:#0a0a1c;border:1px solid var(--line)}
.b{position:absolute;border-radius:50%;filter:blur(70px);opacity:.55;mix-blend-mode:screen}
.b1{width:280px;height:280px;left:-8%;top:-18%;background:var(--v1);animation:d1 ${dur}s ease-in-out infinite alternate}
.b2{width:240px;height:240px;right:-6%;top:22%;background:var(--v2);animation:d2 ${dur + 5}s ease-in-out infinite alternate}
.b3{width:200px;height:200px;left:32%;bottom:-26%;background:var(--c1);animation:d3 ${dur + 9}s ease-in-out infinite alternate}
@keyframes d1{to{transform:translate(46%,30%) scale(1.25)}}
@keyframes d2{to{transform:translate(-38%,-24%) scale(.85)}}
@keyframes d3{to{transform:translate(-52%,-42%) scale(1.3)}}
.bx-c{position:absolute;inset:0;display:grid;place-content:center;gap:10px;text-align:center}
.bx-c h2{font-size:26px;font-weight:900}
.bx-c p{color:var(--dim);font-size:13.5px}`,
      }),
      prompt: `Build an ambient blob backdrop: three oversized circles (280/240/200px) in ${p.v1}, ${p.v2} and ${p.c1}, each blurred 70px at 55% opacity with mix-blend-mode screen, drifting on independent alternate infinite keyframes (${dur}s / ${dur + 5}s / ${dur + 9}s) that translate ~40% and scale ±30% so the colors keep remixing. Content sits centered on top inside a rounded, clipped 560×320 stage. Pure CSS.`,
    };
  },
};

/* 5 — letter rise title */
const letterRise: Fam = {
  id: "ga-rise", slugBase: "letter-rise-title", title: "Letter Rise Title",
  category: "animations",
  summary: "Headline letters rise from a blurred mask one by one — click to replay.",
  tags: ["text", "letters", "stagger", "reveal"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const word = ["MOTION", "DESIGN", "CRAFT", "DETAIL", "LAUNCH", "VISION", "POLISH", "WONDER"][vi];
    const spans = word.split("").map((c, i) => `<span style="animation-delay:${i * 55}ms">${c}</span>`).join("");
    return {
      html: docP(p, {
        body: `<h1 class="lr" id="lr">${spans}</h1>
<p class="cap">click the title to replay</p>`,
        css: `
.lr{font-size:clamp(40px,9vw,84px);font-weight:900;letter-spacing:.06em;display:flex;cursor:pointer;user-select:none}
.lr span{display:inline-block;opacity:0;transform:translateY(.7em) rotate(4deg);filter:blur(8px);
 background:linear-gradient(135deg,var(--txt) 30%,var(--v1) 70%,var(--v2));
 -webkit-background-clip:text;background-clip:text;color:transparent;
 animation:rise .7s cubic-bezier(.22,1,.36,1) forwards}
@keyframes rise{to{opacity:1;transform:none;filter:blur(0)}}
.cap{color:var(--dim);font-size:12px;letter-spacing:.3em;text-transform:uppercase}`,
        js: `var el=document.getElementById('lr');
el.addEventListener('click',function(){var sp=el.querySelectorAll('span');
sp.forEach(function(s){s.style.animation='none';void s.offsetWidth;s.style.animation=''})});`,
      }),
      prompt: `Build a staggered letter reveal for the headline "${word}": each letter is a span starting at translateY(.7em) rotate(4deg) blur(8px) opacity 0, animating to rest over .7s cubic-bezier(.22,1,.36,1) with 55ms stagger. Letters carry a diagonal gradient from near-white through ${p.v1} to ${p.v2} via background-clip:text. Clicking the title replays the animation (reset via style.animation='none' + reflow).`,
    };
  },
};

/* 6 — text scramble */
const scramble: Fam = {
  id: "ga-scramble", slugBase: "decode-scramble-text", title: "Decode Scramble Text",
  category: "animations",
  summary: "Words resolve from a stream of random glyphs — the classic hacker decode effect.",
  tags: ["text", "scramble", "typewriter", "glitch"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const words = ["BUILD", "ANIMATE", "SHIP", "REPEAT"];
    return {
      html: docP(p, {
        body: `<div class="sc-wrap"><span class="fx">We help you</span><span class="wd" id="wd">BUILD</span><span class="cr"></span></div>`,
        css: `
.sc-wrap{display:flex;align-items:baseline;gap:14px;font-size:clamp(26px,5vw,40px);font-weight:900}
.fx{color:var(--dim);font-weight:600;font-size:.6em;letter-spacing:.1em}
.wd{font-family:'JetBrains Mono',monospace;color:var(--c1);min-width:8ch;text-shadow:0 0 24px color-mix(in srgb,var(--c1) 45%,transparent)}
.cr{width:3px;height:.9em;align-self:center;background:var(--v1);animation:bl .8s steps(1) infinite}
@keyframes bl{50%{opacity:0}}`,
        js: `var W=${JSON.stringify(words)},EL=document.getElementById('wd'),CH='!<>-_\\\\/[]{}=+*^?#____',wi=0;
function play(word){var from=EL.textContent,fr=0,N=22+word.length*3;
(function step(){var out='',i;
for(i=0;i<word.length;i++){var reveal=fr/N*word.length*1.4;
out+= i<reveal ? word[i] : CH[Math.floor(Math.random()*CH.length)]}
EL.textContent=out;
if(fr++<N)requestAnimationFrame(step);else{EL.textContent=word;setTimeout(next,1600)}})()}
function next(){wi=(wi+1)%W.length;play(W[wi])}
setTimeout(next,1400);`,
      }),
      prompt: `Build a decode/scramble text effect: a fixed "We help you" prefix, then a monospace word slot (${p.c1}, with glow) cycling through ${words.join(" / ")}. Each transition runs ~30 frames where unresolved characters show random glyphs from "!<>-_/[]{}=+*^?#" while resolved ones lock in left-to-right; hold 1.6s and move on. Blinking block cursor in ${p.v1}. Vanilla JS with requestAnimationFrame.`,
    };
  },
};

/* 7 — rolling stat counters */
const counters: Fam = {
  id: "ga-odometer", slugBase: "rolling-stat-counters", title: "Rolling Stat Counters",
  category: "animations",
  summary: "Three big numbers race upward with a soft overshoot when the panel scrolls into view.",
  tags: ["counter", "numbers", "stats", "scroll"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const stats: [number, string][] = [[182, "Assets"], [14, "Families"], [12, "Palettes"]];
    return {
      html: docP(p, {
        body: `<div class="cn" id="cn">${stats.map(([n, l]) => `<div class="cx"><b data-n="${n + vi * 7}">0</b><span>${l}</span></div>`).join("")}</div>`,
        css: `
.cn{display:flex;gap:44px}
.cx{text-align:center}
.cx b{display:block;font-size:clamp(38px,7vw,58px);font-weight:900;font-variant-numeric:tabular-nums;
 background:linear-gradient(160deg,var(--c1),var(--v1) 55%,var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent}
.cx span{font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim)}
.cx{opacity:0;transform:translateY(18px);animation:cin .6s cubic-bezier(.22,1,.36,1) forwards}
.cx:nth-child(2){animation-delay:.12s}.cx:nth-child(3){animation-delay:.24s}
@keyframes cin{to{opacity:1;transform:none}}`,
        js: `document.querySelectorAll('#cn b').forEach(function(el){var T=+el.dataset.n,D=1500,t0=performance.now();
(function tick(now){var k=Math.min(1,(now-t0)/D),e=1-Math.pow(1-k,4);
el.textContent=Math.round(T*e)+(k===1?'+':'');if(k<1)requestAnimationFrame(tick)})(t0)});`,
      }),
      prompt: `Build a stats row — Assets / Families / Palettes — where each card fades up with a staggered entrance, then its number counts from 0 to its target with a 1.5s quartic ease-out (requestAnimationFrame), appending a "+" when it lands. Numbers use tabular numerals and a gradient text clip (${p.c1}→${p.v1}→${p.v2}). Vanilla JS, no libraries.`,
    };
  },
};

/* 8 — magnetic element */
const magnetic: Fam = {
  id: "ga-magnetic", slugBase: "magnetic-hover-element", title: "Magnetic Hover Element",
  category: "animations",
  summary: "The button is magnetized to your cursor — it leans toward the pointer and springs back.",
  tags: ["magnetic", "hover", "spring", "cursor"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const pull = (0.28 + (vi % 4) * 0.06).toFixed(2);
    return {
      html: docP(p, {
        body: `<div class="mg-z" id="z"><button class="mg" id="mg">Magnet ✦</button></div>
<p class="cap">the button follows your cursor</p>`,
        css: `
.mg-z{padding:70px 90px}
.mg{padding:18px 42px;border-radius:999px;font-size:16px;font-weight:800;color:#fff;will-change:transform;
 background:linear-gradient(135deg,var(--v1),var(--v2));
 box-shadow:0 14px 40px color-mix(in srgb,var(--v1) 45%,transparent)}
.cap{color:var(--dim);font-size:12px;letter-spacing:.28em;text-transform:uppercase}`,
        js: `var z=document.getElementById('z'),b=document.getElementById('mg'),tx=0,ty=0,x=0,y=0;
z.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();
tx=(e.clientX-(r.left+r.width/2))*${pull};ty=(e.clientY-(r.top+r.height/2))*${pull}});
z.addEventListener('mouseleave',function(){tx=0;ty=0});
(function loop(){x+=(tx-x)*.16;y+=(ty-y)*.16;
b.style.transform='translate('+x+'px,'+y+'px)';
requestAnimationFrame(loop)})();`,
      }),
      prompt: `Build a magnetic button: inside a generous hover zone, the pill button "Magnet ✦" (${p.v1}→${p.v2} gradient, glow shadow) is pulled toward the cursor — offset = (pointer − button center) × ${pull}, smoothed each frame with lerp factor .16 so it glides; on mouseleave the target returns to 0 and the easing springs it home. requestAnimationFrame loop, no libraries.`,
    };
  },
};

/* 9 — typewriter phrases */
const typewriter: Fam = {
  id: "ga-typewriter", slugBase: "looping-typewriter-lines", title: "Looping Typewriter Lines",
  category: "animations",
  summary: "A typewriter that types, holds and deletes a loop of phrases with a glowing caret.",
  tags: ["typewriter", "text", "typing", "loop"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const sets = [
      ["landing pages.", "dashboards.", "design systems."],
      ["motion heroes.", "scroll stories.", "micro-interactions."],
      ["dark UIs.", "neon gradients.", "glass panels."],
      ["portfolios.", "launch pages.", "product tours."],
      ["button packs.", "loader sets.", "toggle kits."],
      ["AI prompts.", "live previews.", "code snippets."],
      ["parallax sites.", "3D cards.", "marquees."],
      ["startups.", "indie hackers.", "design teams."],
    ];
    const phrases = sets[vi % sets.length];
    return {
      html: docP(p, {
        body: `<div class="tw">We ship <span class="tw-w" id="tw"></span><span class="tw-c"></span></div>`,
        css: `
.tw{font-size:clamp(24px,4.6vw,36px);font-weight:800;display:flex;align-items:baseline;gap:12px}
.tw-w{background:linear-gradient(120deg,var(--v1),var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent;min-height:1.2em}
.tw-c{width:3px;height:1em;align-self:center;border-radius:2px;background:var(--c1);
 box-shadow:0 0 14px var(--c1);animation:twb .75s steps(1) infinite}
@keyframes twb{50%{opacity:0}}`,
        js: `var P=${JSON.stringify(phrases)},el=document.getElementById('tw'),i=0,pos=0,del=false;
(function tick(){var w=P[i];
pos+= del?-1:1;el.textContent=w.slice(0,pos);
var t= del?38:75;
if(!del&&pos===w.length){t=1500;del=true}
else if(del&&pos===0){del=false;i=(i+1)%P.length;t=420}
setTimeout(tick,t)})();`,
      }),
      prompt: `Build a looping typewriter: static prefix "We ship" then gradient text cycling through "${phrases.join('", "')}" — type at 75ms/char, hold 1.5s at full word, delete at 38ms/char, pause 420ms, advance. Add a glowing block caret in ${p.c1} that blinks on a .75s step. Vanilla JS setTimeout state machine.`,
    };
  },
};

/* 10 — click ripple */
const ripple: Fam = {
  id: "ga-ripple", slugBase: "ink-ripple-buttons", title: "Ink Ripple Buttons",
  category: "animations",
  summary: "Material-style ink ripples that bloom from the exact click point of each button.",
  tags: ["ripple", "click", "material", "feedback"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="rp">
<button class="rk" data-c="a">Save changes</button>
<button class="rk" data-c="b">Publish</button>
<button class="rk ghost" data-c="c">Preview</button>
</div>`,
      css: `
.rp{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.rk{position:relative;overflow:hidden;padding:14px 30px;border-radius:${vi % 2 ? '12px' : '999px'};font-size:14.5px;font-weight:700}
.rk[data-c="a"]{background:linear-gradient(135deg,var(--v1),var(--v2));color:#fff}
.rk[data-c="b"]{background:var(--c1);color:#0a0a18}
.rk.ghost{background:rgba(255,255,255,.06);color:var(--txt);border:1px solid var(--line)}
.ink{position:absolute;border-radius:50%;pointer-events:none;transform:scale(0);opacity:.5;
 background:currentColor;animation:ink .55s ease-out forwards}
@keyframes ink{to{transform:scale(2.6);opacity:0}}`,
      js: `document.querySelectorAll('.rk').forEach(function(b){b.addEventListener('pointerdown',function(e){
var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*1.1;
var s=document.createElement('span');s.className='ink';
s.style.width=s.style.height=d+'px';
s.style.left=(e.clientX-r.left-d/2)+'px';s.style.top=(e.clientY-r.top-d/2)+'px';
b.appendChild(s);setTimeout(function(){s.remove()},600)})});`,
    }),
    prompt: `Build ink-ripple buttons: three buttons (gradient ${p.v1}→${p.v2} / solid ${p.c1} dark text / ghost outline). On pointerdown (vanilla JS) append a span.ink sized 1.1× its largest edge, positioned exactly under the click point, colored currentColor at 50% opacity, animating scale 0→2.6 while fading out; remove after 600ms. Requires overflow:hidden + position:relative on the button. Radius ${vi % 2 ? '12px' : '999px'}.`,
  }),
};

/* 11 — orbit system */
const orbitSys: Fam = {
  id: "ga-orbit", slugBase: "orbital-ring-system", title: "Orbital Ring System",
  category: "animations",
  summary: "A glowing core with three orbit rings whose satellites circle at different speeds.",
  tags: ["orbit", "rings", "spinner", "solar"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const speeds = [6, 9, 13];
    return {
      html: docP(p, {
        body: `<div class="os">
<span class="core">◆</span>
<i class="ring r1"><b></b></i>
<i class="ring r2"><b></b></i>
<i class="ring r3"><b></b></i>
</div>`,
        css: `
.os{position:relative;width:260px;height:260px;display:grid;place-items:center}
.core{font-size:30px;color:#fff;filter:drop-shadow(0 0 18px var(--v1));
 width:74px;height:74px;display:grid;place-items:center;border-radius:50%;
 background:radial-gradient(circle at 32% 28%,var(--v1),var(--v2) 78%)}
.ring{position:absolute;border-radius:50%;border:1px solid color-mix(in srgb,var(--txt) 14%,transparent)}
.ring b{position:absolute;top:50%;left:-4px;width:9px;height:9px;border-radius:50%}
.r1{inset:32px;animation:osp ${speeds[0]}s linear infinite}
.r1 b{background:var(--v1);box-shadow:0 0 12px var(--v1)}
.r2{inset:-6px;animation:osp ${speeds[1]}s linear infinite reverse}
.r2 b{background:var(--v2);box-shadow:0 0 12px var(--v2)}
.r3{inset:-44px;animation:osp ${speeds[2]}s linear infinite}
.r3 b{background:var(--c1);box-shadow:0 0 12px var(--c1)}
@keyframes osp{to{transform:rotate(360deg)}}`,
      }),
      prompt: `Build an orbital ring system: a 74px glowing gradient core (${p.v1}→${p.v2} radial, drop-shadow) with three concentric rings at insets 32 / -6 / -44px (hairline 14% white borders). Each ring carries a 9px satellite dot pinned to its edge and the whole ring rotates: ${speeds[0]}s forward, ${speeds[1]}s reverse, ${speeds[2]}s forward — satellites glow in ${p.v1}/${p.v2}/${p.c1} respectively. Pure CSS.`,
    };
  },
};

/* 12 — radar sweep */
const radar: Fam = {
  id: "ga-radar", slugBase: "radar-sweep-panel", title: "Radar Sweep Panel",
  category: "animations",
  summary: "A radar scope with a rotating conic sweep, pulse rings and blinking contacts.",
  tags: ["radar", "sweep", "scan", "glow"],
  tech: ["html", "css"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="rd">
<i class="sw"></i><i class="ring"></i><i class="ring mid"></i>
<b class="blip" style="--d:0s;left:64%;top:30%"></b>
<b class="blip" style="--d:1.2s;left:38%;top:58%"></b>
<b class="blip" style="--d:2.1s;left:58%;top:70%"></b>
</div>`,
      css: `
.rd{position:relative;width:250px;height:250px;border-radius:50%;overflow:hidden;
 border:1px solid color-mix(in srgb,var(--v1) 45%,transparent);
 background:radial-gradient(circle,color-mix(in srgb,var(--v1) 10%,transparent) 1px,transparent 1px) 0 0/22px 22px,
 radial-gradient(circle at center,rgba(4,4,14,.4),#060612);
 box-shadow:inset 0 0 60px rgba(0,0,0,.6),0 0 44px color-mix(in srgb,var(--v1) 22%,transparent)}
.ring{position:absolute;inset:18%;border-radius:50%;border:1px solid color-mix(in srgb,var(--v1) 30%,transparent)}
.ring.mid{inset:36%}
.sw{position:absolute;inset:0;border-radius:50%;
 background:conic-gradient(from 0deg,color-mix(in srgb,var(--v1) 55%,transparent),transparent 18%);
 animation:rs ${3 + (vi % 3)}s linear infinite}
.blip{position:absolute;width:7px;height:7px;border-radius:50%;background:var(--c1);
 animation:blip 2.4s ease-out infinite;animation-delay:var(--d)}
@keyframes rs{to{transform:rotate(360deg)}}
@keyframes blip{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--c1) 65%,transparent);opacity:1}
 70%{box-shadow:0 0 0 10px transparent;opacity:.9}100%{opacity:.3}}`,
    }),
    prompt: `Build a radar scope: a 250px circle with a faint ${p.v1} dot-grid background and two hairline range rings. A conic-gradient wedge (${p.v1} fading to transparent over 18% of the circle) rotates fully every ${3 + (vi % 3)}s as the sweep. Three contact blips in ${p.c1} sit at fixed positions, each pulsing an expanding ring shadow on a 2.4s loop with staggered delays (CSS var --d). Outer glow + inset vignette. Pure CSS.`,
  }),
};

/* 13 — proximity grid glow */
const gridGlow: Fam = {
  id: "ga-grid", slugBase: "proximity-grid-glow", title: "Proximity Grid Glow",
  category: "animations",
  summary: "A wall of cells that light up and swell around your cursor like a tactile light panel.",
  tags: ["grid", "hover", "glow", "interactive", "cells"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const cell = [16, 20, 24, 18, 22, 16, 20, 24][vi];
    return {
      html: docP(p, {
        body: `<div class="gg" id="gg" style="width:min(520px,92vw);height:280px;--cs:${cell}px"></div>
<p class="cap">sweep your cursor across the panel</p>`,
        css: `
.gg{display:grid;grid-template-columns:repeat(auto-fill,var(--cs));grid-auto-rows:var(--cs);
 gap:3px;border-radius:18px;overflow:hidden;position:relative}
.gg i{background:rgba(255,255,255,.045);transition:background .5s,transform .5s,box-shadow .5s;border-radius:2px}
.gg i.lit{background:var(--v1);transform:scale(1.25);box-shadow:0 0 12px var(--v1);transition-duration:.08s}
.cap{color:var(--dim);font-size:12px;letter-spacing:.28em;text-transform:uppercase}`,
        js: `var g=document.getElementById('gg'),cells=[],i,cs=${cell};
function build(){g.innerHTML='';cells=[];
var cols=Math.floor(g.clientWidth/(cs+3)),rows=Math.floor(g.clientHeight/(cs+3));
for(i=0;i<cols*rows;i++){var c=document.createElement('i');g.appendChild(c);cells.push(c)}}
build();addEventListener('resize',build);
g.addEventListener('mousemove',function(e){
cells.forEach(function(c){var b=c.getBoundingClientRect();
var d=Math.hypot(e.clientX-(b.left+b.width/2),e.clientY-(b.top+b.height/2));
c.classList.toggle('lit',d<84)})});`,
      }),
      prompt: `Build a proximity grid glow: a 520×280 panel auto-filled with ${cell}px cells (computed from size on load/resize). On mousemove, measure each cell's center distance to the pointer; cells within 84px get .lit — background ${p.v1}, scale 1.25, colored glow — with an instant .08s turn-on and a slow .5s decay via asymmetric transition durations. Vanilla JS + CSS grid.`,
    };
  },
};

export const GEN_ANIMATION_ITEMS = materialize([
  constellation, confetti, sineWaves, blobs, letterRise, scramble,
  counters, magnetic, typewriter, ripple, orbitSys, radar, gridGlow,
]);

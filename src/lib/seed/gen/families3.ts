// Generated wave 27 — P1 batch two: form & validation, data-viz, story scrub,
// feedback, command palette, swipe deck, activity feed. 8 families × 8 = 64 items.

import { docP, Fam, materialize } from "./kit";

/* 1 — liquid range slider */
const liquidSlider: Fam = {
  id: "g3-slider", slugBase: "liquid-glow-range-slider", title: "Liquid Glow Range Slider",
  category: "elements",
  summary: "A velvety range control: glowing fill, pulsing thumb and a springy value bubble that trails the drag.",
  tags: ["slider", "range", "input", "form", "value"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="wrap">
<span class="bub" id="bub">64</span>
<div class="track" id="tr"><div class="lfill" id="f"></div><span class="th" id="th"></span></div>
<div class="cap"><span>Intensity</span><b id="v2">64%</b></div>
</div>`,
      css: `
.wrap{width:280px;display:grid;gap:12px;justify-items:center}
.bub{padding:5px 13px;border-radius:10px;font-size:12.5px;font-weight:800;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2))}
.track{position:relative;width:100%;height:8px;border-radius:99px;background:rgba(255,255,255,.08);cursor:pointer;touch-action:none}
.lfill{position:absolute;inset:0 auto 0 0;width:64%;border-radius:99px;
 background:linear-gradient(90deg,var(--v1),var(--v2));box-shadow:0 0 14px color-mix(in srgb,var(--v2) 55%,transparent)}
.th{position:absolute;top:50%;left:64%;width:22px;height:22px;border-radius:50%;translate:-50% -50%;
 background:#fff;border:3px solid var(--v1);box-shadow:0 0 0 6px color-mix(in srgb,var(--v1) 25%,transparent),0 4px 14px rgba(0,0,0,.5);
 transition:box-shadow .2s;pointer-events:none}
.track.on .th{box-shadow:0 0 0 10px color-mix(in srgb,var(--v1) 35%,transparent),0 4px 14px rgba(0,0,0,.5)}
.cap{display:flex;justify-content:space-between;width:100%;font-size:12px;color:var(--dim)}
.cap b{color:var(--c1);font-variant-numeric:tabular-nums}`,
      js: `var tr=document.getElementById('tr'),f=document.getElementById('f'),th=document.getElementById('th'),
bub=document.getElementById('bub'),v2=document.getElementById('v2');
function put(x){var b=tr.getBoundingClientRect(),k=Math.max(0,Math.min(1,(x-b.left)/b.width));
f.style.width=k*100+'%';th.style.left=k*100+'%';
bub.style.transform='translateX('+((k-.5)*(b.width-26))+'px)';
bub.textContent=Math.round(k*100);v2.textContent=Math.round(k*100)+'%'}
var down=false;
tr.addEventListener('pointerdown',function(e){down=true;tr.classList.add('on');put(e.clientX);tr.setPointerCapture(e.pointerId)});
tr.addEventListener('pointermove',function(e){if(down)put(e.clientX)});
addEventListener('pointerup',function(){down=false;tr.classList.remove('on')});`,
    }),
    prompt: `Build a liquid range slider on dark: 8px rounded track with glowing ${p.v1}→${p.v2} fill and a 22px white thumb ringed in ${p.v1} (glow halo widens while dragging). A gradient value bubble above translates along with the drag (spring easing) showing the live 0-100 value; a caption row below mirrors the percentage in ${p.c1}. Pointer events with capture support drag-off-track. Vanilla JS.`,
  }),
};

/* 2 — swipe deck like/pass */
const swipeDeck: Fam = {
  id: "g3-swipe", slugBase: "snap-swipe-deck", title: "Snap Swipe Deck",
  category: "components",
  summary: "A Tinder-style card stack: drag, rotate and fling cards with LIKE/NOPE stamps; the deck refills when empty.",
  tags: ["cards", "swipe", "drag", "deck", "gesture"],
  tech: ["html", "css", "javascript"],
  build: (p) => {
    const people = [["Ava, 26 :: landscape photographer"], ["Kai, 29 :: synth producer"], ["Mira, 24 :: rock climber"]];
    return {
      html: docP(p, {
        body: `<div class="deck" id="deck">${people.map((t, i) => `<div class="sw" data-i="${i}" style="--d:${i}">${t[0].split(" :: ").map((s, j) => j === 0 ? `<b>${s}</b>` : `<span>${s}</span>`).join("")}<em class="st yes">LIKE</em><em class="st no">NOPE</em></div>`).join("")}</div>
<div class="act"><button class="n" id="no">✕</button><button class="y" id="yes">♥</button></div>`,
        css: `
.deck{position:relative;width:250px;height:280px}
.sw{position:absolute;inset:0;display:grid;align-content:end;gap:2px;padding:20px;border-radius:22px;color:#fff;
 background:linear-gradient(160deg,color-mix(in srgb,var(--v1) 50%,#14142a),color-mix(in srgb,var(--v2) 55%,#0a0a1a));
 border:1px solid rgba(255,255,255,.14);transform-origin:bottom;transition:transform .3s;cursor:grab;user-select:none;touch-action:none;overflow:hidden}
.sw b{font-size:20px}.sw span{font-size:12.5px;opacity:.85}
.sw .st{position:absolute;top:18px;font-style:normal;font-weight:900;font-size:15px;letter-spacing:.14em;
 padding:5px 12px;border:3px solid;border-radius:9px;opacity:0}
.sw .yes{left:14px;color:var(--c1);border-color:var(--c1);transform:rotate(-14deg)}
.sw .no{right:14px;color:#fb7185;border-color:#fb7185;transform:rotate(14deg)}
.act{display:flex;gap:22px;margin-top:16px;justify-content:center}
.act button{width:52px;height:52px;border-radius:50%;font-size:20px;transition:transform .18s;background:rgba(255,255,255,.04)}
.act button:hover{transform:scale(1.14)}
.act .n{color:#fb7185;border:2px solid rgba(251,113,133,.5)}
.act .y{color:var(--c1);border:2px solid color-mix(in srgb,var(--c1) 55%,transparent)}`,
        js: `var deck=document.getElementById('deck');
function layout(){[].forEach.call(deck.querySelectorAll('.sw:not(.gone)'),function(c,i){
c.style.transform='translateY('+(i*-10)+'px) scale('+(1-i*.05)+')'});
if(!deck.querySelector('.sw:not(.gone)'))setTimeout(reset,350)}
function reset(){[].forEach.call(deck.children,function(c,i){c.classList.remove('gone');c.style.opacity=1;
c.style.transform='translateY('+(i*-10)+'px) scale('+(1-i*.05)+')'})}
function fling(c,dir){c.classList.add('gone');c.style.transition='transform .35s, opacity .35s';
c.style.transform='translateX('+(dir*560)+'px) rotate('+(dir*28)+'deg)';c.style.opacity=0;setTimeout(layout,300)}
[].forEach.call(deck.children,function(c){var sx=0,dx=0,drag=false;
c.addEventListener('pointerdown',function(e){if(c!==deck.querySelector('.sw:not(.gone)'))return;
sx=e.clientX;drag=true;c.setPointerCapture(e.pointerId);c.style.transition='none'});
c.addEventListener('pointermove',function(e){if(!drag)return;dx=e.clientX-sx;
c.style.transform='translateX('+dx+'px) rotate('+(dx*.06)+'deg)';
c.querySelector('.yes').style.opacity=Math.max(0,dx/90);
c.querySelector('.no').style.opacity=Math.max(0,-dx/90)});
c.addEventListener('pointerup',function(){if(!drag)return;drag=false;c.style.transition='transform .3s';
if(Math.abs(dx)>100)fling(c,dx>0?1:-1);
else{c.style.transform='';c.querySelectorAll('.st').forEach(function(s){s.style.opacity=0});layout()}
dx=0})});
layout();
document.getElementById('yes').addEventListener('click',function(){var c=deck.querySelector('.sw:not(.gone)');if(c)fling(c,1)});
document.getElementById('no').addEventListener('click',function(){var c=deck.querySelector('.sw:not(.gone)');if(c)fling(c,-1)});`,
      }),
      prompt: `Build a Tinder-style swipe deck (${p.v1}/${p.v2} gradient cards with name+tagline): pointer-drag moves the top card with slight rotation, fading in rotated "LIKE" (${p.c1}) / "NOPE" (rose) stamps past ~90px of travel; release beyond 100px flings off-screen, under it springs back; the remaining stack re-lays out (translateY -10px × depth, scale shrink); ♥/✕ round buttons fling programmatically; an empty deck refills after a beat. Vanilla JS, touch-action none.`,
    };
  },
};

/* 3 — semicircle gauge meter */
const gaugeMeter: Fam = {
  id: "g3-gauge", slugBase: "energy-gauge-meter", title: "Energy Gauge Meter",
  category: "components",
  summary: "A semicircle SVG gauge that sweeps to its value on load, counts the % up, color-shifting by zone.",
  tags: ["gauge", "chart", "meter", "svg", "dashboard"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="g">
<svg viewBox="0 0 200 120" width="270">
<path d="M 20 105 A 80 80 0 0 1 180 105" fill="none" stroke-width="14" stroke-linecap="round" class="bg"/>
<path id="val" d="M 20 105 A 80 80 0 0 1 180 105" fill="none" stroke-width="14" stroke-linecap="round"/>
<g id="ticks"></g>
</svg>
<div class="num"><b id="n">0</b><span>%</span></div>
<p class="st" id="st" style="color:${p.c1}">—</p>
</div>`,
      css: `
.g{display:grid;place-items:center;gap:2px}
.bg{stroke:rgba(255,255,255,.09)}
#val{stroke:var(--c1);filter:drop-shadow(0 0 10px color-mix(in srgb,var(--c1) 60%,transparent))}
#ticks rect{fill:rgba(255,255,255,.16)}
.num{margin-top:-56px;display:flex;align-items:baseline}
.num b{font-size:34px;font-weight:900;font-variant-numeric:tabular-nums}
.num span{color:var(--dim);font-weight:700;margin-left:2px}
.st{font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:800}`,
      js: `var V=${[62, 34, 88, 51, 76, 27, 93, 58][vi]},C=251.33,
words=['CALM','WARM','SURGE','CALM','FLOW','CALM','SURGE','WARM'],
circ=document.getElementById('val'),n=document.getElementById('n'),st=document.getElementById('st'),
tk=document.getElementById('ticks');
for(var i=0;i<12;i++){var g=document.createElementNS('http://www.w3.org/2000/svg','g');
g.setAttribute('transform','rotate('+(-90+i*(180/11))+' 100 105)');
var r=document.createElementNS('http://www.w3.org/2000/svg','rect');
r.setAttribute('x',98.5);r.setAttribute('y',12);r.setAttribute('width',3);r.setAttribute('height',9);r.setAttribute('rx',1.5);
g.appendChild(r);tk.appendChild(g)}
circ.style.strokeDasharray=C+' '+C;circ.style.strokeDashoffset=C;
var t0=performance.now();
(function anim(t){var k=Math.min(1,(t-t0)/1600),e=1-Math.pow(1-k,3);
circ.style.strokeDashoffset=C*(1-(V/100)*e);n.textContent=Math.round(V*e);
if(k<1)requestAnimationFrame(anim);else st.textContent=words[${vi}]})(t0);`,
    }),
    prompt: `Build a semicircle SVG gauge: a dashed-track 180° arc (radius 80 → circumference half ≈ 251.33 = 2πr/2) and a ${p.c1} value arc with drop-shadow glow that sweeps from empty to V% over 1.6s (cubic ease-out via rAF) while a centered number counts up; 12 tick marks placed by rotating a rect around the arc center via createElementNS; below the dial an uppercase status word in ${p.c1} appears when the sweep completes. Vanilla JS.`,
  }),
};

/* 4 — animated donut chart */
const donutChart: Fam = {
  id: "g3-donut", slugBase: "traffic-donut-chart", title: "Traffic Donut Chart",
  category: "components",
  summary: "A donut chart whose arcs draw themselves on load; hovering a legend row lifts the matching slice.",
  tags: ["donut", "chart", "data", "analytics", "pie"],
  tech: ["html", "css", "javascript"],
  build: (p) => {
    const series = [
      ["Organic", "44", "#8b5cf6"], ["Direct", "27", "#22d3ee"], ["Referral", "14", "#f59e0b"], ["Social", "8", "#f43f5e"], ["Other", "7", "#64748b"],
    ];
    const segs = series.map(([n, v, c], i) => `<circle id="s${i}" r="70" cx="100" cy="100" fill="none" stroke="${c}" stroke-width="26" stroke-dasharray="0 440"/>`).join("");
    const rows = series.map(([n, v, c], i) => `<div class="row" data-i="${i}"><i style="background:${c}"></i>${n}<b>${v}%</b></div>`).join("");
    return {
      html: docP(p, {
        body: `<div class="box"><svg viewBox="0 0 200 200" width="180">
<circle r="70" cx="100" cy="100" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="26"/>
${segs}<text x="100" y="96" class="ct">12.4k</text><text x="100" y="114" class="cs">visitors</text></svg>
<div class="leg">${rows}</div></div>`,
        css: `
.box{display:flex;gap:22px;align-items:center}
svg circle{transition:stroke-dasharray 1.3s cubic-bezier(.22,1,.36,1),filter .25s,opacity .25s;transform:rotate(-90deg);transform-origin:center}
svg circle.hl{filter:drop-shadow(0 0 8px currentColor)}
.ct{fill:#fff;font-size:22px;font-weight:800;text-anchor:middle;font-family:inherit}
.cs{fill:var(--dim);font-size:11px;text-anchor:middle;font-family:inherit}
.leg{display:grid;gap:9px}
.row{display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--dim);cursor:pointer;padding:4px 8px;border-radius:8px;transition:background .2s}
.row:hover{background:rgba(255,255,255,.05);color:#fff}
.row i{width:9px;height:9px;border-radius:3px}
.row b{margin-left:auto;color:#fff;font-variant-numeric:tabular-nums;font-variant:tabular-nums;padding-left:16px}`,
        js: `var C=2*Math.PI*70,sum=0,data=[${series.map(([, v]) => v).join(',')}];
data.forEach(function(v,i){var pct=v/100,el=document.getElementById('s'+i);
requestAnimationFrame(function(){el.style.strokeDasharray=(pct*C-4)+' '+C;el.style.strokeDashoffset=-sum*C});
sum+=pct});
document.querySelectorAll('.row').forEach(function(r){r.addEventListener('mouseenter',function(){
document.querySelectorAll('svg circle[id^="s"]').forEach(function(c){c.classList.remove('hl');c.style.opacity=.45});
var el=document.getElementById('s'+this.dataset.i);el.classList.add('hl');el.style.opacity=1});
r.addEventListener('mouseleave',function(){
document.querySelectorAll('svg circle[id^="s"]').forEach(function(c){c.classList.remove('hl');c.style.opacity=1})})});`,
      }),
      prompt: `Build an animated donut chart: five circle segments on a shared r=70 circle (circumference 440) that self-draw after mount by setting stroke-dasharray = pct·C−4 with cumulative -sum·C offsets (cubic-bezier draw 1.3s); muted track circle behind; centered total count ("12.4k visitors"); a legend of colored-dot rows where hovering one row lifts its slice with a matching glow (drop-shadow + dim the rest to 45%). Vanilla JS + SVG.`,
    };
  },
};

/* 5 — auto story strip (scroll-scrub feel) */
const storyStrip: Fam = {
  id: "g3-story", slugBase: "scrub-story-strip", title: "Scrub Story Strip",
  category: "animations",
  summary: "A cinematic progress strip: three captions scrub across in sequence with a page-progress bar — like scroll, hands-free.",
  tags: ["story", "scrub", "scroll", "progress", "cinematic"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="panel">
<div class="trio"><span class="on" id="w0">Imagine</span><span id="w1">Create</span><span id="w2">Ship</span></div>
<div class="beam" id="beam"></div>
<div class="pbar"><div class="pf" id="pf"></div></div>
</div>`,
      css: `
.panel{width:300px;display:grid;gap:26px}
.trio{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.24em;text-transform:uppercase;
 color:var(--dim);font-weight:700}
.trio span{transition:all .35s}
.trio span.on{color:var(--c1);transform:scale(1.18) translateY(-3px);text-shadow:0 0 16px color-mix(in srgb,var(--c1) 60%,transparent)}
.beam{height:110px;border-radius:18px;position:relative;overflow:hidden;
 background:linear-gradient(120deg,color-mix(in srgb,var(--v1) 40%,#0d0d20),color-mix(in srgb,var(--v2) 35%,#0a0a1a))}
.beam::before{content:'';position:absolute;inset:0;
 background:repeating-linear-gradient(110deg,transparent 0 26px,color-mix(in srgb,var(--c1) 16%,transparent) 26px 40px)}
.beam .orb2{position:absolute;top:50%;left:calc(var(--x,0%)*.8 + 10%);width:44px;height:44px;border-radius:50%;translate:-50% -50%;
 background:radial-gradient(circle at 35% 30%,#fff,var(--c1) 45%,var(--v1));
 box-shadow:0 0 30px color-mix(in srgb,var(--c1) 70%,transparent)}
.pbar{height:5px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.pf{height:100%;width:0%;background:linear-gradient(90deg,var(--v1),var(--c1),var(--v2));
 box-shadow:0 0 10px color-mix(in srgb,var(--v2) 50%,transparent)}`,
      js: `var beam=document.getElementById('beam'),pf=document.getElementById('pf'),
or=document.createElement('span');or.className='orb2';beam.appendChild(or);
var ws=[document.getElementById('w0'),document.getElementById('w1'),document.getElementById('w2')];
var t0=performance.now(),DUR=5200;
(function loop(t){var k=((t-t0)%DUR)/DUR,phase=Math.floor(k*3);
or.style.setProperty('--x',(k*100)+'%');
pf.style.width=(k*100)+'%';
ws.forEach(function(w,i){w.classList.toggle('on',i===phase)});
requestAnimationFrame(loop)})(t0);`,
    }),
    prompt: `Build a hands-free "scroll-story" card: a 300px panel lists three uppercase tracking words (Imagine / Create / Ship) that light up ${p.c1} and scale with glow one at a time; beneath, a beam panel with diagonal sheen stripes carries an orb (radial white→${p.c1}→${p.v1}) that rides left→right via a CSS custom property driven by rAF; a bottom progress bar sweeps the full width in ${p.v1}→${p.v2} gradient, looping every 5.2s in sync. Vanilla JS + CSS var binding.`,
  }),
};

/* 6 — inline form validation feedback */
const formValidation: Fam = {
  id: "g3-form", slugBase: "inline-form-validation", title: "Inline Form Validation",
  category: "components",
  summary: "Signup fields validate as you type: green check borders, rule hints, shake on bad submit, success flare.",
  tags: ["form", "validation", "input", "feedback", "signup"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<form class="fm" id="fm" novalidate>
<label class="fld"><span>Email</span><input id="em" type="email" placeholder="you@studio.dev" autocomplete="off"/><em></em></label>
<label class="fld"><span>Password <i class="hint">≥ 8, one number</i></span><input id="pw" type="password" placeholder="••••••••"/><em></em></label>
<label class="fld"><span>Confirm</span><input id="cf" type="password" placeholder="••••••••"/><em></em></label>
<button id="go">Create account</button>
<p class="done" id="done">✓ Account created — welcome aboard</p>
</form>`,
      css: `
.fm{width:290px;display:grid;gap:14px}
.fld{display:grid;gap:6px;font-size:11.5px;font-weight:700;color:var(--dim);letter-spacing:.06em;text-transform:uppercase}
.hint{font-style:normal;text-transform:none;letter-spacing:0;font-weight:500;opacity:.7}
.fld em{font-style:normal}
.fld input{padding:11px 14px;border-radius:11px;font-size:14px;color:var(--txt);
 background:rgba(255,255,255,.05);border:1.5px solid var(--line);outline:none;transition:all .22s}
.fld input:focus{border-color:var(--v1)}
.fld.ok input{border-color:var(--c1);box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 18%,transparent)}
.fld.ok em{color:var(--c1);text-transform:none;font-size:11px}
.fld.ok em::before{content:'✓ looks good'}
.fld.bad input{border-color:#fb7185;box-shadow:0 0 0 3px rgba(251,113,133,.14)}
.fld.bad em{color:#fb9fb2;text-transform:none;font-size:11px}
button{padding:12px;border-radius:11px;font-weight:800;font-size:14px;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));transition:all .2s}
button:hover{transform:translateY(-2px);box-shadow:0 10px 24px color-mix(in srgb,var(--v1) 40%,transparent)}
form.shake{animation:fshk .4s}
@keyframes fshk{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
.done{margin:0;font-size:12.5px;color:var(--c1);text-align:center;opacity:0;transition:opacity .3s;font-weight:700}
.done.on{opacity:1}`,
      js: `var em=document.getElementById('em'),pw=document.getElementById('pw'),cf=document.getElementById('cf'),
fm=document.getElementById('fm'),done=document.getElementById('done');
function mark(i,ok,err){var l=i.closest('.fld'),m=l.querySelector('em');
l.classList.remove('ok','bad');
if(i.value===''){m.textContent='';return false}
l.classList.add(ok?'ok':'bad');m.textContent=ok?'':err;return ok}
em.addEventListener('input',function(){mark(em,/^\\S+@\\S+\\.\\S+$/.test(em.value),'invalid email address')});
pw.addEventListener('input',function(){mark(pw,pw.value.length>=8&&/\\d/.test(pw.value),'need 8+ chars and a number')});
cf.addEventListener('input',function(){mark(cf,cf.value===pw.value&&cf.value!=='','passwords do not match')});
fm.addEventListener('submit',function(e){e.preventDefault();done.classList.remove('on');
var a=mark(em,/^\\S+@\\S+\\.\\S+$/.test(em.value),'invalid email address');
var b=mark(pw,pw.value.length>=8&&/\\d/.test(pw.value),'need 8+ chars and a number');
var c=mark(cf,cf.value===pw.value&&cf.value!=='','passwords do not match');
if(a&&b&&c){done.classList.add('on')}else{fm.classList.remove('shake');void fm.offsetWidth;fm.classList.add('shake')}});`,
    }),
    prompt: `Build a three-field signup form with live inline validation on dark: email (regex), password (8+ with a digit), confirm (must match). As the user types each field flips .ok (green border + soft glow + "✓ looks good") or .bad (rose border + specific hint). Submit re-checks all; on any failure the whole form shakes; on success a ${p.c1} confirmation line fades in. Vanilla JS, novalidate.`,
  }),
};

/* 7 — command palette ⌘K */
const commandMenu: Fam = {
  id: "g3-cmd", slugBase: "swift-command-palette", title: "Swift Command Palette",
  category: "elements",
  summary: "A ⌘K-style palette: type to filter actions, arrow keys to move, Enter to run — with shortcut hints.",
  tags: ["command", "palette", "keyboard", "search", "kbar"],
  tech: ["html", "css", "javascript"],
  build: (p) => {
    const acts = [
      ["✨", "Create new vault", "⌘N"], ["🔍", "Search components", "/"], ["🎨", "Change theme", "⌘T"],
      ["📤", "Share preview", "⌘S"], ["❤️", "View favorites", "⌘F"], ["⚙", "Open settings", "⌘,"],
    ];
    return {
      html: docP(p, {
        body: `<div class="cm"><div class="inp"><span>⌘</span><input id="cin" placeholder="Type a command…"/></div>
<ul id="lst">${acts.map(([i, l, k], n) => `<li data-i="${n}"><span class="zi">${i}</span>${l}<kbd>${k}</kbd></li>`).join("")}</ul>
<p class="foot"><span id="cnt">${acts.length} results</span><b>↑↓ navigate · ⏎ run</b></p>
</div>
<p class="toastl" id="tl"></p>`,
        css: `
.cm{width:340px;border-radius:18px;background:#0d0d22;border:1px solid color-mix(in srgb,var(--v1) 35%,transparent);
 box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 40px color-mix(in srgb,var(--v1) 18%,transparent);overflow:hidden}
.inp{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line)}
.inp span{color:var(--c1);font-weight:900}
.inp input{flex:1;background:none;border:none;outline:none;color:var(--txt);font-size:14px}
#lst{list-style:none;max-height:220px;overflow:auto;padding:6px}
#lst li{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:10px;font-size:13.5px;color:#b9bede;
 cursor:pointer;transition:background .15s}
#lst li .zi{width:22px;text-align:center}
#lst li kbd{margin-left:auto;font-size:10px;padding:3px 7px;border-radius:6px;color:var(--dim);
 background:rgba(255,255,255,.06);border:1px solid var(--line);font-family:monospace}
#lst li.on{background:color-mix(in srgb,var(--v1) 22%,transparent);color:#fff}
#lst li.on kbd{border-color:color-mix(in srgb,var(--v1) 45%,transparent);color:var(--c1)}
.foot{display:flex;justify-content:space-between;padding:9px 16px;font-size:10.5px;color:var(--dim);
 border-top:1px solid var(--line)}
.toastl{margin-top:14px;font-size:12px;color:var(--c1);min-height:16px;font-weight:700;transition:opacity .3s}`,
        js: `var cin=document.getElementById('cin'),lst=document.getElementById('lst'),
cnt=document.getElementById('cnt'),tl=document.getElementById('tl');
var items=[].slice.call(lst.children),sel=0;
function visible(){return items.filter(function(i){return i.style.display!=='none'})}
function paint(){visible().forEach(function(i,k){i.classList.toggle('on',k===sel)})}
function apply(q){items.forEach(function(i){i.style.display=i.textContent.toLowerCase().includes(q.toLowerCase())?'':'none'});
sel=0;cnt.textContent=visible().length+' results';paint()}
cin.addEventListener('input',function(){apply(cin.value.trim())});
cin.addEventListener('keydown',function(e){var v=visible();if(!v.length)return;
if(e.key==='ArrowDown'){sel=(sel+1)%v.length;paint();e.preventDefault()}
if(e.key==='ArrowUp'){sel=(sel-1+v.length)%v.length;paint();e.preventDefault()}
if(e.key==='Enter'){var t=v[sel];tl.textContent='▶ running: '+t.textContent.trim().replace(/⌘.*/,'');tl.style.opacity=1;
cin.value='';apply('');setTimeout(function(){tl.style.opacity=0},1600)}});
apply('');cin.focus();`,
      }),
      prompt: `Build a ⌘K command palette box on deep dark (border-glow ${p.v1}, huge drop shadow): header row with a ${p.c1} ⌘ and a search input that live-filters six action rows (icon + label + monospace kbd shortcut); ↑/↓ cycle through visible rows with .on gradient row-highlight; Enter "runs" the command into a brief ${p.c1} status line below and resets. Result count in the footer updates. Vanilla JS.`,
    };
  },
};

/* 8 — live activity feed */
const activityFeed: Fam = {
  id: "g3-feed", slugBase: "pulse-activity-feed", title: "Pulse Activity Feed",
  category: "components",
  summary: "A stream of team events slides in one by one with avatar rings, relative timestamps and a live glow dot.",
  tags: ["feed", "activity", "timeline", "stream", "notifications"],
  tech: ["html", "css", "javascript"],
  build: (p) => {
    const ev = [
      ["AR", "Ari deployed v2.4.0", "just now"], ["KM", "Kai commented on Aurora Hero", "2m"], ["MI", "Mira favorited 8 components", "7m"],
      ["JO", "Jon merged PR #118", "14m"], ["SO", "Sofia shipped the pricing page", "31m"],
    ];
    return {
      html: docP(p, {
        body: `<div class="fd"><div class="top"><span class="lv"></span>Team pulse</div>
<div id="rows">${ev.map(([a, t, s], i) => `<div class="rw" style="--k:${i}"><span class="av">${a}</span><div><b>${t}</b><i>${s}</i></div></div>`).join("")}</div>
</div>`,
        css: `
.fd{width:300px;padding:16px;border-radius:20px;background:rgba(255,255,255,.04);border:1px solid var(--line)}
.top{display:flex;align-items:center;gap:9px;font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;
 color:var(--dim);margin-bottom:12px}
.lv{width:8px;height:8px;border-radius:50%;background:var(--c1);animation:lvp 1.8s ease-in-out infinite}
@keyframes lvp{50%{box-shadow:0 0 0 7px transparent}0%,100%{box-shadow:0 0 0 2px color-mix(in srgb,var(--c1) 55%,transparent)}}
.rw{display:flex;align-items:center;gap:12px;padding:10px 8px;border-radius:12px;
 animation:rwin .5s cubic-bezier(.34,1.56,.64,1) both;animation-delay:calc(var(--k)*.14s)}
.rw:hover{background:rgba(255,255,255,.05)}
@keyframes rwin{from{opacity:0;transform:translateX(-18px)}}
.av{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:900;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));flex-shrink:0;
 box-shadow:0 0 0 2px #0d0d20,0 0 0 3.5px color-mix(in srgb,var(--c1) 55%,transparent)}
.rw b{display:block;font-size:13px;font-weight:600;color:var(--txt)}
.rw i{font-style:normal;font-size:11px;color:var(--dim)}`,
        js: `var rowsEl=document.getElementById('rows');
var pool=[['LX','Lena invited 3 members','now'],['TM','Tom pushed 2 commits','now'],['NA','Nina updated the design tokens','now']],pi=0;
setInterval(function(){var e2=pool[pi++%pool.length],r=document.createElement('div');
r.className='rw';r.style.setProperty('--k',0);
r.innerHTML='<span class="av">'+e2[0]+'</span><div><b>'+e2[1]+'</b><i>'+e2[2]+'</i></div>';
rowsEl.prepend(r);if(rowsEl.children.length>6)rowsEl.lastElementChild.remove()},3400);`,
      }),
      prompt: `Build a "team pulse" activity feed: 300px glass card, header with a pulsing ${p.c1} live dot (ring-box-shadow beat) and uppercase tracking label; each row springs in from the left with staggered delays, gradient avatar initials ringed in ${p.c1}, event text + muted timestamp; every 3.4s JS prepends a new event and trims the list to six rows with hover states. Vanilla JS.`,
    };
  },
};

export const GEN3_ITEMS = materialize([
  liquidSlider, swipeDeck, gaugeMeter, donutChart, storyStrip, formValidation, commandMenu, activityFeed,
]);

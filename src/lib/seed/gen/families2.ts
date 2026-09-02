// Generated wave 26 — P1 new directions: e-commerce, dashboard, media player,
// onboarding coachmark, AI chat, OTP input, launch countdown, empty state.
// 8 families × 8 palette variants = 64 items.

import { docP, Fam, materialize } from "./kit";

/* 1 — e-commerce: product card with size select + fly-to-cart feedback */
const productCard: Fam = {
  id: "g2-product", slugBase: "aura-product-card", title: "Aura Product Card",
  category: "components",
  summary: "Glassy storefront card: gradient artwork, size chips, price, and an add-to-cart that snaps to ✓ Added.",
  tags: ["ecommerce", "product", "card", "cart", "shop"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="pc">
<div class="art"><span class="tag">New</span><span class="shoe">◈</span></div>
<h3>Nebula Runner ${["OG", "Air", "Pro", "SE", "X", "Max", "Lite", "GT"][vi]}</h3>
<p class="pr">$189 <s>$240</s></p>
<div class="sz" id="sz">${["7", "8", "9", "10", "11"].map((s, i) => `<button class="${i === 1 ? "on" : ""}" data-s="${s}">${s}</button>`).join("")}</div>
<button class="add" id="add">Add to cart</button>
</div>`,
      css: `
.pc{width:280px;padding:14px;border-radius:22px;background:rgba(255,255,255,.05);border:1px solid var(--line)}
.art{position:relative;height:150px;border-radius:16px;display:grid;place-items:center;overflow:hidden;
 background:linear-gradient(140deg,color-mix(in srgb,var(--v1) 55%,#101022),color-mix(in srgb,var(--v2) 45%,#0a0a1a))}
.art::before{content:'';position:absolute;inset:-40%;background:conic-gradient(from 0deg,transparent,color-mix(in srgb,var(--c1) 30%,transparent),transparent 32%);
 animation:spin2 9s linear infinite}
@keyframes spin2{to{transform:rotate(360deg)}}
.shoe{font-size:56px;color:#fff;filter:drop-shadow(0 10px 24px rgba(0,0,0,.5));position:relative;z-index:1;
 animation:hover3 3.4s ease-in-out infinite}
@keyframes hover3{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-9px) rotate(-4deg)}}
.tag{position:absolute;top:10px;left:10px;z-index:2;font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;
 padding:5px 10px;border-radius:999px;color:#0a0a16;background:var(--c1)}
.pc h3{margin:14px 4px 2px;font-size:16.5px;font-weight:800}
.pr{margin:0 4px 12px;font-size:15px;color:var(--c1);font-weight:800}
.pr s{color:var(--dim);font-weight:500;font-size:12.5px;margin-left:6px}
.sz{display:flex;gap:7px;margin:0 4px 14px}
.sz button{flex:1;padding:8px 0;font-size:12.5px;font-weight:700;border-radius:10px;color:var(--dim);
 background:rgba(255,255,255,.05);border:1px solid var(--line);transition:all .2s}
.sz button.on{color:#fff;border-color:var(--v1);background:color-mix(in srgb,var(--v1) 22%,transparent);
 box-shadow:0 0 16px color-mix(in srgb,var(--v1) 35%,transparent)}
.add{width:100%;padding:13px;border-radius:12px;font-weight:800;font-size:14px;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));transition:all .25s}
.add:hover{transform:translateY(-2px);box-shadow:0 12px 26px color-mix(in srgb,var(--v1) 45%,transparent)}
.add.done{background:linear-gradient(135deg,#34d399,#10b981)}`,
      js: `var add=document.getElementById('add');
document.querySelectorAll('#sz button').forEach(function(b){b.addEventListener('click',function(){
document.querySelectorAll('#sz button').forEach(function(x){x.classList.remove('on')});b.classList.add('on')})});
add.addEventListener('click',function(){if(add.classList.contains('done'))return;
var old=add.textContent;add.classList.add('done');add.textContent='✓ Added — size '+document.querySelector('#sz .on').dataset.s;
setTimeout(function(){add.classList.remove('done');add.textContent=old},1600)});`,
    }),
    prompt: `Build an e-commerce product card on dark glass: a 150px artwork panel with a rotating conic sheen hover (${p.v1}/${p.v2} blend), floating sneaker glyph ◈ with drop shadow, "New" chip in ${p.c1}; title "Nebula Runner", price $189 with struck $240 in ${p.c1}; five size chips (7-11) where the active chip glows ${p.v1} (JS toggles .on); the full-width gradient Add-to-cart button snaps to green "✓ Added — size N" for 1.6s on click, then reverts. Vanilla JS.`,
  }),
};

/* 2 — dashboard KPI card with count-up and sparkline */
const kpiCard: Fam = {
  id: "g2-kpi", slugBase: "live-kpi-card", title: "Live KPI Card",
  category: "components",
  summary: "Analytics KPI tile: pulsing status dot, counting number, delta chip and a live-updating sparkline.",
  tags: ["dashboard", "kpi", "analytics", "sparkline", "status"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="kpi">
<div class="top"><span class="dot"></span><span class="lb">${["Active users", "Revenue today", "Uptime", "Signups", "API latency", "Conversion", "Transactions", "Live viewers"][vi]}</span><b class="up">+${(4 + vi * 0.7).toFixed(1)}%</b></div>
<div class="num"><span id="v">0</span><i>${["", " USD", "%", "", "ms", "%", "", ""][vi]}</i></div>
<svg viewBox="0 0 220 60" class="sp"><path id="ln" fill="none" stroke-width="3" stroke-linecap="round"/></svg>
</div>`,
      css: `
.kpi{width:280px;padding:22px 24px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid var(--line)}
.top{display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--dim);font-weight:600}
.dot{width:8px;height:8px;border-radius:50%;background:var(--c1);animation:kpd 1.6s ease-in-out infinite}
@keyframes kpd{50%{box-shadow:0 0 0 7px transparent}0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--c1) 55%,transparent)}}
.up{margin-left:auto;color:var(--c1);font-weight:800;font-size:12px}
.num{display:flex;align-items:baseline;gap:6px;margin:12px 0 6px}
.num span{font-size:40px;font-weight:900;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.num i{font-style:normal;font-size:15px;color:var(--dim);font-weight:700}
.sp{width:100%;height:60px;stroke:var(--v1);filter:drop-shadow(0 4px 12px color-mix(in srgb,var(--v1) 45%,transparent))}`,
      js: `var T=${[8421, 12980, 99, 412, 86, 3, 90210, 1337][vi]},tgt=T,el=document.getElementById('v'),ln=document.getElementById('ln');
function count(){var t0=performance.now();(function tk(n){var k=Math.min(1,(n-t0)/1300),e=1-Math.pow(1-k,3);
el.textContent=Math.round(tgt*e).toLocaleString('en-US');if(k<1)requestAnimationFrame(tk)})(t0)}
count();
var pts=[];function line(){pts.shift();pts.push(tgt*(0.94+Math.random()*.12));tgt=T*(0.94+Math.random()*.12);
el.textContent=Math.round(tgt).toLocaleString('en-US');
var d='M4 52';pts.forEach(function(v,i){var x=4+i*(212/7),y=55-(v/(T*1.12))*50;d+=' L'+x.toFixed(1)+' '+y.toFixed(1)});
ln.setAttribute('d',d)}
for(var i2=0;i2<8;i2++)pts.push(T*(0.9+Math.random()*.12));
var d2='M4 52';pts.forEach(function(v,i){var x=4+i*(212/7),y=55-(v/(T*1.12))*50;d2+=' L'+x.toFixed(1)+' '+y.toFixed(1)});
ln.setAttribute('d',d2);setInterval(line,1800);`,
    }),
    prompt: `Build a glass KPI dashboard card: pulsing ${p.c1} status dot (ring shadow pulse), muted label row with a ${p.c1} delta chip "+x%"; a 40px tabular-numeral count-up to the target on load (rAF cubic ease-out); a ${p.v1} SVG sparkline whose polyline is computed in JS and slides left every 1.8s as a new randomized point arrives, number updating live. Rounded 20px, subtle border. Vanilla JS + SVG.`,
  }),
};

/* 3 — nebula audio player skin */
const audioPlayer: Fam = {
  id: "g2-player", slugBase: "nebula-audio-player", title: "Nebula Audio Player",
  category: "components",
  summary: "A music-player card: spinning artwork disc, play/pause morph, live progress and bouncing equalizer bars.",
  tags: ["audio", "player", "media", "music", "equalizer"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="pl">
<div class="row">
<div class="disc" id="disc"><span>✦</span></div>
<div class="meta"><h3>Midnight Drive</h3><p>Neon Skyline — synthwave mix</p>
<div class="eq" id="eq"><i></i><i></i><i></i><i></i><i></i></div></div>
</div>
<div class="bar"><div class="fill" id="fill"></div></div>
<div class="ctl"><span id="t0">0:00</span><button class="pp" id="pp">▶</button><span>3:42</span></div>
</div>`,
      css: `
.pl{width:320px;padding:22px;border-radius:22px;background:rgba(255,255,255,.05);border:1px solid var(--line)}
.row{display:flex;gap:16px;align-items:center}
.disc{width:76px;height:76px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;font-size:24px;color:#fff;
 background:conic-gradient(from 0deg,var(--v1),var(--v2),var(--c1),var(--v1));animation:ds 6s linear infinite paused;
 box-shadow:0 0 0 5px rgba(255,255,255,.06),0 0 30px color-mix(in srgb,var(--v1) 40%,transparent)}
.disc::after{content:'';position:absolute;width:14px;height:14px;border-radius:50%;background:#0a0a18}
.disc.playing{animation-play-state:running}
@keyframes ds{to{transform:rotate(360deg)}}
.meta h3{font-size:15.5px;font-weight:800}
.meta p{font-size:12px;color:var(--dim);margin:3px 0 8px}
.eq{display:flex;gap:3px;height:16px;align-items:flex-end}
.eq i{width:4px;height:100%;border-radius:2px;background:linear-gradient(to top,var(--v1),var(--c1));
 transform-origin:bottom;transform:scaleY(.18);transition:transform .1s}
.eq.on i{animation:eqa .9s ease-in-out infinite}
.eq.on i:nth-child(2){animation-delay:.12s}.eq.on i:nth-child(3){animation-delay:.24s}
.eq.on i:nth-child(4){animation-delay:.06s}.eq.on i:nth-child(5){animation-delay:.3s}
@keyframes eqa{0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}}
.bar{height:6px;border-radius:99px;background:rgba(255,255,255,.08);margin:18px 0 10px;overflow:hidden;cursor:pointer}
.fill{height:100%;width:0%;border-radius:99px;background:linear-gradient(90deg,var(--v1),var(--v2));
 box-shadow:0 0 12px color-mix(in srgb,var(--v2) 55%,transparent)}
.ctl{display:flex;align-items:center;justify-content:space-between;color:var(--dim);font-size:11.5px;font-variant-numeric:tabular-nums}
.pp{width:42px;height:42px;border-radius:50%;font-size:15px;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));transition:transform .2s}
.pp:hover{transform:scale(1.1)}`,
      js: `var pp=document.getElementById('pp'),disc=document.getElementById('disc'),eq=document.getElementById('eq'),
fill=document.getElementById('fill'),t0=document.getElementById('t0'),DUR=222,cur=0,on=false,raf;
function fmt(s){s=Math.floor(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function tick(){cur+=.25;if(cur>=DUR)cur=0;fill.style.width=(cur/DUR*100)+'%';t0.textContent=fmt(cur);
if(on)raf=setTimeout(tick,250)}
pp.addEventListener('click',function(){on=!on;pp.textContent=on?'❚❚':'▶';
disc.classList.toggle('playing',on);eq.classList.toggle('on',on);
clearTimeout(raf);if(on)tick()});
document.querySelector('.bar').addEventListener('click',function(e){var b=this.getBoundingClientRect();
cur=(e.clientX-b.left)/b.width*DUR;fill.style.width=(cur/DUR*100)+'%';t0.textContent=fmt(cur)});`,
    }),
    prompt: `Build a dark-glass music player card: conic-gradient artwork disc (${p.v1}→${p.v2}→${p.c1}) that rotates only while playing (animation-play-state), title/artist meta, five equalizer bars animating when playing; a clickable progress bar (click seeks) with glowing ${p.v2} fill advancing every 250ms via setTimeout; round gradient play/pause button toggling ▶/❚❚ and time labels in tabular numerals (mock 3:42 track). Vanilla JS, no audio file needed.`,
  }),
};

/* 4 — AI chat typing bubbles */
const chatBubbles: Fam = {
  id: "g2-chat", slugBase: "ai-chat-typing-bubbles", title: "AI Chat Typing Bubbles",
  category: "components",
  summary: "A chat mock: user bubble lands, three-dot typing indicator breathes, then the AI answer types itself in.",
  tags: ["chat", "ai", "typing", "bubbles", "conversation"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const answers = [
      "Done ✨ I rebuilt the hero with an aurora backdrop, magnetic CTA and a scroll-hint. Want me to tighten the copy too?",
      "Great pick — I wired the neon grid theme and bumped the contrast to WCAG AA. Share link is ready.",
      "There are 3 button families that fit: pulse, sweep and morph. I queued previews below if you want live versions.",
      "Deployed in 41s 🚀 Rollback is one click away; analytics are already streaming to your dashboard.",
    ];
    return {
      html: docP(p, {
        body: `<div class="chat" id="chat">
<div class="m me">Make my landing page feel less AI-flat.</div>
<div class="m tp" id="tp"><i></i><i></i><i></i></div>
<div class="m ai" id="ai"><span class="mono" id="tx"></span><span class="cr"></span></div>
<div class="chips"><button id="re">↻ Replay</button><button>Looks great ✓</button></div>
</div>`,
        css: `
.chat{width:340px;display:grid;gap:12px}
.m{max-width:82%;padding:12px 16px;border-radius:18px;font-size:13.5px;line-height:1.55}
.me{justify-self:end;background:linear-gradient(135deg,var(--v1),var(--v2));color:#fff;border-bottom-right-radius:6px;
 animation:min .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes min{from{opacity:0;transform:translateY(14px) scale(.9)}}
.tp{justify-self:start;display:flex;gap:5px;background:rgba(255,255,255,.06);border:1px solid var(--line);
 border-bottom-left-radius:6px;animation:min .4s .5s cubic-bezier(.34,1.56,.64,1) backwards}
.tp i{width:7px;height:7px;border-radius:50%;background:var(--c1);animation:tb 1s ease-in-out infinite}
.tp i:nth-child(2){animation-delay:.15s}.tp i:nth-child(3){animation-delay:.3s}
@keyframes tb{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-5px);opacity:1}}
.ai{justify-self:start;background:rgba(255,255,255,.05);border:1px solid var(--line);border-bottom-left-radius:6px;
 opacity:0;transition:opacity .3s}
.ai.show{opacity:1}
.mono{font-family:'JetBrains Mono',monospace;font-size:13px}
.cr{display:inline-block;width:2px;height:1em;background:var(--v1);vertical-align:-2px;margin-left:2px;animation:bl .7s steps(1) infinite}
@keyframes bl{50%{opacity:0}}
.chips{display:flex;gap:8px;justify-self:start;margin-top:2px}
.chips button{font-size:11.5px;font-weight:700;padding:8px 14px;border-radius:999px;color:var(--dim);
 border:1px solid var(--line);background:rgba(255,255,255,.04);transition:all .2s}
.chips button:hover{color:#fff;border-color:color-mix(in srgb,var(--v1) 55%,transparent)}`,
        js: `var tx=document.getElementById('tx'),ai=document.getElementById('ai'),tp=document.getElementById('tp');
var MSG=${JSON.stringify(answers[vi % answers.length])};
function run(){tx.textContent='';ai.classList.remove('show');tp.style.display='flex';
setTimeout(function(){tp.style.display='none';ai.classList.add('show');
var i=0;(function step(){tx.textContent=MSG.slice(0,++i);
if(i<MSG.length)setTimeout(step,16+Math.random()*26)})()},1500)}
run();document.getElementById('re').addEventListener('click',run);`,
      }),
      prompt: `Build an AI chat mock sequence on dark: a user bubble (gradient ${p.v1}→${p.v2}, bottom-right radius 6px) springs in; after half a second a three-dot typing indicator appears (dots bounce with staggered .15s delays); at 1.5s it swaps to the assistant bubble where the reply typewrites itself char by char (16-42ms per char) with a blinking block caret. Below are pill action chips and a "↻ Replay" button that reruns the whole sequence. Vanilla JS.`,
    };
  },
};

/* 5 — onboarding spotlight coachmark */
const coachmark: Fam = {
  id: "g2-coach", slugBase: "spotlight-coachmark-tour", title: "Spotlight Coachmark Tour",
  category: "components",
  summary: "A two-step product tour: dimmed veil with a glowing cutout ring snaps to each target, tooltip advances.",
  tags: ["onboarding", "tour", "coachmark", "spotlight", "walkthrough"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<div class="stage">
<div class="mock"><button class="mk a" id="tA">★ Feature</button><button class="mk b" id="tB">⚙ Settings</button></div>
<div class="veil" id="veil"><span class="ring" id="ring"></span>
<div class="tip" id="tip"><b id="tt"></b><p id="tp"></p>
<div class="row"><span class="dots"><i class="on"></i><i></i></span>
<button class="skip" id="skip">Skip</button><button class="next" id="next">Next →</button></div></div>
</div>
</div>`,
      css: `
.stage{width:min(400px,90vw);height:250px;border-radius:20px;background:rgba(255,255,255,.03);
 border:1px solid var(--line);position:relative;display:grid;place-items:center}
.mock{display:flex;gap:18px}
.mk{padding:12px 22px;border-radius:12px;font-weight:700;font-size:13.5px;color:var(--txt);
 background:rgba(255,255,255,.06);border:1px solid var(--line)}
.veil{position:absolute;inset:0;border-radius:20px;background:rgba(4,4,14,.72);backdrop-filter:blur(2px);
 opacity:0;transition:opacity .3s;pointer-events:none}
.veil.on{opacity:1;pointer-events:auto}
.ring{position:absolute;border:2px solid var(--c1);border-radius:16px;
 box-shadow:0 0 0 4px color-mix(in srgb,var(--c1) 25%,transparent),0 0 30px color-mix(in srgb,var(--c1) 55%,transparent);
 transition:all .45s cubic-bezier(.34,1.56,.64,1)}
.tip{position:absolute;width:210px;padding:14px 16px;border-radius:14px;background:#12122a;
 border:1px solid color-mix(in srgb,var(--v1) 40%,transparent);box-shadow:0 20px 50px rgba(0,0,0,.55);
 transition:all .45s cubic-bezier(.34,1.56,.64,1)}
.tip b{font-size:13.5px}
.tip p{color:var(--dim);font-size:12px;line-height:1.5;margin:6px 0 12px}
.tip .row{display:flex;align-items:center;gap:8px}
.dots{display:flex;gap:4px;margin-right:auto}
.dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.2)}
.dots i.on{background:var(--c1)}
.skip{font-size:11.5px;color:var(--dim)}
.next{padding:7px 14px;border-radius:9px;font-size:11.5px;font-weight:800;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2))}`,
      js: `var veil=document.getElementById('veil'),ring=document.getElementById('ring'),tip=document.getElementById('tip'),
tt=document.getElementById('tt'),tp=document.getElementById('tp'),dot=document.querySelectorAll('.dots i');
var steps=[{el:'tA',t:'✨ Star your favorites',c:'Tap here to save any asset to your collection.'},
{el:'tB',t:'⚙ Tune everything',c:'Theme, language and preview density live in settings.'}];
var s=0;
function place(){var st=document.querySelector('.stage').getBoundingClientRect(),
b=document.getElementById(steps[s].el).getBoundingClientRect();
ring.style.left=(b.left-st.left-8)+'px';ring.style.top=(b.top-st.top-8)+'px';
ring.style.width=(b.width+16)+'px';ring.style.height=(b.height+16)+'px';
tip.style.left=(b.left-st.left-10)+'px';tip.style.top=(b.top-st.top+b.height+22)+'px';}
function go(i){s=i;tt.textContent=steps[s].t;tp.textContent=steps[s].c;place();
dot.forEach(function(d,k){d.classList.toggle('on',k===s)});
document.getElementById('next').textContent=s===1?'Finish ✓':'Next →'}
veil.classList.add('on');go(0);
document.getElementById('next').addEventListener('click',function(){if(s===0)go(1);else veil.classList.remove('on')});
document.getElementById('skip').addEventListener('click',function(){veil.classList.remove('on')});
addEventListener('resize',place);`,
    }),
    prompt: `Build a two-step onboarding coachmark: a stage holding two mock buttons; a veil (72% dark + blur) fades in; a glowing cutout ring (${p.c1} border + double glow shadow) snaps between targets with spring easing while measure-ing via getBoundingClientRect; a tooltip card ("Star your favorites" / "Tune everything") rides beneath the ring with step dots, Skip and Next→/Finish✓ (gradient ${p.v1}→${p.v2}). Finish/Skip fades the veil out. Handles resize. Vanilla JS.`,
  }),
};

/* 6 — OTP code input */
const otpInput: Fam = {
  id: "g2-otp", slugBase: "auto-advance-otp-input", title: "Auto-Advance OTP Input",
  category: "elements",
  summary: "Six-box verification code field: auto-advance, paste-to-fill, shake on wrong code, glow on success.",
  tags: ["otp", "input", "verification", "form", "code"],
  tech: ["html", "css", "javascript"],
  build: (p) => ({
    html: docP(p, {
      body: `<h3 class="t">Enter your code</h3>
<div class="otp" id="otp">${"<input maxlength='1' inputmode='numeric'/>".repeat(6)}</div>
<p class="cap" id="msg">demo code: <b class="c">${'0426' + '19'}</b> — try pasting it</p>`,
      css: `
.t{font-size:20px;font-weight:800}
.otp{display:flex;gap:10px}
.otp input{width:46px;height:56px;border-radius:14px;text-align:center;font-size:22px;font-weight:800;color:var(--txt);
 background:rgba(255,255,255,.05);border:1.5px solid var(--line);outline:none;transition:all .2s;caret-color:var(--c1)}
.otp input:focus{border-color:var(--v1);box-shadow:0 0 0 4px color-mix(in srgb,var(--v1) 20%,transparent);transform:translateY(-2px)}
.otp input.f{border-color:color-mix(in srgb,var(--v2) 60%,transparent)}
.otp.err{animation:shk .45s}
@keyframes shk{20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
.otp.ok input{border-color:var(--c1);box-shadow:0 0 16px color-mix(in srgb,var(--c1) 40%,transparent);color:var(--c1)}
.cap{color:var(--dim);font-size:12.5px}
.cap .c{color:var(--c1);font-family:monospace;letter-spacing:.3em}`,
      js: `var box=document.querySelectorAll('#otp input'),otp=document.getElementById('otp'),
msg=document.getElementById('msg'),CODE='042619';
box.forEach(function(inp,i){inp.addEventListener('input',function(){
inp.value=inp.value.replace(/\\D/g,'');inp.classList.toggle('f',!!inp.value);
if(inp.value&&i<5)box[i+1].focus();check()});
inp.addEventListener('keydown',function(e){if(e.key==='Backspace'&&!inp.value&&i>0)box[i-1].focus()});
inp.addEventListener('paste',function(e){e.preventDefault();
var d=(e.clipboardData.getData('text')||'').replace(/\\D/g,'').slice(0,6);
d.split('').forEach(function(c,j){box[j].value=c;box[j].classList.add('f')});box[Math.min(d.length,5)].focus();check()})});
function check(){var v=[].map.call(box,function(b){return b.value}).join('');
if(v.length<6)return;
if(v===CODE){otp.classList.remove('err');otp.classList.add('ok');
msg.innerHTML='✓ verified — welcome back'}else{otp.classList.remove('ok');
otp.classList.add('err');setTimeout(function(){otp.classList.remove('err')},500);
msg.innerHTML='✗ wrong code — use <b class="c">'+CODE+'</b>'}}`,
    }),
    prompt: `Build a 6-digit OTP input row: 46×56 rounded boxes with ${p.c1} caret; typing a digit marks .f and auto-advances focus, Backspace on empty goes back; pasting "042619" distributes digits across boxes. Completing 6 digits auto-verifies against demo code 042619: wrong → row shakes horizontally and shows an error line; right → all boxes glow ${p.c1} with a success message. Vanilla JS.`,
  }),
};

/* 7 — launch countdown flip */
const countdownFlip: Fam = {
  id: "g2-countdown", slugBase: "launch-countdown-panels", title: "Launch Countdown Panels",
  category: "animations",
  summary: "A live launch countdown: gradient drop-panels tick every second toward a stored target date.",
  tags: ["countdown", "timer", "launch", "tick", "marketing"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const labels = ["Days", "Hours", "Minutes", "Seconds"];
    return {
      html: docP(p, {
        body: `<p class="cap">V2 LAUNCH IN</p>
<div class="cd" id="cd">${labels.map((l) => `<div class="cell"><b data-k="${l.toLowerCase()}">00</b><span>${l}</span></div>`).join("")}</div>`,
        css: `
.cap{letter-spacing:.3em;font-size:11px;color:var(--dim);font-weight:700}
.cd{display:flex;gap:12px}
.cell{width:84px;padding:16px 0 12px;text-align:center;border-radius:16px;position:relative;
 background:linear-gradient(160deg,color-mix(in srgb,var(--v1) 26%,#0d0d20),rgba(255,255,255,.03));
 border:1px solid var(--line);overflow:hidden}
.cell::before{content:'';position:absolute;inset:0;background:radial-gradient(120px 40px at 50% 0,color-mix(in srgb,var(--v2) 20%,transparent),transparent 70%)}
.cell b{display:block;font-size:34px;font-weight:900;font-variant-numeric:tabular-nums;
 background:linear-gradient(180deg,#fff,color-mix(in srgb,var(--v2) 65%,#fff));
 -webkit-background-clip:text;background-clip:text;color:transparent}
.cell b.tick{animation:tk .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes tk{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}
.cell span{font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);font-weight:700}`,
        js: `var target=Date.now()+((2+${vi})*86400+7*3600+42*60+11)*1000;
var els={};document.querySelectorAll('#cd b').forEach(function(b){els[b.dataset.k]=b});
var prev={};
function run(){var d=Math.max(0,target-Date.now());
var v={days:Math.floor(d/86400000),hours:Math.floor(d/3600000)%24,
minutes:Math.floor(d/60000)%60,seconds:Math.floor(d/1000)%60};
['days','hours','minutes','seconds'].forEach(function(k){var s=String(v[k]).padStart(2,'0');
if(prev[k]!==s){prev[k]=s;els[k].textContent=s;
els[k].classList.remove('tick');void els[k].offsetWidth;els[k].classList.add('tick')}})}
run();setInterval(run,1000);`,
      }),
      prompt: `Build a launch countdown: four gradient drop-panel cells (Days/Hours/Minutes/Seconds) on dark, each with a top radial ${p.v2} sheen; tabular-numeral 34px values in a white→${p.v2} gradient clip; a JS interval recomputes a target ${2 + vi}+ days out and replays a spring "tick" entrance (translateY -10px fade) only on cells whose digits changed. Vanilla JS, uppercase letter-spaced labels.`,
    };
  },
};

/* 8 — floating orb empty state */
const emptyState: Fam = {
  id: "g2-empty", slugBase: "floating-orb-empty-state", title: "Floating Orb Empty State",
  category: "elements",
  summary: "A calming zero-state: drifting gradient orb with dashed orbit ring, empty copy and a soft CTA.",
  tags: ["empty-state", "illustration", "zero", "placeholder"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const copy: [string, string, string][] = [
      ["No favorites yet", "Tap the ♥ on anything you love and it will orbit here.", "Explore the vault"],
      ["Inbox zero", "You're all caught up. Fresh drops land every Friday.", "Browse new arrivals"],
      ["No results", "Try a different keyword or clear one or two filters.", "Clear filters"],
      ["Drafts are empty", "Saved drafts live here while you work on them.", "Start a draft"],
    ];
    const [t, s, cta] = copy[vi % copy.length];
    return {
      html: docP(p, {
        body: `<div class="es">
<span class="orb"></span><span class="ring"></span><span class="ring r2"></span>
<h3>${t}</h3><p>${s}</p><button class="go">${cta}</button>
</div>`,
        css: `
.es{display:grid;place-items:center;text-align:center;gap:0}
.orb{width:86px;height:86px;border-radius:50%;position:relative;z-index:1;
 background:radial-gradient(circle at 32% 28%,var(--c1),var(--v1) 55%,var(--v2));
 box-shadow:0 22px 50px color-mix(in srgb,var(--v1) 45%,transparent),inset 0 -8px 22px rgba(0,0,0,.35);
 animation:ofl 3.6s ease-in-out infinite}
@keyframes ofl{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.ring{position:absolute;width:150px;height:150px;border-radius:50%;border:1.5px dashed color-mix(in srgb,var(--c1) 45%,transparent);
 animation:orr 16s linear infinite}
.ring.r2{width:190px;height:190px;border-color:color-mix(in srgb,var(--v2) 30%,transparent);
 animation-duration:26s;animation-direction:reverse}
@keyframes orr{to{transform:rotate(360deg)}}
.es h3{margin-top:26px;font-size:19px;font-weight:800}
.es p{color:var(--dim);font-size:13.5px;max-width:280px;line-height:1.6;margin:8px 0 18px}
.go{padding:11px 24px;border-radius:999px;font-size:13px;font-weight:700;color:var(--txt);
 border:1px solid color-mix(in srgb,var(--v1) 50%,transparent);background:color-mix(in srgb,var(--v1) 12%,transparent);
 transition:all .22s}
.go:hover{background:linear-gradient(135deg,var(--v1),var(--v2));border-color:transparent;transform:translateY(-2px)}`,
      }),
      prompt: `Build a floating-orb empty state for "${t}": an 86px radial-gradient orb (${p.c1}→${p.v1}→${p.v2}, inset shading, glow shadow) bobbing ±12px over 3.6s, ringed by two dashed orbit circles rotating 16s/26s opposite directions; below, 19px title, muted one-liner, and a pill CTA "${cta}" that fills with the gradient and lifts on hover. Pure CSS.`,
    };
  },
};

export const GEN2_ITEMS = materialize([
  productCard, kpiCard, audioPlayer, chatBubbles, coachmark, otpInput, countdownFlip, emptyState,
]);

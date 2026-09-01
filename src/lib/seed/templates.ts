import { Item } from "../types";
import { doc } from "./wrap";

// ---------------------------------------------------------------- 1. Aurora SaaS
const aurora = doc({
  kind: "page",
  body: `
<div class="nav"><div class="logo">◈ Lumen</div><div class="nav-links"><a>Product</a><a>Pricing</a><a>Docs</a><a class="cta">Get started</a></div></div>
<header class="hero">
  <div class="badge">✦ Now in public beta</div>
  <h1>Ship interfaces that <span class="grad">feel alive</span></h1>
  <p>Lumen is the motion layer for modern web apps. Add physics-based animation, scroll choreography and micro-interactions without writing a keyframe by hand.</p>
  <div class="hero-actions"><button class="btn-primary">Start building free</button><button class="btn-ghost">▶ Watch demo</button></div>
  <div class="aurora"><span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span></div>
</header>
<section class="features"><div class="card"><div class="ic">⚡</div><h3>Instant playback</h3><p>60fps spring physics on every element, automatically.</p></div>
<div class="card"><div class="ic">🧭</div><h3>Scroll choreography</h3><p>Timeline scenes to scroll position with one directive.</p></div>
<div class="card"><div class="ic">🎛️</div><h3>Zero config</h3><p>Drop in a script tag. It just works, everywhere.</p></div></section>
`,
  css: `
.nav{display:flex;justify-content:space-between;align-items:center;padding:22px 6vw;position:relative;z-index:5}
.logo{font-weight:800;font-size:20px;letter-spacing:.02em}
.nav-links{display:flex;gap:28px;align-items:center;color:var(--dim);font-size:14px}
.nav-links a:hover{color:var(--txt)}
.cta{background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;padding:9px 18px;border-radius:999px;font-weight:600}
.hero{min-height:78vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 6vw 40px;position:relative;overflow:hidden}
.badge{font-size:12.5px;color:var(--c1);border:1px solid rgba(34,211,238,.35);background:rgba(34,211,238,.08);padding:6px 14px;border-radius:999px;margin-bottom:26px;animation:fadeUp .7s ease both}
.hero h1{font-size:clamp(38px,6vw,72px);line-height:1.05;letter-spacing:-.03em;max-width:14ch;font-weight:800;animation:fadeUp .7s .08s ease both}
.grad{background:linear-gradient(100deg,var(--v1),var(--v2) 55%,var(--c1));-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{margin:22px auto 0;max-width:56ch;color:var(--dim);font-size:clamp(15px,2vw,18px);line-height:1.7;animation:fadeUp .7s .16s ease both}
.hero-actions{display:flex;gap:14px;margin-top:34px;animation:fadeUp .7s .24s ease both}
button{border-radius:12px;padding:14px 26px;font-size:15px;font-weight:600;transition:transform .2s,box-shadow .2s}
.btn-primary{background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;box-shadow:0 10px 40px -10px rgba(139,92,246,.7)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 18px 50px -10px rgba(217,70,239,.7)}
.btn-ghost{border:1px solid var(--line);color:var(--txt);background:var(--panel)}
.btn-ghost:hover{border-color:var(--v1)}
.aurora{position:absolute;inset:0;z-index:-1;overflow:hidden}
.blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5;mix-blend-mode:screen}
.b1{width:46vw;height:46vw;background:#7c3aed;top:-18vw;left:-10vw;animation:drift1 16s ease-in-out infinite}
.b2{width:38vw;height:38vw;background:#db2777;top:-10vw;right:-12vw;animation:drift2 20s ease-in-out infinite}
.b3{width:30vw;height:30vw;background:#0891b2;bottom:-16vw;left:30vw;animation:drift3 24s ease-in-out infinite}
@keyframes drift1{50%{transform:translate(12vw,10vh) scale(1.15)}}
@keyframes drift2{50%{transform:translate(-10vw,14vh) scale(.9)}}
@keyframes drift3{50%{transform:translate(6vw,-12vh) scale(1.2)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;padding:20px 6vw 90px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:28px;transition:transform .3s,border-color .3s}
.card:hover{transform:translateY(-6px);border-color:rgba(139,92,246,.5)}
.ic{font-size:26px;margin-bottom:14px}
.card h3{font-size:17px;margin-bottom:8px}
.card p{color:var(--dim);font-size:14px;line-height:1.6}
`,
  js: `
document.querySelectorAll('.card').forEach((c,i)=>{c.style.opacity=0;c.style.transform='translateY(26px)';
 setTimeout(()=>{c.style.transition='all .7s cubic-bezier(.22,1,.36,1)';c.style.opacity=1;c.style.transform='none';},350+i*120);});
`,
});

// ---------------------------------------------------------------- 2. Starfield portfolio
const starfield = doc({
  kind: "page",
  body: `
<canvas id="stars"></canvas>
<div class="pf-nav"><div class="logo">✦ NOVA</div><div class="pf-links"><a>Work</a><a>About</a><a>Contact</a></div></div>
<main class="pf-hero">
  <p class="pf-kicker">Creative developer · Portfolio 2026</p>
  <h1>I build <span class="stroke">cosmic</span><br/>web experiences</h1>
  <div class="pf-cta"><button>View selected work ↓</button></div>
</main>
<section class="pf-grid">
  <div class="pf-item" style="--h:260px"><b>01</b><span>Nebula Commerce</span></div>
  <div class="pf-item" style="--h:340px"><b>02</b><span>Orbit Music App</span></div>
  <div class="pf-item" style="--h:300px"><b>03</b><span>Pulsar Dashboard</span></div>
  <div class="pf-item" style="--h:220px"><b>04</b><span>Comet Landing</span></div>
</section>
<footer class="pf-foot">✦ Made under the stars</footer>
`,
  css: `
#stars{position:fixed;inset:0;z-index:0}
.pf-nav{position:relative;z-index:2;display:flex;justify-content:space-between;padding:26px 6vw;align-items:center}
.logo{font-weight:800;letter-spacing:.3em;font-size:15px}
.pf-links{display:flex;gap:26px;font-size:14px;color:var(--dim)}
.pf-links a:hover{color:#fff}
.pf-hero{position:relative;z-index:2;min-height:70vh;display:flex;flex-direction:column;justify-content:center;padding:0 6vw}
.pf-kicker{color:var(--c1);letter-spacing:.25em;text-transform:uppercase;font-size:12px;margin-bottom:20px}
.pf-hero h1{font-size:clamp(44px,7.5vw,96px);line-height:1.02;font-weight:800;letter-spacing:-.03em}
.stroke{-webkit-text-stroke:1.5px rgba(255,255,255,.85);color:transparent}
.pf-cta{margin-top:36px}
.pf-cta button{border:1px solid rgba(255,255,255,.25);padding:14px 28px;border-radius:999px;font-size:15px;backdrop-filter:blur(6px);transition:all .25s}
.pf-cta button:hover{background:#fff;color:#0a0a18;border-color:#fff}
.pf-grid{position:relative;z-index:2;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;padding:40px 6vw 80px}
.pf-item{height:var(--h);border-radius:20px;border:1px solid var(--line);background:linear-gradient(160deg,rgba(139,92,246,.14),rgba(34,211,238,.06));display:flex;flex-direction:column;justify-content:space-between;padding:22px;transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .35s;cursor:pointer}
.pf-item:hover{transform:translateY(-8px) scale(1.01);border-color:rgba(217,70,239,.6)}
.pf-item b{font-size:13px;color:var(--dim);font-weight:500}
.pf-item span{font-size:20px;font-weight:700}
.pf-foot{position:relative;z-index:2;text-align:center;padding:34px;color:var(--dim);font-size:13px;border-top:1px solid var(--line)}
`,
  js: `
const cv=document.getElementById('stars'),ctx=cv.getContext('2d');
let W,H,stars=[];
function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
resize();addEventListener('resize',resize);
for(let i=0;i<260;i++)stars.push({x:Math.random()*W,y:Math.random()*H,z:Math.random()*1.4+.3,r:Math.random()*1.6+.3,tw:Math.random()*Math.PI*2});
let mx=0,my=0;
addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5);});
function loop(){
 ctx.clearRect(0,0,W,H);
 for(const s of stars){
   s.tw+=.03;
   const a=.35+Math.abs(Math.sin(s.tw))*.65;
   const px=s.x+mx*30*s.z, py=s.y+my*30*s.z;
   ctx.beginPath();ctx.arc(px,py,s.r*s.z,0,7);
   ctx.fillStyle='rgba(210,210,255,'+a+')';ctx.fill();
   if(s.z>1.1){ctx.beginPath();ctx.arc(px,py,s.r*3*s.z,0,7);ctx.fillStyle='rgba(139,92,246,'+a*.12+')';ctx.fill();}
 }
 requestAnimationFrame(loop);
}
loop();
`,
});

// ---------------------------------------------------------------- 3. Scroll story
const scrollStory = doc({
  kind: "page",
  body: `
<div class="ss-progress"><span id="bar"></span></div>
<div class="ss-nav">SCROLLATE<span>↓ scroll</span></div>
<section class="ss-section" data-c="124,58,237">
  <p class="ss-num">01</p><h2>Every scroll tells a story</h2>
  <p class="ss-p">Sections fade, rise and scale into place as you move. The page itself becomes the animation timeline.</p>
</section>
<section class="ss-section" data-c="217,70,239">
  <p class="ss-num">02</p><h2>Progress that breathes</h2>
  <p class="ss-p">A gradient bar tracks your journey, and each chapter paints the ambient glow in its own hue.</p>
</section>
<section class="ss-section" data-c="34,211,238">
  <p class="ss-num">03</p><h2>Built for storytelling</h2>
  <p class="ss-p">Perfect for product launches, case studies and long-form landing pages that need to feel cinematic.</p>
  <div class="ss-end">✦ The end — or just the beginning</div>
</section>
`,
  css: `
.ss-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:10;background:rgba(255,255,255,.08)}
#bar{display:block;height:100%;width:0%;background:linear-gradient(90deg,var(--v1),var(--v2),var(--c1))}
.ss-nav{position:fixed;top:18px;left:6vw;right:6vw;display:flex;justify-content:space-between;z-index:10;font-weight:800;letter-spacing:.2em;font-size:13px}
.ss-nav span{color:var(--dim);font-weight:500;letter-spacing:.1em;animation:bob 1.6s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(5px)}}
.ss-section{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 6vw;position:relative}
.ss-section::before{content:'';position:absolute;inset:0;background:radial-gradient(700px 500px at 50% 60%,rgba(var(--rc),.16),transparent 70%);opacity:0;transition:opacity .8s}
.ss-section.in::before{opacity:1}
.ss-num{font-size:clamp(80px,16vw,180px);font-weight:800;color:rgba(var(--rc),.25);line-height:1;transition:all .9s cubic-bezier(.22,1,.36,1);transform:translateY(40px) scale(.9);opacity:0}
.ss-section.in .ss-num{transform:none;opacity:1}
.ss-section h2{font-size:clamp(30px,5vw,58px);font-weight:800;letter-spacing:-.02em;margin:-30px 0 20px;transition:all .8s .1s cubic-bezier(.22,1,.36,1);transform:translateY(40px);opacity:0}
.ss-section.in h2{transform:none;opacity:1}
.ss-p{max-width:52ch;color:var(--dim);font-size:clamp(15px,2vw,19px);line-height:1.7;transition:all .8s .2s ease;transform:translateY(40px);opacity:0}
.ss-section.in .ss-p{transform:none;opacity:1}
.ss-end{margin-top:60px;font-size:14px;color:var(--c1);letter-spacing:.1em}
`,
  js: `
const bar=document.getElementById('bar');
const secs=[...document.querySelectorAll('.ss-section')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');document.documentElement.style.setProperty('--rc',e.target.dataset.c);}}),{threshold:.4});
secs.forEach(s=>io.observe(s));
addEventListener('scroll',()=>{
  const h=document.documentElement;
  bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});
`,
});

// ---------------------------------------------------------------- 4. Bento product
const bento = doc({
  kind: "page",
  body: `
<div class="b-nav"><b>◈ Gridify</b><a class="b-cta">Launch app</a></div>
<header class="b-hero"><h1>Your whole stack,<br/>in one <span class="grad">beautiful grid</span></h1>
<p>Analytics, payments, deployments and team chat — arranged in a living bento board that rearranges around what matters now.</p></header>
<section class="bento">
  <div class="tile t-big"><span class="t-tag">Analytics</span><div class="bars"><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:55%"></i><i style="--h:90%"></i><i style="--h:65%"></i><i style="--h:80%"></i><i style="--h:95%"></i></div></div>
  <div class="tile"><span class="t-tag">Revenue</span><b class="t-num">$48.2k</b><span class="t-up">▲ 12.4%</span></div>
  <div class="tile"><span class="t-tag">Deploys</span><div class="rings"><span></span><span></span><span></span></div></div>
  <div class="tile"><span class="t-tag">Team</span><div class="avatars"><i>AK</i><i>JM</i><i>SR</i><i>+4</i></div></div>
  <div class="tile t-wide"><span class="t-tag">Live feed</span><div class="feed"><p><b>maya</b> shipped edge-worker v2.4</p><p><b>ci</b> 142 tests passed in 38s</p><p><b>leo</b> commented on #payments</p></div></div>
  <div class="tile"><span class="t-tag">Uptime</span><b class="t-num">99.99%</b><div class="dot ok"></div></div>
</section>
<footer class="b-foot">Hover any tile →</footer>
`,
  css: `
.b-nav{display:flex;justify-content:space-between;align-items:center;padding:24px 6vw}
.b-nav b{font-size:20px}
.b-cta{background:linear-gradient(120deg,var(--v1),var(--v2));padding:9px 20px;border-radius:999px;font-size:14px;font-weight:600}
.b-hero{text-align:center;padding:50px 6vw 40px}
.b-hero h1{font-size:clamp(32px,5.4vw,64px);font-weight:800;letter-spacing:-.03em;line-height:1.1}
.grad{background:linear-gradient(100deg,var(--v1),var(--c1));-webkit-background-clip:text;background-clip:text;color:transparent}
.b-hero p{color:var(--dim);max-width:54ch;margin:20px auto 0;line-height:1.7;font-size:16px}
.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:170px;gap:16px;padding:30px 6vw 60px;max-width:1200px;margin:0 auto}
.tile{background:var(--panel);border:1px solid var(--line);border-radius:22px;padding:22px;display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .35s,box-shadow .35s}
.tile:hover{transform:translateY(-6px) scale(1.015);border-color:rgba(139,92,246,.55);box-shadow:0 24px 60px -24px rgba(139,92,246,.5)}
.t-big{grid-column:span 2;grid-row:span 2}
.t-wide{grid-column:span 2}
.t-tag{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);font-weight:700}
.t-num{font-size:34px;font-weight:800;margin-top:auto}
.t-up{color:#34d399;font-size:13px;font-weight:600}
.bars{margin-top:auto;display:flex;gap:10px;align-items:flex-end;height:70%}
.bars i{flex:1;height:var(--h);border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,var(--v2),var(--v1));animation:grow 1s cubic-bezier(.22,1,.36,1) both}
@keyframes grow{from{height:0}}
.rings{margin:auto;display:flex;gap:14px;align-items:center}
.rings span{width:44px;height:44px;border-radius:50%;border:3px solid rgba(255,255,255,.12);border-top-color:var(--c1);animation:spin 1.4s linear infinite}
.rings span:nth-child(2){border-top-color:var(--v2);animation-duration:1s;width:56px;height:56px}
.rings span:nth-child(3){border-top-color:var(--v1);animation-duration:1.8s}
@keyframes spin{to{transform:rotate(360deg)}}
.avatars{margin-top:auto;display:flex}
.avatars i{width:42px;height:42px;border-radius:50%;border:2px solid #0b0b1a;background:linear-gradient(135deg,var(--v1),var(--v2));display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:700;margin-left:-10px}
.avatars i:first-child{margin-left:0}
.avatars i:last-child{background:var(--ink-700)}
.feed{margin-top:14px;display:flex;flex-direction:column;gap:10px}
.feed p{font-size:13.5px;color:var(--dim)}
.feed b{color:var(--txt)}
.dot{position:absolute;top:20px;right:20px;width:9px;height:9px;border-radius:50%;background:#34d399;box-shadow:0 0 0 0 rgba(52,211,153,.7);animation:ping 2s infinite}
@keyframes ping{70%{box-shadow:0 0 0 10px rgba(52,211,153,0)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}
.b-foot{text-align:center;color:var(--dim);font-size:13px;padding:20px 0 50px}
@media(max-width:860px){.bento{grid-template-columns:repeat(2,1fr)}.t-big,.t-wide{grid-column:span 2}}
`,
  js: `
document.querySelectorAll('.tile').forEach((t,i)=>{t.style.opacity=0;t.style.transform='translateY(30px)';
 setTimeout(()=>{t.style.transition='opacity .6s ease,transform .35s cubic-bezier(.22,1,.36,1),border-color .35s,box-shadow .35s';t.style.opacity=1;},200+i*90);});
`,
});

// ---------------------------------------------------------------- 5. Glass mobile app
const glass = doc({
  kind: "page",
  body: `
<div class="g-bg"><span></span><span></span><span></span></div>
<main class="g-wrap">
  <div class="g-copy">
    <div class="g-badge">✦ iOS · Android · Web</div>
    <h1>Your day,<br/><span class="grad">crystal clear</span></h1>
    <p>Halo is the calm productivity app that floats above your chaos. Glass cards, fluid gestures, zero clutter.</p>
    <div class="g-stores"><button> App Store</button><button>▶ Google Play</button></div>
    <div class="g-stats"><div><b>4.9★</b><span>12k reviews</span></div><div><b>240k</b><span>daily users</span></div><div><b>60fps</b><span>every gesture</span></div></div>
  </div>
  <div class="phone">
    <div class="phone-notch"></div>
    <div class="g-card gc-1"><span>☀️ Good morning</span><b>You have 3 tasks today</b></div>
    <div class="g-card gc-2"><span>◷ Next up</span><b>Design review · 10:30</b><i class="pill">in 24 min</i></div>
    <div class="g-card gc-3"><span>✓ Completed</span><b>8 of 11 done</b><div class="g-prog"><i></i></div></div>
    <div class="g-dock"><i>◉</i><i>◈</i><i>＋</i><i>◷</i><i>☰</i></div>
  </div>
</main>
`,
  css: `
.g-bg{position:fixed;inset:0;z-index:0;overflow:hidden}
.g-bg span{position:absolute;border-radius:50%;filter:blur(80px);opacity:.55;animation:floatB 14s ease-in-out infinite}
.g-bg span:nth-child(1){width:40vw;height:40vw;background:#7c3aed;top:-10%;left:-8%}
.g-bg span:nth-child(2){width:34vw;height:34vw;background:#0e7490;bottom:-12%;right:-6%;animation-delay:-5s}
.g-bg span:nth-child(3){width:26vw;height:26vw;background:#be185d;top:40%;left:55%;animation-delay:-9s}
@keyframes floatB{50%{transform:translate(6vw,-6vh) scale(1.15)}}
.g-wrap{position:relative;z-index:1;min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:40px;padding:60px 7vw;max-width:1200px;margin:0 auto}
.g-badge{display:inline-block;font-size:12.5px;color:var(--c1);border:1px solid rgba(34,211,238,.3);background:rgba(34,211,238,.07);padding:6px 14px;border-radius:999px;margin-bottom:24px}
.g-copy h1{font-size:clamp(38px,5.4vw,68px);font-weight:800;line-height:1.05;letter-spacing:-.03em}
.grad{background:linear-gradient(100deg,var(--v1),var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent}
.g-copy p{color:var(--dim);margin:22px 0 30px;line-height:1.7;font-size:16.5px;max-width:46ch}
.g-stores{display:flex;gap:12px;flex-wrap:wrap}
.g-stores button{background:rgba(255,255,255,.08);border:1px solid var(--line);backdrop-filter:blur(10px);padding:12px 22px;border-radius:14px;font-size:14.5px;font-weight:600;transition:all .25s}
.g-stores button:hover{background:rgba(255,255,255,.16);transform:translateY(-2px)}
.g-stats{display:flex;gap:34px;margin-top:40px}
.g-stats b{display:block;font-size:22px;font-weight:800}
.g-stats span{font-size:12.5px;color:var(--dim)}
.phone{width:min(320px,80vw);aspect-ratio:9/19;margin:0 auto;border-radius:46px;background:linear-gradient(160deg,rgba(255,255,255,.12),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(20px);padding:20px;position:relative;box-shadow:0 50px 100px -30px rgba(0,0,0,.8);display:flex;flex-direction:column;gap:14px;animation:phoneFloat 6s ease-in-out infinite}
@keyframes phoneFloat{50%{transform:translateY(-14px) rotate(.6deg)}}
.phone-notch{width:120px;height:24px;background:#050510;border-radius:0 0 16px 16px;margin:0 auto 6px}
.g-card{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:18px;backdrop-filter:blur(14px);display:flex;flex-direction:column;gap:6px;animation:cardIn .8s cubic-bezier(.22,1,.36,1) both}
.gc-2{animation-delay:.15s}.gc-3{animation-delay:.3s}
@keyframes cardIn{from{opacity:0;transform:translateY(26px) scale(.96)}to{opacity:1;transform:none}}
.g-card span{font-size:12px;color:var(--dim)}
.g-card b{font-size:16px}
.pill{align-self:flex-start;font-size:11px;color:#fda4af;background:rgba(244,63,94,.15);border:1px solid rgba(244,63,94,.3);padding:4px 10px;border-radius:999px;margin-top:4px}
.g-prog{height:8px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden;margin-top:6px}
.g-prog i{display:block;height:100%;width:72%;border-radius:99px;background:linear-gradient(90deg,var(--v1),var(--c1))}
.g-dock{margin-top:auto;display:flex;justify-content:space-around;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:14px 8px;font-size:18px;backdrop-filter:blur(14px)}
.g-dock i{font-style:normal;opacity:.55;transition:all .2s}.g-dock i:hover{opacity:1;transform:translateY(-3px)}
@media(max-width:880px){.g-wrap{grid-template-columns:1fr}}
`,
  js: `
const prog=document.querySelector('.g-prog i');
prog.style.width='0%';setTimeout(()=>{prog.style.transition='width 1.4s cubic-bezier(.22,1,.36,1)';prog.style.width='72%';},600);
`,
});

// ---------------------------------------------------------------- 6. Cursor aura
const cursorAura = doc({
  kind: "page",
  body: `
<canvas id="aura"></canvas>
<div class="ca-nav"><b>AURA<span>.js</span></b><div><a>Docs</a><a class="ca-gh">★ GitHub</a></div></div>
<main class="ca-main">
  <h1>Move your mouse.<br/>We'll do the <span class="ca-g">magic</span>.</h1>
  <p>A 3kb cursor-aura engine: trailing particles, magnetic hovers and reactive glow — zero dependencies, one script tag.</p>
  <div class="ca-actions"><button class="ca-p">Get the snippet</button><button class="ca-s">See it on hover →</button></div>
  <div class="ca-chips"><i>particle trail</i><i>magnetic buttons</i><i>reactive glow</i><i>3kb gz</i></div>
</main>
`,
  css: `
#aura{position:fixed;inset:0;z-index:0;pointer-events:none}
.ca-nav{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:24px 6vw;font-size:18px}
.ca-nav b span{color:var(--v2)}
.ca-nav div{display:flex;gap:24px;align-items:center;font-size:14px;color:var(--dim)}
.ca-gh{border:1px solid var(--line);padding:7px 16px;border-radius:999px;color:var(--txt)}
.ca-main{position:relative;z-index:2;min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 6vw;cursor:none}
.ca-main h1{font-size:clamp(36px,6vw,72px);font-weight:800;letter-spacing:-.03em;line-height:1.08}
.ca-g{background:linear-gradient(100deg,var(--v2),var(--c1));-webkit-background-clip:text;background-clip:text;color:transparent}
.ca-main p{color:var(--dim);max-width:52ch;margin:24px auto 0;line-height:1.7;font-size:16.5px}
.ca-actions{display:flex;gap:14px;margin-top:34px}
.ca-main button{cursor:none;border-radius:12px;padding:14px 26px;font-size:15px;font-weight:600;transition:transform .2s,box-shadow .2s}
.ca-p{background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;box-shadow:0 10px 36px -12px rgba(217,70,239,.8)}
.ca-s{border:1px solid var(--line);background:var(--panel)}
.ca-chips{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:40px}
.ca-chips i{font-style:normal;font-size:12.5px;color:var(--dim);border:1px solid var(--line);background:rgba(255,255,255,.04);padding:7px 14px;border-radius:999px}
`,
  js: `
const cv=document.getElementById('aura'),ctx=cv.getContext('2d');
let W,H;function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;}rs();addEventListener('resize',rs);
const mouse={x:innerWidth/2,y:innerHeight/2},parts=[];
addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;
 for(let i=0;i<2;i++)parts.push({x:e.clientX+(Math.random()-.5)*12,y:e.clientY+(Math.random()-.5)*12,vx:(Math.random()-.5)*1.6,vy:(Math.random()-.5)*1.6,life:1,r:Math.random()*3+1.5,h:Math.random()>0.5?'139,92,246':'217,70,239'});});
function loop(){
 ctx.clearRect(0,0,W,H);
 const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,220);
 g.addColorStop(0,'rgba(139,92,246,.14)');g.addColorStop(1,'rgba(139,92,246,0)');
 ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 for(let i=parts.length-1;i>=0;i--){const p=parts[i];
   p.x+=p.vx;p.y+=p.vy;p.vy+=.02;p.life-=.025;
   if(p.life<=0){parts.splice(i,1);continue;}
   ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.life,0,7);
   ctx.fillStyle='rgba('+p.h+','+p.life+')';ctx.fill();}
 requestAnimationFrame(loop);
}
loop();
document.querySelectorAll('.ca-main button').forEach(b=>{
 b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();
   b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.25+'px,'+(e.clientY-r.top-r.height/2)*.25+'px)';});
 b.addEventListener('mouseleave',()=>b.style.transform='');
});
`,
});

export const TEMPLATE_ITEMS: Item[] = [
  {
    id: "tpl-aurora",
    slug: "aurora-saas-landing",
    category: "templates",
    title: "Aurora — SaaS Landing with Drifting Blobs",
    summary:
      "Dark hero with animated aurora gradient blobs, staggered entrance choreography and lift-on-hover feature cards. The modern AI-startup look.",
    author: "MotionVault",
    tags: ["saas", "hero", "gradient", "landing", "dark"],
    tech: ["html", "css", "javascript"],
    stars: 4821,
    views: 38204,
    copies: 5120,
    featured: true,
    published: true,
    html: aurora,
    prompt: `Build a dark-themed SaaS landing page for a product called "Lumen" (a motion/animation library for web apps). Requirements:
1. Fixed top nav: logo "◈ Lumen" left, links Product/Pricing/Docs + gradient "Get started" pill button right.
2. Full-viewport hero: small cyan pill badge "✦ Now in public beta", huge bold headline "Ship interfaces that feel alive" where "feel alive" is a violet→fuchsia→cyan gradient text, muted sub-paragraph, two CTAs (gradient primary "Start building free", ghost "▶ Watch demo").
3. Behind the hero render THREE large blurred aurora blobs (violet #7c3aed, pink #db2777, cyan #0891b2) using border-radius:50% + filter:blur(90px) + mix-blend-mode:screen, each drifting on its own slow infinite keyframe path (16s/20s/24s ease-in-out).
4. Below: 3 feature cards (⚡ Instant playback / 🧭 Scroll choreography / 🎛️ Zero config) in a responsive auto-fit grid, glassmorphism background rgba(255,255,255,.04), 1px subtle border, 18px radius; cards fade-up with stagger on load and lift -6px with violet border glow on hover.
5. Everything fades up (opacity+translateY) in a 0.7s staggered cascade. Use only semantic HTML + modern CSS + a few lines of vanilla JS for the card stagger. Dark background #070711, text #eceaf9, Inter/system font. Smooth cubic-bezier(.22,1,.36,1) easing throughout.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-07-02T10:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
  },
  {
    id: "tpl-starfield",
    slug: "starfield-portfolio",
    category: "templates",
    title: "Nova — Interactive Starfield Portfolio",
    summary:
      "Canvas starfield with parallax that follows the mouse, twinkling stars, outlined display typography and a hover-lift project grid.",
    author: "MotionVault",
    tags: ["portfolio", "canvas", "parallax", "creative", "space"],
    tech: ["html", "css", "javascript"],
    stars: 6109,
    views: 51902,
    copies: 7340,
    featured: true,
    published: true,
    html: starfield,
    prompt: `Build a creative-developer portfolio site with a cosmic theme, called "NOVA". Requirements:
1. A fixed full-screen <canvas> rendering ~260 twinkling stars: random positions, size 0.3-1.9px, depth factor z 0.3-1.7; stars fade in/out via sin(twinkle); stars with z>1.1 get a soft violet glow halo. The whole starfield PARALLAXES toward the mouse (normalized cursor offset × depth × 30px). 60fps requestAnimationFrame loop, resize handler.
2. Nav: "✦ NOVA" with wide letter-spacing, links Work/About/Contact.
3. Hero (min-height 70vh, vertically centered): cyan tracked kicker "Creative developer · Portfolio 2026", giant 800-weight headline "I build [cosmic] web experiences" where "cosmic" is TRANSPARENT with a 1.5px white text-stroke. A pill button "View selected work ↓" that inverts to white-on-black on hover.
4. Project grid below: 4 cards in an auto-fit 240px grid with varying heights (260/340/300/220px via CSS var), each a glass panel with violet→cyan gradient tint, big index number (01-04) top and project name bottom; hover lifts -8px, scales 1.01 and lights a fuchsia border.
5. Footer "✦ Made under the stars". Dark #070711 background, vanilla JS only, no libraries.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-07-08T10:00:00Z",
    updatedAt: "2026-08-15T10:00:00Z",
  },
  {
    id: "tpl-scroll",
    slug: "scroll-story-chapters",
    category: "templates",
    title: "Scrollate — Cinematic Scroll Story",
    summary:
      "Three full-screen chapters that fade-rise into view, a gradient scroll-progress bar, and ambient glow that re-tints per section.",
    author: "MotionVault",
    tags: ["scroll", "storytelling", "intersection-observer", "cinematic"],
    tech: ["html", "css", "javascript"],
    stars: 3355,
    views: 24118,
    copies: 2980,
    featured: false,
    published: true,
    html: scrollStory,
    prompt: `Build a cinematic scroll-storytelling landing page called "Scrollate" — the page itself is the animation timeline. Requirements:
1. Fixed 3px gradient scroll-progress bar pinned to the top (violet→fuchsia→cyan), width driven by scrollTop / (scrollHeight - clientHeight), updated on a passive scroll listener.
2. Fixed top label "SCROLLATE" left and a bobbing "↓ scroll" hint right.
3. THREE full-viewport sections, each with: a giant faint section number (01/02/03, up to 180px, tinted in that section's color at 25% opacity), a bold headline, and muted body copy. Colors: violet rgb(124,58,237), fuchsia rgb(217,70,239), cyan rgb(34,211,238), passed via a data-c attribute.
4. Use IntersectionObserver (threshold .4) to add an .in class when a section enters: number, title and paragraph each rise 40px + fade in with cubic-bezier(.22,1,.36,1) easing and 0/0.1s/0.2s delays; a radial ambient glow in the section's hue also fades in, AND sets --rc on the document root so the atmosphere re-tints per chapter.
5. Section content: (01) "Every scroll tells a story" / about sections fading into place; (02) "Progress that breathes" / gradient bar + per-chapter hue; (03) "Built for storytelling" / product launches & case studies, ending with cyan "✦ The end — or just the beginning". Pure HTML/CSS/vanilla JS, dark theme.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-07-14T10:00:00Z",
    updatedAt: "2026-08-10T10:00:00Z",
  },
  {
    id: "tpl-bento",
    slug: "bento-dashboard-landing",
    category: "templates",
    title: "Gridify — Animated Bento Product Page",
    summary:
      "A living bento board: growing bar charts, spinning deploy rings, stacked avatars, a live activity feed and a pinging uptime dot.",
    author: "MotionVault",
    tags: ["bento", "dashboard", "grid", "product", "micro-interactions"],
    tech: ["html", "css", "javascript"],
    stars: 5240,
    views: 44610,
    copies: 6210,
    featured: true,
    published: true,
    html: bento,
    prompt: `Build a dark product landing page for "Gridify" featuring a large animated BENTO grid dashboard mockup. Requirements:
1. Nav: logo "◈ Gridify" + gradient pill "Launch app". Centered hero: big bold headline "Your whole stack, in one [beautiful grid]" (gradient text on the bracket part), muted paragraph about analytics/payments/deployments/chat in a living bento board.
2. Bento grid: CSS grid, 4 columns, 170px rows, 16px gap, max-width 1200px. Tiles: glass panels (white 4% bg, 1px border, 22px radius) that lift -6px, scale 1.015 and glow violet on hover with cubic-bezier(.22,1,.36,1).
3. Tiles content:
   - Big tile (2×2) "Analytics": 7 animated bars with heights via --h CSS var, gradient fuchsia→violet, growing from 0 on load with staggered animation.
   - "Revenue": big number $48.2k + green "▲ 12.4%".
   - "Deploys": three concentric spinning ring spinners (border-top colored cyan/fuchsia/violet, different durations 1.4s/1s/1.8s).
   - "Team": 4 overlapping circular avatars (gradient circles with initials AK/JM/SR + a "+4" neutral one, -10px overlap).
   - Wide tile (2 cols) "Live feed": 3 activity lines ("maya shipped edge-worker v2.4", "ci 142 tests passed in 38s", "leo commented on #payments").
   - "Uptime": 99.99% + a green status dot with a pinging ring animation (box-shadow ping).
4. All tiles stagger-fade-up on load (90ms apart). Small uppercase tracked tag labels on every tile. Fully responsive: collapse to 2 columns under 860px. Vanilla HTML/CSS/JS only, dark #070711 theme.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-07-21T10:00:00Z",
    updatedAt: "2026-08-22T10:00:00Z",
  },
  {
    id: "tpl-glass",
    slug: "glass-mobile-app-promo",
    category: "templates",
    title: "Halo — Glassmorphism Mobile App Promo",
    summary:
      "Floating frosted-glass phone mockup with drifting color blobs, staggered glass cards, animated progress and a glass dock.",
    author: "MotionVault",
    tags: ["glassmorphism", "mobile", "app", "mockup", "blur"],
    tech: ["html", "css", "javascript"],
    stars: 4012,
    views: 33770,
    copies: 4480,
    featured: false,
    published: true,
    html: glass,
    prompt: `Build a dark app-promo landing page for a calm productivity app called "Halo", heavy glassmorphism. Requirements:
1. Fixed background with THREE large blurred colored blobs (violet, cyan, pink; blur(80px), 55% opacity) floating on 14s infinite keyframe loops with different delays.
2. Two-column hero (collapses to one column under 880px): LEFT copy — cyan pill badge "✦ iOS · Android · Web", huge headline "Your day, [crystal clear]" with violet→fuchsia gradient text, muted paragraph, two frosted-glass store buttons ( App Store / ▶ Google Play) that brighten and lift on hover, and a 3-item stats row (4.9★ 12k reviews / 240k daily users / 60fps every gesture).
3. RIGHT: a floating phone mockup — 320px wide, 9:19 aspect ratio, 46px radius, frosted glass (gradient white 12%→3% + backdrop-filter:blur(20px) + 1px white 18% border + deep drop shadow), gently bobbing on a 6s float loop with a slight rotation. Inside: a notch bar, then three glass cards that slide/fade in staggered (0/0.15s/0.3s):
   - "☀️ Good morning / You have 3 tasks today"
   - "◷ Next up / Design review · 10:30" with a red pill "in 24 min"
   - "✓ Completed / 8 of 11 done" with an 8px progress track whose gradient fill animates 0→72% width on load (1.4s spring easing, triggered by JS after 600ms)
   - bottom glass dock with 5 icons (◉ ◈ ＋ ◷ ☰) that lift on hover.
4. Inter/system font, #070711 background, vanilla HTML/CSS/JS only.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-07-28T10:00:00Z",
    updatedAt: "2026-08-18T10:00:00Z",
  },
  {
    id: "tpl-cursor",
    slug: "cursor-aura-interactive",
    category: "templates",
    title: "Aura.js — Cursor Particle Landing",
    summary:
      "Particle trail that spawns at the cursor, a radial reactive glow, and magnetic buttons that lean toward the mouse. Hides the native cursor.",
    author: "MotionVault",
    tags: ["cursor", "particles", "canvas", "magnetic", "interactive"],
    tech: ["html", "css", "javascript"],
    stars: 5877,
    views: 47230,
    copies: 6990,
    featured: true,
    published: true,
    html: cursorAura,
    prompt: `Build a dark landing page for "AURA.js", a 3kb cursor-effects engine — the page itself is the demo. Requirements:
1. Fixed full-screen <canvas> (pointer-events:none, above background but below content). On every mousemove: (a) draw a soft radial violet glow (220px radius, 14%→0 alpha) centered on the cursor; (b) spawn 2 particles per event near the cursor with random velocity, slight gravity (vy+=.02), shrinking/fading over ~40 frames (life 1→0, radius ~1.5-4.5px), colors alternating violet rgba(139,92,246) and fuchsia rgba(217,70,239). Dead particles are spliced. 60fps loop, clears each frame, handles resize.
2. The main hero area hides the native cursor (cursor:none) — headline "Move your mouse. We'll do the [magic]." (fuchsia→cyan gradient on "magic"), muted paragraph about a 3kb cursor-aura engine with trailing particles/magnetic hovers/reactive glow, two buttons "Get the snippet" (gradient, glowing shadow) and "See it on hover →" (glass).
3. MAGNETIC buttons: on mousemove over a button, translate it up to 25% of the offset between cursor and button center (springy lean); reset transform on mouseleave.
4. Row of pill chips: "particle trail", "magnetic buttons", "reactive glow", "3kb gz". Nav with "AURA.js" logo and Docs / ★ GitHub links. Vanilla JS only, no dependencies, dark #070711 theme.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-08-04T10:00:00Z",
    updatedAt: "2026-08-28T10:00:00Z",
  },
];

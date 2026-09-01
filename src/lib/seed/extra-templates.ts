import { Item } from "../types";
import { doc } from "./wrap";

// ---------------------------------------------------------------- 7. Launch countdown
const countdown = doc({
  kind: "page",
  body: `
<div class="lc-grid"></div>
<main class="lc-main">
  <div class="lc-badge">⚡ Early access — 500 spots</div>
  <h1>Waitlist for<br/><span class="lc-g">velocity</span></h1>
  <p>Flux is the deploy platform that ships your code to 280 edge nodes in 800ms. Join the waitlist — invite codes drop soon.</p>
  <div class="lc-timer" id="timer">
    <div class="lc-cell"><b id="d">00</b><span>days</span></div><i>:</i>
    <div class="lc-cell"><b id="h">00</b><span>hours</span></div><i>:</i>
    <div class="lc-cell"><b id="m">00</b><span>minutes</span></div><i>:</i>
    <div class="lc-cell"><b id="s">00</b><span>seconds</span></div>
  </div>
  <form class="lc-form" onsubmit="return false"><input type="email" placeholder="you@fast.dev"/><button>Get early access →</button></form>
  <div class="lc-social"><span class="lc-dot"></span> <b>12,480</b> builders already on the list</div>
</main>`,
  css: `
.lc-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(139,92,246,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.08) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(700px 500px at 50% 40%,#000,transparent);-webkit-mask-image:radial-gradient(700px 500px at 50% 40%,#000,transparent);}
.lc-main{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 6vw;}
.lc-badge{font-size:13px;color:var(--c1);border:1px solid rgba(34,211,238,.3);background:rgba(34,211,238,.07);padding:7px 16px;border-radius:999px;margin-bottom:30px;animation:fadeUp .7s ease both}
h1{font-size:clamp(40px,7vw,84px);font-weight:800;line-height:1.04;letter-spacing:-.03em;animation:fadeUp .7s .08s ease both}
.lc-g{background:linear-gradient(100deg,var(--v1),var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent}
.lc-main>p{max-width:52ch;color:var(--dim);margin-top:22px;font-size:16.5px;line-height:1.7;animation:fadeUp .7s .16s ease both}
.lc-timer{display:flex;align-items:center;gap:10px;margin-top:42px;animation:fadeUp .7s .24s ease both}
.lc-cell{min-width:86px;border:1px solid var(--line);background:var(--panel);border-radius:18px;padding:18px 12px;backdrop-filter:blur(10px)}
.lc-cell b{display:block;font-size:clamp(30px,4.5vw,48px);font-weight:800;font-variant-numeric:tabular-nums;background:linear-gradient(180deg,#fff,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
.lc-cell span{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}
.lc-timer>i{font-style:normal;font-size:26px;color:var(--v2);opacity:.5;font-weight:300}
.lc-form{display:flex;gap:10px;margin-top:38px;width:min(460px,92vw);animation:fadeUp .7s .32s ease both}
.lc-form input{flex:1;padding:15px 20px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--txt);font-size:15px;outline:none;transition:border-color .3s}
.lc-form input:focus{border-color:var(--v1)}
.lc-form button{white-space:nowrap;padding:15px 24px;border-radius:14px;background:linear-gradient(120deg,var(--v1),var(--v2));font-weight:700;font-size:14.5px;transition:transform .25s,box-shadow .25s}
.lc-form button:hover{transform:translateY(-2px);box-shadow:0 16px 44px -12px rgba(217,70,239,.8)}
.lc-social{margin-top:26px;font-size:14px;color:var(--dim);display:flex;align-items:center;gap:8px;animation:fadeUp .7s .4s ease both}
.lc-social b{color:var(--txt)}
.lc-dot{width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 0 0 rgba(52,211,153,.7);animation:ping 2s infinite}
@keyframes ping{70%{box-shadow:0 0 0 12px rgba(52,211,153,0)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
`,
  js: `
const target=Date.now()+ (3*24*3600+7*3600+42*60+18)*1000;
function pad(n){return String(n).padStart(2,'0');}
function tick(){
 const t=Math.max(0,target-Date.now());
 document.getElementById('d').textContent=pad(Math.floor(t/86400000));
 document.getElementById('h').textContent=pad(Math.floor(t/3600000)%24);
 document.getElementById('m').textContent=pad(Math.floor(t/60000)%60);
 document.getElementById('s').textContent=pad(Math.floor(t/1000)%60);
}
tick();setInterval(tick,1000);
`,
});

// ---------------------------------------------------------------- 8. Audio / music product
const audioLanding = doc({
  kind: "page",
  body: `
<div class="ad-nav"><b>◉ Wavelength</b><div><a>Product</a><a>Pricing</a><a class="ad-cta">Download</a></div></div>
<main class="ad-hero">
  <div class="ad-copy">
    <div class="ad-pill">✦ Sound you can see</div>
    <h1>Mix at the speed<br/>of <span class="ad-g">motion</span></h1>
    <p>Waveform is the audio workstation that renders your mix as living visuals. Twelve tracks of pure flow, zero plugins required.</p>
    <div class="ad-actions"><button class="ad-p">Start mixing free</button><button class="ad-s">▶ Hear a demo</button></div>
  </div>
  <div class="ad-console">
    <div class="ad-console-top"><span class="ad-rec"></span> SESSION 042 · live</div>
    <canvas id="wave"></canvas>
    <div class="ad-eq" id="eq">${Array.from({ length: 14 }, () => '<i></i>').join("")}</div>
    <div class="ad-knobs"><span></span><span></span><span></span><span></span></div>
  </div>
</main>`,
  css: `
.ad-nav{display:flex;justify-content:space-between;align-items:center;padding:24px 6vw;position:relative;z-index:2}
.ad-nav b{font-size:19px}
.ad-nav div{display:flex;gap:26px;align-items:center;font-size:14px;color:var(--dim)}
.ad-nav a:hover{color:var(--txt)}
.ad-cta{background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;padding:9px 18px;border-radius:999px;font-weight:600}
.ad-hero{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1.1fr;gap:50px;align-items:center;max-width:1200px;margin:0 auto;padding:60px 6vw;min-height:80vh}
.ad-pill{display:inline-block;font-size:12.5px;color:var(--c1);border:1px solid rgba(34,211,238,.3);background:rgba(34,211,238,.07);padding:6px 14px;border-radius:999px;margin-bottom:24px}
.ad-copy h1{font-size:clamp(36px,5.2vw,64px);font-weight:800;line-height:1.06;letter-spacing:-.03em}
.ad-g{background:linear-gradient(100deg,var(--v2),var(--c1));-webkit-background-clip:text;background-clip:text;color:transparent}
.ad-copy p{color:var(--dim);margin:22px 0 30px;line-height:1.7;font-size:16.5px;max-width:44ch}
.ad-actions{display:flex;gap:12px;flex-wrap:wrap}
.ad-p{background:linear-gradient(120deg,var(--v1),var(--v2));color:#fff;padding:14px 26px;border-radius:12px;font-weight:700;font-size:15px;box-shadow:0 12px 40px -12px rgba(217,70,239,.8)}
.ad-s{border:1px solid var(--line);background:var(--panel);padding:14px 26px;border-radius:12px;font-weight:600;font-size:15px}
.ad-console{border:1px solid var(--line);border-radius:26px;background:linear-gradient(165deg,rgba(139,92,246,.14),rgba(8,8,22,.9));box-shadow:0 40px 90px -30px rgba(0,0,0,.8);overflow:hidden;animation:floatA 7s ease-in-out infinite}
@keyframes floatA{50%{transform:translateY(-12px) rotate(.4deg)}}
.ad-console-top{display:flex;align-items:center;gap:10px;padding:16px 20px;font-size:12px;letter-spacing:.15em;color:var(--dim);border-bottom:1px solid var(--line);text-transform:uppercase}
.ad-rec{width:9px;height:9px;border-radius:50%;background:#f43f5e;box-shadow:0 0 12px rgba(244,63,94,.9);animation:blink 1.1s infinite}
@keyframes blink{50%{opacity:.25}}
#wave{width:100%;height:170px;display:block}
.ad-eq{display:flex;align-items:flex-end;gap:6px;height:110px;padding:14px 20px 6px}
.ad-eq i{flex:1;background:linear-gradient(180deg,var(--v2),var(--v1));border-radius:5px 5px 2px 2px;animation:eq 1s ease-in-out infinite;box-shadow:0 0 14px -2px rgba(139,92,246,.6)}
@keyframes eq{0%,100%{height:18%}50%{height:var(--eh,80%)}}
.ad-knobs{display:flex;gap:18px;justify-content:center;padding:14px 20px 22px}
.ad-knobs span{width:46px;height:46px;border-radius:50%;border:3px solid rgba(255,255,255,.1);border-top-color:var(--c1);border-right-color:var(--v2);animation:spin 4s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:880px){.ad-hero{grid-template-columns:1fr}}
`,
  js: `
document.querySelectorAll('.ad-eq i').forEach((b,i)=>{
 b.style.setProperty('--eh',(30+Math.random()*65)+'%');
 b.style.animationDelay=(-Math.random())+'s';
 b.style.animationDuration=(0.7+Math.random()*0.8)+'s';
});
const cv=document.getElementById('wave'),ctx=cv.getContext('2d');
function rs(){cv.width=cv.clientWidth;}rs();addEventListener('resize',rs);
let t=0;
function loop(){
 t+=.045;const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
 for(let layer=0;layer<3;layer++){
  ctx.beginPath();
  const amp=26-layer*7;
  for(let x=0;x<=W;x+=4){
   const y=H/2+Math.sin(x*.022+t*(1+layer*.4)+layer*2)*amp+Math.sin(x*.008-t*.7)*amp*.5;
   x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.strokeStyle=['rgba(217,70,239,.8)','rgba(139,92,246,.55)','rgba(34,211,238,.35)'][layer];
  ctx.lineWidth=2.5-layer*.5;ctx.stroke();
 }
 requestAnimationFrame(loop);
}
loop();
`,
});

// ---------------------------------------------------------------- 9. Terminal dev-tool
const terminalLanding = doc({
  kind: "page",
  body: `
<div class="tm-grid"></div>
<div class="tm-nav"><b>~/forge $</b><span class="tm-status">● online</span></div>
<main class="tm-main">
  <div class="tm-term">
    <div class="tm-bar"><i></i><i></i><i></i><span>zsh — forge</span></div>
    <div class="tm-body" id="out"></div>
  </div>
  <h1>Ship from your <span class="tm-g">terminal</span>.<br/>Everything else is overhead.</h1>
  <p>Forge is one binary that scaffolds, tests, deploys and monitors your stack. No dashboards, no YAML sprawl — just commands you already know.</p>
  <div class="tm-cmd">$ npm i -g forge-ai <span class="tm-cur">▌</span></div>
  <div class="tm-feats"><span>◇ zero config</span><span>◇ 280 edge nodes</span><span>◇ instant rollback</span></div>
</main>`,
  css: `
.tm-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(34,211,238,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.06) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(720px 540px at 50% 30%,#000,transparent);-webkit-mask-image:radial-gradient(720px 540px at 50% 30%,#000,transparent);}
.tm-nav{position:relative;display:flex;justify-content:space-between;padding:24px 6vw;font-family:ui-monospace,monospace;font-size:15px;z-index:2}
.tm-status{color:#34d399;font-size:13px}
.tm-main{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:30px 6vw 80px;text-align:center}
.tm-term{margin:0 auto 56px;max-width:640px;border:1px solid rgba(34,211,238,.25);border-radius:16px;overflow:hidden;background:rgba(6,10,18,.85);text-align:left;box-shadow:0 30px 80px -30px rgba(34,211,238,.3);font-family:ui-monospace,'JetBrains Mono',monospace}
.tm-bar{display:flex;align-items:center;gap:7px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.07)}
.tm-bar i{width:11px;height:11px;border-radius:50%}
.tm-bar i:nth-child(1){background:#ff5f57}.tm-bar i:nth-child(2){background:#febc2e}.tm-bar i:nth-child(3){background:#28c840}
.tm-bar span{margin-left:8px;font-size:11px;color:var(--dim)}
.tm-body{padding:18px 20px;font-size:13.5px;line-height:1.9;min-height:200px;color:#a5f3fc}
.tm-body .prompt{color:#c4b5fd}.tm-body .ok{color:#6ee7b7}.tm-body .dim{color:#64748b}
h1{font-size:clamp(32px,5.4vw,60px);font-weight:800;line-height:1.08;letter-spacing:-.03em}
.tm-g{font-family:ui-monospace,monospace;background:linear-gradient(100deg,var(--c1),var(--v1));-webkit-background-clip:text;background-clip:text;color:transparent}
.tm-main>p{color:var(--dim);max-width:56ch;margin:22px auto 0;line-height:1.7;font-size:16px}
.tm-cmd{margin:34px auto 0;display:inline-block;font-family:ui-monospace,monospace;font-size:14px;border:1px solid rgba(139,92,246,.4);background:rgba(139,92,246,.1);color:#ddd6fe;padding:15px 26px;border-radius:12px;box-shadow:0 0 40px -10px rgba(139,92,246,.5)}
.tm-cur{color:var(--v2);animation:blink 1s step-end infinite}
@keyframes blink{50%{opacity:0}}
.tm-feats{margin-top:30px;display:flex;gap:22px;justify-content:center;flex-wrap:wrap;font-family:ui-monospace,monospace;font-size:13px;color:var(--dim)}
`,
  js: `
const out=document.getElementById('out');
const lines=[
 {t:'<span class="prompt">$ forge init my-edge-app</span>',d:300},
 {t:'<span class="dim">→ scaffolding project… · selecting edge region · linking repo</span>',d:700},
 {t:'<span class="ok">✓ project ready in 0.8s</span>',d:400},
 {t:'<span class="prompt">$ forge deploy --prod</span>',d:500},
 {t:'<span class="dim">→ bundling (esbuild) · uploading 14 functions · warming 280 nodes</span>',d:900},
 {t:'<span class="ok">✓ live at https://my-edge-app.forge.dev  ·  812ms global</span>',d:400},
];
let li=0;
function typeLine(){
 if(li>=lines.length){setTimeout(()=>{out.innerHTML='';li=0;typeLine();},2600);return;}
 const div=document.createElement('div');div.innerHTML=lines[li].t;out.appendChild(div);
 const delay=lines[li].d;li++;setTimeout(typeLine,delay);
}
typeLine();
`,
});

export const EXTRA_TEMPLATE_ITEMS: Item[] = [
  {
    id: "tpl-countdown",
    slug: "waitlist-launch-countdown",
    category: "templates",
    title: "Flux — Waitlist Launch Countdown",
    summary:
      "Launch-soon page with a live ticking flip-style countdown, glow-grid backdrop, email capture and live 'joined' indicator.",
    author: "MotionVault",
    tags: ["waitlist", "countdown", "launch", "saas", "coming-soon"],
    tech: ["html", "css", "javascript"],
    stars: 3980,
    views: 28400,
    copies: 3600,
    featured: true,
    published: true,
    html: countdown,
    prompt: `Build a dark "coming soon" waitlist landing page for a deploy product called "Flux". Requirements:
1. Fixed background: faint violet grid lines (52px) masked with a radial-gradient so they fade at the edges.
2. Centered hero: cyan pill badge "⚡ Early access — 500 spots", giant bold headline "Waitlist for [velocity]" where "velocity" is a violet→fuchsia gradient clip-text, muted sub-paragraph about deploying to 280 edge nodes in 800ms.
3. A LIVE COUNTDOWN timer: four glass cells (days/hours/minutes/seconds, 86px min-width, 18px radius, backdrop-blur) separated by fuchsia colons; each shows big tabular-nums numerals (gradient white→violet, up to 48px) and uppercase tracked labels; JS computes from a fixed target ~3 days 7h 42m in the future, pads to 2 digits, ticks every second via setInterval.
4. Email capture form: flex row with a rounded input + gradient button "Get early access →" that lifts and glows on hover.
5. Social-proof line with a green pinging dot (box-shadow ping animation) and "12,480 builders already on the list".
6. Everything fades up in a staggered 0.7s cascade. Vanilla HTML/CSS/JS only, dark #070711.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
  },
  {
    id: "tpl-audio",
    slug: "audio-music-eq-landing",
    category: "templates",
    title: "Wavelength — Audio Product with Live EQ",
    summary:
      "Music-app landing featuring an animated mixing console: canvas waveform, 14 dancing EQ bars, spinning knobs and a floating glass device.",
    author: "MotionVault",
    tags: ["audio", "music", "waveform", "canvas", "saas"],
    tech: ["html", "css", "javascript"],
    stars: 4510,
    views: 31900,
    copies: 4200,
    featured: false,
    published: true,
    html: audioLanding,
    prompt: `Build a dark landing page for an audio workstation product called "Wavelength". Requirements:
1. Nav: "◉ Wavelength" logo, Product/Pricing links, gradient "Download" pill.
2. Two-column hero (collapses under 880px): LEFT — cyan pill "✦ Sound you can see", huge headline "Mix at the speed of [motion]" (fuchsia→cyan gradient text), muted copy, two buttons (gradient primary "Start mixing free", ghost "▶ Hear a demo"). RIGHT — a floating glass "mixing console" card (26px radius, violet tint, deep shadow) that gently bobs on a 7s float keyframe.
3. Console contents: a top bar with a blinking red rec dot + "SESSION 042 · live"; a 170px <canvas> waveform that JS animates every frame as THREE layered sine waves (fuchsia .8, violet .55, cyan .35; amplitudes 26/19/12 with different frequencies and phases); an EQ row of 14 gradient bars that each animate height 18%→--eh% with randomized durations 0.7-1.5s and negative delays so they dance independently; four rotating conic knobs (two-tone borders, spin 4s).
4. Handle canvas resize; use requestAnimationFrame. Vanilla HTML/CSS/JS only, dark #070711.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-08-21T10:00:00Z",
    updatedAt: "2026-08-31T10:00:00Z",
  },
  {
    id: "tpl-terminal",
    slug: "terminal-devtool-landing",
    category: "templates",
    title: "Forge — Terminal-Style Dev Tool Landing",
    summary:
      "A macOS terminal window typing out deploy commands on a loop, monospace display headline and a glow-grid hacker backdrop.",
    author: "MotionVault",
    tags: ["developer", "terminal", "cli", "monospace", "hacker"],
    tech: ["html", "css", "javascript"],
    stars: 5120,
    views: 35700,
    copies: 4900,
    featured: true,
    published: true,
    html: terminalLanding,
    prompt: `Build a dark terminal-themed landing page for a CLI deploy tool called "Forge". Requirements:
1. Fixed backdrop: faint CYAN grid lines (44px) fading via radial mask; top nav in monospace: "~/forge $" left, green "● online" right.
2. A macOS terminal window (centered, max-width 640px, 16px radius, cyan-tinged border + big cyan glow shadow, translucent dark bg) with the three traffic-light dots (red/yellow/green) and label "zsh — forge". Its body uses a monospace JS TYPEWRITER that prints a scripted command sequence line by line with delays: violet "$ forge init my-edge-app", dim "→ scaffolding…", green "✓ project ready in 0.8s", violet "$ forge deploy --prod", dim "→ bundling · warming 280 nodes", green "✓ live at https://my-edge-app.forge.dev · 812ms global"; after finishing, pause 2.6s and loop forever.
3. Below: giant headline "Ship from your [terminal]. Everything else is overhead." with "terminal" in monospace gradient cyan→violet clipped text; muted paragraph; a rounded mono command chip "$ npm i -g forge-ai ▌" with a blinking fuchsia cursor (step-end blink); a row of mono feature tags (◇ zero config / ◇ 280 edge nodes / ◇ instant rollback).
4. Vanilla HTML/CSS/JS only, dark #070711.`,
    sourceUrl: "https://motionsites.ai",
    createdAt: "2026-08-27T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
];

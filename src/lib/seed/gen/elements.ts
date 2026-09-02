// Generated wave — UI ELEMENTS: 13 families × 8 palette variants = 104 items.
// Every variant is a real, working, self-contained preview built with docP().

import { docP, Fam, materialize } from "./kit";

const RADII = [14, 999, 10, 22, 999, 14, 30, 6];
const r = (vi: number) => (RADII[vi] === 999 ? "999px" : `${RADII[vi]}px`);

/* 1 — neon pulse button */
const pulseBtn: Fam = {
  id: "ge-pulse-btn", slugBase: "neon-pulse-button", title: "Neon Pulse Button",
  category: "elements",
  summary: "A gradient call-to-action button with a breathing neon glow ring and a sliding arrow on hover.",
  tags: ["button", "cta", "glow", "pulse", "neon"],
  tech: ["html", "css"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<button class="pb">Get started <span class="ar">→</span></button>`,
      css: `
.pb{position:relative;padding:17px 40px;border-radius:${r(vi)};font-size:16px;font-weight:800;letter-spacing:.02em;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));
 box-shadow:0 10px 34px color-mix(in srgb,var(--v1) 45%,transparent);
 animation:pulse 2.4s ease-out infinite;transition:transform .22s}
.pb:hover{transform:translateY(-3px) scale(1.02)}
.pb:active{transform:translateY(0) scale(.98)}
.pb .ar{display:inline-block;margin-left:8px;transition:transform .25s}
.pb:hover .ar{transform:translateX(5px)}
@keyframes pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--v1) 55%,transparent)}
 70%{box-shadow:0 0 0 22px transparent}100%{box-shadow:0 0 0 0 transparent}}`,
    }),
    prompt: `Build a neon pulse CTA button: gradient background from ${p.v1} to ${p.v2} at 135deg, white bold text "Get started" with a → arrow that slides 5px right on hover, ${r(vi)} border radius. Add a breathing pulse ring: animate box-shadow from 0 0 0 0 color-mix(in srgb, ${p.v1} 55%, transparent) to 0 0 0 22px transparent over 2.4s, infinite. Lift -3px with slight 1.02 scale on hover, squish on active. Pure CSS.`,
  }),
};

/* 2 — line sweep button */
const sweepBtn: Fam = {
  id: "ge-sweep-btn", slugBase: "line-sweep-button", title: "Line Sweep Button",
  category: "elements",
  summary: "An outlined ghost button whose label is swept by a skewed gradient fill on hover.",
  tags: ["button", "ghost", "hover", "sweep", "outline"],
  tech: ["html", "css"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<button class="sb"><span>Discover more</span></button>`,
      css: `
.sb{position:relative;padding:16px 38px;border-radius:${r(vi)};font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
 color:var(--c1);border:1px solid color-mix(in srgb,var(--v1) 60%,transparent);overflow:hidden;transition:color .3s,letter-spacing .3s}
.sb span{position:relative;z-index:1}
.sb::before{content:'';position:absolute;inset:0;transform:translateX(-102%) skewX(-14deg);transform-origin:left;
 background:linear-gradient(90deg,var(--v1),var(--v2));transition:transform .38s cubic-bezier(.22,1,.36,1)}
.sb:hover{color:#0a0a18;letter-spacing:.22em}
.sb:hover::before{transform:translateX(0) skewX(0)}`,
    }),
    prompt: `Create a ghost outline button labeled "DISCOVER MORE": 1px border in ${p.v1} at 60% opacity, uppercase label colored ${p.c1}, letter-spacing .14em growing to .22em on hover. A ::before layer with a linear gradient ${p.v1}→${p.v2} sits behind the label, translated -102% X with a -14deg skew; on hover it sweeps in to 0 with no skew (cubic-bezier .22,1,.36,1, .38s) and the label flips to dark #0a0a18. Radius ${r(vi)}. Pure CSS.`,
  }),
};

/* 3 — morph icon button */
const morphBtn: Fam = {
  id: "ge-morph-btn", slugBase: "morph-icon-button", title: "Morph Icon Button",
  category: "elements",
  summary: "A round icon button that springs open: the burger bars morph into a close X with a rotation.",
  tags: ["button", "icon", "morph", "menu", "toggle"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const size = 56 + (vi % 4) * 4;
    return {
      html: docP(p, {
        body: `<button class="mb" id="mb" aria-label="toggle"><span class="l1"></span><span class="l2"></span><span class="l3"></span></button>`,
        css: `
.mb{width:${size}px;height:${size}px;border-radius:50%;display:grid;place-items:center;gap:5px;position:relative;
 background:rgba(255,255,255,.05);border:1px solid var(--line);transition:transform .3s cubic-bezier(.34,1.56,.64,1),border-color .3s}
.mb:hover{transform:scale(1.08)}
.mb span{display:block;width:22px;height:2.6px;border-radius:2px;background:var(--txt);transition:all .35s cubic-bezier(.34,1.56,.64,1)}
.mb.on{border-color:var(--v1);box-shadow:0 0 26px color-mix(in srgb,var(--v1) 45%,transparent);transform:rotate(90deg)}
.mb.on span{background:linear-gradient(90deg,var(--v1),var(--v2))}
.mb.on .l1{transform:translateY(7.6px) rotate(45deg)}
.mb.on .l2{opacity:0;transform:scaleX(0)}
.mb.on .l3{transform:translateY(-7.6px) rotate(-45deg)}`,
        js: `var b=document.getElementById('mb');b.addEventListener('click',function(){b.classList.toggle('on')});`,
      }),
      prompt: `Build a ${size}px circular glass icon button (white 5% background, subtle border) holding three 22px burger bars. On click (tiny JS toggle of an .on class) the whole button rotates 90deg with a spring cubic-bezier(.34,1.56,.64,1), the top bar translates down and rotates 45deg, the middle bar scales to 0, the bottom bar rotates -45deg — forming an X. Active state: border color ${p.v1}, glow shadow 0 0 26px ${p.v1} at 45%, bars recolored with a ${p.v1}→${p.v2} gradient.`,
    };
  },
};

/* 4 — ring loader */
const ringLoader: Fam = {
  id: "ge-ring-load", slugBase: "conic-ring-loader", title: "Conic Ring Loader",
  category: "elements",
  summary: "A gradient conic ring spinner masked into a clean arc — no SVG, one element.",
  tags: ["loader", "spinner", "loading", "conic"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const th = [6, 8, 10, 6, 9, 7, 10, 8][vi];
    const dur = (0.7 + (vi % 4) * 0.2).toFixed(1);
    return {
      html: docP(p, {
        body: `<div class="rl"></div><p class="cap">Loading experience…</p>`,
        css: `
.rl{width:72px;height:72px;border-radius:50%;
 background:conic-gradient(from 0deg,transparent 8%,var(--v1) 55%,var(--v2) 80%,var(--c1));
 -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - ${th}px),#000 calc(100% - ${th}px + 1px));
 mask:radial-gradient(farthest-side,transparent calc(100% - ${th}px),#000 calc(100% - ${th}px + 1px));
 animation:rlspin ${dur}s linear infinite;filter:drop-shadow(0 0 12px color-mix(in srgb,var(--v1) 40%,transparent))}
.cap{color:var(--dim);font-size:13px;letter-spacing:.2em;text-transform:uppercase}
@keyframes rlspin{to{transform:rotate(360deg)}}`,
      }),
      prompt: `Create a single-div conic ring loader: 72px circle painted with a conic-gradient from transparent through ${p.v1} and ${p.v2} to ${p.c1}, then masked into a ${th}px thick ring using a radial-gradient mask (transparent center). Spin it once every ${dur}s with linear timing, plus a soft drop-shadow glow in ${p.v1}. Add an uppercase letter-spaced "Loading experience…" caption below. Pure CSS.`,
    };
  },
};

/* 5 — bounce dots loader */
const dotsLoader: Fam = {
  id: "ge-dots-load", slugBase: "bouncing-dots-loader", title: "Bouncing Dots Loader",
  category: "elements",
  summary: "Four gradient dots bouncing in a staggered wave — the classic chat-typing energy.",
  tags: ["loader", "dots", "bounce", "typing"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const size = [14, 18, 12, 16, 20, 14, 16, 18][vi];
    return {
      html: docP(p, {
        body: `<div class="dl"><i></i><i></i><i></i><i></i></div><p class="cap">Assistant is typing</p>`,
        css: `
.dl{display:flex;gap:${Math.round(size * 0.8)}px;align-items:center;height:60px}
.dl i{width:${size}px;height:${size}px;border-radius:50%;animation:bnc 1.1s ease-in-out infinite}
.dl i:nth-child(1){background:var(--v1)}
.dl i:nth-child(2){background:var(--v2);animation-delay:.12s}
.dl i:nth-child(3){background:var(--c1);animation-delay:.24s}
.dl i:nth-child(4){background:linear-gradient(135deg,var(--v1),var(--v2));animation-delay:.36s}
@keyframes bnc{0%,100%{transform:translateY(0) scale(1);opacity:.65}40%{transform:translateY(-22px) scale(1.12);opacity:1}}
.cap{color:var(--dim);font-size:13px;letter-spacing:.2em;text-transform:uppercase}`,
      }),
      prompt: `Build a bouncing dots loader: four ${size}px circular dots in a row (${Math.round(size * 0.8)}px gaps), colored ${p.v1}, ${p.v2}, ${p.c1}, and a ${p.v1}→${p.v2} gradient respectively. Each dot runs the same 1.1s ease-in-out bounce (translateY -22px + scale 1.12 at 40%, fading opacity .65→1), staggered by .12s delays so the wave travels left to right. Caption "Assistant is typing" below. Pure CSS.`,
    };
  },
};

/* 6 — equalizer bars */
const eqBars: Fam = {
  id: "ge-eq-bars", slugBase: "equalizer-bars-loader", title: "Equalizer Bars Loader",
  category: "elements",
  summary: "Five gradient bars pumping like an audio equalizer with staggered scaleY animation.",
  tags: ["loader", "equalizer", "audio", "bars"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const w = [10, 12, 8, 14, 10, 12, 9, 11][vi];
    return {
      html: docP(p, {
        body: `<div class="eq"><i></i><i></i><i></i><i></i><i></i></div><p class="cap">Now playing</p>`,
        css: `
.eq{display:flex;gap:${w}px;align-items:flex-end;height:72px}
.eq i{width:${w}px;height:100%;border-radius:${Math.round(w / 2)}px;transform-origin:bottom;
 background:linear-gradient(to top,var(--v1),var(--v2) 60%,var(--c1));animation:eq 1s ease-in-out infinite}
.eq i:nth-child(1){animation-delay:0s}.eq i:nth-child(2){animation-delay:.15s}
.eq i:nth-child(3){animation-delay:.3s}.eq i:nth-child(4){animation-delay:.45s}
.eq i:nth-child(5){animation-delay:.6s}
@keyframes eq{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
.cap{color:var(--dim);font-size:13px;letter-spacing:.2em;text-transform:uppercase}`,
      }),
      prompt: `Create an audio equalizer loader: five vertical bars of ${w}px width with rounded caps, each filled with a vertical gradient ${p.v1} → ${p.v2} → ${p.c1}. Anchor transform-origin at the bottom and animate scaleY from .25 to 1 over 1s ease-in-out, staggered with .15s delays so the bars pump in sequence like a music visualizer. Add an uppercase "Now playing" caption. Pure CSS.`,
    };
  },
};

/* 7 — slide toggle */
const slideToggle: Fam = {
  id: "ge-slide-tgl", slugBase: "glow-slide-toggle", title: "Glow Slide Toggle",
  category: "elements",
  summary: "A pill toggle switch whose knob springs across and sets the track glowing when enabled.",
  tags: ["toggle", "switch", "form", "control"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const w = [64, 72, 60, 68, 76, 64, 70, 62][vi];
    const knob = Math.round(w / 2.4);
    return {
      html: docP(p, {
        body: `<label class="tg"><input type="checkbox" checked><span class="tk"></span></label>
<label class="tg"><input type="checkbox"><span class="tk"></span></label>
<p class="cap">Notifications</p>`,
        css: `
.tg{display:inline-block;margin:4px 16px;cursor:pointer}
.tg input{display:none}
.tk{display:block;width:${w}px;height:${Math.round(w / 2.1)}px;border-radius:999px;position:relative;
 background:rgba(255,255,255,.07);border:1px solid var(--line);transition:all .35s cubic-bezier(.22,1,.36,1)}
.tk::before{content:'';position:absolute;top:50%;left:4px;transform:translateY(-50%);
 width:${knob}px;height:${knob}px;border-radius:50%;background:#8a86b8;transition:all .35s cubic-bezier(.34,1.56,.64,1)}
.tg input:checked + .tk{background:linear-gradient(90deg,var(--v1),var(--v2));border-color:transparent;
 box-shadow:0 6px 24px color-mix(in srgb,var(--v1) 45%,transparent)}
.tg input:checked + .tk::before{left:calc(100% - ${knob + 4}px);background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.4)}
.cap{color:var(--dim);font-size:13px;letter-spacing:.2em;text-transform:uppercase}`,
      }),
      prompt: `Build a pill toggle switch ${w}px wide with a ${knob}px round knob. Off state: translucent white track with a subtle border and a grey knob. On (:checked, selector input:checked + .tk): track fills with a ${p.v1}→${p.v2} gradient, drops a ${p.v1} glow shadow, and the knob springs to the right with cubic-bezier(.34,1.56,.64,1) turning white. Render one on and one off above a "Notifications" caption. Pure CSS, no JS.`,
    };
  },
};

/* 8 — draw-on checkbox */
const drawCheck: Fam = {
  id: "ge-draw-chk", slugBase: "draw-on-checkbox", title: "Draw-on Checkbox",
  category: "elements",
  summary: "A checkbox whose checkmark is stroke-drawn with a dash animation when ticked.",
  tags: ["checkbox", "form", "draw", "svg", "control"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const size = [26, 30, 26, 34, 28, 30, 26, 32][vi];
    return {
      html: docP(p, {
        body: `<label class="ck"><input type="checkbox" checked><span class="bx"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span><span class="lb">Enable sync</span></label>
<label class="ck"><input type="checkbox"><span class="bx"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span><span class="lb">Auto-update</span></label>`,
        css: `
.ck{display:flex;align-items:center;gap:14px;cursor:pointer;margin:8px 0;font-size:16px}
.ck input{display:none}
.bx{width:${size}px;height:${size}px;border-radius:${Math.round(size / 3.2)}px;display:grid;place-items:center;flex-shrink:0;
 border:1.5px solid var(--line);background:rgba(255,255,255,.04);transition:all .3s cubic-bezier(.34,1.56,.64,1)}
.bx svg{width:70%;height:70%;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;
 stroke-dasharray:22;stroke-dashoffset:22;transition:stroke-dashoffset .35s ease .05s}
.ck input:checked + .bx{background:linear-gradient(135deg,var(--v1),var(--v2));border-color:transparent;transform:scale(1.06);
 box-shadow:0 6px 20px color-mix(in srgb,var(--v1) 45%,transparent)}
.ck input:checked + .bx svg{stroke-dashoffset:0}
.lb{color:var(--txt)}`,
      }),
      prompt: `Build a custom checkbox: a ${size}px rounded square with a 1.5px subtle border containing an SVG check path (M5 12.5 l4.2 4.2 L19 7) styled fill:none, 3px round-capped white stroke, with stroke-dasharray/offset 22 so it starts hidden. On :checked the box fills with a ${p.v1}→${p.v2} gradient, scales 1.06 with a spring curve, gains a glow shadow, and the check draws itself by animating stroke-dashoffset to 0 over .35s. Show "Enable sync" checked and "Auto-update" unchecked. Pure CSS.`,
    };
  },
};

/* 9 — glow float input */
const glowInput: Fam = {
  id: "ge-glow-inp", slugBase: "floating-glow-input", title: "Floating Glow Input",
  category: "elements",
  summary: "A text field with a floating label and a gradient focus ring that breathes.",
  tags: ["input", "form", "floating-label", "focus"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const w = [280, 320, 300, 260, 320, 280, 300, 340][vi];
    return {
      html: docP(p, {
        body: `<div class="fi"><input id="fi" type="text" placeholder=" " autocomplete="off"><label for="fi">Email address</label></div>`,
        css: `
.fi{position:relative;width:${w}px}
.fi input{width:100%;padding:18px 20px;font-size:15px;color:var(--txt);border-radius:${r(vi)};
 background:rgba(255,255,255,.04);border:1.5px solid var(--line);outline:none;transition:border-color .3s,box-shadow .3s}
.fi label{position:absolute;left:20px;top:50%;transform:translateY(-50%);color:var(--dim);font-size:15px;pointer-events:none;
 transition:all .25s cubic-bezier(.22,1,.36,1)}
.fi input:focus{border-color:var(--v1);box-shadow:0 0 0 4px color-mix(in srgb,var(--v1) 22%,transparent),0 0 30px color-mix(in srgb,var(--v2) 25%,transparent)}
.fi input:focus + label,.fi input:not(:placeholder-shown) + label{top:0;left:16px;font-size:11.5px;font-weight:700;letter-spacing:.08em;
 color:var(--c1);background:var(--bg);padding:0 8px;border-radius:4px}`,
      }),
      prompt: `Build a ${w}px text input with a floating label "Email address": the label sits centered inside the field; when focused or filled (:focus / :not(:placeholder-shown), using placeholder=" ") it shrinks to 11.5px bold uppercase-ish ${p.c1} text and docks on the top border with a background-colored chip. Focus adds a ${p.v1} border plus a layered glow (4px ring at 22% + 30px outer at 25% of ${p.v2}). Radius ${r(vi)}. Pure CSS.`,
    };
  },
};

/* 10 — striped progress bar */
const stripeBar: Fam = {
  id: "ge-stripe-bar", slugBase: "striped-progress-bar", title: "Striped Progress Bar",
  category: "elements",
  summary: "A gradient progress bar with animated candy stripes and a rolling percentage counter.",
  tags: ["progress", "bar", "loading", "upload"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => {
    const pct = 55 + vi * 5;
    return {
      html: docP(p, {
        body: `<div class="pr"><div class="pr-top"><span>Uploading assets</span><b id="pc">0%</b></div><div class="pr-tr"><div class="pr-fl" id="pf"></div></div></div>`,
        css: `
.pr{width:320px}
.pr-top{display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:10px;color:var(--dim)}
.pr-top b{color:var(--c1);font-variant-numeric:tabular-nums}
.pr-tr{height:14px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid var(--line);overflow:hidden}
.pr-fl{height:100%;width:0;border-radius:999px;transition:width 1.4s cubic-bezier(.22,1,.36,1);
 background:repeating-linear-gradient(55deg,var(--v1) 0 12px,var(--v2) 12px 24px);background-size:200% 100%;
 animation:stripes .9s linear infinite;box-shadow:0 0 18px color-mix(in srgb,var(--v1) 55%,transparent)}
@keyframes stripes{to{background-position:-34px 0}}`,
        js: `var bar=document.getElementById('pf'),lbl=document.getElementById('pc'),t=${pct};
requestAnimationFrame(function(){bar.style.width=t+'%'});
var n=0,t0=performance.now();
(function tick(now){var k=Math.min(1,(now-t0)/1400);var e=1-Math.pow(1-k,3);n=Math.round(t*e);lbl.textContent=n+'%';if(k<1)requestAnimationFrame(tick)})(t0);`,
      }),
      prompt: `Build a progress widget "Uploading assets": a rounded 14px track on dark glass, filled to ${pct}% with a repeating-linear-gradient (55deg stripes alternating ${p.v1} / ${p.v2} every 12px) that scrolls via background-position animation. The fill animates its width over 1.4s on load with a strong ease-out, while a tabular-numeral percentage label counts from 0 to ${pct} using requestAnimationFrame with a cubic ease. Add a ${p.v1} glow on the fill. Vanilla JS + CSS.`,
    };
  },
};

/* 11 — status badge chips */
const badgeChips: Fam = {
  id: "ge-badge-chip", slugBase: "status-badge-chips", title: "Status Badge Chips",
  category: "elements",
  summary: "A row of status chips: pulsing live dot, outlined beta tag and a gradient PRO pill.",
  tags: ["badge", "chip", "status", "pill", "label"],
  tech: ["html", "css"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="ch">
<span class="c c-live"><i></i>Live</span>
<span class="c c-beta">Beta</span>
<span class="c c-pro">PRO</span>
</div>`,
      css: `
.ch{display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:center}
.c{font-size:12.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:8px 16px;border-radius:${vi % 2 ? '6px' : '999px'};display:inline-flex;align-items:center;gap:8px}
.c-live{color:var(--c1);background:color-mix(in srgb,var(--v1) 14%,transparent);border:1px solid color-mix(in srgb,var(--v1) 35%,transparent)}
.c-live i{width:7px;height:7px;border-radius:50%;background:var(--c1);animation:blink 1.4s ease-in-out infinite}
@keyframes blink{0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--c1) 60%,transparent)}50%{box-shadow:0 0 0 6px transparent}}
.c-beta{color:var(--dim);border:1.5px dashed var(--line)}
.c-pro{color:#0a0a18;background:linear-gradient(135deg,var(--v1),var(--v2));box-shadow:0 6px 18px color-mix(in srgb,var(--v1) 45%,transparent)}`,
    }),
    prompt: `Design a row of three status chips (border radius ${vi % 2 ? '6px' : '999px'}, uppercase 12.5px bold, letter-spacing .12em): 1) "Live" — ${p.v1}-tinted translucent background and border with a small ${p.c1} dot that pulses a ring shadow every 1.4s; 2) "Beta" — dashed muted outline; 3) "PRO" — solid ${p.v1}→${p.v2} gradient fill with near-black text and a soft glow shadow. Pure CSS.`,
  }),
};

/* 12 — tooltip pop button */
const tooltipBtn: Fam = {
  id: "ge-tip-btn", slugBase: "spring-tooltip-button", title: "Spring Tooltip Button",
  category: "elements",
  summary: "A subtle button that pops a spring-animated tooltip bubble into view on hover.",
  tags: ["tooltip", "button", "hover", "popover"],
  tech: ["html", "css"],
  build: (p, vi) => {
    const top = vi % 2 === 0;
    return {
      html: docP(p, {
        body: `<button class="tb">Hover me<span class="tt">${top ? "Copied to clipboard ✓" : "Keyboard shortcut ⌘C"}</span></button>`,
        css: `
.tb{position:relative;padding:15px 34px;border-radius:${r(vi)};font-size:15px;font-weight:700;color:var(--txt);
 background:rgba(255,255,255,.06);border:1px solid var(--line);transition:border-color .3s}
.tb:hover{border-color:color-mix(in srgb,var(--v1) 60%,transparent)}
.tt{position:absolute;left:50%;${top ? "bottom:calc(100% + 12px)" : "top:calc(100% + 12px)"};
 transform:translateX(-50%) translateY(${top ? "8px" : "-8px"}) scale(.85);opacity:0;pointer-events:none;
 padding:9px 16px;border-radius:10px;font-size:13px;font-weight:600;white-space:nowrap;color:#fff;
 background:linear-gradient(135deg,var(--v1),var(--v2));box-shadow:0 10px 30px color-mix(in srgb,var(--v1) 45%,transparent);
 transition:all .32s cubic-bezier(.34,1.56,.64,1)}
.tt::before{content:'';position:absolute;left:50%;${top ? "top:100%;transform:translateX(-50%);border-top-color:var(--v2)" : "bottom:100%;transform:translateX(-50%);border-bottom-color:var(--v1)"};
 border:6px solid transparent;${top ? "border-top-color:var(--v2)" : "border-bottom-color:var(--v1)"}}
.tb:hover .tt{transform:translateX(-50%) translateY(0) scale(1);opacity:1}`,
      }),
      prompt: `Build a ghost button "Hover me" with a tooltip ${top ? "above" : "below"}: a gradient bubble (${p.v1}→${p.v2}, white 13px text, 10px radius, glow shadow) attached by a small CSS triangle arrow. Hidden state: opacity 0, translateY ${top ? "8px down" : "-8px up"} and scale .85. On hover it springs into place with cubic-bezier(.34,1.56,.64,1) over .32s. Button border tints ${p.v1} on hover. Pure CSS.`,
    };
  },
};

/* 13 — pop star rating */
const starRate: Fam = {
  id: "ge-star-rate", slugBase: "pop-star-rating", title: "Pop Star Rating",
  category: "elements",
  summary: "Interactive five-star rating with gradient-filled stars and a springy pop on select.",
  tags: ["rating", "stars", "interactive", "review"],
  tech: ["html", "css", "javascript"],
  build: (p, vi) => ({
    html: docP(p, {
      body: `<div class="sr" id="sr">
<button data-v="1">★</button><button data-v="2">★</button><button data-v="3">★</button><button data-v="4">★</button><button data-v="5">★</button>
</div><p class="cap" id="cap">Tap a star to rate</p>`,
      css: `
.sr{display:flex;gap:${vi % 2 ? '4px' : '10px'}}
.sr button{font-size:44px;line-height:1;color:rgba(255,255,255,.16);transition:transform .18s cubic-bezier(.34,1.56,.64,1),color .18s}
.sr button:hover{transform:scale(1.22) rotate(-6deg)}
.sr button.on{background:linear-gradient(135deg,var(--v1),var(--v2));-webkit-background-clip:text;background-clip:text;color:transparent;
 filter:drop-shadow(0 4px 14px color-mix(in srgb,var(--v1) 55%,transparent))}
.sr button.pop{animation:pop .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes pop{0%{transform:scale(.6)}55%{transform:scale(1.35)}100%{transform:scale(1)}}
.cap{color:var(--dim);font-size:13.5px;letter-spacing:.14em;text-transform:uppercase}`,
      js: `var stars=document.querySelectorAll('#sr button'),cap=document.getElementById('cap');
stars.forEach(function(s){s.addEventListener('click',function(){var v=+s.dataset.v;
stars.forEach(function(x,i){x.classList.toggle('on',i<v);x.classList.remove('pop');void x.offsetWidth;if(i<v)x.classList.add('pop')});
cap.textContent='You rated '+v+' / 5';})});`,
    }),
    prompt: `Build an interactive 5-star rating: five ★ buttons starting at 16% white opacity. Clicking star N (vanilla JS) fills stars 1..N with a ${p.v1}→${p.v2} gradient (background-clip:text) plus a colored drop-shadow, and replays a spring pop keyframe (scale .6→1.35→1) on each filled star. Stars scale 1.22 rotate -6deg on hover. A caption below switches from "Tap a star to rate" to "You rated N / 5". Gap ${vi % 2 ? '4px' : '10px'} between stars.`,
  }),
};

export const GEN_ELEMENT_ITEMS = materialize([
  pulseBtn, sweepBtn, morphBtn, ringLoader, dotsLoader, eqBars,
  slideToggle, drawCheck, glowInput, stripeBar, badgeChips, tooltipBtn, starRate,
]);

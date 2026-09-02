// Generated wave — SITE TEMPLATES: 8 industries × 4 visual styles = 32 complete
// mini landing pages (nav → hero → features → CTA → footer), each self-contained.

import { Item } from "../../types";
import { Palette, PALETTES } from "./palettes";
import { doc, DocOpts } from "../wrap";
import { GEN_NOW } from "./kit";

interface Industry {
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  sub: string;
  feats: [string, string, string][];
  stat: string;
}

const INDUSTRIES: Industry[] = [
  { slug: "pulseboard", name: "PulseBoard", tag: "saas-analytics", tagline: "Analytics that feel alive",
    sub: "Real-time dashboards your team will actually open every morning.",
    feats: [["⚡", "Real-time funnels", "Watch conversions stream in live, second by second."], ["🚨", "Anomaly alerts", "Get pinged the moment a metric leaves its comfort zone."], ["📊", "Team dashboards", "Unlimited viewers, role-based boards, zero seat anxiety."]],
    stat: "4.2B events tracked daily" },
  { slug: "inkflow", name: "Inkflow AI", tag: "ai-writing", tagline: "Write ten times faster",
    sub: "From blank page to polished draft before your coffee cools.",
    feats: [["✍️", "Long-form drafts", "Full articles from a three-line brief, in your voice."], ["🎛", "Tone control", "Slide between playful and boardroom with one control."], ["🌍", "30 languages", "Native-quality output across every major market."]],
    stat: "12M documents written" },
  { slug: "vaultpay", name: "VaultPay", tag: "fintech", tagline: "Banking without borders",
    sub: "Move money anywhere on Earth in seconds, not business days.",
    feats: [["💸", "Instant transfers", "140 currencies settling in under eight seconds."], ["🧠", "Smart budgets", "AI envelopes that rebalance as you spend."], ["🔐", "Crypto wallet", "Self-custody keys with bank-grade recovery."]],
    stat: "$9B moved last year" },
  { slug: "tempofit", name: "TempoFit", tag: "fitness", tagline: "Your AI fitness coach",
    sub: "Plans that adapt to your sleep, soreness and schedule.",
    feats: [["🏋️", "Adaptive plans", "Workouts rewritten daily around your recovery score."], ["📡", "Live classes", "Coach-led sessions with real-time form cues."], ["😴", "Recovery tracking", "Sleep, HRV and strain rolled into one number."]],
    stat: "380k athletes training" },
  { slug: "wavestream", name: "Wavestream", tag: "music", tagline: "Music in motion",
    sub: "Lossless streaming with AI mixes that read the room.",
    feats: [["🎧", "Lossless audio", "Studio masters at 24-bit/192kHz on every tier."], ["🤖", "AI mixes", "Infinite DJ sets blended from your library."], ["🎤", "Live sessions", "Weekly artist livestreams in spatial audio."]],
    stat: "90M tracks in lossless" },
  { slug: "wanderloop", name: "Wanderloop", tag: "travel", tagline: "Trips that plan themselves",
    sub: "Tell it where — it books the when, the how and the hidden gems.",
    feats: [["🗺", "Smart itineraries", "Minute-level plans tuned to your walking pace."], ["📴", "Offline maps", "Full city packs that work in airplane mode."], ["💎", "Local gems", "Spots ranked by locals, not ad budgets."]],
    stat: "2.1M trips planned" },
  { slug: "shipkit", name: "ShipKit", tag: "devtool", tagline: "Ship code five times faster",
    sub: "Commit to production in ninety seconds, with guardrails.",
    feats: [["🚀", "Preview deploys", "Every PR gets an isolated, shareable environment."], ["⏪", "Instant rollback", "One click rewinds production to any deploy."], ["🌐", "Edge network", "Your app, 40ms from every user on Earth."]],
    stat: "180k deploys per day" },
  { slug: "lumina", name: "Lumina Store", tag: "ecommerce", tagline: "Storefronts that convert",
    sub: "Beautiful shops with a checkout so fast it feels like stealing.",
    feats: [["🛒", "1-click checkout", "Wallet-native payments that never ask twice."], ["🕶", "AR try-on", "Shoppers place products in their room, in browser."], ["🔎", "Smart search", "Typo-proof, synonym-aware, instant results."]],
    stat: "+31% average conversion lift" },
];

interface Style {
  slug: string;
  name: string;
  tag: string;
  css: (p: Palette, ind: Industry) => string;
  blurb: string;
}

const NAV_HERO = (ind: Industry, p: Palette, dark: boolean) => `
<nav class="nv"><span class="lg">✦ ${ind.name}</span>
<div class="lk"><a>Product</a><a>Pricing</a><a>Docs</a></div>
<button class="cta">Get started</button></nav>
<header class="hero">
<span class="bd">● ${ind.stat}</span>
<h1>${ind.tagline}<em>.</em></h1>
<p class="sub">${ind.sub}</p>
<div class="btns"><button class="bp">Start free trial</button><button class="bs">Live demo →</button></div>
</header>
<section class="feats">${ind.feats.map((f) => `<div class="ft"><i>${f[0]}</i><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join("")}</section>
<section class="cta-b"><h2>Ready with ${ind.name}?</h2><p>${ind.sub}</p><button class="bp">Claim your workspace</button></section>
<footer>© 2026 ${ind.name} — crafted with motion</footer>`;

const STYLES: Style[] = [
  {
    slug: "aurora", name: "Aurora Glass", tag: "aurora",
    blurb: "Dark UI with drifting aurora glows, frosted glass cards and a gradient headline.",
    css: (p) => `
.pg{min-height:100vh;position:relative;overflow:hidden;background:#070712;color:#eceaf9}
.pg::before{content:'';position:absolute;inset:0;background:
 radial-gradient(700px 400px at 18% -6%,${p.v1}38,transparent 65%),
 radial-gradient(640px 420px at 88% 4%,${p.v2}30,transparent 65%),
 radial-gradient(500px 380px at 55% 46%,${p.c1}14,transparent 70%);
 animation:aur 12s ease-in-out infinite alternate}
@keyframes aur{to{transform:translateY(24px) scale(1.06)}}
.nv,.hero,.feats,.cta-b,footer{position:relative;z-index:1}
.nv{display:flex;align-items:center;justify-content:space-between;max-width:1060px;margin:18px auto 0;padding:12px 22px;
 background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:999px;backdrop-filter:blur(16px)}
.lg{font-weight:900;font-size:17px}
.lk{display:flex;gap:22px;font-size:14px;color:#b9b5d9}
.lk a{cursor:pointer}.lk a:hover{color:#fff}
.cta{padding:10px 20px;border-radius:999px;font-weight:800;font-size:13.5px;color:#fff;background:linear-gradient(135deg,${p.v1},${p.v2})}
.hero{text-align:center;padding:86px 24px 60px;max-width:820px;margin:0 auto}
.bd{display:inline-block;padding:8px 18px;border-radius:999px;font-size:12px;letter-spacing:.12em;color:${p.c1};
 border:1px solid ${p.c1}55;background:${p.c1}14;margin-bottom:26px}
.hero h1{font-size:clamp(40px,7vw,68px);font-weight:900;line-height:1.04;letter-spacing:-.03em}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,${p.v1},${p.v2});-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{margin:20px auto 34px;max-width:520px;color:#a9a4cc;font-size:17px;line-height:1.65}
.btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.bp{padding:16px 32px;border-radius:14px;font-weight:800;font-size:15px;color:#fff;
 background:linear-gradient(135deg,${p.v1},${p.v2});box-shadow:0 14px 40px ${p.v1}59;transition:transform .2s}
.bp:hover{transform:translateY(-2px)}
.bs{padding:16px 28px;border-radius:14px;font-weight:700;font-size:15px;color:#eceaf9;
 border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04)}
.feats{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:1000px;margin:0 auto;padding:20px 24px}
.ft{padding:26px 24px;border-radius:20px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);
 backdrop-filter:blur(10px);transition:transform .25s,border-color .25s}
.ft:hover{transform:translateY(-5px);border-color:${p.v1}88}
.ft i{font-style:normal;font-size:26px}
.ft h3{margin:12px 0 8px;font-size:16.5px;font-weight:800}
.ft p{color:#a9a4cc;font-size:13.5px;line-height:1.6}
.cta-b{max-width:1000px;margin:26px auto 0;padding:54px 30px;text-align:center;border-radius:26px;
 background:linear-gradient(135deg,${p.v1},${p.v2})}
.cta-b h2{font-size:30px;font-weight:900;letter-spacing:-.02em}
.cta-b p{margin:10px 0 24px;color:rgba(255,255,255,.85);font-size:15px}
.cta-b .bp{background:#0b0b18;box-shadow:0 14px 30px rgba(0,0,0,.35)}
footer{text-align:center;color:#6f6a94;font-size:13px;padding:44px 20px 34px}
@media(max-width:760px){.feats{grid-template-columns:1fr}}`,
  },
  {
    slug: "neon", name: "Neon Grid", tag: "neon",
    blurb: "Synthwave night: scanlines, glowing outlines and a perspective grid horizon.",
    css: (p) => `
.pg{min-height:100vh;position:relative;overflow:hidden;background:#06030f;color:#f2efff}
.pg::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:3;
 background:repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px)}
.pg::after{content:'';position:absolute;left:-20%;right:-20%;bottom:-46%;height:70%;pointer-events:none;
 background:linear-gradient(${p.v1}66 1px,transparent 1px),linear-gradient(90deg,${p.v1}66 1px,transparent 1px);
 background-size:52px 52px;transform:perspective(420px) rotateX(64deg);transform-origin:top;
 -webkit-mask:linear-gradient(to top,#000 30%,transparent 92%);mask:linear-gradient(to top,#000 30%,transparent 92%);
 animation:gridmv 5s linear infinite}
@keyframes gridmv{to{background-position:0 52px,0 0}}
.nv,.hero,.feats,.cta-b,footer{position:relative;z-index:2}
.nv{display:flex;align-items:center;justify-content:space-between;max-width:1060px;margin:18px auto 0;padding:12px 22px;
 border:1px solid ${p.v1}55;border-radius:8px;background:rgba(10,6,28,.7);box-shadow:0 0 24px ${p.v1}22 inset}
.lg{font-weight:900;font-size:17px;letter-spacing:.06em;text-shadow:0 0 14px ${p.v1}}
.lk{display:flex;gap:22px;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#9d99c4}
.lk a{cursor:pointer}.lk a:hover{color:${p.c1};text-shadow:0 0 12px ${p.c1}}
.cta{padding:10px 20px;border-radius:6px;font-weight:800;font-size:13px;letter-spacing:.1em;color:#06030f;
 background:${p.c1};box-shadow:0 0 22px ${p.c1}77}
.hero{text-align:center;padding:96px 24px 70px;max-width:860px;margin:0 auto}
.bd{display:inline-block;padding:8px 18px;border-radius:4px;font-size:11.5px;letter-spacing:.22em;color:${p.c1};
 border:1px solid ${p.c1};text-shadow:0 0 10px ${p.c1};box-shadow:0 0 18px ${p.c1}44 inset;margin-bottom:28px}
.hero h1{font-size:clamp(38px,7vw,66px);font-weight:900;line-height:1.08;letter-spacing:.04em;text-transform:uppercase;
 color:#fff;text-shadow:0 0 18px ${p.v1},0 0 46px ${p.v1}88}
.hero h1 em{font-style:normal;color:${p.c1};text-shadow:0 0 18px ${p.c1}}
.sub{margin:22px auto 36px;max-width:540px;color:#a9a4cc;font-size:16px;line-height:1.7}
.btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.bp{padding:15px 30px;border-radius:6px;font-weight:900;font-size:14px;letter-spacing:.12em;color:#06030f;
 background:linear-gradient(135deg,${p.v1},${p.c1});box-shadow:0 0 26px ${p.v1}77;transition:transform .2s}
.bp:hover{transform:translateY(-2px)}
.bs{padding:15px 26px;border-radius:6px;font-weight:700;font-size:14px;letter-spacing:.12em;color:${p.v2};
 border:1px solid ${p.v2};box-shadow:0 0 18px ${p.v2}33 inset}
.feats{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:1000px;margin:0 auto;padding:20px 24px}
.ft{padding:26px 24px;border-radius:10px;background:rgba(10,6,28,.72);border:1px solid ${p.v1}44;transition:all .25s}
.ft:hover{border-color:${p.c1};box-shadow:0 0 26px ${p.c1}33;transform:translateY(-4px)}
.ft i{font-style:normal;font-size:26px;filter:drop-shadow(0 0 10px ${p.v1})}
.ft h3{margin:12px 0 8px;font-size:15.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.ft p{color:#a9a4cc;font-size:13.5px;line-height:1.6}
.cta-b{max-width:1000px;margin:26px auto 0;padding:52px 30px;text-align:center;border-radius:12px;
 border:1px solid ${p.v1};background:rgba(10,6,28,.8);box-shadow:0 0 40px ${p.v1}33 inset}
.cta-b h2{font-size:28px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;text-shadow:0 0 16px ${p.v1}}
.cta-b p{margin:12px 0 26px;color:#a9a4cc;font-size:15px}
footer{text-align:center;color:#5c5788;font-size:12.5px;letter-spacing:.2em;padding:44px 20px 34px;text-transform:uppercase}
@media(max-width:760px){.feats{grid-template-columns:1fr}}`,
  },
  {
    slug: "minimal", name: "Minimal Light", tag: "minimal",
    blurb: "Editorial light theme: cream paper, serif display type and hairline rules.",
    css: (p) => `
.pg{min-height:100vh;background:#faf7f1;color:#191612;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
.nv{display:flex;align-items:center;justify-content:space-between;max-width:1040px;margin:0 auto;padding:22px 24px;
 border-bottom:1px solid #e7e0d4}
.lg{font-weight:800;font-size:17px;letter-spacing:-.01em}
.lk{display:flex;gap:26px;font-size:14px;color:#6f6a5e}
.lk a{cursor:pointer;border-bottom:1px solid transparent}.lk a:hover{color:#191612;border-color:#191612}
.cta{padding:11px 24px;border-radius:999px;font-weight:700;font-size:13.5px;color:#faf7f1;background:#191612;transition:transform .2s}
.cta:hover{transform:scale(1.04)}
.hero{text-align:center;padding:100px 24px 74px;max-width:840px;margin:0 auto}
.bd{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:999px;font-size:12px;letter-spacing:.16em;
 text-transform:uppercase;color:#6f6a5e;border:1px solid #e7e0d4;margin-bottom:30px}
.hero h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(44px,7.4vw,78px);line-height:1.06;letter-spacing:-.02em}
.hero h1 em{font-style:italic;color:${p.v1}}
.sub{margin:24px auto 40px;max-width:500px;color:#6f6a5e;font-size:17px;line-height:1.7}
.btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.bp{padding:16px 34px;border-radius:999px;font-weight:700;font-size:15px;color:#faf7f1;background:#191612;transition:all .2s}
.bp:hover{background:${p.v1};transform:translateY(-2px)}
.bs{padding:16px 30px;border-radius:999px;font-weight:600;font-size:15px;color:#191612;border:1px solid #d8d0c0}
.bs:hover{border-color:#191612}
.feats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;max-width:1000px;margin:0 auto;padding:10px 24px 30px}
.ft{padding:34px 28px;border-left:1px solid #e7e0d4}
.ft:first-child{border-left:none}
.ft i{font-style:normal;font-size:24px}
.ft h3{margin:16px 0 10px;font-family:Georgia,serif;font-weight:400;font-size:21px}
.ft p{color:#6f6a5e;font-size:14px;line-height:1.7}
.cta-b{max-width:1000px;margin:20px auto 0;padding:64px 30px;text-align:center;border-block:1px solid #e7e0d4}
.cta-b h2{font-family:Georgia,serif;font-weight:400;font-size:34px}
.cta-b p{margin:14px 0 30px;color:#6f6a5e;font-size:15px}
footer{text-align:center;color:#a39d8f;font-size:13px;padding:40px 20px 40px;letter-spacing:.04em}
@media(max-width:760px){.feats{grid-template-columns:1fr}.ft{border-left:none;border-top:1px solid #e7e0d4}}`,
  },
  {
    slug: "brutal", name: "Neo Brutal", tag: "brutalist",
    blurb: "Neo-brutalism: thick ink borders, hard offset shadows and loud flat color.",
    css: (p) => `
.pg{min-height:100vh;background:#fdf3d8;color:#141414;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
.nv{display:flex;align-items:center;justify-content:space-between;max-width:1040px;margin:22px auto 0;padding:14px 24px;
 background:#fff;border:3px solid #141414;border-radius:14px;box-shadow:6px 6px 0 #141414}
.lg{font-weight:900;font-size:18px;text-transform:uppercase}
.lk{display:flex;gap:20px;font-size:14px;font-weight:700}
.lk a{cursor:pointer}.lk a:hover{background:${p.c1};box-shadow:3px 3px 0 #141414;padding:2px 8px;margin:-2px -8px}
.cta{padding:10px 22px;border-radius:10px;font-weight:900;font-size:13.5px;color:#141414;background:${p.c1};
 border:3px solid #141414;box-shadow:4px 4px 0 #141414;transition:all .15s}
.cta:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #141414}
.hero{text-align:center;padding:86px 24px 64px;max-width:860px;margin:0 auto}
.bd{display:inline-block;padding:9px 20px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;
 background:${p.v2};color:#fff;border:3px solid #141414;box-shadow:4px 4px 0 #141414;margin-bottom:30px;transform:rotate(-2deg)}
.hero h1{font-size:clamp(42px,7.6vw,74px);font-weight:900;line-height:1;letter-spacing:-.02em;text-transform:uppercase}
.hero h1 em{font-style:normal;color:${p.v1};text-shadow:4px 4px 0 #141414}
.sub{margin:26px auto 38px;max-width:520px;font-size:17px;line-height:1.6;font-weight:600;color:#3f3b32}
.btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.bp{padding:16px 32px;border-radius:12px;font-weight:900;font-size:15px;text-transform:uppercase;color:#141414;
 background:${p.c1};border:3px solid #141414;box-shadow:5px 5px 0 #141414;transition:all .15s}
.bp:hover{transform:translate(2px,2px);box-shadow:3px 3px 0 #141414}
.bs{padding:16px 28px;border-radius:12px;font-weight:900;font-size:15px;text-transform:uppercase;color:#141414;
 background:#fff;border:3px solid #141414;box-shadow:5px 5px 0 #141414;transition:all .15s}
.bs:hover{transform:translate(2px,2px);box-shadow:3px 3px 0 #141414}
.feats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1020px;margin:0 auto;padding:24px}
.ft{padding:28px 24px;background:#fff;border:3px solid #141414;border-radius:16px;box-shadow:6px 6px 0 #141414;
 transition:all .15s;transform:rotate(-.6deg)}
.ft:nth-child(2){transform:rotate(.7deg)}
.ft:hover{transform:rotate(0) translate(-2px,-2px);box-shadow:9px 9px 0 #141414}
.ft i{font-style:normal;font-size:28px;display:inline-block;background:${p.v2}22;border:2px solid #141414;border-radius:10px;padding:8px 10px}
.ft h3{margin:16px 0 10px;font-size:17px;font-weight:900;text-transform:uppercase}
.ft p{color:#3f3b32;font-size:13.5px;line-height:1.6;font-weight:600}
.cta-b{max-width:1020px;margin:28px auto 0;padding:54px 30px;text-align:center;border-radius:20px;
 background:${p.v1};border:3px solid #141414;box-shadow:8px 8px 0 #141414}
.cta-b h2{font-size:30px;font-weight:900;text-transform:uppercase;color:#fff;text-shadow:3px 3px 0 #141414}
.cta-b p{margin:14px 0 28px;color:rgba(255,255,255,.92);font-size:15px;font-weight:700}
.cta-b .bp{background:#fff}
footer{text-align:center;color:#3f3b32;font-size:13px;font-weight:700;padding:44px 20px 36px;letter-spacing:.06em}
@media(max-width:760px){.feats{grid-template-columns:1fr}}`,
  },
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export const GEN_TEMPLATE_ITEMS: Item[] = INDUSTRIES.flatMap((ind, ii) =>
  STYLES.map((stl, si) => {
    const p = PALETTES[(ii + si * 3) % PALETTES.length];
    const slug = `${ind.slug}-${stl.slug}-landing`;
    const opts: DocOpts = {
      kind: "page",
      body: `<div class="pg">${NAV_HERO(ind, p, true)}</div>`,
      css: STYLES[si].css(p, ind),
    };
    return {
      id: `gt-${ind.slug}-${stl.slug}`,
      slug,
      category: "templates",
      title: `${ind.name} — ${stl.name} Landing`,
      summary: `A complete ${ind.name} landing page (nav, hero, features, CTA, footer) rendered in the ${stl.name} style. ${stl.blurb}`,
      author: "MotionVault",
      tags: ["landing", "template", ind.tag, stl.tag, p.slug],
      tech: ["html", "css"],
      stars: 160 + (hash(slug) % 720),
      views: 0,
      copies: 0,
      featured: si === 0 && ii % 2 === 0,
      published: true,
      html: doc(opts),
      prompt: `Build a complete, self-contained landing page for "${ind.name}" — ${ind.tagline}. Sections: sticky nav pill (logo ✦ ${ind.name}, Product/Pricing/Docs links, "Get started" button), hero with a status chip ("${ind.stat}"), the headline "${ind.tagline}.", sub-copy "${ind.sub}", dual CTAs (Start free trial / Live demo), a 3-column features grid (${ind.feats.map((f) => f[1]).join(" / ")}), a closing CTA banner and a minimal footer. Visual style: ${stl.name} — ${stl.blurb} Palette: primary ${p.v1}, secondary ${p.v2}, accent ${p.c1}. Mobile-responsive (features collapse to one column under 760px). Pure HTML + CSS, no JS or external assets.`,
      status: "curated",
      createdAt: GEN_NOW,
      updatedAt: GEN_NOW,
    } as Item;
  })
);

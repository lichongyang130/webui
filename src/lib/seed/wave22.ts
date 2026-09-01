import { Item } from "../types";
import { doc } from "./wrap";

const now = "2026-09-02T00:30:00.000Z";

/* 1 — CURSOR BLOB FOLLOWER (soft trailing orb) */
const cursorBlob = doc({
  kind: "page",
  body: `<div class="blob-cursor" id="bc"></div><h1 class="bc-h">Custom<br/>cursor</h1><p class="bc-p">move anywhere · hover text to grow</p>`,
  css: `
body{cursor:none}
a,button,h1,p{cursor:none}
.blob-cursor{position:fixed;left:0;top:0;width:24px;height:24px;border-radius:50%;pointer-events:none;z-index:99;
  background:radial-gradient(circle,#d946ef,#7c3aed);mix-blend-mode:screen;
  transition:width .25s,height .25s,background .25s;transform:translate(-50%,-50%);
  box-shadow:0 0 30px rgba(217,70,239,.7)}
.blob-cursor.big{width:64px;height:64px;background:radial-gradient(circle,rgba(34,211,238,.9),transparent 70%)}
.bc-h{position:relative;height:100vh;display:grid;place-content:center;text-align:center;font-size:clamp(48px,10vw,110px);font-weight:900;line-height:.95}
.bc-p{position:fixed;bottom:60px;width:100%;text-align:center;color:var(--dim);font-size:13px;letter-spacing:.3em;text-transform:uppercase}`,
  js: `
const bc=document.getElementById('bc');let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;});
(function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;
  bc.style.left=cx+'px';bc.style.top=cy+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('h1,p').forEach(el=>{
  el.addEventListener('pointerenter',()=>bc.classList.add('big'));
  el.addEventListener('pointerleave',()=>bc.classList.remove('big'));
});`,
});

/* 2 — TORCH CURSOR / SPOTLIGHT MASK SECTION */
const torch = doc({
  kind: "page",
  body: `<div class="torch"><h1>DARK<br/>ROOM</h1><p>move the torch to read</p></div>`,
  css: `
.torch{position:fixed;inset:0;display:grid;place-content:center;text-align:center;
  background:#05050c;color:#5a5a78;padding:24px;
  -webkit-mask:radial-gradient(140px at var(--mx,50%) var(--my,50%),#000 0%,rgba(0,0,0,.7) 40%,transparent 80%);
  mask:radial-gradient(140px at var(--mx,50%) var(--my,50%),#000 0%,rgba(0,0,0,.7) 40%,transparent 80%);
  background-image:radial-gradient(circle at 20% 20%,rgba(124,58,237,.25),transparent 40%),radial-gradient(circle at 80% 70%,rgba(34,211,238,.2),transparent 40%)}
.torch h1{font-size:clamp(60px,12vw,130px);font-weight:900;line-height:.95;color:#fff}
.torch p{margin-top:14px;letter-spacing:.3em;text-transform:uppercase;font-size:13px}`,
  js: `
addEventListener('pointermove',e=>{
  document.querySelector('.torch').style.setProperty('--mx',e.clientX+'px');
  document.querySelector('.torch').style.setProperty('--my',e.clientY+'px');
});`,
});

/* 3 — CARD EXPAND GRID (one expands, others compress) */
const flexExpand = doc({
  body: `
<div class="ex" id="ex">
  <section class="on" style="--g1:#7c3aed;--g2:#d946ef"><h3>Aurora</h3><p>Northern lights in CSS</p></section>
  <section style="--g1:#0ea5e9;--g2:#22d3ee"><h3>Tidal</h3><p>Waves of motion</p></section>
  <section style="--g1:#f59e0b;--g2:#f43f5e"><h3>Ember</h3><p>Warm gradients</p></section>
  <section style="--g1:#10b981;--g2:#a3e635"><h3>Verdant</h3><p>Growth themes</p></section>
</div>`,
  css: `
.ex{display:flex;gap:12px;width:min(680px,100%);height:300px}
.ex section{flex:1;border-radius:20px;cursor:pointer;position:relative;overflow:hidden;
  background:linear-gradient(160deg,color-mix(in srgb,var(--g1) 65%,#0b0b1c),color-mix(in srgb,var(--g2) 45%,#0b0b1c));
  border:1px solid rgba(255,255,255,.14);transition:flex .5s cubic-bezier(.22,1,.36,1);
  display:flex;flex-direction:column;justify-content:flex-end;padding:20px}
.ex section.on{flex:3.2}
.ex section:not(.on) p{opacity:0;transform:translateY(8px)}
.ex h3{font-size:22px;font-weight:900;transition:font-size .5s}
.ex section.on h3{font-size:32px}
.ex p{font-size:13px;opacity:.8;transition:opacity .3s,transform .3s;margin-top:6px}`,
  js: `
document.querySelectorAll('.ex section').forEach(s=>{
  s.addEventListener('click',()=>{
    document.querySelectorAll('.ex section').forEach(x=>x.classList.remove('on'));
    s.classList.add('on');
  });
});`,
});

/* 4 — SOCIAL SHARE FLYOUT */
const shareFlyout = doc({
  body: `
<div class="sh2"><button id="sh2b" class="sh2-main">Share <span>↗</span></button>
  <a class="sh2-opt o1" title="X">𝕏</a><a class="sh2-opt o2" title="Copy">🔗</a><a class="sh2-opt o3" title="Embed">&lt;/&gt;</a><a class="sh2-opt o4" title="Like">♥</a>
</div>`,
  css: `
.sh2{position:relative;display:grid;place-items:center}
.sh2-main{background:linear-gradient(90deg,var(--v1),var(--v2));color:#fff;border:0;font-weight:800;font-size:15px;
  padding:14px 30px;border-radius:999px;box-shadow:0 12px 36px rgba(217,70,239,.4);position:relative;z-index:2;transition:transform .2s}
.sh2-main:active{transform:scale(.95)}
.sh2-opt{position:absolute;top:7px;width:42px;height:42px;display:grid;place-items:center;border-radius:50%;
  background:rgba(20,20,40,.95);border:1px solid var(--line);color:#fff;text-decoration:none;font-size:16px;
  opacity:0;transform:translateY(0) scale(.4);transition:all .4s cubic-bezier(.34,1.56,.64,1);pointer-events:none;z-index:1}
.sh2.open .sh2-opt{opacity:1;pointer-events:auto;transform:var(--p) scale(1)}
.sh2.open .o1{--p:translate(-108px,-8px)}.sh2.open .o2{--p:translate(-76px,-52px)}
.sh2.open .o3{--p:translate(76px,-52px)}.sh2.open .o4{--p:translate(108px,-8px)}
.sh2-opt:hover{border-color:rgba(217,70,239,.6);color:#e9d5ff}`,
  js: `
document.getElementById('sh2b').onclick=()=>document.querySelector('.sh2').classList.toggle('open');`,
});

/* 5 — PROFILE DROPDOWN MENU */
const profileMenu = doc({
  body: `
<div class="pf" id="pf">
  <button class="pf-btn"><span class="pf-av">M</span><span class="pf-name">Maya<span>Pro member</span></span><i class="pf-caret">⌄</i></button>
  <div class="pf-menu">
    <a>👤 Profile</a><a>⭐ Favorites <em>24</em></a><a>🎨 Theme lab</a><a>⚙ Settings</a><a class="sep"></a><a class="out">↩ Sign out</a>
  </div>
</div>`,
  css: `
.pf{position:relative}
.pf-btn{display:flex;align-items:center;gap:11px;background:rgba(255,255,255,.05);border:1px solid var(--line);
  border-radius:14px;padding:8px 14px 8px 8px;color:#fff;transition:border-color .25s}
.pf-btn:hover{border-color:rgba(217,70,239,.5)}
.pf-av{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;font-weight:800;
  background:linear-gradient(135deg,#7c3aed,#d946ef)}
.pf-name{display:flex;flex-direction:column;align-items:flex-start;font-size:13.5px;font-weight:700}
.pf-name span{font-size:10.5px;font-weight:500;color:var(--dim)}
.pf-caret{font-style:normal;color:var(--dim);transition:transform .3s;margin-left:4px}
.pf.open .pf-caret{transform:rotate(180deg)}
.pf-menu{position:absolute;top:calc(100% + 10px);left:0;right:0;min-width:210px;border-radius:16px;padding:6px;
  background:rgba(14,14,30,.96);border:1px solid var(--line);backdrop-filter:blur(14px);
  opacity:0;transform:translateY(-8px) scale(.96);pointer-events:none;transform-origin:top;
  transition:all .25s cubic-bezier(.34,1.56,.64,1);box-shadow:0 24px 60px rgba(0,0,0,.6)}
.pf.open .pf-menu{opacity:1;transform:none;pointer-events:auto}
.pf-menu a{display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:10px;font-size:13px;
  color:var(--txt);cursor:pointer;transition:background .15s}
.pf-menu a:hover{background:rgba(217,70,239,.12)}
.pf-menu a em{margin-left:auto;font-style:normal;font-size:11px;background:rgba(217,70,239,.2);color:#e9d5ff;border-radius:99px;padding:1px 9px}
.pf-menu a.sep{height:1px;padding:0;margin:6px 8px;background:var(--line);cursor:default}
.pf-menu a.out{color:#fb7185}`,
  js: `
const pf=document.getElementById('pf');
pf.querySelector('.pf-btn').onclick=e=>{e.stopPropagation();pf.classList.toggle('open');};
addEventListener('click',()=>pf.classList.remove('open'));`,
});

/* 6 — DRAG-TO-REORDER LIST */
const dragList = doc({
  body: `
<ul class="dl2" id="dl2">
  <li draggable="true"><span class="grip">⋮⋮</span><span class="dot" style="--c:#7c3aed"></span>Aurora background <b>CSS</b></li>
  <li draggable="true"><span class="grip">⋮⋮</span><span class="dot" style="--c:#22d3ee"></span>Particle text hero <b>Canvas</b></li>
  <li draggable="true"><span class="grip">⋮⋮</span><span class="dot" style="--c:#f472b6"></span>Gooey FAB menu <b>SVG</b></li>
  <li draggable="true"><span class="grip">⋮⋮</span><span class="dot" style="--c:#f59e0b"></span>Warp starfield <b>Canvas</b></li>
  <li draggable="true"><span class="grip">⋮⋮</span><span class="dot" style="--c:#10b981"></span>Border beam card <b>CSS</b></li>
</ul>`,
  css: `
.dl2{list-style:none;width:min(380px,100%);display:flex;flex-direction:column;gap:9px}
.dl2 li{display:flex;align-items:center;gap:11px;padding:13px 16px;border-radius:14px;
  background:var(--panel);border:1px solid var(--line);font-size:13.5px;font-weight:600;
  cursor:grab;transition:border-color .2s,transform .2s,opacity .2s}
.dl2 li:hover{border-color:rgba(217,70,239,.4)}
.dl2 li.drag{opacity:.4;cursor:grabbing}
.dl2 li.over{border-color:rgba(34,211,238,.7);transform:translateY(2px)}
.grip{color:var(--dim);letter-spacing:-2px;font-size:15px}
.dot{width:9px;height:9px;border-radius:50%;background:var(--c);flex:none;box-shadow:0 0 10px var(--c)}
.dl2 b{margin-left:auto;font-size:10.5px;font-weight:700;color:var(--dim);border:1px solid var(--line);border-radius:6px;padding:2px 7px}`,
  js: `
let drag=null;
document.querySelectorAll('.dl2 li').forEach(li=>{
  li.addEventListener('dragstart',()=>{drag=li;li.classList.add('drag');});
  li.addEventListener('dragend',()=>{li.classList.remove('drag');
    document.querySelectorAll('.dl2 li').forEach(x=>x.classList.remove('over'));});
  li.addEventListener('dragover',e=>{e.preventDefault();
    if(drag&&drag!==li)li.classList.add('over');});
  li.addEventListener('dragleave',()=>li.classList.remove('over'));
  li.addEventListener('drop',e=>{e.preventDefault();
    if(drag&&drag!==li){const list=li.parentElement;
      const a=[...list.children].indexOf(drag),b=[...list.children].indexOf(li);
      list.insertBefore(drag,b>a?li.nextSibling:li);}
  });
});`,
});

export const WAVE22_ITEMS: Item[] = [
  {
    id: "w22-cursor",
    slug: "trailing-blob-custom-cursor",
    category: "animations",
    title: "Trailing blob custom cursor",
    html: cursorBlob,
    summary: "A glowing fuchsia orb trails the pointer with eased lerp and enlarges into a cyan pool over text.",
    author: "MotionVault",
    tags: ["cursor", "custom", "trail", "blob", "glow"],
    tech: ["html", "css", "javascript"],
    stars: 446, views: 0, copies: 0, featured: true, published: true,
    prompt:
      "Build a custom cursor for a full-screen dark page: hide the native cursor and render a fixed 24px radial gradient orb (fuchsia→violet, screen blend, glowing) that follows the pointer with eased interpolation (lerp factor .18 per frame) so it trails laggingly. Over headline/text elements the orb grows to 64px and becomes a soft cyan pool. requestAnimationFrame loop, pointermove updates target. Vanilla JS.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w22-torch",
    slug: "torch-mask-cursor-section",
    category: "animations",
    title: "Torch spotlight mask section",
    summary: "A dark room where a radial mask follows the cursor like a torch, revealing bright content around it.",
    author: "MotionVault",
    tags: ["cursor", "mask", "spotlight", "dark", "reveal"],
    tech: ["html", "css", "javascript"],
    stars: 428, views: 0, copies: 0, featured: true, published: true,
    html: torch,
    prompt:
      "Create a 'dark room' section: a full-viewport near-black panel with big white headline text hidden in darkness; a radial-gradient CSS mask (140px circle fading to transparent by 80%) is positioned at --mx/--my custom properties updated on pointermove, so moving the cursor acts as a torch revealing the content. Subtle violet/cyan ambient gradients inside the revealed area. Vanilla JS setting CSS variables.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w22-expand",
    slug: "flex-expanding-card-grid",
    category: "components",
    title: "Expanding flex card accordion",
    summary: "Click a panel in the horizontal row and it expands to 3.2× while others compress — description fades in.",
    author: "MotionVault",
    tags: ["accordion", "cards", "expand", "grid", "gallery", "click"],
    tech: ["html", "css", "javascript"],
    stars: 387, views: 0, copies: 0, featured: false, published: true,
    html: flexExpand,
    prompt:
      "Build an expanding card row: four gradient panels in a flex row each flex:1 with a cubic-bezier flex transition; clicking a panel sets it to flex:3.2 (others compress) via an 'on' class, enlarges its title and reveals its description paragraph which is hidden on collapsed panels. Per-panel CSS color variables, rounded 20px, labels anchored bottom. Vanilla JS click toggling.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w22-share",
    slug: "radial-share-flyout",
    category: "components",
    title: "Radial social share flyout",
    summary: "Share button springs four circular action orbits (X, link, embed, like) outward along a fan path.",
    author: "MotionVault",
    tags: ["share", "flyout", "social", "radial", "menu", "spring"],
    tech: ["html", "css", "javascript"],
    stars: 312, views: 0, copies: 0, featured: false, published: true,
    html: shareFlyout,
    prompt:
      "Build a share flyout: a gradient pill 'Share' button that on click toggles 'open' and four circular dark glass action buttons (X, link, embed, heart) spring out to fixed arc positions (left-up diagonal, left-far-up, right-far-up, right-up) using --p transforms per option, with spring cubic-bezier and opacity/scale; closed state keeps them collapsed at the button center, pointer-events disabled. Vanilla JS class toggle.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w22-profile",
    slug: "glass-profile-dropdown-menu",
    category: "components",
    title: "Glass profile dropdown menu",
    summary: "Avatar button opens a blurred-glass account menu with item rows, a count badge, separator and red sign-out.",
    author: "MotionVault",
    tags: ["dropdown", "menu", "profile", "avatar", "glass", "header"],
    tech: ["html", "css", "javascript"],
    stars: 359, views: 0, copies: 0, featured: false, published: true,
    html: profileMenu,
    prompt:
      "Create a profile dropdown: a rounded glass button showing a gradient avatar tile, name and 'Pro member' subtitle plus a rotating caret. Clicking toggles 'open' which reveals an absolutely positioned frosted-glass menu below (opacity+scale spring, top origin) with icon rows: Profile, Favorites with a count badge, Theme lab, Settings, a separator line, and a red Sign out row; rows highlight on hover; clicking anywhere outside closes it. Vanilla JS with stopPropagation + document click listener.",
    status: "curated", createdAt: now, updatedAt: now,
  },
  {
    id: "w22-drag",
    slug: "drag-reorder-list",
    category: "components",
    title: "Drag-to-reorder list rows",
    summary: "HTML5 drag-and-drop reordering for list rows with a drag grip, glowing status dot and drop-target highlight.",
    author: "MotionVault",
    tags: ["drag", "reorder", "list", "sortable", "html5-dnd"],
    tech: ["html", "css", "javascript"],
    stars: 334, views: 0, copies: 0, featured: false, published: true,
    html: dragList,
    prompt:
      "Build a drag-to-reorder list: glass rows each with a dim grip handle, a glowing colored status dot, label and a tech tag. Using native HTML5 draggable + dragstart/dragover/drop events, dragging dims the source row, the row under the cursor highlights with a cyan border and dips, and on drop the dragged node is inserted before/after the target depending on index comparison. Vanilla JS, no DnD library.",
    status: "curated", createdAt: now, updatedAt: now,
  },
];

// 以 ui.aceternity.com 官方内容为准重建 Aceternity 版块(2026-08-31 抓取自 /components 全量清单)
import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("server/data.db");

// [slug, name, description, category]
const COMPONENTS = [
["chromatic-image","Chromatic Image","An interactive image with responsive color separation, displacement, and tilt.","cards"],
["cloud-shader","Cloud Shader","Soft procedural clouds that drift across the sky. Tune speed, count, and colors with props.","backgrounds"],
["text-flipping-board","Text Flipping Board","A split-flap display component that animates characters with flip transitions, inspired by Vestaboard.","text"],
["macbook-scroll","Fey.com Macbook Scroll","Scroll through the page and see the image come out of the screen, as seen on Fey.com website.","interaction"],
["notch","Notch","A floating, configurable notch that pins to the top or bottom of the screen. Pass an array of items with links and it animates the active state as you switch between them.","interaction"],
["parallax-hero-images","Parallax Hero Images","Mouse-driven parallax effect, perfect for hero sections. Images blur fade in and move at different depths.","backgrounds"],
["squiggly-text","Squiggly Text","A squiggly text effect using SVG turbulence and displacement filters, animated with Motion.","text"],
["tooltip-card","Tooltip Card","A tooltip card container that follows mouse pointer when hovered over","cards"],
["gooey-input","Gooey Input","A search-style input that expands with a gooey SVG filter and shared layout animation","interaction"],
["magnetic-button","Magnetic Button","A button that subtly drifts toward the cursor as you hover, with a spring-based return when you leave.","interaction"],
["terminal","Terminal","A mac style terminal component with bash syntax highlighting and typewriter effect.","interaction"],
["3d-card-effect","3D Card Effect","A card perspective effect, hover over the card to elevate card elements.","cards"],
["ascii-art","ASCII Art","Convert any image to ASCII art with customizable charsets, colors, and animations.","text"],
["canvas-text","Canvas Text","Animated text component with colorful curved lines rendered on canvas, clipped to the text shape.","text"],
["3d-globe","3D Globe","A realistic globe component with tooltips and avatar tips","backgrounds"],
["dither-shader","Dither Shader","A real-time ordered dithering effect for images, perfect for pixel art and retro aesthetics.","backgrounds"],
["dotted-glow-background","Dotted Glow Background","A background effect with opacity animation, glow effect and more.","backgrounds"],
["encrypted-text","Encrypted Text","A text component that reveals the text gradually, gibberish effect.","text"],
["images-badge","Images Badge","A badge with images that can be hovered to reveal more images.","cards"],
["keyboard","Keyboard","A mac style keyboard component with mechanical keys sound effects.","interaction"],
["noise-background","Noise Background","A dynamic background effect with animated gradients, noise texture, and smooth motion.","backgrounds"],
["scales","Scales","A repeating diagonal, horizontal, or vertical line pattern background effect.","backgrounds"],
["text-hover-effect","Text Hover Effect","A text hover effect that animates and outlines gradient on hover, as seen on x.ai","text"],
["webcam-pixel-grid","Webcam Pixel Grid","A real-time webcam pixel grid effect, perfect for pixel art and retro aesthetics.","backgrounds"],
["animated-testimonials","Animated Testimonials","Minimal testimonials sections with image and quote.","interaction"],
["apple-cards-carousel","Apple Cards Carousel","A sleek and minimal carousel implementation, as seen on apple.com","interaction"],
["background-beams-with-collision","Background Beams With Collision","Exploding beams in the background","backgrounds"],
["background-lines","Background Lines","A set of svg paths that animate in a wave pattern. Good for hero sections background, as seen on height.app","backgrounds"],
["background-ripple-effect","Background Ripple Effect","A grid of cells that ripple when clicked.","backgrounds"],
["card-spotlight","Card Spotlight","A card component with a spotlight effect revealing a radial gradient background","cards"],
["carousel","Carousel","A customizable carousel with microinteractions and slider.","interaction"],
["code-block","Code Block","A configurable code block component built on top of react-syntax-highlighter.","interaction"],
["colourful-text","Colourful Text","A text component with various colours, filter and scale effects.","text"],
["comet-card","Comet Card","A perspective, 3D, Tilt card as seen on Perplexity Comet's website.","cards"],
["compare","Compare","A comparison component between two images, slide or drag to compare","cards"],
["container-cover","Cover","A Cover component that wraps any children, providing beams and space effect, hover to reveal speed.","cards"],
["container-text-flip","Container Text Flip","A container that flips through words, animating the width.","text"],
["draggable-card","Draggable Card","A tiltable, draggable card component that jumps on bounds.","cards"],
["expandable-card","Expandable Cards","Click cards to expand them and show additional information","cards"],
["feature-sections-free","Feature Sections","A set of feature sections ranging from bento grids to simple layouts","blocks"],
["file-upload","File Upload","A minimal file upload form with background grid, drag and drop, and micro interactions.","interaction"],
["floating-dock","Floating Dock","A floating dock mac os style component, acts as a navigation bar.","interaction"],
["focus-cards","Focus Cards","Hover over the card to focus on it, blurring the rest of the cards.","cards"],
["hero-sections-free","Hero Sections","A set of hero sections ranging from simple to complex layouts","blocks"],
["layout-text-flip","Layout Text Flip","A text flip effect that changes the layout of surrounding text","text"],
["lens","Lens","A lens component to zoom into images, videos, or practically anything.","cards"],
["loader","Loaders","A set of simple and minimal loaders for your loading screens and components.","interaction"],
["pixelated-canvas","Pixelated Canvas","Convert any image to a pixelated canvas mouse distortion effects, as seen on Tailwind CSS Website.","backgrounds"],
["pointer-highlight","Pointer Highlight","A component that highlights text when it's in view, with a pointer and border.","text"],
["resizable-navbar","Resizable Navbar","A navbar that changes width on scroll, responsive and animated.","interaction"],
["stateful-button","Stateful Button","A button that shows a loading state when clicked, and a success state when the action is completed.","interaction"],
["sticky-banner","Sticky Banner","A banner component that sticks to top, hides when user scrolls down","interaction"],
["world-map","World Map","A world map with animated lines and dots, programatically generated.","backgrounds"],
["google-gemini-effect","Google Gemini Effect","An effect of SVGs as seen on the Google Gemini Website","text"],
["tracing-beam","Tracing Beam","A Beam that follows the path of an SVG as the user scrolls. Adjusts beam length with scroll speed.","text"],
["3d-marquee","3D Marquee","A 3D Marquee effect with grid, good for showcasing testimonials and hero sections","interaction"],
["animated-modal","Animated Modal","A customizable, compound modal component with animated transitions","interaction"],
["animated-tooltip","Animated Tooltip","A cool tooltip that reveals on hover, follows mouse pointer","interaction"],
["aurora-background","Aurora Background","A subtle Aurora or Southern Lights background for your website.","backgrounds"],
["background-beams","Background Beams","Multiple background beams that follow a path of SVG, makes a good hero section background.","backgrounds"],
["background-gradient-animation","Background Gradient Animation","A smooth and elegant background gradient animation that changes the gradient position over time.","backgrounds"],
["bento-grid","Bento Grid","A skewed grid layout with Title, description and a header component","cards"],
["canvas-reveal-effect","Canvas Reveal Effect","A dot background that expands on hover, as seen on Clerk's website","backgrounds"],
["card-stack","Card Stack","Cards stack on top of each other after some interval. Perfect for showing testimonials.","cards"],
["cards-free","Cards","A set of cards that can be used for different use cases","blocks"],
["container-scroll-animation","Container Scroll Animation","A scroll animation that rotates in 3d on scroll. Perfect for hero or marketing sections.","interaction"],
["evervault-card","Evervault Card","A cool card with amazing hover effect, reveals encrypted text and a mixed gradient.","cards"],
["flip-words","Flip Words","A component that flips through a list of words","text"],
["github-globe","GitHub Globe","A globe animation as seen on GitHub's homepage. Interactive and customizable.","backgrounds"],
["glare-card","Glare Card","A glare effect that happens on hover, as seen on Linear's website","cards"],
["glowing-effect","Glowing Effect","A border glowing effect that adapts to any container or card, as seen on Cursor's website.","cards"],
["glowing-stars-effect","Glowing Background Stars Card","Card background stars that animate on hover and animate anyway","backgrounds"],
["grid-and-dot-backgrounds","Grid and Dot Backgrounds","A simple grid and dots background to make your sections stand out.","backgrounds"],
["hero-highlight","Hero Highlight","A background effect with a text highlight component, perfect for hero sections.","backgrounds"],
["hero-parallax","Hero Parallax","A scroll effect with rotation, translation and opacity animations.","interaction"],
["infinite-moving-cards","Infinite Moving Cards","A customizable group of cards that move infinitely in a loop. Made with Framer Motion and Tailwind CSS.","interaction"],
["lamp-effect","Lamp Section Header","A lamp effect as seen on linear, great for section headers.","backgrounds"],
["layout-grid","Layout Grid","A layout effect that animates the grid item on click, powered by framer motion layout","cards"],
["link-preview","Link Preview","Dynamic link previews for your anchor tags","interaction"],
["meteors","Meteor Effect","A group of beams in the background of a container, sort of like meteors.","backgrounds"],
["moving-border","Moving Border","A border that moves around the container. Perfect for making your buttons stand out.","interaction"],
["parallax-scroll","Parallax Grid Scroll","A grid where two columns scroll in oposite directions, giving a parallax effect.","interaction"],
["placeholders-and-vanish-input","Placeholders And Vanish Input","Sliding in placeholders and vanish effect of input on submit","interaction"],
["shooting-stars-and-stars-background","Shooting Stars and Stars Background","A shooting star animation on top of a starry background, as seen on figmaplug.in","backgrounds"],
["sidebar","Sidebar","Expandable sidebar that expands on hover, mobile responsive and dark mode support","interaction"],
["signup-form","Signup Form","A customizable form built on top of shadcn's input and label, with a touch of framer motion","interaction"],
["sparkles","Sparkles","A configurable sparkles component that can be used as a background or as a standalone component.","backgrounds"],
["spotlight-new","Spotlight New","A new spotlight component with left and right spotlight, configurable and customizable.","backgrounds"],
["spotlight","Spotlight","A spotlight effect with Tailwind CSS, good for drawing attention to a particular element on the page.","backgrounds"],
["sticky-scroll-reveal","Sticky Scroll Reveal","A sticky container that sticks while scrolling, text reveals on scroll","interaction"],
["svg-mask-effect","SVG Mask Effect","A mask reveal effect, hover the cursor over a container to reveal what's underneath.","interaction"],
["tabs","Animated Tabs","Tabs to switch content, click on a tab to check background animation.","interaction"],
["text-generate-effect","Text Generate Effect","A cool text effect that fades in text on page load, one by one.","text"],
["text-reveal-card","Text Reveal Card","Mousemove effect to reveal text content at the bottom of the card.","cards"],
["typewriter-effect","Typewriter Effect","Text generates as if it is being typed on the screen.","text"],
["vortex","Vortex Background","A wavy, swirly, vortex background ideal for CTAs and backgrounds.","backgrounds"],
["wavy-background","Wavy Background","A cool background effect with waves that move.","backgrounds"],
["wobble-card","Wobble Card","A card effect that translates and scales on mousemove, perfect for feature cards.","cards"],
["hover-border-gradient","Hover Border Gradient","A hover effect that expands to the entire container with a gradient border.","cards"],
["multi-step-loader","Multi Step Loader","A step loader for screens that take a lot of time to load.","interaction"],
["3d-pin","3D Animated Pin","A gradient pin that animates on hover, perfect for product links.","cards"],
["background-boxes","Background Boxes","A full width background box container that highlights on hover","backgrounds"],
["background-gradient","Background Gradient","An animated gradient that sits at the background of a card, button or anything.","backgrounds"],
["card-hover-effect","Hover Effect","Hover over the cards and the effect slides to the currently hovered card.","cards"],
["direction-aware-hover","Direction Aware Hover","A direction aware hover effect using Framer Motion, Tailwindcss and good old javascript.","cards"],
["floating-navbar","Floating Navbar","A sticky Navbar that hides on scroll, reveals when scrolled up.","interaction"],
["following-pointer","Following Pointer","A custom pointer that follows mouse arrow and animates in pointer and content.","interaction"],
["images-slider","Images Slider","A full page slider with images that can be navigated with the keyboard.","interaction"],
["navbar-menu","Navbar Menu","A navbar menu that animates its children on hover, makes a beautiful bignav","interaction"],
["tailwindcss-buttons","Tailwind CSS buttons","A curated list of awesome, battle tested Tailwind CSS buttons components","interaction"],
["timeline","Timeline","A timeline component with sticky header and scroll beam follow.","interaction"],
];
// [slug, name, description] — Shadcn Compatible Blocks(all-access 付费合集)
const BLOCKS = [
["hero-sections","Hero Sections (Blocks)","23+ blocks · A collection of hero sections that are modern and stand out"],
["shaders","Shaders","3+ blocks · A collection of reusable shaders for your backgrounds"],
["logo-clouds","Logo Clouds","6+ blocks · A collection of logo clouds with micro interactions and minimal animations"],
["feature-sections","Feature Sections (Blocks)","22+ blocks · A set of feature sections ranging from bento grids to simple layouts"],
["backgrounds","Backgrounds","11+ blocks · A set of beautiful, creative backgrounds for landing pages"],
["bento-grids","Bento Grids","6+ blocks · A set of bento grids for various use cases"],
["blog-content-sections","Blog Content Sections","2+ blocks · Content sections for your single blog posts"],
["blog-sections","Blog Sections","4+ blocks · Blog sections with search and filters"],
["cards","Cards (Blocks)","4+ blocks · A set of cards that can be used for different use cases"],
["contact-sections","Contact Sections","4+ blocks · Contact sections with forms and micro interactions"],
["cta-sections","CTA Sections","6+ blocks · CTA sections with modern and minimalist styles"],
["empty-states","Empty States","5+ blocks · Empty states for your projects and dashboards"],
["faqs","Frequently Asked Questions","4+ blocks · Elegant and minimal FAQs with grid, accordions and micro-interactions"],
["footers","Footers","4+ blocks · Clean footers with a variety of styles and layouts"],
["illustrations","Illustrations","22+ blocks · A set of motion illustrations for blocks, sections and pages"],
["login-and-signup-sections","Login and Signup Sections","6+ blocks · Login, registration and authentication form sections"],
["navbars","Navbars","7+ blocks · Simple and elegant headers for your website"],
["pricing-sections","Pricing Sections","6+ blocks · Minimal and elegant pricing sections"],
["sidebars","Sidebars","3+ blocks · Elegant sidebars with hover effects and open, close states"],
["stats-sections","Stats Sections","4+ blocks · Perfect for displaying numbers, stats and changelogs"],
["team-sections","Team Sections","4+ blocks · Pages and blocks to showcase your team and culture"],
["testimonials","Testimonials","7+ blocks · Testimonials sections for social proof and trust"],
["text-animations","Text Animations","4+ blocks · Text animations components for headings and paragraphs"],
];
// [slug, name] — 官方模板
const TEMPLATES = [
["agenforce-marketing-template","Agenforce Marketing Template"],
["nodus-agent-template","Nodus Marketing Template"],
["startup-landing-page-template","Startup Landing Page Template"],
["ai-saas-template","AI SaaS Template"],
["proactiv-marketing-template","Proactiv Marketing Template"],
["agenlabs-agency-template","Agenlabs Agency Template"],
["devpro-portfolio-template","DevPro Portfolio Template"],
["foxtrot-marketing-template","Foxtrot Marketing Template"],
["playful-marketing-aceternity","Playful Marketing Template"],
["cryptgen-marketing-aceternity","Cryptgen Marketing Template"],
["schedule-marketing-template","Schedule Marketing Template"],
["minimal-portfolio-template","Minimal Portfolio Template"],
];

const sec = db.prepare("SELECT id FROM sections WHERE slug='aceternity'").get();
const cats = Object.fromEntries(db.prepare("SELECT slug,id FROM categories WHERE section_id=?").all(sec.id).map(r => [r.slug, r.id]));
// 粗分类 → 中文细分分类兜底(分类体系已按官方 /categories 重构,见 scripts/recat-aceternity.mjs)
const CAT_FALLBACK = { backgrounds: "background", cards: "card", text: "text", interaction: "hover", blocks: "blocks", templates: "templates" };
const catOf = (c) => cats[c] ?? cats[CAT_FALLBACK[c]] ?? cats.background;

const official = [
  ...COMPONENTS.map(([slug, name, desc, cat]) => ({ slug, name, desc, cat, url: `https://ui.aceternity.com/components/${slug}` })),
  ...BLOCKS.map(([slug, name, desc]) => ({ slug, name, desc, cat: "blocks", url: `https://ui.aceternity.com/blocks/${slug}` })),
  ...TEMPLATES.map(([slug, name]) => ({ slug, name, desc: "官方整站模板,基于 Aceternity 组件与 Blocks 搭建", cat: "templates", url: `https://ui.aceternity.com/templates/${slug}` })),
];

// 现有条目按 URL 尾段 slug 建索引
const existing = db.prepare("SELECT id, url FROM items WHERE section_id=?").all(sec.id);
const byKey = new Map();
for (const r of existing) {
  const kind = (r.url || "").includes("/blocks/") ? "blocks" : (r.url || "").includes("/templates/") ? "templates" : "components";
  const slug = (r.url || "").match(/(?:components|blocks|templates)\/([\w-]+)/)?.[1];
  if (slug) byKey.set(kind + "/" + slug, r.id);
}

const now = new Date().toISOString().slice(0, 19).replace("T", " ");
let upd = 0, ins = 0;
const keep = new Set();
const up = db.prepare("UPDATE items SET name=?, description=?, url=?, category_id=?, status='published', updated_at=? WHERE id=?");
const inm = db.prepare("INSERT INTO items (section_id, category_id, name, url, description, tags, status, starred, popularity, created_at, updated_at) VALUES (?,?,?,?,?,?, 'published', 0, ?, ?, ?)");
official.forEach((o, i) => {
  const kind = o.url.includes("/blocks/") ? "blocks" : o.url.includes("/templates/") ? "templates" : "components";
  const key = kind + "/" + o.slug;
  const tags = JSON.stringify([o.cat, kind === "components" ? "aceternity" : kind]);
  const pop = Math.max(5, 100 - i);
  const id = byKey.get(key);
  if (id) { up.run(o.name, o.desc, o.url, catOf(o.cat), now, id); keep.add(id); upd++; }
  else { const r = inm.run(sec.id, catOf(o.cat), o.name, o.url, o.desc, tags, pop, now, now); keep.add(Number(r.lastInsertRowid)); ins++; }
});

// 删除官方清单之外的旧条目(用户要求:清掉不对的内容)
let del = 0;
for (const r of existing) if (!keep.has(r.id)) { db.prepare("DELETE FROM items WHERE id=?").run(r.id); del++; }

const total = db.prepare("SELECT COUNT(*) c FROM items WHERE section_id=? AND status='published'").get(sec.id).c;
console.log(JSON.stringify({ updated: upd, inserted: ins, deleted: del, aceternity_total: total }));

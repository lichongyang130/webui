import * as B from "./backgrounds";
import * as T from "./text";
import * as C from "./cards";
import * as U from "./ui";
import * as X from "./extra";

export type DemoMeta = { name: string; group: "backgrounds" | "text" | "cards" | "ui"; comp: () => JSX.Element };

const reg: Record<string, DemoMeta> = {
  "background-beams": { name: "Background Beams", group: "backgrounds", comp: B.BackgroundBeams },
  "background-beams-with-collision": { name: "Beams Collision", group: "backgrounds", comp: B.BeamsCollision },
  "aurora-background": { name: "Aurora Background", group: "backgrounds", comp: B.AuroraBackground },
  "grid-and-dot-backgrounds": { name: "Grid & Dot", group: "backgrounds", comp: B.GridDot },
  "noise-background": { name: "Noise Background", group: "backgrounds", comp: B.NoiseBackground },
  "dotted-glow-background": { name: "Dotted Glow", group: "backgrounds", comp: B.DottedGlow },
  "background-gradient-animation": { name: "Gradient Animation", group: "backgrounds", comp: B.GradientAnimation },
  "background-gradient": { name: "Gradient Background", group: "backgrounds", comp: B.GradientBackground },
  "background-lines": { name: "Background Lines", group: "backgrounds", comp: B.BackgroundLines },
  "background-ripple-effect": { name: "Ripple Effect", group: "backgrounds", comp: B.RippleEffect },
  "background-boxes": { name: "Background Boxes", group: "backgrounds", comp: B.BackgroundBoxes },
  "glowing-stars-effect": { name: "Glowing Stars", group: "backgrounds", comp: B.GlowingStars },
  "shooting-stars-and-stars-background": { name: "Shooting Stars", group: "backgrounds", comp: B.ShootingStars },
  meteors: { name: "Meteors", group: "backgrounds", comp: B.Meteors },
  vortex: { name: "Vortex", group: "backgrounds", comp: B.Vortex },
  "wavy-background": { name: "Wavy Background", group: "backgrounds", comp: B.WavyBackground },
  spotlight: { name: "Spotlight", group: "backgrounds", comp: B.Spotlight },
  sparkles: { name: "Sparkles", group: "backgrounds", comp: B.Sparkles },
  "lamp-effect": { name: "Lamp Effect", group: "backgrounds", comp: B.LampEffect },
  "pixelated-canvas": { name: "Pixelated Canvas", group: "backgrounds", comp: B.PixelatedCanvas },

  "flip-words": { name: "Flip Words", group: "text", comp: T.FlipWords },
  "container-text-flip": { name: "Container Text Flip", group: "text", comp: T.ContainerTextFlip },
  "text-generate-effect": { name: "Text Generate", group: "text", comp: T.TextGenerate },
  "typewriter-effect": { name: "Typewriter", group: "text", comp: T.Typewriter },
  "encrypted-text": { name: "Encrypted Text", group: "text", comp: T.EncryptedText },
  "colourful-text": { name: "Colourful Text", group: "text", comp: T.ColourfulText },
  "squiggly-text": { name: "Squiggly Text", group: "text", comp: T.SquigglyText },
  "text-hover-effect": { name: "Text Hover Effect", group: "text", comp: T.TextHoverEffect },
  "tracing-beam": { name: "Tracing Beam", group: "text", comp: T.TracingBeam },
  "google-gemini-effect": { name: "Gemini Effect", group: "text", comp: T.GeminiEffect },
  "text-flipping-board": { name: "Flipping Board", group: "text", comp: T.FlippingBoard },
  "hero-highlight": { name: "Hero Highlight", group: "text", comp: T.HeroHighlight },
  "canvas-reveal-effect": { name: "Canvas Reveal", group: "text", comp: T.CanvasReveal },
  "multi-step-loader": { name: "Multi Step Loader", group: "text", comp: T.MultiStepLoader },

  "3d-card-effect": { name: "3D Card", group: "cards", comp: C.ThreeDCard },
  "card-spotlight": { name: "Card Spotlight", group: "cards", comp: C.CardSpotlight },
  "glare-card": { name: "Glare Card", group: "cards", comp: C.GlareCard },
  "wobble-card": { name: "Wobble Card", group: "cards", comp: C.WobbleCard },
  "card-stack": { name: "Card Stack", group: "cards", comp: C.CardStack },
  "evervault-card": { name: "Evervault Card", group: "cards", comp: C.EvervaultCard },
  "comet-card": { name: "Comet Card", group: "cards", comp: C.CometCard },
  "draggable-card": { name: "Draggable Card", group: "cards", comp: C.DraggableCard },
  "expandable-card": { name: "Expandable Card", group: "cards", comp: C.ExpandableCard },
  "focus-cards": { name: "Focus Cards", group: "cards", comp: C.FocusCards },
  "direction-aware-hover": { name: "Direction Aware Hover", group: "cards", comp: C.DirectionAwareHover },
  compare: { name: "Compare Slider", group: "cards", comp: C.CompareDemo },
  "hover-border-gradient": { name: "Hover Border Gradient", group: "cards", comp: C.HoverBorderGradient },
  "moving-border": { name: "Moving Border", group: "cards", comp: C.MovingBorder },
  "infinite-moving-cards": { name: "Infinite Moving Cards", group: "cards", comp: C.InfiniteMovingCards },
  "3d-marquee": { name: "3D Marquee", group: "cards", comp: C.ThreeDMarquee },
  "bento-grid": { name: "Bento Grid", group: "cards", comp: C.BentoGrid },
  "layout-grid": { name: "Layout Grid", group: "cards", comp: C.LayoutGrid },

  "animated-tabs": { name: "Animated Tabs", group: "ui", comp: U.AnimatedTabs },
  carousel: { name: "Carousel", group: "ui", comp: U.Carousel },
  "apple-cards-carousel": { name: "Apple Cards Carousel", group: "ui", comp: U.AppleCardsCarousel },
  "images-slider": { name: "Images Slider", group: "ui", comp: U.ImagesSlider },
  "animated-tooltip": { name: "Animated Tooltip", group: "ui", comp: U.AnimatedTooltip },
  "link-preview": { name: "Link Preview", group: "ui", comp: U.LinkPreview },
  "following-pointer": { name: "Following Pointer", group: "ui", comp: U.FollowingPointer },
  "magnetic-button": { name: "Magnetic Button", group: "ui", comp: U.MagneticButton },
  "stateful-button": { name: "Stateful Button", group: "ui", comp: U.StatefulButton },
  "gooey-input": { name: "Gooey Input", group: "ui", comp: U.GooeyInput },
  terminal: { name: "Terminal", group: "ui", comp: U.TerminalDemo },
  keyboard: { name: "Keyboard", group: "ui", comp: U.KeyboardDemo },
  "floating-dock": { name: "Floating Dock", group: "ui", comp: U.FloatingDock },
  "floating-navbar": { name: "Floating Navbar", group: "ui", comp: U.FloatingNavbar },
  "animated-modal": { name: "Animated Modal", group: "ui", comp: U.AnimatedModal },
  "placeholders-and-vanish-input": { name: "Vanish Input", group: "ui", comp: U.VanishInput },
  "signup-form": { name: "Signup Form", group: "ui", comp: U.SignupForm },
  "file-upload": { name: "File Upload", group: "ui", comp: U.FileUpload },
  loaders: { name: "Loaders", group: "ui", comp: U.Loaders },
  "code-block": { name: "Code Block", group: "ui", comp: U.CodeBlock },
  timeline: { name: "Timeline", group: "ui", comp: U.Timeline },
  "sticky-scroll-reveal": { name: "Sticky Scroll Reveal", group: "ui", comp: U.StickyScrollReveal },
  "parallax-scroll": { name: "Parallax Scroll", group: "ui", comp: U.ParallaxScroll },
  "tailwindcss-buttons": { name: "Tailwind Buttons", group: "ui", comp: U.TailwindButtons },

  lens: { name: "Lens", group: "ui", comp: X.Lens },
  "3d-pin": { name: "3D Pin", group: "ui", comp: X.ThreeDPin },
  "world-map": { name: "World Map", group: "backgrounds", comp: X.WorldMap },
  "github-globe": { name: "GitHub Globe", group: "backgrounds", comp: X.GithubGlobe },
  "3d-globe": { name: "3D Globe", group: "backgrounds", comp: X.GithubGlobe },
  "ascii-art": { name: "ASCII Art", group: "text", comp: X.AsciiArt },
  "chromatic-image": { name: "Chromatic Image", group: "text", comp: X.ChromaticImage },
  "svg-mask-effect": { name: "SVG Mask Effect", group: "text", comp: X.SvgMaskEffect },
  scales: { name: "Scales", group: "backgrounds", comp: X.Scales },
  "dither-shader": { name: "Dither Shader", group: "backgrounds", comp: X.DitherShader },
  notch: { name: "Notch", group: "ui", comp: X.Notch },
  "images-badge": { name: "Images Badge", group: "ui", comp: X.ImagesBadge },
  "resizable-navbar": { name: "Resizable Navbar", group: "ui", comp: X.ResizableNavbar },
  sidebar: { name: "Sidebar", group: "ui", comp: X.SidebarDemo },
};

/** 别名:不同 slug 指向同一实现 */
const alias: Record<string, string> = {
  "spotlight-new": "spotlight",
  "layout-text-flip": "container-text-flip",
  "tooltip-card": "animated-tooltip",
  "card-hover-effect": "wobble-card",
  "text-reveal-card": "canvas-reveal-effect",
  "text-reveal": "hero-highlight",
  "hero-parallax": "parallax-scroll",
  "macbook-scroll": "sticky-scroll-reveal",
  "container-scroll-animation": "sticky-scroll-reveal",
  "navbar-menu": "floating-navbar",
  "sticky-banner": "floating-navbar",
  "canvas-text": "sparkles",
  "webcam-pixel-grid": "pixelated-canvas",
};

export function getDemo(slug?: string | null): DemoMeta | null {
  if (!slug) return null;
  const key = alias[slug] || slug;
  return reg[key] || null;
}

/** 按资源名匹配(“Background Beams” → background-beams) */
export function demoByName(name?: string | null): DemoMeta | null {
  if (!name) return null;
  return getDemo(name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"));
}

export const allDemos = Object.entries(reg).map(([slug, m]) => ({ slug, ...m }));
export const groupLabel: Record<string, string> = { backgrounds: "背景", text: "文字", cards: "卡片", ui: "交互/UI" };

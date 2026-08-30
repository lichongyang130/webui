// v2 种子:Aceternity 全量目录(~100)+ 新分类 + 元数据 + 跨版块映射 + 学习内容
// 条目格式: [分类, slug, 名称, 中文别名, 描述, tags, 覆盖项]
// 覆盖项: p=principle perf deps d=difficulty pop insp m=mobile a=access

const A = "https://ui.aceternity.com/components/";

const ITEMS = [
  // ---- 背景特效 ----
  ["backgrounds", "background-beams", "Background Beams", "背景光束", "SVG 路径光束,适合 Hero 背景", ["background", "beams", "hero"], { p: "svg-path", d: 2, pop: 100 }],
  ["backgrounds", "background-beams-with-collision", "Background Beams With Collision", "碰撞光束", "背景中爆炸的光束", ["background", "beams"], { p: "svg-path", perf: "med", d: 3, pop: 70 }],
  ["backgrounds", "aurora-background", "Aurora Background", "极光背景", "微妙极光/南极光背景", ["background", "aurora"], { pop: 95, d: 1 }],
  ["backgrounds", "grid-and-dot-backgrounds", "Grid & Dot Backgrounds", "网格点阵", "简单网格与点阵背景", ["background", "grid"], { pop: 80, d: 1 }],
  ["backgrounds", "noise-background", "Noise Background", "噪点渐变", "动画渐变+噪点纹理", ["background", "noise"], { pop: 60 }],
  ["backgrounds", "dotted-glow-background", "Dotted Glow Background", "点阵发光", "透明度动画+发光", ["background", "glow"], { pop: 55 }],
  ["backgrounds", "background-gradient-animation", "Background Gradient Animation", "渐变动画", "渐变位置随时间平滑变化", ["background", "gradient"], { pop: 75, d: 1 }],
  ["backgrounds", "background-lines", "Background Lines", "波浪线", "SVG 路径波浪动画,适合 Hero", ["background", "lines"], { p: "svg-path", pop: 65, insp: "height.app" }],
  ["backgrounds", "background-ripple-effect", "Background Ripple Effect", "点击涟漪", "点击时网格单元涟漪", ["background", "ripple"], { pop: 50 }],
  ["backgrounds", "glowing-stars-effect", "Glowing Stars", "星星闪烁", "hover 时动画的背景星星", ["background", "stars"], { p: "canvas", pop: 60 }],
  ["backgrounds", "scales", "Scales", "斜线纹理", "重复斜线/横线/竖线图案", ["background", "pattern"], { pop: 40, d: 1 }],
  ["backgrounds", "shooting-stars-and-stars-background", "Shooting Stars", "流星星空", "星空上的流星动画", ["background", "stars"], { p: "canvas", pop: 70, insp: "figmaplug.in" }],
  ["backgrounds", "meteors", "Meteor Effect", "流星雨", "容器背景中的斜向光束群", ["background", "meteors"], { pop: 90, d: 1 }],
  ["backgrounds", "vortex", "Vortex Background", "涡旋", "波浪旋涡背景,适合 CTA", ["background", "vortex"], { p: "webgl", perf: "high", deps: ["canvas"], d: 4, pop: 85 }],
  ["backgrounds", "wavy-background", "Wavy Background", "波浪背景", "移动波浪的酷炫背景", ["background", "waves"], { p: "webgl", perf: "med", d: 3, pop: 60 }],
  ["backgrounds", "background-boxes", "Background Boxes", "悬浮高亮盒", "全宽背景盒,hover 高亮", ["background", "boxes"], { pop: 55 }],
  ["backgrounds", "background-gradient", "Background Gradient", "卡片渐变", "卡片/按钮背后的动画渐变", ["background", "gradient"], { pop: 65, d: 1 }],
  ["backgrounds", "sparkles", "Sparkles", "粒子闪光", "可配置闪光粒子背景", ["background", "particles"], { p: "canvas", perf: "med", d: 3, pop: 88 }],
  ["backgrounds", "spotlight", "Spotlight", "聚光灯", "吸引注意力的聚光灯效果", ["background", "spotlight"], { pop: 85 }],
  ["backgrounds", "spotlight-new", "Spotlight New", "新聚光灯", "可配置左右聚光灯", ["background", "spotlight"], { pop: 75 }],
  ["backgrounds", "hero-highlight", "Hero Highlight", "文字高亮", "鼠标跟随的文字高亮背景", ["background", "highlight"], { p: "motion", pop: 70 }],
  ["backgrounds", "canvas-reveal-effect", "Canvas Reveal Effect", "点阵揭示", "hover 时点阵扩展揭示", ["background", "reveal"], { p: "canvas", perf: "med", d: 3, pop: 66, insp: "clerk.com" }],
  ["backgrounds", "pixelated-canvas", "Pixelated Canvas", "像素画布", "鼠标扰动的像素化图像", ["background", "pixel"], { p: "canvas", perf: "high", d: 4, pop: 58, insp: "tailwindcss.com" }],
  ["backgrounds", "dither-shader", "Dither Shader", "抖动着色器", "实时有序抖动,像素复古风", ["background", "retro"], { p: "webgl", perf: "high", d: 4, pop: 45 }],
  ["backgrounds", "cloud-shader", "Cloud Shader", "云着色器", "程序化云层漂移,可调速度/数量/颜色", ["background", "cloud"], { p: "webgl", perf: "high", d: 4, pop: 52 }],
  ["backgrounds", "3d-globe", "3D Globe", "3D 地球", "带 tooltip 与头像提示的真实地球", ["globe", "3d"], { p: "webgl", perf: "high", deps: ["three", "@react-three/fiber"], d: 5, pop: 72 }],
  ["backgrounds", "github-globe", "GitHub Globe", "GitHub 地球", "GitHub 首页同款地球动画", ["globe", "3d"], { p: "webgl", perf: "high", deps: ["three", "@react-three/fiber"], d: 5, pop: 80, insp: "github.com" }],
  ["backgrounds", "world-map", "World Map", "世界地图", "程序生成的地图动画连线点", ["map", "lines"], { p: "svg-path", perf: "med", d: 3, pop: 68 }],
  // ---- 卡片 ----
  ["cards", "3d-card-effect", "3D Card Effect", "3D 卡片", "hover 抬升卡片元素的透视效果", ["card", "3d"], { p: "motion", pop: 85, d: 1 }],
  ["cards", "card-spotlight", "Card Spotlight", "聚光灯卡片", "径向渐变聚光灯揭示卡片", ["card", "spotlight"], { pop: 90, d: 1 }],
  ["cards", "card-stack", "Card Stack", "堆叠卡片", "定时堆叠,适合证言", ["card", "stack"], { p: "motion", pop: 70 }],
  ["cards", "evervault-card", "Evervault Card", "加密渐变卡", "hover 揭示加密文字+混合渐变", ["card", "gradient"], { pop: 82 }],
  ["cards", "glare-card", "Glare Card", "眩光卡", "hover 眩光效果", ["card", "glare"], { pop: 75, insp: "linear.app", d: 1 }],
  ["cards", "comet-card", "Comet Card", "彗星卡", "透视 3D 倾斜卡", ["card", "tilt"], { p: "motion", d: 3, pop: 60, insp: "perplexity.ai" }],
  ["cards", "draggable-card", "Draggable Card", "可拖拽卡", "可倾斜拖拽,越界回弹", ["card", "drag"], { p: "motion", d: 3, pop: 55 }],
  ["cards", "expandable-card", "Expandable Cards", "展开卡片", "点击展开显示更多信息", ["card", "expand"], { p: "motion", pop: 60 }],
  ["cards", "focus-cards", "Focus Cards", "聚焦卡片", "hover 聚焦、其余模糊", ["card", "blur"], { p: "motion", pop: 65 }],
  ["cards", "tooltip-card", "Tooltip Card", "跟随提示卡", "跟随鼠标指针的提示容器", ["card", "tooltip"], { p: "motion", pop: 62 }],
  ["cards", "images-badge", "Images Badge", "图像徽章", "hover 揭示更多图像的徽章", ["badge", "images"], { p: "motion", d: 1, pop: 50 }],
  ["cards", "wobble-card", "Wobble Card", "摇晃卡", "mousemove 平移缩放的特性卡", ["card", "wobble"], { pop: 58, d: 1 }],
  ["cards", "text-reveal-card", "Text Reveal Card", "文字揭示卡", "mousemove 揭示卡底文字", ["card", "reveal"], { p: "canvas", pop: 60 }],
  ["cards", "direction-aware-hover", "Direction Aware Hover", "方向感知 hover", "按进入方向播放的 hover 效果", ["card", "hover"], { p: "motion", d: 3, pop: 66 }],
  ["cards", "card-hover-effect", "Hover Effect", "滑动高亮", "高亮滑动到当前 hover 卡片", ["card", "hover"], { pop: 78 }],
  ["cards", "3d-pin", "3D Animated Pin", "3D 图钉", "hover 动画的渐变图钉", ["pin", "3d"], { p: "motion", pop: 63 }],
  ["cards", "compare", "Compare", "图像对比", "滑动/拖拽对比两张图", ["compare", "slider"], { pop: 61 }],
  ["cards", "lens", "Lens", "镜片", "放大图像/视频的镜片组件", ["lens", "zoom"], { p: "motion", pop: 59 }],
  // ---- 文字特效 ----
  ["text", "flip-words", "Flip Words", "翻词", "词列表翻转切换", ["text", "flip"], { p: "motion", pop: 92, d: 1 }],
  ["text", "container-text-flip", "Container Text Flip", "容器翻词", "宽度动画的翻词容器", ["text", "flip"], { p: "motion", pop: 60 }],
  ["text", "layout-text-flip", "Layout Text Flip", "布局翻词", "改变周围布局的翻词", ["text", "flip"], { p: "motion", d: 3, pop: 55 }],
  ["text", "encrypted-text", "Encrypted Text", "解密文字", "乱码逐步揭示文字", ["text", "scramble"], { p: "js", pop: 76, d: 1 }],
  ["text", "colourful-text", "Colourful Text", "彩色文字", "多颜色+滤镜+缩放效果", ["text", "color"], { pop: 52, d: 1 }],
  ["text", "squiggly-text", "Squiggly Text", "波浪文字", "SVG turbulence 位移的波浪字", ["text", "svg"], { p: "svg-filter", pop: 48 }],
  ["text", "text-hover-effect", "Text Hover Effect", "描边 hover", "hover 时渐变描边动画", ["text", "hover"], { pop: 74, insp: "x.ai", d: 1 }],
  ["text", "canvas-text", "Canvas Text", "画布文字", "彩色曲线裁剪到文字形状", ["text", "canvas"], { p: "canvas", perf: "med", d: 3, pop: 50 }],
  ["text", "tracing-beam", "Tracing Beam", "追踪光束", "滚动跟随 SVG 路径的光束", ["text", "beam"], { p: "svg-path", perf: "med", d: 3, pop: 80 }],
  ["text", "google-gemini-effect", "Google Gemini Effect", "Gemini 特效", "Gemini 官网同款 SVG 效果", ["text", "svg"], { p: "svg-path", perf: "med", d: 3, pop: 70, insp: "gemini.google.com" }],
  ["text", "text-generate-effect", "Text Generate Effect", "逐字浮现", "加载时逐字淡入", ["text", "fade"], { p: "motion", pop: 88, d: 1 }],
  ["text", "typewriter-effect", "Typewriter Effect", "打字机", "像打字一样生成文字", ["text", "typewriter"], { p: "motion", pop: 84, d: 1 }],
  ["text", "text-flipping-board", "Text Flipping Board", "翻页牌", "Vestaboard 风格分翻牌字符动画", ["text", "flip"], { p: "motion", d: 3, pop: 57, insp: "vestaboard" }],
  // ---- 交互与导航 ----
  ["interaction", "floating-dock", "Floating Dock", "悬浮 Dock", "macOS 风格悬浮导航", ["nav", "dock"], { p: "motion", pop: 86 }],
  ["interaction", "resizable-navbar", "Resizable Navbar", "收缩导航", "滚动变宽的动画导航", ["nav", "scroll"], { p: "motion", pop: 72 }],
  ["interaction", "notch", "Notch", "灵动岛", "悬浮可配置灵动岛导航", ["nav", "notch"], { p: "motion", d: 3, pop: 55 }],
  ["interaction", "magnetic-button", "Magnetic Button", "磁性按钮", "hover 时向光标漂移,弹簧回位", ["button", "magnetic"], { p: "motion", d: 1, pop: 68 }],
  ["interaction", "stateful-button", "Stateful Button", "状态按钮", "loading → success 状态按钮", ["button", "state"], { p: "motion", d: 1, pop: 60 }],
  ["interaction", "gooey-input", "Gooey Input", "粘性输入", "SVG 粘性滤镜展开的搜索框", ["input", "gooey"], { p: "svg-filter", pop: 56 }],
  ["interaction", "keyboard", "Keyboard", "机械键盘", "mac 风格键盘+按键音效", ["keyboard", "sound"], { p: "js", pop: 54 }],
  ["interaction", "terminal", "Terminal", "终端", "mac 终端+bash 高亮+打字机", ["terminal", "typewriter"], { p: "js", pop: 66, d: 1 }],
  ["interaction", "animated-tooltip", "Animated Tooltip", "动画提示", "hover 揭示并跟随指针", ["tooltip"], { p: "motion", d: 1, pop: 70 }],
  ["interaction", "animated-modal", "Animated Modal", "动画弹窗", "复合可定制动画模态", ["modal"], { p: "motion", pop: 74 }],
  ["interaction", "sticky-banner", "Sticky Banner", "粘性横幅", "吸顶、下滚隐藏", ["banner", "sticky"], { p: "motion", d: 1, pop: 50 }],
  ["interaction", "carousel", "Carousel", "轮播", "带微交互的可定制轮播", ["carousel"], { p: "motion", pop: 64 }],
  ["interaction", "apple-cards-carousel", "Apple Cards Carousel", "苹果卡片轮播", "apple.com 同款简洁轮播", ["carousel", "cards"], { p: "motion", d: 3, pop: 82, insp: "apple.com" }],
  ["interaction", "infinite-moving-cards", "Infinite Moving Cards", "无限跑马灯", "无限循环移动卡片组", ["marquee", "testimonial"], { pop: 90, d: 1 }],
  ["interaction", "3d-marquee", "3D Marquee", "3D 跑马灯", "带网格的 3D 跑马灯", ["marquee", "3d"], { p: "motion", perf: "med", d: 3, pop: 66 }],
  ["interaction", "placeholders-and-vanish-input", "Vanish Input", "消失输入", "占位滑入、提交消失效果", ["input", "vanish"], { p: "motion", pop: 72 }],
  ["interaction", "signup-form", "Signup Form", "注册表单", "shadcn 输入+motion 的可定制表单", ["form"], { p: "motion", d: 1, pop: 62 }],
  ["interaction", "file-upload", "File Upload", "文件上传", "拖拽上传+网格背景微交互", ["upload", "form"], { p: "motion", d: 1, pop: 64 }],
  ["interaction", "link-preview", "Link Preview", "链接预览", "锚链的动态预览", ["link", "preview"], { p: "motion", pop: 58 }],
  ["interaction", "following-pointer", "Following Pointer", "跟随指针", "自定义指针跟随并动画内容", ["cursor"], { p: "motion", pop: 60 }],
  ["interaction", "images-slider", "Images Slider", "全屏滑块", "键盘可导航的全屏图滑", ["slider", "images"], { p: "motion", pop: 62 }],
  ["interaction", "animated-tabs", "Animated Tabs", "动画 Tabs", "点击切换背景动画的 Tabs", ["tabs"], { p: "motion", d: 1, pop: 68 }],
  ["interaction", "navbar-menu", "Navbar Menu", "大导航菜单", "hover 动画的 bignav 菜单", ["nav", "menu"], { p: "motion", pop: 58 }],
  ["interaction", "floating-navbar", "Floating Navbar", "浮动导航", "下滚隐藏、上滚显现", ["nav", "float"], { p: "motion", d: 1, pop: 60 }],
  ["interaction", "sidebar", "Sidebar", "侧边栏", "hover 展开、响应式、暗色", ["nav", "sidebar"], { p: "motion", d: 1, pop: 70 }],
  ["interaction", "multi-step-loader", "Multi Step Loader", "多步加载", "耗时加载场景的多步 loader", ["loader"], { p: "motion", d: 1, pop: 62 }],
  ["interaction", "loaders", "Loaders", "加载器合集", "一组简洁极简 loader", ["loader"], { pop: 58, d: 1 }],
  ["interaction", "layout-grid", "Layout Grid", "布局网格", "点击动画网格项(motion layout)", ["grid", "layout"], { p: "motion", d: 3, pop: 64 }],
  ["interaction", "svg-mask-effect", "SVG Mask Effect", "SVG 遮罩", "hover 揭示遮罩下内容", ["mask", "reveal"], { p: "svg-path", pop: 66 }],
  ["interaction", "sticky-scroll-reveal", "Sticky Scroll Reveal", "粘性滚动揭示", "滚动时粘性容器+文字揭示", ["sticky", "scroll"], { p: "motion", pop: 72 }],
  ["interaction", "timeline", "Timeline", "时间线", "粘性头+滚动光束跟随", ["timeline"], { p: "svg-path", perf: "med", pop: 76 }],
  ["interaction", "parallax-scroll", "Parallax Grid Scroll", "视差网格", "双列反向滚动的视差", ["parallax", "grid"], { p: "motion", pop: 60 }],
  ["interaction", "hero-parallax", "Hero Parallax", "Hero 视差", "滚动旋转/平移/透明动画", ["parallax", "hero"], { p: "motion", perf: "med", d: 3, pop: 78 }],
  ["interaction", "macbook-scroll", "Macbook Scroll", "笔记本滚动", "图像从屏幕中出来的滚动效果", ["macbook", "scroll"], { p: "motion", perf: "med", d: 3, pop: 74, insp: "fey.com" }],
  ["interaction", "container-scroll-animation", "Container Scroll Animation", "容器滚动旋转", "滚动 3D 旋转,适合 hero", ["scroll", "3d"], { p: "motion", pop: 72 }],
  ["interaction", "moving-border", "Moving Border", "流动边框", "沿容器移动的边框,突出按钮", ["border", "button"], { p: "canvas", d: 1, pop: 80 }],
  ["interaction", "hover-border-gradient", "Hover Border Gradient", "渐变描边", "hover 扩展的渐变边框", ["border", "hover"], { pop: 76, d: 1 }],
  ["interaction", "tailwindcss-buttons", "Tailwind CSS Buttons", "按钮合集", "精选实战 Tailwind 按钮", ["button"], { d: 1, pop: 66 }],
  ["interaction", "code-block", "Code Block", "代码块", "react-syntax-highlighter 可配置代码块", ["code"], { p: "js", d: 1, pop: 60 }],
  ["interaction", "ascii-art", "ASCII Art", "ASCII 艺术", "图像转 ASCII,可调字符集/颜色", ["ascii", "canvas"], { p: "canvas", perf: "med", d: 3, pop: 50 }],
  ["interaction", "webcam-pixel-grid", "Webcam Pixel Grid", "摄像头像素格", "实时摄像头像素网格效果", ["webcam", "pixel"], { p: "canvas", perf: "high", d: 4, pop: 46, m: 0 }],
  ["interaction", "chromatic-image", "Chromatic Image", "色散图像", "响应式色散/位移/倾斜交互图", ["image", "chromatic"], { p: "canvas", perf: "med", d: 3, pop: 52 }],
  ["interaction", "lamp-effect", "Lamp Section Header", "灯效分区头", "linear 同款灯效,适合分区头", ["lamp", "section"], { pop: 84, insp: "linear.app", d: 1 }],
];

// Hero Blocks 细分变体(#3)
const HERO_VARIANTS = [
  ["hero-section-with-multi-color-background", "Hero · Multi Color Background"],
  ["hero-section-with-mesh-gradient", "Hero · Mesh Gradient"],
  ["hero-with-background-and-navbar", "Hero · Background + Navbar"],
  ["hero-section-with-tabs", "Hero · Tabs"],
  ["hero-section-with-beams-and-grid", "Hero · Beams + Grid"],
  ["hero-section-with-flickering-lights", "Hero · Flickering Lights"],
  ["hero-section-with-infinite-scroll-cards", "Hero · Infinite Scroll Cards"],
];

const TEMPLATES = [
  ["agenforce-marketing-template", "Agenforce Marketing", "营销机构模板"],
  ["nodus-agent-template", "Nodus Marketing", "Agent 营销模板"],
  ["startup-landing-page-template", "Startup Landing Page", "初创落地页"],
  ["ai-saas-template", "AI SaaS", "AI SaaS 模板"],
  ["proactiv-marketing-template", "Proactiv Marketing", "营销模板"],
  ["agenlabs-agency-template", "Agenlabs Agency", "机构模板"],
  ["devpro-portfolio-template", "DevPro Portfolio", "开发者作品集"],
  ["foxtrot-marketing-template", "Foxtrot Marketing", "营销模板"],
  ["playful-marketing-template", "Playful Marketing", "趣味营销"],
  ["cryptgen-marketing-template", "Cryptgen Marketing", "加密营销"],
  ["schedule-marketing-template", "Schedule Marketing", "日程营销"],
  ["minimal-portfolio-template", "Minimal Portfolio", "极简作品集"],
];

const RELATED = [
  // [aceternity slug, rel_section, rel_name, rel_url, relation]
  ["aurora-background", "reactbits", "Aurora", "https://reactbits.dev/backgrounds/aurora", "duplicate"],
  ["background-beams", "reactbits", "Beams", "https://reactbits.dev/backgrounds/beams", "duplicate"],
  ["sparkles", "reactbits", "Ballpit", "https://reactbits.dev/backgrounds/ballpit", "alternative"],
  ["text-generate-effect", "reactbits", "Split Text 类文字动画", "https://reactbits.dev/", "alternative"],
  ["tailwindcss-buttons", "uiverse", "Button 元素合集", "https://uiverse.io/tags/button", "alternative"],
  ["signup-form", "uiverse", "Input 元素合集", "https://uiverse.io/tags/input", "alternative"],
  ["loaders", "uiverse", "Loader 元素合集", "https://uiverse.io/tags/loader", "alternative"],
  ["tracing-beam", "animejs", "Timeline", "https://animejs.com/documentation/timeline", "api"],
  ["layout-grid", "animejs", "Layout (FLIP)", "https://animejs.com/documentation/layout", "api"],
  ["typewriter-effect", "animejs", "Text", "https://animejs.com/documentation/text", "api"],
  ["moving-border", "animejs", "Animation", "https://animejs.com/documentation/animation", "api"],
  ["hero-parallax", "motionsites", "Synapse Dark Hero", "https://motionsites.ai/", "prompt"],
  ["bento-grid", "motionsites", "Apex SaaS", "https://motionsites.ai/", "prompt"],
];

const ARTICLES = [
  ["principle-svg-path", "principle", "SVG 路径动画原理:Beams / Tracing Beam 是怎么动的", "mid",
    "核心是 stroke-dasharray + stroke-dashoffset:先量出路径总长,再把 dash 偏移从全长动画到 0,光线就沿路径‘画’出来。Aceternity 用 framer-motion 驱动 offset,并根据滚动速度调整 dash 长度,于是有了 Tracing Beam 的‘变速光束’。", ["Background Beams", "Tracing Beam", "Timeline"]],
  ["principle-spotlight", "principle", "Spotlight 的鼠标追踪:径向渐变 + CSS 变量", "low",
    "onMouseMove 把光标坐标写进 CSS 变量 --x/--y,背景是 radial-gradient(circle at var(--x) var(--y), …)。零 canvas、零依赖,GPU 合成,性能极好。Card Spotlight 只是把同一技巧裁进卡片并叠加 dot-grid。", ["Card Spotlight", "Spotlight New"]],
  ["principle-flip", "principle", "FLIP 与 layout 动画:Layout Grid / Flip Words", "mid",
    "FLIP = First-Last-Invert-Play:记录变化前后位置,用 transform 反向补偿再播放。framer-motion 的 layout 属性把这套路封装成声明式 API,Layout Grid 的展开、Flip Words 的宽度动画都基于它。", ["Layout Grid", "Flip Words", "Layout Text Flip"]],
  ["principle-shader", "principle", "WebGL Shader 入门:Vortex / Dither / Cloud", "high",
    "片元着色器对每个像素并行算颜色。Vortex 是噪声场驱动的极坐标扰动;Dither 用 Bayer 矩阵做有序抖动;Cloud 是多层 fBM 噪声。Aceternity 直接写 raw WebGL,无 three 依赖,注意高分屏要限制 pixelRatio。", ["Vortex Background", "Dither Shader", "Cloud Shader"]],
  ["principle-particles", "principle", "Canvas 粒子:Sparkles / Shooting Stars 性能清单", "mid",
    "粒子数 × devicePixelRatio 是性能第一杀手。清单:1) 限制 DPR≤2;2) 离屏预渲染光点 sprite;3) 用 globalCompositeOperation=lighter 代替 shadowBlur;4) 不可见时 rAF 暂停;5) prefers-reduced-motion 直接静态。", ["Sparkles", "Shooting Stars"]],
  ["principle-mask", "principle", "SVG Mask 揭示:svg-mask-effect 与 canvas-text", "mid",
    "mask 里放白色形状,形状外透明。hover 时动画 mask 内矩形/文字,就得到‘擦除揭示’。canvas-text 反过来:把文字画成 clip 区域,曲线只在字形内绘制。", ["SVG Mask Effect", "Canvas Text"]],
  ["term-easing", "term", "Easing 缓动", "", "描述动画速度曲线的函数,如 easeOutExpo 先快后慢。Anime.js 的 Easings 章节提供可视化与函数库。", ["Easings"]],
  ["term-layout", "term", "Layout 动画", "", "对布局变化(尺寸/位置)做动画,而非 transform。代表实现 framer-motion layout、Anime.js Layout(FLIP)。", ["Layout Grid"]],
  ["term-shader", "term", "Shader 着色器", "", "运行在 GPU 上的小程序,片元着色器逐像素计算颜色,是 Vortex/Cloud/Dither 的基础。", ["Vortex Background"]],
  ["term-dithering", "term", "Dithering 抖动", "", "用图案近似连续色调的复古技术,有序抖动用 Bayer 矩阵,常见于像素风。", ["Dither Shader"]],
  ["term-marquee", "term", "Marquee 跑马灯", "", "内容复制两份首尾相接、线性无限平移的循环滚动技巧。", ["Infinite Moving Cards", "3D Marquee"]],
  ["term-bento", "term", "Bento Grid 便当格", "", "不对称多尺寸网格布局,因苹果发布会页面的便当盒排版得名。", ["Bento Grid"]],
  ["term-glass", "term", "Glassmorphism 玻璃拟态", "", "半透明+背景模糊+细边框的视觉风格,backdrop-filter 实现。", []],
  ["term-hydration", "term", "SSR Hydration", "", "服务端 HTML 与客户端首次渲染不一致导致的报错,动画组件常需 useEffect 挂载后再启用动效。", []],
  ["path-beginner", "path", "学习路径 · 入门:CSS 动画三件套", "low", "transition / keyframes / transform。先复刻 Wobble Card、Hover Border Gradient、Scales,理解 GPU 合成与 will-change。", ["Wobble Card", "Hover Border Gradient", "Scales"]],
  ["path-motion", "path", "学习路径 · 进阶:Framer Motion", "mid", "掌握 layout 动画、whileInView、AnimatePresence。复刻 Flip Words、Card Stack、Sticky Scroll Reveal。", ["Flip Words", "Card Stack", "Sticky Scroll Reveal"]],
  ["path-webgl", "path", "学习路径 · 高级:Canvas 与 WebGL", "high", "从 2D canvas 粒子到 raw WebGL 片元着色器。复刻 Sparkles → Vortex → Dither Shader。", ["Sparkles", "Vortex Background", "Dither Shader"]],
  ["weekly-01", "weekly", "组件解剖 #1:Background Beams 的 60 行核心", "", "拆解 beams 的 SVG path 生成、dash 动画与碰撞检测变体,附复刻练习。", ["Background Beams"]],
  ["weekly-02", "weekly", "组件解剖 #2:Evervault Card 的加密字符层", "", "字符矩阵 + mix-blend-mode + 渐变网格的实现细节与性能取舍。", ["Evervault Card"]],
  ["faq-beams-ssr", "faq", "Beams 在 Next.js 报 hydration 错误?", "", "组件依赖 mount 后的随机路径。用 next/dynamic 的 ssr:false,或包裹 ‘use client’ 并在 useEffect 内生成路径。", ["Background Beams"]],
  ["faq-vortex-perf", "faq", "Vortex 在手机卡顿怎么办?", "", "降低 pixelRatio、减小分辨率 uniform,或在 matchMedia 移动设备时替换为静态渐变。", ["Vortex Background"]],
  ["faq-dock-mobile", "faq", "Floating Dock 触摸设备体验?", "", "官方支持响应式;触摸无 hover,建议放大点击区域并关闭磁吸。", ["Floating Dock"]],
  ["faq-globe-deps", "faq", "GitHub Globe 依赖多大?", "", "three + @react-three/fiber 约 600KB,建议动态导入并按需加载 JSON 地理数据。", ["GitHub Globe"]],
];

function seed2(db) {
  const sec = db.prepare("SELECT id FROM sections WHERE slug='aceternity'").get();
  if (!sec) return;
  const sid = sec.id;
  const marker = db.prepare("SELECT COUNT(*) c FROM items WHERE url LIKE '%chromatic-image%'").get().c;
  if (marker > 0) return; // 已播种

  const newCats = [
    ["templates", "Templates 模板", "12 个官方整站模板"],
    ["tools", "Tools 工具", "官方小工具(Box Shadows 等)"],
    ["pro", "Pro 预览", "Pro 专属内容预览与获取说明"],
    ["coming", "Coming Soon", "官方预告中的组件"],
    ["changelog", "Changelog 新上架", "官方更新日志条目"],
    ["inspiration", "灵感", "Labs / Showcase / Explore"],
  ];
  const ic = db.prepare("INSERT OR IGNORE INTO categories (section_id,slug,name,description,sort) VALUES (?,?,?,?,?)");
  for (const [i, c] of newCats.entries()) ic.run(sid, c[0], c[1], c[2], 10 + i);
  const catId = (slug) => db.prepare("SELECT id FROM categories WHERE section_id=? AND slug=?").get(sid, slug).id;

  const ins = db.prepare(
    `INSERT INTO items (section_id,category_id,name,url,description,tags,cover_image,status,starred,
      alias,principle,perf_cost,deps,difficulty,popularity,inspiration,mobile_friendly,access_level,principle_note)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  );
  const put = (cat, slug, name, alias, desc, tags, o = {}, url) =>
    ins.run(
      sid, catId(cat), name, url || A + slug, desc, JSON.stringify(tags), "", "published", 0,
      alias || "", o.p || "css", o.perf || "low", JSON.stringify(o.deps || ["motion", "tailwind"]),
      o.d || 2, o.pop || 60, o.insp || "", o.m === undefined ? 1 : o.m, o.a || "free", o.note || ""
    );

  for (const it of ITEMS) put(it[0], it[1], it[2], it[3], it[4], it[5], it[6] || {});

  // #3 Blocks 细分:hero 变体
  for (const [slug, name] of HERO_VARIANTS)
    put("blocks", slug, name, "Hero 变体", "Hero Sections 合集细分变体,含 Preview/Code 与全屏预览", ["hero", "variant", "block"], { p: "motion", d: 2, pop: 66 }, `https://ui.aceternity.com/live-preview/${slug}`);
  db.prepare("UPDATE items SET variant_count=23, description='23+ Hero 区块合集(已细分 7 个变体)' WHERE section_id=? AND name='Hero Sections'").run(sid);

  // #2 Templates
  for (const [slug, name, alias] of TEMPLATES)
    put("templates", slug, name, alias, "官方整站营销/作品集模板", ["template"], { p: "motion", d: 2, pop: 70 }, `https://ui.aceternity.com/templates/${slug}`);

  // #6 Tools / #7 Pro / #8 Coming / #5 Changelog / #4 Inspiration
  put("tools", "box-shadows", "Box Shadows", "阴影生成器", "官方 box-shadow 生成工具", ["tool", "shadow"], { d: 1, pop: 45 }, "https://ui.aceternity.com/tools/box-shadows");
  put("pro", "shaders", "Shaders (Pro)", "着色器合集", "3+ 可复用背景着色器,Pro 专属", ["shader", "pro"], { p: "webgl", perf: "high", d: 4, pop: 60, a: "pro" }, "https://ui.aceternity.com/blocks/shaders");
  put("pro", "logo-clouds", "Logo Clouds (Pro)", "Logo 云", "6+ 带微交互的 logo 云,Pro 专属", ["logo", "pro"], { d: 2, pop: 50, a: "pro" }, "https://ui.aceternity.com/blocks/logo-clouds");
  put("pro", "text-animations-pro", "Text Animations (Pro)", "文字动画合集", "4+ 标题/段落文字动画,Pro 专属", ["text", "pro"], { d: 2, pop: 55, a: "pro" }, "https://ui.aceternity.com/blocks/text-animations");
  put("coming", "coming-soon", "More Components", "即将发布", "官方 ‘Coming Soon’:更多组件开发中,本页跟踪发布状态", ["coming"], { d: 1, pop: 30, a: "coming" }, "https://ui.aceternity.com/components");
  put("changelog", "cl-2026-08", "2026-08 新上架", "更新日志", "Chromatic Image / Cloud Shader / Text Flipping Board 上架", ["changelog"], { pop: 40 });
  put("changelog", "cl-2026-07", "2026-07 新上架", "更新日志", "Notch / Dither Shader / Webcam Pixel Grid / Squiggly Text 上架", ["changelog"], { pop: 40 });
  put("changelog", "cl-2026-06", "2026-06 新上架", "更新日志", "Gooey Input / Magnetic Button / Stateful Button 上架", ["changelog"], { pop: 40 });
  put("inspiration", "labs", "Labs", "实验室", "官方实验性效果合集", ["labs"], { pop: 50 }, "https://ui.aceternity.com/labs");
  put("inspiration", "showcase", "Showcase", "展示", "用 Aceternity 搭建的真实站点展示", ["showcase"], { pop: 50 }, "https://ui.aceternity.com/showcase");
  put("inspiration", "explore", "Explore", "探索", "官方探索页,按风格浏览", ["explore"], { pop: 45 }, "https://ui.aceternity.com/explore");

  // #9 diff 说明 / #10 迁移关系
  db.prepare("UPDATE items SET migrated_to='Spotlight New', faq='旧版保留兼容,新项目用 Spotlight New(可配置左右聚光灯)' WHERE section_id=? AND name='Spotlight'").run(sid);
  db.prepare("UPDATE items SET faq='相对旧版新增:响应式色散强度、位移与倾斜可配置' WHERE section_id=? AND name='Chromatic Image'").run(sid);

  // 跨版块映射
  const ir = db.prepare("INSERT INTO related_map (item_id,rel_section_slug,rel_name,rel_url,relation) VALUES (?,?,?,?,?)");
  for (const [slug, rs, rn, ru, rel] of RELATED) {
    const it = db.prepare("SELECT id FROM items WHERE section_id=? AND url=?").get(sid, A + slug);
    if (it) ir.run(it.id, rs, rn, ru, rel);
  }

  // 学习内容
  const ia = db.prepare("INSERT INTO articles (slug,category,title,level,body,linked_items) VALUES (?,?,?,?,?,?)");
  for (const a of ARTICLES) ia.run(a[0], a[1], a[2], a[3], a[4], JSON.stringify(a[5]));

  // 精选合集(#45)
  const mkCol = (name, desc, names) => {
    const r = db.prepare("INSERT INTO collections (name,description) VALUES (?,?)").run(name, desc);
    const ci = db.prepare("INSERT OR IGNORE INTO collection_items (collection_id,item_id) VALUES (?,?)");
    for (const n of names) {
      const it = db.prepare("SELECT id FROM items WHERE name=?").get(n);
      if (it) ci.run(r.lastInsertRowid, it.id);
    }
  };
  mkCol("官网三件套", "一个 landing 的最小动效组合", ["Background Beams", "Flip Words", "Infinite Moving Cards"]);
  mkCol("背景八选", "8 种风格化背景横评", ["Background Beams", "Aurora Background", "Meteor Effect", "Vortex Background", "Sparkles", "Shooting Stars", "Wavy Background", "Grid & Dot Backgrounds"]);
  mkCol("表单微交互", "输入/上传/按钮的微交互", ["Placeholders And Vanish Input", "Gooey Input", "File Upload", "Stateful Button", "Magnetic Button"]);

  // 品牌默认设置(#100 白标)
  const iset = db.prepare("INSERT OR IGNORE INTO settings (key,value) VALUES (?,?)");
  iset.run("brand_name", "Motion UI 资源库");
  iset.run("brand_color", "#22d3ee");
  iset.run("locale", "zh");
}

// 去重:同名条目保留新版(带元数据),旧版的封面/资产关联/合集/映射迁移后删除
function dedupe(db) {
  const secs = db.prepare("SELECT id FROM sections").all();
  for (const s of secs) {
    const dups = db
      .prepare("SELECT name, GROUP_CONCAT(id, ',') ids FROM items WHERE section_id=? GROUP BY name HAVING COUNT(*)>1")
      .all(s.id);
    for (const d of dups) {
      const ids = d.ids.split(",").map(Number).sort((a, b) => a - b);
      const keep = ids[ids.length - 1];
      for (const old of ids.slice(0, -1)) {
        const cover = db.prepare("SELECT cover_image,starred FROM items WHERE id=?").get(old);
        if (cover?.cover_image)
          db.prepare("UPDATE items SET cover_image=? WHERE id=? AND cover_image=''").run(cover.cover_image, keep);
        if (cover?.starred) db.prepare("UPDATE items SET starred=1 WHERE id=?").run(keep);
        db.prepare("UPDATE assets SET linked_item_id=? WHERE linked_item_id=?").run(keep, old);
        db.prepare("UPDATE related_map SET item_id=? WHERE item_id=?").run(keep, old);
        db.prepare("INSERT OR IGNORE INTO collection_items (collection_id,item_id) SELECT collection_id,? FROM collection_items WHERE item_id=?").run(keep, old);
        db.prepare("DELETE FROM collection_items WHERE item_id=?").run(old);
        db.prepare("UPDATE comments SET item_id=? WHERE item_id=?").run(keep, old);
        db.prepare("UPDATE ratings SET item_id=? WHERE item_id=?").run(keep, old);
        db.prepare("DELETE FROM items WHERE id=?").run(old);
      }
    }
  }
}

module.exports = { seed2, dedupe };

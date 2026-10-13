// All personal content for the portfolio. Source of truth: Sihan Wang's resume.
// Layout, motion and interaction mirror jingjinghan.com; only the content here is personal.
//
// Images under /public/images are placeholders until real project visuals are provided —
// replace the files in place (same names) or update the paths below.

export const person = {
  name: "Sihan Wang",
  firstName: "Sihan",
  email: "esmew0301@gmail.com",
  schoolEmail: "siw056@ucsd.edu",
  phone: "858-361-7845",
  linkedin: "https://www.linkedin.com/in/sihan-wangabcd333/?isSelfProfile=true",
  avatar: "/images/avatar.jpg",
  status: "Cognitive Science @ UC San Diego",
};

export const figma = {
  posse:
    "https://www.figma.com/design/hQug8onGIWcPnakrk26zez/Intern-app-webiste-interface?node-id=0-1&t=2YZw30aeRcKyvndR-1",
  endOfAnEra:
    "https://www.figma.com/design/5P3pWrQfCZR8exsmun1EUP/Intern?node-id=0-1&t=nv3YTN6ziuVvIyZ8-1",
  tripPlanner:
    "https://www.figma.com/design/xrn8Ye8h9ucJhsSwJPvmwl/%E4%BD%9C%E5%93%81%E9%9B%86?node-id=0-1&t=GpPrJvQZCYIB83FG-1",
  veganKitchen:
    "https://www.figma.com/design/iFORJBARqgkcdyO3WLr4YV/Final?node-id=110-1065&t=qYWwM8Wmt5ze4762-1",
  // TODO(Sihan): replace with the full low-fidelity flow link; until then it opens the main Trip Planning file.
  tripWireframes:
    "https://www.figma.com/design/xrn8Ye8h9ucJhsSwJPvmwl/%E4%BD%9C%E5%93%81%E9%9B%86?node-id=0-1&t=GpPrJvQZCYIB83FG-1",
};

export type NavLink = {
  label: string;
  /** Chinese label shown when the visitor picks 中文 (lib/i18n.tsx). */
  zh?: string;
  href: string;
  external?: boolean;
  download?: string;
  tooltip?: string;
  tooltipZh?: string;
};

export const navLinks: NavLink[] = [
  { label: "About", zh: "关于", href: "#about" },
  { label: "Design", zh: "作品", href: "/design" },
  { label: "Experiment", zh: "经历", href: "/experiment" },
  {
    label: "Resume",
    zh: "简历",
    href: "/files/Sihan-Wang-Resume.pdf",
    download: "Sihan-Wang-Resume.pdf",
    tooltip: "Download Resume",
    tooltipZh: "下载简历",
  },
];

// Preloader words cycle while the counter runs 0 → 100.
export const preloaderWords = ["Research", "Map", "Design", "Prototype", "Test"];

// Hero: the first entry is typed into the headline; the rest cycle after the intro.
export const heroRoles = [
  person.name,
  "UX/UI Designer",
  "UX Researcher",
  "AI & Automotive UX",
];

export const heroSubtitle =
  "UX/UI designer studying Cognitive Science at UC San Diego, focused on Human-Computer Interaction.";
export const heroSubtitleZh = "就读于加州大学圣地亚哥分校，主修认知科学，专注于人机交互（HCI）、用户体验（UX）与用户界面（UI）设计。";

export const marqueeWords = [
  "UX Research",
  "Interaction Design",
  "Prototyping",
  "Design Systems",
  "Information Architecture",
  "AI-Assisted Design",
];

// Tokens like (posse) in a statement render as underlined links.
export const statementLinks: Record<string, string> = {};

export const aboutAudiences = [
  {
    label: "For anyone",
    statement:
      "I'm Sihan, a UX/UI designer studying Cognitive Science at UC San Diego. I'm interested in how people make decisions and how thoughtful interactions can make complex products easier to use.",
    statementZh:
      "我是 Sihan，目前就读于加州大学圣地亚哥分校，主修认知科学，专注于用户体验（UX）与用户界面（UI）设计。我关注用户如何理解信息、作出决策，并致力于通过清晰、直观且富有细节的交互设计，将复杂的产品需求转化为易于理解和使用的数字体验。",
  },
  {
    label: "Recruiters",
    statement:
      "I led UI/UX design at Posse.io and designed core workflows as a UI/UX Designer at End of an Era. My work spans brand, product, and AI.",
    statementZh:
      "我曾在 Posse.io 负责 UI/UX 设计，并在 End of an Era 担任 UI/UX 设计师，参与核心业务流程的设计。我的作品涵盖品牌、产品与 AI 三个领域。",
  },
  {
    label: "Product Designers",
    statement:
      "I start with people. Interviews and personas shape my user flows, and those flows grow into prototypes and reusable design systems in Figma.",
    statementZh:
      "我的设计始终从用户出发：基于用户访谈和用户画像梳理用户流程，再在 Figma 中将其逐步发展为交互原型和可复用的设计系统。",
  },
  {
    label: "Product Managers",
    statement:
      "I turn tangled business requirements into clear products. Competitive analysis shows me the gaps, and solid information architecture makes complex workflows easier to follow.",
    statementZh:
      "我擅长将错综复杂的业务需求转化为清晰的产品方案：通过竞品分析发现市场空白，再以扎实的信息架构，让复杂的业务流程更易于理解和执行。",
  },
  {
    label: "Engineers",
    statement:
      "I design with AI in the loop, from prompt engineering to AI-assisted design, and build reusable components so the product feels the same on every platform.",
    statementZh:
      "我将 AI 融入设计流程，涵盖提示词工程与 AI 辅助设计；同时搭建可复用的组件，确保产品在不同平台上体验一致。",
  },
];

export const featuredWork = {
  since: "Since 2025",
  title: "Featured Work",
  subtitle:
    "A selection of projects across product design, UX research, and redesign, from early exploration to detailed interaction flows.",
  subtitleZh: "精选产品设计、用户研究与网站改版项目，内容从前期探索延伸到细致的交互流程设计。",
};

export type WorkItem = {
  label: string;
  title: string;
  description: string;
  descriptionZh?: string;
  image: string;
  alt: string;
  href: string;
  /** CSS object-position for the cover crop (defaults to center). */
  imagePosition?: string;
  /** Optional looping video shown in place of the image on the homepage card only. */
  video?: string;
  /** First frame shown while the card video loads (defaults to `image`). */
  poster?: string;
};

export const selectedWork: WorkItem[] = [
  {
    label: "End of an Era",
    title: "Financial Workflow Platform",
    description:
      "Workflow design that turns a complex estate-settlement process into structured steps with visible requirements and next actions.",
    descriptionZh: "将复杂的遗产处理流程拆解为结构清晰的业务步骤，让每一步的要求和下一步操作都清楚可见。",
    image: "/images/eoe/cover.jpg",
    alt: "End of an Era financial workflow platform",
    href: "/work/end-of-an-era",
    // Homepage card only: built by tools/eoe_card_transition.py from end_of_an_era_showcase_v3.mp4 (in
    // reference/end-of-an-era/video). Same fly-in; each screen holds 1 s, then the whole iPad slides up out of frame as the next rises in.
    // Earlier versions kept in public/videos: end_of_an_era_showcase_8s.mp4 (original crossfades), end_of_an_era_animo_stream.mp4.
    video: "/videos/end_of_an_era_card.mp4",
    poster: "/images/eoe/card-poster.jpg",
  },
  {
    label: "AI Trip Planning",
    title: "AI-Powered Automotive Trip Planning",
    description:
      "A concept for an AI trip planner that builds multi-stop trips from what drivers want to do, across phone and car.",
    descriptionZh: "一款 AI 行程规划工具的概念设计：根据驾驶者的出行意图生成多站点行程，并支持在手机与车机之间连续使用。",
    // Card cover: the car + phone UIs on a licensed interior photo (tools/trip_cover_composite.py).
    // "Curious to see more?" cards on the other case studies (the homepage card plays the video instead).
    image: "/images/trip-planner-more.jpg",
    alt: "AI trip-planning experience on an in-vehicle display, with the mobile companion app and a destination card",
    href: "/work/ai-trip-planning",
    // Homepage card only (the case-study hero is separate): web encode of animo-parallax-totem-2160p.mp4
    // (the 934 MB original stays with the user; not copied into reference/ for disk space), 1440x1080, 30 fps, no audio.
    video: "/videos/trip_planner_animo_totem.mp4",
    poster: "/images/trip-planning/card-poster-animo.jpg",
  },
  {
    label: "Posse.io",
    title: "Magazine Platform",
    description:
      "A local magazine website redesigned around clearer navigation and a guided way for businesses to get featured.",
    descriptionZh: "为本地杂志重新设计网站的信息架构与投稿流程，让读者更容易浏览内容，也让本地商家清楚知道如何投稿。",
    image: "/images/leucadia/cover.jpg",
    alt: "The redesigned Leucadia Magazine homepage on a laptop",
    href: "/work/leucadia-magazine",
    // Homepage card only: laptop browsing demo built by tools/leucadia_demo_video.py from the four page screenshots.
    video: "/videos/leucadia_browsing_laptop.mp4",
    poster: "/images/leucadia/demo-poster.jpg",
  },
];

export const playground = {
  since: "Since 2025",
  title: "Playground",
  subtitle:
    "Experiments and collaborative projects where I explored different design challenges, from product concepts to usability testing.",
  subtitleZh: "实验性项目与团队协作项目合集，我在其中探索了从产品概念到可用性测试的多种设计挑战。",
};

export const playgroundProjects = [
  {
    index: "01",
    title: "Vegan Kitchen",
    blurb:
      "An ordering app for a vegan restaurant, with a staff side for menu and availability, refined over two rounds of testing.",
    blurbZh: "为一家素食餐厅设计的点餐 App，并配有供店员管理菜单与菜品供应状态的后台，经过两轮可用性测试迭代优化。",
    tags: [] as string[],
    image: "/images/vegan/cover.jpg",
    href: "/playground/vegan-kitchen",
  },
  {
    index: "02",
    title: "L'Oréal",
    blurb:
      "A student product concept for L'Oréal Brandstorm 2025: research, strategy, and packaging for a men's foundation and cleansing-oil set.",
    blurbZh: "L'Oréal Brandstorm 2025 学生产品概念：围绕一套男士粉底液与卸妆油组合，完成调研、产品策略与包装设计。",
    tags: ["Research", "Product Concept"],
    image: "/images/loreal/cover.jpg",
    href: "/playground/loreal",
  },
];

export const webDesignIntro =
  "Brand websites shaped by research into comparable sites and each brand's tone, designed for both desktop and mobile.";
export const webDesignIntroZh = "基于同类网站调研与品牌调性设计的品牌网站，兼顾桌面端与移动端。";

export const webDesign = [
  {
    label: "Tequila Brand Website",
    blurb: "A brand website concept for Leucadia 1875 tequila at Posse.io, designed for desktop and mobile.",
    blurbZh: "在 Posse.io 为 Leucadia 1875 龙舌兰酒品牌设计的网站概念，覆盖桌面端和移动端。",
    image: "/images/leucadia-tequila/cover.jpg",
    alt: "The Leucadia 1875 tequila website on a laptop",
    href: "/web/leucadia-tequila",
  },
];

// Images that flash along the cursor path in the hero.
export const trailImages = [
  "/images/trail-01.jpg",
  "/images/trail-02.jpg",
  "/images/trail-03.jpg",
  "/images/trail-04.jpg",
  "/images/trail-05.jpg",
  "/images/trail-06.jpg",
  "/images/trail-07.jpg",
  "/images/trail-08.jpg",
  "/images/trail-09.jpg",
  "/images/trail-10.jpg",
  "/images/trail-11.jpg",
  "/images/trail-12.jpg",
  "/images/trail-13.jpg",
];

export const footerMenu = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Playground", href: "#playground" },
  { label: "About", href: "#about" },
];

export const footerConnect = [
  { label: "LinkedIn", href: person.linkedin, external: true },
  { label: "Email", href: `mailto:${person.email}`, external: false },
  { label: "Portfolio", href: figma.tripPlanner, external: true },
];

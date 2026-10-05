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
};

export type NavLink = { label: string; href: string; external?: boolean; download?: string; tooltip?: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Design", href: "/design" },
  { label: "Experiment", href: "/experiment" },
  { label: "Resume", href: "/files/Sihan-Wang-Resume.pdf", download: "Sihan-Wang-Resume.pdf", tooltip: "Download Resume" },
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
      "I'm Sihan — a UX/UI designer studying Cognitive Science at UC San Diego, focused on Human-Computer Interaction.",
  },
  {
    label: "Recruiters",
    statement:
      "I've designed across brand, product, and AI — as UI/UX Design Leader at Posse.io and UI/UX Designer at End of an Era.",
  },
  {
    label: "Product Designers",
    statement:
      "I move from research to high fidelity — interviews and personas feed into flows, prototypes, and reusable design systems in Figma.",
  },
  {
    label: "Product Managers",
    statement:
      "I turn complex business requirements into user-centered experiences, using competitive analysis and information architecture to simplify workflows.",
  },
  {
    label: "Engineers",
    statement:
      "I design with AI in the loop — prompt engineering and AI-assisted design — and build reusable components that stay consistent across platforms.",
  },
];

export const featuredWork = {
  since: "Since 2025",
  title: "Featured Work",
  subtitle:
    "I turn research into user-centered design — from information architecture to high-fidelity prototypes.",
};

export type WorkItem = {
  label: string;
  title: string;
  description: string;
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
    label: "AI Trip Planning",
    title: "AI-Powered Automotive Trip Planning",
    description:
      "An in-car AI trip planner that turns personal preferences into flexible routes.",
    image: "/images/trip-planner-hero.jpg",
    alt: "AI trip-planning experience on an in-vehicle display, with the mobile companion app and a destination card",
    href: "/work/ai-trip-planning",
    imagePosition: "68% 50%",
    video: "/videos/trip_planner_app_showcase.mp4",
  },
  {
    label: "Posse.io",
    title: "Magazine Platform",
    description:
      "A community magazine website rebuilt around a clean editorial system and guided submissions — 100% usability approval.",
    image: "/images/leucadia/cover.jpg",
    alt: "The redesigned Leucadia Magazine homepage on a laptop",
    href: "/work/leucadia-magazine",
    video: "/videos/leucadia_search_to_homepage_demo.mp4",
  },
  {
    label: "End of an Era",
    title: "Financial Workflow Platform",
    description:
      "How thoughtful design turns a frustrating experience into a clear one.",
    image: "/images/eoe/cover.jpg",
    alt: "End of an Era financial workflow platform",
    href: "/work/end-of-an-era",
    // First 8 seconds of end_of_an_era_showcase_v3.mp4 (original in reference/end-of-an-era/video).
    video: "/videos/end_of_an_era_showcase_8s.mp4",
    poster: "/images/eoe/card-poster.jpg",
  },
];

export const playground = {
  since: "Since 2025",
  title: "Playground",
  subtitle:
    "Design challenges and research beyond client work.",
};

export const playgroundProjects = [
  {
    index: "01",
    title: "L'Oréal",
    blurb:
      "A visual design exploration for L'Oréal, focused on brand identity and visual communication.",
    tags: ["UX Research", "Prototyping"],
    image: "/images/loreal/cover.jpg",
    href: "/playground/loreal",
  },
  {
    index: "02",
    title: "Vegan Kitchen",
    blurb:
      "A digital menu for a vegan restaurant: customer ordering plus a staff dashboard for restocking dishes.",
    tags: [] as string[],
    image: "/images/vegan/cover.jpg",
    href: "/playground/vegan-kitchen",
  },
];

export const webDesignIntro =
  "Responsive websites designed end to end — from competitive analysis to reusable components across desktop and mobile.";

export const webDesign = [
  {
    label: "Wine Brand Website",
    blurb: "A wine brand website for Posse.io, across desktop and mobile.",
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

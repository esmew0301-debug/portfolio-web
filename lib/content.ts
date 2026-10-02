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

export type NavLink = { label: string; href: string; external?: boolean };

export const navLinks: NavLink[] = [
  { label: "Design", href: "#work" },
  { label: "Experience", href: "#performance" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: figma.tripPlanner, external: true },
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
  "UX/UI designer studying Cognitive Science at UC San Diego, specializing in Human-Computer Interaction and UI/UX design.";

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
      "I'm Sihan — a UX/UI designer studying Cognitive Science at UC San Diego, where I specialize in Human-Computer Interaction and UI/UX design.",
  },
  {
    label: "Recruiters",
    statement:
      "I've designed across brand, product, and AI — as UI/UX Design Leader at Posse.io and UI/UX Designer at End of an Era.",
  },
  {
    label: "Product Designers",
    statement:
      "I move from research to high fidelity — interviews, journey maps, and personas feed into user flows, wireframes, prototypes, and reusable design systems in Figma.",
  },
  {
    label: "Product Managers",
    statement:
      "I translate complex business requirements into user-centered experiences, using competitive analysis, content audits, and information architecture to make workflows easier to use.",
  },
  {
    label: "Engineers",
    statement:
      "I design with AI in the loop — prompt engineering, AI-assisted design, and AI product exploration — and build responsive, reusable components that keep products consistent across platforms.",
  },
];

export const featuredWork = {
  since: "Since 2025",
  title: "Featured Work",
  subtitle:
    "I turn research insights into user-centered design — from information architecture and user flows to high-fidelity prototypes.",
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
};

export const selectedWork: WorkItem[] = [
  {
    label: "AI Trip Planning",
    title: "AI-Powered Automotive Trip Planning",
    description:
      "An AI-powered in-car trip planner that turns personal preferences into flexible, personalized routes.",
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
      "Reimagined a community magazine's website with a clean editorial system and a guided submission flow, validated at 100% usability approval.",
    image: "/images/leucadia/cover.jpg",
    alt: "The redesigned Leucadia Magazine homepage on a laptop",
    href: "/work/leucadia-magazine",
    video: "/videos/leucadia_search_to_homepage_demo.mp4",
  },
  {
    label: "End of an Era",
    title: "Financial Workflow Platform",
    description:
      "A project exploring how thoughtful design can turn a frustrating experience into a clearer one.",
    image: "/images/work-end-of-an-era.svg",
    alt: "End of an Era financial workflow platform",
    href: "/work/end-of-an-era",
  },
];

export const playground = {
  since: "Since 2025",
  title: "Playground",
  subtitle:
    "Design challenges and research projects beyond client work — from product concepts to how people pay attention.",
};

export const playgroundProjects = [
  {
    index: "01",
    title: "L'Oréal",
    blurb:
      "A visual design exploration created for L'Oréal, focusing on brand identity, visual communication, and creative design.",
    tags: ["UX Research", "Prototyping"],
    image: "/images/loreal/cover.jpg",
    href: "/playground/loreal",
  },
  {
    index: "02",
    title: "Vegan Kitchen",
    blurb:
      "A digital menu system for a vegan restaurant, featuring a customer ordering interface and an employee dashboard for tracking which dishes need to be restocked.",
    tags: [] as string[],
    image: "/images/vegan/cover.jpg",
    href: "/playground/vegan-kitchen",
  },
  {
    index: "03",
    title: "Homie Go",
    blurb:
      "A home-cleaning service experience designed to make booking and managing cleaning services simple and convenient.",
    tags: [] as string[],
    image: "/images/pg-house-cleaning.svg",
    href: "#",
  },
  {
    index: "04",
    title: "Experiment",
    blurb:
      "A collection of visual experiments exploring graphic design, poster design, bag design, sketches, and other creative ideas.",
    tags: [] as string[],
    image: "/images/pg-sketch.svg",
    href: "#",
  },
];

export const webDesignIntro =
  "Responsive websites designed end to end — from competitive analysis and information architecture to reusable components across desktop and mobile.";

export const webDesign = [
  {
    label: "Wine Brand Website",
    image: "/images/web-wine.svg",
    alt: "Wine brand website for Posse.io",
    href: figma.posse,
  },
  {
    label: "Local Magazine Platform",
    image: "/images/web-magazine.svg",
    alt: "Local magazine platform for Posse.io",
    href: "/work/leucadia-magazine",
  },
];

export const experienceIntro = {
  title: "Experience & Education",
  subtitle:
    "Where I’ve designed and studied — from Posse.io to Cognitive Science at UC San Diego.",
  cta: { label: "View LinkedIn", href: person.linkedin },
};

export const experience = [
  {
    slug: "posse",
    title: "Posse.io",
    role: "UI/UX Design Leader",
    type: "0 → 1 Product Design",
    year: "2026",
    blurb:
      "End-to-end UX for a wine brand website and a local magazine platform.",
    image: "/images/exp-posse.svg",
    alt: "Posse.io — UI/UX design leader",
  },
  {
    slug: "end-of-an-era",
    title: "End of an Era",
    role: "UI/UX Designer",
    type: "Financial Workflow",
    year: "2026",
    blurb:
      "Information architecture and interaction design for a financial workflow platform.",
    image: "/images/exp-end-of-an-era.svg",
    alt: "End of an Era — UI/UX designer",
  },
  {
    slug: "runchina",
    title: "Runchina Company",
    role: "Design Assistant",
    type: "Design",
    year: "2025",
    blurb: "Design Assistant, Feb 2025 – Jun 2025.",
    image: "/images/exp-runchina.svg",
    alt: "Runchina Company — design assistant",
  },
  {
    slug: "ucsd",
    title: "UC San Diego",
    role: "B.S. Cognitive Science",
    type: "HCI & UI/UX Design",
    year: "2027",
    blurb:
      "Specialization in Human-Computer Interaction & UI/UX Design. GPA 3.85.",
    image: "/images/exp-ucsd.svg",
    alt: "University of California, San Diego",
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

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
      "I'm Sihan, a UX/UI designer studying Cognitive Science at UC San Diego. I'm interested in how people make decisions and how thoughtful interactions can make complex products easier to use.",
  },
  {
    label: "Recruiters",
    statement:
      "I led UI/UX design at Posse.io and designed core workflows as a UI/UX Designer at End of an Era. My work spans brand, product, and AI.",
  },
  {
    label: "Product Designers",
    statement:
      "I start with people. Interviews and personas shape my user flows, and those flows grow into prototypes and reusable design systems in Figma.",
  },
  {
    label: "Product Managers",
    statement:
      "I turn tangled business requirements into clear products. Competitive analysis shows me the gaps, and solid information architecture makes complex workflows easier to follow.",
  },
  {
    label: "Engineers",
    statement:
      "I design with AI in the loop, from prompt engineering to AI-assisted design, and build reusable components so the product feels the same on every platform.",
  },
];

export const featuredWork = {
  since: "Since 2025",
  title: "Featured Work",
  subtitle:
    "A selection of projects across product design, UX research, and redesign, from early exploration to detailed interaction flows.",
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
      "A concept for an AI trip planner that builds multi-stop trips from what drivers want to do, across phone and car.",
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
    image: "/images/leucadia/cover.jpg",
    alt: "The redesigned Leucadia Magazine homepage on a laptop",
    href: "/work/leucadia-magazine",
    // Homepage card only: laptop browsing demo built by tools/leucadia_demo_video.py from the four page screenshots.
    video: "/videos/leucadia_browsing_laptop.mp4",
    poster: "/images/leucadia/demo-poster.jpg",
  },
  {
    label: "End of an Era",
    title: "Financial Workflow Platform",
    description:
      "Workflow design that turns a complex estate-settlement process into structured steps with visible requirements and next actions.",
    image: "/images/eoe/cover.jpg",
    alt: "End of an Era financial workflow platform",
    href: "/work/end-of-an-era",
    // Homepage card only: built by tools/eoe_card_transition.py from end_of_an_era_showcase_v3.mp4 (in
    // reference/end-of-an-era/video). Same fly-in; each screen holds 1 s, then the whole iPad slides up out of frame as the next rises in.
    // Earlier versions kept in public/videos: end_of_an_era_showcase_8s.mp4 (original crossfades), end_of_an_era_animo_stream.mp4.
    video: "/videos/end_of_an_era_card.mp4",
    poster: "/images/eoe/card-poster.jpg",
  },
];

export const playground = {
  since: "Since 2025",
  title: "Playground",
  subtitle:
    "Experiments and collaborative projects where I explored different design challenges, from product concepts to usability testing.",
};

export const playgroundProjects = [
  {
    index: "01",
    title: "L'Oréal",
    blurb:
      "A student product concept for L'Oréal Brandstorm 2025: research, strategy, and packaging for a men's foundation and cleansing-oil set.",
    tags: ["Research", "Product Concept"],
    image: "/images/loreal/cover.jpg",
    href: "/playground/loreal",
  },
  {
    index: "02",
    title: "Vegan Kitchen",
    blurb:
      "An ordering app for a vegan restaurant, with a staff side for menu and availability, refined over two rounds of testing.",
    tags: [] as string[],
    image: "/images/vegan/cover.jpg",
    href: "/playground/vegan-kitchen",
  },
];

export const webDesignIntro =
  "Brand websites shaped by research into comparable sites and each brand's tone, designed for both desktop and mobile.";

export const webDesign = [
  {
    label: "Tequila Brand Website",
    blurb: "A brand website concept for Leucadia 1875 tequila at Posse.io, designed for desktop and mobile.",
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

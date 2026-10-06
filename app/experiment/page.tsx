import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Reveal } from "@/components/case/reveal";
import { Journey, type JourneyEntry } from "@/components/experiment/journey";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person } from "@/lib/content";
import { LinkPreview } from "@/components/ui/link-preview";
import { ExpandCards, type ExpandCard } from "@/components/ui/expand-cards";
import { ExperimentHero } from "@/components/experiment/experiment-hero";

export const metadata: Metadata = {
  title: `Experiment — ${person.name}`,
  description: "Design experiments outside the case studies: student organizations, research, and an internship at NIO.",
};

// Layout follows jingjinghan.com/about: full-height greeting (with floating design-tool tiles), the zigzag journey
// timeline, and the Design Process cards. Sizes, spacing, and motion follow the reference; all wording is our own.
const P = "/images/experiment";

// Text only; photos appear only through the keyword pop-ups (entries that have photos).
const ENTRIES: JourneyEntry[] = [
  {
    n: "01",
    org: "Chinese Global Community (CGC)",
    role: "Publicity",
    when: "Sep 2024 – Jan 2025",
    text: (
      <>
        My first design home at UCSD. I made{" "}
        <Key src={`${P}/photo-6.jpg`} alt="CGC members at a daytime event with community banners">posters</Key> and{" "}
        <Key src={`${P}/photo-5.jpg`} alt="A large CGC group photo under string lights at night">social media content</Key>{" "}
        for a busy community, and learned to keep one visual voice across many small pieces, phone first.
      </>
    ),
  },
  {
    n: "02",
    org: "Runchina Company",
    role: "Design Assistant",
    when: "Feb 2025 – Jun 2025",
    text: (
      <>
        A marathon company, and my first taste of design for{" "}
        <Key src={`${P}/runchina.jpg`} alt="RunChina.Run branding: Project 3,000km+ and the Unbound Ultra-Run logo" width={240} height={139}>
          a real brand
        </Key>
        . I kept the race registration site up to date and designed Mathzoo, a mascot that gave the brand a friendly face.
      </>
    ),
  },
  {
    n: "03",
    org: "End of an Era",
    role: "UI/UX Designer",
    when: "Feb 2026 – May 2026",
    text: (
      <>
        I owned the UX for a third of a{" "}
        <Key src={`${P}/eoe-linkedin.jpg`} alt="End of an Era LinkedIn post announcing the Planning Party event" width={200} height={185}>
          financial workflow platform
        </Key>
        , turning dense business requirements into steps people could follow by untangling the information architecture
        until the flow felt obvious.
      </>
    ),
  },
  {
    n: "04",
    org: "CSSA",
    role: "Publicity Department",
    when: "Mar 2026 – Present",
    text: (
      <>
        These days I design the{" "}
        <Key src={`${P}/photo-1.jpg`} alt="At a CSSA event entrance, with illustrated stars">posters and invitations</Key> for
        CSSA&apos;s{" "}
        <Key src={`${P}/photo-7.jpg`} alt="The CSSA team on the steps in matching white T-shirts">biggest events</Key>, along
        with{" "}
        <Key src={`${P}/cssa-tote-bag.jpg`} alt="A burgundy UC San Diego welcome tote bag I designed for CSSA" width={180} height={177}>
          tote bags
        </Key>{" "}
        and slide backgrounds. Every event gets its own look, and a single image has to land before someone scrolls past.
      </>
    ),
  },
  {
    n: "05",
    org: "Cognitive Science Student Association",
    role: "UX Designer",
    when: "Mar 2026 – Jun 2026",
    text: (
      <>
        On the{" "}
        <Key src={`${P}/photo-2.jpg`} alt="Certificate of Completion from the Projects Program, 2026 Spring Project Showcase">
          Attention Project
        </Key>{" "}
        I looked at people before pixels. We{" "}
        <Key src={`${P}/photo-3.jpg`} alt="With a teammate after the showcase">
          researched attention and multitasking behavior
        </Key>
        , distilled clear pain points, and{" "}
        <Key src={`${P}/photo-4.jpg`} alt="The project team giving a thumbs up">presented</Key> at the Spring Project Showcase.
      </>
    ),
  },
  {
    n: "06",
    org: "Posse.io",
    role: "UI/UX Design Leader",
    when: "Apr 2026 – Jun 2026",
    text: (
      <>
        I took two products{" "}
        <Key src={`${P}/posse-linkedin.jpg`} alt="Posse.io company page on LinkedIn" width={250} height={129}>
          from zero to one
        </Key>
        : a wine brand website and a local magazine platform, now Homigo, across{" "}
        <Key src={`${P}/posse-website.jpg`} alt="The Posse website homepage: We build the systems that scale brands" width={260} height={146}>
          desktop and mobile
        </Key>
        . Competitive analysis set the strategy; a responsive design system kept both consistent.
      </>
    ),
  },
  {
    n: "07",
    org: "NIO",
    role: "Brand Management Intern (UX Design Focus)",
    when: "Jun 2026 – Sep 2026",
    text: (
      <>
        At NIO I designed{" "}
        <Key src={`${P}/photo-8.jpg`} alt="Setting up a work laptop on the first day">user flows</Key>, wireframes, and early UI
        concepts for the internal brand portal. I ran{" "}
        <Key src={`${P}/photo-9.jpg`} alt="Working session at the team table">content audits</Key> to find gaps in the
        information architecture, and{" "}
        <Key src={`${P}/photo-10.jpg`} alt="Onboarding presentation in the NIO office">worked with brand and design teams</Key>{" "}
        to make complex brand requirements navigable.
      </>
    ),
  },
];

const PROCESS: ExpandCard[] = [
  {
    title: "Discover",
    video: "/videos/process/discover.mp4",
    poster: "/images/process/discover.jpg",
    body: "I start by listening: goals, users, and their friction, uncovered through research and conversation.",
    glow: "green",
  },
  {
    // TODO: middle step wording to be confirmed.
    title: "Experiment",
    video: "/videos/process/experiment.mp4",
    poster: "/images/process/experiment.jpg",
    body: "I prototype several directions, test early, and keep what people respond to.",
    glow: "blue",
  },
  {
    title: "Deliver",
    video: "/videos/process/deliver.mp4",
    poster: "/images/process/deliver.jpg",
    body: "Polished designs and the reasoning behind them, ready to build without guessing.",
    glow: "orange",
  },
];

/** An organization name in the text: hover (or tap) to see a photo from that experience. */
function Key({
  src,
  alt,
  width,
  height,
  children,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  children: ReactNode;
}) {
  return (
    <LinkPreview
      imageSrc={src}
      alt={alt}
      width={width}
      height={height}
      className="font-medium text-white underline decoration-white/30 decoration-dotted underline-offset-[5px] transition-colors hover:decoration-white"
    >
      {children}
    </LinkPreview>
  );
}

export default function ExperimentPage() {
  return (
    <div id="top" className="relative min-h-screen bg-black text-white">
      <CreativeNav play hrefBase="/" />

      <main>
        {/* Greeting: the star-doodle photo on the left, heading on the right */}
        <ExperimentHero>
          <Reveal>
            <p className="font-gilroy mb-6 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.3em] text-white/45">
              <span className="dot-loop h-2 w-2 rounded-full" style={{ background: "var(--accent-green)" }} />
              Experiment
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-blinker whitespace-nowrap text-[clamp(34px,9.5vw,52px)] font-bold leading-[0.95] tracking-[-0.02em] md:text-[clamp(32px,3.9vw,76px)]">
              So nice to meet u!
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-sulphur mt-6 max-w-[520px] text-[clamp(18px,2vw,26px)] leading-snug text-white/70">
              The clubs, research, and internship behind my case studies. This is where I tried things out first.
            </p>
          </Reveal>
        </ExperimentHero>

        {/* Experiments */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <h2 className="font-blinker text-center text-[clamp(32px,6vw,72px)] font-medium uppercase leading-[0.95] tracking-[-0.02em]">
                My Experiments in Design
              </h2>
            </Reveal>
            <Journey entries={ENTRIES} />
          </div>
        </section>

        {/* Process */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1274px]">
            <Reveal>
              <p className="font-gilroy mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/50">
                <span className="dot-loop h-2 w-2 rounded-full" style={{ background: "var(--accent-green)" }} />
                How I work
              </p>
              <h2 className="font-blinker text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-[-0.03em]">Design Process</h2>
              <p className="font-sulphur mt-6 max-w-[760px] text-[clamp(18px,2.2vw,26px)] leading-snug text-white/70">
                Curious first, structured after: I learn the problem, try ideas out loud, and ship what holds up.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-16">
              <ExpandCards items={PROCESS} />
            </Reveal>
          </div>
        </section>
      </main>

      <CreativeCTA hrefBase="/" />
    </div>
  );
}

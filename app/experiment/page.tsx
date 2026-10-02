import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person } from "@/lib/content";
import { LinkPreview } from "@/components/ui/link-preview";

export const metadata: Metadata = {
  title: `Experiment — ${person.name}`,
  description: "Design experiments outside the case studies: student organizations, research, and an internship at NIO.",
};

// Structure follows jingjinghan.com/about: greeting → avatar with role tags → numbered timeline → process.
// TODO: a fourth role tag (still to be confirmed) — add it to ROLES.
const ROLES = [
  { label: "UX Designer", pos: "left-[2%] top-[14%]", tone: "#f5c84c" },
  { label: "UI Designer", pos: "right-[0%] top-[22%]", tone: "#b28cff" },
  { label: "Creative Technologist", pos: "left-[0%] bottom-[14%]", tone: "#ff8fc7" },
];

const P = "/images/experiment";
type Entry = { n: string; org: string; role: string; when: string; text: ReactNode };

// Text only; photos appear only through the keyword pop-ups (entries that have photos).
const ENTRIES: Entry[] = [
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
        for a community that was always planning the next thing, and learned to keep one visual voice across lots of small
        pieces, designed for the phone screen first.
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
        A marathon company, and my first taste of design for a real brand. I kept the race registration website accurate as
        details changed, and designed Mathzoo, a cartoon mascot who gave the brand a friendly face.
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
        I owned the UX for a third of a financial workflow platform, taking dense business requirements and turning them into
        steps people could follow. Most of the work was untangling information architecture and refining interactions until
        the flow felt obvious.
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
        with tote bags and presentation backgrounds. Every event gets its own look, and I&apos;m still learning how much a
        single image has to say before someone scrolls past it.
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
        I got to look at people before pixels. We{" "}
        <Key src={`${P}/photo-3.jpg`} alt="With a teammate after the showcase">
          researched attention and multitasking behavior
        </Key>
        , turned what we saw into clear pain points, and ended the quarter{" "}
        <Key src={`${P}/photo-4.jpg`} alt="The project team giving a thumbs up">presenting</Key> our findings at the Spring
        Project Showcase.
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
        I took two products from zero to one: a wine brand website and a local magazine platform, now Homigo, across desktop
        and mobile. Competitive analysis and user insights set the strategy, and a responsive design system with reusable
        components kept both consistent.
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
        <Key src={`${P}/photo-9.jpg`} alt="Working session at the team table">content audits</Key> across several brand
        platforms to find gaps in the information architecture, and{" "}
        <Key src={`${P}/photo-10.jpg`} alt="Onboarding presentation in the NIO office">collaborated with brand and design teams</Key>{" "}
        to turn complex brand requirements into something people could actually navigate.
      </>
    ),
  },
];

const PROCESS = [
  {
    t: "Discover",
    b: "I start by listening: goals, users, and the friction they live with, uncovered through research, audits, and conversation.",
    icon: "M11 4a7 7 0 1 0 4.4 12.4L20 21m-5-10a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  },
  {
    // TODO: middle step wording to be confirmed.
    t: "Experiment",
    b: "I sketch and prototype several directions side by side, test them early, and keep what people actually respond to.",
    icon: "M9 3h6M10 3v6L4 19a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 19l-6-10V3",
  },
  {
    t: "Deliver",
    b: "Clear, polished designs and the reasoning behind them, ready for the team to build without guessing.",
    icon: "M4 12l16-8-6 16-3-7-7-1z",
  },
];

/** An organization name in the text: hover (or tap) to see a photo from that experience. */
function Key({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  return (
    <LinkPreview
      imageSrc={src}
      alt={alt}
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
        {/* Greeting */}
        <section className="relative overflow-hidden px-6 pb-24 pt-36 text-center md:pb-32 md:pt-44">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[55%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[90px]"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)" }}
          />
          <Reveal>
            <p className="font-gilroy flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.3em] text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
              Experiment
            </p>
            <h1 className="font-blinker mx-auto mt-6 max-w-[16ch] text-[clamp(44px,7vw,104px)] leading-[0.98] tracking-[-0.03em]">
              Hey, thanks for stopping by.
            </h1>
            <p className="font-sulphur mx-auto mt-6 max-w-[40ch] text-[clamp(18px,2vw,24px)] leading-snug text-white/65">
              The work behind the case studies: the clubs, research, and internship where I tried things out.
            </p>
          </Reveal>
          <Reveal className="relative mx-auto mt-16 h-[300px] w-full max-w-[460px] md:h-[340px]">
            <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full p-[5px] md:h-[170px] md:w-[170px]" style={{ background: "linear-gradient(135deg,#3b82f6,#60a5fa)" }}>
              <Image src={person.avatar} alt={person.name} width={340} height={340} className="h-full w-full rounded-full object-cover" />
              <span className="font-gilroy absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#3b82f6] px-3 py-1 text-[13px] text-white">
                Hi! 👋
              </span>
            </div>
            {ROLES.map((r, i) => (
              <span
                key={r.label}
                className={`font-gilroy absolute ${r.pos} rounded-full px-3 py-1.5 text-[13px] font-medium text-black shadow-lg`}
                style={{ background: r.tone, animation: `float-tag 5s ease-in-out ${i * 0.8}s infinite` }}
              >
                {r.label}
              </span>
            ))}
          </Reveal>
        </section>

        {/* Experiments */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <Reveal className="text-center">
            <h2 className="font-blinker text-[clamp(36px,5vw,72px)] uppercase leading-none tracking-[-0.02em]">My Experiments in Design</h2>
          </Reveal>
          <ol className="relative mx-auto mt-20 max-w-[820px]">
            <span aria-hidden className="absolute left-[5px] top-0 h-full w-px bg-white/15" />
            {ENTRIES.map((e) => (
              <li key={e.n} className="relative mb-20 pl-12 last:mb-0 md:mb-24 md:pl-16">
                <span aria-hidden className="absolute left-[5px] top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-black" />
                <Reveal>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-gilroy text-[13px] tabular-nums text-white/40">{e.n}</span>
                    <span className="font-gilroy text-[13px] uppercase tracking-[0.15em] text-white/40">{e.when}</span>
                  </div>
                  <h3 className="font-blinker mt-2 text-[clamp(26px,3vw,40px)] uppercase leading-[1.05]">{e.org}</h3>
                  <p className="font-gilroy mt-3 text-[14px] uppercase tracking-[0.15em] text-[var(--accent-green)]">{e.role}</p>
                  <p className="font-gilroy mt-5 text-[17px] leading-[1.85] text-white/70 md:text-[18px]">{e.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Process */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="font-gilroy flex items-center gap-2 text-[12px] uppercase tracking-[0.3em] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                How I work
              </p>
              <h2 className="font-blinker mt-4 text-[clamp(36px,5vw,72px)] leading-none tracking-[-0.02em]">Design Process</h2>
              <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(17px,1.8vw,22px)] leading-snug text-white/65">
                Curious first, structured after: I learn the problem, try ideas out loud, and ship what holds up.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {PROCESS.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-[18px] border border-white/10 bg-white/[0.03] p-7">
                    <span className="grid h-10 w-10 place-items-center rounded-[10px] border border-white/15">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                        <path d={s.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h3 className="font-blinker mt-6 text-[28px] leading-tight">{s.t}</h3>
                    <p className="font-gilroy mt-3 text-[15px] leading-[1.65] text-white/60">{s.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CreativeCTA hrefBase="/" />
    </div>
  );
}

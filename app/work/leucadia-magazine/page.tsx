import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import {
  Achievements,
  FlowCompare,
  IssueBars,
  ProcessTable,
  type PageShot,
} from "@/components/case/compare";
import { BigSequence, Chip, Container, Eyebrow, P, Q, Section, Stack, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { Reveal } from "@/components/case/reveal";
import { GlowCard } from "@/components/ui/spotlight-card";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { AnnotatedPage, type PageView } from "@/components/case/annotated-page";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person, selectedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `Leucadia Magazine Website Redesign — ${person.name}`,
  description:
    "Transforming a cluttered, outdated local magazine website into a clear, cohesive digital publishing experience.",
};

const NAV: CaseNavItem[] = [
  { id: "process", index: "01", label: "Design Process" },
  { id: "research", index: "02", label: "Research" },
  { id: "discovery", index: "03", label: "Discovery" },
  { id: "prototyping", index: "04", label: "Prototyping" },
  { id: "color", index: "05", label: "Inspiration & Color" },
  { id: "final", index: "06", label: "Final Design" },
  { id: "achievement", index: "07", label: "Achievement" },
];

const SCOPE = ["User Research", "Information Architecture", "User Flow", "Visual Design", "Website Redesign"];

const L = "/images/leucadia";
const OLD = {
  home: { src: `${L}/old-home.webp`, alt: "Original Leucadia Magazine homepage" },
  technology: { src: `${L}/old-technology.webp`, alt: "Original Technology page with a single video embed" },
  photos: { src: `${L}/old-photos.webp`, alt: "Original Photos page" },
  contact: { src: `${L}/old-contact.webp`, alt: "Original generic Contact form" },
} satisfies Record<string, PageShot>;
const NEW = {
  home: { src: `${L}/new-home.webp`, alt: "Redesigned homepage" },
  archive: { src: `${L}/new-archive.webp`, alt: "Redesigned Editorial Archive page" },
  submit: { src: `${L}/new-submit.webp`, alt: "Submit Your Business form" },
  preview: { src: `${L}/new-preview.webp`, alt: "Submission Preview screen" },
  confirm: { src: `${L}/new-confirm.webp`, alt: "Submission confirmation screen" },
  contact: { src: `${L}/new-contact.webp`, alt: "Redesigned Contact page" },
} satisfies Record<string, PageShot>;

// Full-page screenshots with annotations. `at` = [start, end] of the section, as a fraction of the image height.
const VIEWS: Record<string, PageView[]> = {
  home: [
    {
      tab: "Before · Homepage",
      tone: "before",
      ...OLD.home,
      w: 1800,
      h: 4783,
      width: 860,
      notes: [
        { at: [0, 0.03], title: "Five tabs, no submissions", text: "Nowhere for a business to get featured." },
        { at: [0.03, 0.245], title: "Hero with mixed type", text: "Outlined, filled, and rotated type compete in one banner." },
        { at: [0.25, 0.305], title: "A dense intro block", text: "Distribution, audience, and a pitch in one paragraph." },
        { at: [0.31, 0.56], title: "A video without context", text: "No title or caption explains what the video is." },
        { at: [0.56, 0.61], title: "Repeating category bubbles", text: "The same categories appear twice, leading nowhere." },
        { at: [0.61, 0.74], title: "Technology pitch", text: "A merchant ad pitch mixed into reader content." },
        { at: [0.74, 0.815], title: "Sponsor block", text: "An unrelated sponsor mid-page." },
        { at: [0.82, 0.97], title: "Eight collapsed FAQs", text: "Styled unlike anything else on the page." },
      ],
    },
    {
      tab: "After · Homepage",
      tone: "after",
      ...NEW.home,
      w: 1800,
      h: 7292,
      width: 860,
      notes: [
        { at: [0, 0.035], title: "Four-part navigation", text: "The new architecture, on every page." },
        { at: [0.035, 0.145], title: "Editorial hero", text: "One strong photo and the masthead set the tone." },
        { at: [0.145, 0.18], title: "Mission statement", text: "“We believe every local business has a story worth telling.”" },
        { at: [0.18, 0.345], title: "Our Editorial Mission", text: "What the magazine is and how it works." },
        { at: [0.345, 0.5], title: "Featured video", text: "The issue video, now with context." },
        { at: [0.52, 0.66], title: "Join Us Now", text: "Where the submission flow starts." },
        { at: [0.67, 0.85], title: "Ask Us Anything", text: "Four FAQs on who can be featured." },
        { at: [0.86, 1], title: "Email sign-up and social", text: "A consistent black footer closes every page." },
      ],
    },
  ],
  archive: [
    {
      tab: "Before · Technology",
      tone: "before",
      ...OLD.technology,
      w: 1800,
      h: 1177,
      width: 860,
      notes: [
        { at: [0.03, 0.11], title: "Old navigation", text: "A top-level page that says little." },
        { at: [0.14, 0.2], title: "Just a title", text: "“Our Technology,” with no explanation after it." },
        { at: [0.21, 0.8], title: "A single video embed", text: "The page's only content, with no caption or context." },
      ],
    },
    {
      tab: "Before · Photos",
      tone: "before",
      ...OLD.photos,
      w: 1800,
      h: 2276,
      width: 860,
      notes: [
        { at: [0.01, 0.06], title: "Old navigation", text: "Photos is separate from the magazine itself." },
        { at: [0.11, 0.37], title: "Spreads as a photo list", text: "Spreads shown one by one, cut off from their issue." },
        { at: [0.37, 0.53], title: "Camera specs as captions", text: "Captions list cameras, not stories." },
        { at: [0.56, 1], title: "No way into an issue", text: "Nothing links to reading the magazine." },
      ],
    },
    {
      tab: "After · Archive",
      tone: "after",
      ...NEW.archive,
      w: 1800,
      h: 5052,
      width: 860,
      notes: [
        { at: [0.035, 0.235], title: "Editorial Archive hero", text: "Past issues get one clear home." },
        { at: [0.255, 0.31], title: "About the Magazine", text: "What Leucadia Magazine celebrates." },
        { at: [0.32, 0.49], title: "Video, in context", text: "The same video, now introduced." },
        { at: [0.515, 0.555], title: "Our Publications", text: "Print · Digital · Community-Driven." },
        { at: [0.56, 0.77], title: "Issue 01 and Issue 02", text: "Each cover links straight to “Open Digital Magazine.”" },
        { at: [0.8, 1], title: "Consistent footer", text: "The same sign-up block as every page." },
      ],
    },
  ],
  submission: [
    {
      tab: "Before · Contact form",
      tone: "before",
      ...OLD.contact,
      w: 1800,
      h: 1174,
      width: 860,
      notes: [
        { at: [0.08, 0.12], title: "Submission isn't a destination", text: "Businesses had to guess that Contact was the way in." },
        { at: [0.25, 0.45], title: "A generic form", text: "Nothing for business details or images." },
        { at: [0.46, 0.52], title: "Send, then nothing", text: "No review and no confirmation." },
      ],
    },
    {
      tab: "01 · Enter information",
      tone: "after",
      ...NEW.submit,
      phone: true,
      w: 1720,
      h: 5359,
      width: 860,
      notes: [
        { at: [0.035, 0.22], title: "Submit Your Business", text: "A dedicated page, linked from the nav and homepage." },
        { at: [0.235, 0.275], title: "What happens to a submission", text: "Every entry is reviewed by the editorial team." },
        { at: [0.29, 0.52], title: "Business details", text: "Name, category, location, and links." },
        { at: [0.535, 0.62], title: "About Your Business", text: "The story in the business's own words, 500 words max." },
        { at: [0.63, 0.76], title: "Upload images", text: "Drag and drop, with file types and a 10MB limit." },
        { at: [0.775, 0.8], title: "Preview & Submit", text: "Goes to review instead of sending blind." },
      ],
    },
    {
      tab: "02 · Review",
      tone: "after",
      ...NEW.preview,
      phone: true,
      w: 1720,
      h: 5068,
      width: 860,
      notes: [
        { at: [0.26, 0.6], title: "Submission Preview", text: "Everything entered, to check before sending." },
        { at: [0.6, 0.73], title: "Uploaded media", text: "A gallery of the uploaded images." },
        { at: [0.74, 0.78], title: "Edit or submit", text: "Go back to edit, or submit when it's right." },
      ],
    },
    {
      tab: "03 · Confirm",
      tone: "after",
      ...NEW.confirm,
      phone: true,
      w: 1720,
      h: 3134,
      width: 860,
      notes: [
        { at: [0.42, 0.56], title: "Confirmation", text: "“Your business has been submitted!” plus next steps." },
        { at: [0.58, 0.63], title: "Finished", text: "A clear end to the flow." },
      ],
    },
  ],
  contact: [
    {
      tab: "Before · Contact",
      tone: "before",
      ...OLD.contact,
      w: 1800,
      h: 1174,
      width: 860,
      notes: [
        { at: [0.14, 0.22], title: "Default page title", text: "No imagery or introduction." },
        { at: [0.26, 0.5], title: "Unstyled form", text: "Default fields, off-brand blue button." },
        { at: [0.55, 0.95], title: "Empty space", text: "Half the page is left blank." },
      ],
    },
    {
      tab: "After · Contact",
      tone: "after",
      ...NEW.contact,
      w: 1428,
      h: 2582,
      width: 860,
      notes: [
        { at: [0.06, 0.36], title: "Full-bleed photography", text: "The site's editorial look." },
        { at: [0.37, 0.4], title: "Explanatory copy", text: "“If you have any question, feel free to contact us!”" },
        { at: [0.4, 0.63], title: "A clean form", text: "Name, email, phone, and comments, on-brand." },
        { at: [0.65, 0.69], title: "Branded Submit", text: "A black button matching every other action." },
      ],
    },
  ],
};

const MORE = selectedWork.filter((w) => w.label !== "Posse.io");
const isExternal = (href: string) => /^https?:\/\//.test(href);

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      <div className="font-gilroy text-[17px] leading-[1.6] text-neutral-300 md:text-[19px]">{children}</div>
    </div>
  );
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-white/10 py-9">
      <Reveal className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
        <h3 className="font-gilroy text-[13px] uppercase tracking-[0.25em] text-neutral-500">{label}</h3>
        <div className="flex flex-col gap-5">{children}</div>
      </Reveal>
    </div>
  );
}

/** A heading + short text beside it, then a full-width visual. */
function Flow({ label, title, text, children }: { label: string; title: ReactNode; text: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-white/[0.08] pt-12 md:pt-16">
      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
        <div>
          <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
          <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
            {title}
          </h3>
        </div>
        <div className="flex flex-col gap-5">{text}</div>
      </Reveal>
      <Reveal className="mt-10 md:mt-14">{children}</Reveal>
    </div>
  );
}

/** A framed statement with the cursor-following spotlight border (components/ui/spotlight-card). */
function GlowBox({ label, color = "blue", children }: { label: string; color?: "blue" | "green"; children: ReactNode }) {
  return (
    <GlowCard customSize glowColor={color} className="!block w-full !p-6 md:!p-8">
      <span
        className="font-gilroy relative z-10 text-[12px] uppercase tracking-[0.25em]"
        style={{ color: color === "green" ? "#22c55e" : "var(--accent-green)" }}
      >
        {label}
      </span>
      <p className="font-sulphur relative z-10 mt-3 text-[clamp(19px,1.8vw,25px)] leading-[1.35] tracking-[-0.01em] text-white">
        {children}
      </p>
    </GlowCard>
  );
}

export default function LeucadiaCaseStudy() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-black">
        <Image
          src={`${L}/cover.jpg`}
          alt="The redesigned Leucadia Magazine homepage on a laptop"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.45)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#3b82f6" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* Title */}
          <section className="pt-14 md:pt-20">
            <Container>
              <div className="mb-10">
                <BackLink
                  href="/#work"
                  className="font-gilroy inline-flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-white"
                >
                  <span>←</span>Back to work
                </BackLink>
              </div>
              <Reveal>
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">Leucadia Magazine · Website Redesign</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(36px,6vw,88px)] font-medium leading-[0.98] tracking-[-0.01em] text-white">
                  From a cluttered site to a real digital magazine
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  Turning a cluttered local magazine website into a clear digital publication.
                </p>
              </Reveal>
            </Container>
          </section>

          {/* Intro + metadata */}
          <section className="pb-16 pt-12 md:pt-16">
            <Container>
              <Reveal>
                <div className="font-gilroy max-w-[68ch] text-[clamp(20px,2.4vw,28px)] leading-[1.5] tracking-[-0.01em] text-neutral-100">
                  <p>
                    Leucadia Magazine shares local stories, culture, and businesses from a coastal community. I led the
                    end-to-end redesign, turning a cluttered site into a professional digital publication — with a clear
                    path for local businesses to get featured.
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Client">Leucadia Magazine</Meta>
                <Meta label="Role">UI/UX Design Lead</Meta>
                <Meta label="Timeline">May 2026 – June 2026</Meta>
                <Meta label="Platform">Website</Meta>
              </div>
            </Container>
          </section>

          <section className="py-8">
            <Container>
              <InfoRow label="My Role">
                <P>
                  Sole UI/UX designer, from research and information architecture to visual design and usability testing.
                </P>
                <div className="flex flex-wrap gap-2">
                  {SCOPE.map((r) => (
                    <Chip key={r} variant="role">
                      {r}
                    </Chip>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="The Problem">
                <GlowBox label="The problem">
                  Local businesses had no way to submit content, only a generic contact form, so the magazine struggled to grow its
                  contributors.
                </GlowBox>
              </InfoRow>
              <InfoRow label="The Solution">
                <P>
                  A clear <Q>four-part architecture</Q> built on the user journey, and a black-and-white editorial design system.
                </P>
              </InfoRow>
            </Container>
          </section>

          {/* Solution at a glance */}
          <section className="pb-section md:pb-section-lg">
            <Container>
              <Stack>
                <div>
                  <Eyebrow>Architecture</Eyebrow>
                  <BigSequence steps={["Home", "Archive", "Submit", "Contact"]} />
                </div>
                <div>
                  <Eyebrow>User journey</Eyebrow>
                  <p className="font-sulphur text-[clamp(20px,2.2vw,30px)] leading-[1.3] text-neutral-300">
                    Awareness → Interest → Submission → Contact
                  </p>
                </div>
              </Stack>
            </Container>
          </section>

          {/* 01 — DESIGN PROCESS */}
          <WideSection id="process" index="01" label="Design Process" title="Two months, from interviews to tested pages.">
            <Reveal>
              <ProcessTable
                rows={[
                  { phase: "Discovery & Research", focus: "Understand pain points", methods: "Interviews, site audit", deliverables: "Interview synthesis, problem framing" },
                  { phase: "Information Architecture", focus: "Define structure", methods: "Hand-sketched user flows", deliverables: "4-section IA, user flow diagram" },
                  { phase: "Wireframing", focus: "Structure content per page", methods: "Low-fidelity wireframes", deliverables: "Wireframes for all four pages" },
                  { phase: "Visual Design", focus: "Establish brand system", methods: "High-fidelity mockups", deliverables: "Editorial visual system, full pages" },
                  { phase: "Usability Testing", focus: "Validate the redesign", methods: "Task-based testing", deliverables: "Test findings, final refinements" },
                ]}
              />
            </Reveal>
          </WideSection>

          {/* 02 — RESEARCH */}
          <Section id="research" index="02" label="Research" title="Listening to the team — and the businesses it wants to feature.">
            <P>
              I interviewed the Leucadia team and local business owners, the people expected to submit content.
            </P>
            <div>
              <Eyebrow>Existing-site audit</Eyebrow>
              <P>
                I audited the four existing pages, annotated in Final Design.
              </P>
            </div>
            <div>
              <Eyebrow>Share of reported issues</Eyebrow>
              <P>Over 90% of participants raised the same core issues:</P>
              <div className="mt-6">
                <IssueBars
                  items={[
                    { label: "Disorganized / cluttered information", value: 32 },
                    { label: "Confusing site structure", value: 24 },
                    { label: "No clear submission entry point", value: 24 },
                    { label: "Outdated visual style", value: 20 },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Eyebrow className="mb-0">What I heard</Eyebrow>
              <StaggerTestimonials
                items={[
                  { quote: "“I don't know where to start browsing when I open the website.”", by: "Interview participant" },
                  { quote: "“Everything is crammed together, there's no clear focus.”", by: "Interview participant" },
                  { quote: "“If this is supposed to be a magazine, I want it to actually look like one.”", by: "Interview participant" },
                  { quote: "“I have no idea where local businesses are supposed to submit their content.”", by: "Interview participant" },
                ]}
              />
            </div>
            <GlowBox label="Key Insight">
              The biggest blocker to growth wasn&apos;t aesthetics. Businesses <Q>could not find a way to submit</Q>. The
              fix had to be structural, not just visual.
            </GlowBox>
          </Section>

          {/* 03 — DISCOVERY */}
          <WideSection id="discovery" index="03" label="Discovery" title="Mapping the path a business would take — and where it ended.">
            <Reveal>
              <FlowCompare
                before={{
                  title: "No dedicated submission path",
                  steps: [
                    { page: "Homepage", label: "Five tabs, none for submissions" },
                    { page: "Contact", label: "A generic form: name, email, phone, comment" },
                  ],
                  deadEnd: "No sign submissions were possible",
                }}
                after={{
                  title: "Submit is its own entry point",
                  steps: [
                    { page: "Homepage", label: "“Join Us Now” section and Submit in the nav" },
                    { page: "Submit", label: "Enter business information and images" },
                    { page: "Preview", label: "Review everything before sending" },
                    { page: "Confirmation", label: "“Your business has been submitted!”" },
                  ],
                }}
              />
            </Reveal>
            <GlowBox label="Opportunity" color="green">
              Making <Q>Submit</Q> a first-class nav item turned an invisible feature into the site&apos;s main conversion path.
            </GlowBox>
          </WideSection>

          {/* 04 — PROTOTYPING */}
          <Section id="prototyping" index="04" label="Prototyping" title="Sketching the structure before the style.">
            <P>
              Hand-drawn wireframes mapped the four sections and the Submission flow before any high-fidelity work.
            </P>
            <GlowBox label="Why sketch first">
              It let me test the flow logic with the team before investing in polish.
            </GlowBox>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/leucadia/sketch.jpg"
                alt="Hand-drawn user flow and wireframes for the Homepage, Publications, Submission, and Contact pages"
                width={920}
                height={1086}
                loading="lazy"
                className="mx-auto block h-auto w-full max-w-[640px] rounded-[14px]"
              />
              <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                The user flow above wireframes for Homepage, Publications, Submission, and Contact.
              </figcaption>
            </figure>
          </Section>

          {/* 05 — FINAL DESIGN */}
          {/* 05 — INSPIRATION & COLOR */}
          <Section id="color" index="05" label="Inspiration & Color" title="Black and white, and a photo before the menu.">
            <P>
              Looking at the local magazine sites that felt most polished, I kept seeing the same choice: a strict, minimal
              palette of black and white. That restraint lets the photography carry the color and gives the publication a
              premium, editorial feel, so I made <Q>black and white</Q> the core of the visual system.
            </P>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/leucadia/palette.webp"
                alt="The color palette: white #FFFFFF and black #000000, side by side"
                width={1200}
                height={1036}
                loading="lazy"
                className="mx-auto block h-auto w-full max-w-[560px] rounded-[14px] border border-white/10"
              />
              <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                The palette: white #FFFFFF and black #000000.
              </figcaption>
            </figure>
            <GlowBox label="A small detail: the menu">
              On every page, opening the menu first reveals a full-bleed photo of the local coastline, taken by the
              magazine itself, before the navigation appears. The two-step reveal makes the site feel more considered, and
              it shows local businesses the quality of the magazine&apos;s photography up front, a quiet reason to want to
              be featured.
            </GlowBox>
          </Section>

          <WideSection id="final" index="06" label="Final Design" title="Two flows: discovering the magazine, and getting featured in it.">
            <Flow
              label="Flow 1: Content discovery"
              title="A homepage with a clear editorial mission."
              text={
                <P>
                  Modular sections replace one dense block.
                </P>
              }
            >
              <AnnotatedPage views={VIEWS.home} />
            </Flow>
            <Flow
              label="Flow 1: Content discovery"
              title="An archive readers can actually browse."
              text={
                <P>
                  Both published issues open directly from <Q>Our Publications</Q>, replacing a page that held one video.
                </P>
              }
            >
              <AnnotatedPage views={VIEWS.archive} />
            </Flow>
            <Flow
              label="Flow 2: Business submission"
              title="A guided, three-step path to get featured."
              text={
                <>
                  <P>Before, the only way in was the generic contact form.</P>
                  <ol className="flex flex-col gap-4">
                    {[
                      ["Enter information", "Business details, an “About” story, and images."],
                      ["Review", "A preview of everything, editable."],
                      ["Confirm", "A confirmation screen that closes the loop."],
                    ].map(([t, b], i) => (
                      <li key={t} className="grid grid-cols-[36px_1fr] gap-3 border-t border-white/10 pt-4">
                        <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="font-blinker block text-[18px] font-medium text-white">{t}</span>
                          <span className="font-gilroy mt-1.5 block text-[15px] leading-[1.6] text-neutral-400">{b}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              }
            >
              <AnnotatedPage views={VIEWS.submission} />
            </Flow>
            <Flow
              label="Contact"
              title="Even the utility page belongs to the brand."
              text={
                <P>
                  Photography, clear copy, and a branded button turn a bare form into part of the site.
                </P>
              }
            >
              <AnnotatedPage views={VIEWS.contact} />
            </Flow>
          </WideSection>

          {/* 06 — ACHIEVEMENT */}
          <WideSection id="achievement" index="07" label="Achievement" title="A site that works like a magazine — and grows like one.">
            <Reveal>
              <Achievements
                items={[
                  {
                    stat: "100%",
                    label: "Usability test approval",
                    body: "Every participant approved, reporting faster tasks and clearer structure.",
                  },
                  {
                    stat: "3-step",
                    label: "Guided submission flow",
                    body: "A clear path to get featured, replacing one vague form.",
                  },
                  {
                    stat: "4",
                    label: "Section architecture",
                    body: "A scalable structure, minus the clutter.",
                  },
                ]}
              />
            </Reveal>
          </WideSection>

          {/* REFLECTION */}
          <section className="border-t border-white/[0.08] py-24 md:py-36">
            <Container>
              <Reveal className="flex flex-col items-center text-center">
                <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Reflection</span>
                <p className="font-sulphur mt-8 max-w-[34ch] text-[clamp(26px,3.4vw,48px)] leading-[1.2] tracking-[-0.01em] text-white">
                  For content-driven products, information architecture matters more than polish.
                </p>
                <p className="font-gilroy mt-8 max-w-[56ch] text-[17px] leading-[1.7] text-neutral-400 md:text-[19px]">
                  The biggest impact came not from the visuals, but from{" "}
                  <Q>a submission path that simply didn&apos;t exist before</Q>.
                </p>
              </Reveal>
            </Container>
          </section>
        </div>

        <div className="border-t border-white/[0.08] px-gutter py-16 md:px-gutter-lg md:py-20">
          <BackToTop />
        </div>

        {/* More work */}
        <section id="case-more" className="border-t border-white/[0.08] bg-[#0e0e0e] py-24 md:py-32">
          <Container>
            <Reveal>
              <h2 className="font-blinker text-center text-[clamp(32px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
                Curious to see more?
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
              {MORE.map((w, i) => (
                <Reveal key={w.label} delay={i * 0.08}>
                  <a
                    href={w.href}
                    {...(isExternal(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-cursor="view"
                    className="group block"
                  >
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[18px] border border-white/10 bg-neutral-800">
                      <Image
                        src={w.image}
                        alt={w.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 620px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: w.imagePosition }}
                      />
                    </div>
                    <p className="font-gilroy mt-4 text-[14px] uppercase tracking-[0.2em] text-neutral-400">{w.label}</p>
                    <h3 className="font-blinker mt-1 text-[clamp(22px,2.6vw,32px)] font-medium leading-tight text-white transition-colors group-hover:text-neutral-400">
                      {w.title}
                    </h3>
                  </a>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <div className="relative z-10">
        <CreativeCTA hrefBase="/" />
      </div>
    </div>
  );
}

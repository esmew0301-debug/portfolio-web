import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import {
  BigSequence,
  Cards,
  Chip,
  ChipFlow,
  ChipGroup,
  Container,
  Contrast,
  Eyebrow,
  P,
  Pull,
  Section,
  Stack,
  Box,
  Statement,
  Utterance,
  WideSection,
} from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { ShinyButton } from "@/components/ui/shiny-button";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { Reveal } from "@/components/case/reveal";
import { StageFlow } from "@/components/case/stage-flow";
import { FlowPanel, PhoneStory, Shot, Slideshow, type Screen } from "@/components/case/visuals";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person, selectedWork } from "@/lib/content";
import PHONES from "@/lib/trip-phones.json";

export const metadata: Metadata = {
  title: `From Navigation to Intention — ${person.name}`,
  description:
    "Designing an AI-powered trip planning experience that turns what drivers want to do into a complete, adaptive journey.",
};

const NAV: CaseNavItem[] = [
  { id: "problem", index: "01", label: "The Problem" },
  { id: "research", index: "02", label: "Research" },
  { id: "insights", index: "03", label: "Key Insights" },
  { id: "principles", index: "04", label: "Design Principles" },
  { id: "color", index: "05", label: "Color & Materials" },
  { id: "shift", index: "06", label: "The Design Shift" },
  { id: "wireframes", index: "07", label: "Low-Fidelity Flows" },
  { id: "concept", index: "08", label: "AI Trip Planning" },
  { id: "phone", index: "09", label: "Planning on the Phone" },
  { id: "handoff", index: "10", label: "Past Trips" },
  { id: "in-car", index: "11", label: "The In-Car Plan" },
  { id: "driving", index: "12", label: "While Driving" },
  { id: "adapt", index: "13", label: "Adaptive Planning" },
  { id: "final", index: "14", label: "Final Experience" },
  { id: "reflection", index: "15", label: "Reflection" },
];

const ROLES = [
  "UX/UI Designer",
  "User Research",
  "Interaction Design",
  "Information Architecture",
  "Product Strategy",
  "Prototyping",
];

const COMPETITORS = [
  { name: "Tesla", finding: "Strong navigation, but planning starts after the destination is known." },
  {
    name: "Xiaomi",
    finding:
      "Strong AI planning, but better at generating destinations than coordinating a trip as intent changes.",
  },
  { name: "Lucid", finding: "A polished interface with AI-assisted navigation, but limited proactive trip planning." },
  { name: "Mercedes", finding: "Advanced conversational AI, but trip planning remains destination-driven." },
];

const PRINCIPLES = [
  { title: "Context-aware information", body: "Show what the current stage of the trip needs, not everything at once." },
  { title: "Low-attention interaction", body: "Every step costs minimal attention, especially once the car is moving." },
  { title: "Proactive but explainable AI", body: "Suggest before being asked, and show why it fits." },
  { title: "Predictable personalization", body: "Preferences shape the plan in ways the driver can predict and override." },
  { title: "Clear information hierarchy", body: "One primary decision at a time; detail only when needed." },
];

// Screens, on a shared scale per device so frames of a sequence line up.
// In-vehicle frames: an 882px-wide display. Phone frames: 1000px tall.
const S = "/images/trip-planning";
const hu = (name: string, w: number, h: number, alt: string, step?: string): Screen => ({
  src: `${S}/${name}.webp`,
  w,
  h,
  alt,
  step,
});
// Size (1000-tall units) and corner radii of each trimmed phone image, from tools/trim_phone_canvas.py.
const ph = (name: keyof typeof PHONES, alt: string, step: string, detail: string): Screen => ({
  src: `${S}/phone-${name}.webp`,
  ...PHONES[name],
  alt,
  step,
  detail,
});

const PHONE_PREFS_EXPRESS = ph("prefs-1",
  "Trip-planning preferences: place types, Favorites and Calendar quick-add, Less Driving and Lower Cost",
  "",
  "",
);
const PHONE_PREFS_PLAN = ph("prefs-2", "AI-prepared route with five stops based on the user's preferences", "", "");

const PHONE_MANUAL = [
  ph("manual-1", "Manual trip planning with Search To Add, categories, and previous preferences", "Start a plan", "Skip AI and planning opens here: search, categories, and places from past trips."),
  ph("manual-2", "Search field with the keyboard open", "Search for a place", "Type a name like Starbucks; recent places appear below."),
  ph("manual-3", "Nearby Starbucks locations on the map with an Add button", "Pick a nearby location", "Nearby Starbucks appear with rating, hours, price, and drive time. Tap Add."),
  ph("manual-4", "Route to Starbucks with total driving time and Save and Add buttons", "Save, or keep going", "The route appears with total driving time. Save ends planning; Add returns for another stop."),
  ph("manual-5", "Trip-planning screen again with Starbucks checked as the first stop", "Add the next stop", "Starbucks is checked off; the next stop can be a restaurant, coffee, or a hotel."),
];

const PHONE_AI = [
  ph("ai-1", "Natural-language request to go to the airport and then a seafood dinner", "Describe the day", "Tap the AI orb and say it: coffee, the airport to pick up a friend, then a seafood dinner."),
  ph("ai-2", "AI-suggested restaurants that match the request and preferences, with Add buttons", "Review what AI suggests", "AI suggests restaurants that fit the request and past preferences. Add one."),
  ph("ai-3", "AI optimizing the route for the departure time", "AI builds the route", "AI orders the stops around the departure time, avoiding traffic."),
  ph("ai-4", "Full route through Starbucks, the airport, and the restaurant with total driving time", "The finished trip", "The whole day on one route, with total driving time."),
  ph("ai-5", "Save sheet with Add Title, Add Color, and Add Description", "Save it", "Give the trip a title, a color, and a description."),
];

const PHONE_SCHEDULE = [
  ph("schedule-1", "August schedule with each day's color, stops, and location, and Make A Plan on today", "Open the schedule", "Every planned day with its color, stops, and location. Any future date can be planned here."),
  ph("schedule-2", "Saturday's saved trip with its stops, times, and total driving time", "Today's trip", "The saved trip, stop by stop, with times between each."),
  ph("schedule-3", "July schedule grouped by week with a Today button", "Browse by week", "Other weeks fold into groups; Today jumps back."),
  ph("schedule-4", "July days expanded to show each route's stops", "Open a day", "Tap a day to open its route, stop by stop."),
  ph("schedule-5", "Detailed Dating Day view with map, places, driving time, and battery usage", "Tap again for the full details", "Tap again for the full route: map, places, driving time, and battery usage."),
];

const HU_MANUAL = [
  hu("manual-1", 882, 552, "Trip plan panel with Lofty Coffee selected", "Open the trip plan and select a stop"),
  hu("manual-2", 882, 508, "Trip plan search field with the on-screen keyboard open", "Search to replace it"),
];

const HU_AI = [
  hu("ai-1", 882, 538, "Request to replace the third stop with a highly rated Italian restaurant", "Ask AI for a change"),
  hu("ai-2", 1052, 539, "AI evaluating nearby Italian restaurants", "AI finds the best match"),
  hu("ai-3", 882, 558, "Bencotto Italian Kitchen proposed in the trip plan with Save Changes", "Review and save"),
  hu("ai-4", 882, 542, "Updated trip plan with the new restaurant and route", "Itinerary updated"),
];

const HU_ADD_STOP = [
  hu("add-stop-1", 882, 508, "Search To Add field between two stops in the itinerary", "Choose where to add"),
  hu("add-stop-2", 882, 508, "Starbucks locations along the route", "Nearby Starbucks on the route"),
  hu("add-stop-3", 882, 508, "Selected Starbucks with its detour and place card", "Pick one, preview the detour"),
  hu("add-stop-4", 882, 508, "Updated itinerary with Starbucks between La Jolla Cove and Lofty Coffee", "Stop inserted"),
];

const HU_PARKING = [hu("parking", 882, 508, "Parking lots marked around La Jolla Cove", "Parking near the stop")];

const HU_CHARGING = [
  hu("charging-1", 1057, 508, "AI reporting low battery and two charging options along the route", "Battery low: AI finds two options"),
  hu("charging-2", 882, 508, "Charging stations along the route, with the recommended one marked by a yellow star", "The recommended charger is starred"),
  hu("charging-3", 882, 508, "Navigation rerouted to the chosen charging station", "Route to the charger"),
  hu("charging-4", 882, 508, "Driving view with navigation to the charger", "Then on to the next stop"),
];

const HU_ADAPT = [
  hu("adapt-1", 1053, 508, "AI warning that Lofty Coffee will be closed on arrival", "The next stop will be closed"),
  hu("adapt-2", 882, 508, "Coastal Table suggested as an open alternative", "An open alternative"),
  hu("adapt-3", 882, 508, "Revised route with navigation started", "New route, navigation starts"),
];

const MORE = selectedWork.filter((w) => w.label === "Posse.io" || w.label === "End of an Era");

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

/** A chapter inside a wide section: heading and short text side by side, then a full-width visual. */
function Chapter({ label, title, text, children }: { label: string; title: ReactNode; text: ReactNode; children?: ReactNode }) {
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
      {children && <Reveal className="mt-10 md:mt-14">{children}</Reveal>}
    </div>
  );
}

/** Key phrase: the TextShimmer sweep, recoloured to the HMI navy. */
function Shimmer({ children }: { children: string }) {
  return (
    <TextShimmer as="span" duration={2.6} spread={1.2} className="shimmer-hmi inline font-semibold">
      {children}
    </TextShimmer>
  );
}

function TwoCol({ children }: { children: ReactNode }) {
  return <div className="grid gap-9 md:grid-cols-2 md:gap-16">{children}</div>;
}

export default function TripPlanningCaseStudy() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-black">
        <Image
          src="/images/trip-planner-hero2.jpg"
          alt="The trip-planning map on an angled in-car display"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_52%]"
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
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">AI Trip Planning · Automotive HMI</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(36px,6vw,88px)] font-medium leading-[0.98] tracking-[-0.01em] text-white">
                  From Navigation to Intention
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  An AI trip planner that turns what drivers want to do into a complete, adaptive journey.
                </p>
              </Reveal>
            </Container>
          </section>

          {/* Intro + metadata */}
          <section className="pb-16 pt-12 md:pt-16">
            <Container>
              <Reveal>
                <div className="font-gilroy max-w-[68ch] space-y-6 text-[clamp(20px,2.4vw,28px)] leading-[1.5] tracking-[-0.01em] text-neutral-100">
                  <p>
                    This project started as an exploration of automotive HMI: how drivers handle information on the road.
                  </p>
                  <p>
                    It became an AI system that plans the trip around what the driver wants, and keeps adapting across phone and car.
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Client">Self-Initiated Concept Project</Meta>
                <Meta label="Timeline">2026</Meta>
                <Meta label="Platform">In-Vehicle Infotainment + Mobile Companion App</Meta>
                <Meta label="Link">
                  <a
                    href={figma.tripPlanner}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-fit items-center gap-1 transition-colors hover:text-[var(--accent-green)]"
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                      Figma File
                    </span>
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </a>
                </Meta>
              </div>
            </Container>
          </section>

          <section className="py-8">
            <Container>
              <InfoRow label="My Role">
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <Chip key={r} variant="role">
                      {r}
                    </Chip>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="Core Idea">
                <P>
                  Traditional navigation begins with a destination. This system begins with an <Shimmer>{"intention"}</Shimmer>, and plans the journey
                  around it.
                </P>
              </InfoRow>
              <InfoRow label="Design Files">
                <P>
                  Low-fidelity designs cover the full flow; high-fidelity designs cover the most representative screens.
                </P>
                <div>
                  <ShinyButton href={figma.tripPlanner} target="_blank" rel="noopener noreferrer">
                    Open in Figma ↗
                  </ShinyButton>
                </div>
              </InfoRow>
            </Container>
          </section>

          {/* 01 — THE PROBLEM */}
          <Section id="problem" index="01" label="The Problem" title="Drivers don't lack information. They have too much of it.">
            <P>
              I set out to put more information in front of drivers. Research pointed the other way.
            </P>
            <Box label="Finding">
              Drivers already have navigation, search, and AI assistants, yet a multi-stop trip still means switching apps and stitching stops together by hand.
            </Box>
            <P>
              Recommendations arrive one at a time, so a beach and a meal suggested separately turn into detours.
            </P>
            <P>
              In a car, the real constraint isn&apos;t screen size. It&apos;s <Shimmer>{"the attention it takes to switch between road and interface"}</Shimmer>.
            </P>
            <Pull label="Core problem">
              <p>What drivers need is the right information, at the right moment,</p>
              <p>with as little unnecessary interaction as possible.</p>
            </Pull>
          </Section>

          {/* 02 — RESEARCH */}
          <Section id="research" index="02" label="Research" title="Listening to drivers, and studying the systems they already use.">
            <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
              {[
                { n: "3", l: "Tesla driver interviews" },
                { n: "2", l: "Online communities: Reddit and Xiaohongshu" },
                { n: "5", l: "Automotive systems analyzed" },
              ].map((s) => (
                <div key={s.l}>
                  <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                  <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]">{s.l}</span>
                </div>
              ))}
            </div>
            <P>
              I read driver threads on Reddit and Xiaohongshu and interviewed three Tesla drivers about what they use and what distracts them.
            </P>
            <StaggerTestimonials
              items={[
                {
                  quote:
                    "“After a long day, I don't want to spend another 20 minutes comparing restaurants, checking reviews, and figuring out where to go.”",
                  by: "Driver, user research",
                },
                {
                  quote:
                    "“Sometimes I carefully plan my whole day, but I stay longer than expected at one place. By the time I leave, my next destination is already closed, and I have to stop and search for another place nearby.”",
                  by: "Driver, user research",
                },
                {
                  quote:
                    "“When my dog is in the car, I want recommendations that already understand my situation instead of making me filter everything myself.”",
                  by: "Driver, user research",
                },
                {
                  quote:
                    "“When friends visit San Diego, I honestly don't know where to take them anymore. I've lived here for a while, so all the usual places feel boring, but I also don't know any new hidden spots.”",
                  by: "Driver, user research",
                },
                {
                  quote:
                    "“I spend so much time looking on Google, reviews, Instagram, or even calling up or asking in person — but still the info isn't always trustworthy.”",
                  by: "Reddit, user research",
                },
                {
                  quote:
                    "“I make 10–12 page Google Docs laying out every detail and then never even glance at it while on the actual trip. There's a plan, but there's flexibility in it for spontaneity.”",
                  by: "Reddit, user research",
                },
                {
                  quote:
                    "“I love to screenshot directions and places we're going to see in case we lose service... then completely change the plan anyway.”",
                  by: "Reddit, user research",
                },
              ]}
            />
            <div>
              <Eyebrow>Competitive landscape</Eyebrow>
              <P>
                Tesla, Xiaomi, Rivian, Lucid, and Mercedes, studied for how each handles the driver&apos;s attention.
              </P>
            </div>
            <ChipGroup
              label="What I compared"
              items={["Navigation", "Information density", "Personalization", "Multitasking", "AI assistance", "Interaction complexity", "Driver attention"]}
            />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {COMPETITORS.map((c) => (
                <div key={c.name} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <span className="font-blinker text-[18px] font-medium text-white">{c.name}</span>
                  <span className="font-gilroy text-[16px] leading-[1.6] text-neutral-400">{c.finding}</span>
                </div>
              ))}
            </div>
            <Box label="Takeaway">
              Current systems handle navigation and voice well, but still expect the driver to{" "}
              <Shimmer>{"name a destination and connect the decisions themselves"}</Shimmer>.
            </Box>
          </Section>

          {/* 03 — KEY INSIGHTS */}
          <WideSection id="insights" index="03" label="Key Insights" title="Attention, not screen size, was the real constraint.">
            <Cards
              columns={4}
              items={[
                { index: "01", title: "Attention beats screen size", body: <p>Switching between road and screen is the real cost.</p> },
                { index: "02", title: "Precision still matters", body: <p>Drivers still want lane-level guidance.</p> },
                { index: "03", title: "Scattered features get lost", body: <p>Features buried in menus go unused.</p> },
                { index: "04", title: "No layout fits every stage", body: <p>Before a trip and while driving need different things.</p> },
              ]}
            />
          </WideSection>

          {/* 04 — DESIGN PRINCIPLES */}
          <WideSection id="principles" index="04" label="Design Principles" title="Five rules every screen follows.">
            <Stack>
              <ol className="border-t border-white/10">
                {PRINCIPLES.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/10 py-7 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-8">
                    <span className="font-blinker text-[16px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sulphur text-[clamp(22px,2.2vw,32px)] leading-[1.15] tracking-[-0.01em] text-white">{p.title}</span>
                    <span className="font-gilroy col-start-2 text-[16px] leading-[1.6] text-neutral-400 md:col-start-3">{p.body}</span>
                  </li>
                ))}
              </ol>
              {/* Guiding principle: the quote on the left, what it means for the design on the right */}
              <div className="grid items-end gap-10 pt-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-16 md:pt-10">
                <Statement label="Guiding principle">
                  Drivers don&apos;t need more information. They need the right information at the right time.
                </Statement>
                <ul className="flex flex-col border-t border-white/10 md:mb-8">
                  {[
                    ["Context decides", "Each stage of the trip shows only what it needs."],
                    ["Fewer decisions on the move", "Interaction gets simpler as driving gets harder."],
                    ["AI coordinates", "The system connects the stops so the driver doesn't have to."],
                  ].map(([t, b]) => (
                    <li key={t} className="border-b border-white/10 py-5">
                      <span className="font-blinker block text-[18px] font-medium text-white md:text-[20px]">{t}</span>
                      <span className="font-gilroy mt-1 block text-[15px] leading-[1.6] text-neutral-400">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Stack>
          </WideSection>

          {/* 05 — COLOR & MATERIALS */}
          <WideSection id="color" index="05" label="Color & Materials" title="Colors you can read at a glance.">
            {/* Text stacked on the left, swatches beside it on the right */}
            <Reveal>
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-16">
                <div className="flex flex-col gap-6">
                  <P>
                    Black, pure white, bright orange, bright purple, and light blue: high-contrast colors a driver can <Shimmer>{"read at a glance"}</Shimmer>.
                  </P>
                  <P>
                    On the dark navy base, the saturated accents stay vivid, so what matters is the first thing the eye lands on.
                  </P>
                </div>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/trip-planning/palette.webp"
                    alt="The color palette: black #000000, purple #664BDC, orange #EB8037, and light blue #00B5FF"
                    width={1400}
                    height={1004}
                    loading="lazy"
                    className="block h-auto w-full rounded-[12px]"
                  />
                  <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                    Black #000000 · Purple #664BDC · Orange #EB8037 · Light blue #00B5FF, with pure white for text.
                  </figcaption>
                </figure>
              </div>
            </Reveal>
            <Stack>
              <Box label="Frosted glass for prompts">
                Prompt bars use frosted, translucent glass. It feels polished, and the map stays visible underneath, so a prompt floats above the drive instead of covering it.
              </Box>
            </Stack>
          </WideSection>

          {/* 06 — THE DESIGN SHIFT */}
          <WideSection id="shift" index="06" label="The Design Shift" title="From a better navigation screen to a system that plans the trip.">
            <Stack>
              <TwoCol>
                <P>
                  Drivers had plenty of information. What they lacked was help deciding and connecting destinations.
                </P>
                <P>
                  Instead of searching for each stop one by one, the driver could{" "}
                  <Shimmer>{"say what they want to do"}</Shimmer>, and the system would build the trip around it.
                </P>
              </TwoCol>
              <Contrast
                left={{ label: "From", items: "Design a better in-car navigation interface." }}
                right={{ label: "To", items: "Design an AI system that understands what the driver wants and plans the trip." }}
              />
              <Pull label="How might we" wide>
                <p>Make a system powerful without making its interface complicated?</p>
              </Pull>
              <div>
                <h3 className="font-blinker mb-5 text-[22px] font-medium leading-tight text-white md:text-[26px]">
                  Drivers plan differently, but all aim for an outcome
                </h3>
                <Cards
                  columns={3}
                  items={[
                    {
                      index: "01",
                      title: "Plan Ahead",
                      body: <p>Research on the phone, then take the plan to the car.</p>,
                    },
                    {
                      index: "02",
                      title: "Plan on the Go",
                      body: <p>Decide in the car, knowing the experience, not the place.</p>,
                    },
                    {
                      index: "03",
                      title: "Adapt During the Journey",
                      body: <p>Places close, plans run long. The system has to adapt without starting over.</p>,
                    },
                  ]}
                />
              </div>
              <Pull label="Key insight">
                <p>Users do not think in categories. They think in outcomes.</p>
              </Pull>
            </Stack>
          </WideSection>

          {/* 07 — LOW-FIDELITY FLOWS */}
          <WideSection id="wireframes" index="07" label="Low-Fidelity Flows" title="Mapping every flow before designing a screen.">
            <Stack>
              <TwoCol>
                <P>
                  Before any visual design, I mapped every flow in low fidelity: planning, adapting on the road, and revisiting past routes, on the car screen and the phone.
                </P>
                <P>
                  These boards are an overview. Every state and edge case is in Figma.
                </P>
              </TwoCol>
            </Stack>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {[
              { src: "wireframes-car-flows", label: "Car screen flows", alt: "Low-fidelity car-screen wireframes: route planning before the trip, and rerouting, charging, and destination changes during it" },
              { src: "wireframes-phone-flows", label: "Phone flows", alt: "Low-fidelity phone wireframes: viewing past routes, creating a route, and changing, deleting, and reordering stops" },
            ].map((w) => (
              <Reveal key={w.src}>
                <figure>
                  <a href={`/images/trip-planning/${w.src}.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/trip-planning/${w.src}.webp`}
                      alt={w.alt}
                      width={2000}
                      height={1304}
                      loading="lazy"
                      className="block h-auto w-full rounded-[18px] border border-white/10"
                    />
                  </a>
                  <figcaption className="font-gilroy mt-4 text-[14px] uppercase tracking-[0.2em] text-neutral-500">{w.label}</figcaption>
                </figure>
              </Reveal>
            ))}
            </div>
            <Reveal>
              <div className="flex flex-col items-start gap-5 border-t border-white/[0.08] pt-10 md:flex-row md:items-center md:justify-between">
                <p className="font-gilroy max-w-[56ch] text-[17px] leading-[1.6] text-neutral-400">
                  A low-fidelity overview only. View the full flow, with every screen, in Figma.
                </p>
                <ShinyButton href={figma.tripWireframes} target="_blank" rel="noopener noreferrer">
                  View the full flow in Figma ↗
                </ShinyButton>
              </div>
            </Reveal>
          </WideSection>

          {/* 08 — AI TRIP PLANNING */}
          <WideSection id="concept" index="08" label="AI Trip Planning" title="Start with an intention, not a destination.">
            <Stack>
              <TwoCol>
                <P>
                  The driver describes what they want, and AI turns it into a connected plan.
                </P>
                <Box label="Not a route — an experience">
                  A good restaurant on the route beats a top-rated one far away. The system plans an experience, not a route.
                </Box>
              </TwoCol>
              <Utterance label="Example intention">
                “I want to take my dog out, get coffee, and drive around, but without too much driving.”
              </Utterance>
              <ChipGroup
                label="What the AI weighs"
                items={["Preferences", "Time", "Traffic", "Weather", "Parking", "Charging", "Ratings", "Opening hours", "Distance", "Detours", "How stops relate"]}
              />
            </Stack>
            <Reveal>
              <FlowPanel
                items={[
                  { ...PHONE_PREFS_EXPRESS, label: "Express: pick place types and favorites, then Less Driving or Lower Cost" },
                  { ...PHONE_PREFS_PLAN, label: "Plan: AI returns a five-stop trip from those and past preferences" },
                ]}
              />
            </Reveal>
            <Stack>
              <TwoCol>
                <P>
                  The plan is a starting point: drivers can add, reorder, or replace stops. The AI should feel <Shimmer>{"assistive, never controlling"}</Shimmer>.
                </P>
                <Pull label="Design decision">
                  <p>The value of the AI comes from coordination, not simply recommendation.</p>
                </Pull>
              </TwoCol>
              <div>
                <Eyebrow>The experience as a system</Eyebrow>
                <StageFlow
                  stages={[
                    { title: "Express", body: "The driver says what they want, by voice or by hand." },
                    { title: "Plan", body: "AI builds a recommended trip from the intention." },
                    { title: "Drive", body: "The most relevant information, at the right moment." },
                    { title: "Adapt", body: "When circumstances change, the plan changes with them." },
                  ]}
                />
              </div>
            </Stack>
          </WideSection>

          {/* 09 — PLANNING ON THE PHONE */}
          <WideSection id="phone" index="09" label="Planning on the Phone" title="Plan ahead, when there's time and flexibility.">
            <Stack>
              <TwoCol>
                <P>
                  Planning happens ahead of time or on the road, so the experience spans two devices.
                </P>
                <P>
                  The phone handles planning ahead: building routes by hand or with AI, and revisiting past trips.
                </P>
              </TwoCol>
              <Contrast
                left={{ label: "Phone: advance planning", items: "Plan ahead with time to spare: build the route, review past trips." }}
                right={{ label: "Vehicle: in the moment", items: "Adapt while driving: change stops, respond to traffic, timing, and charging." }}
              />
            </Stack>
            <Reveal>
              <PhoneStory
                eyebrow="Manual planning"
                title="Build it yourself, one stop at a time."
                frames={PHONE_MANUAL}
                // Demo recorded by tools/manual_planning_video.py; step times are printed by that script.
                video={{
                  src: "/videos/trip_manual_planning.mp4",
                  poster: "/images/trip-planning/manual-video-poster.jpg",
                  steps: [0, 1.55, 4.37, 6.02, 9.82],
                }}
              />
            </Reveal>
            <Reveal>
              <PhoneStory
                eyebrow="AI-assisted planning"
                title="Or describe the day, and let AI assemble it."
                frames={PHONE_AI}
                reverse
                // Demo recorded by tools/phone_flow_videos.py (ai); step times are printed by that script.
                video={{
                  src: "/videos/trip_ai_planning.mp4",
                  poster: "/images/trip-planning/ai-video-poster.jpg",
                  steps: [0, 5.5, 8.4, 10.2, 11.85],
                }}
              />
            </Reveal>
          </WideSection>

          {/* 10 — PAST TRIPS */}
          <WideSection id="handoff" index="10" label="Past Trips" title="Every trip, saved — and easy to revisit.">
            <Stack>
              <TwoCol>
                <P>
                  Saved trips live in a schedule, each day showing its color, stops, and location.
                </P>
                <P>
                  Details open progressively: tap a day for its route, again for the full map and stats.
                </P>
              </TwoCol>
            </Stack>
            <Reveal>
              <PhoneStory
                eyebrow="Schedule & past routes"
                title="From a daily summary to the full route."
                frames={PHONE_SCHEDULE}
                // Demo recorded by tools/phone_flow_videos.py (schedule); it skips the schedule overview screen.
                video={{
                  src: "/videos/trip_schedule.mp4",
                  poster: "/images/trip-planning/schedule-video-poster.jpg",
                  steps: [0, 1.55, 3.35, 5.8, 9.35],
                }}
              />
            </Reveal>
            <Stack>
              <Box label="Not two versions of one app">
                A finished plan goes to the car, which handles what the phone can&apos;t:{" "}
                <Shimmer>{"the drive itself"}</Shimmer>, from traffic to a low battery, in a few quick interactions.
              </Box>
              <Pull label="System idea">
                <p>Phone: plan ahead when there&apos;s time. Vehicle: adapt in the moment, while driving.</p>
                <p>One journey, two contexts.</p>
              </Pull>
            </Stack>
          </WideSection>

          {/* 11 — THE IN-CAR PLAN */}
          <WideSection id="in-car" index="11" label="The In-Car Plan" title="Before pulling away, the plan stays in view and easy to change.">
            <Stack>
              <TwoCol>
                <P>Parked, the driver has attention to spare, so the full plan stays within reach.</P>
                <P>Edit by hand or ask AI; the trip reorganizes around it.</P>
              </TwoCol>
            </Stack>
            <Reveal>
              <Slideshow
                frames={[
                  hu("explore-1", 882, 508, "The planned trip on the head unit's route map", "The trip on the map"),
                  hu("explore-2", 1011, 508, "Compact and expanded La Jolla Cove place cards over the route map", "Tap a place: compact card, then full details"),
                ]}
                caption="Tap any point for a compact place card; expand it for ratings, photos, and hours."
              />
            </Reveal>
            <Chapter
              label="Edit by hand"
              title="Replace a stop in two taps."
              text={<P>The trip plan lists every stop. Select one and search for its replacement.</P>}
            >
              <Slideshow frames={HU_MANUAL} />
            </Chapter>
            <Chapter
              label="Edit with AI"
              title="Or just say what should change."
              text={
                <P>
                  <Shimmer>{"Replace the third one with a highly rated Italian restaurant nearby."}</Shimmer> AI finds a match and updates the route once
                  approved.
                </P>
              }
            >
              <Slideshow frames={HU_AI} />
            </Chapter>
            <Chapter
              label="Add a stop"
              title="Coffee between two destinations, chosen by the driver."
              text={
                <P>
                  Choose where the stop belongs, pick a nearby Starbucks, preview the detour, and it&apos;s inserted.
                </P>
              }
            >
              <Slideshow frames={HU_ADD_STOP} />
            </Chapter>
            <Chapter
              label="Find parking"
              title="Know where to park before leaving."
              text={<P>Nearby parking is marked on the map, so no last-minute searching.</P>}
            >
              <Slideshow frames={HU_PARKING} />
            </Chapter>
          </WideSection>

          {/* 12 — WHILE DRIVING */}
          <WideSection id="driving" index="12" label="While Driving" title="Less browsing. More conversation.">
            <Stack>
              <TwoCol>
                <P>
                  Once moving, the same planning model distracts. No one should rebuild a route for a small change.
                </P>
                <P>
                  So interaction becomes conversation: AI knows the route and surfaces{" "}
                  <Shimmer>{"the one option that fits the journey best"}</Shimmer>.
                </P>
              </TwoCol>
              <Contrast
                left={{
                  label: "Before driving",
                  items: (
                    <ul className="space-y-1.5">
                      <li>More control</li>
                      <li>More exploration</li>
                      <li>More detail</li>
                    </ul>
                  ),
                }}
                right={{
                  label: "While driving",
                  items: (
                    <ul className="space-y-1.5">
                      <li>Less browsing</li>
                      <li>Less manual input</li>
                      <li>More context</li>
                      <li>More AI assistance</li>
                    </ul>
                  ),
                }}
              />
            </Stack>
            <Chapter
              label="Proactive charging"
              title="One recommendation instead of five decisions."
              text={
                <>
                  <P>
                    When the battery runs low, AI flags it and finds two stations before the next stop.
                  </P>
                  <Box label="Why a star">
                    On an unfamiliar road, a yellow star marks the reliable pick, chosen at a glance.
                  </Box>
                </>
              }
            >
              <Slideshow frames={HU_CHARGING} />
            </Chapter>
            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Statement label="Design principle">
                The interaction should become simpler as the driving task becomes more demanding.
              </Statement>
            </div>
          </WideSection>

          {/* 13 — ADAPTIVE PLANNING */}
          <WideSection id="adapt" index="13" label="Adaptive Planning" title="A trip plan shouldn't break when reality changes.">
            <Stack>
              <TwoCol>
                <P>
                  Restaurants close, drivers run late, batteries run low. The itinerary adapts instead of staying fixed.
                </P>
                <P>
                  If the next stop will be closed, AI suggests a similar open place nearby, and <Shimmer>{"asks before changing anything"}</Shimmer>.
                </P>
              </TwoCol>
            </Stack>
            <Reveal>
              <Slideshow frames={HU_ADAPT} />
            </Reveal>
            <Pull label="Key idea">
              <p>The AI is not simply replacing a destination.</p>
              <p>It preserves the driver&apos;s intention while adapting to a new constraint.</p>
            </Pull>
          </WideSection>

          {/* 14 — FINAL EXPERIENCE */}
          <WideSection id="final" index="14" label="Final Experience" title="From intent to journey.">
            <Reveal>
              <Shot
                panel={false}
                src="/images/trip-planner-card.jpg"
                alt="The trip plan on the in-vehicle display with the mobile companion app in front of it"
              />
            </Reveal>
            <Stack>
              <BigSequence steps={["Express", "Plan", "Drive", "Adapt"]} />
              <TwoCol>
                <P>
                  An intention, on the phone or in the car, becomes a connected, editable plan.
                </P>
                <P>On the road, the interface asks for less. When something changes, the plan changes with it.</P>
              </TwoCol>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <Eyebrow>Before driving</Eyebrow>
                  <ChipFlow steps={["Express Intent", "Review", "Edit", "Start"]} />
                </div>
                <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <Eyebrow>While driving</Eyebrow>
                  <ChipFlow steps={["Speak", "AI Understands Context", "Recommended Action", "Continue Journey"]} />
                </div>
              </div>
            </Stack>
          </WideSection>

          {/* 15 — REFLECTION */}
          <Section id="reflection" index="15" label="Reflection" title="From information retrieval to journey planning.">
            <P>
              The answer to an information problem is rarely more information. Research moved the design toward decisions:{" "}
              <Shimmer>{"which ones the driver needs to make, and which the system can make for them"}</Shimmer>.
            </P>
            <Pull label="Main product shift">
              <p>Drivers shouldn&apos;t manage every piece of information on the journey.</p>
              <p>They should express intent and let the system coordinate.</p>
            </Pull>
          </Section>

          {/* FINAL PROJECT STATEMENT */}
          <section className="border-t border-white/[0.08] py-24 md:py-36">
            <Container>
              <Reveal className="flex flex-col items-center text-center">
                <h2 className="font-blinker max-w-[18ch] text-[clamp(44px,7vw,108px)] font-medium leading-[0.98] tracking-[-0.02em] text-white">
                  From Navigation to Intention.
                </h2>
                <p className="font-sulphur mt-8 max-w-[40ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  AI that plans around what people want to do — not just where they go.
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
                    {...(/^https?:\/\//.test(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

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
  Q,
  Box,
  Statement,
  Utterance,
  WideSection,
} from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { Reveal } from "@/components/case/reveal";
import { StageFlow } from "@/components/case/stage-flow";
import { FlowPanel, PhoneStory, Shot, Slideshow, type Screen } from "@/components/case/visuals";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person, selectedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `From Navigation to Intention — ${person.name}`,
  description:
    "Designing an AI-powered trip planning experience that turns what drivers want to do into a complete, adaptive journey.",
};

const NAV: CaseNavItem[] = [
  { id: "problem", index: "01", label: "The Problem" },
  { id: "research", index: "02", label: "Research" },
  { id: "insights", index: "03", label: "Key Insights" },
  { id: "shift", index: "04", label: "The Design Shift" },
  { id: "concept", index: "05", label: "AI Trip Planning" },
  { id: "phone", index: "06", label: "Planning on the Phone" },
  { id: "handoff", index: "07", label: "Past Trips" },
  { id: "in-car", index: "08", label: "The In-Car Plan" },
  { id: "driving", index: "09", label: "While Driving" },
  { id: "adapt", index: "10", label: "Adaptive Planning" },
  { id: "final", index: "11", label: "Final Experience" },
  { id: "reflection", index: "12", label: "Reflection" },
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
      "Strong AI-assisted planning, but better at generating destinations than continuously coordinating the trip around evolving intent.",
  },
  { name: "Lucid", finding: "A polished interface with AI-assisted navigation, but limited proactive trip planning." },
  { name: "Mercedes", finding: "Advanced conversational AI, but trip planning remains destination-driven." },
];

const PRINCIPLES = [
  { title: "Context-aware information", body: "Show what matters for the current stage of the trip, not everything at once." },
  { title: "Low-attention interaction", body: "Every step should cost as little attention as possible, especially once the car is moving." },
  { title: "Proactive but explainable AI", body: "Suggest before being asked — and make it clear why a suggestion fits." },
  { title: "Predictable personalization", body: "Preferences shape the plan in ways the driver can anticipate and override." },
  { title: "Clear information hierarchy", body: "One primary decision at a time; supporting detail only when it is needed." },
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
const ph = (name: string, w: number, alt: string, step: string, detail: string): Screen => ({
  src: `${S}/phone-${name}.webp`,
  w,
  h: 1000,
  alt,
  step,
  detail,
});

const PHONE_PREFS_EXPRESS = ph(
  "prefs-1",
  433,
  "Trip-planning preferences: place types, Favorites and Calendar quick-add, Less Driving and Lower Cost",
  "",
  "",
);
const PHONE_PREFS_PLAN = ph("prefs-2", 440, "AI-prepared route with five stops based on the user's preferences", "", "");

const PHONE_MANUAL = [
  ph("manual-1", 494, "Manual trip planning with Search To Add, categories, and previous preferences", "Start a plan", "Skip the AI preferences and planning opens here: search, quick categories, and places from previous trips."),
  ph("manual-2", 494, "Search field with the keyboard open", "Search for a place", "Type a name like Starbucks, with recent places suggested underneath."),
  ph("manual-3", 496, "Nearby Starbucks locations on the map with an Add button", "Pick a nearby location", "Nearby Starbucks appear on the map, each with rating, hours, price, and drive time. Tap Add."),
  ph("manual-4", 502, "Route to Starbucks with total driving time and Save and Add buttons", "Save, or keep going", "The first route appears with its total driving time. Save ends planning; Add goes back for another stop."),
  ph("manual-5", 494, "Trip-planning screen again with Starbucks checked as the first stop", "Add the next stop", "Back on the planning screen, Starbucks is checked off and the next stop can be a restaurant, coffee, or a hotel."),
];

const PHONE_AI = [
  ph("ai-1", 430, "Natural-language request to go to the airport and then a seafood dinner", "Describe the day", "Tap the AI orb and say it naturally: coffee, then the airport to pick up a friend, then fine-dining seafood."),
  ph("ai-2", 411, "AI-suggested restaurants that match the request and preferences, with Add buttons", "Review what AI suggests", "AI suggests restaurants that fit both the request and past preferences. Add the one you want."),
  ph("ai-3", 487, "AI optimizing the route for the departure time", "AI builds the route", "AI orders the stops and optimizes for the departure time, avoiding traffic."),
  ph("ai-4", 502, "Full route through Starbucks, the airport, and the restaurant with total driving time", "The finished trip", "The whole day on one route — Starbucks, the airport, dinner — with the total driving time."),
  ph("ai-5", 502, "Save sheet with Add Title, Add Color, and Add Description", "Save it", "Give the trip a title, a color, and a description."),
];

const PHONE_SCHEDULE = [
  ph("schedule-1", 442, "August schedule with each day's color, stops, and location, and Make A Plan on today", "Open the schedule", "The menu opens every planned day with its color, number of stops, and location. Any future date can be planned from here."),
  ph("schedule-2", 442, "Saturday's saved trip with its stops, times, and total driving time", "Today's trip", "The trip just saved, stop by stop, with the time between each and the total."),
  ph("schedule-3", 437, "July schedule grouped by week with a Today button", "Browse by week", "Other weeks fold into seven-day groups; Today jumps back after scrolling far."),
  ph("schedule-4", 442, "July days expanded to show each route's stops", "Open a day", "Tapping a day's summary opens its route, stop by stop. Back returns to the previous view."),
  ph("schedule-5", 494, "Detailed Dating Day view with map, places, driving time, and battery usage", "Tap again for the full details", "Tapping again opens the complete past route: the map, every place, the trip title, total driving time, and battery usage."),
];

const HU_MANUAL = [
  hu("manual-1", 882, 553, "Trip plan panel with Lofty Coffee selected", "Open the trip plan and select a stop"),
  hu("manual-2", 882, 517, "Trip plan search field with the on-screen keyboard open", "Search to replace it"),
];

const HU_AI = [
  hu("ai-1", 882, 538, "Request to replace the third stop with a highly rated Italian restaurant", "Ask AI for a change"),
  hu("ai-2", 1052, 538, "AI evaluating nearby Italian restaurants", "AI finds the best match"),
  hu("ai-3", 881, 558, "Bencotto Italian Kitchen proposed in the trip plan with Save Changes", "Review and save"),
  hu("ai-4", 881, 541, "Updated trip plan with the new restaurant and route", "Itinerary updated"),
];

const HU_ADD_STOP = [
  hu("add-stop-1", 882, 508, "Search To Add field between two stops in the itinerary", "Choose where to add"),
  hu("add-stop-2", 882, 508, "Starbucks locations along the route", "Nearby Starbucks on the route"),
  hu("add-stop-3", 882, 508, "Selected Starbucks with its detour and place card", "Pick one, preview the detour"),
  hu("add-stop-4", 882, 508, "Updated itinerary with Starbucks between La Jolla Cove and Lofty Coffee", "Stop inserted"),
];

const HU_PARKING = [hu("parking", 882, 508, "Parking lots marked around La Jolla Cove", "Parking near the stop")];

const HU_CHARGING = [
  hu("charging-1", 1073, 508, "AI reporting low battery and two charging options along the route", "Battery low: AI finds two options"),
  hu("charging-2", 882, 508, "Charging stations along the route, with the recommended one marked by a yellow star", "The recommended charger is starred"),
  hu("charging-3", 882, 508, "Navigation rerouted to the chosen charging station", "Route to the charger"),
  hu("charging-4", 882, 508, "Driving view with navigation to the charger", "Then on to the next stop"),
];

const HU_ADAPT = [
  hu("adapt-1", 1096, 508, "AI warning that Lofty Coffee will be closed on arrival", "The next stop will be closed"),
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
          src="/images/trip-planner-hero.jpg"
          alt="AI trip-planning experience on an in-vehicle display, with the mobile companion app and a destination card"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[60%_50%]"
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
                  Designing an AI-powered trip planning experience that turns what drivers want to do into a complete,
                  adaptive journey.
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
                    This project started as an exploration of automotive HMI — how drivers interact with information while
                    they drive.
                  </p>
                  <p>
                    It ended somewhere different: an AI system that understands what the driver wants to do, plans the trip
                    around it, and keeps adapting that plan on the road — across the phone and the car.
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
                  Traditional navigation begins with a destination. This system begins with an <Q>intention</Q> — it interprets
                  what the driver wants to accomplish, then plans and adapts the journey around it.
                </P>
              </InfoRow>
            </Container>
          </section>

          {/* 01 — THE PROBLEM */}
          <Section id="problem" index="01" label="The Problem" title="Drivers don't lack information. They have too much of it.">
            <P>
              I started broadly — the in-car interface, even HUD concepts — asking how to put more useful information in front
              of drivers. Research pointed the other way.
            </P>
            <Box label="Finding">
              Drivers already have navigation, search, AI assistants, and mobile services — yet planning a multi-stop trip still
              means switching platforms and connecting destinations by hand.
            </Box>
            <P>
              A friend who loves seafood while your saved places are steakhouses means starting the search again. A beach and a
              meal, recommended separately, turn into detours.
            </P>
            <P>
              And in a car, the real constraint isn&apos;t screen size — it&apos;s <Q>the attention it takes to switch between the
              road and the interface</Q>.
            </P>
            <Pull label="Core problem">
              <p>What drivers need is the right information, at the right moment,</p>
              <p>with as little unnecessary interaction as possible.</p>
            </Pull>
          </Section>

          {/* 02 — RESEARCH */}
          <Section id="research" index="02" label="Research" title="Listening to drivers, and studying the systems they already use.">
            <div className="grid grid-cols-3 gap-6 border-y border-white/10 py-8">
              {[
                { n: "3", l: "Tesla driver interviews" },
                { n: "2", l: "Online communities — Reddit and Xiaohongshu" },
                { n: "5", l: "Automotive systems analyzed" },
              ].map((s) => (
                <div key={s.l}>
                  <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                  <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]">{s.l}</span>
                </div>
              ))}
            </div>
            <P>
              Alongside HMI research, I read driver discussions on Reddit and Xiaohongshu and interviewed three Tesla drivers
              about what they reach for, what they ignore, and what pulls their attention from the road.
            </P>
            <div className="space-y-4">
              {[
                "“After a long day, I don't want to spend another 20 minutes comparing restaurants, checking reviews, and figuring out where to go.”",
                "“When my dog is in the car, I want recommendations that already understand my situation instead of making me filter everything myself.”",
              ].map((q, i) => (
                <blockquote key={q} className="rounded-card border border-white/10 bg-white/[0.03] p-7 md:p-10">
                  <span className="font-blinker block text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sulphur mt-4 text-[clamp(22px,2.4vw,34px)] leading-[1.25] tracking-[-0.01em] text-white">{q}</p>
                </blockquote>
              ))}
            </div>
            <div>
              <Eyebrow>Competitive landscape</Eyebrow>
              <P>
                I studied Tesla Model 3 / Y, Xiaomi SU7 / YU7, Rivian, Lucid, and Mercedes MB.OS — not for visual style, but for
                how each handles the driver&apos;s attention.
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
              Current systems are good at navigation, search, and voice — but most still expect the driver to{" "}
              <Q>name a destination and connect the decisions themselves</Q>.
            </Box>
          </Section>

          {/* 03 — KEY INSIGHTS */}
          <WideSection id="insights" index="03" label="Key Insights" title="Attention — not screen size — was the real constraint.">
            <Stack>
              <Cards
                columns={2}
                items={[
                  {
                    index: "01",
                    title: "Attention switching matters more than screen size",
                    body: <p>Drivers cared less about screen size than about the attention it took to move between road and interface.</p>,
                  },
                  {
                    index: "02",
                    title: "Navigation is essential — and precision still matters",
                    body: <p>One of the most used functions — and drivers still wanted precise, lane-level guidance.</p>,
                  },
                  {
                    index: "03",
                    title: "Capabilities get lost when they're spread out",
                    body: <p>Features scattered across screens, menus, and panels become hard to discover.</p>,
                  },
                  {
                    index: "04",
                    title: "Fixed layouts don't fit every driving stage",
                    body: <p>What matters before a trip isn&apos;t what matters while driving — the interface has to change with context.</p>,
                  },
                ]}
              />
              <div>
                <Eyebrow>Design principles</Eyebrow>
                <ol className="border-t border-white/10">
                  {PRINCIPLES.map((p, i) => (
                    <li key={p.title} className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/10 py-6 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
                      <span className="font-blinker text-[16px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sulphur text-[clamp(22px,2.2vw,32px)] leading-[1.15] tracking-[-0.01em] text-white">{p.title}</span>
                      <span className="font-gilroy col-start-2 text-[16px] leading-[1.6] text-neutral-400 md:col-start-3">{p.body}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <Statement label="Guiding principle">
                Drivers don&apos;t need more information. They need the right information at the right time.
              </Statement>
            </Stack>
          </WideSection>

          {/* 04 — THE DESIGN SHIFT */}
          <WideSection id="shift" index="04" label="The Design Shift" title="From a better navigation screen to a system that plans the trip.">
            <Stack>
              <TwoCol>
                <P>
                  At first this looked like an information problem. But drivers already had plenty — what they still had to do was
                  decide what mattered, compare options, and connect destinations.
                </P>
                <P>
                  So instead of searching for restaurants, parking, charging, and routes one by one, the driver could simply{" "}
                  <Q>say what they want to do</Q> — and the system would build the trip around it.
                </P>
              </TwoCol>
              <Contrast
                left={{ label: "From", items: "Design a better in-car navigation interface." }}
                right={{ label: "To", items: "Design an AI system that understands what the driver wants to do and helps plan the trip." }}
              />
              <Pull label="How might we" wide>
                <p>Balance simplicity with functionality — a system that is powerful, without an interface that is complicated?</p>
              </Pull>
              <div>
                <h3 className="font-blinker mb-5 text-[22px] font-medium leading-tight text-white md:text-[26px]">
                  Different drivers plan differently — but all of them are trying to reach an outcome
                </h3>
                <Cards
                  columns={3}
                  items={[
                    {
                      index: "01",
                      title: "Plan Ahead",
                      body: <p>Research on the phone while there&apos;s time, then take the plan to the car.</p>,
                    },
                    {
                      index: "02",
                      title: "Plan on the Go",
                      body: <p>Start deciding in the car — knowing the experience they want, not the exact place.</p>,
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

          {/* 05 — AI TRIP PLANNING */}
          <WideSection id="concept" index="05" label="AI Trip Planning" title="Start with an intention, not a destination.">
            <Stack>
              <TwoCol>
                <P>
                  The driver describes what they want — in natural language or with a few preferences — and AI turns it into a
                  connected plan.
                </P>
                <Box label="Not a route — an experience">
                  A highly rated restaurant far away can be less useful than a good one along the route. The system isn&apos;t
                  finding a route; it&apos;s helping plan an experience.
                </Box>
              </TwoCol>
              <Utterance label="Example intention">
                “I want to take my dog out, get coffee, and drive around — but I don&apos;t want to spend too much time
                driving.”
              </Utterance>
              <ChipGroup
                label="What the AI weighs"
                items={["Preferences", "Time", "Traffic", "Weather", "Parking", "Charging", "Ratings", "Opening hours", "Distance", "Detours", "How stops relate"]}
              />
            </Stack>
            <Reveal>
              <FlowPanel
                items={[
                  { ...PHONE_PREFS_EXPRESS, label: "Express — pick place types, quick-add favorites, and choose Less Driving or Lower Cost" },
                  { ...PHONE_PREFS_PLAN, label: "Plan — AI returns a five-stop trip built from those and past preferences" },
                ]}
              />
            </Reveal>
            <Stack>
              <TwoCol>
                <P>
                  The plan is a starting point, not a verdict. Drivers can add, delete, reorder, or replace stops — the AI should
                  feel <Q>assistive, never controlling</Q>.
                </P>
                <Pull label="Design decision">
                  <p>The value of the AI comes from coordination, not simply recommendation.</p>
                </Pull>
              </TwoCol>
              <div>
                <Eyebrow>The experience as a system</Eyebrow>
                <StageFlow
                  stages={[
                    { title: "Express", body: "The driver says what they want to do — in natural language or through manual input." },
                    { title: "Plan", body: "AI understands the intention and builds a recommended trip." },
                    { title: "Drive", body: "The driver gets the most relevant information at the right moment." },
                    { title: "Adapt", body: "When circumstances change, the plan changes with them." },
                  ]}
                />
              </div>
            </Stack>
          </WideSection>

          {/* 06 — PLANNING ON THE PHONE */}
          <WideSection id="phone" index="06" label="Planning on the Phone" title="Plan ahead, when there's time and flexibility.">
            <Stack>
              <TwoCol>
                <P>
                  Trip planning happens in two moments: some people plan the night before or days ahead; others start or change
                  plans on the road. So the experience is deliberately split across two devices.
                </P>
                <P>
                  The phone serves the first moment. With time to spare, drivers build and review the route — by hand or with AI —
                  and look back at past trips.
                </P>
              </TwoCol>
              <Contrast
                left={{ label: "Phone — advance planning", items: "Plan ahead when you have time and flexibility: think the trip through, build the route, review past trips." }}
                right={{ label: "Vehicle — in the moment", items: "Adapt while you drive: review the current trip, add or change stops, respond to traffic, timing, and charging." }}
              />
            </Stack>
            <Reveal>
              <PhoneStory eyebrow="Manual planning" title="Build it yourself, one stop at a time." frames={PHONE_MANUAL} />
            </Reveal>
            <Reveal>
              <PhoneStory eyebrow="AI-assisted planning" title="Or describe the day, and let AI assemble it." frames={PHONE_AI} reverse />
            </Reveal>
          </WideSection>

          {/* 07 — PAST TRIPS */}
          <WideSection id="handoff" index="07" label="Past Trips" title="Every trip, saved — and easy to revisit.">
            <Stack>
              <TwoCol>
                <P>
                  Saved trips live in a schedule. Each day shows its color, number of stops, and location at a glance.
                </P>
                <P>
                  Details open progressively: tap a day for its route, then tap again for the map, places, driving time, and
                  battery usage.
                </P>
              </TwoCol>
            </Stack>
            <Reveal>
              <PhoneStory eyebrow="Schedule & past routes" title="From a daily summary to the full route." frames={PHONE_SCHEDULE} />
            </Reveal>
            <Stack>
              <Box label="Not two versions of one app">
                A finished plan is sent to the head unit, and the car takes over what the phone can&apos;t:{" "}
                <Q>the drive itself</Q> — adjusting stops, timing, traffic, or a low battery in a few quick interactions.
              </Box>
              <Pull label="System idea">
                <p>Phone: plan ahead when there&apos;s time. Vehicle: adapt in the moment, while driving.</p>
                <p>One journey, two contexts.</p>
              </Pull>
            </Stack>
          </WideSection>

          {/* 08 — THE IN-CAR PLAN */}
          <WideSection id="in-car" index="08" label="The In-Car Plan" title="Before pulling away, the plan stays in view — and easy to change.">
            <Stack>
              <TwoCol>
                <P>Parked, the driver still has attention to spare, so the head unit keeps the full plan within reach.</P>
                <P>Changes can be made by hand or by asking AI; the rest of the trip reorganizes around them.</P>
              </TwoCol>
            </Stack>
            <Reveal>
              <Slideshow
                frames={[
                  hu("explore-1", 882, 508, "The planned trip on the head unit's route map", "The trip on the map"),
                  hu("explore-2", 1010, 508, "Compact and expanded La Jolla Cove place cards over the route map", "Tap a place: compact card, then full details"),
                ]}
                caption="Tap any point on the map for a compact place card; expand it for ratings, photos, hours, and a fuller description."
              />
            </Reveal>
            <Chapter
              label="Edit by hand"
              title="Replace a stop in two taps."
              text={<P>Opening the trip plan lists every stop in order. Select one, and search for what should replace it.</P>}
            >
              <Slideshow frames={HU_MANUAL} />
            </Chapter>
            <Chapter
              label="Edit with AI"
              title="Or just say what should change."
              text={
                <P>
                  <Q>Replace the third one with a highly rated Italian restaurant nearby.</Q> AI finds a match, shows the change for
                  review, and updates the route once saved.
                </P>
              }
            >
              <Slideshow frames={HU_AI} />
            </Chapter>
            <Chapter
              label="Add a stop"
              title="Coffee between two destinations — the driver's choice."
              text={
                <P>
                  Choose where the stop belongs and nearby Starbucks along that stretch appear. The driver picks one, previews the
                  detour, and it&apos;s inserted.
                </P>
              }
            >
              <Slideshow frames={HU_ADD_STOP} />
            </Chapter>
            <Chapter
              label="Find parking"
              title="Know where to park before leaving."
              text={<P>Parking lots around the destination are marked on the map, so the last minutes aren&apos;t spent searching.</P>}
            >
              <Slideshow frames={HU_PARKING} />
            </Chapter>
          </WideSection>

          {/* 09 — WHILE DRIVING */}
          <WideSection id="driving" index="09" label="While Driving" title="Less browsing. More conversation.">
            <Stack>
              <TwoCol>
                <P>
                  Once moving, the same planning model becomes distracting — no one should compare pages or rebuild a route to make a
                  small change.
                </P>
                <P>
                  So interaction shifts to conversation. AI already knows the route and preferences, and surfaces{" "}
                  <Q>the one option that fits the journey best</Q>.
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
                    When the battery runs low, AI raises it first and finds two stations between here and the next stop.
                  </P>
                  <Box label="Why a star">
                    On an unfamiliar road, drivers can&apos;t know which station is reliable. A yellow star marks the recommendation, so
                    it can be chosen at a glance — navigation goes to the charger, then on to the next stop.
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

          {/* 10 — ADAPTIVE PLANNING */}
          <WideSection id="adapt" index="10" label="Adaptive Planning" title="A trip plan shouldn't break when reality changes.">
            <Stack>
              <TwoCol>
                <P>
                  Restaurants close, drivers run late, batteries run low. The itinerary keeps adapting instead of staying a fixed list.
                </P>
                <P>
                  When the next stop will be closed, AI suggests a similar open place based on past preferences, with a reasonable
                  detour — and <Q>asks before changing anything</Q>.
                </P>
              </TwoCol>
            </Stack>
            <Reveal>
              <Slideshow frames={HU_ADAPT} />
            </Reveal>
            <Pull label="Key idea">
              <p>The AI is not simply replacing a destination.</p>
              <p>It is preserving the driver&apos;s original intention while adapting the journey around a new constraint.</p>
            </Pull>
          </WideSection>

          {/* 11 — FINAL EXPERIENCE */}
          <WideSection id="final" index="11" label="Final Experience" title="From intent to journey.">
            <Reveal>
              <Shot
                panel={false}
                src="/images/trip-planner-hero.jpg"
                alt="The trip plan on the in-vehicle display with the mobile companion app in front of it"
              />
            </Reveal>
            <Stack>
              <BigSequence steps={["Express", "Plan", "Drive", "Adapt"]} />
              <TwoCol>
                <P>
                  The driver starts with an intention — on the phone or in the car — and AI turns it into a connected, editable plan.
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

          {/* 12 — REFLECTION */}
          <Section id="reflection" index="12" label="Reflection" title="From information retrieval to journey planning.">
            <P>
              The answer to an information problem is rarely more information. Research on attention switching moved the design
              from screens toward decisions —{" "}
              <Q>which ones the driver needs to make, and which the system can make for them</Q>.
            </P>
            <P>
              The concept brings together natural-language input, contextual recommendations, multi-stop planning, adaptive
              routing, and a connected phone and vehicle.
            </P>
            <Pull label="Main product shift">
              <p>Drivers shouldn&apos;t have to manage every piece of information along the journey.</p>
              <p>They should be able to express their intent and let the system handle the coordination.</p>
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
                  Designing AI that plans around what people want to do — not just where they want to go.
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

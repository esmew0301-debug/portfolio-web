import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { TripDesignSystem } from "@/components/case/trip-design-system";
import { Shot } from "@/components/case/vegan-kit";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { figma, person } from "@/lib/content";

export const metadata: Metadata = {
  title: `AI-Powered Automotive Trip Planning — ${person.name}`,
  description: "A concept for an AI trip planner that builds a multi-stop trip from what a driver wants to do, across the car and the phone.",
};

// Same black, minimal system as the other case studies, visual-first: hero, a short overview, the four product
// decisions (each a one-line decision / why / trade-off beside its own visual), the screens grouped by context
// (phone, parked, driving), then compact research, priorities, feasibility and validation, and the design system.
// Blue (the HMI's route colour) is the only accent.
const T = "/images/trip-planning";
const BLUE = "#3b9bff";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";
const H2 = "text-[20px] leading-[28px] text-white md:text-[24px] md:leading-[32px]";

const B = ({ children }: { children: ReactNode }) => <span style={{ color: BLUE }}>{children}</span>;

type Step = { img: string; en: string };
/** `dec`: the product decisions (01–04) a flow puts into practice. */
type Flow = { t: string; d: string; dec: string[]; steps: Step[] };
const st = (img: string, en: string): Step => ({ img, en });

/* ---------- the screens, grouped by planning context: A phone, B parked, C driving ---------- */

const PHONE_FLOWS: Flow[] = [
  {
    t: "Start with an intention",
    d: "“Take my dog out, get coffee, drive around, but not too much driving.” Pick place types and favourites, then Less Driving or Lower Cost; the AI drafts a trip from that and past preferences.",
    dec: ["01"],
    steps: [
      st("phone-prefs-1", "Express: place types, favourites, Less Driving / Lower Cost"),
      st("phone-prefs-2", "Plan: a five-stop trip drafted by AI"),
    ],
  },
  {
    t: "Build it by hand",
    d: "Skip the AI and build the trip one stop at a time.",
    dec: ["04"],
    steps: [
      st("phone-manual-1", "Start a plan: search, categories, past places"),
      st("phone-manual-2", "Search for a place"),
      st("phone-manual-3", "Pick a nearby location and Add"),
      st("phone-manual-4", "Save, or keep adding"),
      st("phone-manual-5", "Add the next stop"),
    ],
  },
  {
    t: "Or let AI assemble it",
    d: "Describe the day and AI orders the stops around the departure time. The draft is reviewed before it is saved.",
    dec: ["01", "04"],
    steps: [
      st("phone-ai-1", "Describe the day"),
      st("phone-ai-2", "Review what AI suggests"),
      st("phone-ai-3", "AI builds the route"),
      st("phone-ai-4", "The finished trip"),
      st("phone-ai-5", "Save it"),
    ],
  },
  {
    t: "Saved trips",
    d: "Trips planned days ahead live in a schedule; details open progressively, from a day to its full route.",
    dec: ["03"],
    steps: [
      st("phone-schedule-1", "Open the schedule"),
      st("phone-schedule-2", "Today's trip"),
      st("phone-schedule-3", "Browse by week"),
      st("phone-schedule-4", "Open a day"),
      st("phone-schedule-5", "The full route and stats"),
    ],
  },
];

const CAR_PARKED: Flow[] = [
  {
    t: "The trip on the map",
    d: "Parked, the driver has attention to spare, so the full plan stays in view. Tap a place for a compact card, then the details.",
    dec: ["03"],
    steps: [st("explore-1", "The planned trip on the map"), st("explore-2", "Tap a place: compact card, then full details")],
  },
  {
    t: "Edit by hand",
    d: "Manual editing stays available: select a stop and search for its replacement.",
    dec: ["04"],
    steps: [st("manual-1", "Select a stop"), st("manual-2", "Search to replace it")],
  },
  {
    t: "Edit with AI",
    d: "“Replace the third one with a highly rated Italian restaurant nearby.” AI finds a match and updates the route once approved.",
    dec: ["04"],
    steps: [
      st("ai-1", "Ask AI for a change"),
      st("ai-2", "AI finds the best match"),
      st("ai-3", "Review and save"),
      st("ai-4", "Itinerary updated"),
    ],
  },
  {
    t: "Add a stop",
    d: "The driver chooses where the stop belongs and previews the detour before a nearby Starbucks is inserted.",
    dec: ["01", "04"],
    steps: [
      st("add-stop-1", "Choose where to add"),
      st("add-stop-2", "Nearby Starbucks on the route"),
      st("add-stop-3", "Pick one, preview the detour"),
      st("add-stop-4", "Stop inserted"),
    ],
  },
  {
    t: "Find parking",
    d: "Parking near the stop is marked before leaving, so there is no last-minute search.",
    dec: ["03"],
    steps: [st("parking", "Parking near the stop")],
  },
];

const CAR_DRIVING: Flow[] = [
  {
    t: "Proactive charging",
    d: "Once moving, attention belongs on the road, so interaction shifts to voice. On low battery, AI compares two stations before the next stop and stars one.",
    dec: ["02", "04"],
    steps: [
      st("charging-1", "Battery low: AI finds two options"),
      st("charging-2", "The recommended charger is starred"),
      st("charging-3", "Route to the charger"),
      st("charging-4", "Then on to the next stop"),
    ],
  },
  {
    t: "Adaptive planning",
    d: "If the next stop will be closed, AI suggests a similar open place nearby, and asks before changing anything.",
    dec: ["04"],
    steps: [
      st("adapt-1", "The next stop will be closed"),
      st("adapt-2", "An open alternative"),
      st("adapt-3", "New route, navigation starts"),
    ],
  },
];

/* ---------- decision + supporting content ---------- */

const DECISION_INDEX = [
  { n: "01", k: "Problem", v: "Multi-stop planning, not search or navigation" },
  { n: "02", k: "Platform", v: "A native Tesla in-car concept, not a maps add-on" },
  { n: "03", k: "Context", v: "One planner, three interaction modes" },
  { n: "04", k: "AI & control", v: "AI suggests; the driver approves every change" },
];

const BEFORE = [
  { t: "Find places", s: "Reddit · Xiaohongshu · friends" },
  { t: "Check each one", s: "Google Maps, one at a time" },
  { t: "Compare", s: "Distance · hours · price" },
  { t: "Rebuild the route", s: "Navigation, stop by stop" },
];
const AFTER = [
  { t: "Say the intent", s: "“Coffee, the dog, not much driving”" },
  { t: "Review the draft", s: "AI orders the stops" },
  { t: "Edit", s: "Swap or add a stop" },
  { t: "Drive", s: "The car picks up the plan" },
];

const OPTIONS = [
  {
    t: "A · Add to a maps app",
    chosen: false,
    pros: ["Familiar, works in any car"],
    cons: ["Plan stays separate from the car’s navigation", "Limited by third-party APIs and permissions"],
  },
  {
    t: "B · Native in-car concept on Tesla",
    chosen: true,
    pros: ["Planning, charging and navigation in one place", "Can use battery and route context, if access existed"],
    cons: ["Tesla drivers only", "Needs platform approval and vehicle data access"],
  },
];

const STAGES = [
  { id: "A", t: "Before the trip", where: "Phone", img: "phone-prefs-2", phone: true, mode: "Touch · full control", attn: 3 },
  { id: "B", t: "Parked", where: "Car screen", img: "explore-1", phone: false, mode: "Touch · quick edits", attn: 2 },
  { id: "C", t: "Driving", where: "Car screen", img: "charging-2", phone: false, mode: "Voice · confirm only", attn: 1 },
];

const APPROVAL = [
  { k: "Suggest", img: "ai-2", s: "AI finds a highly rated Italian place nearby" },
  { k: "Review", img: "ai-3", s: "The driver checks it before anything is saved" },
  { k: "Approve", img: "ai-4", s: "Only then does the route update" },
];

const EVIDENCE = [
  { src: "Personal observation", body: "Places that looked good alone were far apart. Each needed its own check." },
  { src: "5 Tesla driver interviews", body: <>In a feature-ranking exercise, <B>multi-stop planning</B> and <B>less planning effort</B> were among the top needs.</> },
  { src: "Community · Reddit, Xiaohongshu", body: "Multi-stop trips mean switching apps and stitching stops together by hand." },
  { src: "Competitors · Tesla, Xiaomi, Lucid, Mercedes", body: "In a car, attention is the limit. Features buried in menus get forgotten." },
];

type Status = "designed" | "concept" | "future";
const PRIORITIES: { tier: string; note: string; items: [string, Status][] }[] = [
  {
    tier: "Core",
    note: "No product without these",
    items: [
      ["Trip from an intention", "designed"],
      ["Multi-stop route by distance and time", "designed"],
      ["Editable itinerary", "designed"],
      ["Detour preview", "designed"],
      ["Approval before AI changes", "designed"],
    ],
  },
  {
    tier: "Supporting",
    note: "Make the core easier to use",
    items: [
      ["Saved trips and schedule", "designed"],
      ["Place details and filters", "designed"],
      ["Charging suggestions", "designed"],
      ["Live checks: hours, price, battery", "concept"],
      ["Bigger choices wait until parked", "concept"],
    ],
  },
  {
    tier: "Later",
    note: "Need more data or research",
    items: [
      ["Personalisation from past trips", "future"],
      ["Group preferences", "future"],
      ["Budget planning", "future"],
      ["Pet-friendly and dietary filters", "future"],
      ["Other vehicle platforms", "future"],
    ],
  },
];

const DEPENDENCIES = [
  "Maps, routing, live traffic",
  "Place data and opening hours",
  "Vehicle and battery data, with permission",
  "Charger availability",
  "AI checked against live data",
  "Privacy of saved preferences",
  "In-car distraction limits",
  "Tesla platform approval",
];

const VALIDATION = [
  ["Planning effort", "Time to a feasible trip vs. current apps"],
  ["Feasibility", "% of stops that fit hours, time and budget"],
  ["Relevance", "Accept / edit / reject rate of suggestions"],
  ["Editing", "Taps or voice turns to swap a stop"],
  ["Trust", "Can users explain why a place was suggested?"],
  ["Safety", "Glance time, measured in a simulator"],
];

/* ---------- pieces ---------- */

function Article({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Reveal className="grid gap-6 px-3 md:grid-cols-[1.35fr_1fr] md:gap-8">
      <h2 className={H2}>{title}</h2>
      <div className={`${BODY} flex max-w-[520px] flex-col gap-5`}>{children}</div>
    </Reveal>
  );
}

/** Small tag linking a screen flow back to the product decision it puts into practice. */
function DecTags({ dec }: { dec: string[] }) {
  return (
    <span className="mt-2 flex flex-wrap gap-1.5">
      {dec.map((d) => (
        <a key={d} href={`#decision-${d}`} className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-white/55 transition-colors hover:border-white/50 hover:text-white">
          {`Decision ${d}`}
        </a>
      ))}
    </span>
  );
}

// Every car image has the main screen at the top-left (the map ends at x = 1600, height 940); wider or taller exports
// add floating cards. The box is the main screen, so all screens line up; cards extend past it, uncropped.
const CAR_W: Record<string, number> = { "explore-2": 1870, "ai-2": 1947, "charging-1": 1956, "adapt-1": 1949 };
// exports with a card that hangs out of the screen (to the right or below); every other screen is clipped to its box
const CAR_CARDS = new Set(["explore-2", "ai-1", "ai-2", "ai-3", "ai-4", "manual-1", "charging-1", "adapt-1"]);

/** A car screen: the main display in a fixed box (all the same size, aligned), cards hanging out of it; no frame. */
function Car({ n, alt }: { n: string; alt: string }) {
  const w = CAR_W[n] ?? 1632;
  return (
    <div className={`relative ${CAR_CARDS.has(n) ? "" : "overflow-hidden rounded-[10px]"}`} style={{ aspectRatio: "1600 / 940" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${T}/${n}.webp`} alt={alt} loading="lazy" className="absolute left-0 top-0 block h-auto max-w-none" style={{ width: `${(w / 1600) * 100}%` }} />
    </div>
  );
}

/** A car flow: the note on the left (sticky), the steps stacked on the right with room between them. */
function CarFlow({ f, n }: { f: Flow; n: string }) {
  return (
    <div className="grid gap-6 px-3 md:grid-cols-[1fr_2fr] md:gap-8">
      <Reveal className="md:sticky md:top-24 md:self-start md:pt-2">
        <p className={LABEL}>{n}</p>
        <p className="mt-1 text-[14px] text-white">{f.t}</p>
        <p className="mt-1.5 max-w-[340px] text-[13px] leading-[20px] text-white/55">{f.d}</p>
        <DecTags dec={f.dec} />
      </Reveal>
      <div className="flex flex-col gap-14 md:gap-20">
        {f.steps.map((s, i) => (
          <Reveal key={s.img} className="max-w-[620px]">
            <p className={`${LABEL} mb-2`}>
              {f.steps.length > 1 && `${i + 1}  ·  `}
              {s.en}
            </p>
            <Car n={s.img} alt={s.en} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** A phone flow: title + note, then the steps three to a row with a caption under each. */
function PhoneFlow({ f }: { f: Flow }) {
  const rows: Step[][] = [];
  for (let i = 0; i < f.steps.length; i += 3) rows.push(f.steps.slice(i, i + 3));
  return (
    <div className="flex flex-col gap-2">
      <Article title={f.t}>
        <p>
          {f.d}
          <DecTags dec={f.dec} />
        </p>
      </Article>
      <Reveal className="flex flex-col gap-14 px-[4%] py-[4vw]">
        {rows.map((r, k) => (
          <div key={k} className="flex justify-center gap-[6%]">
            {r.map((s) => {
              const idx = f.steps.indexOf(s) + 1;
              return (
                <div key={s.img} className="w-[27%] max-w-[256px] md:w-[18%]">
                  <Shot src={`${T}/${s.img}.webp`} alt={s.en} frame className="w-full" />
                  <p className={`${LABEL} mt-3`}>
                    {f.steps.length > 1 && `${idx}  ·  `}
                    {s.en}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </Reveal>
    </div>
  );
}

function Divider({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div id={id} className="scroll-mt-24 px-3">
      <p className={DIVIDER}>{children}</p>
      <div className="mt-2 h-px bg-white/15" />
    </div>
  );
}

/** A product decision: number, title and three one-line statements on the left (sticky); its visual on the right. */
function Decision({ n, title, decision, why, tradeoff, children }: { n: string; title: string; decision: ReactNode; why: ReactNode; tradeoff: ReactNode; children: ReactNode }) {
  const rows: [string, ReactNode][] = [
    ["Why", why],
    ["Trade-off", tradeoff],
  ];
  return (
    <div id={`decision-${n}`} className="scroll-mt-24 grid gap-8 px-3 md:grid-cols-[1fr_2fr] md:gap-10">
      <Reveal className="md:sticky md:top-24 md:self-start">
        <p className="text-[12px] text-white/40">
          <span style={{ color: BLUE }}>{n}</span> · {title}
        </p>
        <p className="mt-3 max-w-[360px] text-[20px] leading-[28px] text-white md:text-[22px] md:leading-[30px]">{decision}</p>
        <dl className="mt-5 flex max-w-[360px] flex-col gap-3">
          {rows.map(([k, v]) => (
            <div key={k} className="border-t border-white/10 pt-3">
              <dt className="text-[11px] uppercase tracking-[0.12em] text-white/35">{k}</dt>
              <dd className="mt-1 text-[14px] leading-[21px] text-white/65">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal className="min-w-0">{children}</Reveal>
    </div>
  );
}

/** One row of a workflow (Decision 01): numbered steps with arrows between them. */
function Workflow({ label, steps, after }: { label: string; steps: { t: string; s: string }[]; after?: boolean }) {
  return (
    <div>
      <p className="mb-3 text-[12px]" style={{ color: after ? BLUE : "rgb(255 255 255 / 0.45)" }}>
        {label}
      </p>
      <ol className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-0">
        {steps.map((s, i) => (
          <li key={s.t} className="flex items-stretch">
            <div
              className="flex-1 rounded-[10px] border p-3"
              style={after ? { borderColor: `${BLUE}66`, background: `${BLUE}12` } : { borderColor: "rgb(255 255 255 / 0.12)" }}
            >
              <p className={`text-[11px] ${after ? "text-white/50" : "text-white/30"}`}>{i + 1}</p>
              <p className={`mt-1 text-[14px] leading-[19px] ${after ? "text-white" : "text-white/55"}`}>{s.t}</p>
              <p className={`mt-1 text-[12px] leading-[17px] ${after ? "text-white/55" : "text-white/35"}`}>{s.s}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="hidden w-6 shrink-0 items-center justify-center text-[13px] md:flex" style={{ color: after ? BLUE : "rgb(255 255 255 / 0.25)" }}>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Three dots: how much attention the driver can give the screen. */
function Attention({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Attention available: ${n} of 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i <= n ? BLUE : "rgb(255 255 255 / 0.18)" }} />
      ))}
    </span>
  );
}

const TAG: Record<Status, { label: string; cls: string; style?: CSSProperties }> = {
  designed: { label: "Designed", cls: "", style: { color: BLUE, border: `1px solid ${BLUE}66` } },
  concept: { label: "Concept", cls: "border border-white/35 text-white/70" },
  future: { label: "Future", cls: "border border-dashed border-white/30 text-white/45" },
};
function StatusTag({ s }: { s: Status }) {
  const t = TAG[s];
  return (
    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] leading-[14px] ${t.cls}`} style={t.style}>
      {t.label}
    </span>
  );
}

/* ---------- page ---------- */

export default function AiTripPlanning() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${T}/card-interior.jpg`} alt="The AI trip planner on a car's centre screen at night" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-black/30 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              <h1 className="text-[16px] text-white">AI Trip Planning</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <>Start with an intention, <B>not a destination.</B></>
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">Independent concept / 2026</p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["Automotive UX", "Mobile", "AI"].map((t) => (
                <span key={t} className="rounded-full border border-white/40 px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="pt-16 md:pt-24">
        <div className="grid gap-10 px-3 md:grid-cols-2 md:gap-8">
          <Reveal>
            <p className="max-w-[560px] text-[20px] leading-[28px] text-white md:text-[24px] md:leading-[32px]">
              Navigation gets you to one place. This concept helps drivers <B>decide where to go</B>, combine stops into <B>one feasible trip</B>, and <B>adjust it</B> when plans change.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <p className={`${BODY} max-w-[520px]`}>
              Planning a day out often took me more effort than the day itself: checking each place for distance, hours and fit, across several apps. An independent concept, shaped by my interest in in-car UX from a NIO internship; not a NIO or Tesla project.
            </p>
            <div className="flex flex-wrap gap-8">
              {[
                ["Platform", "Car screen · Phone"],
                ["Role", "Solo: research, product, design"],
                ["Status", "Concept · Figma prototype"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className={LABEL}>{k}</p>
                  <p className="text-[14px] text-white/80">{v}</p>
                </div>
              ))}
              <div>
                <p className={LABEL}>Files</p>
                <a href={figma.tripPlanner} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  Figma ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 px-3 md:mt-20">
          <div className="grid border-t border-white/15 md:grid-cols-4">
            {DECISION_INDEX.map((d) => (
              <a
                key={d.n}
                href={`#decision-${d.n}`}
                className="group flex flex-col gap-1 border-b border-white/10 py-4 md:border-b-0 md:border-r md:px-4 md:first:pl-0 md:last:border-r-0"
              >
                <span className="text-[12px] text-white/45">
                  <span style={{ color: BLUE }}>{d.n}</span> · {d.k}
                </span>
                <span className="text-[15px] leading-[22px] text-white/80 transition-colors group-hover:text-white">{d.v}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FOUR DECISIONS */}
      <section className="mt-24 flex flex-col gap-24 md:mt-36 md:gap-36">
        <Divider id="decisions">Four product decisions</Divider>

        <Decision
          n="01"
          title="Choosing the problem"
          decision="Build for multi-stop planning, not search or navigation."
          why="Finding places was easy. Combining them by distance, hours and time was the real work."
          tradeoff="A plan needs far more data than a route, so every draft stays editable."
        >
          <div className="flex flex-col gap-8">
            <Workflow label="Before · several apps, all by hand" steps={BEFORE} />
            <Workflow label="After · one plan, edited in one place" steps={AFTER} after />
          </div>
        </Decision>

        <Decision
          n="02"
          title="Choosing the platform"
          decision="Design a native in-car concept on Tesla, not a maps add-on."
          why="Planning, charging and navigation can live in one place, with no hand-off between apps."
          tradeoff="Tesla drivers only, and it assumes platform access that isn’t available today."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {OPTIONS.map((o) => (
              <div
                key={o.t}
                className="rounded-[12px] border p-5"
                style={o.chosen ? { borderColor: `${BLUE}88`, background: `${BLUE}10` } : { borderColor: "rgb(255 255 255 / 0.12)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-[14px] ${o.chosen ? "text-white" : "text-white/55"}`}>{o.t}</p>
                  {o.chosen && (
                    <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ color: BLUE, border: `1px solid ${BLUE}88` }}>
                      Chosen
                    </span>
                  )}
                </div>
                <ul className="mt-4 flex flex-col gap-2 text-[13px] leading-[19px]">
                  {o.pros.map((p) => (
                    <li key={p} className={`flex gap-2 ${o.chosen ? "text-white/80" : "text-white/50"}`}>
                      <span style={{ color: BLUE }}>+</span>
                      {p}
                    </li>
                  ))}
                  {o.cons.map((c) => (
                    <li key={c} className={`flex gap-2 ${o.chosen ? "text-white/60" : "text-white/40"}`}>
                      <span className="text-white/40">−</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={`${LABEL} mt-3`}>A design focus, not a Tesla project or endorsement.</p>
        </Decision>

        <Decision
          n="03"
          title="Designing for context"
          decision="One planner, three interaction modes."
          why="People plan days ahead, decide in a parked car, and change plans mid-drive."
          tradeoff="The more the car moves, the less control the screen offers."
        >
          <div className="relative">
            <div aria-hidden className="absolute left-[16.6%] right-[16.6%] top-[5px] hidden h-px bg-white/15 md:block" />
            <div className="grid gap-8 md:grid-cols-3 md:gap-4">
              {STAGES.map((s) => (
                <a key={s.id} href={`#context-${s.id}`} className="group flex flex-col gap-3">
                  <span aria-hidden className="relative mx-auto hidden h-[11px] w-[11px] rounded-full border-2 bg-black md:block" style={{ borderColor: BLUE }} />
                  <div>
                    <p className="text-[14px] text-white">
                      {s.id} · {s.t}
                    </p>
                    <p className={LABEL}>{s.where}</p>
                  </div>
                  <div className="flex items-center justify-center overflow-hidden rounded-[10px] bg-white/[0.03]" style={{ aspectRatio: "1600 / 940" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${T}/${s.img}.webp`}
                      alt={`${s.t}: ${s.where}`}
                      loading="lazy"
                      className={s.phone ? "h-[92%] w-auto" : "h-full w-full object-cover object-left-top"}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] text-white/70">{s.mode}</span>
                    <Attention n={s.attn} />
                  </div>
                  <span className="text-[11px] text-white/35 transition-colors group-hover:text-white/70">See the screens ↓</span>
                </a>
              ))}
            </div>
          </div>
        </Decision>

        <Decision
          n="04"
          title="AI without losing control"
          decision="AI suggests; the driver reviews and approves every change."
          why="AI itineraries still need checking: opening hours, budget, real distances."
          tradeoff="One extra confirm step. While driving, only time-critical alerts interrupt."
        >
          <ol className="grid gap-6 md:grid-cols-[1947fr_1632fr_1632fr] md:gap-4">
            {APPROVAL.map((a, i) => (
              <li key={a.k} className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-[14px] text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px]" style={{ background: BLUE, color: "#000" }}>
                    {i + 1}
                  </span>
                  {a.k}
                  {i < APPROVAL.length - 1 && (
                    <span aria-hidden className="ml-auto hidden text-white/30 md:inline">
                      →
                    </span>
                  )}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${T}/${a.img}.webp`} alt={`${a.k}: ${a.s}`} loading="lazy" className="block h-auto w-full rounded-[8px]" />
                <p className="text-[13px] leading-[19px] text-white/55">{a.s}</p>
              </li>
            ))}
          </ol>
          <p className={`${LABEL} mt-5`}>Same pattern on the road: a stop will be closed → AI offers an open alternative → the driver confirms.</p>
        </Decision>
      </section>

      {/* THE PRODUCT, by context */}
      <section className="mt-36 flex flex-col gap-24 md:mt-52 md:gap-32">
        <div id="product" className="flex scroll-mt-24 flex-col gap-8">
          <Reveal className="flex flex-wrap items-center justify-center gap-2 px-3">
            <span className="mr-1 text-[13px] text-white/70">The product</span>
            {STAGES.map((s) => (
              <a key={s.id} href={`#context-${s.id}`} className="rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/65 transition-colors hover:border-white/50 hover:text-white">
                {s.id} · {s.id === "A" ? "Phone, planning ahead" : s.id === "B" ? "Car, parked" : "Car, driving"}
              </a>
            ))}
          </Reveal>
          <Divider id="context-A">A · Phone · planning ahead</Divider>
        </div>
        {PHONE_FLOWS.map((f) => (
          <PhoneFlow key={f.t} f={f} />
        ))}
      </section>

      <section className="mt-36 flex flex-col gap-28 md:mt-52 md:gap-40">
        <Divider id="context-B">B · Car · parked</Divider>
        {CAR_PARKED.map((f, i) => (
          <CarFlow key={f.t} f={f} n={`B${i + 1}`} />
        ))}
        <Divider id="context-C">C · Car · driving</Divider>
        {CAR_DRIVING.map((f, i) => (
          <CarFlow key={f.t} f={f} n={`C${i + 1}`} />
        ))}
      </section>

      {/* RESEARCH */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52 md:gap-14">
        <Divider id="research">Research</Divider>
        <Reveal className="grid gap-px overflow-hidden rounded-[12px] bg-white/10 px-0 sm:grid-cols-2 lg:grid-cols-4 mx-3">
          {EVIDENCE.map((e) => (
            <div key={e.src} className="flex flex-col gap-2 bg-black p-5">
              <p className="text-[12px] text-white/45">{e.src}</p>
              <p className="text-[15px] leading-[22px] text-white/80">{e.body}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="px-3">
          <p className="mx-auto max-w-[760px] text-center text-[22px] leading-[30px] text-white md:text-[28px] md:leading-[38px]">
            The opportunity: turn recommendations into <B>a plan that actually works.</B>
          </p>
        </Reveal>
      </section>

      {/* WHAT TO BUILD FIRST */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52 md:gap-14">
        <Divider id="priorities">What to build first</Divider>
        <Reveal className="grid gap-px overflow-hidden rounded-[12px] bg-white/10 md:grid-cols-3 mx-3">
          {PRIORITIES.map((p, i) => (
            <div key={p.tier} className="bg-black p-5">
              <p className="text-[14px]" style={{ color: i === 0 ? BLUE : "white" }}>
                {p.tier}
              </p>
              <p className="text-[12px] text-white/40">{p.note}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {p.items.map(([t, s]) => (
                  <li key={t} className="flex items-start justify-between gap-3 text-[13px] leading-[19px] text-white/75">
                    {t}
                    <StatusTag s={s} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
        <Reveal className="px-3">
          <p className={`${LABEL} text-center`}>
            Designed: in the Figma prototype, with mock data · Concept: defined, not prototyped · Future: later. A retrospective ordering, not a formal scoring model.
          </p>
        </Reveal>
      </section>

      {/* FEASIBILITY + VALIDATION */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52 md:gap-14">
        <Divider id="feasibility">Feasibility & validation</Divider>
        <Reveal className="grid gap-3 px-3 md:grid-cols-2">
          <div className="rounded-[12px] border border-white/12 p-5">
            <p className="text-[14px] text-white">Needs engineering or platform access</p>
            <p className="text-[12px] text-white/40">The prototype is Figma screens with mock data. None of this is built.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {DEPENDENCIES.map((d) => (
                <li key={d} className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/70">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[12px] border border-dashed border-white/25 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] text-white">What I would test next</p>
              <span className="rounded-full border border-dashed border-white/30 px-2 py-0.5 text-[10px] text-white/50">Not yet tested</span>
            </div>
            <ol className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {VALIDATION.map(([k, v], i) => (
                <li key={k} className="text-[13px] leading-[19px]">
                  <span className="text-white/35">{i + 1} </span>
                  <span className="text-white">{k}</span>
                  <span className="block text-white/55">{v}</span>
                </li>
              ))}
            </ol>
            <p className={`${LABEL} mt-4 border-t border-white/10 pt-3`}>First round: 5–6 drivers plan a real weekend trip, then handle one closed stop.</p>
          </div>
        </Reveal>
      </section>

      {/* REFLECTION */}
      <section className="mt-36 md:mt-52">
        <Divider id="reflection">Reflection</Divider>
        <Reveal className="mt-12 px-3 md:mt-16">
          <p className="mx-auto max-w-[820px] text-center text-[22px] leading-[30px] text-white md:text-[28px] md:leading-[38px]">
            The hard part wasn’t the AI interface. It was deciding <B>where AI should help</B>, what data it needs, and <B>when the driver stays in control</B>.
          </p>
        </Reveal>
      </section>

      {/* DESIGN SYSTEM & SUPPORTING MATERIALS */}
      <section className="mt-36 flex flex-col gap-16 md:mt-52 md:gap-20">
        <Divider>Design system</Divider>
        <Reveal className="px-3">
          <TripDesignSystem />
        </Reveal>
      </section>

      <section className="mt-36 flex flex-col gap-16 md:mt-52 md:gap-20">
        <Divider>Supporting materials</Divider>
        <Article title="Every flow, before any screen">
          <p>
            Low-fidelity flows define every core feature; the high-fidelity screens above are the most representative.{" "}
            <a href={figma.tripWireframes} target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
              All flows in Figma ↗
            </a>
          </p>
        </Article>
        <Reveal className="mx-auto flex w-full max-w-[720px] flex-col gap-16 px-3 md:gap-20">
          {[
            ["wireframes-car-flows", "Low-fidelity wireframes of the in-car flows"],
            ["wireframes-phone-flows", "Low-fidelity wireframes of the phone flows"],
          ].map(([n, alt]) => (
            <a key={n} href={`${T}/${n}.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${T}/${n}.webp`} alt={alt} width={2000} height={1304} loading="lazy" className="block h-auto w-full rounded-[10px]" />
            </a>
          ))}
        </Reveal>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

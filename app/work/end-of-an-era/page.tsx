import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { DeviceStrip, Showcase, type Frame, type Placed, type Callout } from "@/components/case/device";
import { FRAMES } from "./frames";
import { Box, Cards, Chip, Container, P, Pull, Section, Stack, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { TactileHighlight as H } from "@/components/ui/tactile-highlight";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person, selectedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `End of an Era — ${person.name}`,
  description: "Core workflow design for a legal-tech estate-settlement platform.",
};

// Full flow, every variant and edge case, lives in Figma.
const FIGMA_LINK = figma.endOfAnEra;

const NAV: CaseNavItem[] = [
  { id: "background", index: "01", label: "Project Background" },
  { id: "challenge", index: "02", label: "The Design Challenge" },
  { id: "insights", index: "03", label: "User Insights" },
  { id: "phase-1", index: "04", label: "Phase 01: Estate Record" },
  { id: "phase-2", index: "05", label: "Phase 02: Debt & Tax" },
  { id: "outcomes", index: "06", label: "Outcomes" },
  { id: "reflection", index: "07", label: "Reflection" },
];

const SCOPE = ["Workflow Design", "Information Architecture", "User Flows", "Interaction Design", "High-Fidelity UI"];

// Screens extracted from the Figma frame PDFs (reference/end-of-an-era/pdfs), one set per category.
const E = "/images/eoe";
type Raw = [w: number, h: number, label: string];
type Screen = { frame: Frame; label: string };
const fr = (name: keyof typeof FRAMES, alt: string): Frame => {
  const f = FRAMES[name];
  return { src: `${E}/${name}.webp`, w: f.w, h: f.h, win: f.win ? [...f.win] : null, alt };
};
const set = (prefix: string, items: Raw[], order?: number[]): Screen[] =>
  (order ?? items.map((_, i) => i + 1)).map((n) => {
    const label = items[n - 1][2];
    return { frame: fr(`${prefix}-${n}` as keyof typeof FRAMES, label), label };
  });

const FIND_PLANNER = set("find-planner", [
  [1800, 2200, "Checklist with planning-phase files already attached"],
  [1800, 1395, "The will, pre-uploaded during planning"],
  [1800, 1323, "Adding a newer version alongside it"],
  [1800, 1614, "Pre-uploaded and newly added files, side by side"],
]);
const FIND_NOPLANNER = set("find-noplanner", [
  [1800, 2200, "Checklist: 0 of 8 tasks, nothing on file"],
  [1800, 1323, "Find the Will & Codicils, an empty upload step"],
  [1800, 1323, "File selected, ready to confirm"],
  [1800, 1371, "Uploaded and marked complete"],
  [1800, 1474, "On to the next step: living trust documents"],
]);
const TIA_PLANNER = set("tia-planner", [
  [1800, 1323, "Accounts imported from planning"],
  [1800, 2249, "Add Account with details pre-filled and a balance to confirm"],
  [1800, 2276, "Balance confirmed and locked"],
  [1800, 2276, "Editing a confirmed balance"],
  [1800, 2276, "Re-confirming the change"],
  [1800, 2276, "Updated balance confirmed"],
  [1800, 1323, "Income sources imported from planning"],
  [1227, 2396, "The full Add Income form"],
  [1800, 1323, "Income sources, ready to track"],
]);
const TIA_NOPLANNER = set("tia-noplanner", [
  [1800, 1229, "No accounts or income sources yet"],
  [1800, 2070, "Add Account"],
  [1637, 2395, "Choosing the account type"],
  [1800, 1351, "First account added; income still empty"],
  [1793, 2395, "Add Income"],
  [1217, 2396, "Income source options"],
  [1800, 1323, "Income sources recorded"],
]);
const RE_PLANNER = set("realestate-planner", [[1800, 1323, "Properties and vehicles imported from planning, with status tags"]]);
const RE_NOPLANNER = set("realestate-noplanner", [
  [1800, 1323, "Empty: no properties or vehicles yet"],
  [1736, 2394, "Add Primary Residence"],
  [1800, 1323, "First property recorded"],
  [1715, 2394, "Add Vehicle"],
  [1800, 1323, "Property and vehicle recorded"],
]);
const PERSONAL_NOPLANNER = set("personal-noplanner", [
  [1800, 1347, "Empty: belongings and digital assets"],
  [1400, 2374, "Add Jewelry and Watches"],
  [1800, 1323, "Belongings catalogued, with appraisal and distribution status"],
]);
const BUSINESS_NOPLANNER = set("business-noplanner", [
  [1130, 1052, "Business Interests & Appraisals as step 15 of Secure & Inventory Assets"],
  [1662, 2400, "Appraisal tracking: confirmed value, valuations, and reports"],
]);
const LIAB_PLANNER = set(
  "liab-planner",
  [
    [1800, 2318, "Debts overview, with planning-phase files attached"],
    [1800, 1417, "Credit report pre-uploaded from planning (Equifax)"],
    [1800, 1323, "Adding a second report (Experian)"],
    [1623, 2322, "The Find Mortgage & Property Loans form"],
    [1800, 1528, "Properties and loans listed"],
    [1450, 2319, "The Identify Vehicle Loans form"],
    [1800, 1718, "Vehicles and loans listed"],
    [1731, 1248, "Medical bills recorded, with status"],
    [1800, 1414, "Back in Secure & Inventory Assets, with liabilities in progress"],
  ],
);
const LIAB_NOPLANNER = set(
  "liab-noplanner",
  [
    [1800, 2318, "Debts overview: 0 of 8 tasks"],
    [1800, 1328, "Pull Credit Reports, with nothing uploaded yet"],
    [1800, 1323, "Report selected, ready to confirm"],
    [1800, 1417, "Report uploaded"],
    [1800, 1528, "Properties and loans listed"],
    [1623, 2322, "The Find Mortgage & Property Loans form"],
    [1450, 2319, "The Identify Vehicle Loans form"],
    [1800, 1718, "Vehicles and loans listed"],
    [1800, 1298, "Medical bills recorded, with status"],
    [1800, 1323, "Back in Secure & Inventory Assets, with liabilities in progress"],
  ],
  [1, 2, 3, 4, 6, 5, 7, 8, 9, 10],
);

// Annotated boards: two cards stacked; devices placed in a 100-wide coordinate space, callouts point at
// window fractions. Each back card's poking-out parts stay clear of the front card's frame.
const DUAL: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("find-noplanner-1", "No Planner estate: Find All Real Accounts checklist, 0 of 8 tasks"), left: 0, top: 15, width: 46 },
    { frame: fr("realestate-planner-1", "Planner estate: properties and vehicles imported from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.37, fy: 0.345, text: "No Planner: progress starts at 0 of 8, and the file is built from scratch." },
    { on: 0, fx: 0.93, fy: 0.47, text: "Every task opens Incomplete, with one next action." },
    { on: 1, fx: 0.5, fy: 0.348, text: "Planner: records arrive from planning with their status already tagged." },
    { on: 1, fx: 0.86, fy: 0.36, text: "The executor reviews, confirms, or updates without re-entering anything." },
    { on: 1, fx: 0.32, fy: 0.83, text: "Supporting documents carry over too." },
  ],
};

const TIA_BOARD: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("tia-planner-1", "Accounts imported from planning"), left: 0, top: 18, width: 46 },
    { frame: fr("tia-planner-3", "Add Account with a confirmed date-of-death balance"), left: 38, top: 0, width: 44 },
  ],
  notes: [
    { on: 0, fx: 0.41, fy: 0.335, text: "Imported accounts arrive with a status…" },
    { on: 0, fx: 0.36, fy: 0.43, text: "…and the exact actions still needed." },
    { on: 1, fx: 0.5, fy: 0.705, text: "A confirmed balance locks, shown in green." },
    { on: 1, fx: 0.64, fy: 0.8, text: "Changing it takes a deliberate Edit Balance and re-confirm." },
  ],
};

const PERSONAL_BOARD: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("personal-noplanner-3", "Belongings catalogued with appraisal and distribution status"), left: 0, top: 8, width: 60 },
    { frame: fr("personal-noplanner-2", "Add Jewelry and Watches form"), left: 55, top: 2, width: 24 },
  ],
  notes: [
    { on: 0, fx: 0.47, fy: 0.488, text: "Appraisal status sits on every item." },
    { on: 0, fx: 0.67, fy: 0.71, text: "Distributed items keep their final value." },
    { on: 1, fx: 0.3, fy: 0.645, text: "Intended recipient captured up front." },
    { on: 1, fx: 0.3, fy: 0.745, text: "Appraisal needs flagged before distribution." },
  ],
};

const LIAB_BOARD: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("liab-noplanner-2", "No Planner: Pull Credit Reports with an empty upload step"), left: 0, top: 16, width: 46 },
    { frame: fr("liab-planner-2", "Planner: credit report pre-uploaded from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.87, fy: 0.395, text: "Document counts show what is still missing." },
    { on: 0, fx: 0.6, fy: 0.71, text: "No Planner: start from an empty upload step." },
    { on: 1, fx: 0.34, fy: 0.61, text: "Planner: the Equifax report is already attached." },
    { on: 1, fx: 0.45, fy: 0.71, text: "Locked unless the executor chooses to update it." },
  ],
};

const IA = [
  { t: "Legal Documents", d: "Will, trust, and other estate documents" },
  { t: "Financial Accounts", d: "Bank and investment accounts, insurance, income sources" },
  { t: "Debts & Liabilities", d: "Mortgage, loans, credit cards, taxes" },
  { t: "Property & Vehicles", d: "Real estate, vehicles, ownership records" },
  { t: "Personal & Digital Property", d: "Jewelry, art, electronics, online accounts, cryptocurrency" },
  { t: "Business Interests & Appraisals", d: "Business ownership, asset valuation, professional appraisals" },
];

const OUTCOMES = [
  "Synthesized 20+ raw estate-settlement business steps into a coherent product flow",
  "Restructured dense, interdependent business logic into a navigable sequence",
  "Designed and documented a unified information architecture across six asset categories",
  "Designed a dual-track user flow (Planner vs. No Planner) from a single set of requirements",
  "Built the data-inheritance logic connecting pre-loaded and manually-entered records",
  "Delivered high-fidelity interface design ready for engineering handoff",
];

const MORE = selectedWork.filter((w) => w.label !== "End of an Era");
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

/** Planner / No Planner label, attached to its screens. */
function StateTag({ state }: { state: "Planner Estate" | "No Planner Estate" }) {
  const planner = state === "Planner Estate";
  return (
    <span
      className={`font-gilroy inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
        planner ? "" : "border border-white/15 text-neutral-300"
      }`}
      style={planner ? { color: "var(--accent-green)", background: "color-mix(in srgb, var(--accent-green) 12%, transparent)" } : undefined}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${planner ? "" : "bg-neutral-500"}`} style={planner ? { background: "var(--accent-green)" } : undefined} />
      {state}
    </span>
  );
}

/** One state of a category: its screens in an aligned, horizontally scrolling strip. */
function StateGroup({ state, screens }: { state: "Planner Estate" | "No Planner Estate"; screens: Screen[] }) {
  const framed = screens.filter((x) => x.frame.win);
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <StateTag state={state} />
        <span className="font-gilroy text-[13px] text-neutral-500">
          {screens.length} {screens.length === 1 ? "screen" : "screens"}
        </span>
      </div>
      <DeviceStrip items={framed} />
    </div>
  );
}

/** A product step from the PDFs: sticky name and intro beside it, then its Planner / No Planner screens. */
function Category({
  name,
  intro,
  planner,
  noPlanner,
  note,
  showcase,
}: {
  name: string;
  intro: ReactNode;
  planner?: Screen[];
  noPlanner?: Screen[];
  note?: string;
  showcase?: ReactNode;
}) {
  return (
    <div className="border-t border-white/[0.08] pt-12 md:pt-16">
      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
        <div>
          <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Product step</span>
          <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
            {name}
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          <P>{intro}</P>
          {note && <p className="font-gilroy text-[14px] italic text-neutral-500">{note}</p>}
        </div>
      </Reveal>
      {showcase && <Reveal className="mt-12 md:mt-16">{showcase}</Reveal>}
      <div className="mt-14 flex flex-col gap-16 md:mt-20">
        {planner && (
          <Reveal>
            <StateGroup state="Planner Estate" screens={planner} />
          </Reveal>
        )}
        {noPlanner && (
          <Reveal>
            <StateGroup state="No Planner Estate" screens={noPlanner} />
          </Reveal>
        )}
      </div>
    </div>
  );
}

export default function EndOfAnEra() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle initial="light" />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#e9e7e2] px-6 pb-[12svh] pt-24">
        <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[18px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]" style={{ aspectRatio: "1800 / 1323" }}>
          <Image
            src={`${E}/realestate-planner-1.webp`}
            alt="End of an Era — the Inventory Real Estate & Vehicles step of the estate-settlement workflow"
            fill
            preload
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.25)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#1F6F6B" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* VIEW FULL DETAIL GATE */}
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
                <div className="rounded-card border border-white/10 bg-white/[0.03] px-6 py-8 text-center md:px-12 md:py-10">
                  <p className="font-gilroy mx-auto max-w-[60ch] text-[16px] leading-[1.7] text-neutral-400">
                    This case study highlights a curated selection of key screens. The complete flow, including every step
                    variant, empty/error states, and edge cases, is documented in Figma.
                  </p>
                  <InteractiveHoverLink
                    href={FIGMA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    text="View Full Detail in Figma"
                    className="font-gilroy mt-6 text-[15px] font-medium"
                  />
                </div>
              </Reveal>
            </Container>
          </section>

          {/* Title */}
          <section className="pt-16 md:pt-24">
            <Container>
              <Reveal>
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">UI/UX Design</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(40px,6.5vw,96px)] font-medium leading-[0.98] tracking-[-0.01em] text-white">
                  End of an Era
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  Core workflow design for a legal-tech estate-settlement platform (internship project)
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
                    End of an Era helps executors handle the legal and financial process of settling a deceased family
                    member&apos;s estate. I designed its core workflow, turning dense legal procedure into steps an
                    ordinary person can act on, track, and understand.
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Designer">Sihan Wang</Meta>
                <Meta label="Date">05/15/2026</Meta>
                <Meta label="Type">Internship project</Meta>
                <Meta label="Platform">Web app</Meta>
              </div>
            </Container>
          </section>

          <section className="py-8">
            <Container>
              <InfoRow label="My Role">
                <div className="flex flex-wrap gap-2">
                  {SCOPE.map((r) => (
                    <Chip key={r} variant="role">
                      {r}
                    </Chip>
                  ))}
                </div>
              </InfoRow>
            </Container>
          </section>

          {/* 01 — BACKGROUND */}
          <Section id="background" index="01" label="Project Background" title="A high-stakes process, handed to people with no training for it.">
            <P>
              When a family member dies, the executor must inventory assets, settle debts, file final tax returns, and distribute
              property to heirs, often <H>within legally mandated timelines</H>.
            </P>
            <P>
              Most executors have <H>no legal or financial background</H>. They do this for the first time, usually while grieving,
              facing scattered information, no clear sequence, and legal duties never explained in plain language.
            </P>
            <P>
              As an intern, I designed the platform&apos;s core workflow: turning dense legal logic into steps executors can{" "}
              <H>act on, track, and understand</H>.
            </P>
          </Section>

          {/* 02 — CHALLENGE */}
          <Section id="challenge" index="02" label="The Design Challenge" title="Twenty steps of legal text, and no product structure.">
            <P>
              I inherited <H>20+ business steps</H> buried in legal and compliance documents. Asset discovery, debt verification, tax
              filing, and payment sequencing all existed only as unstructured text.
            </P>
            <Pull label="The real task">
              <p>Not &ldquo;design the screens,&rdquo; but reorganize a dense legal process into a sequence a non-expert could realistically understand and execute.</p>
              <p>Deciding what to surface, what to defer, and in what order.</p>
            </Pull>
          </Section>

          {/* 03 — INSIGHTS */}
          <WideSection id="insights" index="03" label="User Insights" title="Three problems every executor runs into.">
            <Reveal>
              <Cards
                columns={3}
                items={[
                  {
                    index: "01",
                    title: "Executors don’t know what’s actually in the estate.",
                    body: <p>They typically can&apos;t get quick visibility into bank accounts, investment holdings, real estate, insurance policies, digital assets, credit-card debt, or tax liabilities. The information lives scattered across unrelated institutions and paper files.</p>,
                  },
                  {
                    index: "02",
                    title: "Executors don’t know what to prioritize.",
                    body: <p>Settlement spans multiple concurrent threads (document collection, asset inventory, debt resolution, tax filing, distribution), and there&apos;s no built-in sense of sequence or dependency between them.</p>,
                  },
                  {
                    index: "03",
                    title: "A wrong move can create personal legal liability.",
                    body: <p>Paying certain debts out of order, missing a required tax filing, or overlooking a creditor can expose the executor to personal liability. That isn&apos;t just an inconvenience; it&apos;s a real legal risk.</p>,
                  },
                ]}
              />
            </Reveal>
          </WideSection>

          {/* 04 — PHASE 01 */}
          <WideSection id="phase-1" index="04" label="Phase 01" title="Building a complete estate record.">
            <Stack>
              <div className="grid gap-4 md:grid-cols-2">
                <Box label="Business goal">Establish a complete, trustworthy estate database that every downstream settlement step can rely on.</Box>
                <Box label="User value">
                  Executors can orient themselves in the estate, manage every asset from one place, track progress, and avoid
                  the costly gap of something being missed entirely.
                </Box>
              </div>
            </Stack>

            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
                <div>
                  <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Information architecture</span>
                  <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
                    Six sprawling categories, one coherent structure.
                  </h3>
                </div>
                <P>
                  Six sprawling categories with 10–15 text-only sub-steps each became <H>one coherent information architecture</H>.
                </P>
              </Reveal>
              <Reveal className="mt-10 md:mt-14">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-10">
                  <div className="mx-auto w-fit rounded-full border border-white/15 px-5 py-2">
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-white">Estate Record</span>
                  </div>
                  <div className="mx-auto h-6 w-px bg-white/15" aria-hidden />
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {IA.map((c, i) => (
                      <div key={c.t} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
                        <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-blinker mt-1.5 text-[18px] font-medium leading-tight text-white md:text-[20px]">{c.t}</h4>
                        <p className="font-gilroy mt-2 text-[14px] leading-[1.55] text-neutral-400">{c.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
                <div>
                  <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Key design decision</span>
                  <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
                    A dual-track flow.
                  </h3>
                </div>
                <P>
                  Requirements analysis revealed two different scenarios hiding inside one flow, so I split the design into{" "}
                  <H>two parallel tracks</H>.
                </P>
              </Reveal>
              <Reveal className="mt-10 md:mt-14">
                <div className="mb-6 flex flex-wrap gap-3">
                  <StateTag state="No Planner Estate" />
                  <StateTag state="Planner Estate" />
                </div>
                <Showcase height={72} devices={DUAL.devices} notes={DUAL.notes} />
              </Reveal>
            </div>

            <Category
              name="Find All Real Accounts"
              intro={
                <>
                  Eight document tasks covering the will, trusts, power of attorney, and deeds. Planner documents arrive{" "}
                  <H>already attached</H>; otherwise each is found and uploaded step by step.
                </>
              }
              planner={FIND_PLANNER}
              noPlanner={FIND_NOPLANNER}
            />
            <Category
              name="Track Important Accounts"
              intro={
                <>
                  Accounts and income sources. Imported balances need confirming, and a confirmed balance{" "}
                  <H>stays locked</H> until deliberately edited.
                </>
              }
              planner={TIA_PLANNER}
              noPlanner={TIA_NOPLANNER}
              showcase={<Showcase height={60} devices={TIA_BOARD.devices} notes={TIA_BOARD.notes} />}
            />
            <Category
              name="Inventory Real Estate & Vehicles"
              intro={
                <>
                  Properties and vehicles, each <H>tagged with settlement status</H>: mortgage, title, insurance, and transfer
                  readiness.
                </>
              }
              planner={RE_PLANNER}
              noPlanner={RE_NOPLANNER}
            />
            <Category
              name="Personal & Digital Property"
              intro={
                <>
                  Belongings and digital assets, with value, recipient, and <H>appraisal and distribution status</H>.
                </>
              }
              noPlanner={PERSONAL_NOPLANNER}
              showcase={<Showcase height={54} devices={PERSONAL_BOARD.devices} notes={PERSONAL_BOARD.notes} />}
              note="Only No Planner screens were exported for this step; the Planner variant is in Figma."
            />
            <Category
              name="Business Interests & Appraisals"
              intro={
                <>
                  Which assets need formal valuation, each appraisal&apos;s status, and the <H>date-of-death values</H> behind
                  the estate total.
                </>
              }
              noPlanner={BUSINESS_NOPLANNER}
              note="Only No Planner screens were exported for this step; the Planner variant is in Figma."
            />
          </WideSection>

          {/* 05 — PHASE 02 */}
          <WideSection id="phase-2" index="05" label="Phase 02" title="Guiding users through debt & tax settlement, legally.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <Box label="Business goal">Help users complete debt settlement and tax filing within legal and compliance boundaries.</Box>
                <P>
                  A wrong payment order or a missed filing can make the executor <H>personally liable</H>. The goal: safe guidance through a
                  complex regulatory landscape, without the user needing to know the law.
                </P>
              </div>
            </Stack>

            <Category
              name="Identify Liabilities & Creditors"
              intro={
                <>
                  Planner debt records <H>import automatically</H> for review; a No Planner estate builds them from a
                  structured entry template.
                </>
              }
              planner={LIAB_PLANNER}
              noPlanner={LIAB_NOPLANNER}
              showcase={<Showcase height={52} devices={LIAB_BOARD.devices} notes={LIAB_BOARD.notes} />}
            />

            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Reveal className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                <p className="font-gilroy max-w-[60ch] text-[17px] leading-[1.7] text-neutral-400 md:text-[18px]">
                  The rest of this phase, including debt priority, the secure payment workflow, and tax filing, is documented in
                  full in Figma. If you&apos;d like the complete flow, it&apos;s all there to browse.
                </p>
                <InteractiveHoverLink
                  href={FIGMA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  text="Open in Figma"
                  className="font-gilroy shrink-0 text-[15px] font-medium"
                />
              </Reveal>
            </div>
          </WideSection>

          {/* 06 — OUTCOMES */}
          <Section id="outcomes" index="06" label="Outcomes" title="My contribution.">
            <ol className="border-t border-white/10">
              {OUTCOMES.map((o, i) => (
                <li key={o} className="grid grid-cols-[44px_1fr] gap-3 border-b border-white/10 py-5">
                  <span className="font-blinker pt-0.5 text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-gilroy text-[17px] leading-[1.6] text-neutral-300">{o}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* 07 — REFLECTION */}
          <Section id="reflection" index="07" label="Reflection" title="Systems before screens.">
            <P>
              The hardest part was never the interface. It was turning <H>dense legal and financial logic</H> into a process an
              ordinary person can follow correctly.
            </P>
            <P>
              A rebuilt information architecture, a staged branching workflow, and clear data-carry-forward rules made a
              high-liability legal process <H>trackable, manageable, and executable</H>, and the work stretched my systems thinking.
            </P>
          </Section>
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

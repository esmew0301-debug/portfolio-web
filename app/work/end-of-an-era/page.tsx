import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { FlowGallery, ScreenFrame, type FlowScreen } from "@/components/case/flow-gallery";
import { Box, Cards, Chip, Container, P, Pull, Q, Section, Stack, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { ThemeToggle } from "@/components/case/theme-toggle";
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
  { id: "phase-1", index: "04", label: "Phase 01 — Estate Record" },
  { id: "phase-2", index: "05", label: "Phase 02 — Debt & Tax" },
  { id: "outcomes", index: "06", label: "Outcomes" },
  { id: "reflection", index: "07", label: "Reflection" },
];

const SCOPE = ["Workflow Design", "Information Architecture", "User Flows", "Interaction Design", "High-Fidelity UI"];

// Screens extracted from the Figma frame PDFs (reference/end-of-an-era/pdfs), one set per category.
const E = "/images/eoe";
type Raw = [w: number, h: number, label: string];
const set = (prefix: string, items: Raw[], order?: number[]): FlowScreen[] =>
  (order ?? items.map((_, i) => i + 1)).map((n) => {
    const [w, h, label] = items[n - 1];
    return { src: `${E}/${prefix}-${n}.webp`, w, h, label };
  });

const FIND_PLANNER = set("find-planner", [
  [1800, 2200, "Checklist with planning-phase files already attached"],
  [1800, 1395, "The will, pre-uploaded during planning"],
  [1800, 1323, "Adding a newer version alongside it"],
  [1800, 1614, "Pre-uploaded and newly added files, side by side"],
]);
const FIND_NOPLANNER = set("find-noplanner", [
  [1800, 2200, "Checklist: 0 of 8 tasks, nothing on file"],
  [1800, 1323, "Find the Will & Codicils — an empty upload step"],
  [1800, 1323, "File selected, ready to confirm"],
  [1800, 1371, "Uploaded — step complete"],
  [1800, 1474, "On to the next step: living trust documents"],
]);
const TIA_PLANNER = set("tia-planner", [
  [1800, 1323, "Accounts imported from planning"],
  [1800, 2249, "Add Account — details pre-filled, balance to confirm"],
  [1800, 2276, "Balance confirmed and locked"],
  [1800, 2276, "Editing a confirmed balance"],
  [1800, 2276, "Re-confirming the change"],
  [1800, 2276, "Updated balance confirmed"],
  [1800, 1323, "Income sources imported from planning"],
  [1227, 2396, "Add Income — the full form"],
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
  [1130, 1052, "Secure & Inventory Assets — Business Interests & Appraisals as step 15"],
  [1662, 2400, "Appraisal tracking: confirmed value, valuations, and reports"],
]);
const LIAB_PLANNER = set(
  "liab-planner",
  [
    [1800, 2318, "Debts overview, with planning-phase files attached"],
    [1800, 1417, "Credit report pre-uploaded from planning (Equifax)"],
    [1800, 1323, "Adding a second report (Experian)"],
    [1623, 2322, "Find Mortgage & Property Loans — the entry form"],
    [1800, 1528, "Properties and loans listed"],
    [1450, 2319, "Identify Vehicle Loans — the entry form"],
    [1800, 1718, "Vehicles and loans listed"],
    [1731, 1248, "Medical bills recorded, with status"],
    [1800, 1414, "Back in Secure & Inventory Assets — liabilities in progress"],
  ],
);
const LIAB_NOPLANNER = set(
  "liab-noplanner",
  [
    [1800, 2318, "Debts overview: 0 of 8 tasks"],
    [1800, 1328, "Pull Credit Reports — nothing uploaded yet"],
    [1800, 1323, "Report selected, ready to confirm"],
    [1800, 1417, "Report uploaded"],
    [1800, 1528, "Properties and loans listed"],
    [1623, 2322, "Find Mortgage & Property Loans — the entry form"],
    [1450, 2319, "Identify Vehicle Loans — the entry form"],
    [1800, 1718, "Vehicles and loans listed"],
    [1800, 1298, "Medical bills recorded, with status"],
    [1800, 1323, "Back in Secure & Inventory Assets — liabilities in progress"],
  ],
  [1, 2, 3, 4, 6, 5, 7, 8, 9, 10],
);

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

/** One state of a category: gallery for long flows, framed screens for short ones. */
function StateGroup({ state, screens }: { state: "Planner Estate" | "No Planner Estate"; screens: FlowScreen[] }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <StateTag state={state} />
        <span className="font-gilroy text-[13px] text-neutral-500">
          {screens.length} {screens.length === 1 ? "screen" : "screens"}
        </span>
      </div>
      {screens.length > 4 ? (
        <FlowGallery screens={screens} />
      ) : (
        <div className={`grid gap-6 ${screens.length === 1 ? "mx-auto max-w-[820px]" : screens.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {screens.map((s) => (
            <figure key={s.src}>
              <ScreenFrame screen={s} ratio={screens.length > 1 ? "4 / 3" : undefined} />
              <figcaption className="font-gilroy mt-3 text-[14px] text-neutral-400">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
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
}: {
  name: string;
  intro: ReactNode;
  planner?: FlowScreen[];
  noPlanner?: FlowScreen[];
  note?: string;
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
      <div className="mt-10 flex flex-col gap-14 md:mt-14">
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

function ScreenSlot({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-[20px] border border-dashed border-white/15 bg-white/[0.03] px-6 py-10 text-center">
      <span className="font-gilroy rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-neutral-300">{label}</span>
      <p className="font-gilroy mt-4 text-[15px] text-neutral-400">{title}</p>
      <p className="font-gilroy mt-1 text-[12px] uppercase tracking-[0.2em] text-neutral-500">Screenshot to be added</p>
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
                    This case study highlights a curated selection of key screens. The complete flow — including every step
                    variant, empty/error states, and edge cases — is documented in Figma.
                  </p>
                  <a
                    href={FIGMA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="font-gilroy group mt-6 inline-flex items-center gap-2 rounded-[6px] bg-[#111] px-9 py-3.5 text-[15px] tracking-wide text-[#fff] ring-1 ring-white/15 transition-colors duration-300 hover:bg-[#2a2a2a]"
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                      View Full Detail in Figma
                    </span>
                    <span aria-hidden>↗</span>
                  </a>
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
                    member&apos;s estate. I designed its core workflow — turning dense legal procedure into steps an
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
              Estate administration is a complex, high-stakes legal process. When a family member passes away, the person
              named as executor becomes responsible for locating and inventorying assets, settling outstanding debts, filing
              final tax returns, and distributing the remaining property to heirs — often within legally mandated timelines.
            </P>
            <P>
              The problem is that most executors have no legal or financial background. They&apos;re navigating this process
              for the first time, usually while grieving, and they consistently run into the same obstacles: information
              that&apos;s scattered across banks, insurers, and government agencies; a process with no clear sequence; legal
              responsibilities that are never explained in plain language; and significant emotional strain layered on top of
              an already difficult task.
            </P>
            <P>
              During my internship, I worked on the core workflow design for an estate-settlement platform, translating dense
              legal and procedural logic into a product experience that executors could actually act on, track, and
              understand.
            </P>
          </Section>

          {/* 02 — CHALLENGE */}
          <Section id="challenge" index="02" label="The Design Challenge" title="Twenty steps of legal text, and no product structure.">
            <P>
              At the outset of the project, I inherited more than twenty distinct estate-processing business steps, spread
              across extensive legal and compliance documentation. The source material existed only as unstructured text —
              asset discovery, document collection, debt verification, tax filing, payment sequencing, and more — with no
              product structure applied to it yet.
            </P>
            <P>Translating that material directly into screens, one step at a time, would have buried the user in information.</P>
            <Pull label="The real task">
              <p>Not &ldquo;design the screens&rdquo; — but reorganize a dense legal process into a sequence a non-expert could realistically understand and execute.</p>
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
                    body: <p>They typically can&apos;t get quick visibility into bank accounts, investment holdings, real estate, insurance policies, digital assets, credit-card debt, or tax liabilities — the information lives scattered across unrelated institutions and paper files.</p>,
                  },
                  {
                    index: "02",
                    title: "Executors don’t know what to prioritize.",
                    body: <p>Settlement spans multiple concurrent threads — document collection, asset inventory, debt resolution, tax filing, distribution — and there&apos;s no built-in sense of sequence or dependency between them.</p>,
                  },
                  {
                    index: "03",
                    title: "A wrong move can create personal legal liability.",
                    body: <p>Paying certain debts out of order, missing a required tax filing, or overlooking a creditor can expose the executor to personal liability — this isn&apos;t just an inconvenience, it&apos;s a real legal risk.</p>,
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
                  The original requirements arrived as six sprawling business categories with roughly 10–15 sub-steps each,
                  described only in text. I reorganized this into a single, coherent information architecture.
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
                  Midway through requirements analysis, I identified two fundamentally different user scenarios hiding inside
                  what had been treated as a single flow — and split the design into <Q>two parallel tracks</Q>.
                </P>
              </Reveal>
              <Reveal className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-6">
                <figure>
                  <StateTag state="No Planner Estate" />
                  <ScreenFrame className="mt-4" screen={FIND_NOPLANNER[0]} ratio="4 / 3" />
                  <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                    No pre-planning, so no records. The executor builds the estate file from scratch through a guided checklist
                    that always presents <span className="text-white">exactly one next action</span>.
                  </figcaption>
                </figure>
                <figure>
                  <StateTag state="Planner Estate" />
                  <ScreenFrame className="mt-4" screen={RE_PLANNER[0]} ratio="4 / 3" />
                  <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                    Assets recorded during the decedent&apos;s lifetime auto-populate. The executor&apos;s job shifts from data
                    entry to verification: <span className="text-white">Review, Confirm, and Update</span>.
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Category
              name="Find All Real Accounts"
              intro="Eight document tasks — the will, trusts, power of attorney, deeds and more. In a Planner estate, documents uploaded during planning are already attached and only need confirming; otherwise each one is found and uploaded step by step."
              planner={FIND_PLANNER}
              noPlanner={FIND_NOPLANNER}
            />
            <Category
              name="Track Important Accounts"
              intro="Bank accounts and income sources. Imported records arrive with balances to confirm, and a confirmed balance is locked until it's deliberately edited and re-confirmed; a blank estate starts from the add forms."
              planner={TIA_PLANNER}
              noPlanner={TIA_NOPLANNER}
            />
            <Category
              name="Inventory Real Estate & Vehicles"
              intro="Properties and vehicles, each with settlement status — mortgage, title, insurance, transfer readiness — tagged so the executor can see what still needs action."
              planner={RE_PLANNER}
              noPlanner={RE_NOPLANNER}
            />
            <Category
              name="Personal & Digital Property"
              intro="Belongings and digital assets, catalogued with value, location, intended recipient, appraisal needs, and distribution status."
              noPlanner={PERSONAL_NOPLANNER}
              note="Only No Planner screens were exported for this step; the Planner variant is in Figma."
            />
            <Category
              name="Business Interests & Appraisals"
              intro="The last inventory step: which assets need a formal valuation, the status of each appraisal, and the confirmed date-of-death values that feed the total estate value."
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
                  An incorrect debt payment order, or a missed tax filing, can expose the executor to personal liability. The
                  objective: clear, safe decision guidance through a complex regulatory landscape —{" "}
                  <Q>without requiring the user to understand the underlying law</Q>.
                </P>
              </div>
            </Stack>

            <Category
              name="Identify Liabilities & Creditors"
              intro="Debt review and organization. For a Planner estate, historical debt records import automatically and the user reviews and supplements them. For a No Planner estate, a structured entry template walks the user through building the debt record from nothing."
              planner={LIAB_PLANNER}
              noPlanner={LIAB_NOPLANNER}
            />

            {[
              {
                t: "Debt priority planning",
                label: "Screen D",
                ph: "Final Payment Preparation / Understand Legal Priority",
                c: "Debt order is organized automatically according to legal priority-of-claims rules, surfaced through priority labels, risk warnings, and a solvency check — so the executor understands which debts must legally be settled first, without researching the statute themselves.",
              },
              {
                t: "Secure payment workflow",
                label: "Screen E",
                ph: "Settle Debts, Expenses & Taxes — workflow overview",
                c: "A strict Validate → Review → Pay gate: unreviewed debts cannot be paid, every payment is logged and traceable, and out-of-sequence payment is actively prevented — directly reducing the executor’s exposure to the liability risk identified earlier.",
                same: true,
              },
              {
                t: "Tax filing identification",
                label: "Screen F",
                ph: "Identify Tax Filings — Tax Profile (Forms 1040, 1041, 706)",
                c: "The system identifies which estate-related tax obligations apply — Form 1040 (final individual income tax), Form 1041 (estate income tax), Form 706 (federal estate tax) — and tracks each as a discrete task, so the executor monitors progress instead of holding the requirements in their head.",
                same: true,
              },
            ].map((s) => (
              <div key={s.t} className="border-t border-white/[0.08] pt-12 md:pt-16">
                <Reveal className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
                  <div>
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Phase 02</span>
                    <h3 className="font-blinker mt-3 text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
                      {s.t}
                    </h3>
                    <div className="mt-5 flex flex-col gap-4">
                      <P>{s.c}</P>
                      {s.same && (
                        <p className="font-gilroy text-[14px] italic text-neutral-500">
                          Identical for Planner and No Planner estates — by this point both paths have converged onto the same
                          verified dataset.
                        </p>
                      )}
                    </div>
                  </div>
                  <ScreenSlot label={s.label} title={s.ph} />
                </Reveal>
              </div>
            ))}
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
              The hardest part of this project was never the interface itself — it was translating dense legal and financial
              logic into a digital process an ordinary person could actually follow and execute correctly.
            </P>
            <P>
              By rebuilding the information architecture, designing a staged, branching workflow, and establishing clear rules
              for how data carries forward between stages, I turned what had been an abstract, high-liability legal process
              into something trackable, manageable, and executable — and it pushed my own systems thinking considerably further
              in the process.
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

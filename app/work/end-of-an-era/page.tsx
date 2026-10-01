import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { FlowGallery, ScreenFrame, type FlowScreen } from "@/components/case/flow-gallery";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person } from "@/lib/content";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });

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

// ---------- layout pieces ----------

function Wrap({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return <div className={`mx-auto w-full px-6 md:px-10 ${wide ? "max-w-[1200px]" : "max-w-[860px]"}`}>{children}</div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-gilroy text-[12px] uppercase tracking-[0.32em] text-[#6b665e]">{children}</p>;
}

function H2({ id, eyebrow, children }: { id?: string; eyebrow: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`${serif.className} mt-3 text-[clamp(34px,4.6vw,56px)] font-medium leading-[1.05] tracking-[-0.01em]`}>{children}</h2>
    </div>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="font-gilroy space-y-5 text-[17px] leading-[1.8] text-[#3a3631] md:text-[18px]">{children}</div>;
}

function Tag({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "ink" }) {
  return (
    <span
      className="font-gilroy inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
      style={tone === "teal" ? { color: "#1F6F6B", borderColor: "rgba(31,111,107,0.35)", background: "rgba(31,111,107,0.06)" } : { color: "#1a1a1a", borderColor: "rgba(26,26,26,0.2)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone === "teal" ? "#1F6F6B" : "#1a1a1a" }} />
      {children}
    </span>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="font-gilroy mt-4 max-w-[64ch] text-[15px] leading-[1.7] text-[#6b665e]">{children}</p>;
}

/** One state of a category: gallery for long flows, framed screens for short ones. */
function StateGroup({ state, screens }: { state: "Planner Estate" | "No Planner Estate"; screens: FlowScreen[] }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <Tag tone={state === "Planner Estate" ? "teal" : "ink"}>{state}</Tag>
        <span className="font-gilroy text-[13px] text-[#6b665e]">
          {screens.length} {screens.length === 1 ? "screen" : "screens"}
        </span>
      </div>
      {screens.length > 4 ? (
        <FlowGallery screens={screens} />
      ) : (
        <div
          className={`grid gap-6 ${
            screens.length === 1 ? "mx-auto max-w-[760px]" : screens.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {screens.map((s) => (
            <figure key={s.src}>
              <ScreenFrame screen={s} ratio={screens.length > 1 ? "4 / 3" : undefined} />
              <figcaption className="font-gilroy mt-3 text-[14px] text-[#3a3631]">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

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
    <section className="border-t border-[#1a1a1a]/10 pt-14 md:pt-20">
      <Reveal>
        <Eyebrow>Product step</Eyebrow>
        <h3 className={`${serif.className} mt-3 text-[clamp(28px,3.4vw,42px)] font-medium leading-[1.1]`}>{name}</h3>
        <div className="mt-5 max-w-[64ch]">
          <Prose>{intro}</Prose>
        </div>
        {note && <p className="font-gilroy mt-4 text-[14px] italic text-[#6b665e]">{note}</p>}
      </Reveal>
      <div className="mt-10 flex flex-col gap-14">
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
    </section>
  );
}

function Placeholder({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[#1a1a1a]/25 px-6 py-10 text-center">
      <Tag tone="ink">{label}</Tag>
      <p className="font-gilroy mt-4 text-[15px] text-[#6b665e]">{title}</p>
      <p className="font-gilroy mt-1 text-[12px] uppercase tracking-[0.2em] text-[#9a948a]">Screenshot to be added</p>
    </div>
  );
}

function SubHead({ children }: { children: ReactNode }) {
  return <h3 className={`${serif.className} text-[clamp(26px,3vw,36px)] font-medium leading-[1.15]`}>{children}</h3>;
}

function GoalCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[10px] border border-[#1a1a1a]/12 bg-white/40 p-6 md:p-7">
      <Eyebrow>{label}</Eyebrow>
      <p className="font-gilroy mt-3 text-[16px] leading-[1.7] text-[#2a2723]">{children}</p>
    </div>
  );
}

export default function EndOfAnEra() {
  return (
    <div id="top" className="eoe-page relative min-h-screen text-[#1a1a1a]" style={{ backgroundColor: "#f2eee7" }}>
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${E}/fabric.jpg)` }} />
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="eoe-end" />
      <ReadTime targetId="eoe-body" />

      <main id="eoe-body" className="relative pb-24 pt-32 md:pt-40">
        {/* VIEW FULL DETAIL GATE */}
        <Wrap>
          <Reveal>
            <div className="rounded-[10px] border border-[#1a1a1a]/15 bg-white/45 px-6 py-8 text-center backdrop-blur-[2px] md:px-12 md:py-10">
              <p className="font-gilroy mx-auto max-w-[56ch] text-[16px] leading-[1.7] text-[#3a3631]">
                This case study highlights a curated selection of key screens. The complete flow — including every step
                variant, empty/error states, and edge cases — is documented in Figma.
              </p>
              <a
                href={FIGMA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="font-gilroy group mt-6 inline-flex items-center gap-2 rounded-[5px] bg-[#111] px-9 py-3.5 text-[15px] tracking-wide text-white transition-colors duration-300 hover:bg-[#2b2b2b]"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                  View Full Detail in Figma
                </span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </Wrap>

        {/* TITLE */}
        <Wrap>
          <Reveal className="pt-20 text-center md:pt-28">
            <Eyebrow>UI/UX Design</Eyebrow>
            <h1 className={`${serif.className} mt-5 text-[clamp(52px,9vw,124px)] font-medium leading-[0.92] tracking-[0.01em]`}>
              END OF AN ERA
            </h1>
            <p className="font-gilroy mt-6 text-[15px] tracking-wide text-[#3a3631]">Sihan Wang — 05/15/2026</p>
            <p className={`${serif.className} mx-auto mt-4 max-w-[40ch] text-[clamp(20px,2.2vw,26px)] italic leading-[1.35] text-[#3a3631]`}>
              Core workflow design for a legal-tech estate-settlement platform (internship project)
            </p>
          </Reveal>
        </Wrap>

        <div className="mt-28 flex flex-col gap-28 md:mt-36 md:gap-36">
          {/* BACKGROUND */}
          <Wrap>
            <Reveal className="flex flex-col gap-8">
              <H2 id="background" eyebrow="Project Background">
                A high-stakes process, handed to people with no training for it.
              </H2>
              <Prose>
                <p>
                  Estate administration is a complex, high-stakes legal process. When a family member passes away, the person
                  named as executor becomes responsible for locating and inventorying assets, settling outstanding debts,
                  filing final tax returns, and distributing the remaining property to heirs — often within legally mandated
                  timelines.
                </p>
                <p>
                  The problem is that most executors have no legal or financial background. They&apos;re navigating this
                  process for the first time, usually while grieving, and they consistently run into the same obstacles:
                  information that&apos;s scattered across banks, insurers, and government agencies; a process with no clear
                  sequence; legal responsibilities that are never explained in plain language; and significant emotional
                  strain layered on top of an already difficult task.
                </p>
                <p>
                  During my internship, I worked on the core workflow design for an estate-settlement platform, translating
                  dense legal and procedural logic into a product experience that executors could actually act on, track,
                  and understand.
                </p>
              </Prose>
            </Reveal>
          </Wrap>

          {/* CHALLENGE */}
          <Wrap>
            <Reveal className="flex flex-col gap-8">
              <H2 id="challenge" eyebrow="The Design Challenge">
                Twenty steps of legal text, and no product structure.
              </H2>
              <Prose>
                <p>
                  At the outset of the project, I inherited more than twenty distinct estate-processing business steps,
                  spread across extensive legal and compliance documentation. The source material existed only as
                  unstructured text — asset discovery, document collection, debt verification, tax filing, payment
                  sequencing, and more — with no product structure applied to it yet.
                </p>
                <p>
                  Translating that material directly into screens, one step at a time, would have buried the user in
                  information.
                </p>
              </Prose>
              <blockquote className={`${serif.className} border-l border-[#1a1a1a]/30 pl-6 text-[clamp(24px,2.6vw,32px)] italic leading-[1.3]`}>
                The real task wasn&apos;t &ldquo;design the screens.&rdquo; It was reorganizing a dense legal process into a
                sequence a non-expert could realistically understand and execute — deciding what to surface, what to defer,
                and in what order.
              </blockquote>
            </Reveal>
          </Wrap>

          {/* INSIGHTS */}
          <Wrap wide>
            <Reveal className="flex flex-col gap-12">
              <div className="mx-auto w-full max-w-[860px]">
                <H2 id="insights" eyebrow="User Insights">
                  Three problems every executor runs into.
                </H2>
              </div>
              <div className="grid gap-10 md:grid-cols-3 md:gap-12">
                {[
                  {
                    t: "Executors don’t know what’s actually in the estate.",
                    b: "They typically can’t get quick visibility into bank accounts, investment holdings, real estate, insurance policies, digital assets, credit-card debt, or tax liabilities — the information lives scattered across unrelated institutions and paper files.",
                  },
                  {
                    t: "Executors don’t know what to prioritize.",
                    b: "Settlement spans multiple concurrent threads — document collection, asset inventory, debt resolution, tax filing, distribution — and there’s no built-in sense of sequence or dependency between them.",
                  },
                  {
                    t: "A wrong move can create personal legal liability.",
                    b: "Paying certain debts out of order, missing a required tax filing, or overlooking a creditor can expose the executor to personal liability — this isn’t just an inconvenience, it’s a real legal risk.",
                  },
                ].map((x, i) => (
                  <div key={x.t}>
                    <span
                      className={`${serif.className} block text-[96px] font-medium leading-none text-transparent`}
                      style={{ WebkitTextStroke: "1px #1a1a1a" }}
                    >
                      {i + 1}
                    </span>
                    <h3 className={`${serif.className} mt-4 text-[24px] font-medium leading-[1.2]`}>{x.t}</h3>
                    <p className="font-gilroy mt-3 text-[15px] leading-[1.75] text-[#3a3631]">{x.b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Wrap>

          {/* PHASE 01 */}
          <Wrap>
            <div className="flex flex-col gap-14">
              <Reveal className="flex flex-col gap-8">
                <H2 id="phase-1" eyebrow="Phase 01">
                  Building a complete estate record.
                </H2>
                <div className="grid gap-4 md:grid-cols-2">
                  <GoalCard label="Business goal">
                    Establish a complete, trustworthy estate database that every downstream settlement step can rely on.
                  </GoalCard>
                  <GoalCard label="User value">
                    Executors can quickly orient themselves within the estate, manage all asset information from one place,
                    track progress over time, and avoid the costly gap of something being missed entirely.
                  </GoalCard>
                </div>
              </Reveal>

              <Reveal className="flex flex-col gap-6">
                <SubHead>Information architecture rebuild</SubHead>
                <Prose>
                  <p>
                    The original requirements arrived as six sprawling business categories with roughly 10–15 sub-steps each,
                    described only in text. I reorganized this into a single, coherent information architecture:
                  </p>
                </Prose>
                <div className="mt-2">
                  <div className="mx-auto mb-3 w-fit rounded-[6px] border border-[#1a1a1a]/25 bg-white/50 px-5 py-2">
                    <span className="font-gilroy text-[13px] uppercase tracking-[0.2em]">Estate Record</span>
                  </div>
                  <div className="mx-auto h-5 w-px bg-[#1a1a1a]/25" aria-hidden />
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {IA.map((c, i) => (
                      <div key={c.t} className="rounded-[8px] border border-[#1a1a1a]/12 bg-white/45 p-5">
                        <span className="font-gilroy text-[12px] tabular-nums text-[#1F6F6B]">{String(i + 1).padStart(2, "0")}</span>
                        <h4 className={`${serif.className} mt-1.5 text-[21px] font-medium leading-[1.15]`}>{c.t}</h4>
                        <p className="font-gilroy mt-2 text-[13.5px] leading-[1.55] text-[#5a554d]">{c.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal className="flex flex-col gap-8">
                <SubHead>Key design decision: a dual-track flow</SubHead>
                <Prose>
                  <p>
                    Midway through requirements analysis, I identified two fundamentally different user scenarios hiding
                    inside what had been treated as a single flow — and split the design into two parallel tracks accordingly.
                  </p>
                </Prose>
              </Reveal>
            </div>
          </Wrap>
          <Wrap wide>
            <Reveal className="-mt-16 grid gap-10 md:-mt-24 md:grid-cols-2 md:gap-8">
              <figure>
                <Tag tone="ink">No Planner Estate</Tag>
                <ScreenFrame className="mt-4" screen={FIND_NOPLANNER[0]} ratio="4 / 3" />
                <Caption>
                  When the decedent never used the platform to pre-plan, the system holds no historical records. The executor
                  is building the estate file entirely from scratch, so the flow is structured as a guided, step-by-step
                  checklist — reducing &ldquo;where do I even start&rdquo; anxiety by always presenting exactly one next action.
                </Caption>
              </figure>
              <figure>
                <Tag>Planner Estate</Tag>
                <ScreenFrame className="mt-4" screen={RE_PLANNER[0]} ratio="4 / 3" />
                <Caption>
                  When the decedent had already recorded their assets on the platform during their lifetime, the system
                  auto-populates that history. The executor&apos;s role shifts from data-entry to verification — their job
                  becomes Review, Confirm, and Update rather than building from zero.
                </Caption>
              </figure>
            </Reveal>
          </Wrap>

          <Wrap wide>
            <div className="mx-auto flex max-w-[1000px] flex-col gap-20">
              <Category
                name="Find All Real Accounts"
                intro={
                  <p>
                    Eight document tasks — the will, trusts, power of attorney, deeds and more. In a Planner estate, documents
                    uploaded during planning are already attached and only need confirming; otherwise each one is found and
                    uploaded step by step.
                  </p>
                }
                planner={FIND_PLANNER}
                noPlanner={FIND_NOPLANNER}
              />
              <Category
                name="Track Important Accounts"
                intro={
                  <p>
                    Bank accounts and income sources. Imported records arrive with balances to confirm, and a confirmed
                    balance is locked until it&apos;s deliberately edited and re-confirmed; a blank estate starts from the add
                    forms.
                  </p>
                }
                planner={TIA_PLANNER}
                noPlanner={TIA_NOPLANNER}
              />
              <Category
                name="Inventory Real Estate & Vehicles"
                intro={
                  <p>
                    Properties and vehicles, each with settlement status — mortgage, title, insurance, transfer readiness —
                    tagged so the executor can see what still needs action.
                  </p>
                }
                planner={RE_PLANNER}
                noPlanner={RE_NOPLANNER}
              />
              <Category
                name="Personal & Digital Property"
                intro={
                  <p>
                    Belongings and digital assets, catalogued with value, location, intended recipient, appraisal needs, and
                    distribution status.
                  </p>
                }
                noPlanner={PERSONAL_NOPLANNER}
                note="Only No Planner screens were exported for this step; the Planner variant is in Figma."
              />
              <Category
                name="Business Interests & Appraisals"
                intro={
                  <p>
                    The last inventory step: which assets need a formal valuation, the status of each appraisal, and the
                    confirmed date-of-death values that feed the total estate value.
                  </p>
                }
                noPlanner={BUSINESS_NOPLANNER}
                note="Only No Planner screens were exported for this step; the Planner variant is in Figma."
              />
            </div>
          </Wrap>

          {/* PHASE 02 */}
          <Wrap>
            <div className="flex flex-col gap-14">
              <Reveal className="flex flex-col gap-8">
                <H2 id="phase-2" eyebrow="Phase 02">
                  Guiding users through debt & tax settlement, legally.
                </H2>
                <GoalCard label="Business goal">
                  Help users complete debt settlement and tax filing within legal and compliance boundaries.
                </GoalCard>
                <Prose>
                  <p>
                    An incorrect debt payment order, or a missed tax filing, can expose the executor to personal liability.
                    The design objective here was to provide clear, safe decision guidance through a genuinely complex
                    regulatory landscape — without requiring the user to understand the underlying law themselves.
                  </p>
                </Prose>
              </Reveal>
            </div>
          </Wrap>
          <Wrap wide>
            <div className="mx-auto -mt-16 flex max-w-[1000px] flex-col gap-20 md:-mt-24">
              <Category
                name="Identify Liabilities & Creditors"
                intro={
                  <p>
                    Debt review and organization. For a Planner estate, historical debt records import automatically and the
                    user reviews and supplements them. For a No Planner estate, the system instead offers a structured entry
                    template that walks the user through building the debt record from nothing.
                  </p>
                }
                planner={LIAB_PLANNER}
                noPlanner={LIAB_NOPLANNER}
              />

              {[
                {
                  t: "Debt priority planning",
                  label: "Screen D",
                  ph: "Final Payment Preparation / Understand Legal Priority",
                  c: "Debt order is organized automatically according to legal priority-of-claims rules, surfaced through priority labels, risk warnings, and a solvency check — so the executor understands which debts must legally be settled first, without needing to research the statute themselves.",
                },
                {
                  t: "Secure payment workflow",
                  label: "Screen E",
                  ph: "Settle Debts, Expenses & Taxes — workflow overview",
                  c: "I built this around a strict Validate → Review → Pay gate: unreviewed debts cannot be paid, every payment is logged and traceable, and the system actively prevents out-of-sequence payment — directly reducing the executor’s exposure to the liability risk identified earlier.",
                  same: true,
                },
                {
                  t: "Tax filing identification",
                  label: "Screen F",
                  ph: "Identify Tax Filings — Tax Profile (Forms 1040, 1041, 706)",
                  c: "The system automatically identifies which estate-related tax obligations apply — Form 1040 (final individual income tax), Form 1041 (estate income tax), Form 706 (federal estate tax) — then tracks each one as a discrete task so the executor can monitor filing progress rather than trying to hold the requirements in their head.",
                  same: true,
                },
              ].map((s) => (
                <section key={s.t} className="border-t border-[#1a1a1a]/10 pt-14 md:pt-20">
                  <Reveal className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12">
                    <div>
                      <SubHead>{s.t}</SubHead>
                      <div className="mt-5">
                        <Prose>
                          <p>{s.c}</p>
                        </Prose>
                      </div>
                      {s.same && (
                        <p className="font-gilroy mt-4 text-[14px] italic text-[#6b665e]">
                          This step is identical for Planner and No Planner estates — by this point both paths have converged
                          onto the same verified dataset.
                        </p>
                      )}
                    </div>
                    <Placeholder label={s.label} title={s.ph} />
                  </Reveal>
                </section>
              ))}
            </div>
          </Wrap>

          {/* OUTCOMES */}
          <Wrap>
            <Reveal className="flex flex-col gap-8">
              <H2 id="outcomes" eyebrow="Outcomes">
                My contribution.
              </H2>
              <ol className="border-t border-[#1a1a1a]/12">
                {OUTCOMES.map((o, i) => (
                  <li key={o} className="grid grid-cols-[44px_1fr] gap-3 border-b border-[#1a1a1a]/12 py-5">
                    <span className="font-gilroy pt-1 text-[13px] tabular-nums text-[#1F6F6B]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-gilroy text-[17px] leading-[1.6] text-[#2a2723]">{o}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </Wrap>

          {/* REFLECTION */}
          <Wrap>
            <Reveal className="flex flex-col gap-8 text-center">
              <div id="reflection" className="scroll-mt-28">
                <Eyebrow>Reflection</Eyebrow>
              </div>
              <p className={`${serif.className} text-[clamp(22px,2.4vw,30px)] italic leading-[1.5] text-[#2a2723]`}>
                The hardest part of this project was never the interface itself — it was translating dense legal and
                financial logic into a digital process an ordinary person could actually follow and execute correctly. By
                rebuilding the information architecture, designing a staged, branching workflow, and establishing clear rules
                for how data carries forward between stages, I turned what had been an abstract, high-liability legal process
                into something trackable, manageable, and executable — and it pushed my own systems thinking considerably
                further in the process.
              </p>
              <a
                href="#top"
                className="font-gilroy mx-auto mt-6 w-fit text-[12px] uppercase tracking-[0.25em] text-[#6b665e] transition-colors hover:text-[#1a1a1a]"
              >
                ↑ Back to top
              </a>
            </Reveal>
          </Wrap>
        </div>
      </main>

      <div id="eoe-end" className="relative z-10">
        <CreativeCTA hrefBase="/" />
      </div>
    </div>
  );
}

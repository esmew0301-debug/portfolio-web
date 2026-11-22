import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { DeviceGrid, Showcase, type Frame, type Placed, type Callout } from "@/components/case/device";
import { EoeDesignSystem } from "@/components/case/eoe-design-system";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { figma, person } from "@/lib/content";
import { FRAMES } from "./frames";

export const metadata: Metadata = {
  title: `End of an Era — ${person.name}`,
  description: "Core workflow design for a legal-tech estate-settlement platform.",
};

// Same black, minimal system as Vegan Kitchen and Tequila (zegzulka.com type scale and spacing). Kept from the earlier
// version: the click-to-bring-forward annotated boards. Every step shows two or four representative screens, two to
// a row, with room left under any card that hangs out of the window so the rows stay evenly spaced.
const ACCENT = "#0090B4"; // the app's blue, readable on black
const E = "/images/eoe";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const TITLE = "text-[20px] leading-[1.2] text-white md:text-[24px]";
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";

type Name = keyof typeof FRAMES;
const fr = (name: Name, alt: string): Frame => {
  const f = FRAMES[name];
  return { src: `${E}/${name}.webp`, w: f.w, h: f.h, win: f.win ? [...f.win] : null, alt };
};
const P = "Planner";
const N = "No Planner";
const sc = (name: Name, tag: string, label: string) => ({ frame: fr(name, `${tag}: ${label}`), label, tag });

/* ---------- key features: annotated boards (click the card behind to bring it forward) ---------- */

type Board = { devices: Placed[]; notes: Callout[] };

const DUAL: Board = {
  devices: [
    { frame: fr("find-noplanner-1", "No Planner estate: Find All Real Accounts checklist, 0 of 8 tasks"), left: 0, top: 15, width: 46 },
    { frame: fr("realestate-planner-1", "Planner estate: properties and vehicles imported from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.37, fy: 0.333, text: "No Planner: starts at 0 of 8.", },
    { on: 0, fx: 0.93, fy: 0.46, text: "Every task has one next action.", },
    { on: 1, fx: 0.5, fy: 0.336, text: "Planner: records arrive tagged.", },
    { on: 1, fx: 0.86, fy: 0.348, text: "Confirm or update, no re-entry.", },
    { on: 1, fx: 0.32, fy: 0.827, text: "Documents carry over too.", },
  ],
};

const TIA_BOARD: Board = {
  devices: [
    { frame: fr("tia-planner-1", "Accounts imported from planning"), left: 0, top: 18, width: 46 },
    { frame: fr("tia-planner-3", "Add Account with a confirmed date-of-death balance"), left: 38, top: 0, width: 44 },
  ],
  notes: [
    { on: 0, fx: 0.41, fy: 0.323, text: "Imported with a status…", },
    { on: 0, fx: 0.36, fy: 0.42, text: "…and the actions still needed.", },
    { on: 1, fx: 0.5, fy: 0.712, text: "A confirmed balance locks.", },
    { on: 1, fx: 0.64, fy: 0.796, text: "Changing it takes a re-confirm.", },
  ],
};

const LIAB_BOARD: Board = {
  devices: [
    { frame: fr("liab-noplanner-2", "No Planner: Pull Credit Reports with an empty upload step"), left: 0, top: 16, width: 46 },
    { frame: fr("liab-planner-2", "Planner: credit report pre-uploaded from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.87, fy: 0.384, text: "Counts show what’s missing.", },
    { on: 0, fx: 0.6, fy: 0.705, text: "No Planner: an empty upload step.", },
    { on: 1, fx: 0.34, fy: 0.603, text: "Planner: the report is attached.", },
    { on: 1, fx: 0.45, fy: 0.705, text: "Locked unless updated.", },
  ],
};

const PERSONAL_BOARD: Board = {
  devices: [
    { frame: fr("personal-noplanner-3", "Belongings catalogued with appraisal and distribution status"), left: 0, top: 8, width: 60 },
    { frame: fr("personal-noplanner-2", "Add Jewelry and Watches form"), left: 55, top: 2, width: 24 },
  ],
  notes: [
    { on: 0, fx: 0.47, fy: 0.479, text: "Appraisal status on every item.", },
    { on: 0, fx: 0.67, fy: 0.705, text: "Distributed items keep their value.", },
    { on: 1, fx: 0.3, fy: 0.645, text: "Recipient captured up front.", },
    { on: 1, fx: 0.3, fy: 0.745, text: "Appraisal needs flagged early.", },
  ],
};

const FEATURES: { t: string; d: string; board: Board; height: number }[] = [
  {
    t: "Two tracks, one flow",
    d: "Planner estates arrive pre-filled; No Planner estates start from zero.",
    board: DUAL,
    height: 72,
  },
  {
    t: "Balances that lock",
    d: "A confirmed date-of-death balance locks, so a valuation can't change by accident.",
    board: TIA_BOARD,
    height: 60,
  },
  {
    t: "Debts carried over",
    d: "Credit reports from planning arrive attached; missing documents are counted, so the gaps are visible.",
    board: LIAB_BOARD,
    height: 52,
  },
  {
    t: "Every belonging, tracked",
    d: "Value, recipient, appraisal and distribution status on each item.",
    board: PERSONAL_BOARD,
    height: 54,
  },
];

// Each step: two or four screens (No Planner and Planner side by side where both exist).
const STEPS: { n: number; t: string; d: string; shots: ReturnType<typeof sc>[] }[] = [
  {
    n: 10,
    t: "Find All Real Accounts",
    d: "Eight document tasks. No Planner starts empty; Planner files arrive already attached.",
    shots: [
      sc("find-noplanner-1", N, "Checklist: 0 of 8 tasks"),
      sc("find-planner-1", P, "Checklist with planning files attached"),
      sc("find-noplanner-4", N, "Uploaded and complete"),
      sc("find-planner-4", P, "Pre-uploaded and new files, side by side"),
    ],
  },
  {
    n: 11,
    t: "Track Important Accounts",
    d: "Accounts and income. A confirmed date-of-death balance stays locked.",
    shots: [
      sc("tia-noplanner-1", N, "No accounts or income yet"),
      sc("tia-planner-1", P, "Accounts imported from planning"),
      sc("tia-noplanner-2", N, "Add Account"),
      sc("tia-planner-3", P, "Balance confirmed and locked"),
    ],
  },
  {
    n: 12,
    t: "Identify Liabilities & Creditors",
    d: "Credit reports, loans and bills. Planner debts import automatically.",
    shots: [
      sc("liab-noplanner-2", N, "Pull Credit Reports, nothing uploaded"),
      sc("liab-planner-2", P, "Credit report pre-uploaded"),
      sc("liab-noplanner-6", N, "Find Mortgage & Property Loans"),
      sc("liab-planner-5", P, "Properties and loans listed"),
    ],
  },
  {
    n: 13,
    t: "Inventory Real Estate & Vehicles",
    d: "Properties and vehicles, each tagged with its settlement status.",
    shots: [
      sc("realestate-noplanner-1", N, "Empty: no properties or vehicles"),
      sc("realestate-planner-1", P, "Imported with status tags"),
      sc("realestate-noplanner-2", N, "Add Primary Residence"),
      sc("realestate-noplanner-5", N, "Property and vehicle recorded"),
    ],
  },
  {
    n: 14,
    t: "Personal & Digital Property",
    d: "Belongings with value, recipient, appraisal and distribution status.",
    shots: [
      sc("personal-noplanner-1", N, "Empty: belongings and digital assets"),
      sc("personal-noplanner-3", N, "Belongings catalogued, with status"),
    ],
  },
  {
    n: 15,
    t: "Business Interests & Appraisals",
    d: "Which assets need a valuation, tracked to a confirmed value.",
    shots: [
      sc("business-noplanner-1", N, "Step 15 of Secure & Inventory Assets"),
      sc("business-noplanner-2", N, "Appraisal tracking"),
    ],
  },
];

/* ---------- pieces ---------- */

function Row({ title, label, children }: { title?: ReactNode; label?: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="grid gap-4 px-3 md:grid-cols-[2fr_1fr] md:gap-8">
      <div>{title && <h2 className={TITLE}>{title}</h2>}</div>
      <div className="max-w-[467px]">
        {label && <p className={`${LABEL} mb-1.5`}>{label}</p>}
        {children && <div className={`${BODY} flex flex-col gap-4`}>{children}</div>}
      </div>
    </Reveal>
  );
}

function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="px-3">
      <p className={DIVIDER}>{children}</p>
      <div className="mt-2 h-px bg-white/15" />
    </div>
  );
}

/* ---------- page ---------- */

export default function EndOfAnEra() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased" style={{ "--accent-green": ACCENT } as React.CSSProperties}>
      {/* HERO: framed split screen */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${E}/page-hero-v3.jpg`} alt="End of an Era on a laptop on a wooden table: the Inventory Real Estate & Vehicles step" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-black/30 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              <h1 className="text-[16px] text-white">End of an Era</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <>Settle an estate, <span style={{ color: ACCENT }}>one step at a time.</span></>
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">Internship / 2026</p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["UI/UX", "Web app", "Internship"].map((t) => (
                <span key={t} className="rounded-full border border-white/40 px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Description + context */}
      <section className="pt-16 md:pt-24">
        <div className="grid gap-12 px-3 md:grid-cols-2 md:gap-8">
          <Reveal>
            <p className="max-w-[560px] text-[20px] leading-[28px] text-white md:text-[24px] md:leading-[32px]">
              {"A legal-tech platform that guides executors through settling a loved one's estate."}
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                Executors must inventory assets, settle debts and file taxes, often within legal deadlines and with no legal or financial background.
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white">
                My scope
              </p>
              <p className={`${BODY} mt-2`}>
                Requirements and workflows for six steps of Secure & Inventory Assets, across two scenarios: Planner (the deceased planned ahead) and No Planner (starting from zero).
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className={LABEL}>
                  My role
                </p>
                <p className="text-[14px] text-white/80">Product Development Intern</p>
              </div>
              <div>
                <p className={LABEL}>
                  Tools
                </p>
                <a href={figma.endOfAnEra} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  Figma ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MIND MAP: mapping the domain before designing */}
      <section className="mt-28 flex flex-col gap-10 md:mt-40">
        <Row title={"Mind map"} label={"Before designing"}>
          <p>
            Estate settlement was new to me, so before defining requirements I mapped the Secure & Inventory stage: six asset categories, the documents to locate, and what each account must record.
          </p>
        </Row>
        <Reveal className="mx-auto w-full max-w-[980px] px-3">
          <a href={`${E}/mindmap.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${E}/mindmap.webp`}
              alt="Mind map of the Secure & Inventory stage: six asset categories, the legal documents to locate, and the fields each account must record"
              width={2404}
              height={1386}
              loading="lazy"
              className="block h-auto w-full"
            />
          </a>
          <p className={`${LABEL} mt-3`}>
            Click to open full size.
          </p>
        </Reveal>
      </section>

      {/* KEY FEATURES: annotated boards */}
      <section className="mt-36 flex flex-col gap-20 md:mt-52 md:gap-28">
        <Divider>
          Key features
        </Divider>
        {FEATURES.map((f) => (
          <div key={f.t} className="flex flex-col gap-10">
            <Row title={f.t}>
              <p>
                {f.d}
              </p>
            </Row>
            <Reveal className="mx-auto w-full max-w-[1120px] px-3">
              {/* the right card's callouts run further out than the left card's */}
              <Showcase height={f.height} devices={f.board.devices} notes={f.board.notes} labelX={80} frontReach={[3, 8]} />
            </Reveal>
          </div>
        ))}
      </section>

      {/* STEPS: two or four screens each */}
      <section className="mt-36 flex flex-col gap-24 md:mt-52 md:gap-32">
        <Divider>
          Six steps
        </Divider>
        {STEPS.map((st) => (
          <div key={st.n} className="flex flex-col gap-10">
            <Row title={st.t} label={`Step ${st.n}`}>
              <p>
                {st.d}
              </p>
            </Row>
            <Reveal className="mx-auto w-full max-w-[1040px] px-3">
              <DeviceGrid items={st.shots} />
            </Reveal>
          </div>
        ))}
      </section>

      {/* DESIGN SYSTEM */}
      <section className="mt-36 md:mt-52">
        <Row title={"Design system"} />
        <Reveal className="mt-20 px-3 md:mt-28">
          <EoeDesignSystem dark />
        </Reveal>
      </section>

      {/* COMPONENTS: cards and buttons */}
      <section className="mt-36 md:mt-52">
        <Row title={"Components"} />
        <Reveal className="mx-auto mt-16 grid max-w-[880px] grid-cols-1 gap-14 px-3 sm:grid-cols-2 sm:gap-16 md:mt-20">
          {[
            { key: "cards", t: "Cards", w: 842, h: 1308, alt: "Category cards and the document checklist bubble in its four states" },
            { key: "buttons", t: "Buttons", w: 974, h: 1334, alt: "Buttons in their states, step tags, checkboxes and radio buttons" },
          ].map((c) => (
            <figure key={c.key}>
              <figcaption className="mb-4 text-[13px] text-white/70">
                {c.t}
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${E}/components-${c.key}.webp`} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="block h-auto w-full max-w-[380px] rounded-[10px]" />
            </figure>
          ))}
        </Reveal>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

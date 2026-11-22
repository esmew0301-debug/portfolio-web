import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: `UniSkin Duo — L'Oréal Men Expert Concept — ${person.name}`,
  description:
    "A student concept for L'Oréal Brandstorm 2025: a foundation and cleansing-oil set that makes complexion products simpler for first-time male users.",
};

// Same black, minimal system as the AI Trip Planning page, visual-first: hero, a short overview, the set itself, the
// survey as data, four product decisions (each a one-line decision / why / trade-off beside its own kind of visual),
// the process, open questions and the team. Gold (the packaging colour) is the only accent.
const I = "/images/loreal";
const GOLD = "#d4af37";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";

const DOWNLOAD = {
  href: "/files/Croissant-au-San-Diego-LOreal-Project-Slide.pdf",
  name: "Croissant au San Diego - L'Oreal Project slide.pdf",
};
const SURVEY =
  "https://docs.google.com/spreadsheets/d/1rCu3-S6KbvwnbPHatc5zAHaJIRY91Q2ZDj_WcxMZ150/edit?gid=1161293833#gid=1161293833";

const G = ({ children }: { children: ReactNode }) => <span style={{ color: GOLD }}>{children}</span>;

/* ---------- content ---------- */

const DECISION_INDEX = [
  { n: "01", k: "Customer", v: "Men new to makeup" },
  { n: "02", k: "Product strategy", v: "A foundation + cleansing oil set" },
  { n: "03", k: "Packaging", v: "An outer box with a viewing window" },
  { n: "04", k: "Brand", v: "“I Come” and “I Go”" },
];

// Survey results as the source charts state them (public/images/loreal/chart-*.webp): most questions had 175 answers,
// the non-user question 32. The 76% is interest in a 2-in-1 foundation concept, not in the two-product set.
const SURVEY_STATS = [
  { v: 46, t: "chose a natural look when picking a foundation, the top feature", n: "n = 175 · multi-select" },
  { v: 76, t: "were open to a 2-in-1 foundation concept", sub: "30% very interested · 46% unsure it would be professional enough", n: "n = 175" },
  { v: 68, t: "would try a men’s foundation with essence ingredients", sub: "38% of answers: maybe, but worried about greasiness", n: "n = 175" },
  { v: 53, t: "of non-users said they don’t know much about makeup", n: "n = 32 non-users" },
];

const CHAIN = [
  { k: "Need", v: "46%", t: "A natural look", s: "Top foundation feature" },
  { k: "Barrier", v: "53%", t: "Little makeup knowledge", s: "Of non-users" },
  { k: "Direction", v: null, t: "A simple first routine", s: "One product to apply, one to remove" },
];

const PATHS = [
  { t: "Foundation only", chosen: false, steps: ["Buy a foundation", "Search for a remover", "Guess which one works"] },
  { t: "UniSkin Duo", chosen: true, steps: ["Buy one set", "Apply with I Come", "Remove with I Go"] },
];

const PACK_NOTES = [
  { n: "1", t: "Viewing window", s: "The bottle is visible before the box is opened" },
  { n: "2", t: "Textured black box", s: "Neutral outside; the gold bottle stands out" },
  { n: "3", t: "Fitted inserts", s: "Sized in centimetres to hold both bottles" },
];

const PAIR = [
  { step: "Apply", name: "I Come", what: "Foundation", line: "Perfect Coverage", img: "final-layout-come", w: 825, h: 885 },
  { step: "Remove", name: "I Go", what: "Cleansing oil", line: "Pure Renewal", img: "final-layout-b", w: 815, h: 885 },
];

const PROCESS = [
  { img: "sketch-structure", w: 1100, h: 1005, t: "Sketch", s: "First box plan, by hand" },
  { img: "sketches", w: 1380, h: 1360, t: "Iterations", s: "Three versions of the structure" },
  { img: "modeling-screen", w: 1417, h: 737, t: "3D model", s: "Proportions checked in Cinema 4D" },
  { img: "render-open", w: 680, h: 861, t: "Render", s: "Final box with both bottles" },
];

const INGREDIENTS = [
  {
    t: "Foundation: “I Come”",
    pack: "Lightweight recycled glass",
    ing: "Water 50–60%, Cyclopentasiloxane 10–20%, Titanium Dioxide 5–15%, Glycerin 5–10%, Caprylic/Capric Triglyceride 5–10%, Iron Oxides 1–5%, Emulsifiers 1–3%, Silicone Elastomer and Silica 1–5%, Trimethylsiloxysilicate 1–5%, Phenoxyethanol 0.5–1%, Disodium EDTA <0.1%, Tocopherol and botanical extracts <0.5%.",
  },
  {
    t: "Cleansing oil: “I Go”",
    pack: "High-transparency PCR plastic",
    ing: "Caprylic/Capric Triglyceride 30–40%, Squalane 20–25%, Olive Oil 15–20%, Jojoba Oil 10–15%, PEG-40 Hydrogenated Castor Oil 3–5%, Tocopherol (Vitamin E) 0.5–1%.",
  },
];

const OPEN = [
  { k: "Bundle demand", q: "Would customers choose the set over buying the two products separately?" },
  { k: "Pricing", q: "What upfront price would first-time users accept? $80–100 was our proposal." },
  { k: "Shade selection", q: "Does the window give enough information to choose the right shade?" },
];

/* ---------- pieces ---------- */

function Divider({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div id={id} className="scroll-mt-24 px-3">
      <p className={DIVIDER}>{children}</p>
      <div className="mt-2 h-px bg-white/15" />
    </div>
  );
}

function Download() {
  return (
    <a href={DOWNLOAD.href} download={DOWNLOAD.name} className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
      Final slides (PDF) ↓
    </a>
  );
}

/** A product decision: number, title and short statements on the left (sticky); its visual on the right. */
function Decision({ n, title, decision, why, tradeoff, children }: { n: string; title: string; decision: ReactNode; why: ReactNode; tradeoff: ReactNode; children: ReactNode }) {
  const rows: [string, ReactNode][] = [
    ["Why", why],
    ["Trade-off", tradeoff],
  ];
  return (
    <div id={`decision-${n}`} className="scroll-mt-24 grid gap-8 px-3 md:grid-cols-[1fr_2fr] md:gap-10">
      <Reveal className="md:sticky md:top-24 md:self-start">
        <p className="text-[12px] text-white/40">
          <span style={{ color: GOLD }}>{n}</span> · {title}
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

/** A numbered gold marker placed over an image. */
function Pin({ n, x, y }: { n: string; x: string; y: string }) {
  return (
    <span
      aria-hidden
      className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] text-black shadow-[0_0_0_4px_rgb(212_175_55/0.25)]"
      style={{ left: x, top: y, background: GOLD }}
    >
      {n}
    </span>
  );
}

/* ---------- page ---------- */

export default function LorealProject() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] bg-black md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${I}/card-box-v5.jpg`} alt="The UniSkin Duo gift box with the foundation and cleansing oil, on black" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-white/10 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${I}/logo.png`} alt="L'Oréal logo" width={934} height={169} className="mb-4 block h-auto w-[110px]" />
              <h1 className="text-[16px] text-white">UniSkin Duo</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <>I come <G>and I go.</G></>
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">L&apos;Oréal Brandstorm 2025</p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["Product design", "Packaging", "3D"].map((t) => (
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
              One set. <G>A simpler makeup routine.</G>
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <p className={`${BODY} max-w-[520px]`}>
              The brief asked for a foundation for men. Our survey suggested that men new to makeup want a natural look but know little about the products. So we proposed a foundation and a matching cleansing oil, sold as one set, to make the routine clear from start to finish.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              {[
                ["Brand", "L’Oréal Men Expert"],
                ["Team", "3 students"],
                ["Status", "Competition concept, not launched"],
                ["Proposed price · not validated", "$80–100"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className={LABEL}>{k}</p>
                  <p className="text-[14px] text-white/80">{v}</p>
                </div>
              ))}
              <div>
                <p className={LABEL}>Submission</p>
                <Download />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE SET */}
      <section className="mt-16 px-3 md:mt-24">
        <Reveal className="grid gap-2 md:grid-cols-[1.55fr_1fr]">
          <figure className="flex flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${I}/cover.jpg`} alt="The I Come foundation pack and the I Go cleansing oil pack side by side" width={3200} height={2063} className="block h-auto w-full rounded-[10px]" />
            <figcaption className="grid grid-cols-2 gap-4 text-[13px] leading-[19px]">
              <span>
                <span className="text-white">I Come</span> <span className="text-white/50">· Foundation, 20+ shades, with skincare ingredients</span>
              </span>
              <span>
                <G>I Go</G> <span className="text-white/50">· Cleansing oil, made with nourishing oils</span>
              </span>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-3">
            <div className="flex flex-1 items-center justify-center overflow-hidden rounded-[10px] bg-white p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${I}/final-3d-a.webp`} alt="Rendered outer box with both bottles visible through its side windows" width={1572} height={1488} className="block h-auto max-h-[420px] w-auto max-w-full" />
            </div>
            <figcaption className="text-[13px] leading-[19px] text-white/50">
              <span className="text-white">One box</span> · both products, one purchase
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* RESEARCH SNAPSHOT */}
      <section className="mt-28 flex flex-col gap-10 md:mt-40 md:gap-14">
        <Divider id="research">Research snapshot</Divider>
        <Reveal className="px-3">
          <p className="text-center text-[13px] text-white/55">
            Bilingual survey · <span className="text-white">208 respondents</span> · 3+ countries · not every question was answered by everyone
          </p>
        </Reveal>
        <Reveal className="mx-3 grid gap-px overflow-hidden rounded-[12px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {SURVEY_STATS.map((s) => (
            <div key={s.v} className="flex flex-col gap-3 bg-black p-5">
              <p className="text-[40px] leading-none md:text-[48px]" style={{ color: GOLD }}>
                {s.v}%
              </p>
              <div className="h-1 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${s.v} percent`}>
                <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: GOLD }} />
              </div>
              <p className="text-[14px] leading-[20px] text-white/80">{s.t}</p>
              {s.sub && <p className="text-[12px] leading-[17px] text-white/45">{s.sub}</p>}
              <p className="mt-auto text-[11px] text-white/35">{s.n}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="grid gap-4 px-3 md:grid-cols-2 md:gap-8">
          <p className="text-[13px] leading-[20px] text-white/55">
            <span className="text-white">Note:</span> the 76% is about a 2-in-1 formula, not our two-product set. The set was never tested.{" "}
            <a href={SURVEY} target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
              Raw responses ↗
            </a>
          </p>
          <p className="text-[13px] leading-[20px] text-white/55">
            <span className="text-white">Competitor scan:</span> of five luxury brands, four sell skincare foundations, all marketed to women. None pairs a foundation with a cleansing oil.
          </p>
        </Reveal>
      </section>

      {/* FOUR DECISIONS */}
      <section className="mt-28 flex flex-col gap-24 md:mt-40 md:gap-36">
        <div className="flex flex-col gap-0">
          <Divider id="decisions">Four product decisions</Divider>
          <Reveal className="mt-6 px-3">
            <div className="grid md:grid-cols-4">
              {DECISION_INDEX.map((d) => (
                <a
                  key={d.n}
                  href={`#decision-${d.n}`}
                  className="group flex flex-col gap-1 border-b border-white/10 py-4 md:border-b-0 md:border-r md:px-4 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="text-[12px] text-white/45">
                    <span style={{ color: GOLD }}>{d.n}</span> · {d.k}
                  </span>
                  <span className="text-[15px] leading-[22px] text-white/80 transition-colors group-hover:text-white">{d.v}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Decision
          n="01"
          title="Choosing the customer"
          decision="Focus on men new to makeup."
          why="They want natural coverage but don’t know the products. A simple first use mattered more than extra features."
          tradeoff="A narrower audience. Experienced users may want more choice."
        >
          <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
            {CHAIN.map((c, i) => {
              const last = i === CHAIN.length - 1;
              return (
                <li key={c.k} className="flex items-stretch">
                  <div className="flex-1 border-t pt-4" style={{ borderColor: last ? GOLD : "rgb(255 255 255 / 0.2)" }}>
                    <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: last ? GOLD : "rgb(255 255 255 / 0.4)" }}>
                      {c.k}
                    </p>
                    <p className="mt-3 h-[44px] text-[36px] leading-[44px] text-white md:text-[40px]">{c.v ?? <span style={{ color: GOLD }}>→</span>}</p>
                    <p className="mt-3 text-[15px] leading-[21px] text-white">{c.t}</p>
                    <p className="mt-1 text-[13px] leading-[19px] text-white/45">{c.s}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Decision>

        <Decision
          n="02"
          title="Choosing the product strategy"
          decision="Sell a foundation and a cleansing oil as one set, not a foundation alone."
          why="Beginners may not know which remover to choose. A matched set gives them the whole routine in one purchase."
          tradeoff="Easier to start, but a higher upfront cost and less flexibility."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {PATHS.map((p) => (
              <div
                key={p.t}
                className="rounded-[12px] border p-5"
                style={p.chosen ? { borderColor: `${GOLD}88`, background: `${GOLD}10` } : { borderColor: "rgb(255 255 255 / 0.12)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-[14px] ${p.chosen ? "text-white" : "text-white/55"}`}>{p.t}</p>
                  {p.chosen && (
                    <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ color: GOLD, border: `1px solid ${GOLD}88` }}>
                      Our proposal
                    </span>
                  )}
                </div>
                <ol className="mt-5 flex flex-col">
                  {p.steps.map((s, i) => (
                    <li key={s} className="flex items-center gap-3 border-t border-white/10 py-2.5 text-[14px]">
                      <span className="w-4 text-[11px]" style={{ color: p.chosen ? GOLD : "rgb(255 255 255 / 0.3)" }}>
                        {i + 1}
                      </span>
                      <span className={p.chosen ? "text-white/85" : i === 2 ? "text-white/40 italic" : "text-white/50"}>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 text-[12px]">
            <li className="rounded-full px-3 py-1" style={{ color: GOLD, border: `1px solid ${GOLD}66` }}>
              + A clear start-to-finish routine
            </li>
            <li className="rounded-full border border-white/15 px-3 py-1 text-white/60">− Higher upfront price</li>
            <li className="rounded-full border border-white/15 px-3 py-1 text-white/60">− Less choice of remover</li>
          </ul>
          <p className={`${LABEL} mt-4`}>A team proposal. Demand, price and total cost were not tested.</p>
        </Decision>

        <Decision
          n="03"
          title="Choosing the packaging"
          decision="Put a viewing window in the outer box."
          why="Shoppers can see the product and its shade before opening the box."
          tradeoff="Better visibility, but the window adds constraints to the box structure."
        >
          <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
            <div className="relative overflow-hidden rounded-[10px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${I}/render-angle.webp`} alt="Rendered box with the foundation bottle visible in its window" width={1410} height={1423} loading="lazy" className="block h-auto w-full" />
              <Pin n="1" x="51%" y="56%" />
              <Pin n="2" x="80%" y="38%" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${I}/sketch-dimensioned.webp`} alt="Dimensioned plan of the box and inserts, in centimetres" width={1446} height={710} loading="lazy" className="block h-auto w-full" />
                <Pin n="3" x="18%" y="22%" />
              </div>
              <ol className="flex flex-col">
                {PACK_NOTES.map((p) => (
                  <li key={p.n} className="flex gap-3 border-t border-white/10 py-3 text-[13px] leading-[19px]">
                    <span style={{ color: GOLD }}>{p.n}</span>
                    <span>
                      <span className="text-white">{p.t}</span>
                      <span className="block text-white/50">{p.s}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className={`${LABEL} mt-4`}>Seeing the bottle helps, but it can’t guarantee a shade match on skin.</p>
        </Decision>

        <Decision
          n="04"
          title="Choosing the brand expression"
          decision="Name the pair “I Come” and “I Go”."
          why="The names link applying and removing, so the set reads as one routine. Matching black-and-gold packs show the two belong together."
          tradeoff="Memorable, but the names don’t say what each product is, so each pack also names its type."
        >
          <ol className="grid grid-cols-2 gap-3 md:gap-4">
            {PAIR.map((p, i) => (
              <li key={p.name} className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-[13px] text-white/60">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] text-black" style={{ background: GOLD }}>
                    {i + 1}
                  </span>
                  {p.step}
                  {i === 0 && (
                    <span aria-hidden className="ml-auto text-white/30">
                      →
                    </span>
                  )}
                </p>
                <div className="rounded-[10px] bg-[#111] p-3 md:p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${I}/${p.img}.webp`} alt={`${p.name} ${p.what.toLowerCase()} packaging layout`} width={p.w} height={p.h} loading="lazy" className="block aspect-[825/885] h-auto w-full border border-white/80 object-fill" />
                </div>
                <div>
                  <p className="text-[20px] leading-[26px] text-white md:text-[24px] md:leading-[30px]">{i === 1 ? <G>{p.name}</G> : p.name}</p>
                  <p className="text-[13px] leading-[19px] text-white/50">
                    {p.what} · “{p.line}”
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className={`${LABEL} mt-5`}>The names came from a line in Dua Lipa’s “Houdini”: a creative reference only, with no affiliation or endorsement.</p>
        </Decision>
      </section>

      {/* FROM SKETCH TO BOX */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52 md:gap-14">
        <Divider id="process">From sketch to box</Divider>
        <Reveal className="grid grid-cols-2 gap-x-3 gap-y-6 px-3 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <figure key={p.img} className="flex flex-col gap-3">
              <div className={`flex aspect-square items-center justify-center overflow-hidden rounded-[10px] ${p.img === "render-open" ? "bg-white p-4" : "bg-white/[0.04]"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${I}/${p.img}.webp`} alt={`${p.t}: ${p.s}`} width={p.w} height={p.h} loading="lazy" className={p.img === "render-open" ? "h-full w-auto object-contain" : "h-full w-full object-cover"} />
              </div>
              <figcaption className="text-[13px] leading-[19px]">
                <span className="text-white/35">{i + 1} </span>
                <span className="text-white">{p.t}</span>
                <span className="block text-white/50">{p.s}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
        <Reveal className="grid gap-8 px-3 md:grid-cols-[1.35fr_1fr]">
          <details className="group max-w-[560px] border-t border-white/10 pt-4">
            <summary className="cursor-pointer list-none text-[14px] text-white/80 hover:text-white">
              Ingredients and materials <span className="text-white/40 group-open:hidden">+</span>
              <span className="hidden text-white/40 group-open:inline">−</span>
            </summary>
            <div className="mt-4 flex flex-col gap-4">
              {INGREDIENTS.map((p) => (
                <p key={p.t} className="text-[13px] leading-[20px] text-white/50">
                  <span className="text-white/80">{p.t}</span> · {p.pack}. {p.ing}
                </p>
              ))}
            </div>
          </details>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <a key={i} href={DOWNLOAD.href} download={DOWNLOAD.name} aria-label={`Download the slides (page ${i})`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${I}/slide-${i}.webp`} alt={`Final slides, page ${i}`} width={1530} height={1980} loading="lazy" className="block h-auto w-full rounded-[6px] bg-white" />
                </a>
              ))}
            </div>
            <p>
              <Download />
            </p>
          </div>
        </Reveal>
      </section>

      {/* OPEN QUESTIONS */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52 md:gap-14">
        <Divider id="open">What we didn’t test</Divider>
        <Reveal className="mx-3 grid gap-px overflow-hidden rounded-[12px] border border-dashed border-white/25 bg-white/10 md:grid-cols-3">
          {OPEN.map((o) => (
            <div key={o.k} className="flex flex-col gap-2 bg-black p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[14px] text-white">{o.k}</p>
                <span className="rounded-full border border-dashed border-white/30 px-2 py-0.5 text-[10px] text-white/50">Open question</span>
              </div>
              <p className="text-[14px] leading-[21px] text-white/60">{o.q}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="px-3">
          <p className="mx-auto max-w-[760px] text-center text-[22px] leading-[30px] text-white md:text-[28px] md:leading-[38px]">
            The survey backed the foundation. <G>The set was our judgment</G>, and it is the next thing to test.
          </p>
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52 md:gap-14">
        <Divider>Team</Divider>
        <Reveal className="grid items-end gap-6 px-3 md:grid-cols-[1.35fr_1fr] md:gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${I}/team.jpg`} alt="Yifei Liu, Lechen Tao, and Sihan Wang with the L'Oréal Brandstorm 2025 screen" width={2000} height={1500} loading="lazy" className="block h-auto w-full max-w-[640px] rounded-[10px]" />
          <div>
            <p className="text-[14px] text-white/80">Yifei Liu · Lechen Tao · Sihan Wang</p>
            <p className={LABEL}>Croissant au San Diego, L&apos;Oréal Brandstorm 2025. A team project: the decisions above were made together.</p>
          </div>
        </Reveal>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

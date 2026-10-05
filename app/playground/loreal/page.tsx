import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { Callout } from "@/components/case/compare";
import { Box, Cards, Chip, Container, Contrast, Eyebrow, P, Pull, Section, Stack, Statement, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { StageFlow } from "@/components/case/stage-flow";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { FloatPair } from "@/components/case/float-pair";
import { MarkerHighlight as M } from "@/components/ui/marker-highlight";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person, selectedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `UniSkin Duo — L'Oréal Men Expert Concept — ${person.name}`,
  description:
    "A foundation and cleansing-oil system that makes complexion products feel natural, simple, and socially comfortable for young men.",
};

const NAV: CaseNavItem[] = [
  { id: "context", index: "01", label: "Context" },
  { id: "theme", index: "02", label: "Defining the Theme" },
  { id: "brand", index: "03", label: "Brand Fit" },
  { id: "competitors", index: "04", label: "Competitor Analysis" },
  { id: "research", index: "05", label: "User Research" },
  { id: "insights", index: "06", label: "Insights" },
  { id: "strategy", index: "07", label: "Product Strategy" },
  { id: "concept", index: "08", label: "Concept Sketching" },
  { id: "modeling", index: "09", label: "3D Modeling" },
  { id: "identity", index: "10", label: "Color & Slogan" },
  { id: "outcome", index: "11", label: "Final Outcome" },
  { id: "reflection", index: "12", label: "Reflection" },
  { id: "group", index: "13", label: "Our Group" },
];

// Visuals are screenshots from the project deck and board, used as placeholders until the
// final exports are supplied — replace the files in /public/images/loreal with the same names.
const L = "/images/loreal";
const DOWNLOAD = {
  href: "/files/Croissant-au-San-Diego-LOreal-Project-Slide.pdf",
  name: "Croissant au San Diego - L'Oreal Project slide.pdf",
};

const SURVEY =
  "https://docs.google.com/spreadsheets/d/1rCu3-S6KbvwnbPHatc5zAHaJIRY91Q2ZDj_WcxMZ150/edit?gid=1161293833#gid=1161293833";

const SCOPE = ["Product Design", "Brand Strategy", "User Research", "Packaging", "3D Modeling"];

const SURVEY_QUESTIONS = [
  "What is your age?",
  "Have you used makeup in your daily life?",
  "What makes you not use makeup?",
  "How often do you use makeup?",
  "Do you often use foundation for your makeup?",
  "When choosing a foundation that best suits you, what specific features do you consider?",
  "Would you be more willing to try a men's foundation with essentials included?",
  "When buying men's foundation, do you want to pair it with a special makeup remover?",
  "What do you think of the “2-in-1” product concept for liquid foundation?",
  "What kind of promotion for men's foundation do you prefer?",
];

const MARKET = [
  { item: "Skincare-infused foundation", status: "Exists", tone: "neutral" },
  { item: "Foundation for men", status: "A few", tone: "neutral" },
  { item: "Nourishing foundation for men", status: "Very rare", tone: "gap" },
  { item: "Cleansing oil for men", status: "Almost none", tone: "gap" },
  { item: "Foundation + cleansing oil set", status: "None", tone: "gap" },
] as const;

const MORE = selectedWork.filter((w) => w.label !== "NIO").slice(0, 2);
const isExternal = (href: string) => /^https?:\/\//.test(href);

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      <div className="font-gilroy text-[17px] leading-[1.6] text-neutral-300 md:text-[19px]">{children}</div>
    </div>
  );
}

/** An uncropped image with an optional caption. */
function Fig({
  src,
  alt,
  w,
  h,
  caption,
  className,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="block h-auto w-full rounded-[14px]" />
      {caption && <figcaption className="font-gilroy mt-3 text-[14px] leading-[1.55] text-neutral-400">{caption}</figcaption>}
    </figure>
  );
}

/** Images in a row, all cropped to one shared aspect ratio so edges line up. */
function Row({
  items,
  ratio,
  fit = "cover",
  caption,
  cols,
}: {
  items: { src: string; alt: string; pos?: string }[];
  ratio: string;
  fit?: "cover" | "contain";
  caption?: string;
  cols?: number;
}) {
  return (
    <figure>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols ?? items.length}, minmax(0, 1fr))` }}>
        {items.map((it) => (
          <div
            key={it.src}
            className={`relative overflow-hidden rounded-[14px] ${fit === "contain" ? "bg-white" : ""}`}
            style={{ aspectRatio: ratio }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
              style={{ objectPosition: it.pos ?? "center" }}
            />
          </div>
        ))}
      </div>
      {caption && <figcaption className="font-gilroy mt-3 text-[14px] leading-[1.55] text-neutral-400">{caption}</figcaption>}
    </figure>
  );
}

/** A dense document shown small, with an arrow to a short summary of what it says. */
function Note({ src, alt, label, children }: { src: string; alt: string; label: string; children: ReactNode }) {
  return (
    <figure className="grid items-center gap-5 md:grid-cols-[200px_56px_1fr]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="mx-auto block w-[200px] rounded-[10px] opacity-90" />
      <svg aria-hidden viewBox="0 0 56 24" className="mx-auto hidden h-6 w-14 md:block" style={{ color: "var(--accent-green)" }}>
        <path d="M2 12h48M42 5l8 7-8 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <figcaption className="rounded-card border border-white/15 p-5 md:p-6" style={{ borderLeft: "2px solid var(--accent-green)" }}>
        <span className="font-gilroy text-[12px] uppercase tracking-[0.25em]" style={{ color: "var(--accent-green)" }}>
          {label}
        </span>
        <div className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300 md:text-[16px]">{children}</div>
      </figcaption>
    </figure>
  );
}

/** Whole images side by side at one shared height (no cropping), so top and bottom edges line up. */
function Strip({
  items,
  caption,
  max,
}: {
  items: { src: string; alt: string; w: number; h: number }[];
  caption?: string;
  max?: number;
}) {
  return (
    <figure className="mx-auto w-full" style={{ maxWidth: max }}>
      <div className="flex flex-col gap-4 sm:flex-row">
        {items.map((it) => (
          <div key={it.src} className="min-w-0" style={{ flex: `${it.w / it.h} 1 0` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.alt} width={it.w} height={it.h} loading="lazy" className="block h-auto w-full rounded-[14px]" />
          </div>
        ))}
      </div>
      {caption && <figcaption className="font-gilroy mt-3 text-[14px] leading-[1.55] text-neutral-400">{caption}</figcaption>}
    </figure>
  );
}

/** Small inline arrow accent. */
function Arrow() {
  return (
    <span aria-hidden className="mx-1.5 inline-block" style={{ color: "var(--accent-green)" }}>
      →
    </span>
  );
}

const PRODUCTS = [
  { img: "p-estee", brand: "Estée Lauder", name: "Futurist Hydra Rescue", price: "$55", note: "Soothing, hydrating, SPF 45." },
  { img: "p-chanel-touch", brand: "Chanel", name: "Les Beiges Complexion Touch", price: "$70", note: "12-hour hydration; tested on women." },
  { img: "p-chanel-tint", brand: "Chanel", name: "Les Beiges Water-Fresh Tint", price: "$70", note: "75% water, 8 hours of hydration." },
  { img: "p-chanel-sublimage", brand: "Chanel", name: "Sublimage L’Essence de Teint", price: "$175", note: "Moisturizing serum texture." },
  { img: "p-chanel-vitalumiere", brand: "Chanel", name: "Vitalumière Aqua", price: "$57", note: "Hyaluronic acid and SPF 15." },
  { img: "p-ysl", brand: "YSL", name: "Nu Bare Look Tint", price: "$48", note: "Hyaluronic-acid skin tint, 24-hour hydration." },
  { img: "p-givenchy", brand: "Givenchy", name: "Prisme Libre Skin-Caring Matte", price: "", note: "82% skincare base, 24-hour wear." },
];

function DownloadButton({ large }: { large?: boolean }) {
  return (
    <a
      href={DOWNLOAD.href}
      download={DOWNLOAD.name}
      data-cursor-hover
      className={`font-gilroy group inline-flex w-fit items-center gap-3 rounded-full text-white transition-transform duration-300 hover:-translate-y-0.5 ${
        large ? "px-7 py-4 text-[16px] md:text-[17px]" : "px-5 py-3 text-[15px]"
      }`}
      style={{ background: "var(--accent-green)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download the final slides (PDF)
    </a>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5`} className="tracking-[0.15em]" style={{ color: "#d4af37" }}>
      {"★".repeat(n)}
      <span className="opacity-25">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function LorealProject() {
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
          alt="UniSkin Duo packaging layouts: the “I Come” foundation and the “Go” cleansing oil"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.45)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#b8942f" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* Title */}
          <section className="pt-14 md:pt-20">
            <Container>
              <div className="mb-10">
                <BackLink
                  href="/#playground"
                  className="font-gilroy inline-flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-white"
                >
                  <span>←</span>Back to Playground
                </BackLink>
              </div>
              <Reveal>
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">Playground · L&apos;Oréal Brainstorm Project</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(44px,7vw,104px)] font-medium leading-[0.95] tracking-[-0.01em] text-white">
                  UniSkin Duo
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  A foundation and cleansing-oil system that makes complexion products feel natural and simple for young men.
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
                    UniSkin Duo pairs a nourishing foundation with a cleansing oil in a two-step daily cycle: apply in the
                    morning, remove at night.
                  </p>
                  <p>
                    The goal: a faster routine, and foundation that feels as natural for men as skincare.
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-[1.3fr_1fr_1fr]">
                <Meta label="Type">
                  <div className="flex flex-wrap gap-2">
                    {SCOPE.map((s) => (
                      <Chip key={s} variant="role">
                        {s}
                      </Chip>
                    ))}
                  </div>
                </Meta>
                <Meta label="Brand">L&apos;Oréal Paris · L&apos;Oréal Men Expert</Meta>
                <Meta label="Product">Foundation &amp; cleansing-oil set · $80–100</Meta>
              </div>
              <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
                <p className="font-gilroy max-w-[52ch] text-[16px] leading-[1.6] text-neutral-400">
                  The final submission: product sheet, ingredients, pricing, and packaging, as a three-page PDF.
                </p>
                <DownloadButton />
              </div>
            </Container>
          </section>

          {/* 01 — CONTEXT */}
          <Section id="context" index="01" label="Context" title="An unmet need in a fast-growing category.">
            <P>
              Beauty has moved fast on inclusivity, yet men remain underserved in complexion. Men&apos;s ranges focus on
              cleansing and oil control, while foundation is designed almost entirely for women.
            </P>
            <P>
              Meanwhile, young men care more about appearance and self-expression. What holds them back is <M>not interest, but friction</M>:
            </P>
            <Cards
              columns={2}
              items={[
                { index: "01", title: "Too many choices", body: <p>Shades and formulas are hard to navigate without experience.</p> },
                { index: "02", title: "A high learning cost", body: <p>Multi-step routines assume skills beginners lack.</p> },
                { index: "03", title: "Stereotype pressure", body: <p>Wearing makeup still carries a social stigma for many men.</p> },
                { index: "04", title: "No beginner-friendly option", body: <p>Few products target men just starting out.</p> },
              ]}
            />
            <Pull label="Mission">
              <p>Design a nourishing complexion solution for young men —</p>
              <p>one that lowers the barrier, saves time, and eases the stigma.</p>
            </Pull>
          </Section>

          {/* 02 — DEFINING THE THEME */}
          <Section id="theme" index="02" label="Defining the Theme" title="Choosing which social-justice angle to design for.">
            <P>
              We mapped three social-justice perspectives the project could stand for.
            </P>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {[
                {
                  n: 3,
                  title: "Gender-inclusive and non-binary formulations",
                  gap: "Few products serve trans men and non-binary people.",
                  belief: "The industry remains largely binary.",
                },
                {
                  n: 2,
                  title: "Underrepresented male demographics",
                  gap: "Little serves older men, men with disabilities, or marginalized communities.",
                  belief: "Inclusion should also address ageism and disability.",
                },
                {
                  n: 1,
                  title: "Dual-purpose grooming & wellness",
                  gap: "Few products combine grooming with wellness.",
                  belief: "Self-care covers appearance and mental well-being.",
                },
              ].map((d) => (
                <div key={d.title} className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-8">
                  <div>
                    <Stars n={d.n + 2} />
                    <h4 className="font-blinker mt-2 text-[19px] font-medium leading-snug text-white">{d.title}</h4>
                  </div>
                  <div className="font-gilroy space-y-2 text-[15px] leading-[1.6] text-neutral-400 md:text-[16px]">
                    <p>
                      <span className="text-neutral-200">Gap — </span>
                      {d.gap}
                    </p>
                    <p>
                      <span className="text-neutral-200">Overlooked belief — </span>
                      {d.belief}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Note src={`${L}/outline-themes.webp`} alt="Meeting summary ranking three social-justice perspectives" label="From our meeting summary">
              We ranked <M>gender-inclusive first</M> and dropped the other two: those men aren&apos;t the main buyers, and
              wellness isn&apos;t what a foundation does.
            </Note>
            <div>
              <Eyebrow>Decision</Eyebrow>
              <P>
                We chose <M>gender-inclusive men&apos;s beauty</M> after a feasibility review:
              </P>
            </div>
            <Cards
              columns={3}
              items={[
                { title: "Clearer user need", body: <p>Young men&apos;s complexion needs reach far more people than any niche.</p> },
                { title: "Fits the product", body: <p>A complexion product, not a medical or wellness aid.</p> },
                { title: "Stronger commercial case", body: <p>It aligns with where the market is growing.</p> },
              ]}
            />
          </Section>

          {/* 03 — BRAND FIT */}
          <Section id="brand" index="03" label="Brand Fit" title="Which L'Oréal brand should carry it?">
            <P>We compared three L&apos;Oréal men&apos;s lines on positioning, R&amp;D, values, and price.</P>
            <div className="grid gap-4 xl:grid-cols-3">
              {[
                {
                  name: "L'Oréal Men Expert",
                  n: 5,
                  keys: "Efficient · practical · convenient",
                  body: "Affordable, fast routines for busy young men (18–35), plus a push against skincare stereotypes.",
                  note: "Best match: same users, philosophy, and focus on efficiency.",
                  best: true,
                },
                {
                  name: "Garnier Men",
                  n: 4,
                  keys: "Affordable · everyday care",
                  body: "Practical, natural care for young men on a budget.",
                  note: "Close fit, but focused on care rather than makeup.",
                },
                {
                  name: "Biotherm Homme",
                  n: 3,
                  keys: "Premium · repair",
                  body: "Mid-to-high-end skincare for men with higher incomes.",
                  note: "Right philosophy, wrong price for most users.",
                },
              ].map((b) => (
                <div
                  key={b.name}
                  className="flex flex-col rounded-card border p-6"
                  style={{
                    borderColor: b.best ? "var(--accent-green)" : undefined,
                    background: b.best ? "color-mix(in srgb, var(--accent-green) 10%, var(--case-bg, #0b0b0b))" : undefined,
                  }}
                >
                  <Stars n={b.n} />
                  <h4 className="font-blinker mt-3 text-[20px] font-medium leading-tight text-white">{b.name}</h4>
                  <span className="font-gilroy mt-1 text-[13px] uppercase tracking-[0.15em] text-neutral-500">{b.keys}</span>
                  <p className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">{b.body}</p>
                  <p className="font-gilroy mt-4 border-t border-white/10 pt-4 text-[14px] leading-[1.55] text-neutral-300">{b.note}</p>
                </div>
              ))}
            </div>
            <Row
              ratio="1150 / 1003"
              items={[
                { src: `${L}/shelf-menexpert.webp`, alt: "L'Oréal Men Expert moisturizers, $9–15" },
                { src: `${L}/shelf-clinique.webp`, alt: "Clinique For Men sets and lotion" },
                { src: `${L}/shelf-baxter.webp`, alt: "Baxter of California oil-free moisturizer" },
              ]}
              caption="Men's shelves today: care, not complexion. Men Expert sells daily care at $9–15."
            />
          </Section>

          {/* 04 — COMPETITOR ANALYSIS */}
          <WideSection id="competitors" index="04" label="Competitor Analysis" title="Five leading brands, one missing product.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  We studied foundations from Estée Lauder, Chanel, Dior, YSL, and Givenchy, including every ingredient list.
                </P>
                <P>
                  Four of five offer a caring foundation, but <M>all target women</M>. No brand sells a skincare cleansing oil, let alone a
                  foundation-and-oil set.
                </P>
              </div>
              <FloatPair
                left={{ src: `${L}/float-estee.png`, alt: "Estée Lauder Futurist SkinTint Serum", w: 667, h: 1031 }}
                right={{ src: `${L}/float-givenchy.png`, alt: "Givenchy Prisme Libre Skin-Caring Matte", w: 351, h: 987 }}
              >
                <p className="font-sulphur text-[clamp(22px,2.4vw,34px)] leading-[1.2] tracking-[-0.01em] text-white">
                  Caring foundations exist —{" "}
                  <M>
                    but every one was made for women
                  </M>
                  .
                </p>
                <p className="font-gilroy mt-4 text-[12px] uppercase tracking-[0.2em] text-neutral-500">Tap a bottle</p>
              </FloatPair>
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <Eyebrow className="mb-4">Foundations we checked</Eyebrow>
                  <span className="font-gilroy mb-4 text-[12px] uppercase tracking-[0.2em] text-neutral-500">Scroll →</span>
                </div>
                <div className="-mx-gutter overflow-x-auto px-gutter pb-3 [scrollbar-width:thin] md:-mx-gutter-lg md:px-gutter-lg">
                  <ul className="flex w-max snap-x snap-mandatory gap-4">
                    {PRODUCTS.map((p) => (
                      <li key={p.img} className="w-[230px] shrink-0 snap-start md:w-[250px]">
                        <div className="relative overflow-hidden rounded-[14px] bg-white" style={{ aspectRatio: "3 / 4" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${L}/${p.img}.webp`} alt={`${p.brand} ${p.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-4" />
                        </div>
                        <p className="font-gilroy mt-3 text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                          {p.brand} {p.price && <span className="text-neutral-400">· {p.price}</span>}
                        </p>
                        <p className="font-blinker mt-1 text-[17px] font-medium leading-snug text-white">{p.name}</p>
                        <p className="font-gilroy mt-2 border-l-2 pl-3 text-[14px] leading-[1.5] text-neutral-400" style={{ borderColor: "var(--accent-green)" }}>
                          {p.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-gilroy mt-3 text-[14px] text-neutral-500">Dior: hydrating foundations, but none with a nourishing function.</p>
              </div>
            </Stack>
            <Stack>
              <div>
                <Eyebrow>What the market offers today</Eyebrow>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {MARKET.map((m) => (
                    <div key={m.item} className="flex items-baseline justify-between gap-6 py-4">
                      <span className="font-gilroy text-[16px] text-neutral-200 md:text-[18px]">{m.item}</span>
                      <span
                        className="font-blinker shrink-0 text-[17px] font-medium md:text-[19px]"
                        style={{ color: m.tone === "gap" ? "var(--accent-green)" : undefined }}
                      >
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Callout kind="opportunity">
                The market is missing a complete complexion system for men: not another foundation, but the routine around it.
              </Callout>
            </Stack>
          </WideSection>

          {/* 05 — USER RESEARCH */}
          <Section id="research" index="05" label="User Research" title="Testing assumptions before designing anything.">
            <P>
              We combined interviews and review analysis with a bilingual survey on complexion products and a two-product format.
            </P>
            <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
              {[
                { n: "208", l: "Survey responses (175 makeup users, 32 non-users)" },
                { n: "3+", l: "Countries" },
                { n: "20+", l: "Regions" },
              ].map((s) => (
                <div key={s.l}>
                  <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                  <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]">{s.l}</span>
                </div>
              ))}
            </div>
            <div>
              <Eyebrow>Survey questions</Eyebrow>
              <ol className="border-t border-white/10">
                {SURVEY_QUESTIONS.map((q, i) => (
                  <li key={q} className="grid grid-cols-[40px_1fr] gap-3 border-b border-white/10 py-3.5">
                    <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-gilroy text-[15px] leading-[1.55] text-neutral-300 md:text-[16px]">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
            <P>Each question mapped to a design decision.</P>
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {[
                { n: "46%", l: "rank “natural and fit” as the top foundation feature" },
                { n: "76%", l: "are open to a 2-in-1 foundation" },
                { n: "68%", l: "would try, or want, a foundation with essence ingredients" },
                { n: "53%", l: "of non-users say they simply don't know much about makeup" },
              ].map((s) => (
                <div key={s.l} className="rounded-card border border-white/10 p-5">
                  <span className="font-blinker block text-[clamp(30px,3vw,44px)] font-medium leading-none" style={{ color: "var(--accent-green)" }}>{s.n}</span>
                  <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400">{s.l}</span>
                </div>
              ))}
            </div>
            <Row
              cols={2}
              fit="contain"
              ratio="1520 / 887"
              items={[
                { src: `${L}/chart-features.webp`, alt: "Features considered when choosing a foundation", pos: "top" },
                { src: `${L}/chart-2in1.webp`, alt: "Opinions on the 2-in-1 foundation concept", pos: "top" },
                { src: `${L}/chart-essentials.webp`, alt: "Willingness to try a men's foundation with essence ingredients", pos: "top" },
                { src: `${L}/chart-nonusers.webp`, alt: "Why non-users don't use makeup", pos: "top" },
              ]}
            />
            <div className="flex flex-col gap-4 rounded-card border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <p className="font-gilroy max-w-[46ch] text-[15px] leading-[1.6] text-neutral-400">
                All raw responses and summary charts are in the original survey sheet.
              </p>
              <a
                href={SURVEY}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="font-gilroy inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[15px] text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--accent-green)" }}
              >
                Open Link <span aria-hidden>↗</span>
              </a>
            </div>
          </Section>

          {/* 06 — INSIGHTS */}
          <WideSection id="insights" index="06" label="Insights" title="Men don't reject makeup. They reject being seen wearing it.">
            <Reveal>
              <Cards
                columns={2}
                items={[
                  { index: "01", title: "Efficiency beats features", body: <p>Respondents wanted simple routines and avoided multi-step ones.</p> },
                  { index: "02", title: "Natural matters more than coverage", body: <p>
                      <M>“Look better — not like I&apos;m wearing makeup.”</M>
                    </p> },
                  { index: "03", title: "Skincare benefits raise acceptance", body: <p>Oil control and hydration mattered most; a caring foundation felt easier to try.</p> },
                  { index: "04", title: "The barrier is social, not personal", body: <p>
                      Many men are open to foundation; what they avoid is <M>other people noticing it</M>.
                    </p> },
                ]}
              />
            </Reveal>
            <Stack>
              <div>
                <Eyebrow>Client portrait</Eyebrow>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { t: "Who", items: ["Men aged 18–30", "Students and recent graduates", "Young working professionals"] },
                    { t: "Characteristics", items: ["Likely oily skin", "Values efficiency", "A makeup beginner", "Social and outgoing", "Cares about appearance"] },
                    { t: "Needs", items: ["No extra steps", "Long-lasting, low-maintenance wear", "A natural look", "Concealing effect", "Balanced oil control"] },
                    { t: "Pain points", items: ["Hard to find the right product", "Dislikes complicated routines", "Wants it unnoticeable", "Hesitant about wearing makeup"] },
                  ].map((c) => (
                    <div key={c.t} className="rounded-card border border-white/10 bg-white/[0.03] p-6">
                      <h5 className="font-blinker text-[18px] font-medium text-white">{c.t}</h5>
                      <ul className="font-gilroy mt-3 space-y-1.5 text-[15px] leading-[1.5] text-neutral-400">
                        {c.items.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <Note src={`${L}/outline-portrait.webp`} alt="Product outline: client portrait and needs" label="From our product outline">
                Men 18–30, likely oily skin, new to makeup, who put <M>efficiency</M> first.
              </Note>
              <Callout kind="insight">
                The opportunity: skincare benefits, a natural finish, and minimal effort, designed for men.
              </Callout>
            </Stack>
          </WideSection>

          {/* 07 — PRODUCT STRATEGY */}
          <WideSection id="strategy" index="07" label="Product Strategy" title="A complexion system, not a single foundation.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  UniSkin Duo <M>replaces the routine</M>: the foundation handles skincare, the cleansing oil handles removal and
                  recovery.
                </P>
                <Box label="Strategy">Fewer steps, fewer decisions — what first-time users need most.</Box>
              </div>
              <Contrast
                left={{ label: "Before", items: "Skincare → Primer → Foundation → Removal" }}
                right={{ label: "With UniSkin Duo", items: "Foundation → Cleansing Oil" }}
              />
              <div>
                <Eyebrow>The 24-hour cycle</Eyebrow>
                <StageFlow
                  stages={[
                    { title: "Morning", body: "Foundation evens skin tone, controls oil, and adds basic skincare." },
                    { title: "Day", body: "Fewer touch-ups, less to think about." },
                    { title: "Night", body: "Cleansing oil removes makeup gently and restores moisture." },
                  ]}
                />
              </div>
            </Stack>
          </WideSection>

          {/* 08 — CONCEPT SKETCHING */}
          <WideSection id="concept" index="08" label="Concept Sketching" title="From two products to one daily loop.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  Foundation in the morning <Arrow /> no extra skincare. Cleansing oil at night <Arrow /> removes it while nourishing the skin.
                </P>
                <P>
                  Three structure iterations, then packaging drafts, each tested against <M>efficiency, clarity, and naturalness</M>.
                </P>
              </div>
              <Strip
                items={[
                  { src: `${L}/sketch-structure.webp`, alt: "Hand-drawn box plan with outer dimensions: 20 × 12 cm", w: 1100, h: 1005 },
                  { src: `${L}/sketch-dimensioned.webp`, alt: "Dimensioned plan of the box: bottle compartments and inserts, in centimeters", w: 1446, h: 710 },
                ]}
                caption="From the overall box (20 × 12 cm) to the dimensioned plan for both compartments."
                max={900}
              />
              <Strip
                items={[
                  { src: `${L}/draft-a.webp`, alt: "Sketchbook draft of the foundation label", w: 530, h: 520 },
                  { src: `${L}/draft-b.webp`, alt: "Sketchbook draft of the “Come” and “Go” bottle labels", w: 530, h: 520 },
                ]}
                caption="Packaging layout drafts for the “Come” and “Go” sides."
                max={620}
              />
            </Stack>
          </WideSection>

          {/* 09 — 3D MODELING */}
          <WideSection id="modeling" index="09" label="3D Modeling" title="Designed to be picked up, understood, and used one-handed.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  3D models tested proportions: clean lines that balance a masculine feel with a neutral tone.
                </P>
                <P>
                  A window shows the shade at a glance, and the bottles fit one hand.
                </P>
              </div>
              <Fig src={`${L}/modeling-screen.webp`} w={1417} h={737} alt="The box and both bottles modeled in Cinema 4D" caption="Modeling the box, bottles, and caps in Cinema 4D." className="mx-auto w-full max-w-[760px]" />
              <div className="grid gap-4 xl:grid-cols-3">
                {[
                  { s: "render-angle", w: 1410, h: 1423, alt: "Rendered box with the foundation bottle in its window" },
                  { s: "render-closed", w: 949, h: 1075, alt: "Rendered box, front view, with the cleansing oil bottle" },
                  { s: "render-open", w: 680, h: 861, alt: "Rendered box set showing both bottles through side windows" },
                ].map((c) => (
                  <div key={c.s} className="flex aspect-square items-center justify-center overflow-hidden rounded-[14px] bg-white p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${L}/${c.s}.webp`} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>
              <Fig src={`${L}/modeling-face.webp`} w={897} h={968} alt="Foundation texture and shade study on skin" caption="Checking texture and shade on skin." className="mx-auto w-full max-w-[340px]" />
            </Stack>
          </WideSection>

          {/* 10 — COLOR & SLOGAN */}
          <WideSection id="identity" index="10" label="Color & Slogan" title="Black and gold. I come and I go.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-6">
                  <Eyebrow className="mb-0">Color</Eyebrow>
                  <P>
                    Inspired by YSL Libre, the palette pairs deep black with metallic gold. Black keeps it neutral and free of
                    gendered cues; gold adds warmth and quiet prestige.
                  </P>
                  <P>
                    <M>Calm confidence</M>: striking without being loud.
                  </P>
                </div>
                <Row
                  ratio="4 / 3"
                  items={[
                    { src: `${L}/color-swatch.webp`, alt: "Gold and yellow palette: #FFD700, #FFEC00, #B3A500, #FFFABF, #FFF680" },
                    { src: `${L}/color-ysl.webp`, alt: "YSL Libre bottle and packaging used as reference" },
                  ]}
                  caption="The gold palette, and the YSL Libre reference."
                />
              </div>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <Strip
                  items={[
                    { src: `${L}/houdini-cover.webp`, alt: "Dua Lipa, Houdini single cover", w: 950, h: 950 },
                    { src: `${L}/slogan.webp`, alt: "Houdini lyrics with “I come and I go” highlighted", w: 1100, h: 1299 },
                  ]}
                  caption="Source: “Houdini,” Dua Lipa."
                />
                <div className="flex flex-col gap-6">
                  <Eyebrow className="mb-0">Slogan</Eyebrow>
                  <p className="font-sulphur text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] text-white">“I come and I go.”</p>
                  <P>
                    From Dua Lipa&apos;s “Houdini”: good skin appears like a magician&apos;s spell, <M>and disappears just as easily</M>.
                  </P>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-sulphur rounded-full border border-white/15 px-4 py-2 text-[17px] italic text-white">Foundation — “I Come”</span>
                    <Arrow />
                    <span className="font-sulphur rounded-full border border-white/15 px-4 py-2 text-[17px] italic text-white">Cleansing oil — “I Go”</span>
                  </div>
                </div>
              </div>
            </Stack>
          </WideSection>

          {/* 11 — FINAL OUTCOME */}
          <WideSection id="outcome" index="11" label="Final Outcome" title="UniSkin Duo.">
            <Reveal>
              <Row
                ratio="1572 / 1488"
                items={[
                  { src: `${L}/final-3d-a.webp`, alt: "Final 3D render of the UniSkin Duo box set, front" },
                  { src: `${L}/final-3d-b.webp`, alt: "Final 3D render of the UniSkin Duo box set, angled" },
                ]}
              />
            </Reveal>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  The final concept is a boxed set: a foundation in 20+ shades, and a cleansing oil that removes makeup while
                  supporting skin health. One system simplifies decisions for first-time users.
                </P>
                <P>It sits with L&apos;Oréal Men Expert: practical, accessible, and everyday.</P>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    t: "Foundation — “I Come”",
                    pack: "Lightweight recycled glass",
                    ing: "Water 50–60%, Cyclopentasiloxane 10–20%, Titanium Dioxide 5–15%, Glycerin 5–10%, Caprylic/Capric Triglyceride 5–10%, Iron Oxides 1–5%, Emulsifiers 1–3%, Silicone Elastomer and Silica 1–5%, Trimethylsiloxysilicate 1–5%, Phenoxyethanol 0.5–1%, Disodium EDTA <0.1%, Tocopherol and botanical extracts <0.5%.",
                  },
                  {
                    t: "Cleansing oil — “I Go”",
                    pack: "High-transparency PCR plastic",
                    ing: "Caprylic/Capric Triglyceride 30–40%, Squalane 20–25%, Olive Oil 15–20%, Jojoba Oil 10–15%, PEG-40 Hydrogenated Castor Oil 3–5%, Tocopherol (Vitamin E) 0.5–1%.",
                  },
                ].map((p) => (
                  <div key={p.t} className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-8">
                    <h4 className="font-blinker text-[20px] font-medium text-white">{p.t}</h4>
                    <p className="font-gilroy mt-2 text-[14px] text-neutral-500">Packaging: {p.pack}</p>
                    <p className="font-gilroy mt-4 text-[14px] leading-[1.65] text-neutral-400">{p.ing}</p>
                  </div>
                ))}
              </div>
              <P>
                The recyclable box has a cut-out to compare skin tone with the shade.
              </P>
            </Stack>
            <Reveal>
              <Strip
                items={[
                  { src: `${L}/final-layout-a.webp`, alt: "Final foundation packaging layout, “I Come”", w: 646, h: 885 },
                  { src: `${L}/final-layout-b.webp`, alt: "Final cleansing-oil packaging layout, “I Go”", w: 815, h: 885 },
                ]}
                caption="Final packaging layouts: “I Come” and “I Go.”"
                max={760}
              />
            </Reveal>
            <Stack>
              <Cards
                columns={2}
                items={[
                  { title: "Sustainable", body: <p>Healthy skin at a fair price, from simple ingredients.</p> },
                  { title: "Inclusive", body: <p>Most men&apos;s complexion products just conceal; this one also protects.</p> },
                  { title: "Scalable", body: <p>Research spanned 3+ countries; top brands lack anything similar.</p> },
                  { title: "Successful, if…", body: <p>It sells worldwide and draws attention to men&apos;s needs.</p> },
                ]}
              />
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
                  <div>
                    <Eyebrow>Final submission</Eyebrow>
                    <h3 className="font-blinker text-[clamp(24px,2.6vw,36px)] font-medium leading-[1.15] text-white">
                      Croissant au San Diego — L&apos;Oréal Project Slides
                    </h3>
                    <p className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                      Three pages: product sheet, concept and brand rationale, and packaging.
                    </p>
                    <div className="mt-6">
                      <DownloadButton large />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <a key={i} href={DOWNLOAD.href} download={DOWNLOAD.name} aria-label={`Download the slides (page ${i} preview)`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${L}/slide-${i}.webp`}
                          alt={`Final slides, page ${i}`}
                          width={1530}
                          height={1980}
                          loading="lazy"
                          className="block h-auto w-full rounded-[8px] bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Stack>
          </WideSection>

          {/* 12 — REFLECTION */}
          <Section id="reflection" index="12" label="Reflection" title="Designing for a habit, not just a product.">
            <P>
              The question was never whether men would use foundation, but whether it could fit their routine <M>without effort or social risk</M>. That shifted the work to a simpler system.
            </P>
            <P>
              Design can answer both functional needs and social context.
            </P>
            <Statement label="Takeaway">Make it natural to start, and effortless to stop.</Statement>
          </Section>

          {/* 13 — OUR GROUP */}
          <WideSection id="group" index="13" label="Our Group" title="The team behind UniSkin Duo.">
            <Reveal>
              <figure className="mx-auto w-full max-w-[520px] rounded-[20px] border border-white/15 bg-white/[0.03] p-3 md:p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${L}/team.jpg`}
                  alt="Yifei Liu, Lechen Tao, and Sihan Wang with the L'Oréal Brandstorm 2025 screen"
                  width={2000}
                  height={1500}
                  loading="lazy"
                  className="block h-auto w-full rounded-[12px]"
                />
                <figcaption className="px-2 pb-1 pt-4 text-center">
                  <p className="font-blinker text-[18px] font-medium text-white">
                    Yifei Liu <span className="text-neutral-600">·</span> Lechen Tao <span className="text-neutral-600">·</span> Sihan Wang
                  </p>
                  <p className="font-gilroy mt-1 text-[13px] uppercase tracking-[0.2em] text-neutral-500">L&apos;Oréal Brandstorm 2025</p>
                </figcaption>
              </figure>
            </Reveal>
          </WideSection>
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

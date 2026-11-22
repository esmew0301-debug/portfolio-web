import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { Shot } from "@/components/case/vegan-kit";
import { VK_ORANGE } from "@/components/case/vegan-sizes";
import { VeganDesignSystem } from "@/components/case/vegan-design-system";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import TeamShowcase from "@/components/ui/team-showcase";
import { figma, person } from "@/lib/content";

export const metadata: Metadata = {
  title: `Val's Vegan Kitchen — ${person.name}`,
  description:
    "A mobile ordering app for a vegan burger restaurant, with a customer ordering flow and a staff management dashboard.",
};

// Cold, minimal layout on black, after zegzulka.com/meta and /undout and a split-screen hero reference: a framed hero
// (cover image left, name and dates right over a faint grid), then small type throughout. 12px labels, 16/24 body,
// 28–44px titles; text sits in a left title column and a right body column that starts at about two thirds. Screens
// sit three to a row on full-width dark panels. Orange (the app's colour) is the only accent.
const LABEL = "text-[12px] leading-[18px] text-white/45";
/** Small divider labels (Key features, Part 1 · Customer, each change): centred and a little brighter than LABEL. */
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";
const BODY = "text-[16px] leading-[24px] text-white/60";
const TITLE = "text-[20px] leading-[1.2] text-white md:text-[24px]";
const PANEL = "bg-black";

const V = "/images/vegan";
const s = (n: string, alt: string) => ({ src: `${V}/${n}.webp`, alt });

const V1_SCREENS = [
  s("f01", "Version 1 home"), s("f02", "Version 1 all menu categories"), s("f03", "Version 1 category"),
  s("f04", "Version 1 item details"), s("f05", "Version 1 cart"), s("f06", "Version 1 checkout"),
  s("f08", "Version 1 staff dashboard"), s("f09", "Version 1 menu editor"), s("f10", "Version 1 category editor"),
  s("f11", "Version 1 item editor"), s("f12", "Version 1 modifier editor"), s("f13", "Version 1 availability report"),
];

/** Orange emphasis inside grey statements. */
function O({ children }: { children: ReactNode }) {
  return <span style={{ color: VK_ORANGE }}>{children}</span>;
}

/** Description text: [[phrase]] is highlighted in orange (like the reference's blue highlights). */
function hl(t: ReactNode): ReactNode {
  if (typeof t !== "string") return t;
  const line = (l: string) => l.split(/\[\[(.+?)\]\]/).map((part, i) => (i % 2 ? <O key={i}>{part}</O> : part));
  const lines = t.split("\n");
  if (lines.length === 1) return line(t);
  // "\n" = a separate point, on its own line
  return lines.map((l, i) => (
    <span key={i} className="block">
      {line(l)}
    </span>
  ));
}
function Hx({ en }: { en: ReactNode }) {
  return hl(en);
}

// Interview participants: the four think-aloud sessions, one per scenario (photos interviewee-1..4, in this order).
const NAMES = ["Xinyang.L", "Frank.F", "Lexi.L", "Kelly.Y"];
const PHOTOS = ["1-v2", "2-v3", 3, 4].map((n) => `/images/vegan/interviewee-${n}.jpg`);
const PEOPLE = [
  {
    who: "Student", role: "Customer",
    task: "Orders lunch during a [[20-minute class break]].",
    need: "Speed and minimal navigation.",
    said: "“I'm trying to figure out [[where the actual menu starts]].”",
    icon: "M12 4 3 8.5 12 13l9-4.5L12 4Zm-6 6.8V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.2",
  },
  {
    who: "Working professional", role: "Customer",
    task: "Orders a group dinner, hunting for [[promotions and rewards]].",
    need: "Confidence the discount applied.",
    said: "“I'd simplify the Home page and make [[important actions stand out more]].”",
    icon: "M4 8h16v11H4zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 13h16",
  },
  {
    who: "Busy shift", role: "Staff",
    task: "An item [[sells out mid-rush]] and must be marked unavailable.",
    need: "A fast, certain update under time pressure.",
    said: "“After I hit Save, I'm [[not sure the change actually went through]].”",
    icon: "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12v4l2.5 2.5M9 2h6",
  },
  {
    who: "Opening", role: "Staff",
    task: "Reviews [[availability and restocks]] before customers order.",
    need: "A clear picture of what needs attention.",
    said: "“We want [[a clear entry for customers or workers]]. In real life it starts from a login, not straight into the app.”",
    icon: "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3",
  },
];

const FINDINGS = [
  { t: "Hard to find", b: "[[Customization was hard to find]]; add-on text was small and mostly skipped.", icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4" },
  { t: "Crowded home", b: "Home felt crowded at first glance; participants asked for the [[key actions to stand out]].", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { t: "No confirmation", b: "Staff got [[no confirmation after saving]], so they re-checked changes mid-rush.", icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5m0 3v.5" },
  { t: "No way in", b: "The app opened straight onto the menu; participants expected [[a login for customers or staff]].", icon: "M10 17l5-5-5-5M15 12H3M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5" },
];

// Part 6: five before / after pairs, text alternating sides.
const PAIRS = [
  {
    title: "Navigation bar",
    before: [s("f03", "Smashburgers with a drop-shadow nav bar"), s("f05", "Cart with a drop-shadow nav bar")],
    after: [s("f17", "Smashburgers with a thin line above the nav bar"), s("f19", "Cart with a thin line above the nav bar")],
    b: "A [[drop shadow framed the nav bar]], which clashed with the otherwise flat interface.\nItem names sat on a [[faint blur]] that was hard to read.",
    a: "A [[single thin line]] separates the nav bar: flat, quiet, and [[consistent with the rest of the app]].\nA [[stronger blur]] behind item names makes them clearer.",
  },
  {
    title: "Text size",
    before: [s("f04", "Version 1 item page with small add-on text"), s("f16-prev", "Categories with small item counts")],
    after: [s("f18", "Version 2 item page with grouped, larger add-ons"), s("f16", "Categories with larger item counts")],
    b: "Add-on labels and item counts were [[too small to read]], so most participants skipped them.",
    a: "Add-ons are [[grouped with larger labels]], item counts are bigger, and the discount badge is gone, so [[options read clearly]].",
  },
  {
    title: "Borders & margins",
    before: [s("f16-prev", "Categories with outlined tiles"), s("f20-prev", "Checkout with wide page margins")],
    after: [s("f16", "Categories without tile borders"), s("f20", "Checkout with tighter margins")],
    b: "Outlines added to the category tiles [[felt abrupt]], since earlier screens had none.\n[[Wide margins]] wasted space.",
    a: "Borders are removed; soft grey tiles keep the grid [[calm and readable]].\n[[Margins tightened]].",
  },
  {
    title: "Save confirmation",
    before: [s("f12", "Version 1 modifier editor"), s("f13", "Availability report without confirmation")],
    after: [s("f27", "Version 2 modifier editor"), s("f28", "Availability report with a success banner")],
    b: "Tapping Save [[gave no feedback]], so staff weren't sure their change had gone through.",
    a: "Every save now shows an [[orange banner]]: “Your change has been saved successfully!”",
  },
  {
    title: "Login entry",
    before: [s("f01", "Version 1 opens straight onto Home"), s("f08", "Version 1 opens straight onto the staff dashboard")],
    after: [s("f22", "Welcome screen with Staff and Customer login"), s("f15", "Customer home after login")],
    b: "The app opened straight onto the menu, with [[no clear way in]] for customers or staff.",
    a: "A welcome screen splits [[Staff Login and Customer Login]] before anything else.",
  },
];

// Final design (version 2): two parts, each in groups of 2–3 screens with a note beside them.
type FinalGroupT = { title: string; shots: { src: string; alt: string }[]; points: { en: string; }[] };
const FINAL: { en: string; groups: FinalGroupT[] }[] = [
  {
    en: "Part 1 · Customer",
    groups: [
      {
        title: "Welcome & Home",
        shots: [s("f14", "Welcome screen"), s("f15", "Customer home")],
        points: [
          { en: "[[Welcome]]: separate Staff and Customer login, so each side starts in the right place.", },
          { en: "[[Home]]: search, the current promotion, every category and personal picks on one screen.", },
        ],
      },
      {
        title: "Browse & Customise",
        shots: [s("f16", "All menu categories"), s("f17", "Smashburgers"), s("f18", "Item details")],
        points: [
          { en: "[[All Menu Categories]]: borderless tiles with large item counts, one tap from Home.", },
          { en: "[[Category]]: photo-led grid with a stronger blur behind each name.", },
          { en: "[[Item details]]: add-ons grouped into option sets, recommended combos first.", },
        ],
      },
      {
        title: "Cart, Checkout & Rewards",
        shots: [s("f19", "Cart"), s("f20", "Checkout"), s("f21", "About and rewards")],
        points: [
          { en: "[[Cart]]: promo code, savings and earned points shown before checkout.", },
          { en: "[[Checkout]]: delivery or pickup, address and time on one tight page.", },
          { en: "[[About & Rewards]]: restaurant info, community posts and rewards progress.", },
        ],
      },
    ],
  },
  {
    en: "Part 2 · Staff",
    groups: [
      {
        title: "Login & Dashboard",
        shots: [s("f22", "Welcome screen: staff login"), s("f23", "Staff dashboard")],
        points: [
          { en: "[[Staff Login]]: staff get their own entry from the welcome screen.", },
          { en: "[[Dashboard]]: today's status, prep time, orders and quick actions at a glance.", },
        ],
      },
      {
        title: "Manage the Menu",
        shots: [s("f24", "Menu editor"), s("f25", "Category editor"), s("f26", "Item editor")],
        points: [
          { en: "[[Menu editor]]: every category with its item count.", },
          { en: "[[Category editor]]: items in a category, with edit and delete.", },
          { en: "[[Item editor]]: price, availability and add-ons for one item.", },
        ],
      },
      {
        title: "Availability & Schedule",
        shots: [s("f27", "Modifier editor"), s("f28", "Availability report with save banner"), s("f29", "Schedule and hours")],
        points: [
          { en: "[[Modifier editor]]: extra additions with their prices.", },
          { en: "[[Availability report]]: toggle sold-out items; every save is [[confirmed with a banner]].", },
          { en: "[[Schedule & hours]]: store hours, prep time and pausing orders.", },
        ],
      },
    ],
  },
];


const FEATURES = [
                {
                  title: "Two ways in",
                  pain: "Version 1 opened straight onto the menu. Customers and staff had [[no clear entry of their own]].",
                  sol: "A welcome screen splits [[Staff Login and Customer Login]]. Customers land on Home; staff land on [[their own dashboard]].",
                  shots: [s("f14", "Welcome screen with Staff and Customer login")],
                },
                {
                  title: "Two workflows, one app",
                  pain: "Customers and staff need [[completely different things]]: one wants to order fast, the other keeps the menu right mid-rush.",
                  sol: "After login, each side gets [[its own flow]]: customers browse the menu and order; staff manage status, orders, availability and schedule from [[their own dashboard]].",
                  shots: [s("f23", "Staff dashboard"), s("f15", "Customer home")],
                },
                {
                  title: "Everything listed, step by step",
                  pain: "Ordering meant [[hunting for options]]: add-ons were hard to find and item text was easy to skip.",
                  sol: "Every category is [[one tap from Home]], items are laid out with photos, and each step (item, cart, checkout) [[does one thing]].",
                  shots: [s("f17", "Smashburgers category"), s("f18", "Item details")],
                },
];

/* ---------- layout pieces ---------- */

/** Title on the left, label + text in the right third (the reference's text rows). */
function Row({ title, label, children, id }: { title?: ReactNode; label?: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <Reveal className="grid gap-4 px-3 md:grid-cols-[2fr_1fr] md:gap-8" >
      <div id={id}>{title && <h2 className={TITLE}>{title}</h2>}</div>
      <div className="max-w-[467px]">
        {label && <p className={`${LABEL} mb-1.5`}>{label}</p>}
        {children && <div className={`${BODY} flex flex-col gap-4`}>{children}</div>}
      </div>
    </Reveal>
  );
}

/** Bulleted points (Pain point / Solution). */
function Points({ items }: { items: { k: ReactNode; v: ReactNode }[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[14px_1fr]">
          <span className="mt-[9px] h-1 w-1 rounded-full bg-white/60" />
          <span>
            <span className="text-white">{it.k}</span> {it.v}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A full-width dark panel with screens in rows of three (or two), phones at the reference size. */
function Panel({
  shots,
  cols = 3,
  className = "",
  rowLabels,
  phone = "w-[27%] max-w-[256px] md:w-[18%]",
}: {
  shots: { src: string; alt: string }[];
  cols?: 2 | 3;
  className?: string;
  /** Small labels at the left edge of given rows (row index → text); the screens stay where they are. */
  rowLabels?: Record<number, ReactNode>;
  /** Phone width (defaults to the reference size). */
  phone?: string;
}) {
  const rows: { src: string; alt: string }[][] = [];
  for (let i = 0; i < shots.length; i += cols) rows.push(shots.slice(i, i + cols));
  return (
    <Reveal className={`${PANEL} flex flex-col gap-[6vw] px-[4%] py-[6vw] md:py-[5vw] ${className}`}>
      {rows.map((r, k) => (
        <div key={k} className="relative flex justify-center gap-[6%]">
          {rowLabels?.[k] && <p className="absolute left-0 top-0 text-[13px] text-white/70">{rowLabels[k]}</p>}
          {r.map((x) => (
            <Shot key={x.src} {...x} frame className={phone} />
          ))}
        </div>
      ))}
    </Reveal>
  );
}

/** Thin arrow between Before and After (placeholder until the final arrow image arrives). */
function ThinArrow() {
  return (
    <svg viewBox="0 0 120 12" className="h-3 w-16 shrink-0 text-white/50 md:w-24" fill="none" aria-hidden>
      <path d="M0 6h116M110 1l6 5-6 5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function PairPanel({ p }: { p: (typeof PAIRS)[number] }) {
  const side = (shots: { src: string; alt: string }[], label: string, text: string, after?: boolean) => (
    <div className="flex w-full flex-col items-center gap-6 md:w-auto">
      <div className="flex justify-center gap-[8%] md:gap-6">
        {shots.map((x) => (
          <Shot key={x.src} {...x} frame className="w-[40%] max-w-[200px] md:w-[150px] xl:w-[190px]" />
        ))}
      </div>
      <div className="max-w-[400px] text-[14px] leading-[21px] text-white/60">
        <p className={`${LABEL} mb-1`} style={after ? { color: VK_ORANGE } : undefined}>
          {label}
        </p>
        <Hx en={text} />
      </div>
    </div>
  );
  return (
    <Reveal className={`${PANEL} flex flex-col items-center gap-10 px-[4%] py-[6vw] md:flex-row md:items-start md:justify-center md:gap-8 md:py-[4vw]`}>
      {side(p.before, "Before", p.b)}
      <div className="flex items-center self-center md:pb-24">
        <ThinArrow />
      </div>
      {side(p.after, "After", p.a, true)}
    </Reveal>
  );
}

/* ---------- page ---------- */

export default function ValsVeganKitchen() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO: framed split screen. Cover image left; name, line and dates right on a faint grid */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${V}/page-hero-v3.jpg`} alt="Val's Vegan Kitchen staff dashboard and welcome screen on two phones over black rock, on orange" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className={`absolute left-4 top-4 rounded-[6px] bg-black/25 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white`}>
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className={`w-[220px]`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${V}/logo.png`} alt="Val's Vegan Kitchen logo" width={256} height={256} className="mb-4 block h-10 w-10" />
              <h1 className="text-[16px] text-white">Val&apos;s Vegan Kitchen</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <>Order fast, <span style={{ color: VK_ORANGE }}>serve right.</span></>
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">COGS 187A / UC San Diego</p>
            </Reveal>
            <div className={`absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80`}>
              {["UI/UX", "Group project", "Mobile"].map((t) => (
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
              An ordering app for a San Diego vegan burger restaurant, with a dashboard for the staff behind the counter.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className={`text-[13px] text-white`}>Context</p>
              <p className={`${BODY} mt-2`}>
                Customers want to order quickly and trust their discounts. Staff need an accurate menu while orders pour in.
              </p>
            </div>
            <div>
              <p className={`text-[13px] text-white`}>
                {"What is Val's Vegan Kitchen?"}
              </p>
              <p className={`${BODY} mt-2`}>
                A customer ordering flow and a staff side for menu and availability. We designed version 1, then refined it over two rounds of usability testing.
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className={LABEL}>
                  My role
                </p>
                <p className="text-[14px] text-white/80">UI/UX, Usability Testing</p>
              </div>
              <div>
                <p className={LABEL}>
                  Tools
                </p>
                <a href={figma.veganKitchen} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  Figma ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* KEY FEATURES: a panel, then the title left and Pain point / Solution right */}
      <section className="mt-28 flex flex-col gap-20 md:mt-40 md:gap-28">
        <div className="px-3">
          <p className={DIVIDER}>
            Key features
          </p>
          <div className="mt-2 h-px bg-white/15" />
        </div>
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col gap-8">
            <div className="px-2">
              <Panel shots={f.shots} />
            </div>
            <Row title={<Hx en={f.title} />}>
              <Points
                items={[
                  { k: "Pain point.", v: <Hx en={f.pain} /> },
                  { k: "Solution.", v: <Hx en={f.sol} /> },
                ]}
              />
            </Row>
          </div>
        ))}
      </section>

      {/* INTERVIEW */}
      <section className="mt-36 md:mt-52">
        <Row
          title={"Interview"}
          label={"Four think-aloud sessions"}
        >
          <p>
            One per scenario: two customers and two staff. Each ran a task, then compared the app with DoorDash and Chick-fil-A.
          </p>
        </Row>
        <Reveal className="mt-14 px-3 md:mt-20">
          <TeamShowcase
            dark
            accent={VK_ORANGE}
            members={PEOPLE.map((p, i) => ({
              id: p.who,
              name: NAMES[i],
              tag: <Hx en={p.role} />,
              quote: <Hx en={p.said} />,
              image: PHOTOS[i],
              alt: `${NAMES[i]}, ${p.role.toLowerCase()} participant`,
            }))}
          />
        </Reveal>
      </section>

      {/* KEY FINDINGS: a list in the right column */}
      <section className="mt-36 md:mt-52">
        <Reveal className="grid gap-6 px-3 md:grid-cols-[2fr_1fr] md:gap-8">
          <h2 className={TITLE}>
            Key findings
          </h2>
          <div className="max-w-[467px]">
            <p className={`${LABEL} mb-4`}>
              Every task was finished, but four problems kept coming up.
            </p>
            {FINDINGS.map((f, i) => (
              <div key={f.t} className="grid grid-cols-[32px_1fr] border-t border-white/15 py-4">
                <p className="pt-[3px] text-[12px]" style={{ color: VK_ORANGE }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className={BODY}>
                  <span className="text-white">
                    <Hx en={f.t} />.
                  </span>{" "}
                  <Hx en={f.b} />
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* EVALUATION: version 1, three screens to a row; Changes, Design system and Final design follow */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52">
        <Row title={"Evaluation"} />
        {[
          // rows of three: version 1 is customer rows 0–1, staff rows 2–3
          { label: "Before", en: "Version 1, as participants saw it in the first round of testing.", shots: V1_SCREENS, staffRow: 2 },
        ].map((g) => (
          <div key={g.label} className="flex flex-col gap-6">
            <Row>
              <p>
                <span style={g.label === "After" ? { color: VK_ORANGE } : { color: "#fff" }}>{g.label}.</span> {g.en}
              </p>
            </Row>
            <div className="px-2">
              <Panel
                shots={g.shots}
                rowLabels={{ 0: "Customer", [g.staffRow]: "Staff" }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* CHANGES: before → after, one change at a time */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52">
        <Row title={"Changes"} label={"Five issues participants raised, and how version 2 answers each."} />
        {PAIRS.map((p) => (
          <div key={p.title} className="flex flex-col gap-3">
            <p className={`${DIVIDER} px-3`}>
              <Hx en={p.title} />
            </p>
            <div className="px-2">
              <PairPanel p={p} />
            </div>
          </div>
        ))}
      </section>

      {/* DESIGN SYSTEM */}
      <section className="mt-36 md:mt-52">
        <Row title={"Design system"} />
        {/* equal space above and below, so the board sits midway between its title and Final design */}
        <Reveal className="mt-28 px-3 md:mt-40">
          <VeganDesignSystem dark />
        </Reveal>
      </section>

      {/* FINAL DESIGN: two or three screens per panel, the note beside it */}
      <section className="mt-28 flex flex-col gap-16 md:mt-40 md:gap-20">
        <Row title={"Final design"} />
        {FINAL.map((part) => (
          <div key={part.en} className="flex flex-col gap-10">
            <div className="px-3">
              <p className={DIVIDER}>
                <Hx en={part.en} />
              </p>
              <div className="mt-2 h-px bg-white/15" />
            </div>
            {part.groups.map((g) => (
              <div key={g.title} className="grid gap-6 px-2 md:grid-cols-[2fr_1fr] md:gap-8">
                <Panel shots={g.shots} cols={3} phone="w-[28%] max-w-[300px] md:w-[25%]" />
                <div className="px-1 md:pt-2">
                  <p className="text-[18px] text-white">
                    <Hx en={g.title} />
                  </p>
                  <div className={`${BODY} mt-3`}>
                    <Points items={g.points.map((pt) => ({ k: "", v: <Hx en={pt.en} /> }))} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

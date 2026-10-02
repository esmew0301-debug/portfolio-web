import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { CompareSlider, PhoneFlow, type Phone } from "@/components/case/phone-flow";
import { Box, Cards, Chip, Container, Contrast, Eyebrow, P, Pull, Section, Stack, Statement, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { MarkerHighlight } from "@/components/ui/marker-highlight";
import { person, selectedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `Val's Vegan Kitchen — ${person.name}`,
  description:
    "A mobile ordering app for a vegan burger restaurant, with a customer ordering flow and a staff management dashboard.",
};

const NAV: CaseNavItem[] = [
  { id: "problem", index: "01", label: "The Problem" },
  { id: "flows", index: "02", label: "Mapping the Experience" },
  { id: "testing", index: "03", label: "Usability Testing" },
  { id: "iteration-1", index: "04", label: "Iteration: Customization" },
  { id: "iteration-2", index: "05", label: "Iteration: Staff Feedback" },
  { id: "outcome", index: "06", label: "Outcome" },
];

// Screens from the Figma frames (reference/vegan-kitchen/pdfs), numbered as in the file.
const V = "/images/vegan";
const ph = (n: number, step: string, alt: string, note?: string): Phone => ({
  src: `${V}/f${String(n).padStart(2, "0")}.webp`,
  step,
  alt,
  note,
});

// Complete flows (frames 14–21 and 22–29)
const CUSTOMER_FULL = [
  ph(14, "Welcome", "Welcome screen with Staff and Customer login"),
  ph(15, "Home", "Home with search, a promotion banner, categories, and recommendations"),
  ph(16, "All menu categories", "Grid of menu categories"),
  ph(17, "Category: Smashburgers", "Smashburgers item grid"),
  ph(18, "Item details", "Pepperoni & Gouda with recommended options and add-ons"),
  ph(19, "Cart", "Cart with promo code, order summary, and delivery savings"),
  ph(20, "Checkout", "Checkout with delivery or pickup, address, and order summary"),
  ph(21, "About & rewards", "Restaurant info, community hub, and rewards progress"),
];
const STAFF_FULL = [
  ph(22, "Welcome", "Welcome screen with Staff and Customer login"),
  ph(23, "Staff dashboard", "Today's status, prep time, orders, and quick actions"),
  ph(24, "Menu editor", "Category grid with item counts"),
  ph(25, "Category editor", "Smashburgers item list with edit and delete"),
  ph(26, "Item editor", "Edit Pepperoni & Gouda: name, category, price, availability, add-ons"),
  ph(27, "Modifier editor", "Extra additions with prices"),
  ph(28, "Availability report", "Sold out and available items with toggles"),
  ph(29, "Schedule & hours", "Store hours, prep time, pause orders, and menu schedule"),
];
// Condensed test flows (frames 1–6 and 8–13)
const CUSTOMER_TEST = [
  ph(1, "Home", "Home"),
  ph(2, "All menu categories", "All menu categories"),
  ph(3, "Category detail", "Smashburgers"),
  ph(4, "Item details", "Pepperoni & Gouda"),
  ph(5, "Cart", "View your cart"),
  ph(6, "Checkout", "Checkout"),
];
const STAFF_TEST = [
  ph(8, "Staff dashboard", "Staff dashboard"),
  ph(9, "Menu editor", "Menu editor"),
  ph(10, "Category editor", "Smashburgers item list"),
  ph(11, "Item editor", "Edit Pepperoni & Gouda"),
  ph(13, "Availability report", "Availability report"),
  ph(12, "Modifier editor", "Modify extra addition"),
];

const SCENARIOS = [
  {
    who: "Customer · Student",
    task: "Orders lunch alone during a 20-minute break between classes.",
    need: "Speed and minimal navigation.",
  },
  {
    who: "Customer · Working professional",
    task: "Orders a group dinner, looking for promotions and rewards before checkout.",
    need: "Value and confidence the discount applied.",
  },
  {
    who: "Staff · Busy shift",
    task: "An item sells out mid-rush and has to be marked unavailable.",
    need: "A fast, certain update under time pressure.",
  },
  {
    who: "Staff · Opening",
    task: "Reviews the availability report and restocks items before customers order.",
    need: "A clear picture of what needs attention.",
  },
];

const FINDINGS = [
  {
    who: "Student",
    worked: "Finished unassisted; food photos helped browsing; cart and checkout were easy.",
    issues: ["Home felt crowded at first glance", "Customization on the item page was hard to find", "Small item text was mostly skipped"],
  },
  {
    who: "Working professional",
    worked: "Spotted promotions immediately and finished quickly and confidently.",
    issues: ["How rewards are earned and applied was unclear", "Promotion details felt thin", "No confirmation a reward was applied"],
  },
  {
    who: "Staff · Busy shift",
    worked: "Very few steps; availability controls were easy to find.",
    issues: ["No confirmation after saving a change", "Status changes weren't prominent", "No success notification"],
  },
  {
    who: "Staff · Opening",
    worked: "Easy to learn, organized, completed unassisted.",
    issues: ["Little inventory history", "No reporting or insights", "No priority for what needs attention first"],
  },
];

const MORE = selectedWork.slice(0, 2);
const isExternal = (href: string) => /^https?:\/\//.test(href);

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      <div className="font-gilroy text-[17px] leading-[1.6] text-neutral-300 md:text-[19px]">{children}</div>
    </div>
  );
}

function FlowBlock({ label, title, text, children }: { label: string; title: string; text: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-white/[0.08] pt-12 md:pt-16">
      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
        <div>
          <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
          <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
            {title}
          </h3>
        </div>
        <P>{text}</P>
      </Reveal>
      <div className="mt-10 md:mt-14">{children}</div>
    </div>
  );
}

/** Emphasis on this page (quotes): a bright-orange marker sweep in the Vegan Kitchen accent. */
function Hl({ children }: { children: ReactNode }) {
  return (
    <MarkerHighlight markerColor="#f97316" highlightedTextColor="#171717">
      {children}
    </MarkerHighlight>
  );
}

function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="font-sulphur border-l-2 pl-5 text-[clamp(19px,1.8vw,24px)] italic leading-[1.4] text-white" style={{ borderColor: "var(--accent-green)" }}>
      {children}
    </blockquote>
  );
}

export default function ValsVeganKitchen() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-[#f6a66a]">
        <Image
          src={`${V}/cover-hero.jpg`}
          alt="Val's Vegan Kitchen: Smashburgers, the welcome screen, Home, All Menu Categories, and Pepperoni & Gouda"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.45)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#f97316" } as React.CSSProperties}
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
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">Playground · Mobile app · UX research</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(40px,6.5vw,96px)] font-medium leading-[0.98] tracking-[-0.01em] text-white">
                  Val&apos;s Vegan Kitchen
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  One app, two sides of the counter: fast ordering for customers, and a dashboard staff can trust in the middle
                  of a rush.
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
                    We designed a mobile ordering app for a vegan burger restaurant in San Diego, then put it in front of real
                    users. Four scenario-based usability tests shaped two focused redesigns.
                  </p>
                  <p className="mt-6">
                    Everything starts at one welcome screen, where each person chooses Customer or Staff login.
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Course">COGS 187A, UC San Diego</Meta>
                <Meta label="Type">Group project</Meta>
                <Meta label="Platform">iOS mobile app</Meta>
                <Meta label="Tools">Figma</Meta>
              </div>
              <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-10">
                {["Prototyping", "Usability Testing", "Interaction Design", "Iteration"].map((r) => (
                  <Chip key={r} variant="role">
                    {r}
                  </Chip>
                ))}
              </div>
            </Container>
          </section>

          {/* 01 — PROBLEM */}
          <WideSection id="problem" index="01" label="The Problem" title="Two very different people use the same restaurant.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  Customers want to order quickly, find what they like, and feel sure their discounts count. Staff need to keep
                  the menu accurate while orders keep coming in.
                </P>
                <P>
                  So we built two connected experiences, and tested each against a specific person in a specific moment rather
                  than an average user.
                </P>
              </div>
            </Stack>
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {SCENARIOS.map((s, i) => (
                  <div key={s.who} className="flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-7">
                    <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                      Scenario {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-blinker mt-2 text-[20px] font-medium leading-tight text-white">{s.who}</h4>
                    <p className="font-gilroy mt-3 text-[15px] leading-[1.6] text-neutral-400">{s.task}</p>
                    <p className="font-gilroy mt-4 border-t border-white/10 pt-4 text-[14px] text-neutral-300">
                      <span className="text-neutral-500">Needs: </span>
                      {s.need}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </WideSection>

          {/* 02 — FLOWS */}
          <WideSection id="flows" index="02" label="Mapping the Experience" title="Two flows, one system.">
            <Stack>
              <Contrast
                left={{ label: "Customer flow", items: "Home → Categories → Category → Item → Cart → Checkout" }}
                right={{ label: "Staff flow", items: "Dashboard → Menu → Category → Item → Modifiers → Availability" }}
              />
            </Stack>
            <FlowBlock
              label="Customer"
              title="From a craving to a placed order."
              text="Photos lead the browsing, every category is one tap from Home, and the cart shows delivery savings and rewards before checkout."
            >
              <PhoneFlow phones={CUSTOMER_FULL} />
            </FlowBlock>
            <FlowBlock
              label="Staff"
              title="Keeping the menu true, mid-service."
              text="The dashboard puts open status and prep time first; quick actions jump straight to availability, the menu, and the schedule."
            >
              <PhoneFlow phones={STAFF_FULL} />
            </FlowBlock>
          </WideSection>

          {/* 03 — TESTING */}
          <WideSection id="testing" index="03" label="Usability Testing" title="Putting it in front of users.">
            <Stack>
              <div className="grid grid-cols-3 gap-6 border-y border-white/10 py-8">
                {[
                  { n: "4", l: "Moderated sessions, one per scenario" },
                  { n: "2", l: "Team members per session: facilitator and note-taker" },
                  { n: "2", l: "Redesigns driven by the findings" },
                ].map((s) => (
                  <div key={s.l}>
                    <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                    <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]">{s.l}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  Each session used think-aloud: warm-up questions, the scenario and task, probing questions during the task
                  (what are you looking for, what do you expect to happen), then an interview comparing it with apps like
                  DoorDash and Chick-fil-A.
                </P>
                <div className="flex flex-col gap-5">
                  <Quote>
                    <Hl>&ldquo;I&apos;m trying to figure out where the actual menu starts.&rdquo;</Hl>
                  </Quote>
                  <Quote>
                    <Hl>&ldquo;I&apos;d simplify the Home page and make important actions stand out more.&rdquo;</Hl>
                  </Quote>
                </div>
              </div>
            </Stack>
            <FlowBlock label="What we tested" title="Customer test flow." text="The condensed six-screen path participants walked through.">
              <PhoneFlow phones={CUSTOMER_TEST} width={190} />
            </FlowBlock>
            <FlowBlock label="What we tested" title="Staff test flow." text="The same six-step depth on the staff side.">
              <PhoneFlow phones={STAFF_TEST} width={190} />
            </FlowBlock>
            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Reveal>
                <Eyebrow>Findings</Eyebrow>
                <div className="grid gap-4 md:grid-cols-2">
                  {FINDINGS.map((f) => (
                    <div key={f.who} className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-7">
                      <h4 className="font-blinker text-[20px] font-medium text-white">{f.who}</h4>
                      <p className="font-gilroy mt-3 text-[15px] leading-[1.6] text-neutral-300">
                        <span style={{ color: "#22c55e" }}>Worked · </span>
                        {f.worked}
                      </p>
                      <ul className="font-gilroy mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-[15px] leading-[1.5] text-neutral-400">
                        {f.issues.map((x) => (
                          <li key={x} className="flex gap-2">
                            <span style={{ color: "var(--accent-green)" }}>→</span>
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </WideSection>

          {/* 04 — ITERATION 01 */}
          <WideSection id="iteration-1" index="04" label="Iteration 01" title="Making customization impossible to miss.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <Box label="Problem">
                  Add-ons on the item page were easy to overlook: small text, weak hierarchy, and a scroll to find them, which
                  caused hesitation before adding to cart.
                </Box>
                <P>
                  Taking a cue from Chick-fil-A&apos;s larger section headings and separated option groups, we explored two
                  directions and tested both with two new participants on the same task: order a burger, customize it, add it
                  to cart.
                </P>
              </div>
            </Stack>
            <Reveal>
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-16">
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${V}/f04.webp`}
                    alt="The original item page with the add-ons section near the bottom"
                    width={780}
                    height={1695}
                    loading="lazy"
                    className="phone-frame mx-auto block h-auto w-full max-w-[260px]"
                  />
                  <figcaption className="font-gilroy mt-4 text-center text-[14px] text-neutral-400">Tested version: add-ons below the fold</figcaption>
                </figure>
                <div className="flex flex-col gap-5">
                  <div className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-7">
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.2em] text-neutral-500">Option A · Visible</span>
                    <p className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300">
                      Larger labels and more spacing, all inline. Both participants found it at once, but one said the page felt
                      <Hl>&ldquo;slightly crowded.&rdquo;</Hl>
                    </p>
                  </div>
                  <div className="rounded-card border p-6" style={{ borderColor: "var(--accent-green)", background: "color-mix(in srgb, var(--accent-green) 9%, var(--case-bg, #0b0b0b))" }}>
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--accent-green)" }}>
                      Option B · Collapsible · Chosen
                    </span>
                    <p className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300">
                      Add-ons grouped into expandable categories (fries, bun, sauce). Both understood it instantly and called the
                      page <Hl>&ldquo;cleaner&rdquo;</Hl>; the extra tap didn&apos;t bother either of them.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Pull label="Decision">
              <p>We shipped Option B: the best balance of discoverability and a calm page.</p>
            </Pull>
          </WideSection>

          {/* 05 — ITERATION 02 */}
          <WideSection id="iteration-2" index="05" label="Iteration 02" title="Telling staff their change actually saved.">
            <Reveal className="grid items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
              <div className="flex flex-col gap-6">
                <Box label="Problem">
                  After toggling an item and tapping Save, staff got no confirmation. Mid-rush, that meant double-checking and
                  doubt, on changes that affect live orders.
                </Box>
                <P>
                  Inventory tools like Shopify and Square confirm every save immediately. We added the same: a banner reading
                  <Hl>&ldquo;Your change has been saved successfully!&rdquo;</Hl> right after saving, so nobody has to go back and verify.
                </P>
              </div>
              <CompareSlider
                before={{ src: `${V}/f13.webp`, alt: "Availability report before: no confirmation after saving" }}
                after={{ src: `${V}/f28.webp`, alt: "Availability report after: a success banner confirms the save" }}
                width={320}
              />
            </Reveal>
          </WideSection>

          {/* 06 — OUTCOME */}
          <Section id="outcome" index="06" label="Outcome" title="Easier to find, easier to trust.">
            <P>
              Both redesigns answered something users felt rather than said: customers shouldn&apos;t have to hunt for options,
              and staff shouldn&apos;t have to wonder whether the system heard them.
            </P>
            <Cards
              columns={2}
              items={[
                { title: "Discoverability", body: <p>Grouped, collapsible add-ons put customization in view without crowding the page.</p> },
                { title: "Confidence", body: <p>Immediate save feedback removes the re-check loop during a busy shift.</p> },
              ]}
            />
            <div>
              <Eyebrow>What we&apos;d explore next</Eyebrow>
              <P>Clearer rewards and promotion details, inventory history, and reporting that tells staff what needs attention first.</P>
            </div>
            <Statement label="Takeaway">Good feedback is part of the interface, not an afterthought.</Statement>
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
                  <a href={w.href} {...(isExternal(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-cursor="view" className="group block">
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

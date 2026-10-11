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
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { person, selectedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `Val's Vegan Kitchen — ${person.name}`,
  description:
    "A mobile ordering app for a vegan burger restaurant, with a customer ordering flow and a staff management dashboard.",
};

const NAV: CaseNavItem[] = [
  { id: "problem", index: "01", label: "The Problem" },
  { id: "flows", index: "02", label: "Designing Version 1" },
  { id: "testing", index: "03", label: "Testing Version 1" },
  { id: "iteration-1", index: "04", label: "Version 2: Customization" },
  { id: "iteration-2", index: "05", label: "Version 2: Save Feedback" },
  { id: "final", index: "06", label: "Version 2: Final Flows" },
  { id: "outcome", index: "07", label: "Outcome" },
];

// Screens from the Figma frames (reference/vegan-kitchen/pdfs), numbered as in the file.
const V = "/images/vegan";
const ph = (n: number, step: string, alt: string, note?: string): Phone => ({
  src: `${V}/f${String(n).padStart(2, "0")}.webp`,
  step,
  alt,
  note,
});

// Version 2, the final design: complete flows (frames 14–21 and 22–29)
const CUSTOMER_FULL = [
  ph(14, "Welcome", "Welcome screen with Staff and Customer login", "New in version 2: the login entry"),
  ph(15, "Home", "Home with search, promotions, categories, and picks"),
  ph(16, "All menu categories", "Grid of menu categories"),
  ph(17, "Category: Smashburgers", "Smashburgers item grid"),
  ph(18, "Item details", "Pepperoni & Gouda with recommended options and add-ons"),
  ph(19, "Cart", "Cart with promo code and order summary"),
  ph(20, "Checkout", "Checkout with delivery or pickup"),
  ph(21, "About & rewards", "Restaurant info and rewards progress"),
];
const STAFF_FULL = [
  ph(22, "Welcome", "Welcome screen with Staff and Customer login", "New in version 2: the login entry"),
  ph(23, "Staff dashboard", "Status, prep time, orders, and quick actions"),
  ph(24, "Menu editor", "Category grid with item counts"),
  ph(25, "Category editor", "Smashburgers item list with edit and delete"),
  ph(26, "Item editor", "Edit Pepperoni & Gouda: price, availability, add-ons"),
  ph(27, "Modifier editor", "Extra additions with prices"),
  ph(28, "Availability report", "Sold out and available items with toggles"),
  ph(29, "Schedule & hours", "Store hours, prep time, and pause orders"),
];
// Version 1, the design we user-tested (frames 1–6 and 8–13)
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
  ph(12, "Modifier editor", "Modify extra addition"),
  ph(13, "Availability report", "Availability report"),
];

const SCENARIOS = [
  {
    who: "Customer · Student",
    task: "Orders lunch during a 20-minute class break.",
    need: "Speed and minimal navigation.",
  },
  {
    who: "Customer · Working professional",
    task: "Orders a group dinner, hunting for promotions and rewards.",
    need: "Confidence the discount applied.",
  },
  {
    who: "Staff · Busy shift",
    task: "An item sells out mid-rush and must be marked unavailable.",
    need: "A fast, certain update under time pressure.",
  },
  {
    who: "Staff · Opening",
    task: "Reviews availability and restocks before customers order.",
    need: "A clear picture of what needs attention.",
  },
];

const FINDINGS = [
  {
    who: "Student",
    worked: "Finished unassisted; photos helped; checkout was easy.",
    issues: ["Home felt crowded at first glance", "Customization was hard to find", "Small item text was mostly skipped"],
  },
  {
    who: "Working professional",
    worked: "Spotted promotions immediately and finished quickly.",
    issues: ["How rewards work was unclear", "Promotion details felt thin", "No confirmation a reward was applied"],
  },
  {
    who: "Staff · Busy shift",
    worked: "Few steps; availability controls easy to find.",
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
                  One app, two sides of the counter: fast ordering for customers, and a dashboard staff can trust mid-rush.
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
                    A mobile ordering app for a San Diego vegan burger restaurant. We designed version 1, user-tested it,
                    fixed the two problems it surfaced in version 2, then tested again.
                  </p>
                  <p className="mt-6">
                    One welcome screen splits Customer and Staff login.
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

          {/* Where it started: the sort step, before any interface work */}
          <section className="pb-16 md:pb-24">
            <Container>
              <Reveal>
                <Eyebrow>Where it started</Eyebrow>
                <h3 className="font-blinker max-w-[24ch] text-[clamp(26px,3.2vw,40px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
                  Before any screens, we sorted the kitchen.
                </h3>
                <div className="mt-6 flex flex-col gap-6">
                  <P>
                    Vegan Kitchen is built for the restaurant&apos;s kitchen operations, so the first step was a category map.
                    Every ingredient became a card with its Category, Quantity, Location, Used In, and Status, mapped across
                    the Walk-in Fridge, Deli Fridge, freezers, Dry Storage, and Lowboy Fridge.
                  </P>
                  <P>
                    Then we tested the map on its own: users had to find any item, like where the onions live, within 20
                    seconds. Only after it passed did we move on to designing the interface.
                  </P>
                </div>
              </Reveal>
              <Reveal>
                <figure className="mt-12">
                  <div className="-mx-gutter overflow-x-auto px-gutter [scrollbar-width:thin] md:mx-0 md:px-0">
                    <div className="min-w-[860px] rounded-[18px] border border-white/10 bg-white p-4 md:min-w-0 md:p-6">
                      <Image
                        src={`${V}/sort-map.webp`}
                        alt="Sort step: Commercial Kitchen Inventory, then the Onion card, then the Walk-in Fridge, then prepped Sauces, each picked from a category menu"
                        width={2678}
                        height={704}
                        sizes="(max-width: 768px) 860px, 1240px"
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                  <figcaption className="font-gilroy mt-4 text-[14px] text-neutral-400">
                    Sort step: inventory category, item card, storage location. Tested first, designed second.
                  </figcaption>
                </figure>
              </Reveal>
            </Container>
          </section>

          {/* 01 — PROBLEM */}
          <WideSection id="problem" index="01" label="The Problem" title="Two very different people use the same restaurant.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  Customers want to order quickly and trust their discounts. Staff need an accurate menu while orders pour in.
                </P>
                <P>
                  So we built two connected experiences, each tested against a specific person in a specific moment.
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
          <WideSection id="flows" index="02" label="Designing Version 1" title="Version 1: two flows, one system.">
            <Stack>
              <P>
                Version 1 was our own redesign: a new order format and a restructured ordering flow. It opened straight
                onto the app, with no login step.
              </P>
              <Contrast
                left={{ label: "Customer flow", items: "Home → Categories → Category → Item → Cart → Checkout" }}
                right={{ label: "Staff flow", items: "Dashboard → Menu → Category → Item → Modifiers → Availability" }}
              />
            </Stack>
            <FlowBlock label="Version 1 · Customer" title="From a craving to a placed order." text="Home, categories, item, cart, checkout.">
              <PhoneFlow phones={CUSTOMER_TEST} />
            </FlowBlock>
            <FlowBlock label="Version 1 · Staff" title="Keeping the menu true, mid-service." text="Dashboard, menu, item, add-ons, availability.">
              <PhoneFlow phones={STAFF_TEST} />
            </FlowBlock>
          </WideSection>

          {/* 03 — TESTING */}
          <WideSection id="testing" index="03" label="Testing Version 1" title="Putting version 1 in front of users.">
            <Stack>
              <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
                {[
                  { n: "4", l: "Moderated sessions, one per scenario" },
                  { n: "2", l: "Facilitator and note-taker per session" },
                  { n: "2", l: "Problems found, both fixed in version 2" },
                ].map((s) => (
                  <div key={s.l}>
                    <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                    <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]">{s.l}</span>
                  </div>
                ))}
              </div>
              <P>
                Each think-aloud session ran warm-up questions, the task with probing questions, then an interview comparing
                it with DoorDash and Chick-fil-A.
              </P>
              <StaggerTestimonials
                items={[
                  {
                    quote: <>&ldquo;I&apos;m trying to figure out where the actual menu starts.&rdquo;</>,
                    by: "Usability test participant",
                  },
                  {
                    quote: <>&ldquo;I&apos;d simplify the Home page and make important actions stand out more.&rdquo;</>,
                    by: "Usability test participant",
                  },
                  {
                    quote: (
                      <>
                        &ldquo;We want a clear entry for customers or workers. In real life it starts from a login, not
                        straight into the app.&rdquo;
                      </>
                    ),
                    by: "Usability test participant",
                  },
                ]}
              />
            </Stack>
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
                <div className="mt-8">
                  <P>
                    Two problems stood out: customization was hard to find, and staff got no confirmation after saving. Version 2,
                    our revision, fixed both. Because participants also asked for a clear customer or staff entry point,
                    version 2 starts from a login screen.
                  </P>
                </div>
              </Reveal>
            </div>
          </WideSection>

          {/* 04 — ITERATION 01 */}
          <WideSection id="iteration-1" index="04" label="Version 2 · Fix 01" title="Making customization impossible to miss.">
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <Box label="Problem">
                  Add-ons were easy to overlook: small text, weak hierarchy, and hidden below the fold.
                </Box>
                <P>
                  For version 2 we grouped add-ons into option sets and tried two layouts with two new participants: order
                  a burger, customize it, add it to cart.
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
                  <figcaption className="font-gilroy mt-4 text-center text-[14px] text-neutral-400">Version 1: add-ons below the fold</figcaption>
                </figure>
                <div className="flex flex-col gap-5">
                  <div className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-7">
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.2em] text-neutral-500">Option A · Visible</span>
                    <p className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300">
                      Larger labels, all inline. Both found it at once, but one called the page
                      <Hl>&ldquo;slightly crowded.&rdquo;</Hl>
                    </p>
                  </div>
                  <div className="rounded-card border p-6" style={{ borderColor: "var(--accent-green)", background: "color-mix(in srgb, var(--accent-green) 9%, var(--case-bg, #0b0b0b))" }}>
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--accent-green)" }}>
                      Option B · Collapsible · Chosen
                    </span>
                    <p className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300">
                      Add-ons in expandable groups (fries, bun, sauce). Both called it <Hl>&ldquo;cleaner&rdquo;</Hl>; the extra
                      tap didn&apos;t bother them.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Pull label="Decision">
              <p>Version 2 uses Option B: discoverable, and calm.</p>
            </Pull>
          </WideSection>

          {/* 05 — ITERATION 02 */}
          <WideSection id="iteration-2" index="05" label="Version 2 · Fix 02" title="Telling staff their change actually saved.">
            <Reveal className="grid items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
              <div className="flex flex-col gap-6">
                <Box label="Problem">
                  Tapping Save gave staff no confirmation, so mid-rush they double-checked changes that affect live orders.
                </Box>
                <P>
                  In version 2, every save is confirmed with a banner:
                  <Hl>&ldquo;Your change has been saved successfully!&rdquo;</Hl>
                </P>
              </div>
              <CompareSlider
                before={{ src: `${V}/f13.webp`, alt: "Availability report before: no confirmation after saving" }}
                after={{ src: `${V}/f28.webp`, alt: "Availability report after: a success banner confirms the save" }}
                beforeLabel="Version 1"
                afterLabel="Version 2"
                width={320}
              />
            </Reveal>
          </WideSection>

          {/* 06 — VERSION 2, FINAL */}
          <WideSection id="final" index="06" label="Version 2 · Final" title="The final flows, with both fixes in.">
            <Stack>
              <P>
                Version 2 is our revision of version 1 and the final design. Both flows now start from a welcome screen that
                splits Customer and Staff login, with visible add-ons and confirmed saves built in.
              </P>
            </Stack>
            <FlowBlock
              label="Version 2 · Customer"
              title="From a craving to a placed order."
              text="Photos lead browsing, every category is one tap from Home, and the cart shows savings before checkout."
            >
              <PhoneFlow phones={CUSTOMER_FULL} />
            </FlowBlock>
            <FlowBlock
              label="Version 2 · Staff"
              title="Keeping the menu true, mid-service."
              text="Status and prep time come first; quick actions jump to availability, menu, and schedule."
            >
              <PhoneFlow phones={STAFF_FULL} />
            </FlowBlock>
          </WideSection>

          {/* 07 — OUTCOME */}
          <Section id="outcome" index="07" label="Outcome" title="Easier to find, easier to trust.">
            <P>
              Customers shouldn&apos;t hunt for options, and staff shouldn&apos;t wonder whether the system heard them.
            </P>
            <div>
              <Eyebrow>Testing version 2</Eyebrow>
              <P>We ran a second round of user testing on version 2. This time there were no suggestions, only positive feedback.</P>
              <Reveal>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[
                    { src: `${V}/feedback-1.jpg`, alt: "Chat: no suggestions were given, all positive reviews" },
                    { src: `${V}/feedback-2.jpg`, alt: "Chat: a friend messaged to say we did a great job" },
                  ].map((f) => (
                    <div key={f.src} className="relative aspect-[1206/1535] overflow-hidden rounded-[18px] border border-white/10 bg-[#121212]">
                      <Image src={f.src} alt={f.alt} fill sizes="(max-width: 640px) 100vw, 380px" className="object-contain object-top" />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Cards
              columns={2}
              items={[
                { title: "Discoverability", body: <p>Collapsible add-ons keep customization visible without crowding.</p> },
                { title: "Confidence", body: <p>Instant save feedback ends the re-check loop.</p> },
              ]}
            />
            <div>
              <Eyebrow>What we&apos;d explore next</Eyebrow>
              <P>Clearer rewards, inventory history, and reports that flag what needs attention.</P>
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

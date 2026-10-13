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
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { figma, person, selectedWork } from "@/lib/content";
import { L } from "@/lib/i18n";

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
  { id: "iteration-3", index: "06", label: "Version 2: Login Entry" },
  { id: "final", index: "07", label: "Version 2: Final Flows" },
  { id: "outcome", index: "08", label: "Outcome" },
];

// Screens from the Figma frames (reference/vegan-kitchen/pdfs), numbered as in the file.
const V = "/images/vegan";
const ph = (n: number, step: string, alt: string, note?: ReactNode): Phone => ({
  src: `${V}/f${String(n).padStart(2, "0")}.webp`,
  step,
  alt,
  note,
});

// Version 2, the final design: complete flows (frames 14–21 and 22–29)
const CUSTOMER_FULL = [
  ph(14, "Welcome", "Welcome screen with Staff and Customer login", <L en="New in version 2: the login entry" zh="版本 2 新增：登录入口" />),
  ph(15, "Home", "Home with search, promotions, categories, and picks"),
  ph(16, "All menu categories", "Grid of menu categories"),
  ph(17, "Category: Smashburgers", "Smashburgers item grid"),
  ph(18, "Item details", "Pepperoni & Gouda with recommended options and add-ons"),
  ph(19, "Cart", "Cart with promo code and order summary"),
  ph(20, "Checkout", "Checkout with delivery or pickup"),
  ph(21, "About & rewards", "Restaurant info and rewards progress"),
];
const STAFF_FULL = [
  ph(22, "Welcome", "Welcome screen with Staff and Customer login", <L en="New in version 2: the login entry" zh="版本 2 新增：登录入口" />),
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
    taskZh: "利用 20 分钟的课间点午餐。",
    need: "Speed and minimal navigation.",
    needZh: "速度快，操作步骤少。",
  },
  {
    who: "Customer · Working professional",
    task: "Orders a group dinner, hunting for promotions and rewards.",
    taskZh: "为多人点晚餐，同时寻找优惠和积分奖励。",
    need: "Confidence the discount applied.",
    needZh: "能确认优惠已经生效。",
  },
  {
    who: "Staff · Busy shift",
    task: "An item sells out mid-rush and must be marked unavailable.",
    taskZh: "高峰期某道菜售罄，需要立刻标记为不可售。",
    need: "A fast, certain update under time pressure.",
    needZh: "在时间压力下也能快速、确定地完成更新。",
  },
  {
    who: "Staff · Opening",
    task: "Reviews availability and restocks before customers order.",
    taskZh: "在顾客下单前检查菜品供应状态并补货。",
    need: "A clear picture of what needs attention.",
    needZh: "清楚了解哪些事情需要处理。",
  },
];

const FINDINGS = [
  {
    who: "Student",
    worked: "Finished unassisted; photos helped; checkout was easy.",
    workedZh: "无需协助就完成了任务；图片很有帮助；结账很顺利。",
    issues: ["Home felt crowded at first glance", "Customization was hard to find", "Small item text was mostly skipped"],
    issuesZh: ["首页第一眼看上去很拥挤", "很难找到商品定制选项", "菜品下方的小字大多被忽略"],
  },
  {
    who: "Working professional",
    worked: "Spotted promotions immediately and finished quickly.",
    workedZh: "一眼就看到了优惠活动，很快完成任务。",
    issues: ["How rewards work was unclear", "Promotion details felt thin", "No confirmation a reward was applied"],
    issuesZh: ["不清楚积分奖励怎么用", "优惠活动的说明不够详细", "没有提示奖励是否已经生效"],
  },
  {
    who: "Staff · Busy shift",
    worked: "Few steps; availability controls easy to find.",
    workedZh: "步骤少，供应状态的开关很好找。",
    issues: ["No confirmation after saving a change", "Status changes weren't prominent", "No success notification"],
    issuesZh: ["保存修改后没有任何确认提示", "状态变化不够醒目", "没有操作成功的提示"],
  },
  {
    who: "Staff · Opening",
    worked: "Easy to learn, organized, completed unassisted.",
    workedZh: "容易上手，条理清晰，无需协助就完成了任务。",
    issues: ["Little inventory history", "No reporting or insights", "No priority for what needs attention first"],
    issuesZh: ["几乎没有库存历史记录", "没有报表或数据分析", "没有标出哪些事情需要优先处理"],
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

function FlowBlock({ label, title, text, children }: { label: string; title: ReactNode; text: ReactNode; children: ReactNode }) {
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
                  <L
                    en="One app, two sides of the counter: fast ordering for customers, and a dashboard staff can trust mid-rush."
                    zh="一个 App，同时服务柜台内外：让顾客快速下单，也为店员提供高峰期值得信赖的管理后台。"
                  />
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
                    <L
                      en="A mobile ordering app for a San Diego vegan burger restaurant. We designed version 1 and user-tested it."
                      zh="这是一款为圣地亚哥一家素食汉堡店设计的手机点餐 App。我们先设计了版本 1，并进行了用户测试。"
                    />
                  </p>
                  <p className="mt-6">
                    <L
                      en="Version 2 fixed the two problems testing surfaced and added a login entry participants asked for. Then we
                    tested again."
                      zh="版本 2 解决了测试中暴露的两个问题，并加入了参与者希望有的登录入口。之后，我们又做了一轮测试。"
                    />
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Course">COGS 187A, UC San Diego</Meta>
                <Meta label="Type"><L en="Group project" zh="小组项目" /></Meta>
                <Meta label="Platform"><L en="iOS mobile app" zh="iOS 手机应用" /></Meta>
                <Meta label="Tools">Figma</Meta>
              </div>
              <div className="mt-10 border-t border-white/10 pt-10">
                {/* Same hover animation as End of an Era's Figma button, in bright orange */}
                <InteractiveHoverLink
                  href={figma.veganKitchen}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  text={<L en="Open in Figma" zh="在 Figma 中打开" />}
                  className="font-gilroy text-[15px] font-medium"
                  style={
                    {
                      "--ihb-border": "#ff7a1a",
                      "--ihb-fg": "#ff7a1a",
                      "--ihb-fill": "#ff7a1a",
                      "--ihb-fill-fg": "#ffffff",
                    } as React.CSSProperties
                  }
                />
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
                  <L en="Before any screens, we sorted the kitchen." zh="在设计任何界面之前，我们先把厨房梳理了一遍。" />
                </h3>
                <div className="mt-6 flex flex-col gap-6">
                  <P>
                    <L
                      en="Vegan Kitchen supports both sides of the restaurant, so before designing either side we mapped how the
                    kitchen itself is organized. Every ingredient became a card with its Category, Quantity, Location, Used In, and Status, mapped across
                    the Walk-in Fridge, Deli Fridge, freezers, Dry Storage, and Lowboy Fridge."
                      zh="Vegan Kitchen 要同时服务顾客和店员，所以在设计任何一端之前，我们先梳理了厨房本身是如何组织的。每种食材都整理成一张卡片，记录它的 Category、Quantity、Location、Used In 和 Status，并对应到 Walk-in Fridge、Deli Fridge、冷冻柜、Dry Storage 和 Lowboy Fridge 这些存放位置。"
                    />
                  </P>
                  <P>
                    <L
                      en="Then we tested the map on its own: users had to find any item, like where the onions live, within 20
                    seconds. Once it passed, that map gave us a shared picture of the kitchen, and we moved on to the ordering
                    and staff flows."
                      zh="接着，我们单独测试了这张分类图：用户需要在 20 秒内找到任意一种食材，比如洋葱放在哪里。测试通过后，这张图为团队建立了对厨房的共同认知，我们随后才开始设计点餐流程和店员流程。"
                    />
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
                    <L
                      en="Sort step: inventory category, item card, storage location. Tested first, designed second."
                      zh="分类步骤：库存类别、食材卡片、存放位置。先测试，再设计。"
                    />
                  </figcaption>
                </figure>
              </Reveal>
            </Container>
          </section>

          {/* 01 — PROBLEM */}
          <WideSection id="problem" index="01" label="The Problem" title={<L en="Two very different people use the same restaurant." zh="同一家餐厅，两类截然不同的使用者。" />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  <L
                    en="Customers want to order quickly and trust their discounts. Staff need an accurate menu while orders pour in."
                    zh="顾客希望快速完成点餐，并能清楚确认优惠是否成功使用；店员则需要在订单大量涌入时，保证菜单信息准确。"
                  />
                </P>
                <P>
                  <L
                    en="So we built two connected experiences, each tested against a specific person in a specific moment."
                    zh="所以我们设计了两套相互关联的体验，每一套都针对具体的人、具体的使用时刻进行测试。"
                  />
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
                    <p className="font-gilroy mt-3 text-[15px] leading-[1.6] text-neutral-400"><L en={s.task} zh={s.taskZh} /></p>
                    <p className="font-gilroy mt-4 border-t border-white/10 pt-4 text-[14px] text-neutral-300">
                      <span className="text-neutral-500">Needs: </span>
                      <L en={s.need} zh={s.needZh} />
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </WideSection>

          {/* 02 — FLOWS */}
          <WideSection id="flows" index="02" label="Designing Version 1" title={<L en="Version 1: two flows, one system." zh="版本 1：两条流程，一个系统。" />}>
            <Stack>
              <P>
                <L
                  en="Version 1 was our own redesign: a new order format and a restructured ordering flow. It opened straight
                onto the app, with no login step."
                  zh="版本 1 是我们自己完成的重新设计：新的点餐形式，以及重新梳理过的点餐流程。打开 App 会直接进入主界面，没有登录步骤。"
                />
              </P>
              <Contrast
                left={{ label: "Customer flow", items: "Home → Categories → Category → Item → Cart → Checkout" }}
                right={{ label: "Staff flow", items: "Dashboard → Menu → Category → Item → Modifiers → Availability" }}
              />
            </Stack>
            <FlowBlock
              label="Version 1 · Customer"
              title={<L en="From a craving to a placed order." zh="从想吃，到下单。" />}
              text={<L en="Home, categories, item, cart, checkout." zh="首页、分类、菜品、购物车、结账。" />}
            >
              <PhoneFlow phones={CUSTOMER_TEST} />
            </FlowBlock>
            <FlowBlock
              label="Version 1 · Staff"
              title={<L en="Keeping the menu accurate during service." zh="让营业中的菜单信息保持准确。" />}
              text={<L en="Dashboard, menu, item, add-ons, availability." zh="管理面板、菜单、菜品、加料选项、供应状态。" />}
            >
              <PhoneFlow phones={STAFF_TEST} />
            </FlowBlock>
          </WideSection>

          {/* 03 — TESTING */}
          <WideSection id="testing" index="03" label="Testing Version 1" title={<L en="Putting version 1 in front of users." zh="对版本 1 进行可用性测试。" />}>
            <Stack>
              <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
                {[
                  { n: "4", l: "Moderated sessions, one per scenario", zh: "场有主持人引导的测试，每个场景一场" },
                  { n: "2", l: "Facilitator and note-taker per session", zh: "每场一位主持人、一位记录员" },
                  { n: "2", l: "Problems found, both fixed in version 2", zh: "个被发现的问题，都在版本 2 中解决" },
                ].map((s) => (
                  <div key={s.l}>
                    <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                    <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]"><L en={s.l} zh={s.zh} /></span>
                  </div>
                ))}
              </div>
              <P>
                <L
                  en="Each think-aloud session ran warm-up questions, the task with probing questions, then an interview comparing
                it with DoorDash and Chick-fil-A."
                  zh="每场出声思考测试都包括三部分：热身问题、带追问的任务操作，以及一段把它和 DoorDash、Chick-fil-A 做对比的访谈。"
                />
              </P>
              <StaggerTestimonials
                repeat={false}
                showCount={false}
                items={[
                  {
                    quote: <L en={<>&ldquo;I&apos;m trying to figure out where the actual menu starts.&rdquo;</>} zh="“我在找真正的菜单到底从哪里开始。”" />,
                    by: "Usability test participant",
                  },
                  {
                    quote: <L en={<>&ldquo;I&apos;d simplify the Home page and make important actions stand out more.&rdquo;</>} zh="“我会把首页简化一些，让重要的操作更突出。”" />,
                    by: "Usability test participant",
                  },
                  {
                    quote: (
                      <L
                        en={
                          <>
                            &ldquo;We want a clear entry for customers or workers. In real life it starts from a login, not
                            straight into the app.&rdquo;
                          </>
                        }
                        zh="“我们希望顾客和店员各有一个明确的入口。现实中都是先登录，而不是一打开就进入应用界面。”"
                      />
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
                        <L en={f.worked} zh={f.workedZh} />
                      </p>
                      <ul className="font-gilroy mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-[15px] leading-[1.5] text-neutral-400">
                        {f.issues.map((x, k) => (
                          <li key={x} className="flex gap-2">
                            <span style={{ color: "var(--accent-green)" }}>→</span>
                            <L en={x} zh={f.issuesZh[k]} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <P>
                    <L
                      en="Two problems stood out: customization was hard to find, and staff got no confirmation after saving. Version 2,
                    our revision, fixed both. Because participants also asked for a clear customer or staff entry point,
                    version 2 starts from a login screen. We focused this iteration on the issues affecting the core ordering and
                    staff workflows. Other ideas, including rewards, inventory history, and reporting, remained opportunities for
                    future exploration."
                      zh="有两个问题最为突出：商品定制选项很难找到，店员保存修改后也得不到任何确认。版本 2 解决了这两个问题。另外，参与者希望顾客和店员各有一个明确的入口，所以版本 2 改为从登录界面开始。这一轮迭代集中处理影响核心点餐流程和店员操作流程的问题；积分奖励、库存历史和报表等其他想法，则留作后续可以继续探索的方向。"
                    />
                  </P>
                </div>
              </Reveal>
            </div>
          </WideSection>

          {/* 04 — ITERATION 01 */}
          <WideSection id="iteration-1" index="04" label="Version 2 · Fix 01" title={<L en="Making customization easier to find." zh="让定制选项更容易被找到。" />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <Box label="Problem">
                  <L
                    en="Add-ons were easy to overlook: small text, weak hierarchy, and hidden below the fold."
                    zh="加料选项很容易被忽略：字太小、层级不明显，而且藏在首屏以下。"
                  />
                </Box>
                <P>
                  <L
                    en="For version 2 we grouped add-ons into option sets and tried two layouts with two new participants: order
                  a burger, customize it, add it to cart."
                    zh="在版本 2 中，我们把加料选项按组归类，并请两位新的参与者试用了两种布局，任务是：点一个汉堡、进行定制，然后加入购物车。"
                  />
                </P>
              </div>
            </Stack>
            <Reveal>
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-16">
                <CompareSlider
                  before={{ src: `${V}/f04.webp`, alt: "Version 1 item page: small add-on text near the bottom" }}
                  after={{ src: `${V}/f32.webp`, alt: "Version 2 item page: larger, clearer add-on options" }}
                  beforeLabel="Version 1"
                  afterLabel="Version 2"
                  width={300}
                />
                <div className="flex flex-col gap-5">
                  <div className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-7">
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.2em] text-neutral-500">Option A · Visible</span>
                    <p className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300">
                      <L
                        en={<>Larger labels, all inline. Both found it at once, but one called the page{" "}
                      <Hl>&ldquo;slightly crowded.&rdquo;</Hl></>}
                        zh={<>选项标签更大，全部直接展开。两位参与者都立即找到了，但其中一位觉得页面<Hl>“有点拥挤”</Hl>。</>}
                      />
                    </p>
                  </div>
                  <div className="rounded-card border p-6" style={{ borderColor: "var(--accent-green)", background: "color-mix(in srgb, var(--accent-green) 9%, var(--case-bg, #0b0b0b))" }}>
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--accent-green)" }}>
                      Option B · Collapsible · Chosen
                    </span>
                    <p className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300">
                      <L
                        en={<>Add-ons in expandable groups (fries, bun, sauce). Both called it <Hl>&ldquo;cleaner&rdquo;</Hl>; the extra
                      tap didn&apos;t bother them.</>}
                        zh={<>加料选项按可展开的分组排列（薯条、面包、酱料）。两位参与者都觉得<Hl>“更清爽”</Hl>，多点一下也不觉得麻烦。</>}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Pull label="Decision">
              <p>
                <L en="Version 2 uses Option B: easy to find, without crowding the page." zh="版本 2 采用了 Option B：既容易找到，又不会让页面显得拥挤。" />
              </p>
            </Pull>
          </WideSection>

          {/* 05 — ITERATION 02 */}
          <WideSection id="iteration-2" index="05" label="Version 2 · Fix 02" title={<L en="Telling staff their change actually saved." zh="明确告诉店员：修改已经保存。" />}>
            <Reveal className="grid items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
              <div className="flex flex-col gap-6">
                <Box label="Problem">
                  <L
                    en="Tapping Save gave staff no confirmation, so mid-rush they double-checked changes that affect live orders."
                    zh="店员点击保存后没有任何确认提示，所以在高峰期，他们会反复检查那些会影响实时订单的修改。"
                  />
                </Box>
                <P>
                  <L
                    en={<>In version 2, every save is confirmed with a banner:{" "}
                  <Hl>&ldquo;Your change has been saved successfully!&rdquo;</Hl></>}
                    zh={<>在版本 2 中，每次保存都会弹出一条横幅提示：<Hl>&ldquo;Your change has been saved successfully!&rdquo;</Hl></>}
                  />
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

          {/* 06 — VERSION 2, FIX 03 */}
          <WideSection id="iteration-3" index="06" label="Version 2 · Fix 03" title={<L en="A clear way in for customers and staff." zh="为顾客和店员提供清晰的入口。" />}>
            <Reveal className="grid items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
              <div className="flex flex-col gap-6">
                <Box label="Problem">
                  <L
                    en="Version 1 opened straight onto the menu. Participants wanted a clear entry for customers or workers, because
                  in real life it starts from a login."
                    zh="版本 1 一打开就直接进入菜单。参与者希望顾客和店员各有一个明确的入口，因为在实际使用中，通常都是从登录开始。"
                  />
                </Box>
                <P>
                  <L
                    en={<>In version 2, the app opens on a welcome screen with separate <Hl>Staff Login</Hl> and{" "}
                  <Hl>Customer Login</Hl> entry points.</>}
                    zh={<>在版本 2 中，App 打开后先进入欢迎页，分别提供 <Hl>Staff Login</Hl> 和 <Hl>Customer Login</Hl> 两个入口。</>}
                  />
                </P>
              </div>
              <CompareSlider
                before={{ src: `${V}/f01.webp`, alt: "Version 1: the app opens straight onto Home" }}
                after={{ src: `${V}/f14.webp`, alt: "Version 2: a welcome screen with Staff and Customer login" }}
                beforeLabel="Version 1"
                afterLabel="Version 2"
                width={320}
              />
            </Reveal>
          </WideSection>

          {/* 07 — VERSION 2, FINAL */}
          <WideSection id="final" index="07" label="Version 2 · Final" title={<L en="The final flows, with every fix in." zh="包含所有修改的最终流程。" />}>
            <Stack>
              <P>
                <L
                  en="Version 2 is our revision of version 1 and the final design. Both flows now start from a welcome screen that
                splits Customer and Staff login, with visible add-ons and confirmed saves built in."
                  zh="版本 2 是我们在版本 1 基础上修改完成的最终设计。两条流程现在都从区分顾客和店员登录的欢迎页开始，也都加入了更醒目的加料选项和保存成功提示。"
                />
              </P>
            </Stack>
            <FlowBlock
              label="Version 2 · Customer"
              title={<L en="From a craving to a placed order." zh="从想吃，到下单。" />}
              text={
                <L
                  en="Photos lead browsing, every category is one tap from Home, and the cart shows savings before checkout."
                  zh="以图片引导浏览，从首页点一下就能进入任意分类，购物车在结账前会显示已节省的金额。"
                />
              }
            >
              <PhoneFlow phones={CUSTOMER_FULL} />
            </FlowBlock>
            <FlowBlock
              label="Version 2 · Staff"
              title={<L en="Keeping the menu accurate during service." zh="让营业中的菜单信息保持准确。" />}
              text={
                <L
                  en="Status and prep time come first; quick actions jump to availability, menu, and schedule."
                  zh="营业状态和出餐时间放在最前面，快捷操作可以直接跳转到供应状态、菜单和营业时间设置。"
                />
              }
            >
              <PhoneFlow phones={STAFF_FULL} />
            </FlowBlock>
          </WideSection>

          {/* 08 — OUTCOME */}
          <Section id="outcome" index="08" label="Outcome" title={<L en="Easier to find, easier to trust." zh="更容易找到，也更让人放心。" />}>
            <P>
              <L
                en={<>Customers shouldn&apos;t hunt for options, and staff shouldn&apos;t wonder whether the system heard them.</>}
                zh="顾客不应该到处找选项，店员也不应该怀疑系统到底有没有收到他们的操作。"
              />
            </P>
            <div>
              <Eyebrow>Testing version 2</Eyebrow>
              <P>
                <L
                  en="We ran a second round of user testing on version 2, and this time the feedback was positive. It was a small group,
                so it tells us the changes worked for them, not that the app is free of problems."
                  zh="我们针对版本 2 做了第二轮可用性测试，这一次收到的反馈都是正面的。不过参与人数不多，这只能说明这些修改对他们有效，并不代表这个 App 已经没有问题。"
                />
              </P>
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
                { title: "Discoverability", body: <p><L en="Collapsible add-ons keep customization visible without crowding." zh="可折叠的加料选项让定制功能保持可见，又不会显得拥挤。" /></p> },
                { title: "Confidence", body: <p><L en="Instant save feedback ends the re-check loop." zh="即时的保存反馈，让店员不必再反复检查。" /></p> },
              ]}
            />
            <div>
              <Eyebrow>What we&apos;d explore next</Eyebrow>
              <P>
                <L en="Clearer rewards, inventory history, and reports that flag what needs attention." zh="更清楚的积分奖励说明、库存历史记录，以及能标出待处理事项的报表。" />
              </P>
            </div>
            <div>
              <Statement label="Takeaway">
                <L
                  en="Hearing positive feedback from users after all the iterations was genuinely rewarding."
                  zh="经过多轮迭代，终于收到用户的正面反馈，这让我真切地感到付出是值得的。"
                />
              </Statement>
              <P>
                <L
                  en="It gave me more confidence in my design decisions and reminded me why I enjoy turning feedback into something
                better."
                  zh="这让我对自己的设计决策更有信心，也让我再次意识到，我为什么热爱把反馈转化为更好的设计。"
                />
              </P>
            </div>
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

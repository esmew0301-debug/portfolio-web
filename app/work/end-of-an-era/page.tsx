import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { DeviceStrip, Showcase, type Frame, type Placed, type Callout } from "@/components/case/device";
import { EoeDesignSystem } from "@/components/case/eoe-design-system";
import { Laptop } from "@/components/case/laptop";
import { Cards, Container, P, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person, selectedWork } from "@/lib/content";
import { L } from "@/lib/i18n";
import { FRAMES } from "./frames";

export const metadata: Metadata = {
  title: `End of an Era — ${person.name}`,
  description: "Core workflow design for a legal-tech estate-settlement platform.",
};

// Case-study layout with the galleries, device frames and annotated boards of the earlier version. The hero (title,
// tags, front-on laptop) follows keithren.com/space-mpaa. Order: key features first, then every step's screens,
// then the background, the domain map, the design system and the components.
const FIGMA_LINK = figma.endOfAnEra;
const ACCENT = "#047C88"; // highlight colour (the app's teal)

const NAV: CaseNavItem[] = [
  { id: "features", index: "01", label: "Key Features" },
  { id: "flow", index: "02", label: "Step by Step" },
  { id: "background", index: "03", label: "Background" },
  { id: "design-system", index: "04", label: "Design System" },
  { id: "components", index: "05", label: "Components" },
];

const E = "/images/eoe";
type Name = keyof typeof FRAMES;
type Raw = [label: string, zh?: string];
type Screen = { frame: Frame; label: string; zh?: string };
const fr = (name: Name, alt: string): Frame => {
  const f = FRAMES[name];
  return { src: `${E}/${name}.webp`, w: f.w, h: f.h, win: f.win ? [...f.win] : null, alt };
};
const set = (prefix: string, items: Raw[], order?: number[]): Screen[] =>
  (order ?? items.map((_, i) => i + 1)).map((n) => {
    const [label, zh] = items[n - 1];
    return { frame: fr(`${prefix}-${n}` as Name, label), label, zh };
  });

const Hi = ({ children }: { children: ReactNode }) => <span style={{ color: ACCENT }}>{children}</span>;

// Background blurs, placed down the page (top as a share of the page height).
const T = "rgba(47,127,134,0.07)"; // teal (the hero glow above stays stronger)
const T2 = "rgba(47,127,134,0.05)";
const C = "rgba(255,255,255,0.9)"; // white
const BLOBS: { top: string; left: string; size: string; color: string }[] = [
  { top: "0.5%", left: "calc(50% - min(550px,60vw))", size: "min(1100px,120vw)", color: "rgba(47,127,134,0.34)" },
  { top: "1%", left: "-15%", size: "min(700px,90vw)", color: C },
  { top: "9%", left: "60%", size: "min(800px,90vw)", color: T2 },
  { top: "18%", left: "-20%", size: "min(900px,100vw)", color: T },
  { top: "27%", left: "55%", size: "min(800px,90vw)", color: C },
  { top: "36%", left: "-10%", size: "min(850px,95vw)", color: T2 },
  { top: "46%", left: "60%", size: "min(900px,100vw)", color: T },
  { top: "55%", left: "-20%", size: "min(800px,90vw)", color: C },
  { top: "64%", left: "50%", size: "min(850px,95vw)", color: T2 },
  { top: "74%", left: "-15%", size: "min(900px,100vw)", color: T },
  { top: "83%", left: "55%", size: "min(800px,90vw)", color: C },
];

/* ---------- screens per step ---------- */

const FIND_PLANNER = set("find-planner", [
  ["Checklist with planning-phase files attached", "任务清单，规划阶段的文件已附上"],
  ["The will, pre-uploaded during planning", "遗嘱已在规划阶段预先上传"],
  ["Adding a newer version", "补充一份更新的版本"],
  ["Pre-uploaded and new files, side by side", "预先上传的文件与新文件并列"],
]);
const FIND_NOPLANNER = set("find-noplanner", [
  ["Checklist: 0 of 8 tasks", "任务清单：8 项完成 0 项"],
  ["An empty upload step", "尚未上传文件"],
  ["File selected", "已选好文件"],
  ["Uploaded and complete", "上传完成"],
  ["Next: living trust documents", "下一步：生前信托文件"],
]);
const TIA_PLANNER = set("tia-planner", [
  ["Accounts imported from planning", "从规划阶段导入的账户"],
  ["Details pre-filled, balance to confirm", "信息已预填，余额待确认"],
  ["Balance confirmed and locked", "余额已确认并锁定"],
  ["Editing a confirmed balance", "修改已确认的余额"],
  ["Re-confirming the change", "再次确认修改"],
  ["Updated balance confirmed", "更新后的余额已确认"],
  ["Income sources imported", "导入的收入来源"],
  ["The Add Income form", "Add Income 表单"],
  ["Income sources, ready to track", "收入来源，可开始追踪"],
]);
const TIA_NOPLANNER = set("tia-noplanner", [
  ["Empty: no accounts or income yet", "空状态：还没有账户或收入"],
  ["Add Account", "添加账户"],
  ["Choosing the account type", "选择账户类型"],
  ["First account added", "已添加第一个账户"],
  ["Add Income", "添加收入"],
  ["Income source options", "收入来源选项"],
  ["Income sources recorded", "收入来源已记录"],
]);
const LIAB_PLANNER = set("liab-planner", [
  ["Debts overview, files attached", "债务总览，文件已附上"],
  ["Credit report pre-uploaded (Equifax)", "信用报告已预先上传（Equifax）"],
  ["Adding a second report", "添加第二份报告"],
  ["Find Mortgage & Property Loans", "查找房贷与房产贷款"],
  ["Properties and loans listed", "房产及贷款列表"],
  ["Identify Vehicle Loans", "确认车贷"],
  ["Vehicles and loans listed", "车辆及贷款列表"],
  ["Medical bills, with status", "医疗账单及状态"],
  ["Back in Secure & Inventory Assets", "回到 Secure & Inventory Assets"],
]);
const LIAB_NOPLANNER = set(
  "liab-noplanner",
  [
    ["Debts overview: 0 of 8 tasks", "债务总览：8 项完成 0 项"],
    ["Pull Credit Reports, nothing uploaded", "调取信用报告：尚未上传"],
    ["Report selected", "已选好报告"],
    ["Report uploaded", "报告已上传"],
    ["Properties and loans listed", "房产及贷款列表"],
    ["Find Mortgage & Property Loans", "查找房贷与房产贷款"],
    ["Identify Vehicle Loans", "确认车贷"],
    ["Vehicles and loans listed", "车辆及贷款列表"],
    ["Medical bills, with status", "医疗账单及状态"],
    ["Back in Secure & Inventory Assets", "回到 Secure & Inventory Assets"],
  ],
  [1, 2, 3, 4, 6, 5, 7, 8, 9, 10],
);
const RE_PLANNER = set("realestate-planner", [["Properties and vehicles imported, with status tags", "导入的房产和车辆，附状态标签"]]);
const RE_NOPLANNER = set("realestate-noplanner", [
  ["Empty: no properties or vehicles", "空状态：还没有房产或车辆"],
  ["Add Primary Residence", "添加主要住所"],
  ["First property recorded", "已记录第一处房产"],
  ["Add Vehicle", "添加车辆"],
  ["Property and vehicle recorded", "房产和车辆均已记录"],
]);
const PERSONAL_NOPLANNER = set("personal-noplanner", [
  ["Empty: belongings and digital assets", "空状态：个人物品与数字资产"],
  ["Add Jewelry and Watches", "添加珠宝和手表"],
  ["Belongings catalogued, with status", "物品已登记，附状态"],
]);
const BUSINESS_NOPLANNER = set("business-noplanner", [
  ["Step 15 of Secure & Inventory Assets", "Secure & Inventory Assets 的第 15 步"],
  ["Appraisal tracking", "估价追踪"],
]);

/* ---------- key features: annotated boards (click the card behind to bring it forward) ---------- */

type Board = { devices: Placed[]; notes: Callout[] };

const DUAL: Board = {
  devices: [
    { frame: fr("find-noplanner-1", "No Planner estate: Find All Real Accounts checklist, 0 of 8 tasks"), left: 0, top: 15, width: 46 },
    { frame: fr("realestate-planner-1", "Planner estate: properties and vehicles imported from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.37, fy: 0.333, text: "No Planner: starts at 0 of 8.", zh: "No Planner：从 8 项完成 0 项开始。" },
    { on: 0, fx: 0.93, fy: 0.46, text: "Every task has one next action.", zh: "每项任务只给出一个下一步。" },
    { on: 1, fx: 0.5, fy: 0.336, text: "Planner: records arrive tagged.", zh: "Planner：导入的记录已带状态。" },
    { on: 1, fx: 0.86, fy: 0.348, text: "Confirm or update, no re-entry.", zh: "确认或更新，无需重新录入。" },
    { on: 1, fx: 0.32, fy: 0.827, text: "Documents carry over too.", zh: "证明文件也一并带入。" },
  ],
};

const TIA_BOARD: Board = {
  devices: [
    { frame: fr("tia-planner-1", "Accounts imported from planning"), left: 0, top: 18, width: 46 },
    { frame: fr("tia-planner-3", "Add Account with a confirmed date-of-death balance"), left: 38, top: 0, width: 44 },
  ],
  notes: [
    { on: 0, fx: 0.41, fy: 0.323, text: "Imported with a status…", zh: "导入时已带状态……" },
    { on: 0, fx: 0.36, fy: 0.42, text: "…and the actions still needed.", zh: "……以及仍需完成的操作。" },
    { on: 1, fx: 0.5, fy: 0.712, text: "A confirmed balance locks.", zh: "确认后的余额会锁定。" },
    { on: 1, fx: 0.64, fy: 0.796, text: "Changing it takes a re-confirm.", zh: "修改需要再次确认。" },
  ],
};

const LIAB_BOARD: Board = {
  devices: [
    { frame: fr("liab-noplanner-2", "No Planner: Pull Credit Reports with an empty upload step"), left: 0, top: 16, width: 46 },
    { frame: fr("liab-planner-2", "Planner: credit report pre-uploaded from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.87, fy: 0.384, text: "Counts show what’s missing.", zh: "数量提示还缺什么。" },
    { on: 0, fx: 0.6, fy: 0.705, text: "No Planner: an empty upload step.", zh: "No Planner：空白的上传步骤。" },
    { on: 1, fx: 0.34, fy: 0.603, text: "Planner: the report is attached.", zh: "Planner：报告已附上。" },
    { on: 1, fx: 0.45, fy: 0.705, text: "Locked unless updated.", zh: "除非更新，否则锁定。" },
  ],
};

const PERSONAL_BOARD: Board = {
  devices: [
    { frame: fr("personal-noplanner-3", "Belongings catalogued with appraisal and distribution status"), left: 0, top: 8, width: 60 },
    { frame: fr("personal-noplanner-2", "Add Jewelry and Watches form"), left: 55, top: 2, width: 24 },
  ],
  notes: [
    { on: 0, fx: 0.47, fy: 0.479, text: "Appraisal status on every item.", zh: "每件物品都有估价状态。" },
    { on: 0, fx: 0.67, fy: 0.705, text: "Distributed items keep their value.", zh: "已分配的物品保留最终价值。" },
    { on: 1, fx: 0.3, fy: 0.645, text: "Recipient captured up front.", zh: "一开始就记录接收人。" },
    { on: 1, fx: 0.3, fy: 0.745, text: "Appraisal needs flagged early.", zh: "提前标出需要估价的物品。" },
  ],
};

const FEATURES: { t: string; zh: string; d: string; dz: string; board: Board; height: number }[] = [
  {
    t: "Two tracks, one flow",
    zh: "一个流程，两条路径",
    d: "Planner estates arrive pre-filled; No Planner estates start from zero.",
    dz: "Planner 的遗产信息已预先填好；No Planner 的遗产从零开始。",
    board: DUAL,
    height: 72,
  },
  {
    t: "Balances that lock",
    zh: "确认即锁定的余额",
    d: "A confirmed date-of-death balance locks until it is deliberately edited.",
    dz: "去世当日的余额一经确认即锁定，除非主动修改。",
    board: TIA_BOARD,
    height: 60,
  },
  {
    t: "Debts carried over",
    zh: "自动带入的债务",
    d: "Credit reports from planning are already attached; missing documents are counted.",
    dz: "规划阶段的信用报告已经附上，缺少的文件会被计数提示。",
    board: LIAB_BOARD,
    height: 52,
  },
  {
    t: "Every belonging, tracked",
    zh: "每件物品都有记录",
    d: "Value, recipient, appraisal and distribution status on each item.",
    dz: "每件物品都记录价值、接收人、估价和分配状态。",
    board: PERSONAL_BOARD,
    height: 54,
  },
];

const CHALLENGES = [
  ["Executors don’t know what’s in the estate.", "遗产执行人不清楚遗产里有什么。"],
  ["Executors don’t know what to do first.", "遗产执行人不知道先做什么。"],
  ["A wrong move can carry personal liability.", "一步出错，可能要承担个人责任。"],
];

const MORE = selectedWork.filter((w) => w.label !== "End of an Era" && w.label !== "NIO");
const isExternal = (href: string) => /^https?:\/\//.test(href);

/* ---------- building blocks ---------- */

function InfoCard({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-[10px] border border-white/10 bg-white/[0.03] p-6">
      <p className="font-gilroy text-[15px] font-medium uppercase text-white md:text-[17px]">{label}</p>
      <div className="font-gilroy mt-4 flex flex-col gap-1.5 text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]">{children}</div>
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

/** One state of a step: its screens in an aligned, horizontally scrolling strip. */
function StateGroup({ state, screens }: { state: "Planner Estate" | "No Planner Estate"; screens: Screen[] }) {
  const framed = screens.filter((x) => x.frame.win);
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <StateTag state={state} />
        <span className="font-gilroy text-[13px] text-neutral-500">
          <L en={`${screens.length} ${screens.length === 1 ? "screen" : "screens"}`} zh={`${screens.length} 个界面`} />
        </span>
      </div>
      <DeviceStrip items={framed} />
    </div>
  );
}

/** Small label + title on the left, one line on the right. */
function Head({ eyebrow, title, children }: { eyebrow: ReactNode; title: ReactNode; children: ReactNode }) {
  return (
    <Reveal className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
      <div>
        <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{eyebrow}</span>
        <h3 className="font-gilroy mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] text-white">{title}</h3>
      </div>
      <P>{children}</P>
    </Reveal>
  );
}

/** A product step: number, name and one line, then its Planner / No Planner screens. */
function Step({ n, name, intro, planner, noPlanner }: { n: number; name: ReactNode; intro: ReactNode; planner?: Screen[]; noPlanner?: Screen[] }) {
  return (
    <div className="border-t border-white/[0.08] pt-12 md:pt-16">
      <Head eyebrow={<L en={`Step ${n}`} zh={`第 ${n} 步`} />} title={name}>
        {intro}
      </Head>
      <div className="mt-12 flex flex-col gap-16 md:mt-16">
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

/* ---------- page ---------- */

export default function EndOfAnEra() {
  const hero = FRAMES["liab-planner-9"];
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      <div className="case-sheet eoe-sheet relative z-10 bg-[#0b0b0b] text-white" style={{ "--accent": "#161616", "--accent-green": ACCENT } as React.CSSProperties}>
        {/* Soft teal, mint and white blurs behind the content (light mode; like the Vegan Kitchen page's warm glow) */}
        <div aria-hidden className="eoe-blobs pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {BLOBS.map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full blur-[110px] md:blur-[140px]"
              style={{ top: b.top, left: b.left, width: b.size, height: b.size, background: b.color }}
            />
          ))}
        </div>
        {/* HERO (after keithren.com/space-mpaa): title, one line, tags, a front-on laptop fading out */}
        <section className="pt-36 md:pt-44">
          <Container>
            <div className="mb-12 text-center">
              <BackLink href="/#work" className="font-gilroy inline-flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-white">
                <span>←</span>
                <L en="Back to Featured Work" zh="返回精选作品" />
              </BackLink>
            </div>
            <Reveal className="flex flex-col items-center text-center">
              <h1 className="font-gilroy text-[clamp(44px,4vw,56px)] font-medium leading-none text-white">End of an Era</h1>
              <p className="font-gilroy mt-5 max-w-[60ch] text-[16px] leading-[1.35] text-neutral-500 md:text-[18px]">
                <L
                  en="A legal-tech platform that guides executors through settling a loved one’s estate, one step at a time."
                  zh="一个法律科技平台，带遗产执行人一步一步处理已故家人的遗产事务。"
                />
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {["UI/UX", "Web App", "Internship"].map((t) => (
                  <span key={t} className="font-gilroy rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13px] text-white">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal className="relative mt-20 md:mt-24">
              <div className="relative mx-auto w-full overflow-hidden [mask-image:linear-gradient(180deg,#000_22%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.15)_80%,transparent_100%)] md:w-[57vw]">
                <Laptop
                  src={`${E}/liab-planner-9.webp`}
                  alt="End of an Era: the Secure & Inventory Assets step with its completed, in-progress and upcoming tasks"
                  w={hero.w}
                  h={hero.h}
                  crop={[hero.win[0], hero.win[1], hero.win[2] - 12, hero.win[3]]}
                  eager
                  light
                />
              </div>
            </Reveal>
          </Container>
        </section>

        <div id="case-body">
          {/* Info cards */}
          <section className="pb-16 pt-12 md:pb-24 md:pt-[72px]">
            <Container>
              <Reveal className="mx-auto grid max-w-[1180px] grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
                <InfoCard label={<L en="Timeline" zh="时间" />}>
                  <p>2026</p>
                  <p>
                    <L en="Internship project" zh="实习项目" />
                  </p>
                </InfoCard>
                <InfoCard label={<L en="My Scope" zh="我的工作" />}>
                  <p>Workflow Design</p>
                  <p>Information Architecture</p>
                  <p>High-Fidelity UI</p>
                </InfoCard>
                <InfoCard label={<L en="Platform" zh="平台" />}>
                  <p>
                    <L en="Web app" zh="Web 应用" />
                  </p>
                </InfoCard>
                <InfoCard label={<L en="Role" zh="角色" />}>
                  <p>
                    <L en="Design Intern" zh="设计实习生" />
                  </p>
                </InfoCard>
              </Reveal>
              <Reveal className="mt-10 flex justify-center">
                <InteractiveHoverLink
                  href={FIGMA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  text={<L en="View the full flow in Figma" zh="在 Figma 中查看完整流程" />}
                  className="font-gilroy text-[15px] font-medium"
                />
              </Reveal>
            </Container>
          </section>

          {/* 01 — KEY FEATURES: the list, then each one on its annotated board */}
          <WideSection id="features" index="01" label="Key Features" title={<L en="Four things the flow does for an executor." zh="这套流程为遗产执行人做的四件事。" />}>
            <Reveal>
              <Cards
                columns={4}
                items={FEATURES.map((f, i) => ({ index: String(i + 1).padStart(2, "0"), title: <L en={f.t} zh={f.zh} />, body: null }))}
              />
            </Reveal>
            {FEATURES.map((f, i) => (
              <div key={f.t} className="border-t border-white/[0.08] pt-12 md:pt-16">
                <Head
                  eyebrow={<L en={`Key feature ${String(i + 1).padStart(2, "0")}`} zh={`核心功能 ${String(i + 1).padStart(2, "0")}`} />}
                  title={<L en={f.t} zh={f.zh} />}
                >
                  <L en={f.d} zh={f.dz} />
                </Head>
                <Reveal className="mt-10 md:mt-14">
                  {i === 0 && (
                    <div className="mb-6 flex flex-wrap gap-3">
                      <StateTag state="No Planner Estate" />
                      <StateTag state="Planner Estate" />
                    </div>
                  )}
                  <Showcase height={f.height} devices={f.board.devices} notes={f.board.notes} />
                </Reveal>
              </div>
            ))}
          </WideSection>

          {/* 02 — EVERY STEP'S SCREENS */}
          <WideSection id="flow" index="02" label="Step by Step" title={<L en="Six steps of Secure & Inventory Assets." zh="Secure & Inventory Assets 的六个步骤。" />}>
            <Step
              n={10}
              name="Find All Real Accounts"
              intro={<L en={<>Eight document tasks. Planner files arrive <Hi>already attached</Hi>.</>} zh={<>八项文件任务。Planner 的文件<Hi>已预先附上</Hi>。</>} />}
              planner={FIND_PLANNER}
              noPlanner={FIND_NOPLANNER}
            />
            <Step
              n={11}
              name="Track Important Accounts"
              intro={<L en={<>Accounts and income. Confirmed balances <Hi>stay locked</Hi>.</>} zh={<>账户与收入。已确认的余额<Hi>保持锁定</Hi>。</>} />}
              planner={TIA_PLANNER}
              noPlanner={TIA_NOPLANNER}
            />
            <Step
              n={12}
              name="Identify Liabilities & Creditors"
              intro={
                <L
                  en={<>Planner debts <Hi>import automatically</Hi>; No Planner builds them from a template.</>}
                  zh={<>Planner 的债务<Hi>自动导入</Hi>；No Planner 从模板开始建立。</>}
                />
              }
              planner={LIAB_PLANNER}
              noPlanner={LIAB_NOPLANNER}
            />
            <Step
              n={13}
              name="Inventory Real Estate & Vehicles"
              intro={<L en={<>Properties and vehicles, <Hi>tagged with settlement status</Hi>.</>} zh={<>房产和车辆，<Hi>标注处理状态</Hi>。</>} />}
              planner={RE_PLANNER}
              noPlanner={RE_NOPLANNER}
            />
            <Step
              n={14}
              name="Personal & Digital Property"
              intro={<L en={<>Belongings with value, recipient and <Hi>appraisal status</Hi>.</>} zh={<>个人物品，记录价值、接收人和<Hi>估价状态</Hi>。</>} />}
              noPlanner={PERSONAL_NOPLANNER}
            />
            <Step
              n={15}
              name="Business Interests & Appraisals"
              intro={<L en={<>Appraisals tracked to <Hi>date-of-death values</Hi>.</>} zh={<>追踪每项估价，直到<Hi>去世当日价值</Hi>确认。</>} />}
              noPlanner={BUSINESS_NOPLANNER}
            />
          </WideSection>

          {/* 03 — BACKGROUND + DOMAIN MAP */}
          <WideSection id="background" index="03" label="Background" title={<L en="A legal process, handed to people with no training for it." zh="一套法律流程，落在毫无经验的人身上。" />}>
            <Reveal>
              <P>
                <L
                  en={<>Executors must inventory assets, settle debts and file taxes, often <Hi>within legal deadlines</Hi> and for the first time.</>}
                  zh={<>遗产执行人需要清点资产、清偿债务并报税，往往要<Hi>在法定期限内</Hi>完成，而且是第一次做。</>}
                />
              </P>
            </Reveal>
            <Reveal>
              <Cards columns={3} items={CHALLENGES.map(([en, zh], i) => ({ index: String(i + 1).padStart(2, "0"), title: <L en={en} zh={zh} />, body: null }))} />
            </Reveal>
            <Reveal>
              <span className="font-gilroy mx-auto block max-w-[880px] text-[12px] uppercase tracking-[0.25em] text-neutral-500">
                <L en="Mapping the domain first" zh="先梳理业务领域" />
              </span>
              <figure className="mx-auto mt-5 max-w-[880px]">
                <a href={`${E}/sitemap.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${E}/sitemap.webp`}
                    alt="Early map of the Secure & Inventory step: six asset categories, the legal documents to locate, and the fields each financial account and income source must record or track"
                    width={6695}
                    height={3955}
                    loading="lazy"
                    className="block h-auto w-full rounded-[18px] border border-white/10 bg-white"
                  />
                </a>
                <figcaption className="font-gilroy mt-4 text-[14px] text-neutral-400">
                  <L en="Early map of the Secure & Inventory step. Click to open full size." zh="Secure & Inventory 的早期梳理图。点击查看大图。" />
                </figcaption>
              </figure>
            </Reveal>
          </WideSection>

          {/* 04 — DESIGN SYSTEM */}
          <WideSection id="design-system" index="04" label="Design System" title={<L en="Colors, type and radius." zh="颜色、字体与圆角。" />}>
            <Reveal>
              <EoeDesignSystem />
            </Reveal>
          </WideSection>

          {/* 05 — COMPONENTS */}
          <WideSection id="components" index="05" label="Components" title={<L en="The parts every step is built from." zh="构成每个步骤的组件。" />}>
            {/* Cards and buttons side by side at a modest size (layout reference: a "Components" board with Cards / Buttons columns) */}
            <Reveal className="mx-auto grid max-w-[880px] grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-16">
              {[
                { key: "cards", t: "Cards", zh: "卡片", w: 842, h: 1308, alt: "Category cards (Banking, Digital Wallets, Credit & Debit, Subscriptions, Other, Utilities, Investment) and the document checklist bubble in its four states" },
                { key: "buttons", t: "Buttons", zh: "按钮", w: 974, h: 1334, alt: "Buttons in their states: Next, Begin, Start, Edit Balance, Review/Edit, Resume, step tags, arrows, checkboxes, radio buttons, Continue to Dashboard, Done and Skip" },
              ].map((c) => (
                <figure key={c.key}>
                  <figcaption className="font-gilroy mb-5 text-[22px] text-white md:text-[26px]">
                    <L en={c.t} zh={c.zh} />
                  </figcaption>
                  <a href={`${E}/components-${c.key}.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${E}/components-${c.key}.webp`} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="block h-auto w-full max-w-[380px]" />
                  </a>
                </figure>
              ))}
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
              <h2 className="font-gilroy text-center text-[clamp(32px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em] text-white">Curious to see more?</h2>
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
                    <h3 className="font-gilroy mt-1 text-[clamp(22px,2.6vw,32px)] font-medium leading-tight text-white transition-colors group-hover:text-neutral-400">
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

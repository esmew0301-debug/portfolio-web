import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { DeviceStrip, Showcase, type Frame, type Placed, type Callout } from "@/components/case/device";
import { FRAMES } from "./frames";
import { Box, Cards, Chip, Container, P, Pull, Section, Stack, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { TactileHighlight as H } from "@/components/ui/tactile-highlight";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person, selectedWork } from "@/lib/content";
import { L, LB } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `End of an Era — ${person.name}`,
  description: "Core workflow design for a legal-tech estate-settlement platform.",
};

// Full flow, every variant and edge case, lives in Figma.
const FIGMA_LINK = figma.endOfAnEra;

const NAV: CaseNavItem[] = [
  { id: "background", index: "01", label: "Project Background" },
  { id: "challenge", index: "02", label: "The Design Challenge" },
  { id: "insights", index: "03", label: "Executor Challenges" },
  { id: "phase-1", index: "04", label: "Phase 01: Estate Record" },
  { id: "phase-2", index: "05", label: "Phase 02: Debt & Tax" },
  { id: "outcomes", index: "06", label: "Outcomes" },
  { id: "reflection", index: "07", label: "Reflection" },
];

const SCOPE = ["Workflow Design", "Information Architecture", "User Flows", "Interaction Design", "High-Fidelity UI"];

// Screens extracted from the Figma frame PDFs (reference/end-of-an-era/pdfs), one set per category.
const E = "/images/eoe";
type Raw = [w: number, h: number, label: string, zh?: string];
type Screen = { frame: Frame; label: string; zh?: string };
const fr = (name: keyof typeof FRAMES, alt: string): Frame => {
  const f = FRAMES[name];
  return { src: `${E}/${name}.webp`, w: f.w, h: f.h, win: f.win ? [...f.win] : null, alt };
};
const set = (prefix: string, items: Raw[], order?: number[]): Screen[] =>
  (order ?? items.map((_, i) => i + 1)).map((n) => {
    const [, , label, zh] = items[n - 1];
    return { frame: fr(`${prefix}-${n}` as keyof typeof FRAMES, label), label, zh };
  });

const FIND_PLANNER = set("find-planner", [
  [1800, 2200, "Checklist with planning-phase files already attached", "任务清单，规划阶段的文件已附上"],
  [1800, 1395, "The will, pre-uploaded during planning", "遗嘱已在规划阶段预先上传"],
  [1800, 1323, "Adding a newer version alongside it", "在旁边补充一份更新的版本"],
  [1800, 1614, "Pre-uploaded and newly added files, side by side", "预先上传的文件与新添加的文件并列显示"],
]);
const FIND_NOPLANNER = set("find-noplanner", [
  [1800, 2200, "Checklist: 0 of 8 tasks, nothing on file", "任务清单：8 项完成 0 项，尚无任何文件"],
  [1800, 1323, "Find the Will & Codicils, an empty upload step", "Find the Will & Codicils：尚未上传文件"],
  [1800, 1323, "File selected, ready to confirm", "已选好文件，等待确认"],
  [1800, 1371, "Uploaded and marked complete", "上传完成并标记为已完成"],
  [1800, 1474, "On to the next step: living trust documents", "进入下一步：生前信托文件"],
]);
const TIA_PLANNER = set("tia-planner", [
  [1800, 1323, "Accounts imported from planning", "从规划阶段导入的账户"],
  [1800, 2249, "Add Account with details pre-filled and a balance to confirm", "Add Account：信息已预填，余额待确认"],
  [1800, 2276, "Balance confirmed and locked", "余额已确认并锁定"],
  [1800, 2276, "Editing a confirmed balance", "修改已确认的余额"],
  [1800, 2276, "Re-confirming the change", "再次确认修改"],
  [1800, 2276, "Updated balance confirmed", "更新后的余额已确认"],
  [1800, 1323, "Income sources imported from planning", "从规划阶段导入的收入来源"],
  [1227, 2396, "The full Add Income form", "完整的 Add Income 表单"],
  [1800, 1323, "Income sources, ready to track", "收入来源，可开始追踪"],
]);
const TIA_NOPLANNER = set("tia-noplanner", [
  [1800, 1229, "No accounts or income sources yet", "还没有任何账户或收入来源"],
  [1800, 2070, "Add Account", "Add Account（添加账户）"],
  [1637, 2395, "Choosing the account type", "选择账户类型"],
  [1800, 1351, "First account added; income still empty", "已添加第一个账户，收入来源仍为空"],
  [1793, 2395, "Add Income", "Add Income（添加收入）"],
  [1217, 2396, "Income source options", "收入来源选项"],
  [1800, 1323, "Income sources recorded", "收入来源已记录"],
]);
const RE_PLANNER = set("realestate-planner", [[1800, 1323, "Properties and vehicles imported from planning, with status tags", "从规划阶段导入的房产和车辆，附带状态标签"]]);
const RE_NOPLANNER = set("realestate-noplanner", [
  [1800, 1323, "Empty: no properties or vehicles yet", "空状态：还没有房产或车辆"],
  [1736, 2394, "Add Primary Residence", "Add Primary Residence（添加主要住所）"],
  [1800, 1323, "First property recorded", "已记录第一处房产"],
  [1715, 2394, "Add Vehicle", "Add Vehicle（添加车辆）"],
  [1800, 1323, "Property and vehicle recorded", "房产和车辆均已记录"],
]);
const PERSONAL_NOPLANNER = set("personal-noplanner", [
  [1800, 1347, "Empty: belongings and digital assets", "空状态：个人物品与数字资产"],
  [1400, 2374, "Add Jewelry and Watches", "Add Jewelry and Watches（添加珠宝和手表）"],
  [1800, 1323, "Belongings catalogued, with appraisal and distribution status", "物品已登记，并标注估价和分配状态"],
]);
const BUSINESS_NOPLANNER = set("business-noplanner", [
  [1130, 1052, "Business Interests & Appraisals as step 15 of Secure & Inventory Assets", "Business Interests & Appraisals 是 Secure & Inventory Assets 的第 15 步"],
  [1662, 2400, "Appraisal tracking: confirmed value, valuations, and reports", "估价追踪：已确认价值、估值记录和评估报告"],
]);
const LIAB_PLANNER = set(
  "liab-planner",
  [
    [1800, 2318, "Debts overview, with planning-phase files attached", "债务总览，已附上规划阶段的文件"],
    [1800, 1417, "Credit report pre-uploaded from planning (Equifax)", "规划阶段预先上传的信用报告（Equifax）"],
    [1800, 1323, "Adding a second report (Experian)", "添加第二份报告（Experian）"],
    [1623, 2322, "The Find Mortgage & Property Loans form", "Find Mortgage & Property Loans 表单"],
    [1800, 1528, "Properties and loans listed", "房产及相关贷款列表"],
    [1450, 2319, "The Identify Vehicle Loans form", "Identify Vehicle Loans 表单"],
    [1800, 1718, "Vehicles and loans listed", "车辆及相关贷款列表"],
    [1731, 1248, "Medical bills recorded, with status", "已记录的医疗账单，附带状态"],
    [1800, 1414, "Back in Secure & Inventory Assets, with liabilities in progress", "回到 Secure & Inventory Assets，债务步骤进行中"],
  ],
);
const LIAB_NOPLANNER = set(
  "liab-noplanner",
  [
    [1800, 2318, "Debts overview: 0 of 8 tasks", "债务总览：8 项完成 0 项"],
    [1800, 1328, "Pull Credit Reports, with nothing uploaded yet", "Pull Credit Reports：尚未上传任何文件"],
    [1800, 1323, "Report selected, ready to confirm", "已选好报告，等待确认"],
    [1800, 1417, "Report uploaded", "报告已上传"],
    [1800, 1528, "Properties and loans listed", "房产及相关贷款列表"],
    [1623, 2322, "The Find Mortgage & Property Loans form", "Find Mortgage & Property Loans 表单"],
    [1450, 2319, "The Identify Vehicle Loans form", "Identify Vehicle Loans 表单"],
    [1800, 1718, "Vehicles and loans listed", "车辆及相关贷款列表"],
    [1800, 1298, "Medical bills recorded, with status", "已记录的医疗账单，附带状态"],
    [1800, 1323, "Back in Secure & Inventory Assets, with liabilities in progress", "回到 Secure & Inventory Assets，债务步骤进行中"],
  ],
  [1, 2, 3, 4, 6, 5, 7, 8, 9, 10],
);

// Annotated boards: two cards stacked; devices placed in a 100-wide coordinate space, callouts point at
// window fractions. Each back card's poking-out parts stay clear of the front card's frame.
const DUAL: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("find-noplanner-1", "No Planner estate: Find All Real Accounts checklist, 0 of 8 tasks"), left: 0, top: 15, width: 46 },
    { frame: fr("realestate-planner-1", "Planner estate: properties and vehicles imported from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.37, fy: 0.345, text: "No Planner: starts at 0 of 8, built from scratch.", zh: "No Planner：从 8 项完成 0 项开始，一切从零建立。" },
    { on: 0, fx: 0.93, fy: 0.47, text: "Every task opens Incomplete, with one next action.", zh: "每项任务初始都是 Incomplete，并只给出一个下一步操作。" },
    { on: 1, fx: 0.5, fy: 0.348, text: "Planner: records arrive with status already tagged.", zh: "Planner：导入的记录已带有状态标签。" },
    { on: 1, fx: 0.86, fy: 0.36, text: "The executor confirms or updates without re-entering.", zh: "遗产执行人只需确认或更新，无需重新录入。" },
    { on: 1, fx: 0.32, fy: 0.83, text: "Supporting documents carry over too.", zh: "相关的证明文件也会一并带入。" },
  ],
};

const TIA_BOARD: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("tia-planner-1", "Accounts imported from planning"), left: 0, top: 18, width: 46 },
    { frame: fr("tia-planner-3", "Add Account with a confirmed date-of-death balance"), left: 38, top: 0, width: 44 },
  ],
  notes: [
    { on: 0, fx: 0.41, fy: 0.335, text: "Imported accounts arrive with a status…", zh: "导入的账户会带有状态……" },
    { on: 0, fx: 0.36, fy: 0.43, text: "…and the exact actions still needed.", zh: "……以及仍需完成的具体操作。" },
    { on: 1, fx: 0.5, fy: 0.705, text: "A confirmed balance locks, shown in green.", zh: "确认后的余额会被锁定，并以绿色显示。" },
    { on: 1, fx: 0.64, fy: 0.8, text: "Changing it takes a deliberate edit and re-confirm.", zh: "要修改它，必须主动编辑并再次确认。" },
  ],
};

const PERSONAL_BOARD: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("personal-noplanner-3", "Belongings catalogued with appraisal and distribution status"), left: 0, top: 8, width: 60 },
    { frame: fr("personal-noplanner-2", "Add Jewelry and Watches form"), left: 55, top: 2, width: 24 },
  ],
  notes: [
    { on: 0, fx: 0.47, fy: 0.488, text: "Appraisal status sits on every item.", zh: "每件物品都标注了估价状态。" },
    { on: 0, fx: 0.67, fy: 0.71, text: "Distributed items keep their final value.", zh: "已分配的物品会保留最终价值。" },
    { on: 1, fx: 0.3, fy: 0.645, text: "Intended recipient captured up front.", zh: "一开始就记录预定的接收人。" },
    { on: 1, fx: 0.3, fy: 0.745, text: "Appraisal needs flagged before distribution.", zh: "在分配之前标出需要估价的物品。" },
  ],
};

const LIAB_BOARD: { devices: Placed[]; notes: Callout[] } = {
  devices: [
    { frame: fr("liab-noplanner-2", "No Planner: Pull Credit Reports with an empty upload step"), left: 0, top: 16, width: 46 },
    { frame: fr("liab-planner-2", "Planner: credit report pre-uploaded from planning"), left: 36, top: 0, width: 46 },
  ],
  notes: [
    { on: 0, fx: 0.87, fy: 0.395, text: "Document counts show what is still missing.", zh: "文件数量会提示还缺哪些材料。" },
    { on: 0, fx: 0.6, fy: 0.71, text: "No Planner: start from an empty upload step.", zh: "No Planner：从空白的上传步骤开始。" },
    { on: 1, fx: 0.34, fy: 0.61, text: "Planner: the Equifax report is already attached.", zh: "Planner：Equifax 报告已经附上。" },
    { on: 1, fx: 0.45, fy: 0.71, text: "Locked unless the executor updates it.", zh: "除非遗产执行人主动更新，否则保持锁定。" },
  ],
};

const IA = [
  { t: "Legal Documents", d: "Will, trust, and other estate documents", zh: "遗嘱、信托及其他遗产相关文件" },
  { t: "Financial Accounts", d: "Bank, investment, insurance, income", zh: "银行、投资、保险与收入" },
  { t: "Debts & Liabilities", d: "Mortgage, loans, credit cards, taxes", zh: "房贷、贷款、信用卡与税务" },
  { t: "Property & Vehicles", d: "Real estate, vehicles, ownership records", zh: "房产、车辆与所有权记录" },
  { t: "Personal & Digital Property", d: "Jewelry, art, online accounts, crypto", zh: "珠宝、艺术品、网络账户与加密货币" },
  { t: "Business Interests & Appraisals", d: "Ownership, valuation, appraisals", zh: "所有权、估值与资产评估" },
];

const OUTCOMES = [
  ["Turned 20+ high-level business steps and the dependencies between them into one navigable product flow", "将 20 多个高层级业务步骤及其依赖关系，整合为一条清晰可循的产品流程"],
  ["Designed a unified information architecture across six asset categories", "为六大资产类别设计了统一的信息架构"],
  ["Designed a dual-track user flow (Planner vs. No Planner) from a single set of requirements", "从同一套需求中拆分出双轨用户流程（Planner 与 No Planner）"],
  ["Designed the logic connecting pre-loaded and manually entered records", "设计了预先导入的记录与手动录入的记录之间的衔接逻辑"],
  ["Delivered high-fidelity designs ready for handoff", "交付了可直接用于开发交接的高保真设计稿"],
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

/** One state of a category: its screens in an aligned, horizontally scrolling strip. */
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

/** A product step from the PDFs: sticky name and intro beside it, then its Planner / No Planner screens. */
function Category({
  name,
  intro,
  planner,
  noPlanner,
  note,
  showcase,
}: {
  name: ReactNode;
  intro: ReactNode;
  planner?: Screen[];
  noPlanner?: Screen[];
  note?: ReactNode;
  showcase?: ReactNode;
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
      {showcase && <Reveal className="mt-12 md:mt-16">{showcase}</Reveal>}
      <div className="mt-14 flex flex-col gap-16 md:mt-20">
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

export default function EndOfAnEra() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-[#0d2a2c]">
        <Image
          src={`${E}/cover.jpg`}
          alt="End of an Era on an iPad: the Secure & Inventory Assets step of the estate-settlement workflow"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
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
                    <L
                      en="This case study shows key screens. The complete flow, including every variant and edge case, is in Figma."
                      zh="本案例展示关键界面；包含所有变体与边界情况的完整流程，请在 Figma 中查看。"
                    />
                  </p>
                  <InteractiveHoverLink
                    href={FIGMA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    text={<L en="View full details in Figma" zh="在 Figma 中查看完整细节" />}
                    className="font-gilroy mt-6 text-[15px] font-medium"
                  />
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
                  <L
                    en="Core workflow design for a legal-tech estate-settlement platform (internship project)"
                    zh="为一个法律科技类遗产处理平台设计核心业务流程（实习项目）"
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
                      en={<>End of an Era helps executors settle a deceased family member&apos;s estate. I designed its core workflow,
                    turning dense legal procedure into a structured workflow with visible requirements and clear next actions.</>}
                      zh="End of an Era 帮助遗产执行人处理已故家人的遗产事务。我负责设计平台的核心业务流程，将繁复的法律程序转化为结构清晰的操作步骤，让每一步的要求和下一步操作一目了然。"
                    />
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Designer">Sihan Wang</Meta>
                <Meta label="Date">05/15/2026</Meta>
                <Meta label="Type"><L en="Internship project" zh="实习项目" /></Meta>
                <Meta label="Platform"><L en="Web app" zh="Web 应用" /></Meta>
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

          {/* Supplementary: the early map of the settlement domain */}
          <section className="pb-16 md:pb-24">
            <Container>
              <Reveal>
                <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Before designing</span>
                <h3 className="font-blinker mt-3 max-w-[26ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
                  <L en="Mapping the domain first." zh="先把业务领域梳理清楚。" />
                </h3>
                <div className="mt-5 max-w-[62ch]">
                  <P>
                    <L
                      en={<>Estate settlement was new to me, so before designing anything I mapped how the Secure &amp; Inventory step
                    breaks down: its six asset categories, the documents to locate, and what each account or income source
                    has to record or track.</>}
                      zh="遗产处理对我来说是一个全新的领域，所以在开始设计之前，我先梳理了 Secure & Inventory 这一环节的构成：包含哪六大资产类别、需要找齐哪些文件，以及每类账户和收入来源需要记录或追踪哪些信息。"
                    />
                  </P>
                </div>
              </Reveal>
              <Reveal className="mt-10">
                <figure>
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
                    <L
                      en={<>Early working map of the Secure &amp; Inventory step. Click to open full size.</>}
                      zh="Secure & Inventory 这一步的早期梳理图。点击可查看大图。"
                    />
                  </figcaption>
                </figure>
              </Reveal>
            </Container>
          </section>

          {/* 01 — BACKGROUND */}
          <Section id="background" index="01" label="Project Background" title={<L en="A high-stakes process, handed to people with no training for it." zh="一个责任重大的流程，却落在毫无相关经验的人身上。" />}>
            <P>
              <L
                en={<>When a family member dies, the executor must inventory assets, settle debts, file taxes, and distribute property,
              often <H>within legally mandated timelines</H>.</>}
                zh={<>家人去世后，遗产执行人需要清点资产、清偿债务、报税并分配财产，而且往往<H>必须在法律规定的期限内完成</H>。</>}
              />
            </P>
            <P>
              <L
                en={<>Most executors have <H>no legal or financial background</H>. They do it for the first time, usually while grieving,
              with scattered information and no clear sequence.</>}
                zh={<>大多数遗产执行人<H>没有法律或财务背景</H>。他们通常是第一次处理这类事务，往往还沉浸在悲伤中，手里的信息零散，也不清楚该按什么顺序进行。</>}
              />
            </P>
            <P>
              <L
                en={<>As a design intern, my job was to turn that legal logic into steps executors can{" "}
              <H>act on and keep track of</H>.</>}
                zh={<>作为设计实习生，我的任务是把这些法律逻辑转化为遗产执行人<H>可以逐步操作、并随时跟进进度</H>的步骤。</>}
              />
            </P>
          </Section>

          {/* 02 — CHALLENGE */}
          <Section id="challenge" index="02" label="The Design Challenge" title={<L en="Twenty steps of legal text, and no product structure." zh="20 多个业务步骤，尚未形成清晰的产品流程。" />}>
            <P>
              <L
                en={<>I started from <H>20+ high-level business steps</H>, each with its own nested tasks, written as unstructured text in
              the legal requirements.</>}
                zh={<>最初的法律需求文档包含 <H>20 多个高层级业务步骤</H>，每个步骤下还有多项具体任务，但都以纯文字写成，缺乏清晰的组织结构。</>}
              />
            </P>
            <Pull label="The real task">
              <LB
                en={
                  <>
                    <p>Before any screens, reorganize a dense legal process into structured steps, with requirements and task dependencies made visible.</p>
                    <p>That meant deciding what to surface, what to defer, and in what order.</p>
                  </>
                }
                zh={
                  <>
                    <p>在设计界面之前，先将繁复的法律流程重组为结构化的步骤，使各项要求与任务之间的依赖关系清晰可见。</p>
                    <p>这需要决定哪些内容优先呈现、哪些可以延后，以及各自的先后顺序。</p>
                  </>
                }
              />
            </Pull>
          </Section>

          {/* 03 — INSIGHTS */}
          <WideSection id="insights" index="03" label="Executor Challenges" title={<L en="Three challenges the process puts on executors." zh="这一流程给遗产执行人带来的三大难题。" />}>
            <Reveal>
              <Cards
                columns={3}
                items={[
                  {
                    index: "01",
                    title: <L en="Executors don’t know what’s actually in the estate." zh="遗产执行人不清楚遗产里到底有什么。" />,
                    body: (
                      <p>
                        <L
                          en="Accounts, property, insurance, digital assets, and debts are scattered across unrelated institutions and paper files."
                          zh="账户、房产、保险、数字资产和债务分散在互不相关的机构和纸质文件里。"
                        />
                      </p>
                    ),
                  },
                  {
                    index: "02",
                    title: <L en="Executors don’t know what to prioritize." zh="遗产执行人不知道该先做什么。" />,
                    body: (
                      <p>
                        <L
                          en="Settlement runs several threads at once (documents, assets, debts, taxes, distribution) with no clear sequence between them."
                          zh="遗产处理需要同时推进多条事务线（文件、资产、债务、税务、分配），彼此之间却没有清晰的先后顺序。"
                        />
                      </p>
                    ),
                  },
                  {
                    index: "03",
                    title: <L en="A wrong move can carry personal liability." zh="一步出错，可能要承担个人责任。" />,
                    body: (
                      <p>
                        <L
                          en="Paying debts out of order, missing a tax filing, or overlooking a creditor can leave the executor personally liable."
                          zh="清偿债务的顺序出错、漏报税，或遗漏某位债权人，都可能让遗产执行人承担个人责任。"
                        />
                      </p>
                    ),
                  },
                ]}
              />
            </Reveal>
          </WideSection>

          {/* 04 — PHASE 01 */}
          <WideSection id="phase-1" index="04" label="Phase 01" title={<L en="Building a complete estate record." zh="建立一份完整的遗产记录。" />}>
            <Stack>
              <div className="grid gap-4 md:grid-cols-2">
                <Box label="Business goal">
                  <L en="A complete, trustworthy estate database every later step can rely on." zh="建立完整、可靠的遗产信息记录，为后续处理流程提供统一的数据基础。" />
                </Box>
                <Box label="User value">
                  <L
                    en={<>Executors who don&apos;t know what&apos;s in the estate get one place to record every asset, track progress, and see
                  what&apos;s still missing.</>}
                    zh="对于不清楚遗产构成的遗产执行人，这里提供了一个集中的位置：记录所有资产、跟进进度，并查看仍缺少哪些信息。"
                  />
                </Box>
              </div>
            </Stack>

            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
                <div>
                  <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">Information architecture</span>
                  <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
                    <L en="Six sprawling categories, one coherent structure." zh="将六大资产类别整合为统一的信息架构。" />
                  </h3>
                </div>
                <P>
                  <L
                    en={<>Six categories of 10–15 text-only sub-steps each became <H>one information architecture</H>. Each category
                  includes a task checklist and progress count. Individual tasks highlight the next action, helping executors see
                  what needs their attention.</>}
                    zh={<>原本六个类别、每类 10 到 15 个纯文字子步骤，我将它们整合为<H>一套统一的信息架构</H>。每个类别都配有任务清单和进度计数；每项任务突出显示下一步操作，帮助遗产执行人明确哪些事项需要处理。</>}
                  />
                </P>
              </Reveal>
              <Reveal className="mt-10 md:mt-14">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-10">
                  <div className="mx-auto w-fit rounded-full border border-white/15 px-5 py-2">
                    <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-white">Estate Record</span>
                  </div>
                  <div className="mx-auto h-6 w-px bg-white/15" aria-hidden />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {IA.map((c, i) => (
                      <div key={c.t} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
                        <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-blinker mt-1.5 text-[18px] font-medium leading-tight text-white md:text-[20px]">{c.t}</h4>
                        <p className="font-gilroy mt-2 text-[14px] leading-[1.55] text-neutral-400"><L en={c.d} zh={c.zh} /></p>
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
                    <L en="A dual-track flow." zh="双轨流程。" />
                  </h3>
                </div>
                <P>
                  <L
                    en={<>The requirements hid two scenarios in one flow. With prior estate planning (Planner), existing documents and
                  records carry into settlement. Without it (No Planner), the executor enters information and uploads documents
                  from scratch. So I split the design into <H>two parallel tracks</H>.</>}
                    zh={<>需求文档把两种情况藏在了同一个流程里。如果逝者生前做过遗产规划（Planner），已有的文件和记录可以直接带入遗产处理；如果没有（No Planner），遗产执行人就需要从零开始填写信息、上传文件。因此，我将其设计为<H>两条并行的用户流程</H>。</>}
                  />
                </P>
              </Reveal>
              <Reveal className="mt-10 md:mt-14">
                <div className="mb-6 flex flex-wrap gap-3">
                  <StateTag state="No Planner Estate" />
                  <StateTag state="Planner Estate" />
                </div>
                <Showcase height={72} devices={DUAL.devices} notes={DUAL.notes} />
              </Reveal>
            </div>

            <Category
              name="Find All Real Accounts"
              intro={
                <>
                  <L
                    en={<>Eight document tasks: will, trusts, power of attorney, deeds. Planner documents arrive{" "}
                  <H>already attached</H>; otherwise each is uploaded step by step.</>}
                    zh={<>八项文件任务：遗嘱、信托、授权委托书、产权契据等。在 Planner 情况下，文件会<H>预先附上</H>；否则需要逐项上传。</>}
                  />
                </>
              }
              planner={FIND_PLANNER}
              noPlanner={FIND_NOPLANNER}
            />
            <Category
              name="Track Important Accounts"
              intro={
                <>
                  <L
                    en={<>Accounts and income. A confirmed balance{" "}
                  <H>stays locked</H> until deliberately edited.</>}
                    zh={<>账户与收入。已确认的余额会<H>保持锁定</H>，除非主动编辑修改。</>}
                  />
                </>
              }
              planner={TIA_PLANNER}
              noPlanner={TIA_NOPLANNER}
              showcase={<Showcase height={60} devices={TIA_BOARD.devices} notes={TIA_BOARD.notes} />}
            />
            <Category
              name="Inventory Real Estate & Vehicles"
              intro={
                <>
                  <L
                    en={<>Properties and vehicles, each <H>tagged with settlement status</H>.</>}
                    zh={<>房产和车辆，每一项都<H>标注了处理状态</H>。</>}
                  />
                </>
              }
              planner={RE_PLANNER}
              noPlanner={RE_NOPLANNER}
            />
            <Category
              name="Personal & Digital Property"
              intro={
                <>
                  <L
                    en={<>Belongings and digital assets, with value, recipient, and <H>appraisal and distribution status</H>.</>}
                    zh={<>个人物品和数字资产，记录价值、接收人，以及<H>估价和分配状态</H>。</>}
                  />
                </>
              }
              noPlanner={PERSONAL_NOPLANNER}
              showcase={<Showcase height={54} devices={PERSONAL_BOARD.devices} notes={PERSONAL_BOARD.notes} />}
              note={<L en="Only No Planner screens were exported for this step; the Planner variant is in Figma." zh="这一步只导出了 No Planner 的界面，Planner 版本在 Figma 中。" />}
            />
            <Category
              name="Business Interests & Appraisals"
              intro={
                <>
                  <L
                    en={<>Which assets need valuation, each appraisal&apos;s status, and the <H>date-of-death values</H> behind the total.</>}
                    zh={<>记录哪些资产需要估价、每项估价的进展，以及计入总额的<H>去世当日资产价值</H>。</>}
                  />
                </>
              }
              noPlanner={BUSINESS_NOPLANNER}
              note={<L en="Only No Planner screens were exported for this step; the Planner variant is in Figma." zh="这一步只导出了 No Planner 的界面，Planner 版本在 Figma 中。" />}
            />
          </WideSection>

          {/* 05 — PHASE 02 */}
          <WideSection id="phase-2" index="05" label="Phase 02" title={<L en="Guiding executors through debts and taxes." zh="引导遗产执行人处理债务和税务。" />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <Box label="Business goal">
                  <L en="Debt settlement and tax filing, within legal boundaries." zh="在法律允许的范围内完成债务清偿和报税。" />
                </Box>
                <P>
                  <L
                    en={<>A wrong payment order or a missed filing can leave the executor <H>personally liable</H>. The flow follows the order
                  set out in the requirements: tasks that depend on earlier steps come after them, and each shows what&apos;s required
                  and what to do next.</>}
                    zh={<>付款顺序出错或漏报税，都可能让遗产执行人<H>承担个人责任</H>。流程严格按照需求文档规定的顺序展开：依赖前序步骤的任务排在后面，每一项都会说明需要什么、下一步该做什么。</>}
                  />
                </P>
              </div>
            </Stack>

            <Category
              name="Identify Liabilities & Creditors"
              intro={
                <>
                  <L
                    en={<>Planner debt records <H>import automatically</H>; a No Planner estate builds them from a template.</>}
                    zh={<>Planner 情况下，债务记录会<H>自动导入</H>；No Planner 情况下，则从模板开始逐项建立。</>}
                  />
                </>
              }
              planner={LIAB_PLANNER}
              noPlanner={LIAB_NOPLANNER}
              showcase={<Showcase height={52} devices={LIAB_BOARD.devices} notes={LIAB_BOARD.notes} />}
            />

            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Reveal className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                <p className="font-gilroy max-w-[60ch] text-[17px] leading-[1.7] text-neutral-400 md:text-[18px]">
                  <L
                    en="The rest of this phase (debt priority, secure payments, and tax filing) is documented in Figma."
                    zh="这一阶段的其余部分（债务优先级、安全付款和报税）都记录在 Figma 中。"
                  />
                </p>
                <InteractiveHoverLink
                  href={FIGMA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  text={<L en="Open in Figma" zh="在 Figma 中打开" />}
                  className="font-gilroy shrink-0 text-[15px] font-medium"
                />
              </Reveal>
            </div>
          </WideSection>

          {/* 06 — OUTCOMES */}
          <Section id="outcomes" index="06" label="Outcomes" title={<L en="My contribution." zh="我的贡献。" />}>
            <ol className="border-t border-white/10">
              {OUTCOMES.map(([o, oz], i) => (
                <li key={o} className="grid grid-cols-[44px_1fr] gap-3 border-b border-white/10 py-5">
                  <span className="font-blinker pt-0.5 text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-gilroy text-[17px] leading-[1.6] text-neutral-300"><L en={o} zh={oz} /></span>
                </li>
              ))}
            </ol>
          </Section>

          {/* 07 — REFLECTION */}
          <Section id="reflection" index="07" label="Reflection" title={<L en="Systems before screens." zh="先有系统，再有界面。" />}>
            <P>
              <L
                en={<>The hardest part was turning <H>dense legal and financial logic</H> into a structured workflow, with each
              task&apos;s requirements and next action visible. The screens came after that structure was in place.</>}
                zh={<>最难的部分，是把<H>繁复的法律和财务逻辑</H>整理成结构清晰的流程，让每项任务的要求和下一步操作都清楚可见。界面设计是在这套结构确定之后才开始的。</>}
              />
            </P>
            <P>
              <L
                en={<>Most of my time went into the information architecture, the two-track flow, and the rules for what carries
              forward from planning. Next, I&apos;d want to <H>test the flow with people who have served as executors</H>.</>}
                zh={<>我的大部分精力投入在信息架构、双轨流程，以及“哪些内容可以从规划阶段带入”的规则设计上。下一步，我希望<H>邀请真正担任过遗产执行人的用户来测试这套流程</H>。</>}
              />
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

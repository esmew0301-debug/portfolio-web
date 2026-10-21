import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Laptop } from "@/components/case/laptop";
import { Container } from "@/components/case/primitives";
import { Reveal } from "@/components/case/reveal";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person } from "@/lib/content";
import { L } from "@/lib/i18n";
import { FRAMES } from "./frames";

export const metadata: Metadata = {
  title: `End of an Era — ${person.name}`,
  description: "Core workflow design for a legal-tech estate-settlement platform.",
};

// Layout and type scale after keithren.com/space-mpaa: dark page with a soft glow at the top, a front-on laptop hero,
// info cards, centred section titles over a bright rule, large grey paragraphs with coloured highlights, key features as
// laptop + text rows, then research, design thinking, a light Design part (style guide + every screen) and next steps.
// Colours are placeholders to be tuned later: ACCENT is the highlight colour on dark, DOT the small markers.
const ACCENT = "#7fd3da";
const DOT = "#0090b4";
const E = "/images/eoe";

type Name = keyof typeof FRAMES;
const frame = (name: Name) => FRAMES[name];

/* ---------- small building blocks ---------- */

const Hi = ({ children }: { children: ReactNode }) => <span style={{ color: ACCENT }}>{children}</span>;
/** Highlight on the light Next Step section. */
const Hi2 = ({ children }: { children: ReactNode }) => <span style={{ color: "#047C88" }}>{children}</span>;

/** A screen on a laptop, cropped to its app window and fading out at the bottom. */
function Screen({ name, alt, eager, fade = true }: { name: Name; alt: string; eager?: boolean; fade?: boolean }) {
  const f = frame(name);
  return (
    <div
      className="relative overflow-hidden"
      style={fade ? { maskImage: "linear-gradient(180deg,#000 55%,transparent 100%)", WebkitMaskImage: "linear-gradient(180deg,#000 55%,transparent 100%)" } : undefined}
    >
      <Laptop src={`${E}/${name}.webp`} alt={alt} w={f.w} h={f.h} crop={f.win ?? undefined} eager={eager} />
    </div>
  );
}

function InfoCard({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-[10px] bg-[#1c1c1c] p-6">
      <p className="font-gilroy text-[15px] font-medium uppercase text-white md:text-[17px]">{label}</p>
      <div className="font-gilroy mt-4 flex flex-col gap-1.5 text-[14px] font-light leading-[1.5] text-white/80 md:text-[15px]">{children}</div>
    </div>
  );
}

/** Centred section title over a bright rule (BACKGROUND, CORE FLOWS, KEY FEATURES). */
function CenterTitle({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="text-center">
      <h2 className={`font-gilroy text-[clamp(24px,2.4vw,34px)] uppercase ${light ? "text-[#252525]" : "text-white/55"}`}>{children}</h2>
      <div
        className={`mx-auto mt-6 h-px max-w-[1150px] bg-gradient-to-r from-transparent to-transparent ${light ? "via-black/25" : "via-white/85"}`}
      />
    </div>
  );
}

/** "• PART 1 / RESEARCH" header with a full-width rule under it. */
function PartTitle({ part, children, light }: { part: string; children: ReactNode; light?: boolean }) {
  return (
    <div className={`border-b pb-6 ${light ? "border-black/10" : "border-white/10"}`}>
      <p className={`font-gilroy flex items-center gap-2 text-[14px] uppercase md:text-[16px] ${light ? "text-black/50" : "text-white/50"}`}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: DOT }} />
        {part}
      </p>
      <h2 className={`font-gilroy mt-2 text-[clamp(24px,2.4vw,34px)] uppercase ${light ? "text-[#252525]" : "text-white"}`}>{children}</h2>
    </div>
  );
}

/** Large centred grey statement with highlighted phrases. */
function Statement({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-gilroy mx-auto max-w-[860px] text-center text-[clamp(22px,2.8vw,40px)] leading-[1.3] ${light ? "text-[#8a8a8a]" : "text-[#adadad]"}`}
    >
      {children}
    </p>
  );
}

/** Title on the left, a short paragraph on the right (Interview, Interview Findings). */
function SplitHead({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-10">
      <h3 className="font-gilroy text-[clamp(24px,2.2vw,32px)] text-white">{title}</h3>
      <p className="font-gilroy text-[16px] leading-[1.35] text-[#adadad] md:text-[18px]">{children}</p>
    </div>
  );
}

/* ---------- content ---------- */

// The six steps of Secure & Inventory Assets, numbered as in the product (steps 10–15).
const STEPS: { n: number; t: string; zh: string; items: [string, string][] }[] = [
  {
    n: 10,
    t: "Find All Real Accounts",
    zh: "查找所有重要文件",
    items: [
      ["Locate the will, trusts and power of attorney", "找到遗嘱、信托和授权委托书"],
      ["Find deeds, titles and vital records", "找到产权契据、所有权文件和身份记录"],
      ["Contact the attorney, check other sources", "联系律师，并查看其他存放地点"],
    ],
  },
  {
    n: 11,
    t: "Track Important Accounts",
    zh: "追踪重要账户",
    items: [
      ["Add bank, investment and retirement accounts", "添加银行、投资和退休账户"],
      ["Confirm each date-of-death balance", "确认每个账户在去世当日的余额"],
      ["Record income sources", "记录收入来源"],
    ],
  },
  {
    n: 12,
    t: "Identify Liabilities & Creditors",
    zh: "确认债务与债权人",
    items: [
      ["Pull credit reports", "调取信用报告"],
      ["Find mortgages, vehicle and personal loans", "查找房贷、车贷和个人贷款"],
      ["Review medical bills and taxes", "核对医疗账单和税务"],
    ],
  },
  {
    n: 13,
    t: "Inventory Real Estate & Vehicles",
    zh: "清点房产与车辆",
    items: [
      ["Add each property and vehicle", "逐一添加房产和车辆"],
      ["Tag loan, title and transfer status", "标注贷款、产权和过户状态"],
    ],
  },
  {
    n: 14,
    t: "Personal & Digital Property",
    zh: "个人物品与数字资产",
    items: [
      ["Catalogue belongings and digital assets", "登记个人物品和数字资产"],
      ["Record value, location and recipient", "记录价值、存放位置和接收人"],
    ],
  },
  {
    n: 15,
    t: "Business Interests & Appraisals",
    zh: "企业权益与资产评估",
    items: [
      ["Flag assets that need a valuation", "标出需要估价的资产"],
      ["Track each appraisal to a confirmed value", "追踪每项估价，直到价值确认"],
    ],
  },
];

type Feature = { step: number; title: string; zh: string; screen: Name; alt: string; points: [string, string][] };

const PLANNER_FEATURES: Feature[] = [
  {
    step: 10,
    title: "Find All Real Accounts",
    zh: "查找所有重要文件",
    screen: "find-planner-4",
    alt: "Find All Real Accounts, Planner: the will uploaded during planning next to a newer version",
    points: [
      ["Documents uploaded during planning are already attached to their task.", "规划阶段上传的文件已经附在对应任务里。"],
      ["The executor confirms them, or adds a newer version alongside.", "遗产执行人只需确认，或在旁边补充一份更新的版本。"],
    ],
  },
  {
    step: 11,
    title: "Track Important Accounts",
    zh: "追踪重要账户",
    screen: "tia-planner-3",
    alt: "Track Important Accounts, Planner: an imported account with its date-of-death balance confirmed and locked",
    points: [
      ["Accounts and income sources are imported from the plan.", "账户和收入来源从遗产规划中导入。"],
      ["A confirmed balance locks in green; changing it takes an edit and a re-confirm.", "确认后的余额以绿色锁定；要修改，必须主动编辑并再次确认。"],
    ],
  },
  {
    step: 12,
    title: "Identify Liabilities & Creditors",
    zh: "确认债务与债权人",
    screen: "liab-planner-2",
    alt: "Identify Liabilities & Creditors, Planner: the Equifax credit report pre-uploaded during planning",
    points: [
      ["Debt records and the credit report carry over from planning.", "债务记录和信用报告都从规划阶段带入。"],
      ["Document counts show what is still missing.", "文件数量会提示还缺哪些材料。"],
    ],
  },
  {
    step: 13,
    title: "Inventory Real Estate & Vehicles",
    zh: "清点房产与车辆",
    screen: "realestate-planner-1",
    alt: "Inventory Real Estate & Vehicles, Planner: a property and a vehicle imported from planning with status tags",
    points: [
      ["Properties and vehicles arrive with their settlement status tagged.", "房产和车辆导入时已标注处理状态。"],
      ["The executor updates what changed instead of re-entering everything.", "遗产执行人只需更新有变化的部分，无需重新录入。"],
    ],
  },
];

const NOPLANNER_FEATURES: Feature[] = [
  {
    step: 10,
    title: "Find All Real Accounts",
    zh: "查找所有重要文件",
    screen: "find-noplanner-1",
    alt: "Find All Real Accounts, No Planner: a checklist of eight document tasks at 0 of 8",
    points: [
      ["Eight document tasks, starting at 0 of 8.", "八项文件任务，从“完成 0 项”开始。"],
      ["Every task opens Incomplete, with one next action: upload and mark complete.", "每项任务初始都是 Incomplete，只给出一个下一步：上传并标记完成。"],
    ],
  },
  {
    step: 11,
    title: "Track Important Accounts",
    zh: "追踪重要账户",
    screen: "tia-noplanner-2",
    alt: "Track Important Accounts, No Planner: the Add Account form",
    points: [
      ["Accounts are added one by one from a short form.", "通过简短的表单逐个添加账户。"],
      ["The date-of-death balance is confirmed before it counts.", "去世当日的余额需要确认后才会计入。"],
    ],
  },
  {
    step: 13,
    title: "Inventory Real Estate & Vehicles",
    zh: "清点房产与车辆",
    screen: "realestate-noplanner-2",
    alt: "Inventory Real Estate & Vehicles, No Planner: the Add Primary Residence form",
    points: [
      ["Each property or vehicle starts from a template for its type.", "每处房产或每辆车都从对应类型的模板开始。"],
      ["Loan, tax and transfer status are captured as it is added.", "添加时一并记录贷款、税务和过户状态。"],
    ],
  },
  {
    step: 14,
    title: "Personal & Digital Property",
    zh: "个人物品与数字资产",
    screen: "personal-noplanner-3",
    alt: "Personal & Digital Property, No Planner: belongings catalogued with appraisal and distribution status",
    points: [
      ["Belongings and digital assets, each with value, location and recipient.", "个人物品和数字资产，逐项记录价值、存放位置和接收人。"],
      ["Appraisal and distribution status sit on every item.", "每件物品都标注了估价和分配状态。"],
    ],
  },
  {
    step: 15,
    title: "Business Interests & Appraisals",
    zh: "企业权益与资产评估",
    screen: "business-noplanner-2",
    alt: "Business Interests & Appraisals, No Planner: appraisal tracking with confirmed values and reports",
    points: [
      ["Which assets need a professional valuation, and where each appraisal stands.", "哪些资产需要专业估价，以及每项估价进展到哪一步。"],
      ["Confirmed date-of-death values add up to the estate total.", "已确认的去世当日价值汇总为遗产总额。"],
    ],
  },
];

const FINDINGS: [string, string, string, string][] = [
  [
    "Executors don’t know what’s in the estate.",
    "遗产执行人不清楚遗产里到底有什么。",
    "Accounts, property, insurance, digital assets and debts are scattered across unrelated institutions and paper files.",
    "账户、房产、保险、数字资产和债务分散在互不相关的机构和纸质文件里。",
  ],
  [
    "Executors don’t know what to do first.",
    "遗产执行人不知道该先做什么。",
    "Documents, assets, debts, taxes and distribution all run at once, with no clear order between them.",
    "文件、资产、债务、税务和分配同时推进，彼此之间却没有清晰的先后顺序。",
  ],
  [
    "A wrong move can carry personal liability.",
    "一步出错，可能要承担个人责任。",
    "Paying debts out of order, missing a tax filing or overlooking a creditor can leave the executor personally liable.",
    "清偿债务的顺序出错、漏报税，或遗漏某位债权人，都可能让遗产执行人承担个人责任。",
  ],
];

// Style guide: colours sampled from the screens.
const COLORS: { hex: string; name: string; use: string; zh: string; dark?: boolean }[] = [
  { hex: "#143860", name: "Navy", use: "Top bar, page titles", zh: "顶栏、页面标题", dark: true },
  { hex: "#047C88", name: "Teal", use: "Primary buttons, borders", zh: "主按钮、边框", dark: true },
  { hex: "#0090B4", name: "Blue", use: "Links, step numbers", zh: "链接、步骤编号", dark: true },
  { hex: "#1E806D", name: "Green", use: "Progress", zh: "进度条", dark: true },
  { hex: "#C8DED6", name: "Sage", use: "Current workflow step", zh: "当前流程步骤" },
  { hex: "#E7F3ED", name: "Mint", use: "Confirmed values", zh: "已确认的数值" },
  { hex: "#FCF8F7", name: "Cream", use: "Page background", zh: "页面背景" },
  { hex: "#101006", name: "Ink", use: "Body text", zh: "正文文字", dark: true },
];

type Group = { key: string; title: string; zh: string; desc: string; descZh: string; screens: Name[] };
const range = (prefix: string, n: number) => Array.from({ length: n }, (_, i) => `${prefix}-${i + 1}` as Name);

const FINAL: { track: string; trackZh: string; groups: Group[] }[] = [
  {
    track: "Planner Estate",
    trackZh: "Planner（生前做过遗产规划）",
    groups: [
      {
        key: "p-find",
        title: "Find All Real Accounts",
        zh: "查找所有重要文件",
        desc: "Documents from planning arrive attached; the executor confirms them or adds a newer version.",
        descZh: "规划阶段的文件已经附上，遗产执行人只需确认，或补充更新的版本。",
        screens: range("find-planner", 4),
      },
      {
        key: "p-track",
        title: "Track Important Accounts",
        zh: "追踪重要账户",
        desc: "Imported accounts and income; balances are confirmed, locked, and edited only on purpose.",
        descZh: "导入的账户和收入；余额经确认后锁定，只有主动编辑才能修改。",
        screens: range("tia-planner", 9),
      },
      {
        key: "p-liab",
        title: "Identify Liabilities & Creditors",
        zh: "确认债务与债权人",
        desc: "Credit reports and debts carry over from planning; loans and bills are added on top.",
        descZh: "信用报告和债务从规划阶段带入，再在此基础上补充贷款和账单。",
        screens: range("liab-planner", 9),
      },
      {
        key: "p-re",
        title: "Inventory Real Estate & Vehicles",
        zh: "清点房产与车辆",
        desc: "Properties and vehicles imported with their status already tagged.",
        descZh: "导入的房产和车辆已标注好处理状态。",
        screens: range("realestate-planner", 1),
      },
    ],
  },
  {
    track: "No Planner Estate",
    trackZh: "No Planner（生前没有做遗产规划）",
    groups: [
      {
        key: "n-find",
        title: "Find All Real Accounts",
        zh: "查找所有重要文件",
        desc: "From 0 of 8: each document is found, uploaded and marked complete, one task at a time.",
        descZh: "从“完成 0 项”开始：逐项找到文件、上传并标记完成。",
        screens: range("find-noplanner", 5),
      },
      {
        key: "n-track",
        title: "Track Important Accounts",
        zh: "追踪重要账户",
        desc: "Accounts and income sources built from empty, one form at a time.",
        descZh: "账户和收入来源从零开始，逐个通过表单添加。",
        screens: range("tia-noplanner", 7),
      },
      {
        key: "n-liab",
        title: "Identify Liabilities & Creditors",
        zh: "确认债务与债权人",
        desc: "Debts built from a template: credit reports, mortgages, vehicle loans and medical bills.",
        descZh: "债务从模板开始逐项建立：信用报告、房贷、车贷和医疗账单。",
        screens: [1, 2, 3, 4, 6, 5, 7, 8, 9, 10].map((n) => `liab-noplanner-${n}` as Name),
      },
      {
        key: "n-re",
        title: "Inventory Real Estate & Vehicles",
        zh: "清点房产与车辆",
        desc: "From an empty list to recorded properties and vehicles, each with its own form.",
        descZh: "从空列表开始，通过各自的表单记录房产和车辆。",
        screens: range("realestate-noplanner", 5),
      },
      {
        key: "n-personal",
        title: "Personal & Digital Property",
        zh: "个人物品与数字资产",
        desc: "Belongings and digital assets catalogued with appraisal and distribution status.",
        descZh: "登记个人物品和数字资产，并标注估价和分配状态。",
        screens: range("personal-noplanner", 3),
      },
      {
        key: "n-business",
        title: "Business Interests & Appraisals",
        zh: "企业权益与资产评估",
        desc: "The step in the workflow, then appraisal tracking with confirmed values and reports.",
        descZh: "这一步在流程中的位置，以及带有已确认价值和评估报告的估价追踪。",
        screens: range("business-noplanner", 2),
      },
    ],
  },
];

/* ---------- sections ---------- */

/** Core flows: Planner and No Planner both feed one line of six steps; labels alternate above and below. */
function CoreFlows() {
  return (
    <>
      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-[150px_40px_1fr] items-center">
          <div className="flex flex-col gap-16">
            <Start label="Planner" zh="Planner" color={ACCENT} />
            <Start label="No Planner" zh="No Planner" color="#c9c9cf" />
          </div>
          {/* the two tracks join the line */}
          <div className="relative h-[150px]">
            <span className="absolute left-0 top-[22px] h-px w-1/2" style={{ background: ACCENT }} />
            <span className="absolute bottom-[22px] left-0 h-px w-1/2 bg-[#c9c9cf]" />
            <span className="absolute left-1/2 top-[22px] h-[calc(100%-44px)] w-px bg-white/40" />
            <span className="absolute left-1/2 top-1/2 h-px w-1/2 bg-white/40" />
          </div>
          <div className="relative grid grid-cols-6">
            <span className="absolute inset-x-[8%] top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-white/50 via-[#7fd3da] to-white/50" />
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative flex h-[420px] flex-col items-center justify-center">
                <span className="font-gilroy relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#2a2a30] text-[15px] text-white ring-1 ring-white/15">
                  {s.n}
                </span>
                <div className={`absolute left-1/2 w-[190px] -translate-x-1/2 ${i % 2 ? "top-[calc(50%+40px)]" : "bottom-[calc(50%+40px)]"}`}>
                  <span className={`absolute left-1/2 h-[18px] border-l border-dashed border-white/30 ${i % 2 ? "-top-[22px]" : "-bottom-[22px]"}`} />
                  <StepText step={s} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* mobile / tablet */}
      <div className="lg:hidden">
        <div className="mb-8 flex flex-wrap gap-6">
          <Start label="Planner" zh="Planner" color={ACCENT} />
          <Start label="No Planner" zh="No Planner" color="#c9c9cf" />
        </div>
        <ol className="relative flex flex-col gap-8 border-l border-white/20 pl-7">
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <span className="font-gilroy absolute -left-[46px] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#2a2a30] text-[13px] text-white ring-1 ring-white/15">
                {s.n}
              </span>
              <StepText step={s} />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function Start({ label, zh, color }: { label: string; zh: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-3 w-3 rounded-full" style={{ background: color }} />
      <span className="font-gilroy text-[18px] text-white md:text-[20px]">
        <L en={label} zh={zh} />
      </span>
    </div>
  );
}

function StepText({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div>
      <p className="font-gilroy text-[17px] leading-[1.2] text-white xl:text-[19px]">
        <L en={step.t} zh={step.zh} />
      </p>
      <ol className="font-gilroy mt-3 flex flex-col gap-1.5 text-[13px] leading-[1.35] text-white/70">
        {step.items.map(([en, zh], k) => (
          <li key={en} className="grid grid-cols-[14px_1fr]">
            <span className="text-white/45">{k + 1}</span>
            <L en={en} zh={zh} />
          </li>
        ))}
      </ol>
    </div>
  );
}

/** One key feature: laptop on one side, title and points on the other (alternating). */
function FeatureRow({ f, flip }: { f: Feature; flip: boolean }) {
  return (
    <Reveal
      className={`grid items-center gap-8 md:gap-12 lg:gap-16 ${flip ? "md:grid-cols-[minmax(0,1fr)_minmax(0,305px)]" : "md:grid-cols-[minmax(0,305px)_minmax(0,1fr)]"}`}
    >
      <div className={flip ? "md:order-2" : ""}>
        <p className="font-gilroy text-[13px] uppercase tracking-[0.2em] text-white/40">
          <L en={`Step ${f.step}`} zh={`第 ${f.step} 步`} />
        </p>
        <h3 className="font-gilroy mt-3 text-[clamp(26px,2.5vw,36px)] font-medium leading-[1.2] text-white">
          <L en={f.title} zh={f.zh} />
        </h3>
        <div className="font-gilroy mt-6 flex flex-col gap-3 text-[16px] leading-[1.3] text-[#adadad] md:text-[18px]">
          {f.points.map(([en, zh]) => (
            <p key={en}>
              <L en={en} zh={zh} />
            </p>
          ))}
        </div>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <Screen name={f.screen} alt={f.alt} />
      </div>
    </Reveal>
  );
}

function FeatureTrack({ label, zh, intro, introZh, features }: { label: string; zh: string; intro: string; introZh: string; features: Feature[] }) {
  return (
    <div>
      <Reveal className="mb-14 flex flex-col items-start gap-3 md:mb-20">
        <span className="font-gilroy inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#2e2c2f] px-4 py-1.5 text-[14px] text-white">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
          <L en={label} zh={zh} />
        </span>
        <p className="font-gilroy max-w-[60ch] text-[16px] leading-[1.4] text-[#adadad] md:text-[18px]">
          <L en={intro} zh={introZh} />
        </p>
      </Reveal>
      <div className="flex flex-col gap-24 md:gap-32">
        {features.map((f, i) => (
          <FeatureRow key={f.screen} f={f} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function StyleGuide() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div>
        <h4 className="font-gilroy text-[20px] text-[#252525]">
          <L en="Colors" zh="颜色" />
        </h4>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COLORS.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-[10px] border border-black/[0.06] bg-white">
              <div className="flex h-20 items-end p-2.5" style={{ background: c.hex }}>
                <span className={`font-gilroy text-[11px] font-medium ${c.dark ? "text-white/90" : "text-black/60"}`}>{c.hex}</span>
              </div>
              <div className="p-2.5">
                <p className="font-gilroy text-[13px] font-medium text-[#252525]">{c.name}</p>
                <p className="font-gilroy mt-0.5 text-[12px] leading-[1.3] text-black/50">
                  <L en={c.use} zh={c.zh} />
                </p>
              </div>
            </div>
          ))}
        </div>
        <h4 className="font-gilroy mt-12 text-[20px] text-[#252525]">
          <L en="Components" zh="组件" />
        </h4>
        <div className="mt-6 flex flex-col gap-4">
          <Crop src="style-item" w={1024} h={150} alt="A catalogued belonging with status chips, value, location and recipient, and Edit / Delete buttons" />
          <Crop src="style-upload" w={1022} h={343} alt="Upload step: dashed drop zone and the teal Mark as Complete button" />
        </div>
      </div>
      <div>
        <h4 className="font-gilroy text-[20px] text-[#252525]">
          <L en="Typeface" zh="字体" />
        </h4>
        <div className="mt-6 flex flex-col gap-6">
          <div>
            <p className="font-gilroy mb-3 text-[13px] text-black/50">
              <L en="Serif · page titles" zh="衬线体 · 页面标题" />
            </p>
            <Crop src="style-heading" w={580} h={60} alt="Page title set in the serif: Secure & Inventory Assets" />
          </div>
          <div>
            <p className="font-gilroy mb-3 text-[13px] text-black/50">
              <L en="Sans · interface, forms and body text" zh="无衬线体 · 界面、表单和正文" />
            </p>
            <Crop src="style-form" w={600} h={270} alt="Form set in the sans: Add Account, Account Type, Financial Institution" />
          </div>
          <div>
            <p className="font-gilroy mb-3 text-[13px] text-black/50">
              <L en="Radius" zh="圆角" />
            </p>
            <div className="flex gap-4">
              {[
                ["12px", "Cards", "卡片"],
                ["6px", "Buttons, fields", "按钮、输入框"],
                ["999px", "Status chips", "状态标签"],
              ].map(([r, en, zh]) => (
                <div key={r} className="flex flex-col items-start gap-2">
                  <div className="h-16 w-20 border border-[#047C88] bg-[#FCF8F7]" style={{ borderRadius: r === "999px" ? 999 : r }} />
                  <p className="font-gilroy text-[12px] text-black/60">
                    {r} · <L en={en} zh={zh} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Crop({ src, w, h, alt }: { src: string; w: number; h: number; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${E}/${src}.webp`} alt={alt} width={w} height={h} loading="lazy" className="block h-auto w-full rounded-[10px] border border-black/[0.06] bg-white" />
  );
}

function FinalGroup({ g, track }: { g: Group; track: string }) {
  const first = g.screens[0];
  return (
    <div className="border-t border-black/[0.08] pt-14 md:pt-20">
      <Reveal className="grid items-center gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="font-gilroy text-[13px] uppercase tracking-[0.2em] text-black/40">{track}</p>
          <h3 className="font-gilroy mt-2 text-[clamp(24px,2.4vw,34px)] uppercase leading-[1.15] text-[#6b6b6b]">
            <L en={g.title} zh={g.zh} />
            <span style={{ color: DOT }}>.</span>
          </h3>
          <p className="font-gilroy mt-4 text-[15px] leading-[1.5] text-black/60 md:text-[16px]">
            <L en={g.desc} zh={g.descZh} />
          </p>
          <p className="font-gilroy mt-3 text-[13px] text-black/40">
            <L en={`${g.screens.length} ${g.screens.length === 1 ? "screen" : "screens"}`} zh={`${g.screens.length} 个界面`} />
          </p>
        </div>
        <Screen name={first} alt={`${g.title}: ${track}`} fade={false} />
      </Reveal>
      {g.screens.length > 1 && (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 md:mt-14">
          {g.screens.map((s, i) => {
            const f = frame(s);
            return (
              <a key={s} href={`${E}/${s}.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="mb-4 block break-inside-avoid">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${E}/${s}.webp`}
                  alt={`${g.title} (${track}), screen ${i + 1}`}
                  width={f.w}
                  height={f.h}
                  loading="lazy"
                  className="block h-auto w-full rounded-[10px] border border-black/[0.06] bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]"
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- page ---------- */

export default function EndOfAnEra() {
  return (
    <div id="top" className="relative min-h-screen bg-[#020008] text-white">
      <CreativeNav play hrefBase="/" />
      <div className="relative overflow-hidden bg-[radial-gradient(90%_40%_at_50%_0%,#3a3740_0%,#16141b_55%,#020008_100%)] md:bg-[radial-gradient(90%_55%_at_50%_0%,#3a3740_0%,#16141b_55%,#020008_100%)]">
        {/* HERO */}
        <section className="pt-36 md:pt-44">
          <Container>
            <div className="mb-12 text-center">
              <BackLink href="/#work" className="font-gilroy inline-flex items-center gap-2 text-[15px] text-white/50 transition-colors hover:text-white">
                <span>←</span>
                <L en="Back to Featured Work" zh="返回精选作品" />
              </BackLink>
            </div>
            <Reveal className="flex flex-col items-center text-center">
              <h1 className="font-gilroy text-[clamp(44px,4vw,56px)] font-medium leading-none text-white">End of an Era</h1>
              <p className="font-gilroy mt-5 max-w-[60ch] text-[16px] leading-[1.35] text-white/55 md:text-[18px]">
                <L
                  en="A legal-tech platform that guides executors through settling a loved one’s estate, one clear step at a time."
                  zh="一个法律科技平台，帮助遗产执行人一步一步、清楚地处理已故家人的遗产事务。"
                />
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {["UI/UX", "Web App", "Internship"].map((t) => (
                  <span key={t} className="font-gilroy rounded-full border border-white/10 bg-[#2e2c2f] px-4 py-1.5 text-[13px] text-white">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative mt-20 md:mt-24">
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-[70%] max-w-[1100px] rounded-full bg-[#5c5866]/25 blur-[120px]" />
              <div className="relative mx-auto w-full overflow-hidden [mask-image:linear-gradient(180deg,#000_22%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.15)_80%,transparent_100%)] md:w-[57vw]">
                <Laptop
                  src={`${E}/liab-planner-9.webp`}
                  alt="End of an Era: the Secure & Inventory Assets step with its completed, in-progress and upcoming tasks"
                  w={frame("liab-planner-9").w}
                  h={frame("liab-planner-9").h}
                  crop={frame("liab-planner-9").win ?? undefined}
                  eager
                />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* TIMELINE / SCOPE / PLATFORM / ROLE */}
        <section className="pb-24 pt-12 md:pb-32 md:pt-[72px]">
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
                <p>
                  <L en="Desktop" zh="桌面端" />
                </p>
              </InfoCard>
              <InfoCard label={<L en="Role" zh="角色" />}>
                <p>
                  <L en="Design Intern" zh="设计实习生" />
                </p>
                <p>Sihan Wang</p>
              </InfoCard>
            </Reveal>
            <Reveal className="mt-10 flex justify-center">
              <InteractiveHoverLink
                href={figma.endOfAnEra}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                text={<L en="View the full flow in Figma" zh="在 Figma 中查看完整流程" />}
                className="font-gilroy text-[15px] font-medium"
              />
            </Reveal>
          </Container>
        </section>
      </div>

      {/* BACKGROUND */}
      <section className="py-24 md:py-36">
        <Container>
          <Reveal>
            <CenterTitle>
              <L en="Background" zh="项目背景" />
            </CenterTitle>
            <div className="mt-14 md:mt-20">
              <Statement>
                <L
                  en={
                    <>
                      When a family member dies, the executor has to <Hi>inventory assets, settle debts and file taxes</Hi>, often within legal
                      deadlines and with <Hi>no legal or financial background</Hi>. End of an Era turns that legal process into a{" "}
                      <Hi>guided workflow</Hi> with a clear next step.
                    </>
                  }
                  zh={
                    <>
                      家人去世后，遗产执行人需要<Hi>清点资产、清偿债务并报税</Hi>，往往还要在法律规定的期限内完成，而他们大多<Hi>没有法律或财务背景</Hi>。End of an Era
                      把这套法律流程变成<Hi>有引导的操作步骤</Hi>，每一步都清楚下一步该做什么。
                    </>
                  }
                />
              </Statement>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CORE FLOWS */}
      <section className="pb-24 md:pb-36">
        <Container>
          <Reveal>
            <CenterTitle>
              <L en="Core Flows" zh="核心流程" />
            </CenterTitle>
            <div className="mt-14 md:mt-20">
              <Statement>
                <L
                  en={
                    <>
                      I designed the <Hi>Secure &amp; Inventory Assets</Hi> stage: six steps that take an executor from finding the will to
                      knowing what is owed. Every step runs on <Hi>two tracks</Hi>, depending on whether the estate was{" "}
                      <Hi>planned in advance</Hi>.
                    </>
                  }
                  zh={
                    <>
                      我负责设计 <Hi>Secure &amp; Inventory Assets</Hi> 阶段：六个步骤，带遗产执行人从找到遗嘱一路走到弄清欠款。每一步都分为<Hi>两条路径</Hi>
                      ，取决于逝者生前是否<Hi>做过遗产规划</Hi>。
                    </>
                  }
                />
              </Statement>
            </div>
          </Reveal>
          <Reveal className="mx-auto mt-16 max-w-[1150px] md:mt-24">
            <CoreFlows />
          </Reveal>
        </Container>
      </section>

      {/* KEY FEATURES */}
      <section className="pb-28 md:pb-40">
        <Container>
          <Reveal>
            <CenterTitle>
              <L en="Key Features" zh="核心功能" />
            </CenterTitle>
          </Reveal>
          <div className="mx-auto mt-16 flex max-w-[1150px] flex-col gap-28 md:mt-24 md:gap-40">
            <FeatureTrack
              label="Planner Estate"
              zh="Planner：生前做过遗产规划"
              intro="The deceased planned ahead, so documents and records already exist. The executor reviews and confirms instead of starting over."
              introZh="逝者生前做过遗产规划，文件和记录都已存在。遗产执行人只需核对和确认，无需从头开始。"
              features={PLANNER_FEATURES}
            />
            <FeatureTrack
              label="No Planner Estate"
              zh="No Planner：生前没有做遗产规划"
              intro="Nothing was planned, so the executor builds the estate record from scratch, guided one task at a time."
              introZh="逝者生前没有做规划，遗产执行人需要从零建立遗产记录，系统会一项一项地引导。"
              features={NOPLANNER_FEATURES}
            />
          </div>
        </Container>
      </section>

      {/* PART 1: RESEARCH */}
      <section className="pb-28 md:pb-40">
        <Container>
          <div className="mx-auto max-w-[1150px]">
            <Reveal>
              <PartTitle part="Part 1">
                <L en="Research" zh="调研" />
              </PartTitle>
            </Reveal>
            <Reveal className="mt-16 md:mt-24">
              <SplitHead title={<L en="Interview" zh="访谈" />}>
                <L
                  en="Estate settlement was completely new to me: I didn’t know what a settlement involves or which documents an executor has to collect. So before designing anything, I ran interviews to learn the process, the documents behind each step, and where executors get stuck."
                  zh="遗产处理对我来说是一个全新的领域：我既不了解遗产处理包含哪些环节，也不知道遗产执行人需要收集哪些文件。所以在动手设计之前，我先做了访谈，弄清整个流程、每一步背后需要的文件，以及遗产执行人容易卡在哪里。"
                />
              </SplitHead>
            </Reveal>
            <Reveal className="mt-20 md:mt-28">
              <SplitHead title={<L en="Mind Map" zh="思维导图" />}>
                <L
                  en="From the interviews I mapped how the Secure & Inventory stage breaks down: its six asset categories, the documents to locate, and what each account or income source has to record or track."
                  zh="根据访谈，我梳理了 Secure & Inventory 这一阶段的构成：六大资产类别、需要找齐的文件，以及每类账户和收入来源需要记录或追踪的信息。"
                />
              </SplitHead>
            </Reveal>
            <Reveal className="mt-10">
              <a href={`${E}/sitemap.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${E}/sitemap.webp`}
                  alt="Mind map of the Secure & Inventory stage: six asset categories, the legal documents to locate, and the fields each financial account and income source must record or track"
                  width={6695}
                  height={3955}
                  loading="lazy"
                  className="block h-auto w-full rounded-[12px] border border-white/10 bg-white"
                />
              </a>
              <p className="font-gilroy mt-4 text-[14px] text-white/45">
                <L en="Click to open full size." zh="点击可查看大图。" />
              </p>
            </Reveal>
            <Reveal className="mt-20 md:mt-28">
              <SplitHead title={<L en="Interview Findings" zh="访谈发现" />}>
                <L en="Three problems came up again and again." zh="有三个问题反复出现。" />
              </SplitHead>
            </Reveal>
            <Reveal className="mt-10 grid gap-5 md:grid-cols-3">
              {FINDINGS.map(([t, tz, d, dz], i) => (
                <div key={t} className="rounded-[10px] border border-white/[0.06] bg-[#1c1c1f] p-7">
                  <span className="font-gilroy text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-gilroy mt-4 text-[22px] font-medium leading-[1.2] text-white">
                    <L en={t} zh={tz} />
                  </h4>
                  <p className="font-gilroy mt-4 text-[16px] leading-[1.4] text-[#adadad]">
                    <L en={d} zh={dz} />
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PART 2: DESIGN THINKING */}
      <section className="pb-28 md:pb-40">
        <Container>
          <div className="mx-auto max-w-[1150px]">
            <Reveal>
              <PartTitle part="Part 2">
                <L en="Design Thinking" zh="设计思路" />
              </PartTitle>
            </Reveal>
            <Reveal className="mt-16 md:mt-24">
              <Statement>
                <L
                  en={
                    <>
                      The requirements described <Hi>one flow</Hi>, but hid <Hi>two situations</Hi> inside it. If the deceased planned ahead,
                      documents and records already exist and should <Hi>carry into settlement</Hi>. If not, the executor has to{" "}
                      <Hi>build everything from scratch</Hi>. So I split the design into two parallel tracks.
                    </>
                  }
                  zh={
                    <>
                      需求文档描述的是<Hi>一个流程</Hi>，里面却藏着<Hi>两种情况</Hi>。如果逝者生前做过规划，文件和记录已经存在，应当<Hi>直接带入遗产处理</Hi>
                      ；如果没有，遗产执行人就得<Hi>从零开始建立一切</Hi>。因此，我把设计拆成了两条并行的路径。
                    </>
                  }
                />
              </Statement>
            </Reveal>
            <Reveal className="mt-16 md:mt-24">
              <div className="flex flex-col items-center">
                <span className="font-gilroy rounded-[8px] bg-[#1c1c1f] px-6 py-3 text-[16px] font-medium text-white md:text-[18px]">
                  <L en="One set of requirements" zh="同一套需求" />
                </span>
                <span className="h-10 w-px bg-white/30" />
                <span className="h-px w-[min(70%,560px)] bg-white/30" />
                <div className="grid w-full max-w-[860px] grid-cols-2 gap-5 md:gap-10">
                  {[
                    {
                      t: "Planner Estate",
                      tz: "Planner",
                      c: ACCENT,
                      items: [
                        ["Documents arrive attached", "文件已预先附上"],
                        ["Records imported with status", "记录导入时已带状态"],
                        ["Executor reviews and confirms", "遗产执行人核对并确认"],
                      ],
                    },
                    {
                      t: "No Planner Estate",
                      tz: "No Planner",
                      c: "#c9c9cf",
                      items: [
                        ["Every task starts empty", "每项任务都从空白开始"],
                        ["Records built from templates", "记录从模板开始建立"],
                        ["Guided one task at a time", "系统逐项引导"],
                      ],
                    },
                  ].map((col) => (
                    <div key={col.t} className="flex flex-col items-center">
                      <span className="h-10 w-px bg-white/30" />
                      <div className="w-full rounded-[10px] border border-white/[0.06] bg-[#1c1c1f] p-5 md:p-7">
                        <p className="font-gilroy flex items-center gap-2 text-[16px] font-medium text-white md:text-[20px]">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: col.c }} />
                          <L en={col.t} zh={col.tz} />
                        </p>
                        <ul className="font-gilroy mt-4 flex flex-col gap-2 text-[14px] leading-[1.35] text-[#adadad] md:text-[16px]">
                          {col.items.map(([en, zh]) => (
                            <li key={en}>
                              <L en={en} zh={zh} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PART 3: DESIGN (light) */}
      <section className="bg-[#f4f5f8] py-24 text-[#252525] md:py-32">
        <Container>
          <div className="mx-auto max-w-[1150px]">
            <Reveal>
              <PartTitle part="Part 3" light>
                <L en="Design" zh="设计" />
              </PartTitle>
            </Reveal>
            <Reveal className="mt-16 md:mt-24">
              <CenterTitle light>
                <L en="Design Style Guide" zh="设计规范" />
              </CenterTitle>
            </Reveal>
            <Reveal className="mt-12 md:mt-16">
              <StyleGuide />
            </Reveal>

            <Reveal className="mt-28 md:mt-40">
              <CenterTitle light>
                <L en="Final Design" zh="最终设计" />
              </CenterTitle>
            </Reveal>
            {FINAL.map((t) => (
              <div key={t.track} className="mt-16 md:mt-24">
                <Reveal>
                  <span className="font-gilroy inline-flex items-center gap-2 rounded-full bg-[#252525] px-4 py-1.5 text-[14px] text-white">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                    <L en={t.track} zh={t.trackZh} />
                  </span>
                </Reveal>
                <div className="mt-10 flex flex-col gap-16 md:gap-24">
                  {t.groups.map((g) => (
                    <FinalGroup key={g.key} g={g} track={t.track} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PART 4: NEXT STEP (light) */}
      <section className="border-t border-black/[0.06] bg-[#f4f5f8] pb-28 pt-4 text-[#252525] md:pb-40">
        <Container>
          <div className="mx-auto max-w-[1150px]">
            <Reveal>
              <PartTitle part="Part 4" light>
                <L en="Next Step" zh="下一步" />
              </PartTitle>
            </Reveal>
            <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
              {[
                {
                  en: (
                    <>
                      Most of my time went into the <Hi2>information architecture</Hi2>, the two-track flow, and the rules for what carries
                      forward from planning. Next, I&apos;d <Hi2>test the flow with people who have served as executors</Hi2>.
                    </>
                  ),
                  zh: (
                    <>
                      我的大部分精力投入在<Hi2>信息架构</Hi2>、双轨流程，以及“哪些内容可以从规划阶段带入”的规则上。下一步，我希望<Hi2>邀请真正担任过遗产执行人的用户来测试这套流程</Hi2>。
                    </>
                  ),
                },
                {
                  en: (
                    <>
                      The rest of the settlement, <Hi2>debt priority, secure payments and tax filing</Hi2>, is documented in Figma and is the next
                      part of the flow to bring to the same level of detail.
                    </>
                  ),
                  zh: (
                    <>
                      遗产处理的其余部分，包括<Hi2>债务优先级、安全付款和报税</Hi2>，已记录在 Figma 中，是下一步需要细化到同样程度的流程。
                    </>
                  ),
                },
              ].map((p, i) => (
                <Reveal key={i} className="text-center">
                  <p className="font-gilroy text-[clamp(32px,3vw,44px)] text-[#c4c4c4]">{i + 1}</p>
                  <div className="mt-4">
                    <Statement light>
                      <L en={p.en} zh={p.zh} />
                    </Statement>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <div className="relative z-10">
        <CreativeCTA hrefBase="/" />
      </div>
    </div>
  );
}

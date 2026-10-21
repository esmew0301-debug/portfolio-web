import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { DeviceGrid, Showcase, type Frame, type Placed, type Callout } from "@/components/case/device";
import { EoeDesignSystem } from "@/components/case/eoe-design-system";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { figma, person } from "@/lib/content";
import { L } from "@/lib/i18n";
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
const sc = (name: Name, tag: string, label: string, zh: string) => ({ frame: fr(name, `${tag}: ${label}`), label, zh, tag });

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

// Each step: two or four screens (No Planner and Planner side by side where both exist).
const STEPS: { n: number; t: string; tz: string; d: string; dz: string; shots: ReturnType<typeof sc>[] }[] = [
  {
    n: 10,
    t: "Find All Real Accounts",
    tz: "查找所有重要文件",
    d: "Eight document tasks. No Planner starts empty; Planner files arrive already attached.",
    dz: "八项文件任务。No Planner 从空白开始；Planner 的文件已预先附上。",
    shots: [
      sc("find-noplanner-1", N, "Checklist: 0 of 8 tasks", "任务清单：8 项完成 0 项"),
      sc("find-planner-1", P, "Checklist with planning files attached", "任务清单，规划阶段的文件已附上"),
      sc("find-noplanner-4", N, "Uploaded and complete", "上传完成"),
      sc("find-planner-4", P, "Pre-uploaded and new files, side by side", "预先上传的文件与新文件并列"),
    ],
  },
  {
    n: 11,
    t: "Track Important Accounts",
    tz: "追踪重要账户",
    d: "Accounts and income. A confirmed date-of-death balance stays locked.",
    dz: "账户与收入。已确认的去世当日余额保持锁定。",
    shots: [
      sc("tia-noplanner-1", N, "No accounts or income yet", "还没有账户或收入"),
      sc("tia-planner-1", P, "Accounts imported from planning", "从规划阶段导入的账户"),
      sc("tia-noplanner-2", N, "Add Account", "添加账户"),
      sc("tia-planner-3", P, "Balance confirmed and locked", "余额已确认并锁定"),
    ],
  },
  {
    n: 12,
    t: "Identify Liabilities & Creditors",
    tz: "确认债务与债权人",
    d: "Credit reports, loans and bills. Planner debts import automatically.",
    dz: "信用报告、贷款和账单。Planner 的债务自动导入。",
    shots: [
      sc("liab-noplanner-2", N, "Pull Credit Reports, nothing uploaded", "调取信用报告：尚未上传"),
      sc("liab-planner-2", P, "Credit report pre-uploaded", "信用报告已预先上传"),
      sc("liab-noplanner-6", N, "Find Mortgage & Property Loans", "查找房贷与房产贷款"),
      sc("liab-planner-5", P, "Properties and loans listed", "房产及贷款列表"),
    ],
  },
  {
    n: 13,
    t: "Inventory Real Estate & Vehicles",
    tz: "清点房产与车辆",
    d: "Properties and vehicles, each tagged with its settlement status.",
    dz: "房产和车辆，每一项都标注处理状态。",
    shots: [
      sc("realestate-noplanner-1", N, "Empty: no properties or vehicles", "空状态：还没有房产或车辆"),
      sc("realestate-planner-1", P, "Imported with status tags", "导入时已带状态标签"),
      sc("realestate-noplanner-2", N, "Add Primary Residence", "添加主要住所"),
      sc("realestate-noplanner-5", N, "Property and vehicle recorded", "房产和车辆均已记录"),
    ],
  },
  {
    n: 14,
    t: "Personal & Digital Property",
    tz: "个人物品与数字资产",
    d: "Belongings with value, recipient, appraisal and distribution status.",
    dz: "个人物品，记录价值、接收人、估价和分配状态。",
    shots: [
      sc("personal-noplanner-1", N, "Empty: belongings and digital assets", "空状态：个人物品与数字资产"),
      sc("personal-noplanner-3", N, "Belongings catalogued, with status", "物品已登记，附状态"),
    ],
  },
  {
    n: 15,
    t: "Business Interests & Appraisals",
    tz: "企业权益与资产评估",
    d: "Which assets need a valuation, tracked to a confirmed value.",
    dz: "标出需要估价的资产，并追踪到价值确认。",
    shots: [
      sc("business-noplanner-1", N, "Step 15 of Secure & Inventory Assets", "Secure & Inventory Assets 的第 15 步"),
      sc("business-noplanner-2", N, "Appraisal tracking", "估价追踪"),
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
                <L en={<>Settle an estate, <span style={{ color: ACCENT }}>one step at a time.</span></>} zh={<>处理遗产，<span style={{ color: ACCENT }}>一步一步来。</span></>} />
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
              <L
                en="A legal-tech platform that guides executors through settling a loved one's estate."
                zh="一个法律科技平台，引导遗产执行人处理已故家人的遗产事务。"
              />
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="Executors must inventory assets, settle debts and file taxes, often within legal deadlines and with no legal or financial background."
                  zh="遗产执行人需要清点资产、清偿债务并报税，往往要在法定期限内完成，而且大多没有法律或财务背景。"
                />
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white">
                <L en="What I designed" zh="我的工作" />
              </p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="The six steps of Secure & Inventory Assets, on two tracks: Planner, where the deceased planned ahead, and No Planner, where the executor starts from zero."
                  zh="Secure & Inventory Assets 的六个步骤，分为两条路径：逝者生前做过规划的 Planner，以及从零开始的 No Planner。"
                />
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className={LABEL}>
                  <L en="My role" zh="我的角色" />
                </p>
                <p className="text-[14px] text-white/80">Workflow & UI Design</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Tools" zh="工具" />
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
        <Row title={<L en="Mind map" zh="思维导图" />} label={<L en="Before designing" zh="设计之前" />}>
          <p>
            <L
              en="Estate settlement was new to me, so I first mapped the Secure & Inventory stage: its six asset categories, the documents to locate, and what each account has to record."
              zh="遗产处理对我来说是全新的领域，所以我先梳理了 Secure & Inventory 阶段：六大资产类别、需要找齐的文件，以及每类账户需要记录的信息。"
            />
          </p>
        </Row>
        <Reveal className="mx-auto w-full max-w-[880px] px-3">
          <a href={`${E}/sitemap.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block rounded-[18px] bg-white p-3 md:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${E}/sitemap.webp`}
              alt="Mind map of the Secure & Inventory stage: six asset categories, the legal documents to locate, and the fields each account must record"
              width={6695}
              height={3955}
              loading="lazy"
              className="block h-auto w-full"
            />
          </a>
          <p className={`${LABEL} mt-3`}>
            <L en="Click to open full size." zh="点击查看大图。" />
          </p>
        </Reveal>
      </section>

      {/* KEY FEATURES: annotated boards */}
      <section className="mt-36 flex flex-col gap-20 md:mt-52 md:gap-28">
        <Divider>
          <L en="Key features" zh="核心功能" />
        </Divider>
        {FEATURES.map((f) => (
          <div key={f.t} className="flex flex-col gap-10">
            <Row title={<L en={f.t} zh={f.zh} />}>
              <p>
                <L en={f.d} zh={f.dz} />
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
          <L en="Six steps" zh="六个步骤" />
        </Divider>
        {STEPS.map((st) => (
          <div key={st.n} className="flex flex-col gap-10">
            <Row title={<L en={st.t} zh={st.tz} />} label={<L en={`Step ${st.n}`} zh={`第 ${st.n} 步`} />}>
              <p>
                <L en={st.d} zh={st.dz} />
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
        <Row title={<L en="Design system" zh="设计规范" />} />
        <Reveal className="mt-20 px-3 md:mt-28">
          <EoeDesignSystem dark />
        </Reveal>
      </section>

      {/* COMPONENTS: cards and buttons */}
      <section className="mt-36 md:mt-52">
        <Row title={<L en="Components" zh="组件" />} />
        <Reveal className="mx-auto mt-16 grid max-w-[880px] grid-cols-1 gap-14 px-3 sm:grid-cols-2 sm:gap-16 md:mt-20">
          {[
            { key: "cards", t: "Cards", zh: "卡片", w: 842, h: 1308, alt: "Category cards and the document checklist bubble in its four states" },
            { key: "buttons", t: "Buttons", zh: "按钮", w: 974, h: 1334, alt: "Buttons in their states, step tags, checkboxes and radio buttons" },
          ].map((c) => (
            <figure key={c.key}>
              <figcaption className="mb-4 text-[13px] text-white/70">
                <L en={c.t} zh={c.zh} />
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

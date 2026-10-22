import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { TripDesignSystem } from "@/components/case/trip-design-system";
import { Shot } from "@/components/case/vegan-kit";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { figma, person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `AI-Powered Automotive Trip Planning — ${person.name}`,
  description: "A concept for an AI trip planner that builds a multi-stop trip from what a driver wants to do, across the car and the phone.",
};

// Same black, minimal system as the other case studies: framed split hero, description, then the car screens as
// "scenes" (a short note on the left, the screen on the right in the Tequila page's dark frame with a white stroke),
// the phone screens three to a row, and the research written as paragraphs below the work. Blue (the HMI's route
// colour) is the only accent.
const T = "/images/trip-planning";
const BLUE = "#3b9bff";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";

const B = ({ children }: { children: ReactNode }) => <span style={{ color: BLUE }}>{children}</span>;

type Step = { img: string; en: string; zh: string };
type Flow = { t: string; tz: string; d: string; dz: string; steps: Step[] };
const st = (img: string, en: string, zh: string): Step => ({ img, en, zh });

// The flow of the previous version, in its order. Phone: planning ahead. Car: parked, then driving.
const PHONE_FLOWS: Flow[] = [
  {
    t: "Start with an intention",
    tz: "从意图开始",
    d: "“Take my dog out, get coffee, drive around, but not too much driving.” Pick place types and favourites, then Less Driving or Lower Cost; the AI drafts a trip from that and past preferences.",
    dz: "“带狗出去、喝杯咖啡、兜兜风，但别开太久。”选择地点类型和收藏，再选 Less Driving 或 Lower Cost；AI 结合这些和过往偏好生成行程草稿。",
    steps: [
      st("phone-prefs-1", "Express: place types, favourites, Less Driving / Lower Cost", "表达：地点类型、收藏、少开车 / 低成本"),
      st("phone-prefs-2", "Plan: a five-stop trip drafted by AI", "规划：AI 生成的五站行程"),
    ],
  },
  {
    t: "Build it by hand",
    tz: "手动搭建",
    d: "Skip the AI and build the trip one stop at a time.",
    dz: "跳过 AI，一站一站地搭建行程。",
    steps: [
      st("phone-manual-1", "Start a plan: search, categories, past places", "开始规划：搜索、分类、去过的地方"),
      st("phone-manual-2", "Search for a place", "搜索地点"),
      st("phone-manual-3", "Pick a nearby location and Add", "选择附近门店并添加"),
      st("phone-manual-4", "Save, or keep adding", "保存，或继续添加"),
      st("phone-manual-5", "Add the next stop", "添加下一站"),
    ],
  },
  {
    t: "Or let AI assemble it",
    tz: "或交给 AI 组织",
    d: "Describe the day and AI orders the stops around the departure time.",
    dz: "描述这一天，AI 会围绕出发时间安排各站顺序。",
    steps: [
      st("phone-ai-1", "Describe the day", "说出这一天的安排"),
      st("phone-ai-2", "Review what AI suggests", "查看 AI 的推荐"),
      st("phone-ai-3", "AI builds the route", "AI 生成路线"),
      st("phone-ai-4", "The finished trip", "完整的行程"),
      st("phone-ai-5", "Save it", "保存行程"),
    ],
  },
  {
    t: "Saved trips",
    tz: "保存的行程",
    d: "Trips live in a schedule; details open progressively, from a day to its full route.",
    dz: "行程保存在日程中；细节逐层展开，从某一天到完整路线。",
    steps: [
      st("phone-schedule-1", "Open the schedule", "打开日程"),
      st("phone-schedule-2", "Today's trip", "今天的行程"),
      st("phone-schedule-3", "Browse by week", "按周浏览"),
      st("phone-schedule-4", "Open a day", "展开某一天"),
      st("phone-schedule-5", "The full route and stats", "完整路线与数据"),
    ],
  },
];

const CAR_PARKED: Flow[] = [
  {
    t: "The trip on the map",
    tz: "地图上的行程",
    d: "Parked, the driver has attention to spare, so the full plan stays in view. Tap a place for a compact card, then the details.",
    dz: "停车时驾驶者有余力关注屏幕，完整行程一直可见。点击地点先显示简要卡片，再展开详情。",
    steps: [st("explore-1", "The planned trip on the map", "地图上的完整行程"), st("explore-2", "Tap a place: compact card, then full details", "点击地点：简要卡片，再展开详情")],
  },
  {
    t: "Edit by hand",
    tz: "手动修改",
    d: "Select a stop in the trip plan and search for its replacement.",
    dz: "在行程列表中选中一站，搜索替换的地点。",
    steps: [st("manual-1", "Select a stop", "选中一站"), st("manual-2", "Search to replace it", "搜索要替换的地点")],
  },
  {
    t: "Edit with AI",
    tz: "让 AI 修改",
    d: "“Replace the third one with a highly rated Italian restaurant nearby.” AI finds a match and updates the route once approved.",
    dz: "“把第三站换成附近一家评分高的意大利餐厅。”AI 找到合适的选项，经确认后更新路线。",
    steps: [
      st("ai-1", "Ask AI for a change", "让 AI 修改行程"),
      st("ai-2", "AI finds the best match", "AI 找到最合适的选项"),
      st("ai-3", "Review and save", "确认并保存"),
      st("ai-4", "Itinerary updated", "行程已更新"),
    ],
  },
  {
    t: "Add a stop",
    tz: "添加站点",
    d: "Choose where the stop belongs, pick a nearby Starbucks, preview the detour, and it is inserted.",
    dz: "选好插入的位置，挑一家附近的 Starbucks，预览绕行距离，新的一站就加进去了。",
    steps: [
      st("add-stop-1", "Choose where to add", "选择插入的位置"),
      st("add-stop-2", "Nearby Starbucks on the route", "沿途附近的 Starbucks"),
      st("add-stop-3", "Pick one, preview the detour", "选择一家，预览绕行"),
      st("add-stop-4", "Stop inserted", "新站点已插入"),
    ],
  },
  {
    t: "Find parking",
    tz: "寻找停车",
    d: "Parking near the stop is marked before leaving, so there is no last-minute search.",
    dz: "出发前就在地图上标出目的地附近的停车场，无需临时寻找。",
    steps: [st("parking", "Parking near the stop", "目的地附近的停车场")],
  },
];

const CAR_DRIVING: Flow[] = [
  {
    t: "Proactive charging",
    tz: "主动提醒充电",
    d: "Once moving, the interaction shifts to voice. When the battery runs low, AI finds two stations before the next stop and recommends one, marked with a star.",
    dz: "行驶中交互转向语音。电量不足时，AI 在下一站之前找到两个充电站并推荐其一，用星标标出。",
    steps: [
      st("charging-1", "Battery low: AI finds two options", "电量不足：AI 找到两个充电站"),
      st("charging-2", "The recommended charger is starred", "推荐的充电站带有星标"),
      st("charging-3", "Route to the charger", "导航前往充电站"),
      st("charging-4", "Then on to the next stop", "充电后继续前往下一站"),
    ],
  },
  {
    t: "Adaptive planning",
    tz: "随时调整",
    d: "If the next stop will be closed, AI suggests a similar open place nearby, and asks before changing anything.",
    dz: "如果下一站到达时已关门，AI 推荐附近类似且仍在营业的地方，并在修改前先征求同意。",
    steps: [
      st("adapt-1", "The next stop will be closed", "下一站到达时已关门"),
      st("adapt-2", "An open alternative", "一个仍在营业的替代选项"),
      st("adapt-3", "New route, navigation starts", "生成新路线，开始导航"),
    ],
  },
];

/* ---------- pieces ---------- */

function Article({ title, children, media }: { title: ReactNode; children: ReactNode; media?: ReactNode }) {
  return (
    <Reveal className="grid gap-6 px-3 md:grid-cols-[1.35fr_1fr] md:gap-8">
      <h2 className="text-[20px] leading-[28px] text-white md:text-[24px] md:leading-[32px]">{title}</h2>
      <div className="flex max-w-[520px] flex-col gap-8">
        <div className={`${BODY} flex flex-col gap-5`}>{children}</div>
        {media}
      </div>
    </Reveal>
  );
}

/** A car screen in the dark frame with a thin white stroke. */
function Car({ n, alt }: { n: string; alt: string }) {
  return (
    <div className="rounded-[12px] border border-white/60 bg-[#1c1c1c] p-2 md:p-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${T}/${n}.webp`} alt={alt} loading="lazy" className="block h-auto w-full rounded-[6px]" />
    </div>
  );
}

/** A car flow: the note on the left (sticky), the steps stacked on the right with room between them. */
function CarFlow({ f, n }: { f: Flow; n: string }) {
  return (
    <div className="grid gap-6 px-3 md:grid-cols-[1fr_2fr] md:gap-8">
      <Reveal className="md:sticky md:top-24 md:self-start md:pt-2">
        <p className={LABEL}>{n}</p>
        <p className="mt-1 text-[14px] text-white">
          <L en={f.t} zh={f.tz} />
        </p>
        <p className="mt-1.5 max-w-[340px] text-[13px] leading-[20px] text-white/55">
          <L en={f.d} zh={f.dz} />
        </p>
      </Reveal>
      <div className="flex flex-col gap-14 md:gap-20">
        {f.steps.map((s, i) => (
          <Reveal key={s.img} className="max-w-[620px]">
            <p className={`${LABEL} mb-2`}>
              {f.steps.length > 1 && `${i + 1}  ·  `}
              <L en={s.en} zh={s.zh} />
            </p>
            <Car n={s.img} alt={s.en} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** A phone flow: title + note, then the steps three to a row with a caption under each. */
function PhoneFlow({ f }: { f: Flow }) {
  const rows: Step[][] = [];
  for (let i = 0; i < f.steps.length; i += 3) rows.push(f.steps.slice(i, i + 3));
  return (
    <div className="flex flex-col gap-2">
      <Article title={<L en={f.t} zh={f.tz} />}>
        <p>
          <L en={f.d} zh={f.dz} />
        </p>
      </Article>
      <Reveal className="flex flex-col gap-14 px-[4%] py-[4vw]">
        {rows.map((r, k) => (
          <div key={k} className="flex justify-center gap-[6%]">
            {r.map((s) => {
              const idx = f.steps.indexOf(s) + 1;
              return (
                <div key={s.img} className="w-[27%] max-w-[256px] md:w-[18%]">
                  <Shot src={`${T}/${s.img}.webp`} alt={s.en} frame className="w-full" />
                  <p className={`${LABEL} mt-3`}>
                    {f.steps.length > 1 && `${idx}  ·  `}
                    <L en={s.en} zh={s.zh} />
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </Reveal>
    </div>
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

export default function AiTripPlanning() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${T}/card-interior.jpg`} alt="The AI trip planner on a car's centre screen at night" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-black/30 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              <h1 className="text-[16px] text-white">AI Trip Planning</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <L en={<>Start with an intention, <B>not a destination.</B></>} zh={<>从意图出发，<B>而不是目的地。</B></>} />
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">
                <L en="Concept / 2026" zh="概念项目 / 2026" />
              </p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["Automotive UX", "Mobile", "AI"].map((t) => (
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
                en="An AI trip planner that builds a multi-stop trip from what a driver wants to do, and helps adjust it on the road."
                zh="一款 AI 行程规划工具：根据驾驶者想做的事生成多站点行程，并在路上帮助随时调整。"
              />
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="Navigation starts with a destination. This system starts with an intention, plans the trip on the phone, and carries it into the car."
                  zh="传统导航从目的地开始。这个系统从意图开始：先在手机上规划行程，再把它带进车里。"
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className={LABEL}>
                  <L en="Platform" zh="平台" />
                </p>
                <p className="text-[14px] text-white/80">
                  <L en="Car screen · Phone" zh="车机 · 手机" />
                </p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Role" zh="角色" />
                </p>
                <p className="text-[14px] text-white/80">
                  <L en="Solo, end to end" zh="独立完成" />
                </p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Files" zh="设计文件" />
                </p>
                <a href={figma.tripPlanner} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  Figma ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IN THE CAR: parked, then driving */}
      <section className="mt-28 flex flex-col gap-28 md:mt-40 md:gap-40">
        <Divider>
          <L en="In the car · before pulling away" zh="车机端 · 出发之前" />
        </Divider>
        {CAR_PARKED.map((f, i) => (
          <CarFlow key={f.t} f={f} n={String(i + 1).padStart(2, "0")} />
        ))}
        <Divider>
          <L en="In the car · while driving" zh="车机端 · 行驶途中" />
        </Divider>
        {CAR_DRIVING.map((f, i) => (
          <CarFlow key={f.t} f={f} n={String(CAR_PARKED.length + i + 1).padStart(2, "0")} />
        ))}
      </section>

      {/* ON THE PHONE: planning ahead */}
      <section className="mt-36 flex flex-col gap-24 md:mt-52 md:gap-32">
        <Divider>
          <L en="On the phone · planning ahead" zh="手机端 · 提前规划" />
        </Divider>
        <Article title={<L en="Why the phone" zh="为什么需要手机" />}>
          <p>
            <L
              en="Nobody gets into the car and only then decides where to go today. Planning starts earlier, so the phone is the preparation: the trip is built there and the car picks it up."
              zh="没有人是坐上车之后才决定今天要去哪儿的。规划从更早开始，所以手机承担的是准备工作：行程在手机上建好，车机直接接上。"
            />
          </p>
        </Article>
        {PHONE_FLOWS.map((f) => (
          <PhoneFlow key={f.t} f={f} />
        ))}
      </section>

      {/* DESIGN SYSTEM */}
      <section className="mt-36 flex flex-col gap-16 md:mt-52 md:gap-20">
        <Divider>
          <L en="Design system" zh="设计规范" />
        </Divider>
        <Reveal className="px-3">
          <TripDesignSystem />
        </Reveal>
      </section>

      {/* RESEARCH, below the work */}
      <section className="mt-36 flex flex-col gap-16 md:mt-52 md:gap-20">
        <Divider>
          <L en="Research" zh="调研" />
        </Divider>
        <Article title={<L en="Why a multi-stop trip is still hard" zh="为什么多站点行程仍然很麻烦" />}>
          <p>
            <L
              en={<>Drivers already have navigation, search and AI assistants, yet a multi-stop trip still means <B>switching apps and stitching stops together by hand</B>. Suggestions arrive one at a time, so a beach and a meal suggested separately turn into detours.</>}
              zh={<>驾驶者已经有导航、搜索和 AI 助手，但多站点行程仍然意味着<B>在不同 App 之间切换、手动拼凑站点</B>。推荐一次只给一个，海滩和餐厅分开推荐，结果就变成了绕路。</>}
            />
          </p>
          <p>
            <L
              en={<>I read driver threads on Reddit and Xiaohongshu, interviewed five Tesla drivers, and compared Tesla, Xiaomi, Lucid and Mercedes. In a car <B>attention is the limit</B>: precision still matters, scattered features get lost, and no single layout fits every stage of a trip.</>}
              zh={<>我阅读了 Reddit 和小红书上的车主讨论，访谈了五位特斯拉车主，并对比了特斯拉、小米、Lucid 和奔驰。在车里，<B>注意力才是瓶颈</B>：精准依然重要，藏在菜单里的功能会被遗忘，也没有一种布局适合行程的每个阶段。</>}
            />
          </p>
        </Article>
        <Article title={<L en="Every flow, before any screen" zh="先梳理流程，再设计界面" />}>
          <p>
            <L
              en="Low-fidelity flows cover the whole system; the high-fidelity screens above are the most representative ones."
              zh="低保真流程覆盖了整个系统；上面的高保真界面是其中最有代表性的部分。"
            />{" "}
            <a href={figma.tripWireframes} target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
              <L en="All flows in Figma ↗" zh="在 Figma 中查看全部流程 ↗" />
            </a>
          </p>
        </Article>
        <Reveal className="mx-auto flex w-full max-w-[720px] flex-col gap-16 px-3 md:gap-20">
          {[
            ["wireframes-car-flows", "Low-fidelity wireframes of the in-car flows"],
            ["wireframes-phone-flows", "Low-fidelity wireframes of the phone flows"],
          ].map(([n, alt]) => (
            <a key={n} href={`${T}/${n}.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${T}/${n}.webp`} alt={alt} width={2000} height={1304} loading="lazy" className="block h-auto w-full rounded-[10px]" />
            </a>
          ))}
        </Reveal>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

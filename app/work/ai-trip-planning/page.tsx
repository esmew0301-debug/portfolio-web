import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
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

// In the car: each section explained with its two or three most telling screens.
const SCENES: { n: string; t: string; tz: string; d: string; dz: string; imgs: [string, string][] }[] = [
  {
    n: "01",
    t: "Start with an intention",
    tz: "从意图开始",
    d: "Say what you want to do (“replace the third stop with a highly rated Italian place for dinner”). The AI weighs distance, ratings and timing, then shows the new stop in place before anything changes.",
    dz: "说出想做什么（“把第三站换成一家评分高的意大利餐厅吃晚饭”）。AI 会权衡距离、评分和时间，并在生效前把新站点直接显示在路线中。",
    imgs: [
      ["ai-1", "Trip plan with an AI prompt asking to replace a stop with an Italian restaurant"],
      ["ai-2", "The AI explaining how it picks the best Italian restaurant for the trip"],
      ["ai-3", "The suggested restaurant shown in the plan, waiting for confirmation"],
    ],
  },
  {
    n: "02",
    t: "Edit by hand",
    tz: "手动调整",
    d: "Every stop can still be moved, removed or changed by touch, when that is quicker than asking.",
    dz: "每个站点仍然可以手动移动、删除或修改，在那更快的时候。",
    imgs: [
      ["manual-1", "Trip plan with one stop open for manual editing"],
      ["manual-2", "The route after a stop is edited by hand"],
    ],
  },
  {
    n: "03",
    t: "Add a stop, find parking",
    tz: "添加站点，寻找停车",
    d: "Nearby places appear along the route, not as a separate search, and parking is found around the destination before arrival.",
    dz: "附近的地点沿路线出现，而不是单独搜索；到达前就在目的地周围找好停车位。",
    imgs: [
      ["add-stop-1", "Adding a stop: nearby coffee shops along the route"],
      ["add-stop-3", "A coffee shop added to the route"],
      ["parking", "Parking options around the destination"],
    ],
  },
  {
    n: "04",
    t: "Proactive charging",
    tz: "主动提醒充电",
    d: "Charging is planned into the route before the battery becomes a problem, with lane-level guidance to the exit.",
    dz: "在电量成为问题之前，就把充电安排进路线，并提供到出口的车道级引导。",
    imgs: [
      ["charging-1", "A charging suggestion on the route"],
      ["charging-2", "Navigation to a charging stop, Exit 87 in 1.2 miles"],
      ["charging-3", "Lane-level guidance close to the exit"],
    ],
  },
  {
    n: "05",
    t: "Adaptive planning",
    tz: "随时调整的计划",
    d: "When a place closes or you stay too long, the plan suggests an alternative instead of breaking.",
    dz: "当目的地关门或停留超时，计划会给出替代方案，而不是就此作废。",
    imgs: [
      ["adapt-1", "The AI noticing that the next stop will be closed on arrival"],
      ["adapt-2", "An alternative suggested near the route"],
    ],
  },
];

const ph = (n: string, alt: string) => ({ src: `${T}/${n}.webp`, alt });
// On the phone: three short groups, three screens each.
const PHONE_GROUPS: { t: string; tz: string; d: string; dz: string; shots: { src: string; alt: string }[] }[] = [
  {
    t: "Plan with AI",
    tz: "用 AI 规划",
    d: "Describe the day in a sentence; the route is optimised for departure time and traffic.",
    dz: "用一句话描述这一天，路线会根据出发时间和交通情况自动优化。",
    shots: [ph("phone-ai-1", "Describing the trip to the AI"), ph("phone-ai-2", "The AI generating the route"), ph("phone-ai-3", "The planned multi-stop route")],
  },
  {
    t: "Build it by hand",
    tz: "手动搭建",
    d: "Search, filter by type, and add favourites with one tap.",
    dz: "搜索、按类型筛选，并一键添加常去的地方。",
    shots: [ph("phone-manual-1", "Starting a trip by hand"), ph("phone-manual-3", "Search with quick add and favourites"), ph("phone-manual-4", "Search results with Add")],
  },
  {
    t: "Saved trips & preferences",
    tz: "保存的行程与偏好",
    d: "Trips are saved by date, and preferences shape every suggestion.",
    dz: "行程按日期保存，偏好设置会影响每一条推荐。",
    shots: [ph("phone-schedule-1", "Saved trips by date"), ph("phone-schedule-3", "A month of trips"), ph("phone-prefs-1", "Travel preferences")],
  },
];

// Final design: every screen.
const CAR_ALL = ["ai-1", "ai-2", "ai-3", "ai-4", "manual-1", "manual-2", "add-stop-1", "add-stop-2", "add-stop-3", "add-stop-4", "parking", "explore-1", "explore-2", "charging-1", "charging-2", "charging-3", "charging-4", "adapt-1", "adapt-2", "adapt-3"];
const PHONE_ALL = [
  "phone-ai-1", "phone-ai-2", "phone-ai-3", "phone-ai-4", "phone-ai-5",
  "phone-manual-1", "phone-manual-2", "phone-manual-3", "phone-manual-4", "phone-manual-5",
  "phone-schedule-1", "phone-schedule-2", "phone-schedule-3", "phone-schedule-4", "phone-schedule-5",
  "phone-prefs-1", "phone-prefs-2",
].map((n) => ph(n, `Phone screen: ${n.replace("phone-", "").replace("-", " ")}`));

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
    <div className="rounded-[14px] border border-white/60 bg-[#1c1c1c] p-2.5 md:p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${T}/${n}.webp`} alt={alt} loading="lazy" className="block h-auto w-full rounded-[8px]" />
    </div>
  );
}

/** Phone screens, three to a row. */
function Phones({ shots }: { shots: { src: string; alt: string }[] }) {
  const rows: { src: string; alt: string }[][] = [];
  for (let i = 0; i < shots.length; i += 3) rows.push(shots.slice(i, i + 3));
  return (
    <Reveal className="flex flex-col gap-[6vw] px-[4%] py-[4vw]">
      {rows.map((r, k) => (
        <div key={k} className="flex justify-center gap-[6%]">
          {r.map((x) => (
            <Shot key={x.src} {...x} frame className="w-[27%] max-w-[256px] md:w-[18%]" />
          ))}
        </div>
      ))}
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

      {/* IN THE CAR: scenes, a note left and the screen right */}
      <section className="mt-28 flex flex-col gap-28 md:mt-40 md:gap-44">
        <Divider>
          <L en="In the car" zh="车机端" />
        </Divider>
        {SCENES.map((s) => (
          <div key={s.n} className="grid gap-6 px-3 md:grid-cols-[1fr_2fr] md:gap-8">
            <Reveal className="md:sticky md:top-24 md:self-start md:pt-6">
              <p className={LABEL}>{s.n}</p>
              <p className="mt-1 text-[14px] text-white">
                <L en={s.t} zh={s.tz} />
              </p>
              <p className="mt-1.5 max-w-[340px] text-[13px] leading-[20px] text-white/55">
                <L en={s.d} zh={s.dz} />
              </p>
            </Reveal>
            <Reveal className="flex flex-col gap-4">
              {s.imgs.map(([n, alt]) => (
                <Car key={n} n={n} alt={alt} />
              ))}
            </Reveal>
          </div>
        ))}
      </section>

      {/* ON THE PHONE: three to a row */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Divider>
          <L en="On the phone" zh="手机端" />
        </Divider>
        <Article title={<L en="Plan ahead, take it with you" zh="提前规划，随车带走" />}>
          <p>
            <L
              en="The phone is where there is time to plan: describe the day, add or swap stops, and save trips by date. The car picks the plan up, so nothing is entered twice."
              zh="手机是有时间规划的地方：描述这一天、添加或替换站点、按日期保存行程。车机会接上这份计划，不必重复输入。"
            />
          </p>
        </Article>
        {PHONE_GROUPS.map((g) => (
          <div key={g.t} className="flex flex-col gap-2">
            <Article title={<L en={g.t} zh={g.tz} />}>
              <p>
                <L en={g.d} zh={g.dz} />
              </p>
            </Article>
            <Phones shots={g.shots} />
          </div>
        ))}
      </section>

      {/* FINAL DESIGN: every screen */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Divider>
          <L en="Final design" zh="最终设计" />
        </Divider>
        <Article title={<L en="Every screen" zh="全部界面" />}>
          <p>
            <L en={`${CAR_ALL.length} car screens and ${PHONE_ALL.length} phone screens.`} zh={`共 ${CAR_ALL.length} 个车机界面和 ${PHONE_ALL.length} 个手机界面。`} />
          </p>
        </Article>
        <Reveal className="grid gap-4 px-3 md:grid-cols-2">
          {CAR_ALL.map((n) => (
            <Car key={n} n={n} alt={`Car screen: ${n.replace("-", " ")}`} />
          ))}
        </Reveal>
        <Phones shots={PHONE_ALL} />
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
        <Article
          title={<L en="Every flow, before any screen" zh="先梳理流程，再设计界面" />}
          media={
            <div className="flex flex-col gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${T}/wireframes-car-flows.webp`} alt="Low-fidelity wireframes of the in-car flows" width={2000} height={1304} loading="lazy" className="block h-auto w-full rounded-[10px]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${T}/wireframes-phone-flows.webp`} alt="Low-fidelity wireframes of the phone flows" width={2000} height={1304} loading="lazy" className="block h-auto w-full rounded-[10px]" />
            </div>
          }
        >
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
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

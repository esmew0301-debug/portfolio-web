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

const SCENES: { n: string; t: string; tz: string; d: string; dz: string; img: string; w: number; h: number; alt: string }[] = [
  {
    n: "01",
    t: "Start with an intention",
    tz: "从意图开始",
    d: "Say what you want to do (“replace the third stop with a highly rated Italian place for dinner”) and the AI rebuilds the whole route.",
    dz: "说出想做什么（“把第三站换成一家评分高的意大利餐厅吃晚饭”），AI 会重新规划整条路线。",
    img: "ai-1",
    w: 1632,
    h: 994,
    alt: "In-car trip plan with an AI prompt asking to replace a stop with an Italian restaurant",
  },
  {
    n: "02",
    t: "Confirm, then go",
    tz: "确认后出发",
    d: "The new stop is shown in place, with the time it adds, before anything changes.",
    dz: "新站点会直接显示在路线中，并标出增加的时间，确认后才会生效。",
    img: "ai-3",
    w: 1632,
    h: 1030,
    alt: "The AI's suggested Italian restaurant shown in the plan, waiting for confirmation",
  },
  {
    n: "03",
    t: "Edit by hand",
    tz: "手动调整",
    d: "Every stop can still be moved, removed or changed by touch, when that is quicker than asking.",
    dz: "每个站点仍然可以手动移动、删除或修改，在那更快的时候。",
    img: "manual-1",
    w: 1632,
    h: 1019,
    alt: "Trip plan with one stop open for manual editing",
  },
  {
    n: "04",
    t: "Proactive charging",
    tz: "主动提醒充电",
    d: "Charging is planned into the route before the battery becomes a problem, with lane-level guidance to the exit.",
    dz: "在电量成为问题之前，就把充电安排进路线，并提供到出口的车道级引导。",
    img: "charging-2",
    w: 1632,
    h: 940,
    alt: "Navigation to a charging stop, Exit 87 in 1.2 miles",
  },
  {
    n: "05",
    t: "Adaptive planning",
    tz: "随时调整的计划",
    d: "When a place closes or you stay too long, the plan suggests an alternative instead of breaking.",
    dz: "当目的地关门或停留超时，计划会给出替代方案，而不是就此作废。",
    img: "adapt-2",
    w: 1632,
    h: 940,
    alt: "Map with an alternative restaurant suggested near the route",
  },
];

const PHONE = [
  ["phone-ai-1", "Phone: describing the trip to the AI"],
  ["phone-ai-3", "Phone: the planned multi-stop route"],
  ["phone-manual-3", "Phone: adding a stop by hand"],
  ["phone-manual-4", "Phone: search results with quick add"],
  ["phone-schedule-1", "Phone: saved trips by date"],
  ["phone-prefs-1", "Phone: travel preferences"],
].map(([n, alt]) => ({ src: `${T}/${n}.webp`, alt }));

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
            <Reveal>
              <div className="rounded-[14px] border border-white/60 bg-[#1c1c1c] p-2.5 md:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${T}/${s.img}.webp`} alt={s.alt} width={s.w} height={s.h} loading="lazy" className="block h-auto w-full rounded-[8px]" />
              </div>
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
        <Reveal className="flex flex-col gap-[6vw] px-[4%] py-[4vw]">
          {[PHONE.slice(0, 3), PHONE.slice(3)].map((row, k) => (
            <div key={k} className="flex justify-center gap-[6%]">
              {row.map((x) => (
                <Shot key={x.src} {...x} frame className="w-[27%] max-w-[256px] md:w-[18%]" />
              ))}
            </div>
          ))}
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

import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import {
  BigSequence,
  Cards,
  Chip,
  ChipFlow,
  ChipGroup,
  Container,
  Contrast,
  Eyebrow,
  P,
  Pull,
  Section,
  Stack,
  Box,
  Statement,
  Utterance,
  WideSection,
} from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { ShinyButton } from "@/components/ui/shiny-button";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { Reveal } from "@/components/case/reveal";
import { StageFlow } from "@/components/case/stage-flow";
import { FlowPanel, PhoneStory, Shot, Slideshow, type Screen } from "@/components/case/visuals";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person, selectedWork } from "@/lib/content";
import PHONES from "@/lib/trip-phones.json";
import { bi, L, LB } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `From Navigation to Intention — ${person.name}`,
  description:
    "A concept for an AI trip planner that builds a multi-stop trip from what a driver wants to do, across phone and car.",
};

const NAV: CaseNavItem[] = [
  { id: "problem", index: "01", label: "The Problem" },
  { id: "research", index: "02", label: "Research" },
  { id: "insights", index: "03", label: "Key Insights" },
  { id: "principles", index: "04", label: "Design Principles" },
  { id: "color", index: "05", label: "Color & Materials" },
  { id: "shift", index: "06", label: "The Design Shift" },
  { id: "wireframes", index: "07", label: "Low-Fidelity Flows" },
  { id: "concept", index: "08", label: "AI Trip Planning" },
  { id: "phone", index: "09", label: "Planning on the Phone" },
  { id: "handoff", index: "10", label: "Past Trips" },
  { id: "in-car", index: "11", label: "The In-Car Plan" },
  { id: "driving", index: "12", label: "While Driving" },
  { id: "adapt", index: "13", label: "Adaptive Planning" },
  { id: "final", index: "14", label: "Final Experience" },
  { id: "reflection", index: "15", label: "Reflection" },
];

const ROLES = [
  "UX/UI Designer",
  "User Research",
  "Interaction Design",
  "Information Architecture",
  "Product Strategy",
  "Prototyping",
];

const COMPETITORS = [
  { name: "Tesla", finding: bi("Strong navigation, but planning starts after the destination is known.", "导航能力很强，但行程规划要等目的地确定之后才开始。") },
  {
    name: "Xiaomi",
    finding: bi(
      "Strong AI planning, but better at generating destinations than coordinating a trip as intent changes.",
      "AI 规划能力强，但更擅长生成目的地，而不是在用户意图变化时协调整段行程。",
    ),
  },
  { name: "Lucid", finding: bi("A polished interface with AI-assisted navigation, but limited proactive trip planning.", "界面精致，也有 AI 辅助导航，但主动规划行程的能力有限。") },
  { name: "Mercedes", finding: bi("Advanced conversational AI, but trip planning remains destination-driven.", "对话式 AI 很先进，但行程规划仍然以目的地为起点。") },
];

const PRINCIPLES = [
  {
    title: "Context-aware information",
    zh: "按情境呈现信息",
    body: bi("Show what the current stage of the trip needs, not everything at once.", "只显示当前行程阶段需要的信息，而不是一次把所有内容摆出来。"),
  },
  {
    title: "Low-attention interaction",
    zh: "尽量少占用注意力",
    body: bi(
      "Each step should take as little attention as possible, especially once the car is moving.",
      "每一步操作都应尽量少占用驾驶者的注意力，车辆行驶时尤其如此。",
    ),
  },
  {
    title: "Context-aware suggestions, with the driver in control",
    zh: "基于情境主动建议，决定权在驾驶者",
    body: bi(
      "Suggest before being asked, say what prompted it, and let the driver accept or change it.",
      "在驾驶者开口之前给出建议，说明是什么触发了这条建议，再由驾驶者决定接受还是修改。",
    ),
  },
  {
    title: "Predictable personalization",
    zh: "可预期的个性化",
    body: bi("Preferences shape the plan in ways the driver can predict and override.", "偏好会影响行程，但影响方式是驾驶者能预料到的，也随时可以推翻。"),
  },
  {
    title: "Clear information hierarchy",
    zh: "清晰的信息层级",
    body: bi("One primary decision at a time; detail only when needed.", "一次只呈现一个主要决策，细节在需要时再展开。"),
  },
];

// Screens, on a shared scale per device so frames of a sequence line up.
// In-vehicle frames: an 882px-wide display. Phone frames: 1000px tall.
const S = "/images/trip-planning";
const hu = (name: string, w: number, h: number, alt: string, step?: ReactNode): Screen => ({
  src: `${S}/${name}.webp`,
  w,
  h,
  alt,
  step,
});
// Size (1000-tall units) and corner radii of each trimmed phone image, from tools/trim_phone_canvas.py.
const ph = (name: keyof typeof PHONES, alt: string, step: ReactNode, detail: ReactNode): Screen => ({
  src: `${S}/phone-${name}.webp`,
  ...PHONES[name],
  alt,
  step,
  detail,
});

const PHONE_PREFS_EXPRESS = ph("prefs-1",
  "Trip-planning preferences: place types, Favorites and Calendar quick-add, Less Driving and Lower Cost",
  "",
  "",
);
// Express / Plan shown as full phone mockups (tools/phone_mockup_still.py: body, status bar, shadow baked in).
const MOCK = { w: 740, h: 1549, radius: undefined };
const PHONE_PREFS_PLAN = ph("prefs-2", "AI-prepared route with five stops based on the user's preferences", "", "");

const PHONE_MANUAL = [
  ph("manual-1", "Manual trip planning with Search To Add, categories, and previous preferences", bi("Start a plan", "开始规划"), bi("Skip AI and planning opens here: search, categories, and places from past trips.", "跳过 AI 时会进入这里：可以搜索、按类别浏览，或从过往行程中挑选地点。")),
  ph("manual-2", "Search field with the keyboard open", bi("Search for a place", "搜索地点"), bi("Type a name like Starbucks; recent places appear below.", "输入名称，比如 Starbucks，下方会列出最近去过的地点。")),
  ph("manual-3", "Nearby Starbucks locations on the map with an Add button", bi("Pick a nearby location", "选择附近的门店"), bi("Nearby Starbucks appear with rating, hours, price, and drive time. Tap Add.", "附近的 Starbucks 会显示评分、营业时间、价格和车程，点击 Add 即可添加。")),
  ph("manual-4", "Route to Starbucks with total driving time and Save and Add buttons", bi("Save, or keep going", "保存，或继续添加"), bi("The route appears with total driving time. Save ends planning; Add returns for another stop.", "页面会显示路线和总车程。点击 Save 结束规划，点击 Add 返回继续添加下一站。")),
  ph("manual-5", "Trip-planning screen again with Starbucks checked as the first stop", bi("Add the next stop", "添加下一站"), bi("Starbucks is checked off; the next stop can be a restaurant, coffee, or a hotel.", "Starbucks 已被勾选，下一站可以是餐厅、咖啡店或酒店。")),
];

const PHONE_AI = [
  ph("ai-1", "Natural-language request to go to the airport and then a seafood dinner", bi("Describe the day", "说出这一天的安排"), bi("Tap the AI orb and say it: coffee, the airport to pick up a friend, then a seafood dinner.", "点击 AI 按钮直接说出来：先喝杯咖啡，再去机场接朋友，最后吃一顿海鲜晚餐。")),
  ph("ai-2", "AI-suggested restaurants that match the request and preferences, with Add buttons", bi("Review what AI suggests", "查看 AI 的推荐"), bi("AI suggests restaurants that fit the request and past preferences. Add one.", "AI 会根据这次的需求和过往偏好推荐餐厅，选一家添加即可。")),
  ph("ai-3", "AI optimizing the route for the departure time", bi("AI builds the route", "AI 生成路线"), bi("AI orders the stops around the departure time, avoiding traffic.", "AI 围绕出发时间安排各站顺序，并避开拥堵路段。")),
  ph("ai-4", "Full route through Starbucks, the airport, and the restaurant with total driving time", bi("The finished trip", "完整的行程"), bi("The whole day on one route, with total driving time.", "一整天的安排都在一条路线上，并显示总车程。")),
  ph("ai-5", "Save sheet with Add Title, Add Color, and Add Description", bi("Save it", "保存行程"), bi("Give the trip a title, a color, and a description.", "为这段行程设置标题、颜色和描述。")),
];

const PHONE_SCHEDULE = [
  ph("schedule-1", "August schedule with each day's color, stops, and location, and Make A Plan on today", bi("Open the schedule", "打开日程"), bi("Every planned day with its color, stops, and location. Any future date can be planned here.", "每个已规划的日子都会显示对应的颜色、站点和地点，也可以在这里规划未来的任意一天。")),
  ph("schedule-2", "Saturday's saved trip with its stops, times, and total driving time", bi("Today's trip", "今天的行程"), bi("The saved trip, stop by stop, with times between each.", "已保存的行程按站点逐一列出，并标注每段之间所需的时间。")),
  ph("schedule-3", "July schedule grouped by week with a Today button", bi("Browse by week", "按周浏览"), bi("Other weeks fold into groups; Today jumps back.", "其他周会折叠成分组，点击 Today 可以回到今天。")),
  ph("schedule-4", "July days expanded to show each route's stops", bi("Open a day", "展开某一天"), bi("Tap a day to open its route, stop by stop.", "点击某一天，即可按站点查看当天的路线。")),
  ph("schedule-5", "Detailed Dating Day view with map, places, driving time, and battery usage", bi("Tap again for the full details", "再次点击查看详情"), bi("Tap again for the full route: map, places, driving time, and battery usage.", "再点一次可以看到完整路线，包括地图、地点、车程和电量消耗。")),
];

const HU_MANUAL = [
  hu("manual-1", 882, 552, "Trip plan panel with Lofty Coffee selected", bi("Open the trip plan and select a stop", "打开行程列表，选中一站")),
  hu("manual-2", 882, 508, "Trip plan search field with the on-screen keyboard open", bi("Search to replace it", "搜索要替换的地点")),
];

const HU_AI = [
  hu("ai-1", 882, 538, "Request to replace the third stop with a highly rated Italian restaurant", bi("Ask AI for a change", "让 AI 修改行程")),
  hu("ai-2", 1052, 539, "AI evaluating nearby Italian restaurants", bi("AI finds the best match", "AI 找到最合适的选项")),
  hu("ai-3", 882, 558, "Bencotto Italian Kitchen proposed in the trip plan with Save Changes", bi("Review and save", "确认并保存")),
  hu("ai-4", 882, 542, "Updated trip plan with the new restaurant and route", bi("Itinerary updated", "行程已更新")),
];

const HU_ADD_STOP = [
  hu("add-stop-1", 882, 508, "Search To Add field between two stops in the itinerary", bi("Choose where to add", "选择插入的位置")),
  hu("add-stop-2", 882, 508, "Starbucks locations along the route", bi("Nearby Starbucks on the route", "沿途附近的 Starbucks")),
  hu("add-stop-3", 882, 508, "Selected Starbucks with its detour and place card", bi("Pick one, preview the detour", "选择一家，预览绕行距离")),
  hu("add-stop-4", 882, 508, "Updated itinerary with Starbucks between La Jolla Cove and Lofty Coffee", bi("Stop inserted", "新站点已插入")),
];

const HU_PARKING = [hu("parking", 882, 508, "Parking lots marked around La Jolla Cove", bi("Parking near the stop", "目的地附近的停车场"))];

const HU_CHARGING = [
  hu("charging-1", 1057, 508, "AI reporting low battery and two charging options along the route", bi("Battery low: AI finds two options", "电量不足：AI 找到两个充电站")),
  hu("charging-2", 882, 508, "Charging stations along the route, with the recommended one marked by a yellow star", bi("The recommended charger is starred", "推荐的充电站带有星标")),
  hu("charging-3", 882, 508, "Navigation rerouted to the chosen charging station", bi("Route to the charger", "导航前往充电站")),
  hu("charging-4", 882, 508, "Driving view with navigation to the charger", bi("Then on to the next stop", "充电后继续前往下一站")),
];

const HU_ADAPT = [
  hu("adapt-1", 1053, 508, "AI warning that Lofty Coffee will be closed on arrival", bi("The next stop will be closed", "下一站在到达时已关门")),
  hu("adapt-2", 882, 508, "Coastal Table suggested as an open alternative", bi("An open alternative", "一个仍在营业的替代选项")),
  hu("adapt-3", 882, 508, "Revised route with navigation started", bi("New route, navigation starts", "生成新路线，开始导航")),
];

const MORE = selectedWork.filter((w) => w.label === "Posse.io" || w.label === "End of an Era");

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

/** A chapter inside a wide section: heading and short text side by side, then a full-width visual. */
function Chapter({ label, title, text, children }: { label: string; title: ReactNode; text: ReactNode; children?: ReactNode }) {
  return (
    <div className="border-t border-white/[0.08] pt-12 md:pt-16">
      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16">
        <div>
          <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
          <h3 className="font-blinker mt-3 max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
            {title}
          </h3>
        </div>
        <div className="flex flex-col gap-5">{text}</div>
      </Reveal>
      {children && <Reveal className="mt-10 md:mt-14">{children}</Reveal>}
    </div>
  );
}

/** Key phrase: the TextShimmer sweep, recoloured to the HMI navy. */
function Shimmer({ children }: { children: string }) {
  return (
    <TextShimmer as="span" duration={2.6} spread={1.2} className="shimmer-hmi inline font-semibold">
      {children}
    </TextShimmer>
  );
}

function TwoCol({ children }: { children: ReactNode }) {
  return <div className="grid gap-9 md:grid-cols-2 md:gap-16">{children}</div>;
}

export default function TripPlanningCaseStudy() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-black">
        <Image
          src="/images/trip-planner-hero2.jpg"
          alt="The trip-planning map on an angled in-car display"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_52%]"
        />
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.45)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#3b82f6" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* Title */}
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
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">AI Trip Planning · Automotive HMI</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(36px,6vw,88px)] font-medium leading-[0.98] tracking-[-0.01em] text-white">
                  From Navigation to Intention
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  <L
                    en="A concept for an AI trip planner that builds a multi-stop trip from what a driver wants to do, and helps adjust it on the road."
                    zh="一个 AI 行程规划的概念设计：从驾驶者想做的事出发，生成多站点行程，并在路上帮助随时调整。"
                  />
                </p>
              </Reveal>
            </Container>
          </section>

          {/* Intro + metadata */}
          <section className="pb-16 pt-12 md:pt-16">
            <Container>
              <Reveal>
                <div className="font-gilroy max-w-[68ch] space-y-6 text-[clamp(20px,2.4vw,28px)] leading-[1.5] tracking-[-0.01em] text-neutral-100">
                  <LB
                    en={
                      <>
                        <p>
                          I started by exploring how an in-car interface could make navigation and trip information easier to access.
                        </p>
                        <p>
                          Talking with drivers, I found that the harder part was planning: a multi-stop trip meant switching between apps,
                          comparing options, and fixing the route by hand. So the project became a trip planner that works across phone and car.
                        </p>
                      </>
                    }
                    zh={
                      <>
                        <p>这个项目最初想探索的是：车载界面怎样才能让导航和行程信息更容易获取。</p>
                        <p>
                          和驾驶者聊过之后，我发现更难的其实是规划本身。安排一段多站点行程，往往要在好几个 App 之间来回切换、比较选项，再手动调整路线。于是项目的方向变成了一个横跨手机和车机的行程规划工具。
                        </p>
                      </>
                    }
                  />
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Client"><L en="Self-Initiated Concept Project" zh="个人发起的概念项目" /></Meta>
                <Meta label="Timeline">2026</Meta>
                <Meta label="Platform"><L en="In-Vehicle Infotainment + Mobile Companion App" zh="车载信息娱乐系统 + 手机配套 App" /></Meta>
                <Meta label="Link">
                  <a
                    href={figma.tripPlanner}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-fit items-center gap-1 transition-colors hover:text-[var(--accent-green)]"
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                      Figma File
                    </span>
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </a>
                </Meta>
              </div>
            </Container>
          </section>

          <section className="py-8">
            <Container>
              <InfoRow label="My Role">
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <Chip key={r} variant="role">
                      {r}
                    </Chip>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="Core Idea">
                <P>
                  <L
                    en={<>Traditional navigation begins with a destination. This system begins with an <Shimmer>{"intention"}</Shimmer>, and plans the journey
                  around it.</>}
                    zh={<>传统导航从目的地开始，而这个系统从<Shimmer>{"出行意图"}</Shimmer>开始，再围绕它规划整段行程。</>}
                  />
                </P>
              </InfoRow>
              <InfoRow label="Design Files">
                <P>
                  <L
                    en="Low-fidelity designs cover the full flow; high-fidelity designs cover the most representative screens."
                    zh="低保真设计覆盖了完整流程，高保真设计则呈现了最具代表性的界面。"
                  />
                </P>
                <div>
                  <ShinyButton href={figma.tripPlanner} target="_blank" rel="noopener noreferrer">
                    Open in Figma ↗
                  </ShinyButton>
                </div>
              </InfoRow>
            </Container>
          </section>

          {/* 01 — THE PROBLEM */}
          <Section id="problem" index="01" label="The Problem" title={<L en="Planning a multi-stop trip still takes a lot of manual work." zh="规划一段多站点行程，仍然需要大量手动操作。" />}>
            <P>
              <L
                en="I expected drivers to want more information on screen. What came up more often was the work of putting a trip together."
                zh="我原本以为驾驶者想在屏幕上看到更多信息，但他们提得更多的，其实是把一段行程拼起来有多费事。"
              />
            </P>
            <Box label="Finding">
              <L
                en="Drivers already have navigation, search, and AI assistants, yet a multi-stop trip still means switching apps and stitching stops together by hand."
                zh="驾驶者手里已经有导航、搜索和 AI 助手，可一旦要安排多站点行程，还是得在不同 App 之间切换，再手动把各站串起来。"
              />
            </Box>
            <P>
              <L
                en="Recommendations arrive one at a time, so a beach and a meal suggested separately turn into detours."
                zh="推荐结果总是一条一条给出，海滩和餐厅分开推荐，连在一起就成了绕路。"
              />
            </P>
            <P>
              <L
                en={<>And in a car, every decision competes with the road. Screen space matters less than{" "}
              <Shimmer>{"the attention it takes to switch between road and interface"}</Shimmer>.</>}
                zh={<>而在车里，每一个决定都在和路况争夺注意力。比起屏幕空间，更关键的是<Shimmer>{"在路面和界面之间切换所消耗的注意力"}</Shimmer>。</>}
              />
            </P>
            <Pull label="Core problem">
              <LB
                en={
                  <>
                    <p>Help drivers plan and adjust a multi-stop trip</p>
                    <p>with as little interaction as possible while they&apos;re on the road.</p>
                  </>
                }
                zh={
                  <>
                    <p>帮助驾驶者规划和调整多站点行程，</p>
                    <p>并让他们在路上尽量少操作。</p>
                  </>
                }
              />
            </Pull>
          </Section>

          {/* 02 — RESEARCH */}
          <Section id="research" index="02" label="Research" title={<L en="Listening to drivers, and studying the systems they already use." zh="倾听驾驶者，也研究他们正在用的系统。" />}>
            <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
              {[
                { n: "5", l: "Tesla driver interviews", zh: "位 Tesla 车主访谈" },
                { n: "10", l: "Online communities across Reddit and Xiaohongshu", zh: "个 Reddit 和小红书上的线上社区" },
                { n: "4", l: "Automotive systems analyzed", zh: "个车载系统分析" },
              ].map((s) => (
                <div key={s.l}>
                  <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                  <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]"><L en={s.l} zh={s.zh} /></span>
                </div>
              ))}
            </div>
            <P>
              <L
                en="I read driver threads on Reddit and Xiaohongshu and interviewed five Tesla drivers about what they use and what distracts them."
                zh="我阅读了 Reddit 和小红书上驾驶者的讨论帖，并访谈了五位 Tesla 车主，了解他们平时用哪些功能、哪些东西会让他们分心。"
              />
            </P>
            <StaggerTestimonials
              items={[
                {
                  quote: <L en="“After a long day, I don't want to spend another 20 minutes comparing restaurants, checking reviews, and figuring out where to go.”" zh="“忙了一整天之后，我不想再花 20 分钟比较餐厅、看评价、琢磨要去哪儿。”" />,
                  by: "Driver, user research",
                },
                {
                  quote: <L en="“Sometimes I carefully plan my whole day, but I stay longer than expected at one place. By the time I leave, my next destination is already closed, and I have to stop and search for another place nearby.”" zh="“有时候我把一整天都规划好了，结果在某个地方待得比预想久。等我离开时，下一个目的地已经关门，只能停下来在附近重新找地方。”" />,
                  by: "Driver, user research",
                },
                {
                  quote: <L en="“When my dog is in the car, I want recommendations that already understand my situation instead of making me filter everything myself.”" zh="“狗狗在车上的时候，我希望推荐能直接考虑到我的情况，而不是让我自己一个个去筛选。”" />,
                  by: "Driver, user research",
                },
                {
                  quote: <L en="“When friends visit San Diego, I honestly don't know where to take them anymore. I've lived here for a while, so all the usual places feel boring, but I also don't know any new hidden spots.”" zh="“朋友来圣地亚哥玩的时候，我真的不知道还能带他们去哪儿。在这里住久了，常去的地方都觉得没意思，可我也不知道还有什么新的小众去处。”" />,
                  by: "Driver, user research",
                },
                {
                  quote: <L en="“I spend so much time looking on Google, reviews, Instagram, or even calling up or asking in person — but still the info isn't always trustworthy.”" zh="“我花了很多时间在 Google、评价网站和 Instagram 上查，甚至打电话或当面问，可得到的信息还是不一定可靠。”" />,
                  by: "Reddit, user research",
                },
                {
                  quote: <L en="“I make 10–12 page Google Docs laying out every detail and then never even glance at it while on the actual trip. There's a plan, but there's flexibility in it for spontaneity.”" zh="“我会写一份 10 到 12 页的 Google 文档，把每个细节都列出来，结果真出发了却一眼都不看。计划是有的，但也给临时起意留了余地。”" />,
                  by: "Reddit, user research",
                },
                {
                  quote: <L en="“I love to screenshot directions and places we're going to see in case we lose service... then completely change the plan anyway.”" zh="“我喜欢把路线和要去的地方都截图存下来，以防没信号……结果最后还是把计划全改了。”" />,
                  by: "Reddit, user research",
                },
              ]}
            />
            <div>
              <Eyebrow>Competitive landscape</Eyebrow>
              <P>
                <L
                  en={<>Tesla, Xiaomi, Lucid, and Mercedes, studied for how each handles the driver&apos;s attention.</>}
                  zh="我分析了 Tesla、Xiaomi、Lucid 和 Mercedes，重点看它们各自如何处理驾驶者的注意力。"
                />
              </P>
            </div>
            <ChipGroup
              label="What I compared"
              items={["Navigation", "Information density", "Personalization", "Multitasking", "AI assistance", "Interaction complexity", "Driver attention"]}
            />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {COMPETITORS.map((c) => (
                <div key={c.name} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <span className="font-blinker text-[18px] font-medium text-white">{c.name}</span>
                  <span className="font-gilroy text-[16px] leading-[1.6] text-neutral-400">{c.finding}</span>
                </div>
              ))}
            </div>
            <Box label="Takeaway">
              <L
                en={<>Current systems handle navigation and voice well, but still expect the driver to{" "}
              <Shimmer>{"name a destination and connect the decisions themselves"}</Shimmer>.</>}
                zh={<>现有系统在导航和语音上做得不错，但仍然要求驾驶者<Shimmer>{"自己说出目的地，再自己把各个决定串起来"}</Shimmer>。</>}
              />
            </Box>
          </Section>

          {/* 03 — KEY INSIGHTS */}
          <WideSection id="insights" index="03" label="Key Insights" title={<L en="What the research pointed to." zh="研究揭示了什么。" />}>
            <Cards
              columns={4}
              items={[
                { index: "01", title: <L en="Attention is the limit" zh="注意力才是瓶颈" />, body: <p><L en="Each glance away from the road has a cost." zh="每一次视线离开路面，都有代价。" /></p> },
                { index: "02", title: <L en="Precision still matters" zh="精确依然重要" />, body: <p><L en="Drivers still want lane-level guidance." zh="驾驶者仍然需要车道级的引导。" /></p> },
                { index: "03", title: <L en="Scattered features get lost" zh="分散的功能容易被遗忘" />, body: <p><L en="Drivers mentioned rarely using features buried in menus." zh="驾驶者提到，藏在菜单深处的功能他们很少用。" /></p> },
                { index: "04", title: <L en="No layout fits every stage" zh="没有一种布局适合所有阶段" />, body: <p><L en="Before a trip and while driving need different things." zh="出发前和行驶中，驾驶者需要的东西完全不同。" /></p> },
              ]}
            />
          </WideSection>

          {/* 04 — DESIGN PRINCIPLES */}
          <WideSection id="principles" index="04" label="Design Principles" title={<L en="Five principles behind every screen." zh="贯穿每个界面的五条原则。" />}>
            <Stack>
              <ol className="border-t border-white/10">
                {PRINCIPLES.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/10 py-7 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-8">
                    <span className="font-blinker text-[16px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sulphur text-[clamp(22px,2.2vw,32px)] leading-[1.15] tracking-[-0.01em] text-white"><L en={p.title} zh={p.zh} /></span>
                    <span className="font-gilroy col-start-2 text-[16px] leading-[1.6] text-neutral-400 md:col-start-3">{p.body}</span>
                  </li>
                ))}
              </ol>
              <Statement label="Guiding principle">
                <L
                  en={<>Show the decision the driver needs to make now, and keep the rest until it&apos;s useful.</>}
                  zh="只呈现驾驶者此刻需要做的决定，其他内容等用得上时再出现。"
                />
              </Statement>
            </Stack>
          </WideSection>

          {/* 05 — COLOR & MATERIALS */}
          <WideSection id="color" index="05" label="Color & Materials" title={<L en="High-contrast color on a dark base." zh="深色底上的高对比色彩。" />}>
            {/* Text stacked on the left, swatches beside it on the right */}
            <Reveal>
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-16">
                <div className="flex flex-col gap-6">
                  <P>
                    <L
                      en={<>Black, pure white, bright orange, bright purple, and light blue. I chose high-contrast colors so key information is{" "}
                    <Shimmer>{"easy to pick out quickly"}</Shimmer>.</>}
                      zh={<>黑、纯白、亮橙、亮紫和浅蓝。我选择高对比度的配色，让关键信息<Shimmer>{"一眼就能找到"}</Shimmer>。</>}
                    />
                  </P>
                  <P>
                    <L
                      en="On the dark navy base, the saturated accents stand out, which lets me use color to point to what matters most."
                      zh="在深海军蓝的底色上，高饱和度的强调色格外醒目，我可以借助颜色把注意力引向最重要的信息。"
                    />
                  </P>
                </div>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/trip-planning/palette.webp"
                    alt="The color palette: black #000000, purple #664BDC, orange #EB8037, and light blue #00B5FF"
                    width={1400}
                    height={1004}
                    loading="lazy"
                    className="block h-auto w-full rounded-[12px]"
                  />
                  <figcaption className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                    <L
                      en="Black #000000 · Purple #664BDC · Orange #EB8037 · Light blue #00B5FF, with pure white for text."
                      zh="黑 #000000 · 紫 #664BDC · 橙 #EB8037 · 浅蓝 #00B5FF，文字使用纯白。"
                    />
                  </figcaption>
                </figure>
              </div>
            </Reveal>
            <Stack>
              <Box label="Frosted glass for prompts">
                <L
                  en="Prompt bars use frosted, translucent glass. It feels polished, and the map stays visible underneath, so a prompt floats above the drive instead of covering it."
                  zh="提示栏采用半透明的磨砂玻璃效果。质感更精致，底下的地图也依然可见，提示信息像是浮在驾驶画面之上，而不是把它挡住。"
                />
              </Box>
            </Stack>
          </WideSection>

          {/* 06 — THE DESIGN SHIFT */}
          <WideSection id="shift" index="06" label="The Design Shift" title={<L en="From a better navigation screen to a system that plans the trip." zh="从更好的导航界面，到一个能规划行程的系统。" />}>
            <Stack>
              <TwoCol>
                <P>
                  <L
                    en={<>The insights above shaped how the interface should behave in the car. The interviews also showed what it
                  should help with: comparing restaurants after a long day, replacing a stop that closed, planning around a dog in
                  the car. In each case, the challenge wasn&apos;t finding information. It was figuring out how to turn separate
                  options into a workable trip.</>}
                    zh="上面这些洞察决定了界面在车里应该如何表现，而访谈也说明了它需要帮驾驶者解决哪些事：忙了一天后挑餐厅、替换已经关门的一站、带着狗出行时安排路线。在这些场景里，难点都不在于找信息，而在于如何把零散的选项变成一段可行的行程。"
                  />
                </P>
                <P>
                  <L
                    en={<>Instead of searching for each stop one by one, the driver could{" "}
                  <Shimmer>{"say what they want to do"}</Shimmer>, and the system would build the trip around it.</>}
                    zh={<>驾驶者不必一站一站地搜索，只需<Shimmer>{"说出自己想做什么"}</Shimmer>，系统就会围绕这个意图生成行程。</>}
                  />
                </P>
              </TwoCol>
              <Contrast
                left={{ label: "From", items: <L en="Design a better in-car navigation interface." zh="设计一个更好的车载导航界面。" /> }}
                right={{
                  label: "To",
                  items: (
                    <L
                      en="Design a trip planner that starts from what the driver wants to do and plans the trip around it."
                      zh="设计一个行程规划工具：从驾驶者想做的事出发，再围绕它规划整段行程。"
                    />
                  ),
                }}
              />
              <Pull label="How might we" wide>
                <p>
                  <L en="Make a system powerful without making its interface complicated?" zh="如何让系统足够强大，同时又不让界面变得复杂？" />
                </p>
              </Pull>
              <div>
                <h3 className="font-blinker mb-5 text-[22px] font-medium leading-tight text-white md:text-[26px]">
                  <L en="Three ways drivers plan" zh="驾驶者的三种规划方式" />
                </h3>
                <Cards
                  columns={3}
                  items={[
                    {
                      index: "01",
                      title: "Plan Ahead",
                      body: <p><L en="Research on the phone, then take the plan to the car." zh="先在手机上查好，再把计划带到车上。" /></p>,
                    },
                    {
                      index: "02",
                      title: "Plan on the Go",
                      body: <p><L en="Decide in the car, knowing the experience, not the place." zh="在车上临时决定：知道想要什么样的体验，但还不确定去哪儿。" /></p>,
                    },
                    {
                      index: "03",
                      title: "Adapt During the Journey",
                      body: (
                        <p>
                          <L
                            en="Places close, plans run long. The system has to adapt without starting over."
                            zh="店铺会关门，安排会超时。系统需要随之调整，而不是让人从头再来。"
                          />
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
              <Pull label="Key insight">
                <p>
                  <L
                    en="For open-ended trips, drivers often know the experience they want before they know exactly where to go."
                    zh="对于没有明确目的地的出行，驾驶者往往先知道自己想要什么样的体验，之后才确定具体去哪里。"
                  />
                </p>
              </Pull>
            </Stack>
          </WideSection>

          {/* 07 — LOW-FIDELITY FLOWS */}
          <WideSection id="wireframes" index="07" label="Low-Fidelity Flows" title={<L en="Mapping every flow before designing a screen." zh="在设计界面之前，先梳理每一条流程。" />}>
            <Stack>
              <TwoCol>
                <P>
                  <L
                    en="Before any visual design, I mapped every flow in low fidelity: planning, adapting on the road, and revisiting past routes, on the car screen and the phone."
                    zh="在进入视觉设计之前，我先用低保真线框图梳理了车机和手机上的每一条流程：规划行程、在路上调整，以及回看过去的路线。"
                  />
                </P>
                <P>
                  <L en="These boards are an overview; the full set of screens is in Figma." zh="这里展示的是概览，完整的界面都在 Figma 里。" />
                </P>
              </TwoCol>
            </Stack>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {[
              { src: "wireframes-car-flows", label: "Car screen flows", alt: "Low-fidelity car-screen wireframes: route planning before the trip, and rerouting, charging, and destination changes during it" },
              { src: "wireframes-phone-flows", label: "Phone flows", alt: "Low-fidelity phone wireframes: viewing past routes, creating a route, and changing, deleting, and reordering stops" },
            ].map((w) => (
              <Reveal key={w.src}>
                <figure>
                  <a href={`/images/trip-planning/${w.src}.webp`} target="_blank" rel="noopener noreferrer" data-cursor="view" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/trip-planning/${w.src}.webp`}
                      alt={w.alt}
                      width={2000}
                      height={1304}
                      loading="lazy"
                      className="block h-auto w-full rounded-[18px] border border-white/10"
                    />
                  </a>
                  <figcaption className="font-gilroy mt-4 text-[14px] uppercase tracking-[0.2em] text-neutral-500">{w.label}</figcaption>
                </figure>
              </Reveal>
            ))}
            </div>
            <Reveal>
              <div className="flex flex-col items-start gap-5 border-t border-white/[0.08] pt-10 md:flex-row md:items-center md:justify-between">
                <p className="font-gilroy max-w-[56ch] text-[17px] leading-[1.6] text-neutral-400">
                  <L en="Every low-fidelity screen, flow by flow." zh="按流程整理的全部低保真界面。" />
                </p>
                <ShinyButton href={figma.tripWireframes} target="_blank" rel="noopener noreferrer">
                  View the full flow in Figma ↗
                </ShinyButton>
              </div>
            </Reveal>
          </WideSection>

          {/* 08 — AI TRIP PLANNING */}
          <WideSection id="concept" index="08" label="AI Trip Planning" title="Start with an intention, not a destination.">
            <Stack>
              <TwoCol>
                <P>
                  <L
                    en="In this concept, the driver describes what they want and the AI drafts a connected plan."
                    zh="在这个概念中，驾驶者描述自己想做的事，AI 据此生成一份连贯的行程草案。"
                  />
                </P>
                <Box label="Why coordination matters">
                  <L
                    en="A good restaurant on the way can be a better pick than a top-rated one across town, so the plan weighs how stops fit
                  together, not only how each one rates."
                    zh="顺路的一家好餐厅，可能比城市另一头评分最高的那家更合适。所以规划时不仅看每一站的评分，也看各站之间是否衔接得上。"
                  />
                </Box>
              </TwoCol>
              <Utterance label="Example intention">
                <L
                  en="“I want to take my dog out, get coffee, and drive around, but without too much driving.”"
                  zh="“我想带狗出去转转，顺便喝杯咖啡兜兜风，但别开太久的车。”"
                />
              </Utterance>
              <ChipGroup
                label="What the AI weighs"
                items={["Preferences", "Time", "Traffic", "Weather", "Parking", "Charging", "Ratings", "Opening hours", "Distance", "Detours", "How stops relate"]}
              />
            </Stack>
            <Reveal>
              <FlowPanel
                items={[
                  { ...PHONE_PREFS_EXPRESS, ...MOCK, src: `${S}/mock-prefs-1.webp`, label: <L en="Express: pick place types and favorites, then Less Driving or Lower Cost" zh="Express：选择地点类型和收藏的地点，再选择 Less Driving 或 Lower Cost" /> },
                  { ...PHONE_PREFS_PLAN, ...MOCK, src: `${S}/mock-prefs-2.webp`, label: <L en="Plan: AI returns a five-stop trip from those and past preferences" zh="Plan：AI 结合这些选择和过往偏好，生成一段五站行程" /> },
                ]}
              />
            </Reveal>
            <Stack>
              <TwoCol>
                <P>
                  <L
                    en={<>The plan is a draft. Drivers can add, reorder, or replace any stop, so they{" "}
                  <Shimmer>{"stay in control of the trip"}</Shimmer>.</>}
                    zh={<>这份行程只是草案。驾驶者可以添加、调整顺序或替换任意一站，<Shimmer>{"行程始终由自己掌控"}</Shimmer>。</>}
                  />
                </P>
                <Pull label="Design decision">
                  <p>
                    <L en="The AI suggests and the driver decides." zh="AI 负责建议，驾驶者负责决定。" />
                  </p>
                </Pull>
              </TwoCol>
              <div>
                <Eyebrow>The experience as a system</Eyebrow>
                <StageFlow
                  stages={[
                    { title: "Express", body: <L en="The driver says what they want, by voice or by hand." zh="驾驶者通过语音或手动输入，说出想做的事。" /> },
                    { title: "Plan", body: <L en="AI builds a recommended trip from the intention." zh="AI 根据出行意图生成推荐行程。" /> },
                    { title: "Drive", body: <L en="The most relevant information, at the right moment." zh="在合适的时机，只呈现最相关的信息。" /> },
                    { title: "Adapt", body: <L en="When circumstances change, the plan changes with them." zh="情况一变，行程也随之调整。" /> },
                  ]}
                />
              </div>
            </Stack>
          </WideSection>

          {/* 09 — PLANNING ON THE PHONE */}
          <WideSection id="phone" index="09" label="Planning on the Phone" title={<L en="Plan ahead, when there's time and flexibility." zh="有时间、有余地的时候，提前规划。" />}>
            <Stack>
              <TwoCol>
                <P>
                  <L en="Planning happens ahead of time or on the road, so the experience spans two devices." zh="规划可能提前完成，也可能在路上进行，所以整个体验横跨两个设备。" />
                </P>
                <P>
                  <L
                    en="The phone handles planning ahead: building routes by hand or with AI, and revisiting past trips."
                    zh="手机负责提前规划：手动或借助 AI 创建路线，以及回看过去的行程。"
                  />
                </P>
              </TwoCol>
              <Contrast
                left={{ label: "Phone: advance planning", items: <L en="Plan ahead with time to spare: build the route, review past trips." zh="时间充裕时提前规划：创建路线，回看过去的行程。" /> }}
                right={{
                  label: "Vehicle: in the moment",
                  items: <L en="Adapt while driving: change stops, respond to traffic, timing, and charging." zh="行驶途中随时调整：更换站点，应对路况、时间和充电需求。" />,
                }}
              />
            </Stack>
            <Reveal>
              <PhoneStory
                eyebrow="Manual planning"
                title={<L en="Build it yourself, one stop at a time." zh="自己动手，一站一站地搭建行程。" />}
                frames={PHONE_MANUAL}
                // Demo recorded by tools/manual_planning_video.py; step times are printed by that script.
                video={{
                  src: "/videos/trip_manual_planning_card.mp4",
                  poster: "/images/trip-planning/trip_manual_planning_card.jpg",
                  steps: [0, 1.55, 4.37, 6.02, 9.82],
                }}
              />
            </Reveal>
            <Reveal>
              <PhoneStory
                eyebrow="AI-assisted planning"
                title={<L en="Or describe the day, and let AI assemble it." zh="或者描述这一天，让 AI 帮你组合起来。" />}
                frames={PHONE_AI}
                reverse
                // Demo recorded by tools/phone_flow_videos.py (ai); step times are printed by that script.
                video={{
                  src: "/videos/trip_ai_planning_card.mp4",
                  poster: "/images/trip-planning/trip_ai_planning_card.jpg",
                  steps: [0, 5.5, 8.4, 10.2, 11.85],
                }}
              />
            </Reveal>
          </WideSection>

          {/* 10 — PAST TRIPS */}
          <WideSection id="handoff" index="10" label="Past Trips" title={<L en="Saved trips, easy to revisit." zh="保存过的行程，随时可以回看。" />}>
            <Stack>
              <TwoCol>
                <P>
                  <L en="Saved trips live in a schedule, each day showing its color, stops, and location." zh="保存的行程会放进日程里，每一天都会显示对应的颜色、站点和地点。" />
                </P>
                <P>
                  <L
                    en="Details open progressively: tap a day for its route, again for the full map and stats."
                    zh="细节逐层展开：点一下某天查看路线，再点一下查看完整地图和数据。"
                  />
                </P>
              </TwoCol>
            </Stack>
            <Reveal>
              <PhoneStory
                eyebrow="Schedule & past routes"
                title={<L en="From a daily summary to the full route." zh="从每日概览，到完整路线。" />}
                frames={PHONE_SCHEDULE}
                // Demo recorded by tools/phone_flow_videos.py (schedule); it skips the schedule overview screen.
                video={{
                  src: "/videos/trip_schedule_card.mp4",
                  poster: "/images/trip-planning/trip_schedule_card.jpg",
                  steps: [0, 1.55, 3.35, 5.8, 9.35],
                }}
              />
            </Reveal>
            <Stack>
              <Box label="Not two versions of one app">
                <L
                  en={<>A finished plan goes to the car, which handles what the phone can&apos;t:{" "}
                <Shimmer>{"the drive itself"}</Shimmer>, from traffic to a low battery, in a few quick interactions.</>}
                  zh={<>规划好的行程会同步到车上，由车机处理手机做不到的部分：<Shimmer>{"驾驶过程本身"}</Shimmer>。从路况到电量不足，几次简单操作就能应对。</>}
                />
              </Box>
              <Pull label="System idea">
                <LB
                  en={
                    <>
                      <p>The phone takes the planning that needs time.</p>
                      <p>The car takes the decisions that can&apos;t wait.</p>
                    </>
                  }
                  zh={
                    <>
                      <p>需要花时间的规划，交给手机。</p>
                      <p>等不了的决定，交给车机。</p>
                    </>
                  }
                />
              </Pull>
            </Stack>
          </WideSection>

          {/* 11 — THE IN-CAR PLAN */}
          <WideSection id="in-car" index="11" label="The In-Car Plan" title={<L en="Before pulling away, the plan stays in view and easy to change." zh="出发之前，行程一目了然，也方便修改。" />}>
            <Stack>
              <TwoCol>
                <P>
                  <L en="Parked, the driver has attention to spare, so the full plan stays within reach." zh="停车时驾驶者有余力关注屏幕，所以完整的行程随时可以查看。" />
                </P>
                <P>
                  <L en="Edit by hand or ask AI; the trip reorganizes around it." zh="可以手动修改，也可以交给 AI，行程会随之重新编排。" />
                </P>
              </TwoCol>
            </Stack>
            <Reveal>
              <Slideshow
                frames={[
                  hu("explore-1", 882, 508, "The planned trip on the head unit's route map", bi("The trip on the map", "地图上的完整行程")),
                  hu("explore-2", 1011, 508, "Compact and expanded La Jolla Cove place cards over the route map", bi("Tap a place: compact card, then full details", "点击地点：先显示简要卡片，再展开完整信息")),
                ]}
                caption={<L en="Tap any point for a compact place card; expand it for ratings, photos, and hours." zh="点击任意地点会弹出简要卡片，展开后可以查看评分、照片和营业时间。" />}
              />
            </Reveal>
            <Chapter
              label="Edit by hand"
              title={<L en="Replace a stop in two taps." zh="点两下，就能替换一站。" />}
              text={
                <P>
                  <L en="The trip plan lists every stop. Select one and search for its replacement." zh="行程列表会列出所有站点，选中其中一站，再搜索替换的地点即可。" />
                </P>
              }
            >
              <Slideshow frames={HU_MANUAL} />
            </Chapter>
            <Chapter
              label="Edit with AI"
              title={<L en="Or just say what should change." zh="或者，直接说出要改什么。" />}
              text={
                <P>
                  <L
                    en={<><Shimmer>{"Replace the third one with a highly rated Italian restaurant nearby."}</Shimmer> AI finds a match and updates the route once
                  approved.</>}
                    zh={<><Shimmer>{"“把第三站换成附近一家评分高的意大利餐厅。”"}</Shimmer>AI 会找到合适的选项，经确认后再更新路线。</>}
                  />
                </P>
              }
            >
              <Slideshow frames={HU_AI} />
            </Chapter>
            <Chapter
              label="Add a stop"
              title={<L en="Coffee between two destinations, chosen by the driver." zh="在两站之间加一杯咖啡，由驾驶者自己挑选。" />}
              text={
                <P>
                  <L
                    en={<>Choose where the stop belongs, pick a nearby Starbucks, preview the detour, and it&apos;s inserted.</>}
                    zh="选好插入的位置，挑一家附近的 Starbucks，预览绕行距离，新的一站就加进去了。"
                  />
                </P>
              }
            >
              <Slideshow frames={HU_ADD_STOP} />
            </Chapter>
            <Chapter
              label="Find parking"
              title={<L en="Know where to park before leaving." zh="出发前就知道在哪儿停车。" />}
              text={
                <P>
                  <L en="Nearby parking is marked on the map, so no last-minute searching." zh="附近的停车场会标在地图上，不用到了再临时找。" />
                </P>
              }
            >
              <Slideshow frames={HU_PARKING} />
            </Chapter>
          </WideSection>

          {/* 12 — WHILE DRIVING */}
          <WideSection id="driving" index="12" label="While Driving" title={<L en="Less browsing. More conversation." zh="少一些浏览，多一些对话。" />}>
            <Stack>
              <TwoCol>
                <P>
                  <L
                    en={<>Once the car is moving, the browsing and editing that work while parked ask for too much attention. A small change
                  shouldn&apos;t mean rebuilding the route.</>}
                    zh="车一开动，停车时好用的浏览和编辑方式就会占用太多注意力。做一个小改动，不应该意味着重新规划整条路线。"
                  />
                </P>
                <P>
                  <L
                    en={<>So the interaction shifts to voice: the AI already knows the route and{" "}
                  <Shimmer>{"recommends an option instead of handing over a list"}</Shimmer>.</>}
                    zh={<>所以交互转向语音：AI 已经了解当前路线，会<Shimmer>{"直接推荐一个选项，而不是丢给你一长串列表"}</Shimmer>。</>}
                  />
                </P>
              </TwoCol>
              <Contrast
                left={{
                  label: "Before driving",
                  items: (
                    <ul className="space-y-1.5">
                      <li><L en="More control" zh="更多掌控" /></li>
                      <li><L en="More exploration" zh="更多探索" /></li>
                      <li><L en="More detail" zh="更多细节" /></li>
                    </ul>
                  ),
                }}
                right={{
                  label: "While driving",
                  items: (
                    <ul className="space-y-1.5">
                      <li><L en="Less browsing" zh="更少浏览" /></li>
                      <li><L en="Less manual input" zh="更少手动输入" /></li>
                      <li><L en="More context" zh="更多情境感知" /></li>
                      <li><L en="More AI assistance" zh="更多 AI 协助" /></li>
                    </ul>
                  ),
                }}
              />
            </Stack>
            <Chapter
              label="Proactive charging"
              title={<L en="One recommendation instead of five decisions." zh="用一个推荐，代替五个决定。" />}
              text={
                <>
                  <P>
                    <L
                      en="When the battery runs low, AI flags it, finds two stations before the next stop, and recommends one."
                      zh="电量不足时，AI 会及时提醒，在下一站之前找到两个充电站，并推荐其中一个。"
                    />
                  </P>
                  <Box label="Why a star">
                    <L
                      en="A yellow star marks the recommended station, so the driver can confirm it with a quick look instead of comparing
                    options."
                      zh="推荐的充电站用黄色星标标出，驾驶者扫一眼就能确认，不必逐个比较。"
                    />
                  </Box>
                </>
              }
            >
              <Slideshow frames={HU_CHARGING} />
            </Chapter>
            <div className="border-t border-white/[0.08] pt-12 md:pt-16">
              <Statement label="Design principle">
                <L
                  en="The interaction should become simpler as the driving task becomes more demanding."
                  zh="驾驶任务越吃力，交互就应该越简单。"
                />
              </Statement>
            </div>
          </WideSection>

          {/* 13 — ADAPTIVE PLANNING */}
          <WideSection id="adapt" index="13" label="Adaptive Planning" title={<L en="A trip plan shouldn't break when reality changes." zh="计划赶不上变化时，行程也不该就此作废。" />}>
            <Stack>
              <TwoCol>
                <P>
                  <L
                    en="Restaurants close, drivers run late, batteries run low. The itinerary adapts instead of staying fixed."
                    zh="餐厅会关门，人会迟到，电量会不足。行程需要随之调整，而不是一成不变。"
                  />
                </P>
                <P>
                  <L
                    en={<>If the next stop will be closed, AI suggests a similar open place nearby, and <Shimmer>{"asks before changing anything"}</Shimmer>.</>}
                    zh={<>如果下一站到达时已经关门，AI 会推荐附近一家类似且仍在营业的地方，并且<Shimmer>{"在做任何修改前先征求驾驶者同意"}</Shimmer>。</>}
                  />
                </P>
              </TwoCol>
            </Stack>
            <Reveal>
              <Slideshow frames={HU_ADAPT} />
            </Reveal>
            <Pull label="Key idea">
              <LB
                en={
                  <>
                    <p>The replacement should still fit what the driver originally wanted,</p>
                    <p>and nothing changes until the driver approves it.</p>
                  </>
                }
                zh={
                  <>
                    <p>替换的地点仍要符合驾驶者最初的意图，</p>
                    <p>而且在驾驶者确认之前，什么都不会改变。</p>
                  </>
                }
              />
            </Pull>
          </WideSection>

          {/* 14 — FINAL EXPERIENCE */}
          <WideSection id="final" index="14" label="Final Experience" title={<L en="From intent to journey." zh="从意图，到旅程。" />}>
            <Reveal>
              <Shot
                panel={false}
                className="mx-auto w-full max-w-[880px]"
                src="/images/trip-planner-final.jpg"
                alt="The trip plan on the in-vehicle display with the mobile companion app in front of it"
              />
            </Reveal>
            <Stack>
              <BigSequence steps={["Express", "Plan", "Drive", "Adapt"]} />
              <TwoCol>
                <P>
                  <L en="An intention, on the phone or in the car, becomes a connected, editable plan." zh="无论在手机上还是在车里，一个出行意图都能变成一份连贯、可编辑的行程。" />
                </P>
                <P>
                  <L en="On the road, the interface asks for less. When something changes, the plan changes with it." zh="在路上，界面对驾驶者的要求更少；一旦情况变化，行程也会随之调整。" />
                </P>
              </TwoCol>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <Eyebrow>Before driving</Eyebrow>
                  <ChipFlow steps={["Express Intent", "Review", "Edit", "Start"]} />
                </div>
                <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <Eyebrow>While driving</Eyebrow>
                  <ChipFlow steps={["Speak", "AI Understands Context", "Recommended Action", "Continue Journey"]} />
                </div>
              </div>
            </Stack>
          </WideSection>

          {/* 15 — REFLECTION */}
          <Section id="reflection" index="15" label="Reflection" title={<L en="Designing around attention." zh="围绕注意力来设计。" />}>
            <P>
              <L
                en={<>This project changed how I think about automotive interfaces. Rather than fitting more features onto the screen, I started
              designing around <Shimmer>{"when drivers need to make decisions"}</Shimmer> and which tasks can wait until the car is
              parked.</>}
                zh={<>这个项目改变了我对车载界面的理解。我不再想着往屏幕上塞更多功能，而是开始围绕<Shimmer>{"驾驶者在什么时候需要做决定"}</Shimmer>来设计，并分辨哪些事情可以等到停车后再处理。</>}
              />
            </P>
            <Pull label="What I'd test next">
              <LB
                en={
                  <>
                    <p>The planning and rerouting flows, with drivers,</p>
                    <p>especially how much information they can comfortably process on the road.</p>
                  </>
                }
                zh={
                  <>
                    <p>和驾驶者一起测试行程规划与改道流程，</p>
                    <p>尤其是看他们在路上能轻松处理多少信息。</p>
                  </>
                }
              />
            </Pull>
          </Section>

          {/* FINAL PROJECT STATEMENT */}
          <section className="border-t border-white/[0.08] py-24 md:py-36">
            <Container>
              <Reveal className="flex flex-col items-center text-center">
                <h2 className="font-blinker max-w-[18ch] text-[clamp(44px,7vw,108px)] font-medium leading-[0.98] tracking-[-0.02em] text-white">
                  From Navigation to Intention.
                </h2>
                <p className="font-sulphur mt-8 max-w-[40ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  <L en="Trip planning that starts with what people want to do." zh="从人们想做的事开始的行程规划。" />
                </p>
              </Reveal>
            </Container>
          </section>
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
                    {...(/^https?:\/\//.test(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

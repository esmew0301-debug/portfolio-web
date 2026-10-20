import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { Container } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { DragGallery, ForceLight, InterfaceRows, PHONE, ScrollArrow, Shot, Trio, VK_ORANGE } from "@/components/case/vegan-kit";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import TeamShowcase from "@/components/ui/team-showcase";
import { figma, person, selectedWork } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Val's Vegan Kitchen — ${person.name}`,
  description:
    "A mobile ordering app for a vegan burger restaurant, with a customer ordering flow and a staff management dashboard.",
};

// Layout reference: keithren.com/space-itinera. Black / grey type, orange accents (the app's own colour).
// One type scale for the whole page: EYEBROW, H2 (section titles), H3 (sub-headings), BODY, STATEMENT.
const EYEBROW = "font-gilroy text-[13px] uppercase tracking-[0.22em] text-[#8a8a8a]";
const H2 = "font-blinker text-[clamp(30px,3.4vw,46px)] font-normal leading-[1.12] tracking-[-0.01em] text-[#111111]";
const H3 = "font-blinker text-[24px] font-normal leading-[1.25] text-[#111111] md:text-[30px]";
const BODY = "font-gilroy text-[17px] leading-[1.55] text-[#8a8a8a] md:text-[19px]";
const STATEMENT = "font-gilroy mx-auto max-w-[34ch] text-center text-[clamp(22px,2.4vw,30px)] leading-[1.45] text-[#8a8a8a]";

const NAV: CaseNavItem[] = [
  { id: "overview", index: "01", label: "Overview" },
  { id: "features", index: "02", label: "Key Features" },
  { id: "research", index: "03", label: "Research" },
  { id: "evaluation", index: "04", label: "Evaluation" },
  { id: "visual-evaluation", index: "05", label: "Visual Evaluation" },
  { id: "design", index: "06", label: "Design" },
];

const V = "/images/vegan";
const s = (n: string, alt: string) => ({ src: `${V}/${n}.webp`, alt });

const V1_SCREENS = [
  s("f01", "Version 1 home"), s("f02", "Version 1 all menu categories"), s("f03", "Version 1 category"),
  s("f04", "Version 1 item details"), s("f05", "Version 1 cart"), s("f06", "Version 1 checkout"),
  s("f08", "Version 1 staff dashboard"), s("f09", "Version 1 menu editor"), s("f10", "Version 1 category editor"),
  s("f11", "Version 1 item editor"), s("f12", "Version 1 modifier editor"), s("f13", "Version 1 availability report"),
];
const V2_SCREENS = [
  s("f14", "Welcome: customer login"), s("f15", "Home"), s("f16", "All menu categories"), s("f17", "Smashburgers"),
  s("f18", "Item details"), s("f19", "Cart"), s("f20", "Checkout"), s("f21", "About & rewards"),
  s("f22", "Welcome: staff login"), s("f23", "Staff dashboard"), s("f24", "Menu editor"), s("f25", "Category editor"),
  s("f26", "Item editor"), s("f27", "Modifier editor"), s("f28", "Availability report with save banner"), s("f29", "Schedule & hours"),
];

/** Orange emphasis inside grey statements. */
function O({ children }: { children: ReactNode }) {
  return <span style={{ color: VK_ORANGE }}>{children}</span>;
}

/** Description text: [[phrase]] is highlighted in orange (like the reference's blue highlights). */
function hl(t: ReactNode): ReactNode {
  if (typeof t !== "string") return t;
  const line = (l: string) => l.split(/\[\[(.+?)\]\]/).map((part, i) => (i % 2 ? <O key={i}>{part}</O> : part));
  const lines = t.split("\n");
  if (lines.length === 1) return line(t);
  // "\n" = a separate point, on its own line
  return lines.map((l, i) => (
    <span key={i} className={i ? "mt-4 block" : "block"}>
      {line(l)}
    </span>
  ));
}
function Hx({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  return <L en={hl(en)} zh={hl(zh)} />;
}

function Part({ n, title }: { n: string; title: string }) {
  return (
    <Reveal className="border-b border-black/10 pb-6">
      <p className={`${EYEBROW} flex items-center gap-2`}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: VK_ORANGE }} />
        Part {n}
      </p>
      <h2 className="font-blinker mt-2 text-[28px] font-medium uppercase tracking-[0.02em] text-[#111111] md:text-[32px]">{title}</h2>
    </Reveal>
  );
}

function SectionHead({ title, intro }: { title: ReactNode; intro?: ReactNode }) {
  return (
    <Reveal className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
      <h3 className={H2}>{title}</h3>
      {intro && <p className={BODY}>{intro}</p>}
    </Reveal>
  );
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[18px] border border-black/[0.06] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.18)]">
      <p className="font-gilroy text-[13px] uppercase tracking-[0.22em]" style={{ color: VK_ORANGE }}>{label}</p>
      <div className={`${BODY} mt-3 text-[#3a3a3a]`}>{children}</div>
    </div>
  );
}

// Interview participants: the four think-aloud sessions, one per scenario (photos interviewee-1..4, in this order).
const NAMES = ["Shiyue.W", "Frank.F", "Lexi.L", "Kelly.Y"];
const PHOTOS = [1, "2-v2", 3, 4].map((n) => `/images/vegan/interviewee-${n}.jpg`);
const PEOPLE = [
  {
    who: "Student", whoZh: "学生", role: "Customer", roleZh: "顾客",
    task: "Orders lunch during a [[20-minute class break]].", taskZh: "利用 [[20 分钟的课间]]点午餐。",
    need: "Speed and minimal navigation.", needZh: "速度快，操作步骤少。",
    said: "“I'm trying to figure out [[where the actual menu starts]].”", saidZh: "“我在找[[真正的菜单到底从哪里开始]]。”",
    icon: "M12 4 3 8.5 12 13l9-4.5L12 4Zm-6 6.8V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.2",
  },
  {
    who: "Working professional", whoZh: "上班族", role: "Customer", roleZh: "顾客",
    task: "Orders a group dinner, hunting for [[promotions and rewards]].", taskZh: "为多人点晚餐，同时寻找[[优惠和积分奖励]]。",
    need: "Confidence the discount applied.", needZh: "能确认优惠已经生效。",
    said: "“I'd simplify the Home page and make [[important actions stand out more]].”", saidZh: "“我会把首页简化一些，让[[重要的操作更突出]]。”",
    icon: "M4 8h16v11H4zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 13h16",
  },
  {
    who: "Busy shift", whoZh: "高峰期", role: "Staff", roleZh: "店员",
    task: "An item [[sells out mid-rush]] and must be marked unavailable.", taskZh: "高峰期某道菜[[售罄]]，需要立刻标记为不可售。",
    need: "A fast, certain update under time pressure.", needZh: "在时间压力下也能快速、确定地完成更新。",
    said: "“After I hit Save, I'm [[not sure the change actually went through]].”", saidZh: "“点了保存之后，我[[不确定修改到底有没有生效]]。”",
    icon: "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12v4l2.5 2.5M9 2h6",
  },
  {
    who: "Opening", whoZh: "开店准备", role: "Staff", roleZh: "店员",
    task: "Reviews [[availability and restocks]] before customers order.", taskZh: "在顾客下单前检查[[菜品供应状态并补货]]。",
    need: "A clear picture of what needs attention.", needZh: "清楚了解哪些事情需要处理。",
    said: "“We want [[a clear entry for customers or workers]]. In real life it starts from a login, not straight into the app.”", saidZh: "“我们希望顾客和店员[[各有一个明确的入口]]。现实中都是先登录，而不是一打开就进入应用界面。”",
    icon: "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3",
  },
];

const FINDINGS = [
  { t: "Hard to find", tZh: "难以找到", b: "[[Customization was hard to find]]; add-on text was small and mostly skipped.", bZh: "[[定制选项很难找到]]；加料选项的文字太小，大多被忽略。", icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4" },
  { t: "Crowded home", tZh: "首页拥挤", b: "Home felt crowded at first glance; participants asked for the [[key actions to stand out]].", bZh: "首页第一眼看上去很拥挤；参与者希望[[重要操作更突出]]。", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { t: "No confirmation", tZh: "没有确认", b: "Staff got [[no confirmation after saving]], so they re-checked changes mid-rush.", bZh: "店员保存后[[得不到任何确认]]，高峰期只能反复检查。", icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5m0 3v.5" },
  { t: "No way in", tZh: "没有入口", b: "The app opened straight onto the menu; participants expected [[a login for customers or staff]].", bZh: "App 一打开就是菜单；参与者希望[[顾客和店员各有登录入口]]。", icon: "M10 17l5-5-5-5M15 12H3M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5" },
];

// Part 3: what five participants pointed out (one issue each).
const QUOTES = [
  { by: "Participant 1", en: "The drop shadow under the menu bar looks out of place next to everything else.", zh: "菜单栏下面的投影和其他元素放在一起，显得很突兀。" },
  { by: "Participant 2", en: "The text is too small, and it doesn't look great.", zh: "文字太小了，看起来也不太好看。" },
  { by: "Participant 3", en: "The borders around the cards feel abrupt. The earlier version didn't have them.", zh: "卡片外面加的线框很突兀，之前的版本并没有。" },
  { by: "Participant 4 · Staff", en: "After I hit Save, I'm not sure the change actually went through.", zh: "点了保存之后，我不确定修改到底有没有生效。" },
  { by: "Participant 5", en: "There's no obvious login. A normal app starts with a login screen.", zh: "没有明显的登录入口，正常的 App 都是从登录页开始的。" },
];

// Part 6: five before / after pairs, text alternating sides.
const PAIRS = [
  {
    title: "Navigation bar", titleZh: "导航栏",
    before: [s("f03", "Smashburgers with a drop-shadow nav bar"), s("f05", "Cart with a drop-shadow nav bar")],
    after: [s("f17", "Smashburgers with a thin line above the nav bar"), s("f19", "Cart with a thin line above the nav bar")],
    b: "A [[drop shadow framed the nav bar]], which clashed with the otherwise flat interface.\nItem names sat on a [[faint blur]] that was hard to read.", bZh: "导航栏用了[[投影]]，与整体扁平的界面风格[[冲突]]。\n菜品名称下的[[模糊底不明显]]，文字不易看清。",
    a: "A [[single thin line]] separates the nav bar: flat, quiet, and [[consistent with the rest of the app]].\nA [[stronger blur]] behind item names makes them clearer.", aZh: "改为[[一条细线]]分隔导航栏，扁平、安静，[[与 App 其他部分保持一致]]。\n菜品名称下的[[模糊效果加深]]，文字更清晰。",
  },
  {
    title: "Text size", titleZh: "文字大小",
    before: [s("f04", "Version 1 item page with small add-on text"), s("f16-prev", "Categories with small item counts")],
    after: [s("f18", "Version 2 item page with grouped, larger add-ons"), s("f16", "Categories with larger item counts")],
    b: "Add-on labels and item counts were [[too small to read]], so most participants skipped them.", bZh: "加料选项和菜品数量的文字[[太小，看不清]]，大多数参与者直接略过。",
    a: "Add-ons are [[grouped with larger labels]], item counts are bigger, and the discount badge is gone, so [[options read clearly]].", aZh: "加料选项[[分组并放大文字]]，菜品数量变大，去掉了折扣标签，[[选项一目了然]]。",
  },
  {
    title: "Borders & margins", titleZh: "线框与边距",
    before: [s("f16-prev", "Categories with outlined tiles"), s("f20-prev", "Checkout with wide page margins")],
    after: [s("f16", "Categories without tile borders"), s("f20", "Checkout with tighter margins")],
    b: "Outlines added to the category tiles [[felt abrupt]], since earlier screens had none.\n[[Wide margins]] wasted space.", bZh: "分类卡片新加的线框[[显得突兀]]，之前的页面都没有。\n[[边距过宽]]，浪费了空间。",
    a: "Borders are removed; soft grey tiles keep the grid [[calm and readable]].\n[[Margins tightened]].", aZh: "去掉线框，用浅灰色卡片让网格[[安静又易读]]。\n[[收窄了边距]]。",
  },
  {
    title: "Save confirmation", titleZh: "保存确认",
    before: [s("f12", "Version 1 modifier editor"), s("f13", "Availability report without confirmation")],
    after: [s("f27", "Version 2 modifier editor"), s("f28", "Availability report with a success banner")],
    b: "Tapping Save [[gave no feedback]], so staff weren't sure their change had gone through.", bZh: "点击保存[[没有任何反馈]]，店员不确定修改是否生效。",
    a: "Every save now shows an [[orange banner]]: “Your change has been saved successfully!”", aZh: "现在每次保存都会弹出[[橙色横幅]]：“Your change has been saved successfully!”",
  },
  {
    title: "Login entry", titleZh: "登录入口",
    before: [s("f01", "Version 1 opens straight onto Home"), s("f08", "Version 1 opens straight onto the staff dashboard")],
    after: [s("f22", "Welcome screen with Staff and Customer login"), s("f15", "Customer home after login")],
    b: "The app opened straight onto the menu, with [[no clear way in]] for customers or staff.", bZh: "App 一打开就是菜单，顾客和店员都[[没有明确的入口]]。",
    a: "A welcome screen splits [[Staff Login and Customer Login]] before anything else.", aZh: "先进入欢迎页，分别提供 [[Staff Login 和 Customer Login]]。",
  },
];

const MORE = selectedWork.slice(0, 2);
const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Before / After for one change (reference layout): the Before group (screens + note) sits flush left, the arrow
 * runs diagonally through the middle, and the After group sits flush right. Stacks on smaller screens.
 */
const PAIR_ROW = "grid items-center gap-8 xl:grid-cols-[624px_300px] xl:gap-14";

function PairScreens({ shots }: { shots: { src: string; alt: string }[] }) {
  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {shots.map((x) => (
        <Shot key={x.src} {...x} className={PHONE} />
      ))}
    </div>
  );
}

function PairNote({ label, text, textZh, accent }: { label: string; text: string; textZh: string; accent?: boolean }) {
  return (
    <div>
      <p className={H3} style={accent ? { color: VK_ORANGE } : undefined}>{label}</p>
      <p className={`${BODY} mt-3`}>
        <Hx en={text} zh={textZh} />
      </p>
    </div>
  );
}

function PairBlock({ p, i }: { p: (typeof PAIRS)[number]; i: number }) {
  return (
    <div>
      <Reveal>
        <h4 className={H2}>
          <span className="font-gilroy mr-4 align-middle text-[15px] tabular-nums" style={{ color: VK_ORANGE }}>{String(i + 1).padStart(2, "0")}</span>
          <Hx en={p.title} zh={p.titleZh} />
        </h4>
      </Reveal>
      <Reveal className={`mt-12 ${PAIR_ROW} xl:justify-start`}>
        <PairScreens shots={p.before} />
        <PairNote label="Before" text={p.b} textZh={p.bZh} />
      </Reveal>
      <div className="my-6 flex justify-center md:my-8">
        <ScrollArrow className="h-20 w-20 md:h-24 md:w-24" />
      </div>
      <Reveal className={`${PAIR_ROW} xl:justify-end`}>
        <PairScreens shots={p.after} />
        <PairNote label="After" text={p.a} textZh={p.aZh} accent />
      </Reveal>
    </div>
  );
}

export default function ValsVeganKitchen() {
  return (
    <div id="top" className="relative bg-[#fcf5ee]">
      <ForceLight />
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />

      <div
        className="case-sheet relative z-10 bg-[#fcf5ee] text-[#111111]"
        style={{ "--accent": "#161616", "--accent-green": VK_ORANGE, "--case-bg": "#ffffff", "--ink": "#111111" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* HERO */}
          <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff4ec_0%,#ffead9_55%,#ffe6d2_100%)] pt-40 md:pt-56">
            <Container>
              <div className="mb-14 text-center md:mb-20">
                <BackLink href="/#playground" className="font-gilroy inline-flex items-center gap-2 text-[15px] text-[#8a8a8a] transition-colors hover:text-[#111111]">
                  <span>←</span>Back to Playground
                </BackLink>
              </div>
              <Reveal className="flex flex-col items-center text-center">
                <h1 className="font-blinker text-[clamp(40px,5.5vw,72px)] font-medium leading-[1.02] tracking-[-0.01em] text-[#111111]">Val&apos;s Vegan Kitchen</h1>
                <p className={`${BODY} mt-8 max-w-[46ch]`}>
                  <Hx
                    en="One app, two sides of the counter: fast ordering for customers, and a dashboard staff can trust mid-rush."
                    zh="一个 App，同时服务柜台内外：让顾客快速下单，也为店员提供高峰期值得信赖的管理后台。"
                  />
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-2">
                  {["UI/UX", "Mobile App", "Usability Testing", "Group Project"].map((t) => (
                    <span key={t} className="font-gilroy rounded-full border border-black/10 bg-white px-4 py-1.5 text-[14px] text-[#3a3a3a]">{t}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal className="relative mt-24 md:mt-32">
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[10%] mx-auto h-[70%] max-w-[900px] rounded-full bg-[#fdba8c]/30 blur-[90px]" />
                <div className="relative h-[300px] overflow-hidden [mask-image:linear-gradient(180deg,#000_45%,transparent_96%)] sm:h-[400px] md:h-[440px] xl:h-[560px]">
                  <Trio shots={[s("f16", "All menu categories"), s("f14", "Welcome screen"), s("f18", "Item details")]} />
                </div>
              </Reveal>
            </Container>
          </section>

          {/* Long, eased fade from the hero orange to the page colour; the overview cards overlap its lower half. */}
          <div aria-hidden className="h-64 bg-[linear-gradient(180deg,#ffe6d2_0%,#ffe9d8_18%,#fdeee2_38%,#fbf3ec_60%,#fcf4ec_80%,#fcf5ee_100%)] md:h-80" />

          {/* OVERVIEW */}
          <section id="overview" className="relative -mt-48 pb-16 md:-mt-60 md:pb-24">
            <Container>
              <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Meta label="Course">COGS 187A, UC San Diego</Meta>
                <Meta label="Type"><Hx en="Group project" zh="小组项目" /></Meta>
                <Meta label="Platform"><Hx en="iOS mobile app" zh="iOS 手机应用" /></Meta>
                <Meta label="Tools">Figma</Meta>
              </Reveal>
              <Reveal className="mt-8 flex justify-center">
                <InteractiveHoverLink
                  href={figma.veganKitchen}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  text={<Hx en="Open in Figma" zh="在 Figma 中打开" />}
                  className="font-gilroy text-[15px] font-medium"
                  style={{ "--ihb-bg": "#ffffff", "--ihb-border": VK_ORANGE, "--ihb-fg": VK_ORANGE, "--ihb-fill": VK_ORANGE, "--ihb-fill-fg": "#ffffff" } as React.CSSProperties}
                />
              </Reveal>

              <Reveal className="mt-24 md:mt-32">
                <p className={`${EYEBROW} text-center`}>Context</p>
                <div className="mx-auto mt-4 h-px max-w-[560px] bg-black/10" />
                <p className={`${STATEMENT} mt-8`}>
                  <Hx
                    en={<>Customers want to <O>order quickly</O> and trust their discounts. Staff need an <O>accurate menu</O> while orders pour in.</>}
                    zh={<>顾客希望<O>快速点餐</O>，并能确认优惠已生效；店员则需要在订单涌入时，保证<O>菜单信息准确</O>。</>}
                  />
                </p>
              </Reveal>
              <Reveal className="mt-24 md:mt-32">
                <p className={`${EYEBROW} text-center`}>What is Val&apos;s Vegan Kitchen?</p>
                <div className="mx-auto mt-4 h-px max-w-[560px] bg-black/10" />
                <p className={`${STATEMENT} mt-8`}>
                  <Hx
                    en={<>A mobile <O>ordering app</O> for a San Diego vegan burger restaurant, with a <O>staff dashboard</O> for menu and availability. We designed version 1, tested it, and <O>refined it over two rounds</O> of usability testing.</>}
                    zh={<>一款为圣地亚哥素食汉堡店设计的<O>点餐 App</O>，并配有管理菜单与供应状态的<O>店员后台</O>。我们设计了版本 1，进行测试，并经过<O>两轮可用性测试迭代优化</O>。</>}
                  />
                </p>
              </Reveal>
            </Container>
          </section>

          {/* KEY FEATURES */}
          <section id="features" className="py-16 md:py-24">
            <Container>
              <Reveal>
                <p className={`${EYEBROW} text-center`}>Key Features</p>
                <div className="mx-auto mt-4 h-px max-w-[560px] bg-black/10" />
              </Reveal>
              {[
                {
                  title: "Two ways in", titleZh: "两个独立入口",
                  pain: "Version 1 opened straight onto the menu. Customers and staff had [[no clear entry of their own]].",
                  painZh: "版本 1 一打开就是菜单，顾客和店员都[[没有属于自己的明确入口]]。",
                  sol: "A welcome screen splits [[Staff Login and Customer Login]]. Customers land on Home; staff land on [[their own dashboard]].",
                  solZh: "欢迎页分别提供 [[Staff Login 和 Customer Login]]：顾客进入首页，店员进入[[自己的管理后台]]。",
                  shots: [s("f14", "Welcome screen with Staff and Customer login")],
                },
                {
                  title: "Two workflows, one app", titleZh: "两套工作流，一个 App",
                  pain: "Customers and staff need [[completely different things]]: one wants to order fast, the other keeps the menu right mid-rush.",
                  painZh: "顾客和店员的需求[[完全不同]]：一个想快速点餐，一个要在高峰期保证菜单准确。",
                  sol: "After login, each side gets [[its own flow]]: customers browse the menu and order; staff manage status, orders, availability and schedule from [[their own dashboard]].",
                  solZh: "登录后，两边各走[[自己的流程]]：顾客浏览菜单并下单；店员在[[自己的后台]]管理营业状态、订单、供应和排班。",
                  shots: [s("f23", "Staff dashboard"), s("f16", "Customer: all menu categories")],
                },
                {
                  title: "Everything listed, step by step", titleZh: "清晰列出，步步简单",
                  pain: "Ordering meant [[hunting for options]]: add-ons were hard to find and item text was easy to skip.",
                  painZh: "点餐时需要[[到处找选项]]：加料很难找到，菜品文字也容易被略过。",
                  sol: "Every category is [[one tap from Home]], items are laid out with photos, and each step (item, cart, checkout) [[does one thing]].",
                  solZh: "[[从首页一步进入任意分类]]，菜品配图清晰排列，菜品、购物车、结账[[每一步只做一件事]]。",
                  shots: [s("f17", "Smashburgers category"), s("f18", "Item details")],
                },
              ].map((f, i) => (
                <Reveal key={f.title} className={`mt-20 grid items-center gap-12 md:mt-28 xl:gap-16 ${i % 2 ? "xl:grid-cols-[624px_minmax(0,1fr)] xl:[&>*:first-child]:order-2" : "xl:grid-cols-[minmax(0,1fr)_624px]"}`}>
                  <div>
                    <h3 className={H2}><Hx en={f.title} zh={f.titleZh} /></h3>
                    <p className={`${H3} mt-10`}><Hx en="Painpoint" zh="痛点" /></p>
                    <p className={`${BODY} mt-2`}><Hx en={f.pain} zh={f.painZh} /></p>
                    <p className={`${H3} mt-8`}><Hx en="Solution" zh="解决方案" /></p>
                    <p className={`${BODY} mt-2`}><Hx en={f.sol} zh={f.solZh} /></p>
                  </div>
                  <div className="flex justify-center gap-4 md:gap-6">
                    {f.shots.map((x) => (
                      <Shot key={x.src} {...x} className={PHONE} />
                    ))}
                  </div>
                </Reveal>
              ))}
            </Container>
          </section>

          {/* PART 1 — RESEARCH */}
          <section id="research" className="py-16 md:py-24">
            <Container>
              <Part n="1" title="Research" />
              <div className="mt-14">
                <SectionHead
                  title={<Hx en="Interview" zh="访谈" />}
                  intro={
                    <Hx
                      en="We ran [[four moderated think-aloud sessions]], one per scenario: two customers and two staff. Each had warm-up questions, the task with probing questions, then an interview comparing the app with DoorDash and Chick-fil-A."
                      zh="我们进行了[[四场有主持人引导的出声思考测试]]，每个场景一场：两位顾客、两位店员。每场包括热身问题、带追问的任务操作，以及与 DoorDash、Chick-fil-A 的对比访谈。"
                    />
                  }
                />
                <Reveal className="mt-16 md:mt-20">
                  <TeamShowcase
                    accent={VK_ORANGE}
                    members={PEOPLE.map((p, i) => ({
                      id: p.who,
                      name: NAMES[i],
                      tag: <Hx en={p.role} zh={p.roleZh} />,
                      quote: <Hx en={p.said} zh={p.saidZh} />,
                      image: PHOTOS[i],
                      alt: `${NAMES[i]}, ${p.role.toLowerCase()} participant`,
                    }))}
                  />
                </Reveal>
              </div>

              <div className="mt-40 border-t border-black/10 pt-24 md:mt-56 md:pt-32">
                <SectionHead
                  title={<Hx en="Interview Findings" zh="访谈发现" />}
                  intro={<Hx en="Every participant finished their task, but [[four problems kept coming up]]." zh="每位参与者都完成了任务，但有[[四个问题反复出现]]。" />}
                />
                <Reveal className="mx-auto mt-20 grid max-w-[1000px] gap-5 md:mt-28 md:grid-cols-2">
                  {FINDINGS.map((f) => (
                    <div key={f.t} className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.18)] md:p-7">
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke={VK_ORANGE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                      <p className={`${H3} mt-3`}><Hx en={f.t} zh={f.tZh} /></p>
                      <p className={`${BODY} mt-2`}><Hx en={f.b} zh={f.bZh} /></p>
                    </div>
                  ))}
                </Reveal>
              </div>

              <div className="mt-32 border-t border-black/10 pt-24 md:mt-40 md:pt-32">
                <SectionHead
                  title={<Hx en="Before any screens, we sorted the kitchen." zh="在设计任何界面之前，我们先梳理了厨房。" />}
                  intro={
                    <Hx
                      en="Every ingredient became a card with its Category, Quantity, Location, Used In and Status. We tested the map on its own: users had to [[find any item within 20 seconds]], like where the onions live."
                      zh="每种食材都整理成一张卡片，记录 Category、Quantity、Location、Used In 和 Status。我们先单独测试了这张分类图：用户需要[[在 20 秒内找到任意一种食材]]，比如洋葱放在哪里。"
                    />
                  }
                />
                <Reveal className="mt-20 md:mt-28">
                  <div className="-mx-gutter overflow-x-auto px-gutter [scrollbar-width:thin] md:mx-0 md:px-0">
                    <div className="min-w-[860px] rounded-[20px] border border-black/[0.06] bg-white p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.18)] md:min-w-0 md:p-6">
                      <Image src={`${V}/sort-map.webp`} alt="Sort map: inventory categories, item cards and storage locations" width={2678} height={704} sizes="(max-width: 860px) 860px, 1200px" className="h-auto w-full" />
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>

          {/* EVALUATION — before / after galleries */}
          <section id="evaluation" className="mt-14 border-t border-black/10 pb-16 pt-32 md:mt-14 md:pb-24 md:pt-44">
            <Container>
              <SectionHead
                title={<Hx en="Evaluation" zh="评估" />}
                intro={<Hx en="Version 1 as participants saw it, then [[version 2 after the fixes]]." zh="先看参与者测试时的版本 1，再看[[修改后的版本 2]]。" />}
              />
              <Reveal className="mt-12 grid items-start gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-14">
                <DragGallery shots={V1_SCREENS} label={<Hx en="Before · version 1" zh="修改前 · 版本 1" />} />
                <div>
                  <p className="font-gilroy text-[13px] uppercase tracking-[0.22em] text-[#111111]">Before</p>
                  <ul className="mt-5 flex flex-col gap-4">
                    {QUOTES.map((q) => (
                      <li key={q.by} className={`${BODY} border-l-2 border-black/15 pl-4`}>
                        <Hx en={q.en} zh={q.zh} />
                        <span className="font-gilroy mt-1 block text-[13px] uppercase tracking-[0.18em] text-[#8a8a8a]">{q.by}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <div className="my-10 flex justify-center md:my-14">
                <ScrollArrow className="h-20 w-20 md:h-24 md:w-24" />
              </div>
              <Reveal className="grid items-start gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-14">
                <DragGallery shots={V2_SCREENS} label={<Hx en="After · version 2" zh="修改后 · 版本 2" />} />
                <div>
                  <p className="font-gilroy text-[13px] uppercase tracking-[0.22em]" style={{ color: VK_ORANGE }}>After</p>
                  <ul className="mt-5 flex flex-col gap-4">
                    {[
                      { en: "Second-round feedback was positive: [[no new problems came up]].", zh: "第二轮测试的反馈都是正面的，[[没有出现新的问题]]。" },
                      { en: "Grouped add-ons felt [[“cleaner”]], and the extra tap didn't bother anyone.", zh: "分组后的加料选项[[“更清爽”]]，多点一下也没人觉得麻烦。" },
                      { en: "Staff see [[a banner after every save]], so they stop re-checking.", zh: "[[每次保存都有横幅提示]]，店员不再反复检查。" },
                      { en: "Customers and staff each have [[their own way in]].", zh: "顾客和店员[[各有自己的入口]]。" },
                      { en: "A thin nav line, no borders and larger labels make the interface [[calmer and easier to read]].", zh: "细线导航栏、去掉线框、放大文字，让界面[[更安静、更易读]]。" },
                    ].map((t) => (
                      <li key={t.en} className={`${BODY} border-l-2 pl-4`} style={{ borderColor: VK_ORANGE }}>
                        <Hx en={t.en} zh={t.zh} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </Container>
          </section>

          {/* VISUAL EVALUATION — five pairs, then the moving gallery */}
          <section id="visual-evaluation" className="py-16 md:py-24">
            <Container>
              <Part n="2" title="Visual Evaluation" />
              <div className="mt-14">
                <SectionHead
                  title={<Hx en="Before and after, one change at a time" zh="逐项对比修改前后" />}
                  intro={<Hx en="Each of the five issues participants raised, and [[how version 2 answers it]]." zh="参与者提出的五个问题，以及[[版本 2 分别如何解决]]。" />}
                />
              </div>
              <div className="mt-16 flex flex-col gap-32 md:gap-40">
                {PAIRS.map((p, i) => (
                  <PairBlock key={p.title} p={p} i={i} />
                ))}
              </div>
            </Container>
          </section>

          {/* PART 5 — DESIGN (images to come) */}
          <section id="design" className="py-16 md:py-24">
            <Container>
              <Part n="3" title="Design" />
              <Reveal className="mt-14">
                <h3 className={`${H2} text-center`}>Keywords</h3>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="grid aspect-[4/3] place-items-center rounded-[20px] border-2 border-dashed border-black/15 bg-white">
                      <span className="font-gilroy text-[14px] text-[#8a8a8a]"><Hx en="Keyword image coming soon" zh="关键词图片待补充" /></span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal className="mt-20">
                <h3 className={`${H2} text-center`}>Design System</h3>
                <div className="mt-10 grid aspect-[16/9] place-items-center rounded-[20px] border-2 border-dashed border-black/15 bg-white">
                  <span className="font-gilroy text-[14px] text-[#8a8a8a]"><Hx en="Design system image coming soon" zh="设计系统图片待补充" /></span>
                </div>
              </Reveal>
            </Container>
          </section>
          {/* INTERFACES — the closing gallery, last on the page */}
          <section id="interfaces" className="pb-24 pt-8 md:pb-32">
            <div>
              <Container>
                <Reveal>
                  <p className="font-blinker text-center text-[clamp(28px,3vw,40px)] font-normal text-[#8a8a8a]">Interfaces</p>
                  <div className="mx-auto mt-6 h-px max-w-[820px] bg-black/10" />
                </Reveal>
              </Container>
              <div className="mt-14">
                <InterfaceRows rows={[V2_SCREENS.slice(0, 8), [...V2_SCREENS.slice(8), ...V1_SCREENS.slice(0, 2)]]} />
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-black/[0.08] px-gutter py-16 md:px-gutter-lg md:py-20">
          <BackToTop />
        </div>

        {/* More work */}
        <section id="case-more" className="border-t border-black/[0.08] bg-[#f4f4f2] py-24 md:py-32">
          <Container>
            <Reveal>
              <h2 className="font-blinker text-center text-[clamp(32px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em] text-[#111111]">Curious to see more?</h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
              {MORE.map((w, i) => (
                <Reveal key={w.label} delay={i * 0.08}>
                  <a href={w.href} {...(isExternal(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-cursor="view" className="group block">
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[18px] bg-neutral-200">
                      <Image src={w.image} alt={w.alt} fill sizes="(max-width: 768px) 100vw, 620px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: w.imagePosition }} />
                    </div>
                    <p className="font-gilroy mt-4 text-[14px] uppercase tracking-[0.2em] text-[#8a8a8a]">{w.label}</p>
                    <h3 className="font-blinker mt-1 text-[clamp(22px,2.6vw,32px)] font-medium leading-tight text-[#111111] transition-colors group-hover:text-[#6b6b6b]">{w.title}</h3>
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

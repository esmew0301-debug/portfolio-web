import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { Shot } from "@/components/case/vegan-kit";
import { VK_ORANGE } from "@/components/case/vegan-sizes";
import { VeganDesignSystem } from "@/components/case/vegan-design-system";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import TeamShowcase from "@/components/ui/team-showcase";
import { figma, person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Val's Vegan Kitchen — ${person.name}`,
  description:
    "A mobile ordering app for a vegan burger restaurant, with a customer ordering flow and a staff management dashboard.",
};

// Cold, minimal layout on black, after zegzulka.com/meta and /undout and a split-screen hero reference: a framed hero
// (cover image left, name and dates right over a faint grid), then small type throughout. 12px labels, 16/24 body,
// 28–44px titles; text sits in a left title column and a right body column that starts at about two thirds. Screens
// sit three to a row on full-width dark panels. Orange (the app's colour) is the only accent.
const LABEL = "text-[12px] leading-[18px] text-white/45";
/** Small divider labels (Key features, Part 1 · Customer, each change): centred and a little brighter than LABEL. */
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";
const BODY = "text-[16px] leading-[24px] text-white/60";
const TITLE = "text-[20px] leading-[1.2] text-white md:text-[24px]";
const PANEL = "bg-black";

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
    <span key={i} className="block">
      {line(l)}
    </span>
  ));
}
function Hx({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  return <L en={hl(en)} zh={hl(zh)} />;
}




// Interview participants: the four think-aloud sessions, one per scenario (photos interviewee-1..4, in this order).
const NAMES = ["Shiyue.W", "Frank.F", "Lexi.L", "Kelly.Y"];
const PHOTOS = [1, "2-v3", 3, 4].map((n) => `/images/vegan/interviewee-${n}.jpg`);
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

// Final design (version 2): two parts, each in groups of 2–3 screens with a note beside them.
type FinalGroupT = { title: string; titleZh: string; shots: { src: string; alt: string }[]; points: { en: string; zh: string }[] };
const FINAL: { en: string; zh: string; groups: FinalGroupT[] }[] = [
  {
    en: "Part 1 · Customer", zh: "第一部分 · 顾客",
    groups: [
      {
        title: "Welcome & Home", titleZh: "欢迎页与首页",
        shots: [s("f14", "Welcome screen"), s("f15", "Customer home")],
        points: [
          { en: "[[Welcome]]: separate Staff and Customer login, so each side starts in the right place.", zh: "[[欢迎页]]：分别提供店员和顾客登录，两边各从正确的入口开始。" },
          { en: "[[Home]]: search, the current promotion, every category and personal picks on one screen.", zh: "[[首页]]：搜索、当前优惠、全部分类和推荐集中在一个页面。" },
        ],
      },
      {
        title: "Browse & Customise", titleZh: "浏览与定制",
        shots: [s("f16", "All menu categories"), s("f17", "Smashburgers"), s("f18", "Item details")],
        points: [
          { en: "[[All Menu Categories]]: borderless tiles with large item counts, one tap from Home.", zh: "[[全部分类]]：无线框卡片、更大的菜品数量，从首页一步进入。" },
          { en: "[[Category]]: photo-led grid with a clearer blur behind each name.", zh: "[[分类页]]：以图片为主的网格，菜品名称下的模糊更清晰。" },
          { en: "[[Item details]]: add-ons grouped into option sets, recommended combos first.", zh: "[[菜品详情]]：加料按组归类，推荐搭配排在最前。" },
        ],
      },
      {
        title: "Cart, Checkout & Rewards", titleZh: "购物车、结账与积分",
        shots: [s("f19", "Cart"), s("f20", "Checkout"), s("f21", "About and rewards")],
        points: [
          { en: "[[Cart]]: promo code, savings and earned points shown before checkout.", zh: "[[购物车]]：结账前显示优惠码、已省金额和积分。" },
          { en: "[[Checkout]]: delivery or pickup, address and time on one tight page.", zh: "[[结账]]：外送或自取、地址和时间集中在一个紧凑页面。" },
          { en: "[[About & Rewards]]: restaurant info, community posts and rewards progress.", zh: "[[关于与积分]]：餐厅信息、社区动态和积分进度。" },
        ],
      },
    ],
  },
  {
    en: "Part 2 · Staff", zh: "第二部分 · 店员",
    groups: [
      {
        title: "Login & Dashboard", titleZh: "登录与后台",
        shots: [s("f22", "Welcome screen: staff login"), s("f23", "Staff dashboard")],
        points: [
          { en: "[[Staff Login]]: staff get their own entry from the welcome screen.", zh: "[[店员登录]]：店员在欢迎页有自己的入口。" },
          { en: "[[Dashboard]]: today's status, prep time, orders and quick actions at a glance.", zh: "[[后台首页]]：今日状态、出餐时间、订单和快捷操作一目了然。" },
        ],
      },
      {
        title: "Manage the Menu", titleZh: "管理菜单",
        shots: [s("f24", "Menu editor"), s("f25", "Category editor"), s("f26", "Item editor")],
        points: [
          { en: "[[Menu editor]]: every category with its item count.", zh: "[[菜单编辑]]：每个分类及其菜品数量。" },
          { en: "[[Category editor]]: items in a category, with edit and delete.", zh: "[[分类编辑]]：分类内的菜品，可编辑和删除。" },
          { en: "[[Item editor]]: price, availability and add-ons for one item.", zh: "[[菜品编辑]]：单个菜品的价格、供应状态和加料。" },
        ],
      },
      {
        title: "Availability & Schedule", titleZh: "供应状态与营业时间",
        shots: [s("f27", "Modifier editor"), s("f28", "Availability report with save banner"), s("f29", "Schedule and hours")],
        points: [
          { en: "[[Modifier editor]]: extra additions with their prices.", zh: "[[加料编辑]]：额外加料及其价格。" },
          { en: "[[Availability report]]: toggle sold-out items; every save is [[confirmed with a banner]].", zh: "[[供应报告]]：切换售罄菜品，每次保存都有[[横幅确认]]。" },
          { en: "[[Schedule & hours]]: store hours, prep time and pausing orders.", zh: "[[营业时间]]：营业时间、出餐时间和暂停接单。" },
        ],
      },
    ],
  },
];


const FEATURES = [
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
                  shots: [s("f23", "Staff dashboard"), s("f15", "Customer home")],
                },
                {
                  title: "Everything listed, step by step", titleZh: "清晰列出，步步简单",
                  pain: "Ordering meant [[hunting for options]]: add-ons were hard to find and item text was easy to skip.",
                  painZh: "点餐时需要[[到处找选项]]：加料很难找到，菜品文字也容易被略过。",
                  sol: "Every category is [[one tap from Home]], items are laid out with photos, and each step (item, cart, checkout) [[does one thing]].",
                  solZh: "[[从首页一步进入任意分类]]，菜品配图清晰排列，菜品、购物车、结账[[每一步只做一件事]]。",
                  shots: [s("f17", "Smashburgers category"), s("f18", "Item details")],
                },
];

/* ---------- layout pieces ---------- */

/** Title on the left, label + text in the right third (the reference's text rows). */
function Row({ title, label, children, id }: { title?: ReactNode; label?: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <Reveal className="grid gap-4 px-3 md:grid-cols-[2fr_1fr] md:gap-8" >
      <div id={id}>{title && <h2 className={TITLE}>{title}</h2>}</div>
      <div className="max-w-[467px]">
        {label && <p className={`${LABEL} mb-1.5`}>{label}</p>}
        {children && <div className={`${BODY} flex flex-col gap-4`}>{children}</div>}
      </div>
    </Reveal>
  );
}

/** Bulleted points (Pain point / Solution). */
function Points({ items }: { items: { k: ReactNode; v: ReactNode }[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[14px_1fr]">
          <span className="mt-[9px] h-1 w-1 rounded-full bg-white/60" />
          <span>
            <span className="text-white">{it.k}</span> {it.v}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A full-width dark panel with screens in rows of three (or two), phones at the reference size. */
function Panel({
  shots,
  cols = 3,
  className = "",
  rowLabels,
  phone = "w-[27%] max-w-[256px] md:w-[18%]",
}: {
  shots: { src: string; alt: string }[];
  cols?: 2 | 3;
  className?: string;
  /** Small labels at the left edge of given rows (row index → text); the screens stay where they are. */
  rowLabels?: Record<number, ReactNode>;
  /** Phone width (defaults to the reference size). */
  phone?: string;
}) {
  const rows: { src: string; alt: string }[][] = [];
  for (let i = 0; i < shots.length; i += cols) rows.push(shots.slice(i, i + cols));
  return (
    <Reveal className={`${PANEL} flex flex-col gap-[6vw] px-[4%] py-[6vw] md:py-[5vw] ${className}`}>
      {rows.map((r, k) => (
        <div key={k} className="relative flex justify-center gap-[6%]">
          {rowLabels?.[k] && <p className="absolute left-0 top-0 text-[13px] text-white/70">{rowLabels[k]}</p>}
          {r.map((x) => (
            <Shot key={x.src} {...x} frame className={phone} />
          ))}
        </div>
      ))}
    </Reveal>
  );
}

/** Thin arrow between Before and After (placeholder until the final arrow image arrives). */
function ThinArrow() {
  return (
    <svg viewBox="0 0 120 12" className="h-3 w-16 shrink-0 text-white/50 md:w-24" fill="none" aria-hidden>
      <path d="M0 6h116M110 1l6 5-6 5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function PairPanel({ p }: { p: (typeof PAIRS)[number] }) {
  const side = (shots: { src: string; alt: string }[], label: string, text: string, textZh: string, after?: boolean) => (
    <div className="flex w-full flex-col items-center gap-6 md:w-auto">
      <div className="flex justify-center gap-[8%] md:gap-6">
        {shots.map((x) => (
          <Shot key={x.src} {...x} frame className="w-[40%] max-w-[200px] md:w-[150px] xl:w-[190px]" />
        ))}
      </div>
      <div className="max-w-[400px] text-[14px] leading-[21px] text-white/60">
        <p className={`${LABEL} mb-1`} style={after ? { color: VK_ORANGE } : undefined}>
          {label}
        </p>
        <Hx en={text} zh={textZh} />
      </div>
    </div>
  );
  return (
    <Reveal className={`${PANEL} flex flex-col items-center gap-10 px-[4%] py-[6vw] md:flex-row md:items-start md:justify-center md:gap-8 md:py-[4vw]`}>
      {side(p.before, "Before", p.b, p.bZh)}
      <div className="flex items-center self-center md:pb-24">
        <ThinArrow />
      </div>
      {side(p.after, "After", p.a, p.aZh, true)}
    </Reveal>
  );
}

/* ---------- page ---------- */

export default function ValsVeganKitchen() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO: framed split screen. Cover image left; name, line and dates right on a faint grid */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${V}/page-hero-v3.jpg`} alt="Val's Vegan Kitchen staff dashboard and welcome screen on two phones over black rock, on orange" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className={`absolute left-4 top-4 rounded-[6px] bg-black/25 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white`}>
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className={`w-[220px]`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${V}/logo.png`} alt="Val's Vegan Kitchen logo" width={256} height={256} className="mb-4 block h-10 w-10" />
              <h1 className="text-[16px] text-white">Val&apos;s Vegan Kitchen</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <L en={<>Order fast, <span style={{ color: VK_ORANGE }}>serve right.</span></>} zh={<>点得快，<span style={{ color: VK_ORANGE }}>做得准。</span></>} />
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">COGS 187A / UC San Diego</p>
            </Reveal>
            <div className={`absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80`}>
              {["UI/UX", "Group project", "Mobile"].map((t) => (
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
                en="An ordering app for a San Diego vegan burger restaurant, with a dashboard for the staff behind the counter."
                zh="为圣地亚哥一家素食汉堡店设计的点餐 App，并为柜台后的店员配套管理后台。"
              />
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className={`text-[13px] text-white`}>Context</p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="Customers want to order quickly and trust their discounts. Staff need an accurate menu while orders pour in."
                  zh="顾客希望快速点餐，并能确认优惠已生效；店员需要在订单涌入时保证菜单准确。"
                />
              </p>
            </div>
            <div>
              <p className={`text-[13px] text-white`}>
                <L en="What is Val's Vegan Kitchen?" zh="Val's Vegan Kitchen 是什么？" />
              </p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="A customer ordering flow and a staff side for menu and availability. We designed version 1, tested it, and refined it over two rounds of usability testing."
                  zh="一套顾客点餐流程，加上管理菜单与供应状态的店员端。我们设计了版本 1，经过两轮可用性测试迭代优化。"
                />
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className={LABEL}>
                  <L en="My role" zh="我的角色" />
                </p>
                <p className="text-[14px] text-white/80">UI/UX, Usability Testing</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Tools" zh="工具" />
                </p>
                <a href={figma.veganKitchen} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  Figma ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* KEY FEATURES: a panel, then the title left and Pain point / Solution right */}
      <section className="mt-28 flex flex-col gap-20 md:mt-40 md:gap-28">
        <div className="px-3">
          <p className={DIVIDER}>
            <L en="Key features" zh="核心功能" />
          </p>
          <div className="mt-2 h-px bg-white/15" />
        </div>
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col gap-8">
            <div className="px-2">
              <Panel shots={f.shots} />
            </div>
            <Row title={<Hx en={f.title} zh={f.titleZh} />}>
              <Points
                items={[
                  { k: <L en="Pain point." zh="痛点：" />, v: <Hx en={f.pain} zh={f.painZh} /> },
                  { k: <L en="Solution." zh="解决方案：" />, v: <Hx en={f.sol} zh={f.solZh} /> },
                ]}
              />
            </Row>
          </div>
        ))}
      </section>

      {/* INTERVIEW */}
      <section className="mt-36 md:mt-52">
        <Row
          title={<L en="Interview" zh="访谈" />}
          label={<L en="Four think-aloud sessions" zh="四场出声思考测试" />}
        >
          <p>
            <L
              en="One per scenario: two customers and two staff. Each ran a task, then compared the app with DoorDash and Chick-fil-A."
              zh="每个场景一场：两位顾客、两位店员。每人先完成任务，再将 App 与 DoorDash、Chick-fil-A 对比。"
            />
          </p>
        </Row>
        <Reveal className="mt-14 px-3 md:mt-20">
          <TeamShowcase
            dark
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
      </section>

      {/* KEY FINDINGS: a list in the right column */}
      <section className="mt-36 md:mt-52">
        <Reveal className="grid gap-6 px-3 md:grid-cols-[2fr_1fr] md:gap-8">
          <h2 className={TITLE}>
            <L en="Key findings" zh="主要发现" />
          </h2>
          <div className="max-w-[467px]">
            <p className={`${LABEL} mb-4`}>
              <L en="Every task was finished, but four problems kept coming up." zh="每项任务都完成了，但四个问题反复出现。" />
            </p>
            {FINDINGS.map((f, i) => (
              <div key={f.t} className="grid grid-cols-[32px_1fr] border-t border-white/15 py-4">
                <p className="pt-[3px] text-[12px]" style={{ color: VK_ORANGE }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className={BODY}>
                  <span className="text-white">
                    <Hx en={f.t} zh={f.tZh} />.
                  </span>{" "}
                  <Hx en={f.b} zh={f.bZh} />
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* EVALUATION: version 1, then version 2, three screens to a row */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52">
        <Row title={<L en="Evaluation" zh="评估" />} />
        {[
          // rows of three: version 1 is customer rows 0–1, staff rows 2–3; version 2's staff screens start in row 3
          { label: "Before", en: "Version 1, as participants saw it in the first round of testing.", zh: "版本 1：第一轮测试时参与者看到的样子。", shots: V1_SCREENS, staffRow: 2 },
          { label: "After", en: "Version 2, after two rounds of testing.", zh: "版本 2：经过两轮测试后的版本。", shots: V2_SCREENS.slice(0, 15), staffRow: 3 },
        ].map((g) => (
          <div key={g.label} className="flex flex-col gap-6">
            <Row>
              <p>
                <span style={g.label === "After" ? { color: VK_ORANGE } : { color: "#fff" }}>{g.label}.</span> <L en={g.en} zh={g.zh} />
              </p>
            </Row>
            <div className="px-2">
              <Panel
                shots={g.shots}
                rowLabels={{ 0: <L en="Customer" zh="顾客" />, [g.staffRow]: <L en="Staff" zh="店员" /> }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* CHANGES: before → after, one change at a time */}
      <section className="mt-36 flex flex-col gap-10 md:mt-52">
        <Row title={<L en="Changes" zh="修改" />} label={<L en="Five issues participants raised, and how version 2 answers each." zh="参与者提出的五个问题，以及版本 2 的回应。" />} />
        {PAIRS.map((p) => (
          <div key={p.title} className="flex flex-col gap-3">
            <p className={`${DIVIDER} px-3`}>
              <Hx en={p.title} zh={p.titleZh} />
            </p>
            <div className="px-2">
              <PairPanel p={p} />
            </div>
          </div>
        ))}
      </section>

      {/* DESIGN SYSTEM */}
      <section className="mt-36 md:mt-52">
        <Row title={<L en="Design system" zh="设计规范" />} />
        {/* equal space above and below, so the board sits midway between its title and Final design */}
        <Reveal className="mt-28 px-3 md:mt-40">
          <VeganDesignSystem dark />
        </Reveal>
      </section>

      {/* FINAL DESIGN: two or three screens per panel, the note beside it */}
      <section className="mt-28 flex flex-col gap-16 md:mt-40 md:gap-20">
        <Row title={<L en="Final design" zh="最终设计" />} />
        {FINAL.map((part) => (
          <div key={part.en} className="flex flex-col gap-10">
            <div className="px-3">
              <p className={DIVIDER}>
                <Hx en={part.en} zh={part.zh} />
              </p>
              <div className="mt-2 h-px bg-white/15" />
            </div>
            {part.groups.map((g) => (
              <div key={g.title} className="grid gap-6 px-2 md:grid-cols-[2fr_1fr] md:gap-8">
                <Panel shots={g.shots} cols={3} phone="w-[28%] max-w-[300px] md:w-[25%]" />
                <div className="px-1 md:pt-2">
                  <p className="text-[18px] text-white">
                    <Hx en={g.title} zh={g.titleZh} />
                  </p>
                  <div className={`${BODY} mt-3`}>
                    <Points items={g.points.map((pt) => ({ k: "", v: <Hx en={pt.en} zh={pt.zh} /> }))} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

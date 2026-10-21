import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { RateVideo } from "@/components/case/rate-video";
import { Shot } from "@/components/case/vegan-kit";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { figma, person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Leucadia 1875 Tequila — ${person.name}`,
  description: "Brand website for Leucadia 1875, an organic tequila with three expressions: Blanco, Reposado, and Añejo.",
};

// Same system as the Vegan Kitchen page (black, small type, zegzulka.com spacing), with the layout of the video
// reference: a short title and description on the left, the interface recording on the right inside a dark-grey
// frame (no stroke, a small even padding). Desktop scenes first, then the mobile screens three to a row.
const T = "/images/leucadia-tequila";
const GOLD = "#c9a46a"; // the brand's warm accent
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const TITLE = "text-[20px] leading-[1.2] text-white md:text-[24px]";
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";

// The three desktop recordings (reference/leucadia-tequila/scene-1..3.mp4): one product each, from the product
// story to adding it to the bag. Desktop has no homepage; that lives on mobile.
const SCENES: { n: string; t: string; tz: string; d: string; dz: string; src: string; rate?: number }[] = [
  {
    n: "Scene 1",
    t: "Blanco",
    tz: "Blanco",
    d: "From the product story (double distillation, ocean-blue agave) through serving ideas, to size, price and Add to Bag.",
    dz: "从产品故事（二次蒸馏、海蓝龙舌兰）到饮用方式，再到规格、价格和加入购物袋。",
    src: "/videos/tequila_scene1.mp4",
    rate: 1.5,
  },
  {
    n: "Scene 2",
    t: "Añejo",
    tz: "Añejo",
    d: "Two years in bourbon barrels: the story, the pairings, then delivery options and Add to Bag.",
    dz: "在波本桶中陈酿近两年：品牌故事、搭配推荐，然后是配送选项和加入购物袋。",
    src: "/videos/tequila_scene2.mp4",
  },
  {
    n: "Scene 3",
    t: "Reposado",
    tz: "Reposado",
    d: "Oak, vanilla and smoke: the story, how to enjoy it, the purchase page and the other two expressions.",
    dz: "橡木、香草与烟熏：品牌故事、饮用方式、购买页面，以及另外两个系列的推荐。",
    src: "/videos/tequila_scene3.mp4",
  },
];

const m = (n: number, alt: string) => ({ src: `${T}/m${n}.webp`, alt });
const MOBILE: { t: string; tz: string; d: string; dz: string; shots: { src: string; alt: string }[] }[] = [
  {
    t: "The three expressions",
    tz: "三个系列",
    d: "Blanco, Reposado and Añejo each open on a full screen, the mobile start of the same product pages as desktop.",
    dz: "Blanco、Reposado 和 Añejo 各以一整屏开场，对应桌面端同样的产品页面。",
    shots: [m(35, "Blanco product hero"), m(36, "Reposado product hero"), m(37, "Añejo product hero")],
  },
  {
    t: "Homepage (mobile only)",
    tz: "首页（仅移动端）",
    d: "On mobile the products are also gathered into one homepage scroll: the collection, the gift set, accessories and the newsletter.",
    dz: "移动端还把产品汇集成一条首页滚动：系列合集、礼盒、配件和订阅。",
    shots: [
      m(29, "Mobile homepage hero: a close-up of the Leucadia bottle"),
      m(30, "The hero hands off to the collection"),
      m(31, "All three expressions on the beach"),
      m(32, "Gift set: pick three, get 20% off"),
      m(33, "Accessories carousel"),
      m(34, "Newsletter sign-up, menus and social links"),
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

/** Interface recording in a dark-grey frame with a thin white stroke and a small even padding. */
function Framed({ src, label, rate }: { src: string; label: string; rate?: number }) {
  return (
    <div className="rounded-[14px] border border-white/60 bg-[#1c1c1c] p-2.5 md:p-3">
      <div className="relative aspect-[1730/1080] overflow-hidden rounded-[8px] bg-[#111]">
        <RateVideo src={src} rate={rate} aria-label={label} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}

function Phones({ shots }: { shots: { src: string; alt: string }[] }) {
  const rows: { src: string; alt: string }[][] = [];
  for (let i = 0; i < shots.length; i += 3) rows.push(shots.slice(i, i + 3));
  return (
    <Reveal className="flex flex-col gap-[6vw] bg-black px-[4%] py-[6vw] md:py-[5vw]">
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

/* ---------- page ---------- */

export default function LeucadiaTequila() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO: framed split screen, cover left, name right on a faint grid */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${T}/page-hero.jpg`} alt="The Leucadia 1875 website on a laptop on a black sideboard, showing the Blanco hero" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-black/30 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${T}/logo.png`} alt="Leucadia 1875 Organic Tequila logo" className="mb-4 block h-auto w-[72px]" />
              <h1 className="text-[16px] text-white">Leucadia 1875</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <L en={<>Organic tequila, <span style={{ color: GOLD }}>made slow.</span></>} zh={<>有机龙舌兰，<span style={{ color: GOLD }}>慢慢酿。</span></>} />
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">Posse.io / Brand website</p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["Web design", "Responsive", "E-commerce"].map((t) => (
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
                en="A luxury brand website for Leucadia 1875, an organic tequila with three expressions: Blanco, Reposado and Añejo."
                zh="为有机龙舌兰品牌 Leucadia 1875 设计的高端品牌网站，产品分为 Blanco、Reposado 和 Añejo 三个系列。"
              />
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="At Posse.io, my manager asked me to design a luxury website for the company's tequila brand. I studied comparable luxury sites, then designed desktop and mobile on my own."
                  zh="在 Posse.io 时，主管请我为公司旗下的龙舌兰品牌设计一个高端网站。我先研究了同类奢侈品牌网站，然后独立完成了桌面端和移动端的设计。"
                />
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white">
                <L en="The idea" zh="设计思路" />
              </p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="Image-led, so each expression has its own visual identity, while the shopping experience stays the same on every screen."
                  zh="以图片为主导：让每个系列都有自己的视觉个性，同时在每个屏幕上保持一致的购物体验。"
                />
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className={LABEL}>
                  <L en="My role" zh="我的角色" />
                </p>
                <p className="text-[14px] text-white/80">Visual & Web Design</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Tools" zh="工具" />
                </p>
                <a href={figma.posse} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  Figma ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DESKTOP: three scenes, text left, framed recording right */}
      <section className="mt-28 flex flex-col gap-28 md:mt-40 md:gap-44">
        <div className="px-3">
          <p className={DIVIDER}>
            <L en="Desktop" zh="桌面端" />
          </p>
          <div className="mt-2 h-px bg-white/15" />
        </div>
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
              <Framed src={s.src} rate={s.rate} label={`${s.t} on desktop: product story to Add to Bag`} />
            </Reveal>
          </div>
        ))}
      </section>

      {/* MOBILE: the same pages, three to a row */}
      <section className="mt-36 flex flex-col gap-16 md:mt-52 md:gap-20">
        <div className="px-3">
          <p className={DIVIDER}>
            <L en="Mobile" zh="移动端" />
          </p>
          <div className="mt-2 h-px bg-white/15" />
        </div>
        <Row title={<L en="Mobile mirrors desktop" zh="移动端与桌面端呼应" />}>
          <p>
            <L
              en="Each product page on desktop has a mobile version with the same sections in the same order, the same photography and type, so the brand reads the same on any screen."
              zh="桌面端的每个产品页在移动端都有对应版本：板块与顺序一致，摄影与字体一致，让品牌在任何屏幕上看起来都一样。"
            />
          </p>
        </Row>
        {MOBILE.map((g) => (
          <div key={g.t} className="flex flex-col gap-6">
            <Row title={<L en={g.t} zh={g.tz} />}>
              <p>
                <L en={g.d} zh={g.dz} />
              </p>
            </Row>
            <div className="px-2">
              <Phones shots={g.shots} />
            </div>
          </div>
        ))}
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

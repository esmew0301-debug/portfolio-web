import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { Callout } from "@/components/case/compare";
import { Box, Cards, Chip, Container, Contrast, Eyebrow, P, Pull, Section, Stack, Statement, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { StageFlow } from "@/components/case/stage-flow";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { FloatPair } from "@/components/case/float-pair";
import { MarkerHighlight as M } from "@/components/ui/marker-highlight";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person, selectedWork } from "@/lib/content";
import { L as Tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `UniSkin Duo — L'Oréal Men Expert Concept — ${person.name}`,
  description:
    "A student concept for L'Oréal Brandstorm 2025: a foundation and cleansing-oil set that makes complexion products simpler for first-time male users.",
};

const NAV: CaseNavItem[] = [
  { id: "context", index: "01", label: "Context" },
  { id: "theme", index: "02", label: "Defining the Theme" },
  { id: "brand", index: "03", label: "Brand Fit" },
  { id: "competitors", index: "04", label: "Competitor Analysis" },
  { id: "research", index: "05", label: "User Research" },
  { id: "insights", index: "06", label: "Insights" },
  { id: "strategy", index: "07", label: "Product Strategy" },
  { id: "concept", index: "08", label: "Concept Sketching" },
  { id: "modeling", index: "09", label: "3D Modeling" },
  { id: "identity", index: "10", label: "Color & Slogan" },
  { id: "outcome", index: "11", label: "Final Outcome" },
  { id: "reflection", index: "12", label: "Reflection" },
  { id: "group", index: "13", label: "Our Group" },
];

// Visuals are screenshots from the project deck and board, used as placeholders until the
// final exports are supplied — replace the files in /public/images/loreal with the same names.
const L = "/images/loreal";
const DOWNLOAD = {
  href: "/files/Croissant-au-San-Diego-LOreal-Project-Slide.pdf",
  name: "Croissant au San Diego - L'Oreal Project slide.pdf",
};

const SURVEY =
  "https://docs.google.com/spreadsheets/d/1rCu3-S6KbvwnbPHatc5zAHaJIRY91Q2ZDj_WcxMZ150/edit?gid=1161293833#gid=1161293833";

const SCOPE = ["Product Design", "Brand Strategy", "User Research", "Packaging", "3D Modeling"];

const SURVEY_QUESTIONS: [string, string][] = [
  ["What is your age?", "你的年龄是？"],
  ["Have you used makeup in your daily life?", "你在日常生活中使用过彩妆吗？"],
  ["What makes you not use makeup?", "是什么原因让你不使用彩妆？"],
  ["How often do you use makeup?", "你多久使用一次彩妆？"],
  ["Do you often use foundation for your makeup?", "化妆时，你经常使用粉底吗？"],
  ["When choosing a foundation that best suits you, what specific features do you consider?", "选择适合自己的粉底时，你会考虑哪些具体特点？"],
  ["Would you be more willing to try a men's foundation with essentials included?", "如果男士粉底含有精华成分，你会更愿意尝试吗？"],
  ["When buying men's foundation, do you want to pair it with a special makeup remover?", "购买男士粉底时，你希望搭配专门的卸妆产品吗？"],
  ["What do you think of the “2-in-1” product concept for liquid foundation?", "你怎么看“二合一”粉底液这一产品概念？"],
  ["What kind of promotion for men's foundation do you prefer?", "你更喜欢哪种男士粉底的推广方式？"],
];

const MARKET = [
  { item: "Skincare-infused foundation", itemZh: "含护肤成分的粉底", status: "Exists", statusZh: "已有", tone: "neutral" },
  { item: "Foundation for men", itemZh: "男士粉底", status: "A few", statusZh: "少数", tone: "neutral" },
  { item: "Nourishing foundation for men", itemZh: "具有养肤功效的男士粉底", status: "Very rare", statusZh: "非常少", tone: "gap" },
  { item: "Cleansing oil for men", itemZh: "男士卸妆油", status: "Almost none", statusZh: "几乎没有", tone: "gap" },
  { item: "Foundation + cleansing oil set", itemZh: "粉底 + 卸妆油套装", status: "None", statusZh: "没有", tone: "gap" },
] as const;

const MORE = selectedWork.filter((w) => w.label !== "NIO").slice(0, 2);
const isExternal = (href: string) => /^https?:\/\//.test(href);

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      <div className="font-gilroy text-[17px] leading-[1.6] text-neutral-300 md:text-[19px]">{children}</div>
    </div>
  );
}

/** An uncropped image with an optional caption. */
function Fig({
  src,
  alt,
  w,
  h,
  caption,
  className,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="block h-auto w-full rounded-[14px]" />
      {caption && <figcaption className="font-gilroy mt-3 text-[14px] leading-[1.55] text-neutral-400">{caption}</figcaption>}
    </figure>
  );
}

/** Images in a row, all cropped to one shared aspect ratio so edges line up. */
function Row({
  items,
  ratio,
  fit = "cover",
  caption,
  cols,
}: {
  items: { src: string; alt: string; pos?: string }[];
  ratio: string;
  fit?: "cover" | "contain";
  caption?: ReactNode;
  cols?: number;
}) {
  return (
    <figure>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols ?? items.length}, minmax(0, 1fr))` }}>
        {items.map((it) => (
          <div
            key={it.src}
            className={`relative overflow-hidden rounded-[14px] ${fit === "contain" ? "bg-white" : ""}`}
            style={{ aspectRatio: ratio }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
              style={{ objectPosition: it.pos ?? "center" }}
            />
          </div>
        ))}
      </div>
      {caption && <figcaption className="font-gilroy mt-3 text-[14px] leading-[1.55] text-neutral-400">{caption}</figcaption>}
    </figure>
  );
}

/** A dense document shown small, with an arrow to a short summary of what it says. */
function Note({ src, alt, label, children }: { src: string; alt: string; label: string; children: ReactNode }) {
  return (
    <div className="@container">
      <figure className="grid items-center gap-5 @min-[560px]:grid-cols-[200px_56px_minmax(0,1fr)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="mx-auto block w-[200px] rounded-[10px] opacity-90" />
        <svg aria-hidden viewBox="0 0 56 24" className="mx-auto hidden h-6 w-14 @min-[560px]:block" style={{ color: "var(--accent-green)" }}>
          <path d="M2 12h48M42 5l8 7-8 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <figcaption className="rounded-card border border-white/15 p-5 md:p-6" style={{ borderLeft: "2px solid var(--accent-green)" }}>
          <span className="font-gilroy text-[12px] uppercase tracking-[0.25em]" style={{ color: "var(--accent-green)" }}>
            {label}
          </span>
          <div className="font-gilroy mt-2 text-[15px] leading-[1.6] text-neutral-300 md:text-[16px]">{children}</div>
        </figcaption>
      </figure>
    </div>
  );
}

/** Whole images side by side at one shared height (no cropping), so top and bottom edges line up. */
function Strip({
  items,
  caption,
  max,
}: {
  items: { src: string; alt: string; w: number; h: number }[];
  caption?: ReactNode;
  max?: number;
}) {
  return (
    <figure className="mx-auto w-full" style={{ maxWidth: max }}>
      <div className="flex flex-col gap-4 sm:flex-row">
        {items.map((it) => (
          <div key={it.src} className="min-w-0" style={{ flex: `${it.w / it.h} 1 0` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.alt} width={it.w} height={it.h} loading="lazy" className="block h-auto w-full rounded-[14px]" />
          </div>
        ))}
      </div>
      {caption && <figcaption className="font-gilroy mt-3 text-[14px] leading-[1.55] text-neutral-400">{caption}</figcaption>}
    </figure>
  );
}

/** Small inline arrow accent. */
function Arrow() {
  return (
    <span aria-hidden className="mx-1.5 inline-block" style={{ color: "var(--accent-green)" }}>
      →
    </span>
  );
}

const PRODUCTS = [
  { img: "p-estee", brand: "Estée Lauder", name: "Futurist Hydra Rescue", price: "$55", note: "Soothing, hydrating, SPF 45.", noteZh: "舒缓保湿，SPF 45。" },
  { img: "p-chanel-touch", brand: "Chanel", name: "Les Beiges Complexion Touch", price: "$70", note: "12-hour hydration; tested on women.", noteZh: "12 小时保湿；在女性人群中测试。" },
  { img: "p-chanel-tint", brand: "Chanel", name: "Les Beiges Water-Fresh Tint", price: "$70", note: "75% water, 8 hours of hydration.", noteZh: "75% 水分，8 小时保湿。" },
  { img: "p-chanel-sublimage", brand: "Chanel", name: "Sublimage L’Essence de Teint", price: "$175", note: "Moisturizing serum texture.", noteZh: "精华般的滋润质地。" },
  { img: "p-chanel-vitalumiere", brand: "Chanel", name: "Vitalumière Aqua", price: "$57", note: "Hyaluronic acid and SPF 15.", noteZh: "含透明质酸，SPF 15。" },
  { img: "p-ysl", brand: "YSL", name: "Nu Bare Look Tint", price: "$48", note: "Hyaluronic-acid skin tint, 24-hour hydration.", noteZh: "透明质酸肤色修饰乳，24 小时保湿。" },
  { img: "p-givenchy", brand: "Givenchy", name: "Prisme Libre Skin-Caring Matte", price: "", note: "82% skincare base, 24-hour wear.", noteZh: "82% 护肤成分基底，24 小时持妆。" },
];

function DownloadButton({ large }: { large?: boolean }) {
  return (
    <a
      href={DOWNLOAD.href}
      download={DOWNLOAD.name}
      data-cursor-hover
      className={`font-gilroy group inline-flex w-fit items-center gap-3 rounded-full text-white transition-transform duration-300 hover:-translate-y-0.5 ${
        large ? "px-7 py-4 text-[16px] md:text-[17px]" : "px-5 py-3 text-[15px]"
      }`}
      style={{ background: "var(--accent-green)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Tr en="Download the final slides (PDF)" zh="下载最终提案 PDF" />
    </a>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5`} className="tracking-[0.15em]" style={{ color: "#d4af37" }}>
      {"★".repeat(n)}
      <span className="opacity-25">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function LorealProject() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-black">
        <Image
          src={`${L}/cover.jpg`}
          alt="UniSkin Duo packaging layouts: the “I Come” foundation and the “Go” cleansing oil"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.45)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#b8942f" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* Title */}
          <section className="pt-14 md:pt-20">
            <Container>
              <div className="mb-10">
                <BackLink
                  href="/#playground"
                  className="font-gilroy inline-flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-white"
                >
                  <span>←</span>Back to Playground
                </BackLink>
              </div>
              <Reveal>
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">Playground · L&apos;Oréal Brandstorm 2025</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(44px,7vw,104px)] font-medium leading-[0.95] tracking-[-0.01em] text-white">
                  UniSkin Duo
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  <Tr
                    en="A student product concept: a foundation and cleansing-oil set that makes complexion products easier to start with for young men."
                    zh="一个学生产品概念：一套粉底液与卸妆油组合，让年轻男性更容易开始使用底妆产品。"
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
                  <p>
                    <Tr
                      en="UniSkin Duo pairs a nourishing foundation with a cleansing oil in a two-step daily cycle: apply in the
                    morning, remove at night."
                      zh="UniSkin Duo 把一款养肤粉底液和一款卸妆油组合在一起，形成每天两步的循环：早上上妆，晚上卸妆。"
                    />
                  </p>
                  <p>
                    <Tr
                      en="We wanted a shorter routine, and a foundation that feels as approachable for first-time users as skincare."
                      zh="我们希望简化使用步骤，让第一次使用粉底的人也能像使用护肤品一样轻松上手。"
                    />
                  </p>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-[1.3fr_1fr_1fr]">
                <Meta label="Type">
                  <div className="flex flex-wrap gap-2">
                    {SCOPE.map((s) => (
                      <Chip key={s} variant="role">
                        {s}
                      </Chip>
                    ))}
                  </div>
                </Meta>
                <Meta label="Brand">L&apos;Oréal Paris · L&apos;Oréal Men Expert</Meta>
                <Meta label="Product">
                  <Tr en={<>Foundation &amp; cleansing-oil set · $80–100 (concept price)</>} zh="粉底液与卸妆油套装 · $80–100（概念定价）" />
                </Meta>
              </div>
              <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
                <p className="font-gilroy max-w-[52ch] text-[16px] leading-[1.6] text-neutral-400">
                  <Tr
                    en="The final submission: product sheet, ingredients, pricing, and packaging, as a three-page PDF."
                    zh="最终提交的方案：包含产品说明、成分、定价和包装，共三页 PDF。"
                  />
                </p>
                <DownloadButton />
              </div>
            </Container>
          </section>

          {/* 01 — CONTEXT */}
          <Section id="context" index="01" label="Context" title={<Tr en="A gap in men's complexion products." zh="男士底妆产品的空白。" />}>
            <P>
              <Tr
                en={<>Beauty has moved fast on inclusivity, yet men remain underserved in complexion. Men&apos;s ranges focus on
              cleansing and oil control, while foundation is designed almost entirely for women.</>}
                zh="美妆行业在包容性上进步很快，但男性在底妆领域仍然缺少合适的选择。男士产品线大多聚焦于清洁和控油，而粉底几乎全是为女性设计的。"
              />
            </P>
            <P>
              <Tr
                en={<>Many young men care about how they look, but getting started with complexion products is <M>harder than it should be</M>:</>}
                zh={<>很多年轻男性在意自己的外表，但开始使用底妆产品<M>比想象中难</M>：</>}
              />
            </P>
            <Cards
              columns={2}
              items={[
                { index: "01", title: <Tr en="Too many choices" zh="选择太多" />, body: <p><Tr en="Shades and formulas are hard to navigate without experience." zh="没有经验的人，很难在各种色号和配方中做出选择。" /></p> },
                { index: "02", title: <Tr en="A high learning cost" zh="学习成本高" />, body: <p><Tr en="Multi-step routines assume skills beginners lack." zh="多步骤的化妆流程，默认使用者具备新手并不具备的技巧。" /></p> },
                { index: "03", title: <Tr en="Stereotype pressure" zh="刻板印象的压力" />, body: <p><Tr en="Wearing makeup still carries a social stigma for many men." zh="对很多男性来说，化妆仍然会面临社会上的偏见。" /></p> },
                { index: "04", title: <Tr en="No beginner-friendly option" zh="缺少适合新手的产品" />, body: <p><Tr en="Few products target men just starting out." zh="很少有产品是面向刚开始尝试的男性设计的。" /></p> },
              ]}
            />
            <Pull label="Mission">
              <p>
                <Tr en="Design a nourishing complexion product for young men" zh="为年轻男性设计一款养肤型底妆产品，" />
              </p>
              <p>
                <Tr en="that is easy to start with and quick to use." zh="容易上手，用起来也快。" />
              </p>
            </Pull>
          </Section>

          {/* 02 — DEFINING THE THEME */}
          <Section id="theme" index="02" label="Defining the Theme" title={<Tr en="Choosing which social-justice angle to design for." zh="选择从哪个社会议题的角度切入。" />}>
            <P>
              <Tr en="We mapped three social-justice perspectives the project could stand for." zh="我们梳理了这个项目可以代表的三个社会议题方向。" />
            </P>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {[
                {
                  n: 3,
                  title: "Gender-inclusive and non-binary formulations",
                  zh: ["面向不同性别及非二元性别群体的包容性产品", "很少有产品服务跨性别男性和非二元性别人群。", "整个行业在很大程度上仍以二元性别划分。"],
                  gap: "Few products serve trans men and non-binary people.",
                  belief: "The industry remains largely binary.",
                },
                {
                  n: 2,
                  title: "Underrepresented male demographics",
                  zh: ["被忽视的男性群体", "几乎没有产品服务年长男性、残障男性或边缘化社群。", "包容性也应该涵盖年龄歧视和残障议题。"],
                  gap: "Little serves older men, men with disabilities, or marginalized communities.",
                  belief: "Inclusion should also address ageism and disability.",
                },
                {
                  n: 1,
                  title: "Dual-purpose grooming & wellness",
                  zh: ["兼顾外表打理与身心健康", "很少有产品把外表打理和身心健康结合在一起。", "自我关爱既包括外表，也包括心理健康。"],
                  gap: "Few products combine grooming with wellness.",
                  belief: "Self-care covers appearance and mental well-being.",
                },
              ].map((d) => (
                <div key={d.title} className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-8">
                  <div>
                    <Stars n={d.n + 2} />
                    <h4 className="font-blinker mt-2 text-[19px] font-medium leading-snug text-white"><Tr en={d.title} zh={d.zh[0]} /></h4>
                  </div>
                  <div className="font-gilroy space-y-2 text-[15px] leading-[1.6] text-neutral-400 md:text-[16px]">
                    <p>
                      <span className="text-neutral-200">Gap: </span>
                      <Tr en={d.gap} zh={d.zh[1]} />
                    </p>
                    <p>
                      <span className="text-neutral-200">Overlooked belief: </span>
                      <Tr en={d.belief} zh={d.zh[2]} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Note src={`${L}/outline-themes.webp`} alt="Meeting summary ranking three social-justice perspectives" label="From our meeting summary">
              <Tr
                en={<><M>Gender-inclusive beauty ranked first</M>. Within it, we narrowed the scope to fit the project and our
              research focus.</>}
                zh={<><M>性别包容的美妆排在第一位</M>。在这个方向下，我们又根据项目范围和研究重点进一步缩小了切入点。</>}
              />
            </Note>
            <div>
              <Eyebrow>Decision</Eyebrow>
              <P>
                <Tr
                  en={<>We chose to concentrate on <M>first-time male makeup users</M>, particularly those looking for a simple,
                natural-looking routine:</>}
                  zh={<>我们决定聚焦<M>第一次尝试化妆的男性</M>，尤其是那些想要简单、妆效自然的使用者：</>}
                />
              </P>
            </div>
            <Cards
              columns={3}
              items={[
                { title: <Tr en="Clearer user need" zh="用户需求更明确" />, body: <p><Tr en="Many young men are curious about complexion products but new to them." zh="很多年轻男性对底妆产品感到好奇，但还没有真正用过。" /></p> },
                { title: <Tr en="Fits the product" zh="与产品属性相符" />, body: <p><Tr en="A complexion product, not a medical or wellness aid." zh="这是一款底妆产品，而不是医疗或健康类辅助产品。" /></p> },
                { title: <Tr en="Fits an existing brand" zh="契合现有品牌" />, body: <p><Tr en={<>It lines up with L&apos;Oréal&apos;s men&apos;s lines, which we compare next.</>} zh="它和 L'Oréal 现有的男士产品线相契合，下面会具体比较。" /></p> },
              ]}
            />
          </Section>

          {/* 03 — BRAND FIT */}
          <Section id="brand" index="03" label="Brand Fit" title={<Tr en="Which L'Oréal brand should carry it?" zh="应该由 L'Oréal 旗下哪个品牌来推出？" />}>
            <P>
              <Tr
                en={<>We compared three L&apos;Oréal men&apos;s lines on positioning, R&amp;D, values, and price.</>}
                zh="我们从品牌定位、研发、品牌理念和价格四个方面，比较了 L'Oréal 旗下的三个男士产品线。"
              />
            </P>
            <div className="grid gap-4 xl:grid-cols-3">
              {[
                {
                  name: "L'Oréal Men Expert",
                  n: 5,
                  keys: "Efficient · practical · convenient",
                  body: "Affordable, fast routines for busy young men (18–35), plus a push against skincare stereotypes.",
                  note: "Best match: same users, philosophy, and focus on efficiency.",
                  zh: ["为忙碌的年轻男性（18–35 岁）提供平价、快捷的护理方案，同时也在打破人们对男士护肤的刻板印象。", "最契合：目标用户、品牌理念和对效率的重视都一致。"],
                  best: true,
                },
                {
                  name: "Garnier Men",
                  n: 4,
                  keys: "Affordable · everyday care",
                  body: "Practical, natural care for young men on a budget.",
                  note: "Close fit, but focused on care rather than makeup.",
                  zh: ["为预算有限的年轻男性提供实用、天然的护理产品。", "比较接近，但重心在护理而不是彩妆。"],
                },
                {
                  name: "Biotherm Homme",
                  n: 3,
                  keys: "Premium · repair",
                  body: "Mid-to-high-end skincare for men with higher incomes.",
                  note: "Right philosophy, wrong price for most users.",
                  zh: ["面向高收入男性的中高端护肤品牌。", "理念契合，但价格超出了大多数目标用户的承受范围。"],
                },
              ].map((b) => (
                <div
                  key={b.name}
                  className="flex flex-col rounded-card border p-6"
                  style={{
                    borderColor: b.best ? "var(--accent-green)" : undefined,
                    background: b.best ? "color-mix(in srgb, var(--accent-green) 10%, var(--case-bg, #0b0b0b))" : undefined,
                  }}
                >
                  <Stars n={b.n} />
                  <h4 className="font-blinker mt-3 text-[20px] font-medium leading-tight text-white">{b.name}</h4>
                  <span className="font-gilroy mt-1 text-[13px] uppercase tracking-[0.15em] text-neutral-500">{b.keys}</span>
                  <p className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400"><Tr en={b.body} zh={b.zh[0]} /></p>
                  <p className="font-gilroy mt-4 border-t border-white/10 pt-4 text-[14px] leading-[1.55] text-neutral-300"><Tr en={b.note} zh={b.zh[1]} /></p>
                </div>
              ))}
            </div>
            <Row
              ratio="1150 / 1003"
              items={[
                { src: `${L}/shelf-menexpert.webp`, alt: "L'Oréal Men Expert moisturizers, $9–15" },
                { src: `${L}/shelf-clinique.webp`, alt: "Clinique For Men sets and lotion" },
                { src: `${L}/shelf-baxter.webp`, alt: "Baxter of California oil-free moisturizer" },
              ]}
              caption={<Tr en="Men's shelves today: care, not complexion. Men Expert sells daily care at $9–15." zh="如今的男士货架：卖的是护理，而不是底妆。Men Expert 的日常护理产品售价为 $9–15。" />}
            />
          </Section>

          {/* 04 — COMPETITOR ANALYSIS */}
          <WideSection id="competitors" index="04" label="Competitor Analysis" title={<Tr en="Five luxury brands, and a gap for men." zh="五个奢侈品牌，以及留给男性的空白。" />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  <Tr
                    en="We studied foundations from Estée Lauder, Chanel, Dior, YSL, and Givenchy, including every ingredient list."
                    zh="我们研究了 Estée Lauder、Chanel、Dior、YSL 和 Givenchy 的粉底产品，包括每一款的成分表。"
                  />
                </P>
                <P>
                  <Tr
                    en={<>Four of the five offer a caring foundation, and <M>all of them are marketed to women</M>. None of the brands we
                  reviewed sold a foundation paired with a cleansing oil.</>}
                    zh={<>五个品牌中有四个推出了养肤型粉底，而且<M>全部都面向女性营销</M>。我们调研的品牌中，没有一个推出过粉底与卸妆油搭配的组合。</>}
                  />
                </P>
              </div>
              <FloatPair
                left={{ src: `${L}/float-estee.png`, alt: "Estée Lauder Futurist SkinTint Serum", w: 667, h: 1031 }}
                right={{ src: `${L}/float-givenchy.png`, alt: "Givenchy Prisme Libre Skin-Caring Matte", w: 351, h: 987 }}
              >
                <p className="font-sulphur text-[clamp(22px,2.4vw,34px)] leading-[1.2] tracking-[-0.01em] text-white">
                  <Tr
                    en={<>Caring foundations exist,{" "}
                  <M>
                    but the ones we found were made for women
                  </M>
                  .</>}
                    zh={<>养肤型粉底并不少见，<M>但我们找到的都是为女性设计的</M>。</>}
                  />
                </p>
                <p className="font-gilroy mt-4 text-[12px] uppercase tracking-[0.2em] text-neutral-500">Tap a bottle</p>
              </FloatPair>
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <Eyebrow className="mb-4">Foundations we checked</Eyebrow>
                  <span className="font-gilroy mb-4 text-[12px] uppercase tracking-[0.2em] text-neutral-500">Scroll →</span>
                </div>
                <div className="-mx-gutter overflow-x-auto px-gutter pb-3 [scrollbar-width:thin] md:-mx-gutter-lg md:px-gutter-lg">
                  <ul className="flex w-max snap-x snap-mandatory gap-4">
                    {PRODUCTS.map((p) => (
                      <li key={p.img} className="w-[230px] shrink-0 snap-start md:w-[250px]">
                        <div className="relative overflow-hidden rounded-[14px] bg-white" style={{ aspectRatio: "3 / 4" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${L}/${p.img}.webp`} alt={`${p.brand} ${p.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-4" />
                        </div>
                        <p className="font-gilroy mt-3 text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                          {p.brand} {p.price && <span className="text-neutral-400">· {p.price}</span>}
                        </p>
                        <p className="font-blinker mt-1 text-[17px] font-medium leading-snug text-white">{p.name}</p>
                        <p className="font-gilroy mt-2 border-l-2 pl-3 text-[14px] leading-[1.5] text-neutral-400" style={{ borderColor: "var(--accent-green)" }}>
                          <Tr en={p.note} zh={p.noteZh} />
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-gilroy mt-3 text-[14px] text-neutral-500">
                  <Tr en="Dior: hydrating foundations, but none with a nourishing function." zh="Dior：有保湿型粉底，但没有具备养肤功效的产品。" />
                </p>
              </div>
            </Stack>
            <Stack>
              <div>
                <Eyebrow>What we found in the products we reviewed</Eyebrow>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {MARKET.map((m) => (
                    <div key={m.item} className="flex items-baseline justify-between gap-6 py-4">
                      <span className="font-gilroy text-[16px] text-neutral-200 md:text-[18px]"><Tr en={m.item} zh={m.itemZh} /></span>
                      <span
                        className="font-blinker shrink-0 text-[17px] font-medium md:text-[19px]"
                        style={{ color: m.tone === "gap" ? "var(--accent-green)" : undefined }}
                      >
                        <Tr en={m.status} zh={m.statusZh} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Callout kind="opportunity">
                <Tr
                  en={<>Among the brands and products we reviewed, we found few options positioned around a beginner-friendly men&apos;s
                complexion routine. The gap was the routine as much as the foundation.</>}
                  zh="在我们调研的品牌和产品中，很少有定位于“适合男性新手的底妆流程”的选择。空白不仅在于粉底本身，也在于围绕它的整套使用流程。"
                />
              </Callout>
            </Stack>
          </WideSection>

          {/* 05 — USER RESEARCH */}
          <Section id="research" index="05" label="User Research" title={<Tr en="Testing assumptions before designing anything." zh="在动手设计之前，先验证假设。" />}>
            <P>
              <Tr
                en="We combined interviews and review analysis with a bilingual survey on complexion products and a two-product format."
                zh="我们结合了访谈、产品评价分析，以及一份关于底妆产品和双产品组合形式的中英双语问卷。"
              />
            </P>
            <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
              {[
                { n: "208", l: "Survey responses (175 makeup users, 32 non-users)", zh: "份问卷回复（175 位彩妆使用者，32 位非使用者）" },
                { n: "3+", l: "Countries", zh: "个国家" },
                { n: "20+", l: "Regions", zh: "个地区" },
              ].map((s) => (
                <div key={s.l}>
                  <span className="font-blinker block text-[clamp(40px,5vw,72px)] font-medium leading-none text-white">{s.n}</span>
                  <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400 md:text-[15px]"><Tr en={s.l} zh={s.zh} /></span>
                </div>
              ))}
            </div>
            <div>
              <Eyebrow>Survey questions</Eyebrow>
              <ol className="border-t border-white/10">
                {SURVEY_QUESTIONS.map(([q, qz], i) => (
                  <li key={q} className="grid grid-cols-[40px_1fr] gap-3 border-b border-white/10 py-3.5">
                    <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-gilroy text-[15px] leading-[1.55] text-neutral-300 md:text-[16px]"><Tr en={q} zh={qz} /></span>
                  </li>
                ))}
              </ol>
            </div>
            <P>
              <Tr en="These four results shaped the concept most:" zh="对产品概念影响最大的是这四项结果：" />
            </P>
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {[
                { n: "46%", l: "rank “natural and fit” as the top foundation feature", zh: "把“自然、服帖”列为粉底最重要的特点" },
                { n: "76%", l: "are open to a 2-in-1 foundation", zh: "愿意接受二合一粉底" },
                { n: "68%", l: "would try, or want, a foundation with essence ingredients", zh: "愿意尝试或希望使用含精华成分的粉底" },
                { n: "53%", l: "of non-users say they simply don't know much about makeup", zh: "的非使用者表示，自己只是不太了解化妆" },
              ].map((s) => (
                <div key={s.l} className="rounded-card border border-white/10 p-5">
                  <span className="font-blinker block text-[clamp(30px,3vw,44px)] font-medium leading-none" style={{ color: "var(--accent-green)" }}>{s.n}</span>
                  <span className="font-gilroy mt-3 block text-[14px] leading-[1.5] text-neutral-400"><Tr en={s.l} zh={s.zh} /></span>
                </div>
              ))}
            </div>
            <Row
              cols={2}
              fit="contain"
              ratio="1520 / 887"
              items={[
                { src: `${L}/chart-features.webp`, alt: "Features considered when choosing a foundation", pos: "top" },
                { src: `${L}/chart-2in1.webp`, alt: "Opinions on the 2-in-1 foundation concept", pos: "top" },
                { src: `${L}/chart-essentials.webp`, alt: "Willingness to try a men's foundation with essence ingredients", pos: "top" },
                { src: `${L}/chart-nonusers.webp`, alt: "Why non-users don't use makeup", pos: "top" },
              ]}
            />
            <div className="flex flex-col gap-4 rounded-card border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <p className="font-gilroy max-w-[46ch] text-[15px] leading-[1.6] text-neutral-400">
                <Tr en="All raw responses and summary charts are in the original survey sheet." zh="所有原始回复和汇总图表都在原始问卷表格中。" />
              </p>
              <a
                href={SURVEY}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="font-gilroy inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[15px] text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--accent-green)" }}
              >
                <Tr en="Open Link" zh="打开链接" /> <span aria-hidden>↗</span>
              </a>
            </div>
          </Section>

          {/* 06 — INSIGHTS */}
          <WideSection id="insights" index="06" label="Insights" title={<Tr en="What respondents cared about." zh="受访者在意什么。" />}>
            <Reveal>
              <Cards
                columns={2}
                items={[
                  { index: "01", title: <Tr en="Simple routines come first" zh="简单的流程最重要" />, body: <p><Tr en="Respondents wanted simple routines and avoided multi-step ones." zh="受访者希望流程简单，会避开步骤繁多的方案。" /></p> },
                  { index: "02", title: <Tr en="Natural matters more than coverage" zh="自然比遮瑕力更重要" />, body: <p>
                      <Tr en={<M>“Look better — not like I&apos;m wearing makeup.”</M>} zh={<M>“想看起来更好，但不想看起来像化了妆。”</M>} />
                    </p> },
                  { index: "03", title: <Tr en="Skincare benefits raise acceptance" zh="护肤功效提高了接受度" />, body: <p><Tr en="Oil control and hydration mattered most; a caring foundation felt easier to try." zh="控油和保湿最受重视；带有护肤功效的粉底让人更愿意尝试。" /></p> },
                  { index: "04", title: <Tr en="Being noticed is a concern" zh="担心被别人看出来" />, body: <p>
                      <Tr
                        en={<>Some respondents were open to foundation but didn&apos;t want <M>other people noticing it</M>.</>}
                        zh={<>一些受访者愿意尝试粉底，但不希望<M>被别人察觉</M>。</>}
                      />
                    </p> },
                ]}
              />
            </Reveal>
            <Stack>
              <div>
                <Eyebrow>Client portrait</Eyebrow>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { t: "Who", items: ["Men aged 18–30", "Students and recent graduates", "Young working professionals"], zh: ["18–30 岁男性", "学生和应届毕业生", "年轻的职场人士"] },
                    {
                      t: "Characteristics",
                      items: ["Likely oily skin", "Values efficiency", "A makeup beginner", "Social and outgoing", "Cares about appearance"],
                      zh: ["多为油性肌肤", "重视效率", "化妆新手", "外向、爱社交", "在意外表"],
                    },
                    {
                      t: "Needs",
                      items: ["No extra steps", "Long-lasting, low-maintenance wear", "A natural look", "Concealing effect", "Balanced oil control"],
                      zh: ["不增加额外步骤", "持久、无需频繁补妆", "妆效自然", "有遮瑕效果", "控油平衡"],
                    },
                    {
                      t: "Pain points",
                      items: ["Hard to find the right product", "Dislikes complicated routines", "Wants it unnoticeable", "Hesitant about wearing makeup"],
                      zh: ["很难找到合适的产品", "不喜欢复杂的流程", "希望看不出化了妆", "对化妆有顾虑"],
                    },
                  ].map((c) => (
                    <div key={c.t} className="rounded-card border border-white/10 bg-white/[0.03] p-6">
                      <h5 className="font-blinker text-[18px] font-medium text-white">{c.t}</h5>
                      <ul className="font-gilroy mt-3 space-y-1.5 text-[15px] leading-[1.5] text-neutral-400">
                        {c.items.map((i, k) => (
                          <li key={i}>
                            <Tr en={i} zh={c.zh[k]} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <Note src={`${L}/outline-portrait.webp`} alt="Product outline: client portrait and needs" label="From our product outline">
                <Tr
                  en={<>Men 18–30, likely oily skin, new to makeup, who put <M>efficiency</M> first.</>}
                  zh={<>18–30 岁的男性，多为油性肌肤，刚开始接触化妆，最看重<M>效率</M>。</>}
                />
              </Note>
              <Callout kind="insight">
                <Tr
                  en="The opportunity: skincare benefits, a natural finish, and minimal effort, designed for men."
                  zh="机会在于：为男性设计一款兼具护肤功效、自然妆效，而且几乎不费力的产品。"
                />
              </Callout>
            </Stack>
          </WideSection>

          {/* 07 — PRODUCT STRATEGY */}
          <WideSection id="strategy" index="07" label="Product Strategy" title={<Tr en="A complexion system, not a single foundation." zh="一套底妆系统，而不只是一支粉底。" />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-6">
                  <P>
                    <Tr
                      en={<>UniSkin Duo brings complexion and makeup removal together in one beginner-friendly set. The foundation includes{" "}
                    <M>skincare-oriented ingredients</M>, and the cleansing oil provides a straightforward removal step.</>}
                      zh={<>UniSkin Duo 把底妆和卸妆整合进一套适合新手的组合里。粉底液含有<M>护肤类成分</M>，卸妆油则提供一个简单直接的卸妆步骤。</>}
                    />
                  </P>
                  <P>
                    <Tr
                      en={<>The survey supported the foundation half of this: respondents valued a natural-looking finish and were open to a
                    2-in-1 foundation with skincare-oriented ingredients. Pairing it with a cleansing oil was our own proposal, to
                    complete a simple routine. The results shown here don&apos;t test the set itself.</>}
                      zh="问卷结果支持的是其中粉底这一半：受访者看重自然的妆效，也愿意接受含护肤类成分的二合一粉底。搭配卸妆油则是我们自己的提议，目的是让整套流程更完整、更简单。这里展示的结果并没有验证这套组合本身。"
                    />
                  </P>
                </div>
                <Box label="Strategy">
                  <Tr en="Fewer steps and fewer decisions for first-time users." zh="让第一次使用的人少走几步，也少做几个决定。" />
                </Box>
              </div>
              <Contrast
                left={{ label: "A typical routine", items: <Tr en="Skincare → Primer → Foundation → Removal" zh="护肤 → 妆前乳 → 粉底 → 卸妆" /> }}
                right={{ label: "With UniSkin Duo", items: <Tr en="Foundation with skincare ingredients → Cleansing Oil" zh="含护肤成分的粉底 → 卸妆油" /> }}
              />
              <div>
                <Eyebrow>The 24-hour cycle</Eyebrow>
                <StageFlow
                  stages={[
                    { title: "Morning", body: <Tr en="Foundation is designed to even skin tone and control oil, with skincare ingredients built in." zh="粉底的设计目标是均匀肤色、控油，并含有护肤成分。" /> },
                    { title: "Day", body: <Tr en="The aim: fewer touch-ups, less to think about." zh="目标是：少补妆，少操心。" /> },
                    { title: "Night", body: <Tr en="Cleansing oil removes makeup, with nourishing oils in the formula." zh="卸妆油负责卸除妆容，配方中含有滋养油脂。" /> },
                  ]}
                />
              </div>
            </Stack>
          </WideSection>

          {/* 08 — CONCEPT SKETCHING */}
          <WideSection id="concept" index="08" label="Concept Sketching" title={<Tr en="From two products to one daily loop." zh="从两件产品，到一个日常循环。" />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  <Tr
                    en={<>Foundation in the morning <Arrow /> fewer extra steps. Cleansing oil at night <Arrow /> removes it, with nourishing oils.</>}
                    zh={<>早上用粉底 <Arrow /> 省去额外步骤。晚上用卸妆油 <Arrow /> 卸妆的同时滋养肌肤。</>}
                  />
                </P>
                <P>
                  <Tr
                    en={<>Three structure iterations, then packaging drafts, each checked against <M>efficiency, clarity, and a natural look</M>.</>}
                    zh={<>先做了三轮结构迭代，再绘制包装草图，每一版都对照<M>效率、清晰度和自然感</M>来检查。</>}
                  />
                </P>
              </div>
              <Strip
                items={[
                  { src: `${L}/sketch-structure.webp`, alt: "Hand-drawn box plan with outer dimensions: 20 × 12 cm", w: 1100, h: 1005 },
                  { src: `${L}/sketch-dimensioned.webp`, alt: "Dimensioned plan of the box: bottle compartments and inserts, in centimeters", w: 1446, h: 710 },
                ]}
                caption={<Tr en="From the overall box (20 × 12 cm) to the dimensioned plan for both compartments." zh="从整体包装盒（20 × 12 cm），到两个隔层的标注尺寸图。" />}
                max={900}
              />
              <Strip
                items={[
                  { src: `${L}/draft-a.webp`, alt: "Sketchbook draft of the foundation label", w: 530, h: 520 },
                  { src: `${L}/draft-b.webp`, alt: "Sketchbook draft of the “Come” and “Go” bottle labels", w: 530, h: 520 },
                ]}
                caption={<Tr en="Packaging layout drafts for the “Come” and “Go” sides." zh="“Come”和“Go”两侧的包装版式草图。" />}
                max={620}
              />
            </Stack>
          </WideSection>

          {/* 09 — 3D MODELING */}
          <WideSection id="modeling" index="09" label="3D Modeling" title={<Tr en="Shaping the box and bottles in 3D." zh="用 3D 打磨包装盒和瓶身。" />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  <Tr
                    en="We used 3D models to check proportions: clean lines that balance a masculine feel with a neutral tone."
                    zh="我们用 3D 模型来检查比例：线条简洁，在男性气质和中性风格之间取得平衡。"
                  />
                </P>
                <P>
                  <Tr
                    en="A window shows the shade without opening the box, and the bottles are sized to hold in one hand."
                    zh="包装上开了一个小窗，不用打开盒子就能看到色号；瓶身的尺寸也设计成单手就能握住。"
                  />
                </P>
              </div>
              <Fig src={`${L}/modeling-screen.webp`} w={1417} h={737} alt="The box and both bottles modeled in Cinema 4D" caption={<Tr en="Modeling the box, bottles, and caps in Cinema 4D." zh="在 Cinema 4D 中为包装盒、瓶身和瓶盖建模。" />} className="mx-auto w-full max-w-[760px]" />
              <div className="grid gap-4 xl:grid-cols-3">
                {[
                  { s: "render-angle", w: 1410, h: 1423, alt: "Rendered box with the foundation bottle in its window" },
                  { s: "render-closed", w: 949, h: 1075, alt: "Rendered box, front view, with the cleansing oil bottle" },
                  { s: "render-open", w: 680, h: 861, alt: "Rendered box set showing both bottles through side windows" },
                ].map((c) => (
                  <div key={c.s} className="flex aspect-square items-center justify-center overflow-hidden rounded-[14px] bg-white p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${L}/${c.s}.webp`} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </Stack>
          </WideSection>

          {/* 10 — COLOR & SLOGAN */}
          <WideSection id="identity" index="10" label="Color & Slogan" title={<Tr en="Black and gold. I come and I go." zh="黑与金。I come and I go." />}>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-6">
                  <Eyebrow className="mb-0">Color</Eyebrow>
                  <P>
                    <Tr
                      en="Inspired by YSL Libre, the palette pairs deep black with metallic gold. Black keeps it neutral and free of
                    gendered cues; gold adds warmth and quiet prestige."
                      zh="配色灵感来自 YSL Libre，以深黑搭配金属金。黑色保持中性，不带性别暗示；金色则增添温度和低调的质感。"
                    />
                  </P>
                  <P>
                    <Tr en={<><M>Calm confidence</M>: striking without being loud.</>} zh={<><M>沉稳的自信</M>：醒目，但不张扬。</>} />
                  </P>
                </div>
                <Row
                  ratio="4 / 3"
                  items={[
                    { src: `${L}/color-swatch.webp`, alt: "Gold and yellow palette: #FFD700, #FFEC00, #B3A500, #FFFABF, #FFF680" },
                    { src: `${L}/color-ysl.webp`, alt: "YSL Libre bottle and packaging used as reference" },
                  ]}
                  caption={<Tr en="The gold palette, and the YSL Libre reference." zh="金色系配色，以及作为参考的 YSL Libre。" />}
                />
              </div>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <Strip
                  items={[
                    { src: `${L}/houdini-cover.webp`, alt: "Dua Lipa, Houdini single cover", w: 950, h: 950 },
                    { src: `${L}/slogan.webp`, alt: "Houdini lyrics with “I come and I go” highlighted", w: 1100, h: 1299 },
                  ]}
                  caption={<Tr en="Source: “Houdini,” Dua Lipa." zh="出处：Dua Lipa《Houdini》。" />}
                />
                <div className="flex flex-col gap-6">
                  <Eyebrow className="mb-0">Slogan</Eyebrow>
                  <p className="font-sulphur text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] text-white">“I come and I go.”</p>
                  <P>
                    <Tr
                      en={<>A line from Dua Lipa&apos;s “Houdini” that became our naming idea: one product to put on,{" "}
                    <M>one to take off</M>.</>}
                      zh={<>这是 Dua Lipa《Houdini》里的一句歌词，后来成了我们的命名灵感：一件产品负责上妆，<M>一件负责卸妆</M>。</>}
                    />
                  </P>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-sulphur rounded-full border border-white/15 px-4 py-2 text-[17px] italic text-white">Foundation: “I Come”</span>
                    <Arrow />
                    <span className="font-sulphur rounded-full border border-white/15 px-4 py-2 text-[17px] italic text-white">Cleansing oil: “I Go”</span>
                  </div>
                </div>
              </div>
            </Stack>
          </WideSection>

          {/* 11 — FINAL OUTCOME */}
          <WideSection id="outcome" index="11" label="Final Outcome" title="UniSkin Duo.">
            <Reveal>
              <Row
                ratio="1572 / 1488"
                items={[
                  { src: `${L}/final-3d-a.webp`, alt: "Final 3D render of the UniSkin Duo box set, front" },
                  { src: `${L}/final-3d-b.webp`, alt: "Final 3D render of the UniSkin Duo box set, angled" },
                ]}
              />
            </Reveal>
            <Stack>
              <div className="grid gap-9 md:grid-cols-2 md:gap-16">
                <P>
                  <Tr
                    en="The final concept is a boxed set: a foundation in 20+ shades, and a cleansing oil made with nourishing oils.
                  Keeping both in one set means fewer decisions for first-time users."
                    zh="最终的概念是一个盒装套组：一款提供 20 多个色号的粉底液，以及一款含滋养油脂的卸妆油。两件产品放在同一个套装里，第一次使用的人要做的决定也就更少。"
                  />
                </P>
                <P>
                  <Tr en={<>It sits with L&apos;Oréal Men Expert: practical, accessible, and everyday.</>} zh="它被定位在 L'Oréal Men Expert 产品线下：实用、易得、适合日常使用。" />
                </P>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    t: "Foundation: “I Come”",
                    pack: "Lightweight recycled glass",
                    packZh: "轻量化再生玻璃",
                    ing: "Water 50–60%, Cyclopentasiloxane 10–20%, Titanium Dioxide 5–15%, Glycerin 5–10%, Caprylic/Capric Triglyceride 5–10%, Iron Oxides 1–5%, Emulsifiers 1–3%, Silicone Elastomer and Silica 1–5%, Trimethylsiloxysilicate 1–5%, Phenoxyethanol 0.5–1%, Disodium EDTA <0.1%, Tocopherol and botanical extracts <0.5%.",
                  },
                  {
                    t: "Cleansing oil: “I Go”",
                    pack: "High-transparency PCR plastic",
                    packZh: "高透明度 PCR 再生塑料",
                    ing: "Caprylic/Capric Triglyceride 30–40%, Squalane 20–25%, Olive Oil 15–20%, Jojoba Oil 10–15%, PEG-40 Hydrogenated Castor Oil 3–5%, Tocopherol (Vitamin E) 0.5–1%.",
                  },
                ].map((p) => (
                  <div key={p.t} className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-8">
                    <h4 className="font-blinker text-[20px] font-medium text-white">{p.t}</h4>
                    <p className="font-gilroy mt-2 text-[14px] text-neutral-500">
                      <Tr en={`Packaging: ${p.pack}`} zh={`包装：${p.packZh}`} />
                    </p>
                    <p className="font-gilroy mt-4 text-[14px] leading-[1.65] text-neutral-400">{p.ing}</p>
                  </div>
                ))}
              </div>
              <P>
                <Tr en="The recyclable box has a cut-out to compare skin tone with the shade." zh="可回收的包装盒上设有镂空窗口，便于将色号与自己的肤色进行比对。" />
              </P>
            </Stack>
            <Reveal>
              <Strip
                items={[
                  { src: `${L}/final-layout-a.webp`, alt: "Final foundation packaging layout, “I Come”", w: 646, h: 885 },
                  { src: `${L}/final-layout-b.webp`, alt: "Final cleansing-oil packaging layout, “I Go”", w: 815, h: 885 },
                ]}
                caption={<Tr en="Final packaging layouts: “I Come” and “I Go.”" zh="最终的包装版式：“I Come”与“I Go”。" />}
                max={760}
              />
            </Reveal>
            <Stack>
              <Cards
                columns={2}
                items={[
                  { title: <Tr en="Recyclable packaging" zh="可回收的包装" />, body: <p><Tr en="Recycled glass, PCR plastic, and a recyclable box." zh="再生玻璃、PCR 再生塑料，以及可回收的包装盒。" /></p> },
                  { title: <Tr en="Made for beginners" zh="为新手设计" />, body: <p><Tr en="Two steps, with skincare-oriented ingredients in the foundation." zh="只有两个步骤，粉底中含有护肤类成分。" /></p> },
                  { title: <Tr en="Room to grow" zh="发展空间" />, body: <p><Tr en="Our survey reached respondents in 3+ countries; demand in each market would need more research." zh="我们的问卷覆盖了 3 个以上国家的受访者；但各个市场的实际需求，还需要更多研究来确认。" /></p> },
                  { title: <Tr en="What success would mean" zh="怎样才算成功" />, body: <p><Tr en="First-time users sticking with the routine after trying it." zh="第一次使用的人在尝试之后，愿意坚持这套流程。" /></p> },
                ]}
              />
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
                  <div>
                    <Eyebrow>Final submission</Eyebrow>
                    <h3 className="font-blinker text-[clamp(24px,2.6vw,36px)] font-medium leading-[1.15] text-white">
                      Croissant au San Diego — L&apos;Oréal Project Slides
                    </h3>
                    <p className="font-gilroy mt-4 text-[15px] leading-[1.6] text-neutral-400">
                      <Tr en="Three pages: product sheet, concept and brand rationale, and packaging." zh="共三页：产品说明、概念与品牌依据，以及包装设计。" />
                    </p>
                    <div className="mt-6">
                      <DownloadButton large />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <a key={i} href={DOWNLOAD.href} download={DOWNLOAD.name} aria-label={`Download the slides (page ${i} preview)`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${L}/slide-${i}.webp`}
                          alt={`Final slides, page ${i}`}
                          width={1530}
                          height={1980}
                          loading="lazy"
                          className="block h-auto w-full rounded-[8px] bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Stack>
          </WideSection>

          {/* 12 — REFLECTION */}
          <Section id="reflection" index="12" label="Reflection" title={<Tr en="Designing for a routine." zh="为一套日常流程而设计。" />}>
            <P>
              <Tr
                en={<>Our research suggested interest wasn&apos;t the main obstacle. The harder question was whether foundation could fit
              into a routine <M>without much effort or self-consciousness</M>, which pushed us toward a simpler two-step set.</>}
                zh={<>研究结果显示，兴趣并不是主要障碍。更难的问题在于，粉底能否<M>轻松融入日常流程，同时不让使用者感到不自在</M>。这促使我们最终选择了更简单的两步式组合。</>}
              />
            </P>
            <P>
              <Tr
                en="It was also my first time taking a product from survey data to packaging and 3D renders. The formula and price are
              still concepts, and both would need proper formulation and pricing research."
                zh="这也是我第一次把一个产品从问卷数据一路推进到包装设计和 3D 渲染。配方和价格目前都还只是概念，后续需要正式的配方研发和定价研究。"
              />
            </P>
            <Statement label="Takeaway">
              <Tr en="Make it natural to start, and just as easy to take off." zh="让开始变得自然，卸下也同样轻松。" />
            </Statement>
          </Section>

          {/* 13 — OUR GROUP */}
          <WideSection id="group" index="13" label="Our Group" title="Meet our team!">
            <Reveal>
              <figure className="mx-auto w-full max-w-[520px] rounded-[20px] border border-white/15 bg-white/[0.03] p-3 md:p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${L}/team.jpg`}
                  alt="Yifei Liu, Lechen Tao, and Sihan Wang with the L'Oréal Brandstorm 2025 screen"
                  width={2000}
                  height={1500}
                  loading="lazy"
                  className="block h-auto w-full rounded-[12px]"
                />
                <figcaption className="px-2 pb-1 pt-4 text-center">
                  <p className="font-blinker text-[18px] font-medium text-white">
                    Yifei Liu <span className="text-neutral-600">·</span> Lechen Tao <span className="text-neutral-600">·</span> Sihan Wang
                  </p>
                  <p className="font-gilroy mt-1 text-[13px] uppercase tracking-[0.2em] text-neutral-500">L&apos;Oréal Brandstorm 2025</p>
                </figcaption>
              </figure>
            </Reveal>
          </WideSection>
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

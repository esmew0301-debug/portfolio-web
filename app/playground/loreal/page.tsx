import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { FloatPair } from "@/components/case/float-pair";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `UniSkin Duo — L'Oréal Men Expert Concept — ${person.name}`,
  description:
    "A student concept for L'Oréal Brandstorm 2025: a foundation and cleansing-oil set that makes complexion products simpler for first-time male users.",
};

// Same black, minimal system as Vegan Kitchen, Tequila and End of an Era (zegzulka.com type scale and spacing):
// framed split hero, small type, titles left and text in the right third, images on the black page with small radii.
// Gold (the packaging colour) is the only accent.
const I = "/images/loreal";
const GOLD = "#d4af37";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const TITLE = "text-[20px] leading-[1.2] text-white md:text-[24px]";
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";

const DOWNLOAD = {
  href: "/files/Croissant-au-San-Diego-LOreal-Project-Slide.pdf",
  name: "Croissant au San Diego - L'Oreal Project slide.pdf",
};
const SURVEY =
  "https://docs.google.com/spreadsheets/d/1rCu3-S6KbvwnbPHatc5zAHaJIRY91Q2ZDj_WcxMZ150/edit?gid=1161293833#gid=1161293833";

const G = ({ children }: { children: ReactNode }) => <span style={{ color: GOLD }}>{children}</span>;

/* ---------- content ---------- */

const PROBLEMS: [string, string, string, string][] = [
  ["Too many choices.", "选择太多。", "Shades and formulas are hard to navigate without experience.", "没有经验的人，很难在各种色号和配方中做出选择。"],
  ["A high learning cost.", "学习成本高。", "Multi-step routines assume skills beginners lack.", "多步骤的化妆流程，默认使用者具备新手并不具备的技巧。"],
  ["Stereotype pressure.", "刻板印象的压力。", "Wearing makeup still carries a social stigma for many men.", "对很多男性来说，化妆仍然会面临社会上的偏见。"],
  ["No beginner-friendly option.", "缺少适合新手的产品。", "Few products target men just starting out.", "很少有产品是面向刚开始尝试的男性设计的。"],
];

const THEMES = [
  { n: 5, t: "Gender-inclusive beauty", tz: "性别包容的美妆", d: "Few products serve trans men and non-binary people; the industry is still largely binary.", dz: "很少有产品服务跨性别男性和非二元性别人群；整个行业仍以二元性别划分。", chosen: true },
  { n: 4, t: "Underrepresented men", tz: "被忽视的男性群体", d: "Little serves older men, men with disabilities, or marginalized communities.", dz: "几乎没有产品服务年长男性、残障男性或边缘化社群。" },
  { n: 3, t: "Grooming & wellness", tz: "外表打理与身心健康", d: "Few products combine grooming with mental well-being.", dz: "很少有产品把外表打理和身心健康结合在一起。" },
];

const BRANDS = [
  { n: 5, t: "L'Oréal Men Expert", d: "Affordable, fast routines for busy men 18–35. Same users and the same focus on efficiency.", dz: "为 18–35 岁的忙碌男性提供平价、快捷的护理。目标用户和对效率的重视都一致。", best: true },
  { n: 4, t: "Garnier Men", d: "Practical, natural care on a budget, but focused on care rather than makeup.", dz: "实用、天然的平价护理，但重心在护理而不是彩妆。" },
  { n: 3, t: "Biotherm Homme", d: "Premium skincare: the right philosophy, the wrong price for most users.", dz: "高端护肤：理念契合，但价格超出大多数目标用户。" },
];

const PRODUCTS = [
  { img: "p-estee", brand: "Estée Lauder", name: "Futurist Hydra Rescue", note: "Soothing, hydrating, SPF 45.", noteZh: "舒缓保湿，SPF 45。" },
  { img: "p-chanel-touch", brand: "Chanel", name: "Les Beiges Complexion Touch", note: "12-hour hydration; tested on women.", noteZh: "12 小时保湿；在女性人群中测试。" },
  { img: "p-chanel-sublimage", brand: "Chanel", name: "Sublimage L’Essence de Teint", note: "Moisturizing serum texture.", noteZh: "精华般的滋润质地。" },
  { img: "p-ysl", brand: "YSL", name: "Nu Bare Look Tint", note: "Hyaluronic acid, 24-hour hydration.", noteZh: "透明质酸，24 小时保湿。" },
];

const MARKET: [string, string, string, string, boolean][] = [
  ["Skincare-infused foundation", "含护肤成分的粉底", "Exists", "已有", false],
  ["Foundation for men", "男士粉底", "A few", "少数", false],
  ["Nourishing foundation for men", "具有养肤功效的男士粉底", "Very rare", "非常少", true],
  ["Cleansing oil for men", "男士卸妆油", "Almost none", "几乎没有", true],
  ["Foundation + cleansing oil set", "粉底 + 卸妆油套装", "None", "没有", true],
];

const NUMBERS: [string, string, string][] = [
  ["46%", "rank “natural and fit” as the top foundation feature", "把“自然、服帖”列为粉底最重要的特点"],
  ["76%", "are open to a 2-in-1 foundation", "愿意接受二合一粉底"],
  ["68%", "would try a foundation with essence ingredients", "愿意尝试含精华成分的粉底"],
  ["53%", "of non-users simply don't know much about makeup", "的非使用者只是不太了解化妆"],
];

const INSIGHTS: [string, string, string, string][] = [
  ["Simple routines come first.", "简单的流程最重要。", "Respondents avoided multi-step routines.", "受访者会避开步骤繁多的方案。"],
  ["Natural over coverage.", "自然比遮瑕更重要。", "“Look better, not like I'm wearing makeup.”", "“想看起来更好，但不想看起来像化了妆。”"],
  ["Skincare raises acceptance.", "护肤功效提高接受度。", "Oil control and hydration mattered most.", "控油和保湿最受重视。"],
  ["Being noticed is a concern.", "担心被看出来。", "Open to foundation, but not to others noticing it.", "愿意尝试粉底，但不希望被别人察觉。"],
];

const PORTRAIT: { t: string; tz: string; items: [string, string][] }[] = [
  { t: "Who", tz: "是谁", items: [["Men aged 18–30", "18–30 岁男性"], ["Students and young professionals", "学生和年轻职场人士"]] },
  { t: "Traits", tz: "特点", items: [["Likely oily skin", "多为油性肌肤"], ["Values efficiency", "重视效率"], ["A makeup beginner", "化妆新手"]] },
  { t: "Needs", tz: "需求", items: [["No extra steps", "不增加额外步骤"], ["A natural look", "妆效自然"], ["Balanced oil control", "控油平衡"]] },
  { t: "Pain points", tz: "痛点", items: [["Hard to find the right product", "很难找到合适的产品"], ["Wants it unnoticeable", "希望看不出化了妆"]] },
];

const INGREDIENTS = [
  {
    t: "Foundation: “I Come”",
    pack: ["Lightweight recycled glass", "轻量化再生玻璃"],
    ing: "Water 50–60%, Cyclopentasiloxane 10–20%, Titanium Dioxide 5–15%, Glycerin 5–10%, Caprylic/Capric Triglyceride 5–10%, Iron Oxides 1–5%, Emulsifiers 1–3%, Silicone Elastomer and Silica 1–5%, Trimethylsiloxysilicate 1–5%, Phenoxyethanol 0.5–1%, Disodium EDTA <0.1%, Tocopherol and botanical extracts <0.5%.",
  },
  {
    t: "Cleansing oil: “I Go”",
    pack: ["High-transparency PCR plastic", "高透明度 PCR 再生塑料"],
    ing: "Caprylic/Capric Triglyceride 30–40%, Squalane 20–25%, Olive Oil 15–20%, Jojoba Oil 10–15%, PEG-40 Hydrogenated Castor Oil 3–5%, Tocopherol (Vitamin E) 0.5–1%.",
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

/** Columns separated by thin lines (findings, brands, numbers). */
function Cols({ children, n = 4 }: { children: ReactNode; n?: 2 | 3 | 4 }) {
  const cls = { 2: "sm:grid-cols-2", 3: "md:grid-cols-3", 4: "sm:grid-cols-2 xl:grid-cols-4" }[n];
  return <Reveal className={`grid gap-px bg-white/15 ${cls}`}>{children}</Reveal>;
}
function Col({ children }: { children: ReactNode }) {
  return <div className="bg-black px-3 pb-2 pt-5">{children}</div>;
}

/** Whole images side by side at one height. */
function Strip({ items, max }: { items: { src: string; alt: string; w: number; h: number; white?: boolean }[]; max?: number }) {
  return (
    <Reveal className="px-3">
      <div className="mx-auto flex w-full flex-col gap-4 sm:flex-row" style={{ maxWidth: max }}>
        {items.map((it) => (
          <div key={it.src} className="min-w-0" style={{ flex: `${it.w / it.h} 1 0` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.alt} width={it.w} height={it.h} loading="lazy" className={`block h-auto w-full rounded-[10px] ${it.white ? "bg-white" : ""}`} />
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5`} className="text-[12px] tracking-[0.15em]" style={{ color: GOLD }}>
      {"★".repeat(n)}
      <span className="opacity-25">{"★".repeat(5 - n)}</span>
    </span>
  );
}

function Download() {
  return (
    <a href={DOWNLOAD.href} download={DOWNLOAD.name} className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
      <L en="Final slides (PDF) ↓" zh="最终提案 PDF ↓" />
    </a>
  );
}

/* ---------- page ---------- */

export default function LorealProject() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] bg-black md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${I}/card-box-v5.jpg`} alt="The UniSkin Duo gift box with the foundation and cleansing oil, on black" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-white/10 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              <h1 className="text-[16px] text-white">UniSkin Duo</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <L en={<>I come <G>and I go.</G></>} zh={<>I come <G>and I go.</G></>} />
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">L&apos;Oréal Brandstorm 2025</p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["Product design", "Packaging", "3D"].map((t) => (
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
                en="A foundation and cleansing-oil set that makes complexion products easy to start with for young men."
                zh="一套粉底液与卸妆油组合，让年轻男性更容易开始使用底妆产品。"
              />
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="Men's ranges focus on cleansing and oil control, while foundation is designed almost entirely for women."
                  zh="男士产品线大多聚焦于清洁和控油，而粉底几乎全是为女性设计的。"
                />
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white">
                <L en="The idea" zh="设计思路" />
              </p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="A two-step daily cycle: a nourishing foundation in the morning, a cleansing oil at night."
                  zh="每天两步的循环：早上用养肤粉底，晚上用卸妆油。"
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className={LABEL}>
                  <L en="Brand" zh="品牌" />
                </p>
                <p className="text-[14px] text-white/80">L&apos;Oréal Men Expert</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Concept price" zh="概念定价" />
                </p>
                <p className="text-[14px] text-white/80">$80–100</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Submission" zh="提交方案" />
                </p>
                <Download />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mt-28 flex flex-col gap-12 md:mt-40">
        <Divider>
          <L en="Research" zh="调研" />
        </Divider>
        <Row title={<L en="Why men don't start" zh="男性为什么不开始用" />}>
          <p>
            <L en="Many young men care how they look, but starting with complexion products is harder than it should be." zh="很多年轻男性在意外表，但开始使用底妆产品比想象中难。" />
          </p>
        </Row>
        <Cols>
          {PROBLEMS.map(([t, tz, d, dz], i) => (
            <Col key={t}>
              <p className="text-[12px]" style={{ color: GOLD }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[18px] text-white">
                <L en={t} zh={tz} />
              </p>
              <p className={`${BODY} mt-2`}>
                <L en={d} zh={dz} />
              </p>
            </Col>
          ))}
        </Cols>
      </section>

      {/* THEME */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Defining the theme" zh="确定主题" />} label={<L en="Three social-justice angles, ranked" zh="三个社会议题方向，排序" />}>
          <p>
            <L
              en="Gender-inclusive beauty ranked first. Within it we focused on first-time male users who want a simple, natural routine."
              zh="性别包容的美妆排在第一。在这个方向下，我们聚焦于想要简单、自然流程的初次使用者。"
            />
          </p>
        </Row>
        <Cols n={3}>
          {THEMES.map((t) => (
            <Col key={t.t}>
              <Stars n={t.n} />
              <p className="mt-3 text-[18px]" style={{ color: t.chosen ? GOLD : "#fff" }}>
                <L en={t.t} zh={t.tz} />
              </p>
              <p className={`${BODY} mt-2`}>
                <L en={t.d} zh={t.dz} />
              </p>
            </Col>
          ))}
        </Cols>
      </section>

      {/* BRAND FIT */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Brand fit" zh="品牌匹配" />}>
          <p>
            <L en="Three L'Oréal men's lines, compared on positioning, values and price." zh="比较 L'Oréal 旗下三个男士产品线的定位、理念和价格。" />
          </p>
        </Row>
        <Cols n={3}>
          {BRANDS.map((b) => (
            <Col key={b.t}>
              <Stars n={b.n} />
              <p className="mt-3 text-[18px]" style={{ color: b.best ? GOLD : "#fff" }}>
                {b.t}
              </p>
              <p className={`${BODY} mt-2`}>
                <L en={b.d} zh={b.dz} />
              </p>
            </Col>
          ))}
        </Cols>
        <Strip
          max={1000}
          items={[
            { src: `${I}/shelf-menexpert.webp`, alt: "L'Oréal Men Expert moisturizers, $9–15", w: 1150, h: 1003 },
            { src: `${I}/shelf-clinique.webp`, alt: "Clinique For Men sets and lotion", w: 1150, h: 1003 },
            { src: `${I}/shelf-baxter.webp`, alt: "Baxter of California oil-free moisturizer", w: 1150, h: 1003 },
          ]}
        />
        <p className={`${LABEL} px-3 text-center`}>
          <L en="Men's shelves today: care, not complexion." zh="如今的男士货架：卖的是护理，而不是底妆。" />
        </p>
      </section>

      {/* COMPETITORS */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Competitor analysis" zh="竞品分析" />}>
          <p>
            <L
              en="Estée Lauder, Chanel, Dior, YSL and Givenchy: four offer a caring foundation, all marketed to women, and none pairs it with a cleansing oil."
              zh="Estée Lauder、Chanel、Dior、YSL 和 Givenchy：四家有养肤型粉底，全部面向女性，没有一家搭配卸妆油。"
            />
          </p>
        </Row>
        <div className="px-3">
          <FloatPair
            left={{ src: `${I}/float-estee.png`, alt: "Estée Lauder Futurist SkinTint Serum", w: 667, h: 1031 }}
            right={{ src: `${I}/float-givenchy.png`, alt: "Givenchy Prisme Libre Skin-Caring Matte", w: 351, h: 987 }}
          >
            <p className="text-[clamp(20px,2vw,28px)] leading-[1.25] text-white">
              <L en={<>Caring foundations exist, <G>but they are made for women.</G></>} zh={<>养肤型粉底并不少见，<G>但都是为女性设计的。</G></>} />
            </p>
            <p className={`${LABEL} mt-4`}>
              <L en="Tap a bottle" zh="点一下瓶子" />
            </p>
          </FloatPair>
        </div>
        <div className="mx-auto w-full max-w-[900px]">
        <Cols>
          {PRODUCTS.map((p) => (
            <Col key={p.img}>
              <div className="relative overflow-hidden rounded-[10px] bg-white" style={{ aspectRatio: "3 / 4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${I}/${p.img}.webp`} alt={`${p.brand} ${p.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-4" />
              </div>
              <p className={`${LABEL} mt-3`}>{p.brand}</p>
              <p className="text-[14px] text-white">{p.name}</p>
              <p className="mt-1 text-[13px] leading-[20px] text-white/55">
                <L en={p.note} zh={p.noteZh} />
              </p>
            </Col>
          ))}
        </Cols>
        </div>
        <Reveal className="mx-auto w-full max-w-[760px] px-3">
          <p className={`${LABEL} mb-2`}>
            <L en="What the market has" zh="市场上有什么" />
          </p>
          <div className="border-t border-white/15">
            {MARKET.map(([t, tz, s, sz, gap]) => (
              <div key={t} className="flex items-baseline justify-between gap-6 border-b border-white/15 py-3">
                <span className="text-[15px] text-white/80">
                  <L en={t} zh={tz} />
                </span>
                <span className="shrink-0 text-[15px]" style={{ color: gap ? GOLD : "rgb(255 255 255 / 0.5)" }}>
                  <L en={s} zh={sz} />
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SURVEY */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Survey" zh="问卷调研" />} label={<L en="208 responses · 3+ countries · 20+ regions" zh="208 份回复 · 3 个以上国家 · 20 多个地区" />}>
          <p>
            <L en="A bilingual survey on complexion products and a two-product format." zh="一份关于底妆产品和双产品组合形式的中英双语问卷。" />{" "}
            <a href={SURVEY} target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
              <L en="Raw responses ↗" zh="原始数据 ↗" />
            </a>
          </p>
        </Row>
        <Cols>
          {NUMBERS.map(([n, en, zh]) => (
            <Col key={n}>
              <p className="text-[32px] leading-none" style={{ color: GOLD }}>
                {n}
              </p>
              <p className={`${BODY} mt-3`}>
                <L en={en} zh={zh} />
              </p>
            </Col>
          ))}
        </Cols>
        <Reveal className="mx-auto grid w-full max-w-[1040px] gap-4 px-3 sm:grid-cols-2">
          {[
            ["chart-features", "Features considered when choosing a foundation"],
            ["chart-2in1", "Opinions on the 2-in-1 foundation concept"],
            ["chart-essentials", "Willingness to try a men's foundation with essence ingredients"],
            ["chart-nonusers", "Why non-users don't use makeup"],
          ].map(([s, alt]) => (
            <div key={s} className="relative overflow-hidden rounded-[10px] bg-white" style={{ aspectRatio: "1520 / 887" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${I}/${s}.webp`} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-contain object-top" />
            </div>
          ))}
        </Reveal>
      </section>

      {/* INSIGHTS */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Insights" zh="洞察" />} />
        <Cols>
          {INSIGHTS.map(([t, tz, d, dz], i) => (
            <Col key={t}>
              <p className="text-[12px]" style={{ color: GOLD }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[18px] text-white">
                <L en={t} zh={tz} />
              </p>
              <p className={`${BODY} mt-2`}>
                <L en={d} zh={dz} />
              </p>
            </Col>
          ))}
        </Cols>
        <Row title={<L en="Who it's for" zh="目标用户" />} />
        <Cols>
          {PORTRAIT.map((c) => (
            <Col key={c.t}>
              <p className={LABEL}>
                <L en={c.t} zh={c.tz} />
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {c.items.map(([en, zh]) => (
                  <li key={en} className="text-[15px] text-white/80">
                    <L en={en} zh={zh} />
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Cols>
      </section>

      {/* STRATEGY */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Divider>
          <L en="Design" zh="设计" />
        </Divider>
        <Row title={<L en="A complexion system, not a single foundation" zh="一套底妆系统，而不只是一支粉底" />}>
          <p>
            <L
              en="Complexion and removal in one beginner-friendly set: fewer steps, fewer decisions. The survey backed the foundation; pairing it with a cleansing oil was our own proposal."
              zh="把底妆和卸妆放进一套适合新手的组合：更少步骤，更少决定。问卷支持的是粉底这一半；搭配卸妆油是我们自己的提议。"
            />
          </p>
        </Row>
        <Cols n={2}>
          <Col>
            <p className={LABEL}>
              <L en="A typical routine" zh="常见流程" />
            </p>
            <p className="mt-2 text-[16px] text-white/60">
              <L en="Skincare → Primer → Foundation → Removal" zh="护肤 → 妆前乳 → 粉底 → 卸妆" />
            </p>
          </Col>
          <Col>
            <p className={LABEL}>
              <L en="With UniSkin Duo" zh="使用 UniSkin Duo" />
            </p>
            <p className="mt-2 text-[16px]" style={{ color: GOLD }}>
              <L en="Foundation with skincare → Cleansing oil" zh="含护肤成分的粉底 → 卸妆油" />
            </p>
          </Col>
        </Cols>
      </section>

      {/* SKETCHING */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Concept sketching" zh="概念草图" />}>
          <p>
            <L en="Three structure iterations, then packaging drafts for the “Come” and “Go” sides." zh="三轮结构迭代，然后是“Come”和“Go”两侧的包装草图。" />
          </p>
        </Row>
        <Strip
          max={1000}
          items={[
            { src: `${I}/sketch-structure.webp`, alt: "Hand-drawn box plan: 20 × 12 cm", w: 1100, h: 1005 },
            { src: `${I}/sketch-dimensioned.webp`, alt: "Dimensioned plan of the box and inserts", w: 1446, h: 710 },
          ]}
        />
        <Strip
          max={640}
          items={[
            { src: `${I}/draft-a.webp`, alt: "Sketchbook draft of the foundation label", w: 530, h: 520 },
            { src: `${I}/draft-b.webp`, alt: "Sketchbook draft of the “Come” and “Go” labels", w: 530, h: 520 },
          ]}
        />
      </section>

      {/* 3D */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="3D modeling" zh="3D 建模" />}>
          <p>
            <L
              en="Clean lines between masculine and neutral; a window shows the shade without opening the box, and the bottles fit one hand."
              zh="线条在男性气质和中性之间平衡；小窗让人不开盒就能看到色号，瓶身单手可握。"
            />
          </p>
        </Row>
        <Strip max={820} items={[{ src: `${I}/modeling-screen.webp`, alt: "The box and both bottles modeled in Cinema 4D", w: 1417, h: 737 }]} />
        <Reveal className="mx-auto grid w-full max-w-[1040px] gap-4 px-3 sm:grid-cols-3">
          {[
            ["render-angle", "Rendered box with the foundation bottle in its window"],
            ["render-closed", "Rendered box, front view"],
            ["render-open", "Rendered box set showing both bottles"],
          ].map(([s, alt]) => (
            <div key={s} className="flex aspect-square items-center justify-center overflow-hidden rounded-[10px] bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${I}/${s}.webp`} alt={alt} loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </Reveal>
      </section>

      {/* COLOR & SLOGAN */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Black and gold" zh="黑与金" />} label={<L en="Color" zh="颜色" />}>
          <p>
            <L
              en="After YSL Libre: deep black keeps it neutral, metallic gold adds quiet prestige. Striking without being loud."
              zh="参考 YSL Libre：深黑保持中性，金属金增添低调的质感。醒目，但不张扬。"
            />
          </p>
        </Row>
        <Strip
          max={900}
          items={[
            { src: `${I}/color-swatch.webp`, alt: "Gold palette", w: 1200, h: 960 },
            { src: `${I}/color-ysl.webp`, alt: "YSL Libre reference", w: 1389, h: 1042 },
          ]}
        />
        <Row title={<>“I come and I go.”</>} label={<L en="Slogan" zh="标语" />}>
          <p>
            <L
              en="A line from Dua Lipa's “Houdini”: the foundation is “I Come”, the cleansing oil “I Go”."
              zh="来自 Dua Lipa《Houdini》的一句歌词：粉底叫“I Come”，卸妆油叫“I Go”。"
            />
          </p>
        </Row>
        <Strip
          max={720}
          items={[
            { src: `${I}/houdini-cover.webp`, alt: "Dua Lipa, Houdini single cover", w: 950, h: 950 },
            { src: `${I}/slogan.webp`, alt: "Houdini lyrics with “I come and I go” highlighted", w: 1100, h: 1299 },
          ]}
        />
      </section>

      {/* FINAL */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Divider>
          <L en="Final outcome" zh="最终成果" />
        </Divider>
        <Row title="UniSkin Duo">
          <p>
            <L
              en="A boxed set: a foundation in 20+ shades and a cleansing oil with nourishing oils, under L'Oréal Men Expert. The recyclable box has a cut-out to compare shade and skin."
              zh="一个盒装套组：20 多个色号的粉底液，加一款含滋养油脂的卸妆油，归属 L'Oréal Men Expert。可回收包装盒上有镂空窗口，方便比对色号与肤色。"
            />
          </p>
        </Row>
        <Strip
          max={1100}
          items={[
            { src: `${I}/final-3d-a.webp`, alt: "Final 3D render of the UniSkin Duo box set, front", w: 1572, h: 1488 },
            { src: `${I}/final-3d-b.webp`, alt: "Final 3D render of the UniSkin Duo box set, angled", w: 1572, h: 1488 },
          ]}
        />
        <Cols n={2}>
          {INGREDIENTS.map((p) => (
            <Col key={p.t}>
              <p className="text-[18px] text-white">{p.t}</p>
              <p className={`${LABEL} mt-1`}>
                <L en={`Packaging: ${p.pack[0]}`} zh={`包装：${p.pack[1]}`} />
              </p>
              <p className="mt-3 text-[13px] leading-[20px] text-white/55">{p.ing}</p>
            </Col>
          ))}
        </Cols>
        <Strip
          max={760}
          items={[
            { src: `${I}/final-layout-come.webp`, alt: "Final foundation packaging layout, “I Come”", w: 825, h: 885 },
            { src: `${I}/final-layout-b.webp`, alt: "Final cleansing-oil packaging layout, “I Go”", w: 815, h: 885 },
          ]}
        />
        <Row title={<L en="Final submission" zh="最终提案" />} label="Croissant au San Diego">
          <p>
            <L en="Three pages: product sheet, concept and brand rationale, and packaging." zh="共三页：产品说明、概念与品牌依据，以及包装设计。" /> <Download />
          </p>
        </Row>
        <Reveal className="mx-auto grid w-full max-w-[760px] grid-cols-3 gap-3 px-3">
          {[1, 2, 3].map((i) => (
            <a key={i} href={DOWNLOAD.href} download={DOWNLOAD.name} aria-label={`Download the slides (page ${i} preview)`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${I}/slide-${i}.webp`} alt={`Final slides, page ${i}`} width={1530} height={1980} loading="lazy" className="block h-auto w-full rounded-[8px] bg-white" />
            </a>
          ))}
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="mt-36 flex flex-col gap-12 md:mt-52">
        <Row title={<L en="Our team" zh="我们的团队" />} label="Croissant au San Diego">
          <p>Yifei Liu · Lechen Tao · Sihan Wang</p>
        </Row>
        <Reveal className="mx-auto w-full max-w-[560px] px-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${I}/team.jpg`} alt="Yifei Liu, Lechen Tao, and Sihan Wang with the L'Oréal Brandstorm 2025 screen" width={2000} height={1500} loading="lazy" className="block h-auto w-full rounded-[10px]" />
        </Reveal>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

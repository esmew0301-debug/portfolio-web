import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `UniSkin Duo — L'Oréal Men Expert Concept — ${person.name}`,
  description:
    "A student concept for L'Oréal Brandstorm 2025: a foundation and cleansing-oil set that makes complexion products simpler for first-time male users.",
};

// Same black, minimal system as the other case studies, laid out like zegzulka.com/undout: the result first (large
// renders and packaging, 8px apart), then text as paragraphs (a large title left, the text in the right third), with
// the research and process below the work. Gold (the packaging colour) is the only accent.
const I = "/images/loreal";
const GOLD = "#d4af37";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const DIVIDER = "text-center text-[13px] leading-[18px] text-white/70";

const DOWNLOAD = {
  href: "/files/Croissant-au-San-Diego-LOreal-Project-Slide.pdf",
  name: "Croissant au San Diego - L'Oreal Project slide.pdf",
};
const SURVEY =
  "https://docs.google.com/spreadsheets/d/1rCu3-S6KbvwnbPHatc5zAHaJIRY91Q2ZDj_WcxMZ150/edit?gid=1161293833#gid=1161293833";

const G = ({ children }: { children: ReactNode }) => <span style={{ color: GOLD }}>{children}</span>;

/* ---------- content ---------- */









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

/** The reference's text block: a 28–44px title on the left, paragraphs in the right third. */
function Article({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Reveal className="grid gap-6 px-3 md:grid-cols-[2fr_1fr] md:gap-8">
      <h2 className="text-[28px] leading-[1.07] text-white md:text-[44px]">{title}</h2>
      <div className={`${BODY} flex max-w-[467px] flex-col gap-5`}>{children}</div>
    </Reveal>
  );
}

/** A small label over a paragraph, inside an Article. */
function Sub({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className={LABEL}>{label}</p>
      {children}
    </div>
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

      {/* RESULT FIRST: the product, large, the way the reference opens on its strongest images */}
      <section className="mx-auto mt-20 flex max-w-[1000px] flex-col gap-2 px-2 md:mt-28">
        <Reveal>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              ["final-layout-come", 825, 885, "Final foundation packaging layout, “I Come”"],
              ["final-layout-b", 815, 885, "Final cleansing-oil packaging layout, “I Go”"],
            ].map(([n, w, h, alt]) => (
              <div key={n as string} className="flex items-center justify-center rounded-[10px] bg-[#111] p-6 md:p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${I}/${n}.webp`} alt={alt as string} width={w as number} height={h as number} loading="lazy" className="block h-auto w-full max-w-[460px]" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* THE PRODUCT */}
      <section className="mt-28 md:mt-40">
        <Article title={<L en="UniSkin Duo, I come and I go." zh="UniSkin Duo，I come and I go。" />}>
          <p>
            <L
              en="A boxed set under L'Oréal Men Expert: “I Come”, a foundation in 20+ shades with skincare ingredients, and “I Go”, a cleansing oil made with nourishing oils. Two steps a day, and a cut-out in the recyclable box to compare the shade with your skin."
              zh="归属 L'Oréal Men Expert 的盒装套组：“I Come”是一款含护肤成分、提供 20 多个色号的粉底液，“I Go”是一款含滋养油脂的卸妆油。每天两步；可回收包装盒上有镂空窗口，方便比对色号与肤色。"
            />
          </p>
          <p>
            <L
              en="Black keeps it neutral, metallic gold adds quiet prestige (after YSL Libre). The names come from a line in Dua Lipa's “Houdini”."
              zh="黑色保持中性，金属金增添低调的质感（参考 YSL Libre）。名字来自 Dua Lipa《Houdini》里的一句歌词。"
            />
          </p>
          <Sub label={<L en="Ingredients" zh="成分" />}>
            {INGREDIENTS.map((p) => (
              <p key={p.t} className="text-[13px] leading-[20px] text-white/50">
                <span className="text-white/80">{p.t}</span> · <L en={p.pack[0]} zh={p.pack[1]} />. {p.ing}
              </p>
            ))}
          </Sub>
          <p>
            <Download />
          </p>
        </Article>
      </section>

      {/* PROCESS: sketches, 3D, color */}
      <section className="mx-auto mt-28 flex max-w-[860px] flex-col gap-2 px-2 md:mt-40">
        <Reveal>
          <div className="grid gap-2 md:grid-cols-3">
            {[
              ["render-angle", "Rendered box with the foundation bottle in its window"],
              ["render-closed", "Rendered box, front view"],
              ["render-open", "Rendered box set showing both bottles"],
            ].map(([n, alt]) => (
              <div key={n} className="flex aspect-square items-center justify-center overflow-hidden rounded-[10px] bg-white p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${I}/${n}.webp`} alt={alt} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="grid items-start gap-2 md:grid-cols-[1100fr_1446fr]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${I}/sketch-structure.webp`} alt="Hand-drawn box plan: 20 × 12 cm" width={1100} height={1005} loading="lazy" className="block h-auto w-full rounded-[10px]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${I}/sketch-dimensioned.webp`} alt="Dimensioned plan of the box and inserts" width={1446} height={710} loading="lazy" className="block h-auto w-full rounded-[10px]" />
          </div>
        </Reveal>
      </section>
      <section className="mt-16 md:mt-20">
        <Article title={<L en="From sketch to box" zh="从草图到包装盒" />}>
          <p>
            <L
              en="Three structure iterations and packaging drafts, then 3D models in Cinema 4D to check proportions: clean lines between masculine and neutral, a window that shows the shade without opening the box, and bottles that fit one hand."
              zh="三轮结构迭代和包装草图，然后在 Cinema 4D 中建模检查比例：线条在男性气质与中性之间平衡，小窗让人不开盒就能看到色号，瓶身单手可握。"
            />
          </p>
        </Article>
      </section>

      {/* RESEARCH, below the work */}
      <section className="mt-36 md:mt-52">
        <div className="px-3">
          <p className={DIVIDER}>
            <L en="Research" zh="调研" />
          </p>
          <div className="mt-2 h-px bg-white/15" />
        </div>
      </section>

      <section className="mt-16 md:mt-20">
        <Article title={<L en="Why men don't start" zh="男性为什么不开始用底妆" />}>
          <p>
            <L
              en="Men's ranges focus on cleansing and oil control; foundation is designed almost entirely for women. Many young men care how they look, but starting is hard: too many shades and formulas, multi-step routines that assume skills beginners lack, a lingering stigma, and almost nothing made for first-timers."
              zh="男士产品线大多聚焦于清洁和控油，粉底几乎全为女性设计。很多年轻男性在意外表，但开始很难：色号和配方太多，多步骤流程默认使用者有技巧，社会偏见仍在，而几乎没有为新手设计的产品。"
            />
          </p>
          <Sub label={<L en="Theme and brand" zh="主题与品牌" />}>
            <p>
              <L
                en={<>Of three social-justice angles, <G>gender-inclusive beauty</G> ranked first; within it we focused on first-time male users who want a simple, natural routine. Of three L&apos;Oréal men&apos;s lines, <G>Men Expert</G> fit best: the same users and the same focus on efficiency.</>}
                zh={<>三个社会议题方向中，<G>性别包容的美妆</G>排在第一；在此之下，我们聚焦于想要简单、自然流程的初次使用者。三个 L&apos;Oréal 男士产品线中，<G>Men Expert</G> 最契合：用户相同，同样重视效率。</>}
              />
            </p>
          </Sub>
          <Sub label={<L en="Competitors" zh="竞品" />}>
            <p>
              <L
                en={<>Estée Lauder, Chanel, Dior, YSL and Givenchy: four offer a caring foundation, all marketed to women. <G>None pairs a foundation with a cleansing oil</G>, and a nourishing foundation for men is very rare.</>}
                zh={<>Estée Lauder、Chanel、Dior、YSL 和 Givenchy：四家有养肤型粉底，全部面向女性。<G>没有一家把粉底和卸妆油搭配在一起</G>，面向男性的养肤粉底也非常少。</>}
              />
            </p>
          </Sub>
        </Article>
      </section>

      <section className="mt-16 md:mt-20">
        <Article title={<L en="What 208 people told us" zh="208 位受访者告诉我们的" />}>
          <p>
            <L
              en={<>A bilingual survey across 3+ countries. <G>46%</G> rank a natural fit as the top foundation feature, <G>76%</G> are open to a 2-in-1 foundation, <G>68%</G> would try one with essence ingredients, and <G>53%</G> of non-users simply don&apos;t know much about makeup.</>}
              zh={<>一份覆盖 3 个以上国家的中英双语问卷。<G>46%</G> 把自然服帖列为粉底最重要的特点，<G>76%</G> 愿意接受二合一粉底，<G>68%</G> 愿意尝试含精华成分的粉底，<G>53%</G> 的非使用者只是不太了解化妆。</>}
            />
          </p>
          <p>
            <L
              en="So the product had to be simple, look natural, care for the skin and go unnoticed: for men 18–30, likely with oily skin, new to makeup and short on time."
              zh="所以产品必须简单、自然、养肤、不易被察觉：面向 18–30 岁、多为油性肌肤、刚接触化妆、时间有限的男性。"
            />
          </p>
          <p>
            <a href={SURVEY} target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
              <L en="Raw responses ↗" zh="原始数据 ↗" />
            </a>
          </p>
        </Article>
      </section>
      <section className="mx-auto mt-16 max-w-[860px] px-2 md:mt-20">
        <Reveal className="grid gap-2 sm:grid-cols-2">
          {[
            ["chart-features", "Features considered when choosing a foundation"],
            ["chart-2in1", "Opinions on the 2-in-1 foundation concept"],
            ["chart-essentials", "Willingness to try a men's foundation with essence ingredients"],
            ["chart-nonusers", "Why non-users don't use makeup"],
          ].map(([n, alt]) => (
            <div key={n} className="relative overflow-hidden rounded-[10px] bg-white" style={{ aspectRatio: "1520 / 887" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${I}/${n}.webp`} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-contain object-top" />
            </div>
          ))}
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="mt-36 md:mt-52">
        <Article title={<L en="Team" zh="团队" />}>
          <p>Yifei Liu, Lechen Tao, Sihan Wang · Croissant au San Diego, L&apos;Oréal Brandstorm 2025</p>
        </Article>
        <Reveal className="mt-10 px-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${I}/team.jpg`} alt="Yifei Liu, Lechen Tao, and Sihan Wang with the L'Oréal Brandstorm 2025 screen" width={2000} height={1500} loading="lazy" className="block h-auto w-full max-w-[420px] rounded-[10px]" />
        </Reveal>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

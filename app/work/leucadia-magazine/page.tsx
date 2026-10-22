import type { Metadata } from "next";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { figma, person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Leucadia Magazine Website Redesign — ${person.name}`,
  description: "A redesign of the Leucadia Magazine website: a clearer structure for readers and a dedicated submission path for local businesses.",
};

// Same black, minimal system as the other case studies, shown almost entirely through one recording of the redesigned
// site (reference/leucadia-magazine/site-walkthrough.mp4) in the Tequila page's frame: little text, one large video.
// The original site is only mentioned, with a link to the comparison in Figma.
const M = "/images/leucadia";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";

export default function LeucadiaMagazine() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${M}/page-hero.jpg`} alt="The redesigned Leucadia Magazine homepage on a laptop resting on dark rock" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-black/30 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${M}/logo.png`} alt="Leucadia Magazine logo" width={327} height={81} className="mb-4 block h-auto w-[130px]" />
              <h1 className="text-[16px] text-white">Leucadia Magazine</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <L en={<>Every local business has <span className="text-white">a story.</span></>} zh={<>每一家本地商家，<span className="text-white">都有故事。</span></>} />
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">Posse.io / May – Jun 2026</p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["UI/UX", "Website redesign", "Posse.io"].map((t) => (
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
                en="A redesign for readers browsing local stories, and for the businesses that want to be in them."
                zh="这次改版既服务于浏览本地故事的读者，也服务于希望被杂志报道的本地商家。"
              />
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="The old site was cluttered: mixed type, repeated blocks, no clear way to browse, and nowhere for a business to submit beyond a generic contact form."
                  zh="原网站很杂乱：字体混杂、模块重复、没有清晰的浏览路径，商家除了一个通用的联系表单之外无处投稿。"
                />{" "}
                <a href={figma.posse} target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  <L en="Before and after in Figma ↗" zh="在 Figma 中查看改版前后 ↗" />
                </a>
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white">
                <L en="The redesign" zh="改版" />
              </p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="Four clear sections, an archive readers can browse, and a guided three-step path for businesses to get featured."
                  zh="四个清晰的板块、一个可以浏览的期刊档案，以及引导商家三步完成投稿的流程。"
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className={LABEL}>
                  <L en="My role" zh="我的角色" />
                </p>
                <p className="text-[14px] text-white/80">UI/UX Design Lead</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Timeline" zh="时间" />
                </p>
                <p className="text-[14px] text-white/80">May – Jun 2026</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL DESIGN: small label left, the site recording right */}
      <section className="mt-28 md:mt-40">
        <div className="grid gap-6 px-3 md:grid-cols-[1fr_2fr] md:gap-8">
          <Reveal className="md:sticky md:top-24 md:self-start md:pt-6">
            <p className={LABEL}>
              <L en="Final design" zh="最终设计" />
            </p>
            <p className="mt-1 text-[14px] text-white">
              <L en="The redesigned site" zh="改版后的网站" />
            </p>
            <p className="mt-1.5 max-w-[340px] text-[13px] leading-[20px] text-white/55">
              <L
                en="Home, the editorial archive, our publications, and submitting a business, from start to confirmation."
                zh="首页、期刊档案、出版物，以及商家从开始到确认的完整投稿流程。"
              />
            </p>
          </Reveal>
          <Reveal>
            <div className="rounded-[14px] border border-white/60 bg-[#1c1c1c] p-2.5 md:p-3">
              <div className="relative aspect-[1728/1080] overflow-hidden rounded-[8px] bg-[#111]">
                <video
                  src="/videos/magazine_walkthrough.mp4"
                  poster={`${M}/walkthrough-poster.jpg`}
                  aria-label="A walkthrough of the redesigned Leucadia Magazine website"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

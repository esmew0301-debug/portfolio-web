import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `NIO — ${person.name}`,
  description: "Brand Management Intern (UX Design Focus) at NIO: user flows, wireframes and UI concepts for an internal software platform.",
};

// Same black, minimal system as the other case studies (zegzulka.com type scale and spacing): framed split hero with
// the cover, description and context, Responsibility in three columns, then "Coming soon" on the left and the work,
// blurred under NDA, on the right.
const N = "/images/nio";
const ACCENT = "#8ac0ff";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";
const TITLE = "text-[20px] leading-[1.2] text-white md:text-[24px]";

const Hi = ({ children }: { children: ReactNode }) => <span style={{ color: ACCENT }}>{children}</span>;

const RESPONSIBILITY = [
  {
    en: (
      <>
        Designed <Hi>user flows, wireframes and UI concepts</Hi> for NIO&apos;s internal software platform, turning complex business requirements into clear, usable experiences.
      </>
    ),
    zh: (
      <>
        为蔚来内部软件平台设计<Hi>用户流程、线框图和 UI 概念</Hi>，将复杂的业务需求转化为清晰、易用的产品体验。
      </>
    ),
  },
  {
    en: (
      <>
        Ran <Hi>content audits and analysed platform structures</Hi> across brand ecosystems to find information gaps and chances to improve the information architecture.
      </>
    ),
    zh: (
      <>
        对多个品牌生态进行<Hi>内容审计并分析平台结构</Hi>，找出信息缺口和信息架构的改进机会。
      </>
    ),
  },
  {
    en: (
      <>
        Worked with brand and design teams to balance <Hi>user needs, visual consistency and business goals</Hi>.
      </>
    ),
    zh: (
      <>
        与品牌和设计团队合作，平衡<Hi>用户需求、视觉一致性和业务目标</Hi>。
      </>
    ),
  },
];

export default function NioPage() {
  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased">
      {/* HERO: framed split screen, the cover left, name right on a faint grid */}
      <section className="p-2 md:p-3">
        <div className="relative grid overflow-hidden rounded-[14px] md:h-[calc(100vh-24px)] md:min-h-[560px] md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${N}/page-hero.jpg`} alt="A black NIO ET5 from above, its red light bar across the rear" className="absolute inset-0 h-full w-full object-cover" />
            <BackLink href="/#work" className="absolute left-4 top-4 rounded-[6px] bg-black/30 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span>←</span> Work
            </BackLink>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-black [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:56px_56px]">
            <Reveal className="w-[220px]">
              <h1 className="text-[16px] text-white">NIO</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <L en={<>Brand Management Intern, <Hi>UX focus.</Hi></>} zh={<>品牌管理实习生，<Hi>UX 方向。</Hi></>} />
              </p>
              <div className="my-3 h-px bg-white/25" />
              <p className="text-[12px] text-white/50">Jun 2026 – Sep 2026</p>
            </Reveal>
            <div className="absolute bottom-3 right-3 flex gap-1.5 text-[11px] text-white/80">
              {["UI/UX", "Information architecture", "Internship"].map((t) => (
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
              <L en="User flows, wireframes and UI concepts for NIO's internal software platform." zh="为蔚来内部软件平台设计用户流程、线框图和 UI 概念。" />
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                <L
                  en="An internship on NIO's brand management team, focused on the UX of an internal platform."
                  zh="在蔚来品牌管理团队实习，专注于一个内部平台的用户体验。"
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className={LABEL}>Timeline</p>
                <p className="text-[14px] text-white/80">Jun 2026 – Sep 2026</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="My scope" zh="我的工作" />
                </p>
                <p className="text-[14px] text-white/80">User flows · Wireframes · UI concepts</p>
              </div>
              <div>
                <p className={LABEL}>
                  <L en="Team" zh="团队" />
                </p>
                <p className="text-[14px] text-white/80">
                  <L en="Brand team · Design team" zh="品牌团队 · 设计团队" />
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESPONSIBILITY */}
      <section className="mt-28 flex flex-col gap-12 md:mt-40">
        <div className="px-3">
          <p className="text-center text-[13px] leading-[18px] text-white/70">Responsibility</p>
          <div className="mt-2 h-px bg-white/15" />
        </div>
        {/* stacked on the right, one per row */}
        <Reveal className="ml-auto w-full max-w-[620px] px-3">
          {RESPONSIBILITY.map((r, i) => (
            <div key={i} className="grid grid-cols-[40px_1fr] border-b border-white/15 py-5 first:pt-0">
              <p className="pt-[3px] text-[12px]" style={{ color: ACCENT }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className={BODY}>
                <L en={r.en} zh={r.zh} />
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* WORK: coming soon on the left, the NDA screen on the right */}
      <section className="mt-36 md:mt-52">
        <div className="grid items-center gap-10 px-3 md:grid-cols-[1fr_2fr] md:gap-8">
          <Reveal>
            <h2 className={TITLE}>
              <L en="Coming soon" zh="敬请期待" />
            </h2>
            <p className={`${BODY} mt-3 max-w-[420px]`}>
              <L
                en="The work is under a non-disclosure agreement. A case study will follow once it can be shared."
                zh="这部分工作受保密协议约束，可以公开后会补充完整案例。"
              />
            </p>
          </Reveal>
          <Reveal>
            <div className="rounded-[14px] bg-[#1c1c1c] p-2.5 md:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${N}/nda-3.webp`} alt="A NIO platform screen, blurred under the non-disclosure agreement" width={1600} height={1000} loading="lazy" className="block h-auto w-full rounded-[8px]" />
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

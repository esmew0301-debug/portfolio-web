import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Container } from "@/components/case/primitives";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person } from "@/lib/content";
import { L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `NIO — ${person.name}`,
  description: "Brand Management Intern (UX Design Focus) at NIO: user flows, wireframes and UI concepts for an internal software platform.",
};

// Layout reference: keithren.com/didiglobal (title, tags, three devices, Timeline / Scope / Tools cards, Responsibility,
// "Available soon"). Colours after CarFolio: white type on a black-to-violet gradient. Work is under NDA, so the
// screens are pixelated and stamped (tools/nio_assets.py).
const N = "/images/nio";
const ACCENT = "#b9a6ff";

/** A screen inside a dark laptop: rounded bezel with a notch, and a thin aluminium base. */
function Laptop({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={className}>
      <div className="relative rounded-[4%/6.4%] border border-white/15 bg-[#16161a] p-[1.8%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <span aria-hidden className="absolute left-1/2 top-0 h-[2.4%] w-[9%] -translate-x-1/2 rounded-b-[6px] bg-[#16161a]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={1600} height={1000} className="block h-auto w-full rounded-[1.2%]" />
      </div>
      <div className="relative -mx-[6%] h-[10px] rounded-b-[14px] bg-gradient-to-b from-[#8f8f9a] to-[#5d5d66] md:h-[14px]">
        <span aria-hidden className="absolute left-1/2 top-0 h-[40%] w-[16%] -translate-x-1/2 rounded-b-[8px] bg-[#55555e]" />
      </div>
    </div>
  );
}

function InfoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <p className="font-gilroy text-[13px] font-medium uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
        {label}
      </p>
      <div className="font-gilroy mt-4 flex flex-col gap-1.5 text-[15px] leading-[1.5] text-white/80">{children}</div>
    </div>
  );
}

const Hi = ({ children }: { children: ReactNode }) => <span style={{ color: ACCENT }}>{children}</span>;

export default function NioPage() {
  return (
    <div id="top" className="relative min-h-screen bg-[#0b0a0f] text-white">
      <CreativeNav play hrefBase="/" />
      <div className="relative overflow-hidden bg-[radial-gradient(120%_70%_at_50%_0%,#2a2140_0%,#14121c_45%,#0b0a0f_100%)]">
        {/* HERO */}
        <section className="pt-36 md:pt-44">
          <Container>
            <div className="mb-12 text-center">
              <BackLink href="/#work" className="font-gilroy inline-flex items-center gap-2 text-[15px] text-white/50 transition-colors hover:text-white">
                <span>←</span>Back to Featured Work
              </BackLink>
            </div>
            <Reveal className="flex flex-col items-center text-center">
              <h1 className="font-blinker text-[clamp(44px,5.5vw,72px)] font-medium leading-none tracking-[-0.01em]">NIO</h1>
              <p className="font-gilroy mt-6 max-w-[56ch] text-[17px] leading-[1.6] text-white/60 md:text-[19px]">
                <L
                  en="Brand Management Intern (UX Design Focus) at NIO. Designed user flows, wireframes and UI concepts for NIO's internal software platform."
                  zh="蔚来品牌管理实习生（UX 设计方向）。为蔚来内部软件平台设计用户流程、线框图和 UI 概念。"
                />
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {["UI/UX", "NIO", "Information Architecture", "Internship"].map((t) => (
                  <span key={t} className="font-gilroy rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-[14px] text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Three laptops: the middle one larger and higher, the sides smaller and lower; all fade out at the bottom */}
            <Reveal className="relative mt-20 md:mt-24">
              <div className="relative mx-auto flex max-w-[1180px] items-start justify-center [mask-image:linear-gradient(180deg,#000_70%,transparent_100%)]">
                <Laptop src={`${N}/nda-2.webp`} alt="NIO Power page, blurred under NDA" className="relative z-10 mt-[12%] w-[34%] -mr-[6%] opacity-90" />
                <Laptop src={`${N}/nda-1.webp`} alt="NIO ET9 interior page, blurred under NDA" className="relative z-20 w-[48%]" />
                <Laptop src={`${N}/nda-3.webp`} alt="NIO Life page, blurred under NDA" className="relative z-10 mt-[12%] w-[34%] -ml-[6%] opacity-90" />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* TIMELINE / SCOPE / TEAM */}
        <section className="pb-24 pt-10 md:pb-32">
          <Container>
            <Reveal className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-3">
              <InfoCard label="Timeline">
                <p>June 2026 – Sep 2026</p>
              </InfoCard>
              <InfoCard label="My Scope">
                <p>User Flows</p>
                <p>Wireframes</p>
                <p>UI Concepts</p>
                <p>Content Audits</p>
                <p>Information Architecture</p>
              </InfoCard>
              <InfoCard label="Team">
                <p>
                  <L en="Brand team" zh="品牌团队" />
                </p>
                <p>
                  <L en="Design team" zh="设计团队" />
                </p>
              </InfoCard>
            </Reveal>
          </Container>
        </section>

        {/* RESPONSIBILITY */}
        <section className="pb-32 md:pb-44">
          <Container>
            <Reveal className="mx-auto max-w-[920px] text-center">
              <p className="font-gilroy text-[22px] uppercase tracking-[0.06em] text-white/60 md:text-[26px]">Responsibility</p>
              <div className="mx-auto mt-6 h-px max-w-[820px] bg-white/15" />
              <div className="font-gilroy mt-12 flex flex-col gap-8 text-[clamp(22px,2.4vw,30px)] leading-[1.45] text-white/60">
                <p>
                  <L
                    en={<>Designed <Hi>user flows, wireframes, and UI concepts for NIO&apos;s internal software platform</Hi>, translating complex business requirements into clear and usable product experiences.</>}
                    zh={<>为蔚来内部软件平台设计<Hi>用户流程、线框图和 UI 概念</Hi>，将复杂的业务需求转化为清晰、易用的产品体验。</>}
                  />
                </p>
                <p>
                  <L
                    en={<>Conducted <Hi>content audits and analyzed platform structures</Hi> across multiple brand ecosystems to identify information gaps and opportunities for information architecture improvements.</>}
                    zh={<>对多个品牌生态进行<Hi>内容审计并分析平台结构</Hi>，找出信息缺口和信息架构的改进机会。</>}
                  />
                </p>
                <p>
                  <L
                    en={<>Collaborated with brand and design teams to balance <Hi>user needs, visual consistency, and business objectives</Hi> across the digital experience.</>}
                    zh={<>与品牌和设计团队合作，在数字体验中平衡<Hi>用户需求、视觉一致性和业务目标</Hi>。</>}
                  />
                </p>
              </div>
              <p className="font-blinker mt-20 text-[clamp(30px,3.4vw,44px)]" style={{ color: ACCENT }}>
                <L en="Coming Soon…" zh="敬请期待…" />
              </p>
            </Reveal>
          </Container>
        </section>
      </div>

      <div className="relative z-10">
        <CreativeCTA hrefBase="/" />
      </div>
    </div>
  );
}

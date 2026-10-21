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
// "Available soon"). Look after keithren.com/space-carfolio: near-black page with a soft grey glow at the top, white
// Helvetica titles, dark grey cards, light-blue highlights. Work is under NDA, so the
// screens are pixelated and stamped (tools/nio_assets.py).
const N = "/images/nio";
const ACCENT = "#8ac0ff"; // CarFolio highlight blue

/** A screen inside a dark laptop: rounded bezel with a notch, and a thin aluminium base. */
function Laptop({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={className}>
      <div className="relative rounded-[4%/6.4%] border border-white/[0.12] bg-[#0e0e10] p-[0.9%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <span aria-hidden className="absolute left-1/2 top-0 h-[1.6%] w-[7%] -translate-x-1/2 rounded-b-[5px] bg-[#0e0e10]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={1600} height={1000} className="block h-auto w-full rounded-[3.2%/5.1%]" />
      </div>
      <div className="relative -mx-[5%] h-[6px] rounded-b-[10px] bg-gradient-to-b from-[#9a9aa3] to-[#55555c] md:h-[9px]">
        <span aria-hidden className="absolute left-1/2 top-0 h-[40%] w-[16%] -translate-x-1/2 rounded-b-[8px] bg-[#55555e]" />
      </div>
    </div>
  );
}

function InfoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[10px] bg-[#1c1c1c] p-6">
      <p className="font-gilroy text-[15px] font-medium uppercase text-white">
        {label}
      </p>
      <div className="font-gilroy mt-4 flex flex-col gap-1 text-[14px] leading-[1.5] text-white/70">{children}</div>
    </div>
  );
}

const Hi = ({ children }: { children: ReactNode }) => <span style={{ color: ACCENT }}>{children}</span>;

export default function NioPage() {
  return (
    <div id="top" className="relative min-h-screen bg-[#020008] text-white">
      <CreativeNav play hrefBase="/" />
      <div className="relative overflow-hidden bg-[radial-gradient(90%_55%_at_50%_0%,#3a3740_0%,#16141b_55%,#020008_100%)]">
        {/* HERO */}
        <section className="pt-36 md:pt-44">
          <Container>
            <div className="mb-12 text-center">
              <BackLink href="/#work" className="font-gilroy inline-flex items-center gap-2 text-[15px] text-white/50 transition-colors hover:text-white">
                <span>←</span>Back to Featured Work
              </BackLink>
            </div>
            <Reveal className="flex flex-col items-center text-center">
              <h1 className="font-gilroy text-[clamp(44px,4vw,56px)] font-medium leading-none text-white">NIO</h1>
              <p className="font-gilroy mt-5 max-w-[60ch] text-[15px] leading-[1.5] text-white/55">
                <L
                  en="Brand Management Intern (UX Design Focus) at NIO. Designed user flows, wireframes and UI concepts for NIO's internal software platform."
                  zh="蔚来品牌管理实习生（UX 设计方向）。为蔚来内部软件平台设计用户流程、线框图和 UI 概念。"
                />
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {["UI/UX", "NIO", "Information Architecture", "Internship"].map((t) => (
                  <span key={t} className="font-gilroy rounded-full border border-white/10 bg-[#2e2c2f] px-4 py-1.5 text-[13px] text-white">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* One large laptop; it fades out at the bottom like the Vegan Kitchen hero */}
            <Reveal className="relative mt-20 md:mt-24">
              {/* soft violet glow behind the laptop */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-[70%] max-w-[1100px] rounded-full bg-[#5c5866]/25 blur-[120px]" />
              <div className="relative -mx-gutter overflow-hidden [mask-image:linear-gradient(180deg,#000_48%,transparent_96%)] md:-mx-gutter-lg">
                <div className="relative mx-auto flex max-w-[1600px] justify-center">
                  <Laptop src={`${N}/nda-3.webp`} alt="NIO Life page, blurred under NDA" className="relative w-[92%] md:w-[86%]" />
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* TIMELINE / SCOPE / TEAM */}
        <section className="pb-24 pt-2 md:pb-32">
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
              <p className="font-gilroy text-[22px] uppercase text-white/55 md:text-[24px]">Responsibility</p>
              <div className="mx-auto mt-5 h-px max-w-[820px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="font-gilroy mt-12 flex flex-col gap-8 text-[clamp(20px,2vw,26px)] leading-[1.4] text-white/55">
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
              <p className="font-gilroy mt-20 text-[clamp(28px,3vw,40px)] font-medium" style={{ color: ACCENT }}>
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

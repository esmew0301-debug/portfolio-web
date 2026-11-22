import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: `NIO — ${person.name}`,
  description: "Brand Management Intern (UX Design Focus) at NIO: rollout, pre-launch testing and information architecture for two internal brand platforms.",
};

// Same black, minimal system as the other case studies (zegzulka.com type scale and spacing): framed split hero with
// the cover, description and context, Responsibility in three columns, then "Coming soon" on the left and the work,
// blurred under NDA, on the right.
const N = "/images/nio";
const ACCENT = "#8ac0ff";
const LABEL = "text-[12px] leading-[18px] text-white/45";
const BODY = "text-[16px] leading-[24px] text-white/60";

const Hi = ({ children }: { children: ReactNode }) => <span style={{ color: ACCENT }}>{children}</span>;

const RESPONSIBILITY = [
  {
    en: (
      <>
        Coordinated the brand and engineering teams in ABOVE&apos;s later stages, tracking <Hi>blockers, estimates and delivery dates</Hi>, and score submissions across sub-brands.
      </>
    ),
  },
  {
    en: (
      <>
        Led <Hi>pre-launch testing with 14 brand experts</Hi> on invitations, score submission and result records, then followed each issue with engineering through fix and retest.
      </>
    ),
  },
  {
    en: (
      <>
        Organized brand images, logos and guidelines for Brand Protocol, and contributed to its <Hi>UX discussions and information architecture</Hi>.
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
                <>Brand Management Intern, <Hi>UX focus.</Hi></>
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
              Rollout, testing and information architecture for two internal NIO brand platforms.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                Contributed to the rollout of ABOVE, an internal brand-compliance scoring platform across three NIO brands. I coordinated engineering feedback, led pre-launch testing with 14 brand experts, and supported product iterations and regional assessments. I also contributed to the information architecture and content organization of Brand Protocol, an internal brand-resource platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className={LABEL}>Timeline</p>
                <p className="text-[14px] text-white/80">Jun 2026 – Sep 2026</p>
              </div>
              <div>
                <p className={LABEL}>
                  My scope
                </p>
                <p className="text-[14px] text-white/80">Coordination · Testing · Information architecture</p>
              </div>
              <div>
                <p className={LABEL}>
                  Team
                </p>
                <p className="text-[14px] text-white/80">
                  Brand · Engineering · Design
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESPONSIBILITY (left) beside the NDA screen (right), then "Coming soon" in small type */}
      <section className="mt-28 flex flex-col gap-12 md:mt-40">
        <div className="px-3">
          <p className="text-center text-[13px] leading-[18px] text-white/70">Responsibility</p>
          <div className="mt-2 h-px bg-white/15" />
        </div>
        <div className="grid items-center gap-12 px-3 md:grid-cols-[1fr_1.4fr] md:gap-10">
          <Reveal>
            {RESPONSIBILITY.map((r, i) => (
              <div key={i} className="grid grid-cols-[40px_1fr] border-b border-white/15 py-5 first:pt-0">
                <p className="pt-[3px] text-[12px]" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className={BODY}>
                  {r.en}
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <div className="rounded-[14px] bg-[#1c1c1c] p-2.5 md:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${N}/nda-3.webp`} alt="A NIO platform screen, blurred under the non-disclosure agreement" width={1600} height={1000} loading="lazy" className="block h-auto w-full rounded-[8px]" />
            </div>
          </Reveal>
        </div>
        <Reveal className="px-3">
          <p className={LABEL}>
            Coming soon. The work is under a non-disclosure agreement; a case study will follow once it can be shared.
          </p>
        </Reveal>
      </section>

      <div className="mt-36 md:mt-52">
        <CreativeCTA hrefBase="/" dark />
      </div>
    </div>
  );
}

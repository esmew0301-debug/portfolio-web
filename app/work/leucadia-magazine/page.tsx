import type { Metadata } from "next";
import { BackLink } from "@/components/case/back-link";
import { Reveal } from "@/components/case/reveal";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { figma, person } from "@/lib/content";

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
              <img src={`${M}/logo.png`} alt="Leucadia Magazine logo" width={900} height={216} className="mb-4 block h-auto w-[130px]" />
              <h1 className="text-[16px] text-white">Leucadia Magazine</h1>
              <p className="mt-1 text-[12px] text-white/50">
                <>Every local business has <span className="text-white">a story.</span></>
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
              A website redesign for readers browsing local stories, and for businesses that want to be featured.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <div>
              <p className="text-[13px] text-white">Context</p>
              <p className={`${BODY} mt-2`}>
                Next to comparable local magazines, the old site was cluttered, with no clear way to browse and nowhere for a business to submit beyond a generic contact form.{" "}
                <a href={figma.posse} target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                  Before and after in Figma ↗
                </a>
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white">
                The redesign
              </p>
              <p className={`${BODY} mt-2`}>
                Product decision: prioritize content discovery for readers, with four clear sections and a browsable archive, and a guided three-step submission flow for local businesses: two distinct needs, one platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className={LABEL}>
                  My role
                </p>
                <p className="text-[14px] text-white/80">Product Manager Intern</p>
              </div>
              <div>
                <p className={LABEL}>
                  Timeline
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
              Final design
            </p>
            <p className="mt-1 text-[14px] text-white">
              The redesigned site
            </p>
            <p className="mt-1.5 max-w-[340px] text-[13px] leading-[20px] text-white/55">
              Home, editorial archives, publications, and the business submission flow.
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

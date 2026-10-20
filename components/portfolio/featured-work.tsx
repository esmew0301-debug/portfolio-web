"use client";

import { featuredWork, selectedWork } from "@/lib/content";
import { SectionEyebrow } from "./section-eyebrow";
import { ShowcaseCard } from "./showcase";
import { L } from "@/lib/i18n";

// Featured Work: each project as a large highlighted showcase card (media left, name / description / pills right).
export function FeaturedWork() {
  return (
    <section id="work" className="bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-[1274px]">
        <div>
          <SectionEyebrow>{featuredWork.since}</SectionEyebrow>
          <h2
            data-reveal
            className="font-blinker text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-[-0.03em] text-white"
          >
            {featuredWork.title}
          </h2>
          <p
            data-reveal
            className="font-sulphur mt-6 max-w-[760px] text-[clamp(18px,2.2vw,26px)] leading-snug tracking-tight text-white/70"
          >
            <L en={featuredWork.subtitle} zh={featuredWork.subtitleZh} />
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-10 md:mt-20 md:gap-8 md:pt-12">
          {selectedWork.map((w) => (
            <ShowcaseCard
              key={w.label}
              item={{
                eyebrow: w.label,
                title: w.title,
                description: w.descriptionZh ? <L en={w.description} zh={w.descriptionZh} /> : w.description,
                tags: w.tags ?? [],
                href: w.href,
                alt: w.alt,
                image: w.image,
                video: w.video,
                poster: w.poster,
                imagePosition: w.imagePosition,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

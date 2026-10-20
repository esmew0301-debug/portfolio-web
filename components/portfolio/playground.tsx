"use client";

import { playground, playgroundProjects } from "@/lib/content";
import { SectionEyebrow } from "./section-eyebrow";
import { ShowcaseCard } from "./showcase";
import { L } from "@/lib/i18n";

// Playground: the projects as compact showcase rows (reference: "Other Selected Works").
export function Playground() {
  return (
    <section id="playground" className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1274px]">
        <SectionEyebrow>{playground.since}</SectionEyebrow>
        <h2 data-reveal className="font-blinker text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-[-0.03em]">
          {playground.title}
        </h2>
        <p
          data-reveal
          className="font-sulphur mt-6 max-w-[760px] text-[clamp(18px,2.2vw,26px)] leading-snug tracking-tight text-white/70"
        >
          <L en={playground.subtitle} zh={playground.subtitleZh} />
        </p>
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-10 md:mt-16 md:gap-6">
          {playgroundProjects.map((p) => (
            <ShowcaseCard
              key={p.index}
              variant="compact"
              item={{
                eyebrow: "Playground",
                title: p.title,
                description: <L en={p.blurb} zh={p.blurbZh} />,
                tags: p.tags,
                href: p.href,
                alt: p.title,
                image: p.image,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { playground, playgroundProjects } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { ShowcaseCard } from "./showcase";
import { L } from "@/lib/i18n";

// Playground: the projects as compact showcase rows (reference: "Other Selected Works").
export function Playground() {
  return (
    <section id="playground" className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1274px]">
        <SectionHeader eyebrow={playground.since} title={playground.title} intro={<L en={playground.subtitle} zh={playground.subtitleZh} />} />
        <div className="mt-10 flex flex-col gap-6 md:mt-12 md:gap-8">
          {playgroundProjects.map((p) => (
            <ShowcaseCard
              key={p.index}
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

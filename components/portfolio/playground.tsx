"use client";

import { playground, playgroundProjects } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { ShowcaseCard } from "./showcase";

// Playground: the projects as compact showcase rows (reference: "Other Selected Works").
export function Playground() {
  return (
    <section id="playground" className="px-6 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1274px]">
        <SectionHeader eyebrow={playground.since} title={playground.title} intro={playground.subtitle} />
        <div className="mt-10 flex flex-col gap-6 md:mt-12 md:gap-8">
          {playgroundProjects.map((p) => (
            <ShowcaseCard
              key={p.index}
              item={{
                eyebrow: "Playground",
                title: p.title,
                description: p.blurb,
                tags: p.tags,
                href: p.href,
                alt: p.title,
                image: p.image,
                video: p.video,
                poster: p.poster,
                mediaBg: p.mediaBg,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { featuredWork, selectedWork } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { ShowcaseCard } from "./showcase";

// Featured Work: each project as a large highlighted showcase card (media left, name / description / pills right).
export function FeaturedWork() {
  return (
    <section id="work" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1274px]">
        <SectionHeader eyebrow={featuredWork.since} title={featuredWork.title} intro={featuredWork.subtitle} />

        <div className="mt-10 flex flex-col gap-6 md:mt-12 md:gap-8">
          {selectedWork.map((w) => (
            <ShowcaseCard
              key={w.label}
              item={{
                eyebrow: w.label,
                title: w.title,
                description: w.description,
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

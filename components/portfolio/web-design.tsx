"use client";

import { featuredWork, webDesign, webDesignIntro, webDesignIntroZh } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { ShowcaseCard } from "./showcase";
import { L } from "@/lib/i18n";

// Web Design: compact showcase rows, same format as Playground.
export function WebDesign() {
  return (
    <section id="web" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1274px]">
        <SectionHeader eyebrow={featuredWork.since} title="Web Design" intro={<L en={webDesignIntro} zh={webDesignIntroZh} />} />
        <div className="mt-10 flex flex-col gap-6 md:mt-12 md:gap-8">
          {webDesign.map((w) => (
            <ShowcaseCard
              key={w.label}
              item={{
                eyebrow: "Web Design",
                title: w.label,
                description: <L en={w.blurb} zh={w.blurbZh} />,
                tags: w.tags,
                href: w.href,
                alt: w.alt,
                image: w.image,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

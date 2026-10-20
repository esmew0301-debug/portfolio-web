"use client";

import { webDesign, webDesignIntro, webDesignIntroZh } from "@/lib/content";
import { ShowcaseCard } from "./showcase";
import { L } from "@/lib/i18n";

// Web Design: compact showcase rows, same format as Playground.
export function WebDesign() {
  return (
    <section id="web" className="bg-black px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1274px]">
        <div className="flex items-end justify-between">
          <h2
            data-reveal
            className="font-blinker pb-[0.2em] text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-[-0.03em] text-white"
          >
            Web Design
          </h2>
          <span data-reveal className="font-gilroy hidden text-sm uppercase tracking-[0.25em] text-white/40 md:block">
            ({String(webDesign.length).padStart(2, "0")})
          </span>
        </div>
        <p
          data-reveal
          className="font-sulphur mt-6 max-w-[620px] text-[clamp(18px,2.2vw,26px)] leading-snug tracking-tight text-white/70"
        >
          <L en={webDesignIntro} zh={webDesignIntroZh} />
        </p>
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-10 md:mt-16">
          {webDesign.map((w) => (
            <ShowcaseCard
              key={w.label}
              variant="compact"
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

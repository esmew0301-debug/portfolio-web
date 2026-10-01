"use client";

import Image from "next/image";
import { useState } from "react";
import { featuredWork, selectedWork } from "@/lib/content";
import { Chevron } from "./icons";
import { SectionEyebrow } from "./section-eyebrow";

const ARROW_CLASS =
  "grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function FeaturedWork() {
  const [index, setIndex] = useState(0);
  const total = selectedWork.length;
  const current = selectedWork[index];
  const step = (d: number) => setIndex((i) => (i + d + total) % total);

  return (
    <section id="work" className="flex min-h-screen flex-col justify-center bg-black px-6 py-24 md:px-10 md:py-32">
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
            {featuredWork.subtitle}
          </p>
        </div>

        <div className="mt-20 flex items-center justify-center gap-4 md:gap-6">
          <button type="button" onClick={() => step(-1)} aria-label="Previous project" className={ARROW_CLASS}>
            <Chevron dir="left" />
          </button>
          <div
            data-cursor="view"
            style={{ height: "80vh", aspectRatio: "3 / 2", maxWidth: "100%" }}
            className="relative block shrink overflow-hidden rounded-[10px] bg-neutral-900"
          >
            {selectedWork.map((w, i) => (
              <div
                key={w.label}
                className="absolute inset-0 transition-opacity duration-500 ease-out"
                style={{ opacity: i === index ? 1 : 0 }}
              >
                {w.video ? (
                  <video
                    src={w.video}
                    poster={w.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-label={w.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: w.imagePosition }}
                  />
                ) : (
                  <Image src={w.image} alt={w.alt} fill sizes="900px" className="object-cover" style={{ objectPosition: w.imagePosition }} preload={i === 0} loading={i === 0 ? undefined : "eager"} />
                )}
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <span className="pointer-events-none absolute left-5 top-5 z-20 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 font-gilroy text-xs tracking-[0.25em] text-white backdrop-blur-md">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div key={index} className="sw-info pointer-events-none absolute inset-x-0 bottom-0 z-20 p-7 md:p-10">
              <h3 className="font-blinker text-[clamp(26px,3.2vw,44px)] font-medium leading-tight text-white">
                {current.title}
              </h3>
              <p className="font-gilroy mt-2 max-w-[560px] text-[15px] leading-relaxed text-white/75 md:text-[16px]">
                {current.description}
              </p>
            </div>
            <a
              href={current.href}
              aria-label={current.title}
              className="absolute inset-0 z-30"
              {...(isExternal(current.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            />
          </div>
          <button type="button" onClick={() => step(1)} aria-label="Next project" className={ARROW_CLASS}>
            <Chevron dir="right" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-2 border-t border-white/10 pt-5">
          {selectedWork.map((w, i) => (
            <button
              key={w.label}
              type="button"
              onClick={() => setIndex(i)}
              className="font-gilroy text-[15px] transition-colors duration-300 md:text-base"
              style={{ color: i === index ? "#ffffff" : "rgba(255,255,255,0.4)" }}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

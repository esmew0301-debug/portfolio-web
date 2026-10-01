"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { playground, playgroundProjects } from "@/lib/content";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { SectionEyebrow } from "./section-eyebrow";

const isExternal = (href: string) => /^https?:\/\//.test(href);

// Pinned section that scrolls horizontally; each image drifts inside its frame (parallax).
export function Playground() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
    setReduced(prefersReducedMotion());
  }, []);

  useGSAP(
    () => {
      if (reduced) return;
      const el = track.current!;
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const scroll = gsap.to(el, {
          x: () => -(el.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => "+=" + (el.scrollWidth - window.innerWidth),
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".pg-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: scroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
        return () => scroll.kill();
      });
      ScrollTrigger.refresh();
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section ref={section} id="playground" className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div
        ref={track}
        className={cn(
          "flex w-full flex-col gap-16 py-20",
          !reduced && "md:h-screen md:w-max md:flex-row md:flex-nowrap md:items-stretch md:gap-0 md:py-0",
          reduced && "md:gap-24 md:py-32",
        )}
      >
        <div
          className={cn(
            "flex w-full shrink-0 flex-col justify-center px-6",
            !reduced && "md:h-full md:w-[46vw] md:pr-16 md:[padding-left:calc(max((100vw-1354px)/2,0px)+2.5rem)]",
            reduced && "mx-auto max-w-[1274px] md:px-10",
          )}
        >
          <SectionEyebrow>{playground.since}</SectionEyebrow>
          <h2 data-reveal className="font-blinker text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-[-0.03em]">
            {playground.title}
          </h2>
          <p
            data-reveal
            className="font-sulphur mt-6 max-w-[420px] text-[clamp(18px,2.2vw,26px)] leading-snug tracking-tight text-white/70"
          >
            {playground.subtitle}
          </p>
          <span
            data-reveal
            className="font-gilroy mt-10 hidden text-sm uppercase tracking-[0.2em] text-white/40 md:block"
          >
            Scroll →
          </span>
        </div>
        {playgroundProjects.map((p) => (
          <a
            key={p.index}
            href={p.href}
            data-cursor="view"
            {...(isExternal(p.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
              "group flex w-full shrink-0 flex-col justify-center px-6",
              !reduced && "md:h-full md:w-[42vw] md:px-10",
              reduced && "mx-auto max-w-[760px] md:px-10",
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-neutral-900">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width:768px) 100vw, 42vw"
                className="pg-img scale-110 object-cover"
              />
            </div>
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-sulphur text-[clamp(28px,3.4vw,44px)] leading-tight tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="font-gilroy mt-2 max-w-[380px] text-[16px] leading-relaxed text-white/60">{p.blurb}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="font-gilroy rounded-full border border-white/15 px-3 py-1 text-xs tracking-wide text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
        {!reduced && <div className="hidden shrink-0 md:block md:h-full md:w-[8vw]" />}
      </div>
    </section>
  );
}

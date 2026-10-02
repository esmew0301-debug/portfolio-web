"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export type JourneyEntry = { n: string; org: string; role: string; when: string; text: ReactNode };

/**
 * Zigzag timeline (reference: jingjinghan.com/about "My Journey to Design").
 * The white line draws down with the scroll (scrubbed), and each entry scales up to full size and opacity while it
 * sits in the middle band of the viewport, then settles back to 90% / half opacity once it leaves, in both directions.
 */
export function Journey({ entries }: { entries: JourneyEntry[] }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".journey-item", root.current);
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, scale: 1 });
        gsap.set(line.current, { xPercent: -50, scaleY: 1 });
        return;
      }
      gsap.set(items, { opacity: 0.5, scale: 0.9 });
      gsap.fromTo(
        line.current,
        { xPercent: -50, scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 55%", end: "bottom 75%", scrub: 0.4 },
        },
      );
      for (const el of items) {
        const on = () => gsap.to(el, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", overwrite: true });
        const off = () => gsap.to(el, { opacity: 0.5, scale: 0.9, duration: 0.6, ease: "power3.out", overwrite: true });
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: on,
          onEnterBack: on,
          onLeave: off,
          onLeaveBack: off,
        });
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mt-20 md:mt-28">
      <div aria-hidden className="absolute inset-y-0 left-[10px] w-px bg-white/12 md:left-1/2 md:-translate-x-1/2" />
      <div
        ref={line}
        aria-hidden
        className="absolute inset-y-0 left-[10px] w-px origin-top bg-white md:left-1/2"
        style={{ transform: "translateX(-50%) scaleY(0)" }}
      />
      <ol className="flex flex-col gap-16 md:gap-24">
        {entries.map((e, i) => {
          const right = i % 2 === 0;
          return (
            <li key={e.n} className="relative md:grid md:grid-cols-2 md:items-start md:gap-16">
              <span
                aria-hidden
                className="absolute left-[10px] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border border-white/40 bg-black md:left-1/2"
              >
                <span className="absolute inset-[3px] rounded-full bg-white" />
              </span>
              {right && <div className="hidden md:block" aria-hidden />}
              <div
                className={`journey-item pl-9 will-change-transform ${
                  right ? "md:origin-left md:pl-16 md:text-left" : "md:origin-right md:pl-0 md:pr-16 md:text-right"
                }`}
                style={{ opacity: 0.5, transform: "scale(0.9)" }}
              >
                <span className="font-gilroy text-[15px] tabular-nums text-white/40">
                  {e.n}
                  <span className="ml-4 uppercase tracking-[0.12em]">{e.when}</span>
                </span>
                <h3 className="font-blinker mt-2 text-[clamp(24px,3.2vw,40px)] font-medium uppercase leading-tight tracking-[-0.01em]">
                  {e.org}
                </h3>
                <p className="font-gilroy mt-2 text-[15px] uppercase tracking-[0.12em] text-white/50">{e.role}</p>
                <p className="font-sulphur mt-4 text-[clamp(16px,1.4vw,19px)] leading-relaxed text-white/65">{e.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

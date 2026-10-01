"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const TINT = "color-mix(in srgb, var(--accent-green) 10%, var(--case-bg, #0b0b0b))";

// Stage sequence on a tinted panel. On scroll, the outer stages slide in from the sides
// and the connecting arrows pop in (scrubbed to scroll position).
export function StageFlow({ stages }: { stages: { title: string; body: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const first = el.querySelector('[data-flow="first"]');
        const last = el.querySelector('[data-flow="last"]');
        const arrows = el.querySelectorAll("[data-flow-arrow]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 92%", end: "center 52%", scrub: 1.2 },
        });
        if (first) tl.fromTo(first, { xPercent: -14, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0);
        if (last) tl.fromTo(last, { xPercent: 14, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0);
        if (arrows.length)
          tl.fromTo(arrows, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, ease: "power2.out", stagger: 0.2 }, 0.35);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div className="overflow-hidden rounded-[28px] px-4 py-8 md:px-10 md:py-12" style={{ background: TINT }}>
      <div ref={ref} className="flex flex-col items-stretch gap-6 md:flex-row md:items-stretch md:gap-3 lg:gap-5">
        {stages.map((s, i) => {
          const isFirst = i === 0;
          const isLast = i === stages.length - 1;
          return (
            <Fragment key={s.title}>
              <div
                data-flow={isFirst ? "first" : isLast ? "last" : "mid"}
                className="flex-1 rounded-2xl border border-white/10 bg-[#141414] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)] md:p-7"
              >
                <span className="font-blinker block text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h5 className="font-blinker mt-2 text-[22px] font-medium uppercase leading-tight tracking-[0.04em] text-white md:text-[24px]">
                  {s.title}
                </h5>
                <p className="font-gilroy mt-3 text-[15px] leading-[1.6] text-neutral-400">{s.body}</p>
              </div>
              {!isLast && (
                <span
                  data-flow-arrow
                  aria-hidden
                  className="shrink-0 self-center rotate-90 md:rotate-0"
                  style={{ color: "var(--accent-green)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 md:h-9 md:w-9">
                    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

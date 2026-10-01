"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

// Blur-up reveal for every [data-reveal] element, plus [data-parallax] drift.
export function RevealAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 90, scale: 0.94, filter: "blur(12px)" });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.14,
              overwrite: true,
            }),
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.15") || 0.15;
        gsap.to(el, {
          yPercent: -(100 * amount),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return null;
}

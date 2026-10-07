"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { marqueeWords } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

function MarqueeGroup() {
  return (
    <div className="marquee-group flex shrink-0 items-center gap-8 pr-8">
      {marqueeWords.map((w) => (
        <span key={w} className="flex items-center gap-8">
          <span className="font-title text-[clamp(28px,5vw,64px)] leading-none tracking-tight">{w}</span>
          <span className="text-[clamp(20px,3vw,40px)]" style={{ color: "var(--accent)" }}>
            ✳
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".marquee-group", { xPercent: -100, repeat: -1, duration: 22, ease: "none" });
    },
    { scope: ref },
  );

  return (
    <div className="overflow-hidden bg-white py-6 text-black">
      <div ref={ref} className="flex w-max flex-nowrap">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}

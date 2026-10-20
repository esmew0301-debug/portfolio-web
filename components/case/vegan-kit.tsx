"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const useLayoutEffectSafe = (fn: () => void | (() => void)) =>
  (typeof window === "undefined" ? useEffect : useLayoutEffect)(fn, []);
import { cn } from "@/lib/utils";

// Building blocks for the Val's Vegan Kitchen case study (layout reference: keithren.com/space-itinera).
// Screens are 780 x 1695 cut-outs with their rounded corners baked in.

export const VK_ORANGE = "#f97316";

/** One phone screen in the page's frame (border in the page colour, hairline ring, soft shadow). */
export function Shot({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("phone-frame shrink-0", className)} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={780} height={1695} loading="lazy" draggable={false} className="block h-auto w-full select-none" />
    </div>
  );
}

/** Three screens fanned out: the middle one raised and in front (hero and key-feature compositions). */
export function Trio({ shots, className }: { shots: { src: string; alt: string }[]; className?: string }) {
  const [a, b, c] = shots;
  return (
    <div className={cn("relative mx-auto flex w-full max-w-[640px] items-end justify-center", className)}>
      <Shot {...a} className="relative z-10 w-[30%] translate-x-[12%] translate-y-[8%]" />
      <Shot {...b} className="relative z-20 w-[34%]" />
      <Shot {...c} className="relative z-10 w-[30%] -translate-x-[12%] translate-y-[8%]" />
    </div>
  );
}

/** A row of screens you can drag (or scroll / use the arrows) sideways. */
export function DragGallery({ shots, label }: { shots: { src: string; alt: string }[]; label: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const by = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.7, behavior: "smooth" });
  return (
    <div className="min-w-0">
      <div
        ref={ref}
        className={cn("flex gap-5 overflow-x-auto pb-6 pt-2 [scrollbar-width:none]", grabbing ? "cursor-grabbing" : "cursor-grab")}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: ref.current!.scrollLeft };
          setGrabbing(true);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          ref.current!.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current = null;
          setGrabbing(false);
        }}
        onPointerLeave={() => {
          drag.current = null;
          setGrabbing(false);
        }}
        data-cursor-hover
      >
        {shots.map((s) => (
          <Shot key={s.src} {...s} className="w-[170px] md:w-[200px]" />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3">
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => by(d)}
            aria-label={d < 0 ? "Scroll back" : "Scroll forward"}
            className="grid h-9 w-9 place-items-center rounded-full border border-black/15 text-[#111] transition-colors hover:border-black/40"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d={d < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
        <span className="font-gilroy ml-2 text-[13px] uppercase tracking-[0.2em] text-[#8a8a8a]">{label}</span>
      </div>
    </div>
  );
}

/** Endless, slowly moving strip of screens (pauses on hover), like a looping gallery video. */
export function Marquee({ shots, reverse, seconds = 60 }: { shots: { src: string; alt: string }[]; reverse?: boolean; seconds?: number }) {
  const loop = [...shots, ...shots];
  return (
    <div className="vk-marquee overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="flex w-max gap-5"
        style={{ animation: `vk-marquee ${seconds}s linear infinite${reverse ? " reverse" : ""}` }}
      >
        {loop.map((s, i) => (
          <Shot key={i} src={s.src} alt={i < shots.length ? s.alt : ""} className="w-[150px] md:w-[180px]" />
        ))}
      </div>
    </div>
  );
}

/** Diagonal arrow pointing down from Before to After. */
export function DownArrow({ flip, className }: { flip?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" aria-hidden className={cn("h-16 w-24 md:h-20 md:w-28", flip && "-scale-x-100", className)} style={{ color: VK_ORANGE }}>
      <path d="M12 8 C 40 20, 70 40, 100 74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M86 74 L 101 76 L 99 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** This page is designed for the light theme only: keep it light even after client-side navigation. */
export function ForceLight() {
  useLayoutEffectSafe(() => {
    const root = document.documentElement;
    const prev = root.getAttribute("data-case-theme");
    root.setAttribute("data-case-theme", "light");
    return () => {
      if (prev) root.setAttribute("data-case-theme", prev);
    };
  });
  return null;
}

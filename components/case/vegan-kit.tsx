"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const useLayoutEffectSafe = (fn: () => void | (() => void)) =>
  (typeof window === "undefined" ? useEffect : useLayoutEffect)(fn, []);
import { cn, prefersReducedMotion } from "@/lib/utils";

// Building blocks for the Val's Vegan Kitchen case study (layout reference: keithren.com/space-itinera).
// Screens are 780 x 1695 cut-outs with their rounded corners baked in.

export const VK_ORANGE = "#f97316";

/** One phone screen in the page's frame (border in the page colour, hairline ring, soft shadow). */
export function Shot({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: CSSProperties }) {
  // Phone mockup sized in container units, so it scales with whatever width the screen is given.
  return (
    <div className={cn("shrink-0", className)} style={{ ...style, containerType: "inline-size" }}>
      <div className="phone-device" style={{ padding: "0.9cqw", borderRadius: "13.6cqw" }}>
        <span aria-hidden className="btn l" style={{ left: -2, top: "15%", height: "4%" }} />
        <span aria-hidden className="btn l" style={{ left: -2, top: "22%", height: "7%" }} />
        <span aria-hidden className="btn l" style={{ left: -2, top: "31%", height: "7%" }} />
        <span aria-hidden className="btn r" style={{ right: -2, top: "24%", height: "11%" }} />
        <div style={{ padding: "2.4cqw", borderRadius: "12.7cqw", background: "#3a3c41" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={780}
            height={1695}
            loading="lazy"
            draggable={false}
            className="block h-auto w-full select-none"
            style={{ borderRadius: "10.3cqw" }}
          />
        </div>
      </div>
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

/** Scroll progress of an element through the viewport: 0 when its top enters at `start`, 1 at `end` (fractions of vh). */
export function useScrollProgress<T extends HTMLElement>(start = 0.9, end = 0.45) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
      setP(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = (vh * start - r.top) / (vh * (start - end));
      setP(Math.min(1, Math.max(0, t)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [start, end]);
  return { ref, p };
}

/**
 * Before → After arrow: a smooth dashed curve with a soft shadow (so it reads as slightly raised), drawn in
 * as the visitor scrolls past it. flip mirrors it (pointing down-left).
 */
export function ScrollArrow({ flip, vertical, className }: { flip?: boolean; vertical?: boolean; className?: string }) {
  const { ref, p } = useScrollProgress<HTMLDivElement>(0.92, 0.5);
  const id = `vka${useId().replace(/:/g, "")}`;
  // vertical: a gentle S down the middle of the screens column (Before above, After below)
  const d = vertical ? "M75 6 C 60 45, 90 85, 75 128" : "M14 10 C 30 70, 90 70, 132 118";
  const head = vertical ? "M63 116 L 75 130 L 87 116" : "M114 116 L 134 120 L 130 99";
  return (
    <div ref={ref} aria-hidden className={cn("h-28 w-40 md:h-36 md:w-52", className)}>
      <svg viewBox={vertical ? "50 0 50 140" : "0 0 150 140"} fill="none" className={cn("h-full w-full overflow-visible", flip && "-scale-x-100")}>
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse">
            <path d={d} stroke="#fff" strokeWidth="10" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: 1 - p }} />
          </mask>
        </defs>
        <g>
          <path d={d} stroke={VK_ORANGE} strokeWidth="2" strokeLinecap="round" mask={`url(#${id})`} />
          <path
            d={head}
            stroke={VK_ORANGE}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: p > 0.92 ? 1 : 0, transition: "opacity 0.3s ease" }}
          />
        </g>
      </svg>
    </div>
  );
}

/** "Interfaces": two rows of screens that slide in opposite directions as the visitor scrolls (reference gallery). */
export function InterfaceRows({ rows }: { rows: { src: string; alt: string }[][] }) {
  const { ref, p } = useScrollProgress<HTMLDivElement>(1, -0.4);
  return (
    <div ref={ref} className="flex flex-col gap-6 overflow-hidden py-4">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex w-max gap-6 will-change-transform"
          style={{ transform: `translateX(${i % 2 ? -30 + p * 22 : -4 - p * 22}%)` }}
        >
          {[...row, ...row].map((s, k) => (
            <Shot key={k} src={s.src} alt={k < row.length ? s.alt : ""} className="w-[180px] md:w-[220px]" />
          ))}
        </div>
      ))}
    </div>
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

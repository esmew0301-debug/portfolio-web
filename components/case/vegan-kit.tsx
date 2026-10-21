"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const useLayoutEffectSafe = (fn: () => void | (() => void)) =>
  (typeof window === "undefined" ? useEffect : useLayoutEffect)(fn, []);
import { cn, prefersReducedMotion } from "@/lib/utils";
import { PHONE } from "./vegan-sizes";

// Building blocks for the Val's Vegan Kitchen case study (layout reference: keithren.com/space-itinera).
// Screens are 780 x 1695 cut-outs with their rounded corners baked in.

export { VK_ORANGE } from "./vegan-sizes";
/** Soft orange for the before → after arrows (the reference uses a pale blue). */
const VK_ARROW = "#fbb784";

/** One phone screen in the page's frame (border in the page colour, hairline ring, soft shadow). */
export function Shot({ src, alt, className, style, frame = false }: { src: string; alt: string; className?: string; style?: CSSProperties; frame?: boolean }) {
  if (!frame) {
    // Bare screen: the cut-out already has rounded corners; just a soft shadow.
    return (
      <div className={cn("shrink-0", className)} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={780} height={1695} loading="lazy" draggable={false} className="block h-auto w-full select-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.14)]" />
      </div>
    );
  }
  // Phone mockup sized in container units, so it scales with whatever width the screen is given.
  return (
    <div className={cn("shrink-0", className)} style={{ ...style, containerType: "inline-size" }}>
      <div className="phone-device" style={{ padding: "0.54cqw", borderRadius: "12.28cqw" }}>
        <span aria-hidden className="btn l" style={{ left: -2, top: "15%", height: "4%" }} />
        <span aria-hidden className="btn l" style={{ left: -2, top: "22%", height: "7%" }} />
        <span aria-hidden className="btn l" style={{ left: -2, top: "31%", height: "7%" }} />
        <span aria-hidden className="btn r" style={{ right: -2, top: "24%", height: "11%" }} />
        <div style={{ padding: "1.44cqw", borderRadius: "11.74cqw", background: "#3a3c41" }}>
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

/** Hero: three screens at the page's phone size, the middle one raised and in front. */
export function Trio({ shots, className }: { shots: { src: string; alt: string }[]; className?: string }) {
  const [a, b, c] = shots;
  return (
    <div className={cn("flex w-full items-start justify-center", className)}>
      <Shot frame {...a} className={cn(PHONE, "relative z-10 -mr-6 mt-[12%] md:-mr-10 xl:mt-[150px] xl:-mr-14")} />
      <Shot frame {...b} className={cn(PHONE, "relative z-20")} />
      <Shot frame {...c} className={cn(PHONE, "relative z-10 -ml-6 mt-[12%] md:-ml-10 xl:mt-[150px] xl:-ml-14")} />
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
        className={cn("-mx-5 -my-8 flex gap-5 overflow-x-auto px-5 pb-16 pt-8 md:-mx-6 md:px-6 [mask-image:linear-gradient(90deg,transparent,#000_24px,#000_calc(100%-24px),transparent)] [scrollbar-width:none]", grabbing ? "cursor-grabbing" : "cursor-grab")}
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
          <Shot key={s.src} {...s} className={PHONE} />
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

/** Before → After arrow (the reference's chunky diagonal arrow, in soft orange), drawn in as the visitor scrolls. */
export function ScrollArrow({ flip, className }: { flip?: boolean; className?: string }) {
  const { ref, p } = useScrollProgress<HTMLDivElement>(0.92, 0.55);
  const id = `vka${useId().replace(/:/g, "")}`;
  return (
    <div ref={ref} aria-hidden className={className}>
      <svg viewBox="0 0 488 488" fill="none" className={cn("h-full w-full overflow-visible", flip && "-scale-x-100")}>
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse">
            <path d="M30 30 L 456 456" stroke="#fff" strokeWidth="80" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: 1 - p }} />
          </mask>
        </defs>
        <g stroke={VK_ARROW} strokeWidth="56" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 30 L 450 450" mask={`url(#${id})`} />
          <path d="M206 458 H 458 V 206" style={{ opacity: p > 0.9 ? 1 : 0, transition: "opacity 0.3s ease" }} />
        </g>
      </svg>
    </div>
  );
}

/** "Interfaces": two rows of screens that slide in opposite directions as the visitor scrolls (reference gallery). */
export function InterfaceRows({ rows }: { rows: { src: string; alt: string }[][] }) {
  const { ref, p } = useScrollProgress<HTMLDivElement>(1, -0.4);
  return (
    <div ref={ref} className="-my-10 flex flex-col gap-6 overflow-hidden py-14">
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

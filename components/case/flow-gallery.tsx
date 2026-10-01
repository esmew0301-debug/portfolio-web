"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { prefersReducedMotion } from "@/lib/utils";

export type FlowScreen = { src: string; w: number; h: number; label: string; alt?: string };

/** A product screenshot inside a dark, rounded browser-style frame. */
export function ScreenFrame({ screen, className, ratio }: { screen: FlowScreen; className?: string; ratio?: string }) {
  return (
    <div className={`overflow-hidden rounded-[12px] bg-[#1d2026] shadow-[0_18px_40px_-18px_rgba(20,20,20,0.45)] ${className ?? ""}`}>
      <div className="flex items-center gap-1.5 px-3.5 py-2.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={screen.src}
        alt={screen.alt ?? screen.label}
        width={screen.w}
        height={screen.h}
        loading="lazy"
        decoding="async"
        className={ratio ? "block w-full bg-[#f6f3ee] object-contain object-top" : "block h-auto w-full"}
        style={ratio ? { aspectRatio: ratio } : undefined}
      />
    </div>
  );
}

const INTERVAL = 4500;
const SLIDE = "transform 0.7s cubic-bezier(0.65,0,0.35,1)";

/**
 * Step-through gallery for longer flows: one framed screen at a time, horizontal slide between
 * steps, arrows + numbered dots, swipe on touch, and a slow auto-advance while in view that
 * pauses on hover or touch.
 */
export function FlowGallery({ screens, ratio = "16 / 11" }: { screens: FlowScreen[]; ratio?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const n = screens.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
    setReduced(prefersReducedMotion());
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const t = window.setTimeout(() => setI((k) => (k + 1) % n), INTERVAL);
    return () => window.clearTimeout(t);
  }, [i, inView, paused, reduced, n]);

  const onDown = (e: RPointerEvent) => {
    start.current = e.clientX;
    setPaused(true);
  };
  const onMove = (e: RPointerEvent) => {
    if (start.current !== null) setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current === null) return;
    if (drag < -50) go(i + 1);
    else if (drag > 50) go(i - 1);
    start.current = null;
    setDrag(0);
  };

  const arrow = (dir: -1 | 1) => (
    <button
      type="button"
      onClick={() => go(i + dir)}
      aria-label={dir < 0 ? "Previous screen" : "Next screen"}
      data-cursor-hover
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#1a1a1a]/15 text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-[#f2eee7]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden rounded-[12px] bg-[#1d2026] shadow-[0_18px_40px_-18px_rgba(20,20,20,0.45)]">
        <div className="flex items-center gap-1.5 px-3.5 py-2.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div
          className="relative w-full touch-pan-y select-none overflow-hidden bg-[#f6f3ee]"
          style={{ aspectRatio: ratio }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
        >
          <div
            className="flex h-full"
            style={{
              transform: `translateX(calc(${-i * 100}% + ${drag}px))`,
              transition: drag ? "none" : SLIDE,
            }}
          >
            {screens.map((s, k) => (
              <div key={s.src} className="relative h-full w-full shrink-0" aria-hidden={k !== i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt ?? s.label}
                  width={s.w}
                  height={s.h}
                  loading={k < 2 ? "eager" : "lazy"}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-contain object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {arrow(-1)}
        <div className="min-w-0 flex-1 text-center">
          <p className="font-gilroy truncate text-[15px] text-[#1a1a1a]" aria-live="polite">
            {screens[i].label}
          </p>
          <div className="mt-2.5 flex items-center justify-center gap-3">
            <div className="flex gap-1.5">
              {screens.map((s, k) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => go(k)}
                  aria-label={`Screen ${k + 1}: ${s.label}`}
                  aria-current={k === i ? "step" : undefined}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: k === i ? 18 : 6, background: k === i ? "#1F6F6B" : "rgba(26,26,26,0.2)" }}
                />
              ))}
            </div>
            <span className="font-gilroy text-[12px] tabular-nums text-[#6b665e]">
              {i + 1} / {n}
            </span>
          </div>
        </div>
        {arrow(1)}
      </div>
    </div>
  );
}

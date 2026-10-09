"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/utils";

// Mobile-screen presentation for case studies.
//   PhoneFlow   — screens in flow order with numbered captions; they fade up one after another when the
//                 row enters view, and the row scrolls sideways when it's wider than the page.
//   CompareSlider — a before/after pair of the same screen with a draggable divider.

export type Phone = { src: string; alt: string; step: string; note?: string };

const PHONE_RATIO = "780 / 1695";

function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

/** Black phone body drawn around a screenshot: thin metal band, black bezel, side buttons, drop shadow.
 *  `width` is the outer width in px (used to size the bezel and screen radius); `island` adds a dynamic island
 *  for screenshots that don't already have one. */
export function PhoneDevice({ width, island = false, children }: { width: number; island?: boolean; children: ReactNode }) {
  const BEZEL = Math.round(width * 0.012);
  const EDGE = 2;
  const screenW = width - 2 * (BEZEL + EDGE);
  const r = Math.round(screenW * 0.125);
  return (
    <div className="phone-device" style={{ padding: EDGE, borderRadius: r + BEZEL + EDGE }}>
      {/* side buttons: action + volume up/down on the left, power on the right */}
      <span aria-hidden className="btn l" style={{ left: -2, top: "15%", height: "4%" }} />
      <span aria-hidden className="btn l" style={{ left: -2, top: "22%", height: "7%" }} />
      <span aria-hidden className="btn l" style={{ left: -2, top: "31%", height: "7%" }} />
      <span aria-hidden className="btn r" style={{ right: -2, top: "24%", height: "11%" }} />
      <div className="relative overflow-hidden" style={{ padding: BEZEL, borderRadius: r + BEZEL, background: "#3a3c41" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: r }}>
          {children}
          {island && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
              style={{ top: "1.3%", width: "31%", height: "4.3%" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** `device`: draw a phone body around screenshots that already contain their own status bar and rounded screen
 *  (black metal band, black bezel, side buttons, drop shadow), like the AI Trip Planning mockups. */
export function PhoneFlow({
  phones,
  width = 220,
  device = false,
  island = false,
}: {
  phones: Phone[];
  width?: number;
  device?: boolean;
  island?: boolean;
}) {
  const { ref, shown } = useInViewOnce<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="-mx-gutter overflow-x-auto px-gutter pb-4 pt-3 [scrollbar-width:thin] md:-mx-gutter-lg md:px-gutter-lg">
      <ol className="flex w-max snap-x snap-mandatory gap-6 md:gap-8">
        {phones.map((p, i) => (
          <li
            key={p.src}
            className="shrink-0 snap-start"
            style={{
              width,
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(28px)",
              transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`,
            }}
          >
            {device ? (
              <PhoneDevice width={width} island={island}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} width={1170} height={2529} loading="lazy" decoding="async" className="block h-auto w-full" />
              </PhoneDevice>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.src}
                alt={p.alt}
                width={780}
                height={1695}
                loading="lazy"
                decoding="async"
                className="phone-frame block h-auto w-full"
                style={{ aspectRatio: PHONE_RATIO }}
              />
            )}
            <p className="font-gilroy mt-4 flex gap-2 text-[14px] leading-[1.45] text-neutral-200">
              <span className="font-blinker shrink-0 font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.step}
            </p>
            {p.note && <p className="font-gilroy mt-1.5 pl-7 text-[13px] leading-[1.5] text-neutral-500">{p.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** CompareSlider's frame: the black phone body, or the page-colour border (.phone-frame) used before. */
function Frame({ device, island, width, children }: { device: boolean; island: boolean; width: number; children: ReactNode }) {
  return device ? (
    <PhoneDevice width={width} island={island}>
      {children}
    </PhoneDevice>
  ) : (
    <div className="phone-frame">{children}</div>
  );
}

export function CompareSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  width = 340,
  device = false,
  island = false,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeLabel?: string;
  afterLabel?: string;
  width?: number;
  device?: boolean;
  island?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const { ref, shown } = useInViewOnce<HTMLDivElement>(0.4);

  // A one-time sweep when it first comes into view, so the comparison is obvious without interaction.
  useEffect(() => {
    if (!shown || prefersReducedMotion()) return;
    const seq = [15, 85, 50];
    const timers = seq.map((v, i) => window.setTimeout(() => !dragging.current && setPos(v), 300 + i * 700));
    return () => timers.forEach(clearTimeout);
  }, [shown]);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const down = (e: RPointerEvent) => {
    dragging.current = true;
    setIsDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    move(e.clientX);
  };

  return (
    <div ref={ref} className="mx-auto w-full" style={{ maxWidth: width }}>
      <div className="mb-3 flex justify-between">
        {[beforeLabel, afterLabel].map((l, i) => (
          <span
            key={l}
            className={`font-gilroy rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${i ? "text-white" : "border border-white/15 text-neutral-300"}`}
            style={i ? { background: "color-mix(in srgb, var(--accent-green) 70%, transparent)" } : undefined}
          >
            {l}
          </span>
        ))}
      </div>
      <Frame device={device} island={island} width={width}>
        <div
          ref={box}
          className="relative w-full cursor-ew-resize touch-pan-y select-none"
          style={{ aspectRatio: PHONE_RATIO }}
          onPointerDown={down}
          onPointerMove={(e) => dragging.current && move(e.clientX)}
          onPointerUp={() => {
            dragging.current = false;
            setIsDragging(false);
          }}
          onPointerCancel={() => {
            dragging.current = false;
            setIsDragging(false);
          }}
          role="slider"
          aria-label={`${beforeLabel} / ${afterLabel} comparison`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          data-cursor-hover
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={after.src} alt={after.alt} draggable={false} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, transition: isDragging ? "none" : "clip-path 0.6s cubic-bezier(0.65,0,0.35,1)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={before.src} alt={before.alt} draggable={false} className="absolute inset-0 h-full w-full" />
          </div>
          <div
            aria-hidden
            className="absolute inset-y-[3%] w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
            style={{ left: `${pos}%`, transition: isDragging ? "none" : "left 0.6s cubic-bezier(0.65,0,0.35,1)" }}
          >
            <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[13px] text-black shadow-lg">
              ⟷
            </span>
          </div>
        </div>
      </Frame>
      <p className="font-gilroy mt-5 text-center text-[12px] uppercase tracking-[0.2em] text-neutral-500">Drag to compare</p>
    </div>
  );
}

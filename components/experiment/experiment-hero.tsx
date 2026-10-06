"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import heroStars from "@/lib/experiment-hero-stars.json";

// Experiment greeting: the photo full-bleed on the left (the person in black and white, the star doodles in their
// own colour), the heading centred in the column on the right. The photo always fills the section's full height
// and sits flush left; where the window is too narrow for all of it, it slides left and loses only part of the
// left-hand stars — the person and the right-hand stars stay whole.
//
// Hovering a star lights it with a small, soft yellow glow, straight away; it stays lit while the pointer is on it
// and lingers for LINGER_MS after the pointer leaves, then fades. On touch screens a tap lights it the same way.
//
// The photo and the star layers come from tools/experiment_hero_photo.py. Each star group is its own transparent
// layer, drawn exactly over the same pixels in the base photo, so a glow can wrap just that star. The pointer is
// tested against each star's filled hit mask (hit-NN.png), so anywhere inside a star's outline counts, not only
// the thin line; smaller stars win over the big ones whose boxes they sit in.

const { width: W, height: H, stars: STARS } = heroStars;

/** Slack (in mask pixels) around a star's hit area. */
const HIT_RADIUS = 4;

// Same three functions on and off, so the filter animates instead of jumping. Small radius, soft yellow.
const GLOW = "drop-shadow(0 0 3px rgb(255 222 110 / 0.9)) drop-shadow(0 0 9px rgb(255 214 90 / 0.45)) brightness(1.15)";
const GLOW_OFF = "drop-shadow(0 0 0 rgb(255 222 110 / 0)) drop-shadow(0 0 0 rgb(255 214 90 / 0)) brightness(1)";

/** How long a star keeps glowing after the pointer leaves it. */
const LINGER_MS = 1000;

type Mask = { data: Uint8ClampedArray; w: number; h: number };

export function ExperimentHero({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const masks = useRef<(Mask | null)[]>([]);
  const [lit, setLit] = useState<Set<number>>(() => new Set());
  const [overStar, setOverStar] = useState(false);
  const hovered = useRef(-1);
  const timers = useRef(new Map<number, number>());

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => clearTimeout(t));
  }, []);

  // Read each star's hit mask once, for pixel-accurate hit testing.
  useEffect(() => {
    let alive = true;
    STARS.forEach((s, i) => {
      const img = new window.Image();
      img.onload = () => {
        if (!alive) return;
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        masks.current[i] = { data: ctx.getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height };
      };
      img.src = s.hit;
    });
    return () => {
      alive = false;
    };
  }, []);

  /** The star under the pointer, smallest first so a sparkle wins over the big star around it. */
  const starAt = useCallback((e: MouseEvent) => {
    const el = frame.current;
    if (!el) return -1;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const py = ((e.clientY - r.top) / r.height) * H;
    const order = STARS.map((s, i) => i).sort((a, b) => STARS[a].width * STARS[a].height - STARS[b].width * STARS[b].height);
    for (const i of order) {
      const s = STARS[i];
      const m = masks.current[i];
      const x0 = (s.left / 100) * W;
      const y0 = (s.top / 100) * H;
      if (!m || px < x0 - HIT_RADIUS || py < y0 - HIT_RADIUS) continue;
      const lx = Math.round(((px - x0) / ((s.width / 100) * W)) * m.w);
      const ly = Math.round(((py - y0) / ((s.height / 100) * H)) * m.h);
      if (lx < -HIT_RADIUS || ly < -HIT_RADIUS || lx > m.w + HIT_RADIUS || ly > m.h + HIT_RADIUS) continue;
      for (let dy = -HIT_RADIUS; dy <= HIT_RADIUS; dy += 2) {
        for (let dx = -HIT_RADIUS; dx <= HIT_RADIUS; dx += 2) {
          const x = lx + dx;
          const y = ly + dy;
          if (x < 0 || y < 0 || x >= m.w || y >= m.h || dx * dx + dy * dy > HIT_RADIUS * HIT_RADIUS) continue;
          if (m.data[(y * m.w + x) * 4] > 127) return i;
        }
      }
    }
    return -1;
  }, []);

  const lightOn = (i: number) => {
    clearTimeout(timers.current.get(i));
    timers.current.delete(i);
    setLit((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  };

  /** Start the linger; the glow fades once it runs out (unless the pointer comes back first). */
  const lightOffLater = (i: number) => {
    clearTimeout(timers.current.get(i));
    timers.current.set(
      i,
      window.setTimeout(() => {
        timers.current.delete(i);
        setLit((prev) => {
          const next = new Set(prev);
          next.delete(i);
          return next;
        });
      }, LINGER_MS),
    );
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const i = starAt(e);
    setOverStar(i >= 0);
    if (i === hovered.current) return;
    if (hovered.current >= 0) lightOffLater(hovered.current);
    if (i >= 0) lightOn(i);
    hovered.current = i;
  };

  const onPointerLeave = () => {
    setOverStar(false);
    if (hovered.current >= 0) lightOffLater(hovered.current);
    hovered.current = -1;
  };

  // Touch has no hover: a tap lights the star, then it lingers and fades like a hover would.
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "touch") return;
    const i = starAt(e);
    if (i < 0) return;
    lightOn(i);
    lightOffLater(i);
  };

  const photo = (
    <div
      ref={frame}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      data-cursor-hover={overStar ? "" : undefined}
      className={cn(
        "absolute inset-y-0 left-0 aspect-[4/3] h-full select-none",
        // Slide left only as far as needed (at most 19% of the photo, the left-hand stars), so the person and the
        // right-hand stars always stay in view. Stacked: the photo's right edge sits near the screen's right edge.
        // Side by side: the stars stop where the text column starts.
        "[transform:translateX(clamp(-19%,calc(100vw-97%),0%))]",
        "side:[transform:translateX(clamp(-19%,calc(100vw-var(--text-w)-95%),0%))]",
      )}
    >
      <Image
        src="/images/experiment/hero/base.webp"
        alt="Sihan at an event entrance, in black and white, with yellow and mint star doodles drawn around her"
        fill
        preload
        sizes="(min-aspect-ratio: 3/2) 135svh, 100vw"
        className="object-cover"
        draggable={false}
      />
      {STARS.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- exact overlay of a small transparent layer
        <img
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.width}%`,
            height: `${s.height}%`,
            filter: lit.has(i) ? GLOW : GLOW_OFF,
            // Lights up fast; fades out gently once the linger is over.
            transition: lit.has(i) ? "filter 180ms ease-out" : "filter 900ms ease-in-out",
          }}
        />
      ))}
      {/* Soft edge where the photo meets the page */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-r from-transparent to-black" />
    </div>
  );

  return (
    // Exactly one screen tall. Side by side when the window is wide enough for the photo at full height plus the
    // text column; otherwise the photo stacks above the text. Either way the photo fills its area top to bottom.
    <section
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden side:block side:h-[100svh] side:min-h-[560px]"
      style={{ "--text-w": "clamp(420px, 36vw, 640px)" } as CSSProperties}
    >
      {/* Stacked: 88vw tall makes the 4:3 photo about 1.18× the screen width, so it spans edge to edge and only the
          left-hand stars are trimmed. */}
      <div className="relative h-[88vw] w-full shrink-0 overflow-hidden side:absolute side:inset-0 side:h-full">
        {photo}
      </div>
      <div className="flex min-h-[300px] flex-1 items-center px-6 pb-16 pt-8 side:absolute side:pt-0 side:inset-y-0 side:right-0 side:w-[var(--text-w)] side:px-9 side:pb-0">
        <div>{children}</div>
      </div>
      <span className="font-gilroy absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[12px] uppercase tracking-[0.35em] text-white/30 side:left-[calc(100%-var(--text-w)/2)]">
        Scroll
      </span>
    </section>
  );
}

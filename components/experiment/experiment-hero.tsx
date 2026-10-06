"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import heroStars from "@/lib/experiment-hero-stars.json";

// Experiment greeting: the photo on the left (the person in high-contrast black and white, the star doodles in
// their own colour), the heading on the right. Clicking a star gives it a small, soft yellow glow; clicking it
// again turns the glow off.
//
// The photo and the star layers come from tools/experiment_hero_photo.py. Each star group is its own transparent
// layer, drawn exactly over the same pixels in the base photo, so a glow can wrap just that star. Clicks are
// tested against a layer's pixels (not its box), because small sparkles sit inside the big stars' boxes.

const { width: W, height: H, stars: STARS } = heroStars;

/** How close (in photo pixels) a click has to land to a star's stroke. */
const HIT_RADIUS = 14;

const GLOW = "drop-shadow(0 0 2px rgb(255 214 90 / 0.55)) drop-shadow(0 0 7px rgb(255 214 90 / 0.28))";

type Mask = { data: Uint8ClampedArray; w: number; h: number };

export function ExperimentHero({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const masks = useRef<(Mask | null)[]>([]);
  const [lit, setLit] = useState<Set<number>>(() => new Set());
  const [overStar, setOverStar] = useState(false);

  // Read each layer's alpha once, for pixel-accurate hit testing.
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
      img.src = s.src;
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
          if (m.data[(y * m.w + x) * 4 + 3] > 60) return i;
        }
      }
    }
    return -1;
  }, []);

  const onClick = (e: MouseEvent) => {
    const i = starAt(e);
    if (i < 0) return;
    setLit((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="relative flex min-h-[100svh] w-full items-center px-6 pb-24 pt-28 md:px-10 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1274px] items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14 lg:gap-20">
        <div
          ref={frame}
          onClick={onClick}
          onMouseMove={(e) => setOverStar(starAt(e) >= 0)}
          onMouseLeave={() => setOverStar(false)}
          data-cursor-hover={overStar ? "" : undefined}
          className={cn(
            "relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-white/10 bg-black select-none",
            overStar && "cursor-pointer",
          )}
        >
          <Image
            src="/images/experiment/hero/base.webp"
            alt="Sihan at an event entrance, in black and white, with yellow and mint star doodles drawn around her"
            fill
            preload
            sizes="(max-width: 768px) 100vw, 680px"
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
                filter: lit.has(i) ? GLOW : "drop-shadow(0 0 0 rgb(255 214 90 / 0))",
                transition: "filter 450ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>
        <div>{children}</div>
      </div>
      <span className="font-gilroy absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[12px] uppercase tracking-[0.35em] text-white/30">
        Scroll
      </span>
    </section>
  );
}

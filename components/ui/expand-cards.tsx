"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

// Click-to-expand row, after the "squeeze" carousel from 21st.dev: one card holds the room and the rest
// narrow to strips; clicking a strip opens it on the same easeOutExpo curve. Each card is a GlowCard, so
// the cursor-following spotlight works as before. Stacks into a column on small screens.
//
// Optional background video: drawn at the width of an open card (its share of the row) and centred, so every
// card shows a window onto the same-sized frame. A strip shows a slice; opening the card reveals more of it, with no rescaling
// mid-animation. Dimmed, under a dark gradient, so the text stays readable.

export type ExpandCard = {
  title: string;
  body: string;
  glow?: "blue" | "purple" | "green" | "red" | "orange";
  /** Looping, muted background video. */
  video?: string;
  /** Still frame shown until the video can play. */
  poster?: string;
};

/** How visible the background video is. */
const VIDEO_OPACITY = 0.45;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = 900;

/** Flex shares: the open card takes the room; a hovered strip widens a little, like the squeeze carousel. */
const OPEN = 6;
const CLOSED = 1;
// The video width class uses OPEN / (OPEN + 2 × CLOSED) = 0.75 of the row (minus the two gaps); keep in step.
const HOVERED = 1.5;

export function ExpandCards({ items, className }: { items: ExpandCard[]; className?: string }) {
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState(-1);

  return (
    <div
      className={cn("flex h-[560px] flex-col gap-4 [container-type:inline-size] md:h-[380px] md:flex-row", className)}
      onMouseLeave={() => setHover(-1)}
    >
      {items.map((item, i) => {
        const on = i === open;
        const grow = on ? OPEN : hover === i ? HOVERED : CLOSED;
        const index = String(i + 1).padStart(2, "0");

        return (
          <div
            key={item.title}
            className="relative min-h-[64px] min-w-0 md:min-h-0 md:min-w-[76px]"
            style={{ flex: `${grow} 1 0%`, transition: `flex-grow ${MS}ms ${EASE}` }}
            onMouseEnter={() => setHover(i)}
          >
            <GlowCard
              customSize
              glowColor={item.glow ?? "blue"}
              radius={24}
              className="!block h-full w-full !rounded-[24px] !p-0"
            >
              {item.video && (
                // Clipped here rather than on the card, so the card's border glow isn't cut off.
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[21px]">
                  <video
                    src={item.video}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute left-1/2 top-1/2 h-[420px] w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover md:h-full md:w-[calc((100cqw-2rem)*0.75)]"
                    style={{ opacity: VIDEO_OPACITY }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.85)_0%,rgb(0_0_0/0.45)_55%,rgb(0_0_0/0.25)_100%)]" />
                  {/* The card's inner spotlight, repainted above the video (same variables as GlowCard) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) 100% 70% / 0.14), transparent)",
                    }}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-expanded={on}
                aria-label={on ? item.title : `Open ${item.title}`}
                data-cursor-hover
                className={cn(
                  "absolute inset-0 z-10 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                  "rounded-[24px]",
                  on ? "cursor-default" : "cursor-pointer",
                )}
              >
                {/* Closed: the step number and a sideways title */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-between px-6 md:flex-col md:items-center md:px-0 md:py-8"
                  style={{
                    opacity: on ? 0 : 1,
                    transition: `opacity ${on ? 200 : 500}ms ${EASE} ${on ? 0 : 250}ms`,
                  }}
                >
                  <span className="font-blinker text-[16px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                    {index}
                  </span>
                  <span className="font-blinker text-[20px] font-medium tracking-[0.02em] text-white/75 md:rotate-180 md:[writing-mode:vertical-rl]">
                    {item.title}
                  </span>
                </span>

                {/* Open: title and description, at a fixed width so they don't reflow while the card grows */}
                <span
                  className="absolute inset-0 flex flex-col justify-end p-8"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity ${on ? 600 : 150}ms ${EASE} ${on ? 300 : 0}ms, transform ${on ? 700 : 150}ms ${EASE} ${on ? 300 : 0}ms`,
                  }}
                >
                  <span className="block w-[min(460px,calc(100vw-112px))]">
                    <span className="font-blinker block text-[16px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                      {index}
                    </span>
                    <span className="font-blinker mt-3 block text-[clamp(30px,3.4vw,46px)] font-medium leading-tight text-white">
                      {item.title}
                    </span>
                    <span className="font-sulphur mt-3 block text-[17px] leading-relaxed text-white/80 md:text-[19px]">
                      {item.body}
                    </span>
                  </span>
                </span>
              </button>
            </GlowCard>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

// Click-to-expand row, after the "squeeze" carousel from 21st.dev: one card holds the room and the rest
// narrow to strips; clicking a strip opens it on the same easeOutExpo curve. Each card is a GlowCard, so
// the cursor-following spotlight works as before. Stacks into a column on small screens.

export type ExpandCard = {
  title: string;
  body: string;
  glow?: "blue" | "purple" | "green" | "red" | "orange";
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = 900;

/** Flex shares: the open card takes the room; a hovered strip widens a little, like the squeeze carousel. */
const OPEN = 6;
const CLOSED = 1;
const HOVERED = 1.5;

export function ExpandCards({ items, className }: { items: ExpandCard[]; className?: string }) {
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState(-1);

  return (
    <div
      className={cn("flex h-[560px] flex-col gap-4 md:h-[380px] md:flex-row", className)}
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
              className="!block h-full w-full overflow-hidden !rounded-[24px] !p-0"
            >
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
                  <span className="font-blinker text-[20px] font-medium tracking-[0.02em] text-white/60 md:rotate-180 md:[writing-mode:vertical-rl]">
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
                    <span className="font-sulphur mt-3 block text-[17px] leading-relaxed text-white/65 md:text-[19px]">
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

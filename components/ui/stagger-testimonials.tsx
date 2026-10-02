"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StaggerTestimonials (adapted from 21st.dev). A row of cut-corner cards fanned around a raised centre card; click a
 * card or use the arrows to bring it to the centre.
 *
 * Changes from the original: quotes are passed in (`items`) instead of hard-coded; research participants are
 * anonymous, so a quote mark replaces the avatar photo; short lists are repeated (the row is a loop) so there are
 * always enough cards to fill both sides; and colours come from `--st-*` variables in globals.css instead of shadcn
 * tokens, with a light variant for the case-study light theme.
 */
export type Testimonial = { quote: ReactNode; by: string };

const SQRT_5000 = Math.sqrt(5000);
const MIN_CARDS = 5;

type Card = Testimonial & { tempId: number; n: number };

function TestimonialCard({
  position,
  card,
  total,
  onMove,
  cardSize,
}: {
  position: number;
  card: Card;
  total: number;
  onMove: (steps: number) => void;
  cardSize: number;
}) {
  const isCenter = position === 0;
  return (
    <div
      onClick={() => onMove(position)}
      data-cursor-hover
      aria-hidden={!isCenter}
      className={cn(
        "stagger-card absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out sm:p-8",
        isCenter ? "is-center z-10" : "z-0",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
      <span
        aria-hidden
        className="stagger-cut absolute block origin-top-right rotate-45"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      <span className="stagger-icon mb-5 grid h-11 w-11 place-items-center">
        <Quote className="h-5 w-5" strokeWidth={1.8} aria-hidden />
      </span>
      <blockquote className="font-sulphur text-[17px] leading-[1.4] sm:text-[19px]">{card.quote}</blockquote>
      <p className="stagger-by font-gilroy absolute bottom-6 left-6 right-6 flex items-baseline justify-between gap-3 text-[13px] sm:bottom-8 sm:left-8 sm:right-8">
        <span className="italic">— {card.by}</span>
        <span className="tabular-nums">
          {String(card.n + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </p>
    </div>
  );
}

export function StaggerTestimonials({ items, className }: { items: Testimonial[]; className?: string }) {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState<Card[]>(() => {
    const out: Card[] = [];
    // Repeat short lists so both sides of the centre card are filled; the row loops anyway.
    for (let r = 0; out.length < Math.max(items.length, MIN_CARDS); r++)
      items.forEach((t, n) => out.push({ ...t, n, tempId: r * items.length + n }));
    // Start with the first quote in the centre.
    const shift = Math.floor(out.length / 2);
    return [...out.slice(out.length - shift), ...out.slice(0, out.length - shift)];
  });

  // Fresh keys for cards that wrap around, so they animate across instead of jumping.
  const nextId = useRef(1000);
  const handleMove = (steps: number) => {
    const next = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push({ ...item, tempId: nextId.current++ });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift({ ...item, tempId: nextId.current++ });
      }
    }
    setList(next);
  };

  useEffect(() => {
    const update = () => setCardSize(window.matchMedia("(min-width: 640px)").matches ? 365 : 290);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className={cn("stagger-t relative w-full overflow-hidden", className)} style={{ height: cardSize + 235 }}>
      {list.map((card, index) => {
        const position = list.length % 2 ? index - (list.length - 1) / 2 : index - list.length / 2;
        return (
          <TestimonialCard key={card.tempId} card={card} total={items.length} onMove={handleMove} position={position} cardSize={cardSize} />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {[
          { step: -1, label: "Previous quote", Icon: ChevronLeft },
          { step: 1, label: "Next quote", Icon: ChevronRight },
        ].map(({ step, label, Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleMove(step)}
            aria-label={label}
            data-cursor-hover
            className="stagger-btn flex h-12 w-12 items-center justify-center border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] sm:h-14 sm:w-14"
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * MarkerHighlight — a highlighter-pen sweep behind a key phrase.
 *
 * Ported from a Remotion composition (which needs `useCurrentFrame()` and only renders inside a
 * fixed-size <Player>) to an inline, scroll-triggered element. Timing matches the original:
 * spring { damping: 14 } starting 15 frames (0.5s at 30fps) in, scaling from the left; the text
 * switches to `highlightedTextColor` as the marker passes 50–80% of its sweep.
 */
export interface MarkerHighlightProps {
  children: ReactNode;
  markerColor?: string;
  highlightedTextColor?: string;
  /** 1 = original speed; 2 = twice as fast. */
  speed?: number;
  className?: string;
}

export function MarkerHighlight({
  children,
  markerColor = "#facc15",
  highlightedTextColor = "#171717",
  speed = 1,
  className,
}: MarkerHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const on = useInView(ref, { once: false, margin: "-10%" });
  const delay = 0.5 / speed;

  return (
    <span ref={ref} className={cn("relative inline", className)}>
      <motion.span
        aria-hidden
        className="absolute -inset-x-[0.1em] inset-y-[0.04em] -z-0 origin-left"
        style={{ background: markerColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: on ? 1 : 0 }}
        transition={
          on
            ? { type: "spring", damping: 14, stiffness: 100 * speed * speed, mass: 1, delay }
            : { duration: 0.2 }
        }
      />
      <span
        className="relative"
        style={{
          color: on ? highlightedTextColor : undefined,
          transition: on ? `color 0.15s linear ${delay + 0.3 / speed}s` : "color 0.15s linear",
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default MarkerHighlight;

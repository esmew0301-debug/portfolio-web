"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * MarkerHighlight — a highlighter-pen sweep behind a key phrase.
 *
 * Ported from a Remotion composition to an inline, scroll-triggered element (same spring: damping 14,
 * 0.5s delay; text flips to `highlightedTextColor` as the marker passes). The yellow is the inline
 * element's own background, so it hugs the words and wraps line by line — no rectangle around the
 * whole paragraph box. With the default `box-decoration-break: slice`, a 0 → 100% background-size
 * sweep runs through the lines in reading order, like a real marker.
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
    <motion.span
      ref={ref}
      className={cn("rounded-[2px] py-[0.04em]", className)}
      style={{
        backgroundImage: `linear-gradient(${markerColor}, ${markerColor})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0",
        color: on ? highlightedTextColor : undefined,
        transition: on ? `color 0.15s linear ${delay + 0.3 / speed}s` : "color 0.15s linear",
      }}
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: on ? "100% 100%" : "0% 100%" }}
      transition={on ? { type: "spring", damping: 14, stiffness: 100 * speed * speed, mass: 1, delay } : { duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
}

export default MarkerHighlight;

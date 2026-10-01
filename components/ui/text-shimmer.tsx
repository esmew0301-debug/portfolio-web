"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "strong";
  className?: string;
  duration?: number;
  spread?: number;
}

/**
 * TextShimmer (from 21st.dev). A light band sweeps across the text on a loop.
 * Colours come from --base-color / --base-gradient-color; the original swapped them with Tailwind
 * `dark:`, which this site doesn't use, so pages set them via a class (see `.shimmer-hmi` in globals.css).
 */
export function TextShimmer({
  children,
  as = "p",
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  const dynamicSpread = useMemo(
    () => children.length * spread,
    [children, spread],
  );

  return React.createElement(
    motion[as],
    {
      className: cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className,
      ),
      initial: { backgroundPosition: "100% center" },
      animate: { backgroundPosition: "0% center" },
      transition: { repeat: Infinity, duration, ease: "linear" },
      style: {
        "--spread": `${dynamicSpread}px`,
        backgroundImage:
          "var(--bg), linear-gradient(var(--base-color), var(--base-color))",
      } as React.CSSProperties,
    },
    children,
  );
}

export default TextShimmer;

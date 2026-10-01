"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, type Variants } from "framer-motion";
import React, { useRef } from "react";

type HighlightDirection = "left" | "right" | "top" | "bottom";

interface TactileHighlightProps {
  children: React.ReactNode;
  className?: string;
  direction?: HighlightDirection;
  delay?: number;
  trigger?: "auto" | "hover" | "inView";
}

/**
 * TactileHighlight — an animated block highlight behind a key phrase (adapted from 21st.dev).
 * The original inverted text with `mix-blend-difference` + Tailwind `dark:`; this site switches theme
 * with `html[data-case-theme]` and its reveal wrappers isolate blending, so the block and text colours
 * are set explicitly per theme in globals.css (`.tactile-*`). The spring animation is unchanged.
 */
export const TactileHighlight = ({
  children,
  className,
  direction = "left",
  delay = 0.1,
  trigger = "inView",
}: TactileHighlightProps) => {
  const ref = useRef(null);
  // once: false lets the highlight replay when scrolling back into view
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const isAnimated = trigger === "auto" || (trigger === "inView" && isInView);

  const variants: Variants = {
    hidden: {
      scaleX: direction === "left" || direction === "right" ? 0 : 1,
      scaleY: direction === "top" || direction === "bottom" ? 0 : 1,
      originX: direction === "left" ? 0 : direction === "right" ? 1 : 0.5,
      originY: direction === "top" ? 0 : direction === "bottom" ? 1 : 0.5,
      borderRadius: "12px",
    },
    visible: {
      scaleX: 1,
      scaleY: 1,
      borderRadius: "4px",
      transition: { type: "spring", damping: 22, stiffness: 130, mass: 0.8, delay },
    },
    hover: {
      scale: 1.05,
      rotate: direction === "left" ? -1.5 : direction === "right" ? 1.5 : 0,
      borderRadius: "8px",
      transition: { type: "spring", damping: 15, stiffness: 400 },
    },
  };

  return (
    <span
      ref={ref}
      data-on={isAnimated ? "true" : "false"}
      className={cn("tactile relative inline-block cursor-default", className)}
      style={{ padding: "0 0.15em", margin: "0 -0.15em" }}
    >
      <motion.span
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
        whileHover={trigger === "hover" ? "visible" : "hover"}
        variants={variants}
        className="tactile-block absolute inset-0 z-0 shadow-xl"
      />
      <span className="tactile-text relative z-10">{children}</span>
    </span>
  );
};

export default TactileHighlight;

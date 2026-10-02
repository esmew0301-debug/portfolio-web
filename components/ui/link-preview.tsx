"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * LinkPreview (adapted from Aceternity UI). Hovering a keyword pops a small photo up just above it with
 * the original spring fade + scale and the same subtle horizontal drift toward the cursor.
 *
 * Changes from the original: static images only (no microlink screenshot service, so no `qss`), and the
 * Radix HoverCard is replaced with plain pointer handling so it also works by tap on touch screens
 * (tap to show, tap again or anywhere else to hide). The word is a button, not a link.
 */
type LinkPreviewProps = {
  children: React.ReactNode;
  imageSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export function LinkPreview({ children, imageSrc, alt, className, width = 200, height = 150 }: LinkPreviewProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });
  const closeTimer = useRef<number | null>(null);

  const show = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 100);
  };

  // Touch: close when tapping anywhere else.
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const onMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) / 2);
  };

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onPointerEnter={(e) => e.pointerType === "mouse" && show()}
        onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
        onPointerMove={onMove}
        onClick={(e) => {
          // Mouse users get hover; this toggle is for touch and keyboard.
          if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return;
          setOpen((o) => !o);
        }}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && show()}
        onBlur={hide}
        aria-expanded={open}
        data-cursor-hover
        className={cn("cursor-pointer", className)}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{ x: translateX, width: width + 10, left: `calc(50% - ${(width + 10) / 2}px)` }}
            className="pointer-events-none absolute bottom-full z-50 mb-2.5 block rounded-[14px]"
            role="img"
            aria-label={alt}
          >
            <span
              className="block rounded-[14px] border border-white/15 bg-[#111] p-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
            >
              <Image src={imageSrc} alt={alt} width={width} height={height} className="block rounded-[10px] object-cover" style={{ width, height }} />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default LinkPreview;

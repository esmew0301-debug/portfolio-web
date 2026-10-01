"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/utils";

// Fades and lifts its content in the first time it scrolls into view.
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const tall = e.intersectionRect.height > 0.25 * window.innerHeight;
          if (e.isIntersecting && (e.intersectionRatio >= 0.15 || tall)) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: [0, 0.02, 0.05, 0.1, 0.15], rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ease = "cubic-bezier(0.22,1,0.36,1)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ${ease} ${delay}s, transform 0.7s ${ease} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

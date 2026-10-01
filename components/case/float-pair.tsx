"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type Item = { src: string; alt: string; w: number; h: number };

// Two cut-out product shots flanking a statement. They slide in from their own side when the
// band scrolls into view; clicking one plays a short 3D tilt-and-settle wiggle.
export function FloatPair({ left, right, children }: { left: Item; right: Item; children: ReactNode }) {
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
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-10" style={{ perspective: "900px" }}>
      <Bottle item={left} side="left" shown={shown} />
      <div
        className="max-w-[30ch] text-center transition-all duration-700 ease-out"
        style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(16px)", transitionDelay: "0.25s" }}
      >
        {children}
      </div>
      <Bottle item={right} side="right" shown={shown} />
    </div>
  );
}

function Bottle({ item, side, shown }: { item: Item; side: "left" | "right"; shown: boolean }) {
  const [wiggle, setWiggle] = useState(0);
  const from = side === "left" ? "-60px" : "60px";
  return (
    <button
      type="button"
      aria-label={`${item.alt} — tap to wiggle`}
      data-cursor-hover
      onClick={() => setWiggle((n) => n + 1)}
      className={`flex justify-center ${side === "left" ? "md:justify-end" : "md:justify-start"}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateX(${from}) rotate(${side === "left" ? -8 : 8}deg)`,
        transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={wiggle}
        src={item.src}
        alt={item.alt}
        width={item.w}
        height={item.h}
        draggable={false}
        className="block h-[150px] w-auto max-w-none select-none sm:h-[220px] md:h-[300px]"
        style={{
          animation: wiggle ? "bottle-wiggle 0.9s cubic-bezier(0.36,0.07,0.19,0.97)" : undefined,
          transformOrigin: "50% 90%",
        }}
      />
    </button>
  );
}

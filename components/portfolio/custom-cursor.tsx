"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    const dot = ref.current!;
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const toX = gsap.quickTo(dot, "x", { duration: 0.32, ease: "power3" });
    const toY = gsap.quickTo(dot, "y", { duration: 0.32, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      toX(e.clientX);
      toY(e.clientY);
      const target = e.target as Element | null;
      const isView = !!target?.closest?.('[data-cursor="view"]');
      const isHover =
        !isView && !!target?.closest?.("a, button, [data-cursor-hover]");
      dot.classList.toggle("is-view", isView);
      dot.classList.toggle("is-hover", isHover);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="custom-cursor-dot" aria-hidden>
      <span className="cursor-label">
        View
        <br />
        Project
      </span>
    </div>
  );
}

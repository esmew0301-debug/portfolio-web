"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

// Lenis smooth scrolling driven by the GSAP ticker; held stopped until the intro finishes.
export function SmoothScroll({ active }: { active: boolean }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: !prefersReducedMotion(),
      wheelMultiplier: 1,
      anchors: true,
    });
    lenisRef.current = lenis;
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    lenisRef.current?.start();
    ScrollTrigger.refresh();
  }, [active]);

  return null;
}

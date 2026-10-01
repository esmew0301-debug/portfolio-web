"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { trailImages } from "@/lib/content";
import { trailState } from "@/lib/trail-state";

const POOL = 22;

// Drops an image at the cursor every 130px of travel; each pops in and fades out.
export function CursorTrail({ zIndex = 20, active = true }: { zIndex?: number; active?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !active || !window.matchMedia("(pointer: fine)").matches) return;
    trailImages.forEach((src) => {
      new Image().src = src;
    });
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>(".trail-img"));
    const last = { x: 0, y: 0 };
    let started = false;
    let count = 0;
    let lastIdx = -1;

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (trailState.paused) {
        last.x = x;
        last.y = y;
        return;
      }
      if (!started) {
        last.x = x;
        last.y = y;
        started = true;
        return;
      }
      if (Math.hypot(x - last.x, y - last.y) < 130) return;
      last.x = x;
      last.y = y;
      const img = imgs[count % POOL];
      count++;
      let idx = Math.floor(Math.random() * trailImages.length);
      if (idx === lastIdx) idx = (idx + 1) % trailImages.length;
      lastIdx = idx;
      img.src = trailImages[idx];
      gsap.killTweensOf(img);
      gsap.set(img, {
        x: x - img.offsetWidth / 2,
        y: y - img.offsetHeight / 2,
        opacity: 0,
        scale: 0.92,
        rotate: 0,
        zIndex: count,
      });
      gsap
        .timeline()
        .to(img, { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" })
        .to(img, { opacity: 0, duration: 0.2, ease: "power2.in" }, "+=0.1");
    };

    const host = root.parentElement ?? root;
    host.addEventListener("mousemove", onMove);
    return () => host.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <div ref={ref} style={{ zIndex }} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: POOL }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          alt=""
          aria-hidden
          className="trail-img absolute left-0 top-0 h-[170px] w-[245px] object-cover opacity-0 will-change-transform"
        />
      ))}
    </div>
  );
}

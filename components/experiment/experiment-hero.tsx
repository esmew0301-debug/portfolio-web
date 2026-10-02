"use client";

import type { ReactNode } from "react";
import { FloatingIconsHero, type FloatingIconsHeroProps } from "@/components/ui/floating-icons-hero-section";

// Logo tiles around the greeting (all 192×192 with the logo in the same 108px box, so they match in size and
// sharpness). They keep to the edges so the heading stays clear; only the four corner tiles show on phones, and the
// inner ring only appears on screens tall enough to leave room around the text.
const T = "/images/experiment/icons";
const ICONS: FloatingIconsHeroProps["icons"] = [
  { id: 1, src: `${T}/figma.png`, alt: "Figma", className: "top-[14%] left-[9%]" },
  { id: 2, src: `${T}/github.png`, alt: "GitHub", className: "top-[14%] left-[33%] hidden md:block" },
  { id: 3, src: `${T}/photoshop.png`, alt: "Photoshop", className: "top-[12%] right-[30%] hidden md:block" },
  { id: 4, src: `${T}/youtube.png`, alt: "YouTube", className: "top-[22%] right-[9%]" },
  { id: 5, src: `${T}/canva.png`, alt: "Canva", className: "top-[31%] right-[21%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 6, src: `${T}/google.png`, alt: "Google", className: "top-[60%] left-[5%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 7, src: `${T}/instagram.png`, alt: "Instagram", className: "top-[63%] right-[6%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 8, src: `${T}/claude.png`, alt: "Claude", className: "bottom-[12%] left-[13%]" },
  { id: 9, src: `${T}/microsoft.png`, alt: "Microsoft", className: "bottom-[9%] left-[36%] hidden md:block" },
  { id: 10, src: `${T}/tiktok.png`, alt: "TikTok", className: "bottom-[14%] right-[30%] hidden md:block" },
  { id: 11, src: `${T}/illustrator.png`, alt: "Illustrator", className: "bottom-[9%] right-[12%]" },
];

/** Full-height Experiment greeting: content centred in the viewport, floating tiles around it. */
export function ExperimentHero({ children }: { children: ReactNode }) {
  return (
    <FloatingIconsHero
      icons={ICONS}
      className="min-h-[100svh] px-6 md:px-10"
      overlay={
        <span className="font-gilroy absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[12px] uppercase tracking-[0.35em] text-white/30">
          Scroll
        </span>
      }
    >
      {children}
    </FloatingIconsHero>
  );
}

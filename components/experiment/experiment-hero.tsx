"use client";

import type { ReactNode } from "react";
import { FloatingIconsHero, type FloatingIconsHeroProps } from "@/components/ui/floating-icons-hero-section";

// Logo tiles around the greeting (all 192×192 with the logo in the same 108px box, so they match in size and
// sharpness). They keep to the edges so the heading stays clear; only the four corner tiles show on phones, and the
// inner ring only appears on screens tall enough to leave room around the text.
const T = "/images/experiment/icons";
const ICONS: FloatingIconsHeroProps["icons"] = [
  { id: 1, src: `${T}/figma.png`, alt: "Figma", className: "top-[13%] left-[8%]" },
  { id: 2, src: `${T}/youtube.png`, alt: "YouTube", className: "top-[15%] right-[10%]" },
  { id: 3, src: `${T}/photoshop.png`, alt: "Photoshop", className: "top-[11%] left-[30%] hidden md:block" },
  { id: 4, src: `${T}/instagram.png`, alt: "Instagram", className: "top-[12%] right-[31%] hidden md:block" },
  { id: 5, src: `${T}/google.png`, alt: "Google", className: "top-[57%] left-[4%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 6, src: `${T}/canva.png`, alt: "Canva", className: "top-[59%] right-[4%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 7, src: `${T}/claude.png`, alt: "Claude", className: "bottom-[14%] left-[9%]" },
  { id: 8, src: `${T}/illustrator.png`, alt: "Illustrator", className: "bottom-[12%] right-[9%]" },
  { id: 9, src: `${T}/microsoft.png`, alt: "Microsoft", className: "bottom-[10%] left-[31%] hidden md:block" },
  { id: 10, src: `${T}/tiktok.png`, alt: "TikTok", className: "bottom-[9%] right-[30%] hidden md:block" },
  { id: 11, src: `${T}/safari.png`, alt: "Safari", className: "top-[26%] left-[17%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 12, src: `${T}/snapchat.png`, alt: "Snapchat", className: "top-[27%] right-[18%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 13, src: `${T}/word.png`, alt: "Word", className: "bottom-[25%] left-[18%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 14, src: `${T}/facebook.png`, alt: "Facebook", className: "bottom-[26%] right-[17%] hidden [@media(min-width:1024px)_and_(min-height:800px)]:block" },
  { id: 15, src: `${T}/github.png`, alt: "GitHub", className: "top-[14%] left-[calc(50%-40px)] hidden md:block" },
  { id: 16, src: `${T}/powerpoint.png`, alt: "PowerPoint", className: "bottom-[13%] left-[calc(50%-40px)] hidden md:block" },
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

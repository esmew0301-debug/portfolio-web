"use client";

import type { ReactNode } from "react";
import {
  Brush,
  Compass,
  Frame,
  Layers,
  LayoutGrid,
  Lightbulb,
  MousePointer2,
  Palette,
  PenTool,
  Search,
  Shapes,
  Smartphone,
  StickyNote,
  Type,
} from "lucide-react";
import { FloatingIconsHero, type FloatingIconsHeroProps } from "@/components/ui/floating-icons-hero-section";

// Design-tool tiles around the greeting. They keep to the edges so the heading in the middle stays clear;
// the ones nearest the text are hidden on small screens.
const ICONS: FloatingIconsHeroProps["icons"] = [
  { id: 1, icon: PenTool, className: "top-[13%] left-[8%]" },
  { id: 2, icon: MousePointer2, className: "top-[15%] right-[10%]" },
  { id: 3, icon: Layers, className: "top-[11%] left-[30%] hidden md:block" },
  { id: 4, icon: Palette, className: "top-[12%] right-[31%] hidden md:block" },
  { id: 5, icon: StickyNote, className: "top-[42%] left-[3%] hidden md:block" },
  { id: 6, icon: Search, className: "top-[44%] right-[3%] hidden md:block" },
  { id: 7, icon: Frame, className: "bottom-[14%] left-[9%]" },
  { id: 8, icon: Lightbulb, className: "bottom-[12%] right-[9%]" },
  { id: 9, icon: Type, className: "bottom-[10%] left-[31%] hidden md:block" },
  { id: 10, icon: Shapes, className: "bottom-[9%] right-[30%] hidden md:block" },
  { id: 11, icon: Smartphone, className: "top-[26%] left-[17%] hidden lg:block" },
  { id: 12, icon: Compass, className: "top-[27%] right-[18%] hidden lg:block" },
  { id: 13, icon: Brush, className: "bottom-[25%] left-[18%] hidden lg:block" },
  { id: 14, icon: LayoutGrid, className: "bottom-[26%] right-[17%] hidden lg:block" },
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

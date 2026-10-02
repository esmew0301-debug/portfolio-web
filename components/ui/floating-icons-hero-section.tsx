"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * FloatingIconsHero (adapted from 21st.dev). Icon tiles float around the hero; each one drifts on its own loop and
 * springs away from the cursor when it comes within 150px, then settles back.
 *
 * Changes from the original: the foreground is `children` (so the page keeps its own heading, type and entrance)
 * instead of a fixed title/subtitle/shadcn Button, the tiles use the site's dark palette, and each tile's drift
 * length is derived from its index rather than Math.random() so server and client render the same markup.
 */
interface IconProps {
  id: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Positioning (and optional responsive visibility) for the tile. */
  className: string;
}

export interface FloatingIconsHeroProps {
  icons: IconProps[];
  children?: React.ReactNode;
  /** Positioned against the whole section (e.g. a scroll hint), outside the centred content. */
  overlay?: React.ReactNode;
}

type Pointer = React.RefObject<{ x: number; y: number }>;

const Icon = ({ pointer, iconData, index }: { pointer: Pointer; iconData: IconProps; index: number }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = pointer.current.x - (rect.left + rect.width / 2);
      const dy = pointer.current.y - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Close enough: push the tile away; the closer the cursor, the stronger the push.
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - distance / 150) * 50;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, pointer]);

  const Glyph = iconData.icon;
  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute", iconData.className)}
    >
      {/* Continuous float */}
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-xl backdrop-blur-md md:h-20 md:w-20"
        animate={{ y: [0, -8, 0, 8, 0], x: [0, 6, 0, -6, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 5 + ((index * 37) % 50) / 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <Glyph className="h-7 w-7 text-white/70 md:h-9 md:w-9" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & FloatingIconsHeroProps
>(({ className, icons, children, overlay, ...props }, ref) => {
  const pointer = React.useRef({ x: -9999, y: -9999 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        pointer.current = { x: e.clientX, y: e.clientY };
      }}
      className={cn("relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden", className)}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full" aria-hidden>
        {icons.map((iconData, index) => (
          <Icon key={iconData.id} pointer={pointer} iconData={iconData} index={index} />
        ))}
      </div>
      <div className="relative z-10 px-4 text-center">{children}</div>
      {overlay}
    </section>
  );
});

FloatingIconsHero.displayName = "FloatingIconsHero";

export { FloatingIconsHero };

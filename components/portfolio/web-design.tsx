"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { webDesign, webDesignIntro } from "@/lib/content";

const isExternal = (href: string) => /^https?:\/\//.test(href);

// Outlined title list; hovering a row fills it in and shows a preview that trails the cursor.
export function WebDesign() {
  const section = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.set(preview.current, { xPercent: -50, yPercent: -50 });
      const toX = gsap.quickTo(preview.current, "x", { duration: 1, ease: "power3" });
      const toY = gsap.quickTo(preview.current, "y", { duration: 1, ease: "power3" });
      const el = section.current!;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        toX(e.clientX - r.left);
        toY(e.clientY - r.top);
      };
      el.addEventListener("mousemove", onMove);
      return () => el.removeEventListener("mousemove", onMove);
    },
    { scope: section },
  );

  return (
    <section ref={section} id="web" className="relative overflow-hidden bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1274px]">
        <div className="mb-10 md:mb-14">
          <div className="flex items-end justify-between">
            <h2
              data-reveal
              className="font-blinker pb-[0.2em] text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-[-0.03em] text-white"
            >
              Web Design
            </h2>
            <span
              data-reveal
              className="font-gilroy hidden text-sm uppercase tracking-[0.25em] text-white/40 md:block"
            >
              ({String(webDesign.length).padStart(2, "0")})
            </span>
          </div>
          <p
            data-reveal
            className="font-sulphur mt-6 max-w-[620px] text-[clamp(18px,2.2vw,26px)] leading-snug tracking-tight text-white/70"
          >
            {webDesignIntro}
          </p>
        </div>
        <div className="wd-list border-b border-white/10">
          {webDesign.map((w, i) => (
            <a
              key={w.label}
              href={w.href}
              {...(isExternal(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              data-cursor="view"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-reveal
              className="group flex items-center justify-between gap-6 border-t border-white/10 py-5 md:py-7"
            >
              <div className="flex items-baseline gap-5 md:gap-8">
                <h3
                  className="wd-title font-title text-[clamp(30px,5.5vw,84px)] leading-[0.95] tracking-[-0.02em] transition-all duration-300 group-hover:translate-x-3"
                  style={{
                    color: hovered === i ? "#ffffff" : "rgba(255,255,255,0.16)",
                    WebkitTextStroke: hovered === i ? "0" : "1px rgba(255,255,255,0.55)",
                  }}
                >
                  {w.label}
                </h3>
              </div>
              <span className="font-gilroy shrink-0 text-lg text-white/30 transition-colors duration-300 group-hover:text-white/80">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
      <div
        ref={preview}
        className="pointer-events-none absolute left-0 top-0 z-20 h-[300px] w-[420px] overflow-hidden rounded-[14px] shadow-2xl transition-opacity duration-300"
        style={{ opacity: hovered !== null ? 1 : 0 }}
      >
        {webDesign.map((w, i) => (
          <div
            key={w.label}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: hovered === i ? 1 : 0 }}
          >
            <Image src={w.image} alt={w.alt} fill sizes="420px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutAudiences, statementLinks } from "@/lib/content";
import { cn, prefersReducedMotion } from "@/lib/utils";

const LINK_CLASS = "underline decoration-1 underline-offset-[5px]";
const tokens = Object.keys(statementLinks);
const tokenRe = tokens.length
  ? new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g")
  : null;

// Renders (token) placeholders in a statement as underlined links.
function renderStatement(text: string, interactive: boolean): ReactNode[] {
  if (!tokenRe) return [text];
  return text.split(tokenRe).map((part, i) => {
    const href = statementLinks[part];
    if (!href) return part;
    return interactive ? (
      <a key={i} href={href} target="_blank" rel="noopener noreferrer" data-cursor-hover className={LINK_CLASS}>
        {part}
      </a>
    ) : (
      <span key={i} className={LINK_CLASS}>
        {part}
      </span>
    );
  });
}

const STATEMENT_CLASS =
  // Balanced wrapping (2026-10-08): the site-wide `text-wrap: pretty` and ragged lines made these statements step down
  // into an inverted triangle, and justifying left gaps; balance evens the line lengths. 48px keeps every statement
  // within the lines Chrome will balance.
  "font-sulphur text-[30px] font-normal leading-[1.28] tracking-[-0.01em] [text-wrap:balance] md:text-[48px]";

export function About() {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const spotlight = useRef<HTMLParagraphElement>(null);
  const statement = aboutAudiences[active].statement;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const trigger = { trigger: section.current, start: "top 82%", end: "top 38%", scrub: 0.6 };
      gsap.from(".about-intro", { autoAlpha: 0, y: 60, ease: "none", scrollTrigger: trigger });
      gsap.from(".about-card", { autoAlpha: 0, xPercent: 55, ease: "none", scrollTrigger: trigger });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="about"
      className="flex min-h-[100svh] items-center overflow-hidden bg-black px-6 py-24 md:px-10"
    >
      <div className="mx-auto flex w-full max-w-[1274px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="about-intro flex shrink-0 flex-col items-start lg:w-[240px] lg:pt-1">
          <h2 className="font-blinker text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-[-0.03em] text-white">
            Intro
          </h2>
          <nav className="mt-8 flex flex-col items-start gap-0.5">
            {aboutAudiences.map((a, i) => {
              const on = i === active;
              return (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => setActive(i)}
                  data-cursor-hover
                  className={cn(
                    "group font-gilroy flex items-center gap-3 py-2 text-left text-[18px] transition-colors duration-200 md:text-[20px]",
                    on ? "text-white" : "text-white/40 hover:text-white/75",
                  )}
                >
                  <span
                    className={cn(
                      "block h-px bg-current transition-all duration-300",
                      on ? "w-9 opacity-100" : "w-4 opacity-40 group-hover:w-6",
                    )}
                  />
                  {a.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="about-card w-full lg:max-w-[790px] lg:flex-1">
          <div
            ref={card}
            onMouseMove={(e) => {
              const c = card.current;
              const s = spotlight.current;
              if (!c || !s) return;
              const r = c.getBoundingClientRect();
              const mask = `radial-gradient(circle 220px at ${e.clientX - r.left}px ${e.clientY - r.top}px, #000 0%, #000 30%, transparent 72%)`;
              s.style.webkitMaskImage = mask;
              s.style.maskImage = mask;
              s.style.opacity = "1";
            }}
            onMouseLeave={() => {
              if (spotlight.current) spotlight.current.style.opacity = "0";
            }}
            className="notepad relative h-[600px] overflow-hidden p-8 md:h-[840px] md:p-11 lg:h-[700px]"
          >
            <p
              key={active}
              className={cn(STATEMENT_CLASS, "animate-in fade-in slide-in-from-bottom-3 text-white/35 duration-500")}
            >
              {renderStatement(statement, true)}
            </p>
            <p
              key={`o-${active}`}
              ref={spotlight}
              aria-hidden
              className={cn(
                STATEMENT_CLASS,
                "pointer-events-none absolute inset-0 p-8 text-white opacity-0 transition-opacity duration-200 md:p-11",
              )}
            >
              {renderStatement(statement, false)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

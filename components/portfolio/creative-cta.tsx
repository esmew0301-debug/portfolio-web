"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { footerConnect, footerMenu, person } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

const LABEL = "font-gilroy mb-5 text-xs uppercase tracking-[0.25em] text-white/40";

// "Let's Collaborate!" words slide in from both sides on scroll; a soft light follows the cursor.
export function CreativeCTA({ hrefBase = "" }: { hrefBase?: string }) {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement.style.overscrollBehaviorY;
      const body = document.body.style.overscrollBehaviorY;
      document.documentElement.style.overscrollBehaviorY = "none";
      document.body.style.overscrollBehaviorY = "none";
      if (prefersReducedMotion()) {
        gsap.set(".cta-word", { xPercent: 0 });
      } else {
        gsap
          .timeline({
            scrollTrigger: { trigger: section.current, start: "top bottom", end: "top 25%", scrub: 1 },
          })
          .fromTo(".cta-word-left", { xPercent: -120 }, { xPercent: 0, ease: "none" }, 0)
          .fromTo(".cta-word-right", { xPercent: 120 }, { xPercent: 0, ease: "none" }, 0);
      }
      const onMove = (e: MouseEvent) => {
        const el = section.current!;
        const r = el.getBoundingClientRect();
        if (e.clientY >= r.top && e.clientY <= r.bottom) {
          el.style.setProperty("--pointer-x", `${e.clientX - r.left}px`);
          el.style.setProperty("--pointer-y", `${e.clientY - r.top}px`);
        }
      };
      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
        document.documentElement.style.overscrollBehaviorY = html;
        document.body.style.overscrollBehaviorY = body;
      };
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="contact"
      className="footer-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden px-6 pb-8 pt-24 md:px-10"
      style={
        {
          "--pointer-x": "50%",
          "--pointer-y": "38%",
          background:
            "radial-gradient(38rem 30rem at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.075), transparent 68%), linear-gradient(180deg, #07090d 0%, #0a0c11 100%)",
        } as React.CSSProperties
      }
    >
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <h2 className="font-sulphur text-[clamp(52px,13vw,180px)] font-medium leading-[0.95] tracking-[-0.04em] text-white">
          <span className="block">
            <span className="cta-word cta-word-left block will-change-transform">Let’s</span>
          </span>
          <span className="block">
            <span className="cta-word cta-word-right block will-change-transform">Collaborate!</span>
          </span>
        </h2>
      </div>

      <footer className="relative z-10 mx-auto mt-24 w-full max-w-[1274px]">
        <div className="grid grid-cols-2 gap-10 border-t border-white/15 pt-12 md:grid-cols-[1fr_1fr_1.4fr]">
          <div>
            <p className={LABEL}>Menu</p>
            <ul className="font-gilroy space-y-3 text-[18px] text-white/75">
              {footerMenu.map((l) => (
                <li key={l.label}>
                  <a
                    href={`${hrefBase}${l.href}`}
                    data-cursor-hover
                    className="inline-flex origin-left transition-transform duration-300 ease-out hover:scale-110 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={LABEL}>Connect</p>
            <ul className="font-gilroy space-y-3 text-[18px] text-white/75">
              {footerConnect.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    data-cursor-hover
                    className="group inline-flex origin-left items-center gap-1.5 transition-transform duration-300 ease-out hover:scale-110 hover:text-white"
                  >
                    {l.label}
                    {l.external && (
                      <span aria-hidden className="inline-block transition-transform duration-300 group-hover:rotate-45">
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={LABEL}>Say hello</p>
            <a
              href={`mailto:${person.email}`}
              data-cursor-hover
              className="font-blinker inline-block origin-left text-[clamp(22px,2.8vw,34px)] leading-[1.1] tracking-[-0.02em] text-white transition-transform duration-300 ease-out hover:scale-110 hover:text-[var(--accent)]"
            >
              {person.email}
            </a>
            <div className="mt-6 flex items-center gap-2.5">
              <span className="dot-loop h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-green)" }} />
              <span className="font-gilroy text-[15px] text-white/60">{person.status}</span>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sulphur text-[15px] text-white/50">©2026 {person.name} — All rights reserved</p>
          <a
            href="#top"
            data-cursor-hover
            className="font-gilroy group inline-flex origin-right items-center gap-1 text-[15px] uppercase tracking-[0.2em] text-white/50 transition-transform duration-300 ease-out hover:scale-110 hover:text-white"
          >
            Back to top
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:rotate-45">
              ↑
            </span>
          </a>
        </div>
      </footer>
    </section>
  );
}

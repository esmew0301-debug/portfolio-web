"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { navLinks, person } from "@/lib/content";
import { trailState } from "@/lib/trail-state";
import { prefersReducedMotion } from "@/lib/utils";
import { GmailIcon, LinkedInIcon } from "./icons";

const ICON_LINK =
  "transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:rotate-6 hover:scale-125";

// Floating pill nav: drops in after the intro, shrinks to a "•••" pill on scroll,
// hides while scrolling down, and re-expands on hover.
export function CreativeNav({ play, hrefBase = "" }: { play: boolean; hrefBase?: string }) {
  const header = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsed = scrolled && !menuHover;
  const resolve = (href: string) => (href.startsWith("#") ? `${hrefBase}${href}` : href);

  useGSAP(
    () => {
      gsap.set(header.current, { yPercent: -140 });
    },
    { scope: header },
  );

  useEffect(() => {
    if (!play || !header.current) return;
    gsap.to(header.current, {
      yPercent: 0,
      duration: prefersReducedMotion() ? 0 : 0.9,
      ease: "power3.out",
    });
  }, [play]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setMobileOpen(false);
      if (y > 120) {
        if (y > lastY.current + 4) setHiddenOnScroll(true);
        else if (y < lastY.current - 4) setHiddenOnScroll(false);
      } else {
        setHiddenOnScroll(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4">
      <div
        onMouseEnter={() => {
          trailState.paused = true;
          setNavHover(true);
          document.documentElement.classList.add("nav-hovering");
        }}
        onMouseLeave={() => {
          trailState.paused = false;
          setNavHover(false);
          document.documentElement.classList.remove("nav-hovering");
        }}
        className={`nav-native-cursor flex w-full items-center justify-between rounded-full border border-white/10 transition-all duration-500 ease-out ${
          scrolled ? (collapsed ? "max-w-[440px]" : "max-w-[840px]") : "max-w-[1400px]"
        } ${hiddenOnScroll && !navHover ? "opacity-0" : "opacity-100"} ${
          scrolled ? "bg-black/60 px-4 py-2 shadow-lg backdrop-blur-xl" : "bg-black/30 px-3 py-2 backdrop-blur-md"
        }`}
      >
        <a href={resolve("#top")} className="group flex items-center gap-2.5" aria-label="Home">
          <span className="relative shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
            <Image
              src={person.avatar}
              alt={person.name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20"
            />
            <span
              className="dot-loop absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full"
              style={{ background: "var(--accent-green)" }}
            />
          </span>
          <span className="font-blinker whitespace-nowrap text-[16px] text-white md:text-[18px]">
            {person.name}
            <span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </a>

        <div
          className="relative hidden items-center justify-end md:flex"
          onMouseEnter={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
        >
          <button
            type="button"
            aria-label="Show menu"
            className={`flex items-center gap-1.5 px-2 py-2 transition-opacity duration-300 ${
              collapsed ? "opacity-100" : "pointer-events-none absolute right-0 opacity-0"
            }`}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="nav-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-green)" }} />
            ))}
          </button>
          <div
            className={`flex items-center gap-5 transition-opacity duration-300 md:gap-7 ${
              collapsed ? "pointer-events-none absolute right-0 opacity-0" : "opacity-100"
            }`}
          >
            <nav className="font-gilroy flex items-center gap-6 text-[16px] text-white md:gap-8 md:text-[18px]">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.external ? l.href : resolve(l.href)}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  download={l.download}
                  aria-label={l.tooltip ? `${l.label} (${l.tooltip})` : undefined}
                  className="group relative inline-flex items-center gap-1 py-1 transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  {l.label}
                  {l.external && (
                    <span
                      aria-hidden
                      className="text-[0.7em] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  )}
                  {l.download && (
                    <span aria-hidden className="text-[0.75em] transition-transform duration-300 group-hover:translate-y-0.5">
                      ↓
                    </span>
                  )}
                  {l.tooltip && (
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[12px] text-black opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      {l.tooltip}
                    </span>
                  )}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                    style={{ background: "var(--accent)" }}
                  />
                </a>
              ))}
            </nav>
            <span className="h-4 w-px bg-white/20" aria-hidden />
            <div className="flex items-center gap-3.5">
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={ICON_LINK}>
                <LinkedInIcon className="h-7 w-7 drop-shadow-sm" />
              </a>
              <a href={`mailto:${person.email}`} aria-label="Email" className={ICON_LINK}>
                <GmailIcon className="h-7 w-7 drop-shadow-sm" />
              </a>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-6 rounded-full bg-white transition-all duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { heroRoles, heroSubtitle } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";
import { CursorTrail } from "./cursor-trail";
import { HeroShader } from "./hero-shader";

export function Hero({ play }: { play: boolean }) {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const [introDone, setIntroDone] = useState(false);

  useGSAP(
    () => {
      gsap.set(".hero-name", { scale: 0.42, opacity: 1, transformOrigin: "50% 50%" });
      gsap.set(".hero-char", { color: "#3d3d3d" });
      gsap.set(".hero-fade", { opacity: 0, y: 18 });
    },
    { scope: root },
  );

  // Letters light up one by one, the name springs to full size, then the rest fades in.
  useEffect(() => {
    if (!play || !root.current) return;
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });
    tl.to(q(".hero-char"), { color: "#ffffff", duration: 0.28, ease: "power1.out", stagger: 0.07 })
      .to(q(".hero-name"), { scale: 1, duration: 0.9, ease: "back.out(1.3)" }, ">-0.05")
      .to(
        q(".hero-fade"),
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 },
        "<0.25",
      );
    return () => {
      tl.kill();
    };
  }, [play]);

  // Typewriter: delete the current phrase, then type the next one, looping forever.
  useEffect(() => {
    const el = word.current;
    if (!introDone || !el || prefersReducedMotion()) return;
    let phrase = 0;
    let len = heroRoles[0].length;
    let deleting = true;
    let timer = 0;
    const step = () => {
      if (deleting) {
        len -= 1;
        el.textContent = heroRoles[phrase].slice(0, len);
        if (len === 0) {
          phrase = (phrase + 1) % heroRoles.length;
          deleting = false;
          timer = window.setTimeout(step, 250);
        } else {
          timer = window.setTimeout(step, 35);
        }
      } else {
        len += 1;
        const target = heroRoles[phrase];
        el.textContent = target.slice(0, len);
        const done = len === target.length;
        if (done) deleting = true;
        timer = window.setTimeout(step, done ? 1500 : 70);
      }
    };
    timer = window.setTimeout(step, 1500);
    return () => window.clearTimeout(timer);
  }, [introDone]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: "var(--hero-bg)" }}
    >
      <HeroShader className="pointer-events-none absolute inset-0 z-0" />
      <CursorTrail zIndex={5} active={introDone} />
      <div className="relative z-10 mt-24 flex flex-col items-center">
        <h1 className="hero-name font-blinker text-[clamp(34px,8vw,128px)] font-normal leading-[0.9] tracking-[0.01em] whitespace-nowrap text-white will-change-transform">
          <span ref={word} className="hero-word inline-block will-change-transform">
            {heroRoles[0].split("").map((c, i) => (
              <span key={i} className="hero-char inline-block">
                {c === " " ? " " : c}
              </span>
            ))}
          </span>
          {introDone && (
            <span aria-hidden className="hero-caret inline-block font-thin text-white/60">
              |
            </span>
          )}
        </h1>
        <p className="hero-fade font-sulphur mt-40 max-w-[620px] text-balance text-[clamp(15px,1.5vw,19px)] leading-relaxed tracking-tight text-white/80">
          {heroSubtitle}
        </p>
      </div>
      <div className="hero-fade absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-gilroy text-[10px] uppercase tracking-[0.35em] text-white/40">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span
            className="hero-scroll-line absolute inset-x-0 top-0 block h-4 w-px"
            style={{ background: "var(--accent)" }}
          />
        </span>
      </div>
    </section>
  );
}

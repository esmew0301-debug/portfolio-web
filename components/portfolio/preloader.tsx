"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { preloaderWords } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

export const INTRO_KEY = "intro-played";

function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
  document.documentElement.classList.add("intro-done");
}

function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const [hidden, setHidden] = useState(false);

  // Safety net: never hold the page for more than 4.5s.
  useEffect(() => {
    const t = window.setTimeout(() => {
      markIntroPlayed();
      document.body.style.overflow = "";
      onComplete();
      setHidden(true);
    }, 4500);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  useGSAP(
    () => {
      if (introAlreadyPlayed()) {
        document.body.style.overflow = "";
        return;
      }
      const finish = () => {
        markIntroPlayed();
        document.body.style.overflow = "";
        onComplete();
        setHidden(true);
      };
      if (prefersReducedMotion()) {
        finish();
        return;
      }
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline({ onComplete: finish });
      const progress = { v: 0 };
      tl.to(progress, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counter.current) counter.current.textContent = String(Math.round(progress.v));
        },
      });
      preloaderWords.forEach((w, i) => {
        tl.set(word.current, { textContent: w }, i * (1.6 / preloaderWords.length));
      });
      tl.to(".preloader-content", {
        yPercent: -120,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      tl.to(
        ".preloader-panel",
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.9,
          ease: "power4.inOut",
          stagger: 0.08,
        },
        "-=0.2",
      );
    },
    { scope: root },
  );

  if (hidden) return null;

  return (
    <div ref={root} className="preloader-root fixed inset-0 z-[200]" aria-hidden>
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="preloader-panel h-full flex-1 bg-black" />
        ))}
      </div>
      <div className="preloader-content absolute inset-0">
        <span className="font-gilroy absolute right-6 top-6 leading-none text-white/40 md:right-14 md:top-12">
          <span className="text-[clamp(56px,11vw,150px)] font-light tracking-tight">
            <span ref={counter}>0</span>%
          </span>
        </span>
        <span
          ref={word}
          className="font-sulphur absolute bottom-8 left-6 text-[clamp(64px,15vw,220px)] leading-[0.9] tracking-tight text-white md:bottom-12 md:left-14"
        >
          {preloaderWords[0]}
        </span>
      </div>
    </div>
  );
}

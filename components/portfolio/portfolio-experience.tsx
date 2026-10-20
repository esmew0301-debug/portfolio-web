"use client";

import { useCallback, useEffect, useState } from "react";
import { CreativeCTA } from "./creative-cta";
import { CreativeNav } from "./creative-nav";
import { FeaturedWork } from "./featured-work";
import { Hero } from "./hero";
import { HeroShader } from "./hero-shader";
import { Playground } from "./playground";
import { INTRO_KEY, Preloader } from "./preloader";
import { RevealAnimations } from "./reveal-animations";
import { ScrollProgress } from "./scroll-progress";
import { SmoothScroll } from "./smooth-scroll";
import { WebDesign } from "./web-design";

export function PortfolioExperience() {
  const [intro, setIntro] = useState({ done: false, skip: false });

  // The preloader plays once per browser session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is client-only
        setIntro({ done: true, skip: true });
      }
    } catch {}
  }, []);

  const onIntroComplete = useCallback(() => setIntro((s) => ({ ...s, done: true })), []);

  return (
    <>
      <SmoothScroll active={intro.done} />
      {!intro.skip && <Preloader onComplete={onIntroComplete} />}
      <ScrollProgress />
      {intro.done && <RevealAnimations />}
      <CreativeNav play={intro.done} />
      <main id="top" className="bg-black">
        {/* One shared animated dark gradient behind the hero and all work sections, so the colour is continuous. */}
        <div className="relative" style={{ background: "var(--hero-bg)" }}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="sticky top-0 h-[100lvh] w-full">
              <HeroShader className="absolute inset-0" />
            </div>
          </div>
          <div className="relative z-10">
            <Hero play={intro.done} />
            <FeaturedWork />
            <Playground />
            <WebDesign />
          </div>
        </div>
        <CreativeCTA />
      </main>
    </>
  );
}

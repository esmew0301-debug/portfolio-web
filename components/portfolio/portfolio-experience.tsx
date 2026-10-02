"use client";

import { useCallback, useEffect, useState } from "react";
import { About } from "./about";
import { CreativeCTA } from "./creative-cta";
import { CreativeNav } from "./creative-nav";
import { FeaturedWork } from "./featured-work";
import { Hero } from "./hero";
import { Marquee } from "./marquee";
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
        <Hero play={intro.done} />
        <Marquee />
        <About />
        <FeaturedWork />
        <Playground />
        <WebDesign />
        <CreativeCTA />
      </main>
    </>
  );
}

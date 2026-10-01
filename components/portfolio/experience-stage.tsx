"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience, experienceIntro } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

// Coverflow-style stage: wheel or drag moves between cards; neighbours shrink and fade.
export function ExperienceStage() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const stage = section.current!.querySelector<HTMLElement>(".perf-stage")!;
        const cards = gsap.utils.toArray<HTMLElement>(".perf-card");
        const n = cards.length;
        const spacing = () => Math.min(0.46 * window.innerWidth, 560);
        const wrap = gsap.utils.wrap(-n / 2, n / 2);
        const clamp = gsap.utils.clamp;
        const state = { pos: 0 };
        let target = 0;

        const layout = () => {
          cards.forEach((card, i) => {
            const offset = wrap(i - state.pos);
            const dist = Math.abs(offset);
            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,
              x: offset * spacing(),
              rotationY: 0,
              z: 0,
              scale: 1 - 0.2 * Math.min(dist, 1),
              autoAlpha: clamp(0, 1, 1.15 - 0.75 * dist),
              zIndex: 100 - Math.round(10 * dist),
              transformOrigin: "50% 50%",
            });
          });
        };
        const goTo = (pos: number) => {
          target = pos;
          gsap.to(state, {
            pos,
            duration: reduced ? 0 : 0.7,
            ease: "power3.out",
            overwrite: true,
            onUpdate: layout,
          });
        };
        layout();

        let wheelAcc = 0;
        const onWheel = (e: WheelEvent) => {
          const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
          if (d === 0) return;
          e.preventDefault();
          wheelAcc += d;
          let steps = 0;
          while (Math.abs(wheelAcc) >= 90 && steps < 3) {
            const dir = wheelAcc > 0 ? 1 : -1;
            wheelAcc -= 90 * dir;
            goTo(target + dir);
            steps++;
          }
          if (steps > 0) wheelAcc = 0;
        };
        stage.addEventListener("wheel", onWheel, { passive: false });

        let down = false;
        let dragging = false;
        let lastX = 0;
        let travelled = 0;
        const onDown = (e: PointerEvent) => {
          down = true;
          dragging = false;
          lastX = e.clientX;
          travelled = 0;
        };
        const onMove = (e: PointerEvent) => {
          if (!down) return;
          const dx = e.clientX - lastX;
          lastX = e.clientX;
          travelled += Math.abs(dx);
          if (!dragging) {
            if (travelled < 8) return;
            dragging = true;
            gsap.killTweensOf(state);
            stage.setPointerCapture?.(e.pointerId);
          }
          state.pos -= dx / spacing();
          layout();
        };
        const onUp = () => {
          if (!down) return;
          down = false;
          if (dragging) goTo(Math.round(state.pos));
          dragging = false;
        };
        stage.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        // Swallow the click that ends a drag so it doesn't open a card.
        const onClick = (e: MouseEvent) => {
          if (travelled >= 8) {
            e.preventDefault();
            e.stopPropagation();
          }
        };
        stage.addEventListener("click", onClick, true);
        const onResize = () => layout();
        window.addEventListener("resize", onResize);

        return () => {
          gsap.killTweensOf(state);
          stage.removeEventListener("wheel", onWheel);
          stage.removeEventListener("pointerdown", onDown);
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
          stage.removeEventListener("click", onClick, true);
          window.removeEventListener("resize", onResize);
        };
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="performance"
      className="relative overflow-hidden bg-black px-6 py-24 md:flex md:min-h-screen md:flex-col md:justify-center md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1274px]">
        <div className="mb-12 flex flex-col items-center text-center md:mb-0">
          <h2
            data-reveal
            className="font-blinker pb-[0.2em] text-[clamp(34px,6.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-white"
          >
            {experienceIntro.title}
          </h2>
          <p
            data-reveal
            className="font-sulphur mt-5 max-w-[620px] text-[clamp(18px,2.2vw,26px)] leading-snug tracking-tight text-white/70"
          >
            {experienceIntro.subtitle}
          </p>
          <a
            href={experienceIntro.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="tech-border group mt-8 inline-flex items-center gap-3 px-8 py-4 font-gilroy text-[14px] font-medium uppercase tracking-[0.18em] text-white transition-transform duration-300 ease-out hover:scale-[1.1]"
            style={{ "--tech-accent": "#e5e7eb", "--tech-bg": "#0a0a0a" } as React.CSSProperties}
          >
            {experienceIntro.cta.label}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
        <div
          className="perf-stage relative mt-14 flex flex-col gap-20 md:mt-20 md:block md:h-[54vh] md:cursor-grab md:select-none md:active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
        >
          {experience.map((x) => (
            <figure
              key={x.slug}
              className="perf-card group relative w-full will-change-transform md:absolute md:left-1/2 md:top-1/2 md:w-[min(40vw,500px)]"
            >
              <a href="#performance" data-cursor="view" className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-neutral-900">
                  <Image
                    src={x.image}
                    alt={x.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-5 pb-4 pt-12">
                    <p className="font-gilroy text-[12px] uppercase tracking-[0.18em] text-white/85">
                      {x.role} · {x.type}
                    </p>
                  </div>
                </div>
                <figcaption className="mt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-blinker text-[20px] font-medium leading-tight text-white md:text-[24px]">
                      {x.title}
                    </h3>
                    <span className="font-gilroy shrink-0 text-[14px] tabular-nums text-white/40">{x.year}</span>
                  </div>
                  <p className="font-gilroy mt-1.5 text-[14px] leading-relaxed text-white/55">{x.blurb}</p>
                </figcaption>
              </a>
            </figure>
          ))}
        </div>
        <span className="font-gilroy mt-2 hidden text-center text-sm uppercase tracking-[0.2em] text-white/40 md:block">
          Scroll →
        </span>
      </div>
    </section>
  );
}

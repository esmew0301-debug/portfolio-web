"use client";

import { useEffect, useState } from "react";
import { experience, person, playgroundProjects, selectedWork, webDesign } from "@/lib/content";
import { L } from "@/lib/i18n";
import { LangToggle } from "./lang-toggle";

// Homepage after zegzulka.com, on black: a fixed top bar (name with "Work" under it on the left, Experience and
// Resume on the right) over a mosaic of project covers (images or looping videos). Hovering a cover insets it and
// shows the project name, my name and the company; clicking opens the case study. Seven projects sit in three bands
// (2 big / 3 smaller / 2 big) whose heights differ so squares and rectangles interlock instead of forming a grid.
// Dividers are thin light horizontal lines instead of rounded borders.

type Tile = {
  title: string;
  company?: string;
  href: string;
  image: string;
  video?: string;
  alt: string;
  /** Box in a 100-unit-wide composition: [left, top, width, height]. */
  box: [number, number, number, number];
  /** object-position for the crop. */
  focus?: string;
};

const nio = selectedWork[0];
const eoe = selectedWork[1];
const trip = selectedWork[2];
const mag = selectedWork[3];
const vegan = playgroundProjects[0];
const loreal = playgroundProjects[1];
const tequila = webDesign[0];

// The composition (gap 0.6): left column A / C+D / F, right column B / E / G, with band edges offset so they interlock.
const TILES: Tile[] = [
  { title: nio.label, company: "NIO", href: nio.href, image: nio.image, alt: nio.alt, box: [0, 0, 59.7, 42] },
  { title: eoe.label, company: "End of an Era", href: eoe.href, image: eoe.poster ?? eoe.image, video: eoe.video, alt: eoe.alt, box: [60.3, 0, 39.7, 36] },
  { title: trip.label, href: trip.href, image: trip.poster ?? trip.image, video: trip.video, alt: trip.alt, box: [0, 42.6, 29.55, 29.55] },
  { title: "Tequila Brand Website", company: "Posse.io", href: tequila.href, image: tequila.image, alt: tequila.alt, box: [30.15, 42.6, 29.55, 29.55], focus: "50% 22%" },
  { title: vegan.title, href: vegan.href, image: vegan.image, alt: "Val's Vegan Kitchen app on a phone held in two hands", box: [60.3, 36.6, 39.7, 48], focus: "50% 50%" },
  { title: "Magazine Platform", company: "Posse.io", href: mag.href, image: mag.poster ?? mag.image, video: mag.video, alt: mag.alt, box: [0, 72.75, 59.7, 45.25] },
  { title: loreal.title, href: loreal.href, image: loreal.image, alt: "L'Oréal Brandstorm product concept", box: [60.3, 85.2, 39.7, 32.8] },
];
const HEIGHT = 118;

function Cover({ t, className, style }: { t: Tile; className?: string; style?: React.CSSProperties }) {
  return (
    <a href={t.href} data-cursor="view" className={`group relative block overflow-hidden bg-[#111] ${className ?? ""}`} style={style}>
      {/* the media insets a little on hover, like the reference */}
      <div className="absolute inset-0 transition-[inset] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:inset-[6px]">
        {t.video ? (
          <video
            src={t.video}
            poster={t.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: t.focus }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.image} alt={t.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: t.focus }} />
        )}
      </div>
      {/* labels: project, then my name and the company (if there is one) */}
      <div className="pointer-events-none absolute bottom-[14px] left-[14px] flex flex-wrap gap-1.5 opacity-100 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
        <span className="bg-black px-2.5 py-1.5 text-[13px] leading-none text-white">{t.title}</span>
        <span className="bg-black px-2.5 py-1.5 text-[13px] leading-none text-white/70">
          {person.name}
          {t.company ? `, ${t.company}` : ""}
        </span>
      </div>
    </a>
  );
}

function Experience() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 pb-24 pt-10 md:px-8">
      <ol className="border-t border-white/15">
        {experience.map((e) => (
          <li key={e.org + e.when} className="grid grid-cols-1 gap-1 border-b border-white/15 py-5 md:grid-cols-[220px_1fr_1fr] md:gap-6">
            <span className="text-[15px] text-white/45">{e.when}</span>
            <span className="text-[16px] text-white">{e.org}</span>
            <span className="text-[16px] text-white/65">{e.role}</span>
          </li>
        ))}
      </ol>
      <a href="/experiment" className="mt-8 inline-block text-[15px] text-white/60 transition-colors hover:text-white">
        <L en="More on the Experiment page →" zh="在 Experiment 页面查看更多 →" />
      </a>
    </section>
  );
}

export function MosaicHome() {
  const [view, setView] = useState<"work" | "experience">("work");

  useEffect(() => {
    const sync = () => setView(window.location.hash === "#experience" ? "experience" : "work");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = (v: "work" | "experience") => {
    setView(v);
    history.replaceState(null, "", v === "work" ? "#work" : "#experience");
    window.scrollTo({ top: 0 });
  };

  const navItem = (active: boolean) => `text-[16px] leading-[1.5] transition-colors ${active ? "text-white" : "text-white/45 hover:text-white"}`;

  return (
    <div id="top" className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/90 backdrop-blur-sm">
        <div className="flex items-start justify-between px-4 py-3 md:px-[14px]">
          <div className="flex flex-col">
            <a href="#work" onClick={(e) => (e.preventDefault(), go("work"))} className="text-[16px] leading-[1.5] text-white">
              {person.name}
            </a>
            <button type="button" onClick={() => go("work")} className={`text-left ${navItem(view === "work")}`}>
              <L en="Work" zh="作品" />
            </button>
          </div>
          <nav className="flex items-center gap-4">
            <button type="button" onClick={() => go("experience")} className={navItem(view === "experience")}>
              <L en="Experience" zh="经历" />
            </button>
            <a href="/files/Sihan-Wang-Resume.pdf" target="_blank" rel="noopener noreferrer" className={navItem(false)}>
              <L en="Resume" zh="简历" />
            </a>
            <LangToggle className="text-[13px]" />
          </nav>
        </div>
      </header>

      <main id="work" className="pt-[84px]">
        {view === "work" ? (
          <>
            {/* desktop / tablet: the interlocking composition */}
            <div className="relative mx-2 hidden md:block" style={{ aspectRatio: `100 / ${HEIGHT}` }}>
              {TILES.map((t) => {
                const [x, y, w, h] = t.box;
                return (
                  <Cover
                    key={t.href}
                    t={t}
                    className="!absolute"
                    style={{ left: `${x}%`, top: `${(y / HEIGHT) * 100}%`, width: `${w}%`, height: `${(h / HEIGHT) * 100}%` }}
                  />
                );
              })}
            </div>
            {/* phone: one column, each cover keeping its shape */}
            <div className="flex flex-col gap-2 px-2 md:hidden">
              {TILES.map((t) => (
                <Cover key={t.href} t={t} style={{ aspectRatio: `${t.box[2]} / ${t.box[3]}` }} />
              ))}
            </div>
          </>
        ) : (
          <Experience />
        )}
      </main>

      <footer className="mt-20 flex items-center justify-between border-t border-white/15 px-4 py-4 text-[15px] text-white/60 md:px-[14px]">
        <a href={`mailto:${person.email}`} className="transition-colors hover:text-white">
          <L en="Contact" zh="联系我" />
        </a>
        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
          LinkedIn
        </a>
        <span>© 2026</span>
      </footer>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/case/reveal";

export type DesignCard = {
  category: "Featured Work" | "Playground" | "Web Design";
  imagePosition?: string;
  title: string;
  blurb: string;
  image: string;
  href: string;
};

const FILTERS = ["All", "Featured Work", "Playground", "Web Design"] as const;
const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Work collection: header, category filter pills, and a ruled two-column card grid. */
export function DesignGrid({ cards }: { cards: DesignCard[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const count = (f: (typeof FILTERS)[number]) => (f === "All" ? cards.length : cards.filter((c) => c.category === f).length);
  const shown = filter === "All" ? cards : cards.filter((c) => c.category === filter);

  return (
    <>
      <header className="mx-auto max-w-[1274px] px-6 pb-14 pt-36 text-center md:px-10 md:pb-20 md:pt-44">
        <Link
          href="/"
          className="font-gilroy text-[12px] uppercase tracking-[0.3em] text-white/45 transition-colors hover:text-white"
        >
          ← Home
        </Link>
        <h1 className="font-blinker mt-6 text-[clamp(56px,9vw,128px)] leading-[0.95] tracking-[-0.03em]">Design</h1>
        <p className="font-sulphur mx-auto mt-6 max-w-[36ch] text-[clamp(18px,2vw,24px)] leading-snug text-white/65">
          Featured work, playground projects, and web design, everything in one place.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter by category">
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(f)}
                data-cursor-hover
                className={`font-gilroy inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-colors duration-300 ${
                  on ? "border-white bg-white text-black" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {f}
                <span className={`text-[12px] tabular-nums ${on ? "text-black/50" : "text-white/35"}`}>{count(f)}</span>
              </button>
            );
          })}
        </div>
      </header>

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1274px] grid-cols-1 md:grid-cols-2">
          {shown.map((c, i) => (
            <Reveal
              key={c.title}
              delay={(i % 2) * 0.08}
              className={`border-b border-white/10 ${i % 2 === 0 ? "md:border-r" : ""}`}
            >
              <a
                href={c.href}
                {...(isExternal(c.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-cursor="view"
                className="group block p-6 md:p-10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-neutral-900">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: c.imagePosition }}
                  />
                </div>
                <p className="font-gilroy mt-6 text-[11px] uppercase tracking-[0.3em] text-white/40">{c.category}</p>
                <h2 className="font-blinker mt-2 text-[clamp(22px,2.2vw,28px)] leading-tight text-white transition-colors duration-300 group-hover:text-white/70">
                  {c.title}
                  {isExternal(c.href) && <span className="ml-1.5 text-[0.7em] text-white/40">↗</span>}
                </h2>
                <p className="font-gilroy mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-white/55">{c.blurb}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

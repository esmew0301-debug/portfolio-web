"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Homepage project cards (reference: keithren.com "Latest Works" / "Other Selected Works"): a dark, double-framed
// card with the project's media on the left and its name, description and tag pills on the right.

const isExternal = (href: string) => /^https?:\/\//.test(href);

export type ShowcaseItem = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  tags: string[];
  href: string;
  alt: string;
  image: string;
  video?: string;
  poster?: string;
  imagePosition?: string;
  /** Show the whole (portrait) media on this colour instead of cropping it. */
  mediaBg?: string;
};

/** Pills toggle a highlighted (blue) state on click; the first carries the status dot. */
function Pills({ tags }: { tags: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="relative z-20 mt-6 flex flex-wrap gap-2">
      {tags.map((t, i) => {
        const on = active === t;
        return (
          <button
            key={t}
            type="button"
            aria-pressed={on}
            onClick={() => setActive(on ? null : t)}
            className={cn(
              "font-gilroy inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] leading-none transition-colors duration-200 md:text-[14px]",
              on
                ? "border-[#3b82f6] bg-[#2563eb] text-white"
                : "border-white/10 bg-black/60 text-white/80 hover:border-white/30 hover:text-white",
            )}
          >
            {i === 0 && (
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: on ? "#ffffff" : "var(--accent-green)" }}
              />
            )}
            {t}
          </button>
        );
      })}
    </div>
  );
}

function Media({ item, sizes }: { item: ShowcaseItem; sizes: string }) {
  return item.video ? (
    <video
      src={item.video}
      poster={item.poster ?? item.image}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={item.alt}
      className={`absolute inset-0 h-full w-full ${item.mediaBg ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
      style={{ objectPosition: item.imagePosition, background: item.mediaBg }}
    />
  ) : (
    <Image
      src={item.image}
      alt={item.alt}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      style={{ objectPosition: item.imagePosition }}
    />
  );
}

/** One fixed format for every homepage project: all cards share the same width, height and proportions. */
export function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <article data-reveal className="group relative rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-2 md:p-2.5">
      <div className="relative grid items-center gap-6 overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(160deg,#1c1c1e_0%,#121213_55%,#0e0e0f_100%)] p-5 md:h-[460px] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-12 md:p-8 lg:h-[520px] lg:gap-14 lg:p-10">
        <div data-cursor="view" className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-neutral-900 md:aspect-auto md:h-full">
          <Media item={item} sizes="(max-width:768px) 100vw, 640px" />
        </div>
        <div className="flex h-[300px] flex-col justify-center md:h-auto md:pr-6">
          <p className="font-gilroy text-[13px] uppercase tracking-[0.22em] text-white/45">{item.eyebrow}</p>
          <h3 className="font-blinker mt-3 text-[clamp(28px,3.2vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-white">
            {item.title}
          </h3>
          <p className="font-gilroy mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/55 md:text-[16px] md:leading-relaxed">
            {item.description}
          </p>
          <Pills tags={item.tags} />
        </div>
        {/* Whole card opens the project; the pills sit above this link. */}
        <a
          href={item.href}
          aria-label={item.title}
          className="absolute inset-0 z-10"
          {...(isExternal(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        />
      </div>
    </article>
  );
}

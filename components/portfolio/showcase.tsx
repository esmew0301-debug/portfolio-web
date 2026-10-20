"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Homepage project cards (reference: keithren.com "Latest Works" / "Other Selected Works"): a dark, double-framed
// card with the project's media on the left and its name, description and tag pills on the right.
// "large" is the highlighted showcase (Featured Work); "compact" is the condensed row (Playground, Web Design).

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
};

/** Pills toggle a highlighted (blue) state on click; the first carries the status dot. */
function Pills({ tags, compact }: { tags: string[]; compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("relative z-20 flex flex-wrap gap-2", compact ? "mt-4" : "mt-6")}>
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
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      style={{ objectPosition: item.imagePosition }}
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

export function ShowcaseCard({ item, variant = "large" }: { item: ShowcaseItem; variant?: "large" | "compact" }) {
  const compact = variant === "compact";
  return (
    <article
      data-reveal
      className={cn(
        "group relative border border-white/[0.07] bg-white/[0.02]",
        compact ? "rounded-[22px] p-1.5 md:p-2" : "rounded-[28px] p-2 md:p-2.5",
      )}
    >
      <div
        className={cn(
          "relative grid items-center overflow-hidden border border-white/10 bg-[linear-gradient(160deg,#1c1c1e_0%,#121213_55%,#0e0e0f_100%)]",
          compact
            ? "gap-6 rounded-[16px] p-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:p-5"
            : "gap-8 rounded-[20px] p-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14 md:p-8 lg:p-10",
        )}
      >
        <div
          data-cursor="view"
          className={cn(
            "relative overflow-hidden bg-neutral-900",
            compact ? "aspect-[16/10] rounded-[12px]" : "aspect-[4/3] rounded-[14px]",
          )}
        >
          <Media item={item} sizes={compact ? "(max-width:768px) 100vw, 480px" : "(max-width:768px) 100vw, 640px"} />
        </div>
        <div className={cn(compact ? "md:pr-4" : "md:pr-6")}>
          <p className="font-gilroy text-[13px] uppercase tracking-[0.22em] text-white/45">{item.eyebrow}</p>
          <h3
            className={cn(
              "font-blinker mt-3 font-medium tracking-[-0.01em] text-white",
              compact ? "text-[clamp(26px,3vw,36px)] leading-[1.1]" : "text-[clamp(32px,4.2vw,52px)] leading-[1.05]",
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "font-gilroy mt-4 max-w-[520px] text-white/55",
              compact ? "text-[15px] leading-relaxed" : "text-[15px] leading-relaxed md:text-[17px] md:leading-relaxed",
            )}
          >
            {item.description}
          </p>
          <Pills tags={item.tags} compact={compact} />
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

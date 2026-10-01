"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// One full-page screenshot shown whole — never cropped, split, or upscaled — with callouts
// beside it. Each callout marks the band of the page it describes ([start, end] as fractions
// of the image height) with a bracket on the image edge and an elbow arrow to its label.
// Several views (e.g. Before / After) can share one slot, switched with tabs.

export type Note = { at: [number, number]; title: string; text: string };
export type PageView = {
  tab: string;
  tone: "before" | "after";
  src: string;
  alt: string;
  /** Intrinsic pixel size of the image file. */
  w: number;
  h: number;
  /** Width to display it at, in CSS px. */
  width: number;
  notes: Note[];
  /** A phone screen: rounded 10px corners. */
  phone?: boolean;
};

const GAP = 64; // connector column width
const NOTE_W = 300;
const TONES = { before: "#f87171", after: "var(--accent-green)" } as const;

function View({ view }: { view: PageView }) {
  const imgBox = useRef<HTMLDivElement>(null);
  const noteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [layout, setLayout] = useState<{ H: number; tops: number[]; bottom: number } | null>(null);
  const color = TONES[view.tone];
  const width = view.width;

  const measure = useCallback(() => {
    const box = imgBox.current;
    if (!box) return;
    const H = box.getBoundingClientRect().height;
    const tops: number[] = [];
    let floor = 0;
    view.notes.forEach((n, i) => {
      const mid = ((n.at[0] + n.at[1]) / 2) * H;
      const h = noteRefs.current[i]?.offsetHeight ?? 80;
      const top = Math.max(mid - 18, floor);
      tops.push(top);
      floor = top + h + 14;
    });
    setLayout({ H, tops, bottom: floor - 14 });
  }, [view.notes]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (imgBox.current) ro.observe(imgBox.current);
    return () => ro.disconnect();
  }, [measure]);

  const lastBottom = layout?.bottom ?? 0;

  return (
    <div>
      <div
        className="mx-auto grid items-start md:[grid-template-columns:var(--cols)]"
        style={{ "--cols": `minmax(0, ${width}px) ${GAP}px ${NOTE_W}px`, maxWidth: width + GAP + NOTE_W } as React.CSSProperties}
      >
        {/* The page, whole */}
        <div className="relative mx-auto w-full" style={{ maxWidth: width }}>
          <div ref={imgBox} className={cn("relative", view.phone && "overflow-hidden rounded-[10px]")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={view.src}
              alt={view.alt}
              width={view.w}
              height={view.h}
              onLoad={measure}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          {/* Section brackets on the image's right edge, numbered */}
          {view.notes.map((n, i) => (
            <div
              key={n.title}
              aria-hidden
              className="pointer-events-none absolute -right-[3px] w-[5px] rounded-full"
              style={{ top: `${n.at[0] * 100}%`, height: `${(n.at[1] - n.at[0]) * 100}%`, background: color }}
            >
              <span
                className="font-gilroy absolute left-1/2 top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[10px] font-medium tabular-nums text-black"
                style={{ background: color }}
              >
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Connectors (desktop) */}
        <svg aria-hidden className="hidden h-full w-full overflow-visible md:block" style={{ height: layout ? Math.max(layout.H, lastBottom) : undefined }}>
          {layout &&
            view.notes.map((n, i) => {
              const y1 = ((n.at[0] + n.at[1]) / 2) * layout.H;
              const y2 = layout.tops[i] + 18;
              const mx = GAP / 2;
              return (
                <g key={n.title} stroke={color} fill="none" strokeWidth={1.25} opacity={0.9}>
                  <path d={`M 10 ${y1} H ${mx} V ${y2} H ${GAP - 6}`} />
                  <path d={`M ${GAP - 12} ${y2 - 5} L ${GAP - 6} ${y2} L ${GAP - 12} ${y2 + 5}`} />
                </g>
              );
            })}
        </svg>

        {/* Callouts (desktop: positioned beside their section) */}
        <div className="relative hidden md:block" style={{ height: layout ? Math.max(layout.H, lastBottom) : undefined }}>
          {view.notes.map((n, i) => (
            <div
              key={n.title}
              ref={(el) => {
                noteRefs.current[i] = el;
              }}
              className="absolute inset-x-0 rounded-[12px] border border-white/10 bg-white/[0.03] px-4 py-3.5"
              style={{ top: layout?.tops[i] ?? 0, visibility: layout ? "visible" : "hidden" }}
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-blinker text-[13px] font-medium tabular-nums" style={{ color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-blinker text-[16px] font-medium leading-snug text-white">{n.title}</span>
              </div>
              <p className="font-gilroy mt-1.5 text-[14px] leading-[1.55] text-neutral-400">{n.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Callouts (mobile: numbered list under the page) */}
      <ol className="mt-6 flex flex-col gap-3 md:hidden">
        {view.notes.map((n, i) => (
          <li key={n.title} className="rounded-[12px] border border-white/10 bg-white/[0.03] px-4 py-3.5">
            <div className="flex items-baseline gap-2.5">
              <span className="font-blinker text-[13px] font-medium tabular-nums" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-blinker text-[16px] font-medium text-white">{n.title}</span>
            </div>
            <p className="font-gilroy mt-1.5 text-[14px] leading-[1.55] text-neutral-400">{n.text}</p>
          </li>
        ))}
      </ol>

      <a
        href={view.src}
        target="_blank"
        rel="noopener noreferrer"
        className="font-gilroy mx-auto mt-5 block w-fit text-[12px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white"
      >
        View full size ↗
      </a>
    </div>
  );
}

export function AnnotatedPage({ views }: { views: PageView[] }) {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {views.map((v) => (
        <figure key={v.tab}>
          <div className="mb-6 flex items-center gap-3">
            <span
              className={cn(
                "font-gilroy inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] tracking-wide",
                v.tone === "before" ? "border border-white/15 text-neutral-300" : "text-white",
              )}
              style={v.tone === "after" ? { background: `color-mix(in srgb, ${TONES.after} 26%, transparent)` } : undefined}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: TONES[v.tone] }} />
              {v.tab}
            </span>
          </div>
          <View view={v} />
        </figure>
      ))}
    </div>
  );
}

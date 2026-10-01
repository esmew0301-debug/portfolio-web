"use client";

import { useRef, useState, type CSSProperties } from "react";

// Product screens as consistent "devices": every screen's main app window is drawn at exactly the
// same size and position inside a rounded bezel; anything that pokes out of the window in the source
// (modals, long lists, card rows) overflows the bezel naturally. Images are transparent cut-outs.

/** w/h: image size. win: the app window inside it [x, y, width, height] (width is always WIN_W). */
export type Frame = { src: string; w: number; h: number; win: [number, number, number, number] | null; alt: string };

const WIN_W = 1400;
const WIN_H = 1015; // shared window box height (most windows are 1015; ±2% differences fall inside it)
const PAD = 0.022; // bezel padding, as a fraction of the device width
const INNER = 1 - PAD * 2;

/** Position/size of a frame's image relative to its window box, in fractions of the window-box width. */
function place(f: Frame) {
  const [x, y] = f.win ?? [0, 0];
  return { left: -x / WIN_W, top: -y / WIN_W, width: f.w / WIN_W, height: f.h / WIN_W };
}

/** Extra space the overflowing parts need around the device, in fractions of the device width. */
export function overflow(f: Frame) {
  if (!f.win) return { left: 0, right: 0, bottom: Math.max(0, (f.h / f.w) - 1) };
  const p = place(f);
  const winBoxH = WIN_H / WIN_W;
  return {
    left: Math.max(0, -p.left * INNER - PAD),
    right: Math.max(0, (p.left + p.width - 1) * INNER - PAD),
    bottom: Math.max(0, (p.top + p.height - winBoxH) * INNER - PAD),
  };
}

export function Device({ frame, className, style }: { frame: Frame; className?: string; style?: CSSProperties }) {
  if (!frame.win) {
    // A free-floating panel (e.g. a modal exported on its own)
    return (
      <div className={className} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frame.src}
          alt={frame.alt}
          width={frame.w}
          height={frame.h}
          loading="lazy"
          draggable={false}
          className="block h-auto w-full rounded-[10px] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.35)]"
        />
      </div>
    );
  }
  const p = place(frame);
  return (
    <div className={className} style={style}>
      <div
        className="rounded-[22px] border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]"
        style={{ padding: `${PAD * 100}%` }}
      >
        <div className="relative w-full" style={{ aspectRatio: `${WIN_W} / ${WIN_H}` }}>
          <div className="absolute inset-0 rounded-[6px] bg-[#fbf8f5]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frame.src}
            alt={frame.alt}
            width={frame.w}
            height={frame.h}
            loading="lazy"
            draggable={false}
            className="absolute max-w-none select-none"
            style={{ left: `${p.left * 100}%`, top: `${(p.top * 100 * WIN_W) / WIN_H}%`, width: `${p.width * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * A row of devices that scrolls horizontally. Every window box has the same width and sits on the same
 * top line; overflowing parts get room below/right so nothing is clipped.
 */
export function DeviceStrip({ items }: { items: { frame: Frame; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const maxBottom = Math.max(...items.map((i) => overflow(i.frame).bottom));
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="[--fw:280px] md:[--fw:440px]">
      <div
        ref={ref}
        className="-mx-gutter overflow-x-auto px-gutter pb-4 [scrollbar-width:thin] md:-mx-gutter-lg md:px-gutter-lg"
      >
        <ol className="flex w-max snap-x snap-mandatory gap-10 pt-2 md:gap-14" style={{ paddingBottom: `calc(var(--fw) * ${maxBottom})` }}>
          {items.map(({ frame, label }, i) => {
            const o = overflow(frame);
            return (
              <li
                key={frame.src}
                className="shrink-0 snap-start"
                style={{ width: "var(--fw)", marginRight: `calc(var(--fw) * ${o.right})`, marginLeft: `calc(var(--fw) * ${o.left})` }}
              >
                <p className="font-gilroy mb-4 flex h-[42px] items-start gap-2.5 text-[14px] leading-[1.45] text-neutral-300">
                  <span className="font-blinker shrink-0 font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </p>
                <Device frame={frame} />
              </li>
            );
          })}
        </ol>
      </div>
      {items.length > 2 && (
        <div className="mt-2 flex items-center gap-3">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Scroll back" : "Scroll forward"}
              data-cursor-hover
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/[0.06]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d={d < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
          <span className="font-gilroy text-[12px] uppercase tracking-[0.2em] text-neutral-500">
            {items.length} screens · scroll →
          </span>
        </div>
      )}
    </div>
  );
}

// ---------- Showcase: a two-card stack with callouts (reference: annotated product boards) ----------

export type Placed = { frame: Frame; left: number; top: number; width: number }; // units: container width = 100
export type Callout = { on: number; fx: number; fy: number; text: string };

/** Window-fraction point on a placed device → container units. */
function point(d: Placed, fx: number, fy: number) {
  if (!d.frame.win) return { x: d.left + d.width * fx, y: d.top + d.width * (d.frame.h / d.frame.w) * fy };
  return {
    x: d.left + d.width * (PAD + INNER * fx),
    y: d.top + d.width * PAD + d.width * INNER * (WIN_H / WIN_W) * fy,
  };
}

/** Labels sit in one column at x = col, each level with its target where possible, never closer than `gap`. */
function layoutLabels(targets: { x: number; y: number }[], height: number, gap = 8) {
  const order = targets.map((t, i) => ({ i, y: t.y })).sort((a, b) => a.y - b.y);
  const ys: number[] = new Array(targets.length);
  let floor = 2;
  for (const o of order) {
    const y = Math.max(o.y, floor);
    ys[o.i] = y;
    floor = y + gap;
  }
  // if the column ran past the bottom, shift everything up evenly
  const over = Math.max(...ys) - (height - 5);
  if (over > 0) for (let k = 0; k < ys.length; k++) ys[k] = Math.max(2, ys[k] - over);
  return ys;
}

/**
 * Two devices stacked like cards. Only the front card shows its callouts; clicking the card behind pops
 * it forward and its callouts draw in from left to right.
 */
export function Showcase({
  height,
  devices,
  notes,
  initialFront = devices.length - 1,
  labelX = 84,
}: {
  height: number;
  devices: Placed[];
  notes: Callout[];
  initialFront?: number;
  labelX?: number;
}) {
  const [front, setFront] = useState(initialFront);
  const [flips, setFlips] = useState(0);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const visible = notes.filter((n) => n.on === front);
  const targets = visible.map((n) => point(devices[n.on], n.fx, n.fy));
  const labelYs = layoutLabels(targets, height);

  const bring = (i: number) => {
    if (i === front) return;
    setFront(i);
    setFlips((f) => f + 1);
  };

  return (
    <>
      {/* Desktop: the composed board */}
      <figure className="relative hidden w-full md:block" style={{ aspectRatio: `100 / ${height}` }}>
        {devices.map((d, i) => {
          const isFront = i === front;
          return (
            <button
              key={d.frame.src}
              type="button"
              onClick={() => bring(i)}
              aria-label={isFront ? `${d.frame.alt} (in front)` : `Bring forward: ${d.frame.alt}`}
              aria-pressed={isFront}
              data-cursor-hover
              className={`absolute block text-left ${isFront ? "cursor-default" : "cursor-pointer"}`}
              style={{
                left: pct(d.left, 100),
                top: pct(d.top, height),
                width: pct(d.width, 100),
                zIndex: isFront ? 3 : 1,
                animation: flips && isFront ? "card-to-front 0.75s cubic-bezier(0.22,1,0.36,1)" : flips ? "card-to-back 0.6s ease" : undefined,
              }}
            >
              <Device frame={d.frame} className={`transition-[filter] duration-500 ${isFront ? "" : "hover:brightness-105"}`} />
            </button>
          );
        })}

        {/* Callouts for the front card, revealed left → right */}
        <div
          key={front}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{ animation: "callouts-draw 1.6s cubic-bezier(0.45,0,0.25,1) 0.25s both" }}
        >
          <svg className="absolute inset-0 h-full w-full overflow-visible text-neutral-400" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
            {visible.map((n, k) => {
              const t = targets[k];
              const ly = labelYs[k];
              return (
                <path
                  key={k}
                  d={`M ${t.x} ${t.y} H ${labelX - 4 - k * 0.7} V ${ly} H ${labelX - 1}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          {visible.map((n, k) => (
            <span
              key={`d${k}`}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
              style={{ left: pct(targets[k].x, 100), top: pct(targets[k].y, height), background: "var(--accent-green)" }}
            />
          ))}
          {visible.map((n, k) => (
            <figcaption
              key={`t${k}`}
              className="font-gilroy absolute max-w-[220px] text-[15px] leading-[1.4] text-white"
              style={{ left: pct(labelX, 100), top: pct(labelYs[k], height), transform: "translateY(-0.7em)" }}
            >
              {n.text}
            </figcaption>
          ))}
        </div>
      </figure>
      <p className="font-gilroy mt-4 hidden text-[12px] uppercase tracking-[0.2em] text-neutral-500 md:block">
        Click the card behind to bring it forward
      </p>

      {/* Mobile: devices stacked, notes as a numbered list */}
      <div className="flex flex-col gap-8 md:hidden">
        {devices.map((d, i) => (
          <div key={d.frame.src}>
            <Device frame={d.frame} className={d.frame.win ? "" : "mx-auto w-[70%]"} />
            <ol className="mt-4 flex flex-col gap-2.5">
              {notes
                .filter((n) => n.on === i)
                .map((n, k) => (
                  <li key={k} className="font-gilroy grid grid-cols-[24px_1fr] text-[15px] leading-[1.5] text-neutral-300">
                    <span className="font-blinker font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                      {k + 1}
                    </span>
                    {n.text}
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
    </>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { CompareSlider } from "./phone-flow";
import { prefersReducedMotion } from "@/lib/utils";

// A centred before/after slider with callouts drawn out to both sides (desktop): version 1 notes on the left in
// the text colour (black on the light theme), version 2 notes on the right in orange. Lines draw outward from the
// screen when the figure scrolls into view (same reveal as the End of an Era callouts). Mobile: numbered lists.

export type CompareNote = {
  /** Point on the screen, as fractions of the screen's width / height. */
  fx: number;
  fy: number;
  text: ReactNode;
};

const ORANGE = "#f97316";

export function AnnotatedCompare({
  before,
  after,
  v1,
  v2,
  width = 340,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  v1: CompareNote[];
  v2: CompareNote[];
  width?: number;
}) {
  const fig = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number; W: number; H: number } | null>(null);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const el = fig.current;
    if (!el) return;
    const measure = () => {
      const s = el.querySelector<HTMLElement>("[role=slider]");
      if (!s) return;
      const f = el.getBoundingClientRect();
      const r = s.getBoundingClientRect();
      setBox({ x: r.left - f.left, y: r.top - f.top, w: r.width, h: r.height, W: f.width, H: f.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
      setShown(true);
      return;
    }
    const el = fig.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const OUT = 16; // first bend, just outside the screen
  const REACH = 130; // how far out the label column starts
  const LABEL_W = 230;
  const JITTER = [0, 22, -14, 30, 8];

  const side = (notes: CompareNote[], left: boolean) => {
    if (!box) return null;
    const color = left ? "var(--ink, #111111)" : ORANGE;
    const dir = left ? -1 : 1;
    const screenEdge = left ? box.x : box.x + box.w;
    const pts = notes.map((n) => ({ x: box.x + box.w * n.fx, y: box.y + box.h * n.fy }));
    // Label rows: start level with the target, then spread so they never sit closer than 64px.
    const order = pts.map((p, i) => ({ i, y: p.y })).sort((a, b) => a.y - b.y);
    const ly: number[] = [];
    let floor = -Infinity;
    for (const o of order) {
      const y = Math.max(o.y + (JITTER[o.i % JITTER.length] - 10) * 0.6, floor + 64);
      ly[o.i] = y;
      floor = y;
    }
    const labelEdge = screenEdge + dir * REACH;
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          clipPath: shown ? "inset(-40px -40px -40px -40px)" : left ? "inset(-40px -40px -40px 100%)" : "inset(-40px 100% -40px -40px)",
          transition: "clip-path 1.6s cubic-bezier(0.45,0,0.25,1) 0.35s",
        }}
      >
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${box.W} ${box.H}`}>
          {pts.map((p, k) => {
            // Irregular elbow: out of the screen, a slanted run to the label's row, then flat into the label.
            const j = JITTER[k % JITTER.length];
            const b1 = screenEdge + dir * (OUT + Math.abs(j) * 0.4);
            const b2 = screenEdge + dir * (REACH * 0.55 + j);
            return (
              <path
                key={k}
                d={`M ${p.x} ${p.y} H ${b1} L ${b2} ${ly[k]} H ${labelEdge}`}
                fill="none"
                stroke={color}
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
            );
          })}
        </svg>
        {pts.map((p, k) => (
          <span
            key={`d${k}`}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
            style={{ left: p.x, top: p.y, background: left ? "var(--ink, #111111)" : ORANGE }}
          />
        ))}
        {pts.map((p, k) => (
          <p
            key={`t${k}`}
            className={`font-gilroy absolute -translate-y-1/2 text-[15px] leading-[1.4] ${left ? "text-right" : ""}`}
            style={{
              top: ly[k],
              width: LABEL_W,
              left: left ? labelEdge - 10 - LABEL_W : labelEdge + 10,
              color: left ? "var(--ink, #111111)" : ORANGE,
            }}
          >
            {notes[k].text}
          </p>
        ))}
      </div>
    );
  };

  const list = (notes: CompareNote[], left: boolean) => (
    <ol className="flex flex-col gap-2">
      {notes.map((n, k) => (
        <li key={k} className="font-gilroy grid grid-cols-[22px_1fr] text-[15px] leading-[1.5]" style={{ color: left ? "var(--ink, #111111)" : undefined }}>
          <span className="font-medium tabular-nums" style={{ color: left ? "var(--ink, #111111)" : ORANGE }}>
            {k + 1}
          </span>
          <span style={left ? undefined : { color: ORANGE }}>{n.text}</span>
        </li>
      ))}
    </ol>
  );

  return (
    <div>
      <div ref={fig} className="relative mx-auto w-full">
        <CompareSlider before={before} after={after} beforeLabel="Version 1" afterLabel="Version 2" width={width} />
        {side(v1, true)}
        {side(v2, false)}
      </div>
      <div className="mx-auto mt-6 grid max-w-[420px] gap-5 md:hidden">
        {list(v1, true)}
        {list(v2, false)}
      </div>
    </div>
  );
}

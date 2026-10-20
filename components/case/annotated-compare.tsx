"use client";

import { useCallback, useId, useLayoutEffect, useState, type ReactNode } from "react";
import { CompareSlider } from "./phone-flow";
import { useScrollProgress } from "./vegan-kit";

// A centred before/after slider with callouts on both sides (desktop): version 1 notes on the left in black,
// version 2 notes on the right in orange. The callouts follow the divider: as the after image takes over, the
// version 1 callouts fold up (text → line → dot)
// and everything draws in as the screen scrolls into view; dragging back to the middle unfolds them again. Same on the
// right for version 2. Mobile: numbered lists under the slider.

export type CompareNote = {
  /** Point on the screen, as fractions of the screen's width / height. */
  fx: number;
  fy: number;
  text: ReactNode;
};

const ORANGE = "#f97316";
const INK = "#111111";
const EASE = "0.5s cubic-bezier(0.65,0,0.35,1)";
const clamp = (v: number) => Math.min(1, Math.max(0, v));

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
  const { ref: fig, p: scrolled } = useScrollProgress<HTMLDivElement>(0.85, 0.35);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number; W: number; H: number } | null>(null);
  const [pos, setPos] = useState(50);
  const onPos = useCallback((p: number) => setPos(p), []);
  const uid = useId().replace(/:/g, "");

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
  }, [fig]);

  const OUT = 16; // first bend, just outside the screen
  const REACH = 130; // how far out the label column starts
  const LABEL_W = 230;
  const JITTER = [0, 22, -14, 30, 8];

  const side = (notes: CompareNote[], left: boolean) => {
    if (!box) return null;
    const color = left ? INK : ORANGE;
    // How unfolded this side is: full at the middle, folded once the other version fills the screen.
    const f = Math.min(scrolled, clamp(left ? pos / 50 : (100 - pos) / 50));
    const mask = `ac-${left ? "l" : "r"}-${uid}`;
    const line = clamp(f / 0.6);
    const label = clamp((f - 0.55) / 0.45);
    const dir = left ? -1 : 1;
    const screenEdge = left ? box.x : box.x + box.w;
    const pts = notes.map((n) => ({ x: box.x + box.w * n.fx, y: box.y + box.h * n.fy }));
    // Label rows: start near the target, then spread so they never sit closer than 64px.
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
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${box.W} ${box.H}`}>
          {pts.map((p, k) => {
            // Irregular elbow: out of the screen, a slanted run to the label's row, then flat into the label.
            const j = JITTER[k % JITTER.length];
            const b1 = screenEdge + dir * (OUT + Math.abs(j) * 0.4);
            const b2 = screenEdge + dir * (REACH * 0.55 + j);
            const c = 26 * dir;
            return (
              <g key={k}>
                <mask id={`${mask}-${k}`} maskUnits="userSpaceOnUse">
                  <path
                    d={`M ${p.x} ${p.y} H ${b1} C ${b1 + c} ${p.y}, ${b2 - c} ${ly[k]}, ${b2} ${ly[k]} H ${labelEdge}`}
                    pathLength={1}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="8"
                    strokeDasharray="1 1"
                    style={{ strokeDashoffset: 1 - line, transition: `stroke-dashoffset ${EASE}` }}
                  />
                </mask>
                <path
                  d={`M ${p.x} ${p.y} H ${b1} C ${b1 + c} ${p.y}, ${b2 - c} ${ly[k]}, ${b2} ${ly[k]} H ${labelEdge}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 5"
                  mask={`url(#${mask}-${k})`}
                  style={{ filter: `drop-shadow(0 3px 3px ${left ? "rgba(0,0,0,0.22)" : "rgba(249,115,22,0.35)"})` }}
                />
              </g>
            );
          })}
        </svg>
        {pts.map((p, k) => (
          <span
            key={`d${k}`}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
            style={{ left: p.x, top: p.y, background: color, opacity: scrolled > 0.05 ? 1 : 0, transition: `opacity ${EASE}` }}
          />
        ))}
        {pts.map((p, k) => (
          <p
            key={`t${k}`}
            className={`font-gilroy absolute text-[15px] leading-[1.4] ${left ? "text-right" : ""}`}
            style={{
              top: ly[k],
              width: LABEL_W,
              left: left ? labelEdge - 10 - LABEL_W : labelEdge + 10,
              color,
              opacity: label,
              transform: `translate(${(1 - label) * -dir * 18}px, -50%)`,
              transition: `opacity ${EASE}, transform ${EASE}`,
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
        <li key={k} className="font-gilroy grid grid-cols-[22px_1fr] text-[15px] leading-[1.5]" style={{ color: left ? INK : ORANGE }}>
          <span className="font-medium tabular-nums">{k + 1}</span>
          <span>{n.text}</span>
        </li>
      ))}
    </ol>
  );

  return (
    <div>
      <div ref={fig} className="relative mx-auto w-full">
        <CompareSlider before={before} after={after} beforeLabel="Version 1" afterLabel="Version 2" width={width} onPos={onPos} device />
        {side(v1, true)}
        {side(v2, false)}
      </div>
      <div className="mx-auto mt-6 grid max-w-[420px] gap-5 xl:hidden">
        {list(v1, true)}
        {list(v2, false)}
      </div>
    </div>
  );
}

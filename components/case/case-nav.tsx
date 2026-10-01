"use client";

import { useEffect, useState } from "react";

export type CaseNavItem = { id: string; label: string; index?: string };

// Fixed section index on the left: appears once reading starts, tracks the active section,
// and reveals labels on hover.
export function CaseNav({ items, endId }: { items: CaseNavItem[]; endId?: string }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    const first = sections[0];
    const onScroll = () => {
      const started = !first || first.getBoundingClientRect().top <= 0.5 * window.innerHeight;
      const end = endId ? document.getElementById(endId) : null;
      const ended = !!end && end.getBoundingClientRect().top <= 0.75 * window.innerHeight;
      setVisible(started && !ended);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = sections.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [items, endId]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Case study sections"
      onMouseEnter={() => document.documentElement.classList.add("nav-hovering")}
      onMouseLeave={() => document.documentElement.classList.remove("nav-hovering")}
      className={`case-aside nav-native-cursor group fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      } transition-opacity duration-500`}
    >
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="flex items-center gap-3" title={item.label}>
              <span
                className={`h-px shrink-0 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-white" : "w-4 bg-neutral-600 group-hover:bg-neutral-500"
                }`}
              />
              <span
                className={`font-gilroy max-w-0 overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-[0.14em] opacity-0 transition-all duration-300 group-hover:max-w-[240px] group-hover:opacity-100 ${
                  i === active ? "text-white" : "text-neutral-500"
                }`}
              >
                {item.index && <span className="mr-2 tabular-nums opacity-60">{item.index}</span>}
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

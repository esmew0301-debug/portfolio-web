"use client";

import { useEffect, useState } from "react";

// Light/dark switch for case-study pages. Sets html[data-case-theme]; the light palette lives in
// globals.css and only applies inside .case-sheet / .case-aside, so site chrome is unaffected.
// Light is the default; a visitor's choice is remembered across project pages. The root layout applies the
// saved choice before first paint so a project page never flashes the wrong theme.
// Renamed from "case-theme" when light became the default, so earlier dark choices don't carry over.
export const CASE_THEME_KEY = "case-theme-v2";

/** `initial` applies only when the visitor has never chosen a theme; `storageKey` keeps a page's choice separate. */
export function ThemeToggle({
  initial = "light",
  storageKey = CASE_THEME_KEY,
}: {
  initial?: "dark" | "light";
  storageKey?: string;
}) {
  const [light, setLight] = useState(initial === "light");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only
    setLight(saved ? saved === "light" : initial === "light");
    return () => {
      document.documentElement.removeAttribute("data-case-theme");
    };
  }, [initial, storageKey]);

  useEffect(() => {
    // Set explicitly either way: the Design page is light unless this says "dark".
    document.documentElement.setAttribute("data-case-theme", light ? "light" : "dark");
  }, [light]);

  const toggle = () => {
    const next = !light;
    setLight(next);
    try {
      localStorage.setItem(storageKey, next ? "light" : "dark");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={light}
      title={light ? "Dark mode" : "Light mode"}
      data-cursor-hover
      className={`nav-native-cursor fixed right-5 top-[96px] z-[60] grid h-11 w-11 place-items-center rounded-full border shadow-lg backdrop-blur-md transition-colors duration-300 md:right-6 ${
        light ? "border-black/10 bg-white/80 text-neutral-900 hover:bg-white" : "border-white/15 bg-black/50 text-white hover:bg-black/70"
      }`}
    >
      {light ? (
        // moon — switch back to dark
        <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ) : (
        // sun — switch to light
        <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

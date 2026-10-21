"use client";

import { useEffect } from "react";

// Keeps case-study pages in their light palette (globals.css, scoped to .case-sheet / .case-aside). The visitor-facing
// light/dark button was removed; the root layout also sets light before first paint.
/**
 * Case-study pages are light only: the dark/light button was removed. This keeps html[data-case-theme="light"] set
 * while the page is open (the light palette in globals.css depends on it) and renders nothing.
 */
export function ThemeToggle() {
  useEffect(() => {
    document.documentElement.setAttribute("data-case-theme", "light");
    return () => {
      document.documentElement.removeAttribute("data-case-theme");
    };
  }, []);
  return null;
}

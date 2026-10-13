"use client";

import { cn } from "@/lib/utils";

// English / 中文 switch. The page holds both languages; this flips the data-lang attribute on <html> (CSS shows the
// matching copy), remembers the choice, and tells listeners (e.g. NoWidows) that the visible text changed.
export function setLang(zh: boolean) {
  const root = document.documentElement;
  if (zh) root.setAttribute("data-lang", "zh");
  else root.removeAttribute("data-lang");
  root.lang = zh ? "zh-CN" : "en";
  try {
    localStorage.setItem("lang", zh ? "zh" : "en");
  } catch {}
  window.dispatchEvent(new Event("langchange"));
}

export function LangToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => setLang(document.documentElement.getAttribute("data-lang") !== "zh")}
      data-cursor-hover
      className={cn(
        "font-gilroy relative inline-flex items-center rounded-full border border-white/25 px-2.5 py-1 text-[13px] leading-none text-white transition-colors duration-300 hover:border-white/60 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        className,
      )}
    >
      <span data-l="en">
        <span className="sr-only">Switch language to </span>
        <span lang="zh-CN">中文</span>
      </span>
      <span data-l="zh" lang="zh-CN">
        <span className="sr-only">切换到</span>
        <span lang="en">EN</span>
      </span>
    </button>
  );
}

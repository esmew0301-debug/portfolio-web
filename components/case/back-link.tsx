"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

// Fades the screen to black before navigating back.
export function BackLink({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  return (
    <>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          setLeaving(true);
          window.setTimeout(() => router.push(href), 200);
        }}
        className={className}
      >
        {children}
      </a>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[300] bg-black transition-opacity duration-200 ease-out"
        style={{ opacity: leaving ? 1 : 0 }}
      />
    </>
  );
}

export function BackToTop() {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        data-cursor-hover
        className="font-gilroy group inline-flex flex-col items-center gap-3 text-[12px] uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-300 hover:text-white"
      >
        <span aria-hidden className="text-[18px] leading-none transition-transform duration-300 group-hover:-translate-y-1">
          ↑
        </span>
        Back to top
      </button>
    </div>
  );
}

import type { ReactNode } from "react";

// Compact section header for the homepage work sections (reference: keithren.com "• Highlighted / Latest Works"):
// a small dotted eyebrow, a modest title, a short muted intro, then a hairline.
export function SectionHeader({ eyebrow, title, intro }: { eyebrow: ReactNode; title: ReactNode; intro?: ReactNode }) {
  return (
    <div className="border-b border-white/10 pb-8 md:pb-10">
      <p data-reveal className="font-gilroy flex items-center gap-2.5 text-[15px] text-white/50">
        <span className="dot-loop h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-green)" }} />
        {eyebrow}
      </p>
      <h2 data-reveal className="font-blinker mt-2 text-[34px] leading-[1.15] tracking-[-0.01em] text-white">
        {title}
      </h2>
      {intro && (
        <p data-reveal className="font-gilroy mt-3 max-w-[640px] text-[16px] leading-relaxed text-white/50">
          {intro}
        </p>
      )}
    </div>
  );
}

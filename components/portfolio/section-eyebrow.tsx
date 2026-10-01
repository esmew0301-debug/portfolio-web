export function SectionEyebrow({ children }: { children: string }) {
  return (
    <p
      data-reveal
      className="font-gilroy mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/50"
    >
      <span className="dot-loop h-2 w-2 rounded-full" style={{ background: "var(--accent-green)" }} />
      {children}
    </p>
  );
}

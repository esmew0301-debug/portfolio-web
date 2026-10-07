import { Children, Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

// Typography and layout primitives for case study pages. Class values follow the
// editorial system of the reference case study (jingjinghan.com/work/first-movers).

const TWO_COL = "grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,0.78fr)_1.22fr] md:gap-16";

/** Wraps each child in a Reveal with a small cascading delay. */
function Staggered({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => (
        <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-page px-gutter md:px-gutter-lg", className)}>{children}</div>;
}

function SectionLabel({ index, label }: { index?: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      {index && (
        <span className="font-blinker text-[clamp(36px,4vw,68px)] font-medium leading-none text-white/[0.16]">{index}</span>
      )}
      <span className="font-gilroy text-[13px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
    </div>
  );
}

type SectionProps = { id?: string; index?: string; label: string; title?: ReactNode; children: ReactNode };

/** Numbered section: sticky rail on the left, the story on the right. */
export function Section({ id, index, label, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/[0.08] py-section md:py-section-lg">
      <Container>
        <div className={TWO_COL}>
          <div className="md:sticky md:top-24 md:self-start">
            <SectionLabel index={index} label={label} />
            <h2 className="mt-4 font-blinker max-w-[26ch] text-[clamp(19px,1.7vw,26px)] font-medium leading-[1.25] tracking-[-0.01em] text-white">
              {title}
            </h2>
          </div>
          <Staggered className="flex min-w-0 flex-col gap-9 md:pt-1">{children}</Staggered>
        </div>
      </Container>
    </section>
  );
}

/** Full-width section with a larger headline, for chapters that need the whole page width. */
export function WideSection({ id, index, label, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/[0.08] py-section md:py-section-lg">
      <Container>
        <SectionLabel index={index} label={label} />
        {title && (
          <h2 className="mt-4 font-blinker max-w-[34ch] text-[clamp(24px,3vw,44px)] font-medium leading-[1.1] tracking-[-0.01em] text-white">
            {title}
          </h2>
        )}
        <div className="mt-10 flex flex-col gap-9 md:mt-14">{children}</div>
      </Container>
    </section>
  );
}

/** A chapter inside a wide section: its own sticky sub-heading beside the content. */
export function SubSection({ label, title, children }: { label: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className={cn(TWO_COL, "border-t border-white/[0.08] pt-12 md:pt-16")}>
      <div className="md:sticky md:top-24 md:self-start">
        <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
        <h3 className="mt-3 font-blinker max-w-[22ch] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
          {title}
        </h3>
      </div>
      <Staggered className="flex min-w-0 flex-col gap-9 md:pt-1">{children}</Staggered>
    </div>
  );
}

/** Stacks children with reveal, for use directly inside a WideSection. */
export function Stack({ children, className }: { children: ReactNode; className?: string }) {
  return <Staggered className={cn("flex flex-col gap-9", className)}>{children}</Staggered>;
}

export function P({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <p className={cn("font-gilroy text-[17px] leading-[1.75] text-neutral-400 md:text-[19px]", !wide && "max-w-[62ch]")}>
      {children}
    </p>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h4 className={cn("font-gilroy mb-4 text-[12px] uppercase tracking-[0.25em] text-neutral-500", className)}>{children}</h4>
  );
}

/** Large statement with a left rule — core problem, insight, decision. */
export function Pull({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className="my-1 border-l-2 border-white/20 pl-6 md:my-3 md:pl-8">
      <div className="mb-4">
        <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      </div>
      <div
        className={cn(
          "font-sulphur space-y-4 text-[clamp(22px,2.6vw,38px)] leading-[1.15] tracking-[-0.01em] text-white",
          !wide && "max-w-[36ch]",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Page-width typographic statement for the project's central principles. */
export function Statement({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="py-4 md:py-8">
      {label && <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>}
      <p className="font-sulphur mt-5 max-w-[24ch] text-[clamp(32px,4.4vw,64px)] leading-[1.06] tracking-[-0.02em] text-white">
        {children}
      </p>
    </div>
  );
}

/** A spoken request or example prompt. */
export function Utterance({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-8">
      {label && <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>}
      <p className="font-sulphur mt-3 text-[clamp(20px,2vw,28px)] leading-[1.3] tracking-[-0.01em] text-white">
        {children}
      </p>
    </div>
  );
}

export function Chip({ children, variant = "flow" }: { children: ReactNode; variant?: "flow" | "tag" | "role" }) {
  return (
    <span
      className={cn(
        "font-gilroy inline-flex items-center rounded-chip border text-neutral-300 transition-colors",
        variant === "flow" && "px-4 py-2 text-[14px] border-white/12 bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.3)]",
        variant === "tag" && "px-4 py-2 text-[14px] border-white/12 bg-white/[0.03]",
        variant === "role" && "px-3 py-1 text-[13px] border-white/15 bg-transparent",
      )}
    >
      {children}
    </span>
  );
}

/** Horizontal step sequence: A → B → C. */
export function ChipFlow({ label, steps }: { label?: string; steps: string[] }) {
  return (
    <div>
      {label && <Eyebrow>{label}</Eyebrow>}
      <div className="flex flex-wrap items-center gap-y-2">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center">
            <Chip>{s}</Chip>
            {i < steps.length - 1 && (
              <span className="px-2 text-[16px]" style={{ color: "var(--accent-green)" }}>
                →
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ChipGroup({ label, items }: { label?: string; items: string[] }) {
  return (
    <div>
      {label && <Eyebrow>{label}</Eyebrow>}
      <div className="flex flex-wrap gap-2.5">
        {items.map((s) => (
          <Chip key={s} variant="tag">
            {s}
          </Chip>
        ))}
      </div>
    </div>
  );
}

/** Numbered card grid. */
export function Cards({
  items,
  columns = 2,
}: {
  items: { index?: string; title: string; body: ReactNode }[];
  columns?: 1 | 2 | 3 | 4;
}) {
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={cn("grid gap-4", cols)}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.08}>
          <div className="rounded-card border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 h-full">
            {it.index && (
              <span className="font-blinker block text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                {it.index}
              </span>
            )}
            <h5 className="font-blinker mt-1.5 text-[18px] font-medium leading-tight text-white md:text-[20px]">
              {it.title}
            </h5>
            <div className="font-gilroy mt-3 space-y-3 text-[15px] leading-[1.6] text-neutral-400">{it.body}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Two contrasting panels: a light one and a dark, emphasised one. */
export function Contrast({
  left,
  right,
}: {
  left: { label: string; items: ReactNode };
  right: { label: string; items: ReactNode };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6 md:p-7">
        <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-400">{left.label}</span>
        <div className="font-gilroy mt-3 text-[16px] leading-[1.6] text-neutral-400 md:text-[18px]">{left.items}</div>
      </div>
      <div className="case-keep-dark rounded-panel border border-white/10 bg-[#1c1c1c] p-6 text-white md:p-7">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-green)" }} />
          <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-white/60">{right.label}</span>
        </div>
        <div className="font-gilroy mt-3 text-[16px] leading-[1.6] text-white/90 md:text-[18px]">{right.items}</div>
      </div>
    </div>
  );
}

/**
 * Reserved image slot. Holds the layout and proportions of a future visual; contains no image.
 */
export function Placeholder({
  title,
  description,
  format,
  ratio = "16 / 9",
  tone = "light",
  className,
  style,
}: {
  title: string;
  description: string;
  format: string;
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
}) {
  const dark = tone === "dark";
  return (
    <figure
      role="img"
      aria-label={`Image placeholder: ${title}`}
      data-placeholder={title}
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-card border border-dashed",
        dark ? "border-white/15 bg-white/[0.06]" : "border-white/15 bg-white/[0.03]",
        className,
      )}
      style={{ aspectRatio: ratio, ...style }}
    >
      <div className="flex max-w-[52ch] flex-col items-center px-6 text-center">
        <span className="font-gilroy text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          [Image placeholder — {title}]
        </span>
        <span className="font-gilroy mt-4 text-[14px] leading-[1.6] text-neutral-500 md:text-[15px]">{description}</span>
        <span className="font-gilroy mt-3 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
          Recommended format: {format}
        </span>
      </div>
    </figure>
  );
}

/** Inline arrow sequence rendered as large type, e.g. EXPRESS → PLAN → DRIVE → ADAPT. */
export function BigSequence({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6">
      {steps.map((s, i) => (
        <Fragment key={s}>
          <span className="font-blinker text-[clamp(32px,5.4vw,80px)] font-medium leading-none tracking-[-0.02em] text-white">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="font-blinker text-[clamp(24px,3.6vw,52px)] leading-none" style={{ color: "var(--accent-green)" }}>
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/** A key phrase inside running text: quoted, italic, underlined. */
export function Q({ children }: { children: ReactNode }) {
  return (
    <span className="italic text-white underline decoration-[var(--accent-green)] decoration-1 underline-offset-[5px]">
      “{children}”
    </span>
  );
}

/** A bordered callout for a statement that should not be lost in the prose. */
export function Box({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-card border border-white/15 p-6 md:p-8" style={{ borderLeft: "2px solid var(--accent-green)" }}>
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em]" style={{ color: "var(--accent-green)" }}>
        {label}
      </span>
      <p className="font-sulphur mt-3 text-[clamp(19px,1.8vw,25px)] leading-[1.35] tracking-[-0.01em] text-white">{children}</p>
    </div>
  );
}

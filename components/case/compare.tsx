import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Before/after presentation modules for website case studies. Page screenshots are shown
// whole: long pages sit in a fixed-height window and scroll through on hover (or by touch).

export type PageShot = { src: string; alt: string };

function Tag({ tone, children }: { tone: "before" | "after"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "font-gilroy inline-flex w-fit self-start items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em]",
        tone === "before" ? "border border-white/15 text-neutral-400" : "text-white",
      )}
      style={tone === "after" ? { background: "color-mix(in srgb, var(--accent-green) 28%, transparent)" } : undefined}
    >
      {tone === "after" && <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-green)" }} />}
      {children}
    </span>
  );
}

/** A browser-like window showing a full page; hovering scrolls from top to bottom. */
export function PageFrame({ shot, height = 560, className }: { shot: PageShot; height?: number; className?: string }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[14px] border border-white/10 bg-white [@media(hover:none)]:overflow-y-auto",
        className,
      )}
      style={{ height, "--fh": `${height}px` } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:duration-[7000ms] group-hover:ease-in-out group-hover:[transform:translateY(min(0px,calc(-100%+var(--fh))))]"
      />
    </div>
  );
}

/** Two pages side by side, labelled Before / After, each with a one-line note. */
export function BeforeAfter({
  before,
  after,
  beforeNote,
  afterNote,
  height = 560,
  scroll = true,
}: {
  before: PageShot;
  after: PageShot;
  beforeNote: string;
  afterNote: string;
  height?: number;
  /** false: show only the first screen of each page (object-top crop), no hover scroll. */
  scroll?: boolean;
}) {
  const side = (tone: "before" | "after", shot: PageShot, note: string) => (
    <figure className="flex min-w-0 flex-col gap-4">
      <Tag tone={tone}>{tone === "before" ? "Before" : "After"}</Tag>
      {scroll ? (
        <PageFrame shot={shot} height={height} />
      ) : (
        <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-white" style={{ aspectRatio: "4 / 3" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      )}
      <figcaption className="font-gilroy text-[15px] leading-[1.6] text-neutral-400">{note}</figcaption>
    </figure>
  );
  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 md:gap-6 lg:gap-10">
        {side("before", before, beforeNote)}
        {side("after", after, afterNote)}
      </div>
      {scroll && (
        <p className="font-gilroy mt-5 hidden text-[12px] uppercase tracking-[0.2em] text-neutral-600 [@media(hover:hover)]:block">
          Hover a page to scroll through it
        </p>
      )}
    </div>
  );
}

/** Colour-coded callout: Key Insight (blue) or Opportunity (green). */
export function Callout({ kind, children }: { kind: "insight" | "opportunity"; children: ReactNode }) {
  const color = kind === "insight" ? "#3b82f6" : "#22c55e";
  return (
    <div
      className="rounded-card border-l-2 p-6 md:p-8"
      style={{ borderColor: color, background: `color-mix(in srgb, ${color} 9%, var(--case-bg, #0b0b0b))` }}
    >
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em]" style={{ color }}>
        {kind === "insight" ? "Key Insight" : "Opportunity"}
      </span>
      <p className="font-sulphur mt-4 text-[clamp(20px,2vw,28px)] leading-[1.3] tracking-[-0.01em] text-white">{children}</p>
    </div>
  );
}

/** Design-process timeline as a table. */
export function ProcessTable({ rows }: { rows: { phase: string; focus: string; methods: string; deliverables: string }[] }) {
  const head = ["Phase", "Focus", "Methods", "Deliverables"];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/15">
            {head.map((h) => (
              <th key={h} className="font-gilroy py-4 pr-6 text-[12px] font-normal uppercase tracking-[0.2em] text-neutral-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.phase} className="border-b border-white/10 align-top">
              <td className="py-5 pr-6">
                <span className="font-blinker mr-3 text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-blinker whitespace-nowrap text-[18px] font-medium text-white">{r.phase}</span>
              </td>
              <td className="font-gilroy py-5 pr-6 text-[15px] leading-[1.6] text-neutral-300">{r.focus}</td>
              <td className="font-gilroy py-5 pr-6 text-[15px] leading-[1.6] text-neutral-400">{r.methods}</td>
              <td className="font-gilroy py-5 text-[15px] leading-[1.6] text-neutral-400">{r.deliverables}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Ranked share of reported issues, as labelled horizontal bars. */
export function IssueBars({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ol className="flex flex-col gap-5">
      {items.map((it, i) => (
        <li key={it.label}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-gilroy text-[16px] text-neutral-200 md:text-[17px]">
              <span className="mr-3 tabular-nums text-neutral-500">{String(i + 1).padStart(2, "0")}</span>
              {it.label}
            </span>
            <span className="font-blinker text-[22px] font-medium tabular-nums text-white">{it.value}%</span>
          </div>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: "var(--accent-green)", opacity: 1 - i * 0.15 }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

type FlowStep = { page: string; label: string };

function FlowRow({ tone, title, steps, end }: { tone: "before" | "after"; title: string; steps: FlowStep[]; end?: ReactNode }) {
  const arrow = (
    <span
      aria-hidden
      className="shrink-0 self-center rotate-90 md:rotate-0"
      style={{ color: tone === "after" ? "var(--accent-green)" : "rgb(115 115 115)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Tag tone={tone}>{tone === "before" ? "Before" : "After"}</Tag>
        <span className="font-gilroy text-[15px] text-neutral-300">{title}</span>
      </div>
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-start">
        {steps.map((s, i) => (
          <Fragment key={s.label}>
            <div
              className={cn(
                "flex w-full flex-col gap-2 rounded-[12px] border p-4 md:w-[200px] md:shrink-0",
                tone === "before" ? "border-white/10 bg-white/[0.02]" : "border-white/15 bg-white/[0.04]",
              )}
            >
              <span className="font-blinker text-[18px] font-medium text-white">{s.page}</span>
              <span className="font-gilroy text-[14px] leading-[1.45] text-neutral-400">{s.label}</span>
            </div>
            {(i < steps.length - 1 || end) && arrow}
          </Fragment>
        ))}
        {end}
      </div>
    </div>
  );
}

/** Old path vs new path, each as a row of page thumbnails. */
export function FlowCompare({
  before,
  after,
}: {
  before: { title: string; steps: FlowStep[]; deadEnd: string };
  after: { title: string; steps: FlowStep[] };
}) {
  return (
    <div className="flex flex-col gap-12 rounded-[28px] border border-white/10 bg-white/[0.02] p-5 md:p-10">
      <FlowRow
        tone="before"
        title={before.title}
        steps={before.steps}
        end={
          <div className="flex w-full items-center justify-center rounded-[12px] border border-dashed border-[#ef4444]/50 p-4 text-center md:w-[200px] md:shrink-0 md:self-stretch">
            <span className="font-gilroy text-[14px] leading-[1.5] text-[#fca5a5]">{before.deadEnd}</span>
          </div>
        }
      />
      <div className="border-t border-white/10" />
      <FlowRow tone="after" title={after.title} steps={after.steps} />
    </div>
  );
}

/** Large numbered results. */
export function Achievements({ items }: { items: { stat: string; label: string; body: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {items.map((it, i) => (
        <li key={it.label} className="flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <span className="font-blinker text-[14px] font-medium tabular-nums" style={{ color: "var(--accent-green)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-blinker mt-4 text-[clamp(44px,5vw,72px)] font-medium leading-none tracking-[-0.02em] text-white">{it.stat}</span>
          <span className="font-blinker mt-3 text-[18px] font-medium leading-tight text-white md:text-[20px]">{it.label}</span>
          <p className="font-gilroy mt-3 text-[15px] leading-[1.6] text-neutral-400">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

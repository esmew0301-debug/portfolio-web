"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

// Presentation modules for case-study screens. Screenshots are final artifacts: they are only
// scaled (never cropped or restyled). `w`/`h` give each frame's size on a shared scale so frames of
// one sequence line up, including content that sits outside the display (chat bubbles, panels).

export type Screen = {
  src: string;
  w: number;
  h: number;
  alt: string;
  step?: string;
  detail?: string;
  /** CSS border-radius matching the corners baked into a phone image; phones with one get the framed look. */
  radius?: string;
};

const TINT =
  "color-mix(in srgb, var(--accent-green) 9%, var(--case-bg, #0b0b0b))";
const SLIDE_MS = 700;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Auto-advancing loop (one frame every `interval` ms while visible) with a seamless wrap. */
function useLoop(count: number, interval = 3000) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0); // 0..count; `count` is the cloned first frame
  const [animate, setAnimate] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const playing = count > 1 && inView && !reduced;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
    setReduced(prefersReducedMotion());
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, interval);
    return () => window.clearTimeout(t);
  }, [playing, index, interval]);

  // After sliding onto the clone, jump back to the real first frame without animating.
  const onSlideEnd = () => {
    if (index < count) return;
    setAnimate(false);
    setIndex(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
  };

  const go = (i: number) => {
    setAnimate(true);
    setIndex(i);
  };

  return {
    ref,
    index,
    shown: index % count,
    animate,
    playing,
    interval,
    onSlideEnd,
    go,
  };
}

type Loop = Omit<ReturnType<typeof useLoop>, "ref">;

// One shared stage for every in-vehicle sequence, in 882px-screen units: the main display is
// always the same size and position (centered, top-aligned); floating cards and chat bubbles
// that extend past it (up to 214 units right, 50 below) have room without shifting the screen.
const HMI_STAGE = { w: 1310, h: 558, x: 214 };
/** The car screen inside every in-vehicle image (top-left, 882 x 508) and the room left above it for its frame. */
const HMI_SCREEN = { w: 882, h: 508, top: 24 };  // top: room above the screen for its bezel
const PHONE_RADIUS = "10px";
/** Room around a framed phone, in its 1000-tall units: border + drop shadow (see .phone-shell). */
const PHONE_PAD = { x: 40, top: 16, bottom: 64 };

/** The sliding stage: one frame visible, horizontal slide between frames. */
function Track({
  frames,
  loop,
  center,
  hmi,
}: {
  frames: Screen[];
  loop: Loop;
  center?: boolean;
  hmi?: boolean;
}) {
  // Framed phones need room inside the clipping stage for their border and drop shadow.
  const pad = center ? PHONE_PAD : hmi ? { x: 0, top: HMI_SCREEN.top, bottom: 0 } : { x: 0, top: 0, bottom: 0 };
  const stageW = hmi ? HMI_STAGE.w : Math.max(...frames.map((f) => f.w)) + pad.x * 2;
  const stageH = hmi ? HMI_STAGE.h + pad.top : Math.max(...frames.map((f) => f.h)) + pad.top + pad.bottom;
  const slides = frames.length > 1 ? [...frames, frames[0]] : frames;
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${stageW} / ${stageH}` }}
    >
      <div
        className="flex h-full"
        onTransitionEnd={loop.onSlideEnd}
        style={{
          transform: `translateX(-${loop.index * 100}%)`,
          transition: loop.animate ? `transform ${SLIDE_MS}ms ${EASE}` : "none",
        }}
      >
        {slides.map((f, i) => (
          <div
            key={i}
            className="relative h-full w-full shrink-0"
            aria-hidden={i % frames.length !== loop.shown}
          >
            {hmi && (
              // Frame + drop shadow around the car screen only, drawn underneath the image, so cards and
              // bubbles that pop out past the screen sit on top of it, outside the frame.
              <div
                aria-hidden
                className="screen-shell absolute"
                style={{
                  left: `${(HMI_STAGE.x / stageW) * 100}%`,
                  top: `${(HMI_SCREEN.top / stageH) * 100}%`,
                  width: `${(HMI_SCREEN.w / stageW) * 100}%`,
                  height: `${(HMI_SCREEN.h / stageH) * 100}%`,
                }}
              />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.src}
              alt={i < frames.length ? f.alt : ""}
              loading="eager"
              decoding="async"
              draggable={false}
              className={cn("absolute select-none", center && f.radius && "phone-shell")}
              style={{
                left: hmi
                  ? `${(HMI_STAGE.x / stageW) * 100}%`
                  : center
                    ? `${((stageW - f.w) / 2 / stageW) * 100}%`
                    : 0,
                top: `${(pad.top / stageH) * 100}%`,
                width: `${(f.w / stageW) * 100}%`,
                height: `${(f.h / stageH) * 100}%`,
                borderRadius: center ? (f.radius ?? PHONE_RADIUS) : undefined,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Progress({ active, loop }: { active: boolean; loop: Loop }) {
  return (
    <span className="relative block h-px w-full overflow-hidden bg-white/15">
      {active && (
        <span
          key={`${loop.shown}-${loop.playing}`}
          className="absolute inset-0 origin-left"
          style={{
            background: "var(--accent-green)",
            animation: loop.playing
              ? `seq-progress ${loop.interval}ms linear forwards`
              : undefined,
            transform: loop.playing ? undefined : "scaleX(1)",
          }}
        />
      )}
    </span>
  );
}

/** Wide sequence of in-vehicle screens with labelled steps underneath. */
export function Slideshow({
  frames,
  caption,
  className,
}: {
  frames: Screen[];
  caption?: string;
  className?: string;
}) {
  const { ref, ...loop } = useLoop(frames.length);
  return (
    <figure ref={ref} className={className}>
      <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-3 sm:p-5 md:p-8">
        <Track frames={frames} loop={loop} hmi />
      </div>
      <figcaption>
        {frames.length > 1 && (
          <ol
            className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
            style={{ "--steps": frames.length } as CSSProperties}
          >
            {frames.map((f, i) => (
              <li key={f.src}>
                <button
                  type="button"
                  onClick={() => loop.go(i)}
                  aria-current={i === loop.shown ? "step" : undefined}
                  data-cursor-hover
                  className="group flex w-full flex-col gap-2.5 text-left"
                >
                  <Progress active={i === loop.shown} loop={loop} />
                  <span
                    className={cn(
                      "font-gilroy text-[12px] leading-[1.4] transition-colors duration-300 md:text-[14px]",
                      i === loop.shown
                        ? "text-white"
                        : "text-neutral-500 group-hover:text-neutral-300",
                    )}
                  >
                    <span className="mr-1.5 tabular-nums opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.step}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}
        {caption && (
          <p className="font-gilroy mt-5 max-w-[72ch] text-[15px] leading-[1.6] text-neutral-400">
            {caption}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

/** A phone flow: the phone on one side, the steps it walks through on the other, kept in sync. */
export function PhoneStory({
  frames,
  eyebrow,
  title,
  reverse,
  video,
}: {
  frames: Screen[];
  eyebrow: string;
  title: string;
  reverse?: boolean;
  /** Play a recorded demo of the flow instead of the stills; the steps follow the video (start time per step, s). */
  video?: { src: string; poster?: string; steps: number[] };
}) {
  const { ref, ...slides } = useLoop(video ? 1 : frames.length);
  const player = useRef<HTMLVideoElement>(null);
  const [vStep, setVStep] = useState(0);
  const [vFrac, setVFrac] = useState(0);
  const loop = video ? { ...slides, shown: vStep, playing: false } : slides;
  function select(i: number) {
    const v = player.current;
    if (!video || !v) return slides.go(i);
    v.currentTime = video.steps[i] + 0.01;
    void v.play();
  }
  const onTime = () => {
    const v = player.current;
    if (!video || !v) return;
    const t = v.currentTime;
    let i = 0;
    video.steps.forEach((s, k) => {
      if (t >= s) i = k;
    });
    const end = video.steps[i + 1] ?? v.duration;
    setVStep(i);
    setVFrac(Math.min(1, Math.max(0, (t - video.steps[i]) / Math.max(0.01, end - video.steps[i]))));
  };
  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-10 rounded-[28px] p-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 md:p-12",
        reverse && "md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
      )}
      style={{ background: TINT }}
    >
      <div
        className={cn(
          "mx-auto w-full",
          video ? "max-w-[340px] md:max-w-[400px]" : "max-w-[300px] md:max-w-[330px]",
          reverse && "md:order-2",
        )}
      >
        {video ? (
          // Demo videos are full phone-mockup cards (tools/phone_card_video.py, 1080x1920): phone, status bar
          // and glow are part of the video, so the page only rounds the card.
          <video
            ref={player}
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onTimeUpdate={onTime}
            aria-label={`${title} (demo)`}
            className="block h-auto w-full rounded-[22px] bg-black"
            style={{ aspectRatio: "1080 / 1920" }}
          />
        ) : (
          <Track frames={frames} loop={loop} center />
        )}
      </div>
      <div className={cn(reverse && "md:order-1")}>
        <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-400">
          {eyebrow}
        </span>
        <h3 className="font-blinker mt-3 text-[clamp(24px,2.4vw,34px)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
          {title}
        </h3>
        <ol className="mt-8 flex flex-col">
          {frames.map((f, i) => (
            <li key={f.src}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={i === loop.shown ? "step" : undefined}
                data-cursor-hover
                className="group flex w-full gap-4 border-t border-white/10 py-4 text-left"
              >
                <span
                  className="font-blinker w-6 shrink-0 text-[14px] font-medium tabular-nums transition-colors"
                  style={{
                    color:
                      i === loop.shown
                        ? "var(--accent-green)"
                        : "rgb(115 115 115)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span
                    className={cn(
                      "font-gilroy text-[16px] leading-snug transition-colors duration-300 md:text-[17px]",
                      i === loop.shown
                        ? "text-white"
                        : "text-neutral-500 group-hover:text-neutral-300",
                    )}
                  >
                    {f.step}
                  </span>
                  <span
                    className="font-gilroy grid text-[14px] leading-[1.55] text-neutral-400 transition-[grid-template-rows,opacity] duration-500"
                    style={{
                      gridTemplateRows: i === loop.shown ? "1fr" : "0fr",
                      opacity: i === loop.shown ? 1 : 0,
                    }}
                  >
                    <span className="overflow-hidden">{f.detail}</span>
                  </span>
                  {i === loop.shown && (
                    <span className="mt-1.5">
                      {video ? (
                        <span className="relative block h-px w-full overflow-hidden bg-white/15">
                          <span
                            className="absolute inset-0 origin-left"
                            style={{ background: "var(--accent-green)", transform: `scaleX(${vFrac})` }}
                          />
                        </span>
                      ) : (
                        <Progress active loop={loop} />
                      )}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Static screens side by side at equal height, joined by arrows, each with a label (a before → after or a hand-off). */
export function FlowPanel({
  items,
  height = 560,
  className,
}: {
  items: (Screen & { label: string })[];
  /** Target height of the screens in px; the row narrows to fit it and is centered. */
  height?: number;
  className?: string;
}) {
  const aspectSum = items.reduce((a, it) => a + it.w / it.h, 0);
  const maxWidth = `calc(${Math.round(aspectSum * height)}px + ${(items.length - 1) * 112}px)`;
  return (
    <figure
      className={cn("rounded-[28px] px-4 py-8 md:px-12 md:py-14", className)}
      style={{ background: TINT }}
    >
      <div
        className="mx-auto flex flex-col items-stretch gap-8 md:flex-row md:items-start md:gap-6 lg:gap-10"
        style={{ maxWidth }}
      >
        {items.map((it, i) => (
          <Fragment key={it.src}>
            <div
              className="min-w-0"
              style={{ flex: `${it.w / it.h} 1 0` } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                className={cn(
                  "mx-auto block h-auto max-h-[70vh] w-auto max-w-full md:max-h-none md:w-full",
                  it.radius ? "phone-shell" : "rounded-[10px]",
                )}
                style={it.radius ? { borderRadius: it.radius } : undefined}
              />
              <figcaption className="font-gilroy mt-5 text-center text-[14px] leading-[1.5] text-neutral-300 md:text-[15px]">
                {it.label}
              </figcaption>
            </div>
            {i < items.length - 1 && (
              <span
                aria-hidden
                className="shrink-0 self-center rotate-90 md:mt-[-2.5rem] md:rotate-0"
                style={{ color: "var(--accent-green)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                  <path
                    d="M4 12h15M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </figure>
  );
}

/** One important screen, shown on its own. */
export function Shot({
  src,
  alt,
  caption,
  panel = true,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  panel?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          panel
            ? "rounded-[28px] border border-white/10 bg-white/[0.025] p-3 sm:p-5 md:p-8"
            : "overflow-hidden rounded-[22px]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="font-gilroy mt-5 max-w-[72ch] text-[15px] leading-[1.6] text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

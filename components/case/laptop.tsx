// A laptop screen seen from the front (after keithren.com): thin silver rim, thick black bezel, no base. Used on the
// NIO and End of an Era pages.

/** Part of a screenshot to show on the screen: [x, y, width, height] in image pixels. */
export type ScreenCrop = readonly [number, number, number, number];

export function Laptop({
  src,
  alt,
  className,
  w = 1600,
  h = 1000,
  crop,
  eager,
  overflow,
  light,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Image size in pixels. */
  w?: number;
  h?: number;
  /** Show only this part of the image on the screen (e.g. the app window of a screen with a long form below it). */
  crop?: ScreenCrop;
  /** Load straight away (for a hero image). */
  eager?: boolean;
  /** Let the cut-out part of the image below the crop (a long list, a tall form) hang out under the laptop. */
  overflow?: boolean;
  /** Softer shadow for light pages. */
  light?: boolean;
}) {
  const [cx, cy, cw, ch] = crop ?? [0, 0, w, h];
  const place = { width: `${(w / cw) * 100}%`, left: `${(-cx / cw) * 100}%`, top: `${(-cy / ch) * 100}%` };
  const below = overflow ? Math.max(0, h - cy - ch) : 0;
  // Room for the hanging part: its height as a share of the laptop width, less the bezel it covers.
  const extra = below ? Math.max(0, (below / cw) * 0.954 - 0.023) : 0;
  return (
    <div className={className} style={extra ? { paddingBottom: `${extra * 100}%` } : undefined}>
      <div
        className={`rounded-[3.8%/6%] bg-gradient-to-b from-[#b4b4ba] via-[#7a7a80] to-[#4a4a50] p-[0.3%] ${
          light ? "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]" : "shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
        }`}
      >
        <div className="rounded-[3.6%/5.7%] bg-[#060607] px-[2%] pb-[2%] pt-[2.4%]">
          <div className="relative w-full" style={{ aspectRatio: `${cw} / ${ch}` }}>
            <div className="absolute inset-0 overflow-hidden rounded-[1.3%/2%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} className="absolute block h-auto max-w-none" style={place} />
            </div>
            {below > 0 && (
              // the same image again, showing only what lies below the window (transparent cut-out around it)
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt=""
                aria-hidden
                width={w}
                height={h}
                loading="lazy"
                className="pointer-events-none absolute z-10 block h-auto max-w-none"
                style={{
                  ...place,
                  clipPath: `inset(${((cy + ch) / h) * 100}% 0 0 0)`,
                  filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.16))",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

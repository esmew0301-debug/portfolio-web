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
}: {
  src: string;
  alt: string;
  className?: string;
  /** Image size in pixels. */
  w?: number;
  h?: number;
  /** Show only this part of the image (e.g. the app window of a screen with a long form below it). */
  crop?: ScreenCrop;
  /** Load straight away (for a hero image). */
  eager?: boolean;
}) {
  const [cx, cy, cw, ch] = crop ?? [0, 0, w, h];
  return (
    <div className={className}>
      <div className="rounded-[3.8%/6%] bg-gradient-to-b from-[#b4b4ba] via-[#7a7a80] to-[#4a4a50] p-[0.3%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="rounded-[3.6%/5.7%] bg-[#060607] px-[2%] pb-[2%] pt-[2.4%]">
          <div className="relative w-full overflow-hidden rounded-[1.3%/2%]" style={{ aspectRatio: `${cw} / ${ch}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              width={w}
              height={h}
              loading={eager ? "eager" : "lazy"}
              className="absolute block h-auto max-w-none"
              style={{ width: `${(w / cw) * 100}%`, left: `${(-cx / cw) * 100}%`, top: `${(-cy / ch) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

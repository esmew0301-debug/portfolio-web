import { cn } from "@/lib/utils";

export type SliderImage = { src: string; alt: string };

// Infinite, edge-faded marquee of images (adapted from 21st.dev "image-auto-slider").
// Styles are scoped to this component so they never touch the page's html/body or fonts.
export function Component({
  images,
  duration = 20,
  itemClassName = "w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80",
  className,
}: {
  images: SliderImage[];
  /** Seconds for one full loop. */
  duration?: number;
  /** Size of each tile. */
  itemClassName?: string;
  className?: string;
}) {
  // Duplicate images for a seamless loop
  const duplicated = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes ias-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ias-track { animation: ias-scroll var(--ias-duration) linear infinite; }
        .ias-mask {
          mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .ias-item { transition: transform 0.3s ease, filter 0.3s ease; }
        .ias-item:hover { transform: scale(1.05); filter: brightness(1.1); }
        @media (prefers-reduced-motion: reduce) { .ias-track { animation: none; } }
      `}</style>

      <div className={cn("relative w-full overflow-hidden", className)}>
        <div className="ias-mask w-full">
          <div className="ias-track flex w-max gap-6" style={{ "--ias-duration": `${duration}s` } as React.CSSProperties}>
            {duplicated.map((image, index) => (
              <div
                key={index}
                aria-hidden={index >= images.length}
                className={cn("ias-item flex-shrink-0 overflow-hidden rounded-xl shadow-2xl", itemClassName)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={index < images.length ? image.alt : ""}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

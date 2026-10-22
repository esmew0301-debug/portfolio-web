// AI Trip Planning design system board, on black (same layout as the Vegan Kitchen board: Colors / Typeface / Radius;
// each radius tile draws its corner at twice the size so the curve is readable).
// Primary colours are the project palette (public/images/trip-planning/palette.webp); the neutrals are sampled from
// the in-car screens. Type sizes and radii are read off the screens, so they are approximate.

const PRIMARY = [
  { name: "Black", hex: "000000" },
  { name: "Violet", hex: "664BDC" },
  { name: "Orange", hex: "EB8037" },
  { name: "Blue", hex: "00B5FF" },
];
const NEUTRAL = [
  { name: "Panel", hex: "121218" },
  { name: "Surface", hex: "24242A" },
  { name: "Map", hex: "181E24" },
  { name: "White", hex: "FCFCFC" },
];
const SIZES: [string, number][] = [
  ["Turn instruction", 28],
  ["Stop name", 18],
  ["Body", 14],
  ["Caption", 11],
];

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div>
      <div className="aspect-square w-full rounded-[10px] border border-white/15" style={{ background: `#${hex}` }} />
      <p className="mt-2 text-[13px] text-white">{name}</p>
      <p className="mt-0.5 text-[11px] tracking-wide text-white/45">{hex}</p>
    </div>
  );
}

export function TripDesignSystem() {
  return (
    <div className="mx-auto grid max-w-[980px] gap-12 py-2 lg:grid-cols-[1.25fr_1fr_0.8fr] lg:gap-14">
      {/* Colors */}
      <div>
        <p className="text-[18px] text-white">Colors</p>
        <p className="mt-5 text-[20px] font-light text-white">Primary</p>
        <div className="mt-4 grid max-w-[340px] grid-cols-4 gap-3">
          {PRIMARY.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
        <p className="mt-6 text-[20px] font-light text-white">Neutral</p>
        <div className="mt-4 grid max-w-[340px] grid-cols-4 gap-3">
          {NEUTRAL.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </div>

      {/* Typeface */}
      <div className="flex flex-col">
        <p className="text-[18px] text-white">Typeface</p>
        <div className="mt-5 flex items-end gap-3">
          <span className="text-[64px] font-medium leading-none tracking-tight text-white md:text-[80px]">Aa</span>
          <span className="pb-2 text-[14px] text-white/60">Sans, high contrast on dark</span>
        </div>
        <p className="mt-8 text-[15px] text-white lg:mt-auto">Size</p>
        <div className="mt-3 flex flex-col gap-2.5">
          {SIZES.map(([name, px]) => (
            <div key={name} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-2">
              <span className="text-white" style={{ fontSize: Math.min(px * 0.7, 22) }}>
                {name}
              </span>
              <span className="text-[11px] tabular-nums text-white/45">~{px}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radius: the corner of each tile is drawn at the radius it names */}
      <div className="flex flex-col">
        <p className="text-[18px] text-white">Radius</p>
        <div className="mt-5 grid flex-1 grid-rows-3 gap-3">
          {[
            [16, "Panels"],
            [10, "Cards"],
            [6, "Tags"],
          ].map(([r, label]) => (
            <div
              key={r}
              className="relative flex min-h-[110px] flex-col overflow-hidden rounded-[10px] bg-[#0a0a0d] p-3 [background-image:linear-gradient(rgb(0_181_255/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(0_181_255/0.12)_1px,transparent_1px)] [background-size:12px_12px]"
            >
              <p className="text-[15px] text-[#00B5FF]">
                {r}px <span className="text-[11px] text-[#00B5FF]/70">· {label}</span>
              </p>
              <div
                className="mt-2 min-h-12 w-[140%] flex-1 border-l border-t border-[#00B5FF]/50 bg-[#24242A]"
                style={{ borderTopLeftRadius: (r as number) * 2 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

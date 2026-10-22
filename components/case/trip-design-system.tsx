// AI Trip Planning design system board, on black (same layout as the Vegan Kitchen board: Colors / Typeface / Radius).
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

      {/* Surfaces & radius */}
      <div className="flex flex-col gap-4">
        <p className="text-[18px] text-white">Surfaces</p>
        <div className="rounded-[16px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">
          <p className="text-[13px] text-white">Frosted glass</p>
          <p className="mt-1 text-[11px] leading-[16px] text-white/55">AI prompts float over the map without hiding it.</p>
        </div>
        <div className="rounded-[10px] bg-[#664BDC] p-4">
          <p className="text-[13px] text-white">Turn card · 10px</p>
          <p className="mt-1 text-[11px] text-white/75">Lane-level guidance</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#00B5FF] px-4 py-1.5 text-[12px] text-black">Go · pill</span>
          <span className="rounded-[6px] bg-[#00B5FF]/15 px-2 py-1 text-[12px] text-[#00B5FF]">15min · 6px</span>
        </div>
        <p className="text-[11px] leading-[16px] text-white/45">
          Violet for guidance, blue for the route and actions, orange for stops and places.
        </p>
      </div>
    </div>
  );
}

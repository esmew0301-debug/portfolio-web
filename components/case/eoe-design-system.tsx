// End of an Era design system board (layout reference: keithren.com/space-mpaa "Design Style Guide": Colors /
// Typeface / Radius). Colours are sampled from the app screens; type sizes are read off the 1400px-wide exports
// (cap heights), so they are approximate. Text uses the case-sheet classes so it follows the light/dark switch.

const PRIMARY = [
  { name: "Navy", hex: "143860" },
  { name: "Teal", hex: "047C88" },
  { name: "Blue", hex: "0090B4" },
  { name: "Green", hex: "1E806D" },
];
const NEUTRAL = [
  { name: "Ink", hex: "101006" },
  { name: "Sage", hex: "C8DED6" },
  { name: "Mint", hex: "E7F3ED" },
  { name: "Cream", hex: "FCF8F7" },
];
const SCALE: [string, number, string][] = [
  ["Page title", 42, "serif"],
  ["Card / modal title", 24, "sans"],
  ["Body", 18, "sans"],
  ["Label", 16, "sans"],
];
const SERIF = "Georgia, 'Times New Roman', serif";

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div>
      <div className="aspect-square w-full rounded-[10px] border border-white/10" style={{ background: `#${hex}` }} />
      <p className="mt-2 text-[13px] text-white">{name}</p>
      <p className="mt-0.5 text-[11px] tracking-wide text-neutral-500">{hex}</p>
    </div>
  );
}

function RadiusTile({ r, label }: { r: number; label: string }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-[10px] bg-[#f1f8f8] p-3 [background-image:linear-gradient(#d6ecee_1px,transparent_1px),linear-gradient(90deg,#d6ecee_1px,transparent_1px)] [background-size:12px_12px]">
      <p className="text-[15px] text-[#047C88]">
        {r}px <span className="text-[11px] text-[#047C88]/70">· {label}</span>
      </p>
      <div className="mt-2 min-h-16 w-[140%] flex-1 border-l border-t border-[#047C88]/40" style={{ background: "#143860", borderTopLeftRadius: r * 2 }} />
    </div>
  );
}

export function EoeDesignSystem() {
  return (
    <div className="mx-auto grid max-w-[880px] gap-10 overflow-hidden py-2 lg:grid-cols-[1.2fr_1fr_0.7fr] lg:gap-12">
      <div>
        <p className="text-[18px] text-white">Colors</p>
        <p className="mt-5 text-[20px] font-light text-white">Primary</p>
        <div className="mt-4 grid max-w-[320px] grid-cols-4 gap-3">
          {PRIMARY.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
        <p className="mt-6 text-[20px] font-light text-white">Neutral</p>
        <div className="mt-4 grid max-w-[320px] grid-cols-4 gap-3">
          {NEUTRAL.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[18px] text-white">Typeface</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[56px] leading-none text-[#143860] md:text-[64px]" style={{ fontFamily: SERIF }}>
              Aa
            </span>
            <p className="mt-2 text-[13px] text-white">Serif</p>
            <p className="text-[11px] text-neutral-500">Page titles</p>
          </div>
          <div>
            <span className="block text-[56px] font-medium leading-none text-[#101006] md:text-[64px]">Aa</span>
            <p className="mt-2 text-[13px] text-white">Sans</p>
            <p className="text-[11px] text-neutral-500">Interface &amp; body</p>
          </div>
        </div>
        <p className="mt-8 text-[15px] text-white lg:mt-auto">Size</p>
        <div className="mt-4 flex flex-col gap-3">
          {SCALE.map(([name, px, face]) => (
            <div key={name} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2">
              <span className="text-white" style={{ fontSize: Math.min(px * 0.45, 19), fontFamily: face === "serif" ? SERIF : undefined }}>
                {name}
              </span>
              <span className="text-[11px] tabular-nums text-neutral-500">~{px}px</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[18px] text-white">Radius</p>
        <RadiusTile r={12} label="Cards" />
        <RadiusTile r={6} label="Buttons" />
      </div>
    </div>
  );
}

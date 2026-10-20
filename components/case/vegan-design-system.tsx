// Val's Vegan Kitchen design system board (layout reference: the Itinera "Colors / Typeface / Radius" board).
// Colours are sampled from the app screens; type sizes and radii are read off the screens.

const PRIMARY = [
  { name: "Orange", hex: "FE7602" },
  { name: "Forest", hex: "123C33" },
  { name: "White", hex: "FFFFFF" },
  { name: "Black", hex: "181818" },
];
const SECONDARY = [
  { name: "Pink", hex: "FB85BD" },
  { name: "Peach", hex: "FEE8D6" },
  { name: "Background", hex: "F8F8F8" },
  { name: "Gray", hex: "989898" },
];
const SIZES = [24, 20, 16, 12];

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div>
      <div className="aspect-square w-full rounded-[14px] border border-black/[0.06]" style={{ background: `#${hex}` }} />
      <p className="mt-3 text-[15px] text-[#111111]">{name}</p>
      <p className="mt-1 text-[13px] tracking-wide text-[#a3a3a3]">{hex}</p>
    </div>
  );
}

function RadiusTile({ r }: { r: number }) {
  return (
    <div className="relative overflow-hidden rounded-[10px] bg-[#fff6ee] p-4 [background-image:linear-gradient(#fde6d2_1px,transparent_1px),linear-gradient(90deg,#fde6d2_1px,transparent_1px)] [background-size:12px_12px]">
      <p className="text-[18px] text-[#FE7602]">{r}px</p>
      <div className="mt-3 h-28 w-[140%] border-l border-t border-[#FE7602]/40" style={{ background: "#123C33", borderTopLeftRadius: r * 2 }} />
    </div>
  );
}

export function VeganDesignSystem() {
  return (
    <div className="grid gap-12 overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.18)] md:p-10 lg:grid-cols-[1.3fr_1fr_0.8fr] lg:gap-14">
      {/* Colors */}
      <div>
        <p className="text-[22px] text-[#111111]">Colors</p>
        <p className="mt-6 text-[26px] font-light text-[#111111]">Primary</p>
        <div className="mt-4 grid grid-cols-4 gap-4">{PRIMARY.map((c) => <Swatch key={c.name} {...c} />)}</div>
        <p className="mt-8 text-[26px] font-light text-[#111111]">Secondary</p>
        <div className="mt-4 grid grid-cols-4 gap-4">{SECONDARY.map((c) => <Swatch key={c.name} {...c} />)}</div>
      </div>
      {/* Typeface */}
      <div>
        <p className="text-[22px] text-[#111111]">Typeface</p>
        <p className="mt-6 text-[17px] text-[#111111]">Font</p>
        <div className="mt-2 flex items-end gap-3" style={{ fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}>
          <span className="text-[80px] font-medium md:text-[110px] leading-none tracking-tight text-[#123C33]">Aa</span>
          <span className="pb-3 text-[18px] text-[#111111]">Inter</span>
        </div>
        <p className="mt-10 text-[17px] text-[#111111]">Weight &amp; Size</p>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[#181818]" style={{ fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}>
          {SIZES.map((n) => [
            <span key={`r${n}`} style={{ fontSize: Math.max(n * 0.85, 11) }}>Regular - {n}</span>,
            <span key={`s${n}`} className="font-semibold" style={{ fontSize: Math.max(n * 0.85, 11) }}>Semibold - {n}</span>,
          ])}
        </div>
      </div>
      {/* Radius */}
      <div>
        <p className="text-[22px] text-[#111111]">Radius</p>
        <div className="mt-6 grid gap-4">
          <RadiusTile r={24} />
          <RadiusTile r={12} />
        </div>
      </div>
    </div>
  );
}

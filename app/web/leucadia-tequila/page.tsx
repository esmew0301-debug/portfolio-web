import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BackLink, BackToTop } from "@/components/case/back-link";
import { CaseNav, type CaseNavItem } from "@/components/case/case-nav";
import { PhoneFlow, type Phone } from "@/components/case/phone-flow";
import { Chip, Container, P, WideSection } from "@/components/case/primitives";
import { ReadTime } from "@/components/case/read-time";
import { Reveal } from "@/components/case/reveal";
import { ThemeToggle } from "@/components/case/theme-toggle";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { figma, person, selectedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `Leucadia 1875 Tequila — ${person.name}`,
  description: "Brand website for Leucadia 1875, an organic tequila with three expressions: Blanco, Reposado, and Añejo.",
};

// Visual showcase (structure after jingjinghan.com/playground/balance): short intros, the screens carry the page.
// Only Blanco is built out here; Reposado and Añejo live in the Figma file.
const NAV: CaseNavItem[] = [
  { id: "mobile-home", index: "01", label: "Mobile Homepage" },
  { id: "product-home", index: "02", label: "Product Homepage" },
  { id: "mobile-flow", index: "03", label: "Mobile Product Flow" },
  { id: "desktop-flow", index: "04", label: "Desktop Product Flow" },
];

const L = "/images/leucadia-tequila";
const ph = (n: number, step: string, alt: string): Phone => ({ src: `${L}/m${n}.webp`, step, alt });

// Frames 29–34: the mobile homepage, one connected scroll.
const HOME = [
  ph(29, "Hero", "Homepage hero: a close-up of the Leucadia bottle"),
  ph(30, "Into the collection", "The hero hands off to the collection"),
  ph(31, "Our Signature Collections", "All three expressions on the beach"),
  ph(32, "Signature Specials", "Gift set: pick three, get 20% off"),
  ph(33, "Inside Leucadia", "Accessories carousel"),
  ph(34, "Keep in touch", "Newsletter sign-up, menus, and social links"),
];
// Frames 35–37: the product homepage, added later at the manager's request.
const PRODUCTS = [
  ph(35, "Blanco", "Blanco product hero with Explore Blanco"),
  ph(36, "Reposado", "Reposado product hero with Explore Reposado"),
  ph(37, "Añejo", "Añejo product hero with Shop Añejo"),
];

const MORE = selectedWork.slice(0, 2);
const isExternal = (href: string) => /^https?:\/\//.test(href);

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      <span className="font-gilroy text-[16px] leading-[1.5] text-neutral-100">{children}</span>
    </div>
  );
}

/** Looping, muted screen recording with a caption underneath. */
function Clip({ src, poster, caption, className, aspect }: { src: string; poster: string; caption: string; className?: string; aspect: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black" style={{ aspectRatio: aspect }}>
        <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" className="block h-full w-full object-cover" />
      </div>
      <figcaption className="font-gilroy mt-4 flex items-center gap-3 text-[14px] text-neutral-300">
        <span className="h-px w-6 bg-[var(--accent-green)]" aria-hidden />
        {caption}
      </figcaption>
    </figure>
  );
}

export default function LeucadiaTequila() {
  return (
    <div id="top" className="relative scroll-smooth bg-black">
      <CreativeNav play hrefBase="/" />
      <CaseNav items={NAV} endId="case-more" />
      <ReadTime targetId="case-body" />
      <ThemeToggle />

      {/* HERO — fixed full-screen visual the sheet scrolls over */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-[#2a1a0e]">
        <Image
          src={`${L}/cover.jpg`}
          alt="The Leucadia 1875 website open on a laptop, showing the Blanco hero, in warm window light"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="case-sheet relative z-10 mt-[90svh] rounded-t-[26px] bg-[#0b0b0b] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.45)] md:rounded-t-sheet"
        style={{ "--accent": "#161616", "--accent-green": "#c9a46a" } as React.CSSProperties}
      >
        <div id="case-body">
          {/* Title */}
          <section className="pt-14 md:pt-20">
            <Container>
              <div className="mb-10">
                <BackLink
                  href="/#web"
                  className="font-gilroy inline-flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-white"
                >
                  <span>←</span>Back to Web Design
                </BackLink>
              </div>
              <Reveal>
                <p className="font-gilroy text-[13px] uppercase tracking-[0.3em] text-neutral-500">Web Design · Brand website</p>
                <h1 className="font-blinker mt-4 max-w-[22ch] text-[clamp(40px,6.5vw,96px)] font-medium leading-[0.98] tracking-[-0.01em] text-white">
                  Leucadia 1875 Tequila
                </h1>
                <p className="font-sulphur mt-6 max-w-[48ch] text-[clamp(18px,2.2vw,28px)] leading-[1.3] text-neutral-500">
                  A brand website for an organic tequila with three expressions: Blanco, Reposado, and Añejo.
                </p>
              </Reveal>
            </Container>
          </section>

          {/* Intro, meta, Figma */}
          <section className="pb-16 pt-12 md:pt-16">
            <Container>
              <Reveal>
                <p className="font-gilroy max-w-[64ch] text-[clamp(20px,2.4vw,28px)] leading-[1.5] tracking-[-0.01em] text-neutral-100">
                  A quiet, image-led site where the bottles do the talking, designed for mobile and desktop.
                </p>
                <p className="font-gilroy mt-6 max-w-[64ch] text-[clamp(16px,1.6vw,19px)] leading-[1.65] text-neutral-400">
                  My manager asked me to design a luxury website for the company&apos;s wine brand. I started with style
                  research into comparable luxury brand websites, then designed both the desktop and mobile experience
                  independently as a solo project.
                </p>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Client">Posse.io</Meta>
                <Meta label="Type">Brand website</Meta>
                <Meta label="Platform">Mobile &amp; desktop</Meta>
                <Meta label="Tools">Figma</Meta>
              </div>
              <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:gap-10">
                <div className="shrink-0">
                  <RainbowButton href={figma.posse} target="_blank" rel="noopener noreferrer">
                    Open in Figma ↗
                  </RainbowButton>
                </div>
                <p className="font-gilroy max-w-[60ch] text-[15px] leading-[1.65] text-neutral-400">
                  Only Blanco is shown here; Figma has the full designs for Reposado and Añejo too.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-10">
                {["Visual Design", "Responsive Web", "E-commerce"].map((r) => (
                  <Chip key={r} variant="role">
                    {r}
                  </Chip>
                ))}
              </div>
            </Container>
          </section>

          {/* 01 — MOBILE HOMEPAGE (frames 29–34) */}
          <WideSection id="mobile-home" index="01" label="Mobile Homepage" title="One scroll through the whole brand.">
            <P>
              The homepage is one connected flow, with all three expressions together.
            </P>
            <PhoneFlow phones={HOME} width={230} device />
          </WideSection>

          {/* 02 — PRODUCT HOMEPAGE (frames 35–37) */}
          <WideSection id="product-home" index="02" label="Product Homepage" title="Each expression on its own.">
            <P>
              Added at my manager&apos;s request: an alternative homepage giving each expression a full screen.
            </P>
            <PhoneFlow phones={PRODUCTS} width={260} device />
          </WideSection>

          {/* 03 — MOBILE PRODUCT FLOW */}
          <WideSection id="mobile-flow" index="03" label="Mobile Product Flow" title="Blanco, from first scroll to checkout.">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
              <P>
                Blanco on mobile, with scroll effects, through to purchase.
              </P>
              <Reveal>
                <Clip
                  src="/videos/leucadia_scroll_v2.mp4"
                  poster={`${L}/mobile-poster.jpg`}
                  caption="Blanco — Mobile Product Flow"
                  aspect="9 / 16"
                  className="mx-auto w-full max-w-[400px]"
                />
              </Reveal>
            </div>
          </WideSection>

          {/* 04 — DESKTOP PRODUCT FLOW */}
          <WideSection id="desktop-flow" index="04" label="Desktop Product Flow" title="The same story, given room.">
            <P>From the product image, through the details, to the purchase screen.</P>
            <Reveal>
              <Clip
                src="/videos/leucadia_web_browsing.mp4"
                poster={`${L}/desktop-poster.jpg`}
                caption="Blanco — Desktop Product Flow"
                aspect="16 / 9"
              />
            </Reveal>
          </WideSection>
        </div>

        <div className="border-t border-white/[0.08] px-gutter py-16 md:px-gutter-lg md:py-20">
          <BackToTop />
        </div>

        {/* More work */}
        <section id="case-more" className="border-t border-white/[0.08] bg-[#0e0e0e] py-24 md:py-32">
          <Container>
            <Reveal>
              <h2 className="font-blinker text-center text-[clamp(32px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
                Curious to see more?
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
              {MORE.map((w, i) => (
                <Reveal key={w.label} delay={i * 0.08}>
                  <a href={w.href} {...(isExternal(w.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-cursor="view" className="group block">
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[18px] border border-white/10 bg-neutral-800">
                      <Image
                        src={w.image}
                        alt={w.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 620px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: w.imagePosition }}
                      />
                    </div>
                    <p className="font-gilroy mt-4 text-[14px] uppercase tracking-[0.2em] text-neutral-400">{w.label}</p>
                    <h3 className="font-blinker mt-1 text-[clamp(22px,2.6vw,32px)] font-medium leading-tight text-white transition-colors group-hover:text-neutral-400">
                      {w.title}
                    </h3>
                  </a>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <div className="relative z-10">
        <CreativeCTA hrefBase="/" />
      </div>
    </div>
  );
}

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
import { figma, person } from "@/lib/content";
import { L as Tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Leucadia 1875 Tequila — ${person.name}`,
  description: "Brand website for Leucadia 1875, an organic tequila with three expressions: Blanco, Reposado, and Añejo.",
};

// Visual showcase (structure after jingjinghan.com/playground/balance): short intros, the screens carry the page.
// Only Blanco is built out here; Reposado and Añejo live in the Figma file.
const NAV: CaseNavItem[] = [
  { id: "mobile-home", index: "01", label: "Mobile Homepage" },
  { id: "product-home", index: "02", label: "Alternative Homepage" },
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


function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-gilroy text-[12px] uppercase tracking-[0.25em] text-neutral-500">{label}</span>
      <span className="font-gilroy text-[16px] leading-[1.5] text-neutral-100">{children}</span>
    </div>
  );
}

/** Looping, muted screen recording with a caption underneath. */
function Clip({ src, poster, caption, className, aspect }: { src: string; poster: string; caption: ReactNode; className?: string; aspect: string }) {
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
                  <Tr
                    en="A brand website for an organic tequila with three expressions: Blanco, Reposado, and Añejo."
                    zh="为一款有机龙舌兰酒设计的品牌网站，产品分为 Blanco、Reposado 和 Añejo 三个系列。"
                  />
                </p>
              </Reveal>
            </Container>
          </section>

          {/* Intro, meta, Figma */}
          <section className="pb-16 pt-12 md:pt-16">
            <Container>
              <Reveal>
                <p className="font-gilroy max-w-[64ch] text-[clamp(20px,2.4vw,28px)] leading-[1.5] tracking-[-0.01em] text-neutral-100">
                  <Tr
                    en="I created an image-led website concept to give each tequila expression a distinct visual identity while keeping
                  the shopping experience consistent across mobile and desktop."
                    zh="我设计了一个以图片为主导的网站概念：让每个龙舌兰系列都有鲜明的视觉个性，同时在手机端和桌面端保持一致的购物体验。"
                  />
                </p>
                <p className="font-gilroy mt-6 max-w-[64ch] text-[clamp(16px,1.6vw,19px)] leading-[1.65] text-neutral-400">
                  <Tr
                    en={<>At Posse.io, my manager asked me to design a luxury website for Leucadia 1875, the company&apos;s tequila brand. I
                  started with style research into comparable luxury brand websites, then designed the desktop and mobile
                  experiences on my own.</>}
                    zh="在 Posse.io 时，我的主管请我为公司旗下的龙舌兰酒品牌 Leucadia 1875 设计一个高端品牌网站。我先研究了同类奢侈品牌网站的视觉风格，然后独立完成了桌面端和移动端的设计。"
                  />
                </p>
              </Reveal>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
                <Meta label="Client">Posse.io</Meta>
                <Meta label="Type"><Tr en="Brand website" zh="品牌网站" /></Meta>
                <Meta label="Platform"><Tr en={<>Mobile &amp; desktop</>} zh="移动端与桌面端" /></Meta>
                <Meta label="Tools">Figma</Meta>
              </div>
              <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:gap-10">
                <div className="shrink-0">
                  <RainbowButton href={figma.posse} target="_blank" rel="noopener noreferrer">
                    Open in Figma ↗
                  </RainbowButton>
                </div>
                <p className="font-gilroy max-w-[60ch] text-[15px] leading-[1.65] text-neutral-400">
                  <Tr
                    en="Only Blanco is shown here; Figma has the full designs for Reposado and Añejo too."
                    zh="这里只展示了 Blanco 系列；Reposado 和 Añejo 的完整设计都在 Figma 中。"
                  />
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
          <WideSection id="mobile-home" index="01" label="Mobile Homepage" title={<Tr en="One scroll through the whole brand." zh="在滚动中探索品牌故事。" />}>
            <P>
              <Tr
                en="The homepage is one connected flow, with all three expressions together. Large photography leads each section, and
              the type stays small and quiet so the bottles carry the page."
                zh="首页是一条连贯的浏览流程，三个系列集中呈现。每个板块都以大幅摄影图开场，文字则保持小而克制，让酒瓶本身成为页面的主角。"
              />
            </P>
            <PhoneFlow phones={HOME} width={220} device screenRatio="1170 / 2640" />
          </WideSection>

          {/* 02 — PRODUCT HOMEPAGE (frames 35–37) */}
          <WideSection id="product-home" index="02" label="Alternative Homepage Concept" title={<Tr en="Each expression on its own." zh="让每个系列各自登场。" />}>
            <P>
              <Tr
                en={<>Added at my manager&apos;s request: an alternative homepage that gives each expression a full screen, so Blanco,
              Reposado, and Añejo each get their own mood.</>}
                zh="应主管的要求补充的另一版首页：每个系列独占一整屏，让 Blanco、Reposado 和 Añejo 各自拥有独特的氛围。"
              />
            </P>
            <PhoneFlow phones={PRODUCTS} width={250} device screenRatio="1170 / 2640" />
          </WideSection>

          {/* 03 — MOBILE PRODUCT FLOW */}
          <WideSection id="mobile-flow" index="03" label="Mobile Product Flow" title={<Tr en="Blanco, from first scroll to checkout." zh="Blanco，从第一次滑动到完成结账。" />}>
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
              <P>
                <Tr en="Blanco on mobile, with scroll effects, through to purchase." zh="Blanco 在移动端的完整流程：带滚动动效的浏览，一直到完成购买。" />
              </P>
              <Reveal>
                <Clip
                  src="/videos/leucadia_scroll_v2.mp4"
                  poster={`${L}/mobile-poster.jpg`}
                  caption={<Tr en="Blanco, mobile product flow" zh="Blanco 移动端产品流程" />}
                  aspect="9 / 16"
                  className="mx-auto w-full max-w-[400px]"
                />
              </Reveal>
            </div>
          </WideSection>

          {/* 04 — DESKTOP PRODUCT FLOW */}
          <WideSection id="desktop-flow" index="04" label="Desktop Product Flow" title={<Tr en="The same story, given room." zh="同样的故事，有了更大的舞台。" />}>
            <P>
              <Tr en="From the product image, through the details, to the purchase screen." zh="从产品主图，到产品细节，再到购买页面。" />
            </P>
            <Reveal>
              <Clip
                src="/videos/leucadia_web_browsing_v2.mp4"
                poster={`${L}/desktop-poster-v2.jpg`}
                caption={<Tr en="Blanco, desktop product flow" zh="Blanco 桌面端产品流程" />}
                aspect="16 / 9"
              />
            </Reveal>
          </WideSection>
        </div>

        <div className="border-t border-white/[0.08] px-gutter py-16 md:px-gutter-lg md:py-20">
          <BackToTop />
        </div>

      </div>

      <div className="relative z-10">
        <CreativeCTA hrefBase="/" />
      </div>
    </div>
  );
}

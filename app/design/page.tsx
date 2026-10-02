import type { Metadata } from "next";
import { DesignGrid, type DesignCard } from "@/components/portfolio/design-grid";
import { CreativeCTA } from "@/components/portfolio/creative-cta";
import { CreativeNav } from "@/components/portfolio/creative-nav";
import { person, playgroundProjects, selectedWork, webDesign } from "@/lib/content";

export const metadata: Metadata = {
  title: `Design — ${person.name}`,
  description: "Featured work, playground projects, and web design, all in one place.",
};

// Work collection (reference: jingjinghan.com/design). Pulls from the same data as the homepage.
const CARDS: DesignCard[] = [
  ...selectedWork.map((w) => ({
    category: "Featured Work" as const,
    title: w.title,
    blurb: w.description,
    image: w.image,
    href: w.href,
    imagePosition: w.imagePosition,
  })),
  ...playgroundProjects.map((p) => ({
    category: "Playground" as const,
    title: p.title === "L'Oréal" ? "L'Oréal Innovation Challenge" : p.title,
    blurb: p.blurb,
    image: p.image,
    href: p.href,
  })),
  ...webDesign.map((w) => ({ category: "Web Design" as const, title: w.label, blurb: w.blurb, image: w.image, href: w.href })),
];

export default function DesignPage() {
  return (
    <div id="top" className="relative min-h-screen bg-black text-white">
      <CreativeNav play hrefBase="/" />
      <main>
        <DesignGrid cards={CARDS} />
      </main>
      <CreativeCTA hrefBase="/" />
    </div>
  );
}

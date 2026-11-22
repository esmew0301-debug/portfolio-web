import type { Metadata } from "next";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { NoWidows } from "@/components/portfolio/no-widows";
import { PageReveal } from "@/components/portfolio/page-reveal";
import { person } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${person.name} — Product Management | UX Design | Human-Computer Interaction`,
  description: `The portfolio of ${person.name}: product management, UX design and human-computer interaction, from user research and product decisions to UX execution.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="antialiased"
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{sessionStorage.getItem('intro-played')==='1'&&document.documentElement.classList.add('intro-done')}catch(e){}" +
              // Project pages open in light mode unless the visitor switched to dark (see ThemeToggle).
              "try{/^\\/(work|playground|web)\\//.test(location.pathname)&&document.documentElement.setAttribute('data-case-theme','light')}catch(e){}",
          }}
        />
        <CustomCursor />
        <PageReveal />
        {children}
        <NoWidows />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Blinker, Sulphur_Point } from "next/font/google";
import localFont from "next/font/local";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { PageReveal } from "@/components/portfolio/page-reveal";
import { person } from "@/lib/content";
import "./globals.css";

const blinker = Blinker({
  variable: "--font-blinker",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const sulphur = Sulphur_Point({
  variable: "--font-sulphur",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const gilroy = localFont({
  variable: "--font-gilroy",
  src: [
    { path: "./fonts/Gilroy-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gilroy-Medium.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: `${person.name} — UX/UI Designer`,
  description: `The portfolio of ${person.name} — UX/UI design, UX research, and AI & automotive UX.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${blinker.variable} ${sulphur.variable} ${gilroy.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{sessionStorage.getItem('intro-played')==='1'&&document.documentElement.classList.add('intro-done')}catch(e){}",
          }}
        />
        <CustomCursor />
        <PageReveal />
        {children}
      </body>
    </html>
  );
}

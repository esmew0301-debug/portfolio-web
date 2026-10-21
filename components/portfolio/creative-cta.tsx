import { person } from "@/lib/content";
import { L } from "@/lib/i18n";

// Site footer, kept minimal (after zegzulka.com): "Contact" on the left, the year at the start of the right-hand
// third. Black with light text; on light case-study pages (html[data-case-theme="light"]) it turns white with dark
// text (see .site-footer in globals.css). The earlier "Let's Collaborate!" footer is in git history.
// `dark` keeps it black on pages that are always dark (NIO). `hrefBase` is still passed by pages; unused now.
export function CreativeCTA({ dark }: { hrefBase?: string; dark?: boolean }) {
  return (
    <footer className={`site-footer ${dark ? "site-footer-dark" : ""} grid grid-cols-3 bg-black px-4 pb-4 pt-16 text-[16px] text-white md:px-[14px]`}>
      <a href={`mailto:${person.email}`} className="w-fit transition-opacity hover:opacity-60">
        <L en="Contact" zh="联系我" />
      </a>
      <span aria-hidden />
      <span>2026</span>
    </footer>
  );
}

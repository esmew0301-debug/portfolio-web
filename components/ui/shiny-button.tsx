"use client";

import type React from "react";

// Shiny CTA (from 21st.dev): a rotating conic-gradient border, dotted inner pattern and shimmer that
// speed up and glow on hover. The original shipped its CSS in <style jsx> with a Google Fonts @import;
// the CSS now lives in globals.css (`.shiny-cta`) and the button uses the site's own font. Pass `href`
// to render it as a link.

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function ShinyButton({ children, onClick, className = "", href, target, rel }: ShinyButtonProps) {
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`shiny-cta ${className}`} data-cursor-hover>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button type="button" className={`shiny-cta ${className}`} onClick={onClick} data-cursor-hover>
      <span>{children}</span>
    </button>
  );
}

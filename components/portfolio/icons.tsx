import type { SVGProps } from "react";

export function GmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" {...props}>
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7a3 3 0 0 0 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
      <path fill="#e53935" d="M35 11.2L24 19.45 13 11.2 12 17l1 6.7 11 8.25 11-8.25 1-6.7z" />
      <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 3 12.298z" />
      <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 1 45 12.298z" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" {...props}>
      <rect width="48" height="48" rx="12" fill="#2867B2" />
      <path
        fill="#fff"
        d="M14 19h5v15h-5V19zm2.5-8a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8zM22 19h4.8v2.05h.07c.67-1.2 2.3-2.46 4.73-2.46 5.06 0 6 3.2 6 7.36V34h-5v-6.6c0-1.57-.03-3.6-2.3-3.6-2.3 0-2.66 1.72-2.66 3.49V34h-5V19z"
      />
    </svg>
  );
}

export function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

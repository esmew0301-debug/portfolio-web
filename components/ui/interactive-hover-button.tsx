import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Interactive hover button (from 21st.dev). On hover the dot grows to fill the pill, the label slides out,
// and a copy slides in with an arrow. The original used shadcn tokens (bg-background / bg-primary /
// text-primary-foreground), which this site doesn't define, so colours come from --ihb-* variables
// (set per case theme in globals.css). `InteractiveHoverLink` is the same element as an <a>.

const shell =
  "group relative inline-flex min-w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border py-2.5 pl-9 pr-6 text-center font-semibold";
const shellStyle = { background: "var(--ihb-bg)", borderColor: "var(--ihb-border)", color: "var(--ihb-fg)" };

function Inner({ text }: { text: string }) {
  return (
    <>
      <span className="relative z-0 inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div
        className="absolute left-0 top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
        style={{ color: "var(--ihb-fill-fg)" }}
      >
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div
        className="absolute left-[16px] top-[calc(50%-4px)] h-2 w-2 scale-[1] rounded-lg transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]"
        style={{ background: "var(--ihb-fill)" }}
      />
    </>
  );
}

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text = "Button", className, style, ...props }, ref) => (
    <button ref={ref} className={cn(shell, className)} style={{ ...shellStyle, ...style }} {...props}>
      <Inner text={text} />
    </button>
  ),
);
InteractiveHoverButton.displayName = "InteractiveHoverButton";

interface InteractiveHoverLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
}

const InteractiveHoverLink = React.forwardRef<HTMLAnchorElement, InteractiveHoverLinkProps>(
  ({ text = "Button", className, style, ...props }, ref) => (
    <a ref={ref} className={cn(shell, className)} style={{ ...shellStyle, ...style }} {...props}>
      <Inner text={text} />
    </a>
  ),
);
InteractiveHoverLink.displayName = "InteractiveHoverLink";

export { InteractiveHoverButton, InteractiveHoverLink };

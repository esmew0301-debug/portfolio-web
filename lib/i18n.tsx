import type { ReactNode } from "react";

// Bilingual copy. Both languages are rendered into the page and CSS shows one, based on the data-lang attribute on
// <html> (set before first paint by the inline script in app/layout.tsx, and by the toggle in the nav). Because the
// markup is identical in both languages, there is no hydration mismatch, no language flash, and switching keeps every
// interactive component's state. English stays the source of truth; Chinese is added alongside it.

/** Inline bilingual text: English, or Simplified Chinese when the visitor has chosen 中文. */
export function L({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  return (
    <>
      <span data-l="en">{en}</span>
      <span data-l="zh" lang="zh-CN">
        {zh}
      </span>
    </>
  );
}

/** Block-level bilingual content (wraps elements such as <p>, lists or components). */
export function LB({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  return (
    <>
      <div data-l="en" className="contents">
        {en}
      </div>
      <div data-l="zh" lang="zh-CN" className="contents">
        {zh}
      </div>
    </>
  );
}

/** A bilingual string pair, for data arrays rendered by components (use with <L {...pair} />). */
/** English, or the bilingual pair when a Chinese version is given. */
export const tx = (en: ReactNode, zh?: ReactNode): ReactNode => (zh ? <L en={en} zh={zh} /> : en);

export type Bi = { en: ReactNode; zh: ReactNode };
export const bi = (en: ReactNode, zh: ReactNode): ReactNode => <L en={en} zh={zh} />;

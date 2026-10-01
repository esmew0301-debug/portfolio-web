"use client";

import { useEffect, useState } from "react";

// Bottom-right reading-time marker; minutes are counted from the case study text itself.
export function ReadTime({ targetId }: { targetId: string }) {
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const text = document.getElementById(targetId)?.innerText ?? "";
    const words = text.split(/\s+/).filter(Boolean).length;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- measured from the rendered DOM
    setMinutes(Math.max(1, Math.round(words / 230)));
  }, [targetId]);

  if (minutes === null) return null;
  return (
    <div className="case-aside group fixed bottom-8 right-6 z-40 hidden items-center justify-end gap-3 lg:flex">
      <span className="font-gilroy max-w-0 overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-neutral-500 opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
        About {minutes} min read
      </span>
      <span className="font-gilroy shrink-0 text-[11px] tabular-nums tracking-[0.14em] text-neutral-400">{minutes}′</span>
      <span className="h-px w-4 shrink-0 rounded-full bg-neutral-600 transition-all duration-300 group-hover:w-8 group-hover:bg-neutral-300" />
    </div>
  );
}

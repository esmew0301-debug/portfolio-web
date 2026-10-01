"use client";

import { usePathname } from "next/navigation";

export function PageReveal() {
  const pathname = usePathname();
  return <div key={pathname} className="page-reveal" aria-hidden />;
}

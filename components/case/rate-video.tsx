"use client";

import { useEffect, useRef, type ComponentProps } from "react";

/** A <video> that plays at a given speed (e.g. 1.5). */
export function RateVideo({ rate = 1, ...props }: ComponentProps<"video"> & { rate?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const set = () => (v.playbackRate = rate);
    set();
    v.addEventListener("loadedmetadata", set);
    v.addEventListener("play", set);
    return () => {
      v.removeEventListener("loadedmetadata", set);
      v.removeEventListener("play", set);
    };
  }, [rate]);
  return <video ref={ref} {...props} />;
}

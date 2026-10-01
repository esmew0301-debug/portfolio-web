import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Placeholder visuals are SVGs; serve all images as-is so they can be swapped freely.
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;

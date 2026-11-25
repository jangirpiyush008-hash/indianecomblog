import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents + partialPrefetching disabled — we use dynamic dates in server components
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "rukminim2.flixcart.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

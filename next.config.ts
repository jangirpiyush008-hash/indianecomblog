import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  // cacheComponents + partialPrefetching disabled — we use dynamic dates in server components
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The site launched with India-only URLs. Keep them working: 301 to the India edition.
  async redirects() {
    const desks = ["technology", "ai-tools", "shopping", "money", "lifestyle", "entertainment", "travel"];
    return [
      ...desks.map((d) => ({ source: `/${d}/:path*`, destination: `/in/${d}/:path*`, permanent: true })),
      ...desks.map((d) => ({ source: `/${d}`, destination: `/in/${d}`, permanent: true })),
      { source: "/trending", destination: "/in/trending", permanent: true },
      { source: "/deals", destination: "/in/deals", permanent: true },
      { source: "/buying-guides", destination: "/in/buying-guides", permanent: true },
      { source: "/trending-products", destination: "/in/deals", permanent: true },
      { source: "/product-comparisons", destination: "/in/buying-guides", permanent: true },
      { source: "/compare/:slug", destination: "/in/technology/:slug", permanent: true },
      { source: "/collections/:slug", destination: "/in", permanent: true },
      { source: "/search", destination: "/in/search", permanent: true },
      { source: "/tag/:tag", destination: "/in/tag/:tag", permanent: true },
      { source: "/feed.xml", destination: "/in/feed.xml", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
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

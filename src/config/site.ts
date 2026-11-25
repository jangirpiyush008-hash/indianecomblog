import { categories } from "./brand";

export const siteConfig = {
  url: "https://fable.in",
  defaultLocale: "en-IN",
  nav: [
    { label: "Trending", href: "/trending" },
    { label: "Technology", href: "/technology" },
    { label: "AI Tools", href: "/ai-tools" },
    { label: "Shopping", href: "/shopping" },
    { label: "Money", href: "/money" },
    { label: "Lifestyle", href: "/lifestyle" },
    { label: "Entertainment", href: "/entertainment" },
    { label: "Travel", href: "/travel" },
  ],
  footerNav: {
    about: [
      { label: "About Us", href: "/about" },
      { label: "Authors", href: "/authors" },
      { label: "Editorial Policy", href: "/editorial-policy" },
      { label: "Corrections", href: "/corrections-policy" },
      { label: "Contact", href: "/contact" },
    ],
    discover: [
      { label: "Trending Now", href: "/trending" },
      { label: "Best Deals", href: "/deals" },
      { label: "Buying Guides", href: "/buying-guides" },
      { label: "Comparisons", href: "/product-comparisons" },
      { label: "Newsletter", href: "/newsletter" },
    ],
    business: [
      { label: "Advertise", href: "/advertise" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  categories,
} as const;

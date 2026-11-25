/**
 * Central brand configuration. Single source of truth for brand identity.
 * Swap the values here to rebrand the entire site.
 */

export const brand = {
  name: "TrendNations",
  shortName: "TrendNations",
  tagline: "What's trending, explained",
  description:
    "What's trending right now — tech, AI tools, shopping, money, lifestyle, entertainment and travel — explained with sources, plus price-checked buying guides.",
  domain: "trendnations.com",
  /** Public contact address. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info.trendnations@gmail.com",
  founder: "Piyush Jangir",
  /** Add real profile URLs here once the handles are registered. */
  social: {} as Record<string, string>,
  colors: {
    ink: "#0A0A0B",
    cream: "#FAF6F1",
    accent: "#D4502C",
    accentDark: "#B8431F",
    gold: "#C9A961",
    muted: "#6B6560",
    line: "#E6E0D8",
  },
  typography: {
    serif: "var(--font-serif)",
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
} as const;

export const categories = [
  {
    slug: "trending",
    name: "Trending",
    tagline: "What India is talking about",
    accent: "#D4502C",
    icon: "flame",
  },
  {
    slug: "technology",
    name: "Technology",
    tagline: "Phones, laptops, gadgets & what's next",
    accent: "#2563EB",
    icon: "cpu",
  },
  {
    slug: "ai-tools",
    name: "AI Tools",
    tagline: "The tools reshaping how India works",
    accent: "#9333EA",
    icon: "sparkles",
  },
  {
    slug: "shopping",
    name: "Shopping",
    tagline: "Products worth your rupees",
    accent: "#059669",
    icon: "shopping-bag",
  },
  {
    slug: "money",
    name: "Money",
    tagline: "Personal finance, decoded",
    accent: "#DC2626",
    icon: "trending-up",
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    tagline: "Fashion, beauty, home & how we live",
    accent: "#DB2777",
    icon: "shirt",
  },
  {
    slug: "entertainment",
    name: "Entertainment",
    tagline: "OTT, cinema, music, stars",
    accent: "#EA580C",
    icon: "clapperboard",
  },
  {
    slug: "travel",
    name: "Travel",
    tagline: "Where India is going",
    accent: "#0891B2",
    icon: "plane",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

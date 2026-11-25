export type Category =
  | "trending"
  | "technology"
  | "ai-tools"
  | "shopping"
  | "money"
  | "lifestyle"
  | "entertainment"
  | "travel";

export interface Author {
  slug: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  /** Public profile URLs (used for schema.org sameAs). */
  sameAs?: string[];
}

/** One block of an article body. Headings get stable ids for the table of contents. */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string }
  | { type: "products"; slugs: string[] };

export interface Source {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  /** SEO title if different from the on-page H1. */
  seoTitle?: string;
  subtitle?: string;
  excerpt: string;
  category: Category;
  categoryName: string;
  categoryAccent?: string;
  tags?: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  heroImage: string;
  heroImageAlt?: string;
  featured?: boolean;
  trending?: boolean;
  isSponsored?: boolean;
  url: string;
  /** Short answer-first summary, shown at the top (helps readers and AI answer engines). */
  keyTakeaways?: string[];
  body?: ArticleBlock[];
  faq?: FaqItem[];
  sources?: Source[];
  /** How the information was gathered — shown honestly at the end of the article. */
  methodology?: string;
  /** Products shown in the "Where to buy" box. */
  productSlugs?: string[];
}

export type Merchant =
  | "amazon"
  | "flipkart"
  | "nykaa"
  | "myntra"
  | "ajio"
  | "boat"
  | "noise"
  | "other";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  /** Selling price on the merchant's own site when last verified. */
  price: number;
  /** MRP shown by the merchant when last verified. */
  originalPrice?: number;
  discount?: number;
  /** Only set when taken from a reliable, named source. Never invented. */
  rating?: number;
  reviewCount?: number;
  merchant: Merchant;
  merchantName: string;
  /** Full EarnKaro tracking URL (never a shortened bitli.in link). */
  affiliateUrl: string;
  /** Plain merchant product page the affiliate link resolves to. */
  sourceUrl: string;
  affiliateNetwork: "earnkaro";
  /** Manufacturer-stated specs, as published on the product page. */
  keyFeatures?: string[];
  verdict?: string;
  verifiedAt: string;
  availability?: "in_stock" | "limited" | "out_of_stock";
}

export interface Trend {
  id: string;
  topic: string;
  category: Category;
  categoryName: string;
  summary?: string;
  direction?: "up" | "steady" | "down";
  /** Only present when computed from collected signals. */
  interestScore?: number;
  discoveredAt: string;
  sources?: Source[];
  relatedArticles?: Pick<Article, "slug" | "title" | "url">[];
}

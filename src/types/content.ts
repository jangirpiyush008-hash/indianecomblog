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
  avatar: string;
  bio?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
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
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  merchant: "amazon" | "flipkart" | "nykaa" | "myntra" | "ajio" | "other";
  merchantName: string;
  affiliateUrl: string;
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
  summary: string;
  direction: "up" | "steady" | "down";
  interestScore: number;
  discoveredAt: string;
  sources?: { name: string; url: string }[];
  relatedArticles?: Pick<Article, "slug" | "title" | "url">[];
}

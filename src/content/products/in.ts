import type { Product } from "@/types/content";

/**
 * Real products, priced from the brand's own store.
 *
 * Prices and MRPs were read from each brand's public catalogue on the
 * `verifiedAt` date. Specs are the manufacturer's own claims from the product
 * page — not our lab measurements. No ratings or review counts are shown
 * because we have not sourced them reliably.
 *
 * Affiliate links: every `affiliateUrl` is the FULL EarnKaro tracking URL
 * (trackingv3.linkredirect.in), generated in EarnKaro's "Make Links" tool and
 * expanded from the bitli.in short link. Never paste a bitli.in link here —
 * `assertFullEarnKaroUrl` below rejects them at build time.
 */

const VERIFIED = "2026-11-25T10:00:00+05:30";

const ek = (store: number, shareId: string, url: string) =>
  `https://trackingv3.linkredirect.in/visitretailer/${store}?id=2680365&shareid=${shareId}&dl=${encodeURIComponent(url)}`;

const BOAT = 3103;
const NOISE = 2390;

const pct = (price: number, mrp: number) => Math.round(((mrp - price) / mrp) * 100);

const raw: Omit<Product, "discount" | "affiliateNetwork" | "country" | "currency">[] = [
  {
    id: "p-boat-airdopes-423-anc",
    slug: "boat-airdopes-423-anc",
    name: "boAt Airdopes 423 ANC",
    brand: "boAt",
    category: "Wireless Earbuds",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Frame2147234686.png?v=1793706128",
    price: 1599,
    originalPrice: 4599,
    merchant: "boat",
    merchantName: "boAt store",
    sourceUrl: "https://www.boat-lifestyle.com/products/boat-airdopes-423-anc",
    affiliateUrl: ek(BOAT, "q8N3yzu", "https://www.boat-lifestyle.com/products/boat-airdopes-423-anc"),
    keyFeatures: ["35dB ANC", "Up to 50h playback", "12mm drivers", "4 mics", "Bluetooth 6.0"],
    verdict: "The cheapest way into 35dB ANC with Bluetooth 6.0 on boAt's own store.",
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-boat-airdopes-prime-702-anc",
    slug: "boat-airdopes-prime-702-anc",
    name: "boAt Airdopes Prime 702 ANC",
    brand: "boAt",
    category: "Wireless Earbuds",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/1_50445a70-f39a-4c0f-a517-5ed995744445.png?v=1793087077",
    price: 2199,
    originalPrice: 5990,
    merchant: "boat",
    merchantName: "boAt store",
    sourceUrl: "https://www.boat-lifestyle.com/products/boat-airdopes-prime-702-anc",
    affiliateUrl: ek(BOAT, "52Btczm", "https://www.boat-lifestyle.com/products/boat-airdopes-prime-702-anc"),
    keyFeatures: ["Up to 48dB hybrid ANC", "Up to 50h playback", "Spatial audio", "Hearables app support"],
    verdict: "The strongest ANC claim under ₹2,500 in this list.",
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-boat-airdopes-plus-spark-anc",
    slug: "boat-airdopes-plus-spark-anc",
    name: "boAt Airdopes Plus Spark ANC",
    brand: "boAt",
    category: "Wireless Earbuds",
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/463.png?v=1792407306",
    price: 1499,
    originalPrice: 4990,
    merchant: "boat",
    merchantName: "boAt store",
    sourceUrl: "https://www.boat-lifestyle.com/products/boat-airdopes-plus-spark-anc",
    affiliateUrl: ek(BOAT, "tg3k3mG", "https://www.boat-lifestyle.com/products/boat-airdopes-plus-spark-anc"),
    keyFeatures: ["Up to 35dB ANC", "Up to 55h playback", "13mm drivers", "Quad mics", "Bluetooth 6.0"],
    verdict: "Lowest price here, with the longest claimed battery life of the earbuds.",
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-boat-rockerz-430-gen-2",
    slug: "boat-rockerz-430-gen-2",
    name: "boAt Rockerz 430 Gen 2",
    brand: "boAt",
    category: "Wireless Headphones",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Frame2147234603.png?v=1793962138",
    price: 1499,
    originalPrice: 2490,
    merchant: "boat",
    merchantName: "boAt store",
    sourceUrl: "https://www.boat-lifestyle.com/products/boat-rockerz-430-gen-2",
    affiliateUrl: ek(BOAT, "NH7c3xK", "https://www.boat-lifestyle.com/products/boat-rockerz-430-gen-2"),
    keyFeatures: ["Up to 60h playback", "50mm drivers", "40ms low-latency mode", "Bluetooth 5.4"],
    verdict: "Over-ear option for long battery life. No ANC.",
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-boat-nirvana-eutopia-2-anc",
    slug: "boat-nirvana-eutopia-2-anc",
    name: "boAt Nirvana Eutopia 2 ANC",
    brand: "boAt",
    category: "Wireless Headphones",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Frame1597880962.png?v=1783059568",
    price: 5079,
    originalPrice: 9990,
    merchant: "boat",
    merchantName: "boAt store",
    sourceUrl: "https://www.boat-lifestyle.com/products/nirvana-eutopia-2-anc",
    affiliateUrl: ek(BOAT, "e9c9r99", "https://www.boat-lifestyle.com/products/nirvana-eutopia-2-anc"),
    keyFeatures: ["45dB adaptive hybrid ANC", "Up to 80h playback", "Dual drivers", "Bluetooth 5.4"],
    verdict: "boAt's step-up over-ear ANC headphones.",
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-boat-ultima-vogue-2",
    slug: "boat-ultima-vogue-2",
    name: "boAt Ultima Vogue 2",
    brand: "boAt",
    category: "Smartwatches",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Frame_14_21a9a84f-32e4-4c5f-8730-2b1f57de3e2c.png?v=1781613507",
    price: 2799,
    originalPrice: 7999,
    merchant: "boat",
    merchantName: "boAt store",
    sourceUrl: "https://www.boat-lifestyle.com/products/boat-ultima-vogue-2",
    affiliateUrl: ek(BOAT, "kdgcFCY", "https://www.boat-lifestyle.com/products/boat-ultima-vogue-2"),
    keyFeatures: ['1.96" AMOLED display', "Metal build", "Bluetooth calling", "Type-C charging"],
    verdict: "AMOLED, metal and Type-C charging under ₹3,000.",
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-noise-colorfit-ultra-4",
    slug: "noise-colorfit-ultra-4",
    name: "Noise ColorFit Ultra 4",
    brand: "Noise",
    category: "Smartwatches",
    image: "https://cdn.shopify.com/s/files/1/0997/6284/files/Ultra_4_Black_1.png?v=1791182389",
    price: 5999,
    originalPrice: 8999,
    merchant: "noise",
    merchantName: "Noise store",
    sourceUrl: "https://www.gonoise.com/products/noise-colorfit-ultra-4-smartwatch",
    affiliateUrl: ek(NOISE, "ePj9sVi", "https://www.gonoise.com/products/noise-colorfit-ultra-4-smartwatch"),
    keyFeatures: ['1.96" AMOLED, 600 nits', "Always-on display", "Heart rate, SpO₂, stress, sleep", "Up to 7 days battery"],
    verdict: "Noise's step-up watch with a brighter AMOLED and functional crown.",
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-noise-kore",
    slug: "noise-kore",
    name: "Noise ColorFit Kore Smartwatch",
    brand: "Noise",
    category: "Smartwatches",
    image:
      "https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard1copy_result_6385a067-75b4-4e6f-b193-6867ec8a7423.webp?v=1793962088",
    price: 1299,
    originalPrice: 5999,
    merchant: "noise",
    merchantName: "Noise store",
    sourceUrl: "https://www.gonoise.com/products/noise-kore-smartwatch",
    affiliateUrl: ek(NOISE, "yh742g6", "https://www.gonoise.com/products/noise-kore-smartwatch"),
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-noise-colorfit-pulse-air",
    slug: "noise-colorfit-pulse-air",
    name: "Noise ColorFit Pulse Air Smartwatch",
    brand: "Noise",
    category: "Smartwatches",
    image:
      "https://cdn.shopify.com/s/files/1/0997/6284/files/Frame2147240823_result.webp?v=1793255091",
    price: 1399,
    merchant: "noise",
    merchantName: "Noise store",
    sourceUrl: "https://www.gonoise.com/products/noise-colorfit-pulse-air-smartwatch",
    affiliateUrl: ek(NOISE, "MdWDcuT", "https://www.gonoise.com/products/noise-colorfit-pulse-air-smartwatch"),
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
  {
    id: "p-noise-buds-mini-x",
    slug: "noise-buds-mini-x",
    name: "Noise Buds Mini X",
    brand: "Noise",
    category: "Wireless Earbuds",
    image: "https://cdn.shopify.com/s/files/1/0997/6284/files/Buds_MINI_X_7.png?v=1792345677",
    price: 1199,
    originalPrice: 2999,
    merchant: "noise",
    merchantName: "Noise store",
    sourceUrl: "https://www.gonoise.com/products/noise-buds-mini-x-truly-wireless-bluetooth-earbuds",
    affiliateUrl: ek(
      NOISE,
      "p5hwueB",
      "https://www.gonoise.com/products/noise-buds-mini-x-truly-wireless-bluetooth-earbuds"
    ),
    verifiedAt: VERIFIED,
    availability: "in_stock",
  },
];

export function assertFullEarnKaroUrl(url: string) {
  const u = new URL(url);
  if (u.hostname !== "trackingv3.linkredirect.in" || !u.searchParams.get("dl")) {
    throw new Error(`Affiliate links must be full EarnKaro tracking URLs, got: ${url}`);
  }
}

export const products: Product[] = raw.map((p) => {
  assertFullEarnKaroUrl(p.affiliateUrl);
  return {
    ...p,
    country: "in",
    currency: "INR",
    affiliateNetwork: "earnkaro",
    discount: p.originalPrice ? pct(p.price, p.originalPrice) : undefined,
  };
});

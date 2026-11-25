import type { Product } from "@/types/content";
import type { CountryCode } from "@/config/countries";
import { products as inProducts } from "./in";

/**
 * Products keyed by edition. An edition only gets products once it has an
 * approved, tested affiliate programme — no placeholders.
 */
export const PRODUCTS: Record<CountryCode, Product[]> = {
  in: inProducts, us: [], gb: [], ca: [], au: [], ae: [], sa: [], de: [], fr: [], br: [],
};

for (const [code, list] of Object.entries(PRODUCTS)) {
  for (const p of list) {
    if (p.country !== code) throw new Error(`Product ${p.slug} has country ${p.country} but is registered under ${code}`);
  }
}

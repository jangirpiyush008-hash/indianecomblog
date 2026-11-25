import type { Article } from "@/types/content";
import type { CountryCode } from "@/config/countries";
import { articles as inArticles } from "./in";
import { articles as us } from "./us";
import { articles as gb } from "./gb";
import { articles as ca } from "./ca";
import { articles as au } from "./au";
import { articles as ae } from "./ae";
import { articles as sa } from "./sa";
import { articles as de } from "./de";
import { articles as fr } from "./fr";
import { articles as br } from "./br";

/** Articles keyed by edition. Each edition's list only ever contains its own articles. */
export const ARTICLES: Record<CountryCode, Article[]> = { in: inArticles, us, gb, ca, au, ae, sa, de, fr, br };

// Guard: an article must belong to the edition it is registered under.
for (const [code, list] of Object.entries(ARTICLES)) {
  for (const a of list) {
    if (a.country !== code) throw new Error(`Article ${a.slug} has country ${a.country} but is registered under ${code}`);
  }
}

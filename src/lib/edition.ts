import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { ALL_COUNTRIES, COUNTRIES, getCountry, urls, type CountryCode, type Country } from "@/config/countries";
import { DICTIONARIES, type Dictionary } from "@/config/dictionaries";
import type { HeaderProps } from "@/components/layout/Header";
import type { SwitcherCountry } from "@/components/layout/CountrySwitcher";

export type Edition = { country: Country; code: CountryCode; dict: Dictionary };

/** Resolve the edition from a route param or 404. */
/** Non-English editions are named in their own language (Deutschland, Brasil…). */
const localName = (c: Country) => (c.lang === "en" ? c.name : c.nativeName);

const TAGLINES: Record<Country["lang"], string> = {
  en: brand.tagline,
  de: "Was im Trend liegt – erklärt",
  fr: "Les tendances, expliquées",
  pt: "O que está em alta, explicado",
  ja: "話題のトピックをわかりやすく",
};

export function edition(param: string): Edition {
  const found = getCountry(param);
  if (!found) notFound();
  const country = { ...found, name: localName(found) };
  return { country, code: country.code, dict: DICTIONARIES[country.lang] };
}

export const switcherCountries: SwitcherCountry[] = ALL_COUNTRIES.map((c) => ({
  code: c.code,
  flag: c.flag,
  name: c.name,
  nativeName: c.nativeName,
}));

export function headerProps(code?: CountryCode): HeaderProps {
  if (!code) {
    return {
      homeHref: "/",
      tagline: brand.tagline,
      nav: [],
      topLinks: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      labels: { search: "Search", searchPlaceholder: "Search…", subscribe: "Subscribe", menu: "Open menu", close: "Close", edition: "Choose edition" },
      locale: "en-GB",
      timeZone: "UTC",
      countries: switcherCountries,
    };
  }
  const c = COUNTRIES[code];
  const d = DICTIONARIES[c.lang];
  const current = switcherCountries.find((s) => s.code === code)!;
  return {
    homeHref: urls.home(code),
    tagline: TAGLINES[c.lang],
    nav: [
      { label: d.sections.trending, href: urls.section(code, "trending") },
      ...c.deskPriority.map((desk) => ({ label: d.sections[desk], href: urls.section(code, desk) })),
    ],
    highlight: { label: d.sections.deals, href: urls.section(code, "deals") },
    topLinks: [
      { label: d.ui.trendingNow, href: urls.section(code, "trending") },
      { label: d.sections.guides, href: urls.section(code, "guides") },
    ],
    searchAction: urls.section(code, "search"),
    labels: {
      search: d.sections.search,
      searchPlaceholder: d.ui.searchPlaceholder,
      subscribe: d.ui.newsletterTitle,
      menu: "Menu",
      close: "×",
      edition: d.ui.changeEdition,
    },
    locale: c.locale,
    timeZone: c.timeZone,
    countries: switcherCountries,
    current: { ...current, name: localName(c) },
  };
}

export function footerDiscover(code: CountryCode) {
  const c = COUNTRIES[code];
  const d = DICTIONARIES[c.lang];
  return {
    title: `${c.flag} ${localName(c)}`,
    links: [
      { label: d.sections.trending, href: urls.section(code, "trending") },
      { label: d.sections.shopping, href: urls.section(code, "shopping") },
      { label: d.sections.deals, href: urls.section(code, "deals") },
      { label: d.sections.guides, href: urls.section(code, "guides") },
      { label: d.sections.search, href: urls.section(code, "search") },
    ],
  };
}

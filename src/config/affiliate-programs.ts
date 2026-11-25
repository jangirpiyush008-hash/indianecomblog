import type { CountryCode } from "./countries";

export type ProgramStatus =
  | "not_started"
  | "registration_required"
  | "applied"
  | "pending_approval"
  | "approved"
  | "integration_connected"
  | "needs_attention";

export interface AffiliateProgram {
  country: CountryCode;
  network: string;
  name: string;
  registrationUrl: string;
  status: ProgramStatus;
  /** How links are generated once approved. */
  linkMethod: string;
  notes?: string;
  /** Date the registration URL was last confirmed reachable. Terms are NOT yet reviewed unless noted. */
  lastChecked: string;
}

const CHECKED = "2026-11-25";

/**
 * Affiliate programmes per edition — a research starting point, not a claim that
 * each accepts every publisher. Status only becomes "integration_connected" after a
 * link has been generated and tested end to end.
 */
export const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  // India
  { country: "in", network: "earnkaro", name: "EarnKaro", registrationUrl: "https://earnkaro.com", status: "integration_connected", linkMethod: "Make Links tool → expand bitli.in to full linkredirect.in URL", notes: "10 boAt/Noise links generated and tested. Flipkart paused as a partner; no Amazon.", lastChecked: CHECKED },
  { country: "in", network: "amazon", name: "Amazon Associates India", registrationUrl: "https://affiliate-program.amazon.in", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "in", network: "admitad", name: "Admitad", registrationUrl: "https://www.admitad.com/en/webmaster/", status: "not_started", linkMethod: "Deeplink generator / API", lastChecked: CHECKED },
  { country: "in", network: "cuelinks", name: "Cuelinks", registrationUrl: "https://www.cuelinks.com", status: "not_started", linkMethod: "Link converter / API", lastChecked: CHECKED },
  // United States
  { country: "us", network: "amazon", name: "Amazon Associates (US)", registrationUrl: "https://affiliate-program.amazon.com", status: "not_started", linkMethod: "SiteStripe / tracking tag", notes: "Amazon requires qualifying sales within 180 days of approval.", lastChecked: CHECKED },
  { country: "us", network: "impact", name: "Impact", registrationUrl: "https://impact.com/partners/", status: "not_started", linkMethod: "Per-brand tracking links / API", lastChecked: CHECKED },
  { country: "us", network: "cj", name: "CJ Affiliate", registrationUrl: "https://www.cj.com/", status: "not_started", linkMethod: "Deep link generator / API", lastChecked: CHECKED },
  { country: "us", network: "rakuten", name: "Rakuten Advertising", registrationUrl: "https://rakutenadvertising.com/", status: "not_started", linkMethod: "Link builder / API", lastChecked: CHECKED },
  { country: "us", network: "awin", name: "Awin", registrationUrl: "https://www.awin.com/gb/publishers", status: "not_started", linkMethod: "Link builder / API (one account, many countries)", lastChecked: CHECKED },
  // United Kingdom
  { country: "gb", network: "amazon", name: "Amazon Associates UK", registrationUrl: "https://affiliate-program.amazon.co.uk", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "gb", network: "awin", name: "Awin", registrationUrl: "https://www.awin.com/gb/publishers", status: "not_started", linkMethod: "Link builder / API", lastChecked: CHECKED },
  { country: "gb", network: "impact", name: "Impact", registrationUrl: "https://impact.com/partners/", status: "not_started", linkMethod: "Per-brand tracking links", lastChecked: CHECKED },
  // Canada
  { country: "ca", network: "amazon", name: "Amazon.ca Associates", registrationUrl: "https://associates.amazon.ca", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "ca", network: "rakuten", name: "Rakuten Advertising", registrationUrl: "https://rakutenadvertising.com/", status: "not_started", linkMethod: "Link builder", lastChecked: CHECKED },
  { country: "ca", network: "impact", name: "Impact", registrationUrl: "https://impact.com/partners/", status: "not_started", linkMethod: "Per-brand tracking links", lastChecked: CHECKED },
  // Australia
  { country: "au", network: "amazon", name: "Amazon Associates Australia", registrationUrl: "https://affiliate-program.amazon.com.au", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "au", network: "commission-factory", name: "Commission Factory", registrationUrl: "https://www.commissionfactory.com", status: "not_started", linkMethod: "Tracking links / API", lastChecked: CHECKED },
  // UAE (Dubai)
  { country: "ae", network: "amazon", name: "Amazon.ae Associates", registrationUrl: "https://affiliate-program.amazon.ae", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "ae", network: "admitad", name: "Admitad", registrationUrl: "https://www.admitad.com/en/webmaster/", status: "not_started", linkMethod: "Deeplink generator", lastChecked: CHECKED },
  { country: "ae", network: "arabclicks", name: "ArabClicks", registrationUrl: "https://arabclicks.com", status: "not_started", linkMethod: "Tracking links", notes: "Gulf-focused network.", lastChecked: CHECKED },
  // Saudi Arabia
  { country: "sa", network: "amazon", name: "Amazon.sa Associates", registrationUrl: "https://affiliate-program.amazon.sa", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "sa", network: "arabclicks", name: "ArabClicks", registrationUrl: "https://arabclicks.com", status: "not_started", linkMethod: "Tracking links", lastChecked: CHECKED },
  { country: "sa", network: "admitad", name: "Admitad", registrationUrl: "https://www.admitad.com/en/webmaster/", status: "not_started", linkMethod: "Deeplink generator", lastChecked: CHECKED },
  // Germany
  { country: "de", network: "amazon", name: "Amazon PartnerNet", registrationUrl: "https://partnernet.amazon.de", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "de", network: "awin", name: "Awin", registrationUrl: "https://www.awin.com/gb/publishers", status: "not_started", linkMethod: "Link builder / API", lastChecked: CHECKED },
  { country: "de", network: "tradetracker", name: "TradeTracker", registrationUrl: "https://tradetracker.com", status: "not_started", linkMethod: "Tracking links", lastChecked: CHECKED },
  // France
  { country: "fr", network: "amazon", name: "Amazon Partenaires", registrationUrl: "https://partenaires.amazon.fr", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "fr", network: "awin", name: "Awin", registrationUrl: "https://www.awin.com/gb/publishers", status: "not_started", linkMethod: "Link builder / API", lastChecked: CHECKED },
  { country: "fr", network: "effiliation", name: "Effiliation", registrationUrl: "https://www.effiliation.com", status: "not_started", linkMethod: "Tracking links", lastChecked: CHECKED },
  { country: "fr", network: "cj", name: "CJ Affiliate", registrationUrl: "https://www.cj.com/", status: "not_started", linkMethod: "Deep link generator", lastChecked: CHECKED },
  // Brazil
  { country: "br", network: "amazon", name: "Amazon Associados", registrationUrl: "https://associados.amazon.com.br", status: "not_started", linkMethod: "SiteStripe / tracking tag", lastChecked: CHECKED },
  { country: "br", network: "mercadolivre", name: "Mercado Livre Afiliados", registrationUrl: "https://www.mercadolivre.com.br/l/afiliados-home", status: "not_started", linkMethod: "Link generator in affiliate panel", lastChecked: CHECKED },
  { country: "br", network: "awin", name: "Awin", registrationUrl: "https://www.awin.com/gb/publishers", status: "not_started", linkMethod: "Link builder / API", lastChecked: CHECKED },
];

export const STATUS_LABEL: Record<ProgramStatus, string> = {
  not_started: "Not started",
  registration_required: "Registration required",
  applied: "Applied",
  pending_approval: "Pending approval",
  approved: "Approved",
  integration_connected: "Integration connected",
  needs_attention: "Needs attention",
};

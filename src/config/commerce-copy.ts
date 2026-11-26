import type { Lang } from "@/config/countries";

export const COMMERCE_COPY: Record<Lang, { checkPrice: string; comingSoon: string; notAffiliate: string }> = {
  en: { checkPrice: "Check current price", comingSoon: "Link coming soon", notAffiliate: "Not an affiliate link" },
  de: { checkPrice: "Aktuellen Preis prüfen", comingSoon: "Link folgt in Kürze", notAffiliate: "Kein Affiliate-Link" },
  fr: { checkPrice: "Vérifier le prix actuel", comingSoon: "Lien bientôt disponible", notAffiliate: "Lien non affilié" },
  pt: { checkPrice: "Confira o preço atual", comingSoon: "Link em breve", notAffiliate: "Link sem afiliação" },
  ja: { checkPrice: "最新価格を確認", comingSoon: "リンク準備中", notAffiliate: "アフィリエイトリンクではありません" },
};

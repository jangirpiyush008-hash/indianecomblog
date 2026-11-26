import type { Lang } from "@/config/countries";

export type ConsentCopy = {
  title: string;
  text: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  save: string;
  necessary: string;
  necessaryText: string;
  analytics: string;
  analyticsText: string;
  marketing: string;
  marketingText: string;
  alwaysOn: string;
  policy: string;
  settingsLink: string;
};

export const CONSENT_COPY: Record<Lang, ConsentCopy> = {
  en: {
    title: "Your privacy choices",
    text: "We use essential cookies to remember your edition and keep the site secure. With your permission, we also use analytics and marketing cookies through Google Tag Manager. They stay off unless you allow them.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    customize: "Customise",
    save: "Save choices",
    necessary: "Essential",
    necessaryText: "Remembers your edition and these choices, and keeps the site secure. Always on.",
    analytics: "Analytics",
    analyticsText: "Helps us understand which articles are read and useful (for example Google Analytics).",
    marketing: "Marketing",
    marketingText: "Lets advertising and affiliate partners measure ads and offers.",
    alwaysOn: "Always on",
    policy: "Privacy policy",
    settingsLink: "Cookie settings",
  },
  de: {
    title: "Ihre Datenschutz-Einstellungen",
    text: "Wir verwenden notwendige Cookies, um Ihre Ausgabe zu speichern und die Website zu schützen. Mit Ihrer Einwilligung nutzen wir außerdem Analyse- und Marketing-Cookies über den Google Tag Manager. Ohne Ihre Zustimmung bleiben sie deaktiviert.",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    customize: "Anpassen",
    save: "Auswahl speichern",
    necessary: "Notwendig",
    necessaryText: "Speichert Ihre Ausgabe und diese Auswahl und schützt die Website. Immer aktiv.",
    analytics: "Analyse",
    analyticsText: "Zeigt uns, welche Artikel gelesen werden und hilfreich sind (z. B. Google Analytics).",
    marketing: "Marketing",
    marketingText: "Ermöglicht Werbe- und Affiliate-Partnern, Anzeigen und Angebote zu messen.",
    alwaysOn: "Immer aktiv",
    policy: "Datenschutzerklärung",
    settingsLink: "Cookie-Einstellungen",
  },
  fr: {
    title: "Vos choix en matière de confidentialité",
    text: "Nous utilisons des cookies essentiels pour mémoriser votre édition et sécuriser le site. Avec votre accord, nous utilisons aussi des cookies de mesure d'audience et marketing via Google Tag Manager. Ils restent désactivés sans votre accord.",
    acceptAll: "Tout accepter",
    rejectAll: "Tout refuser",
    customize: "Personnaliser",
    save: "Enregistrer mes choix",
    necessary: "Essentiels",
    necessaryText: "Mémorisent votre édition et ces choix, et sécurisent le site. Toujours actifs.",
    analytics: "Mesure d'audience",
    analyticsText: "Nous aide à savoir quels articles sont lus et utiles (par exemple Google Analytics).",
    marketing: "Marketing",
    marketingText: "Permet à nos partenaires publicitaires et affiliés de mesurer publicités et offres.",
    alwaysOn: "Toujours actifs",
    policy: "Politique de confidentialité",
    settingsLink: "Gestion des cookies",
  },
  pt: {
    title: "Suas escolhas de privacidade",
    text: "Usamos cookies essenciais para lembrar sua edição e manter o site seguro. Com sua permissão, usamos também cookies de análise e de marketing pelo Google Tag Manager. Eles continuam desligados se você não permitir.",
    acceptAll: "Aceitar todos",
    rejectAll: "Rejeitar todos",
    customize: "Personalizar",
    save: "Salvar escolhas",
    necessary: "Essenciais",
    necessaryText: "Lembram sua edição e estas escolhas e mantêm o site seguro. Sempre ativos.",
    analytics: "Análise",
    analyticsText: "Ajudam a entender quais matérias são lidas e úteis (por exemplo, Google Analytics).",
    marketing: "Marketing",
    marketingText: "Permitem a parceiros de publicidade e afiliados medir anúncios e ofertas.",
    alwaysOn: "Sempre ativos",
    policy: "Política de privacidade",
    settingsLink: "Configurações de cookies",
  },
  ja: {
    title: "プライバシー設定",
    text: "エディションの保存とサイトの安全のために必須のCookieを使用しています。同意いただいた場合のみ、Google タグ マネージャーを通じて分析・マーケティング用Cookieを使用します。",
    acceptAll: "すべて許可",
    rejectAll: "すべて拒否",
    customize: "カスタマイズ",
    save: "選択を保存",
    necessary: "必須",
    necessaryText: "エディションとこの設定を保存し、サイトを保護します。常に有効。",
    analytics: "分析",
    analyticsText: "読まれている記事の把握に使われます（例：Google アナリティクス）。",
    marketing: "マーケティング",
    marketingText: "広告・アフィリエイトパートナーによる効果測定に使われます。",
    alwaysOn: "常に有効",
    policy: "プライバシーポリシー",
    settingsLink: "Cookie設定",
  },
};

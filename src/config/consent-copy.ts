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
    text: "We use essential cookies to remember your edition and keep the site secure. With your permission we may also use analytics or marketing cookies — none are active today, and they stay off unless you allow them.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    customize: "Customise",
    save: "Save choices",
    necessary: "Essential",
    necessaryText: "Remembers your edition and these choices, and keeps the site secure. Always on.",
    analytics: "Analytics",
    analyticsText: "Would help us understand which articles are useful. Not in use yet.",
    marketing: "Marketing",
    marketingText: "Would let partners measure ads or offers. Not in use yet.",
    alwaysOn: "Always on",
    policy: "Privacy policy",
    settingsLink: "Cookie settings",
  },
  de: {
    title: "Ihre Datenschutz-Einstellungen",
    text: "Wir verwenden notwendige Cookies, um Ihre Ausgabe zu speichern und die Website zu schützen. Mit Ihrer Einwilligung könnten wir auch Analyse- oder Marketing-Cookies nutzen – derzeit ist keines davon aktiv, und sie bleiben aus, solange Sie nicht zustimmen.",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    customize: "Anpassen",
    save: "Auswahl speichern",
    necessary: "Notwendig",
    necessaryText: "Speichert Ihre Ausgabe und diese Auswahl und schützt die Website. Immer aktiv.",
    analytics: "Analyse",
    analyticsText: "Würde uns zeigen, welche Artikel hilfreich sind. Derzeit nicht im Einsatz.",
    marketing: "Marketing",
    marketingText: "Würde Partnern ermöglichen, Werbung oder Angebote zu messen. Derzeit nicht im Einsatz.",
    alwaysOn: "Immer aktiv",
    policy: "Datenschutzerklärung",
    settingsLink: "Cookie-Einstellungen",
  },
  fr: {
    title: "Vos choix en matière de confidentialité",
    text: "Nous utilisons des cookies essentiels pour mémoriser votre édition et sécuriser le site. Avec votre accord, nous pourrions aussi utiliser des cookies de mesure d'audience ou marketing — aucun n'est actif aujourd'hui, et ils restent désactivés sans votre accord.",
    acceptAll: "Tout accepter",
    rejectAll: "Tout refuser",
    customize: "Personnaliser",
    save: "Enregistrer mes choix",
    necessary: "Essentiels",
    necessaryText: "Mémorisent votre édition et ces choix, et sécurisent le site. Toujours actifs.",
    analytics: "Mesure d'audience",
    analyticsText: "Nous aiderait à savoir quels articles sont utiles. Pas encore utilisé.",
    marketing: "Marketing",
    marketingText: "Permettrait à des partenaires de mesurer publicités ou offres. Pas encore utilisé.",
    alwaysOn: "Toujours actifs",
    policy: "Politique de confidentialité",
    settingsLink: "Gestion des cookies",
  },
  pt: {
    title: "Suas escolhas de privacidade",
    text: "Usamos cookies essenciais para lembrar sua edição e manter o site seguro. Com sua permissão, poderíamos usar também cookies de análise ou de marketing — nenhum está ativo hoje, e eles continuam desligados se você não permitir.",
    acceptAll: "Aceitar todos",
    rejectAll: "Rejeitar todos",
    customize: "Personalizar",
    save: "Salvar escolhas",
    necessary: "Essenciais",
    necessaryText: "Lembram sua edição e estas escolhas e mantêm o site seguro. Sempre ativos.",
    analytics: "Análise",
    analyticsText: "Ajudariam a entender quais matérias são úteis. Ainda não utilizados.",
    marketing: "Marketing",
    marketingText: "Permitiriam a parceiros medir anúncios ou ofertas. Ainda não utilizados.",
    alwaysOn: "Sempre ativos",
    policy: "Política de privacidade",
    settingsLink: "Configurações de cookies",
  },
  ja: {
    title: "プライバシー設定",
    text: "エディションの保存とサイトの安全のために必須のCookieを使用しています。同意があれば分析・マーケティング用Cookieを使う場合がありますが、現在はいずれも使用しておらず、同意がない限り無効のままです。",
    acceptAll: "すべて許可",
    rejectAll: "すべて拒否",
    customize: "カスタマイズ",
    save: "選択を保存",
    necessary: "必須",
    necessaryText: "エディションとこの設定を保存し、サイトを保護します。常に有効。",
    analytics: "分析",
    analyticsText: "役立つ記事の把握に使われます。現在は未使用です。",
    marketing: "マーケティング",
    marketingText: "広告やオファーの効果測定に使われます。現在は未使用です。",
    alwaysOn: "常に有効",
    policy: "プライバシーポリシー",
    settingsLink: "Cookie設定",
  },
};

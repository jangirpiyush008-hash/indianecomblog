import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "ae-aecb-credit-score",
    slug: "aecb-credit-score-uae-how-to-check",
    title: "How to check your AECB credit score in Dubai and the UAE (and what it costs)",
    seoTitle: "Check Your AECB Credit Score in the UAE: App, UAE PASS, Fees (2026)",
    subtitle: "Planning a loan, credit card or car finance in Dubai? Your Al Etihad Credit Bureau score decides a lot. Here's how to get it in minutes.",
    excerpt:
      "The Al Etihad Credit Bureau (AECB) app and website let UAE residents buy their credit score and report with UAE PASS. Steps, official fees and how to fix errors.",
    category: "money",
    tags: ["AECB", "Credit Score", "Dubai", "UAE PASS", "Loans"],
    publishedAt: "2026-11-25T09:00:00+04:00",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Customer paying with a smartphone at a shop counter",
    featured: true,
    keyTakeaways: [
      "Credit reports and scores in the UAE come from the Al Etihad Credit Bureau (AECB), also called Etihad Credit Bureau.",
      "Get them on etihadbureau.ae or the Etihad Credit Bureau app, logging in with UAE PASS.",
      "AECB's own FAQ lists AED 10.50 (incl. VAT) for the score and AED 157.50 (incl. VAT) for the full report — some news sites quote older prices, so confirm in the app.",
      "The score PDF arrives instantly after payment.",
    ],
    body: [
      { type: "h2", id: "what-is-aecb", text: "What AECB is" },
      {
        type: "p",
        text: "The Al Etihad Credit Bureau is the UAE's federal credit bureau. Banks and finance companies in Dubai and across the Emirates use its reports and scores when you apply for a loan, credit card, car finance or even some phone contracts.",
      },
      { type: "h2", id: "how-to-check", text: "How to check your score" },
      {
        type: "ol",
        items: [
          "Download the Etihad Credit Bureau app (iOS or Android) or go to etihadbureau.ae.",
          "Log in with UAE PASS.",
          "Choose 'Credit Score' or 'Credit Report'.",
          "Pay by card. The score report arrives as a PDF straight away.",
        ],
      },
      {
        type: "callout",
        title: "Prefer to go in person?",
        text: "AECB customer happiness centres accept requests with your original Emirates ID and a passport copy, with payment by card or eDirham.",
      },
      { type: "h2", id: "fees", text: "What it costs" },
      {
        type: "table",
        caption: "Official AECB FAQ figures; news outlets quote different, older prices",
        head: ["Product", "Price (incl. VAT)"],
        rows: [
          ["Credit Score", "AED 10.50"],
          ["Credit Report", "AED 157.50"],
        ],
      },
      {
        type: "p",
        text: "Some guides list AED 84 for the full report. The bureau prices its products according to the list approved by the UAE Cabinet, so the price in the app at checkout is the one that applies.",
      },
      { type: "h2", id: "errors", text: "Found an error?" },
      {
        type: "p",
        text: "Request a data correction through the app, the website or a customer centre. The bureau checks with the lender that reported the information.",
      },
    ],
    faq: [
      {
        question: "How much does an AECB credit score cost?",
        answer: "AECB's own FAQ lists AED 10.50 including VAT for the credit score. Confirm the current price in the app before paying.",
      },
      {
        question: "Do I need UAE PASS?",
        answer: "UAE PASS is the main way to log in to the AECB app and website. You can also visit a customer centre with your Emirates ID.",
      },
    ],
    sources: [
      { name: "Etihad Credit Bureau — FAQs: Credit report & score", url: "https://etihadbureau.ae/faqs/19" },
      { name: "UAE Government portal — Financial credibility for individuals and companies", url: "https://u.ae/en/information-and-services/business/financial-credibility-for-individuals-and-companies" },
      { name: "Gulf News — How to check your credit score in the UAE", url: "https://gulfnews.com/living-in-uae/banking/how-to-check-your-credit-score-in-the-uae-1.500232779" },
    ],
    methodology: "Compiled from the Etihad Credit Bureau, the UAE government portal and Gulf News, checked 25 November 2026.",
  },
  {
    id: "ae-nol-card-guide",
    slug: "dubai-nol-card-guide",
    title: "Dubai Nol card guide: which card to get for the Metro, bus and tram",
    seoTitle: "Dubai Nol Card Guide 2026: Red, Silver, Gold & Blue Cards and Fare Zones",
    subtitle: "Four card types, seven fare zones, and one rule of thumb: most people want Silver. Here's how it works.",
    excerpt:
      "Dubai's RTA charges Metro, bus and tram fares by the number of zones you cross, paid with a Nol card. What each card colour is for, how fares work, and where to top up.",
    category: "travel",
    tags: ["Dubai Metro", "Nol Card", "RTA", "Public Transport"],
    publishedAt: "2026-11-26T09:00:00+04:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Aircraft wing above the clouds",
    keyTakeaways: [
      "You need a Nol card (or ticket) for Dubai Metro, buses, tram and some water transport.",
      "Silver is the standard anonymous card; Gold gives access to the Gold Class cabin at double the fare; Blue is personalised; Red is a paper ticket for occasional trips.",
      "The RTA splits Dubai into 7 zones. You pay by zones crossed, with fares capped above 2 zones.",
      "Prices vary between sources — check the RTA's official Nol fares page.",
    ],
    body: [
      { type: "h2", id: "card-types", text: "Which card to get" },
      {
        type: "table",
        head: ["Card", "Best for"],
        rows: [
          ["Red (paper ticket)", "Tourists making a handful of trips"],
          ["Silver", "Most residents and longer stays — standard fares, anonymous"],
          ["Gold", "Gold Class Metro cabin; fares are double Silver"],
          ["Blue", "Personalised card registered to you — protects your balance if lost and unlocks concession fares for eligible groups"],
        ],
      },
      { type: "h2", id: "fares", text: "How fares work" },
      {
        type: "p",
        text: "The RTA divides Dubai into seven zones. Your fare depends on how many zone lines you cross, and the maximum fare applies once you cross more than two. Tap in and tap out on the Metro so the right fare is deducted.",
      },
      {
        type: "callout",
        title: "About the prices",
        text: "Published Silver fares are around AED 3 for one zone, AED 5 for two and AED 7.50 for three or more, but guides disagree on card prices and Gold fares. The RTA's Nol fares page is the reference.",
      },
      { type: "h2", id: "top-up", text: "Buying and topping up" },
      {
        type: "ul",
        items: [
          "Buy Red and Silver cards at Metro ticket offices and machines.",
          "Top up at machines, ticket offices, the RTA Dubai and Nol Pay apps, and some shops.",
          "Many machines have a minimum top-up of AED 20.",
          "Keep a minimum balance for your trip — you can't exit with a negative fare.",
        ],
      },
    ],
    faq: [
      { question: "Which Nol card should a tourist get?", answer: "For a few trips, a Red ticket; for a longer stay with many trips, a Silver card." },
      { question: "How many fare zones does Dubai have?", answer: "Seven. Fares depend on how many zones you cross, with a cap above two." },
    ],
    sources: [
      { name: "RTA — Nol fares and zones", url: "https://rta.ae/wps/portal/rta/ae/public-transport/Nol-Fares?lang=en" },
      { name: "Emirates 24|7 — Dubai Nol card guide 2026", url: "https://www.emirates247.com/uae-guide/dubai-nol-card-guide-2026-which-card-should-you-get-how-much-does-it-cost-and-where-can-you-use-it/6390" },
      { name: "Visit Dubai — Getting around Dubai", url: "https://www.visitdubai.com/en/plan-your-trip/getting-around-dubai" },
    ],
    methodology: "Compiled from the RTA and Dubai news guides, checked 26 November 2026. Fares are not stated as fact where sources conflict.",
  },
  {
    id: "ae-hesabati-sim-check",
    slug: "check-sim-cards-registered-emirates-id-hesabati",
    title: "Are there SIM cards in your name you don't know about? Check with TDRA's Hesabati",
    seoTitle: "Check Mobile Numbers Registered to Your Emirates ID (Hesabati) & Report Spam Calls in the UAE",
    subtitle: "A free government service lists every mobile and landline number registered to your Emirates ID — and lets you flag ones that aren't yours.",
    excerpt:
      "Use the TDRA's free Hesabati service to see all phone numbers registered under your Emirates ID, complain about unknown ones, and report spam callers to 2211.",
    category: "technology",
    tags: ["TDRA", "Hesabati", "Emirates ID", "SIM Fraud", "Dubai"],
    publishedAt: "2026-11-26T08:00:00+04:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone showing app icons",
    keyTakeaways: [
      "Hesabati, from the TDRA, lists all mobile and fixed numbers registered under your Emirates ID.",
      "It's free and only for Emirates ID holders.",
      "If you see a number that isn't yours, use 'Make a complaint' next to it.",
      "Report spam or telemarketing callers by texting their number (05XXXXXXXX) to 2211.",
    ],
    body: [
      { type: "h2", id: "why", text: "Why it matters" },
      {
        type: "p",
        text: "A SIM registered to your Emirates ID without your knowledge could be used for fraud in your name. Checking takes a couple of minutes.",
      },
      { type: "h2", id: "how", text: "How to check" },
      {
        type: "ol",
        items: [
          "Go to the Hesabati service via the TDRA or the UAE government portal (u.ae).",
          "Sign in — guides differ on whether UAE PASS is required, so have it ready.",
          "View the list of active mobile and fixed numbers in your name.",
          "For any number you don't recognise, select 'Make a complaint'.",
        ],
      },
      { type: "h2", id: "spam", text: "Reporting spam calls" },
      { type: "p", text: "Send the caller's number in the format 05XXXXXXXX by SMS to 2211. The TDRA has fined companies and disconnected thousands of numbers for telemarketing violations." },
    ],
    faq: [
      { question: "Is Hesabati free?", answer: "Yes, it's free for Emirates ID holders." },
      { question: "How do I report a spam caller in the UAE?", answer: "Text the caller's number in the format 05XXXXXXXX to 2211." },
    ],
    sources: [
      { name: "Gulf News — How to verify SIM cards linked to your Emirates ID", url: "https://gulfnews.com/living-in-uae/visa-immigration/uae-heres-how-you-can-find-out-if-there-is-a-sim-card-or-mobile-number-wrongly-registered-under-your-emirates-id-1.1678892135950" },
      { name: "The National — Fines issued and numbers disconnected for telemarketing violations", url: "https://thenationalnews.com/news/uae/2026/08/06/dh19-million-in-fines-issued-and-9400-numbers-disconnected-for-telemarketing-violations" },
    ],
    methodology: "Compiled from UAE news coverage of the TDRA service, checked 26 November 2026.",
  },
];

export const articles = buildArticles("ae", drafts);

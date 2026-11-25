import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "sa-simah-credit-report",
    slug: "simah-credit-report-molim-how-to-check",
    title: "How to check your SIMAH credit report in Saudi Arabia with the MOLIM app",
    seoTitle: "Check Your SIMAH Credit Report & Score in Saudi Arabia (MOLIM, Nafath) — 2026",
    subtitle: "SIMAH is Saudi Arabia's credit bureau. Its MOLIM app shows your score, loans and payment history — here's how to register with Nafath.",
    excerpt:
      "Citizens and residents can view their SIMAH credit report through the official MOLIM app, verifying with Nafath. Steps, what the report shows, and what's free versus paid.",
    category: "money",
    tags: ["SIMAH", "MOLIM", "Credit Score", "Nafath", "Riyadh"],
    publishedAt: "2026-11-25T09:00:00+03:00",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Customer paying with a smartphone at a shop counter",
    featured: true,
    keyTakeaways: [
      "SIMAH (the Saudi Credit Bureau) holds the credit records that banks check before lending.",
      "MOLIM is SIMAH's official app for individuals. Register with your National ID or Iqama and verify through Nafath.",
      "The report shows lenders, loan status, balances and payment history, plus your score.",
      "Guides disagree on pricing (a free basic report vs paid subscriptions) — check the options inside MOLIM before paying.",
    ],
    body: [
      { type: "h2", id: "what-is-simah", text: "What SIMAH is" },
      {
        type: "p",
        text: "SIMAH, the Saudi Credit Bureau, collects credit information from banks and finance companies. Lenders in Riyadh, Jeddah and across the Kingdom use it to decide on loans, cards and financing.",
      },
      { type: "h2", id: "register", text: "How to register on MOLIM" },
      {
        type: "ol",
        items: [
          "Download MOLIM, SIMAH's official app, from the App Store or Google Play.",
          "Tap Register and enter your National ID (citizens) or Iqama number (residents).",
          "You'll be sent to Nafath to confirm your identity.",
          "Once verified, your account is active and you can open your report.",
        ],
      },
      { type: "h2", id: "what-it-shows", text: "What the report shows" },
      {
        type: "ul",
        items: [
          "Your credit score.",
          "Which lenders you have products with, and the type of each loan or card.",
          "Status of each account — active, closed or defaulted.",
          "Outstanding balances and your payment history.",
        ],
      },
      {
        type: "callout",
        title: "Free or paid?",
        text: "One guide says individuals get one free basic report a year, with a paid detailed report; another lists monthly and yearly subscriptions. SIMAH's packages change, so check what MOLIM offers before you buy.",
      },
      { type: "h2", id: "bank-scores", text: "Scores in banking apps" },
      {
        type: "p",
        text: "Some Saudi banks show a version of your SIMAH score inside their own apps. That's convenient, but it isn't the same as the full report in MOLIM.",
      },
    ],
    faq: [
      {
        question: "How do I check my credit score in Saudi Arabia?",
        answer: "Use MOLIM, the official SIMAH app. Register with your National ID or Iqama and verify through Nafath.",
      },
      {
        question: "Can expats use MOLIM?",
        answer: "Yes. Residents register with their Iqama number and verify through Nafath.",
      },
    ],
    sources: [
      { name: "SIMAH — Products and services", url: "https://simah.com/english/Pages/products-and-services.aspx" },
      { name: "MOLIM on the App Store", url: "https://apps.apple.com/app/id919072738" },
      { name: "KSA Expats — Check credit score in Saudi Arabia (MOLIM)", url: "https://ksaexpats.com/check-credit-score-saudi-arabia-molim/" },
    ],
    methodology: "Compiled from SIMAH, the MOLIM app listing and residents' guides, checked 25 November 2026. Pricing varies between sources and is not stated as fact.",
  },
];

export const articles = buildArticles("sa", drafts);

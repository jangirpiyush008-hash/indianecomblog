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
];

export const articles = buildArticles("ae", drafts);

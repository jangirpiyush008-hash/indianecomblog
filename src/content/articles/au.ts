import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "au-free-credit-report",
    slug: "free-credit-report-australia",
    title: "How to get your credit report free in Australia (every three months)",
    seoTitle: "Free Credit Report Australia: Every 3 Months from Equifax & Experian (2026)",
    subtitle: "Credit reporting bodies must give you your report free once every three months. Here's who to ask now that illion is part of Experian.",
    excerpt:
      "Under Australian privacy law you can get your credit report free every three months — and sooner if you've just been refused credit. How to request it from Equifax and Experian.",
    category: "money",
    tags: ["Credit Report", "Equifax", "Experian", "OAIC", "Credit Score"],
    publishedAt: "2026-11-25T09:00:00+11:00",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Laptop screen showing financial charts",
    featured: true,
    keyTakeaways: [
      "A credit reporting body must give you your credit report free once every 3 months, per the OAIC.",
      "You can get another free copy if you've been refused credit in the past 90 days.",
      "The two main bodies are now Equifax and Experian — Experian acquired illion.",
      "Phone: Equifax 1300 138 332, Experian 1300 783 684.",
    ],
    body: [
      { type: "h2", id: "your-right", text: "Your right to a free report" },
      {
        type: "p",
        text: "The Office of the Australian Information Commissioner (OAIC) says a credit reporting body must give you access to your consumer credit report free once every three months. If you've been refused credit within the past 90 days, you can get a free copy sooner.",
      },
      { type: "h2", id: "who-to-ask", text: "Who to ask" },
      {
        type: "p",
        text: "There used to be three main credit reporting bodies. Experian has since acquired illion, so CreditSmart now lists two main bodies: Equifax and Experian. Older pages may still list illion separately.",
      },
      {
        type: "table",
        head: ["Body", "How to request"],
        rows: [
          ["Equifax", "Online form or 1300 138 332"],
          ["Experian (incl. former illion data)", "Online or 1300 783 684"],
        ],
      },
      {
        type: "callout",
        title: "Free report vs paid products",
        text: "Both bodies sell paid monitoring. Your free report every three months is a separate legal right — make sure you choose the free option.",
      },
      { type: "h2", id: "what-to-check", text: "What to check" },
      {
        type: "ul",
        items: [
          "Credit enquiries you didn't make.",
          "Accounts you don't recognise.",
          "Repayment history that looks wrong.",
          "Defaults that are incorrect or should have expired.",
        ],
      },
      {
        type: "p",
        text: "You can ask the credit reporting body or the credit provider to correct wrong information. If it isn't resolved, the OAIC explains your next steps.",
      },
    ],
    faq: [
      {
        question: "How often can I get a free credit report in Australia?",
        answer: "Once every three months from each credit reporting body, and also if you've been refused credit in the past 90 days.",
      },
      {
        question: "Is illion still a credit reporting body?",
        answer: "Experian acquired illion, so CreditSmart now lists Equifax and Experian as the two main bodies.",
      },
    ],
    sources: [
      { name: "OAIC — Access your credit report", url: "https://www.oaic.gov.au/privacy/your-privacy-rights/credit-reporting/access-your-credit-report" },
      { name: "CreditSmart — Where to get your free credit report", url: "https://creditsmart.org.au/learn-about-credit/where-to-get-your-free-credit-report" },
      { name: "Experian Australia — Your credit report", url: "https://experian.com.au/order-credit-report" },
    ],
    methodology: "Compiled from the OAIC and the credit reporting bodies, checked 25 November 2026.",
  },
];

export const articles = buildArticles("au", drafts);

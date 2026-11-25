import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "ca-free-credit-report",
    slug: "free-credit-report-canada",
    title: "How to get your credit report and score free in Canada",
    seoTitle: "Free Credit Report Canada: Equifax & TransUnion Online, Phone, Mail (2026)",
    subtitle: "Both Canadian credit bureaus give you your report free online, updated monthly. Equifax's score is free too. Here's how.",
    excerpt:
      "Equifax and TransUnion both let you see your credit report free online, updated monthly. Equifax also shows your score free; TransUnion's free score is for Quebec residents.",
    category: "money",
    tags: ["Credit Report", "Credit Score", "Equifax", "TransUnion", "FCAC"],
    publishedAt: "2026-11-25T09:00:00-05:00",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Laptop screen showing financial charts",
    featured: true,
    keyTakeaways: [
      "Equifax and TransUnion both let you view your credit report free online, updated monthly.",
      "Equifax's credit score is free online. TransUnion's free online score is only for Quebec residents.",
      "You can also request free reports by phone, mail or in person.",
      "Phone: Equifax 1-800-465-7166, TransUnion 1-800-663-9980.",
    ],
    body: [
      { type: "h2", id: "two-bureaus", text: "Canada's two credit bureaus" },
      {
        type: "p",
        text: "Canada has two credit bureaus, Equifax and TransUnion. According to the Financial Consumer Agency of Canada (FCAC), you can get your credit report from both for free.",
      },
      {
        type: "table",
        caption: "Per the Financial Consumer Agency of Canada",
        head: ["", "Equifax", "TransUnion"],
        rows: [
          ["Credit report online", "Free, updated monthly", "Free 'Consumer Disclosure', updated monthly"],
          ["Credit score online", "Free, updated monthly", "Free for Quebec residents only"],
          ["By phone", "1-800-465-7166", "1-800-663-9980"],
          ["By mail or in person", "Yes (two pieces of ID in person)", "Yes (two pieces of ID in person)"],
        ],
      },
      {
        type: "callout",
        title: "Equifax walk-in change",
        text: "Equifax says its Toronto walk-up centre at 5700 Yonge Street closed on 1 July 2026. Online, phone and mail requests are still available.",
      },
      { type: "h2", id: "how-to", text: "How to get it online" },
      {
        type: "ol",
        items: [
          "Go to equifax.ca or transunion.ca directly and choose the free credit report option — not a paid plan.",
          "Create an account and verify your identity with questions about your credit history.",
          "View your report, and check it every few months since it updates monthly.",
        ],
      },
      { type: "h2", id: "check", text: "What to check" },
      {
        type: "ul",
        items: [
          "Accounts and inquiries you don't recognise.",
          "Wrong personal details, such as old addresses.",
          "Late payments you believe are incorrect.",
        ],
      },
      {
        type: "p",
        text: "Report errors to the bureau that shows them. The FCAC also has a guide to correcting errors on your report.",
      },
    ],
    faq: [
      {
        question: "Is my credit score free in Canada?",
        answer: "Equifax's score is free online. TransUnion's free online score is available to Quebec residents only, per the FCAC.",
      },
      {
        question: "How often is the free report updated?",
        answer: "Both Equifax and TransUnion update the free online report monthly.",
      },
    ],
    sources: [
      { name: "Government of Canada (FCAC) — Getting your credit report and credit score", url: "https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score/order-credit-report.html" },
      { name: "Equifax Canada — How to get a free credit report", url: "https://www.equifax.ca/personal/education/credit-score/articles/-/learn/how-to-get-a-free-credit-report/" },
    ],
    methodology: "Compiled from the Financial Consumer Agency of Canada and Equifax Canada, checked 25 November 2026.",
  },
];

export const articles = buildArticles("ca", drafts);

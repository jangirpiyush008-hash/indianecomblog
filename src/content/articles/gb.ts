import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "gb-check-credit-report-free",
    slug: "check-credit-report-free-uk",
    title: "How to check your credit report free in the UK — from all three agencies",
    seoTitle: "Check Your Credit Report Free in the UK: Experian, Equifax & TransUnion (2026)",
    subtitle: "You have a legal right to a free statutory credit report from Experian, Equifax and TransUnion. Here's how to get each one, and where to see your score.",
    excerpt:
      "Experian, Equifax and TransUnion must each give you a free statutory credit report. How to request each one, how long it takes, and the free services that add a score.",
    category: "money",
    tags: ["Credit Report", "Experian", "Equifax", "TransUnion", "Credit Score"],
    publishedAt: "2026-11-25T09:00:00+00:00",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Laptop screen showing financial charts",
    featured: true,
    keyTakeaways: [
      "Each of the three UK credit reference agencies must give you a free statutory report, under the Consumer Credit Act 1974 and UK GDPR.",
      "Experian posts a passkey within about five working days; Equifax lets you open an online account; TransUnion uses an emailed code or post.",
      "Statutory reports don't include a score. ClearScore (Equifax data) and MSE Credit Club (TransUnion data) show reports and scores free.",
      "Check all three — each agency can hold slightly different information.",
    ],
    body: [
      { type: "h2", id: "your-right", text: "Your right to a free report" },
      {
        type: "p",
        text: "Experian, Equifax and TransUnion must each give you a free copy of the information they hold on you — called a statutory credit report. It's a legal right under the Consumer Credit Act 1974 and UK GDPR, and you can request it more than once.",
      },
      { type: "h2", id: "how-to-request", text: "How to request each one" },
      {
        type: "table",
        head: ["Agency", "How it works"],
        rows: [
          ["Experian", "Request online with your details and address history. Experian posts a passkey (allow up to five working days) that unlocks the report."],
          ["Equifax", "Create a free online account so you can view it again without repeating the process."],
          ["TransUnion", "Request online — you'll get an email authentication code — or by post."],
        ],
      },
      {
        type: "callout",
        title: "Look for the word 'statutory'",
        text: "Each agency also sells paid subscriptions. The free product is labelled the statutory credit report.",
      },
      { type: "h2", id: "scores", text: "Getting a score as well" },
      {
        type: "p",
        text: "Statutory reports don't come with a score. If you want one, free services show an agency's data with a score attached: ClearScore uses Equifax data, and MoneySavingExpert's Credit Club gives free access to your TransUnion report. Scores differ between agencies — lenders look at the underlying report, not one number.",
      },
      { type: "h2", id: "what-to-check", text: "What to check" },
      {
        type: "ul",
        items: [
          "Accounts or searches you don't recognise.",
          "Old addresses and financial links to people you no longer share finances with.",
          "Late or missed payments you think are wrong.",
          "Whether you're on the electoral roll at your current address — it helps lenders confirm who you are.",
        ],
      },
      {
        type: "p",
        text: "If something's wrong, raise it with the agency showing it. They'll check with the lender and correct it if it's an error.",
      },
    ],
    faq: [
      {
        question: "Is my credit report free in the UK?",
        answer: "Yes. Experian, Equifax and TransUnion must each provide a free statutory credit report on request.",
      },
      {
        question: "Does the statutory report show my credit score?",
        answer: "No. For a free score, services such as ClearScore (Equifax data) and MSE Credit Club (TransUnion data) show both report and score.",
      },
    ],
    sources: [
      { name: "TransUnion UK — What is a statutory credit report?", url: "https://www.transunion.co.uk/consumer/credit-report-help/what-is-a-statutory-credit-report" },
      { name: "Which? — Credit reports: all you need to know", url: "https://www.which.co.uk/money/credit-cards-and-loans/credit-scores/credit-reports-all-you-need-to-know-a6kbx3x10l1w" },
      { name: "MoneySavingExpert — Check your credit report free", url: "https://www.moneysavingexpert.com/loans/check-free-credit-report/" },
    ],
    methodology: "Compiled from the credit reference agencies and consumer guides, checked 25 November 2026.",
  },
];

export const articles = buildArticles("gb", drafts);

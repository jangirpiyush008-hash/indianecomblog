import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "us-free-credit-report-freeze",
    slug: "free-credit-report-and-credit-freeze",
    title: "How to check your credit report free every week — and freeze your credit for $0",
    seoTitle: "Free Weekly Credit Reports & Free Credit Freeze: How to Do Both (2026)",
    subtitle: "AnnualCreditReport.com now gives free weekly reports from all three bureaus, permanently. A credit freeze is free too. Here's how to use both.",
    excerpt:
      "Free weekly credit reports from Equifax, Experian and TransUnion are now permanent at AnnualCreditReport.com, and federal law makes credit freezes free. Step-by-step instructions for both.",
    category: "money",
    tags: ["Credit Report", "Credit Freeze", "AnnualCreditReport", "Identity Theft"],
    publishedAt: "2026-11-25T09:00:00-05:00",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Laptop screen showing financial charts",
    featured: true,
    keyTakeaways: [
      "AnnualCreditReport.com is the only official site for free reports. Weekly free access from all three bureaus is now permanent.",
      "You can also order by phone at 1-877-322-8228 or by mail.",
      "The free reports don't include a credit score.",
      "A credit freeze is free by federal law (since 2018). Set it up separately with Equifax, Experian and TransUnion.",
    ],
    body: [
      { type: "h2", id: "free-reports", text: "Get your free credit reports" },
      {
        type: "p",
        text: "The three nationwide credit bureaus — Equifax, Experian and TransUnion — have permanently extended the program that lets you check your report from each of them once a week, free, at AnnualCreditReport.com, according to the FTC.",
      },
      {
        type: "ol",
        items: [
          "Type AnnualCreditReport.com into your browser yourself. Lookalike sites advertise 'free' reports and then try to sell you monitoring.",
          "Fill in your name, address, Social Security number and date of birth.",
          "Pick which bureaus' reports you want — you can request all three at once.",
          "Answer the identity-check questions each bureau asks, then view and save your report.",
        ],
      },
      {
        type: "callout",
        title: "No computer?",
        text: "Call 1-877-322-8228 or request your reports by mail through the Annual Credit Report Request Service. Don't contact the three bureaus individually for these free reports.",
      },
      { type: "h2", id: "what-to-check", text: "What to look for" },
      {
        type: "ul",
        items: [
          "Accounts you didn't open — a sign of identity theft.",
          "Payments marked late that you paid on time.",
          "Closed accounts still showing as open, or wrong balances.",
          "Hard inquiries from lenders you never applied to.",
        ],
      },
      {
        type: "p",
        text: "If something is wrong, dispute it with the bureau that shows the error, and with the company that supplied the information. The CFPB has instructions and sample letters.",
      },
      { type: "h2", id: "credit-freeze", text: "Freeze your credit for free" },
      {
        type: "p",
        text: "A freeze stops lenders from pulling your report, which makes it much harder for someone to open credit in your name. Since 2018, federal law has required the three bureaus to freeze and unfreeze your file free of charge.",
      },
      {
        type: "table",
        head: ["Bureau", "Where to freeze"],
        rows: [
          ["Equifax", "equifax.com/personal/credit-report-services"],
          ["Experian", "experian.com/freeze"],
          ["TransUnion", "transunion.com/freeze"],
        ],
      },
      {
        type: "p",
        text: "When you request a freeze online or by phone, the bureau must put it in place within one business day. When you want to apply for a loan or card, lift the freeze temporarily with each bureau the lender uses, then put it back.",
      },
    ],
    faq: [
      {
        question: "How often can I get a free credit report?",
        answer: "Once a week from each of Equifax, Experian and TransUnion, at AnnualCreditReport.com. The FTC says weekly free access is now permanent.",
      },
      {
        question: "Does the free report include my credit score?",
        answer: "No. The free reports from AnnualCreditReport.com don't include a credit score.",
      },
      {
        question: "Does a credit freeze cost money?",
        answer: "No. Federal law has required the three nationwide bureaus to freeze and unfreeze credit files for free since 2018.",
      },
    ],
    sources: [
      { name: "FTC — Free credit reports", url: "https://consumer.ftc.gov/free-credit-reports" },
      { name: "FTC — You now have permanent access to free weekly credit reports", url: "https://consumer.ftc.gov/consumer-alerts/2023/10/you-now-have-permanent-access-free-weekly-credit-reports" },
      { name: "CFPB — How do I get a copy of my credit report?", url: "https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-a-copy-of-my-credit-report-en-5/" },
      { name: "Kiplinger — How to get free credit reports weekly", url: "https://www.kiplinger.com/personal-finance/credit-debt/loans/credit-reports/605156/how-to-monitor-your-credit-reports-for" },
    ],
    methodology: "Compiled from the Federal Trade Commission and Consumer Financial Protection Bureau, checked 25 November 2026.",
  },
];

export const articles = buildArticles("us", drafts);

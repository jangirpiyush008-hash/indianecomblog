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
  {
    id: "ca-flight-delay-compensation",
    slug: "flight-delay-compensation-canada-appr",
    title: "Flight delayed or cancelled in Canada? How much compensation you can claim",
    seoTitle: "Canada Flight Delay Compensation (APPR): $400, $700 or $1,000 — How to Claim",
    subtitle: "Under the Air Passenger Protection Regulations, large airlines owe up to $1,000 for delays within their control. Here's the table and how to claim.",
    excerpt:
      "Canada's Air Passenger Protection Regulations set fixed compensation for delays within the airline's control: $400 to $1,000 from large carriers, $125 to $500 from small ones.",
    category: "travel",
    tags: ["APPR", "Flight Delays", "Air Canada", "WestJet", "CTA"],
    publishedAt: "2026-11-26T09:00:00-05:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Aircraft wing above the clouds",
    keyTakeaways: [
      "Compensation applies only when the delay or cancellation is within the airline's control (and not safety-related).",
      "Large airlines: $400 (3–6 hours late), $700 (6–9 hours), $1,000 (9+ hours).",
      "Small airlines: $125, $250, $500 for the same delays.",
      "Claim from the airline first; if it refuses, complain to the Canadian Transportation Agency.",
    ],
    body: [
      { type: "h2", id: "amounts", text: "How much you can get" },
      {
        type: "table",
        caption: "Per the Canadian Transportation Agency",
        head: ["Arrival delay", "Large airline", "Small airline"],
        rows: [
          ["3 to under 6 hours", "$400", "$125"],
          ["6 to under 9 hours", "$700", "$250"],
          ["9 hours or more", "$1,000", "$500"],
        ],
      },
      { type: "p", text: "Large airlines include Air Canada (with Jazz and Rouge), WestJet, Sunwing, Air Transat, Porter and Flair." },
      { type: "h2", id: "when", text: "When it applies" },
      {
        type: "ul",
        items: [
          "The disruption must be within the airline's control and not required for safety — for example, crew scheduling problems.",
          "Weather, air traffic control and other outside events don't qualify for compensation, though rebooking and care rules still apply.",
          "You can't be paid twice for the same disruption under another country's rules.",
        ],
      },
      { type: "h2", id: "claim", text: "How to claim" },
      {
        type: "ol",
        items: [
          "Submit a written claim to the airline, with your booking details.",
          "The airline must respond — pay or explain why not.",
          "If you disagree, file a complaint with the Canadian Transportation Agency (CTA).",
        ],
      },
    ],
    faq: [
      { question: "How much compensation for a 4-hour delay in Canada?", answer: "$400 from a large airline or $125 from a small one, if the delay was within the airline's control." },
      { question: "Do weather delays qualify?", answer: "No compensation is owed for situations outside the airline's control, such as weather." },
    ],
    sources: [
      { name: "Canadian Transportation Agency — Flight delays, cancellations, refunds and compensation", url: "https://protection-passager-passenger.otc-cta.gc.ca/en/refunds-and-compensation/flight-delays-cancellations-rebooking-refunds-compensation" },
      { name: "Air Passenger Protection Regulations (SOR/2019-150)", url: "https://laws-lois.justice.gc.ca/eng/regulations/SOR-2019-150/section-19.html" },
    ],
    methodology: "Compiled from the Canadian Transportation Agency and the regulation text, checked 26 November 2026.",
  },
  {
    id: "ca-spam-dncl",
    slug: "stop-spam-texts-calls-canada",
    title: "Spam texts and telemarketing calls in Canada: 7726 and the National Do Not Call List",
    seoTitle: "Report Spam Texts (7726) & Join the National Do Not Call List in Canada",
    subtitle: "Texts and calls go to different places in Canada. Here's which is which.",
    excerpt:
      "Forward spam texts to 7726 for free, and use the CRTC's National Do Not Call List to register your number and complain about telemarketing calls.",
    category: "technology",
    tags: ["7726", "Do Not Call List", "CRTC", "Spam"],
    publishedAt: "2026-11-26T08:00:00-05:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone showing app icons",
    keyTakeaways: [
      "Spam texts: forward to 7726. It's free and doesn't use your plan.",
      "Telemarketing calls: register on the CRTC's National Do Not Call List (DNCL) and file complaints there.",
      "DNCL complaints by phone: 1-866-580-DNCL (3625).",
      "Don't send call complaints to the Spam Reporting Centre — that's for messages.",
    ],
    body: [
      { type: "h2", id: "texts", text: "Spam texts → 7726" },
      { type: "p", text: "Forward the message to 7726 (SPAM on the keypad). Your carrier uses reports to block senders. You can also use the federal Spam Reporting Centre's online form." },
      { type: "h2", id: "calls", text: "Telemarketing calls → National Do Not Call List" },
      {
        type: "ol",
        items: [
          "Register your number on the National Do Not Call List (run by the CRTC).",
          "If telemarketers keep calling, file a complaint with the DNCL online or at 1-866-580-3625.",
          "Include the caller's number and the date and time.",
        ],
      },
      {
        type: "callout",
        title: "Scams aren't stopped by lists",
        text: "Fraudsters ignore the DNCL. Hang up on unexpected calls asking for money or personal details, and never share codes sent to your phone.",
      },
    ],
    faq: [
      { question: "Is forwarding to 7726 free in Canada?", answer: "Yes. Reports to 7726 are free and don't count toward your plan." },
      { question: "Where do I report telemarketing calls?", answer: "To the CRTC's National Do Not Call List, online or at 1-866-580-3625." },
    ],
    sources: [
      { name: "Get Cyber Safe — Reporting spam text messages to 7726", url: "https://www.getcybersafe.gc.ca/en/blogs/reporting-spam-text-messages-7726" },
      { name: "CRTC — Scam alerts and telemarketing", url: "https://crtc.gc.ca/eng/phone/telemarketing/cust.htm" },
      { name: "ISED — Hung up on mobile spam?", url: "https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en/hung-mobile-spam" },
    ],
    methodology: "Compiled from the Government of Canada and the CRTC, checked 26 November 2026.",
  },
];

export const articles = buildArticles("ca", drafts);

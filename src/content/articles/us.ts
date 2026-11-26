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
  {
    id: "us-real-id-flying",
    slug: "real-id-what-you-need-to-fly",
    title: "No REAL ID? What you need to fly in the US now — and the $45 TSA fee",
    seoTitle: "REAL ID Rules for Flying in 2026: Accepted IDs and the $45 TSA ConfirmID Fee",
    subtitle: "A standard driver's license no longer gets you through airport security. Here's which IDs work instead, and what happens if you have none.",
    excerpt:
      "Since REAL ID enforcement, a non-compliant driver's license isn't accepted at TSA checkpoints. You can use a passport or other accepted ID — or pay $45 for TSA's ConfirmID identity check.",
    category: "travel",
    tags: ["REAL ID", "TSA", "Air Travel", "ConfirmID"],
    publishedAt: "2026-11-26T09:00:00-05:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Aircraft wing above the clouds",
    keyTakeaways: [
      "Travelers 18+ need a REAL ID-compliant license or another TSA-accepted ID for domestic flights.",
      "Passports, passport cards, Global Entry/NEXUS/SENTRI cards and permanent resident cards all work instead.",
      "Since 1 February 2026, travelers without accepted ID can pay $45 for TSA ConfirmID, covering 10 days of travel — it isn't guaranteed.",
      "Temporary paper licenses don't count.",
    ],
    body: [
      { type: "h2", id: "what-changed", text: "What changed" },
      {
        type: "p",
        text: "REAL ID enforcement means a standard, non-compliant driver's license is no longer accepted at TSA checkpoints for adults. A REAL ID-compliant license usually has a star in the top corner.",
      },
      { type: "h2", id: "accepted-ids", text: "IDs that work instead" },
      {
        type: "ul",
        items: [
          "U.S. passport or passport card",
          "State Enhanced Driver's License or Enhanced ID",
          "DHS trusted traveler cards: Global Entry, NEXUS, SENTRI, FAST",
          "U.S. Department of Defense ID",
          "Permanent resident card or border crossing card",
          "Photo ID from a federally recognized Tribal Nation",
          "Digital IDs in Apple Wallet, Google Wallet or Samsung Wallet at participating airports",
        ],
      },
      { type: "h2", id: "confirmid", text: "No accepted ID? The $45 ConfirmID option" },
      {
        type: "ol",
        items: [
          "Before you go, pay $45 at tsa.gov/ConfirmID with your legal name and travel start date.",
          "Allow extra time — TSA says the identity check can take up to 30 minutes.",
          "If verified, the approval covers a 10-day travel period.",
        ],
      },
      {
        type: "callout",
        title: "Not a guarantee",
        text: "TSA says paying the fee doesn't guarantee you'll get through. If your identity can't be verified, you may be turned away.",
      },
    ],
    faq: [
      { question: "Can I fly without a REAL ID?", answer: "Yes, with another TSA-accepted ID such as a passport — or by paying $45 for TSA's ConfirmID check, which isn't guaranteed." },
      { question: "How long does ConfirmID last?", answer: "A successful verification covers a 10-day travel period, according to TSA." },
    ],
    sources: [
      { name: "TSA — New $45 fee option for travelers without REAL ID (press release)", url: "https://content.govdelivery.com/accounts/USDHSTSA/bulletins/3fdc21c" },
      { name: "ABC7 — No REAL ID yet? You can still fly, but it may cost $45", url: "https://abc7.com/post/no-real-id-can-fly-may-cost-45-another-form-accepted/18521422/" },
    ],
    methodology: "Compiled from TSA announcements and news coverage, checked 26 November 2026. Confirm the current list on tsa.gov before you fly.",
  },
  {
    id: "us-stop-robocalls",
    slug: "stop-robocalls-do-not-call-registry",
    title: "How to cut down robocalls: the Do Not Call Registry and what it can't do",
    seoTitle: "Stop Robocalls: Register on the National Do Not Call Registry & Report Calls (2026)",
    subtitle: "Registering is free and keeps legitimate telemarketers away. Scammers ignore it — here's how to handle them too.",
    excerpt:
      "Add your cell and home numbers to the FTC's National Do Not Call Registry for free, report calls that break the rules, and use your phone's built-in tools against scam robocalls.",
    category: "technology",
    tags: ["Robocalls", "Do Not Call Registry", "FTC", "Scams"],
    publishedAt: "2026-11-26T08:00:00-05:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone showing app icons",
    keyTakeaways: [
      "Register free at DoNotCall.gov or by calling 1-888-382-1222 from the phone you want to add.",
      "It covers cell phones as well as landlines.",
      "The registry doesn't block calls — it tells legitimate telemarketers not to call. Scammers ignore it.",
      "Political groups, charities, debt collectors and surveys are exempt.",
    ],
    body: [
      { type: "h2", id: "register", text: "Register your numbers" },
      {
        type: "ol",
        items: [
          "Go to DoNotCall.gov and enter up to three numbers, plus an email address.",
          "Click the confirmation link the FTC emails you.",
          "Or call 1-888-382-1222 from each number you want to register.",
        ],
      },
      { type: "p", text: "Your number goes on the list the next day; it can take a few weeks for sales calls to taper off." },
      { type: "h2", id: "report", text: "Report calls that break the rules" },
      { type: "p", text: "Use the reporting form at DoNotCall.gov, or the same phone number. Include the caller's number and the date and time — reports help the FTC track down violators." },
      { type: "h2", id: "scams", text: "For scam robocalls" },
      {
        type: "ul",
        items: [
          "Don't press any buttons or say 'yes' — it confirms your number is active.",
          "Turn on your phone's spam filtering (iPhone: Silence Unknown Callers; Android: Caller ID & spam protection).",
          "Check what your carrier offers for free call blocking.",
          "If you've lost money, report it at ReportFraud.ftc.gov.",
        ],
      },
    ],
    faq: [
      { question: "Is the Do Not Call Registry free?", answer: "Yes. Registering at DoNotCall.gov or by phone is free." },
      { question: "Why do I still get calls after registering?", answer: "Scammers ignore the registry, and some callers — political groups, charities, debt collectors and surveys — are exempt." },
    ],
    sources: [
      { name: "National Do Not Call Registry (FTC)", url: "https://www.donotcall.gov/" },
    ],
    methodology: "Compiled from the Federal Trade Commission, checked 26 November 2026.",
  },
];

export const articles = buildArticles("us", drafts);

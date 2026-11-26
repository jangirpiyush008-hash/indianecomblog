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
  {
    id: "au-passport-renewal",
    slug: "renew-australian-passport-online",
    title: "How to renew your Australian passport online (and what it costs in 2026)",
    seoTitle: "Renew an Australian Passport Online: Eligibility, $422 Fee & Timing (2026)",
    subtitle: "Most adults in Australia can renew online without a paper form. Here's who qualifies, the fee and how long to allow.",
    excerpt:
      "Adults renewing their own passport from within Australia can apply online. The 10-year adult passport costs $422 in 2026; allow up to six weeks.",
    category: "travel",
    tags: ["Passport", "Australian Passport Office", "Travel Documents"],
    publishedAt: "2026-11-26T09:00:00+11:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Aircraft wing above the clouds",
    keyTakeaways: [
      "Online renewal is for adults renewing their own passport while in Australia.",
      "The 10-year adult passport fee is $422 in 2026 (fees rise with CPI each year).",
      "You'll need your most recent passport and new passport photos with a photo code.",
      "Standard processing can take up to six weeks — your current passport is usually cancelled when you apply.",
    ],
    body: [
      { type: "h2", id: "eligible", text: "Can you renew online?" },
      {
        type: "ul",
        items: [
          "You're an adult renewing an adult passport.",
          "You're in Australia.",
          "You're applying for yourself.",
        ],
      },
      { type: "p", text: "If you don't meet these, you can still start online but must lodge in person at a participating Australia Post outlet." },
      { type: "h2", id: "steps", text: "Steps" },
      {
        type: "ol",
        items: [
          "Get passport photos that come with a photo code.",
          "Start the online renewal on passports.gov.au with your current passport details.",
          "Pay the fee and submit.",
          "Wait for your new passport by post.",
        ],
      },
      { type: "h2", id: "cost", text: "What it costs" },
      {
        type: "table",
        head: ["Item", "Fee (2026)"],
        rows: [
          ["Adult 10-year passport", "$422"],
          ["Overseas applications", "Adds a surcharge — check your embassy"],
        ],
      },
      { type: "callout", title: "Book travel carefully", text: "Your current passport is generally cancelled when you apply, so don't plan to travel while you wait." },
    ],
    faq: [
      { question: "How much is an Australian passport in 2026?", answer: "$422 for a 10-year adult passport, per the 2026 fee schedule. Fees are indexed to CPI." },
      { question: "How long does renewal take?", answer: "Allow up to six weeks for standard processing." },
    ],
    sources: [
      { name: "Australian Passport Office — Online passport renewal", url: "https://www.passports.gov.au/online-renewal" },
      { name: "Australian Passport Office — Fees", url: "https://passports.gov.au/Fees" },
    ],
    methodology: "Compiled from the Australian Passport Office and embassy fee notices, checked 26 November 2026.",
  },
  {
    id: "au-do-not-call",
    slug: "do-not-call-register-scam-calls",
    title: "Stop telemarketers and report scams: Australia's Do Not Call Register and Scamwatch",
    seoTitle: "Do Not Call Register Australia (Free, Permanent) & Reporting Scams to Scamwatch",
    subtitle: "Registering is free and now permanent. Scammers ignore it — here's where to report them.",
    excerpt:
      "Add your number to the Do Not Call Register for free, report telemarketing breaches to the ACMA and scams to Scamwatch. Plus what the new 'Unverified' text label means.",
    category: "technology",
    tags: ["Do Not Call Register", "Scamwatch", "ACMA", "Scams"],
    publishedAt: "2026-11-26T08:00:00+11:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone showing app icons",
    keyTakeaways: [
      "Register free at donotcall.gov.au or 1300 792 958. The ACMA says registration is permanent.",
      "It can take up to 30 days to take full effect.",
      "Report scam calls and texts to Scamwatch: scamwatch.gov.au or 1300 795 995.",
      "From 1 July 2026, texts from unregistered sender names are labelled 'Unverified'.",
    ],
    body: [
      { type: "h2", id: "register", text: "Register your number" },
      { type: "p", text: "Use donotcall.gov.au or call 1300 792 958. It's free, doesn't need renewing, and covers mobiles and landlines." },
      { type: "h2", id: "report", text: "Where to report" },
      {
        type: "table",
        head: ["Problem", "Report to"],
        rows: [
          ["Telemarketers calling a registered number", "ACMA via donotcall.gov.au or 1300 792 958"],
          ["Scam calls, texts or emails", "Scamwatch — scamwatch.gov.au or 1300 795 995"],
          ["You've lost money", "Your bank immediately"],
        ],
      },
      { type: "h2", id: "unverified", text: "The 'Unverified' text label" },
      { type: "p", text: "Since 1 July 2026, organisations must register the sender names they use for texts. Messages from unregistered names show as 'Unverified' — treat them with extra suspicion." },
      { type: "callout", title: "The Register never asks for money", text: "Calls claiming you must pay to stay on the Do Not Call Register are scams. Hang up." },
    ],
    faq: [
      { question: "Does Do Not Call registration expire?", answer: "The ACMA says registration is permanent and doesn't need renewing." },
      { question: "Will the Register stop scam calls?", answer: "No. Scammers ignore it. Report scams to Scamwatch." },
    ],
    sources: [
      { name: "Do Not Call Register (ACMA)", url: "https://www.donotcall.gov.au/" },
      { name: "ACMA — Phone and SMS scams", url: "https://www.acma.gov.au/phone-scams" },
      { name: "Department of Infrastructure — Unwanted communications", url: "https://www.infrastructure.gov.au/media-communications-arts/phone/unwanted-communications" },
    ],
    methodology: "Compiled from the ACMA, Scamwatch and the Department of Infrastructure, checked 26 November 2026.",
  },
];

export const articles = buildArticles("au", drafts);

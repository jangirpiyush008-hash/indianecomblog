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
  {
    id: "gb-ees-europe",
    slug: "eu-entry-exit-system-uk-travellers",
    title: "The EU's Entry/Exit System: what UK travellers face at the border now",
    seoTitle: "EU Entry/Exit System (EES) for UK Travellers: Fingerprints, Photos & Queues (2026)",
    subtitle: "Your first trip to the Schengen area now means fingerprints and a photo at the border. ETIAS still hasn't started.",
    excerpt:
      "Since October 2025, UK passport holders visiting Schengen countries register fingerprints and a photo on arrival. Here's how it works, how long it lasts, and why you should ignore anyone selling ETIAS.",
    category: "travel",
    tags: ["EES", "ETIAS", "Europe Travel", "Passports"],
    publishedAt: "2026-11-26T09:00:00+00:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Aircraft wing above the clouds",
    keyTakeaways: [
      "The EU Entry/Exit System (EES) began a phased rollout on 12 October 2025.",
      "On your first entry, you give fingerprints and a photo at the border. The record lasts three years.",
      "Later trips: scan your passport and give fingerprints or a photo.",
      "ETIAS isn't running and has no confirmed start date — any site selling it now is a scam.",
    ],
    body: [
      { type: "h2", id: "what-is-ees", text: "What EES is" },
      {
        type: "p",
        text: "EES replaces passport stamping for non-EU visitors on short stays in the Schengen area. It records when you enter and leave, and your biometric details.",
      },
      { type: "h2", id: "first-trip", text: "Your first trip under EES" },
      {
        type: "ol",
        items: [
          "At the border, go to the EES booths or kiosks.",
          "Scan your passport and give fingerprints and a facial photo.",
          "Answer any questions about your stay.",
        ],
      },
      { type: "p", text: "The UK government warns the checks can add several minutes per person, so allow extra time, especially at Dover, the Eurostar and Eurotunnel." },
      { type: "h2", id: "later-trips", text: "On later trips" },
      { type: "p", text: "Your record is valid for three years. On exit and later visits you scan your passport and give either fingerprints or a photo." },
      { type: "h2", id: "etias", text: "What about ETIAS?" },
      {
        type: "callout",
        title: "Not live yet",
        text: "ETIAS, the €20 travel authorisation, isn't in operation and the European Commission hasn't confirmed a start date. Don't pay any website claiming to sell it.",
      },
    ],
    faq: [
      { question: "Do I need to do anything before I travel?", answer: "No pre-registration is needed for EES. You register at the border on your first trip." },
      { question: "Do I need ETIAS for Europe?", answer: "Not yet. ETIAS hasn't started and has no confirmed start date." },
    ],
    sources: [
      { name: "GOV.UK — EU Entry/Exit System", url: "https://www.gov.uk/guidance/eu-entryexit-system" },
      { name: "GOV.UK — British travellers told to expect checks under EES", url: "https://www.gov.uk/government/news/british-travellers-told-to-expect-checks-under-eus-entry-exit-system" },
      { name: "Which? — ETIAS no longer confirmed for 2026", url: "https://www.which.co.uk/news/article/etias-visa-waiver-europe-aUyAH7U3Hd2p" },
    ],
    methodology: "Compiled from GOV.UK guidance and Which?, checked 26 November 2026.",
  },
  {
    id: "gb-report-spam-7726",
    slug: "report-scam-texts-calls-7726",
    title: "Scam text or call? How to report it in the UK with 7726",
    seoTitle: "Report Scam Texts & Calls in the UK: Forward to 7726 (Free) — 2026 Guide",
    subtitle: "Forwarding a scam text to 7726 is free and helps networks block the sender. Here's how, plus who to tell about calls.",
    excerpt:
      "Forward scam and spam texts to 7726 for free, report nuisance marketing to the ICO and silent calls to Ofcom. Step-by-step for iPhone and Android.",
    category: "technology",
    tags: ["7726", "Scam Texts", "Ofcom", "ICO"],
    publishedAt: "2026-11-26T08:00:00+00:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone showing app icons",
    keyTakeaways: [
      "Forward suspicious texts to 7726 (it spells SPAM). It's free.",
      "Your mobile network can then investigate and block the sender.",
      "Spam marketing: report to the ICO. Persistent silent calls: report to Ofcom.",
      "Don't click links or reply — even to opt out.",
    ],
    body: [
      { type: "h2", id: "forward", text: "Forward the text to 7726" },
      {
        type: "ul",
        items: [
          "iPhone: touch and hold the message → More → forward arrow → send to 7726.",
          "Android: touch and hold → Forward → send to 7726.",
          "Your network may reply asking for the sender's number — send that too.",
        ],
      },
      { type: "p", text: "It's free on all major UK networks. WhatsApp, Telegram and Signal messages can't be forwarded to 7726 — use the app's own report and block buttons." },
      { type: "h2", id: "who-else", text: "Who else to tell" },
      {
        type: "table",
        head: ["Problem", "Report to"],
        rows: [
          ["Spam marketing texts, calls or emails", "ICO — online or 0303 123 1113"],
          ["Persistent silent or abandoned calls", "Ofcom — online or 0300 123 3333"],
          ["You've lost money to a scam", "Your bank immediately, then the national fraud reporting service"],
        ],
      },
      { type: "h2", id: "dont", text: "What not to do" },
      { type: "ul", items: ["Don't click links in unexpected texts.", "Don't reply, even with STOP, to messages you didn't sign up for.", "Don't call back unknown numbers from missed calls."] },
    ],
    faq: [
      { question: "Does forwarding to 7726 cost anything?", answer: "No. Ofcom says forwarding a suspicious text to 7726 is free." },
      { question: "Can I report a call to 7726?", answer: "You can text 7726 with the number that called you, and your network can investigate it." },
    ],
    sources: [
      { name: "Ofcom — What to do about a scam call, text or message", url: "https://www.ofcom.org.uk/phones-and-broadband/scam-calls-and-messages/what-to-do-about-a-scam-call-text-or-message" },
      { name: "NCSC — Report a scam text message", url: "https://www.ncsc.gov.uk/collection/phishing-scams/report-scam-text-message" },
    ],
    methodology: "Compiled from Ofcom and the National Cyber Security Centre, checked 26 November 2026.",
  },
];

export const articles = buildArticles("gb", drafts);

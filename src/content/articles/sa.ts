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
  {
    id: "sa-tourist-evisa",
    slug: "saudi-tourist-evisa-guide",
    title: "Saudi tourist eVisa: who can apply, how long it lasts, and what it covers",
    seoTitle: "Saudi Arabia Tourist eVisa 2026: Eligibility, 1-Year Multiple Entry, 90-Day Stays",
    subtitle: "Inviting family or friends to Riyadh or Jeddah? Here's how the eVisa works and its limits.",
    excerpt:
      "Saudi Arabia's tourist eVisa is a one-year, multiple-entry visa allowing up to 90 days in the Kingdom. It covers tourism, family visits and Umrah — not Hajj or study.",
    category: "travel",
    tags: ["Saudi eVisa", "Visit Saudi", "Umrah", "Tourism"],
    publishedAt: "2026-11-26T09:00:00+03:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Aircraft wing above the clouds",
    keyTakeaways: [
      "The eVisa is valid for 12 months, multiple entry, with up to 90 days in total in Saudi Arabia.",
      "It covers tourism, family visits and Umrah — not Hajj or academic study.",
      "Citizens of around 66 countries are eligible (lists vary by source); India and Pakistan are not on the list.",
      "Apply on the official Visit Saudi portal; the fee includes mandatory health insurance and isn't refundable.",
    ],
    body: [
      { type: "h2", id: "what-it-is", text: "What the eVisa gives you" },
      {
        type: "ul",
        items: [
          "One year of validity from the date of issue.",
          "Multiple entries.",
          "Up to 90 days in total in the Kingdom during that year.",
        ],
      },
      { type: "h2", id: "who", text: "Who can apply" },
      {
        type: "p",
        text: "Most 2026 lists name around 66 eligible countries, including the US, Canada, the UK and most of Europe. India and Pakistan aren't eligible for the standard eVisa. Check the Visit Saudi portal for the current list — it changes.",
      },
      { type: "h2", id: "how", text: "How to apply" },
      {
        type: "ol",
        items: [
          "Apply on the official Visit Saudi eVisa portal — avoid look-alike agents charging extra.",
          "Fill in passport and travel details and pay online.",
          "The payment includes mandatory medical insurance and is non-refundable, even if refused.",
          "Approvals are often fast, but apply well before travel.",
        ],
      },
      { type: "callout", title: "Hajj is separate", text: "The tourist eVisa doesn't allow Hajj, which needs a dedicated Hajj visa." },
    ],
    faq: [
      { question: "How long can I stay on a Saudi eVisa?", answer: "Up to 90 days in total during the eVisa's 12-month validity." },
      { question: "Can I perform Umrah on a tourist eVisa?", answer: "Yes. Umrah is permitted; Hajj is not." },
    ],
    sources: [
      { name: "Khaleej Times — How UAE and GCC residents can apply for a Saudi eVisa", url: "https://www.khaleejtimes.com/world/gulf/heres-how-uae-gcc-residents-can-apply-for-a-saudi-evisa" },
      { name: "Gulf News — Saudi eVisa: who is eligible and how to apply", url: "https://gulfnews.com/gulfnews/living-in-uae/visa-immigration/saudi-evisa-who-is-eligible-for-visa-on-arrival-in-saudi-arabia-1.1673617485700" },
      { name: "Wego — Saudi eVisa 2026", url: "https://blog.wego.com/saudi-e-visa/" },
    ],
    methodology: "Compiled from Gulf news outlets and travel guides, checked 26 November 2026. Eligibility counts vary between sources; confirm on the official portal.",
  },
  {
    id: "sa-absher-guide",
    slug: "absher-services-guide",
    title: "Absher explained: what residents and citizens can do online",
    seoTitle: "Absher Guide 2026: Iqama Renewal, Exit/Re-Entry Visas and E-Authorisations",
    subtitle: "Absher, the Interior Ministry's platform, handles most passport and residency paperwork. Here's what you can do yourself.",
    excerpt:
      "Absher Individuals lets citizens, residents and visitors handle passport and residency services online — from exit/re-entry visas to reporting a lost Iqama, and now authorising someone else to act for you.",
    category: "technology",
    tags: ["Absher", "Iqama", "Exit Re-Entry Visa", "Riyadh"],
    publishedAt: "2026-11-26T08:00:00+03:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone showing app icons",
    keyTakeaways: [
      "Absher Individuals is the personal-services side of the Interior Ministry's platform.",
      "Common services: exit/re-entry visas and extensions, final exit visas, reporting a lost Iqama or passport, managing dependents.",
      "A new e-authorisation feature lets you authorise someone else to complete 23 services for you.",
      "Fees vary by service and have changed recently — Absher shows the current fee before you pay.",
    ],
    body: [
      { type: "h2", id: "what", text: "What Absher is" },
      { type: "p", text: "Absher is the Ministry of Interior's e-services platform. Absher Individuals covers personal services for citizens, residents and visitors; Absher Business covers employers." },
      { type: "h2", id: "services", text: "Things you can do" },
      {
        type: "ul",
        items: [
          "Issue, extend or cancel exit/re-entry visas (from My Services → Passports).",
          "Issue a final exit visa.",
          "Report a lost Iqama or passport.",
          "Add or remove dependents.",
          "Check and pay government fees.",
        ],
      },
      { type: "h2", id: "authorise", text: "Authorising someone else" },
      { type: "p", text: "Absher now lets you electronically authorise another person to complete certain services for you — 23 at launch, including cancelling exit/re-entry visas and reporting a lost Iqama." },
      { type: "callout", title: "Check timing rules", text: "Some services depend on your Iqama's remaining validity. If an exit/re-entry visa expires while you're abroad, self-service extension may no longer be possible — act before it lapses." },
    ],
    faq: [
      { question: "Can I extend an exit/re-entry visa on Absher?", answer: "Yes, from My Services → Passports → Exit and Re-Entry Visa, subject to your Iqama's validity and the fee." },
      { question: "Can someone else use Absher for me?", answer: "Yes, through Absher's e-authorisation feature for eligible services." },
    ],
    sources: [
      { name: "ARY News — Absher unlocks 23 services through electronic authorization", url: "https://arynews.tv/absher-unlocks-23-services-through-electronic-authorization" },
      { name: "Wego — Saudi exit/re-entry visa extension on Absher and Muqeem", url: "https://blog.wego.com/saudi-exit-re-entry-visa-extension/" },
      { name: "Gulf News — Saudi Arabia revises fees for visa and Iqama services", url: "https://gulfnews.com/world/gulf/saudi/saudi-arabia-revises-fees-for-seven-services-including-visa-and-iqama-renewals-1.500010679" },
    ],
    methodology: "Compiled from Gulf news coverage and residents' guides, checked 26 November 2026. Fees are not stated because sources conflict; Absher shows the current fee.",
  },
];

export const articles = buildArticles("sa", drafts);

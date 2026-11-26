import { buildArticles, type Draft } from "../build";

/**
 * Published articles.
 *
 * Rules every article here follows:
 *  - Facts are linked to a named source in `sources`.
 *  - Prices are what the merchant showed on the stated date.
 *  - Nothing is described as "tested" unless it was tested. Spec comparisons
 *    say so in `methodology`.
 */

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&h=1000&q=80`;

const drafts: Draft[] = [
  // ─────────────────────────────────────────────────────────── SHOPPING
  {
    id: "a-anc-earbuds-under-2500",
    slug: "best-anc-earbuds-under-2500-india",
    title: "Best ANC earbuds under ₹2,500 in India (November 2026)",
    seoTitle: "Best ANC Earbuds Under ₹2,500 in India — November 2026 Prices",
    subtitle: "Three boAt earbuds with active noise cancellation, compared on what the brand actually promises and what they cost today.",
    excerpt:
      "boAt sells three ANC earbuds under ₹2,500 on its own store right now. Here is how the Airdopes Plus Spark ANC, Airdopes 423 ANC and Airdopes Prime 702 ANC compare on noise cancellation, battery and price.",
    category: "shopping",
    tags: ["Earbuds", "ANC", "boAt", "Buying Guide", "Under 2500"],
    publishedAt: "2026-11-25T11:00:00+05:30",
    heroImage:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/1_50445a70-f39a-4c0f-a517-5ed995744445.png?v=1793087077",
    heroImageAlt: "boAt Airdopes Prime 702 ANC earbuds and charging case",
    featured: true,
    trending: true,
    keyTakeaways: [
      "Cheapest ANC pick: boAt Airdopes Plus Spark ANC at ₹1,499 (up to 35dB ANC, up to 55 hours).",
      "Strongest ANC claim: boAt Airdopes Prime 702 ANC at ₹2,199 (up to 48dB hybrid ANC).",
      "Middle option: boAt Airdopes 423 ANC at ₹1,599 (35dB ANC, Bluetooth 6.0, 4 mics).",
      "All prices are from boAt's own store on 25 November 2026. They change often — check before you buy.",
    ],
    body: [
      { type: "h2", id: "quick-answer", text: "The quick answer" },
      {
        type: "p",
        text: "If you want noise cancellation for the least money, the Airdopes Plus Spark ANC is the pick at ₹1,499. If the main reason you want ANC is a noisy commute, spend ₹700 more on the Airdopes Prime 702 ANC, which is the only one here that boAt rates up to 48dB with hybrid ANC.",
      },
      { type: "products", slugs: ["boat-airdopes-plus-spark-anc", "boat-airdopes-423-anc", "boat-airdopes-prime-702-anc"] },
      { type: "h2", id: "comparison", text: "Side-by-side comparison" },
      {
        type: "table",
        caption: "Manufacturer-stated specs and boAt store prices, 25 November 2026",
        head: ["", "Airdopes Plus Spark ANC", "Airdopes 423 ANC", "Airdopes Prime 702 ANC"],
        rows: [
          ["Price", "₹1,499", "₹1,599", "₹2,199"],
          ["MRP", "₹4,990", "₹4,599", "₹5,990"],
          ["ANC (claimed)", "Up to 35dB", "35dB", "Up to 48dB hybrid"],
          ["Battery (claimed, with case)", "Up to 55h", "Up to 50h", "Up to 50h"],
          ["Drivers", "13mm", "12mm", "—"],
          ["Mics", "4 (Quad AI-ENx)", "4", "—"],
          ["Bluetooth", "6.0", "6.0", "—"],
        ],
      },
      {
        type: "p",
        text: "A dash means boAt's product page did not state the figure. We have not filled gaps with guesses.",
      },
      { type: "h2", id: "what-anc-numbers-mean", text: "What the ANC numbers mean" },
      {
        type: "p",
        text: "The dB figure is the brand's claim for how much background noise the earbuds can reduce at best. It is measured by the manufacturer under its own conditions, so treat it as a rough ranking rather than a guarantee. Hybrid ANC uses microphones both outside and inside the earbud, which usually handles low rumble (bus engines, AC hum, aircraft) better than feed-forward ANC alone.",
      },
      {
        type: "p",
        text: "Fit matters as much as the number. ANC works on top of the seal the ear tips make, so try every tip size in the box before deciding the ANC is weak.",
      },
      { type: "h2", id: "battery", text: "About the battery claims" },
      {
        type: "p",
        text: "The 50–55 hour figures are total playback including recharges from the case, usually measured with ANC off and at moderate volume. Expect noticeably less with ANC on. The earbuds themselves last a fraction of that per charge.",
      },
      { type: "h2", id: "who-should-buy", text: "Which one should you buy?" },
      {
        type: "ul",
        items: [
          "Students and first-time ANC buyers: Airdopes Plus Spark ANC (₹1,499).",
          "If you take a lot of calls: Airdopes 423 ANC (₹1,599) or Plus Spark ANC — both list four mics.",
          "Daily metro, bus or flight commuters: Airdopes Prime 702 ANC (₹2,199) for the highest ANC claim.",
          "If you want over-ear headphones with long battery instead: boAt Rockerz 430 Gen 2 (₹1,499) — note it has no ANC.",
        ],
      },
      { type: "products", slugs: ["boat-rockerz-430-gen-2"] },
    ],
    faq: [
      {
        question: "Which is the cheapest ANC earbud from boAt right now?",
        answer: "On 25 November 2026, the boAt Airdopes Plus Spark ANC was ₹1,499 on boAt's own store, the lowest price among its ANC earbuds we checked.",
      },
      {
        question: "Is 48dB ANC better than 35dB ANC?",
        answer: "A higher manufacturer rating usually means stronger noise reduction, but the figures are measured by the brand under its own conditions. Ear-tip fit has a large effect on real-world results.",
      },
      {
        question: "Do these prices include discounts?",
        answer: "Yes. The prices shown are the selling prices on boAt's store on 25 November 2026, below the listed MRP. Prices change frequently.",
      },
    ],
    sources: [
      { name: "boAt — Airdopes Plus Spark ANC product page", url: "https://www.boat-lifestyle.com/products/boat-airdopes-plus-spark-anc" },
      { name: "boAt — Airdopes 423 ANC product page", url: "https://www.boat-lifestyle.com/products/boat-airdopes-423-anc" },
      { name: "boAt — Airdopes Prime 702 ANC product page", url: "https://www.boat-lifestyle.com/products/boat-airdopes-prime-702-anc" },
      { name: "boAt — Rockerz 430 Gen 2 product page", url: "https://www.boat-lifestyle.com/products/boat-rockerz-430-gen-2" },
    ],
    methodology:
      "This is a specification and price comparison, not a hands-on review. Specs are taken from boAt's product pages and prices from boAt's online store on 25 November 2026. We have not measured ANC or battery life ourselves.",
    productSlugs: ["boat-airdopes-plus-spark-anc", "boat-airdopes-423-anc", "boat-airdopes-prime-702-anc"],
  },
  {
    id: "a-amoled-smartwatch-under-6000",
    slug: "amoled-smartwatch-under-6000-boat-vs-noise",
    title: "AMOLED smartwatch on a budget: boAt Ultima Vogue 2 vs Noise ColorFit Ultra 4",
    seoTitle: "boAt Ultima Vogue 2 vs Noise ColorFit Ultra 4",
    subtitle: "Both have a 1.96-inch AMOLED screen. One costs ₹2,799, the other ₹5,999. Here's what the extra money buys, according to the brands.",
    excerpt:
      "The boAt Ultima Vogue 2 and Noise ColorFit Ultra 4 both list a 1.96-inch AMOLED display. We compare what each brand promises — brightness, battery, health tracking and build — against today's prices.",
    category: "technology",
    tags: ["Smartwatch", "AMOLED", "boAt", "Noise", "Comparison"],
    publishedAt: "2026-11-25T10:00:00+05:30",
    heroImage:
      "https://cdn.shopify.com/s/files/1/0997/6284/files/Ultra_4_Black_1.png?v=1791182389",
    heroImageAlt: "Noise ColorFit Ultra 4 smartwatch in black",
    featured: true,
    keyTakeaways: [
      'Both watches list a 1.96" AMOLED display.',
      "boAt Ultima Vogue 2: ₹2,799 — metal build, Bluetooth calling, Type-C charging.",
      "Noise ColorFit Ultra 4: ₹5,999 — 600-nit AMOLED with always-on display, up to 7 days battery, functional crown and AI features.",
      "Pick the boAt for value; pick the Noise if outdoor brightness and the extra software features matter to you.",
    ],
    body: [
      { type: "h2", id: "quick-answer", text: "The quick answer" },
      {
        type: "p",
        text: "If you mostly want an AMOLED screen, notifications and calling on your wrist, the boAt Ultima Vogue 2 at ₹2,799 covers it for less than half the price of the Noise. The Noise ColorFit Ultra 4 at ₹5,999 is for buyers who want a brighter (600-nit) always-on display, a functional crown and Noise's AI features.",
      },
      { type: "products", slugs: ["boat-ultima-vogue-2", "noise-colorfit-ultra-4"] },
      { type: "h2", id: "comparison", text: "Spec comparison" },
      {
        type: "table",
        caption: "Manufacturer-stated specs; prices from each brand's own store on 25 November 2026",
        head: ["", "boAt Ultima Vogue 2", "Noise ColorFit Ultra 4"],
        rows: [
          ["Price", "₹2,799", "₹5,999"],
          ["MRP", "₹7,999", "₹8,999"],
          ["Display", '1.96" AMOLED', '1.96" AMOLED, 600 nits peak'],
          ["Always-on display", "Not stated", "Yes"],
          ["Build", "Metal", "Not stated"],
          ["Bluetooth calling", "Yes", "Not stated on product page summary"],
          ["Health tracking", "Health monitoring (not itemised)", "Heart rate, SpO₂, stress, sleep"],
          ["Battery (claimed)", "Not stated", "Up to 7 days"],
          ["Charging", "Type-C", "Type-C"],
          ["Extras", "—", "Functional crown, shortcut button, AI transcription, voice commands"],
        ],
      },
      { type: "h2", id: "display", text: "Display: same size, different brightness claim" },
      {
        type: "p",
        text: "Size is identical on paper. Noise states a 600-nit peak and an always-on mode; boAt does not publish a brightness figure on the product page. If you are outdoors in Indian afternoon sun a lot, the published brightness figure is the safer bet.",
      },
      { type: "h2", id: "health", text: "Health tracking: useful, not medical" },
      {
        type: "p",
        text: "Wrist-based heart rate, SpO₂ and stress readings on budget watches are estimates for trends, not medical measurements. Neither brand positions these as medical devices. If you need accurate readings for a health condition, use a certified device and talk to a doctor.",
      },
      { type: "h2", id: "who-should-buy", text: "Who should buy which" },
      {
        type: "ul",
        items: [
          "First smartwatch, tight budget: boAt Ultima Vogue 2.",
          "You want the watch to stay visible without a wrist flick: Noise ColorFit Ultra 4 (always-on display).",
          "Battery life matters and you want a stated figure: Noise ColorFit Ultra 4 (up to 7 days, per Noise).",
          "Under ₹1,500: Noise sells the ColorFit Kore (₹1,299) and ColorFit Pulse Air (₹1,399), but its product pages did not list full specs when we checked, so we can't compare them fairly yet.",
        ],
      },
    ],
    faq: [
      {
        question: "Which is cheaper, boAt Ultima Vogue 2 or Noise ColorFit Ultra 4?",
        answer: "On 25 November 2026 the boAt Ultima Vogue 2 was ₹2,799 on boAt's store and the Noise ColorFit Ultra 4 was ₹5,999 on Noise's store.",
      },
      {
        question: "Do both have AMOLED displays?",
        answer: 'Yes. Both brands list a 1.96" AMOLED display. Noise additionally states 600 nits peak brightness and an always-on display.',
      },
    ],
    sources: [
      { name: "boAt — Ultima Vogue 2 product page", url: "https://www.boat-lifestyle.com/products/boat-ultima-vogue-2" },
      { name: "Noise — ColorFit Ultra 4 product page", url: "https://www.gonoise.com/products/noise-colorfit-ultra-4-smartwatch" },
    ],
    methodology:
      "Specification comparison based on each manufacturer's product page, with prices read from the brands' own online stores on 25 November 2026. We have not tested these watches hands-on.",
    productSlugs: ["boat-ultima-vogue-2", "noise-colorfit-ultra-4"],
  },

  // ─────────────────────────────────────────────────────────── TECHNOLOGY
  {
    id: "a-check-phone-imei-sanchar-saathi",
    slug: "check-phone-genuine-imei-sanchar-saathi",
    title: "How to check if a phone is genuine using its IMEI (and block it if it's stolen)",
    seoTitle: "Check IMEI on Sanchar Saathi and Block a Lost Phone",
    subtitle: "The government's Sanchar Saathi service lets you verify any handset by SMS in a minute, and block a lost or stolen phone across every network in India.",
    excerpt:
      "Buying a used phone? Send one SMS to 14422 to check its IMEI. Lost your phone? Here's how to block it on CEIR via Sanchar Saathi, and how to unblock it later.",
    category: "technology",
    tags: ["Sanchar Saathi", "IMEI", "CEIR", "Used Phones", "How To"],
    publishedAt: "2026-11-25T09:00:00+05:30",
    heroImage: unsplash("1511707171634-5f897ff02aa9"),
    heroImageAlt: "Smartphone showing app icons on a desk",
    keyTakeaways: [
      "Dial *#06# to see a phone's IMEI.",
      "Check it by SMS: send KYM <15-digit IMEI> to 14422, or use the Sanchar Saathi portal/app.",
      "Lost or stolen phone: file a police report, get a duplicate SIM, then submit a block request on Sanchar Saathi (CEIR).",
      "A blocked phone cannot be used on any Indian network. You can unblock it after informing the police it was found.",
    ],
    body: [
      { type: "h2", id: "what-is-sanchar-saathi", text: "What Sanchar Saathi is" },
      {
        type: "p",
        text: "Sanchar Saathi is a citizen portal and app from the Department of Telecommunications (DoT). Two of its services matter most to phone owners: KYM (Know Your Mobile), which checks whether an IMEI is genuine and not blacklisted, and CEIR (Central Equipment Identity Register), which blocks lost or stolen phones across all networks.",
      },
      { type: "h2", id: "find-imei", text: "Step 1: Find the IMEI" },
      {
        type: "ul",
        items: [
          "Dial *#06# on the phone. The IMEI (15 digits) appears on screen. Dual-SIM phones show two.",
          "It is also printed on the box and in Settings → About phone.",
          "For a used phone, make sure the IMEI on screen matches the box. A mismatch is a red flag.",
        ],
      },
      { type: "h2", id: "check-imei", text: "Step 2: Check the IMEI (KYM)" },
      {
        type: "ol",
        items: [
          "Open your SMS app.",
          "Type KYM, a space, then the 15-digit IMEI.",
          "Send it to 14422.",
          "Read the reply. It shows the brand and model registered to that IMEI, and whether it is blacklisted, duplicate or already in use.",
        ],
      },
      {
        type: "callout",
        title: "Before you pay for a used phone",
        text: "If the model in the reply doesn't match the phone in your hand, or the IMEI is flagged as blacklisted or duplicate, don't buy it.",
      },
      { type: "h2", id: "block-lost-phone", text: "Step 3: Block a lost or stolen phone" },
      {
        type: "ol",
        items: [
          "File a police complaint and keep a copy (FIR/complaint number).",
          "Get a duplicate SIM for your lost number from your operator. The block request needs an OTP on that number; it may take up to 24 hours after SIM activation before OTPs work.",
          "On Sanchar Saathi, choose the option to block your lost/stolen mobile and fill in the phone details, police report and ID proof.",
          "Save the Request ID you receive. You'll need it to check status or unblock.",
        ],
      },
      {
        type: "p",
        text: "Once processed, the handset is blocked within about 24 hours and can't be used on any network in India. Police can still trace it.",
      },
      { type: "h2", id: "unblock", text: "Step 4: Unblock it if you get it back" },
      {
        type: "p",
        text: "Inform the police that the phone has been recovered, then use the unblock option on Sanchar Saathi with your Request ID.",
      },
    ],
    faq: [
      {
        question: "What is the SMS number to check IMEI in India?",
        answer: "Send KYM followed by the 15-digit IMEI to 14422.",
      },
      {
        question: "Can a blocked phone be tracked?",
        answer: "Yes. According to the Department of Telecommunications, blocking does not stop police from tracing the device.",
      },
      {
        question: "Do I need a police report to block my phone?",
        answer: "Yes. The block request on Sanchar Saathi asks for the police report details along with ID proof.",
      },
    ],
    sources: [
      { name: "Sanchar Saathi (Department of Telecommunications)", url: "https://www.sancharsaathi.gov.in/" },
      { name: "CEIR — Sanchar Saathi", url: "https://ceir.sancharsaathi.gov.in/Home/index.jsp" },
      { name: "National Government Services Portal — Verify mobile device using IMEI", url: "https://services.india.gov.in/service/detail/verify-mobile-device-using-imei-number" },
      { name: "PIB — Ministry of Communications release on Sanchar Saathi", url: "https://pib.gov.in/PressReleasePage.aspx?PRID=1924552" },
    ],
    methodology: "Compiled from the Department of Telecommunications' Sanchar Saathi portal and official government releases.",
  },

  // ─────────────────────────────────────────────────────────── AI TOOLS
  {
    id: "a-free-ai-offers-india-status",
    slug: "free-chatgpt-gemini-perplexity-offers-india-status",
    title: "Free ChatGPT Go, Gemini Pro and Perplexity Pro in India: what's still running (November 2026)",
    seoTitle: "Free ChatGPT Go, Gemini & Perplexity Pro Offers in India",
    subtitle: "The free AI years handed out in 2025 are ending. Here's what has closed, what renews at a price, and how to avoid a surprise charge.",
    excerpt:
      "OpenAI's free ChatGPT Go year and Airtel's Perplexity Pro offer have closed to new sign-ups, and early claimants are reaching renewal. Here's the status, and how to cancel before you're billed.",
    category: "ai-tools",
    tags: ["ChatGPT Go", "Gemini", "Perplexity", "Jio", "Airtel"],
    publishedAt: "2026-11-25T08:30:00+05:30",
    heroImage: unsplash("1677442136019-21780ecad995"),
    heroImageAlt: "Abstract illustration of artificial intelligence",
    featured: true,
    trending: true,
    keyTakeaways: [
      "ChatGPT Go free year: closed to new users on 21 January 2026, per OpenAI's release notes. It renews at ₹399/month unless you cancel.",
      "Perplexity Pro via Airtel: promotion ended 16 January 2026, per Perplexity's help centre. 12-month claims from mid-2025 are expiring.",
      "Google AI Pro (Gemini) via Jio: reports disagree on whether new sign-ups are still open — check the MyJio app.",
      "Set a reminder a few days before your free year ends and cancel in the app store or account settings if you don't want to pay.",
    ],
    body: [
      { type: "h2", id: "why-it-matters", text: "Why this matters now" },
      {
        type: "p",
        text: "In 2025, three big AI subscriptions were offered free to Indian users for up to a year: ChatGPT Go directly from OpenAI, Perplexity Pro through Airtel, and Google's AI Pro plan (Gemini) through Jio. Most people who claimed these in mid-to-late 2025 are now reaching the end of the free period.",
      },
      { type: "h2", id: "status", text: "Status of each offer" },
      {
        type: "table",
        caption: "Compiled 25 November 2026 from official help pages and news reports",
        head: ["Offer", "New sign-ups", "What happens at the end"],
        rows: [
          ["ChatGPT Go (OpenAI)", "Closed 21 Jan 2026", "Renews at ₹399/month unless cancelled"],
          ["Perplexity Pro (via Airtel)", "Closed 16 Jan 2026", "Free year ends; check your Perplexity billing settings"],
          ["Google AI Pro / Gemini (via Jio)", "Reports conflict", "Check the MyJio app for your plan's end date"],
        ],
      },
      { type: "h2", id: "avoid-charges", text: "How to avoid an unexpected charge" },
      {
        type: "ol",
        items: [
          "Find the date you claimed the offer (check your email for the welcome message).",
          "Open the subscription where you're billed — Google Play, the App Store, or the provider's website account page.",
          "If you don't want to pay, cancel auto-renewal before the end date. You normally keep access until the paid period would start.",
          "Remove saved cards or UPI mandates you don't recognise from the subscription.",
        ],
      },
      { type: "h2", id: "free-alternatives", text: "If you don't want to pay" },
      {
        type: "p",
        text: "ChatGPT, Gemini and Perplexity all still have free tiers with daily limits. For most everyday tasks — drafting messages, summarising articles, quick research — the free tiers are enough. Paid plans mainly add higher limits, newer models and features such as longer file uploads.",
      },
    ],
    faq: [
      {
        question: "Is ChatGPT Go still free in India?",
        answer: "No new free sign-ups. OpenAI's release notes say the 12-month free ChatGPT Go offer ended on 21 January 2026. Existing users renew at ₹399 per month unless they cancel.",
      },
      {
        question: "Is Perplexity Pro still free with Airtel?",
        answer: "Perplexity's help centre says the Airtel promotion ended on 16 January 2026. People who claimed it earlier keep it until their 12 months run out.",
      },
      {
        question: "Is Gemini Pro still free with Jio?",
        answer: "Published reports conflict on whether new Jio sign-ups are still accepted. Check the MyJio app, which shows the current offer and your plan's end date.",
      },
    ],
    sources: [
      { name: "OpenAI — ChatGPT release notes", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
      { name: "Perplexity Help Center", url: "https://www.perplexity.ai/help-center" },
      { name: "Dataquest India — Free AI tools in India 2026", url: "https://www.dqindia.com/data-and-ai/free-ai-tools-in-india-are-gemini-chatgpt-perplexity-really-free-in-2026-10965188" },
      { name: "Croma Unboxed — Jio's Gemini vs Airtel's Perplexity vs ChatGPT Go", url: "https://www.croma.com/unboxed/jio-vs-airtel-vs-chatgpt-go" },
    ],
    methodology:
      "Compiled from the providers' official help pages and news coverage on 25 November 2026. Offer terms change; confirm in your own account.",
  },

  // ─────────────────────────────────────────────────────────── MONEY
  {
    id: "a-upi-circle-explained",
    slug: "upi-circle-explained",
    title: "UPI Circle explained: let family pay from your account, with limits you control",
    seoTitle: "UPI Circle Explained: Delegation, Limits and Setup",
    subtitle: "UPI Circle lets someone without their own bank-linked UPI pay from your account. Here's how full and partial delegation work, and the limits.",
    excerpt:
      "UPI Circle lets a primary user add up to five trusted people who can make UPI payments from the primary user's account — either with approval for every payment, or freely within a monthly limit.",
    category: "money",
    tags: ["UPI", "UPI Circle", "NPCI", "BHIM", "Payments"],
    publishedAt: "2026-11-25T07:30:00+05:30",
    heroImage: unsplash("1556742049-0cfed4f6a45d"),
    heroImageAlt: "Customer paying with a smartphone at a shop counter",
    keyTakeaways: [
      "A primary UPI user can add up to five secondary users.",
      "Partial delegation: every payment needs the primary user's approval with their UPI PIN.",
      "Full delegation: the secondary user pays without approval, within a monthly limit of up to ₹15,000.",
      "A secondary user can be linked to only one primary user.",
    ],
    body: [
      { type: "h2", id: "what-is-upi-circle", text: "What UPI Circle is" },
      {
        type: "p",
        text: "UPI Circle is an NPCI feature that lets you (the primary user) authorise trusted people (secondary users) to make UPI payments from your bank account. It is designed for family members who don't have their own bank account linked to UPI — for example, elderly parents or college students.",
      },
      { type: "h2", id: "two-types", text: "Full vs partial delegation" },
      {
        type: "table",
        head: ["", "Partial delegation", "Full delegation"],
        rows: [
          ["Who approves each payment", "Primary user, with UPI PIN", "No approval needed"],
          ["Spending limit", "Each payment approved individually", "Monthly limit set by primary user, up to ₹15,000"],
          ["Best for", "Occasional payments you want to see first", "Regular small spends (groceries, fees, travel)"],
        ],
      },
      {
        type: "p",
        text: "Some apps also apply a per-transaction cap for full delegation (Google Pay's guide cites ₹5,000 per transaction). NPCI's own FAQ is the reference to check for the current limits in your app.",
      },
      { type: "h2", id: "how-to-set-up", text: "How to set it up" },
      {
        type: "ol",
        items: [
          "Open a UPI app that supports UPI Circle (such as BHIM, Google Pay or PhonePe) and find the UPI Circle option.",
          "Add the person by scanning their UPI QR code or entering their UPI ID. You may be asked to confirm you know them personally.",
          "Choose partial or full delegation.",
          "For full delegation, set the monthly limit (up to ₹15,000) and how long the permission lasts, then confirm with your UPI PIN.",
          "The secondary user accepts the invitation in their own app.",
        ],
      },
      { type: "h2", id: "safety", text: "Safety tips" },
      {
        type: "ul",
        items: [
          "Only add people you know well. Payments under full delegation leave your account without asking you.",
          "Start with a low monthly limit and raise it later.",
          "You can remove a secondary user or change the limit at any time from the same UPI Circle screen.",
          "Check your bank statement: every Circle payment is debited from your account.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the UPI Circle limit?",
        answer: "With full delegation, the primary user can set a monthly limit of up to ₹15,000 per secondary user. With partial delegation, each payment is approved individually by the primary user.",
      },
      {
        question: "How many people can I add to UPI Circle?",
        answer: "A primary user can add up to five secondary users. Each secondary user can be linked to only one primary user.",
      },
      {
        question: "Does the secondary user need a bank account?",
        answer: "No. UPI Circle is designed for people who don't have their own bank account linked to UPI. They pay from the primary user's account.",
      },
    ],
    sources: [
      { name: "NPCI — UPI Circle FAQs", url: "https://npci.org.in/what-we-do/upi-circle/faqs" },
      { name: "Business Today — BHIM introduces UPI Circle full delegation", url: "https://www.businesstoday.in/personal-finance/news/story/bhim-introduces-upi-circle-delegation-for-seniors-young-users-to-transact-independently-within-preset-limits-503697-2025-11-25" },
      { name: "Business Standard — How to use Google Pay's UPI Circle", url: "https://business-standard.com/finance/personal-finance/how-to-make-payments-with-google-pay-s-upi-circle-a-complete-guide-124090200230_1.html" },
      { name: "Paytm — UPI Circle transaction limits", url: "https://paytm.com/blog/payments/upi/what-is-upi-circle-transaction-limits" },
    ],
    methodology: "Compiled from NPCI's UPI Circle FAQ and payment-app guides. Limits can differ slightly between apps; NPCI is the reference.",
  },
  {
    id: "a-free-credit-report-india",
    slug: "free-credit-report-india-cibil-experian-equifax-crif",
    title: "How to get your credit report free in India — from all four bureaus",
    seoTitle: "Free Credit Report in India: CIBIL, Experian & More",
    subtitle: "RBI rules entitle you to one free full credit report a year from each of India's four credit bureaus. That's four free checks a year if you stagger them.",
    excerpt:
      "Every credit bureau in India must give you one free full credit report, with score, once a year. Here's how to claim it from TransUnion CIBIL, Experian, Equifax and CRIF High Mark — and why checking never hurts your score.",
    category: "money",
    tags: ["CIBIL", "Credit Score", "Credit Report", "RBI", "Personal Finance"],
    publishedAt: "2026-11-24T18:00:00+05:30",
    heroImage: unsplash("1551288049-bebda4e38f71"),
    heroImageAlt: "Laptop screen showing financial charts",
    keyTakeaways: [
      "Since 1 January 2017, RBI requires each credit bureau to provide one free full credit report, with score, once a year on request.",
      "India has four RBI-registered credit bureaus: TransUnion CIBIL, Experian, Equifax and CRIF High Mark.",
      "Get each one directly from the bureau's official website — not a third-party site asking for payment.",
      "Checking your own report is a soft enquiry and does not lower your score.",
    ],
    body: [
      { type: "h2", id: "your-right", text: "Your right to a free report" },
      {
        type: "p",
        text: "The Reserve Bank of India requires every Credit Information Company (CIC) to give each individual one free full credit report, including the credit score, once a year after verifying their identity. The rule has applied since 1 January 2017.",
      },
      { type: "h2", id: "four-bureaus", text: "The four credit bureaus" },
      {
        type: "table",
        head: ["Bureau", "Where to get the free report"],
        rows: [
          ["TransUnion CIBIL", "cibil.com — free score & report link on the homepage"],
          ["Experian", "experian.in — free credit report link lower down the homepage"],
          ["Equifax", "equifax.co.in — free credit report section"],
          ["CRIF High Mark", "crifhighmark.com — free report request"],
        ],
      },
      {
        type: "callout",
        title: "Stagger them",
        text: "Request one bureau every three months — CIBIL in January, Experian in April, Equifax in July, CRIF in October. You get a near-continuous view of your credit for free.",
      },
      { type: "h2", id: "how-to-request", text: "How to request it" },
      {
        type: "ol",
        items: [
          "Go to the bureau's official website directly (type the address; don't click ads).",
          "Choose the free annual report option, not a paid plan.",
          "Enter your name, PAN, date of birth and mobile number, and verify with OTP. You may be asked identity questions about your loans or cards.",
          "Download the report and check every account and enquiry listed.",
        ],
      },
      { type: "h2", id: "what-to-check", text: "What to check in the report" },
      {
        type: "ul",
        items: [
          "Accounts you don't recognise — a possible sign of identity misuse.",
          "Loans you've closed still showing as active.",
          "Late payments you believe are wrong.",
          "Hard enquiries from lenders you never applied to.",
        ],
      },
      {
        type: "p",
        text: "If something is wrong, raise a dispute on the same bureau's website. The bureau checks with the lender and updates the record if it's an error.",
      },
    ],
    faq: [
      {
        question: "How many free credit reports can I get in a year?",
        answer: "One free full report per year from each of the four bureaus — TransUnion CIBIL, Experian, Equifax and CRIF High Mark — so up to four a year.",
      },
      {
        question: "Does checking my CIBIL score reduce it?",
        answer: "No. Checking your own score is a soft enquiry and does not affect it. Only lender enquiries when you apply for credit are hard enquiries.",
      },
      {
        question: "When can I get my next free CIBIL report?",
        answer: "CIBIL says that if you used your free report on or after 1 January 2026, you become eligible again on 1 January 2027.",
      },
    ],
    sources: [
      { name: "RBI — Notification on free full credit report (2016)", url: "https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=10590" },
      { name: "TransUnion CIBIL — Free CIBIL score", url: "https://cibil.com/freecibilscore" },
      { name: "Business Standard — CIBIL to provide one free credit report a year", url: "https://www.business-standard.com/article/economy-policy/cibil-to-provide-one-free-credit-report-a-year-raghuram-rajan-116072200201_1.html" },
    ],
    methodology: "Based on the RBI notification and the bureaus' own websites.",
  },

  // ─────────────────────────────────────────────────────────── LIFESTYLE
  {
    id: "a-sunscreen-label-guide",
    slug: "sunscreen-spf-pa-explained-india",
    title: "SPF, PA++++ and 'broad spectrum': how to read a sunscreen label in India",
    seoTitle: "SPF vs PA++++ Explained — How to Choose Sunscreen for Indian Skin",
    subtitle: "SPF is about burning. PA is about tanning and pigmentation. For most Indian skin, the second matters at least as much as the first.",
    excerpt:
      "SPF measures UVB protection; the PA rating measures UVA, the rays behind tanning and pigmentation. Here's what the numbers mean, what to look for, and how much to apply.",
    category: "lifestyle",
    tags: ["Sunscreen", "Skincare", "SPF", "PA++++"],
    publishedAt: "2026-11-24T12:00:00+05:30",
    heroImage: unsplash("1556228720-195a672e8a03"),
    heroImageAlt: "Skincare tube on a white background",
    keyTakeaways: [
      "SPF rates protection from UVB (sunburn). SPF 30 blocks about 97% of UVB; SPF 50 about 98%.",
      "PA (PA+ to PA++++) rates protection from UVA (tanning, ageing, pigmentation). More plus signs = more UVA protection.",
      "'Broad spectrum' means it covers both UVA and UVB.",
      "For daily use in Indian conditions, look for SPF 30–50 with PA+++ or PA++++, and reapply every two to three hours outdoors.",
    ],
    body: [
      { type: "h2", id: "spf", text: "SPF: protection from burning" },
      {
        type: "p",
        text: "SPF (Sun Protection Factor) measures protection against UVB rays, which cause sunburn. The scale isn't linear: SPF 30 blocks roughly 97% of UVB and SPF 50 roughly 98%. Beyond 50, the extra protection is small.",
      },
      { type: "h2", id: "pa-rating", text: "PA: protection from tanning and pigmentation" },
      {
        type: "p",
        text: "UVA rays penetrate deeper and are linked to tanning, pigmentation and skin ageing. The PA rating (originally a Japanese system, now common on Indian labels) runs from PA+ to PA++++. Because pigmentation is a common concern for Indian skin, dermatologists often say the PA rating matters as much as the SPF number.",
      },
      { type: "h2", id: "broad-spectrum", text: "'Broad spectrum'" },
      {
        type: "p",
        text: "Broad spectrum means the sunscreen protects against both UVA and UVB. A product can be SPF 50 and still have weak UVA protection, so check for a PA rating or a broad-spectrum claim — not SPF alone.",
      },
      { type: "h2", id: "what-to-buy", text: "What to look for" },
      {
        type: "table",
        head: ["Situation", "Look for"],
        rows: [
          ["Mostly indoors, short commute", "SPF 30, PA+++"],
          ["Outdoors daily, two-wheeler commute", "SPF 50, PA++++"],
          ["Pigmentation or melasma concerns", "SPF 50, PA++++, and ask a dermatologist"],
          ["Oily or acne-prone skin", "Gel or fluid textures labelled non-comedogenic"],
        ],
      },
      { type: "h2", id: "how-much", text: "How much, and how often" },
      {
        type: "ul",
        items: [
          "Use enough: a common guide is two finger-lengths for the face and neck.",
          "Apply 15 minutes before going out.",
          "Reapply every two to three hours outdoors, and after sweating or swimming.",
          "Use it on cloudy days too — UVA passes through clouds and windows.",
        ],
      },
    ],
    faq: [
      {
        question: "Is SPF 50 better than SPF 30?",
        answer: "SPF 50 blocks about 98% of UVB versus about 97% for SPF 30 — a small difference. Applying enough and reapplying matters more than the jump from 30 to 50.",
      },
      {
        question: "What does PA++++ mean?",
        answer: "PA++++ is the highest PA rating for UVA protection, the rays linked to tanning and pigmentation.",
      },
    ],
    sources: [
      { name: "Deccan Chronicle — The SPF number game (dermatologist interview)", url: "https://deccanchronicle.com/tabloid/hyderabad-chronicle/the-spf-number-game-1895582" },
      { name: "Elle India — SPF 101: protection and reapplication", url: "https://elle.in/beauty/spf-101-summer-protection-reapplication-why-your-sunscreen-matters-7772102" },
      { name: "The Deconstruct — What is PA in sunscreen", url: "https://thedeconstruct.in/blogs/skin-information/what-is-pa-in-sunscreen" },
    ],
    methodology:
      "General skincare information compiled from published dermatologist guidance. This is not medical advice — see a dermatologist for skin conditions.",
  },

  // ─────────────────────────────────────────────────────────── ENTERTAINMENT
  {
    id: "a-ott-releases-nov-25-2026",
    slug: "ott-releases-this-week-november-25-2026",
    title: "New on OTT this week (25–27 November 2026): Drishyam, Blade Runner 2099 and more",
    seoTitle: "OTT Releases This Week in India (25–27 Nov 2026)",
    subtitle: "What's arriving on Netflix, Prime Video, JioHotstar, SonyLIV and Sun NXT this week.",
    excerpt:
      "Ajay Devgn's Drishyam film lands on Netflix, Prime Video drops Blade Runner 2099, JioHotstar has Dhai Chaal, and SonyLIV brings Hanuman Ansh. Here's the week at a glance.",
    category: "entertainment",
    tags: ["OTT", "Netflix", "Prime Video", "JioHotstar", "SonyLIV"],
    publishedAt: "2026-11-25T13:00:00+05:30",
    heroImage: unsplash("1522869635100-9f4c5e86aa37"),
    heroImageAlt: "Hand holding a TV remote in front of a streaming app",
    trending: true,
    keyTakeaways: [
      "Netflix: Drishyam: The Conclusion (Hindi film, Ajay Devgn) from 27 November, after its 2 October theatrical release.",
      "Prime Video: Blade Runner 2099 (limited series) from 25 November.",
      "JioHotstar: Dhai Chaal (Hindi drama) from 27 November.",
      "SonyLIV: Hanuman Ansh from 27 November.",
    ],
    body: [
      { type: "h2", id: "this-week", text: "This week's releases" },
      {
        type: "table",
        caption: "Dates as announced; platforms sometimes shift release times",
        head: ["Title", "Platform", "Date", "Type"],
        rows: [
          ["Blade Runner 2099", "Prime Video", "25 Nov", "Series (English)"],
          ["Drishyam: The Conclusion", "Netflix", "27 Nov", "Film (Hindi)"],
          ["Dhai Chaal", "JioHotstar", "27 Nov", "Drama (Hindi)"],
          ["Hanuman Ansh", "SonyLIV", "27 Nov", "Film"],
          ["Enemy of the Smuggler", "Sun NXT", "27 Nov", "Film (Tamil, Telugu)"],
        ],
      },
      { type: "h2", id: "pick-of-the-week", text: "If you watch one thing" },
      {
        type: "p",
        text: "Drishyam: The Conclusion is the obvious pick for Hindi viewers who followed the earlier films and missed it in theatres. For English drama, Blade Runner 2099 is a limited series set decades after the films, starring Michelle Yeoh and Hunter Schafer.",
      },
      {
        type: "callout",
        title: "Before you press play",
        text: "Release dates come from platform announcements and entertainment press, and occasionally move. If a title isn't showing, check the platform's 'Coming soon' row.",
      },
    ],
    faq: [
      {
        question: "When is Drishyam: The Conclusion on Netflix?",
        answer: "Reports list 27 November 2026 for its Netflix release, after the film's theatrical release on 2 October 2026.",
      },
      {
        question: "Where can I watch Blade Runner 2099?",
        answer: "Blade Runner 2099 streams on Prime Video, with a release listed for 25 November 2026.",
      },
    ],
    sources: [
      { name: "IWMBuzz — OTT releases this week, 25–28 November 2026", url: "https://www.iwmbuzz.com/digital/editorial-digital/ott-releases-this-week-november-25-28-2026-hindi-south-english-titles-to-watch-across-netflix-jiohotstar-more/2026/11/25" },
      { name: "Pune Pulse — 12 new OTT releases, 25–27 November", url: "https://mypunepulse.com/ott-releases-this-week-from-ajay-devgns-drishyam-3-to-hanuman-ansh-and-spider-man-check-12-new-releases-from-november-25-to-27/" },
      { name: "Vi — OTT releases this week", url: "https://www.myvi.in/blog/ott-releases-this-week" },
    ],
    methodology: "Compiled from platform announcements as reported by entertainment outlets on 25 November 2026.",
  },

  // ─────────────────────────────────────────────────────────── TRAVEL
  {
    id: "a-digiyatra-explained",
    slug: "digiyatra-explained-how-it-works",
    title: "DigiYatra explained: how face-scan airport entry works, and what to check first",
    seoTitle: "DigiYatra App Explained — How It Works, How to Register, Privacy",
    subtitle: "Register once with Aadhaar, link your boarding pass, and walk through entry and security gates with a face scan. Here's the process and the questions to ask.",
    excerpt:
      "DigiYatra lets domestic flyers use face recognition instead of showing ID and boarding passes at airport gates. Here's how to register, how it works at the airport, and what to know about your data.",
    category: "travel",
    tags: ["DigiYatra", "Airports", "Flying", "Aadhaar"],
    publishedAt: "2026-11-24T09:00:00+05:30",
    heroImage: unsplash("1436491865332-7a61a109cc05"),
    heroImageAlt: "Aircraft wing above the clouds",
    keyTakeaways: [
      "DigiYatra is a facial-recognition boarding system run by the DigiYatra Foundation under the Ministry of Civil Aviation.",
      "It's voluntary: you can always use your ID and boarding pass at the regular counters.",
      "You register once in the DigiYatra app using Aadhaar, then add each boarding pass.",
      "Airport coverage keeps expanding — check the app for the current list before relying on it.",
    ],
    body: [
      { type: "h2", id: "what-it-is", text: "What DigiYatra is" },
      {
        type: "p",
        text: "DigiYatra replaces the ID-and-boarding-pass check at airport entry, security and (at some airports) boarding with a face scan. It is run by the DigiYatra Foundation under the Ministry of Civil Aviation's DigiYatra policy and launched in December 2022.",
      },
      { type: "h2", id: "register", text: "How to register" },
      {
        type: "ol",
        items: [
          "Install the official DigiYatra app from the Play Store or App Store (publisher: DigiYatra Foundation).",
          "Verify your mobile number.",
          "Add your identity using Aadhaar (via DigiLocker or Aadhaar OTP) and take a selfie.",
          "Before each trip, add your boarding pass by scanning it or importing it.",
          "Share your credential with the departure airport when the app asks.",
        ],
      },
      { type: "h2", id: "at-the-airport", text: "At the airport" },
      {
        type: "ul",
        items: [
          "Use the DigiYatra lane at the entry gate and look at the camera.",
          "Use the DigiYatra lane at security if available.",
          "Carry your physical ID anyway — staff may still ask, and you'll need it if a gate isn't working.",
        ],
      },
      { type: "h2", id: "privacy", text: "Privacy: what to know" },
      {
        type: "p",
        text: "Under the DigiYatra policy, your credentials are stored in a wallet on your phone and shared with the airport for your journey, rather than held in a central database. Data handling around DigiYatra has been the subject of public debate and litigation, so read the app's privacy policy, and remember the service is optional.",
      },
    ],
    faq: [
      {
        question: "Is DigiYatra mandatory?",
        answer: "For domestic travellers it is voluntary. You can always use your ID and boarding pass at regular counters.",
      },
      {
        question: "Which airports have DigiYatra?",
        answer: "The list keeps growing. Check the DigiYatra app for the current airports before relying on it.",
      },
    ],
    sources: [
      { name: "Ministry of Civil Aviation — DigiYatra policy (PDF)", url: "https://civilaviation.gov.in/sites/default/files/2023-07/Digi Yatra Policy (DIGI YATRA).pdf" },
      { name: "Ministry of Civil Aviation", url: "https://www.civilaviation.gov.in/node/6041" },
      { name: "Business Standard — DigiYatra to expand to more airports", url: "https://www.business-standard.com/industry/aviation/digi-yatra-to-expand-to-15-more-airports-this-fiscal-125060901173_1.html" },
    ],
    methodology: "Based on the Ministry of Civil Aviation's DigiYatra policy and news coverage. Check the app for current airports.",
  },
  {
    id: "in-fastag-annual-pass",
    slug: "fastag-annual-pass-how-it-works",
    title: "FASTag Annual Pass: ₹3,000 for 200 toll trips — who it suits and how to activate it",
    seoTitle: "FASTag Annual Pass: ₹3,000 for 200 Trips, How to Activate",
    subtitle: "A prepaid pass for private cars on national highways. It's great value for frequent highway drivers — and pointless for some others.",
    excerpt:
      "The FASTag Annual Pass costs ₹3,000 and covers 200 toll crossings or one year on NHAI national highways and expressways. How it works, where it doesn't apply, and how to activate it on Rajmargyatra.",
    category: "travel",
    tags: ["FASTag", "NHAI", "Highways", "Toll"],
    publishedAt: "2026-11-27T14:00:00+05:30",
    heroImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "A driver's hands on the steering wheel at dusk",
    keyTakeaways: [
      "Price at launch (15 August 2025): ₹3,000, for private cars, jeeps and vans.",
      "Valid for 200 toll crossings or one year from activation, whichever comes first.",
      "Works only at NHAI-run national highway and national expressway plazas — not on state-run roads such as Mumbai–Pune or Samruddhi.",
      "Activate only via the Rajmargyatra app or the NHAI website; it usually reflects within 2 hours.",
    ],
    body: [
      { type: "h2", id: "what", text: "What you get" },
      {
        type: "p",
        text: "The Annual Pass is loaded onto your existing FASTag. Each crossing at an eligible plaza counts as one trip. After 200 trips or one year, the tag goes back to normal balance-based payment, and you can buy the pass again.",
      },
      { type: "h2", id: "worth-it", text: "Is it worth it?" },
      {
        type: "ul",
        items: [
          "At ₹3,000 for 200 crossings, each trip costs ₹15 — far less than most car toll rates on national highways.",
          "It suits people who regularly drive on NHAI highways, for commuting or frequent intercity trips.",
          "It doesn't help if most of your tolls are on state highways or state-run expressways, where the pass isn't valid.",
          "Commercial vehicles are not eligible.",
        ],
      },
      { type: "h2", id: "activate", text: "How to activate" },
      {
        type: "ol",
        items: [
          "Open the Rajmargyatra app or the NHAI website and go to the Annual Pass section.",
          "Enter your vehicle number and FASTag details — they must match your RC.",
          "Pay by UPI, card or net banking.",
          "The pass is activated on your FASTag, usually within 2 hours. If not, call the NHAI helpline on 1033.",
        ],
      },
      { type: "callout", title: "Beware of fake pass sellers", text: "Buy only through Rajmargyatra or NHAI. Websites and social media ads offering the pass are a common scam route." },
    ],
    faq: [
      { question: "How much is the FASTag Annual Pass?", answer: "₹3,000 at launch, for 200 toll crossings or one year, whichever comes first." },
      { question: "Is the FASTag Annual Pass valid on all expressways?", answer: "No. It works only at NHAI national highway and expressway plazas, not on state-run expressways." },
    ],
    sources: [
      { name: "NHAI — FASTag Annual Pass FAQs", url: "https://nhai.gov.in/nhai/sites/default/files/mix_file/FAQ_20_jun_25_Hindi.pdf" },
      { name: "Vikaspedia — FASTag Annual Pass user guide and FAQs", url: "https://en.vikaspedia.in/viewcontent/e-governance/digital-payment/fastag-annual-pass-user-guide-and-faqs?lgn=en" },
      { name: "Business Today — FASTag annual pass goes live", url: "https://www.businesstoday.in/personal-finance/news/story/fastag-annual-pass-goes-live-rs3000-gets-you-200-toll-free-nh-trips-heres-how-it-works-489618-2025-08-15" },
    ],
    methodology: "Compiled from NHAI's FAQ, Vikaspedia and Business Today, checked 27 November 2026. Check the Rajmargyatra app for the current price before buying.",
  },
  {
    id: "in-income-tax-act-2025",
    slug: "new-income-tax-act-2025-tax-year-explained",
    title: "The new Income-tax Act, 2025 is in force: what 'Tax Year' means for you",
    seoTitle: "Income-tax Act 2025: What the New 'Tax Year' Means",
    subtitle: "Since 1 April 2026, India's 1961 tax law has been replaced. Here's what actually changes for salaried people and small taxpayers.",
    excerpt:
      "The Income-tax Act, 2025 replaced the 1961 Act from 1 April 2026. 'Previous year' and 'assessment year' are now a single 'Tax Year', and section numbers like 80C have changed. What it means when you file.",
    category: "money",
    tags: ["Income Tax", "Income-tax Act 2025", "ITR", "CBDT"],
    publishedAt: "2026-11-27T13:00:00+05:30",
    heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "A calculator and financial documents on a desk",
    keyTakeaways: [
      "The Income-tax Act, 2025 came into force on 1 April 2026, replacing the Income-tax Act, 1961.",
      "'Previous year' and 'assessment year' are replaced by one 'Tax Year' — income from April 2026 to March 2027 is Tax Year 2026-27.",
      "Income earned up to 31 March 2026, and older assessments and appeals, still follow the 1961 Act.",
      "The new Act is about half the length, and familiar section numbers (like 80C) have been renumbered.",
    ],
    body: [
      { type: "h2", id: "tax-year", text: "Tax Year, explained" },
      {
        type: "p",
        text: "Under the old law, income earned in 2025-26 (the 'previous year') was assessed in 2026-27 (the 'assessment year'), which confused many filers. The new Act uses one label: the year you earn the income is the Tax Year. So income from 1 April 2026 to 31 March 2027 belongs to Tax Year 2026-27.",
      },
      { type: "h2", id: "what-stays", text: "What stays the same" },
      {
        type: "ul",
        items: [
          "Your return for income earned up to March 2026 is filed under the 1961 Act's rules.",
          "Tax slabs and rates are set each year by the Finance Act — check the rates for your Tax Year before calculating.",
          "Deductions and exemptions largely carry over, but under new section numbers.",
        ],
      },
      { type: "h2", id: "practical", text: "What to do" },
      {
        type: "ol",
        items: [
          "When your employer or CA refers to deductions, expect new section numbers in forms and Form 16.",
          "Check the Income Tax Department's mapping of old to new sections before claiming a deduction.",
          "Confirm return due dates on the e-filing portal each year — they're notified by the department.",
        ],
      },
      { type: "callout", title: "Not tax advice", text: "For complex situations — capital gains, business income, NRI status — speak to a chartered accountant." },
    ],
    faq: [
      { question: "When did the Income-tax Act, 2025 come into force?", answer: "On 1 April 2026." },
      { question: "What is a Tax Year?", answer: "The financial year in which income is earned. Income from April 2026 to March 2027 is Tax Year 2026-27." },
    ],
    sources: [
      { name: "Income Tax Department — Income-tax Act, 2025 comes into force from 1 April 2026", url: "https://www.incometaxindia.gov.in/w/income-tax-act-2025-comes-into-force-from-1st-april-2026" },
      { name: "Business Today — Income Tax Act 2025 comes into force from April 1", url: "https://www.businesstoday.in/personal-finance/tax/story/income-tax-act-2025-comes-into-force-from-april-1-marks-major-tax-reform-cbdt-523616-2026-04-01" },
    ],
    methodology: "Compiled from the Income Tax Department's announcement and Business Today, checked 27 November 2026. Not tax advice.",
  },
  {
    id: "in-new-aadhaar-app",
    slug: "new-aadhaar-app-features-maadhaar",
    title: "The new Aadhaar app: share your Aadhaar without photocopies, lock biometrics and more",
    seoTitle: "New Aadhaar App: Features, Face Auth and Biometric Lock",
    subtitle: "UIDAI's new app replaces mAadhaar. Here's what it does and how to switch safely.",
    excerpt:
      "UIDAI's new Aadhaar app lets you share verified Aadhaar details by QR code instead of a photocopy, update your mobile number with face authentication, and lock your biometrics. mAadhaar is being retired.",
    category: "technology",
    tags: ["Aadhaar", "UIDAI", "mAadhaar", "Privacy"],
    publishedAt: "2026-11-27T15:00:00+05:30",
    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "A smartphone home screen with app icons",
    keyTakeaways: [
      "UIDAI rolled out the full new Aadhaar app on 28 January 2026; the older mAadhaar app is being discontinued.",
      "Share Aadhaar details by QR code or with face authentication instead of handing over photocopies.",
      "Lock and unlock your fingerprint, iris and face authentication, and view your authentication history.",
      "Update the mobile number linked to Aadhaar using face authentication.",
    ],
    body: [
      { type: "h2", id: "features", text: "What the app does" },
      {
        type: "ul",
        items: [
          "Stores your Aadhaar as a digital identity and lets you share only the details needed.",
          "QR-code based sharing and verification, so shops and offices don't need a photocopy.",
          "Biometric lock and unlock for fingerprint, iris and face.",
          "Authentication history, so you can spot uses you don't recognise.",
          "Multiple family profiles on one phone.",
        ],
      },
      { type: "h2", id: "switch", text: "How to switch safely" },
      {
        type: "ol",
        items: [
          "Download the app published by UIDAI from the official Play Store or App Store listing — check the developer name.",
          "Verify with the OTP sent to your Aadhaar-linked mobile number, and set up face authentication.",
          "Once it works, uninstall mAadhaar.",
          "Never share OTPs or scan QR codes someone sends you to 'verify' your Aadhaar.",
        ],
      },
      { type: "callout", title: "Lock biometrics when not in use", text: "Locking biometrics blocks fingerprint-based misuse. Unlock briefly when you need biometric authentication, for example at a bank." },
    ],
    faq: [
      { question: "Is mAadhaar being discontinued?", answer: "Yes. UIDAI is replacing it with the new Aadhaar app; switch over and then remove mAadhaar." },
      { question: "Can I update my mobile number in the Aadhaar app?", answer: "Yes, the new app supports mobile number updates using face authentication." },
    ],
    sources: [
      { name: "UIDAI — New Aadhaar App dedicated to the nation", url: "https://www.uidai.gov.in/images/New_Aadhaar_App_Dedicated_to_the_Nation.pdf" },
      { name: "PIB — Ministry of Electronics & IT", url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2219790" },
      { name: "Business Today — mAadhaar discontinued: features of the new Aadhaar app", url: "https://www.businesstoday.in/india/story/maadhaar-app-discontinued-features-of-the-new-aadhaar-app-how-you-can-switch-and-more-539929-2026-06-30" },
    ],
    methodology: "Compiled from UIDAI, PIB and Business Today, checked 27 November 2026.",
  },
  {
    id: "in-ayushman-vay-vandana",
    slug: "ayushman-vay-vandana-card-70-plus",
    title: "Ayushman Vay Vandana card: ₹5 lakh free health cover for everyone aged 70+",
    seoTitle: "Ayushman Vay Vandana Card: ₹5 Lakh Cover for 70+",
    subtitle: "No income limit — every Indian citizen aged 70 or above can get the card. Here's how to apply.",
    excerpt:
      "Under Ayushman Bharat PM-JAY, every citizen aged 70 and above can get ₹5 lakh a year in free hospital cover, regardless of income. Apply on the Ayushman app or portal with Aadhaar e-KYC.",
    category: "money",
    tags: ["Ayushman Bharat", "PM-JAY", "Senior Citizens", "Health"],
    publishedAt: "2026-11-27T16:00:00+05:30",
    heroImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "A stethoscope on a white surface",
    keyTakeaways: [
      "Eligible: Indian citizens aged 70 or above, with no income criterion.",
      "Cover: ₹5 lakh a year for hospital treatment at empanelled hospitals.",
      "Families already under PM-JAY get this as additional cover for members aged 70+.",
      "Apply via the Ayushman app, the PM-JAY beneficiary portal, empanelled hospitals or Common Service Centres, using Aadhaar e-KYC.",
    ],
    body: [
      { type: "h2", id: "who", text: "Who can get it" },
      { type: "p", text: "Any Indian citizen aged 70 or above, whether rich or poor. Age is verified through Aadhaar. People with private insurance or other government schemes can still enrol, subject to scheme rules on choosing between schemes." },
      { type: "h2", id: "apply", text: "How to apply" },
      {
        type: "ol",
        items: [
          "Download the Ayushman app or visit the PM-JAY beneficiary portal.",
          "Log in with your mobile number and choose the option to enrol a person aged 70+.",
          "Complete Aadhaar OTP and e-KYC, and upload a recent photo if asked.",
          "Once approved, download the Ayushman Vay Vandana card.",
        ],
      },
      { type: "p", text: "Prefer help in person? Visit an empanelled hospital's Ayushman desk or a Common Service Centre with your Aadhaar card." },
      { type: "h2", id: "use", text: "Using the card" },
      {
        type: "ul",
        items: [
          "Show the card at the Ayushman desk of an empanelled hospital before admission.",
          "Treatment covered under the scheme is cashless up to the limit.",
          "Check whether a hospital is empanelled on the PM-JAY website or app.",
        ],
      },
      { type: "callout", title: "It's free", text: "Enrolment costs nothing. Don't pay agents who offer to 'get' the card for you." },
    ],
    faq: [
      { question: "Is there an income limit for the Ayushman Vay Vandana card?", answer: "No. All citizens aged 70 and above are eligible." },
      { question: "How much cover does the card give?", answer: "₹5 lakh a year for hospital treatment at empanelled hospitals." },
    ],
    sources: [
      { name: "Business Today — Ayushman Bharat cards for 70+ seniors: how to apply", url: "https://www.businesstoday.in/personal-finance/insurance/story/govt-rolls-out-ayushman-bharat-cards-for-70-seniors-with-rs-5-lakh-free-treatment-heres-how-to-apply-477945-2025-05-27" },
      { name: "Niva Bupa — Ayushman Vay Vandana card: steps to apply", url: "https://www.nivabupa.com/govt-scheme-articles/ayushman-vay-vandana-card.html" },
      { name: "Angel One — Govt settled over 1 lakh claims under Ayushman Vay Vandana", url: "https://www.angelone.in/news/economy/govt-settled-over-1-lakh-claims-under-ayushman-vay-vandana-scheme-check-how-to-apply" },
    ],
    methodology: "Compiled from Business Today and scheme guides, checked 27 November 2026. Confirm current steps on the PM-JAY portal.",
  },
  {
    id: "in-small-savings-rates-q3-fy27",
    slug: "ppf-scss-sukanya-interest-rates-oct-dec-2026",
    title: "PPF, SCSS, Sukanya rates for October–December 2026: unchanged again",
    seoTitle: "PPF, SCSS & Sukanya Rates Oct–Dec 2026: Unchanged",
    subtitle: "The government held small savings rates for the third quarter of 2026-27. Here's what each scheme pays and who it suits.",
    excerpt:
      "Small savings rates are unchanged for October–December 2026: PPF 7.1%, SCSS and Sukanya Samriddhi 8.2%, NSC 7.7%, post office savings 4%. The next review is due at the end of December.",
    category: "money",
    tags: ["PPF", "SCSS", "Sukanya Samriddhi", "Small Savings"],
    publishedAt: "2026-11-27T18:00:00+05:30",
    heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "A calculator and financial documents on a desk",
    keyTakeaways: [
      "PPF: 7.1%. Senior Citizens Savings Scheme: 8.2%. Sukanya Samriddhi Yojana: 8.2%.",
      "National Savings Certificate: 7.7%. Post office savings account: 4%.",
      "Rates for Q3 FY 2026-27 were kept the same as Q2 by a Finance Ministry order dated 30 September 2026.",
      "Rates are reviewed every quarter; the January–March 2027 rates should be announced around 31 December.",
    ],
    body: [
      { type: "h2", id: "rates", text: "The rates (October–December 2026)" },
      {
        type: "table",
        head: ["Scheme", "Interest rate", "Best for"],
        rows: [
          ["Public Provident Fund (PPF)", "7.1%", "Long-term, tax-free savings"],
          ["Senior Citizens Savings Scheme (SCSS)", "8.2%", "Regular income for those 60+"],
          ["Sukanya Samriddhi Yojana (SSY)", "8.2%", "Savings for a daughter's future"],
          ["National Savings Certificate (NSC)", "7.7%", "Fixed 5-year savings"],
          ["Post office savings account", "4%", "Day-to-day savings"],
        ],
      },
      { type: "h2", id: "how", text: "How rates are set" },
      { type: "p", text: "The Finance Ministry reviews small savings rates every quarter, broadly linked to government bond yields. For PPF and Sukanya, the rate applies to your whole balance and can change each quarter; for fixed schemes like NSC and SCSS, the rate on the day you invest is locked for the term." },
      { type: "callout", title: "Tax treatment differs", text: "PPF and Sukanya interest is tax-free; SCSS and NSC interest is taxable. Compare post-tax returns, especially if you're in a higher tax slab." },
    ],
    faq: [
      { question: "What is the PPF interest rate for October–December 2026?", answer: "7.1%." },
      { question: "What is the SCSS interest rate now?", answer: "8.2% for October–December 2026." },
    ],
    sources: [
      { name: "Business Today — Small savings rates unchanged for Q3 FY27", url: "https://www.businesstoday.in/personal-finance/story/small-savings-scheme-interest-rates-unchanged-for-q3-fy27-check-ppf-scss-ssy-rates-558892-2026-09-30" },
      { name: "Indian Bank — Interest rates for small savings schemes", url: "https://indianbank.bank.in/departments/interest-rates-for-small-savings-schemes/" },
      { name: "Angel One — Small savings rates for October–December 2026", url: "https://www.angelone.in/news/personal-finance/finance-minister-announces-small-savings-interest-rates-for-october-december-2026-quarter" },
    ],
    methodology: "Compiled from the Finance Ministry order as reported by Business Today, Indian Bank and Angel One, checked 27 November 2026. Not investment advice.",
  },
  {
    id: "in-tatkal-aadhaar-otp",
    slug: "tatkal-ticket-aadhaar-otp-rules",
    title: "Booking Tatkal tickets now needs Aadhaar: the rules and how to prepare",
    seoTitle: "Tatkal Booking Rules: Aadhaar Login and OTP Explained",
    subtitle: "Only Aadhaar-authenticated IRCTC users can book Tatkal online, and an OTP is needed at counters and agents too.",
    excerpt:
      "Since July 2025, Tatkal tickets can be booked online only by Aadhaar-authenticated IRCTC users, with an Aadhaar OTP. Agents can't book in the first 30 minutes. How to set up your account before you travel.",
    category: "travel",
    tags: ["Tatkal", "IRCTC", "Indian Railways", "Aadhaar"],
    publishedAt: "2026-11-27T18:00:00+05:30",
    heroImage: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Historic Victorian Gothic building on a rain-washed Mumbai street",
    keyTakeaways: [
      "Online Tatkal booking on the IRCTC website and app is limited to Aadhaar-authenticated users (from 1 July 2025).",
      "An Aadhaar-based OTP is needed to complete Tatkal bookings, including at PRS counters and through agents (from 15 July 2025).",
      "Authorised agents can't book Tatkal in the first 30 minutes of the window (10:00–10:30 for AC, 11:00–11:30 for non-AC).",
      "Link and verify Aadhaar on your IRCTC profile well before you need a ticket.",
    ],
    body: [
      { type: "h2", id: "setup", text: "Set up your IRCTC account" },
      {
        type: "ol",
        items: [
          "Log in to the IRCTC website or app and open 'My Profile'.",
          "Choose 'Aadhaar KYC' / 'Authenticate User' and enter your Aadhaar number.",
          "Verify with the OTP sent to your Aadhaar-linked mobile.",
          "Make sure the name and details match your Aadhaar exactly.",
        ],
      },
      { type: "h2", id: "booking-day", text: "On booking day" },
      {
        type: "ul",
        items: [
          "Tatkal opens one day before the journey: 10:00 for AC classes, 11:00 for non-AC.",
          "Keep your Aadhaar-linked phone with you to receive the OTP.",
          "Save passenger details in your master list in advance to save time.",
        ],
      },
      { type: "callout", title: "Check current rules", text: "Railways update Tatkal rules from time to time. Confirm the latest on IRCTC before your trip." },
    ],
    faq: [
      { question: "Is Aadhaar mandatory for Tatkal booking?", answer: "Yes, for online Tatkal booking the IRCTC user must be Aadhaar-authenticated, and an Aadhaar OTP is required." },
      { question: "Can agents book Tatkal tickets in the first 30 minutes?", answer: "No. Authorised agents are blocked for the first 30 minutes of each Tatkal window." },
    ],
    sources: [
      { name: "News on AIR — Aadhaar authentication mandatory for online Tatkal booking", url: "https://www.newsonair.gov.in/aadhaar-authentication-made-mandatory-for-online-tatkal-ticket-booking-from-july-15" },
      { name: "Business Standard — Aadhaar verification mandatory for IRCTC Tatkal bookings", url: "https://www.business-standard.com/india-news/aadhaar-verification-mandatory-irctc-tatkal-bookings-july-2025-125061101001_1.html" },
      { name: "Deccan Herald — All you need to know about the new Tatkal rules", url: "https://www.deccanherald.com/india/explained-all-you-need-to-know-about-the-new-rules-for-tatkal-ticket-booking-3582881" },
    ],
    methodology: "Compiled from All India Radio and news reports on the Railway Board circular, checked 27 November 2026.",
  },
];

export const articles = buildArticles("in", drafts);

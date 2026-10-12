/**
 * English content (British English). Single source for all English copy.
 * The French dictionary (fr.ts) must keep exactly the same shape.
 * Wording rules: Knowledge Base, Sections 3.4, 7 and 11.
 */
const en = {
  meta: {
    siteTitle: "Ordine Ermetico — French houses. Indian markets.",
    titleTemplate: "%s · Ordine Ermetico",
    descriptor: "French import and distribution house for India",
    siteDescription:
      "Ordine Ermetico is a French company based in Reims. We bring French houses of Champagne, wine, luxury and beauty to India as their exclusive importer and distributor, and open France and Europe to selected Indian brands.",
  },

  nav: {
    home: "Home",
    firm: "The Firm",
    capabilities: "Capabilities",
    markets: "Markets",
    approach: "Approach",
    news: "News",
    careers: "Careers",
    press: "Press",
    contact: "Contact",
    cta: "Discuss a Partnership",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    primary: "Primary navigation",
    languageLabel: "Language",
    switchTo: "Français",
    switchToShort: "FR",
    switchToLang: "fr",
    homeAria: "Ordine Ermetico, home",
  },

  footer: {
    statement: "French houses. Indian markets.",
    base: "Reims, France",
    explore: "Explore",
    company: "Company",
    contactTitle: "Contact",
    contactCta: "Contact us",
    emailUs: "Email us",
    write: "Write to us",
    legal: "Legal Notice",
    privacy: "Privacy Policy",
    cookies: "Cookie Preferences",
    rights: "All rights reserved.",
    follow: "Follow",
    backToTop: "Back to top",
  },

  common: {
    source: "Source",
    sources: "Sources",
    checked: "Figures as reported by the sources cited. Re-verified before publication.",
    learnMore: "Learn more",
    readOn: "Read on",
    placeholder: "To be confirmed",
    step: "Stage",
    contactCta: "Discuss a Partnership",
  },

  home: {
    metaTitle: "Ordine Ermetico — French houses. Indian markets.",
    metaDescription:
      "A French company from Reims that brings French houses of Champagne, wine, luxury and beauty to India as their exclusive importer and distributor, and opens Europe to selected Indian brands.",
    hero: {
      eyebrow: "Reims · Champagne · France",
      titleA: "Markets are entered.",
      titleB: "Positions are built.",
      body: "Ordine Ermetico is a French company based in Reims, in the heart of Champagne. We bring French houses of Champagne, wine, luxury and beauty to India, and build their presence there as their exclusive importer and distributor.",
      primary: "Discuss a Partnership",
      secondary: "Our Approach",
      line: "French houses. Indian markets.",
      scroll: "Scroll",
    },
    intro: {
      eyebrow: "Why we work the way we do",
      title: "Commercial relationships require architecture.",
      body: "Entering a market is not simply a matter of finding a buyer. It requires an understanding of positioning, distribution, counterparties, and the structure through which a commercial relationship can develop.",
      aside:
        "We work with a small number of houses, chosen for their quality and because India does not have them yet. For each, we are a single, accountable route to market.",
    },
    directions: {
      eyebrow: "Two directions",
      title: "From France to India, and back again.",
      items: [
        {
          from: "France",
          to: "India",
          label: "The core",
          title: "French houses into India",
          body: "We select French houses with no presence in India yet, and build their entry: licensing path, labels, pricing, channels and partners. Then we import, distribute and develop the brand as exclusive importer and distributor.",
        },
        {
          from: "India",
          to: "France & Europe",
          label: "The return route",
          title: "Indian brands into Europe",
          body: "The same discipline in reverse. Through our French company, we bring selected Indian brands with credible European potential to France and the EU as their exclusive importer and distributor.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "What we do for a house.",
      cta: "See each in detail",
    },
    process: {
      eyebrow: "Approach",
      title: "How a partnership unfolds.",
      body: "Four stages, from a first conversation in Reims to accounts that last.",
      cta: "Read the approach",
    },
    fta: {
      eyebrow: "The India–EU agreement",
      title: "India is lowering its duties on European wine.",
      body: "Concluded in January 2026, the agreement brings India’s 150% duty on European wine down in steps. Houses that prepare their entry now will be ready as each cut takes effect.",
      from: "Today",
      to: "Within seven years",
      caption: "India’s duty on premium EU wine",
      cta: "More on the Indian market",
    },
    partners: {
      eyebrow: "Partner Houses",
      title: "The houses we work with.",
      body: "Two houses of Champagne, from Vertus and from Reims.",
    },
    faq: {
      eyebrow: "Questions",
      title: "What houses usually ask us first.",
    },
    closing: {
      eyebrow: "Contact",
      title: "Introduce your house.",
      body: "Tell us about your house, the market you have in mind, and what you want to achieve.",
      cta: "Discuss a Partnership",
    },
  },

  capabilityList: [
    {
      id: "import-distribution",
      number: "01",
      title: "Exclusive Import & Distribution",
      summary: "One accountable route for a house into India.",
      problem:
        "A house entering India often meets a fragmented chain: one party for import, another for compliance, others for distribution. Responsibility is diluted, and so is the brand.",
      role: "We act as the house’s single importer and distributor for India, accountable for the whole route from the cellar door to the trade account.",
      activities: [
        "Import and customs clearance",
        "Compliance labelling",
        "Licensed storage",
        "Distribution to trade channels",
        "Account development",
      ],
      outcome: "One counterpart, one line of accountability, and a brand presented consistently in every account.",
    },
    {
      id: "market-entry",
      number: "02",
      title: "Market Entry Architecture",
      summary: "The structure before the first shipment.",
      problem:
        "India is not one market. Taxation, licensing and distribution are shaped State by State, and early decisions on route and price are difficult to undo.",
      role: "We design the entry before anything ships, so that the first bottle arrives into a structure built to last.",
      activities: [
        "Market suitability",
        "Entry route and licensing path",
        "Pricing architecture",
        "Channel plan",
        "Launch roadmap",
      ],
      outcome: "A clear, documented plan the house can examine and agree before committing stock.",
    },
    {
      id: "brand-positioning",
      number: "03",
      title: "Brand Positioning & Representation",
      summary: "How a French house is presented and represented in India.",
      problem:
        "A house’s standing in France does not travel on its own. In a new market, it must be explained with care and represented with consistency.",
      role: "We position the house for the Indian premium market and represent it with trade and hospitality partners, faithful to its identity.",
      activities: [
        "Positioning for the Indian premium market",
        "Trade and hospitality presentation",
        "Events",
        "Partner-facing narrative",
        "Representing the house with trade partners",
      ],
      outcome: "A presence in India that reads as the house itself, not as an approximation of it.",
    },
    {
      id: "partner-selection",
      number: "04",
      title: "Partner Selection & Relationships",
      summary: "The right counterparts, not the most counterparts.",
      problem:
        "Volume through the wrong accounts can cost a house its position. Where a brand is poured and sold matters as much as how much.",
      role: "We select and develop the hotels, restaurants, retailers and trade partners that fit each house, and look after those relationships over time.",
      activities: [
        "Selecting hotels, restaurants, retailers and trade partners",
        "Building long-term relationships",
        "Coordination and follow-through",
      ],
      outcome: "Fewer, better accounts, chosen for fit and developed with patience.",
    },
  ],

  capabilities: {
    metaTitle: "Capabilities",
    metaDescription:
      "Exclusive import and distribution, market entry architecture, brand positioning and partner selection: how Ordine Ermetico brings French houses to India.",
    eyebrow: "Capabilities",
    title: "What we do for a house.",
    lede: "Ordine Ermetico, a French company based in Reims, works with each house as its exclusive importer and distributor for India. These are the four disciplines that route is built on.",
    labels: {
      problem: "The problem",
      role: "Our role",
      activities: "Activities",
      outcome: "What the house gets",
      limits: "Limits of responsibility",
    },
    limits:
      "We do not give legal, tax or financial advice. We do not guarantee sales volumes or market results. We use specialist freight forwarders and customs brokers for logistics.",
    europe: {
      eyebrow: "The return route",
      title: "Indian brands into France and Europe.",
      body: "Through Ordine Ermetico SASU in Reims, we apply the same four disciplines in reverse, for Indian brands with credible European potential.",
      items: [
        { title: "Exclusive import & distribution", body: "A single importer and distributor for France and the EU, based in Reims." },
        { title: "Market entry architecture", body: "European compliance, labelling, pricing and channel plan, decided before the first shipment." },
        { title: "Positioning & representation", body: "Presenting an Indian brand to European trade with the care its quality deserves." },
        { title: "Partner selection", body: "Retailers, hospitality and trade partners in France and Europe, chosen for fit." },
      ],
    },
  },

  firm: {
    metaTitle: "The Firm",
    metaDescription:
      "Ordine Ermetico is a French company based in Reims, in Champagne. Why it exists, how it is structured, and who leads it.",
    eyebrow: "The Firm",
    title: "A French company, entering India.",
    lede: "Ordine Ermetico is a French company based in Reims, in the heart of the Champagne region. We bring French houses to India as their exclusive importer and distributor, and open France and Europe to selected Indian brands.",
    why: {
      eyebrow: "Why we exist",
      title: "India is opening. Most French houses are not there yet.",
      body: [
        "Many of France’s finest houses of Champagne, wine, luxury and beauty have no presence in India. The market is large, discerning and changing quickly, yet entering it well requires structure, patience and someone accountable on the ground.",
        "Ordine Ermetico exists to be that route: French in its base and its relationships, built for the Indian market, and selective by design.",
      ],
    },
    corridor: {
      eyebrow: "The corridor",
      title: "Why we are based in Reims.",
      body: "We are based in Reims and work directly with the houses. A permanent footprint in Europe makes it easier to keep relationships, credibility and operations with European houses close at hand. In time, it also makes importing from India into Europe straightforward.",
    },
    structure: {
      eyebrow: "Our structure",
      title: "How the company is organised.",
      parent: {
        label: "France · Reims",
        name: "Ordine Ermetico",
        role: "The parent company and the brand’s home. Holds the relationships with French houses, represents Ordine Ermetico in Europe, and brings selected Indian brands into France and the EU.",
      },
      child: {
        label: "India",
        name: "Our Indian company",
        status: "Being established",
        role: "Will import from Europe and act as exclusive importer and distributor in India for the houses we work with. It will be majority-owned by the French company.",
      },
      link: "Majority-owned subsidiary",
    },
    people: {
      eyebrow: "The team",
      title: "The people behind Ordine Ermetico.",
      more: "Meet the full team",
    },
    partners: {
      eyebrow: "Partner Houses",
      body: "We work with {houses}.",
    },
  },

  markets: {
    metaTitle: "Markets",
    metaDescription:
      "France, the source. India, the opportunity. How Ordine Ermetico connects French houses with India, and Indian brands with Europe.",
    eyebrow: "Markets",
    title: "Across markets. Within context.",
    lede: "Two countries, read closely. France, where the houses are. India, where the opportunity is opening.",
    france: {
      eyebrow: "France · The source",
      title: "Where the houses are.",
      body: [
        "France is home to houses whose standing was built over generations: in Champagne, in wine, in luxury and in beauty. Their value lies in what cannot be hurried: terroir, craft and consistency.",
        "From Reims, we work directly with these houses. Our role is to carry that value intact into a new market.",
      ],
      figureCaption: "Champagne bottles shipped in 2025",
    },
    india: {
      eyebrow: "India · The opportunity",
      title: "Where the opportunity is opening.",
      body: "India’s premium market is growing, and the India–EU Free Trade Agreement will sharply lower duties on European wine. The facts below are drawn from published sources, with dates.",
    },
    franceToIndia: {
      eyebrow: "France → India",
      title: "The houses we work with.",
      body: "We select houses not yet established in India and build their market there as exclusive importer and distributor.",
    },
    indiaToEurope: {
      eyebrow: "India → France & Europe",
      title: "The return route.",
      body: "Through our French company, we bring selected Indian brands with credible European potential to France and the EU, with the same discipline we apply in India.",
      cta: "Introduce your brand",
    },
  },

  approach: {
    metaTitle: "Approach",
    metaDescription:
      "Evaluate, Architect, Engage, Develop: the working method Ordine Ermetico uses to bring a French house to India.",
    eyebrow: "Approach",
    title: "Selection precedes representation.",
    lede: "Four stages, from the first conversation to a lasting presence. A working method, applied with judgment to each house.",
    stages: [
      {
        number: "01",
        title: "Evaluate",
        summary: "Assess the house, its products, its fit with India, its objectives and its constraints.",
        detail: [
          "Which references suit the Indian premium market, and in what order",
          "The house’s objectives, pace and constraints",
          "Whether we are the right partner, said candidly",
        ],
      },
      {
        number: "02",
        title: "Architect",
        summary: "Design the entry: licensing path, labels, pricing, channels and launch plan.",
        detail: [
          "Licensing path and compliance labelling",
          "Pricing architecture and channel plan",
          "Launch roadmap",
        ],
        agreement: {
          title: "The exclusive agreement",
          body: "At this stage, the house and Ordine Ermetico agree an exclusive import and distribution agreement covering scope, responsibilities, territory and term. It gives the house one accountable partner, and gives us the mandate to invest in building its market.",
        },
      },
      {
        number: "03",
        title: "Engage",
        summary: "Import, launch, and present the house to trade and hospitality partners.",
        detail: ["Import and clearance through specialist partners", "Launch", "Trade and hospitality presentations"],
      },
      {
        number: "04",
        title: "Develop",
        summary: "Grow accounts, keep the brand consistent, report to the house, build long-term presence.",
        detail: ["Account development", "Brand consistency across accounts", "Regular reporting to the house"],
      },
    ],
    not: {
      eyebrow: "Clarity",
      title: "What we are not.",
      items: [
        { title: "Not a freight forwarder", body: "Logistics are handled by contracted specialist forwarders and customs brokers." },
        { title: "Not an adviser", body: "We do not give legal, tax or financial advice." },
        { title: "Not a catalogue", body: "We work with a small number of houses, not a marketplace of brands." },
        { title: "Not a guarantor", body: "We build markets with care. We do not promise volumes or results." },
      ],
    },
  },

  news: {
    metaTitle: "News",
    metaDescription:
      "Announcements, press releases and milestones from Ordine Ermetico, a French company in Reims bringing French houses to India.",
    eyebrow: "Newsroom",
    title: "News from Ordine Ermetico.",
    lede: "Announcements, press releases, milestones, and occasional writing on the Indian market.",
    empty: "Nothing has been published yet. Our first announcements will appear here.",
    all: "All",
    kinds: {
      news: "News",
      press_release: "Press release",
      announcement: "Announcement",
      milestone: "Milestone",
      insight: "Insight",
      partnership: "Partnership",
    },
    readMore: "Read",
    back: "All news",
    englishOnly: "This article is available in English only.",
    pressTitle: "Press enquiries",
    pressBody: "For press enquiries, write to",
  },

  careers: {
    metaTitle: "Careers",
    metaDescription: "Open positions at Ordine Ermetico, a French company in Reims bringing French houses to India.",
    eyebrow: "Careers",
    title: "Work with us.",
    lede: "We are a small company building a long-term presence for French houses in India. We look for people who are precise, discreet, and at ease working between France and India.",
    openings: "Open positions",
    empty: "There are no open positions at the moment.",
    emptyBody: "You are welcome to introduce yourself. Send a short note and your CV to",
    view: "View position",
    back: "All positions",
    location: "Location",
    type: "Contract",
    department: "Team",
    closes: "Applications close",
    applyTitle: "Apply for this position",
    form: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      location: "Where you are based",
      linkedin: "LinkedIn profile",
      message: "A short note",
      messageHint: "Why this role, and what you would bring to it.",
      cv: "CV",
      cvHint: "PDF or Word, up to 4 MB.",
      optional: "Optional",
      consent:
        "I agree that Ordine Ermetico may keep my application and CV to assess it for this and similar positions. Applications are deleted after two years at the latest. See the",
      consentLink: "Privacy Policy",
      submit: "Send application",
      sending: "Sending…",
      successTitle: "Thank you.",
      successBody: "Your application has been received. We read every application and reply by email.",
      errorTitle: "Your application could not be sent.",
      errorBody: "Please try again in a moment, or email your CV to",
      fallbackTitle: "Apply by email",
      fallbackBody: "Online applications are not open yet. Please send your CV and a short note to",
      errors: {
        fullName: "Please enter your full name.",
        email: "Please enter a valid email address.",
        linkedin: "Please enter a full link starting with https://",
        cv: "Please attach your CV as a PDF or Word file of up to 4 MB.",
        consent: "Please agree so that we can keep and review your application.",
        summary: "Please correct the highlighted fields.",
      },
    },
  },

  team: {
    metaTitle: "Team",
    metaDescription: "The people of Ordine Ermetico, a French company in Reims bringing French houses to India.",
    eyebrow: "The team",
    title: "The people behind Ordine Ermetico.",
    lede: "Based in Reims and working between France and India.",
    back: "The Firm",
  },

  press: {
    metaTitle: "Press kit",
    metaDescription: "Approved descriptions, logos, founder portrait and press contact for Ordine Ermetico, a French company in Reims bringing French houses to India.",
    eyebrow: "Press",
    title: "Press kit.",
    lede: "Approved descriptions, logos and contacts for journalists and partners writing about Ordine Ermetico.",
    downloadAll: "Download the press kit",
    downloadAllNote: "ZIP · logos, emblem, founder portrait and approved texts",
    glanceTitle: "At a glance",
    glance: {
      name: "Name",
      what: "What it is",
      whatValue: "French import and distribution house for India",
      base: "Based in",
      baseValue: "Reims, France",
      activity: "Activity",
      activityValue: "Exclusive import and distribution in India of French houses not yet established there; selected Indian brands into France and the EU",
      categories: "Categories",
      categoriesValue: "Champagne, wine, luxury goods, cosmetics and beauty",
      partners: "Partner houses",
      founder: "Founder",
      website: "Website",
      press: "Press contact",
    },
    textsTitle: "Approved descriptions",
    textsIntro: "Use these as written. Please do not describe a named house as an exclusive partner unless we have announced it.",
    texts: [
      { label: "One line", text: "Ordine Ermetico is a French company based in Reims that brings French houses to India." },
      {
        label: "Short",
        text: "Ordine Ermetico is a French company based in Reims, in the heart of Champagne. It brings French houses of Champagne, wine, luxury and beauty to India as their exclusive importer and distributor, and opens France and Europe to selected Indian brands.",
      },
      {
        label: "Standard",
        text: "Ordine Ermetico is a French company based in Reims, in the heart of Champagne. It selects French houses of Champagne, wine, luxury and beauty that are not yet established in India, and builds their presence there as their exclusive importer and distributor: licensing, labelling, import, pricing and trade relationships handled by a single accountable partner. In the other direction, through its French company, Ordine Ermetico brings selected Indian brands to France and the European Union.",
      },
    ],
    copy: "Copy",
    copied: "Copied",
    logosTitle: "Logos",
    logosIntro: "PNG with transparent background. Vector files on request.",
    logos: [
      { file: "/brand/oe-logo-gold-transparent.png", label: "Logo · gold", use: "For dark backgrounds", tone: "dark" },
      { file: "/brand/oe-logo-bronze-transparent.png", label: "Logo · bronze", use: "For light backgrounds", tone: "light" },
      { file: "/brand/oe-emblem-gold-transparent.png", label: "Emblem · gold", use: "For dark backgrounds", tone: "dark" },
      { file: "/brand/oe-emblem-bronze-transparent.png", label: "Emblem · bronze", use: "For light backgrounds", tone: "light" },
    ],
    download: "Download",
    rulesTitle: "Using the logo",
    rules: [
      "Use the files supplied, unaltered: gold on dark backgrounds, bronze on light ones.",
      "Leave clear space around the logo at least the height of the letter O in the wordmark.",
      "Do not stretch, recolour, outline, or add shadows or effects; do not place it on busy images.",
      "Write the name as “Ordine Ermetico”; “OE” is fine after the first mention.",
      "Partner houses’ logos belong to the houses. Please request them from the houses directly.",
    ],
    coloursTitle: "Colours",
    founderTitle: "Founder portrait",
    founderCaption: "Chakravarthi Kundavarapu, Founder, Ordine Ermetico",
    founderAlt: "Portrait of Chakravarthi Kundavarapu, Founder of Ordine Ermetico",
    releasesTitle: "Latest press releases",
    releasesEmpty: "No press releases yet.",
    allNews: "All news",
    contactTitle: "Press enquiries",
    contactBody: "For interviews, information or images, write to",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Introduce your house to Ordine Ermetico, a French company in Reims bringing French houses to India. Write to office@ordineermetico.com.",
    eyebrow: "Contact",
    title: "Introduce your house.",
    lede: "Tell us about your house, the market you have in mind, and what you want to achieve.",
    direct: "Or write directly",
    based: "Based in",
    basedValue: "Reims, France",
    discretion: "Every enquiry is read carefully and handled with discretion.",
    form: {
      name: "Name",
      organisation: "Organisation",
      email: "Professional email",
      country: "Country",
      iam: "I am…",
      iamOptions: [
        { value: "house", label: "A house seeking India" },
        { value: "indian-brand", label: "An Indian brand seeking Europe" },
        { value: "trade-partner", label: "A trade partner in India" },
        { value: "other", label: "Other" },
      ],
      category: "Category",
      categoryOptions: [
        { value: "champagne", label: "Champagne" },
        { value: "wine", label: "Wine" },
        { value: "luxury", label: "Luxury goods" },
        { value: "beauty", label: "Cosmetics and beauty" },
        { value: "other", label: "Other" },
      ],
      select: "Please select",
      message: "Message",
      messageHint: "Your house, the market you have in mind, and what you want to achieve.",
      consent:
        "I agree that Ordine Ermetico may use the information in this form to respond to my enquiry, as described in the",
      consentLink: "Privacy Policy",
      required: "Required",
      submit: "Submit Enquiry",
      sending: "Sending…",
      successTitle: "Thank you.",
      successBody: "Your enquiry has been received. We will reply from office@ordineermetico.com.",
      errorTitle: "Your enquiry could not be sent.",
      errorBody: "Please try again in a moment, or write to us directly at",
      fallbackTitle: "Write to us directly",
      fallbackBody:
        "Online sending is not yet active. Your email application will open with your enquiry already written.",
      fallbackCta: "Open in my email application",
      rateLimited: "Too many attempts. Please wait a few minutes, or write to us directly at",
      errors: {
        name: "Please enter your name.",
        organisation: "Please enter your organisation.",
        email: "Please enter a valid professional email address.",
        country: "Please enter your country.",
        iam: "Please choose the option that describes you.",
        category: "Please choose a category.",
        message: "Please write a message of at least 20 characters.",
        consent: "Please agree to the privacy terms so we can reply.",
        summary: "Please correct the highlighted fields.",
      },
      emailSubject: "Enquiry from the website",
    },
  },

  faq: [
    {
      q: "Who is Ordine Ermetico?",
      a: "Ordine Ermetico is a French company based in Reims, in the Champagne region. It brings French houses of Champagne, wine, luxury and beauty to India as their exclusive importer and distributor, and brings selected Indian brands to France and Europe.",
    },
    {
      q: "How does a French Champagne house enter India?",
      a: "Through a structured entry: an assessment of fit, then a licensing path, compliance labelling, pricing architecture and a channel plan, before the first shipment. Ordine Ermetico handles this as the house’s single importer and distributor for India, then develops trade and hospitality accounts over time.",
    },
    {
      q: "Which houses does Ordine Ermetico work with?",
      a: "Ordine Ermetico works with {houses}.",
    },
    {
      q: "Does Ordine Ermetico work with Indian brands?",
      a: "Yes. Through its French company in Reims, Ordine Ermetico brings selected Indian brands with credible European potential to France and the EU as their exclusive importer and distributor.",
    },
    {
      q: "What does Ordine Ermetico not do?",
      a: "It is not a freight forwarder, a marketplace or a legal, tax or financial adviser, and it does not guarantee sales volumes or market results. Logistics are handled by specialist forwarders and customs brokers.",
    },
  ],

  partnerHouses: [
    {
      id: "duval-leroy",
      name: "Champagne Duval-Leroy",
      line: "Independent, family-owned Champagne house, founded in 1859 in Vertus, in the Côte des Blancs.",
      alt: "Champagne Duval-Leroy logo",
    },
    {
      id: "abele",
      name: "Champagne Abelé 1757",
      line: "One of the oldest Champagne houses, founded in Reims in 1757.",
      alt: "Champagne Abelé 1757 logo",
    },
  ],

  legal: {
    metaTitle: "Legal Notice",
    metaDescription: "Legal notice (mentions légales) for ordineermetico.com.",
    title: "Legal Notice",
    lede: "Information required under French law (Article 6 of law no. 2004-575 of 21 June 2004, LCEN).",
    sections: [
      {
        heading: "Publisher",
        rows: [
          ["Company", "Ordine Ermetico SASU", "exact registered name"],
          ["Legal form", "Société par actions simplifiée unipersonnelle (SASU)", ""],
          ["Share capital", "", "share capital"],
          ["Registered office", "", "registered address, Reims"],
          ["Registration", "RCS Reims", "RCS Reims number"],
          ["SIREN / SIRET", "", "SIREN and SIRET"],
          ["EU VAT number", "", "EU VAT number"],
          ["Email", "office@ordineermetico.com", ""],
          ["Director of publication", "", "director of publication"],
        ],
      },
      {
        heading: "Hosting",
        rows: [
          ["Host", "Vercel Inc.", ""],
          ["Address", "", "Vercel Inc. current postal address"],
          ["Website", "vercel.com", ""],
        ],
      },
    ],
    ip: {
      heading: "Intellectual property",
      body: "The Ordine Ermetico name, logo and the content of this website are protected. Any reproduction without prior written permission is prohibited. The logos of the partner houses are the property of their respective owners.",
    },
    liability: {
      heading: "Liability",
      body: "The information on this website is provided for general purposes. Market figures are drawn from the published sources cited next to them. Nothing on this website constitutes legal, tax or financial advice.",
    },
  },

  privacy: {
    metaTitle: "Privacy Policy",
    metaDescription: "How Ordine Ermetico handles personal data submitted through ordineermetico.com.",
    title: "Privacy Policy",
    lede: "Draft structure, to be completed and reviewed before launch.",
    sections: [
      {
        heading: "Data controller",
        body: "Ordine Ermetico SASU, Reims, France. Contact for privacy matters: office@ordineermetico.com.",
        placeholder: "data controller details and privacy contact",
      },
      {
        heading: "What we collect",
        body: "Only what you submit through the contact form: name, organisation, professional email, country, the option that describes you, category, and your message. We also process the technical data needed to serve the website securely.",
      },
      {
        heading: "Why, and on what basis",
        body: "To respond to your enquiry and, where relevant, to take steps before entering into an agreement (Article 6(1)(b) GDPR), or on the basis of our legitimate interest in answering professional enquiries (Article 6(1)(f) GDPR).",
      },
      {
        heading: "Who receives it",
        body: "Your enquiry is delivered to office@ordineermetico.com through our email service provider, Resend, acting as processor. The website is hosted by Vercel. Some providers may process data outside the EU under appropriate safeguards such as the European Commission’s Standard Contractual Clauses.",
      },
      {
        heading: "How long we keep it",
        body: "Enquiries are kept only as long as needed to handle them and any resulting relationship.",
        placeholder: "retention period",
      },
      {
        heading: "Job applications",
        body: "If you apply for a position, we keep the details you send and your CV in a private store that only the people handling recruitment can open. We use them only to assess your application for that position and similar ones, and delete them after two years at the latest, or sooner if you ask.",
      },
      {
        heading: "Your rights",
        body: "You may request access to, correction or deletion of your data, restrict or object to its processing, and request portability, by writing to office@ordineermetico.com. You may also lodge a complaint with the CNIL (cnil.fr).",
      },
      {
        heading: "Analytics",
        body: "We use Vercel Web Analytics, which measures visits in aggregate without cookies and without identifying you.",
      },
    ],
  },

  cookies: {
    metaTitle: "Cookie Preferences",
    metaDescription: "Ordine Ermetico does not use non-essential cookies.",
    title: "Cookie Preferences",
    lede: "This website does not place advertising, tracking or other non-essential cookies, so there is nothing for you to accept or decline.",
    body: [
      "Visitor measurement uses Vercel Web Analytics, which works without cookies and does not identify you.",
      "Staff who sign in to the administration area receive a strictly necessary session cookie. Visitors to the public site never do.",
      "If we ever introduce a non-essential cookie, we will ask for your consent first, and this page will let you change your choice at any time.",
    ],
    inventory: "Cookie inventory",
    inventoryValue: "None in use.",
  },

  notFound: {
    metaTitle: "Page not found",
    eyebrow: "404",
    title: "This page could not be found.",
    body: "The address may have changed, or the page may never have existed.",
    home: "Return home",
    contact: "Contact us",
  },
};

export default en;
export type Dictionary = typeof en;

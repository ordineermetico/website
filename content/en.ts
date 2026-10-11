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
    insights: "Insights",
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
    base: "Ordine Ermetico · Reims, France",
    explore: "Explore",
    company: "Company",
    write: "Write to us",
    legal: "Legal Notice",
    privacy: "Privacy Policy",
    cookies: "Cookie Preferences",
    rights: "All rights reserved.",
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
      eyebrow: "Our premise",
      title: "Commercial relationships require architecture.",
      body: "Entering a market is not simply a matter of finding a buyer. It requires an understanding of positioning, distribution, counterparties, and the structure through which a commercial relationship can develop.",
      aside:
        "We work with a small number of houses, chosen for their quality and because India does not have them yet. For each, we are a single, accountable route to market.",
    },
    directions: {
      eyebrow: "The corridor",
      title: "One discipline. Two directions.",
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
      title: "Four disciplines, one accountable route.",
      cta: "All capabilities",
    },
    process: {
      eyebrow: "Approach",
      title: "Selection precedes representation.",
      body: "Our working method, from the first conversation to a lasting presence.",
      cta: "How we work",
    },
    fta: {
      eyebrow: "Insight · India–EU",
      title: "A market opening, by treaty.",
      body: "The India–EU Free Trade Agreement will sharply lower India’s duties on European wine. For French houses, the next chapter of the Indian market is being written now.",
      from: "Today",
      to: "Within seven years",
      caption: "India’s duty on premium EU wine",
      cta: "Read the market view",
    },
    partners: {
      eyebrow: "Partner Houses",
      title: "The houses we work with.",
      body: "Two houses of Champagne, from Vertus and from Reims.",
    },
    faq: {
      eyebrow: "Questions",
      title: "Plainly answered.",
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
    title: "Four disciplines, one accountable route.",
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
      title: "Close to the source. Built for the destination.",
      body: "We are based in Reims and work directly with the houses. A permanent footprint in Europe makes it easier to keep relationships, credibility and operations with European houses close at hand. In time, it also makes importing from India into Europe straightforward.",
    },
    principles: {
      eyebrow: "Principles",
      title: "How we intend to be known.",
      items: [
        { title: "Discreet", body: "not secretive." },
        { title: "Selective", body: "not arrogant." },
        { title: "Precise", body: "not bureaucratic." },
        { title: "Confident", body: "not boastful." },
        { title: "Long-term", body: "not transactional." },
      ],
    },
    structure: {
      eyebrow: "Our structure",
      title: "A French parent. An Indian company, being established.",
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
    founder: {
      eyebrow: "Founder",
      name: "Chakravarthi Kundavarapu",
      role: "Founder",
      bio: [
        "Chakravarthi Kundavarapu founded Ordine Ermetico in Reims. A supply-chain and procurement professional, he works from an operations-first perspective, with a layer of data analytics.",
        "He is a Supply Chain Digitalization Engineer at a French aerospace manufacturer in Reims, where he built a supply-chain KPI framework and supplier-performance analytics.",
      ],
      educationTitle: "Education",
      education: [
        { school: "Rennes School of Business", detail: "MSc Logistics, Supply Chain and Purchasing" },
        { school: "NEOMA Business School", detail: "Programme Grande École" },
        { school: "RGUKT Basar", detail: "B.Tech Mechanical Engineering" },
      ],
      photoPlaceholder: "Founder photograph",
      linkedinPlaceholder: "LinkedIn profile",
    },
    partners: {
      eyebrow: "Partner Houses",
      body: "We work with Champagne Duval-Leroy and Champagne Abelé 1757.",
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
      title: "Houses, savoir-faire, and time.",
      body: [
        "France is home to houses whose standing was built over generations: in Champagne, in wine, in luxury and in beauty. Their value lies in what cannot be hurried: terroir, craft and consistency.",
        "From Reims, we work directly with these houses. Our role is to carry that value intact into a new market.",
      ],
      figureCaption: "Champagne bottles shipped in 2025",
    },
    india: {
      eyebrow: "India · The opportunity",
      title: "A market at the start of its next chapter.",
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

  insights: {
    metaTitle: "Insights",
    metaDescription:
      "Perspectives from Ordine Ermetico on French houses, the Indian market and the India–EU Free Trade Agreement.",
    eyebrow: "Insights",
    title: "Notes from the corridor.",
    lede: "Considered perspectives on French houses and the Indian market. Published when there is something worth saying.",
    empty: "First insights in preparation.",
    upcomingTitle: "In preparation",
    upcoming: [
      { category: "Trade", title: "The India–EU Free Trade Agreement and what it means for French wine" },
      { category: "Distribution", title: "How State-level distribution works in India" },
      { category: "Positioning", title: "Positioning a French house in India" },
    ],
    status: "In preparation",
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
      a: "Ordine Ermetico works with Champagne Duval-Leroy and Champagne Abelé 1757.",
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

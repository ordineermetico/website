import type { Locale } from "@/lib/i18n";

/**
 * Market facts (Knowledge Base, Section 10). Status: [VERIFY].
 * Every figure must be re-checked against its source before launch,
 * and the "checked" date updated when it is.
 */
export type Source = { label: string; date: string; url?: string };

export type Fact = {
  id: string;
  figure: string;
  text: Record<Locale, string>;
  sources: Source[];
};

export const factsCheckedOn = "2026-10-11";

export const facts: Fact[] = [
  {
    id: "fta",
    figure: "97%",
    text: {
      en: "The India–EU Free Trade Agreement was concluded on 27 January 2026. India will liberalise tariffs on about 97% of goods imported from the EU.",
      fr: "L’accord de libre-échange entre l’Inde et l’Union européenne a été conclu le 27 janvier 2026. L’Inde libéralisera les droits sur environ 97 % des marchandises importées de l’UE.",
    },
    sources: [
      { label: "Swarajya", date: "Jan 2026" },
      { label: "Ambrosia India", date: "Jan 2026" },
    ],
  },
  {
    id: "wine-duty",
    figure: "150% → 20%",
    text: {
      en: "India’s duty on EU wine falls from 150% to 75% when the agreement enters into force, then over seven years to 20% for premium wine and 30% for mid-range wine. Wines under €2.50 receive no concession.",
      fr: "Les droits de douane indiens sur les vins de l’UE passent de 150 % à 75 % à l’entrée en vigueur de l’accord, puis, sur sept ans, à 20 % pour les vins premium et 30 % pour le milieu de gamme. Les vins de moins de 2,50 € ne bénéficient d’aucune concession.",
    },
    sources: [
      {
        label: "Vino Joy News",
        date: "28 Jan 2026",
        url: "https://vino-joy.com/2026/01/28/india-eu-trade-deal-to-cut-wine-tariffs-from-150-to-20/",
      },
      { label: "wein.plus", date: "2026" },
    ],
  },
  {
    id: "ratification",
    figure: "Dec 2026",
    text: {
      en: "On 11 September 2026 the European Commission sent the agreement to the Council for signature, targeted for December 2026. Ratification follows.",
      fr: "Le 11 septembre 2026, la Commission européenne a transmis l’accord au Conseil en vue de sa signature, visée pour décembre 2026. La ratification suivra.",
    },
    sources: [
      {
        label: "News On AIR",
        date: "11 Sep 2026",
        url: "https://newsonair.gov.in/india-eu-move-closer-to-fta-as-european-commission-submits-formal-proposal/",
      },
      {
        label: "ORF",
        date: "2026",
        url: "https://www.orfonline.org/expert-speak/the-india-eu-fta-from-political-agreement-to-ratification-and-coming-into-force",
      },
    ],
  },
  {
    id: "champagne",
    figure: "266 M",
    text: {
      en: "Champagne shipped about 266 million bottles in 2025, of which about 152 million were exported. The United States alone took 26.4 million.",
      fr: "La Champagne a expédié environ 266 millions de bouteilles en 2025, dont environ 152 millions à l’export. Les États-Unis en ont reçu à eux seuls 26,4 millions.",
    },
    sources: [
      {
        label: "Comité Champagne, via Glass of Bubbly",
        date: "19 Jan 2026",
        url: "https://glassofbubbly.com/champagne-266-million-bottles-shipped-in-2025/",
      },
      {
        label: "Wine Industry Advisor",
        date: "7 Apr 2026",
        url: "https://wineindustryadvisor.com/2026/04/07/us-champagne-shipments-reach-26-4-million-bottles-in-2025/",
      },
    ],
  },
  {
    id: "india-wine",
    figure: "+15.9%",
    text: {
      en: "India imported about €24.9–28.3 million of wine in the twelve months to late 2025, ranking about 94th of 233 markets by value. Imports rose 15.9% in the first half of 2026.",
      fr: "L’Inde a importé pour environ 24,9 à 28,3 millions d’euros de vin sur les douze mois précédant fin 2025, soit environ le 94e marché sur 233 en valeur. Les importations ont progressé de 15,9 % au premier semestre 2026.",
    },
    sources: [
      {
        label: "Meininger’s International",
        date: "2025",
        url: "https://www.meininger.de/en/meiningers-international/news/small-wine-market-matures",
      },
      {
        label: "Vino Joy News",
        date: "25 Aug 2026",
        url: "https://vino-joy.com/2026/08/25/asia-defies-the-global-wine-slump-9-markets-ranked-by-import-growth/3/",
      },
    ],
  },
  {
    id: "excise",
    figure: "State",
    text: {
      en: "Alcoholic liquor for human consumption sits outside India’s GST. State excise applies instead, set by each State.",
      fr: "Les boissons alcoolisées destinées à la consommation humaine sont hors du champ de la GST indienne. Elles relèvent des droits d’accise fixés par chaque État.",
    },
    sources: [{ label: "TaxTMI", date: "2026", url: "https://www.taxtmi.com/forum/issue?id=120162" }],
  },
];

export function getFacts(ids: string[]): Fact[] {
  return ids.map((id) => facts.find((f) => f.id === id)).filter((f): f is Fact => Boolean(f));
}

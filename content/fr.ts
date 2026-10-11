import type { Dictionary } from "./en";

/**
 * Contenu français. Rédigé en français (et non traduit mot à mot).
 * [PLACEHOLDER] Relecture par un locuteur natif avant la mise en ligne.
 */
const fr: Dictionary = {
  meta: {
    siteTitle: "Ordine Ermetico — Maisons françaises. Marchés indiens.",
    titleTemplate: "%s · Ordine Ermetico",
    descriptor: "Maison française d’importation et de distribution pour l’Inde",
    siteDescription:
      "Ordine Ermetico est une société française basée à Reims. Nous accompagnons en Inde des maisons françaises de Champagne, de vin, de luxe et de beauté en tant qu’importateur et distributeur exclusif, et ouvrons la France et l’Europe à une sélection de marques indiennes.",
  },

  nav: {
    home: "Accueil",
    firm: "La Maison",
    capabilities: "Savoir-faire",
    markets: "Marchés",
    approach: "Méthode",
    insights: "Perspectives",
    contact: "Contact",
    cta: "Parlons partenariat",
    menu: "Menu",
    close: "Fermer",
    skip: "Aller au contenu",
    primary: "Navigation principale",
    languageLabel: "Langue",
    switchTo: "English",
    switchToShort: "EN",
    switchToLang: "en",
    homeAria: "Ordine Ermetico, accueil",
  },

  footer: {
    statement: "Maisons françaises. Marchés indiens.",
    base: "Ordine Ermetico · Reims, France",
    explore: "Découvrir",
    company: "Société",
    write: "Nous écrire",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    cookies: "Préférences cookies",
    rights: "Tous droits réservés.",
    follow: "Suivre",
    backToTop: "Haut de page",
  },

  common: {
    source: "Source",
    sources: "Sources",
    checked: "Chiffres tels que publiés par les sources citées. Vérifiés de nouveau avant publication.",
    learnMore: "En savoir plus",
    readOn: "Lire la suite",
    placeholder: "À confirmer",
    step: "Étape",
    contactCta: "Parlons partenariat",
  },

  home: {
    metaTitle: "Ordine Ermetico — Maisons françaises. Marchés indiens.",
    metaDescription:
      "Une société française, basée à Reims, qui accompagne en Inde des maisons de Champagne, de vin, de luxe et de beauté en tant qu’importateur et distributeur exclusif, et ouvre l’Europe à une sélection de marques indiennes.",
    hero: {
      eyebrow: "Reims · Champagne · France",
      titleA: "On entre sur un marché.",
      titleB: "On y bâtit une position.",
      body: "Ordine Ermetico est une société française basée à Reims, au cœur de la Champagne. Nous accompagnons en Inde des maisons françaises de Champagne, de vin, de luxe et de beauté, et y construisons leur présence en tant qu’importateur et distributeur exclusif.",
      primary: "Parlons partenariat",
      secondary: "Notre méthode",
      line: "Maisons françaises. Marchés indiens.",
      scroll: "Défiler",
    },
    intro: {
      eyebrow: "Notre conviction",
      title: "Une relation commerciale se construit comme une architecture.",
      body: "Entrer sur un marché ne se résume pas à trouver un acheteur. Cela suppose de comprendre le positionnement, la distribution, les interlocuteurs, et la structure dans laquelle une relation commerciale pourra se développer.",
      aside:
        "Nous travaillons avec un petit nombre de maisons, choisies pour leur qualité et parce qu’elles ne sont pas encore présentes en Inde. Pour chacune, nous sommes une voie d’accès unique et responsable.",
    },
    directions: {
      eyebrow: "Le corridor",
      title: "Une même exigence. Deux directions.",
      items: [
        {
          from: "France",
          to: "Inde",
          label: "Notre cœur de métier",
          title: "Des maisons françaises en Inde",
          body: "Nous sélectionnons des maisons françaises encore absentes du marché indien et construisons leur entrée : parcours de licences, étiquetage, prix, canaux et partenaires. Puis nous importons, distribuons et développons la marque en tant qu’importateur et distributeur exclusif.",
        },
        {
          from: "Inde",
          to: "France & Europe",
          label: "La voie retour",
          title: "Des marques indiennes en Europe",
          body: "La même exigence, en sens inverse. Par l’intermédiaire de notre société française, nous accompagnons en France et dans l’Union européenne des marques indiennes au réel potentiel européen, en tant qu’importateur et distributeur exclusif.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Savoir-faire",
      title: "Quatre disciplines, un seul interlocuteur responsable.",
      cta: "Tous nos savoir-faire",
    },
    process: {
      eyebrow: "Méthode",
      title: "La sélection précède la représentation.",
      body: "Notre méthode de travail, de la première conversation à une présence durable.",
      cta: "Notre façon de travailler",
    },
    fta: {
      eyebrow: "Perspective · Inde–UE",
      title: "Un marché qui s’ouvre, par traité.",
      body: "L’accord de libre-échange entre l’Inde et l’Union européenne va fortement réduire les droits de douane indiens sur les vins européens. Pour les maisons françaises, le prochain chapitre du marché indien s’écrit maintenant.",
      from: "Aujourd’hui",
      to: "D’ici sept ans",
      caption: "Droits de douane indiens sur les vins premium de l’UE",
      cta: "Lire notre regard sur les marchés",
    },
    partners: {
      eyebrow: "Maisons partenaires",
      title: "Les maisons avec lesquelles nous travaillons.",
      body: "Deux maisons de Champagne, de Vertus et de Reims.",
    },
    faq: {
      eyebrow: "Questions",
      title: "Des réponses claires.",
    },
    closing: {
      eyebrow: "Contact",
      title: "Présentez-nous votre maison.",
      body: "Parlez-nous de votre maison, du marché que vous envisagez et de ce que vous souhaitez accomplir.",
      cta: "Parlons partenariat",
    },
  },

  capabilityList: [
    {
      id: "import-distribution",
      number: "01",
      title: "Importation et distribution exclusives",
      summary: "Une voie d’accès unique et responsable vers l’Inde.",
      problem:
        "Une maison qui entre en Inde se heurte souvent à une chaîne morcelée : un acteur pour l’importation, un autre pour la conformité, d’autres encore pour la distribution. La responsabilité se dilue, et la marque avec elle.",
      role: "Nous sommes l’unique importateur et distributeur de la maison pour l’Inde, responsable de l’ensemble du parcours, du chai jusqu’au client professionnel.",
      activities: [
        "Importation et dédouanement",
        "Étiquetage réglementaire",
        "Stockage sous licence",
        "Distribution auprès des circuits professionnels",
        "Développement des comptes",
      ],
      outcome: "Un seul interlocuteur, une seule chaîne de responsabilité, et une marque présentée avec cohérence partout.",
    },
    {
      id: "market-entry",
      number: "02",
      title: "Architecture d’entrée sur le marché",
      summary: "La structure, avant la première expédition.",
      problem:
        "L’Inde n’est pas un marché unique. Fiscalité, licences et distribution se décident État par État, et les premiers choix de circuit et de prix sont difficiles à défaire.",
      role: "Nous concevons l’entrée avant toute expédition, pour que la première bouteille arrive dans une structure pensée pour durer.",
      activities: [
        "Adéquation au marché",
        "Voie d’entrée et parcours de licences",
        "Architecture de prix",
        "Plan de distribution",
        "Feuille de route de lancement",
      ],
      outcome: "Un plan clair et documenté, que la maison peut examiner et valider avant d’engager du stock.",
    },
    {
      id: "brand-positioning",
      number: "03",
      title: "Positionnement et représentation de marque",
      summary: "Comment une maison française est présentée et représentée en Inde.",
      problem:
        "Le prestige d’une maison en France ne voyage pas seul. Sur un nouveau marché, il doit être expliqué avec soin et représenté avec constance.",
      role: "Nous positionnons la maison sur le marché premium indien et la représentons auprès des professionnels et de l’hôtellerie, fidèlement à son identité.",
      activities: [
        "Positionnement sur le marché premium indien",
        "Présentations aux professionnels et à l’hôtellerie",
        "Événements",
        "Discours de marque destiné aux partenaires",
        "Représentation de la maison auprès des partenaires commerciaux",
      ],
      outcome: "Une présence en Inde qui ressemble à la maison elle-même, et non à une approximation.",
    },
    {
      id: "partner-selection",
      number: "04",
      title: "Sélection des partenaires et relations",
      summary: "Les bons interlocuteurs, plutôt que le plus grand nombre.",
      problem:
        "Des volumes réalisés auprès des mauvais comptes peuvent coûter sa position à une maison. Le lieu où une marque est servie et vendue compte autant que la quantité.",
      role: "Nous sélectionnons et développons les hôtels, restaurants, cavistes et partenaires adaptés à chaque maison, et entretenons ces relations dans la durée.",
      activities: [
        "Sélection des hôtels, restaurants, détaillants et partenaires commerciaux",
        "Construction de relations durables",
        "Coordination et suivi",
      ],
      outcome: "Moins de comptes, mais de meilleurs comptes, choisis pour leur cohérence et développés avec patience.",
    },
  ],

  capabilities: {
    metaTitle: "Savoir-faire",
    metaDescription:
      "Importation et distribution exclusives, architecture d’entrée sur le marché, positionnement de marque et sélection des partenaires : comment Ordine Ermetico accompagne les maisons françaises en Inde.",
    eyebrow: "Savoir-faire",
    title: "Quatre disciplines, un seul interlocuteur responsable.",
    lede: "Ordine Ermetico, société française basée à Reims, travaille avec chaque maison en tant qu’importateur et distributeur exclusif pour l’Inde. Voici les quatre disciplines sur lesquelles repose cette voie d’accès.",
    labels: {
      problem: "L’enjeu",
      role: "Notre rôle",
      activities: "Activités",
      outcome: "Ce que la maison obtient",
      limits: "Limites de responsabilité",
    },
    limits:
      "Nous ne fournissons pas de conseil juridique, fiscal ou financier. Nous ne garantissons ni volumes de vente ni résultats commerciaux. La logistique est confiée à des transitaires et commissionnaires en douane spécialisés.",
    europe: {
      eyebrow: "La voie retour",
      title: "Des marques indiennes en France et en Europe.",
      body: "Par l’intermédiaire d’Ordine Ermetico SASU, à Reims, nous appliquons les mêmes quatre disciplines en sens inverse, pour des marques indiennes au réel potentiel européen.",
      items: [
        { title: "Importation et distribution exclusives", body: "Un importateur et distributeur unique pour la France et l’UE, basé à Reims." },
        { title: "Architecture d’entrée", body: "Conformité européenne, étiquetage, prix et plan de distribution, décidés avant la première expédition." },
        { title: "Positionnement et représentation", body: "Présenter une marque indienne aux professionnels européens avec le soin que mérite sa qualité." },
        { title: "Sélection des partenaires", body: "Détaillants, hôtellerie et partenaires commerciaux en France et en Europe, choisis pour leur cohérence." },
      ],
    },
  },

  firm: {
    metaTitle: "La Maison",
    metaDescription:
      "Ordine Ermetico est une société française basée à Reims, en Champagne. Sa raison d’être, sa structure et son fondateur.",
    eyebrow: "La Maison",
    title: "Une société française, en route vers l’Inde.",
    lede: "Ordine Ermetico est une société française basée à Reims, au cœur de la Champagne. Nous accompagnons en Inde des maisons françaises en tant qu’importateur et distributeur exclusif, et ouvrons la France et l’Europe à une sélection de marques indiennes.",
    why: {
      eyebrow: "Notre raison d’être",
      title: "L’Inde s’ouvre. La plupart des maisons françaises n’y sont pas encore.",
      body: [
        "Nombre de belles maisons françaises de Champagne, de vin, de luxe et de beauté sont absentes du marché indien. Ce marché est vaste, exigeant et en pleine évolution ; y entrer dans de bonnes conditions demande de la structure, de la patience et un interlocuteur responsable sur place.",
        "Ordine Ermetico existe pour être cette voie d’accès : française par son ancrage et ses relations, conçue pour le marché indien, et sélective par principe.",
      ],
    },
    corridor: {
      eyebrow: "Le corridor",
      title: "Proche de la source. Pensé pour la destination.",
      body: "Nous sommes basés à Reims et travaillons directement avec les maisons. Une présence permanente en Europe permet d’entretenir au plus près les relations, la crédibilité et les opérations avec les maisons européennes. Elle rendra aussi, le moment venu, l’importation depuis l’Inde vers l’Europe plus simple.",
    },
    principles: {
      eyebrow: "Principes",
      title: "Ce que nous voulons incarner.",
      items: [
        { title: "Discrets", body: "sans être secrets." },
        { title: "Sélectifs", body: "sans arrogance." },
        { title: "Précis", body: "sans lourdeur." },
        { title: "Confiants", body: "sans ostentation." },
        { title: "Dans la durée", body: "plutôt que dans la transaction." },
      ],
    },
    structure: {
      eyebrow: "Notre structure",
      title: "Une société mère française. Une société indienne en cours de création.",
      parent: {
        label: "France · Reims",
        name: "Ordine Ermetico",
        role: "La société mère et le foyer de la marque. Elle porte les relations avec les maisons françaises, représente Ordine Ermetico en Europe et accompagne en France et dans l’UE une sélection de marques indiennes.",
      },
      child: {
        label: "Inde",
        name: "Notre société indienne",
        status: "En cours de création",
        role: "Elle importera depuis l’Europe et sera l’importateur et distributeur exclusif en Inde des maisons avec lesquelles nous travaillons. Elle sera détenue majoritairement par la société française.",
      },
      link: "Filiale détenue majoritairement",
    },
    founder: {
      eyebrow: "Fondateur",
      name: "Chakravarthi Kundavarapu",
      role: "Fondateur",
      photoAlt: "Portrait de Chakravarthi Kundavarapu, fondateur d’Ordine Ermetico",
    },
    partners: {
      eyebrow: "Maisons partenaires",
      body: "Nous travaillons avec le Champagne Duval-Leroy et le Champagne Abelé 1757.",
    },
  },

  markets: {
    metaTitle: "Marchés",
    metaDescription:
      "La France, la source. L’Inde, l’opportunité. Comment Ordine Ermetico relie les maisons françaises à l’Inde, et les marques indiennes à l’Europe.",
    eyebrow: "Marchés",
    title: "D’un marché à l’autre. Toujours en contexte.",
    lede: "Deux pays, lus avec attention. La France, où sont les maisons. L’Inde, où l’opportunité s’ouvre.",
    france: {
      eyebrow: "France · La source",
      title: "Des maisons, un savoir-faire, et du temps.",
      body: [
        "La France abrite des maisons dont le prestige s’est construit sur des générations : en Champagne, dans le vin, le luxe et la beauté. Leur valeur tient à ce qui ne se presse pas : le terroir, le geste et la constance.",
        "Depuis Reims, nous travaillons directement avec ces maisons. Notre rôle est de porter cette valeur intacte sur un nouveau marché.",
      ],
      figureCaption: "Bouteilles de Champagne expédiées en 2025",
    },
    india: {
      eyebrow: "Inde · L’opportunité",
      title: "Un marché à l’aube de son prochain chapitre.",
      body: "Le marché premium indien progresse, et l’accord de libre-échange entre l’Inde et l’UE va fortement réduire les droits sur les vins européens. Les faits ci-dessous proviennent de sources publiées et datées.",
    },
    franceToIndia: {
      eyebrow: "France → Inde",
      title: "Les maisons avec lesquelles nous travaillons.",
      body: "Nous sélectionnons des maisons qui ne sont pas encore établies en Inde et y construisons leur marché en tant qu’importateur et distributeur exclusif.",
    },
    indiaToEurope: {
      eyebrow: "Inde → France & Europe",
      title: "La voie retour.",
      body: "Par l’intermédiaire de notre société française, nous accompagnons en France et dans l’UE des marques indiennes au réel potentiel européen, avec la même exigence qu’en Inde.",
      cta: "Présenter votre marque",
    },
  },

  approach: {
    metaTitle: "Méthode",
    metaDescription:
      "Évaluer, Concevoir, Engager, Développer : la méthode de travail d’Ordine Ermetico pour accompagner une maison française en Inde.",
    eyebrow: "Méthode",
    title: "La sélection précède la représentation.",
    lede: "Quatre étapes, de la première conversation à une présence durable. Une méthode de travail, appliquée avec discernement à chaque maison.",
    stages: [
      {
        number: "01",
        title: "Évaluer",
        summary: "Comprendre la maison, ses produits, son adéquation avec l’Inde, ses objectifs et ses contraintes.",
        detail: [
          "Quelles références conviennent au marché premium indien, et dans quel ordre",
          "Les objectifs, le rythme et les contraintes de la maison",
          "Si nous sommes le bon partenaire, en toute franchise",
        ],
      },
      {
        number: "02",
        title: "Concevoir",
        summary: "Construire l’entrée : parcours de licences, étiquetage, prix, canaux et plan de lancement.",
        detail: ["Parcours de licences et étiquetage réglementaire", "Architecture de prix et plan de distribution", "Feuille de route de lancement"],
        agreement: {
          title: "L’accord d’exclusivité",
          body: "À cette étape, la maison et Ordine Ermetico concluent un accord d’importation et de distribution exclusives, qui en précise le périmètre, les responsabilités, le territoire et la durée. La maison dispose ainsi d’un partenaire unique et responsable ; nous recevons le mandat d’investir dans la construction de son marché.",
        },
      },
      {
        number: "03",
        title: "Engager",
        summary: "Importer, lancer, et présenter la maison aux professionnels et à l’hôtellerie.",
        detail: ["Importation et dédouanement avec des partenaires spécialisés", "Lancement", "Présentations aux professionnels et à l’hôtellerie"],
      },
      {
        number: "04",
        title: "Développer",
        summary: "Faire grandir les comptes, préserver la cohérence de la marque, rendre compte à la maison, inscrire la présence dans la durée.",
        detail: ["Développement des comptes", "Cohérence de la marque d’un compte à l’autre", "Comptes rendus réguliers à la maison"],
      },
    ],
    not: {
      eyebrow: "En toute clarté",
      title: "Ce que nous ne sommes pas.",
      items: [
        { title: "Pas un transitaire", body: "La logistique est confiée à des transitaires et commissionnaires en douane spécialisés." },
        { title: "Pas un conseil", body: "Nous ne fournissons pas de conseil juridique, fiscal ou financier." },
        { title: "Pas un catalogue", body: "Nous travaillons avec un petit nombre de maisons, pas avec une place de marché." },
        { title: "Pas un garant", body: "Nous construisons des marchés avec soin. Nous ne promettons ni volumes ni résultats." },
      ],
    },
  },

  insights: {
    metaTitle: "Perspectives",
    metaDescription:
      "Les analyses d’Ordine Ermetico sur les maisons françaises, le marché indien et l’accord de libre-échange Inde–UE.",
    eyebrow: "Perspectives",
    title: "Notes depuis le corridor.",
    lede: "Des analyses mûries sur les maisons françaises et le marché indien. Publiées lorsqu’il y a quelque chose d’utile à dire.",
    empty: "Nos premières analyses sont en préparation.",
    upcomingTitle: "En préparation",
    upcoming: [
      { category: "Commerce", title: "L’accord de libre-échange Inde–UE et ce qu’il change pour le vin français" },
      { category: "Distribution", title: "Comment fonctionne la distribution État par État en Inde" },
      { category: "Positionnement", title: "Positionner une maison française en Inde" },
    ],
    status: "En préparation",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Présentez votre maison à Ordine Ermetico, société française basée à Reims qui accompagne les maisons françaises en Inde. Écrivez à office@ordineermetico.com.",
    eyebrow: "Contact",
    title: "Présentez-nous votre maison.",
    lede: "Parlez-nous de votre maison, du marché que vous envisagez et de ce que vous souhaitez accomplir.",
    direct: "Ou écrivez-nous directement",
    based: "Basés à",
    basedValue: "Reims, France",
    discretion: "Chaque demande est lue avec attention et traitée avec discrétion.",
    form: {
      name: "Nom",
      organisation: "Organisation",
      email: "E-mail professionnel",
      country: "Pays",
      iam: "Je suis…",
      iamOptions: [
        { value: "house", label: "Une maison qui envisage l’Inde" },
        { value: "indian-brand", label: "Une marque indienne qui envisage l’Europe" },
        { value: "trade-partner", label: "Un partenaire commercial en Inde" },
        { value: "other", label: "Autre" },
      ],
      category: "Catégorie",
      categoryOptions: [
        { value: "champagne", label: "Champagne" },
        { value: "wine", label: "Vin" },
        { value: "luxury", label: "Produits de luxe" },
        { value: "beauty", label: "Cosmétique et beauté" },
        { value: "other", label: "Autre" },
      ],
      select: "Veuillez choisir",
      message: "Message",
      messageHint: "Votre maison, le marché envisagé et ce que vous souhaitez accomplir.",
      consent:
        "J’accepte qu’Ordine Ermetico utilise les informations de ce formulaire pour répondre à ma demande, comme décrit dans la",
      consentLink: "Politique de confidentialité",
      required: "Obligatoire",
      submit: "Envoyer la demande",
      sending: "Envoi en cours…",
      successTitle: "Merci.",
      successBody: "Votre demande a bien été reçue. Nous vous répondrons depuis office@ordineermetico.com.",
      errorTitle: "Votre demande n’a pas pu être envoyée.",
      errorBody: "Merci de réessayer dans un instant, ou de nous écrire directement à",
      fallbackTitle: "Écrivez-nous directement",
      fallbackBody:
        "L’envoi en ligne n’est pas encore actif. Votre messagerie s’ouvrira avec votre demande déjà rédigée.",
      fallbackCta: "Ouvrir dans ma messagerie",
      rateLimited: "Trop de tentatives. Merci de patienter quelques minutes, ou de nous écrire directement à",
      errors: {
        name: "Merci d’indiquer votre nom.",
        organisation: "Merci d’indiquer votre organisation.",
        email: "Merci d’indiquer une adresse e-mail professionnelle valide.",
        country: "Merci d’indiquer votre pays.",
        iam: "Merci de choisir l’option qui vous correspond.",
        category: "Merci de choisir une catégorie.",
        message: "Merci d’écrire un message d’au moins 20 caractères.",
        consent: "Merci d’accepter les conditions de confidentialité afin que nous puissions vous répondre.",
        summary: "Merci de corriger les champs signalés.",
      },
      emailSubject: "Demande depuis le site",
    },
  },

  faq: [
    {
      q: "Qui est Ordine Ermetico ?",
      a: "Ordine Ermetico est une société française basée à Reims, en Champagne. Elle accompagne en Inde des maisons françaises de Champagne, de vin, de luxe et de beauté en tant qu’importateur et distributeur exclusif, et accompagne en France et en Europe une sélection de marques indiennes.",
    },
    {
      q: "Comment une maison de Champagne entre-t-elle sur le marché indien ?",
      a: "Par une entrée structurée : une évaluation de l’adéquation, puis un parcours de licences, un étiquetage réglementaire, une architecture de prix et un plan de distribution, avant la première expédition. Ordine Ermetico s’en charge en tant qu’importateur et distributeur unique de la maison pour l’Inde, puis développe dans la durée les comptes professionnels et hôteliers.",
    },
    {
      q: "Avec quelles maisons Ordine Ermetico travaille-t-elle ?",
      a: "Ordine Ermetico travaille avec le Champagne Duval-Leroy et le Champagne Abelé 1757.",
    },
    {
      q: "Ordine Ermetico travaille-t-elle avec des marques indiennes ?",
      a: "Oui. Par l’intermédiaire de sa société française à Reims, Ordine Ermetico accompagne en France et dans l’UE des marques indiennes au réel potentiel européen, en tant qu’importateur et distributeur exclusif.",
    },
    {
      q: "Que ne fait pas Ordine Ermetico ?",
      a: "Ce n’est ni un transitaire, ni une place de marché, ni un conseil juridique, fiscal ou financier, et elle ne garantit ni volumes de vente ni résultats commerciaux. La logistique est confiée à des transitaires et commissionnaires en douane spécialisés.",
    },
  ],

  partnerHouses: [
    {
      id: "duval-leroy",
      name: "Champagne Duval-Leroy",
      line: "Maison de Champagne indépendante et familiale, fondée en 1859 à Vertus, dans la Côte des Blancs.",
      alt: "Logo du Champagne Duval-Leroy",
    },
    {
      id: "abele",
      name: "Champagne Abelé 1757",
      line: "L’une des plus anciennes maisons de Champagne, fondée à Reims en 1757.",
      alt: "Logo du Champagne Abelé 1757",
    },
  ],

  legal: {
    metaTitle: "Mentions légales",
    metaDescription: "Mentions légales du site ordineermetico.com.",
    title: "Mentions légales",
    lede: "Informations prévues par l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).",
    sections: [
      {
        heading: "Éditeur",
        rows: [
          ["Dénomination", "Ordine Ermetico SASU", "dénomination sociale exacte"],
          ["Forme juridique", "Société par actions simplifiée unipersonnelle (SASU)", ""],
          ["Capital social", "", "capital social"],
          ["Siège social", "", "adresse du siège, Reims"],
          ["Immatriculation", "RCS Reims", "numéro RCS Reims"],
          ["SIREN / SIRET", "", "SIREN et SIRET"],
          ["N° de TVA intracommunautaire", "", "numéro de TVA intracommunautaire"],
          ["E-mail", "office@ordineermetico.com", ""],
          ["Directeur de la publication", "", "directeur de la publication"],
        ],
      },
      {
        heading: "Hébergement",
        rows: [
          ["Hébergeur", "Vercel Inc.", ""],
          ["Adresse", "", "adresse postale actuelle de Vercel Inc."],
          ["Site", "vercel.com", ""],
        ],
      },
    ],
    ip: {
      heading: "Propriété intellectuelle",
      body: "Le nom et le logo Ordine Ermetico ainsi que le contenu de ce site sont protégés. Toute reproduction sans autorisation écrite préalable est interdite. Les logos des maisons partenaires sont la propriété de leurs titulaires respectifs.",
    },
    liability: {
      heading: "Responsabilité",
      body: "Les informations de ce site sont fournies à titre général. Les chiffres de marché proviennent des sources publiées citées à leurs côtés. Rien sur ce site ne constitue un conseil juridique, fiscal ou financier.",
    },
  },

  privacy: {
    metaTitle: "Politique de confidentialité",
    metaDescription: "Comment Ordine Ermetico traite les données personnelles transmises via ordineermetico.com.",
    title: "Politique de confidentialité",
    lede: "Structure provisoire, à compléter et à faire relire avant la mise en ligne.",
    sections: [
      {
        heading: "Responsable du traitement",
        body: "Ordine Ermetico SASU, Reims, France. Contact pour toute question relative aux données personnelles : office@ordineermetico.com.",
        placeholder: "coordonnées du responsable du traitement et contact confidentialité",
      },
      {
        heading: "Données collectées",
        body: "Uniquement ce que vous transmettez via le formulaire de contact : nom, organisation, e-mail professionnel, pays, profil, catégorie et message. Nous traitons également les données techniques nécessaires au fonctionnement sécurisé du site.",
      },
      {
        heading: "Finalités et bases légales",
        body: "Répondre à votre demande et, le cas échéant, prendre des mesures précontractuelles (article 6(1)(b) du RGPD), ou sur la base de notre intérêt légitime à répondre aux demandes professionnelles (article 6(1)(f) du RGPD).",
      },
      {
        heading: "Destinataires",
        body: "Votre demande est transmise à office@ordineermetico.com par notre prestataire d’envoi d’e-mails, Resend, agissant en tant que sous-traitant. Le site est hébergé par Vercel. Certains prestataires peuvent traiter des données hors de l’UE, avec des garanties appropriées telles que les clauses contractuelles types de la Commission européenne.",
      },
      {
        heading: "Durée de conservation",
        body: "Les demandes sont conservées uniquement le temps nécessaire à leur traitement et à la relation qui peut en découler.",
        placeholder: "durée de conservation",
      },
      {
        heading: "Vos droits",
        body: "Vous pouvez demander l’accès à vos données, leur rectification ou leur effacement, la limitation ou l’opposition à leur traitement, ainsi que leur portabilité, en écrivant à office@ordineermetico.com. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).",
      },
      {
        heading: "Mesure d’audience",
        body: "Nous utilisons Vercel Web Analytics, qui mesure la fréquentation de façon agrégée, sans cookies et sans vous identifier.",
      },
    ],
  },

  cookies: {
    metaTitle: "Préférences cookies",
    metaDescription: "Ordine Ermetico n’utilise aucun cookie non essentiel.",
    title: "Préférences cookies",
    lede: "Ce site ne dépose aucun cookie publicitaire, de suivi ou autre cookie non essentiel : vous n’avez donc rien à accepter ni à refuser.",
    body: [
      "La mesure d’audience repose sur Vercel Web Analytics, qui fonctionne sans cookies et ne vous identifie pas.",
      "Si nous introduisions un jour un cookie non essentiel, nous vous demanderions d’abord votre consentement, et cette page vous permettrait de modifier votre choix à tout moment.",
    ],
    inventory: "Inventaire des cookies",
    inventoryValue: "Aucun cookie utilisé.",
  },

  notFound: {
    metaTitle: "Page introuvable",
    eyebrow: "404",
    title: "Cette page est introuvable.",
    body: "L’adresse a peut-être changé, ou la page n’a jamais existé.",
    home: "Retour à l’accueil",
    contact: "Nous contacter",
  },
};

export default fr;

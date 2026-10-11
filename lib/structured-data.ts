import type { Dictionary } from "@/content";
import { absoluteUrl, site } from "./site";
import { localePath, type Locale } from "./i18n";

export function organizationLd(t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: absoluteUrl("/brand/oe-emblem-gold-512.png"),
    email: site.email,
    description: t.meta.siteDescription,
    // Add `address` and legal identifiers only after the SASU is registered (KB 9.6).
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteLd(lang: Locale, t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: absoluteUrl(localePath(lang, "/")),
    inLanguage: lang === "fr" ? "fr-FR" : "en-GB",
    description: t.meta.siteDescription,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function breadcrumbLd(lang: Locale, t: Dictionary, trail: { name: string; path: string }[]) {
  const items = [{ name: t.nav.home, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(localePath(lang, it.path)),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function servicesLd(lang: Locale, t: Dictionary) {
  return t.capabilityList.map((c) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    description: `${c.summary} ${c.role}`,
    serviceType: c.title,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "France" },
    ],
    url: `${absoluteUrl(localePath(lang, "/capabilities"))}#${c.id}`,
  }));
}

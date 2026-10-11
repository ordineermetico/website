import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";
import { localePath, type Locale } from "./i18n";

export function pageMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const { lang, path, title, description, noindex } = opts;
  const url = absoluteUrl(localePath(lang, path));
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(localePath("en", path)),
        fr: absoluteUrl(localePath("fr", path)),
        "x-default": absoluteUrl(localePath("en", path)),
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: lang === "fr" ? ["en_GB"] : ["fr_FR"],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

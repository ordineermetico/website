import type { MetadataRoute } from "next";
import { localePath, routes } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

const priorities: Partial<Record<keyof typeof routes, number>> = {
  home: 1,
  firm: 0.8,
  capabilities: 0.8,
  markets: 0.8,
  approach: 0.7,
  contact: 0.7,
  insights: 0.5,
  legal: 0.2,
  privacy: 0.2,
  cookies: 0.1,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (Object.keys(routes) as (keyof typeof routes)[]).flatMap((key) => {
    const path = routes[key];
    const languages = { en: absoluteUrl(localePath("en", path)), fr: absoluteUrl(localePath("fr", path)) };
    return (["en", "fr"] as const).map((lang) => ({
      url: absoluteUrl(localePath(lang, path)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: priorities[key] ?? 0.5,
      alternates: { languages },
    }));
  });
}

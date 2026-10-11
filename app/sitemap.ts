import type { MetadataRoute } from "next";
import { localePath, routes } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { publicClient } from "@/lib/supabase/public";

export const revalidate = 300;

const priorities: Partial<Record<keyof typeof routes, number>> = {
  home: 1,
  firm: 0.8,
  capabilities: 0.8,
  markets: 0.8,
  approach: 0.7,
  contact: 0.7,
  news: 0.6,
  careers: 0.6,
  press: 0.5,
  legal: 0.2,
  privacy: 0.2,
  cookies: 0.1,
};

function bothLanguages(path: string, priority: number, lastModified: Date): MetadataRoute.Sitemap {
  const languages = { en: absoluteUrl(localePath("en", path)), fr: absoluteUrl(localePath("fr", path)) };
  return (["en", "fr"] as const).map((lang) => ({
    url: absoluteUrl(localePath(lang, path)),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = (Object.keys(routes) as (keyof typeof routes)[]).flatMap((key) => bothLanguages(routes[key], priorities[key] ?? 0.5, now));

  const db = publicClient();
  if (!db) return pages;
  const [posts, jobs] = await Promise.all([
    db.from("posts").select("slug,updated_at").eq("status", "published").lte("published_at", now.toISOString()),
    db.from("jobs").select("slug,updated_at").eq("status", "open"),
  ]);
  const dynamic = [
    ...(posts.data ?? []).flatMap((p) => bothLanguages(`${routes.news}/${p.slug}`, 0.5, new Date(p.updated_at))),
    ...(jobs.data ?? []).flatMap((j) => bothLanguages(`${routes.careers}/${j.slug}`, 0.5, new Date(j.updated_at))),
  ];
  return [...pages, ...dynamic];
}

import "server-only";
import { getDictionary } from "@/content";
import type { Locale } from "./i18n";
import { publicClient } from "./supabase/public";

export type Partner = {
  slug: string;
  name: string;
  line: string;
  logoUrl: string;
  alt: string;
  heightRem: number;
  websiteUrl: string | null;
};

export type PostKind = "news" | "press_release" | "announcement" | "milestone" | "insight" | "partnership";

export type PostSummary = {
  slug: string;
  kind: PostKind;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string;
  translated: boolean;
};

export type Post = PostSummary & { body: string; updatedAt: string };

export type JobSummary = {
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  department: string | null;
  summary: string | null;
  publishedAt: string | null;
  closesAt: string | null;
};

export type Job = JobSummary & { body: string; id: string; titleEn: string; updatedAt: string };

const pick = (lang: Locale, en: string | null, fr: string | null) => (lang === "fr" && fr && fr.trim() ? fr : en);

// ── Partner houses ───────────────────────────────────────────────────────
const fallbackLogos: Record<string, { logoUrl: string; heightRem: number }> = {
  "duval-leroy": { logoUrl: "/partners/duval-leroy-logo-transparent.png", heightRem: 6.5 },
  abele: { logoUrl: "/partners/abele-1757-logo-for-light-backgrounds.svg", heightRem: 5.2 },
};

function fallbackPartners(lang: Locale): Partner[] {
  return getDictionary(lang).partnerHouses.map((h) => ({
    slug: h.id,
    name: h.name,
    line: h.line,
    alt: h.alt,
    logoUrl: fallbackLogos[h.id]?.logoUrl ?? "",
    heightRem: fallbackLogos[h.id]?.heightRem ?? 5.5,
    websiteUrl: null,
  }));
}

export async function getPartners(lang: Locale): Promise<Partner[]> {
  const db = publicClient();
  if (!db) return fallbackPartners(lang);
  const { data, error } = await db
    .from("partners")
    .select("slug,name,line_en,line_fr,logo_url,logo_alt_en,logo_alt_fr,logo_height_rem,website_url")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  if (error || !data) {
    console.error("partners: falling back to built-in content", error?.message);
    return fallbackPartners(lang);
  }
  return data.map((p) => ({
    slug: p.slug,
    name: p.name,
    line: pick(lang, p.line_en, p.line_fr) ?? "",
    logoUrl: p.logo_url,
    alt: pick(lang, p.logo_alt_en, p.logo_alt_fr) ?? p.name,
    heightRem: Number(p.logo_height_rem) || 5.5,
    websiteUrl: p.website_url,
  }));
}

// ── Newsroom ─────────────────────────────────────────────────────────────
const postColumns = "slug,kind,title_en,title_fr,excerpt_en,excerpt_fr,cover_image,published_at,updated_at";

type PostRow = {
  slug: string;
  kind: PostKind;
  title_en: string;
  title_fr: string | null;
  excerpt_en: string | null;
  excerpt_fr: string | null;
  cover_image: string | null;
  published_at: string;
  updated_at: string;
  body_en?: string;
  body_fr?: string | null;
};

function toSummary(lang: Locale, r: PostRow): PostSummary {
  return {
    slug: r.slug,
    kind: r.kind,
    title: pick(lang, r.title_en, r.title_fr) ?? r.title_en,
    excerpt: pick(lang, r.excerpt_en, r.excerpt_fr),
    coverImage: r.cover_image,
    publishedAt: r.published_at,
    translated: lang === "en" || Boolean(r.title_fr && r.title_fr.trim()),
  };
}

export async function getPosts(lang: Locale, limit = 60): Promise<PostSummary[]> {
  const db = publicClient();
  if (!db) return [];
  const { data, error } = await db
    .from("posts")
    .select(postColumns)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) console.error("posts:", error.message);
  return ((data as PostRow[] | null) ?? []).map((r) => toSummary(lang, r));
}

export async function getPost(lang: Locale, slug: string): Promise<Post | null> {
  const db = publicClient();
  if (!db) return null;
  const { data, error } = await db
    .from("posts")
    .select(`${postColumns},body_en,body_fr`)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error || !data) return null;
  const r = data as PostRow;
  return { ...toSummary(lang, r), body: pick(lang, r.body_en ?? "", r.body_fr ?? null) ?? "", updatedAt: r.updated_at };
}

// ── Careers ──────────────────────────────────────────────────────────────
const jobColumns = "id,slug,title_en,title_fr,location,employment_type,department,summary_en,summary_fr,published_at,closes_at,updated_at";

type JobRow = {
  id: string;
  slug: string;
  title_en: string;
  title_fr: string | null;
  location: string;
  employment_type: string;
  department: string | null;
  summary_en: string | null;
  summary_fr: string | null;
  published_at: string | null;
  closes_at: string | null;
  updated_at: string;
  body_en?: string;
  body_fr?: string | null;
};

function toJobSummary(lang: Locale, r: JobRow): JobSummary {
  return {
    slug: r.slug,
    title: pick(lang, r.title_en, r.title_fr) ?? r.title_en,
    location: r.location,
    employmentType: r.employment_type,
    department: r.department,
    summary: pick(lang, r.summary_en, r.summary_fr),
    publishedAt: r.published_at,
    closesAt: r.closes_at,
  };
}

const notExpired = (r: JobRow) => !r.closes_at || r.closes_at >= new Date().toISOString().slice(0, 10);

export async function getOpenJobs(lang: Locale): Promise<JobSummary[]> {
  const db = publicClient();
  if (!db) return [];
  const { data, error } = await db.from("jobs").select(jobColumns).eq("status", "open").order("published_at", { ascending: false });
  if (error) console.error("jobs:", error.message);
  return ((data as JobRow[] | null) ?? []).filter(notExpired).map((r) => toJobSummary(lang, r));
}

export async function getJob(lang: Locale, slug: string): Promise<Job | null> {
  const db = publicClient();
  if (!db) return null;
  const { data, error } = await db.from("jobs").select(`${jobColumns},body_en,body_fr`).eq("slug", slug).eq("status", "open").maybeSingle();
  if (error || !data || !notExpired(data as JobRow)) return null;
  const r = data as JobRow;
  return {
    ...toJobSummary(lang, r),
    id: r.id,
    titleEn: r.title_en,
    body: pick(lang, r.body_en ?? "", r.body_fr ?? null) ?? "",
    updatedAt: r.updated_at,
  };
}

/** Joins names naturally: "A", "A and B", "A, B and C". */
export function joinNames(names: string[], lang: Locale): string {
  const and = lang === "fr" ? " et " : " and ";
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")}${and}${names[names.length - 1]}`;
}

// ── People (public team profiles) ────────────────────────────────────────
export type Person = {
  slug: string;
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  location: string | null;
  links: { linkedin?: string; x?: string; instagram?: string; website?: string; email?: string };
};

const fallbackPeople = (lang: Locale): Person[] => [
  {
    slug: "chakravarthi-kundavarapu",
    name: "Chakravarthi Kundavarapu",
    role: lang === "fr" ? "Fondateur" : "Founder",
    bio: null,
    photoUrl: "/founder/chakravarthi-kundavarapu.jpg",
    location: "Reims, France",
    links: {},
  },
];

/** Published profiles in display order. The Firm shows the first four; the Team page shows all. */
export async function getPeople(lang: Locale): Promise<Person[]> {
  const db = publicClient();
  if (!db) return fallbackPeople(lang);
  const { data, error } = await db
    .from("people")
    .select("slug,name,role_en,role_fr,bio_en,bio_fr,photo_url,location,linkedin_url,x_url,instagram_url,website_url,public_email")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (error || !data) {
    console.error("people: falling back to built-in content", error?.message);
    return fallbackPeople(lang);
  }
  return data.map((p) => ({
    slug: p.slug,
    name: p.name,
    role: pick(lang, p.role_en, p.role_fr) ?? p.role_en,
    bio: pick(lang, p.bio_en, p.bio_fr),
    photoUrl: p.photo_url,
    location: p.location,
    links: {
      ...(p.linkedin_url ? { linkedin: p.linkedin_url } : {}),
      ...(p.x_url ? { x: p.x_url } : {}),
      ...(p.instagram_url ? { instagram: p.instagram_url } : {}),
      ...(p.website_url ? { website: p.website_url } : {}),
      ...(p.public_email ? { email: p.public_email } : {}),
    },
  }));
}

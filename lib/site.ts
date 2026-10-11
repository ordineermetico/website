export const site = {
  name: "Ordine Ermetico",
  shortName: "OE",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ordineermetico.com").replace(/\/$/, ""),
  email: "office@ordineermetico.com",
  city: "Reims",
  country: "France",
};

/** Official Ordine Ermetico profiles. Username everywhere: ordineermetico. */
export const socials = [
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/ordineermetico" },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/ordineermetico" },
  { id: "x", label: "X", url: "https://x.com/ordineermetico" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@ordineermetico" },
] as const;

export type SocialId = (typeof socials)[number]["id"];

export function absoluteUrl(path: string = "/"): string {
  return `${site.url}${path === "/" ? "" : path}` || site.url;
}

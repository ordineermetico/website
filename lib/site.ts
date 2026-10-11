export const site = {
  name: "Ordine Ermetico",
  shortName: "OE",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ordineermetico.com").replace(/\/$/, ""),
  email: "office@ordineermetico.com",
  city: "Reims",
  country: "France",
  /** Off-site profiles. Add the LinkedIn company page once it exists. */
  sameAs: [] as string[],
};

export function absoluteUrl(path: string = "/"): string {
  return `${site.url}${path === "/" ? "" : path}` || site.url;
}

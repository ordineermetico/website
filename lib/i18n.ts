export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Internal route keys, shared by both languages. */
export const routes = {
  home: "/",
  firm: "/the-firm",
  capabilities: "/capabilities",
  markets: "/markets",
  approach: "/approach",
  news: "/news",
  careers: "/careers",
  contact: "/contact",
  legal: "/legal-notice",
  privacy: "/privacy",
  cookies: "/cookies",
} as const;
export type RouteKey = keyof typeof routes;

/** English lives at `/`, French at `/fr`. */
export function localePath(lang: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  if (lang === "en") return clean || "/";
  return `/fr${clean}`;
}

/** Strip the locale prefix from a public pathname. */
export function stripLocale(pathname: string): string {
  if (pathname === "/fr" || pathname === "/en") return "/";
  if (pathname.startsWith("/fr/") || pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname || "/";
}

export type LangParams = { params: Promise<{ lang: string }> };

/** Resolve the `[lang]` route param; the layout already guarantees it is valid. */
export async function getLang(params: LangParams["params"]): Promise<Locale> {
  const { lang } = await params;
  return isLocale(lang) ? lang : defaultLocale;
}

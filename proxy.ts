import { NextResponse, type NextRequest } from "next/server";

/**
 * English is served at `/`, French at `/fr`.
 * Internally every page lives under app/[lang], so English paths are rewritten to /en/…,
 * and any public /en/… URL is redirected to its canonical unprefixed form.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, metadata files and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

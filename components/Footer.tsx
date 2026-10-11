import Image from "next/image";
import Link from "next/link";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Dictionary } from "@/content";
import { Arrow } from "./Arrow";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();
  const explore = (["firm", "capabilities", "markets", "approach", "insights", "contact"] as const).map((k) => ({
    href: localePath(lang, routes[k]),
    label: t.nav[k],
  }));
  const legal = [
    { href: localePath(lang, routes.legal), label: t.footer.legal },
    { href: localePath(lang, routes.privacy), label: t.footer.privacy },
    { href: localePath(lang, routes.cookies), label: t.footer.cookies },
  ];

  return (
    <footer className="on-dark relative overflow-hidden bg-oe-black text-oe-softwhite">
      <div className="container-oe pb-10 pt-24 sm:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src="/brand/oe-logo-gold-transparent.png"
              alt="Ordine Ermetico"
              width={1645}
              height={1290}
              className="h-auto w-52 sm:w-60"
              sizes="240px"
            />
            <p className="mt-10 font-display text-3xl leading-tight text-oe-softwhite sm:text-4xl">{t.footer.statement}</p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="label mb-6 text-oe-gold" style={{ fontFamily: "var(--font-label)" }}>
                {t.footer.explore}
              </h2>
              <ul className="space-y-3.5">
                {explore.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-line text-[0.95rem] text-oe-softwhite/80 hover:text-oe-softwhite">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="label mb-6 text-oe-gold" style={{ fontFamily: "var(--font-label)" }}>
                {t.footer.write}
              </h2>
              <a href={`mailto:${site.email}`} className="link-line break-all text-[0.95rem] text-oe-softwhite/90 hover:text-oe-softwhite">
                {site.email}
              </a>
              <p className="mt-6 text-[0.95rem] text-oe-muted-dark">{t.footer.base}</p>
            </div>
            <div>
              <h2 className="label mb-6 text-oe-gold" style={{ fontFamily: "var(--font-label)" }}>
                {t.footer.company}
              </h2>
              <ul className="space-y-3.5">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-line text-[0.95rem] text-oe-softwhite/80 hover:text-oe-softwhite">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="rule mt-20" />
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-sm text-oe-muted-dark">
            © {year} Ordine Ermetico. {t.footer.rights}
          </p>
          <a href="#top" className="link-arrow">
            {t.footer.backToTop} <Arrow direction="up" className="w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

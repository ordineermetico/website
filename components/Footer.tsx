import Image from "next/image";
import Link from "next/link";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Dictionary } from "@/content";
import { Arrow } from "./Arrow";
import { SocialLinks } from "./SocialLinks";

function FooterColumn({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="label mb-6 text-oe-gold" style={{ fontFamily: "var(--font-label)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();
  const explore = (["firm", "capabilities", "markets", "approach", "news", "contact"] as const).map((k) => ({
    href: localePath(lang, routes[k]),
    label: t.nav[k],
  }));
  const legal = [
    { href: localePath(lang, routes.careers), label: t.nav.careers },
    { href: localePath(lang, routes.press), label: t.nav.press },
    { href: localePath(lang, routes.legal), label: t.footer.legal },
    { href: localePath(lang, routes.privacy), label: t.footer.privacy },
    { href: localePath(lang, routes.cookies), label: t.footer.cookies },
  ];

  return (
    <footer className="on-dark relative overflow-hidden bg-oe-black text-oe-softwhite">
      <div className="container-oe pb-10 pt-24 sm:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/brand/oe-logo-gold-transparent.png"
              alt="Ordine Ermetico"
              width={1645}
              height={1290}
              className="h-auto w-52 sm:w-60"
              sizes="240px"
            />
            <p className="mt-10 font-display text-3xl leading-tight text-oe-softwhite sm:text-4xl">{t.footer.statement}</p>
            <div className="mt-10">
              <SocialLinks label={t.footer.follow} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-10 lg:col-span-8 lg:col-start-5">
            <FooterColumn title={t.footer.explore}>
              <ul className="space-y-3.5">
                {explore.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-line text-[0.95rem] text-oe-softwhite/80 hover:text-oe-softwhite">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
            <FooterColumn title={t.footer.company}>
              <ul className="space-y-3.5">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-line text-[0.95rem] text-oe-softwhite/80 hover:text-oe-softwhite">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
            <FooterColumn title={t.footer.contactTitle} className="col-span-2 sm:col-span-1">
              <p className="text-[0.95rem] text-oe-softwhite/80">{t.footer.base}</p>
              <Link href={localePath(lang, routes.contact)} className="btn btn-ghost mt-7 min-h-11! px-5! py-3! tracking-[0.16em]!">
                {t.footer.contactCta}
              </Link>
              <a href={`mailto:${site.email}`} className="link-line mt-5 block w-fit text-[0.95rem] text-oe-softwhite/80 hover:text-oe-softwhite">
                {t.footer.emailUs}
              </a>
            </FooterColumn>
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

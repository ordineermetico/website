import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { cormorant, manrope, tenor } from "@/lib/fonts";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content";
import { site } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.siteTitle, template: t.meta.titleTemplate },
    description: t.meta.siteDescription,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    formatDetection: { email: false, telephone: false, address: false },
    openGraph: {
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ordine Ermetico" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang as Locale);

  return (
    <html lang={lang === "fr" ? "fr" : "en-GB"} className={`${cormorant.variable} ${tenor.variable} ${manrope.variable}`}>
      <head>
        {/* Enables reveal-on-scroll only when JavaScript is available; content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <a
          href="#main"
          className="label sr-only z-[60] bg-oe-ink px-5 py-3 text-oe-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t.nav.skip}
        </a>
        <Header lang={lang} t={t.nav} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer lang={lang} t={t} />
        <RevealObserver />
        <JsonLd data={[organizationLd(t), websiteLd(lang, t)]} />
        <Analytics />
      </body>
    </html>
  );
}

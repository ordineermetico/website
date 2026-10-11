import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { getLang, localePath, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/structured-data";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.contact, title: t.contact.metaTitle, description: t.contact.metaDescription });
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const c = t.contact;
  // Read at build time: set RESEND_API_KEY in Vercel and redeploy to switch from mailto to direct sending.
  const emailConfigured = Boolean(process.env.RESEND_API_KEY);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lede={c.lede} />
      <section className="section bg-oe-ivory">
        <div className="container-oe grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <p className="label text-oe-graphite">{c.direct}</p>
              <a href={`mailto:${site.email}`} className="link-line mt-4 inline-block break-all font-display text-[1.7rem] text-oe-ink">
                {site.email}
              </a>
              <hr className="rule my-10" />
              <p className="label text-oe-graphite">{c.based}</p>
              <p className="mt-3 font-display text-[1.6rem] text-oe-ink">{c.basedValue}</p>
              <hr className="rule my-10" />
              <p className="label text-oe-graphite">{t.footer.follow}</p>
              <div className="mt-5">
                <SocialLinks label={t.footer.follow} tone="light" />
              </div>
              <hr className="rule my-10" />
              <p className="max-w-xs text-[0.95rem] text-oe-graphite">{c.discretion}</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <ContactForm t={c.form} lang={lang} privacyHref={localePath(lang, routes.privacy)} emailConfigured={emailConfigured} />
          </Reveal>
        </div>
      </section>
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.contact, path: routes.contact }])} />
    </>
  );
}

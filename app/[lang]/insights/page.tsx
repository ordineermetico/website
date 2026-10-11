import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { getLang, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.insights, title: t.insights.metaTitle, description: t.insights.metaDescription });
}

/**
 * Editorial system, ready but honest: no fabricated articles, authors or dates.
 * When the first real article exists, add an `articles` collection and list it here.
 */
export default async function InsightsPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const i = t.insights;

  return (
    <>
      <PageHero eyebrow={i.eyebrow} title={i.title} lede={i.lede} />
      <section className="section bg-oe-ivory">
        <div className="container-oe">
          <Reveal>
            <p className="font-display text-[2rem] italic text-oe-bronze">{i.empty}</p>
          </Reveal>
          <h2 className="label mt-16 text-oe-ink" style={{ fontFamily: "var(--font-label)" }}>
            {i.upcomingTitle}
          </h2>
          <ul className="mt-6 grid gap-px border border-oe-rule bg-oe-rule md:grid-cols-3">
            {i.upcoming.map((u, idx) => (
              <Reveal as="li" key={u.title} delay={idx * 120} className="flex min-h-[18rem] flex-col justify-between bg-oe-ivory p-8 sm:p-10">
                <p className="label text-oe-bronze">{u.category}</p>
                <div>
                  <h3 className="font-display text-[1.65rem] leading-snug text-oe-ink">{u.title}</h3>
                  <p className="label mt-6 text-oe-graphite">{i.status}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} t={t} />
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.insights, path: routes.insights }])} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/content";
import { getOpenJobs } from "@/lib/db";
import { getLang, localePath, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/structured-data";
import { Arrow } from "@/components/Arrow";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const revalidate = 300;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.careers, title: t.careers.metaTitle, description: t.careers.metaDescription });
}

export default async function CareersPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const c = t.careers;
  const jobs = await getOpenJobs(lang);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lede={c.lede} />
      <section className="section bg-oe-ivory">
        <div className="container-oe">
          <Reveal>
            <h2 className="label text-oe-ink" style={{ fontFamily: "var(--font-label)" }}>
              {c.openings}
              {jobs.length ? <span className="ml-3 text-oe-bronze">{jobs.length}</span> : null}
            </h2>
          </Reveal>

          {jobs.length ? (
            <ul className="mt-8 border-t border-oe-rule">
              {jobs.map((j, i) => (
                <Reveal as="li" key={j.slug} delay={Math.min(i, 4) * 80} className="border-b border-oe-rule">
                  <Link href={`${localePath(lang, routes.careers)}/${j.slug}`} className="group grid gap-4 py-10 md:grid-cols-12 md:items-center md:gap-8">
                    <div className="md:col-span-7">
                      <h3 className="font-display text-[1.9rem] leading-tight text-oe-ink transition-colors group-hover:text-oe-bronze">{j.title}</h3>
                      {j.summary ? <p className="mt-3 max-w-xl text-oe-graphite">{j.summary}</p> : null}
                    </div>
                    <p className="text-[0.95rem] text-oe-graphite md:col-span-4">
                      {j.location}
                      <span className="mx-2 text-oe-gold">·</span>
                      {j.employmentType}
                      {j.department ? (
                        <>
                          <span className="mx-2 text-oe-gold">·</span>
                          {j.department}
                        </>
                      ) : null}
                    </p>
                    <span className="link-arrow md:col-span-1 md:justify-end">
                      <span className="md:sr-only">{c.view}</span> <Arrow />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-8 border-t border-oe-rule pt-10">
              <p className="font-display text-[2rem] italic text-oe-bronze">{c.empty}</p>
              <p className="mt-5 max-w-xl text-oe-graphite">
                {c.emptyBody}{" "}
                <a href={`mailto:${site.email}?subject=${encodeURIComponent("Spontaneous application")}`} className="text-oe-ink underline decoration-oe-gold underline-offset-4">
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
          )}
        </div>
      </section>
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.careers, path: routes.careers }])} />
    </>
  );
}

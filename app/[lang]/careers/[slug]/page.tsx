import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { getJob } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { isLocale, localePath, routes, type Locale } from "@/lib/i18n";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/structured-data";
import { ApplyForm } from "@/components/ApplyForm";
import { Arrow } from "@/components/Arrow";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 300;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ lang: string; slug: string }> };

async function load(params: Props["params"]) {
  const { lang: raw, slug } = await params;
  const lang: Locale = isLocale(raw) ? raw : "en";
  return { lang, slug, job: await getJob(lang, slug) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug, job } = await load(params);
  if (!job) return { title: getDictionary(lang).notFound.metaTitle, robots: { index: false } };
  return pageMetadata({ lang, path: `${routes.careers}/${slug}`, title: job.title, description: job.summary ?? getDictionary(lang).careers.metaDescription });
}

/** Map free-text contract labels to schema.org employmentType values for Google for Jobs. */
function schemaEmploymentType(label: string): string | undefined {
  const l = label.toLowerCase();
  if (/full|cdi|temps plein/.test(l)) return "FULL_TIME";
  if (/part|temps partiel/.test(l)) return "PART_TIME";
  if (/intern|stage|apprenti|alternance/.test(l)) return "INTERN";
  if (/contract|cdd|freelance|consult/.test(l)) return "CONTRACTOR";
  if (/temp|intérim/.test(l)) return "TEMPORARY";
  return undefined;
}

export default async function JobPage({ params }: Props) {
  const { lang, slug, job } = await load(params);
  if (!job) notFound();
  const t = getDictionary(lang);
  const c = t.careers;
  const facts: [string, string][] = [
    [c.location, job.location],
    [c.type, job.employmentType],
    ...(job.department ? ([[c.department, job.department]] as [string, string][]) : []),
    ...(job.closesAt ? ([[c.closes, formatDate(job.closesAt, lang)]] as [string, string][]) : []),
  ];
  const [city, ...restLoc] = job.location.split(",").map((s) => s.trim());
  const employmentType = schemaEmploymentType(job.employmentType);

  return (
    <>
      <article className="bg-oe-ivory pt-[calc(var(--header-h)+4rem)] sm:pt-[calc(var(--header-h)+6rem)]">
        <div className="container-oe">
          <Link href={localePath(lang, routes.careers)} className="link-arrow">
            <Arrow className="rotate-180" /> {c.back}
          </Link>
          <div className="mt-12 grid gap-14 pb-24 lg:grid-cols-12">
            <header className="lg:col-span-8">
              <p className="eyebrow">{c.eyebrow}</p>
              <h1 className="display-lg mt-6">{job.title}</h1>
              {job.summary ? <p className="lede mt-8 max-w-2xl">{job.summary}</p> : null}
            </header>
            <dl className="self-end border-t border-oe-rule lg:col-span-4">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-oe-rule py-4">
                  <dt className="label pt-1 text-oe-graphite">{k}</dt>
                  <dd className="text-right text-oe-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="border-t border-oe-rule">
          <div className="container-oe grid gap-16 py-20 lg:grid-cols-12">
            <div className="prose-oe lg:col-span-7" dangerouslySetInnerHTML={{ __html: renderMarkdown(job.body) }} />
            <aside id="apply" className="lg:col-span-5">
              <div className="border border-oe-rule bg-oe-paper p-8 sm:p-10 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <h2 className="display-sm">{c.applyTitle}</h2>
                <div className="mt-10">
                  <ApplyForm t={c.form} lang={lang} jobSlug={slug} jobTitle={job.title} privacyHref={localePath(lang, routes.privacy)} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: renderMarkdown(job.body) || job.summary || job.title,
            datePosted: job.publishedAt ?? job.updatedAt,
            ...(job.closesAt ? { validThrough: `${job.closesAt}T23:59:59+01:00` } : {}),
            ...(employmentType ? { employmentType } : {}),
            hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url, logo: `${site.url}/brand/oe-emblem-gold-512.png` },
            jobLocation: {
              "@type": "Place",
              address: { "@type": "PostalAddress", addressLocality: city, ...(restLoc.length ? { addressCountry: restLoc[restLoc.length - 1] } : {}) },
            },
            directApply: true,
          },
          breadcrumbLd(lang, t, [
            { name: t.nav.careers, path: routes.careers },
            { name: job.title, path: `${routes.careers}/${slug}` },
          ]),
        ]}
      />
    </>
  );
}

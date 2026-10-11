import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/content";
import { getPosts } from "@/lib/db";
import { formatDate } from "@/lib/format";
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
  return pageMetadata({ lang, path: routes.news, title: t.news.metaTitle, description: t.news.metaDescription });
}

export default async function NewsPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const n = t.news;
  const posts = await getPosts(lang);
  const [lead, ...rest] = posts;
  const href = (slug: string) => `${localePath(lang, routes.news)}/${slug}`;

  return (
    <>
      <PageHero eyebrow={n.eyebrow} title={n.title} lede={n.lede} />

      <section className="section bg-oe-ivory">
        <div className="container-oe">
          {!lead ? (
            <Reveal>
              <p className="font-display text-[2rem] italic text-oe-bronze">{n.empty}</p>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <Link href={href(lead.slug)} className="group grid gap-10 border-b border-oe-rule pb-16 lg:grid-cols-12 lg:items-end">
                  {lead.coverImage ? (
                    <div className="relative aspect-[3/2] overflow-hidden bg-oe-paper lg:col-span-7">
                      <Image
                        src={lead.coverImage}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 700px, 100vw"
                        className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-oe)] group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                  <div className={lead.coverImage ? "lg:col-span-5" : "lg:col-span-9"}>
                    <p className="label text-oe-bronze">
                      {n.kinds[lead.kind]} · <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt, lang)}</time>
                    </p>
                    <h2 className="display-md mt-5 transition-colors group-hover:text-oe-bronze">{lead.title}</h2>
                    {lead.excerpt ? <p className="lede mt-6">{lead.excerpt}</p> : null}
                    <span className="link-arrow mt-8">
                      {n.readMore} <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {rest.length ? (
                <ul className="mt-4">
                  {rest.map((p, i) => (
                    <Reveal as="li" key={p.slug} delay={Math.min(i, 4) * 80} className="border-b border-oe-rule">
                      <Link href={href(p.slug)} className="group grid gap-3 py-9 md:grid-cols-12 md:gap-8">
                        <p className="label pt-1 text-oe-graphite md:col-span-3">
                          <time dateTime={p.publishedAt}>{formatDate(p.publishedAt, lang)}</time>
                          <span className="mt-2 block text-oe-bronze">{n.kinds[p.kind]}</span>
                        </p>
                        <div className="md:col-span-8">
                          <h3 className="font-display text-[1.7rem] leading-snug text-oe-ink transition-colors group-hover:text-oe-bronze">{p.title}</h3>
                          {p.excerpt ? <p className="mt-3 text-oe-graphite">{p.excerpt}</p> : null}
                        </div>
                        <span className="hidden items-start justify-end pt-3 text-oe-bronze md:col-span-1 md:flex">
                          <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              ) : null}
            </>
          )}

          <Reveal className="mt-20 flex flex-col gap-3 border-t border-oe-rule pt-10 sm:flex-row sm:items-baseline sm:gap-8">
            <p className="label text-oe-ink">{n.pressTitle}</p>
            <p className="text-oe-graphite">
              {n.pressBody}{" "}
              <a href={`mailto:${site.email}`} className="text-oe-ink underline decoration-oe-gold underline-offset-4">
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.news, path: routes.news }])} />
    </>
  );
}

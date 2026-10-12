import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/content";
import { getPeople } from "@/lib/db";
import { getLang, localePath, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/structured-data";
import { Arrow } from "@/components/Arrow";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PeopleTiles } from "@/components/PeopleTiles";

export const revalidate = 300;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.team, title: t.team.metaTitle, description: t.team.metaDescription });
}

/** Every published profile, with bios. The Firm shows the first four and links here. */
export default async function TeamPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const people = await getPeople(lang);

  return (
    <>
      <PageHero eyebrow={t.team.eyebrow} title={t.team.title} lede={t.team.lede} />
      <section className="on-dark grain bg-oe-black text-oe-softwhite">
        <div className="container-oe section">
          <PeopleTiles people={people} withBio />
          <Link href={localePath(lang, routes.firm)} className="link-arrow mt-20">
            <Arrow className="rotate-180" /> {t.team.back}
          </Link>
        </div>
      </section>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            employee: people.map((p) => ({
              "@type": "Person",
              name: p.name,
              jobTitle: p.role,
              ...(p.photoUrl ? { image: p.photoUrl.startsWith("http") ? p.photoUrl : `${site.url}${p.photoUrl}` } : {}),
              ...(Object.values(p.links).filter((v) => v && v.startsWith("https://")).length
                ? { sameAs: Object.values(p.links).filter((v): v is string => Boolean(v && v.startsWith("https://"))) }
                : {}),
            })),
          },
          breadcrumbLd(lang, t, [
            { name: t.nav.firm, path: routes.firm },
            { name: t.team.metaTitle, path: routes.team },
          ]),
        ]}
      />
    </>
  );
}

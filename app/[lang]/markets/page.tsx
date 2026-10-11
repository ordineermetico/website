import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/content";
import { factsCheckedOn, getFacts } from "@/content/facts";
import { getLang, localePath, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { Arrow } from "@/components/Arrow";
import { CtaBand } from "@/components/CtaBand";
import { FactsGrid, SourceLine } from "@/components/Facts";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PartnerHouses } from "@/components/PartnerHouses";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.markets, title: t.markets.metaTitle, description: t.markets.metaDescription });
}

export default async function MarketsPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const m = t.markets;
  const [champagne] = getFacts(["champagne"]);
  const indiaFacts = getFacts(["fta", "wine-duty", "ratification", "india-wine", "excise"]);

  return (
    <>
      <PageHero eyebrow={m.eyebrow} title={m.title} lede={m.lede} />

      {/* France */}
      <section id="france" className="section bg-oe-ivory">
        <div className="container-oe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={m.france.eyebrow} title={m.france.title} />
            <Reveal delay={100} className="mt-10 space-y-6 text-[1.08rem] leading-[1.75]">
              {m.france.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal delay={180} className="self-end lg:col-span-5 lg:col-start-8">
            <div className="border-t border-oe-gold pt-8">
              <p className="font-display text-[5rem] leading-none text-oe-bronze sm:text-[7rem]">266&thinsp;M</p>
              <p className="label mt-5 text-oe-ink">{m.france.figureCaption}</p>
              <p className="mt-5 text-[0.98rem] text-oe-graphite">{champagne.text[lang]}</p>
              <SourceLine fact={champagne} label={t.common.source} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* India */}
      <section id="india" className="section border-t border-oe-rule bg-oe-paper">
        <div className="container-oe">
          <SectionHeading eyebrow={m.india.eyebrow} title={m.india.title} body={m.india.body} />
          <div className="mt-16">
            <FactsGrid facts={indiaFacts} lang={lang} sourceLabel={t.common.source} />
          </div>
          <p className="mt-6 text-xs text-oe-graphite">
            {t.common.checked} <time dateTime={factsCheckedOn}>{factsCheckedOn}</time>
          </p>
        </div>
      </section>

      {/* France → India */}
      <section id="france-india" className="section bg-oe-ivory">
        <div className="container-oe">
          <SectionHeading eyebrow={m.franceToIndia.eyebrow} title={m.franceToIndia.title} body={m.franceToIndia.body} />
          <div className="mt-16">
            <PartnerHouses houses={t.partnerHouses} />
          </div>
        </div>
      </section>

      {/* India → Europe */}
      <section id="india-europe" className="on-dark grain bg-oe-black text-oe-softwhite">
        <div className="container-oe section grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow={m.indiaToEurope.eyebrow} title={m.indiaToEurope.title} body={m.indiaToEurope.body} />
          </div>
          <Reveal delay={120} className="lg:col-span-4 lg:text-right">
            <Link href={localePath(lang, routes.contact)} className="btn btn-ghost">
              {m.indiaToEurope.cta} <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.markets, path: routes.markets }])} />
    </>
  );
}

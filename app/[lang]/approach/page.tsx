import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { getLang, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { CtaBand } from "@/components/CtaBand";
import { Frame } from "@/components/Frame";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.approach, title: t.approach.metaTitle, description: t.approach.metaDescription });
}

export default async function ApproachPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const a = t.approach;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} lede={a.lede} />

      <section className="section-tight bg-oe-ivory">
        <div className="container-oe">
          <ProcessSteps stages={a.stages} />
        </div>
      </section>

      {a.stages.map((s, idx) => (
        <section key={s.number} id={s.title.toLowerCase()} className={`border-t border-oe-rule ${idx % 2 ? "bg-oe-ivory" : "bg-oe-paper"}`}>
          <div className="container-oe section grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="label text-oe-bronze">
                {t.common.step} {s.number}
              </p>
              <h2 className="mt-5 font-display text-[3.6rem] leading-none sm:text-[5rem]">{s.title}</h2>
              <p className="mt-7 max-w-md font-display text-[1.45rem] leading-snug text-oe-graphite">{s.summary}</p>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={120}>
                <ul className="border-t border-oe-rule">
                  {s.detail.map((d) => (
                    <li key={d} className="flex gap-5 border-b border-oe-rule py-5 text-[1.05rem]">
                      <span aria-hidden="true" className="mt-[0.75rem] block h-px w-4 flex-none bg-oe-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
              {"agreement" in s && s.agreement ? (
                <Reveal delay={200} className="mt-12">
                  <Frame className="bg-oe-ivory p-8 sm:p-10">
                    <h3 className="relative font-display text-[1.7rem] text-oe-ink">{s.agreement.title}</h3>
                    <p className="relative mt-4 text-oe-graphite">{s.agreement.body}</p>
                  </Frame>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <section className="on-dark grain bg-oe-black text-oe-softwhite">
        <div className="container-oe section">
          <SectionHeading eyebrow={a.not.eyebrow} title={a.not.title} />
          <ul className="mt-16 grid gap-px border border-oe-gold/20 bg-oe-gold/20 sm:grid-cols-2 lg:grid-cols-4">
            {a.not.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 110} className="bg-oe-black p-8 sm:p-10">
                <h3 className="font-display text-[1.55rem] leading-tight text-oe-softwhite">{it.title}</h3>
                <p className="mt-4 text-[0.96rem] text-oe-muted-dark">{it.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.approach, path: routes.approach }])} />
    </>
  );
}

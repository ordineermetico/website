import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { getLang, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd, servicesLd } from "@/lib/structured-data";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.capabilities, title: t.capabilities.metaTitle, description: t.capabilities.metaDescription });
}

export default async function CapabilitiesPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const c = t.capabilities;

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lede={c.lede}>
        <nav aria-label={c.eyebrow} className="hero-in mt-14" style={{ ["--d" as string]: "360ms" }}>
          <ol className="flex flex-wrap gap-x-8 gap-y-3">
            {t.capabilityList.map((cap) => (
              <li key={cap.id}>
                <a href={`#${cap.id}`} className="label link-line text-oe-ink/80 hover:text-oe-ink">
                  <span className="text-oe-bronze">{cap.number}</span>&nbsp;&nbsp;{cap.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      {t.capabilityList.map((cap, idx) => (
        <section key={cap.id} id={cap.id} className={`section border-b border-oe-rule ${idx % 2 ? "bg-oe-paper" : "bg-oe-ivory"}`}>
          <div className="container-oe grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="label text-oe-bronze">{cap.number}</p>
              <h2 className="display-md mt-5">{cap.title}</h2>
              <p className="mt-5 font-display text-xl italic text-oe-graphite">{cap.summary}</p>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="border-t border-oe-rule">
                {(
                  [
                    ["problem", cap.problem],
                    ["role", cap.role],
                  ] as const
                ).map(([k, v], i) => (
                  <Reveal key={k} delay={i * 100} className="grid gap-3 border-b border-oe-rule py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
                    <dt className="label pt-1 text-oe-bronze">{c.labels[k]}</dt>
                    <dd className="text-[1.05rem] leading-[1.75]">{v}</dd>
                  </Reveal>
                ))}
                <Reveal delay={200} className="grid gap-3 border-b border-oe-rule py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt className="label pt-1 text-oe-bronze">{c.labels.activities}</dt>
                  <dd>
                    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {cap.activities.map((a) => (
                        <li key={a} className="flex gap-3 text-[1.02rem]">
                          <span aria-hidden="true" className="mt-[0.7rem] block h-px w-3 flex-none bg-oe-gold" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </Reveal>
                <Reveal delay={260} className="grid gap-3 border-b border-oe-rule py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt className="label pt-1 text-oe-bronze">{c.labels.outcome}</dt>
                  <dd className="font-display text-[1.5rem] leading-snug text-oe-ink">{cap.outcome}</dd>
                </Reveal>
                <Reveal delay={300} className="grid gap-3 py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt className="label pt-1 text-oe-graphite">{c.labels.limits}</dt>
                  <dd className="text-[0.95rem] text-oe-graphite">{c.limits}</dd>
                </Reveal>
              </dl>
            </div>
          </div>
        </section>
      ))}

      {/* Indian brands into Europe */}
      <section id="india-europe" className="on-dark grain bg-oe-black text-oe-softwhite">
        <div className="container-oe section">
          <SectionHeading eyebrow={c.europe.eyebrow} title={c.europe.title} body={c.europe.body} />
          <ol className="mt-16 grid gap-px border border-oe-gold/20 bg-oe-gold/20 sm:grid-cols-2 lg:grid-cols-4">
            {c.europe.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 110} className="bg-oe-black p-8 sm:p-10">
                <p className="font-display text-4xl text-oe-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-8 font-display text-[1.45rem] leading-tight text-oe-softwhite">{it.title}</h3>
                <p className="mt-4 text-[0.96rem] text-oe-muted-dark">{it.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
      <JsonLd data={[...servicesLd(lang, t), breadcrumbLd(lang, t, [{ name: t.nav.capabilities, path: routes.capabilities }])]} />
    </>
  );
}

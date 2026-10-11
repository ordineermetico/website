import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { getLang, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/LegalLayout";
import { Placeholder } from "@/components/Placeholder";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.legal, title: t.legal.metaTitle, description: t.legal.metaDescription });
}

export default async function LegalNoticePage({ params }: LangParams) {
  const lang = await getLang(params);
  const l = getDictionary(lang).legal;
  return (
    <LegalLayout title={l.title} lede={l.lede}>
      {l.sections.map((s) => (
        <section key={s.heading} className="mt-12">
          <h2 className="display-sm">{s.heading}</h2>
          <dl className="mt-6 border-t border-oe-rule">
            {s.rows.map(([k, v, ph]) => (
              <div key={k} className="grid gap-2 border-b border-oe-rule py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="label pt-1 text-oe-graphite">{k}</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  {v ? <span>{v}</span> : null}
                  {ph ? <Placeholder label={ph} /> : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      {[l.ip, l.liability].map((b) => (
        <section key={b.heading} className="mt-12">
          <h2 className="display-sm">{b.heading}</h2>
          <p className="mt-4 text-oe-graphite">{b.body}</p>
        </section>
      ))}
    </LegalLayout>
  );
}

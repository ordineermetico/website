import Link from "next/link";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { Badge, ButtonLink, EmptyState, PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Partner houses" };

export default async function PartnersList({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  await requireSection("partners");
  const { deleted } = await searchParams;
  const db = await staffClient();
  const { data } = await db.from("partners").select("id,name,line_en,logo_url,status,sort_order").order("sort_order");

  return (
    <>
      <PageHeader
        title="Partner houses"
        intro={
          <>
            Published houses appear on Home, Markets and The Firm, and in the FAQ. To end a partnership, set it to <em>Archived</em> rather than deleting it, so the record is kept. Only describe a house as an <em>exclusive</em> partner once the signed agreement says so.
          </>
        }
        action={<ButtonLink href="/admin/partners/new">Add a house</ButtonLink>}
      />
      {deleted ? <p className="mt-6 text-sm text-[#2f5a3b]">The house was deleted.</p> : null}
      {!data?.length ? (
        <EmptyState>No partner houses yet.</EmptyState>
      ) : (
        <ul className="mt-6 divide-y divide-oe-rule border-b border-oe-rule">
          {data.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/partners/${p.id}`} className="grid items-center gap-6 py-5 transition-colors hover:bg-oe-paper sm:grid-cols-[8rem_1fr_auto] sm:px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo_url} alt="" className="h-12 w-auto max-w-[8rem] object-contain" />
                <div>
                  <p className="font-display text-[1.45rem] text-oe-ink">{p.name}</p>
                  <p className="mt-1 text-sm text-oe-graphite">{p.line_en}</p>
                </div>
                <Badge value={p.status} label={p.status === "published" ? "shown" : p.status === "draft" ? "hidden" : "archived"} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

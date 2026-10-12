import Link from "next/link";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { Badge, ButtonLink, EmptyState, PageHeader } from "@/components/admin/ui";

export const metadata = { title: "People" };

export default async function PeopleList({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  await requireSection("people");
  const { deleted } = await searchParams;
  const db = await staffClient();
  const { data } = await db.from("people").select("id,name,role_en,photo_url,status,sort_order").order("sort_order").order("name");
  let shownIndex = 0;

  return (
    <>
      <PageHeader
        title="People"
        intro={
          <>
            Team profiles on the public site. Add only the people who should be visible. The Firm shows the first <strong>four</strong> shown profiles (lowest order number first); when there are more, a “Meet the full team” button links to the Team page, which shows everyone.
          </>
        }
        action={<ButtonLink href="/admin/people/new">Add a profile</ButtonLink>}
      />
      {deleted ? <p className="mt-6 text-sm text-[#2f5a3b]">The profile was deleted.</p> : null}
      {!data?.length ? (
        <EmptyState>No profiles yet.</EmptyState>
      ) : (
        <ul className="mt-6 divide-y divide-oe-rule border-b border-oe-rule">
          {data.map((p) => {
            const onFirm = p.status === "published" && ++shownIndex <= 4;
            return (
              <li key={p.id}>
                <Link href={`/admin/people/${p.id}`} className="grid items-center gap-5 py-4 transition-colors hover:bg-oe-paper sm:grid-cols-[4rem_1fr_auto] sm:px-3">
                  {p.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photo_url} alt="" className="aspect-[4/5] w-16 object-cover" />
                  ) : (
                    <span className="grid aspect-[4/5] w-16 place-items-center bg-oe-paper font-display text-xl text-oe-bronze">{p.name[0]}</span>
                  )}
                  <div>
                    <p className="font-display text-[1.4rem] text-oe-ink">{p.name}</p>
                    <p className="text-sm text-oe-graphite">
                      {p.role_en} · order {p.sort_order}
                      {onFirm ? " · on The Firm" : p.status === "published" ? " · Team page only" : ""}
                    </p>
                  </div>
                  <Badge value={p.status} label={p.status === "published" ? "shown" : p.status === "draft" ? "hidden" : "archived"} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

import Link from "next/link";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { Badge, ButtonLink, EmptyState, PageHeader, formatAdminDate } from "@/components/admin/ui";

export const metadata = { title: "Jobs" };

export default async function JobsList({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  await requireSection("jobs");
  const { deleted } = await searchParams;
  const db = await staffClient();
  const [{ data: jobs }, { data: apps }] = await Promise.all([
    db.from("jobs").select("id,title_en,status,location,employment_type,closes_at,updated_at").order("updated_at", { ascending: false }),
    db.from("applications").select("job_id,status"),
  ]);
  const count = (id: string) => (apps ?? []).filter((a) => a.job_id === id).length;
  const fresh = (id: string) => (apps ?? []).filter((a) => a.job_id === id && a.status === "new").length;

  return (
    <>
      <PageHeader
        title="Jobs"
        intro="Open positions appear on the Careers page and in Google's job listings. Closing a position removes it from the site; its applications are kept."
        action={<ButtonLink href="/admin/jobs/new">New position</ButtonLink>}
      />
      {deleted ? <p className="mt-6 text-sm text-[#2f5a3b]">The position was deleted. Its applications are kept.</p> : null}
      {!jobs?.length ? (
        <EmptyState>No positions yet.</EmptyState>
      ) : (
        <ul className="mt-6 divide-y divide-oe-rule border-b border-oe-rule">
          {jobs.map((j) => (
            <li key={j.id} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6 sm:px-3">
              <Link href={`/admin/jobs/${j.id}`} className="group">
                <p className="font-display text-[1.45rem] text-oe-ink group-hover:text-oe-bronze">{j.title_en}</p>
                <p className="mt-1 text-sm text-oe-graphite">
                  {j.location} · {j.employment_type}
                  {j.closes_at ? ` · closes ${formatAdminDate(j.closes_at)}` : ""}
                </p>
              </Link>
              <Link href={`/admin/applications?job=${j.id}`} className="label link-line text-oe-bronze">
                {count(j.id)} applications{fresh(j.id) ? ` · ${fresh(j.id)} new` : ""}
              </Link>
              <Badge value={j.status} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

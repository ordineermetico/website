import Link from "next/link";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { Badge, EmptyState, PageHeader, formatAdminDate } from "@/components/admin/ui";

export const metadata = { title: "Applications" };

const STATUSES = ["new", "reviewing", "interview", "offer", "hired", "rejected", "withdrawn"];

export default async function ApplicationsList({ searchParams }: { searchParams: Promise<{ job?: string; status?: string; deleted?: string }> }) {
  await requireSection("applications");
  const { job, status, deleted } = await searchParams;
  const db = await staffClient();
  let q = db.from("applications").select("id,full_name,email,job_id,job_title,status,created_at,location").order("created_at", { ascending: false }).limit(300);
  if (job) q = q.eq("job_id", job);
  if (status && STATUSES.includes(status)) q = q.eq("status", status);
  const [{ data: apps }, { data: jobs }] = await Promise.all([q, db.from("jobs").select("id,title_en").order("title_en")]);

  return (
    <>
      <PageHeader
        title="Applications"
        intro="Visible to Admin and HR only. Each application and CV is deleted automatically two years after it was received; delete it sooner if the candidate asks."
      />
      {deleted ? <p className="mt-6 text-sm text-[#2f5a3b]">The application and its CV were deleted.</p> : null}
      <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end" method="get">
        <div className="sm:w-72">
          <label htmlFor="job" className="field-label">
            Position
          </label>
          <select id="job" name="job" defaultValue={job ?? ""} className="field">
            <option value="">All positions</option>
            {(jobs ?? []).map((j) => (
              <option key={j.id} value={j.id}>
                {j.title_en}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-56">
          <label htmlFor="status" className="field-label">
            Status
          </label>
          <select id="status" name="status" defaultValue={status ?? ""} className="field">
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-ghost min-h-11! px-5! py-3!">
          Filter
        </button>
      </form>

      {!apps?.length ? (
        <EmptyState>No applications{job || status ? " match these filters" : " yet"}.</EmptyState>
      ) : (
        <ul className="mt-8 divide-y divide-oe-rule border-y border-oe-rule">
          {apps.map((a) => (
            <li key={a.id}>
              <Link href={`/admin/applications/${a.id}`} className="grid gap-2 py-5 transition-colors hover:bg-oe-paper sm:grid-cols-[1fr_12rem_auto] sm:items-center sm:gap-6 sm:px-3">
                <div>
                  <p className="font-display text-[1.4rem] text-oe-ink">{a.full_name}</p>
                  <p className="mt-1 text-sm text-oe-graphite">
                    {a.job_title}
                    {a.location ? ` · ${a.location}` : ""}
                  </p>
                </div>
                <p className="text-sm text-oe-graphite">{formatAdminDate(a.created_at)}</p>
                <Badge value={a.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

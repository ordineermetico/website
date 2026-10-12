import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { ApplicationForm } from "@/components/admin/ApplicationForm";
import { PageHeader, Panel, formatAdminDate, formatAdminDateTime } from "@/components/admin/ui";

export const metadata = { title: "Application" };

export default async function ApplicationDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("applications");
  const { id } = await params;
  const db = await staffClient();
  const { data: a } = await db.from("applications").select("*").eq("id", id).maybeSingle();
  if (!a) notFound();
  // A private link that works for 10 minutes; the CV is never public.
  const ext = a.cv_path.split(".").pop();
  const { data: signed } = await db.storage.from("cvs").createSignedUrl(a.cv_path, 600, {
    download: `${a.full_name.replace(/[^\p{L}\p{N} -]/gu, "").trim().replace(/\s+/g, "-")}-CV.${ext}`,
  });

  const rows: [string, React.ReactNode][] = [
    ["Position", a.job_id ? <Link className="underline decoration-oe-gold underline-offset-4" href={`/admin/jobs/${a.job_id}`}>{a.job_title}</Link> : a.job_title],
    ["Email", <a key="e" className="underline decoration-oe-gold underline-offset-4" href={`mailto:${a.email}`}>{a.email}</a>],
    ["Phone", a.phone || "Not given"],
    ["Based in", a.location || "Not given"],
    ["LinkedIn", a.linkedin_url ? <a key="l" className="break-all underline decoration-oe-gold underline-offset-4" href={a.linkedin_url} target="_blank" rel="noopener noreferrer">{a.linkedin_url}</a> : "Not given"],
    ["Applied in", a.language === "fr" ? "French" : "English"],
    ["Received", formatAdminDateTime(a.created_at)],
    ["Deleted automatically on", formatAdminDate(a.delete_after)],
  ];

  return (
    <>
      <Link href="/admin/applications" className="label text-oe-bronze">
        ← All applications
      </Link>
      <div className="mt-6">
        <PageHeader
          title={a.full_name}
          action={
            signed?.signedUrl ? (
              <a href={signed.signedUrl} className="btn btn-solid min-h-11! px-5! py-3!">
                Download CV
              </a>
            ) : (
              <span className="text-sm text-[#9b2c1f]">The CV file could not be found.</span>
            )
          }
        />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-10">
          <dl className="divide-y divide-oe-rule border-y border-oe-rule">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="label pt-1 text-oe-graphite">{k}</dt>
                <dd className="text-oe-ink">{v}</dd>
              </div>
            ))}
          </dl>
          {a.message ? (
            <Panel title="Their note">
              <p className="whitespace-pre-wrap leading-relaxed text-oe-ink">{a.message}</p>
            </Panel>
          ) : null}
        </div>
        <Panel title="Review">
          <ApplicationForm id={a.id} status={a.status} notes={a.notes ?? ""} />
        </Panel>
      </div>
    </>
  );
}

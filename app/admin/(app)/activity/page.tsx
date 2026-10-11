import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { EmptyState, PageHeader, formatAdminDateTime } from "@/components/admin/ui";

export const metadata = { title: "Activity" };

const tableLabels: Record<string, string> = { posts: "News", partners: "Partner house", jobs: "Job", applications: "Application", profiles: "Team member" };
const actionLabels: Record<string, string> = { INSERT: "created", UPDATE: "updated", DELETE: "deleted" };

export default async function ActivityPage() {
  await requireSection("activity");
  const db = await staffClient();
  const { data } = await db.from("audit_log").select("*").order("at", { ascending: false }).limit(300);
  return (
    <>
      <PageHeader title="Activity" intro="Every change to news, partner houses, jobs, applications and team accounts, newest first (last 300)." />
      {!data?.length ? (
        <EmptyState>No activity yet.</EmptyState>
      ) : (
        <table className="mt-8 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-oe-rule">
              <th className="label py-3 pr-4 font-normal text-oe-graphite">When</th>
              <th className="label py-3 pr-4 font-normal text-oe-graphite">Who</th>
              <th className="label py-3 pr-4 font-normal text-oe-graphite">What</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-oe-rule">
            {data.map((r) => (
              <tr key={r.id}>
                <td className="whitespace-nowrap py-3 pr-4 align-top text-oe-graphite">{formatAdminDateTime(r.at)}</td>
                <td className="py-3 pr-4 align-top">{r.actor_email ?? "Website / system"}</td>
                <td className="py-3 align-top text-oe-ink">
                  {tableLabels[r.table_name] ?? r.table_name} {actionLabels[r.action] ?? r.action.toLowerCase()}
                  {r.summary ? <span className="text-oe-graphite"> · {r.summary}</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

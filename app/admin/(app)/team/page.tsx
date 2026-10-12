import { requireSection, roleLabels, type StaffRole } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/supabase/service";
import { AddMemberForm, MemberRow } from "@/components/admin/TeamForms";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Team" };

const roleHelp: Record<StaffRole, string> = {
  admin: "Everything, including team accounts and the activity log.",
  communications: "News, press releases, announcements, milestones, partner houses and team profiles.",
  hr: "Jobs and applications, including CVs.",
};

export default async function TeamPage() {
  const me = await requireSection("team");
  const db = await staffClient();
  const { data: members } = await db.from("profiles").select("id,email,full_name,role,active,created_at").order("created_at");
  const canManage = Boolean(serviceClient());

  return (
    <>
      <PageHeader title="Team" intro="Each person has their own account and one role. Suspend someone who leaves; their past changes stay in the activity log." />
      <dl className="mt-8 grid gap-px border border-oe-rule bg-oe-rule sm:grid-cols-3">
        {(Object.keys(roleHelp) as StaffRole[]).map((r) => (
          <div key={r} className="bg-oe-ivory p-6">
            <dt className="label text-oe-bronze">{roleLabels[r]}</dt>
            <dd className="mt-2 text-sm text-oe-graphite">{roleHelp[r]}</dd>
          </div>
        ))}
      </dl>

      <Panel title="Add a team member" className="mt-10">
        {canManage ? (
          <AddMemberForm />
        ) : (
          <p className="text-oe-graphite">
            To add people from here, add the Supabase secret key in Vercel as <code>SUPABASE_SECRET_KEY</code> and redeploy. Until then, people can be added in Supabase (Authentication → Users), and given a role below.
          </p>
        )}
      </Panel>

      <ul className="mt-10 divide-y divide-oe-rule border-y border-oe-rule">
        {(members ?? []).map((m) => (
          <MemberRow key={m.id} id={m.id} email={m.email} fullName={m.full_name} role={m.role} active={m.active} isMe={m.id === me.id} />
        ))}
      </ul>
    </>
  );
}

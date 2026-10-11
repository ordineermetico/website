import { getStaff, roleLabels } from "@/lib/admin/session";
import { NameForm, PasswordForm } from "@/components/admin/AccountForms";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "My account" };

export default async function AccountPage() {
  const me = await getStaff();
  return (
    <>
      <PageHeader title="My account" intro={<>{me.email} · {me.role ? roleLabels[me.role] : "No role"}</>} />
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Panel title="Your name">
          <NameForm fullName={me.fullName ?? ""} />
        </Panel>
        <Panel title="Password">
          <PasswordForm email={me.email} />
        </Panel>
      </div>
    </>
  );
}

import { TWO_STEP_REQUIRED, getStaff, roleLabels } from "@/lib/admin/session";
import { NameForm, PasswordForm } from "@/components/admin/AccountForms";
import { TwoStepPanel } from "@/components/admin/TwoStepPanel";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "My account" };

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ twostep?: string }> }) {
  const me = await getStaff();
  const { twostep } = await searchParams;
  const required = Boolean(me.role && TWO_STEP_REQUIRED.includes(me.role));
  return (
    <>
      <PageHeader title="My account" intro={<>{me.email} · {me.role ? roleLabels[me.role] : "No role"}</>} />
      {twostep === "off" ? <p className="mt-6 text-sm text-[#2f5a3b]">Two-step sign-in has been turned off.</p> : null}
      {twostep === "required" ? <p className="mt-6 text-sm text-[#9b2c1f]">Admin accounts must keep two-step sign-in on.</p> : null}
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Panel title="Your name">
          <NameForm fullName={me.fullName ?? ""} />
        </Panel>
        <Panel title="Two-step sign-in">
          <TwoStepPanel enrolled={me.mfa.enrolled} required={required} />
        </Panel>
        <Panel title="Password" className="lg:col-span-2">
          <div className="max-w-lg">
            <PasswordForm email={me.email} />
          </div>
        </Panel>
      </div>
    </>
  );
}

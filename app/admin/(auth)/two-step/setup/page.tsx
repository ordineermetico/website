import { redirect } from "next/navigation";
import { TWO_STEP_REQUIRED, getSession } from "@/lib/admin/session";
import { AuthFrame } from "@/components/admin/AuthFrame";
import { EnrolForm } from "@/components/admin/SecurityForms";

export const metadata = { title: "Set up two-step sign-in" };

export default async function TwoStepSetupPage() {
  const me = await getSession();
  if (me.mustChangePassword) redirect("/admin/welcome");
  if (me.mfa.enrolled && !me.mfa.verified) redirect("/admin/two-step");
  if (me.mfa.enrolled) redirect("/admin/account");
  const required = Boolean(me.role && TWO_STEP_REQUIRED.includes(me.role));
  return (
    <AuthFrame
      step={required ? "Required for admins" : "Optional"}
      title="Set up two-step sign-in."
      intro={
        <p>
          After your password, you will also enter a 6-digit code from an app on your phone. This keeps the site safe even if a password leaks.
          {required ? " Admin accounts must use it." : ""}
        </p>
      }
    >
      <EnrolForm />
    </AuthFrame>
  );
}

import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/session";
import { AuthFrame } from "@/components/admin/AuthFrame";
import { VerifyForm } from "@/components/admin/SecurityForms";

export const metadata = { title: "Two-step sign-in" };

export default async function TwoStepPage() {
  const me = await getSession();
  if (me.mustChangePassword) redirect("/admin/welcome");
  if (!me.mfa.enrolled) redirect("/admin/two-step/setup");
  if (me.mfa.verified) redirect("/admin");
  return (
    <AuthFrame
      title="Enter your code."
      intro={<p>Open your authenticator app and enter the 6-digit code for Ordine Ermetico. Lost your phone? Ask another admin to reset your two-step sign-in.</p>}
    >
      <VerifyForm />
    </AuthFrame>
  );
}

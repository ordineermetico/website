import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/session";
import { AuthFrame } from "@/components/admin/AuthFrame";
import { FirstPasswordForm } from "@/components/admin/SecurityForms";

export const metadata = { title: "Choose your password" };

export default async function WelcomePage() {
  const me = await getSession();
  if (!me.mustChangePassword) redirect("/admin");
  return (
    <AuthFrame
      step="First sign-in"
      title="Choose your own password."
      intro={<p>You signed in with a temporary password. Replace it now; the temporary one stops working once you save.</p>}
    >
      <FirstPasswordForm email={me.email} />
    </AuthFrame>
  );
}

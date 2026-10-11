import { getStaff } from "@/lib/admin/session";
import { Shell } from "@/components/admin/Shell";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const staff = await getStaff();
  return <Shell staff={staff}>{children}</Shell>;
}

import "server-only";
import { redirect } from "next/navigation";
import { staffClient } from "@/lib/supabase/server";

export type StaffRole = "admin" | "communications" | "hr";
export type Staff = { id: string; email: string; fullName: string | null; role: StaffRole | null; active: boolean };

/** Which sections each role may open. Row-level security enforces the same rules in the database. */
export const sectionAccess = {
  news: ["admin", "communications"],
  partners: ["admin", "communications"],
  jobs: ["admin", "hr"],
  applications: ["admin", "hr"],
  team: ["admin"],
  activity: ["admin"],
} as const satisfies Record<string, readonly StaffRole[]>;
export type Section = keyof typeof sectionAccess;

export const roleLabels: Record<StaffRole, string> = {
  admin: "Admin",
  communications: "Communications",
  hr: "HR",
};

export function canAccess(role: StaffRole | null, section: Section): boolean {
  return Boolean(role && (sectionAccess[section] as readonly StaffRole[]).includes(role));
}

/** The signed-in staff member, or a redirect to sign-in. */
export async function getStaff(): Promise<Staff> {
  const db = await staffClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data } = await db.from("profiles").select("id,email,full_name,role,active").eq("id", user.id).maybeSingle();
  return {
    id: user.id,
    email: data?.email ?? user.email ?? "",
    fullName: data?.full_name ?? null,
    role: data?.active ? ((data.role as StaffRole | null) ?? null) : null,
    active: Boolean(data?.active),
  };
}

/** Require one of the roles for a section; otherwise send the person back to the dashboard. */
export async function requireSection(section: Section): Promise<Staff> {
  const staff = await getStaff();
  if (!canAccess(staff.role, section)) redirect("/admin?denied=1");
  return staff;
}

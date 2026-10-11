import "server-only";
import { redirect } from "next/navigation";
import { staffClient } from "@/lib/supabase/server";

export type StaffRole = "admin" | "communications" | "hr";
export type Staff = {
  id: string;
  email: string;
  fullName: string | null;
  role: StaffRole | null;
  active: boolean;
  mustChangePassword: boolean;
  /** Two-step sign-in state for this session. */
  mfa: { verified: boolean; enrolled: boolean };
};

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

/** Roles that must use two-step sign-in. The database enforces the same rule for admin rights. */
export const TWO_STEP_REQUIRED: StaffRole[] = ["admin"];

export function canAccess(role: StaffRole | null, section: Section): boolean {
  return Boolean(role && (sectionAccess[section] as readonly StaffRole[]).includes(role));
}

/** The signed-in staff member (no gating), or a redirect to sign-in. */
export async function getSession(): Promise<Staff> {
  const db = await staffClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/admin/login");
  const [{ data }, aal] = await Promise.all([
    db.from("profiles").select("id,email,full_name,role,active,must_change_password").eq("id", user.id).maybeSingle(),
    db.auth.mfa.getAuthenticatorAssuranceLevel(),
  ]);
  return {
    id: user.id,
    email: data?.email ?? user.email ?? "",
    fullName: data?.full_name ?? null,
    role: data?.active ? ((data.role as StaffRole | null) ?? null) : null,
    active: Boolean(data?.active),
    mustChangePassword: Boolean(data?.must_change_password),
    mfa: { verified: aal.data?.currentLevel === "aal2", enrolled: aal.data?.nextLevel === "aal2" },
  };
}

/**
 * The signed-in staff member, after the first-sign-in steps:
 * 1. a temporary password must be replaced; 2. a two-step code must be entered if set up;
 * 3. roles that require two-step sign-in must set it up.
 */
export async function getStaff(): Promise<Staff> {
  const staff = await getSession();
  if (staff.mustChangePassword) redirect("/admin/welcome");
  if (staff.mfa.enrolled && !staff.mfa.verified) redirect("/admin/two-step");
  if (staff.role && TWO_STEP_REQUIRED.includes(staff.role) && !staff.mfa.enrolled) redirect("/admin/two-step/setup");
  return staff;
}

/** Admin only (two-step verified). */
export async function requireAdmin(): Promise<Staff> {
  const staff = await getStaff();
  if (staff.role !== "admin") redirect("/admin?denied=1");
  return staff;
}

/** Require one of the roles for a section; otherwise send the person back to the dashboard. */
export async function requireSection(section: Section): Promise<Staff> {
  const staff = await getStaff();
  if (!canAccess(staff.role, section)) redirect("/admin?denied=1");
  return staff;
}

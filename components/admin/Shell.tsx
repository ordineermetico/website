import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { signOut } from "@/app/admin/actions/auth";
import { canAccess, roleLabels, type Section, type Staff } from "@/lib/admin/session";
import { NavLink } from "./NavLink";

const items: { href: string; label: string; section?: Section }[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News", section: "news" },
  { href: "/admin/partners", label: "Partner houses", section: "partners" },
  { href: "/admin/jobs", label: "Jobs", section: "jobs" },
  { href: "/admin/applications", label: "Applications", section: "applications" },
  { href: "/admin/team", label: "Team", section: "team" },
  { href: "/admin/activity", label: "Activity", section: "activity" },
  { href: "/admin/account", label: "My account" },
];

export function Shell({ staff, children }: { staff: Staff; children: ReactNode }) {
  const visible = items.filter((i) => !i.section || canAccess(staff.role, i.section));
  return (
    <div className="min-h-svh lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="on-dark bg-oe-black text-oe-softwhite lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col">
        <div className="flex items-center justify-between gap-4 px-6 py-5 lg:block lg:px-7 lg:py-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/brand/oe-emblem-gold-transparent.png" alt="" width={1032} height={993} className="h-9 w-auto" />
            <span className="font-display text-[0.95rem] tracking-[0.24em]">ORDINE ERMETICO</span>
          </Link>
          <p className="label hidden text-oe-muted-dark lg:mt-3 lg:block">Website admin</p>
        </div>
        <nav aria-label="Admin" className="overflow-x-auto border-t border-oe-gold/15 lg:flex-1 lg:overflow-visible lg:border-0">
          <ul className="flex gap-1 px-4 py-2 lg:flex-col lg:px-4 lg:py-0">
            {visible.map((i) => (
              <li key={i.href}>
                <NavLink href={i.href}>{i.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden border-t border-oe-gold/15 px-7 py-6 lg:block">
          <p className="truncate text-sm text-oe-softwhite">{staff.fullName || staff.email}</p>
          <p className="label mt-1 text-oe-gold">{staff.role ? roleLabels[staff.role] : "No role"}</p>
          <div className="mt-5 flex items-center justify-between">
            <a href="/" target="_blank" rel="noopener" className="label link-line text-oe-muted-dark hover:text-oe-softwhite">
              View site
            </a>
            <form action={signOut}>
              <button type="submit" className="label link-line text-oe-muted-dark hover:text-oe-softwhite">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-oe-rule px-6 py-3 lg:hidden">
          <p className="text-sm text-oe-graphite">
            {staff.fullName || staff.email} · {staff.role ? roleLabels[staff.role] : "No role"}
          </p>
          <form action={signOut}>
            <button type="submit" className="label text-oe-bronze">
              Sign out
            </button>
          </form>
        </div>
        <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:py-14">{children}</main>
      </div>
    </div>
  );
}

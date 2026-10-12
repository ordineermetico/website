import Link from "next/link";
import { canAccess, getStaff, roleLabels, type Section } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/supabase/service";
import { PageHeader, Panel, formatAdminDateTime } from "@/components/admin/ui";

export const metadata = { title: "Dashboard" };

const cards: { section: Section; href: string; title: string; text: string; table: "posts" | "partners" | "people" | "jobs" | "applications" | "profiles"; filter?: [string, string] }[] = [
  { section: "news", href: "/admin/news", title: "News", text: "Announcements, press releases, milestones and articles.", table: "posts" },
  { section: "partners", href: "/admin/partners", title: "Partner houses", text: "The houses shown on Home, Markets and The Firm.", table: "partners", filter: ["status", "published"] },
  { section: "people", href: "/admin/people", title: "People", text: "Team profiles on The Firm and the Team page.", table: "people", filter: ["status", "published"] },
  { section: "jobs", href: "/admin/jobs", title: "Jobs", text: "Positions on the Careers page.", table: "jobs", filter: ["status", "open"] },
  { section: "applications", href: "/admin/applications", title: "Applications", text: "Candidates and their CVs.", table: "applications", filter: ["status", "new"] },
  { section: "team", href: "/admin/team", title: "Team", text: "Who can sign in, and with which role.", table: "profiles" },
];

const countLabel: Record<string, string> = { posts: "items", partners: "published", people: "shown", jobs: "open", applications: "new", profiles: "accounts" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string; twostep?: string }> }) {
  const { denied, twostep } = await searchParams;
  const staff = await getStaff();
  const db = await staffClient();
  const visible = cards.filter((c) => canAccess(staff.role, c.section));
  const counts = await Promise.all(
    visible.map(async (c) => {
      let q = db.from(c.table).select("*", { count: "exact", head: true });
      if (c.filter) q = q.eq(c.filter[0], c.filter[1]);
      const { count } = await q;
      return count ?? 0;
    }),
  );
  const recent =
    staff.role === "admin"
      ? (await db.from("audit_log").select("id,actor_email,action,table_name,summary,at").order("at", { ascending: false }).limit(6)).data ?? []
      : [];
  const missingSecret = staff.role === "admin" && !serviceClient();
  const awaitingSignoff =
    staff.role === "admin" ? ((await db.from("posts").select("id", { count: "exact", head: true }).eq("signoff_status", "pending")).count ?? 0) : 0;

  return (
    <>
      <PageHeader
        title={`Welcome${staff.fullName ? `, ${staff.fullName.split(" ")[0]}` : ""}.`}
        intro={staff.role ? <>You are signed in as <strong className="text-oe-ink">{roleLabels[staff.role]}</strong>.</> : undefined}
      />

      {denied ? (
        <p role="alert" className="mt-8 border-l border-[#9b2c1f] pl-4 text-sm text-[#9b2c1f]">
          Your role does not give access to that section.
        </p>
      ) : null}

      {twostep === "on" ? <p className="mt-8 text-sm text-[#2f5a3b]">Two-step sign-in is on. You will be asked for a code each time you sign in.</p> : null}

      {awaitingSignoff ? (
        <Link href="/admin/news?signoff=pending" className="mt-10 flex items-center justify-between gap-6 border border-oe-bronze bg-oe-paper px-6 py-5 transition-colors hover:bg-oe-ivory">
          <span>
            <span className="font-display text-2xl text-oe-ink">
              {awaitingSignoff} {awaitingSignoff === 1 ? "item awaits" : "items await"} your sign-off
            </span>
            <span className="block text-sm text-oe-graphite">Nothing goes live until an Admin approves it.</span>
          </span>
          <span className="label text-oe-bronze">Review</span>
        </Link>
      ) : null}

      {!staff.role ? (
        <Panel className="mt-10">
          <p className="font-display text-2xl text-oe-ink">Your account has no role yet.</p>
          <p className="mt-3 text-oe-graphite">Ask an admin to give you the Admin, Communications or HR role. Until then you cannot open any section.</p>
        </Panel>
      ) : null}

      {missingSecret ? (
        <Panel className="mt-10 border-oe-bronze!">
          <p className="font-display text-2xl text-oe-ink">One setting is missing.</p>
          <p className="mt-3 text-oe-graphite">
            Adding team members and receiving job applications need the Supabase secret key. Add it in Vercel as <code>SUPABASE_SECRET_KEY</code> (Supabase → Project settings → API keys → Secret keys), then redeploy.
          </p>
        </Panel>
      ) : null}

      <ul className="mt-10 grid gap-px border border-oe-rule bg-oe-rule sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((c, i) => (
          <li key={c.href} className="bg-oe-ivory">
            <Link href={c.href} className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors hover:bg-oe-paper">
              <div>
                <h2 className="font-display text-[1.8rem] text-oe-ink group-hover:text-oe-bronze">{c.title}</h2>
                <p className="mt-2 text-[0.95rem] text-oe-graphite">{c.text}</p>
              </div>
              <p className="label text-oe-bronze">
                {counts[i]} {countLabel[c.table]}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {recent.length ? (
        <Panel title="Recent activity" className="mt-10">
          <ul className="divide-y divide-oe-rule">
            {recent.map((r) => (
              <li key={r.id} className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:justify-between">
                <span className="text-oe-ink">
                  {r.actor_email ?? "System"} · {r.action.toLowerCase()} · {r.table_name}
                  {r.summary ? ` · ${r.summary}` : ""}
                </span>
                <span className="text-oe-graphite">{formatAdminDateTime(r.at)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}
    </>
  );
}

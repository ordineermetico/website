import Link from "next/link";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { Badge, ButtonLink, EmptyState, PageHeader, formatAdminDate } from "@/components/admin/ui";

export const metadata = { title: "News" };

const kindLabels: Record<string, string> = { news: "News", press_release: "Press release", announcement: "Announcement", milestone: "Milestone", insight: "Insight" };

export default async function NewsList({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  await requireSection("news");
  const { deleted } = await searchParams;
  const db = await staffClient();
  const { data: posts } = await db.from("posts").select("id,slug,kind,status,title_en,title_fr,published_at,updated_at").order("updated_at", { ascending: false });
  const now = new Date().toISOString();

  return (
    <>
      <PageHeader
        title="News"
        intro="Announcements, press releases, milestones and articles. Published items appear on the News page in both languages; add the French text to show it on the French site."
        action={<ButtonLink href="/admin/news/new">New item</ButtonLink>}
      />
      {deleted ? <p className="mt-6 text-sm text-[#2f5a3b]">The item was deleted.</p> : null}
      {!posts?.length ? (
        <EmptyState>Nothing yet. Start with your first announcement.</EmptyState>
      ) : (
        <ul className="mt-6 divide-y divide-oe-rule border-b border-oe-rule">
          {posts.map((p) => {
            const scheduled = p.status === "published" && p.published_at && p.published_at > now;
            return (
              <li key={p.id}>
                <Link href={`/admin/news/${p.id}`} className="grid gap-2 py-5 transition-colors hover:bg-oe-paper sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:px-3">
                  <div>
                    <p className="font-display text-[1.45rem] leading-snug text-oe-ink">{p.title_en}</p>
                    <p className="mt-1 text-sm text-oe-graphite">
                      {kindLabels[p.kind]} · {p.published_at ? formatAdminDate(p.published_at) : "No date"} · {p.title_fr ? "EN + FR" : "EN only"}
                    </p>
                  </div>
                  <Badge value={scheduled ? "scheduled" : p.status} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

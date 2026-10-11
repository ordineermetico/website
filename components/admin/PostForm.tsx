"use client";

import { useActionState, useState } from "react";
import { approvePost, deletePost, requestChanges, savePost } from "@/app/admin/actions/posts";
import { ConfirmButton, FormMessage, SubmitButton } from "./client";
import { FORMAT_HELP, Field } from "./ui";

export type PostValues = {
  id?: string;
  slug: string;
  kind: string;
  status: string;
  title_en: string;
  title_fr: string;
  excerpt_en: string;
  excerpt_fr: string;
  body_en: string;
  body_fr: string;
  cover_image: string | null;
  published_on: string;
  requires_signoff: boolean;
  signoff_status: "none" | "pending" | "approved" | "changes_requested";
  signoff_note: string | null;
  signoff_by: string | null;
  signoff_at: string | null;
};

const SIGNOFF_TEXT: Record<string, { tone: string; title: string; body: string }> = {
  pending: { tone: "border-oe-bronze", title: "Awaiting Admin sign-off", body: "It goes live once an Admin approves it. You can still edit it." },
  changes_requested: { tone: "border-[#9b2c1f]", title: "Changes requested", body: "Make the changes below, then submit it for sign-off again." },
  approved: { tone: "border-[#3d6b4a]", title: "Signed off", body: "Editing the text again sends it back for sign-off." },
};

export function SignoffBanner({ values }: { values: PostValues }) {
  if (!values.requires_signoff || values.signoff_status === "none") return null;
  const t = SIGNOFF_TEXT[values.signoff_status];
  return (
    <div className={`mt-8 border-l-2 bg-oe-paper px-5 py-4 ${t.tone}`}>
      <p className="label text-oe-ink">{t.title}</p>
      <p className="mt-1 text-sm text-oe-graphite">
        {t.body}
        {values.signoff_status === "approved" && values.signoff_by ? ` Approved by ${values.signoff_by}${values.signoff_at ? ` on ${values.signoff_at}` : ""}.` : ""}
      </p>
      {values.signoff_note && values.signoff_status === "changes_requested" ? <p className="mt-3 whitespace-pre-wrap text-sm text-oe-ink">“{values.signoff_note}”</p> : null}
    </div>
  );
}

/** Admin-only review controls, shown above the editor when an item waits for sign-off. */
export function SignoffReview({ id }: { id: string }) {
  const [approveState, approve] = useActionState(approvePost, undefined);
  const [changesState, changes] = useActionState(requestChanges, undefined);
  return (
    <section className="mt-8 grid gap-8 border border-oe-bronze p-6 sm:p-8 lg:grid-cols-2">
      <form action={approve} className="space-y-4">
        <input type="hidden" name="id" value={id} />
        <p className="label text-oe-bronze">Your sign-off</p>
        <p className="text-sm text-oe-graphite">Read the item below. Approving publishes it straight away (or on its publication date).</p>
        <SubmitButton pendingLabel="Publishing…">Approve and publish</SubmitButton>
        <FormMessage state={approveState} />
      </form>
      <form action={changes} className="space-y-4">
        <input type="hidden" name="id" value={id} />
        <label htmlFor="note" className="field-label">
          Or send it back with a note
        </label>
        <textarea id="note" name="note" rows={3} className="field" placeholder="What needs to change?" />
        <SubmitButton variant="ghost" pendingLabel="Sending…">
          Request changes
        </SubmitButton>
        <FormMessage state={changesState} />
      </form>
    </section>
  );
}

export function PostForm({ values, saved, isAdmin }: { values: PostValues; saved?: "1" | "pending"; isAdmin: boolean }) {
  const [state, action] = useActionState(
    savePost,
    saved === "pending" ? { ok: true, message: "Saved and sent to an Admin for sign-off. It goes live once approved." } : saved ? { ok: true, message: "Saved." } : undefined,
  );
  const [kind, setKind] = useState(values.kind);
  const [wantsSignoff, setWantsSignoff] = useState(values.requires_signoff);
  const needsSignoff = kind === "partnership" || wantsSignoff;
  return (
    <form action={action} className="mt-10 space-y-12">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <div className="grid gap-8 sm:grid-cols-3">
        <Field label="Type" htmlFor="kind">
          <select id="kind" name="kind" value={kind} onChange={(e) => setKind(e.target.value)} className="field">
            <option value="news">News</option>
            <option value="press_release">Press release</option>
            <option value="announcement">Announcement</option>
            <option value="milestone">Milestone</option>
            <option value="partnership">Partnership announcement (needs sign-off)</option>
            <option value="insight">Insight (article)</option>
          </select>
        </Field>
        <Field
          label="Status"
          htmlFor="status"
          hint={needsSignoff && !isAdmin ? "Choosing Published sends it for sign-off; it goes live once approved." : "Draft is private. Published shows on the site from the publication date. Archived hides it."}
        >
          <select id="status" name="status" defaultValue={values.status} className="field">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
        <Field label="Publication date" htmlFor="published_on" hint="Leave empty to use today. A future date schedules it.">
          <input id="published_on" name="published_on" type="date" defaultValue={values.published_on} className="field" />
        </Field>
      </div>

      <label className="flex items-start gap-3 border border-oe-rule bg-oe-paper px-5 py-4 text-[0.95rem] text-oe-ink">
        <input
          type="checkbox"
          name="requires_signoff"
          checked={needsSignoff}
          disabled={kind === "partnership" || (values.requires_signoff && !isAdmin)}
          onChange={(e) => setWantsSignoff(e.target.checked)}
          className="mt-1 size-4 accent-[#7E5A1E]"
        />
        {kind === "partnership" || (values.requires_signoff && !isAdmin) ? <input type="hidden" name="requires_signoff" value="on" /> : null}
        <span>
          <strong className="font-semibold">Needs Admin sign-off</strong>
          <span className="block text-sm text-oe-graphite">
            For sensitive items: partnerships, investment, legal or financial news. It stays offline until an Admin approves it. Partnership announcements always need it; everything else publishes directly.
          </span>
        </span>
      </label>

      <div className="grid gap-10 lg:grid-cols-2">
        <fieldset className="space-y-8">
          <legend className="label mb-6 text-oe-bronze">English</legend>
          <Field label="Title *" htmlFor="title_en">
            <input id="title_en" name="title_en" required minLength={3} maxLength={200} defaultValue={values.title_en} className="field" />
          </Field>
          <Field label="Summary" htmlFor="excerpt_en" hint="One or two sentences shown in lists and search results (max 400 characters).">
            <textarea id="excerpt_en" name="excerpt_en" rows={3} maxLength={400} defaultValue={values.excerpt_en} className="field" />
          </Field>
          <Field label="Text" htmlFor="body_en" hint={FORMAT_HELP}>
            <textarea id="body_en" name="body_en" rows={16} defaultValue={values.body_en} className="field font-mono text-[0.92rem]!" />
          </Field>
        </fieldset>
        <fieldset className="space-y-8">
          <legend className="label mb-6 text-oe-bronze">Français</legend>
          <Field label="Titre" htmlFor="title_fr" hint="Without a French title, the French site shows the English version with a note.">
            <input id="title_fr" name="title_fr" maxLength={200} defaultValue={values.title_fr} className="field" />
          </Field>
          <Field label="Résumé" htmlFor="excerpt_fr">
            <textarea id="excerpt_fr" name="excerpt_fr" rows={3} maxLength={400} defaultValue={values.excerpt_fr} className="field" />
          </Field>
          <Field label="Texte" htmlFor="body_fr">
            <textarea id="body_fr" name="body_fr" rows={16} defaultValue={values.body_fr} className="field font-mono text-[0.92rem]!" />
          </Field>
        </fieldset>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Cover image" htmlFor="cover" hint="Optional. JPEG, PNG or WebP, landscape, up to 4 MB. Use only images you are licensed to publish.">
          {values.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={values.cover_image} alt="" className="mb-4 aspect-[3/2] w-full max-w-sm object-cover" />
          ) : null}
          <input id="cover" name="cover" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="block text-sm" />
          {values.cover_image ? (
            <label className="mt-3 flex items-center gap-2 text-sm text-oe-graphite">
              <input type="checkbox" name="remove_cover" className="accent-[#7E5A1E]" /> Remove the current image
            </label>
          ) : null}
        </Field>
        <Field label="Web address (slug)" htmlFor="slug" hint="Lower-case words joined by hyphens. Leave empty to create it from the title. Changing it breaks links already shared.">
          <input id="slug" name="slug" defaultValue={values.slug} pattern="[a-z0-9]+(-[a-z0-9]+)*" className="field" />
          {values.slug ? <p className="mt-2 text-xs text-oe-graphite">/news/{values.slug}</p> : null}
        </Field>
      </div>

      <div className="flex flex-col gap-6 border-t border-oe-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          <SubmitButton>Save</SubmitButton>
          {needsSignoff && !isAdmin && values.signoff_status !== "pending" ? (
            <SubmitButton variant="ghost" name="submit_for_signoff" value="1" pendingLabel="Submitting…">
              Submit for sign-off
            </SubmitButton>
          ) : null}
          {values.id && values.status === "published" ? (
            <a href={`/news/${values.slug}`} target="_blank" rel="noopener" className="label link-line text-oe-bronze">
              View on site
            </a>
          ) : null}
        </div>
        {values.id ? (
          <ConfirmButton message="Delete this item permanently? This cannot be undone." formAction={deletePost}>
            Delete
          </ConfirmButton>
        ) : null}
      </div>
      <FormMessage state={state} />
    </form>
  );
}

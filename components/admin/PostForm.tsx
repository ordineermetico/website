"use client";

import { useActionState } from "react";
import { deletePost, savePost } from "@/app/admin/actions/posts";
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
};

export function PostForm({ values, saved }: { values: PostValues; saved?: boolean }) {
  const [state, action] = useActionState(savePost, saved ? { ok: true, message: "Saved." } : undefined);
  return (
    <form action={action} className="mt-10 space-y-12">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <div className="grid gap-8 sm:grid-cols-3">
        <Field label="Type" htmlFor="kind">
          <select id="kind" name="kind" defaultValue={values.kind} className="field">
            <option value="news">News</option>
            <option value="press_release">Press release</option>
            <option value="announcement">Announcement</option>
            <option value="milestone">Milestone</option>
            <option value="insight">Insight (article)</option>
          </select>
        </Field>
        <Field label="Status" htmlFor="status" hint="Draft is private. Published shows on the site from the publication date. Archived hides it.">
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

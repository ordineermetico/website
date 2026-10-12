"use client";

import { useActionState } from "react";
import { deletePerson, savePerson } from "@/app/admin/actions/people";
import { ConfirmButton, FormMessage, SubmitButton } from "./client";
import { FORMAT_HELP, Field } from "./ui";

export type PersonValues = {
  id?: string;
  name: string;
  slug: string;
  role_en: string;
  role_fr: string;
  bio_en: string;
  bio_fr: string;
  photo_url: string | null;
  location: string;
  linkedin_url: string;
  x_url: string;
  instagram_url: string;
  website_url: string;
  public_email: string;
  sort_order: number;
  status: string;
};

export function PersonForm({ values, saved }: { values: PersonValues; saved?: boolean }) {
  const [state, action] = useActionState(savePerson, saved ? { ok: true, message: "Saved." } : undefined);
  return (
    <form action={action} className="mt-10 space-y-12">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
        <Field label="Portrait" htmlFor="photo" hint="Portrait format (4:5), at least 800 × 1000 px, JPEG or WebP, up to 4 MB. Use photos you are allowed to publish.">
          {values.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={values.photo_url} alt="" className="mb-4 aspect-[4/5] w-full object-cover" />
          ) : (
            <div className="mb-4 grid aspect-[4/5] w-full place-items-center border border-dashed border-oe-rule text-sm text-oe-graphite">No photo</div>
          )}
          <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="block w-full text-sm" />
          {values.photo_url ? (
            <label className="mt-3 flex items-center gap-2 text-sm text-oe-graphite">
              <input type="checkbox" name="remove_photo" className="accent-[#7E5A1E]" /> Remove the photo
            </label>
          ) : null}
        </Field>

        <div className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Full name *" htmlFor="name">
              <input id="name" name="name" required defaultValue={values.name} className="field" />
            </Field>
            <Field label="Visibility" htmlFor="status" hint="Shown = on the site. Hidden = prepared, not shown. Archived = no longer with the company.">
              <select id="status" name="status" defaultValue={values.status} className="field">
                <option value="published">Shown on the site</option>
                <option value="draft">Hidden</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <Field label="Designation (English) *" htmlFor="role_en" hint="e.g. Founder, Head of Trade Relations">
              <input id="role_en" name="role_en" required defaultValue={values.role_en} className="field" />
            </Field>
            <Field label="Fonction (français)" htmlFor="role_fr" hint="e.g. Fondateur, Responsable des relations commerciales">
              <input id="role_fr" name="role_fr" defaultValue={values.role_fr} className="field" />
            </Field>
            <Field label="Based in" htmlFor="location" hint="Optional, e.g. Reims, France or Mumbai, India">
              <input id="location" name="location" defaultValue={values.location} className="field" />
            </Field>
            <Field label="Order" htmlFor="sort_order" hint="Lower numbers come first. The first four shown profiles appear on The Firm.">
              <input id="sort_order" name="sort_order" type="number" defaultValue={values.sort_order} className="field" />
            </Field>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <Field label="Short bio (English)" htmlFor="bio_en" hint={<>Optional. Shown on the Team page, and on The Firm when only one profile is shown. {FORMAT_HELP}</>}>
          <textarea id="bio_en" name="bio_en" rows={7} maxLength={4000} defaultValue={values.bio_en} className="field" />
        </Field>
        <Field label="Courte biographie (français)" htmlFor="bio_fr" hint="Without French text, the French site shows the English bio.">
          <textarea id="bio_fr" name="bio_fr" rows={7} maxLength={4000} defaultValue={values.bio_fr} className="field" />
        </Field>
      </div>

      <fieldset>
        <legend className="label mb-6 text-oe-bronze">Public links (all optional)</legend>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="LinkedIn" htmlFor="linkedin_url">
            <input id="linkedin_url" name="linkedin_url" type="url" placeholder="https://www.linkedin.com/in/…" defaultValue={values.linkedin_url} className="field" />
          </Field>
          <Field label="X" htmlFor="x_url">
            <input id="x_url" name="x_url" type="url" placeholder="https://x.com/…" defaultValue={values.x_url} className="field" />
          </Field>
          <Field label="Instagram" htmlFor="instagram_url">
            <input id="instagram_url" name="instagram_url" type="url" placeholder="https://www.instagram.com/…" defaultValue={values.instagram_url} className="field" />
          </Field>
          <Field label="Website" htmlFor="website_url">
            <input id="website_url" name="website_url" type="url" placeholder="https://" defaultValue={values.website_url} className="field" />
          </Field>
          <Field label="Public email" htmlFor="public_email" hint="Only if this person should be contacted directly.">
            <input id="public_email" name="public_email" type="email" defaultValue={values.public_email} className="field" />
          </Field>
          <Field label="Identifier (slug)" htmlFor="slug" hint="Leave empty to create it from the name.">
            <input id="slug" name="slug" defaultValue={values.slug} pattern="[a-z0-9]+(-[a-z0-9]+)*" className="field" />
          </Field>
        </div>
      </fieldset>

      <div className="flex flex-col gap-6 border-t border-oe-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton>Save</SubmitButton>
        {values.id ? (
          <ConfirmButton message="Delete this profile permanently? To keep the record, choose Archived instead." formAction={deletePerson}>
            Delete
          </ConfirmButton>
        ) : null}
      </div>
      <FormMessage state={state} />
    </form>
  );
}

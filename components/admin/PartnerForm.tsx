"use client";

import { useActionState } from "react";
import { deletePartner, savePartner } from "@/app/admin/actions/partners";
import { ConfirmButton, FormMessage, SubmitButton } from "./client";
import { Field } from "./ui";

export type PartnerValues = {
  id?: string;
  name: string;
  slug: string;
  line_en: string;
  line_fr: string;
  logo_url: string | null;
  logo_alt_en: string;
  logo_alt_fr: string;
  logo_height_rem: number;
  website_url: string;
  sort_order: number;
  status: string;
};

export function PartnerForm({ values, saved }: { values: PartnerValues; saved?: boolean }) {
  const [state, action] = useActionState(savePartner, saved ? { ok: true, message: "Saved." } : undefined);
  return (
    <form action={action} className="mt-10 space-y-12">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="House name *" htmlFor="name" hint="As the house writes it, e.g. Champagne Duval-Leroy.">
          <input id="name" name="name" required defaultValue={values.name} className="field" />
        </Field>
        <Field label="Visibility" htmlFor="status" hint="Shown = on the site. Hidden = prepared but not shown. Archived = partnership ended.">
          <select id="status" name="status" defaultValue={values.status} className="field">
            <option value="published">Shown on the site</option>
            <option value="draft">Hidden</option>
            <option value="archived">Archived (partnership ended)</option>
          </select>
        </Field>
        <Field label="One line (English) *" htmlFor="line_en" hint="Factual and approved by the house. Max 240 characters.">
          <textarea id="line_en" name="line_en" rows={3} maxLength={240} required defaultValue={values.line_en} className="field" />
        </Field>
        <Field label="Une ligne (français)" htmlFor="line_fr">
          <textarea id="line_fr" name="line_fr" rows={3} maxLength={240} defaultValue={values.line_fr} className="field" />
        </Field>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label={values.logo_url ? "Replace logo" : "Logo *"} htmlFor="logo" hint="The house's official file for light backgrounds. SVG or transparent PNG. Never recolour or add effects.">
          {values.logo_url ? (
            <div className="mb-4 flex h-28 items-center justify-center border border-oe-rule bg-oe-ivory p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={values.logo_url} alt="" style={{ height: `${values.logo_height_rem}rem` }} className="w-auto max-w-full object-contain" />
            </div>
          ) : null}
          <input id="logo" name="logo" type="file" accept="image/svg+xml,image/png,image/webp" className="block text-sm" />
        </Field>
        <div className="space-y-8">
          <Field label="Logo height" htmlFor="logo_height_rem" hint="Adjust so all houses look the same optical size (default 5.5).">
            <input id="logo_height_rem" name="logo_height_rem" type="number" min={2} max={9} step={0.1} defaultValue={values.logo_height_rem} className="field" />
          </Field>
          <Field label="Order on the page" htmlFor="sort_order" hint="Lower numbers come first.">
            <input id="sort_order" name="sort_order" type="number" defaultValue={values.sort_order} className="field" />
          </Field>
        </div>
        <Field label="Logo description (English)" htmlFor="logo_alt_en" hint="Read aloud by screen readers. Default: “[name] logo”.">
          <input id="logo_alt_en" name="logo_alt_en" defaultValue={values.logo_alt_en} className="field" />
        </Field>
        <Field label="Description du logo (français)" htmlFor="logo_alt_fr">
          <input id="logo_alt_fr" name="logo_alt_fr" defaultValue={values.logo_alt_fr} className="field" />
        </Field>
        <Field label="House website" htmlFor="website_url" hint="Optional. When set, the logo links to it.">
          <input id="website_url" name="website_url" type="url" placeholder="https://" defaultValue={values.website_url} className="field" />
        </Field>
        <Field label="Identifier (slug)" htmlFor="slug" hint="Leave empty to create it from the name.">
          <input id="slug" name="slug" defaultValue={values.slug} pattern="[a-z0-9]+(-[a-z0-9]+)*" className="field" />
        </Field>
      </div>

      <div className="flex flex-col gap-6 border-t border-oe-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton>Save</SubmitButton>
        {values.id ? (
          <ConfirmButton message="Delete this house permanently? To end a partnership but keep the record, choose Archived instead." formAction={deletePartner}>
            Delete
          </ConfirmButton>
        ) : null}
      </div>
      <FormMessage state={state} />
    </form>
  );
}

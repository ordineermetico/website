"use client";

import { useActionState } from "react";
import { deleteJob, saveJob } from "@/app/admin/actions/jobs";
import { ConfirmButton, FormMessage, SubmitButton } from "./client";
import { FORMAT_HELP, Field } from "./ui";

export type JobValues = {
  id?: string;
  slug: string;
  status: string;
  title_en: string;
  title_fr: string;
  location: string;
  employment_type: string;
  department: string;
  summary_en: string;
  summary_fr: string;
  body_en: string;
  body_fr: string;
  closes_at: string;
};

const TEMPLATE = `## The role

What the person will do, in a few sentences.

## Responsibilities

- 
- 

## About you

- 
- 

## What we offer

- `;

export function JobForm({ values, saved }: { values: JobValues; saved?: boolean }) {
  const [state, action] = useActionState(saveJob, saved ? { ok: true, message: "Saved." } : undefined);
  return (
    <form action={action} className="mt-10 space-y-12">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Status" htmlFor="status" hint="Open = on the Careers page.">
          <select id="status" name="status" defaultValue={values.status} className="field">
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </Field>
        <Field label="Location" htmlFor="location" hint="City, Country">
          <input id="location" name="location" defaultValue={values.location} className="field" />
        </Field>
        <Field label="Contract" htmlFor="employment_type">
          <input id="employment_type" name="employment_type" list="contract-types" defaultValue={values.employment_type} className="field" />
          <datalist id="contract-types">
            <option value="Full-time" />
            <option value="Part-time" />
            <option value="CDI (permanent)" />
            <option value="CDD (fixed-term)" />
            <option value="Internship" />
            <option value="Apprenticeship" />
            <option value="Freelance" />
          </datalist>
        </Field>
        <Field label="Applications close" htmlFor="closes_at" hint="Optional. The job disappears after this date.">
          <input id="closes_at" name="closes_at" type="date" defaultValue={values.closes_at} className="field" />
        </Field>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <fieldset className="space-y-8">
          <legend className="label mb-6 text-oe-bronze">English</legend>
          <Field label="Job title *" htmlFor="title_en">
            <input id="title_en" name="title_en" required minLength={3} defaultValue={values.title_en} className="field" />
          </Field>
          <Field label="Summary" htmlFor="summary_en" hint="One or two sentences shown in the list of positions.">
            <textarea id="summary_en" name="summary_en" rows={3} maxLength={400} defaultValue={values.summary_en} className="field" />
          </Field>
          <Field label="Description *" htmlFor="body_en" hint={FORMAT_HELP}>
            <textarea id="body_en" name="body_en" rows={18} defaultValue={values.body_en || (values.id ? "" : TEMPLATE)} className="field font-mono text-[0.92rem]!" />
          </Field>
        </fieldset>
        <fieldset className="space-y-8">
          <legend className="label mb-6 text-oe-bronze">Français</legend>
          <Field label="Intitulé du poste" htmlFor="title_fr">
            <input id="title_fr" name="title_fr" defaultValue={values.title_fr} className="field" />
          </Field>
          <Field label="Résumé" htmlFor="summary_fr">
            <textarea id="summary_fr" name="summary_fr" rows={3} maxLength={400} defaultValue={values.summary_fr} className="field" />
          </Field>
          <Field label="Description" htmlFor="body_fr">
            <textarea id="body_fr" name="body_fr" rows={18} defaultValue={values.body_fr} className="field font-mono text-[0.92rem]!" />
          </Field>
        </fieldset>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Team" htmlFor="department" hint="Optional, e.g. Commercial, Operations.">
          <input id="department" name="department" defaultValue={values.department} className="field" />
        </Field>
        <Field label="Web address (slug)" htmlFor="slug" hint="Leave empty to create it from the title.">
          <input id="slug" name="slug" defaultValue={values.slug} pattern="[a-z0-9]+(-[a-z0-9]+)*" className="field" />
        </Field>
      </div>

      <div className="flex flex-col gap-6 border-t border-oe-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          <SubmitButton>Save</SubmitButton>
          {values.id && values.status === "open" ? (
            <a href={`/careers/${values.slug}`} target="_blank" rel="noopener" className="label link-line text-oe-bronze">
              View on site
            </a>
          ) : null}
        </div>
        {values.id ? (
          <ConfirmButton message="Delete this position? Its applications are kept. To stop accepting applications, choose Closed instead." formAction={deleteJob}>
            Delete
          </ConfirmButton>
        ) : null}
      </div>
      <FormMessage state={state} />
    </form>
  );
}

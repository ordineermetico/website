"use client";

import { useActionState } from "react";
import { deleteApplication, updateApplication } from "@/app/admin/actions/applications";
import { ConfirmButton, FormMessage, SubmitButton } from "./client";
import { Field } from "./ui";

export function ApplicationForm({ id, status, notes }: { id: string; status: string; notes: string }) {
  const [state, action] = useActionState(updateApplication, undefined);
  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="id" value={id} />
      <Field label="Status" htmlFor="status">
        <select id="status" name="status" defaultValue={status} className="field">
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </Field>
      <Field label="Internal notes" htmlFor="notes" hint="Only Admin and HR see these. Keep them factual: candidates can ask to see the data held about them.">
        <textarea id="notes" name="notes" rows={7} defaultValue={notes} className="field" />
      </Field>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton>Save</SubmitButton>
        <ConfirmButton message="Delete this application and its CV permanently?" formAction={deleteApplication}>
          Delete application
        </ConfirmButton>
      </div>
      <FormMessage state={state} />
    </form>
  );
}

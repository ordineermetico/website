"use client";

import { useActionState } from "react";
import { addMember, deleteMember, resetPassword, updateMember, type TeamState } from "@/app/admin/actions/team";
import { ConfirmButton, FormMessage, SubmitButton } from "./client";
import { Field } from "./ui";

function PasswordReveal({ state }: { state: TeamState | undefined }) {
  if (!state?.password) return null;
  return (
    <div className="mt-6 border border-oe-bronze bg-oe-paper p-5">
      <p className="text-sm text-oe-ink">
        Temporary password for <strong>{state.forEmail}</strong>. It is shown only once: pass it on in person or by phone, not by email, and ask them to change it under <em>My account</em> after signing in.
      </p>
      <p className="mt-4 select-all font-mono text-xl tracking-wider text-oe-ink">{state.password}</p>
    </div>
  );
}

export function AddMemberForm() {
  const [state, action] = useActionState(addMember, undefined);
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Email" htmlFor="new-email">
          <input id="new-email" name="email" type="email" required className="field" placeholder="name@ordineermetico.com" />
        </Field>
        <Field label="Full name" htmlFor="new-name">
          <input id="new-name" name="full_name" className="field" />
        </Field>
        <Field label="Role" htmlFor="new-role">
          <select id="new-role" name="role" defaultValue="communications" className="field">
            <option value="communications">Communications</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>
        </Field>
      </div>
      <SubmitButton pendingLabel="Creating…">Create account</SubmitButton>
      <FormMessage state={state} />
      <PasswordReveal state={state} />
    </form>
  );
}

export function MemberRow({
  id,
  email,
  fullName,
  role,
  active,
  isMe,
}: {
  id: string;
  email: string;
  fullName: string | null;
  role: string | null;
  active: boolean;
  isMe: boolean;
}) {
  const [state, action] = useActionState(updateMember, undefined);
  const [resetState, resetAction] = useActionState(resetPassword, undefined);
  return (
    <li className="py-6">
      <div className="space-y-5">
        <div>
          <p className="font-display text-[1.4rem] text-oe-ink">
            {fullName || email} {isMe ? <span className="label ml-2 text-oe-bronze">You</span> : null}
          </p>
          <p className="text-sm text-oe-graphite">{email}</p>
        </div>
        {isMe ? (
          <p className="text-sm text-oe-graphite">Another admin must change your role or access.</p>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <form action={action} className="flex flex-wrap items-end gap-4">
              <input type="hidden" name="id" value={id} />
              <div className="w-44">
                <label htmlFor={`role-${id}`} className="field-label">
                  Role
                </label>
                <select id={`role-${id}`} name="role" defaultValue={role ?? ""} className="field">
                  <option value="" disabled>
                    No role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="communications">Communications</option>
                  <option value="hr">HR</option>
                </select>
              </div>
              <div className="w-40">
                <label htmlFor={`active-${id}`} className="field-label">
                  Access
                </label>
                <select id={`active-${id}`} name="active" defaultValue={String(active)} className="field">
                  <option value="true">Active</option>
                  <option value="false">Suspended</option>
                </select>
              </div>
              <SubmitButton variant="ghost">Save</SubmitButton>
            </form>
            <form action={resetAction} className="flex items-center gap-4">
              <input type="hidden" name="id" value={id} />
              <SubmitButton variant="ghost" pendingLabel="Resetting…">
                Reset password
              </SubmitButton>
              <ConfirmButton message={`Delete the account for ${email}? Their past changes stay in the activity log.`} formAction={deleteMember}>
                Delete
              </ConfirmButton>
            </form>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-3">
        <FormMessage state={state} />
        <FormMessage state={resetState} />
        <PasswordReveal state={resetState} />
      </div>
    </li>
  );
}

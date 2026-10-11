import Link from "next/link";
import { turnOffTwoStep } from "@/app/admin/actions/security";

export function TwoStepPanel({ enrolled, required }: { enrolled: boolean; required: boolean }) {
  return (
    <div className="space-y-5">
      <p className="text-oe-ink">
        Two-step sign-in is <strong>{enrolled ? "on" : "off"}</strong>.
        {required ? " It is required for admin accounts." : " It is optional for your role, and recommended."}
      </p>
      <p className="text-sm text-oe-graphite">
        After your password you enter a 6-digit code from an authenticator app. If you change phones, ask an admin to reset it, then set it up again.
      </p>
      {!enrolled ? (
        <Link href="/admin/two-step/setup" className="btn btn-solid min-h-11! px-5! py-3!">
          Set up two-step sign-in
        </Link>
      ) : !required ? (
        <form action={turnOffTwoStep}>
          <button type="submit" className="label text-[#9b2c1f] hover:underline">
            Turn off two-step sign-in
          </button>
        </form>
      ) : null}
    </div>
  );
}

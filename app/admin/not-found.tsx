import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-4 font-display text-5xl text-oe-ink">This page could not be found.</h1>
      <Link href="/admin" className="btn btn-solid mt-10">
        Back to the dashboard
      </Link>
    </main>
  );
}

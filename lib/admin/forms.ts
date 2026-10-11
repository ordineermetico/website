/** Small helpers for reading admin form submissions. */
export const str = (fd: FormData, k: string, max = 20000) => String(fd.get(k) ?? "").trim().slice(0, max);
export const optStr = (fd: FormData, k: string, max = 20000) => str(fd, k, max) || null;

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Date input (YYYY-MM-DD, read as a Paris calendar day) → ISO timestamp at 08:00 UTC that day. */
export function dateToIso(v: string | null): string | null {
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  return `${v}T08:00:00.000Z`;
}

export function isoToDate(iso: string | null | undefined): string {
  return iso ? iso.slice(0, 10) : "";
}

export const today = () => new Date().toISOString().slice(0, 10);

export type ActionState = { ok?: boolean; error?: string; message?: string };

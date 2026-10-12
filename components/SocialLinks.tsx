import { socials, type SocialId } from "@/lib/site";

export const iconPaths: Record<SocialId | "website" | "email", string> = {
  linkedin:
    "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.56v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V22H7.62V8z",
  instagram:
    "M12 2.2c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33 0 7.05.07 2.7.27.27 2.69.07 7.05 0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98C24 15.67 24 15.26 24 12s0-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z",
  youtube:
    "M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  website:
    "M12 0a12 12 0 100 24 12 12 0 000-24zm7.9 7h-3.4a18.6 18.6 0 00-1.6-4.6A10 10 0 0119.9 7zM12 2c.9 1.2 1.9 3 2.4 5H9.6C10.1 5 11.1 3.2 12 2zM2.3 14a9.9 9.9 0 010-4h3.9a20 20 0 000 4H2.3zm.8 2h3.4c.4 1.7.9 3.2 1.6 4.6A10 10 0 013.1 16zm3.4-9H3.1A10 10 0 018.1 2.4 18.6 18.6 0 006.5 7zM12 22c-.9-1.2-1.9-3-2.4-5h4.8c-.5 2-1.5 3.8-2.4 5zm2.8-7H9.2a18 18 0 010-4h5.6a18 18 0 010 4zm.1 5.6c.7-1.4 1.2-2.9 1.6-4.6h3.4a10 10 0 01-5 4.6zm1.9-6.6a20 20 0 000-4h3.9a9.9 9.9 0 010 4h-3.9z",
  email: "M0 4v16h24V4H0zm21.6 2L12 12.6 2.4 6h19.2zM2 18V7.9l10 6.9 10-6.9V18H2z",
};

/** Official Ordine Ermetico profiles as quiet icon links. */
export function SocialLinks({ label, tone = "dark" }: { label: string; tone?: "dark" | "light" }) {
  const color =
    tone === "dark"
      ? "border-oe-gold/30 text-oe-softwhite/75 hover:border-oe-gold hover:text-oe-gold"
      : "border-oe-rule text-oe-ink/70 hover:border-oe-bronze hover:text-oe-bronze";
  return (
    <ul aria-label={label} className="flex flex-wrap gap-3">
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`Ordine Ermetico — ${s.label}`}
            className={`grid size-11 place-items-center rounded-full border transition-colors duration-500 ${color}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[15px] fill-current">
              <path d={iconPaths[s.id]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

import type { Person } from "@/lib/db";
import { iconPaths } from "./SocialLinks";

const labels = { linkedin: "LinkedIn", x: "X", instagram: "Instagram", website: "Website", email: "Email" } as const;

/** Small icon links for a team member's public profiles. */
export function PersonLinks({ person, tone = "dark" }: { person: Person; tone?: "dark" | "light" }) {
  const entries = (Object.keys(labels) as (keyof typeof labels)[]).filter((k) => person.links[k]);
  if (!entries.length) return null;
  const color = tone === "dark" ? "border-oe-gold/30 text-oe-softwhite/75 hover:border-oe-gold hover:text-oe-gold" : "border-oe-rule text-oe-ink/70 hover:border-oe-bronze hover:text-oe-bronze";
  return (
    <ul className="flex flex-wrap gap-2.5">
      {entries.map((k) => {
        const href = k === "email" ? `mailto:${person.links.email}` : person.links[k]!;
        return (
          <li key={k}>
            <a
              href={href}
              {...(k === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              aria-label={`${person.name} — ${labels[k]}`}
              className={`grid size-10 place-items-center rounded-full border transition-colors duration-500 ${color}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[14px] fill-current">
                <path d={iconPaths[k]} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

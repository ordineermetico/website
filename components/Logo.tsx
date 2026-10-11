import Image from "next/image";
import Link from "next/link";

/**
 * Header lock-up: the supplied emblem artwork beside the wordmark set as live text
 * (no vector master exists yet, Knowledge Base 8.1).
 */
export function Logo({ href, label, tone }: { href: string; label: string; tone: "dark" | "light" }) {
  const onDark = tone === "dark";
  return (
    <Link href={href} aria-label={label} className="group flex items-center gap-3.5">
      <Image
        src={onDark ? "/brand/oe-emblem-gold-transparent.png" : "/brand/oe-emblem-bronze-transparent.png"}
        alt=""
        width={1032}
        height={993}
        priority
        className="h-10 w-auto transition-transform duration-700 ease-[var(--ease-oe)] group-hover:scale-[1.04] sm:h-11"
        sizes="48px"
      />
      <span
        className={`font-display whitespace-nowrap text-[0.9rem] tracking-[0.26em] sm:text-[1rem] ${
          onDark ? "text-oe-softwhite" : "text-oe-ink"
        }`}
        style={{ fontWeight: 500 }}
      >
        ORDINE ERMETICO
      </span>
    </Link>
  );
}

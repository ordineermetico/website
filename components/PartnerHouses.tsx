import Image from "next/image";
import type { Partner } from "@/lib/db";
import { Reveal } from "./Reveal";

/** Partner Houses band: ivory, equal optical size, one line each. Not a scrolling strip. */
export function PartnerHouses({ houses }: { houses: Partner[] }) {
  if (!houses.length) return null;
  const cols = houses.length === 1 ? "" : houses.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <ul className={`grid border-y border-oe-rule ${cols}`}>
      {houses.map((h, i) => {
        const logo = (
          <Image
            src={h.logoUrl}
            alt={h.alt}
            width={560}
            height={280}
            unoptimized={h.logoUrl.endsWith(".svg")}
            className="w-auto max-w-[16rem] object-contain"
            style={{ height: `${h.heightRem}rem` }}
            sizes="280px"
          />
        );
        return (
          <Reveal
            as="li"
            key={h.slug}
            delay={i * 150}
            className={`flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-20 ${
              i > 0 ? "border-t border-oe-rule md:border-l md:border-t-0" : ""
            }`}
          >
            <div className="flex h-28 items-center justify-center sm:h-32">
              {h.websiteUrl ? (
                <a href={h.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={h.name}>
                  {logo}
                </a>
              ) : (
                logo
              )}
            </div>
            <h3 className="sr-only">{h.name}</h3>
            <p className="mt-8 max-w-sm text-[0.98rem] leading-relaxed text-oe-graphite">{h.line}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}

import Image from "next/image";
import type { Dictionary } from "@/content";
import { Reveal } from "./Reveal";

const logos: Record<string, { src: string; width: number; height: number; className: string }> = {
  // Equal optical size: the DL monogram lock-up is taller, the Abelé wordmark wider.
  "duval-leroy": { src: "/partners/duval-leroy-logo-transparent.png", width: 560, height: 280, className: "h-[5.5rem] sm:h-[6.5rem]" },
  abele: { src: "/partners/abele-1757-logo-for-light-backgrounds.svg", width: 150, height: 68, className: "h-[4.4rem] sm:h-[5.2rem]" },
};

/** Partner Houses band: ivory, equal optical size, one line each. Not a scrolling strip. */
export function PartnerHouses({ houses }: { houses: Dictionary["partnerHouses"] }) {
  return (
    <ul className="grid border-y border-oe-rule md:grid-cols-2">
      {houses.map((h, i) => {
        const logo = logos[h.id];
        return (
          <Reveal
            as="li"
            key={h.id}
            delay={i * 150}
            className={`flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-20 ${i > 0 ? "border-t border-oe-rule md:border-l md:border-t-0" : ""}`}
          >
            <div className="flex h-28 items-center justify-center sm:h-32">
              <Image src={logo.src} alt={h.alt} width={logo.width} height={logo.height} className={`w-auto ${logo.className}`} sizes="280px" />
            </div>
            <h3 className="sr-only">{h.name}</h3>
            <p className="mt-8 max-w-sm text-[0.98rem] leading-relaxed text-oe-graphite">{h.line}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}

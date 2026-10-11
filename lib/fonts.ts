import { Cormorant_Garamond, Manrope, Tenor_Sans } from "next/font/google";

/** Self-hosted at build time by next/font. Tenor Sans lacks ₹ and →, so fallbacks are set in CSS. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const tenor = Tenor_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-tenor",
});

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
});

/** Shared validation for the contact form (client and server). */
export const iamValues = ["house", "indian-brand", "trade-partner", "other"] as const;
export const categoryValues = ["champagne", "wine", "luxury", "beauty", "other"] as const;

export type ContactInput = {
  name: string;
  organisation: string;
  email: string;
  country: string;
  iam: string;
  category: string;
  message: string;
  consent: boolean;
  lang?: string;
  /** Honeypot. Must stay empty. */
  website?: string;
};

export type FieldKey = "name" | "organisation" | "email" | "country" | "iam" | "category" | "message" | "consent";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): FieldKey[] {
  const errors: FieldKey[] = [];
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  if (s(input.name).length < 2 || s(input.name).length > 120) errors.push("name");
  if (s(input.organisation).length < 2 || s(input.organisation).length > 160) errors.push("organisation");
  if (!EMAIL_RE.test(s(input.email)) || s(input.email).length > 200) errors.push("email");
  if (s(input.country).length < 2 || s(input.country).length > 80) errors.push("country");
  if (!(iamValues as readonly string[]).includes(s(input.iam))) errors.push("iam");
  if (!(categoryValues as readonly string[]).includes(s(input.category))) errors.push("category");
  if (s(input.message).length < 20 || s(input.message).length > 5000) errors.push("message");
  if (input.consent !== true) errors.push("consent");
  return errors;
}

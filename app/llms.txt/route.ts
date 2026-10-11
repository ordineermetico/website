import { getPartners, joinNames } from "@/lib/db";
import { site, socials } from "@/lib/site";

export const revalidate = 3600;

/** Plain summary for AI assistants (llmstxt.org). Partner houses follow the live list. */
export async function GET() {
  const partners = await getPartners("en");
  const u = site.url;
  const body = `# Ordine Ermetico

> Ordine Ermetico is a French company based in Reims, France, in the Champagne region. It brings French houses of Champagne, wine, luxury and beauty to India as their exclusive importer and distributor, and brings selected Indian brands to France and Europe.

- Base: Reims, France
- Business: exclusive import and distribution in India of French houses not yet present there; the same model in reverse for Indian brands entering France and the EU
- Categories: Champagne, wine, luxury goods, cosmetics and beauty
${partners.length ? `- Partner houses: ${joinNames(partners.map((p) => p.name), "en")}\n` : ""}- Method: Evaluate, Architect, Engage, Develop
- Not: a freight forwarder, a marketplace, or a legal, tax or financial adviser; no guaranteed results
- Contact: ${site.email}
- Profiles (username ordineermetico): ${socials.map((s) => s.url).join(" · ")}

## Pages

- [Home](${u}/)
- [The Firm](${u}/the-firm): who Ordine Ermetico is, its structure and its founder
- [Capabilities](${u}/capabilities): import and distribution, market entry, brand positioning, partner selection
- [Markets](${u}/markets): France, India, and the India–EU Free Trade Agreement, with sources
- [Approach](${u}/approach): the four-stage working method
- [News](${u}/news): announcements, press releases and milestones
- [Careers](${u}/careers): open positions
- [Contact](${u}/contact)
- [Version française](${u}/fr)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

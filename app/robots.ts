import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Search and AI-search crawlers are explicitly welcome (Knowledge Base 9.6).
 * Training crawlers are allowed by default [PROPOSED]; to opt out, move them to a `disallow: "/"` rule.
 * User-agent names [VERIFY] at each review.
 */
const searchBots = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "DuckDuckBot", "Applebot"];
const trainingBots = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: [...searchBots, ...trainingBots], allow: "/", disallow: ["/api/"] },
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

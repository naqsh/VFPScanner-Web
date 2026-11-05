import type { MetadataRoute } from "next";

import { abs } from "@/lib/schema";

/**
 * robots.txt (VW-025). Search engines and AI answer engines are welcome
 * (docs/SEO-GEO-PLAYBOOK.md §4). Internal pages and API routes are not crawled.
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

const DISALLOW = ["/styleguide", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}

import type { Env } from "./env";

/**
 * Site-wide constants. Brand name and domain are placeholders until decision D1
 * (docs/tasks/todo.md) is made in VW-008.
 */
export const site = {
  name: "VFP Migration Scanner",
  shortName: "VFP Scanner",
  tagline: "Know exactly what your FoxPro application needs before you migrate.",
  description:
    "A read-only scanner for Visual FoxPro applications. It maps code, data and migration risk, and runs entirely on your PC. Fixed-price migration assessments to .NET and SQL Server.",
  locale: "en",
} as const;

/** Canonical site URL: explicit setting, then Vercel production URL, then local dev. */
export function resolveSiteUrl(env: Pick<Env, "NEXT_PUBLIC_SITE_URL" | "VERCEL_PROJECT_PRODUCTION_URL">): URL {
  if (env.NEXT_PUBLIC_SITE_URL) return new URL(env.NEXT_PUBLIC_SITE_URL);
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return new URL(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`);
  return new URL("http://localhost:3000");
}

import { z } from "zod";

/**
 * Environment validation (VW-007).
 *
 * Rules:
 * - Empty strings (e.g. copied straight from .env.example) count as "not set".
 * - A value that is set but malformed (bad URL, bad email) is always an error.
 * - A missing value only matters when the feature that needs it is enabled,
 *   so static pages build and run with no secrets at all.
 */

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalString = z.preprocess(emptyToUndefined, z.string().trim().min(1).optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.url().optional());
const optionalEmail = z.preprocess(emptyToUndefined, z.email().optional());

export const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl,
  VERCEL_PROJECT_PRODUCTION_URL: optionalString,

  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  SUPABASE_SERVICE_ROLE_KEY: optionalString,

  RESEND_API_KEY: optionalString,
  LEAD_NOTIFY_EMAIL: optionalEmail,

  PAYMENTS_PROVIDER: z.preprocess(
    emptyToUndefined,
    z.enum(["lemonsqueezy", "paddle", "invoice"]).default("invoice"),
  ),
  LEMONSQUEEZY_API_KEY: optionalString,
  LEMONSQUEEZY_STORE_ID: optionalString,
  LEMONSQUEEZY_WEBHOOK_SECRET: optionalString,

  ANTHROPIC_API_KEY: optionalString,
  ASSISTANT_MODEL: optionalString,

  TURNSTILE_SITE_KEY: optionalString,
  TURNSTILE_SECRET_KEY: optionalString,

  NEXT_PUBLIC_CAL_LINK: optionalUrl,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: optionalString,
});

export type Env = z.infer<typeof envSchema>;

export type Feature = "leads" | "payments" | "assistant" | "antispam" | "booking" | "analytics";

/** Which env vars each feature needs before it can be switched on. */
export function requiredFor(feature: Feature, env: Env): (keyof Env)[] {
  switch (feature) {
    case "leads":
      return ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY", "LEAD_NOTIFY_EMAIL"];
    case "payments":
      return env.PAYMENTS_PROVIDER === "lemonsqueezy"
        ? ["LEMONSQUEEZY_API_KEY", "LEMONSQUEEZY_STORE_ID", "LEMONSQUEEZY_WEBHOOK_SECRET"]
        : [];
    case "assistant":
      return ["ANTHROPIC_API_KEY"];
    case "antispam":
      return ["TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"];
    case "booking":
      return ["NEXT_PUBLIC_CAL_LINK"];
    case "analytics":
      return ["NEXT_PUBLIC_PLAUSIBLE_DOMAIN"];
  }
}

export const FEATURES: Feature[] = ["leads", "payments", "assistant", "antispam", "booking", "analytics"];

export type FeatureStatus = { feature: Feature; ready: boolean; missing: string[] };

export function featureStatus(env: Env): FeatureStatus[] {
  return FEATURES.map((feature) => {
    const missing = requiredFor(feature, env).filter((key) => env[key] === undefined);
    return { feature, ready: missing.length === 0, missing };
  });
}

export class EnvError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Invalid environment variables:\n- ${issues.join("\n- ")}`);
    this.name = "EnvError";
  }
}

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    throw new EnvError(result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`));
  }
  return result.data;
}

/** Throws if a feature is switched on without the env vars it needs. */
export function assertFeatureReady(feature: Feature, env: Env): void {
  const status = featureStatus(env).find((s) => s.feature === feature);
  if (status && !status.ready) {
    throw new EnvError(status.missing.map((key) => `${key}: required for "${feature}"`));
  }
}

let cached: Env | undefined;

export function getEnv(): Env {
  cached ??= parseEnv(process.env);
  return cached;
}

import { describe, expect, it } from "vitest";

import { assertFeatureReady, EnvError, featureStatus, parseEnv } from "@/lib/env";
import { resolveSiteUrl } from "@/lib/site";

describe("parseEnv", () => {
  it("accepts an empty environment (static pages need no secrets)", () => {
    const env = parseEnv({});
    expect(env.PAYMENTS_PROVIDER).toBe("invoice");
    expect(env.NEXT_PUBLIC_SITE_URL).toBeUndefined();
  });

  it("treats empty strings copied from .env.example as not set", () => {
    const env = parseEnv({ NEXT_PUBLIC_SITE_URL: "", ANTHROPIC_API_KEY: "   ", PAYMENTS_PROVIDER: "" });
    expect(env.NEXT_PUBLIC_SITE_URL).toBeUndefined();
    expect(env.ANTHROPIC_API_KEY).toBeUndefined();
    expect(env.PAYMENTS_PROVIDER).toBe("invoice");
  });

  it("rejects malformed values even when the feature is off", () => {
    expect(() => parseEnv({ NEXT_PUBLIC_SITE_URL: "not a url" })).toThrow(EnvError);
    expect(() => parseEnv({ LEAD_NOTIFY_EMAIL: "nope" })).toThrow(/LEAD_NOTIFY_EMAIL/);
    expect(() => parseEnv({ PAYMENTS_PROVIDER: "stripe" })).toThrow(/PAYMENTS_PROVIDER/);
  });
});

describe("featureStatus", () => {
  it("lists missing keys per feature", () => {
    const statuses = featureStatus(parseEnv({ ANTHROPIC_API_KEY: "sk-test" }));
    expect(statuses.find((s) => s.feature === "assistant")?.ready).toBe(true);
    expect(statuses.find((s) => s.feature === "leads")?.missing).toContain("RESEND_API_KEY");
  });

  it("only requires Lemon Squeezy keys when that provider is chosen", () => {
    const invoice = featureStatus(parseEnv({ PAYMENTS_PROVIDER: "invoice" }));
    expect(invoice.find((s) => s.feature === "payments")?.ready).toBe(true);

    const ls = featureStatus(parseEnv({ PAYMENTS_PROVIDER: "lemonsqueezy", LEMONSQUEEZY_API_KEY: "k" }));
    expect(ls.find((s) => s.feature === "payments")?.missing).toEqual([
      "LEMONSQUEEZY_STORE_ID",
      "LEMONSQUEEZY_WEBHOOK_SECRET",
    ]);
  });

  it("assertFeatureReady throws only for an enabled feature with missing keys", () => {
    const env = parseEnv({});
    expect(() => assertFeatureReady("assistant", env)).toThrow(/ANTHROPIC_API_KEY/);
    expect(() => assertFeatureReady("payments", env)).not.toThrow();
  });
});

describe("resolveSiteUrl", () => {
  it("prefers the explicit site URL, then Vercel, then localhost", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://example.com" }).href).toBe("https://example.com/");
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "vfp.vercel.app" }).href).toBe("https://vfp.vercel.app/");
    expect(resolveSiteUrl({}).href).toBe("http://localhost:3000/");
  });
});

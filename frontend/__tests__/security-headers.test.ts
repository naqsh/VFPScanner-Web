import { describe, expect, it } from "vitest";

import { buildCsp, securityHeaders } from "@/lib/security-headers";

describe("security headers", () => {
  it("sets the baseline headers", () => {
    const keys = securityHeaders(false).map((h) => h.key);
    expect(keys).toEqual(
      expect.arrayContaining([
        "Content-Security-Policy",
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "Referrer-Policy",
        "Permissions-Policy",
        "X-Frame-Options",
      ]),
    );
  });

  it("locks down framing, objects and base URI in production", () => {
    const csp = buildCsp(false);
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).not.toContain("ws:");
  });

  it("allows eval and websockets only in development (React dev tools, HMR)", () => {
    const csp = buildCsp(true);
    expect(csp).toContain("'unsafe-eval'");
    expect(csp).toContain("ws:");
  });
});

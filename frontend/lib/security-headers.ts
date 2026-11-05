/**
 * Security headers for every response (VW-007).
 *
 * Marketing pages are statically prerendered, so per-request CSP nonces are not
 * possible (see node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
 * Scripts therefore allow 'unsafe-inline' for Next.js bootstrap code; everything
 * else is locked to 'self'. Third-party origins are added here, per feature,
 * when that feature ships (Cal.com, Turnstile, Plausible in VW-E6/VW-E7).
 */

export type HeaderEntry = { key: string; value: string };

/** Extra origins per directive. Add an origin only together with the feature that needs it. */
export const THIRD_PARTY_SOURCES = {
  script: [] as string[],
  connect: [] as string[],
  frame: [] as string[],
  img: [] as string[],
};

export function buildCsp(isDev: boolean): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      ...(isDev ? ["'unsafe-eval'"] : []),
      ...THIRD_PARTY_SOURCES.script,
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", ...THIRD_PARTY_SOURCES.img],
    "font-src": ["'self'", "data:"],
    "connect-src": [
      "'self'",
      ...(isDev ? ["ws:", "wss:"] : []),
      ...THIRD_PARTY_SOURCES.connect,
    ],
    "frame-src": THIRD_PARTY_SOURCES.frame.length ? THIRD_PARTY_SOURCES.frame : ["'none'"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
  };

  return Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");
}

export function securityHeaders(isDev: boolean): HeaderEntry[] {
  return [
    { key: "Content-Security-Policy", value: buildCsp(isDev) },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
}

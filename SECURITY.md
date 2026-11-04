# Security — VFPScanner Web

## Scope

Public marketing site with forms, payments webhooks and an AI assistant. No customer code is ever uploaded in v1 — the scanner runs on the customer's PC.

## Rules

| Area | Rule |
|---|---|
| Secrets | Env vars only (`.env.example` lists names, never values). Server-only keys never use `NEXT_PUBLIC_` |
| Forms | Zod validation on server; honeypot + rate limit (per IP) + Cloudflare Turnstile on lead and contact forms |
| Payments | Verify webhook signatures; idempotency key per event id; never trust client-side price or tier |
| Assistant | Treat visitor text as untrusted; system prompt fixed server-side; answers only from `frontend/content/`; max input length; rate limit; no tool calls that write data |
| Assistant output | No legal/tax advice; no competitor claims; no prices other than `docs/PRICING.md` |
| Database | Supabase RLS on every table; inserts only via server route with service key; no public reads of leads |
| Headers | CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP via `next.config.ts` → `frontend/lib/security-headers.ts` |
| CSP and static pages | Pages are prerendered, so per-request nonces are impossible. `script-src` allows `'unsafe-inline'` (Next.js bootstrap); everything else is `'self'`. Third-party origins are added to `THIRD_PARTY_SOURCES` only with the feature that needs them |
| Privacy | GDPR: consent checkbox on forms, privacy page, data-retention note, delete-on-request process; cookieless analytics |
| Dependencies | Dependabot + `npm audit` in CI |

## Reporting

Email security issues to the contact address on the site.

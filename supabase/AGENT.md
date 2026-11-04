# Supabase AGENT.md — VFPScanner Web

## Scope

Tables for the site (created in VW-E6). RLS on every table; writes only through server route handlers with the service key.

| Table | Purpose |
|---|---|
| `leads` | Free-scan and contact requests (name, email, company, country, answers, score, consent, created_at) |
| `orders` | Payment events from the provider (event_id unique, tier, amount, currency, status) |
| `bookings` | Cal.com booking webhooks |
| `assistant_logs` | Question, answer, citations, refusal flag (no IP) |

Migrations in `supabase/migrations/` with timestamped names. Never edit an applied migration.

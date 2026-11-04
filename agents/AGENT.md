# Agents AGENT.md — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** November 2026

## Scope

Runtime AI used by the website. Each agent has its own folder with an `AGENT.md`, a fixed prompt file and typed input/output. Agents are called only from `frontend/app/api/*` route handlers — never from the browser.

| Agent | Folder | Epic |
|---|---|---|
| Assistant | `assistant/` | VW-E6 |
| Lead qualifier | `lead-qualifier/` | VW-E6 |
| Content GEO | `content-geo/` | VW-E5 (offline, dev-time only) |

## Shared Rules

| Rule | Behaviour |
|---|---|
| Result envelope | Every agent returns `{ ok, data, citations, refusal_reason, model, latency_ms }` |
| Presenter rule | Only the route handler turns agent output into user-facing content |
| Untrusted input | Visitor text is wrapped and labelled as data before it reaches the model |
| Grounding | Answers only from `frontend/content/` + `docs/PRICING.md`; cite the source page |
| Refusals | Legal/tax advice, competitor claims, anything off-topic |
| Logging | Log question, answer, citations, refusal flag to Supabase `assistant_logs` (no IP stored) |
| Cost guard | Max tokens per answer, per-IP rate limit, daily budget cap |

*Agents AGENT.md — VFPScanner Web — Version 0.1.0*

# ADR-003 — Grounded site assistant

**Status:** Proposed | **Date:** 2026-11-04

## Context

The site needs an "AI touch" that helps visitors, not a gimmick. A free-form chatbot could invent prices, legal claims or competitor statements.

## Decision

- Assistant answers only from site content (`frontend/content/*.mdx`) and `docs/PRICING.md`
- Retrieval: content chunked at build time into a small JSON index; simple keyword + embedding-free ranking for v1 (no vector DB)
- Claude API called from `app/api/assistant/route.ts`; fixed server-side system prompt; visitor text labelled as untrusted data
- Every answer cites the page(s) used; refuses legal/tax advice and competitor comparisons
- Rate limit per IP, max input 800 chars, daily budget cap
- Logs to Supabase `assistant_logs` (no IP) to find content gaps

## Consequences

- + Safe, cheap, on-message; logs feed the content plan
- − Cannot answer questions the site does not cover — by design; it offers contact instead

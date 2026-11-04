# ADR-001 — Static-first Next.js 16 on Vercel

**Status:** Proposed | **Date:** 2026-11-04

## Context

The site is mostly marketing content that must load fast and be easy for search engines and AI crawlers to read. A few dynamic parts are needed: lead form, checkout, payment webhook, assistant.

## Decision

- Next.js 16 App Router, same stack as TaskFlowAI frontend and the portfolio `SITE`
- All marketing, compliance, blog and pricing pages statically generated
- Dynamic features as Next route handlers on Vercel — no separate backend container in v1
- Content in MDX so copy can change without touching components

## Consequences

- + Fast pages, simple hosting, one repo, one deploy
- + Full HTML for crawlers (good for SEO and GEO)
- − If heavy backend work is needed later (e.g. hosted scans), add a FastAPI service like TaskFlowAI's backend — new ADR

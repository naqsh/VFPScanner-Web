# Implementation Plan — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** 2026-11-04

Progress tracker for all epics. Sync when JSON tickets or completion status change.

**Integration branch:** `epic/vfpscanner-web-implementation`

## Epic Checklist

| Epic | Summary | Branch | Tasks | Effort | Status |
|---|---|---|---|---|---|
| VW-E1 | Foundation — scaffold, Next.js 16, tooling, CI, Vercel | `epic/VW-E1-foundation` | VW-001..007 | S | ✅ 2026-11-04 (VW-006 Vercel import: owner) |
| VW-E2 | Brand and design system | `epic/VW-E2-brand-design` | VW-008..011 | S | ✅ 2026-11-04 (branch stacked on VW-E1) |
| VW-E3 | Core pages and content | `epic/VW-E3-core-pages` | VW-012..017 | M | ⬜ |
| VW-E4 | Motion graphics | `epic/VW-E4-motion` | VW-018..022 | M | ⬜ |
| VW-E5 | SEO / AIO / GEO | `epic/VW-E5-seo-geo` | VW-023..029 | M | ⬜ |
| VW-E6 | Leads, payments and AI assistant | `epic/VW-E6-leads-payments-ai` | VW-030..036 | L | ⬜ |
| VW-E7 | Launch and German version | `epic/VW-E7-launch-de` | VW-037..040 | M | ⬜ |

## Order and dependencies

```
VW-E1 → VW-E2 → VW-E3 ─┬→ VW-E4 ─┐
                        ├→ VW-E5 ─┼→ VW-E7
                        └→ VW-E6 ─┘   (VW-E6 also needs ADR-002 provider confirmed)
```

VW-E4, VW-E5 and VW-E6 can run in parallel after VW-E3.

## Task Status

| Task | Summary | Status |
|---|---|---|
| VW-001 | Repo scaffold, AGENT.md files, docs set | ✅ 2026-11-04 |
| VW-002 | Initialise Next.js 16 app in frontend/ | ✅ 2026-11-04 — Next 16.4.5, React 19.3, placeholder home |
| VW-003 | Tailwind 4 tokens + shadcn/ui base | ✅ 2026-11-04 — light/dark tokens, stage + risk colours, base-nova button, badge, card, input |
| VW-004 | Test tooling | ✅ 2026-11-04 — Vitest 14 tests (91% cov), Playwright 10 tests desktop+mobile with axe |
| VW-005 | GitHub Actions CI | ✅ 2026-11-04 — verify + e2e jobs, Dependabot |
| VW-006 | Vercel project + previews | 🟡 Guide written (`docs/guidance/vercel-setup.md`); import needs owner's Vercel login |
| VW-007 | Env validation + security headers | ✅ 2026-11-04 — Zod env + feature readiness, dev banner, CSP/HSTS/etc. |
| VW-008 | Finalise BRAND.md | ✅ 2026-11-04 — defaults: "VFP Migration Scanner", teal; original logo + icon |
| VW-009 | Final tokens + style guide | ✅ 2026-11-04 — `/styleguide` (noindex, 404 on Vercel prod), axe clean light/dark |
| VW-010 | Layout shell | ✅ 2026-11-04 — skip link, sticky header, aria-current nav, `<dialog>` mobile menu, footer, custom 404 |
| VW-011 | Base sections | ✅ 2026-11-04 — Section, Hero, FeatureGrid, Steps, ProofStats, PricingTable, Faq, CtaBand, FactBlock |
| VW-012 | MDX content pipeline | ⬜ next (VW-E3) |

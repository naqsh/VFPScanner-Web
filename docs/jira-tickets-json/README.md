# Jira Tickets (JSON) — VFPScanner Web

Same format as TaskFlowAI `TF-E*.json`: one file per epic, key = epic id, array of Epic + Task objects with `Issue id`, `Summary`, `Issue Type`, `Description` (SCOPE / USE CASES / IMPLEMENTATION DETAILS / EDGE CASES / EFFORT / DEPENDENCIES / TESTING CRITERIA), `Labels`, `Parent`.

| File | Epic | Tasks |
|---|---|---|
| VW-E1-foundation.json | Foundation | VW-001..VW-007 |
| VW-E2-brand-design.json | Brand and design system | VW-008..VW-011 |
| VW-E3-core-pages.json | Core pages and content | VW-012..VW-017 |
| VW-E4-motion.json | Motion graphics | VW-018..VW-022 |
| VW-E5-seo-geo.json | SEO / AIO / GEO | VW-023..VW-029 |
| VW-E6-leads-payments-ai.json | Leads, payments, AI | VW-030..VW-036 |
| VW-E7-launch-de.json | Launch and German | VW-037..VW-040 |

Any change here must update `docs/PLAN.md`.

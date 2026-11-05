# Implementation Plan — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** 2026-11-04

Progress tracker for all epics. Sync when JSON tickets or completion status change.

**Integration branch:** `main` (VW-E1..E3 + board script merged via PR #1, 2026-11-05)

**Order (owner, 2026-11-05):** VW-E5 SEO/GEO → VW-E6 part 1 (lead forms) → Vercel live → VW-E4 motion → VW-E6 part 2 → VW-E7

## Epic Checklist

| Epic | Summary | Branch | Tasks | Effort | Status |
|---|---|---|---|---|---|
| VW-E1 | Foundation — scaffold, Next.js 16, tooling, CI, Vercel | `epic/VW-E1-foundation` | VW-001..007 | S | ✅ 2026-11-04 (VW-006 Vercel import: owner) |
| VW-E2 | Brand and design system | `epic/VW-E2-brand-design` | VW-008..011 | S | ✅ 2026-11-04 (branch stacked on VW-E1) |
| VW-E3 | Core pages and content | `epic/VW-E3-core-pages` | VW-012..017 | M | ✅ 2026-11-04 (stacked on VW-E2) |
| VW-E4 | Motion graphics | `epic/VW-E4-motion` | VW-018..022 | M | ⬜ |
| VW-E5 | SEO / AIO / GEO | `epic/VW-E5-seo-geo` | VW-023..029 | M | ✅ 2026-11-05 |
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
| VW-012 | MDX content pipeline | ✅ `@next/mdx` + remark-gfm, `export const meta` validated by Zod, build fails naming the file |
| VW-013 | Home page | ✅ deadline hook, verified FactBlocks, steps, scan findings, proof, pricing, 6 FAQs, CTA |
| VW-014 | Scanner, Assessment, Migration, Retainer | ✅ real rule texts from Rules.cs, GoFish sample report image |
| VW-015 | Pricing, FAQ (23), About, Contact | ✅ contact form + booking disabled until VW-E6 |
| VW-016 | Free-scan page | ✅ UI + CLI steps, SmartScreen, no-.NET; download disabled until VW-031 |
| VW-017 | Legal templates | ✅ privacy, terms, refunds, imprint — template banner + noindex; **owner review before launch** |
| VW-023 | Metadata + OG images | ✅ titles ≤ 60 / descriptions ≤ 155 enforced by schema; 16 static OG images (Geist); Twitter card; verification tokens via env |
| VW-024 | JSON-LD | ✅ Organization, WebSite, BreadcrumbList (visible trail), SoftwareApplication, Service + Offer (from lib/pricing), OfferCatalog, FAQPage (only shown FAQs), HowTo, Article/TechArticle, Person; `<` escaped |
| VW-025 | sitemap, robots, llms.txt, llms-full.txt | ✅ one page registry (lib/pages.ts); templates/noindex excluded; AI crawlers allowed |
| VW-026 | Germany compliance page | ✅ `/compliance/germany-xrechnung-2027` — 5 verified facts (IHK/BMF), formats, exceptions, what changes, options |
| VW-027 | US compliance page | ✅ `/compliance/us-irs-fire-to-iris` — 4 verified facts (IRS QuickAlerts, Pub 5719), separate IRIS TCC, FIRE-file impact |
| VW-028 | Blog + 3 posts | ✅ `/blog`, macro substitution, DBF → SQL Server types, PJX sizing — all from the scanner's source |
| VW-029 | Lighthouse CI + Search Console | ✅ workflow + budgets (a11y/BP ≥ 95, SEO 100, perf fail < 90 / target 95); guide for Search Console/Bing (owner, at launch) |
| VW-030 | Supabase schema + RLS | ⬜ next (VW-E6 part 1, agreed order) |
| VW-018 | Motion primitives | ⬜ after Vercel live |

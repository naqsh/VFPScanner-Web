# VFPScanner Web — Project Proposal

**Version:** 0.1 | **Date:** 4 November 2026 | **Owner:** Kashif
**Status:** Approved for scaffold; implementation starts at VW-002 after open decisions (see `docs/tasks/todo.md`).

---

## 1. Goal

A marketing and sales website for the VFP Migration Scanner and the services built on it. It brings in leads from Germany (first) and the US, ranks in search engines and AI answers, takes payment for fixed-price offers, and feels premium with motion and an AI assistant.

Success means:
- Visitors understand the offer in under 10 seconds: "Find out what your FoxPro app needs before the 2027 e-invoicing / IRS IRIS deadline."
- They can request a free scan, buy the Assessment, or book a call.
- Pages are cited by Google AI Overviews, ChatGPT, Perplexity and Claude for "Visual FoxPro migration", "FoxPro XRechnung", "FoxPro IRS IRIS".
- Lighthouse 95+ for performance, SEO, accessibility and best practices.

## 2. Fixed rules (from the business brief)

- Lead with compliance deadlines, not "VFP is old".
- Service funnel, not self-serve SaaS: Free Scan → Assessment → Migration → Retainer.
- Never name Macrosoft or target its or its DACH partner's clients. Competitor comparisons stay generic.
- Every claim is true and backed by the scanner. No invented testimonials, logos or client counts. Real proof only: VFPX tools and three public ERPs on GitHub (19–28% duplicate or old code).
- The scanner runs on the customer's PC — "your code never leaves your machine".

## 3. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript, static-first |
| Styling | Tailwind CSS 4 (`@theme`), shadcn/ui |
| Motion | motion (Framer Motion); SVG/Lottie for the scan scene; reduced-motion fallbacks |
| Content | MDX |
| Forms and leads | React Hook Form + Zod, route handlers, Supabase with RLS |
| Email | Resend |
| Payments | Merchant of record behind `lib/payments` (ADR-002) |
| AI | Claude API via server route, grounded on site content (ADR-003) |
| Booking | Cal.com |
| Analytics | Plausible (cookieless), Search Console, Bing Webmaster |
| Deploy / CI | Vercel; GitHub Actions |
| Tests | Vitest, Testing Library, Playwright + axe, Lighthouse CI |

## 4. Folder hierarchy

See root `AGENT.md` and `frontend/AGENT.md`. Top level:

```
VFPScanner-Web/
├── AGENT.md · CLAUDE.md · README.md · SECURITY.md · .env.example
├── .claude/ · .cursor/rules/ · .github/workflows/
├── docs/ (proposal, PLAN, rules, BRAND, SEO-GEO-PLAYBOOK, PRICING, adr/, guidance/, content/, jira-tickets-json/, tasks/, learning/)
├── frontend/   Next.js 16 site
├── agents/     assistant/ · lead-qualifier/ · content-geo/
├── supabase/   migrations/
└── infrastructure/
```

## 5. Site map

| Page | Job | Main CTA |
|---|---|---|
| Home | Deadline hook, show the scan, proof, prices | Get free scan |
| Scanner | What it reads, 13 risk patterns, data profiling, runs locally | Download free scan |
| Assessment | Fixed-price 5–10 day deliverable | Buy Assessment |
| Migration | VFP → .NET 8 + SQL Server approach | Book a call |
| Retainer | Post-migration support | Subscribe / book call |
| Compliance: Germany | XRechnung/ZUGFeRD 2027–2028 for FoxPro ERPs | Free scan |
| Compliance: US | FIRE retired end-2026 → IRIS; legacy 1099 exports | Free scan |
| Sample report | Anonymised real report (once approved) | Get yours |
| Pricing · FAQ · About · Contact · Blog · Legal | — | — |

English first; German `/de` in VW-E7, hreflang ready from the start.

## 6. AI, SEO, AIO and GEO

Full rules in `docs/SEO-GEO-PLAYBOOK.md`. Summary:
- Metadata, canonical, OG images on every page; Core Web Vitals budget
- JSON-LD: Organization, Person, Service + Offer, SoftwareApplication, FAQPage, HowTo, Article, BreadcrumbList
- Answer-first sections, dated fact blocks with official sources, question-shaped headings, tables
- `llms.txt` + `llms-full.txt`; robots allows the main AI crawlers
- AI on the site: grounded "Ask about your FoxPro app" assistant + readiness check + lead qualifier

## 7. Payment structure

See `docs/PRICING.md` and `docs/adr/ADR-002-merchant-of-record.md`.

| Tier | Price | How they pay |
|---|---|---|
| Free Scan | €0 | Lead form |
| Assessment S/M/L | Fixed (suggested €1,900–€2,900) | Checkout |
| Migration | Quote, Assessment fee credited | Invoice |
| Retainer | Monthly (suggested from €490) | Subscription |

## 8. Motion and visual direction

See `docs/BRAND.md`. Dark, technical, calm; one accent; hero ScanBeam scene; RiskRadar, CountUp, CodeMorph, DeadlineTimeline; transform/opacity only; never blocks LCP; full reduced-motion fallback.

## 9. Epics

| Epic | Scope | Effort |
|---|---|---|
| VW-E1 | Foundation | S |
| VW-E2 | Brand and design system | S |
| VW-E3 | Core pages and content | M |
| VW-E4 | Motion | M |
| VW-E5 | SEO / AIO / GEO | M |
| VW-E6 | Leads, payments and AI | L |
| VW-E7 | Launch and German | M |

Tickets: `docs/jira-tickets-json/`. Progress: `docs/PLAN.md`.

*VFPScanner Web Proposal — v0.1*

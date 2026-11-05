# Frontend AGENT.md — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** November 2026

## Scope

Next.js 16 site deployed to **Vercel**: marketing pages, compliance pages, blog, pricing, forms, checkout, assistant UI, and route handlers under `app/api/`.

> Next.js 16.4 with Cache Components + Partial Prefetching on (default from create-next-app 16.4).
> Next.js 16 has breaking changes — read `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.x | App Router, Server Components, Metadata API |
| React | 19.x | UI |
| TypeScript | strict | Types |
| Tailwind CSS | 4.x | Styling via `@theme` |
| shadcn/ui | latest | UI primitives |
| motion | latest | Motion graphics |
| MDX | latest | Page and blog content |
| React Hook Form + Zod | latest | Forms and validation |
| Vitest | 5.x | Unit/component tests |
| Playwright | 1.63 (pinned, see docs/guidance/local-setup.md) | E2E + axe |
| geist | 1.x | Geist Sans/Mono, self-hosted (no Google Fonts call at build) |
| @base-ui/react | 1.x | shadcn base-nova primitives |

## Structure (✅ = exists)

```
frontend/
├── app/
│   ├── layout.tsx · globals.css · page.tsx · not-found.tsx · icon.svg   ✅
│   ├── styleguide/          ✅ internal, noindex, 404 on Vercel production
│   ├── scanner/ · assessment/ · migration/ · retainer/
│   ├── compliance/germany-xrechnung-2027/ · compliance/us-irs-fire-to-iris/
│   ├── pricing/ · sample-report/ · faq/ · about/ · contact/ · free-scan/
│   ├── blog/[slug]/ · legal/
│   ├── api/ lead/ · checkout/ · payments/webhook/ · assistant/
│   ├── sitemap.ts · robots.ts · manifest.ts · opengraph-image.tsx
│   └── llms.txt/route.ts · llms-full.txt/route.ts
├── components/
│   ├── brand/      ✅ Logo, LogoMark, ScanPanel
│   ├── layout/     ✅ SiteHeader, NavLinks, MobileMenu (<dialog>), SiteFooter
│   ├── sections/   ✅ Section, Hero, FeatureGrid, Steps, ProofStats, PricingTable, Faq, CtaBand, FactBlock
│   ├── ui/         ✅ button, badge, card, input
│   ├── seo/        ✅ JsonLd, Breadcrumbs (visible trail + BreadcrumbList)
│   ├── content/    ✅ PageHeader, Prose, CompliancePage, BlogPost, LegalPage, scanner tables
│   └── motion/ · assistant/   (VW-E4, VW-E6)
├── content/  ✅
│   ├── pages/*.mdx      # copy; `export const meta` (title, description, updated, faq, noindex, template)
│   ├── pages/legal/*.mdx
│   └── data/*.ts        # structured copy: facts.ts (verified register), scanner.ts (from Rules.cs), home.ts
├── lib/  ✅ env · security-headers · site · navigation · pricing · content · faq · blog · pages (registry) · schema (JSON-LD) · llms · mdx-sources · og · fonts · utils
│         later: payments/ · supabase/ · analytics/
├── hooks/ · public/ · __tests__/ · e2e/
```

## Rules

| Rule | Behaviour |
|---|---|
| Server Components first | Client Components only for interactivity and motion |
| Static first | Marketing pages fully static |
| Type safety | Zod-validate all inputs and external responses |
| Accessibility | WCAG 2.2 AA — keyboard nav, ARIA labels, reduced motion |
| SEO | Metadata + JSON-LD on every page (see `.cursor/rules/seo-geo.mdc`) |
| Config errors | `lib/env.ts` validates env (Zod); dev banner lists unconfigured features |
| Content | Copy lives in `content/`; pages call `defineMeta()` + `pageMetadata()` from `lib/content.ts`; FAQ answers exist once in `faq.mdx` (`lib/faq.ts` slices them) |
| SEO | New page → add to `lib/pages.ts` and `lib/mdx-sources.ts`, give it an `opengraph-image.tsx`, breadcrumbs and JSON-LD; tests fail if a page is missing from the registry |
| Facts | Dated claims only from `content/data/facts.ts` with `verified: true` and an official source |
| Navigation | All links from `lib/navigation.ts`; unbuilt pages land on `app/not-found.tsx` |
| Sections | Server Components, content via props; one `<h1>` per page (Hero); `Section` gives each block an `aria-labelledby` heading |
| Theme | Follows system light/dark; `.bg-stage` surface always dark for scanner visuals; tokens in `app/globals.css` |

## Verification Gate

```bash
npm run verify            # lint + typecheck + test + build
npm run test:e2e          # after build: Playwright desktop + mobile + axe
```

## Links

- [../AGENT.md](../AGENT.md)
- [../docs/VFPScanner-Web_Proposal.md](../docs/VFPScanner-Web_Proposal.md)

*Frontend AGENT.md — VFPScanner Web — Version 0.1.0*

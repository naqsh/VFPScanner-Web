# Frontend AGENT.md — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** November 2026

## Scope

Next.js 16 site deployed to **Vercel**: marketing pages, compliance pages, blog, pricing, forms, checkout, assistant UI, and route handlers under `app/api/`.

> The Next.js app is created in VW-002. Until then this folder holds only this file.
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
| Vitest / Playwright | latest | Tests |

## Planned Structure

```
frontend/
├── app/
│   ├── layout.tsx · globals.css · page.tsx
│   ├── scanner/ · assessment/ · migration/ · retainer/
│   ├── compliance/germany-xrechnung-2027/ · compliance/us-irs-fire-to-iris/
│   ├── pricing/ · sample-report/ · faq/ · about/ · contact/ · free-scan/
│   ├── blog/[slug]/ · legal/
│   ├── api/ lead/ · checkout/ · payments/webhook/ · assistant/
│   ├── sitemap.ts · robots.ts · manifest.ts · opengraph-image.tsx
│   └── llms.txt/route.ts · llms-full.txt/route.ts
├── components/ sections/ · motion/ · seo/ · assistant/ · ui/
├── content/            # MDX
├── lib/ payments/ · supabase/ · seo/ · schema/ · analytics/ · pricing.ts
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
| Config errors | Dev banner when required env vars are missing |

## Verification Gate

```bash
npm run lint && npm run typecheck && npm run test && npm run build
```

## Links

- [../AGENT.md](../AGENT.md)
- [../docs/VFPScanner-Web_Proposal.md](../docs/VFPScanner-Web_Proposal.md)

*Frontend AGENT.md — VFPScanner Web — Version 0.1.0*

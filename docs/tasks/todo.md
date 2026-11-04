# Active Task Plan — VFPScanner Web

**Epic:** VW-E1 Foundation ✅ → next VW-E2 Brand and design system
**Branch:** `epic/VW-E1-foundation` (from `epic/vfpscanner-web-implementation`)
**Last Updated:** 2026-11-04

## Open decisions (answer before the matching task)

| # | Decision | Needed by | Default if no answer |
|---|---|---|---|
| D1 | Public brand name and domain | VW-008 | "VFP Migration Scanner", domain TBD |
| D2 | Accent colour | VW-008 | Electric teal (in use now) |
| D3 | Assessment prices S/M/L and retainer | VW-015 | €1,900 / €2,400 / €2,900; retainer from €490/month |
| D4 | Payment provider (confirm Lemon Squeezy accepts a consulting service) | VW-032 | Invoice-only fallback until confirmed |
| D5 | Free scan: download only, or also upload | VW-016 | Download only (code stays on customer PC) |
| D6 | Public founder name/surname and LinkedIn/GitHub links for schema `sameAs` | VW-024 | First name only, GitHub repo link |

## VW-E1 — done 2026-11-04

- [x] VW-001 Scaffold: AGENT.md files, .cursor rules, docs, ADRs, tickets
- [x] Git: `main` + `epic/vfpscanner-web-implementation` pushed by owner
- [x] VW-002 Next.js 16.4.5 app in `frontend/` (AGENT.md kept, CLAUDE.md → @AGENTS.md, placeholder home)
- [x] VW-003 Tailwind 4 tokens (system light/dark, always-dark `stage`, risk colours) + shadcn base-nova components
- [x] VW-004 Vitest (14 tests, 91% coverage) + Playwright (10 tests: desktop + Pixel 7, axe light/dark, 360px, JS off, headers)
- [x] VW-005 CI (`.github/workflows/ci.yml`) + Dependabot
- [ ] VW-006 Vercel import — **owner**, follow `docs/guidance/vercel-setup.md`
- [x] VW-007 `lib/env.ts` (Zod, empty = unset, feature readiness), dev banner, security headers

### Evidence

- `npm run lint` ✅ · `npm run typecheck` ✅ · `npm run test:coverage` ✅ 14/14, 91.5% stmts · `npm run build` ✅ (static `/`) · `npx playwright test` ✅ 10/10
- `npm audit --omit=dev` 0 vulnerabilities
- Headers verified with `curl -I` on production build

### Edge cases covered (from tickets)

- create-next-app in non-empty folder → generated in temp folder and moved; AGENT.md kept
- Windows line endings → root `.gitattributes` (`* text=auto eol=lf`)
- Theme: follows system setting, pure CSS so no flash
- CI builds with empty env; no secrets needed
- Missing optional keys never break static pages; malformed values always fail
- CSP ready for Cal.com/Turnstile/Plausible via `THIRD_PARTY_SOURCES`

## VW-E2 — done 2026-11-04 (owner said "go with defaults")

**Branch:** `epic/VW-E2-brand-design`, started from `epic/VW-E1-foundation` (VW-E1 PR not merged yet; merge VW-E1 first, then VW-E2).
**Decisions applied:** D1 = "VFP Migration Scanner", domain TBD · D2 = teal accent.

- [x] VW-008 BRAND.md final; original SVG mark + wordmark; `app/icon.svg`
- [x] VW-009 Token review (contrast AA both themes); `/styleguide` page — noindex, hidden on Vercel production
- [x] VW-010 Skip link; sticky header (logo, nav with aria-current, "Get free scan" CTA); mobile menu with native `<dialog>` (Esc closes, focus returns to button, closes on link click); footer columns; custom 404 ("not published yet")
- [x] VW-011 Sections (Server Components, content via props): Hero, FeatureGrid, Steps, ProofStats, PricingTable, FAQ (`<details>`, works without JS), CtaBand, FactBlock; `lib/pricing.ts` mirrors `docs/PRICING.md` (draft prices)
- [x] Home placeholder rebuilt from the sections (real copy comes in VW-013)

### Edge cases (from VW-E2 tickets)

- 360px: no horizontal scroll; tablet 768px layout checked
- Keyboard-only: skip link first, menu usable, visible focus
- Contrast AA on every surface in both themes (axe on `/` and `/styleguide`)
- Links to pages not built yet go to the custom 404 page, not a broken screen

### Evidence

- `npm run verify` ✅ — lint, typecheck, 32 unit tests (96.6% statements), static build (`/`, `/styleguide`, 404, icon)
- `npm run test:e2e` ✅ — 36 passed, 3 skipped by design (desktop, tablet 768px, Pixel 7)
- axe: 0 violations on `/`, `/styleguide`, 404 page — light + dark, 1280px + 390px
- Screenshots reviewed: home desktop dark/light, tablet, mobile, open mobile menu, style guide

### Changes found while testing

- Full nav moved from `md` (768px) to `lg` (1024px): at 768px logo + 5 links + CTA did not fit; tablets now get the menu
- Light-theme risk colours darkened (amber 3.96:1 and green 4.48:1 on badge backgrounds → pass 4.5:1)
- Stage cards and CTA band got a faint ring: in dark mode they had the same colour as the page

## Next: VW-E3 Core pages and content (to confirm)

- [ ] VW-012 MDX content pipeline
- [ ] VW-013 Home page (real copy)
- [ ] VW-014 Scanner, Assessment, Migration, Retainer
- [ ] VW-015 Pricing, FAQ, About, Contact
- [ ] VW-016 Free-scan page
- [ ] VW-017 Legal pages (templates for owner review)

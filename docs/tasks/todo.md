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

## VW-E3 — done 2026-11-04 (owner: "go next")

**Branch:** `epic/VW-E3-core-pages`, stacked on `epic/VW-E2-brand-design` (VW-E1/E2 PRs not merged yet).
**Defaults applied:** D3 prices stay draft (labelled); D6 founder shown as "Kashif" only; location not shown on About (owner to decide).

### Facts checked before writing (2026-11-04)

| Fact | Source | Result |
|---|---|---|
| DE: receive e-invoices since 1 Jan 2025; issue from 1 Jan 2027 if 2026 turnover > €800,000; all from 1 Jan 2028 | IHK Stuttgart (15.10.2026); IHK Hannover on BMF letter of 15.10.2026 (clarifications, deadlines unchanged) | ✅ verified (BMF site blocks automated reading — owner may want to add the BMF FAQ link by hand) |
| US: last day to file through FIRE 19 Nov 2026, 3 p.m. ET; IRIS only e-filing system from Jan 2027 | IRS QuickAlerts, September 2026 | ✅ verified — **brief said "end of December": out of date** |
| Scanner has 13 risk rules + 5 compliance signals | `VFPScanner-v0.2/Rules.cs` | ✅ (README list omits SQL pass-through) |
| 19–28% duplicates/old copies | README: **two** open-source ERPs | ✅ corrected from "three" |
| .NET 8 end of support 10 Nov 2026 | .NET Blog | ✅ → migration target "current LTS (.NET 10)"; scanner itself should move off net8.0 |

### Plan

- [x] VW-012 `@next/mdx` + `remark-gfm`; `content/pages/*.mdx` with `export const meta` validated by Zod (`lib/content.ts`); invalid meta fails build naming the file; `mdx-components.tsx` prose styles; test validates every MDX file
- [x] VW-013 Home: deadline hook → problem → how it works → what the scan finds → proof → pricing teaser → FAQ (6) → CTA; FactBlocks with verified sources
- [x] VW-014 Scanner (file types, 13 rules with real "why it matters", data profile, clean-up, compliance signals, privacy, known limits, GoFish sample report image), Assessment (deliverables, 5–10 days, S/M/L, button → contact), Migration (phases, .NET LTS + SQL Server), Retainer
- [x] VW-015 Pricing (table + notes), FAQ (20–30, grouped), About (no ex-employer), Contact (form + booking placeholders, disabled until VW-E6)
- [x] VW-016 Free scan: what it does, needs, UI + CLI steps, what to share, SmartScreen + no-.NET answers
- [x] VW-017 Privacy, Terms, Refunds, Imprint — templates with placeholders, "review before launch" banner, noindex

### Edge cases

- Invalid MDX meta → build error naming the file
- Pages read well with JS off and motion off
- No invented proof; Macrosoft never mentioned (test scans all content)
- Legal pages clearly marked as templates, not indexed

### New open decisions

| # | Decision | Needed by |
|---|---|---|
| D7 | Public contact email (and domain) | VW-031 / launch |
| D8 | Publish scanner as self-contained Windows exe (no .NET install) and move it off .NET 8 | VW-016 download / launch |
| D9 | Show location (Pakistan) on About? Imprint needs a postal address anyway | VW-017 review |

### Evidence (VW-E3)

- `npm run verify` ✅ — lint, typecheck, 70 unit tests (90% statements), static build of 18 routes
- `npm run test:e2e` ✅ — 79 passed, 17 skipped by design; every page: 200, one h1, axe 0 violations light + dark, no horizontal scroll (desktop + Pixel 7)
- Content tests: every MDX meta valid and renders; legal pages are templates + noindex; 23 FAQs, 6 featured; 13 risk rules / 5 signals; all facts verified; no ex-employer name in any source file
- Screenshots reviewed: home dark/light, scanner, assessment, pricing, free scan (mobile), FAQ (mobile dark), privacy

### Owner review before launch (promises and policies written as defaults)

- [ ] Assessment process: "kick-off call about 45 minutes", "questions in writing", "you keep the report" (assessment.mdx)
- [ ] "We can work under your NDA" (assessment.mdx, faq.mdx, contact.mdx)
- [ ] Retainer contents: fixes, small changes, security patches, format updates (retainer.mdx)
- [ ] About page wording, first person (about.mdx)
- [ ] Draft prices (D3) — `docs/PRICING.md` + `frontend/lib/pricing.ts`
- [ ] Legal templates: fill every [placeholder] in `content/pages/legal/*.mdx`, then set `template: false`
- [ ] D8: self-contained Windows exe and move scanner off .NET 8 — the free-scan page says the download "will be" a single file

## Integration branch

`main` from 2026-11-05 (owner). PR #1 merged VW-E1..E3 and the board script into `main`. Owner fast-forwards the old branch once: `git push origin main:epic/vfpscanner-web-implementation`.

## VW-E5 — done 2026-11-05 (owner: "yes" to the new order)

**Branch:** `epic/VW-E5-seo-geo` from `main`. Order after this: VW-E6 part 1 (leads) → Vercel live → VW-E4.

### Facts checked for the compliance pages (2026-11-05)

| Fact | Source |
|---|---|
| DE: e-invoice = structured format (XRechnung, ZUGFeRD from 2.0.1, EN 16931 formats); PDF by email is an "other invoice" | IHK Stuttgart (15.10.2026), § 14 UStG |
| DE: exceptions — small invoices up to €250 (§ 33 UStDV), tickets (§ 34 UStDV), B2C, certain tax-exempt supplies | IHK Stuttgart |
| DE: until 31.12.2026 paper always allowed, other e-formats with recipient consent; in 2027 EDI with consent; receiving has no transition | IHK Stuttgart |
| US: IRIS Taxpayer Portal (manual or CSV, up to 100 records per upload) and A2A (XML; schemas for Software Developer TCC); a FIRE TCC cannot be used for IRIS; apply at irs.gov/iristcc | IRS Pub 5719 (PY 2027) |
| Scanner type mapping, data issues, PJX type codes | `VFPScanner-v0.2/Scanner.cs` (SqlType, table issues, ProjectTypeLabel) |

### Plan

- [x] VW-023 Metadata: titles ≤ 60, descriptions ≤ 155 (schema tightened), canonical, Twitter card, generated OG images per page (Geist fonts), verification meta from env
- [x] VW-024 JSON-LD: `components/seo/JsonLd.tsx` (escaped), builders in `lib/schema/`; Organization + WebSite site-wide; breadcrumbs on inner pages; SoftwareApplication, Service + Offer (prices from `lib/pricing.ts`), FAQPage (only FAQs shown on that page), HowTo, Article, Person
- [x] VW-025 `sitemap.ts` (indexable pages only), `robots.ts` (AI crawlers allowed, `/styleguide` disallowed), `llms.txt`, `llms-full.txt`
- [x] VW-026 `/compliance/germany-xrechnung-2027` — answer-first, verified FactBlocks, what a FoxPro ERP must change, bridge vs migration, not legal advice
- [x] VW-027 `/compliance/us-irs-fire-to-iris` — same structure, IRS sources, FIRE-file impact, separate IRIS TCC
- [x] VW-028 Blog index + 3 posts (macro substitution; DBF → SQL Server types; reading a PJX), from the scanner's own source; static routes (no `[slug]`, see lessons)
- [x] VW-029 Lighthouse CI workflow + budgets; run Lighthouse locally; Search Console/Bing tokens via env (owner adds at launch)
- [x] Board: `docs/github/project-status.json` updated per task

### Edge cases

- Offer prices must equal `lib/pricing.ts` (test)
- No JSON-LD for content not on the page (FAQPage only from rendered FAQs)
- JSON-LD safe against `</script>` injection
- noindex pages (legal templates, styleguide, 404) never in sitemap or llms.txt
- Compliance pages: every dated claim from `facts.ts` (verified), "not legal advice" visible

### Evidence (VW-E5)

- `npm run verify` ✅ — lint, typecheck, 94 unit tests (85% statements), 44 static routes incl. 16 OG images, sitemap, robots, llms.txt, llms-full.txt
- `npm run test:e2e` ✅ — 109 passed, 59 skipped by design: every page axe-clean light/dark, one h1, no horizontal scroll; SEO spec: canonical, OG image 200 PNG, JSON-LD parses with Organization/WebSite/BreadcrumbList, FAQPage only lists visible questions, robots/sitemap/llms content types, heading anchors
- Lighthouse (5 pages × 3 runs, mobile): performance 92–98, accessibility 98–100, best practices 100, SEO 100. Simulated LCP 2.8–3.2 s (warn); measured LCP 0.3 s
- Unit: offers equal lib/pricing.ts, `</script>` cannot escape JSON-LD, templates never in sitemap/llms, every page has a route + MDX source

### Owner (VW-E5)

- [ ] At launch: Search Console + Bing verification (`docs/guidance/search-console.md`)
- [ ] Review the two compliance pages and the three blog posts (technical claims are from the scanner source and the cited official pages)
- [ ] Decide: keep performance budget at "fail < 90, target 95", or invest in reducing framework JS later

## Next: VW-E6 part 1 — lead forms (agreed order)

- [ ] VW-030 Supabase schema + RLS (needs a free Supabase project — owner)
- [ ] VW-031 Free-scan + contact forms: Zod, Turnstile, honeypot, rate limit, Resend email (needs Resend + Turnstile keys and D7 contact email — owner)
- [ ] Then: Vercel live (VW-006), then VW-E4 motion

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

## Next: VW-E2 plan (to confirm)

- [ ] VW-008 BRAND.md final (D1, D2)
- [ ] VW-009 Final tokens + `/_style` page (noindex)
- [ ] VW-010 Header, nav, footer, mobile menu
- [ ] VW-011 Base sections: Hero, FeatureGrid, Steps, ProofStats, PricingTable, FAQ, CTA band, FactBlock

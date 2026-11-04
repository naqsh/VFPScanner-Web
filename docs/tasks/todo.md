# Active Task Plan — VFPScanner Web

**Epic:** VW-E1 Foundation | **Branch:** `epic/VW-E1-foundation` (after git init)
**Last Updated:** 2026-11-04

## Open decisions (answer before the matching task)

| # | Decision | Needed by | Default if no answer |
|---|---|---|---|
| D1 | Public brand name and domain | VW-008 | "VFP Migration Scanner", domain TBD |
| D2 | Accent colour | VW-008 | Electric teal |
| D3 | Assessment prices S/M/L and retainer | VW-015 | €1,900 / €2,400 / €2,900; retainer from €490/month |
| D4 | Payment provider (confirm Lemon Squeezy accepts a consulting service) | VW-032 | Invoice-only fallback until confirmed |
| D5 | Free scan: download only, or also upload | VW-016 | Download only (code stays on customer PC) |
| D6 | Public founder name/surname and LinkedIn/GitHub links for schema `sameAs` | VW-024 | First name only, GitHub repo link |

## VW-E1 plan

- [x] VW-001 Scaffold: AGENT.md files, .cursor rules, docs, ADRs, tickets (2026-11-04)
- [x] Git: repo initialised, first commit on `main` + `epic/vfpscanner-web-implementation`, remote `origin` = https://github.com/naqsh/VFPScanner-Web.git (2026-11-04)
- [ ] Owner pushes from PC: `git push -u origin main epic/vfpscanner-web-implementation`
- [ ] VW-002 Next.js 16 app in `frontend/` (keep `frontend/AGENT.md`)
- [ ] VW-003 Tailwind 4 tokens + shadcn/ui base
- [ ] VW-004 Vitest + Playwright + axe
- [ ] VW-005 CI workflow
- [ ] VW-006 Vercel project + previews
- [ ] VW-007 Env validation + security headers

## Verification for VW-E1

`cd frontend && npm run lint && npm run typecheck && npm run test && npm run build` + preview URL + green CI.

**Status:** waiting for owner confirmation to start VW-002.

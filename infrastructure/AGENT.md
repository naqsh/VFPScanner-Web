# Infrastructure AGENT.md — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** November 2026

## Scope

CI/CD and Vercel deployment.

## Branch Policy

| Branch | Purpose |
|---|---|
| `main` | Integration branch (owner decision 2026-11-05) |
| `epic/VW-E{n}-{name}` | Per-epic work branch |

Merge with **merge commit** after CI passes. Delete local epic branch; keep remote.

## CI Workflows (VW-005, VW-E5)

| Workflow | Trigger | Purpose |
|---|---|---|
| `.github/workflows/ci.yml` | PR + push to integration | lint, typecheck, test, build, npm audit |
| `.github/workflows/lighthouse.yml` | PR + push to `main` | Lighthouse CI: 5 pages × 3 runs (mobile); a11y ≥ 95, best practices ≥ 95, SEO 100, performance fail < 90 / target 95; config `frontend/lighthouserc.json` |

## Vercel

- Project root: `frontend/`
- Preview deploy per PR; `main` is the Vercel production branch, but the public domain is only attached in VW-E7
- Env vars set in Vercel, mirrored by names in `.env.example`
- `vercel.json` only if headers/redirects cannot live in `next.config.ts`

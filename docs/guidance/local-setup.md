# Local setup — VFPScanner Web

## Needs

- Node.js 20.9+ (22 recommended)
- Git

## First run

```bash
cd frontend
npm install
npx playwright install chromium     # once, for e2e tests
npm run dev                          # http://localhost:3000
```

No `.env.local` is needed for the static pages. In dev, a yellow banner lists features whose keys are not set yet (leads, payments, assistant, ...). Copy names from the root `.env.example` into `frontend/.env.local` when a feature is built.

## Commands

| Command | What |
|---|---|
| `npm run dev` | Dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route types + `tsc --noEmit` |
| `npm run test` | Vitest unit/component tests |
| `npm run test:coverage` | Same, with coverage thresholds (75%) |
| `npm run build` | Production build |
| `npm run test:e2e` | Playwright (desktop + mobile, axe a11y). Run `npm run build` first |
| `npm run verify` | lint + typecheck + test + build (the done gate) |

## Notes

- `@playwright/test` is pinned to 1.63.0 with an `overrides` entry for `playwright-core`, so `@axe-core/playwright` uses the same version. Upgrade both together.
- Add shadcn components with `npx shadcn@latest add <name>` (config in `components.json`, style base-nova, same as TaskFlowAI).
- Next.js 16 differs from older docs: read `frontend/node_modules/next/dist/docs/` for any API you are unsure of.

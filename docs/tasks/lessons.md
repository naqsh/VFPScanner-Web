# Lessons Learned — VFPScanner Web

Format: **Date | Mistake Pattern | Root Cause | Rule to Prevent Recurrence**

Carried over from TaskFlowAI where relevant:

| Date | Mistake Pattern | Root Cause | Rule |
|---|---|---|---|
| 2026-07-08 (TaskFlowAI) | Epic marked done with scaffold-only integrations | Paths existed but were not wired through the hot path | Before marking an integration task done, trace the real flow end to end (form → route → DB → email; checkout → webhook → order) |
| 2026-07-09 (TaskFlowAI) | Feature marked done with only unit tests passing | Wiring into the caller was never checked | Add at least one test that exercises the feature through its public entry point |

## Project-specific

| Date | Mistake Pattern | Root Cause | Rule |
|---|---|---|---|
| 2026-11-04 | shadcn CLI could not reach ui.shadcn.com from the cloud workspace | Registry host not on the network allowlist | Reuse TaskFlowAI's base-nova components or hand-write small ones; run `npx shadcn add` from the owner's PC when a big component is needed |
| 2026-11-04 | `@axe-core/playwright` types clashed with `@playwright/test` | axe pulled a newer `playwright-core` than the pinned test runner | Keep `overrides.playwright-core` equal to the `@playwright/test` version; upgrade both together |
| 2026-11-04 | Unit tests saw two mobile menus at once | React Testing Library auto-cleanup only runs with Vitest globals, which are off | Keep `afterEach(cleanup)` in `vitest.setup.ts` |
| 2026-11-04 | Desktop nav squeezed at 768px tablets | `md` breakpoint is exactly 768px; logo + 5 links + CTA need ~900px | Primary nav shows from `lg`; keep the `tablet` Playwright project so breakpoint regressions fail CI |
| 2026-11-04 | Risk badges failed AA in light theme | Tinted badge background lowers contrast of the same-hue text | Check semantic colours on their tinted backgrounds, not only on white; axe runs on `/styleguide` which shows every badge |
| 2026-11-04 | Brief said FIRE retires "end of December 2026"; IRS says last filing day is 19 Nov 2026 | Business brief written from memory, not re-checked | Check every dated claim against the official source on the day it is written; keep it in `facts.ts` with `lastReviewed` |
| 2026-11-04 | Site claimed "three ERPs" for the 19–28% figure; scanner README says two | Brief and tool docs disagreed | The scanner's own README/Rules.cs is the source of truth for scanner claims |
| 2026-11-04 | Copy promised things not yet true ("single-file download", "scans in minutes", refund rules) | Writing ahead of the product | Future features use "will"; unmeasured speed claims are not allowed; policy terms go in templates for the owner |
| 2026-11-04 | `dynamicParams` export broke the build; unknown `[slug]` still returned 200 | Cache Components forbids it and streams the shell before `notFound()` | For a fixed set of pages use static routes; with Cache Components avoid dynamic segments that must 404 |
| 2026-11-04 | axe `scrollable-region-focusable` on tables and code blocks | Horizontally scrollable areas were not keyboard reachable | Scroll containers get `tabIndex={0}` (+ `role="region"` and a label for tables) |
| 2026-11-04 | `import.meta.glob(..., { query: "?raw" })` returned objects for .mdx | The MDX plugin transforms raw imports too | Read source text with `node:fs` in tests |
| 2026-11-04 | Plan said "CSP report-only first" | Static prerendered pages cannot carry nonces, and report-only with no report endpoint gives no protection | Ship an enforced baseline CSP (`'unsafe-inline'` scripts, everything else `'self'`); revisit hashes/SRI later |

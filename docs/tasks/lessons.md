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
| 2026-11-04 | Plan said "CSP report-only first" | Static prerendered pages cannot carry nonces, and report-only with no report endpoint gives no protection | Ship an enforced baseline CSP (`'unsafe-inline'` scripts, everything else `'self'`); revisit hashes/SRI later |

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
| — | — | — | — |

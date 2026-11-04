# Token Efficiency Rules — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** November 2026

**Read before `docs/KICKOFF-PROMPT.md`.**

## 1. What to Read (and Skip)

| Read every session (in order) | Skip unless the task needs it |
|---|---|
| `docs/tasks/checkpoint.md` | `docs/KICKOFF-PROMPT.md` |
| `docs/tasks/lessons.md` | Other epic JSON files |
| `AGENT.md` | `docs/SEO-GEO-PLAYBOOK.md` (unless SEO task) |
| `docs/TOKEN-EFFICIENCY.md` | `docs/BRAND.md` (unless design task) |
| `docs/PLAN.md` | Full `.cursor/rules/*` |
| `docs/EXECUTION-RULES.md` | `docs/content/` drafts |

Fresh kickoff only: `docs/KICKOFF-PROMPT.md`, the current epic JSON, the relevant `.cursor/rules/*.mdc`.

## 2. Tool Use

| Do | Don't |
|---|---|
| Grep/Glob then targeted Read | Read whole directories |
| Read with offset/limit on large files | Re-read checkpoint-covered files |
| Batch independent tool calls | Sequential discovery |
| Read Next.js 16 docs only for the API in use | Read all of `node_modules/next/dist/docs/` |

## 3. Implementation Discipline

- Minimal diffs — change only what the task requires
- Checkpoint is truth — resume from `checkpoint.md`

## 4. Context Handoff

Write `docs/tasks/checkpoint.md` at ~75% context. Commit WIP before session end.

*Token Efficiency Rules — VFPScanner Web — Version 0.1.0*

# FINAL EXECUTION RULES — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** November 2026

Source of truth for execution standards. Applies to all development agents on this project.

## 1. Production-Ready Requirements

- **No pseudo-code** — working implementations only
- **No fabricated proof** — no fake testimonials, logos, client counts or metrics
- **No untyped inputs** — Zod on every form, route handler and external response
- **No hardcoded secrets** — env vars only
- **Static first** — marketing pages render without client JS for content

## 2. Workflow

### MUST Do

1. Plan mode for tasks with 3+ steps or design decisions
2. Write plan to `docs/tasks/todo.md` before coding
3. Frontend verification gate:
   ```bash
   cd frontend && npm run lint && npm run typecheck && npm run test && npm run build
   ```
4. Read `docs/tasks/lessons.md` at session start
5. Update `docs/tasks/lessons.md` after any correction
6. Prove done with tests, build output, Lighthouse report or screenshots
7. Implement all `EDGE CASES` from ticket descriptions
8. Follow `docs/TOKEN-EFFICIENCY.md`

### MUST NOT Do

- Implement before the plan is confirmed
- Mark done without evidence
- Edit out-of-scope files
- Publish AI-drafted copy without human review
- Name Macrosoft or make unverifiable competitor claims

## 3. Agent Rules (runtime AI)

- All agents return the shared result envelope (`agents/AGENT.md`)
- Only route handlers produce user-facing content
- Visitor text is untrusted and labelled before reaching the model
- Assistant answers only from site content and cites sources

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind 4, shadcn/ui, motion, MDX |
| Data | Supabase PostgreSQL with RLS |
| Payments | Merchant of record (ADR-002) |
| AI | Claude API via server route (ADR-003) |
| Deploy | Vercel |
| CI | GitHub Actions — lint, typecheck, Vitest, Playwright, build, Lighthouse |

## 5. Testing

- Vitest > 75% on `lib/` and route handlers
- Playwright for key flows + axe accessibility
- Lighthouse budgets from VW-E5

## 6. Documentation Sync

| Trigger | Action |
|---|---|
| JSON ticket changed | Update `docs/PLAN.md` |
| Task completed | Update `docs/tasks/todo.md` and `docs/github/project-status.json`, then run `node scripts/github-project/sync-project.mjs` |
| User correction | Update `docs/tasks/lessons.md` |
| New agent folder | Create co-located `AGENT.md` |
| Price changed | Update `docs/PRICING.md` + `frontend/lib/pricing.ts` |

## 7. Context Management

At ~75% context, write `docs/tasks/checkpoint.md` (epic, branch, current task, files touched, next steps). Commit WIP.

## 8. Git Branch Policy

| Branch | Purpose |
|---|---|
| `epic/vfpscanner-web-implementation` | Long-lived integration branch |
| `epic/VW-E{n}-{name}` | Per-epic work branch |

Merge epics with **merge commit**. Delete local epic branch after merge; keep remote.

*VFPScanner Web Execution Rules — Version 0.1.0*

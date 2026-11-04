# Kick-off Prompt — VFPScanner Web

**Version:** 0.1.0 | **Last Updated:** November 2026

## Pre-Flight Checklist

- [x] Root `AGENT.md` and `docs/EXECUTION-RULES.md` exist
- [x] `docs/jira-tickets-json/` contains VW-E1 through VW-E7
- [x] `docs/tasks/todo.md`, `lessons.md`, `checkpoint.md` exist
- [x] `.cursor/rules/` contains coding, design-motion, seo-geo, testing, docs
- [x] Git repository initialised (`main` + `epic/vfpscanner-web-implementation`), remote https://github.com/naqsh/VFPScanner-Web.git
- [ ] Open decisions in `docs/tasks/todo.md` answered

## Kick-off Prompt (Copy This)

```
You are implementing VFPScanner Web from the scaffolded repo.

## Read First (In Order)
1. AGENT.md
2. docs/TOKEN-EFFICIENCY.md
3. docs/EXECUTION-RULES.md
4. docs/tasks/checkpoint.md
5. docs/PLAN.md

## Project Overview
- Marketing + sales site for the VFP Migration Scanner and services
- Funnel: Free Scan → Assessment (fixed price) → Migration (quote) → Retainer (monthly)
- Hooks: Germany e-invoicing 2027/2028, US IRS FIRE → IRIS
- Next.js 16 static-first on Vercel; Supabase for leads; merchant-of-record payments; grounded Claude assistant
- Professional look, motion graphics, SEO + AIO + GEO

## Mission
Implement the current epic from docs/jira-tickets-json/:
1. Branch from epic/vfpscanner-web-implementation
2. Read epic JSON — implement IMPLEMENTATION DETAILS and all EDGE CASES
3. Write plan to docs/tasks/todo.md and check in before coding
4. Frontend verification gate before marking tasks done
5. Update docs/PLAN.md on completion

## Verification Gate
cd frontend && npm run lint && npm run typecheck && npm run test && npm run build

## Start
Continue VW-E3 from docs/jira-tickets-json/VW-E3-core-pages.json (next task: VW-012)
```

*Kick-off Prompt — VFPScanner Web — Version 0.1.0*

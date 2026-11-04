# VFPScanner Web

Repo: https://github.com/naqsh/VFPScanner-Web

Marketing and sales website for the VFP Migration Scanner and the services built on it: Free Scan → Migration Assessment → Migration → Retainer.

- Spec: `docs/VFPScanner-Web_Proposal.md`
- Progress: `docs/PLAN.md`
- Rules for humans and agents: `AGENT.md`

## Structure

| Folder | What |
|---|---|
| `frontend/` | Next.js 16 site (created in VW-E1, task VW-002) |
| `agents/` | Site AI agents (assistant, lead qualifier, content GEO) |
| `supabase/` | Database migrations for leads, orders, bookings |
| `infrastructure/` | Vercel config, CI notes |
| `docs/` | Spec, plan, epics, ADRs, playbooks, task log |

## Status

Scaffold only. Next step: VW-E1 (`docs/jira-tickets-json/VW-E1-foundation.json`).

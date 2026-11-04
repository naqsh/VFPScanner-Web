# AGENT.md — VFPScanner Web

## What this file is

Root index for the VFPScanner marketing and sales website. Engineering standards, agent specs and prompt rules live in co-located `AGENT.md` files alongside the code they govern.

**Architecture:** Static-first Next.js 16 | Grounded AI assistant | Supabase (leads) | Merchant-of-record payments | Vercel
**Deployment:** Vercel (frontend + route handlers)
**Version:** 0.1.0 | November 2026

> **Spec:** [docs/VFPScanner-Web_Proposal.md](docs/VFPScanner-Web_Proposal.md) v0.1
> **Integration branch:** `epic/vfpscanner-web-implementation`

---

## Workflow Rules (read at every session start)

| Rule | Behaviour |
|---|---|
| Token usage | Follow `docs/TOKEN-EFFICIENCY.md` — read before `docs/KICKOFF-PROMPT.md` |
| Plan mode | Required for any epic/task with 3+ steps — check `docs/jira-tickets-json/*.json` |
| Edge cases | Review `Description` in JSON tickets — implement every item under `EDGE CASES` |
| Task log | Write plan to `docs/tasks/todo.md` before any implementation |
| Verify plan | Check in before starting — do not build on an unconfirmed plan |
| Lessons review | Read `docs/tasks/lessons.md` at session start before touching code |
| Correction loop | After any mistake is made or corrected by a user: update `docs/tasks/lessons.md` immediately |
| Done gate | Never mark complete without proving it works (tests, build, Lighthouse, screenshots) |
| Frontend verification gate | `cd frontend && npm run lint && npm run typecheck && npm run test && npm run build` |
| Truth in marketing | No invented testimonials, client logos, counts or results — only facts in `docs/VFPScanner-Web_Proposal.md` §2 |
| Ex-Macrosoft rule | Never name Macrosoft or target its/its DACH partner's clients; competitor comparisons stay generic |
| Grounded AI | The site assistant answers only from `frontend/content/` and cites the page; no legal advice |
| Security first | Check `SECURITY.md` before touching forms, webhooks, assistant inputs/outputs |
| No secrets | Never hardcode keys — `.env.example` only |
| Json sync | JSON ticket changes MUST update `docs/PLAN.md` |
| Context checkpoint | At ~75% context, write `docs/tasks/checkpoint.md` and commit WIP |

---

## Delivery Overview

| Epic | Scope Summary | Status |
|---|---|---|
| **VW-E1** | Foundation — scaffold, docs, Next.js 16, tooling, CI, Vercel preview | ✅ Done (Vercel import by owner) |
| **VW-E2** | Brand and design system | Planned |
| **VW-E3** | Core pages and content | Planned |
| **VW-E4** | Motion graphics | Planned |
| **VW-E5** | SEO / AIO / GEO | Planned |
| **VW-E6** | Leads, payments and AI assistant | Planned |
| **VW-E7** | Launch and German (`/de`) | Planned |

---

## Where to look

| Concern | File |
|---|---|
| Full specification | docs/VFPScanner-Web_Proposal.md |
| Execution discipline | docs/EXECUTION-RULES.md |
| Epic tasks | docs/jira-tickets-json/VW-E*.json |
| Implementation progress | docs/PLAN.md |
| Token efficiency | docs/TOKEN-EFFICIENCY.md |
| Kick-off prompt | docs/KICKOFF-PROMPT.md |
| Active task plan | docs/tasks/todo.md |
| Self-improvement log | docs/tasks/lessons.md |
| Brand, voice, colours | docs/BRAND.md |
| SEO / AIO / GEO rules | docs/SEO-GEO-PLAYBOOK.md |
| Pricing and payments | docs/PRICING.md |
| Decisions | docs/adr/ADR-*.md |
| Security | SECURITY.md |
| Frontend rules | frontend/AGENT.md |
| Site AI agents | agents/AGENT.md |
| Database (leads, orders) | supabase/AGENT.md |
| Local setup / Vercel | docs/guidance/local-setup.md, docs/guidance/vercel-setup.md |
| CI/CD & Vercel | infrastructure/AGENT.md |

---

## Development Agents

| Agent | Scope | Rules File | Order |
|---|---|---|---|
| **Coding Agent** | Pages, components, route handlers | `.cursor/rules/coding.mdc` | 1st |
| **Design & Motion Agent** | Tokens, layout, animation, reduced motion | `.cursor/rules/design-motion.mdc` | 2nd |
| **SEO/GEO Agent** | Metadata, JSON-LD, llms.txt, answer-first copy | `.cursor/rules/seo-geo.mdc` | 3rd |
| **Testing Agent** | Vitest, Playwright, Lighthouse, a11y | `.cursor/rules/testing.mdc` | 4th |
| **Documentation Agent** | AGENT.md, PLAN.md, lessons sync | `.cursor/rules/docs.mdc` | 5th |

Epic workflow: branch from `epic/vfpscanner-web-implementation` → implement → design/motion → SEO/GEO → test → docs → PR → merge commit.

## Site AI Agents (runtime)

| Agent | Folder | Job |
|---|---|---|
| Assistant | `agents/assistant/` | Answers visitor questions from site content, hands off to free scan / booking |
| Lead qualifier | `agents/lead-qualifier/` | Scores leads by region, deadline, app size |
| Content GEO | `agents/content-geo/` | Drafts FAQ/compliance copy — human review before publish |

---

*VFPScanner Web — Version 0.1.0 — November 2026*

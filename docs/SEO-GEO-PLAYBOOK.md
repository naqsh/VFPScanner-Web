# SEO / AIO / GEO Playbook — VFPScanner Web

## 1. Entities (use exactly)

| Entity | Name | Schema type |
|---|---|---|
| Organisation | TODO(brand) | Organization |
| Founder | Kashif TODO(surname as public) | Person |
| Tool | VFP Migration Scanner | SoftwareApplication (free) |
| Service | VFP Migration Assessment | Service + Offer |
| Service | VFP to .NET Migration | Service |
| Service | Post-migration Retainer | Service + Offer |

`sameAs`: LinkedIn, GitHub (naqsh/VFPScanner) — TODO(confirm public).

## 2. Keyword clusters

| Cluster | Example queries | Target page |
|---|---|---|
| Migration | visual foxpro migration, foxpro to .net, vfp to c#, migrate foxpro to sql server | /migration, /assessment |
| Assessment | foxpro code analysis, vfp migration cost, how big is my foxpro app | /scanner, /assessment |
| Germany | foxpro xrechnung, e-rechnung 2027 altsystem, zugferd foxpro | /compliance/germany-xrechnung-2027 |
| US | irs fire retirement, fire to iris 1099 legacy system, foxpro 1099 export | /compliance/us-irs-fire-to-iris |
| Technical long-tail | foxpro macro substitution migration, dbf to sql server data types, scx form to winforms | /blog/* |

## 3. Schema map

| Page | JSON-LD |
|---|---|
| All | Organization, WebSite, BreadcrumbList |
| Home | + SoftwareApplication, Service list, FAQPage (top 6) |
| Scanner | SoftwareApplication, HowTo (run a scan) |
| Assessment / Retainer | Service + Offer (price, currency, availability) |
| Compliance pages | Article (with dateModified), FAQPage |
| Pricing | Offer list, FAQPage |
| FAQ | FAQPage |
| Blog post | Article / TechArticle, author Person |
| About | Person, Organization |

## 4. AIO / GEO rules

1. Answer-first: each section opens with a 1–2 sentence direct answer
2. Fact blocks: date + rule + official source link + "last reviewed" date
3. Question-shaped H2s ("Does my FoxPro ERP need to send XRechnung in 2027?")
4. Tables for comparisons (AI answers lift tables well)
5. `llms.txt` (summary + key URLs) and `llms-full.txt` (full plain-text content)
6. `robots.txt` allows: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended
7. Same facts, same wording across site, LinkedIn and GitHub README
8. Fresh: compliance pages reviewed monthly until the deadlines pass

## 5. Facts register (verify before publish)

| Fact | Source | Status |
|---|---|---|
| Germany: B2B e-invoice issuing mandatory from 1 Jan 2027 for 2026 turnover > €800,000; from 1 Jan 2028 for all | [IHK Stuttgart](https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496) (15.10.2026), based on BMF; BMF letter 15.10.2026 adds clarifications only ([IHK Hannover](https://www.ihk.de/hannover/hauptnavigation/recht/aktuell3/e-rechnung-bmf-veroeffentlicht-weitere-klarstellungen-7211944)) | ✅ verified 2026-11-04 |
| Germany: receiving e-invoices mandatory since 1 Jan 2025 | IHK Stuttgart (as above) | ✅ verified 2026-11-04 |
| US: last day to file through FIRE 19 Nov 2026, 3 p.m. ET; from Jan 2027 IRIS is the only e-filing system for information returns | [IRS QuickAlerts, September 2026](https://www.irs.gov/pub/irs-efile/quickalerts-september-2026.pdf) | ✅ verified 2026-11-04 (earlier "end of December" was wrong) |
| .NET 8 end of support 10 Nov 2026 (migration target = .NET 10 LTS) | [.NET Blog](https://devblogs.microsoft.com/dotnet/dotnet-8-9-end-of-support/) | ✅ verified 2026-11-04 |

| Germany: until 31 Dec 2026 paper always allowed, other e-formats with recipient consent; EDI with consent during 2027; exceptions (≤ €250, tickets, B2C) | IHK Stuttgart (as above) | ✅ verified 2026-11-05 |
| US: IRIS Taxpayer Portal accepts manual entry or CSV, up to 100 records per upload; A2A uses XML; a FIRE TCC cannot be used for IRIS | [IRS Publication 5719 (PY 2027)](https://www.irs.gov/pub/irs-pdf/p5719.pdf) | ✅ verified 2026-11-05 |

Code copy of this register: `frontend/content/data/facts.ts` (unit test fails if any fact is unverified).

## 6a. How it is implemented (VW-E5)

| Piece | Where |
|---|---|
| Page registry (sitemap, llms) | `frontend/lib/pages.ts` — add every new page here and its MDX path in `lib/mdx-sources.ts` (a test fails otherwise) |
| JSON-LD builders | `frontend/lib/schema.ts`, rendered by `components/seo/json-ld.tsx`; breadcrumbs via `components/seo/breadcrumbs.tsx` |
| Share images | `lib/og.tsx` + `opengraph-image.tsx` per route (static, 1200×630) |
| robots / sitemap / llms | `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` |
| Heading anchors | `rehype-slug` (MDX h2/h3 get ids for deep links) |
| Lighthouse budgets | `frontend/lighthouserc.json`, `.github/workflows/lighthouse.yml` |

## 6. Technical SEO checklist

- Metadata API on every page; canonical; OG image
- `sitemap.ts`, `robots.ts`, hreflang ready for `/de`
- Core Web Vitals: LCP < 2.0 s, CLS < 0.05, INP < 200 ms
- Search Console + Bing Webmaster verified at launch

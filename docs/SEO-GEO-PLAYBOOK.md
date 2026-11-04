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
| Germany: B2B e-invoice issuing mandatory from 1 Jan 2027 for prior-year turnover > €800,000; from 1 Jan 2028 for all | BMF (Bundesfinanzministerium) | TODO(verify + link) |
| Germany: receiving e-invoices mandatory since 1 Jan 2025 | BMF | TODO(verify + link) |
| US: IRS FIRE system retired end of December 2026; information returns move to IRIS | IRS.gov | TODO(verify + link) |

## 6. Technical SEO checklist

- Metadata API on every page; canonical; OG image
- `sitemap.ts`, `robots.ts`, hreflang ready for `/de`
- Core Web Vitals: LCP < 2.0 s, CLS < 0.05, INP < 200 ms
- Search Console + Bing Webmaster verified at launch

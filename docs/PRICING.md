# Pricing — VFPScanner Web

Status: **draft — prices TODO(decide)**. Code reads prices only from `frontend/lib/pricing.ts`, which must mirror this file.

| Tier | Price | Currency | How they pay | Notes |
|---|---|---|---|---|
| Free Scan | 0 | — | Lead form → download + email | Scanner runs locally; customer sends report if they want a review |
| Migration Assessment — S | TODO (suggested €1,900) | EUR / USD | Checkout | Up to ~200 code units |
| Migration Assessment — M | TODO (suggested €2,400) | EUR / USD | Checkout | Up to ~800 code units |
| Migration Assessment — L | TODO (suggested €2,900) | EUR / USD | Checkout | Larger: or quote |
| Migration project | Quote | EUR / USD | Invoice | Assessment fee credited |
| Retainer | TODO (suggested from €490 / month) | EUR / USD | Subscription | Post-migration support |

## Policies (draft)

- Assessment: 5–10 working days from receiving the scan output and a call
- Refund: full refund if cancelled before work starts — TODO(confirm)
- EU B2B with VAT ID: reverse charge handled by merchant of record
- Currency by region (EUR for Europe, USD for US/other)

## Provider

See `docs/adr/ADR-002-merchant-of-record.md`.

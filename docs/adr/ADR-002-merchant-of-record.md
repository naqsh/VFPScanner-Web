# ADR-002 — Merchant of record for payments

**Status:** Proposed — needs provider confirmation | **Date:** 2026-11-04

## Context

Seller is based in Pakistan; buyers in Germany/EU and the US. Stripe does not onboard Pakistan businesses. EU VAT (including B2B reverse charge) must be handled correctly.

## Options

| Option | Pakistan payouts | Handles EU VAT | Fit for a consulting service |
|---|---|---|---|
| Lemon Squeezy | Bank payouts list includes Pakistan | Yes (MoR) | TODO(confirm with support) |
| Paddle | Pakistan not in unsupported list | Yes (MoR) | Aimed at software businesses — may not accept services |
| Invoice via Payoneer / Wise | Yes | Manual | Yes — for quotes and big projects |

Sources: https://docs.lemonsqueezy.com/help/getting-started/supported-countries , https://www.paddle.com/help/start/account-verification/which-countries-are-supported-by-paddle

## Decision (proposed)

- Primary: **Lemon Squeezy** for Assessment checkout and Retainer subscription, if it confirms a fixed-price service is allowed
- Fallback: Paddle if it accepts; otherwise invoice-only flow (Payoneer/Wise) with a "Request invoice" button
- Code talks to one interface `frontend/lib/payments/` (`createCheckout`, `verifyWebhook`, `parseEvent`) so the provider can change

## Consequences

- + No VAT registration work for the seller; tax-correct invoices for EU buyers
- − MoR fee (~5% + fixed fee); provider approval risk — confirm before VW-E6

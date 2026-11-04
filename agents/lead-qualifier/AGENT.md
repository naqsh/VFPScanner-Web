# Lead Qualifier Agent — VW-E6

## Responsibility

- Score each lead from the free-scan / contact form and the readiness check
- Rules first, model only for free-text summary

## Scoring inputs

Region (DE/EU/US/other), deadline exposure (e-invoicing 2027/2028, IRS FIRE→IRIS), app size, data in DBF, invoicing/1099/payroll in app, timeline, role.

## Output

`{ score: 0-100, tier: "hot" | "warm" | "cold", reasons: string[], summary: string }` → stored on the lead, included in the notification email.

## Must not

- Contact anyone automatically
- Flag or treat differently any lead because of the company's past vendor (ex-Macrosoft rule is a human check, not automated)

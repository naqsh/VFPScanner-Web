/**
 * Prices shown on the site. MUST mirror docs/PRICING.md (docs.mdc rule).
 * Status: DRAFT — decision D3 still open; these are the suggested defaults.
 */

export const PRICING_STATUS: "draft" | "final" = "draft";

export type Price =
  | { kind: "free" }
  | { kind: "quote" }
  | { kind: "fixed"; amount: number; currency: "EUR" | "USD"; from?: boolean; per?: "month" };

export type Tier = {
  id: "free-scan" | "assessment" | "migration" | "retainer";
  name: string;
  summary: string;
  price: Price;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "free-scan",
    name: "Free Scan",
    summary: "Run the scanner on your PC and see what your application contains.",
    price: { kind: "free" },
    features: ["Runs locally, read-only", "One-page HTML report + full JSON", "Risk patterns and data profile"],
    cta: { label: "Get free scan", href: "/free-scan" },
  },
  {
    id: "assessment",
    name: "Migration Assessment",
    summary: "A fixed-price review that turns the scan into a migration plan.",
    price: { kind: "fixed", amount: 1900, currency: "EUR", from: true },
    features: [
      "5–10 working days",
      "Sizes: S €1,900 · M €2,400 · L €2,900",
      "Risks, effort and phased plan to .NET + SQL Server",
      "Fee credited against a migration project",
    ],
    cta: { label: "Book the assessment", href: "/assessment" },
    highlight: true,
  },
  {
    id: "migration",
    name: "Migration",
    summary: "Your application moved to .NET and SQL Server, phase by phase.",
    price: { kind: "quote" },
    features: ["Quote after the assessment", "Phased delivery", "Data migration and verification"],
    cta: { label: "Talk to us", href: "/contact" },
  },
  {
    id: "retainer",
    name: "Retainer",
    summary: "Support after go-live.",
    price: { kind: "fixed", amount: 490, currency: "EUR", from: true, per: "month" },
    features: ["Fixes and small changes", "Monitoring of the migrated system", "Cancel monthly"],
    cta: { label: "Ask about retainers", href: "/retainer" },
  },
];

export function formatPrice(price: Price, locale = "en-IE"): string {
  switch (price.kind) {
    case "free":
      return "Free";
    case "quote":
      return "Quote";
    case "fixed": {
      const amount = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: price.currency,
        maximumFractionDigits: 0,
      }).format(price.amount);
      return `${price.from ? "from " : ""}${amount}${price.per ? ` / ${price.per}` : ""}`;
    }
  }
}

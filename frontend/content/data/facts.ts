import type { Fact } from "@/components/sections/fact-block";

/**
 * Facts register (mirrors docs/SEO-GEO-PLAYBOOK.md §5). Only `verified: true`
 * facts may appear without the "To verify" badge. Review monthly until the
 * deadlines pass.
 */

const IHK_STUTTGART =
  "https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496";
const IRS_QUICKALERTS_SEP_2026 = "https://www.irs.gov/pub/irs-efile/quickalerts-september-2026.pdf";

export const facts = {
  deReceive: {
    effective: "Since 1 January 2025",
    statement: "Businesses in Germany must be able to receive structured e-invoices from other German businesses.",
    source: { label: "IHK Stuttgart, based on BMF guidance", href: IHK_STUTTGART },
    lastReviewed: "2026-11-04",
    verified: true,
  },
  deIssue2027: {
    effective: "From 1 January 2027",
    statement:
      "German businesses with more than €800,000 turnover in 2026 must issue structured e-invoices (XRechnung or ZUGFeRD) for domestic B2B sales.",
    source: { label: "IHK Stuttgart, based on BMF guidance", href: IHK_STUTTGART },
    lastReviewed: "2026-11-04",
    verified: true,
  },
  deIssue2028: {
    effective: "From 1 January 2028",
    statement: "All German businesses must issue structured e-invoices for domestic B2B sales.",
    source: { label: "IHK Stuttgart, based on BMF guidance", href: IHK_STUTTGART },
    lastReviewed: "2026-11-04",
    verified: true,
  },
  usFireLastDay: {
    effective: "19 November 2026, 3 p.m. ET",
    statement: "Last day to file information returns (such as 1099s) through the IRS FIRE system.",
    source: { label: "IRS QuickAlerts, September 2026", href: IRS_QUICKALERTS_SEP_2026 },
    lastReviewed: "2026-11-04",
    verified: true,
  },
  usIrisOnly: {
    effective: "From January 2027",
    statement:
      "IRIS is the only IRS system for e-filing information returns, including prior-year and corrected returns.",
    source: { label: "IRS QuickAlerts, September 2026", href: IRS_QUICKALERTS_SEP_2026 },
    lastReviewed: "2026-11-04",
    verified: true,
  },
} satisfies Record<string, Fact>;

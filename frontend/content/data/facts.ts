import type { Fact } from "@/components/sections/fact-block";

/**
 * Facts register (mirrors docs/SEO-GEO-PLAYBOOK.md §5). Only `verified: true`
 * facts may appear without the "To verify" badge. Review monthly until the
 * deadlines pass.
 */

const IHK_STUTTGART =
  "https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496";
const IRS_QUICKALERTS_SEP_2026 = "https://www.irs.gov/pub/irs-efile/quickalerts-september-2026.pdf";
const IRS_PUB_5719 = "https://www.irs.gov/pub/irs-pdf/p5719.pdf";

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
  deUntil2026: {
    effective: "Until 31 December 2026",
    statement:
      "Paper invoices are still allowed for domestic B2B sales. Other electronic formats, such as a PDF by email, need the recipient's agreement.",
    source: { label: "IHK Stuttgart, based on BMF guidance", href: IHK_STUTTGART },
    lastReviewed: "2026-11-05",
    verified: true,
  },
  deEdi2027: {
    effective: "During 2027",
    statement: "EDI invoices may still be issued if the recipient agrees. From 1 January 2028 the new requirements apply to everyone.",
    source: { label: "IHK Stuttgart, based on BMF guidance", href: IHK_STUTTGART },
    lastReviewed: "2026-11-05",
    verified: true,
  },
  usIrisPortal: {
    effective: "IRIS Taxpayer Portal",
    statement: "Returns can be keyed in by hand or uploaded as CSV files of up to 100 records per upload. No special software is needed.",
    source: { label: "IRS Publication 5719 (processing year 2027)", href: IRS_PUB_5719 },
    lastReviewed: "2026-11-05",
    verified: true,
  },
  usIrisTcc: {
    effective: "IRIS access",
    statement:
      "Filing through IRIS needs an IRIS Transmitter Control Code (TCC). A TCC obtained for FIRE cannot be used for IRIS.",
    source: { label: "IRS Publication 5719, section 3.1", href: IRS_PUB_5719 },
    lastReviewed: "2026-11-05",
    verified: true,
  },
} satisfies Record<string, Fact>;

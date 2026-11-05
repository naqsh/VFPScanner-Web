/**
 * Single source for site navigation (VW-010). Pages are added in VW-E3/VW-E5;
 * until then their links land on the custom "not published yet" 404 page.
 */

export type NavItem = { label: string; href: string };
export type NavGroup = { title: string; items: NavItem[] };

export const primaryNav: NavItem[] = [
  { label: "Scanner", href: "/scanner" },
  { label: "Assessment", href: "/assessment" },
  { label: "Migration", href: "/migration" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export const primaryCta: NavItem = { label: "Get free scan", href: "/free-scan" };

export const footerNav: NavGroup[] = [
  {
    title: "Product",
    items: [
      { label: "Scanner", href: "/scanner" },
      { label: "Free scan", href: "/free-scan" },
      { label: "Sample report", href: "/sample-report" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Migration Assessment", href: "/assessment" },
      { label: "Migration to .NET", href: "/migration" },
      { label: "Retainer", href: "/retainer" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { label: "Germany: e-invoicing 2027", href: "/compliance/germany-xrechnung-2027" },
      { label: "US: IRS FIRE to IRIS", href: "/compliance/us-irs-fire-to-iris" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Refunds", href: "/legal/refunds" },
      { label: "Imprint", href: "/legal/imprint" },
    ],
  },
];

/** True when `pathname` is the item's page or a page under it. */
export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

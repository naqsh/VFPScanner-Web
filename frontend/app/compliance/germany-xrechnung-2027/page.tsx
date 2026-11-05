import { CompliancePage } from "@/components/content/compliance-page";
import { facts } from "@/content/data/facts";
import Body, { meta as rawMeta } from "@/content/pages/compliance/germany-xrechnung-2027.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";

const PATH = "/compliance/germany-xrechnung-2027";
const meta = defineMeta("content/pages/compliance/germany-xrechnung-2027.mdx", rawMeta);
export const metadata = pageMetadata(meta, PATH);

export default function GermanyEInvoicingPage() {
  return (
    <CompliancePage
      path={PATH}
      meta={meta}
      Body={Body}
      eyebrow="Compliance · Germany"
      about={["XRechnung", "ZUGFeRD", "E-invoicing in Germany", "Visual FoxPro"]}
      answer={
        <>
          If your FoxPro system invoices German businesses, it must issue structured e-invoices (XRechnung or
          ZUGFeRD) from 1 January 2027 when your 2026 turnover was above €800,000, and from 1 January 2028 in any
          case. A printed or PDF invoice will no longer meet the rule.
        </>
      }
      facts={[facts.deIssue2027, facts.deIssue2028, facts.deReceive, facts.deUntil2026, facts.deEdi2027]}
    />
  );
}

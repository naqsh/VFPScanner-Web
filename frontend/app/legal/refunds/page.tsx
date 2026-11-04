import { LegalPage } from "@/components/content/legal-page";
import Body, { meta as rawMeta } from "@/content/pages/legal/refunds.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";

const meta = defineMeta("content/pages/legal/refunds.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/legal/refunds");

export default function RefundsPage() {
  return <LegalPage Body={Body} meta={meta} />;
}

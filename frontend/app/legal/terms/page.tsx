import { LegalPage } from "@/components/content/legal-page";
import Body, { meta as rawMeta } from "@/content/pages/legal/terms.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";

const meta = defineMeta("content/pages/legal/terms.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/legal/terms");

export default function TermsPage() {
  return <LegalPage Body={Body} meta={meta} />;
}

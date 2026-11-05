import { LegalPage } from "@/components/content/legal-page";
import Body, { meta as rawMeta } from "@/content/pages/legal/imprint.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";

const meta = defineMeta("content/pages/legal/imprint.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/legal/imprint");

export default function ImprintPage() {
  return <LegalPage Body={Body} meta={meta} path="/legal/imprint" />;
}

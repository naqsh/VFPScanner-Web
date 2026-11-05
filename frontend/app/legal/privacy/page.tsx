import { LegalPage } from "@/components/content/legal-page";
import Body, { meta as rawMeta } from "@/content/pages/legal/privacy.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";

const meta = defineMeta("content/pages/legal/privacy.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/legal/privacy");

export default function PrivacyPage() {
  return <LegalPage Body={Body} meta={meta} />;
}

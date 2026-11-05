import { CompliancePage } from "@/components/content/compliance-page";
import { facts } from "@/content/data/facts";
import Body, { meta as rawMeta } from "@/content/pages/compliance/us-irs-fire-to-iris.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";

const PATH = "/compliance/us-irs-fire-to-iris";
const meta = defineMeta("content/pages/compliance/us-irs-fire-to-iris.mdx", rawMeta);
export const metadata = pageMetadata(meta, PATH);

export default function UsFireToIrisPage() {
  return (
    <CompliancePage
      path={PATH}
      meta={meta}
      Body={Body}
      eyebrow="Compliance · United States"
      about={["IRS FIRE", "IRS IRIS", "Form 1099", "Information returns", "Visual FoxPro"]}
      answer={
        <>
          The last day to file information returns through FIRE is 19 November 2026 at 3 p.m. ET. From January 2027,
          IRIS is the only IRS e-filing system for them, including corrections. A FoxPro system that writes FIRE
          files needs IRIS output, a filing service, or manual entry.
        </>
      }
      facts={[facts.usFireLastDay, facts.usIrisOnly, facts.usIrisPortal, facts.usIrisTcc]}
    />
  );
}

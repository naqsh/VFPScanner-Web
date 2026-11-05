import { ogImage } from "@/lib/og";

export const alt = "IRS FIRE to IRIS: what changes for FoxPro 1099 exports — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Compliance · United States", title: "IRS FIRE to IRIS: what changes for FoxPro 1099 exports" });
}

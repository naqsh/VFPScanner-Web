import { ogImage } from "@/lib/og";

export const alt = "Ask about your FoxPro application — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Ask about your FoxPro application" });
}

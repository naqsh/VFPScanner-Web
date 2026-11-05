import { ogImage } from "@/lib/og";

export const alt = "Questions and answers about FoxPro migration — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "FAQ", title: "Questions and answers about FoxPro migration" });
}

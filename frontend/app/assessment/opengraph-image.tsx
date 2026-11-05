import { ogImage } from "@/lib/og";

export const alt = "A fixed-price plan for your FoxPro migration — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Migration Assessment", title: "A fixed-price plan for your FoxPro migration" });
}

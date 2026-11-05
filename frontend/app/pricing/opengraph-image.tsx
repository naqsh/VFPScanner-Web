import { ogImage } from "@/lib/og";

export const alt = "Start free. Pay a fixed price for the plan. — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Pricing", title: "Start free. Pay a fixed price for the plan." });
}

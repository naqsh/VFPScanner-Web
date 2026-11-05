import { ogImage } from "@/lib/og";

export const alt = "Support from the engineer who built it — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Retainer", title: "Support from the engineer who built it" });
}

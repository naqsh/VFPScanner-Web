import { ogImage } from "@/lib/og";

export const alt = "One engineer, from scan to go-live — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "About", title: "One engineer, from scan to go-live" });
}

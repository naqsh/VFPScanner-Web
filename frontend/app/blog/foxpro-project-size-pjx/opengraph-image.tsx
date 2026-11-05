import { ogImage } from "@/lib/og";

export const alt = "How big is my FoxPro application? Reading the PJX \u2014 VFP Migration Scanner blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Blog", title: "How big is my FoxPro application? Reading the PJX" });
}

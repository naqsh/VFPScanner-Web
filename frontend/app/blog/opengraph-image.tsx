import { ogImage } from "@/lib/og";

export const alt = "FoxPro migration in practice — VFP Migration Scanner blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Blog", title: "FoxPro migration in practice" });
}

import { ogImage } from "@/lib/og";

export const alt = "See what your FoxPro application contains, without sending it anywhere — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "The free scanner", title: "See what your FoxPro application contains, without sending it anywhere" });
}

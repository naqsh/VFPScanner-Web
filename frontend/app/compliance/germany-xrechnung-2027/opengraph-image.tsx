import { ogImage } from "@/lib/og";

export const alt = "German e-invoicing 2027: what FoxPro ERPs must change — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Compliance · Germany", title: "German e-invoicing 2027: what FoxPro ERPs must change" });
}

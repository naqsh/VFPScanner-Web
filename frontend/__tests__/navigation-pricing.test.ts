import { describe, expect, it } from "vitest";

import { footerNav, isActive, primaryCta, primaryNav } from "@/lib/navigation";
import { formatPrice, tiers } from "@/lib/pricing";

describe("navigation", () => {
  it("marks the current page and its children active", () => {
    expect(isActive("/pricing", "/pricing")).toBe(true);
    expect(isActive("/compliance/us-irs-fire-to-iris", "/compliance")).toBe(true);
    expect(isActive("/pricing-old", "/pricing")).toBe(false);
    expect(isActive("/scanner", "/")).toBe(false);
    expect(isActive("/", "/")).toBe(true);
  });

  it("uses internal, unique hrefs", () => {
    const all = [...primaryNav, primaryCta, ...footerNav.flatMap((g) => g.items)];
    for (const item of all) expect(item.href.startsWith("/")).toBe(true);
    for (const group of footerNav) {
      const hrefs = group.items.map((i) => i.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });
});

describe("pricing", () => {
  it("formats free, quote, fixed and monthly prices", () => {
    expect(formatPrice({ kind: "free" })).toBe("Free");
    expect(formatPrice({ kind: "quote" })).toBe("Quote");
    expect(formatPrice({ kind: "fixed", amount: 1900, currency: "EUR", from: true })).toBe("from €1,900");
    expect(formatPrice({ kind: "fixed", amount: 490, currency: "EUR", from: true, per: "month" })).toBe(
      "from €490 / month",
    );
  });

  it("mirrors the draft tiers in docs/PRICING.md", () => {
    expect(tiers.map((t) => t.id)).toEqual(["free-scan", "assessment", "migration", "retainer"]);
    expect(tiers.filter((t) => t.highlight)).toHaveLength(1);
  });
});

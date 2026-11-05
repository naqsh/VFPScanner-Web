import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/scanner",
  "/assessment",
  "/migration",
  "/retainer",
  "/pricing",
  "/faq",
  "/about",
  "/contact",
  "/free-scan",
  "/compliance/germany-xrechnung-2027",
  "/compliance/us-irs-fire-to-iris",
  "/blog",
  "/blog/macro-substitution-foxpro-migration",
  "/blog/dbf-to-sql-server-data-types",
  "/blog/foxpro-project-size-pjx",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refunds",
  "/legal/imprint",
];

test.describe("content pages", () => {
  for (const path of pages) {
    test(`${path}: loads, one h1, no axe violations, no horizontal scroll`, async ({ page }, info) => {
      test.skip(info.project.name === "tablet", "tablet covered by layout tests");
      for (const colorScheme of ["light", "dark"] as const) {
        await page.emulateMedia({ colorScheme });
        const res = await page.goto(path);
        expect(res?.status()).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);
        await page.locator("details").evaluateAll((els) => els.forEach((d) => d.setAttribute("open", "")));
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
        expect(results.violations, `${path} ${colorScheme}: ${JSON.stringify(results.violations, null, 2)}`).toEqual(
          [],
        );
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    });
  }

  test("legal templates are marked and not indexed; real pages are indexable", async ({ page }) => {
    await page.goto("/legal/privacy");
    await expect(page.getByRole("note")).toContainText("Template");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await page.goto("/scanner");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/scanner$/);
  });

  test("unknown legal page is a 404", async ({ page }) => {
    const res = await page.goto("/legal/does-not-exist");
    expect(res?.status()).toBe(404);
  });

  test("contact form is visibly disabled until launch", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
    await expect(page.getByText("Opens at launch")).toBeVisible();
  });

  test("scanner sample report image loads", async ({ page }) => {
    await page.goto("/scanner");
    const img = page.getByRole("img", { name: /Scan report for GoFish/ });
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  });

  test("FAQ and deadlines work without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByText("19 November 2026, 3 p.m. ET")).toBeVisible();
    await page.getByText("Does my source code leave my PC?").first().click();
    await expect(page.getByText(/opens files read-only/).first()).toBeVisible();
    await context.close();
  });
});

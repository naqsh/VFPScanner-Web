import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]);

test.describe("layout shell", () => {
  test("skip link is the first tab stop and jumps to main", async ({ page }, info) => {
    test.skip(info.project.name === "mobile", "keyboard flow checked on desktop and tablet");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("desktop shows primary nav, mobile shows the menu button", async ({ page }, info) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const menuButton = page.getByRole("button", { name: "Open menu" });
    if (info.project.name === "desktop") {
      await expect(nav).toBeVisible();
      await expect(menuButton).toBeHidden();
    } else {
      await expect(nav).toBeHidden();
      await expect(menuButton).toBeVisible();
    }
  });

  test("mobile menu: opens, traps focus, Esc closes and returns focus", async ({ page }, info) => {
    test.skip(info.project.name === "desktop", "menu only below md");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Page behind is inert: focus stays inside the dialog while tabbing
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => !!document.activeElement?.closest("dialog"));
      const onBody = await page.evaluate(() => document.activeElement === document.body);
      expect(inside || onBody).toBe(true);
    }
    // Scroll is locked
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile menu closes after following a link", async ({ page }, info) => {
    test.skip(info.project.name === "desktop", "menu only below md");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("unbuilt pages show the 404 'not published yet' page", async ({ page }) => {
    const res = await page.goto("/scanner");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page is not published yet");
    await expect(page.getByRole("link", { name: "Go to the home page" })).toBeVisible();
  });

  test("footer has all link groups", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Product", "Services", "Compliance", "Company", "Legal"]) {
      await expect(page.getByRole("navigation", { name })).toBeAttached();
    }
  });
});

test.describe("style guide", () => {
  test("no axe violations in light and dark, no horizontal scroll", async ({ page }) => {
    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme });
      await page.goto("/styleguide");
      // open every FAQ item so hidden content is checked too
      await page.locator("details").evaluateAll((els) => els.forEach((d) => d.setAttribute("open", "")));
      const results = await axe(page).analyze();
      expect(results.violations, `${colorScheme}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("is not indexed", async ({ page }) => {
    await page.goto("/styleguide");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});

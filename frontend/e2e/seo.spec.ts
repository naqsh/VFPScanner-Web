import { expect, test } from "@playwright/test";

const indexable = [
  "/",
  "/scanner",
  "/free-scan",
  "/assessment",
  "/migration",
  "/retainer",
  "/pricing",
  "/compliance/germany-xrechnung-2027",
  "/compliance/us-irs-fire-to-iris",
  "/blog",
  "/blog/macro-substitution-foxpro-migration",
  "/faq",
  "/about",
  "/contact",
];

test.describe("SEO / GEO", () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name !== "desktop", "markup is the same at every size");
  });

  for (const path of indexable) {
    test(`${path}: canonical, OG image, valid JSON-LD`, async ({ page, request }) => {
      await page.goto(path);
      const canonical = path === "/" ? /^https?:\/\/[^/]+\/?$/ : new RegExp(`${path}$`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
      const robots = await page.evaluate(
        () => document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
      );
      expect(robots, `${path} must be indexable`).not.toMatch(/noindex/);

      const og = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(og).toBeTruthy();
      const img = await request.get(new URL(og!).pathname + new URL(og!).search);
      expect(img.status()).toBe(200);
      expect(img.headers()["content-type"]).toBe("image/png");

      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(blocks.length).toBeGreaterThanOrEqual(1);
      const types: string[] = [];
      for (const b of blocks) {
        const doc = JSON.parse(b);
        expect(doc["@context"]).toBe("https://schema.org");
        for (const n of doc["@graph"] ?? [doc]) types.push(n["@type"]);
      }
      expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite"]));
      if (path !== "/") expect(types).toContain("BreadcrumbList");
    });
  }

  test("FAQPage markup only lists questions that are on the page", async ({ page }) => {
    for (const path of ["/", "/faq", "/assessment", "/compliance/us-irs-fire-to-iris"]) {
      await page.goto(path);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const faq = blocks
        .map((b) => JSON.parse(b))
        .flatMap((d) => d["@graph"] ?? [d])
        .find((n) => n["@type"] === "FAQPage");
      expect(faq, path).toBeTruthy();
      for (const q of faq.mainEntity) {
        await expect(page.locator("summary", { hasText: q.name }).first(), `${path}: ${q.name}`).toBeAttached();
      }
    }
  });

  test("robots.txt, sitemap.xml, llms.txt and llms-full.txt", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.headers()["content-type"]).toContain("text/plain");
    const robotsText = await robots.text();
    expect(robotsText).toContain("GPTBot");
    expect(robotsText).toContain("Disallow: /styleguide");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.headers()["content-type"]).toContain("xml");
    const xml = await sitemap.text();
    expect(xml).toContain("/compliance/germany-xrechnung-2027");
    expect(xml).not.toContain("/legal/");

    for (const path of ["/llms.txt", "/llms-full.txt"]) {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toBe("text/plain; charset=utf-8");
    }
  });

  test("headings get anchors and the compliance options link lands on them", async ({ page }) => {
    await page.goto("/compliance/germany-xrechnung-2027");
    await page.getByRole("link", { name: "See your options" }).click();
    await expect(page).toHaveURL(/#your-options$/);
    await expect(page.locator("h2#your-options")).toBeInViewport();
  });

  test("styleguide is disallowed and noindex", async ({ page }) => {
    await page.goto("/styleguide");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});

# Search Console and Bing Webmaster Tools (VW-029)

Do this once the site runs on its own domain (VW-040). Preview URLs should not be verified.

## Google Search Console

1. Go to search.google.com/search-console → **Add property** → **URL prefix** → `https://<your-domain>/`.
2. Choose **HTML tag**. Copy only the `content` value, for example `abc123…`.
3. In Vercel → Project → Settings → Environment Variables (Production), add `GOOGLE_SITE_VERIFICATION` = that value. Redeploy.
4. Back in Search Console, click **Verify**.
5. **Sitemaps** → submit `sitemap.xml`.

(DNS verification also works and needs no code change: add the TXT record at your domain registrar.)

## Bing Webmaster Tools

1. Go to bing.com/webmasters → **Import from Google Search Console** (fastest), or add the site manually.
2. Manual: choose **HTML meta tag**, copy the `content` value of `msvalidate.01`.
3. Add `BING_SITE_VERIFICATION` = that value in Vercel (Production). Redeploy, then **Verify**.
4. Submit `https://<your-domain>/sitemap.xml`.

## What the site already provides

| File | Purpose |
|---|---|
| `/sitemap.xml` | All indexable pages with their last review date |
| `/robots.txt` | Allows search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …); blocks `/styleguide` and `/api/` |
| `/llms.txt` | Short guide for AI answer engines: key facts and every page |
| `/llms-full.txt` | Full text of every public page |
| JSON-LD on every page | Organization, WebSite, breadcrumbs, and per page: SoftwareApplication, Service + Offer, FAQPage, HowTo, Article |

After verifying, check **Enhancements** in Search Console for structured-data errors, and test single pages with the Rich Results Test.

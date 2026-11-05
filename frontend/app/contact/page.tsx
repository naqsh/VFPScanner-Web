import { CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/content/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Body, { meta as rawMeta } from "@/content/pages/contact.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";

const meta = defineMeta("content/pages/contact.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/contact");

const fieldLabel = "block text-sm font-medium";

/**
 * Contact page (VW-015). The form and booking are placeholders until VW-031
 * (form → Supabase + email, Turnstile) and VW-034 (Cal.com). The form is
 * disabled so nobody types a message that goes nowhere.
 */
export default function ContactPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Ask about your FoxPro application"
        lead="You get an answer from the engineer who would do the work, not a sales team."
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <form aria-describedby="form-status" className="rounded-xl border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Send a message</h2>
            <Badge variant="medium">Opens at launch</Badge>
          </div>
          <p id="form-status" className="mt-2 text-sm text-muted-foreground">
            The form is not connected yet. It goes live with the full site.
          </p>
          <fieldset disabled className="mt-6 space-y-4 disabled:opacity-70">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={fieldLabel}>
                Name
                <Input className="mt-1.5" name="name" autoComplete="name" />
              </label>
              <label className={fieldLabel}>
                Work email
                <Input className="mt-1.5" type="email" name="email" autoComplete="email" />
              </label>
            </div>
            <label className={fieldLabel}>
              Company
              <Input className="mt-1.5" name="company" autoComplete="organization" />
            </label>
            <label className={fieldLabel}>
              Message
              <textarea
                name="message"
                rows={5}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
              />
            </label>
            <Button type="submit" size="lg">
              Send message
            </Button>
          </fieldset>
        </form>

        <div>
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Book a call</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              A booking calendar for a 30-minute introduction call will appear here at launch.
            </p>
          </div>
          <div className="mt-2 [&_h2]:mt-8 [&_h2]:text-lg">
            <Body />
          </div>
        </div>
      </div>
    </main>
  );
}

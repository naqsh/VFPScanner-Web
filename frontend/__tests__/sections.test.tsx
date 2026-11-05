import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CtaBand } from "@/components/sections/cta-band";
import { FactBlock } from "@/components/sections/fact-block";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { PricingTable } from "@/components/sections/pricing-table";
import { ProofStats } from "@/components/sections/proof-stats";
import { Section } from "@/components/sections/section";
import { Steps } from "@/components/sections/steps";
import { homeFeatures, homeStats, homeSteps } from "@/content/data/home";
import { tiers } from "@/lib/pricing";

describe("sections", () => {
  it("Hero renders one h1 and optional parts", () => {
    render(<Hero title="Title" lead="Lead" eyebrow="Eyebrow" note="Note" actions={<a href="/x">Go</a>} />);
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Note")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go" })).toBeInTheDocument();
  });

  it("Section labels itself with its heading", () => {
    render(
      <Section id="s" title="Section title" intro="Intro">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole("region", { name: "Section title" })).toBeInTheDocument();
  });

  it("FeatureGrid renders every item", () => {
    render(<FeatureGrid items={homeFeatures} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(homeFeatures.length);
  });

  it("Steps is an ordered list", () => {
    const { container } = render(<Steps steps={homeSteps} />);
    expect(container.querySelector("ol")?.children).toHaveLength(homeSteps.length);
  });

  it("ProofStats shows a source for every stat", () => {
    const { container } = render(<ProofStats stats={homeStats} />);
    expect(container.querySelectorAll("dt")).toHaveLength(homeStats.length);
    for (const s of homeStats) expect(screen.getByText(s.source)).toBeInTheDocument();
  });

  it("PricingTable shows each tier with its CTA and one highlight", () => {
    render(<PricingTable tiers={tiers} />);
    for (const t of tiers) {
      expect(screen.getByRole("heading", { name: t.name })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: t.cta.label })).toHaveAttribute("href", t.cta.href);
    }
    expect(screen.getAllByText("Most chosen first step")).toHaveLength(1);
  });

  it("Faq answers are in the HTML (no JS needed)", () => {
    render(<Faq items={[{ question: "Q?", answer: "A." }]} />);
    const details = screen.getByText("Q?").closest("details");
    expect(details).not.toBeNull();
    expect(within(details as HTMLElement).getByText("A.")).toBeInTheDocument();
  });

  it("FactBlock flags unverified facts and links the source", () => {
    const base = {
      effective: "1 January 2027",
      statement: "Statement",
      source: { label: "BMF", href: "https://example.org" },
      lastReviewed: "2026-11-04",
    };
    const { rerender } = render(<FactBlock fact={{ ...base, verified: false }} />);
    expect(screen.getByText("To verify")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source: BMF/ })).toHaveAttribute("href", "https://example.org");
    rerender(<FactBlock fact={{ ...base, verified: true }} />);
    expect(screen.queryByText("To verify")).not.toBeInTheDocument();
  });

  it("CtaBand renders primary and secondary actions", () => {
    render(
      <CtaBand title="CTA" body="Body" primary={{ label: "One", href: "/one" }} secondary={{ label: "Two", href: "/two" }} />,
    );
    expect(screen.getByRole("link", { name: "One" })).toHaveAttribute("href", "/one");
    expect(screen.getByRole("link", { name: "Two" })).toHaveAttribute("href", "/two");
  });
});

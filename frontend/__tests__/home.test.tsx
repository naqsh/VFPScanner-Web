import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { DevConfigBanner } from "@/components/dev-config-banner";
import { featureStatus, parseEnv } from "@/lib/env";
import { site } from "@/lib/site";

describe("Home (placeholder)", () => {
  it("renders one h1 with the tagline", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(site.tagline);
  });

  it("never names a former employer or competitor", () => {
    const { container } = render(<Home />);
    expect(container.textContent?.toLowerCase()).not.toContain("macrosoft");
  });
});

describe("DevConfigBanner", () => {
  it("lists features that are not configured", () => {
    render(<DevConfigBanner statuses={featureStatus(parseEnv({}))} />);
    expect(screen.getByRole("status")).toHaveTextContent(/leads/);
    expect(screen.getByRole("status")).toHaveTextContent(/assistant/);
  });

  it("renders nothing when everything is configured", () => {
    const { container } = render(
      <DevConfigBanner statuses={[{ feature: "leads", ready: true, missing: [] }]} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

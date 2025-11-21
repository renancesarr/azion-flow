import { describe, it, expect } from "vitest";
import { AzionDomainProvider } from "../../src/providers/azion/azion.domain";

describe("Azion Domain Provider", () => {
  it("loads without crashing", () => {
    const provider = new AzionDomainProvider();
    expect(provider).toBeDefined();
  });
});

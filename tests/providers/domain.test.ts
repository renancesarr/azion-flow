import { describe, it, expect } from "vitest";
import { AzionDomainProvider } from "../../src/domains/storage/azion.domain";

describe("Azion Domain Provider", () => {
  it("loads without crashing", () => {
    const provider = new AzionDomainProvider({ token: "test-token" });
    expect(provider).toBeDefined();
  });
});

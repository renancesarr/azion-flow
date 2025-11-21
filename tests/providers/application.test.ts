import { describe, it, expect } from "vitest";
import { AzionApplicationProvider } from "../../src/providers/azion/azion.application";

describe("Azion Application Provider", () => {
  it("loads without crashing", () => {
    const provider = new AzionApplicationProvider();
    expect(provider).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { AzionStorageProvider } from "../../src/providers/azion/azion.storage";

describe("Azion Storage Provider", () => {
  it("loads without crashing", () => {
    const provider = new AzionStorageProvider();
    expect(provider).toBeDefined();
  });
});

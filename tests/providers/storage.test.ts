import { describe, it, expect } from "vitest";
import { AzionStorageProvider } from "../../src/domains/storage/services/azion.storage";

describe("Azion Storage Provider", () => {
  it("loads without crashing", () => {
    const provider = new AzionStorageProvider({ token: "test-token" });
    expect(provider).toBeDefined();
  });
});

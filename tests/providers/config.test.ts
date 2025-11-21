import { describe, it, expect } from "vitest";
import { FileConfigProvider } from "../../src/providers/config/file-config";

describe("Config Provider", () => {
  it("loads without crashing", () => {
    const provider = new FileConfigProvider();
    expect(provider).toBeDefined();
  });
});

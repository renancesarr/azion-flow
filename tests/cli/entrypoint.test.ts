import { describe, it, expect } from "vitest";

describe("CLI Entrypoint", () => {
  it("should import without crashing", async () => {
    const mod = await import("../../src/cli/index");
    expect(mod).toBeDefined();
  });
});

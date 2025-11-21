import { describe, it, expect } from "vitest";
import { ConfigUseCase } from "../../src/usecases/config/config.usecase";

describe("Config Use Case", () => {
  it("loads without crashing", () => {
    const uc = new ConfigUseCase();
    expect(uc).toBeDefined();
  });
});

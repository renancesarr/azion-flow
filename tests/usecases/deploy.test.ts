import { describe, it, expect } from "vitest";
import { DeployUseCase } from "../../src/usecases/deploy/deploy.usecase";

describe("Deploy Use Case", () => {
  it("loads without crashing", () => {
    const uc = new DeployUseCase();
    expect(uc).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

// Placeholder fallback test; marcado como skip até termos steps/providers reais.
describe.skip("Deploy fallback scenarios", () => {
  it("should handle missing config/build gracefully", async () => {
    const usecase = createDeployUseCase();
    const result = await usecase.execute({});
    expect(result).toBeDefined();
  });
});

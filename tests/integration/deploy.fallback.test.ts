import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

describe("Deploy fallback scenarios", () => {
  it("should handle empty context gracefully", async () => {
    const usecase = createDeployUseCase();
    const result = await usecase.execute({});
    expect(result.success).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

describe("Deploy fallback scenarios", () => {
  it("should handle empty context gracefully", async () => {
    const usecase = createDeployUseCase();
    const cwd = process.cwd();
    const result = await usecase.execute({ projectRoot: cwd, buildDir: cwd });
    expect(result.success).toBe(true);
  });
});

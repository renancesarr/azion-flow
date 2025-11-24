import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

describe("Deploy flow real (base pipeline)", () => {
  it("should run deploy pipeline without throwing", async () => {
    const usecase = createDeployUseCase();
    const cwd = process.cwd();
    const result = await usecase.execute({ projectRoot: cwd, buildDir: cwd });
    expect(result.success).toBe(true);
    expect(result.report).toBeDefined();
  });
});

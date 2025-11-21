import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

describe("Deploy flow real (base pipeline)", () => {
  it("should run deploy pipeline without throwing", async () => {
    const usecase = createDeployUseCase();
    const result = await usecase.execute({ projectRoot: "/tmp", buildDir: "/tmp/build" });
    expect(result.success).toBe(true);
    expect(result.report).toBeDefined();
  });
});

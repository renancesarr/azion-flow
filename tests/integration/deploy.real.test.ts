import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

// Placeholder integration test with stub context; steps atuais são no-ops.
describe.skip("Deploy flow real (mocks)", () => {
  it("should run deploy pipeline with mocks without throwing", async () => {
    const usecase = createDeployUseCase();
    const result = await usecase.execute({ projectRoot: "/tmp", buildDir: "/tmp/build" });
    expect(result).toBeDefined();
  });
});

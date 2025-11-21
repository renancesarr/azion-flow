import { describe, it, expect } from "vitest";
import { DeployOrchestrator } from "../../src/usecases/deploy/deploy.orchestrator";
import { DeployUseCase } from "../../src/usecases/deploy/deploy.usecase";

class FailingStep {
  constructor(_s?: any, _p?: any) {}
  async execute(): Promise<void> {
    throw new Error("boom");
  }
}

describe("Deploy error handling", () => {
  it("should stop pipeline and report error when step fails", async () => {
    const orchestrator = new DeployOrchestrator([FailingStep], {}, {}, {});
    const usecase = new DeployUseCase(orchestrator as any);
    const result = await usecase.execute({});
    expect(result.success).toBe(false);
    expect(Array.isArray((result.report as any).errors)).toBe(true);
  });
});

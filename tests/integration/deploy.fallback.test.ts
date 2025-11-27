import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

describe("Deploy fallback scenarios", () => {
  it("should handle empty context gracefully", async () => {
    const services = {
      bucketService: {
        listBuckets: async () => [],
        ensureBucket: async (name: string) => ({ name })
      },
      fileSyncService: { sync: async () => ({ uploaded: 0, skipped: 0 }) },
      applicationService: { listApplications: async () => [], selectApplication: async () => null },
      domainConfigService: { getConfig: async () => null, ensureDomain: async () => null }
    };
    const usecase = createDeployUseCase({ services, token: "test-token" });
    const cwd = process.cwd();
    const result = await usecase.execute({ projectRoot: cwd, buildDir: cwd });
    expect(result.success).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import { DEPLOY_PIPELINE } from "../../src/usecases/deploy/pipeline";

describe("Deploy pipeline order", () => {
  it("should keep the expected order of steps", () => {
    const names = DEPLOY_PIPELINE.map((step) => step.name);
    expect(names).toEqual([
      "ValidateLocalEnvStep",
      "ReadConfigStep",
      "ResolvePathsStep",
      "ListBucketsStep",
      "EnsureBucketStep",
      "SyncFilesStep",
      "ListApplicationsStep",
      "SelectApplicationStep",
      "GetDomainConfigStep",
      "EnsureDomainStep",
      "GenerateReportStep"
    ]);
  });
});
